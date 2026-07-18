/**
 * Formats a post date identically on the server and in the browser. Without a
 * pinned timeZone the two can land on different calendar days and React reports
 * a hydration mismatch, so the zone is fixed rather than inherited from the
 * visitor's machine.
 */
export function formatPostDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
