import type { GetStaticProps } from "next";
import Link from "next/link";
import Banner from "@/components/Banner";
import HomeNews from "@/components/HomeNews";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import type { INewsPost } from "@/interfaces/news";
import { NEWS_REVALIDATE_SECONDS } from "@/lib/notion/client";
import { getPublishedPosts } from "@/lib/notion/posts";

interface HomeProps {
  latestPosts: INewsPost[];
}

export default function Home({ latestPosts }: HomeProps) {
  return (
    <>
      <Banner />

      {/* The homepage teases the journey; /our-journey carries the full timeline. */}
      <Journey limit={3} />

      <HomeNews posts={latestPosts} />

      <Testimonials />

      <div className="bg-conic-180 from-purple via-magenta to-purple flex flex-col items-center justify-center px-5 py-14 text-white lg:py-20">
        <h2 className="font-playfairDisplay text-center text-3xl font-bold">
          Make a difference in your life today
        </h2>
        <p className="my-5 max-w-2xl text-center text-lg font-light">
          Join the #MVIExperience, volunteer your time, or support the young
          women and girls we work with.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/programs"
            className="hover:text-magenta rounded-full border-2 border-white bg-transparent px-6 py-2 font-light text-white transition hover:bg-white"
          >
            Explore our programs
          </Link>
          <Link
            href="/volunteer"
            className="text-magenta rounded-full border-2 border-white bg-white px-6 py-2 font-light transition hover:opacity-90"
          >
            Volunteer with us
          </Link>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getPublishedPosts();

  return {
    props: { latestPosts: posts.slice(0, 3) },
    // Keeps the homepage's news teaser current without a redeploy.
    revalidate: NEWS_REVALIDATE_SECONDS,
  };
};
