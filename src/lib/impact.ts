import { IImpactStat, IReport } from "@/interfaces";

/**
 * TODO(MVI): replace with real, verified figures.
 *
 * These are left EMPTY rather than filled with plausible-looking numbers. An
 * impact page is read by donors, grant committees and partners, and invented
 * statistics on one would be a material misrepresentation — the kind of thing
 * that costs an organization its funding and its credibility.
 *
 * Populate from your own records. The page renders a friendly placeholder while
 * this list is empty, so it is safe to ship before the numbers are ready.
 */
export const impactStats: IImpactStat[] = [];

/**
 * TODO(MVI): add annual reports as they are published.
 *
 * Drop the PDF into /public/reports/ and point `file` at it.
 */
export const reports: IReport[] = [];

/**
 * The areas MVI measures itself against. Safe to state — these describe intent,
 * not outcomes, and come from the existing programs copy.
 */
export const impactAreas = [
  {
    title: "Informed decisions",
    description:
      "Sexual and reproductive health information delivered on time, so girls make decisions from knowledge rather than rumour.",
  },
  {
    title: "Career direction",
    description:
      "Customized career guidance that turns a vague ambition into a concrete next step.",
  },
  {
    title: "Leadership",
    description:
      "Young women who take up space, challenge the status quo and lead in their own communities.",
  },
  {
    title: "Enterprise",
    description:
      "New ideas nurtured into ventures, in a culture that rewards critical thinking.",
  },
];
