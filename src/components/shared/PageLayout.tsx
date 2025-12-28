import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Seo from "../Seo";
import Contact from "../Contact";

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
    <>
      <Seo
        title={title}
        description={description}
        image={image}
        type={type}
        noIndex={noIndex}
        canonical={canonical}
      />
      <Header />
      <main className="font-lato flex min-h-screen flex-col bg-gray-100">
        <div className="grow">{children}</div>
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default PageLayout;
