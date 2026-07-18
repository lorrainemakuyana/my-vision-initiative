import type { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Seo from "@/components/Seo";
import PageBanner from "@/components/shared/PageBanner";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/news/EventCard";
import Pagination from "@/components/news/Pagination";
import type { IEvent } from "@/interfaces/news";
import { EVENTS_PER_PAGE, NEWS_REVALIDATE_SECONDS } from "@/lib/notion/client";
import { getEvents, splitByDate } from "@/lib/notion/events";

export interface EventsPageProps {
  upcoming: IEvent[];
  past: IEvent[];
  page: number;
  totalPages: number;
}

export function EventsView({
  upcoming,
  past,
  page,
  totalPages,
}: EventsPageProps) {
  const isFirstPage = page === 1;

  return (
    <>
      <PageBanner
        title="Events"
        subtitle="Workshops, info sessions, cohort launches and everything else happening across the My Vision Initiative community."
      />

      {/* Upcoming events belong on page 1 only — deeper pages are the archive. */}
      {isFirstPage && (
        <section className="w-full px-5 pb-16 lg:mx-auto lg:max-w-6xl lg:px-0">
          <SectionHeading title="COMING UP">
            What is next on our calendar.
          </SectionHeading>

          {upcoming.length === 0 ? (
            <p className="font-lato rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center font-light text-gray-500">
              We have no events scheduled right now. Follow us on social media,
              or{" "}
              <Link
                href="#contact"
                className="text-magenta underline underline-offset-4"
              >
                get in touch
              </Link>{" "}
              to hear about the next one first.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="w-full bg-white px-5 py-16">
        <div className="lg:mx-auto lg:max-w-6xl">
          <SectionHeading title={isFirstPage ? "PAST EVENTS" : "EVENT ARCHIVE"}>
            {isFirstPage
              ? "Where we have been, and what we have run."
              : `Page ${page} of ${totalPages}.`}
          </SectionHeading>

          {past.length === 0 ? (
            <p className="font-lato py-10 text-center font-light text-gray-500">
              Our past events will appear here.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} basePath="/events" />
        </div>
      </section>
    </>
  );
}

export default function EventsPage(props: EventsPageProps) {
  return (
    <>
      <Seo
        title="Events"
        description="Upcoming and past events from My Vision Initiative — workshops, info sessions and cohort launches for young women and girls in Zimbabwe."
      />
      <EventsView {...props} />
    </>
  );
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const { upcoming, past } = splitByDate(await getEvents());
  const totalPages = Math.max(1, Math.ceil(past.length / EVENTS_PER_PAGE));

  return {
    props: {
      upcoming,
      past: past.slice(0, EVENTS_PER_PAGE),
      page: 1,
      totalPages,
    },
    // Events roll from upcoming to past purely with the passage of time, so the
    // page must regenerate on a timer even when nothing in Notion has changed.
    revalidate: NEWS_REVALIDATE_SECONDS,
  };
};
