import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Seo from "./Seo";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  canonical?: string;
}

function PageLayout({
  children,
  title,
  description,
  image,
  type = "website",
  noIndex = false,
  canonical,
}: PageLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Seo
        title={title}
        description={description}
        image={image}
        type={type}
        noIndex={noIndex}
        canonical={canonical}
      />
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </main>
  );
}

export default PageLayout;
