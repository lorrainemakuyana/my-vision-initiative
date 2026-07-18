import type { GetStaticPaths, GetStaticProps } from "next";
import PageBanner from "@/components/shared/PageBanner";
import Seo from "@/components/Seo";
import NewsList from "@/components/news/NewsList";
import type { IPaginatedPosts } from "@/interfaces/news";
import { NEWS_REVALIDATE_SECONDS, POSTS_PER_PAGE } from "@/lib/notion/client";
import { getCategories, getPublishedPosts, paginate } from "@/lib/notion/posts";

interface NewsPageProps extends IPaginatedPosts {
  categories: string[];
}

export default function NewsPaginated({
  posts,
  page,
  totalPages,
  categories,
}: NewsPageProps) {
  return (
    <>
      <Seo
        title={`News & Stories — Page ${page}`}
        description="Updates, stories and announcements from My Vision Initiative."
        // Paginated pages are near-duplicates of each other in a crawler's eyes,
        // so point them all at /news rather than compete with it in search.
        canonical="https://myvisioninitiative.org/news"
      />
      <PageBanner
        title="News & Stories"
        subtitle={`Page ${page} of ${totalPages}`}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  // Page 1 is served by /news itself, so start at 2.
  const paths = Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    params: { page: String(i + 2) },
  }));

  // New posts create new pages after build; blocking lets them render on first
  // request instead of 404ing until the next deploy.
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<NewsPageProps> = async ({
  params,
}) => {
  const raw = params?.page;
  const page = Number(raw);

  if (!Number.isInteger(page) || page < 2) {
    return { notFound: true };
  }

  const [allPosts, categories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ]);

  const paginated = paginate(allPosts, page);

  // paginate() clamps out-of-range requests; if it had to clamp, the page the
  // visitor asked for does not exist and should 404 rather than silently
  // serving different content at that URL.
  if (paginated.page !== page) {
    return { notFound: true, revalidate: NEWS_REVALIDATE_SECONDS };
  }

  return {
    props: { ...paginated, categories },
    revalidate: NEWS_REVALIDATE_SECONDS,
  };
};
