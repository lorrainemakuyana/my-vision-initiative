import { IJourneyItem } from "@/interfaces";
import {
  FiUsers,
  FiMic,
  FiVideo,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";

export const journeyData: IJourneyItem[] = [
  {
    date: "January 2020",
    title: "Idea Initiation",
    description:
      "My Vision Initiative was founded with a clear mission to empower women through education, mentorship, entreprenuership, leadership, personal and professional development. We established our core values and organizational structure to create sustainable pathways for young women's success.",
    themes: ["Foundation", "Launch", "Idea initiation"],
    icon: FaRegLightbulb,
  },
  {
    date: "January 2021 ",
    title: "MVI Cohorts Program",
    description:
      "We launched our very first #MVIExperience program, reaching over 30 young women and girls women through our daily and weekly sessions that focused on personal development, leadership skills, and entrepreneurship.",
    themes: ["Programs", "Growth"],
    icon: FiUsers,
  },
  {
    date: "February 2021 ",
    title: "Hold her Hand Talk Show",
    description:
      "We were invited by Hold her Hand to participate in a talk show to discuss teenage pregnancy in line with the COVID-19 pandemic and the Education Amendment Act of 2020.",
    themes: ["Partnerships", "Workshops"],
    icon: FiMic,
  },
  {
    date: "September 2021",
    title: "Virtual Workshop & Partnership",
    description:
      'We partnered with Simuka Mwanasikana Zimbabwe to discuss the topic "Who am I? The concept of self realization" to help with issues of self esteem and self worth among young women and girls.',
    themes: ["Workshops", "Partnerships"],
    icon: FiVideo,
  },
  {
    date: "February - May 2023",
    title: '"Protect my Innocence" Campaign',
    description:
      "Virtual sex education series and campaign in partnership with I Just Want to be Heard Zimbabwe, reaching over 20 partcipants overall. We discussed topics such as teenage pregnancy, the role of culture and religion in child pregnancy, gaps in promoting sexual health education among teenagers, and more.",
    themes: ["Workshops", "Campaigns", "Partnerships"],
    icon: FiShield,
  },
  {
    date: "December 2025",
    title: "Organization Revamp & Restructure",
    description:
      "We restructured our organization to enhance efficiency and scalability, ensuring sustainable growth and long-term impact for young women's empowerment in Zimbabwe.",
    themes: ["Revamp", "Restructure", "Growth"],
    icon: FiRefreshCw,
  },
];
