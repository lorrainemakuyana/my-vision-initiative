import Link from "next/link";
import React from "react";

function PageNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="animate-fade-in text-center">
        <h1 className="text-magenta mb-4 text-xl font-extrabold md:text-3xl">
          Oops! We cannot find that page.
        </h1>

        <p className="mx-auto mb-8 max-w-md text-gray-600">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to something useful.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="bg-magenta transform rounded-md px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
