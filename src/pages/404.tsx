import Link from "next/link";
import React from "react";

function PageNotFound() {
  return (
    /* PageLayout already provides the <main> landmark; a second one nested
       inside it is invalid and confuses screen readers. */
    <section className="flex min-h-[60vh] items-center justify-center bg-gray-100 px-6 py-24">
      <div className="text-center">
        <h1 className="font-playfairDisplay text-magenta mb-4 text-3xl font-bold md:text-4xl">
          Oops! We cannot find that page.
        </h1>

        <p className="font-lato mx-auto mb-8 max-w-md font-light text-gray-600">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to something useful.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="bg-magenta transform rounded-md px-6 py-3 font-light text-white shadow-md transition hover:scale-105"
          >
            Back to home
          </Link>
          <Link
            href="/news"
            className="border-magenta text-magenta hover:bg-magenta transform rounded-md border px-6 py-3 font-light transition hover:scale-105 hover:text-white"
          >
            Read our latest news
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
