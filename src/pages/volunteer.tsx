import React from "react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import PageBanner from "@/components/shared/PageBanner";
import SectionHeading from "@/components/shared/SectionHeading";
import { volunteerRoles, whyVolunteer } from "@/lib/volunteer";

function VolunteerPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Sending your application...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed. Please try again");
      }

      toast.success("Thank you! We will be in touch soon.");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(loadingToastId);
      setIsSubmitting(false);
    }
  }

  const fieldStyles =
    "focus:border-magenta focus:ring-magenta w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-light text-black outline-none focus:ring-1";

  return (
    <>
      <Seo
        title="Volunteer with Us"
        description="Volunteer with My Vision Initiative as a mentor, facilitator or expert, and help empower young women and girls across Zimbabwe."
      />
      <PageBanner
        title="Volunteer with Us"
        subtitle="Our programs are delivered by the MVI team alongside carefully selected industry experts. If that sounds like you, we would like to hear from you."
      />

      <section className="w-full px-5 pb-16 lg:mx-auto lg:max-w-6xl lg:px-0">
        <SectionHeading title="WHY VOLUNTEER">
          {whyVolunteer.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </SectionHeading>
      </section>

      <section className="w-full bg-white px-5 py-16">
        <div className="lg:mx-auto lg:max-w-6xl">
          <SectionHeading title="HOW YOU CAN HELP">
            Four ways to give your time. If none of them quite fit what you do,
            tell us anyway — the list is not exhaustive.
          </SectionHeading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {volunteerRoles.map((role) => (
              <div
                key={role.title}
                className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-md"
              >
                <span className="text-magenta shrink-0" aria-hidden="true">
                  {React.createElement(role.icon, { size: 28 })}
                </span>
                <div>
                  <h3 className="font-playfairDisplay text-xl font-bold text-gray-900">
                    {role.title}
                  </h3>
                  <p className="text-magenta font-lato mb-2 text-sm font-medium">
                    {role.commitment}
                  </p>
                  <p className="font-lato font-light text-gray-600">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-16 lg:mx-auto lg:max-w-6xl lg:px-0">
        <SectionHeading title="APPLY TO VOLUNTEER">
          Tell us who you are and how you would like to help. We read every
          application and will get back to you.
        </SectionHeading>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-lg shadow-gray-200 md:p-8"
        >
          {/* Honeypot: hidden from people, irresistible to bots. */}
          <input
            type="text"
            name="honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="mb-5">
            <label
              htmlFor="volunteer-name"
              className="font-lato mb-2 block font-medium text-black"
            >
              Your name
            </label>
            <input
              id="volunteer-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={fieldStyles}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="volunteer-email"
              className="font-lato mb-2 block font-medium text-black"
            >
              Email address
            </label>
            <input
              id="volunteer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={fieldStyles}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="volunteer-role"
              className="font-lato mb-2 block font-medium text-black"
            >
              How would you like to help?
            </label>
            <select
              id="volunteer-role"
              name="role"
              required
              defaultValue=""
              className={fieldStyles}
            >
              <option value="" disabled>
                Select a role
              </option>
              {volunteerRoles.map((role) => (
                <option key={role.title} value={role.title}>
                  {role.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="volunteer-message"
              className="font-lato mb-2 block font-medium text-black"
            >
              Tell us about yourself{" "}
              <span className="font-light text-gray-400">(optional)</span>
            </label>
            <textarea
              id="volunteer-message"
              name="message"
              rows={5}
              placeholder="Your experience, what you would bring, and anything else we should know. Links to a profile or portfolio are welcome."
              className={fieldStyles}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-magenta w-full cursor-pointer rounded-md px-6 py-3 font-light text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Submit application"}
          </button>
        </form>
      </section>
    </>
  );
}

export default VolunteerPage;
