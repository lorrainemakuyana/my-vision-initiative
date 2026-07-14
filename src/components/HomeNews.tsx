import Link from "next/link";
import React from "react";
import type { INewsPost } from "@/interfaces/news";
import NewsCard from "./news/NewsCard";
import SectionHeading from "./shared/SectionHeading";

/** The three most recent stories, teased on the homepage. */
function HomeNews({ posts }: { posts: INewsPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="w-full px-5 py-16 lg:mx-auto lg:max-w-6xl lg:px-0">
      <SectionHeading title="LATEST NEWS">
        Updates, milestones and stories from across the My Vision Initiative
        community.
      </SectionHeading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/news"
          className="border-magenta text-magenta hover:bg-magenta inline-block rounded-full border-2 px-6 py-2 font-light transition hover:text-white"
        >
          Read all our stories
        </Link>
      </div>
    </section>
  );
}

export default HomeNews;
