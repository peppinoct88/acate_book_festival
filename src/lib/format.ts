import { daysById } from "@/content/venues";
import type { DayId } from "@/content/types";

export function timeRange(start: string, end: string): string {
  return `${start}–${end}`;
}

export function minutesBetween(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm);
}

export function durationLabel(start: string, end: string): string {
  const m = minutesBetween(start, end);
  if (m < 60) return `${m} minuti`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h} ora e ${rest} minuti` : h === 1 ? "1 ora" : `${h} ore`;
}

export function dayLabel(day: DayId): string {
  return daysById.get(day)?.label ?? day;
}

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function formatItalianDate(isoDate: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  }).format(new Date(`${isoDate}T12:00:00+02:00`));
}
