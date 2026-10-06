import Link from "next/link";
import { ArrowRight } from "./icons";
import { ButtonLink } from "./button";
import { VenueTag } from "./badges";
import { highlightsForDay } from "@/content/program";
import type { FestivalDay } from "@/content/types";
import { dayTones } from "@/lib/day-tone";

/**
 * Una giornata e il suo tema, nei colori del manifesto: la parola del tema in grande,
 * il «perché» in una riga e i tre appuntamenti principali.
 */
export function DayCard({ day, headingLevel = 3 }: { day: FestivalDay; headingLevel?: 2 | 3 }) {
  const t = dayTones[day.tone];
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 ${t.surface} ${t.text}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-24 -right-24 -z-10 size-44 rounded-full ${t.sun} sm:-top-20 sm:-right-16 sm:size-60`}
      />
      <p className={`eyebrow ${t.eyebrow}`}>
        {day.weekday} {Number(day.date.slice(-2))} ottobre
      </p>
      <H className="[container-type:inline-size] mt-7 font-display">
        <span className="block text-[min(10.5cqi,3.4rem)] leading-[0.9] font-black tracking-[-0.03em] uppercase">
          {day.topic}
        </span>
        <span className="mt-3 block text-[1.6rem] leading-tight font-light tracking-[-0.02em]">
          {day.theme}
        </span>
      </H>
      <p className={`mt-5 font-serif text-lg leading-relaxed ${t.soft}`}>{day.claim}</p>
      <ul className={`mt-7 space-y-4 border-t pt-6 ${t.rule}`}>
        {highlightsForDay(day.id).map((s) => (
          <li key={s.id} className="grid grid-cols-[3.6rem_1fr] gap-3">
            <span className="font-display text-lg font-black tabular">{s.start}</span>
            <span>
              {s.href ? (
                <Link href={s.href} className="link-underline font-display text-lg leading-snug font-bold">
                  {s.title}
                </Link>
              ) : (
                <span className="font-display text-lg leading-snug font-bold">{s.title}</span>
              )}
              <span className="mt-1 block">
                <VenueTag venue={s.venue} tone={t.venue} />
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-9">
        <ButtonLink href={`/giornate/${day.slug}`} variant={t.button} icon={<ArrowRight size={18} />}>
          La giornata
        </ButtonLink>
        <Link
          href={`/programma#${day.anchor}`}
          className="link-underline font-display text-[0.95rem] font-semibold"
        >
          Tutti gli orari
        </Link>
      </div>
    </article>
  );
}
