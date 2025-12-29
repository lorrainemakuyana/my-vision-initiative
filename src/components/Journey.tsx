import { journeyData } from "@/lib/journey";
import React, { useMemo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

export default function Journey({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section
      id="journey"
      className="w-full bg-white px-4 py-16 sm:px-6 lg:px-10"
    >
      <div className="w-full px-5 lg:mx-auto lg:max-w-6xl lg:px-0">
        {/* Header */}
        {showTitle && (
          <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
            <h2 className="font-playfairDisplay text-magenta mb-3 text-4xl font-bold">
              OUR JOURNEY
            </h2>
            <p className="mx-auto max-w-2xl font-light text-gray-600">
              Every milestone reflects our commitment to empowering women and
              creating lasting change for young women and girls. Here is how far
              we have come:
            </p>
          </div>
        )}
        {/* Timeline */}
        <VerticalTimeline lineColor="#f3f4f6">
          {journeyData.map((item, index) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              position={index % 2 === 0 ? "left" : "right"}
              contentStyle={{
                background: "#f9fafb",
                color: "#000",
                // border: "1px solid #7830fd",
                border: "1.5px solid #E11584",
                borderRadius: "12px",
                padding: "24px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
              }}
              contentArrowStyle={{
                // borderRight: "10px solid #7830fd",
                borderRight: "10px solid #E11584",
              }}
              date={item.date}
              iconStyle={{
                // background: "linear-gradient(135deg, #7830fd 0%, #E11584 100%)",
                background: "#E11584",
                color: "#fff",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              icon={React.createElement(item.icon, { size: 15 })}
            >
              <h3 className="vertical-timeline-element-title pb-1 text-lg font-bold">
                {item.title}
              </h3>
              {item.themes.map((theme, idx) => (
                <span
                  key={idx}
                  className="mb-2 mr-2 inline-block rounded-full border border-gray-700 px-2 py-1 text-sm text-gray-700"
                >
                  {theme}
                </span>
              ))}
              <p className="font-lato font-light! text-center">
                {item.description}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
