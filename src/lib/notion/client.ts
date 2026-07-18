import { Client } from "@notionhq/client";

export const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

/** Posts per page across the /news index and its pagination. */
export const POSTS_PER_PAGE = 9;

/**
 * How long a rendered /news page may serve before Next.js regenerates it in the
 * background. This is what decouples publishing from deployment: a new Notion
 * post appears within this window on its own. /api/revalidate exists to skip
 * the wait when you want it live immediately.
 */
export const NEWS_REVALIDATE_SECONDS = 60;

/**
 * The site must build and serve even with no Notion credentials configured —
 * a contributor cloning the repo, or a preview deploy without secrets, should
 * get an empty /news rather than a failed build.
 */
export const isNotionConfigured = Boolean(NOTION_TOKEN && NOTION_DATABASE_ID);

export const notion = new Client({ auth: NOTION_TOKEN });

let cachedDataSourceId: string | null = null;

/**
 * Notion's 2025-09-03 API replaced database queries with data sources: a
 * database is now a container holding one or more of them, and queries target
 * the data source. Callers configure the friendlier NOTION_DATABASE_ID (it is
 * in the database URL), so resolve it to the underlying data source once and
 * reuse it for the lifetime of the server process.
 */
export async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId;

  const database = await notion.databases.retrieve({
    database_id: NOTION_DATABASE_ID!,
  });

  const dataSources = (database as { data_sources?: { id: string }[] })
    .data_sources;

  if (!dataSources?.length) {
    throw new Error(
      `Notion database ${NOTION_DATABASE_ID} has no data sources. Confirm the ID is a database, and that your integration has access to it.`,
    );
  }

  cachedDataSourceId = dataSources[0].id;
  return cachedDataSourceId;
}
