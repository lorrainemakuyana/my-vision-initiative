/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Seo from "@/components/Seo";
import PageBanner from "@/components/shared/PageBanner";
import SectionHeading from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { mission, story, team, values, vision } from "@/lib/about";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="My Vision Initiative is a registered organization in Zimbabwe empowering young women and girls through curated programs in leadership, entrepreneurship, mentorship and personal development."
      />
      <PageBanner
        title="About Us"
        subtitle="Who we are, why we exist, and the people behind My Vision Initiative."
      />

      <Reveal as="section" className="w-full px-5 pb-16 lg:mx-auto lg:max-w-6xl lg:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200">
            <h2 className="font-playfairDisplay text-magenta mb-4 text-2xl font-bold">
              OUR MISSION
            </h2>
            <p className="font-lato font-light leading-relaxed text-gray-700">
              {mission}
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200">
            <h2 className="font-playfairDisplay text-magenta mb-4 text-2xl font-bold">
              OUR VISION
            </h2>
            <p className="font-lato font-light leading-relaxed text-gray-700">
              {vision}
            </p>
          </div>
        </div>
      </Reveal>

      <section className="w-full bg-white px-5 py-16">
        <div className="lg:mx-auto lg:max-w-6xl">
          <SectionHeading title="OUR STORY">
            {story.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </SectionHeading>
          <Link
            href="/our-journey"
            className="text-magenta font-medium underline-offset-4 hover:underline"
          >
            See the full timeline of our journey &rarr;
          </Link>
        </div>
      </section>

      <section className="w-full px-5 py-16 lg:mx-auto lg:max-w-6xl lg:px-0">
        <SectionHeading title="WHAT WE STAND FOR">
          The principles that shape how we design our programs and how we treat
          the young women and girls who join them.
        </SectionHeading>
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <StaggerItem
              key={value.title}
              className="flex flex-col items-center space-y-3 rounded-md border border-gray-100 bg-white p-8 text-center shadow-lg shadow-gray-300 transition-shadow hover:shadow-xl"
            >
              <span className="text-magenta" aria-hidden="true">
                {React.createElement(value.icon, { size: 32 })}
              </span>
              <h3 className="font-lato text-xl font-medium text-black">
                {value.title}
              </h3>
              <p className="font-lato font-light text-gray-600">
                {value.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="w-full bg-white px-5 py-16">
        <div className="lg:mx-auto lg:max-w-6xl">
          <SectionHeading title="OUR TEAM">
            The people who design our programs, mentor our cohorts, and keep My
            Vision Initiative running.
          </SectionHeading>

          {team.length === 0 ? (
            <p className="font-lato rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center font-light text-gray-500">
              We are putting our team profiles together. In the meantime, you can{" "}
              <Link
                href="#contact"
                className="text-magenta underline underline-offset-4"
              >
                get in touch with us directly
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 text-center shadow-lg shadow-gray-200"
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="aspect-square w-full object-cover"
                    />
                  ) : (
                    <div className="from-purple to-magenta flex aspect-square w-full items-center justify-center bg-gradient-to-br">
                      <span className="font-playfairDisplay text-4xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-playfairDisplay text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-magenta font-lato mb-3 text-sm font-medium">
                      {member.role}
                    </p>
                    <p className="font-lato font-light text-gray-600">
                      {member.bio}
                    </p>
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-magenta mt-4 inline-block text-sm underline-offset-4 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
