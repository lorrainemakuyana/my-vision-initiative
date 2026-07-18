import type { GetStaticPaths, GetStaticProps } from "next";
import PageBanner from "@/components/shared/PageBanner";
import Seo from "@/components/Seo";
import NewsList from "@/components/news/NewsList";
import type { INewsPost } from "@/interfaces/news";
import { NEWS_REVALIDATE_SECONDS } from "@/lib/notion/client";
import { getCategories, getPublishedPosts } from "@/lib/notion/posts";

interface CategoryPageProps {
  posts: INewsPost[];
  category: string;
  categories: string[];
}

export default function NewsCategory({
  posts,
  category,
  categories,
}: CategoryPageProps) {
  return (
    <>
      <Seo
        title={`${category} — News & Stories`}
        description={`${category} stories and updates from My Vision Initiative.`}
      />
      <PageBanner
        title={category}
        subtitle={`Stories and updates filed under ${category}.`}
      />
      <NewsList
        posts={posts}
        // Categories hold few enough posts that a single page is plenty; the
        // pagination component hides itself when totalPages is 1.
        page={1}
        totalPages={1}
        basePath={`/news/category/${encodeURIComponent(category.toLowerCase())}`}
        categories={categories}
        activeCategory={category}
        emptyMessage={`There are no ${category} stories yet. Check back soon!`}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  return {
    paths: categories.map((category) => ({
      params: { category: category.toLowerCase() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
}) => {
  const slug = typeof params?.category === "string" ? params.category : null;
  if (!slug) return { notFound: true };

  const [allPosts, categories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ]);

  // The URL carries a lowercased category; recover the original casing so the
  // heading reads the way it was written in Notion.
  const category = categories.find(
    (name) => name.toLowerCase() === decodeURIComponent(slug).toLowerCase(),
  );

  if (!category) {
    return { notFound: true, revalidate: NEWS_REVALIDATE_SECONDS };
  }

  return {
    props: {
      posts: allPosts.filter((post) => post.category === category),
      category,
      categories,
    },
    revalidate: NEWS_REVALIDATE_SECONDS,
  };
};
