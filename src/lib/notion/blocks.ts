import type { NewsBlock, NewsListItem, NewsRichText } from "@/interfaces/news";
import { isNotionConfigured, notion } from "./client";

type RawBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: unknown;
};

type RawRichText = {
  plain_text?: string;
  href?: string | null;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  };
};

function toRichText(value: unknown): NewsRichText[] {
  return ((value ?? []) as RawRichText[]).map((part) => ({
    text: part.plain_text ?? "",
    bold: Boolean(part.annotations?.bold),
    italic: Boolean(part.annotations?.italic),
    underline: Boolean(part.annotations?.underline),
    strikethrough: Boolean(part.annotations?.strikethrough),
    code: Boolean(part.annotations?.code),
    href: part.href ?? null,
  }));
}

function captionOf(payload: unknown): string {
  const caption = (payload as { caption?: RawRichText[] })?.caption ?? [];
  return caption.map((part) => part.plain_text ?? "").join("");
}

/**
 * File-type media in Notion is served from signed S3 URLs that expire about an
 * hour after issue, so embedding one directly into a statically rendered page
 * ships a link that is dead by the time most readers see it. Route those
 * through the proxy, which re-resolves the block's current URL per request.
 * Externally hosted media has a stable URL and is passed through untouched.
 */
function mediaUrl(payload: unknown, blockId: string): string {
  const media = payload as {
    type?: string;
    external?: { url?: string };
    file?: { url?: string };
  };

  if (media?.type === "external" && media.external?.url) {
    return media.external.url;
  }
  if (media?.type === "file" && media.file?.url) {
    return `/api/notion-image?blockId=${blockId}`;
  }
  return "";
}

async function fetchChildren(blockId: string): Promise<RawBlock[]> {
  const blocks: RawBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...(response.results as RawBlock[]));
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}

async function toListItem(block: RawBlock): Promise<NewsListItem> {
  const payload = block[block.type] as { rich_text?: unknown };
  return {
    id: block.id,
    richText: toRichText(payload?.rich_text),
    // Nested bullets are children of their parent item, so recurse to keep them.
    children: block.has_children ? await mapBlocks(block.id) : [],
  };
}

async function toBlock(block: RawBlock): Promise<NewsBlock> {
  const { id, type } = block;
  const payload = block[type] as Record<string, unknown> | undefined;
  const richText = toRichText(payload?.rich_text);

  switch (type) {
    case "paragraph":
    case "heading_1":
    case "heading_2":
    case "heading_3":
    case "quote":
      return { type, id, richText } as NewsBlock;

    case "callout":
      return {
        type: "callout",
        id,
        richText,
        emoji:
          (payload?.icon as { emoji?: string } | undefined)?.emoji ?? null,
      };

    case "to_do":
      return {
        type: "to_do",
        id,
        richText,
        checked: Boolean(payload?.checked),
      };

    case "code":
      return {
        type: "code",
        id,
        text: richText.map((part) => part.text).join(""),
        language: (payload?.language as string) ?? "text",
      };

    case "image":
    case "video":
      return {
        type,
        id,
        url: mediaUrl(payload, id),
        caption: captionOf(payload),
      } as NewsBlock;

    case "embed":
    case "bookmark":
      return {
        type,
        id,
        url: (payload?.url as string) ?? "",
        caption: captionOf(payload),
      } as NewsBlock;

    case "divider":
      return { type: "divider", id };

    default:
      return { type: "unsupported", id };
  }
}

/**
 * Notion returns list items as flat siblings; HTML needs them wrapped in a
 * single <ul>/<ol>. Collapse each consecutive run into one list block so the
 * renderer emits well-formed markup instead of one list per bullet.
 */
export async function mapBlocks(blockId: string): Promise<NewsBlock[]> {
  const raw = await fetchChildren(blockId);
  const blocks: NewsBlock[] = [];

  for (let i = 0; i < raw.length; i++) {
    const block = raw[i];
    const isBulleted = block.type === "bulleted_list_item";
    const isNumbered = block.type === "numbered_list_item";

    if (!isBulleted && !isNumbered) {
      blocks.push(await toBlock(block));
      continue;
    }

    const listType = block.type;
    const items: NewsListItem[] = [];
    while (i < raw.length && raw[i].type === listType) {
      items.push(await toListItem(raw[i]));
      i++;
    }
    i--; // step back onto the last consumed item; the for-loop advances past it

    blocks.push({
      type: isBulleted ? "bulleted_list" : "numbered_list",
      id: `${listType}-${items[0].id}`,
      items,
    });
  }

  return blocks;
}

export async function getPostBlocks(pageId: string): Promise<NewsBlock[]> {
  if (!isNotionConfigured) return [];
  return mapBlocks(pageId);
}
