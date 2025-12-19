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
    <footer className="border-t-magenta border-t bg-inherit p-5 text-center text-base text-black">
      <p>&copy;{new Date().getFullYear()} My Vision Initiative</p>
    </footer>
  );

  return (
    <section className="border-magenta border-t p-5 text-sm text-black">
      <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center lg:justify-between">
        <div className="hidden flex-row space-x-10 lg:flex">
          <a
            href="https://web.facebook.com/myvisioninitiative/"
            target="_blank"
          >
            <FaFacebook className=" h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/myvisioninitiative/"
            target="_blank"
          >
            <FaInstagram className=" h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/my-vision-initiative/"
            target="_blank"
          >
            <FaLinkedin className=" h-6 w-6" />
          </a>
          <a
            href="https://www.youtube.com/channel/UC2doZCOhujqVWHP3DoamDwg"
            target="_blank"
          >
            <FaYoutube className=" h-6 w-6" />
          </a>
        </div>
        <p>&copy;{new Date().getFullYear()} My Vision Initiative</p>
      </div>
    </section>
  );
}

export default Footer;
