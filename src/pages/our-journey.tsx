import Journey from "@/components/Journey";
import PageBanner from "@/components/shared/PageBanner";

export default function JourneyPage() {
  return (
    <>
      <PageBanner
        title="Our Journey"
        subtitle="Discover the milestones and stories that have shaped My Vision Initiative into the empowering organization it is today."
      />
      <Journey showTitle={false} />
    </>
  );
}
