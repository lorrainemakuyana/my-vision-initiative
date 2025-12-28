/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDiamondsFourLight, PiGenderIntersex } from "react-icons/pi";
import { GiTeamIdea } from "react-icons/gi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaPersonDressBurst } from "react-icons/fa6";

type Faculty = {
  name: string;
  icon: React.ReactNode;
  description: string;
  image: string;
};

const faculties: Faculty[] = [
  {
    name: "Sex Education",
    icon: <PiGenderIntersex className="h-8 w-8" />,
    description:
      "We provide SRHR information on time to young women and girls to ensure informed decisions.",
    image: "/images/faculties/sex-ed.webp",
  },
  {
    name: "Personal Development",
    icon: <FaPersonDressBurst className="h-8 w-8" />,
    description:
      "We groom teenagers into women who are self aware, motivated and unstoppable.",
    image: "/images/faculties/personal-dev.webp",
  },
  {
    name: "Professional Development",
    icon: <IoSettingsOutline className="h-8 w-8" />,
    description:
      " Helping young girls realize their career goals through customized career guidance.",
    image: "/images/faculties/professional-dev.webp",
  },
  {
    name: "Entreprenuership",
    icon: <PiDiamondsFourLight className="h-8 w-8" />,
    description:
      "We help nurture new ideas and create an innovation driven system that cultivates a culture of critical thinking in our fellows.",
    image: "/images/faculties/entreprenuership.webp",
  },
  {
    name: "Leadership",
    icon: <GiTeamIdea className="h-8 w-8" />,
    description:
      " We believe in a world where young women and girls take up space and challenge the status quo, becoming leaders in their communities.",
    image: "/images/faculties/leadership.webp",
  },
  {
    name: "Mentorship",
    icon: <IoChatbubbleOutline className="h-8 w-8" />,
    description:
      "We connect teenage girls to prominent individuals in our community to foster dialogues that transcends generations.",
    image: "/images/faculties/mentorship.webp",
  },
];

function Banner() {
  return (
    <section className="bg-white pt-16 lg:pt-0">
      <Image
        src="/images/let-girls-shine.webp"
        alt="Let the girls shine!"
        className="h-auto w-full"
        width={100}
        height={100}
        priority
        unoptimized
      />

      <div className="w-full px-5 py-16 lg:mx-auto lg:max-w-6xl">
        <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          <h2 className="font-playfairDisplay text-magenta mb-3 text-4xl font-bold">
            WHAT WE DO
          </h2>
          <p className="mx-auto max-w-2xl font-light text-gray-600">
            At My Vision Initiative, we are dedicated to empowering young women
            and girls through curated programs that focus on six key areas:
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faculties.map((faculty: Faculty, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-3 rounded-md border border-gray-100 bg-white p-10 text-black shadow-lg shadow-gray-200"
            >
              {faculty.icon}
              <h1 className="font-lato text-xl font-medium">{faculty.name}</h1>
              <p className="font-lato text-center font-light">
                {faculty.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner;
