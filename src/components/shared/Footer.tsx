import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerLinks: { heading: string; links: { href: string; label: string }[] }[] =
  [
    {
      heading: "Explore",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/our-journey", label: "Our Journey" },
        { href: "/programs", label: "Programs" },
        { href: "/impact", label: "Our Impact" },
      ],
    },
    {
      heading: "Get involved",
      links: [
        { href: "/volunteer", label: "Volunteer" },
        { href: "/donate", label: "Support Us" },
        { href: "/events", label: "Events" },
        { href: "#contact", label: "Contact" },
      ],
    },
    {
      heading: "Stay updated",
      links: [
        { href: "/news", label: "News & Stories" },
        { href: "/faqs", label: "FAQs" },
        { href: "/feed.xml", label: "RSS Feed" },
      ],
    },
  ];

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center text-xl font-semibold text-gray-900"
            >
              <Image
                src="/images/logo.webp"
                width={40}
                height={40}
                className="mr-3 h-10 w-auto rounded-sm"
                alt="My Vision Initiative Logo"
              />
              My Vision Initiative
            </Link>
            <p className="font-lato mt-4 font-light text-gray-600">
              Empowering young women and girls in Zimbabwe.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.heading}>
              <h2 className="font-playfairDisplay mb-4 font-bold text-gray-900">
                {column.heading}
              </h2>
              <ul className="font-lato space-y-2 font-light">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-magenta text-gray-600 underline-offset-4 transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center">
          <span className="font-lato text-sm font-light text-gray-500">
            &copy; 2020-{new Date().getFullYear()} My Vision Initiative. All
            Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
