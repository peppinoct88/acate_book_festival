import { programUpdatedAt } from "@/content/program";
import { absoluteUrl, site } from "@/content/site";
import { days, venues } from "@/content/venues";
import type { Session } from "@/content/types";

/**
 * Generatore iCalendar (RFC 5545) senza dipendenze.
 * Gli orari sono convertiti in UTC: nessun problema di fuso con nessun calendario.
 */

const PRODID = "-//Acate Book Festival//Programma 2026//IT";

export function toICSDate(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Piega le righe a 75 ottetti come chiede lo standard (senza spezzare i caratteri UTF-8) */
function fold(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;
  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (currentBytes + bytes > limit) {
      parts.push(current);
      current = char;
      currentBytes = bytes;
    } else {
      current += char;
      currentBytes += bytes;
    }
  }
  parts.push(current);
  return parts.join("\r\n ");
}

interface CalendarEvent {
  uid: string;
  start: string;
  end: string;
  title: string;
  description: string;
  location: string;
  url: string;
  status?: "CONFIRMED" | "CANCELLED";
}

function vevent(e: CalendarEvent, stamp: string): string[] {
  return [
    "BEGIN:VEVENT",
    `UID:${e.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toICSDate(e.start)}`,
    `DTEND:${toICSDate(e.end)}`,
    `SUMMARY:${escapeText(e.title)}`,
    `DESCRIPTION:${escapeText(e.description)}`,
    `LOCATION:${escapeText(e.location)}`,
    `URL:${e.url}`,
    `GEO:${site.place.geo.latitude};${site.place.geo.longitude}`,
    `STATUS:${e.status ?? "CONFIRMED"}`,
    "TRANSP:OPAQUE",
    "END:VEVENT",
  ];
}

function wrap(name: string, events: CalendarEvent[]): string {
  // DTSTAMP stabile: la data dell'ultimo aggiornamento del programma rende i file riproducibili
  const stamp = toICSDate(`${programUpdatedAt}T00:00:00${site.utcOffset}`);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${PRODID}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(name)}`,
    `X-WR-TIMEZONE:${site.timeZone}`,
    ...events.flatMap((e) => vevent(e, stamp)),
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function sessionLocation(session: Pick<Session, "venue">): string {
  const venue = venues[session.venue];
  return `${venue.name} · ${venue.where}, ${site.place.town} (${site.place.province})`;
}

function sessionToEvent(session: Session): CalendarEvent {
  const lines = [session.activity.summary];
  if (session.audience.label !== "Per tutti") lines.push(`Per chi: ${session.audience.label}.`);
  lines.push("Ingresso libero.");
  const url = absoluteUrl(session.href ?? "/programma");
  lines.push(url);
  return {
    uid: `${session.id}@acatebookfestival`,
    start: session.startISO,
    end: session.endISO,
    title: `${session.title} · ${site.name}`,
    description: lines.join("\n"),
    location: sessionLocation(session),
    url,
    status: session.status === "annullato" ? "CANCELLED" : "CONFIRMED",
  };
}

export function sessionsCalendar(name: string, list: Session[]): string {
  return wrap(name, list.map(sessionToEvent));
}

/** «Salva le date»: un blocco per pomeriggio, dalle 17 alle 22 */
export function festivalCalendar(): string {
  return wrap(
    `${site.name} ${site.year}`,
    days.map((d) => ({
      uid: `giornata-${d.id}@acatebookfestival`,
      start: `${d.date}T17:00:00${site.utcOffset}`,
      end: `${d.date}T22:00:00${site.utcOffset}`,
      title: `${site.name} · ${d.theme}`,
      description: `${d.label}: ${d.intro}\nIncontri, spettacoli e musica dalle 17, mostra aperta fino alle 22. Ingresso libero.\n${absoluteUrl(`/programma#${d.anchor}`)}`,
      location: `${site.place.label} · Palco del Castello e Villa dei lettori`,
      url: absoluteUrl(`/programma#${d.anchor}`),
    })),
  );
}

export function googleCalendarUrl(session: Session): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${session.title} · ${site.name}`,
    dates: `${toICSDate(session.startISO)}/${toICSDate(session.endISO)}`,
    details: `${session.activity.summary}\n${absoluteUrl(session.href ?? "/programma")}`,
    location: sessionLocation(session),
    ctz: site.timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Un pomeriggio del festival (17–22) in Google Calendar */
export function googleDayUrl(day: (typeof days)[number]): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${site.name} · ${day.topic}`,
    dates: `${toICSDate(`${day.date}T17:00:00${site.utcOffset}`)}/${toICSDate(`${day.date}T22:00:00${site.utcOffset}`)}`,
    details: `${day.label}: ${day.intro}\nIngresso libero.\n${absoluteUrl(`/giornate/${day.slug}`)}`,
    location: `${site.place.label} · Palco del Castello e Villa dei lettori`,
    ctz: site.timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Iscrizione a un calendario .ics: si aggiorna da solo se cambia un orario (Google lo rilegge entro un giorno) */
export function webcalUrl(path: string): string {
  return absoluteUrl(path).replace(/^https?:\/\//, "webcal://");
}

export function googleSubscribeUrl(path: string): string {
  return `https://calendar.google.com/calendar/render?cid=${webcalUrl(path)}`;
}

/** Le voci del menu «Calendario»: Google per chi usa Android, il file .ics per iPhone, Mac e Outlook */
export type CalendarOption = {
  kind: "google" | "apple" | "ics";
  label: string;
  hint?: string;
  href: string;
};

export function sessionCalendarOptions(session: Session): CalendarOption[] {
  return [
    {
      kind: "google",
      label: "Google Calendar",
      hint: "Android e computer",
      href: googleCalendarUrl(session),
    },
    {
      kind: "ics",
      label: "iPhone, Mac, Outlook",
      hint: "File .ics da aprire con il calendario",
      href: `/calendario/${icsFileName(session)}`,
    },
  ];
}

export function festivalCalendarOptions(): CalendarOption[] {
  return [
    ...days.map((d) => ({
      kind: "google" as const,
      label: `Google Calendar · ${d.weekday.toLowerCase()} ${Number(d.date.slice(-2))}`,
      hint: d.topic,
      href: googleDayUrl(d),
    })),
    {
      kind: "ics",
      label: "iPhone, Mac, Outlook",
      hint: "Le tre date in un file .ics",
      href: "/calendario/acate-book-festival-2026.ics",
    },
  ];
}

export function programCalendarOptions(): CalendarOption[] {
  const path = "/calendario/programma-completo.ics";
  return [
    {
      kind: "google",
      label: "Google Calendar",
      hint: "Iscriviti: gli orari si aggiornano da soli",
      href: googleSubscribeUrl(path),
    },
    {
      kind: "apple",
      label: "iPhone e Mac",
      hint: "Iscriviti: gli orari si aggiornano da soli",
      href: webcalUrl(path),
    },
    { kind: "ics", label: "Outlook e altri", hint: "Tutti gli appuntamenti in un file .ics", href: path },
  ];
}

export function icsFileName(session: Session): string {
  return `${session.id}.ics`;
}
