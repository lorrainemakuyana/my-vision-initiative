import { IVolunteerRole } from "@/interfaces";
import { FiBookOpen, FiCamera, FiMic, FiUsers } from "react-icons/fi";

/**
 * Derived from the six faculties MVI already runs, so these describe work the
 * organization genuinely does. Adjust the commitments to match reality.
 */
export const volunteerRoles: IVolunteerRole[] = [
  {
    title: "Mentor",
    commitment: "2–4 hours a month",
    description:
      "Walk alongside one or more participants through a cohort, offering guidance, perspective and encouragement from your own experience.",
    icon: FiUsers,
  },
  {
    title: "Facilitator",
    commitment: "Per session",
    description:
      "Lead a workshop in your area of expertise — personal development, entrepreneurship, leadership, career guidance or SRHR.",
    icon: FiMic,
  },
  {
    title: "Content & Curriculum",
    commitment: "Flexible",
    description:
      "Help shape the material our cohorts learn from: session plans, resources, and the stories we tell about our work.",
    icon: FiBookOpen,
  },
  {
    title: "Media & Communications",
    commitment: "Flexible",
    description:
      "Photography, design, video and social media that carry our participants' stories further than we could alone.",
    icon: FiCamera,
  },
];

export const whyVolunteer = [
  "Our programs are delivered by the MVI team alongside carefully selected industry experts — volunteers are not an add-on, they are how the work happens.",
  "You will work directly with young women and girls aged 15–21 across Zimbabwe, mostly virtually via Zoom and WhatsApp, with in-person programming launching soon.",
  "You bring what you know. We handle the structure, the cohort and the logistics.",
];
