import Link from "next/link";
import React from "react";
import Seo from "@/components/Seo";
import PageBanner from "@/components/shared/PageBanner";
import SectionHeading from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { givingChannels, givingImpact } from "@/lib/donate";

export default function DonatePage() {
  return (
    <>
      <Seo
        title="Support Our Work"
        description="Support My Vision Initiative. Your gift funds the programs that empower young women and girls across Zimbabwe."
      />
      <PageBanner
        title="Support Our Work"
        subtitle="Our programs are delivered to participants at no cost to them. That is only possible because other people pay for it."
      />

      <section className="w-full px-5 pb-16 lg:mx-auto lg:max-w-6xl lg:px-0">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {givingChannels.map((channel) => (
            <StaggerItem
              key={channel.title}
              className="flex flex-col items-center space-y-3 rounded-md border border-gray-100 bg-white p-8 text-center shadow-lg shadow-gray-300 transition-shadow hover:shadow-xl"
            >
              <span className="text-magenta" aria-hidden="true">
                {React.createElement(channel.icon, { size: 32 })}
              </span>
              <h2 className="font-lato text-xl font-medium text-black">
                {channel.title}
              </h2>
              <p className="font-lato grow font-light text-gray-600">
                {channel.description}
              </p>

              {channel.href ? (
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-magenta mt-2 rounded-md px-5 py-2 font-light text-white shadow-md transition hover:opacity-90"
                >
                  {channel.cta ?? "Donate"}
                </a>
              ) : (
                /* No verified payment channel is configured yet, so route the
                   donor to a human rather than to a dead or guessed-at link. */
                <Link
                  href="#contact"
                  className="border-magenta text-magenta mt-2 rounded-md border px-5 py-2 font-light transition hover:bg-magenta hover:text-white"
                >
                  Get in touch to give
                </Link>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {givingImpact.length > 0 && (
        <section className="w-full bg-white px-5 py-16">
          <div className="lg:mx-auto lg:max-w-6xl">
            <SectionHeading title="WHAT YOUR GIFT DOES">
              A direct line between what you give and what it pays for.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {givingImpact.map((item) => (
                <div
                  key={item.amount}
                  className="border-magenta rounded-lg border-l-4 bg-gray-50 p-6"
                >
                  <p className="font-playfairDisplay text-magenta text-2xl font-bold">
                    {item.amount}
                  </p>
                  <p className="font-lato mt-2 font-light text-gray-700">
                    {item.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full px-5 py-16 lg:mx-auto lg:max-w-6xl lg:px-0">
        <SectionHeading title="OTHER WAYS TO HELP">
          Money is not the only thing we need.
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200">
            <h3 className="font-playfairDisplay text-magenta mb-3 text-xl font-bold">
              Give your time
            </h3>
            <p className="font-lato mb-4 font-light text-gray-600">
              Mentors, facilitators and industry experts are how our programs
              actually get delivered.
            </p>
            <Link
              href="/volunteer"
              className="text-magenta font-medium underline-offset-4 hover:underline"
            >
              Volunteer with us &rarr;
            </Link>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200">
            <h3 className="font-playfairDisplay text-magenta mb-3 text-xl font-bold">
              Partner with us
            </h3>
            <p className="font-lato mb-4 font-light text-gray-600">
              Organizations, schools and funders who want to work with us on a
              cohort or a program.
            </p>
            <Link
              href="#contact"
              className="text-magenta font-medium underline-offset-4 hover:underline"
            >
              Start a conversation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
