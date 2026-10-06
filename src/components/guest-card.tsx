import Link from "next/link";
import { BookCover } from "./book-cover";
import { sessionsForGuest } from "@/content/program";
import { daysById, venues } from "@/content/venues";
import type { Guest } from "@/content/types";

/**
 * Card ospite. Su mobile (e con layout="row") è orizzontale: copertina piccola a sinistra.
 */
export function GuestCard({
  guest,
  headingLevel = 3,
  layout = "auto",
}: {
  guest: Guest;
  headingLevel?: 2 | 3;
  layout?: "auto" | "row";
}) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const main = sessionsForGuest(guest.slug).filter((s) => s.activity.kind !== "firmacopie");
  const first = main[0];
  const row = layout === "row";
  return (
    <article
      className={`group relative grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-5 ${row ? "sm:grid-cols-[8.5rem_minmax(0,1fr)]" : "sm:flex sm:flex-col sm:gap-0"}`}
    >
      <BookCover title={guest.name} subtitle={guest.role} tone={guest.tone} className="w-full" />
      <div className={row ? "" : "sm:mt-6"}>
        <H className="font-display text-xl leading-tight font-extrabold tracking-[-0.015em] sm:text-2xl">
          <Link
            href={`/ospiti/${guest.slug}`}
            className="group-hover:text-coral-deep after:absolute after:inset-0 after:content-['']"
          >
            {guest.type === "compagnia" ? "Associazione Culturale Santa Briganti" : guest.name}
          </Link>
        </H>
        <p className="mt-1 font-display text-[0.8rem] font-semibold tracking-[0.14em] text-ink-muted uppercase sm:text-sm">
          {guest.role}
        </p>
        <p className="mt-3 font-serif leading-relaxed text-ink/85">{guest.short}</p>
        {first ? (
          <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[0.95rem] font-semibold text-ink">
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-cream">
              {daysById.get(first.day)?.short}
            </span>
            <span className="tabular">{first.start}</span>
            <span aria-hidden="true">·</span>
            <span>{venues[first.venue].name}</span>
            {main.length > 1 ? <span className="text-ink-muted">+ altre {main.length - 1} date</span> : null}
          </p>
        ) : null}
      </div>
    </article>
  );
}
