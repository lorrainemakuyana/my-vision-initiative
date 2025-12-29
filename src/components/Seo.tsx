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
  defaultImage: "/images/logo.png",
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
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${defaultMeta.siteUrl}${image}`;

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: defaultMeta.siteName,
    description: description,
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

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={defaultMeta.keywords} />
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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
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

      {/* Additional Meta Tags */}
      <meta name="author" content="My Vision Initiative" />
      <meta name="publisher" content="My Vision Initiative" />
      <meta name="format-detection" content="telephone=no" />

      {/* Keywords (if provided) */}
      {tags.length > 0 && <meta name="keywords" content={tags.join(", ")} />}

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
