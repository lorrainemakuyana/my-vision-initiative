import "@/styles/globals.css";
import "react-vertical-timeline-component/style.min.css";

import type { AppProps } from "next/app";
import Layout from "@/components/shared/PageLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
