import React from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "sonner";

function Contact() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loadingToastId = toast.loading("Sending your message...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // TODO: Implement actual form submission logic
      //   const response = await fetch("/api/contact", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(Object.fromEntries(formData)),
      //   });

      //   const data = await response.json();

      //   if (!response.ok) {
      //     throw new Error(data.error || "Request failed. Please try again");
      //   }

      toast.success("Your message has been sent successfully!");
      form.reset();
    } catch (error) {
      // Catch both errors and respond accordingly
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  return (
    <section className="w-full bg-white px-4 py-16" id="contact">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          <h2 className="font-playfairDisplay text-magenta mb-3 text-4xl font-bold">
            CONTACT US
          </h2>
          <p className=" mx-auto max-w-2xl text-gray-500">
            If you have any questions, please feel free to get in touch with us
            via email, or even on social media! We are here to help empower
            young women and girls in Zimbabwe.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          {/* Left: Form */}
          <div className="rounded-xl bg-gray-100 p-6 md:p-8">
            <h3 className="font-playfairDisplay mb-6 text-lg font-semibold text-black">
              GET IN TOUCH
              <hr className="mt-2 h-0.5 w-full text-gray-300" />
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className=" mb-1 block text-sm font-medium text-black">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="focus:ring-magenta w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className=" mb-1 block text-sm font-medium text-black">
                    Phone Number (with country code)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    className="focus:ring-magenta w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className=" mb-1 block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="focus:ring-magenta w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className=" mb-1 block text-sm font-medium text-black">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className=" focus:ring-magenta w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="bg-magenta w-full rounded-md py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex h-full flex-col space-y-5">
            {/* Contact Info */}
            <div className="rounded-xl bg-gray-100 p-5 md:p-8">
              <h3 className="font-playfairDisplay mb-6 text-lg font-semibold text-black">
                CONTACT INFORMATION
                <hr className="mt-2 h-0.5 w-full text-gray-300" />
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MdOutlineEmail className="text-magenta mt-0.5 h-6 w-6" />
                  <div>
                    <p className=" text-sm font-semibold text-black">EMAIL</p>
                    <p className=" text-gray-600">
                      {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaWhatsapp className="text-magenta mt-0.5 h-6 w-6" />
                  <div>
                    <p className=" text-sm font-semibold text-black">
                      WHATSAPP
                    </p>
                    <a
                      href={process.env.NEXT_PUBLIC_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-magenta transition-colors hover:text-purple-800"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_WHATSAPP}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaInstagram className="text-magenta mt-0.5 h-6 w-6" />
                  <div>
                    <p className=" text-sm font-semibold text-black">
                      INSTAGRAM
                    </p>
                    <a
                      href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-magenta transition-colors hover:text-purple-800"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex h-full flex-1 flex-col rounded-xl bg-gray-100 p-6 md:p-8">
              <h3 className="font-playfairDisplay text-lg font-semibold text-black">
                BUSINESS HOURS
                <p className=" mt-2 text-sm font-normal text-gray-600">
                  All times are in Central African Time (GMT+2)
                </p>
                <hr className="mt-2 h-0.5 w-full text-gray-300" />
              </h3>

              <div className="flex-1" />

              <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                <div>
                  <p className=" text-sm font-semibold text-black">
                    MONDAY - FRIDAY
                  </p>
                  <p className=" text-gray-600">8:00 am - 5:00 pm</p>
                </div>
                <div>
                  <p className=" text-sm font-semibold text-black">SATURDAY</p>
                  <p className=" text-gray-600">9:00 am - 3:00 pm</p>
                </div>
                <div>
                  <p className=" text-sm font-semibold text-black">SUNDAY</p>
                  <p className=" text-gray-600">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
