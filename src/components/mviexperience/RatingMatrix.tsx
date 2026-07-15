import React from "react";
import { ratingAbilities, ratingScale } from "@/lib/mviexperience";

/**
 * A required self-assessment: one radio group per ability, rated on a shared
 * five-point scale.
 *
 * Rendered as a single set of inputs that reflows responsively. On md+ it reads
 * as a matrix — a header row of scale labels, radios aligned beneath — with each
 * radio's own label hidden (`md:sr-only`) since the column header already names
 * it. On small screens the header is hidden and every radio shows its label, so
 * a phone user is never guessing which unlabelled dot means what.
 */
const gridCols = "md:grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))]";

function RatingMatrix() {
  return (
    <fieldset>
      <legend className="font-lato mb-2 block font-medium text-black">
        Please rate your abilities as truthfully as possible{" "}
        <span className="text-magenta">*</span>
      </legend>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        {/* Column headers — desktop only. */}
        <div
          className={`hidden bg-gray-50 md:grid ${gridCols} md:items-center md:gap-2 md:px-4 md:py-3`}
          aria-hidden="true"
        >
          <span />
          {ratingScale.map((label) => (
            <span
              key={label}
              className="font-lato text-center text-sm font-medium text-gray-600"
            >
              {label}
            </span>
          ))}
        </div>

        {ratingAbilities.map((ability, index) => (
          <fieldset
            key={ability.name}
            className={`grid grid-cols-1 gap-2 px-4 py-4 md:grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))] md:items-center ${
              index > 0 ? "border-t border-gray-100" : ""
            }`}
          >
            <legend className="font-lato float-left mb-2 font-light text-gray-800 md:float-none md:mb-0">
              {ability.label}
            </legend>

            {ratingScale.map((value) => {
              const id = `${ability.name}-${value.replace(/\s+/g, "-")}`;
              return (
                <label
                  key={value}
                  htmlFor={id}
                  className="flex cursor-pointer items-center gap-2 md:justify-center"
                >
                  <input
                    id={id}
                    type="radio"
                    name={ability.name}
                    value={value}
                    required
                    className="accent-magenta h-4 w-4"
                  />
                  <span className="font-lato text-sm font-light text-gray-600 md:sr-only">
                    {value}
                  </span>
                </label>
              );
            })}
          </fieldset>
        ))}
      </div>
    </fieldset>
  );
}

export default RatingMatrix;
