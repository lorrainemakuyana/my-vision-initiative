/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/news", label: "News" },
  { href: "/volunteer", label: "Volunteer" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    router.events.on("routeChangeComplete", closeMenu);
    router.events.on("hashChangeComplete", closeMenu);
    return () => {
      router.events.off("routeChangeComplete", closeMenu);
      router.events.off("hashChangeComplete", closeMenu);
    };
  }, [router.events]);

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

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="mr-6 cursor-pointer rounded-md p-2 transition-colors hover:bg-white/10 lg:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
        >
          {isMenuOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
        </button>

        <div className="hidden flex-row items-center lg:flex">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && (
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 4 4"
                  fill="none"
                  className="mx-3"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="2" fill="white" />
                </svg>
              )}
              <Link
                href={link.href}
                className="transform underline-offset-4 transition-colors hover:scale-110 hover:underline"
              >
                {link.label}
              </Link>
            </React.Fragment>
          ))}
          <Link
            href="/donate"
            className="font-lato text-magenta ml-5 transform rounded-md bg-white px-4 py-2 shadow-md transition hover:scale-105 hover:bg-gray-100 hover:shadow-lg"
          >
            Support Us
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="bg-magenta border-t border-white/20 px-6 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block border-b border-white/10 py-3 text-lg underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/donate"
            className="font-lato text-magenta mt-5 block rounded-md bg-white px-4 py-3 text-center shadow-md transition hover:bg-gray-100"
          >
            Support Us
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
