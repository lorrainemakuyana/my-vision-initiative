import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Seo from "@/components/Seo";
import { EventsView, type EventsPageProps } from "@/pages/events/index";
import { EVENTS_PER_PAGE, NEWS_REVALIDATE_SECONDS } from "@/lib/notion/client";
import { getEvents, splitByDate } from "@/lib/notion/events";

export default function EventsPaginated(props: EventsPageProps) {
  return (
    <>
      <Seo
        title={`Events — Page ${props.page}`}
        description="Past events from My Vision Initiative."
        // Archive pages are near-duplicates in a crawler's eyes; let /events win.
        canonical="https://myvisioninitiative.org/events"
      />
      <EventsView {...props} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { past } = splitByDate(await getEvents());
  const totalPages = Math.max(1, Math.ceil(past.length / EVENTS_PER_PAGE));

  // Page 1 is /events itself.
  const paths = Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    params: { page: String(i + 2) },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<EventsPageProps> = async ({
  params,
}) => {
  const page = Number(params?.page);

  if (!Number.isInteger(page) || page < 2) {
    return { notFound: true };
  }

  const { past } = splitByDate(await getEvents());
  const totalPages = Math.max(1, Math.ceil(past.length / EVENTS_PER_PAGE));

  if (page > totalPages) {
    return { notFound: true, revalidate: NEWS_REVALIDATE_SECONDS };
  }

  const start = (page - 1) * EVENTS_PER_PAGE;

  return {
    props: {
      upcoming: [],
      past: past.slice(start, start + EVENTS_PER_PAGE),
      page,
      totalPages,
    },
    revalidate: NEWS_REVALIDATE_SECONDS,
  };
};
