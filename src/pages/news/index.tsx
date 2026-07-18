import type { GetStaticProps } from "next";
import PageBanner from "@/components/shared/PageBanner";
import Seo from "@/components/Seo";
import NewsList from "@/components/news/NewsList";
import type { IPaginatedPosts } from "@/interfaces/news";
import { NEWS_REVALIDATE_SECONDS } from "@/lib/notion/client";
import { getCategories, getPublishedPosts, paginate } from "@/lib/notion/posts";

interface NewsPageProps extends IPaginatedPosts {
  categories: string[];
}

export default function NewsIndex({
  posts,
  page,
  totalPages,
  categories,
}: NewsPageProps) {
  return (
    <>
      <Seo
        title="News & Stories"
        description="Updates, stories and announcements from My Vision Initiative — celebrating the young women and girls we work with across Zimbabwe."
      />
      <PageBanner
        title="News & Stories"
        subtitle="Updates, milestones and stories from across the My Vision Initiative community."
      />
      <NewsList
        posts={posts}
        page={page}
        totalPages={totalPages}
        basePath="/news"
        categories={categories}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
  const [allPosts, categories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ]);

  return {
    props: { ...paginate(allPosts, 1), categories },
    // Regenerates on a timer, so publishing in Notion never needs a redeploy.
    revalidate: NEWS_REVALIDATE_SECONDS,
  };
};
