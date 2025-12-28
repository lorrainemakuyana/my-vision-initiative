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
