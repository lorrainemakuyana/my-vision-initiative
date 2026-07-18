import type { INewsPost, IPaginatedPosts } from "@/interfaces/news";
import {
  NOTION_DATABASE_ID,
  POSTS_PER_PAGE,
  getDataSourceId,
  isNotionConfigured,
  notion,
} from "./client";

type NotionPage = {
  id: string;
  cover?: unknown;
  properties?: Record<string, unknown>;
};

function plainText(property: unknown): string {
  const prop = property as
    | { title?: { plain_text?: string }[]; rich_text?: { plain_text?: string }[] }
    | undefined;
  const parts = prop?.title ?? prop?.rich_text ?? [];
  return parts
    .map((part) => part.plain_text ?? "")
    .join("")
    .trim();
}

function selectName(property: unknown): string | null {
  const prop = property as
    | { select?: { name?: string } | null; status?: { name?: string } | null }
    | undefined;
  return prop?.select?.name ?? prop?.status?.name ?? null;
}

function multiSelectNames(property: unknown): string[] {
  const prop = property as { multi_select?: { name?: string }[] } | undefined;
  return (prop?.multi_select ?? [])
    .map((option) => option.name)
    .filter((name): name is string => Boolean(name));
}

function dateStart(property: unknown): string | null {
  const prop = property as { date?: { start?: string } | null } | undefined;
  return prop?.date?.start ?? null;
}

/** People properties are the natural way to credit an author in Notion. */
function peopleNames(property: unknown): string | null {
  const prop = property as { people?: { name?: string }[] } | undefined;
  const names = (prop?.people ?? [])
    .map((person) => person.name)
    .filter((name): name is string => Boolean(name));
  return names.length ? names.join(", ") : null;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A Notion-hosted cover carries a signed S3 URL that expires roughly an hour
 * after it is issued, so a statically rendered page would ship a dead link.
 * Point at our proxy instead, which re-resolves the current URL per request.
 * Covers added as an external URL do not expire and are used as-is.
 */
function coverUrl(page: NotionPage): string | null {
  const cover = page.cover as
    | { type?: string; external?: { url?: string } }
    | null
    | undefined;

  if (!cover) return null;
  if (cover.type === "external" && cover.external?.url) {
    return cover.external.url;
  }
  return `/api/notion-image?pageId=${page.id}`;
}

function toPost(page: NotionPage): INewsPost | null {
  const properties = page.properties ?? {};

  const title = plainText(properties.Title ?? properties.Name);
  if (!title) return null;

  const explicitSlug = plainText(properties.Slug);
  const slug = explicitSlug ? slugify(explicitSlug) : slugify(title);
  if (!slug) return null;

  return {
    id: page.id,
    slug,
    title,
    excerpt: plainText(properties.Excerpt ?? properties.Description),
    category: selectName(properties.Category),
    tags: multiSelectNames(properties.Tags),
    author:
      peopleNames(properties.Author) ?? plainText(properties.Author) ?? null,
    publishedAt: dateStart(properties.PublishedDate ?? properties.Published),
    coverImage: coverUrl(page),
    coverAlt: title,
  };
}

/**
 * "Status" can be modelled in Notion as either a Status property or a Select,
 * and querying with the wrong one is a hard validation error. Rather than make
 * the choice load-bearing during setup, try Status and fall back to Select,
 * remembering whichever the database actually uses.
 */
type StatusFilterKind = "status" | "select";
let cachedStatusKind: StatusFilterKind | null = null;

function publishedFilter(kind: StatusFilterKind) {
  return kind === "status"
    ? ({ property: "Status", status: { equals: "Published" } } as const)
    : ({ property: "Status", select: { equals: "Published" } } as const);
}

function isValidationError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === "validation_error"
  );
}

/**
 * Fetches every published post. Notion pages results by cursor, but the site
 * needs page-number pagination, so page through once and slice in memory —
 * cheap and simple at this volume, and the result is cached by ISR anyway.
 */
export async function getPublishedPosts(): Promise<INewsPost[]> {
  if (!isNotionConfigured) return [];

  const dataSourceId = await getDataSourceId(NOTION_DATABASE_ID!);
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const query = (kind: StatusFilterKind) =>
      notion.dataSources.query({
        data_source_id: dataSourceId,
        start_cursor: cursor,
        page_size: 100,
        filter: publishedFilter(kind),
        sorts: [{ property: "PublishedDate", direction: "descending" }],
      });

    let response;
    try {
      response = await query(cachedStatusKind ?? "status");
      cachedStatusKind ??= "status";
    } catch (error) {
      if (cachedStatusKind || !isValidationError(error)) throw error;
      response = await query("select");
      cachedStatusKind = "select";
    }

    pages.push(...(response.results as NotionPage[]));
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  const posts = pages
    .map(toPost)
    .filter((post): post is INewsPost => post !== null);

  // Two Notion rows can share a title, and therefore a derived slug. Keep the
  // first (most recent) so a duplicate can never make a route ambiguous.
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  });
}

export function paginate(posts: INewsPost[], page: number): IPaginatedPosts {
  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;

  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    page: safePage,
    totalPages,
    totalPosts,
  };
}

export async function getPostBySlug(slug: string): Promise<INewsPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getCategories(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.category) categories.add(post.category);
  });
  return [...categories].sort();
}
