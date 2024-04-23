/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Button from "./Button";

function Header() {
  return (
    <section className="sticky top-0 z-50 h-20 w-full bg-magenta">
      <div className="m-auto flex h-full w-4/5 items-center justify-between">
        <div className="font-playfairDisplay flex flex-row items-center space-x-3 text-xl font-bold tracking-wider text-white">
          <img src="/images/logo.webp" className="h-10 w-10" alt="MVI Logo" />
          <p>My Vision Initiative</p>
        </div>
        <div className="hidden flex-row space-x-5 text-sm lg:flex">
          <Link href="#about">About Us</Link>
          <Link href="#programs">Programs</Link>
          <Link href="#featured">Featured</Link>
        </div>
        <div className="hidden lg:flex">
          {/* <Button text="Donate" onClick={() => {}} color="white" /> */}
          <Link
            href="#contact"
            className="font-playfairDisplay rounded-full border border-white bg-transparent px-6 py-2 text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Header;
