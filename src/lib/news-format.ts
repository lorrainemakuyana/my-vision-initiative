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

/**
 * Renders an event's dates as a single readable span, collapsing the shared
 * parts of a range: "3–5 August 2026" rather than "3 August 2026 – 5 August
 * 2026", and just "3 August 2026" when there is no end date.
 */
export function formatEventDates(
  startIso: string,
  endIso: string | null,
): string {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return "";
  if (!endIso) return formatPostDate(startIso);

  const end = new Date(endIso);
  if (Number.isNaN(end.getTime())) return formatPostDate(startIso);

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth && start.getUTCDate() === end.getUTCDate()) {
    return formatPostDate(startIso);
  }

  const part = (date: Date, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: "UTC" }).format(date);

  if (sameMonth) {
    return `${part(start, { day: "numeric" })}–${formatPostDate(endIso)}`;
  }
  if (sameYear) {
    return `${part(start, { day: "numeric", month: "long" })} – ${formatPostDate(endIso)}`;
  }
  return `${formatPostDate(startIso)} – ${formatPostDate(endIso)}`;
}
