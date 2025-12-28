import Accordion from "@/components/shared/Accordion";
import PageBanner from "@/components/shared/PageBanner";
import { faqs } from "@/lib/faqs";

export default function FAQ() {
  return (
    <>
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about My Vision Initiative and our programs. If you don't see your question here, feel free to reach out to us!"
      />
      <div className="min-h-screen w-full px-5 pb-24 lg:mx-auto lg:w-3/5">
        <Accordion faqs={faqs} />
      </div>
    </>
  );
}
