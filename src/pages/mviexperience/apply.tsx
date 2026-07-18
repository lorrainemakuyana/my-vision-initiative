import React from "react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import PageBanner from "@/components/shared/PageBanner";
import RatingMatrix from "@/components/mviexperience/RatingMatrix";

const fieldStyles =
  "focus:border-magenta focus:ring-magenta w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-light text-black outline-none focus:ring-1";

const labelStyles = "font-lato mb-2 block font-medium text-black";
const hintStyles = "font-lato mb-2 text-sm font-light text-gray-500";
const required = <span className="text-magenta">*</span>;

function Field({
  label,
  htmlFor,
  isRequired,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  isRequired?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <label htmlFor={htmlFor} className={labelStyles}>
        {label} {isRequired && required}
      </label>
      {hint && <p className={hintStyles}>{hint}</p>}
      {children}
    </div>
  );
}

export default function MviExperienceApply() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Submitting your application...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/mviexperience-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed. Please try again");
      }

      toast.success(
        "Your application has been submitted. We will be in touch by email.",
      );
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(loadingToastId);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Apply for the #MVIExperience"
        description="Apply to join the #MVIExperience — My Vision Initiative's flagship program for young women and girls aged 15–21 in Zimbabwe."
      />
      <PageBanner
        title="Apply for the #MVIExperience"
        subtitle="Tell us about yourself. Fields marked with an asterisk are required. If you are shortlisted, we will reach out by email."
      />

      <section className="w-full px-5 pb-24 lg:mx-auto lg:max-w-3xl lg:px-0">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow-lg shadow-gray-200 md:p-10"
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

          <fieldset className="mb-6">
            <legend className={labelStyles}>
              Kindly confirm your gender {required}
            </legend>
            <p className={hintStyles}>
              This program is open to young women and girls only.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Female", "Male"].map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    required
                    className="accent-magenta h-4 w-4"
                  />
                  <span className="font-lato font-light text-gray-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <Field label="Your full name" htmlFor="fullName" isRequired>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              className={fieldStyles}
            />
          </Field>

          <Field
            label="Your date of birth"
            htmlFor="dob"
            isRequired
            hint="This is for us to confirm how old you are. A confirmation document may be required if you are shortlisted."
          >
            <input
              id="dob"
              name="dob"
              type="date"
              required
              className={fieldStyles}
            />
          </Field>

          <Field label="Your home address" htmlFor="address" isRequired>
            <textarea
              id="address"
              name="address"
              rows={2}
              required
              autoComplete="street-address"
              className={fieldStyles}
            />
          </Field>

          <Field
            label="Your calls/WhatsApp number"
            htmlFor="phone"
            isRequired
            hint="It is best for you to submit a number we can contact by phone call."
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={fieldStyles}
            />
          </Field>

          <Field
            label="Your email address that you can check often"
            htmlFor="email"
            isRequired
            hint="All communications will be made via this email address, so make sure it is valid and you have written it correctly."
          >
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={fieldStyles}
            />
          </Field>

          <Field
            label="Parent/Guardian's details"
            htmlFor="guardian"
            isRequired
            hint="Their name and contact number."
          >
            <textarea
              id="guardian"
              name="guardian"
              rows={2}
              required
              className={fieldStyles}
            />
          </Field>

          <Field label="Your Instagram handle (if any)" htmlFor="instagram">
            <input
              id="instagram"
              name="instagram"
              type="text"
              className={fieldStyles}
            />
          </Field>

          <Field label="Your Facebook username (if any)" htmlFor="facebook">
            <input
              id="facebook"
              name="facebook"
              type="text"
              className={fieldStyles}
            />
          </Field>

          <div className="mb-6">
            <RatingMatrix />
          </div>

          <Field
            label="What do you hope to learn from this program, and why do you want to join the MVI Fellows Network?"
            htmlFor="motivation"
            isRequired
            hint="Tell us about yourself, your vision, ambition and passion; where you see yourself now and why the program benefits you; and what you will do to ensure other girls in your community benefit through you."
          >
            <textarea
              id="motivation"
              name="motivation"
              rows={7}
              required
              className={fieldStyles}
            />
          </Field>

          <Field
            label="Do you need any support or adjustment to enable you to participate in the program?"
            htmlFor="support"
            hint="If so, tell us more here."
          >
            <textarea
              id="support"
              name="support"
              rows={3}
              className={fieldStyles}
            />
          </Field>

          <fieldset className="mb-6">
            <legend className={labelStyles}>
              If you are under 18, please confirm that your parent consents to
              your participation in this program {required}
            </legend>
            <p className={hintStyles}>This will be verified by the team.</p>
            <div className="flex flex-wrap gap-4">
              {["Yes", "No"].map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="parentalConsent"
                    value={option}
                    required
                    className="accent-magenta h-4 w-4"
                  />
                  <span className="font-lato font-light text-gray-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mb-8">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="confirmation"
                value="Yes"
                required
                className="accent-magenta mt-1 h-4 w-4 shrink-0"
              />
              <span className="font-lato font-light text-gray-700">
                I confirm that all information is truthfully presented and my
                work alone. This will represent your signature. {required}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-magenta w-full cursor-pointer rounded-md px-6 py-3 font-light text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit application"}
          </button>
        </form>
      </section>
    </>
  );
}
