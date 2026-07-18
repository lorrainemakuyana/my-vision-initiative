import Link from "next/link";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Seo from "@/components/Seo";
import PageBanner from "@/components/shared/PageBanner";
import SectionHeading from "@/components/shared/SectionHeading";
import { impactAreas, impactStats, reports } from "@/lib/impact";

export default function ImpactPage() {
  return (
    <>
      <Seo
        title="Our Impact"
        description="The difference My Vision Initiative is making for young women and girls in Zimbabwe — what we measure, and what we have published."
      />
      <PageBanner
        title="Our Impact"
        subtitle="What we set out to change, how we measure it, and what we have published so far."
      />

      {impactStats.length > 0 && (
        <section className="w-full px-5 pb-16 lg:mx-auto lg:max-w-6xl lg:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-100 bg-white p-8 text-center shadow-lg shadow-gray-200"
              >
                <p className="font-playfairDisplay text-magenta text-4xl font-bold">
                  {stat.value}
                </p>
                <p className="font-lato mt-2 font-medium text-black">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="font-lato mt-2 text-sm font-light text-gray-500">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="w-full bg-white px-5 py-16">
        <div className="lg:mx-auto lg:max-w-6xl">
          <SectionHeading title="WHAT WE MEASURE">
            Our programs are built around six faculties. These are the changes we
            are working towards, and the terms on which we expect to be judged.
          </SectionHeading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {impactAreas.map((area) => (
              <div
                key={area.title}
                className="border-magenta rounded-lg border-l-4 bg-gray-50 p-6"
              >
                <h3 className="font-playfairDisplay mb-2 text-xl font-bold text-gray-900">
                  {area.title}
                </h3>
                <p className="font-lato font-light text-gray-600">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-16 lg:mx-auto lg:max-w-6xl lg:px-0">
        <SectionHeading title="REPORTS">
          Our published reporting, available to download.
        </SectionHeading>

        {reports.length === 0 ? (
          <p className="font-lato rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center font-light text-gray-500">
            Our first published report is on its way. If you are a partner or
            funder who needs our figures before then, please{" "}
            <Link
              href="#contact"
              className="text-magenta underline underline-offset-4"
            >
              contact us
            </Link>{" "}
            and we will share them with you directly.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <a
                key={report.file}
                href={report.file}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:border-magenta group flex flex-col rounded-lg border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200 transition hover:-translate-y-1"
              >
                <span className="text-magenta font-lato text-sm font-medium">
                  {report.year}
                </span>
                <h3 className="font-playfairDisplay mb-2 mt-1 text-xl font-bold text-gray-900">
                  {report.title}
                </h3>
                <p className="font-lato mb-4 grow font-light text-gray-600">
                  {report.description}
                </p>
                <span className="text-magenta flex items-center gap-2 text-sm font-medium">
                  <FiDownload aria-hidden="true" />
                  Download PDF
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      <div className="bg-conic-180 from-purple via-magenta to-purple flex flex-col items-center justify-center px-5 py-14 text-white lg:py-20">
        <h2 className="font-playfairDisplay text-center text-3xl font-bold">
          Help us reach further
        </h2>
        <p className="my-5 max-w-2xl text-center text-lg font-light">
          Every cohort we run is made possible by people who back this work.
        </p>
        <Link
          href="/donate"
          className="rounded-full border-2 border-white bg-transparent px-6 py-2 font-light text-white transition hover:bg-white hover:text-magenta"
        >
          Support our work
        </Link>
      </div>
    </>
  );
}
