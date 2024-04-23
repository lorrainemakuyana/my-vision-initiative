import React from "react";
import { IoCall } from "react-icons/io5";
import {
  FaWhatsapp,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
  return (
    <section className="border-t border-magenta pb-8 pt-5">
      <div className="mx-auto flex w-4/5 flex-row items-center justify-center lg:justify-between">
        <div className="text-sm text-magenta">
          <p>&copy;{new Date().getFullYear()} My Vision Initiative</p>
          <p>
            Designed and built by{" "}
            <a href="https://www.linkedin.com/in/lorraine-makuyana/">
              Lorraine Makuyana
            </a>
          </p>
        </div>
        <div className="hidden flex-row space-x-10 lg:flex">
          <a
            href="https://web.facebook.com/myvisioninitiative/"
            target="_blank"
          >
            <FaFacebook className="h-6 w-6 text-magenta" />
          </a>
          <a href="mailto:myvisioninitiative@gmail.com">
            <MdOutlineEmail className="h-6 w-6 text-magenta" />
          </a>
          <a href="https://twitter.com/mvi_initiative" target="_blank">
            <FaXTwitter className="h-6 w-6 text-magenta" />
          </a>
          <a
            href="https://www.instagram.com/myvisioninitiative/"
            target="_blank"
          >
            <FaInstagram className="h-6 w-6 text-magenta" />
          </a>
          <a
            href="https://www.linkedin.com/company/my-vision-initiative/"
            target="_blank"
          >
            <FaLinkedin className="h-6 w-6 text-magenta" />
          </a>
          <a
            href="https://www.youtube.com/channel/UC2doZCOhujqVWHP3DoamDwg"
            target="_blank"
          >
            <FaYoutube className="h-6 w-6 text-magenta" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
