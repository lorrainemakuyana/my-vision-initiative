/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Seo from "@/components/Seo";
import NotionBlocks from "@/components/news/NotionBlocks";
import NewsCard from "@/components/news/NewsCard";
import type { INewsPost, NewsBlock } from "@/interfaces/news";
import { NEWS_REVALIDATE_SECONDS } from "@/lib/notion/client";
import { getPostBlocks } from "@/lib/notion/blocks";
import { getPostBySlug, getPublishedPosts } from "@/lib/notion/posts";
import { formatPostDate } from "@/lib/news-format";

interface PostPageProps {
  post: INewsPost;
  blocks: NewsBlock[];
  related: INewsPost[];
}

export default function NewsPost({ post, blocks, related }: PostPageProps) {
  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt || `${post.title} — My Vision Initiative`}
        image={post.coverImage ?? undefined}
        type="article"
        publishedTime={post.publishedAt ?? undefined}
        author={post.author ?? undefined}
        tags={post.tags}
      />

      <article className="w-full px-5 pb-24 pt-32 lg:mx-auto lg:max-w-3xl lg:px-0">
        <nav className="mb-8 text-sm font-light text-gray-500">
          <Link href="/news" className="hover:text-magenta hover:underline">
            News &amp; Stories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{post.title}</span>
        </nav>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            {post.category && (
              <Link
                href={`/news/category/${encodeURIComponent(post.category.toLowerCase())}`}
                className="bg-magenta rounded-full px-3 py-1 text-xs font-medium text-white transition hover:opacity-90"
              >
                {post.category}
              </Link>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
            )}
            {post.author && <span>by {post.author}</span>}
          </div>

          <h1 className="font-playfairDisplay text-magenta text-4xl font-bold leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-lato mt-4 text-lg font-light text-gray-600">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.coverAlt}
            className="mb-10 h-auto w-full rounded-lg shadow-md"
          />
        )}

        <div className="font-lato">
          <NotionBlocks blocks={blocks} />
        </div>

        {post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm font-light text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="w-full bg-white px-5 py-16">
          <div className="lg:mx-auto lg:max-w-6xl">
            <h2 className="font-playfairDisplay text-magenta mb-8 text-3xl font-bold">
              MORE STORIES
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((item) => (
                <NewsCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    // Posts published after the last build render on first request.
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : null;
  if (!slug) return { notFound: true };

  const post = await getPostBySlug(slug);
  if (!post) {
    // Unpublishing in Notion should take the page down without a redeploy, so
    // keep revalidating rather than caching the 404 forever.
    return { notFound: true, revalidate: NEWS_REVALIDATE_SECONDS };
  }

  const [blocks, allPosts] = await Promise.all([
    getPostBlocks(post.id),
    getPublishedPosts(),
  ]);

  // Prefer posts in the same category, topping up with the newest others so the
  // section is never half-empty.
  const others = allPosts.filter((item) => item.id !== post.id);
  const sameCategory = others.filter(
    (item) => post.category && item.category === post.category,
  );
  const related = [
    ...sameCategory,
    ...others.filter((item) => !sameCategory.includes(item)),
  ].slice(0, 3);

  return {
    props: { post, blocks, related },
    revalidate: NEWS_REVALIDATE_SECONDS,
  };
};
