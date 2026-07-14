import type { GetServerSideProps } from "next";
import { getPublishedPosts } from "@/lib/notion/posts";

const SITE_URL = "https://myvisioninitiative.org";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildFeed(
  items: Awaited<ReturnType<typeof getPublishedPosts>>,
): string {
  const entries = items
    .map((post) => {
      const url = `${SITE_URL}/news/${post.slug}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date().toUTCString();

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ""}
      ${post.author ? `<dc:creator>${escapeXml(post.author)}</dc:creator>` : ""}
      <description>${escapeXml(post.excerpt || post.title)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Vision Initiative — News &amp; Stories</title>
    <link>${SITE_URL}/news</link>
    <description>Updates, stories and announcements from My Vision Initiative.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${entries}
  </channel>
</rss>`;
}

/** The page component never renders — getServerSideProps writes the XML itself. */
export default function Feed() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getPublishedPosts();

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(buildFeed(posts));
  res.end();

  return { props: {} };
};
