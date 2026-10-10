"use client";

import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";
import {
  currentTime,
  festivalPhase,
  hourLabel,
  romeDate,
  type DayHours,
  type FestivalPhase,
} from "@/lib/now";

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 60_000);
  return () => window.clearInterval(timer);
}

let cachedKey = "";
let cachedPhase: FestivalPhase | null = null;

function snapshot(hours: readonly DayHours[]): FestivalPhase {
  const phase = festivalPhase(currentTime(), hours);
  const key = JSON.stringify(phase);
  if (key !== cachedKey || !cachedPhase) {
    cachedKey = key;
    cachedPhase = phase;
  }
  return cachedPhase;
}

/** Il prossimo pomeriggio di festival, «Oggi dalle 18» o «Domani dalle 17»: sabato si comincia più tardi */
function nextOpening(hours: readonly DayHours[]): string {
  const now = currentTime();
  const day = hours.find((h) => Date.parse(h.close) > now) ?? hours[hours.length - 1];
  return `${day.date === romeDate(now) ? "Oggi" : "Domani"} dalle ${hourLabel(day.open)}`;
}

/** Contatore «Mancano N giorni» / «In corso» / «Grazie». Prima dell'idratazione mostra le date. */
export function FestivalStatus({
  hours,
  className = "",
}: {
  hours: readonly DayHours[];
  className?: string;
}) {
  const getSnapshot = useCallback(() => snapshot(hours), [hours]);
  const phase = useSyncExternalStore(subscribe, getSnapshot, () => null);

  let label = "Ingresso libero";
  let href: string | null = null;
  let live = false;
  if (phase) {
    switch (phase.phase) {
      case "before":
        label = phase.daysLeft === 1 ? "Domani si comincia" : `Mancano ${phase.daysLeft} giorni`;
        break;
      case "today-before":
        label = `Oggi si comincia, alle ${hourLabel(hours[0].open)}`;
        href = "/adesso";
        break;
      case "live":
        label = "Il festival è in corso: guarda cosa c'è adesso";
        href = "/adesso";
        live = true;
        break;
      case "between":
        label = `${nextOpening(hours)}: guarda il programma`;
        href = "/adesso";
        break;
      case "after":
        label = "Grazie, Acate. Arrivederci al 2027";
        break;
    }
  }

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`relative inline-flex size-2.5 rounded-full ${live ? "bg-coral" : "bg-teal"}`}
      >
        {live ? <span className="absolute inset-0 animate-ping rounded-full bg-coral" /> : null}
      </span>
      <span>{label}</span>
    </>
  );

  const classes = `inline-flex min-h-10 items-center gap-2.5 rounded-full bg-paper px-4 py-2 font-display text-sm font-semibold text-ink ${className}`;

  return (
    <p className="m-0">
      {href ? (
        <Link href={href} className={`${classes} transition-colors hover:bg-teal-soft`}>
          {content}
        </Link>
      ) : (
        <span className={classes}>{content}</span>
      )}
    </p>
  );
}
