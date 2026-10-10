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

/** Inizio e fine di ogni giornata (ISO), ricavati dal programma: `festivalHours` in src/content/program.ts */
export interface DayHours {
  date: string;
  open: string;
  close: string;
}

export function festivalPhase(time: number, hours: readonly DayHours[]): FestivalPhase {
  const first = hours[0];
  if (time >= Date.parse(hours[hours.length - 1].close)) return { phase: "after" };
  const today = romeDate(time);
  if (time < Date.parse(first.open)) {
    if (today === first.date) return { phase: "today-before" };
    const diff = Math.round(
      (Date.parse(`${first.date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000,
    );
    return { phase: "before", daysLeft: Math.max(diff, 1) };
  }
  const day = hours.find((h) => h.date === today);
  if (day && time >= Date.parse(day.open) && time < Date.parse(day.close)) return { phase: "live" };
  return { phase: "between" };
}

/** «alle 17», «alle 18:10»: l'orario di un ISO in italiano, senza i minuti quando è l'ora piena */
export function hourLabel(iso: string): string {
  const [h, m] = iso.slice(11, 16).split(":");
  return m === "00" ? String(Number(h)) : `${Number(h)}:${m}`;
}
