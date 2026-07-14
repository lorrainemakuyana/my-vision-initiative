/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import type { INewsPost } from "@/interfaces/news";
import { formatPostDate } from "@/lib/news-format";

function NewsCard({ post }: { post: INewsPost }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200 transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/news/${post.slug}`} className="block">
        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="from-purple to-magenta flex h-full w-full items-center justify-center bg-gradient-to-br">
              <span className="font-playfairDisplay text-2xl font-bold text-white">
                MVI
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex grow flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {post.category && (
            <Link
              href={`/news/category/${encodeURIComponent(post.category.toLowerCase())}`}
              className="bg-magenta rounded-full px-3 py-1 font-medium text-white transition hover:opacity-90"
            >
              {post.category}
            </Link>
          )}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatPostDate(post.publishedAt)}
            </time>
          )}
        </div>

        <h2 className="font-playfairDisplay mb-2 text-xl font-bold text-gray-900">
          <Link
            href={`/news/${post.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="font-lato mb-4 line-clamp-3 grow font-light text-gray-600">
            {post.excerpt}
          </p>
        )}

        <Link
          href={`/news/${post.slug}`}
          className="text-magenta mt-auto text-sm font-medium underline-offset-4 hover:underline"
        >
          Read more &rarr;
        </Link>
      </div>
    </article>
  );
}

export default NewsCard;
