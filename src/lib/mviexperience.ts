/**
 * The self-assessment grid on the #MVIExperience application. Shared by the form
 * and the API that emails a submission, so the field names and labels can never
 * drift apart.
 */
export const ratingAbilities: { name: string; label: string }[] = [
  { name: "rating_pressure", label: "Ability to work under pressure" },
  { name: "rating_remote", label: "Ability to work remotely" },
  { name: "rating_teamwork", label: "Team work" },
  { name: "rating_academic", label: "Academic excellence" },
  { name: "rating_participation", label: "Participation and attentiveness" },
  { name: "rating_punctuality", label: "Punctuality" },
  { name: "rating_comprehension", label: "Comprehension and retention" },
];

export const ratingScale = [
  "Excellent",
  "Very good",
  "Good",
  "Satisfactory",
  "Poor",
] as const;
