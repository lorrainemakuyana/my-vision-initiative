import React, { useEffect, useRef, useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";

function Testimonials() {
  const [endedVideo, setEndedVideo] = useState<null | string>(null);
  const playerRefs = useRef<Record<string, any>>({});

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      Object.keys(playerRefs.current).forEach((id) => {
        playerRefs.current[id] = new (window as any).YT.Player(id, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === 0) {
                setEndedVideo(id);
              }
            },
          },
        });
      });
    };
  }, []);

  const videos = [
    { id: "C8BmlSzIkUE", key: "video1" },
    { id: "5u7QZt61VwU", key: "video2" },
  ];

  return (
    <section className="space-y-10 py-20">
      <div className="w-full px-5 lg:mx-auto lg:max-w-6xl lg:px-0">
        {/* Header */}
        <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          <h2 className="font-playfairDisplay text-magenta mb-3 text-4xl font-bold">
            TESTIMONIALS
          </h2>
          <p className=" mx-auto max-w-2xl font-light text-gray-600">
            Hear directly from the young women and girls whose lives have been
            transformed by our programs. Their stories of empowerment, growth,
            and success are a testament to the impact we strive to make every
            day.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {videos.map((video) => (
            <div id={video.key} className="h-full w-full">
              <YouTubeEmbed
                videoid={video.id}
                params="controls=1&rel=0&modestbranding=1&playsinline=1"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
