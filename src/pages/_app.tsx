import "@/styles/globals.css";
import "react-vertical-timeline-component/style.min.css";

import type { AppProps } from "next/app";
import { Lato, Playfair_Display } from "next/font/google";
import Layout from "@/components/shared/PageLayout";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato-sans",
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${playfairDisplay.variable} ${lato.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default App;
