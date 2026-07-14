import Link from "next/link";
import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  /** Page 1 lives at the section root, deeper pages at `${basePath}/page/N`. */
  basePath: string;
}

/** Collapses long runs of pages into ellipses: 1 … 4 5 6 … 12 */
function pageItems(page: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items = new Set<number>([1, totalPages, page]);
  if (page > 1) items.add(page - 1);
  if (page < totalPages) items.add(page + 1);

  const sorted = [...items].sort((a, b) => a - b);
  const result: (number | "gap")[] = [];

  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) result.push("gap");
    result.push(value);
  });

  return result;
}

function hrefFor(page: number, basePath: string) {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

function Pagination({ page, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = pageItems(page, totalPages);
  const linkStyles =
    "flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm transition";

  return (
    <nav
      aria-label="News pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1, basePath)}
          rel="prev"
          className={`${linkStyles} border-gray-200 bg-white text-gray-700 hover:border-magenta hover:text-magenta`}
        >
          &larr; Previous
        </Link>
      ) : (
        <span
          className={`${linkStyles} cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300`}
          aria-hidden="true"
        >
          &larr; Previous
        </span>
      )}

      {items.map((item, index) =>
        item === "gap" ? (
          <span
            key={`gap-${index}`}
            className="px-1 text-gray-400"
            aria-hidden="true"
          >
            &hellip;
          </span>
        ) : item === page ? (
          <span
            key={item}
            aria-current="page"
            className={`${linkStyles} border-magenta bg-magenta font-medium text-white`}
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item, basePath)}
            className={`${linkStyles} border-gray-200 bg-white text-gray-700 hover:border-magenta hover:text-magenta`}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1, basePath)}
          rel="next"
          className={`${linkStyles} border-gray-200 bg-white text-gray-700 hover:border-magenta hover:text-magenta`}
        >
          Next &rarr;
        </Link>
      ) : (
        <span
          className={`${linkStyles} cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300`}
          aria-hidden="true"
        >
          Next &rarr;
        </span>
      )}
    </nav>
  );
}

export default Pagination;
