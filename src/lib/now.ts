/**
 * Ora corrente lato client. Per provare gli stati «In corso» / «Tra poco» prima del festival
 * si può aggiungere all'indirizzo ?ora=2026-10-16T19:10 (ora italiana).
 */
export function currentTime(): number {
  if (typeof window === "undefined") return Date.now();
  const override = new URLSearchParams(window.location.search).get("ora");
  if (override && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(override)) {
    const parsed = Date.parse(`${override}:00+02:00`);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return Date.now();
}

/** Data (YYYY-MM-DD) nel fuso di Roma */
export function romeDate(time: number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(time));
}

export type FestivalPhase =
  | { phase: "before"; daysLeft: number }
  | { phase: "today-before" }
  | { phase: "live" }
  | { phase: "between" }
  | { phase: "after" };

const START = Date.parse("2026-10-16T17:00:00+02:00");
const END = Date.parse("2026-10-18T22:00:00+02:00");
const FESTIVAL_DAYS = ["2026-10-16", "2026-10-17", "2026-10-18"];

export function festivalPhase(time: number): FestivalPhase {
  if (time >= END) return { phase: "after" };
  const today = romeDate(time);
  if (time < START) {
    if (today === FESTIVAL_DAYS[0]) return { phase: "today-before" };
    const diff = Math.round(
      (Date.parse(`${FESTIVAL_DAYS[0]}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000,
    );
    return { phase: "before", daysLeft: Math.max(diff, 1) };
  }
  if (FESTIVAL_DAYS.includes(today)) {
    const open = Date.parse(`${today}T17:00:00+02:00`);
    const close = Date.parse(`${today}T22:00:00+02:00`);
    if (time >= open && time < close) return { phase: "live" };
  }
  return { phase: "between" };
}
