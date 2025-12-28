/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <nav className="bg-magenta fixed start-0 top-0 z-20 w-full text-white shadow-md">
      <div className="mx-auto flex h-20 w-full max-w-6xl flex-wrap items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-3 pl-6 lg:px-0 rtl:space-x-reverse"
        >
          <img
            src="/images/mvi-text.png"
            className="-mb-2 h-8 w-auto rounded-md"
            alt="MVI Logo"
          />
        </Link>
        <div className="hidden flex-row items-center lg:flex">
          <Link
            href="/our-journey"
            className="transform underline-offset-4 transition-colors hover:scale-110 hover:underline"
          >
            Our Journey
          </Link>
          <svg
            width="6"
            height="6"
            viewBox="0 0 4 4"
            fill="none"
            className="mx-4"
          >
            <circle cx="2" cy="2" r="2" fill="white" />
          </svg>
          <Link
            href="/programs"
            className="transform underline-offset-4 transition-colors hover:scale-110 hover:underline"
          >
            Programs
          </Link>
          <svg
            width="6"
            height="6"
            viewBox="0 0 4 4"
            fill="none"
            className="mx-4"
          >
            <circle cx="2" cy="2" r="2" fill="white" />
          </svg>
          <Link
            href="/volunteer"
            className="mr-5 transform underline-offset-4 transition-colors hover:scale-110 hover:underline"
          >
            Volunteer
          </Link>
          <Link
            href="#contact"
            className="
            font-lato text-magenta transform rounded-md bg-white px-4 py-2 shadow-md transition hover:scale-105 hover:bg-gray-100 hover:shadow-lg
          "
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
