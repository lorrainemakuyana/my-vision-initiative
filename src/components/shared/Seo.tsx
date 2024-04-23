import React from "react";
import Head from "next/head";

const defaultMeta = {
  title: "My Vision Initiative",
  siteName: "My Vision Initiative",
  description:
    "An organization on a mission to end teen pregnancy in Zimbabwe through empowerment.",
  url: "https://my-vision-initiative.netlify.app/",
  type: "website",
  robots: "follow, index",
  image: "/images/seo.png",
};

function Seo() {
  return (
    <Head>
      <title>My Vision Initiative</title>
      <meta name="description" content={defaultMeta.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={defaultMeta.title} />
      <meta property="og:description" content={defaultMeta.description} />
      <meta property="og:url" content={defaultMeta.url} />
      <meta property="og:image" content={defaultMeta.image} />
    </Head>
  );
}

export default Seo;
