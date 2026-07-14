/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import type { IEvent } from "@/interfaces/news";
import { formatEventDates } from "@/lib/news-format";

function EventCard({ event, isPast }: { event: IEvent; isPast?: boolean }) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200 transition ${
        isPast ? "opacity-90" : "hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="from-purple to-magenta flex h-full w-full items-center justify-center bg-gradient-to-br">
            <FiCalendar className="h-10 w-10 text-white" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex grow flex-col p-6">
        <div className="text-magenta font-lato mb-2 flex items-center gap-2 text-sm font-medium">
          <FiCalendar aria-hidden="true" />
          <time dateTime={event.startDate}>
            {formatEventDates(event.startDate, event.endDate)}
          </time>
        </div>

        <h3 className="font-playfairDisplay mb-2 text-xl font-bold text-gray-900">
          {event.title}
        </h3>

        {event.location && (
          <p className="font-lato mb-3 flex items-center gap-2 text-sm font-light text-gray-500">
            <FiMapPin aria-hidden="true" />
            {event.location}
          </p>
        )}

        {event.description && (
          <p className="font-lato mb-4 grow font-light text-gray-600">
            {event.description}
          </p>
        )}

        {event.registrationUrl && !isPast && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-magenta mt-auto rounded-md px-5 py-2 text-center font-light text-white shadow-md transition hover:opacity-90"
          >
            Register
          </a>
        )}
      </div>
    </article>
  );
}

export default EventCard;
