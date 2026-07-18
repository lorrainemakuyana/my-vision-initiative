import Head from "next/head";
import { useRouter } from "next/router";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
  canonical?: string;
}

const defaultMeta = {
  siteName: "My Vision Initiative",
  defaultTitle: "My Vision Initiative - Empowering Young women and girls in Zimbabwe",
  defaultDescription:
    "My Vision Initiative is a registered organization in Zimbabwe on a mission to empower young women and girls through curated programs!",
  siteUrl: "https://myvisioninitiative.org",
  // /images/logo.png never existed, so every shared link rendered without a
  // preview image. og.png is the 1200x661 share card.
  defaultImage: "/images/og.png",
  defaultImageWidth: "1200",
  defaultImageHeight: "661",
  twitterHandle: "@mvi_initiative",
  locale: "en_US",
  themeColor: "#E11584",
  keywords:
    "my vision initiative, women empowerment, women's organizations in zimbabwe, women empowerment zimbabwe, youth organization, ngo, non-profit organization",
};

export default function Seo({
  title,
  description = defaultMeta.defaultDescription,
  image = defaultMeta.defaultImage,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  noIndex = false,
  canonical,
}: SeoProps) {
  const router = useRouter();

  // Construct full title
  const fullTitle = title
    ? `${title} | ${defaultMeta.siteName}`
    : defaultMeta.defaultTitle;

  // Construct full URL
  const fullUrl = `${defaultMeta.siteUrl}${router.asPath}`;

  // Construct full image URL
  const isDefaultImage = image === defaultMeta.defaultImage;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${defaultMeta.siteUrl}${image}`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: defaultMeta.siteName,
    description: defaultMeta.defaultDescription,
    url: defaultMeta.siteUrl,
    logo: `${defaultMeta.siteUrl}/images/logo.webp`,
    sameAs: [
      "https://web.facebook.com/myvisioninitiative/",
      "https://twitter.com/mvi_initiative",
      "https://www.instagram.com/myvisioninitiative/",
      "https://www.linkedin.com/company/my-vision-initiative/",
      "https://www.youtube.com/channel/UC2doZCOhujqVWHP3DoamDwg",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "myvisioninitiative@gmail.com",
      contactType: "General Inquiry",
    },
    areaServed: "Zimbabwe",
    foundingLocation: "Zimbabwe",
  };

  // A news post is a BlogPosting, not the organization. Emitting only the
  // Organization schema on an article leaves search engines without a headline,
  // author or publish date to show for it.
  const article =
    type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description,
          image: fullImageUrl,
          url: fullUrl,
          mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
          ...(publishedTime && { datePublished: publishedTime }),
          ...(modifiedTime && { dateModified: modifiedTime }),
          ...(author && { author: { "@type": "Person", name: author } }),
          publisher: {
            "@type": "Organization",
            name: defaultMeta.siteName,
            logo: {
              "@type": "ImageObject",
              url: `${defaultMeta.siteUrl}/images/logo.webp`,
            },
          },
          ...(tags.length > 0 && { keywords: tags.join(", ") }),
        }
      : null;

  const structuredData = article ?? organization;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {/* A post's own tags are more specific than the site-wide keywords, so
          they replace them rather than being emitted as a second tag. */}
      <meta
        name="keywords"
        content={tags.length > 0 ? tags.join(", ") : defaultMeta.keywords}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content={defaultMeta.themeColor} />

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <meta
        name="googlebot"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || fullUrl} />

      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="en" />
      <meta property="og:locale" content={defaultMeta.locale} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      {/* Only declare dimensions for the image we control. A post's cover comes
          from Notion at an unknown size, and asserting the wrong dimensions
          makes scrapers crop or reject the preview. */}
      {isDefaultImage && (
        <>
          <meta
            property="og:image:width"
            content={defaultMeta.defaultImageWidth}
          />
          <meta
            property="og:image:height"
            content={defaultMeta.defaultImageHeight}
          />
        </>
      )}
      <meta property="og:image:alt" content={title || defaultMeta.siteName} />

      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title || defaultMeta.siteName} />

      {/* Favicons */}
      <link rel="icon" href="/mvi.png" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Lets readers and aggregators discover the news feed automatically. */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="My Vision Initiative — News & Stories"
        href="/feed.xml"
      />

      {/* Additional Meta Tags */}
      <meta name="author" content={author || "My Vision Initiative"} />
      <meta name="publisher" content="My Vision Initiative" />
      <meta name="format-detection" content="telephone=no" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}
