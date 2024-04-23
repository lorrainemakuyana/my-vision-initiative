import React from "react";

const steps = [
  {
    title: "Call for applications.",
    description:
      " Applications calls are usually advertised on our Instagram Page and you can apply via the link that will be shared. Also, you can reach out to us via Email to find out if applications are open and to request a link to apply.",
  },
  {
    title: "Apply.",
    description:
      "Fill in the application form before the due date to apply for a spot on the program. Whilst applying, take care to highlight your experiences, why you want to join the program, your career goals, how MVI will help you achieve them, and your goals as a future leader. Also, try to join a live info session to hear from our team first hand what we are looking out for in your application.",
  },
  {
    title: "Application Review.",
    description:
      "Applications are reviewed on a rolling basis. We will reach out to all applications via email latest two weeks after the application deadline. If shortlisted, you will be invited for a virtual interview with one or two of our team members.",
  },
  {
    title: "Final Review after Interviews.",
    description:
      "After interviews are done and reviewed, MVI will select and roll out the final participant list for the particular cohort. All interviewees should expect to hear from MVI within a week after their interview.",
  },
  {
    title: "Notifications and Launch.",
    description: "The program starts.",
  },
];
function Programs() {
  return (
    <section className="w-full pt-10 md:pt-20" id="programs">
      <div className="mx-auto w-[95%] sm:w-4/5 lg:w-3/5">
        <h1 className="font-playfairDisplay text-center text-4xl text-black">
          The #MVIExperience
        </h1>
        <div className="text-black">
          <h1 className="text-center text-xl leading-relaxed text-purple">
            A chance to set yourself on course, bringing out the best you.
          </h1>
          <p className="font-lato mt-3 px-5 text-center text-base font-light lg:px-0">
            This Program is created and designed for young women and girls aged
            15-21 years. It gives a first-hand experience of MVI as a whole and
            delivered by the MVI Team and industry experts in chosen fields to
            inspire and motivate young women and girls into becoming
            dreamchasers, changemakers, and fearless women who take up space.
            The program is offered mostly virtually via Zoom and WhatsApp, and
            will soon be launched on a downloadable application or webpage.
            Stipends to cater for data costs will be provided for participants
            and although rigorous and intensive, this program is so far the best
            way to access MVI resources and interact with us first hand.
          </p>
          <p className="font-playfairDisplay mt-7 text-center text-2xl text-purple">
            How you can be a part of our next cohort!
          </p>
          <div className="mt-5 px-5 lg:px-20">
            <ol className="space-y-5">
              {steps.map((step, index) => (
                <li key={index} className=" text-center text-black">
                  <p className="font-playfairDisplay text-lg font-bold">
                    <span className="font-playfairDisplay  mr-2 text-purple">
                      Step {index + 1}:
                    </span>
                    {step.title}
                  </p>
                  <p className="font-lato font-light">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="gradient-left mt-16 flex flex-col items-center justify-center py-14 text-white px-5 lg:py-20">
        <h1 className="font-playfairDisplay text-center text-3xl">
          Make a difference in your life today, join the program!
        </h1>
        <p className="font-playfairDisplay my-5 text-center text-lg text-gray-100">
          The 2024-25 MVI Program will be launching soon. Reserve your spot
          today!
        </p>
        <button
          className="font-playfairDisplay rounded-full border-2 border-white bg-transparent px-6 py-2 text-white"
          onClick={() => window.open("https://forms.gle/ZtNeNhyCAc4AUVFo9")}
        >
          Reserve My Spot Now!
        </button>
      </div>
    </section>
  );
}

export default Programs;
