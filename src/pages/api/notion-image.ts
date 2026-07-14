import type { NextApiRequest, NextApiResponse } from "next";
import { isNotionConfigured, notion } from "@/lib/notion/client";

/** Notion IDs are UUIDs, with or without dashes. */
const NOTION_ID = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

type NotionFile = {
  type?: string;
  file?: { url?: string };
  external?: { url?: string };
};

function urlFromFile(file: NotionFile | null | undefined): string | null {
  if (!file) return null;
  return file.file?.url ?? file.external?.url ?? null;
}

async function resolveBlockImage(blockId: string): Promise<string | null> {
  const block = await notion.blocks.retrieve({ block_id: blockId });
  const type = (block as { type?: string }).type;
  if (!type) return null;
  const payload = (block as Record<string, unknown>)[type];
  return urlFromFile(payload as NotionFile);
}

async function resolvePageCover(pageId: string): Promise<string | null> {
  const page = await notion.pages.retrieve({ page_id: pageId });
  return urlFromFile((page as { cover?: NotionFile }).cover);
}

/**
 * Notion serves uploaded files from signed S3 URLs that expire roughly an hour
 * after they are issued. A statically rendered page that embedded one directly
 * would show broken images to everyone who arrived after it went stale, so
 * images point here instead and we re-resolve the live URL on each request.
 *
 * The bytes behind a given block are stable even though the URL is not, so the
 * response itself is safe to cache hard at the CDN.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isNotionConfigured) {
    return res.status(404).json({ error: "Notion is not configured" });
  }

  const blockId = typeof req.query.blockId === "string" ? req.query.blockId : null;
  const pageId = typeof req.query.pageId === "string" ? req.query.pageId : null;
  const id = blockId ?? pageId;

  // Only ever fetch a URL that Notion itself hands back for a valid ID — never
  // one supplied by the caller, which would make this an open proxy (SSRF).
  if (!id || !NOTION_ID.test(id)) {
    return res.status(400).json({ error: "A valid blockId or pageId is required" });
  }

  try {
    const source = blockId
      ? await resolveBlockImage(blockId)
      : await resolvePageCover(pageId!);

    if (!source) {
      return res.status(404).json({ error: "No image found for that ID" });
    }

    const upstream = await fetch(source);
    if (!upstream.ok || !upstream.body) {
      return res.status(502).json({ error: "Failed to fetch image from Notion" });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());

    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") ?? "image/jpeg",
    );
    res.setHeader("Content-Length", buffer.length);
    res.setHeader(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    );

    return res.status(200).send(buffer);
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (status === 404 || status === 400) {
      return res.status(404).json({ error: "No image found for that ID" });
    }
    console.error("notion-image proxy failed", error);
    return res.status(500).json({ error: "Failed to load image" });
  }
}
