import React from "react";

/**
 * The two-column "heading on the left, intro on the right" block that every
 * section on the site already used by hand.
 */
function SectionHeading({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
      <h2 className="font-playfairDisplay text-magenta mb-3 text-4xl font-bold">
        {title}
      </h2>
      {children && (
        <div className="font-lato mx-auto max-w-2xl font-light text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
}

export default SectionHeading;
