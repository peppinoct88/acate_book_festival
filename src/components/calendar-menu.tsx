"use client";

import { useEffect, useRef } from "react";
import { Calendar } from "./icons";
import type { CalendarOption } from "@/lib/calendar";

/**
 * «Aggiungi al calendario» con la scelta del calendario: un file .ics da solo non basta,
 * perché Android e Google Calendar non lo aprono. È un <details>: funziona anche senza JavaScript;
 * lo script chiude il menu con Esc, con un clic fuori e dopo la scelta.
 */
export function CalendarMenu({
  label,
  options,
  trackLocation,
  trackLabel,
  srContext,
  summaryClassName,
  className = "",
  align = "start",
}: {
  label: string;
  options: CalendarOption[];
  /** Evento calendar_add: location = `${trackLocation}-${kind}`, label = trackLabel */
  trackLocation: string;
  trackLabel: string;
  /** Per chi usa un lettore di schermo: cosa si aggiunge */
  srContext?: string;
  summaryClassName: string;
  className?: string;
  /** «end-lg»: a sinistra su telefono, allineato a destra da 1024px (colonna delle azioni nelle schede) */
  align?: "start" | "end" | "end-lg";
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    const onPointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) details.open = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details ref={ref} className={`group/calendar relative ${className}`} data-calendar-menu>
      <summary className={`${summaryClassName} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
        <Calendar size={17} />
        <span>
          {label}
          {srContext ? <span className="visually-hidden">: {srContext}</span> : null}
        </span>
        <svg
          aria-hidden="true"
          focusable="false"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-open/calendar:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <ul
        className={`absolute top-full z-30 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-ink/12 bg-cream p-2 text-left text-ink shadow-[0_24px_48px_-20px_rgb(7_42_95/0.45)] ${align === "end" ? "right-0" : align === "end-lg" ? "left-0 lg:right-0 lg:left-auto" : "left-0"}`}
      >
        {options.map((option) => {
          const external = option.kind === "google";
          return (
            <li key={option.href}>
              <a
                href={option.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener" : undefined}
                download={option.kind === "ics" ? "" : undefined}
                onClick={close}
                data-track="calendar_add"
                data-track-location={`${trackLocation}-${option.kind}`}
                data-track-label={trackLabel}
                className="flex min-h-11 flex-col justify-center rounded-xl px-3 py-2 transition-colors hover:bg-paper focus-visible:bg-paper"
              >
                <span className="font-display text-[0.95rem] font-semibold">
                  {option.label}
                  {external ? <span className="visually-hidden"> (nuova scheda)</span> : null}
                </span>
                {option.hint ? <span className="text-[0.8rem] text-ink-muted">{option.hint}</span> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
