import React from "react";
import { IoCall } from "react-icons/io5";
import {
  FaWhatsapp,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const channels = [
  {
    name: "Email",
    icon: <MdOutlineEmail className="h-8 w-8" />,
    handle: "myvisioninitiative@gmail.com",
  },
  {
    name: "Call",
    icon: <IoCall className="h-8 w-8" />,
    handle: "+263784453081, +263719106650",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp className="h-8 w-8" />,
    handle: "+263784453081",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="h-8 w-8" />,
    handle: "@myvisioninitiative",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="h-8 w-8" />,
    handle: "@myvisioninitiative",
  },
  {
    name: "X (formerly Twitter)",
    icon: <FaXTwitter className="h-8 w-8" />,
    handle: "@mvi_initiative",
  },
];

function Contact() {
  return (
    <section className="py-10 lg:py-20" id="contact">
      <div className="mx-auto w-[90%] text-black lg:w-3/5">
        <h1 className="font-playfairDisplay text-4xl">Contact Us</h1>
        <p className="font-playfairDisplay mt-2 text-xl text-purple">
          You can contact My Vision Initiative via any of the channels listed
          below.
        </p>
        <div className="mt-4 grid grid-cols-1 space-y-3 lg:grid-cols-2">
          {channels.map((channel, index) => (
            <div key={index} className="flex flex-row items-center">
              {channel.icon}
              <div className="ml-3">
                <p className="font-playfairDisplay text-lg">{channel.name}</p>
                <p className="font-lato font-light tracking-wide">
                  {channel.handle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
