import { BookCover } from "./book-cover";
import { secretTalkFor } from "@/content/program";
import type { FestivalDay } from "@/content/types";
import { venues } from "@/content/venues";
import { dayTones } from "@/lib/day-tone";

const dedicatedTo: Record<FestivalDay["id"], string> = {
  ven: "alla mafia",
  sab: "alle donne",
  dom: "all'immigrazione",
};

const questionTone: Record<FestivalDay["tone"], string> = {
  ink: "text-ink",
  coral: "text-coral-strong",
  teal: "text-teal-deep",
};

/**
 * Il ritratto di un autore ancora segreto (src/content/reveal.ts): un «?» nei colori della giornata
 * e il suo libro chiuso, che entra come quello degli altri. Nessun dato dell'autore arriva qui.
 */
export function MysteryGuestVisual({ day, className = "" }: { day: FestivalDay; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative pb-[12%] ${className}`}>
      <div className="[container-type:inline-size] relative isolate overflow-hidden rounded-[1.25rem] bg-cream ring-1 ring-ink/10 ring-inset">
        <span
          className={`absolute -top-[18%] -right-[24%] -z-10 aspect-square w-[78%] rounded-full opacity-80 ${dayTones[day.tone].sun}`}
        />
        <span
          className={`flex aspect-[3/4] items-center justify-center pb-[10%] font-display text-[62cqw] leading-none font-black ${questionTone[day.tone]}`}
        >
          ?
        </span>
      </div>
      <BookCover
        title="Chi sarà?"
        subtitle="Lo sveliamo presto"
        tone={day.tone}
        className="book-pop absolute bottom-0 left-[6%] w-[40%] -rotate-6 transition-[rotate,translate] duration-500 ease-soft group-hover:-translate-y-2 group-hover:-rotate-9"
      />
    </div>
  );
}

/**
 * La scheda di un autore ancora segreto, con la stessa forma di GuestCard: giorno, ora e luogo
 * del suo incontro, il nome «lo sveliamo presto sui nostri social».
 */
export function MysteryGuestCard({
  slug,
  day,
  headingLevel = 3,
  layout = "auto",
}: {
  slug: string;
  day: FestivalDay;
  headingLevel?: 2 | 3;
  layout?: "auto" | "row";
}) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const talk = secretTalkFor(slug);
  const row = layout === "row";
  return (
    <article
      data-mystery-guest
      className={`group relative grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-5 ${row ? "sm:grid-cols-[8.5rem_minmax(0,1fr)]" : "sm:flex sm:flex-col sm:items-stretch sm:gap-0"}`}
    >
      <MysteryGuestVisual day={day} />
      <div className={row ? "" : "sm:mt-6"}>
        <H className="font-display text-xl leading-tight font-extrabold tracking-[-0.015em] sm:text-2xl">
          Chi sarà?
        </H>
        <p className="mt-1 font-display text-[0.8rem] font-semibold tracking-[0.14em] text-ink-muted uppercase sm:text-sm">
          L&apos;ospite di {day.weekday.toLowerCase()}
        </p>
        <p className="mt-3 font-serif leading-relaxed text-ink/85">
          Un ospite per la giornata dedicata {dedicatedTo[day.id]}: il nome lo sveliamo presto sui nostri
          social.
        </p>
        {talk ? (
          <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[0.95rem] font-semibold text-ink">
            <span
              className={`rounded-full px-2.5 py-0.5 ${dayTones[day.tone].surface} ${dayTones[day.tone].text}`}
            >
              {day.short}
            </span>
            <span className="tabular">{talk.start}</span>
            <span aria-hidden="true">·</span>
            <span>{venues[talk.venue].name}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
