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
      "After interviews are done and reviewed, MVI will select and roll out the final participant list for the respective cohort. All interviewees should expect to hear from MVI within a week after their interview.",
  },
  {
    title: "Notifications and Launch.",
    description: "The program starts.",
  },
];

function CohortsProgram() {
  return (
    <section className="w-full pt-10 md:pt-20">
      <div className="w-full px-5 pb-10 pt-16 lg:mx-auto lg:max-w-6xl">
        <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          <h2 className="font-playfairDisplay text-magenta mb-3 text-4xl font-bold">
            THE #MVIExperience
          </h2>
          <p className="mx-auto max-w-2xl font-light text-black">
            <p className="mb-3">
              A chance to set yourself on course, bringing out the best you.
            </p>
            <p className="mb-3">
              Designed for young women and girls aged 15-21 years, for a first
              hand exprience of MVI as a whole, delivered by the MVI team and
              carefully selected industry experts.
            </p>
            <p>
              An inspirational and motivational experience to transform young
              women and girls into dreamchasers, changemakers, and fearless
              women who take up space. The program is offered mostly virtually
              via Zoom and WhatsApp, and will soon be launched in-person in
              Zimbabwe. Stipends to cater for data costs will be provided for
              participants on a needs basis. and although rigorous and
              intensive, this program is by far the best way to access MVI
              resources and interact with us first hand.
            </p>
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          <h2 className="font-playfairDisplay text-magenta mb-3 text-3xl font-bold">
            How to join the program
          </h2>
          <div className="">
            <ol className="space-y-5">
              {steps.map((step, index) => (
                <li key={index} className="text-black">
                  <p className="font-playfairDisplay text-magenta text-lg font-bold">
                    <span className="font-playfairDisplay text-magenta mr-2">
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

      <div className=" bg-conic-180 from-purple via-magenta to-purple flex flex-col items-center justify-center px-5 py-14 text-white lg:py-20">
        <h1 className="text-center text-3xl">
          Make a difference in your life today, join the program!
        </h1>
        <p className="my-5 text-center text-lg font-light">
          The next #MVIExperience Program will be launching soon. Reserve your
          spot today!
        </p>
        <button
          className="cursor-pointer rounded-full border-2 border-white bg-transparent px-6 py-2 font-light text-white"
          onClick={() => window.open("https://forms.gle/ZtNeNhyCAc4AUVFo9")}
        >
          Reserve My Spot Now!
        </button>
      </div>
    </section>
  );
}

export default CohortsProgram;
