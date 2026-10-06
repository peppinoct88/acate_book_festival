import Link from "next/link";
import { AudienceBadge, KindBadge, StatusBadge, VenueTag } from "./badges";
import { CalendarMenu } from "./calendar-menu";
import { ArrowRight } from "./icons";
import { getGuest } from "@/content/guests";
import type { Session } from "@/content/types";
import { sessionCalendarOptions } from "@/lib/calendar";

/**
 * Una riga del programma. I data-attribute servono ai componenti client
 * (filtro «Piccole radici» e indicatori «In corso» / «Tra poco»).
 */
export function SessionCard({
  session,
  headingLevel = 3,
  showDay = false,
}: {
  session: Session;
  headingLevel?: 2 | 3 | 4;
  showDay?: boolean;
}) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const featured = session.activity.featured && session.activity.kind !== "firmacopie";
  const guestNames = session.guests
    .map((slug) => getGuest(slug))
    .filter((g) => g !== undefined)
    .filter((g) => g.type === "persona")
    .map((g) => g.name);
  const cancelled = session.status === "annullato";

  return (
    <article
      data-session={session.id}
      data-kids={session.audience.kids ? "true" : "false"}
      data-start={session.startISO}
      data-end={session.endISO}
      className="group/session relative grid gap-x-8 gap-y-3 border-t border-ink/12 py-7 sm:grid-cols-[7.5rem_1fr] lg:grid-cols-[9rem_1fr_auto]"
    >
      <div className="flex items-baseline gap-3 sm:block">
        {showDay ? (
          <p className="font-display text-sm font-semibold tracking-[0.14em] text-ink-muted uppercase">
            {session.day === "ven" ? "Ven 16" : session.day === "sab" ? "Sab 17" : "Dom 18"}
          </p>
        ) : null}
        <p
          className={`font-display leading-none font-black tracking-[-0.02em] tabular ${featured ? "text-[2.25rem] text-coral-strong sm:text-[2.6rem]" : "text-[1.9rem] text-ink sm:text-[2.1rem]"} ${cancelled ? "line-through decoration-2" : ""}`}
        >
          <time dateTime={session.startISO}>{session.start}</time>
        </p>
        <p className="font-display text-sm font-semibold text-ink-muted tabular sm:mt-1.5">
          <span className="visually-hidden">fino alle </span>
          <span aria-hidden="true">– </span>
          <time dateTime={session.endISO}>{session.end}</time>
        </p>
      </div>

      <div className="min-w-0">
        <div className="mb-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <VenueTag venue={session.venue} />
          <KindBadge kind={session.activity.kind} />
          <span
            data-live-badge
            hidden
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-0.5 font-display text-xs font-semibold tracking-[0.1em] text-cream uppercase"
          />
        </div>
        <H
          className={`font-display leading-[1.08] font-extrabold tracking-[-0.015em] text-balance ${featured ? "text-[1.6rem] sm:text-[1.95rem]" : "text-[1.3rem] sm:text-[1.5rem]"}`}
        >
          {session.href ? (
            <Link
              href={session.href}
              className="group-focus-within/session:underline group-hover/session:text-coral-deep after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {session.title}
            </Link>
          ) : (
            session.title
          )}
          {session.note ? <span className="font-light text-ink-muted"> · {session.note}</span> : null}
        </H>
        {session.activity.kicker && session.title === session.activity.title ? (
          <p className="mt-1.5 font-display text-[1.05rem] font-semibold text-ink-muted">
            {session.activity.kicker}
          </p>
        ) : guestNames.length && session.activity.kind !== "firmacopie" ? (
          <p className="mt-1.5 font-display text-[1.05rem] font-semibold text-ink-muted">
            {guestNames.join(", ")}
          </p>
        ) : null}
        {session.activity.moderator ? (
          <p className="mt-1 font-display text-[0.95rem] text-ink-muted">
            Modera <span className="font-semibold">{session.activity.moderator}</span>
          </p>
        ) : null}
        <p className="mt-3 max-w-[62ch] font-serif text-[1.02rem] leading-relaxed text-ink/85">
          {session.activity.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <AudienceBadge audience={session.audience} />
          <StatusBadge status={session.status} note={session.statusNote} />
        </div>
      </div>

      {/* Sopra il link che copre la scheda, ma trasparente ai clic: la freccia porta alla scheda come il resto */}
      <div className="pointer-events-none relative z-10 flex items-start gap-2 has-[details[open]]:z-30 sm:col-start-2 lg:col-start-auto lg:flex-col lg:items-end">
        <CalendarMenu
          label="Calendario"
          srContext={`aggiungi «${session.title}»`}
          options={sessionCalendarOptions(session)}
          trackLocation="programma"
          trackLabel={session.id}
          align="end-lg"
          className="pointer-events-auto"
          summaryClassName="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 font-display text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream group-open/calendar:border-ink group-open/calendar:bg-ink group-open/calendar:text-cream"
        />
        {session.href ? (
          <span
            aria-hidden="true"
            data-card-arrow
            className="hidden size-11 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover/session:translate-x-1 group-hover/session:bg-coral group-hover/session:text-ink lg:inline-flex"
          >
            <ArrowRight size={18} />
          </span>
        ) : null}
      </div>
    </article>
  );
}
