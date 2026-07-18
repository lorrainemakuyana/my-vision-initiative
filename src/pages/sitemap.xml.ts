import type { GetServerSideProps } from "next";
import { EVENTS_PER_PAGE, POSTS_PER_PAGE } from "@/lib/notion/client";
import { getCategories, getPublishedPosts } from "@/lib/notion/posts";
import { getEvents, splitByDate } from "@/lib/notion/events";

const SITE_URL = "https://myvisioninitiative.org";

interface SitemapEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
}

const staticPages: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/programs", changefreq: "monthly", priority: "0.9" },
  { path: "/impact", changefreq: "monthly", priority: "0.8" },
  { path: "/donate", changefreq: "monthly", priority: "0.9" },
  { path: "/volunteer", changefreq: "monthly", priority: "0.8" },
  { path: "/our-journey", changefreq: "monthly", priority: "0.6" },
  { path: "/news", changefreq: "daily", priority: "0.9" },
  { path: "/events", changefreq: "weekly", priority: "0.7" },
  { path: "/faqs", changefreq: "monthly", priority: "0.6" },
];

function buildSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      ({ path, changefreq, priority, lastmod }) => `  <url>
    <loc>${SITE_URL}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/** The page component never renders — getServerSideProps writes the XML itself. */
export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const entries = [...staticPages];

  // Notion may be unconfigured, or simply down. A sitemap that 500s is worse
  // than one that lists only the static pages, so degrade rather than fail.
  try {
    const [posts, categories, events] = await Promise.all([
      getPublishedPosts(),
      getCategories(),
      getEvents(),
    ]);

    posts.forEach((post) => {
      entries.push({
        path: `/news/${post.slug}`,
        changefreq: "monthly",
        priority: "0.7",
        lastmod: post.publishedAt
          ? new Date(post.publishedAt).toISOString().split("T")[0]
          : undefined,
      });
    });

    categories.forEach((category) => {
      entries.push({
        path: `/news/category/${encodeURIComponent(category.toLowerCase())}`,
        changefreq: "weekly",
        priority: "0.5",
      });
    });

    const newsPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    for (let page = 2; page <= newsPages; page++) {
      entries.push({
        path: `/news/page/${page}`,
        changefreq: "weekly",
        priority: "0.4",
      });
    }

    const eventPages = Math.ceil(
      splitByDate(events).past.length / EVENTS_PER_PAGE,
    );
    for (let page = 2; page <= eventPages; page++) {
      entries.push({
        path: `/events/page/${page}`,
        changefreq: "monthly",
        priority: "0.4",
      });
    }
  } catch (error) {
    console.error("Sitemap: could not load Notion content", error);
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(buildSitemap(entries));
  res.end();

  return { props: {} };
};
