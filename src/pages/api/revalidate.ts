import type { NextApiRequest, NextApiResponse } from "next";
import { getPublishedPosts } from "@/lib/notion/posts";
import { POSTS_PER_PAGE } from "@/lib/notion/client";

/**
 * Publishing in Notion never redeploys the site. Every /news route is rendered
 * with ISR, so it refreshes itself within its revalidate window on its own.
 *
 * This endpoint is the impatient path: hit it to refresh the news routes right
 * now instead of waiting out that window. Point a Notion automation or a
 * bookmark at:
 *
 *   POST https://myvisioninitiative.org/api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Optionally pass &slug=<post-slug> to refresh a single post plus the indexes.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return res
      .status(500)
      .json({ error: "REVALIDATE_SECRET is not configured" });
  }

  if (req.query.secret !== secret) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  try {
    const slug = typeof req.query.slug === "string" ? req.query.slug : null;
    const revalidated: string[] = [];

    const refresh = async (path: string) => {
      await res.revalidate(path);
      revalidated.push(path);
    };

    if (slug) {
      await refresh(`/news/${slug}`);
    }

    // Index pages list every post, so any publish can change their contents —
    // refresh the whole paginated set, not just the first page.
    const posts = await getPublishedPosts();
    const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

    await refresh("/news");
    for (let page = 2; page <= totalPages; page++) {
      await refresh(`/news/page/${page}`);
    }

    if (!slug) {
      // Without a specific slug we cannot know which post changed, so refresh
      // them all. Volumes here are small enough for this to stay cheap.
      for (const post of posts) {
        await refresh(`/news/${post.slug}`);
      }
    }

    return res.status(200).json({ revalidated: true, paths: revalidated });
  } catch (error) {
    console.error("Revalidation failed", error);
    return res.status(500).json({ error: "Failed to revalidate" });
  }
}
