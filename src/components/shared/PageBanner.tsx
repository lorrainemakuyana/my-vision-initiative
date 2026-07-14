import React from "react";

function PageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-inherit pb-16 pt-36">
      <div className="container mx-auto px-4">
        <h1 className="font-playfairDisplay text-magenta text-center text-4xl font-bold md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="font-lato mt-4 text-center text-lg font-light text-gray-500 lg:mx-auto lg:w-1/2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageBanner;
