import { IconType } from "react-icons";
import { FiBox, FiClock, FiDollarSign } from "react-icons/fi";

export interface IGivingChannel {
  title: string;
  description: string;
  icon: IconType;
  /** Where the button goes. Leave empty to render the channel as "coming soon". */
  href?: string;
  cta?: string;
}

/**
 * TODO(MVI): add your real giving channels.
 *
 * Every `href` below is deliberately EMPTY. Payment links, bank account numbers
 * and mobile-money details are not something to guess at: a wrong or invented
 * number on a charity's donate page sends real money to the wrong place, and a
 * plausible-looking fake one is indistinguishable from a scam page.
 *
 * Fill in `href` (and `cta`) with your verified details and the buttons activate
 * automatically. Until then each card invites the visitor to get in touch, which
 * is honest and still routes a willing donor to you.
 */
export const givingChannels: IGivingChannel[] = [
  {
    title: "Give once",
    description:
      "A single gift goes straight into program delivery — data stipends, facilitator costs, and the materials our cohorts learn from.",
    icon: FiDollarSign,
    href: "",
  },
  {
    title: "Give monthly",
    description:
      "Regular support is what lets us plan a cohort with confidence, and commit to the girls in it before the funding is in the door.",
    icon: FiClock,
    href: "",
  },
  {
    title: "Give in kind",
    description:
      "Devices, data bundles, venue space, printing, professional services — practical support we would otherwise have to buy.",
    icon: FiBox,
    href: "",
  },
];

/**
 * What a gift actually buys. TODO(MVI): confirm these against your real costs
 * before publishing — they are framed as examples, but donors read them as
 * commitments.
 */
export const givingImpact: { amount: string; outcome: string }[] = [];
