import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="border-[0.5px] border-t border-t-gray-200 bg-white p-10 text-center text-base text-black ">
      <div className="mx-auto max-w-7xl text-center">
        <a
          href="#"
          className="flex items-center justify-center text-2xl font-semibold text-gray-900 "
        >
          <img
            src="/images/logo.webp"
            className="mr-4 h-10 rounded-sm"
            alt="My Vision Initiative Logo"
          />
          My Vision Initiative
        </a>
        <p className="my-6 font-light text-black">
          Empowering young women and girls in Zimbabwe
        </p>
        <ul className="text-magenta mb-6 flex flex-wrap items-center justify-center ">
          <li>
            <Link href="/" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link href="/our-journey" className="mr-4 hover:underline md:mr-6">
              Our Journey
            </Link>
          </li>
          <li>
            <Link href="/programs" className="mr-4 hover:underline md:mr-6 ">
              Programs
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="mr-4 hover:underline md:mr-6">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="#contact" className="mr-4 hover:underline md:mr-6">
              Contact
            </Link>
          </li>
        </ul>
        <span className="text-sm font-light text-gray-500 sm:text-center">
          &copy; 2020-{new Date().getFullYear()}{" "}
          <a href="#" className="hover:underline">
            My Vision Initiative
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
