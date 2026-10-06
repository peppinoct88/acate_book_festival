"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";
import { currentTime, romeDate } from "@/lib/now";

interface DayLink {
  anchor: string;
  short: string;
  theme: string;
  date: string;
}

/**
 * Barra sticky del programma: salto ai giorni (con evidenza del giorno visibile)
 * e filtro «Piccole radici». Il filtro nasconde le righe via CSS: la lista resta nell'HTML.
 */
export function ProgramControls({
  days,
  listId,
  counts,
}: {
  days: DayLink[];
  listId: string;
  counts: { all: number; kids: number };
}) {
  const [active, setActive] = useState(days[0]?.anchor);
  const [kidsOnly, setKidsOnly] = useState(false);
  const [announce, setAnnounce] = useState("");
  const bar = useRef<HTMLDivElement>(null);

  const applyFilter = (kids: boolean) => {
    setKidsOnly(kids);
    track("program_filter", { value: kids ? "bambini" : "tutto" });
    const list = document.getElementById(listId);
    if (list) {
      if (kids) list.dataset.filter = "kids";
      else delete list.dataset.filter;
    }
    setAnnounce(
      kids ? `${counts.kids} appuntamenti per bambini e ragazzi` : `${counts.all} appuntamenti in programma`,
    );
  };

  // Giorno attivo: l'ultimo il cui banner è arrivato sotto la barra. Sopra il venerdì resta il venerdì.
  useEffect(() => {
    const sections = days
      .map((d) => document.getElementById(d.anchor))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (bar.current?.getBoundingClientRect().bottom ?? 0) + 48;
      let current = sections[0];
      for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section;
      if (current) setActive(current.id);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [days]);

  // Durante il festival il programma si apre sul giorno corrente
  useEffect(() => {
    if (window.location.hash) return;
    const today = romeDate(currentTime());
    const match = days.find((d) => d.date === today);
    if (match && match !== days[0]) {
      document.getElementById(match.anchor)?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [days]);

  return (
    <div
      ref={bar}
      className="sticky top-(--header-h) z-30 -mx-[clamp(1rem,4vw,3rem)] border-y border-ink/10 bg-cream/95 px-[clamp(1rem,4vw,3rem)] backdrop-blur-md"
      data-program-bar
      data-no-print
    >
      <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Giorni del festival">
          <ul className="flex gap-2 overflow-x-auto">
            {days.map((d) => (
              <li key={d.anchor} className="shrink-0">
                <a
                  href={`#${d.anchor}`}
                  aria-current={active === d.anchor ? "true" : undefined}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink/15 px-4 font-display text-[0.95rem] font-semibold text-ink transition-colors hover:border-ink aria-[current=true]:border-ink aria-[current=true]:bg-ink aria-[current=true]:text-cream"
                >
                  {d.short}
                  <span className="hidden font-light lg:inline">· {d.theme}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="Filtra il programma"
            className="inline-flex rounded-full bg-paper p-1"
          >
            <button
              type="button"
              aria-pressed={!kidsOnly}
              onClick={() => applyFilter(false)}
              className="min-h-10 rounded-full px-4 font-display text-sm font-semibold text-ink transition-colors aria-pressed:bg-cream aria-pressed:shadow-[0_1px_3px_rgb(7_42_95/0.2)]"
            >
              Tutto
            </button>
            <button
              type="button"
              aria-pressed={kidsOnly}
              onClick={() => applyFilter(true)}
              className="min-h-10 rounded-full px-4 font-display text-sm font-semibold text-ink transition-colors aria-pressed:bg-teal-soft aria-pressed:shadow-[0_1px_3px_rgb(7_42_95/0.2)]"
            >
              <span aria-hidden="true">✦ </span>Bambini e ragazzi
            </button>
          </div>
          <p aria-live="polite" className="visually-hidden">
            {announce}
          </p>
        </div>
      </div>
    </div>
  );
}
