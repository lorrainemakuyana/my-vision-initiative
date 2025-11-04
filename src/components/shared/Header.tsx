/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import Button from "./Button";

function Header() {
  const router = useRouter();

  const handleDonateClick = () => {
    router.push("/donate");
  };

  return (
    <section className="bg-magenta fixed top-0 z-50 h-20 w-full text-white backdrop-blur-lg  ">
      <div className="m-auto flex h-full w-4/5 items-center justify-between">
        <Link href={"/"}>
          <div className="font-playfair flex flex-row items-center space-x-3 text-xl text-white">
            <img
              src="/images/logo.webp"
              className="h-10 w-10 rounded-md"
              alt="MVI Logo"
            />
            <p>My Vision Initiative</p>
          </div>
        </Link>
        <div className="hidden flex-row items-center lg:flex">
          <Link href="#experience" className=" transition-colors">
            Join a program
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
          <button
            onClick={() => {}}
            className="hover:text-magenta transform rounded-full border-2 border-white bg-transparent px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header;
