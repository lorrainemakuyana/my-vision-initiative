/* eslint-disable @next/next/no-img-element */
import React from "react";

function Featured() {
  return (
    <section
      className="gradient-left w-full py-12 sm:py-16 lg:py-20"
      id="featured"
    >
      <div className="mx-auto w-4/5">
        <h1 className="font-playfairDisplay text-4xl text-white">
          Featured Engagements
        </h1>
        <div className="flex h-full flex-col items-center justify-between lg:flex-row">
          <div className="mt-5 w-full lg:mt-0 lg:w-2/5">
            <p className="font-playfairDisplay text-2xl text-white">
              The Get Engaged Conference
            </p>
            <p className="font-playfairDisplay text-lg font-light text-gray-200">
              Bishkek, Kyrgyzstan
            </p>
            <p className="font-playfairDisplay mt-5 font-light leading-relaxed tracking-wide text-gray-50">
              In June 2022, My Vision Initiative was invited to showcase its
              programs at the Get Engaged Conference. Student leaders from all
              over the world studying at OSUN institutions graced the
              conference. Following the conference, My Vision Initiative has
              been invited to speak on several occasions, in line with its
              values of creating meaningful partnerships for the benefit of
              young women and girls.
            </p>
          </div>
          <img
            src="/images/poster.webp"
            className="mt-10 sm:mt-20 sm:w-1/2 lg:mt-0 lg:w-1/3"
            alt="MVI Poster"
          />
        </div>
      </div>
    </section>
  );
}

export default Featured;
