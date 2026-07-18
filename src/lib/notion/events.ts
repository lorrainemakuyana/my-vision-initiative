import type { IEvent } from "@/interfaces/news";
import {
  NOTION_EVENTS_DATABASE_ID,
  getDataSourceId,
  isEventsConfigured,
  notion,
} from "./client";
import { slugify } from "./posts";

type NotionPage = {
  id: string;
  cover?: unknown;
  properties?: Record<string, unknown>;
};

function plainText(property: unknown): string {
  const prop = property as
    | { title?: { plain_text?: string }[]; rich_text?: { plain_text?: string }[] }
    | undefined;
  return (prop?.title ?? prop?.rich_text ?? [])
    .map((part) => part.plain_text ?? "")
    .join("")
    .trim();
}

function dateRange(property: unknown): { start: string | null; end: string | null } {
  const prop = property as
    | { date?: { start?: string; end?: string | null } | null }
    | undefined;
  return {
    start: prop?.date?.start ?? null,
    end: prop?.date?.end ?? null,
  };
}

function urlValue(property: unknown): string | null {
  const prop = property as { url?: string | null } | undefined;
  return prop?.url || null;
}

function coverUrl(page: NotionPage): string | null {
  const cover = page.cover as
    | { type?: string; external?: { url?: string } }
    | null
    | undefined;
  if (!cover) return null;
  if (cover.type === "external" && cover.external?.url) return cover.external.url;
  // Notion-hosted covers expire; go through the proxy. See docs/NOTION_SETUP.md.
  return `/api/notion-image?pageId=${page.id}`;
}

function toEvent(page: NotionPage): IEvent | null {
  const properties = page.properties ?? {};

  const title = plainText(properties.Title ?? properties.Name);
  if (!title) return null;

  const { start, end } = dateRange(properties.Date);
  if (!start) return null;

  return {
    id: page.id,
    slug: slugify(title),
    title,
    description: plainText(properties.Description ?? properties.Excerpt),
    location: plainText(properties.Location) || null,
    startDate: start,
    endDate: end,
    registrationUrl: urlValue(properties.RegistrationUrl ?? properties.Link),
    coverImage: coverUrl(page),
  };
}

export async function getEvents(): Promise<IEvent[]> {
  if (!isEventsConfigured) return [];

  const dataSourceId = await getDataSourceId(NOTION_EVENTS_DATABASE_ID!);
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ property: "Date", direction: "descending" }],
    });
    pages.push(...(response.results as NotionPage[]));
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return pages.map(toEvent).filter((event): event is IEvent => event !== null);
}

/**
 * An event counts as upcoming until the day it ends (or the day it happens, for
 * a single-day event) is over — so a conference running today still shows as
 * upcoming at 9am on its final morning, rather than dropping into the archive.
 */
export function splitByDate(events: IEvent[], now = new Date()) {
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  const isUpcoming = (event: IEvent) => {
    const effectiveEnd = new Date(event.endDate ?? event.startDate);
    return effectiveEnd >= today;
  };

  return {
    // Soonest first, so the next thing to attend leads.
    upcoming: events
      .filter(isUpcoming)
      .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    // Most recent first.
    past: events
      .filter((event) => !isUpcoming(event))
      .sort((a, b) => b.startDate.localeCompare(a.startDate)),
  };
}
