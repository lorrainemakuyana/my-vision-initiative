/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDiamondsFourLight, PiGenderIntersex } from "react-icons/pi";
import { GiTeamIdea } from "react-icons/gi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaPersonDressBurst } from "react-icons/fa6";

const faculties = [
  {
    name: "Sex Education",
    icon: <PiGenderIntersex className="h-8 w-8" />,
    description:
      "We provide SRHR information on time to young women and girls to ensure informed decisions.",
  },
  {
    name: "Personal Development",
    icon: <FaPersonDressBurst className="h-8 w-8" />,
    description:
      "We groom teenagers into women who are self aware, motivated and unstoppable.",
  },
  {
    name: "Mentorship",
    icon: <IoChatbubbleOutline className="h-8 w-8" />,
    description:
      "We connect teenage girls to prominent individuals in our community to foster dialogues that transcends generations.",
  },
  {
    name: "Professional Development",
    icon: <IoSettingsOutline className="h-8 w-8" />,
    description:
      " Helping young girls realize their career goals through customized career guidance.",
  },
  {
    name: "Entreprenuership",
    icon: <PiDiamondsFourLight className="h-8 w-8" />,
    description:
      "We nurture new ideas and create an innovation driven system that cultivates a culture of critical thinking in our fellows.",
  },
  {
    name: "Leadership",
    icon: <GiTeamIdea className="h-8 w-8" />,
    description:
      " We believe in a world where young women and girls take up space.",
  },
];
function Banner() {
  return (
    <section>
      <img
        src="/images/let-girls-shine.webp"
        alt="Let the girls shine!"
        className="h-auto w-full"
      />
      <div className="pt-10 sm:pt-16 lg:pt-20" id="about">
        <p className="font-playfairDisplay text-center text-4xl text-black">
          My Vision Initiative
        </p>
        <p className="font-playfairDisplay mt-1 px-5 text-center tracking-wide text-black">
          An organization on a mission to end teen pregnancy in Zimbabwe through
          empowerment.
        </p>
        <div className="mx-auto w-4/5 py-10">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((faculty, index) => (
              <div
                key={index}
                className="m-5 flex flex-col items-center justify-center space-y-3 bg-white rounded-md p-10 text-black shadow-lg border border-gray-100"
              >
                {faculty.icon}
                <h1 className="font-lato text-xl font-medium">
                  {faculty.name}
                </h1>
                <p className="font-lato text-center font-light">
                  {faculty.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
