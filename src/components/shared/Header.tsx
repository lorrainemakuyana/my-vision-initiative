/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
function Header() {
  const router = useRouter();

  return (
    <nav className="bg-magenta fixed start-0 top-0 z-20 w-full shadow-md">
      <div className="mx-auto flex h-20 max-w-7xl flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/images/mvi-text.png"
            className="-mb-2 h-8 w-auto rounded-md"
            alt="MVI Logo"
          />
        </Link>
        <div className="hidden flex-row items-center lg:flex">
          <Link href="/about" className=" transition-colors">
            About
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
          <Link href="#journey" className=" transition-colors">
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
          <Link href="/programs" className=" transition-colors">
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
          <Link href="/volunteer" className=" mr-5 transition-colors">
            Volunteer
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
