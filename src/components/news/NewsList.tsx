import Link from "next/link";
import React from "react";
import type { INewsPost } from "@/interfaces/news";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";

interface NewsListProps {
  posts: INewsPost[];
  page: number;
  totalPages: number;
  basePath: string;
  categories: string[];
  activeCategory?: string | null;
  emptyMessage?: string;
}

function NewsList({
  posts,
  page,
  totalPages,
  basePath,
  categories,
  activeCategory = null,
  emptyMessage = "There are no stories here just yet. Check back soon!",
}: NewsListProps) {
  const filterStyles =
    "rounded-full border px-4 py-2 text-sm transition hover:border-magenta hover:text-magenta";

  return (
    <div className="w-full px-5 pb-24 lg:mx-auto lg:max-w-6xl lg:px-0">
      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/news"
            className={
              activeCategory
                ? `${filterStyles} border-gray-200 bg-white text-gray-700`
                : `${filterStyles} border-magenta bg-magenta text-white`
            }
          >
            All
          </Link>
          {categories.map((category) => {
            const isActive =
              activeCategory?.toLowerCase() === category.toLowerCase();
            return (
              <Link
                key={category}
                href={`/news/category/${encodeURIComponent(category.toLowerCase())}`}
                className={
                  isActive
                    ? `${filterStyles} border-magenta bg-magenta text-white`
                    : `${filterStyles} border-gray-200 bg-white text-gray-700`
                }
              >
                {category}
              </Link>
            );
          })}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="py-16 text-center font-light text-gray-500">
          {emptyMessage}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} basePath={basePath} />
    </div>
  );
}

export default NewsList;
