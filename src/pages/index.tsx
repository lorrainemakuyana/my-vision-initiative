import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Featured from "@/components/Featured";
import Programs from "@/components/Programs";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Seo from "@/components/shared/Seo";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Seo />
      <Header />
      <Banner />
      <Featured />
      <Programs />
      <Contact />
      <Footer />
    </main>
  );
}
