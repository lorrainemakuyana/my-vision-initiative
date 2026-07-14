import { IconType } from "react-icons";

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IJourneyItem {
  date: string;
  title: string;
  description: string;
  themes: string[];
  icon: IconType;
}

export interface IValue {
  title: string;
  description: string;
  icon: IconType;
}

export interface ITeamMember {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/images/team/jane.webp". Optional. */
  image?: string;
  linkedIn?: string;
}

export interface IImpactStat {
  /** The number itself, e.g. "150+". Kept a string so it can carry a suffix. */
  value: string;
  label: string;
  description?: string;
}

export interface IReport {
  title: string;
  year: string;
  description: string;
  /** Path under /public, e.g. "/reports/2025-annual-report.pdf". */
  file: string;
}

export interface IVolunteerRole {
  title: string;
  commitment: string;
  description: string;
  icon: IconType;
}

