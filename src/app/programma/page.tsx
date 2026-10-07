import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProgramControls } from "@/components/program-controls";
import { SessionCard } from "@/components/session-card";
import { LiveStatus } from "@/components/live-status";
import { PrintButton } from "@/components/print-button";
import { ArrowRight } from "@/components/icons";
import { buttonClass } from "@/components/button";
import { CalendarMenu } from "@/components/calendar-menu";
import { programCalendarOptions } from "@/lib/calendar";
import { alwaysOn, programUpdatedAt, sessions, sessionsForDay } from "@/content/program";
import { days } from "@/content/venues";
import { dayTones } from "@/lib/day-tone";
import { formatItalianDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { anyHidden } from "@/content/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Programma",
  description: anyHidden
    ? "Il programma dell'Acate Book Festival, 16-18 ottobre: mafia, donne, immigrazione. Un autore per giornata, svelato sui nostri social, teatro e musica."
    : "Il programma dell'Acate Book Festival, 16-18 ottobre: mafia, donne, immigrazione. Giovanni Impastato, Desirée Giuffrè, Maria Antonietta Ferraloro, teatro e musica.",
  path: "/programma",
  ownImage: true,
});

export default function ProgramPage() {
  const counts = {
    all: sessions.length,
    kids: sessions.filter((s) => s.audience.kids).length,
  };

  return (
    <>
      <PageHero
        eyebrow="Il programma"
        title="Tre giornate,"
        light="tre temi."
        crumbs={[{ name: "Programma" }]}
        intro={
          <>
            <p>
              Dalle 17 tra il <strong>Palco del Castello</strong>, in via Archimede, e la{" "}
              <strong>Villa dei lettori</strong>, con la mostra aperta fino alle 22. Ogni giornata ha il suo
              tema: venerdì la <strong>mafia</strong>, sabato le <strong>donne</strong>, domenica l&apos;
              <strong>immigrazione</strong>.
            </p>
          </>
        }
      >
        <ul className="flex flex-wrap gap-2 font-display text-[0.95rem] font-semibold">
          {["16 / 17 / 18 ottobre 2026", "Dalle 17:00", "Mostra fino alle 22", "Ingresso libero"].map((t) => (
            <li key={t} className="rounded-full border-2 border-ink/80 bg-cream px-4 py-1.5">
              {t}
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="container-festival">
        <ProgramControls
          days={days.map((d) => ({ anchor: d.anchor, short: d.short, theme: d.topic, date: d.date }))}
          listId="programma-lista"
          counts={counts}
        />

        <div id="programma-lista">
          {days.map((day) => (
            <section
              key={day.id}
              id={day.anchor}
              aria-labelledby={`${day.anchor}-titolo`}
              className="mt-14 sm:mt-20"
            >
              <header
                className={`relative isolate grid gap-6 overflow-hidden rounded-[1.75rem] p-6 sm:p-9 lg:grid-cols-[1fr_1.2fr] lg:items-end ${dayTones[day.tone].surface} ${dayTones[day.tone].text}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-16 -right-16 -z-10 size-44 rounded-full sm:size-56 ${dayTones[day.tone].sun}`}
                />
                <div>
                  <p className={`eyebrow ${dayTones[day.tone].eyebrow}`}>{day.label}</p>
                  <h2 id={`${day.anchor}-titolo`} className="mt-4 font-display">
                    <span className="block text-title font-black uppercase">{day.topic}</span>
                    <span className="mt-1 block text-xl font-light">{day.theme}</span>
                  </h2>
                </div>
                <div>
                  <p className={`max-w-[52ch] font-serif text-lg leading-relaxed ${dayTones[day.tone].soft}`}>
                    {day.intro}
                  </p>
                  <Link
                    href={`/giornate/${day.slug}`}
                    className="link-underline mt-4 inline-flex items-center gap-2 font-display font-semibold"
                    data-no-print
                  >
                    La giornata, il tema e gli ospiti <ArrowRight size={18} />
                  </Link>
                </div>
              </header>
              <ol className="border-b border-ink/12">
                {sessionsForDay(day.id).map((session) => (
                  <li key={session.id}>
                    <SessionCard session={session} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <section aria-labelledby="sempre-aperti" className="mt-16 rounded-[1.75rem] bg-paper p-6 sm:p-10">
          <p className="eyebrow text-ink">Tutti i giorni alla Villa dei lettori</p>
          <h2 id="sempre-aperti" className="mt-4 font-display text-title">
            <span className="font-black">Sempre</span> <span className="font-light">aperti</span>
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {alwaysOn.map((item) => (
              <li key={item.title} className="relative rounded-2xl bg-cream p-5">
                <p className="font-display text-xs font-semibold tracking-[0.16em] text-teal-deep uppercase">
                  {item.when}
                </p>
                <h3 className="mt-2 font-display text-lg leading-snug font-extrabold">
                  <Link href={item.href} className="after:absolute after:inset-0 hover:text-coral-deep">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-1.5 text-[0.95rem] leading-snug text-ink/80">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <div
          className="mt-12 flex flex-col gap-6 border-t border-ink/12 pt-10 lg:flex-row lg:items-center lg:justify-between"
          data-no-print
        >
          <div className="flex flex-wrap gap-3">
            <CalendarMenu
              label="Tutto il programma nel calendario"
              options={programCalendarOptions()}
              trackLocation="programma-completo"
              trackLabel="programma-completo"
              summaryClassName={buttonClass("ink")}
            />
            <PrintButton className={buttonClass("secondary")} />
            <Link href="/famiglie" className={buttonClass("ghost")}>
              Il programma per le famiglie <ArrowRight size={18} />
            </Link>
          </div>
          <p className="font-display text-sm text-ink-muted">
            Programma aggiornato al {formatItalianDate(programUpdatedAt)}. Eventuali variazioni vengono
            segnalate in questa pagina.
          </p>
        </div>
      </div>
      <LiveStatus />
    </>
  );
}
