import { ITeamMember, IValue } from "@/interfaces";
import { FiHeart, FiTrendingUp, FiUsers } from "react-icons/fi";
import { GiTeamIdea } from "react-icons/gi";

export const mission =
  "To empower young women and girls to become confident leaders, successful entrepreneurs, and positive change-makers in their communities.";

export const vision =
  "A world where young women and girls take up space, challenge the status quo, and become leaders in their communities.";

export const story = [
  "My Vision Initiative was founded in January 2020 to address the systemic barriers that prevent young women and girls from achieving their full potential.",
  "We were created in response to a growing need for comprehensive support systems for young women across all walks of life — support that breaks cycles of limitation and builds environments where women can genuinely thrive, personally and professionally.",
  "Today we are a registered organization in Zimbabwe, running curated programs that combine education, mentorship, skill-building and community across six core faculties.",
];

export const values: IValue[] = [
  {
    title: "Empowerment",
    description:
      "We equip young women and girls with the knowledge, skills and confidence to make informed decisions about their own lives.",
    icon: FiTrendingUp,
  },
  {
    title: "Community",
    description:
      "No one grows alone. We build networks of peers, mentors and allies that outlast any single program.",
    icon: FiUsers,
  },
  {
    title: "Dignity",
    description:
      "We meet every girl where she is, without judgement, and we treat her circumstances and her ambitions with equal seriousness.",
    icon: FiHeart,
  },
  {
    title: "Excellence",
    description:
      "Our programs are rigorous because our participants are capable. We hold a high bar and we help them clear it.",
    icon: GiTeamIdea,
  },
];

/**
 * TODO(MVI): replace with the real team.
 *
 * These entries are placeholders — deliberately generic, with no invented names
 * or biographies, because putting fabricated people on a registered NGO's About
 * page would misrepresent the organization. Fill in real names, roles, photos
 * (drop them in /public/images/team/) and short bios before shipping this page.
 *
 * Delete any entry you do not need; the grid adapts to the number of members.
 */
export const team: ITeamMember[] = [];
