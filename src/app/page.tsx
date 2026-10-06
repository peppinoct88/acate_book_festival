import Image from "next/image";
import Link from "next/link";
import heroIllustration from "@/assets/hero-illustration.png";
import { Logotype } from "@/components/logotype";
import { ButtonLink, buttonClass } from "@/components/button";
import { ArrowRight, Calendar, Kids, Rain, Ticket } from "@/components/icons";
import { FestivalStatus } from "@/components/festival-status";
import { SectionHeading } from "@/components/section-heading";
import { GuestCard } from "@/components/guest-card";
import { VenueTag } from "@/components/badges";
import { VenueMap } from "@/components/venue-map";
import { KraftTag } from "@/components/kraft-tag";
import { JsonLd } from "@/components/json-ld";
import { guests } from "@/content/guests";
import { days } from "@/content/venues";
import { highlightsForDay, sessions } from "@/content/program";
import { site } from "@/content/site";
import { festivalJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} 2026 · 16–18 ottobre · Acate (RG)`,
    description: site.description,
    path: "/",
    socialTitle: `${site.name} · I edizione · 16/17/18 ottobre 2026`,
  }),
  title: { absolute: `${site.name} 2026 · 16–18 ottobre · Acate (RG)` },
};

export default function HomePage() {
  const kidsSessions = sessions.filter((s) => s.audience.kids && s.activity.kind !== "partecipazione");

  return (
    <>
      <JsonLd data={festivalJsonLd()} />

      {/* ───────────────── HERO: il manifesto */}
      <section aria-labelledby="titolo-festival" className="relative overflow-hidden">
        <div className="relative container-festival grid items-end gap-y-4 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-4">
          <div className="relative z-10 pt-7 pb-2 sm:pt-12 lg:self-center lg:pt-4 lg:pb-12">
            <div className="flex animate-rise flex-wrap items-center gap-x-6 gap-y-3">
              <p className="eyebrow text-ink">I edizione</p>
              <FestivalStatus />
            </div>
            <h1 id="titolo-festival" className="mt-5 sm:mt-7 lg:mt-6">
              <Logotype className="text-[clamp(5.4rem,27.5vw,12.25rem)] lg:text-[min(10.2vw,14svh,11.5rem)] [&>span]:animate-rise [&>span:nth-child(2)]:[animation-delay:90ms] [&>span:nth-child(3)]:[animation-delay:180ms]" />
            </h1>
            <div className="animate-rise [animation-delay:260ms]">
              <span
                aria-hidden="true"
                className="mt-6 block h-[3px] w-[min(100%,32rem)] rounded-full bg-coral lg:mt-[min(2.2svh,1.75rem)]"
              />
              <p className="mt-5 font-display text-lg font-semibold tracking-[0.2em] text-ink uppercase sm:text-2xl sm:tracking-[0.22em] lg:mt-[min(2svh,1.25rem)]">
                <time dateTime="2026-10-16">16</time> <span className="text-coral">/</span>{" "}
                <time dateTime="2026-10-17">17</time> <span className="text-coral">/</span>{" "}
                <time dateTime="2026-10-18">18 ottobre 2026</time>
              </p>
              <p className="eyebrow mt-3 tracking-[0.3em]! text-ink [&::after]:bg-coral">Acate</p>
            </div>

            <div className="mt-8 max-w-xl animate-rise [animation-delay:340ms] lg:mt-[min(3.5svh,2rem)]">
              <p className="font-display text-[1.35rem] leading-snug font-light text-ink sm:text-2xl">
                <strong className="font-black">Radici.</strong> Tre pomeriggi di libri, incontri, teatro e
                laboratori nel centro storico di Acate.
              </p>
              <p className="mt-3 font-display text-[0.95rem] font-semibold text-ink-muted">
                Dalle 17 alle 20 · mostra aperta fino alle 22 · ingresso libero
              </p>
              <div className="mt-7 flex flex-wrap gap-3 lg:mt-[min(3svh,1.75rem)]">
                <ButtonLink
                  href="/programma"
                  icon={<ArrowRight size={18} />}
                  data-track="cta_click"
                  data-track-location="hero"
                  data-track-label="programma"
                >
                  Vedi il programma
                </ButtonLink>
                <a
                  href="/calendario/acate-book-festival-2026.ics"
                  download
                  className={buttonClass("secondary")}
                  data-track="calendar_add"
                  data-track-location="hero"
                  data-track-label="festival"
                >
                  <Calendar size={18} /> Aggiungi al calendario
                </a>
              </div>
            </div>
          </div>

          <div className="relative -mx-[clamp(1rem,4vw,3rem)] lg:mx-0 lg:-mr-[clamp(1rem,4vw,3rem)] lg:self-end">
            <Image
              src={heroIllustration}
              alt="Illustrazione del manifesto: la torre del castello di Acate costruita con libri colorati, sotto un sole turchese."
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full animate-settle select-none [animation-delay:120ms] lg:max-h-[calc(100svh-6rem)] lg:object-contain lg:object-bottom"
            />
          </div>
        </div>
      </section>

      {/* ───────────────── TRE POMERIGGI */}
      <section aria-labelledby="tre-pomeriggi" className="container-festival pt-20 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeading
            id="tre-pomeriggi"
            eyebrow="Il programma"
            title="Tre pomeriggi,"
            light="due luoghi."
          />
          <p className="max-w-[56ch] font-serif text-lg leading-relaxed text-ink/85 sm:text-xl" data-reveal>
            Ogni lettore ha una radice: una persona, un libro, un luogo. Quest&apos;anno partiamo da lì. Il
            filo dei tre giorni è il coraggio di scegliere le proprie radici:{" "}
            <em className="font-semibold text-ink not-italic">la memoria</em>,{" "}
            <em className="font-semibold text-ink not-italic">il coraggio delle donne</em>,{" "}
            <em className="font-semibold text-ink not-italic">il viaggio</em>.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {days.map((day, index) => (
            <li
              key={day.id}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
              className="flex flex-col rounded-[1.75rem] border-2 border-ink/85 bg-cream p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[2.1rem] leading-none font-black tracking-[-0.03em] uppercase">
                  {day.weekday}
                </h3>
                <p className="font-display text-[2.1rem] leading-none font-light text-coral-strong tabular">
                  {day.date.slice(-2)}
                </p>
              </div>
              <p className="mt-3 font-display text-lg font-semibold text-ink">{day.theme}</p>
              <p className="mt-2 font-serif leading-relaxed text-ink/80">{day.intro}</p>
              <ul className="mt-6 space-y-4 border-t border-ink/15 pt-6">
                {highlightsForDay(day.id).map((s) => (
                  <li key={s.id} className="grid grid-cols-[3.6rem_1fr] gap-3">
                    <span className="font-display text-lg font-black text-ink tabular">{s.start}</span>
                    <span>
                      {s.href ? (
                        <Link
                          href={s.href}
                          className="link-underline font-display text-lg leading-snug font-bold"
                        >
                          {s.title}
                        </Link>
                      ) : (
                        <span className="font-display text-lg leading-snug font-bold">{s.title}</span>
                      )}
                      <span className="mt-1 block">
                        <VenueTag venue={s.venue} />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/programma#${day.anchor}`}
                className="mt-auto inline-flex items-center gap-2 pt-8 font-display font-semibold text-coral-deep hover:underline"
              >
                Tutto il programma di {day.weekday.toLowerCase()} <ArrowRight size={18} />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────────────── OSPITI */}
      <section aria-labelledby="gli-ospiti" className="mt-24 bg-paper py-20 sm:mt-32 sm:py-28">
        <div className="container-festival">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="gli-ospiti"
              eyebrow="Gli ospiti"
              title="Ogni ospite"
              light="è un libro."
              intro="Una testimone della memoria antimafia, una scrittrice che racconta le donne dentro la Storia, una studiosa del Gattopardo e una compagnia di teatro che legge ad alta voce."
            />
            <ButtonLink href="/ospiti" variant="secondary" icon={<ArrowRight size={18} />}>
              Tutti gli ospiti
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {guests.map((guest, index) => (
              <div key={guest.slug} data-reveal style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
                <GuestCard guest={guest} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── PICCOLE RADICI */}
      <section aria-labelledby="piccole-radici" className="container-festival pt-24 sm:pt-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-teal-soft px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <span aria-hidden="true" className="absolute -top-24 -right-20 size-80 rounded-full bg-teal/70" />
          <div className="relative">
            <SectionHeading
              id="piccole-radici"
              eyebrow="Per le famiglie"
              title="Piccole radici:"
              light="teatro e laboratori."
            />
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="max-w-[46ch] font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
                  Mentre i grandi ascoltano gli autori sul palco, i più piccoli sono al laboratorio alla Villa
                  dei lettori, con consegna e ritiro tramite braccialetto numerato. E davanti al palco, le
                  prime file con i cuscini sono per loro.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/famiglie" variant="ink" icon={<ArrowRight size={18} />}>
                    Il programma per le famiglie
                  </ButtonLink>
                </div>
              </div>
              <ul className="grid gap-3">
                {kidsSessions.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={s.href ?? "/famiglie"}
                      className="group flex items-start gap-4 rounded-2xl bg-cream/90 px-4 py-3 transition-colors hover:bg-cream sm:items-center"
                    >
                      <span className="w-12 shrink-0 pt-0.5 text-center sm:w-14 sm:pt-0">
                        <span className="block font-display text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
                          {s.day === "ven" ? "Ven" : s.day === "sab" ? "Sab" : "Dom"}
                        </span>
                        <span className="block font-display text-lg font-black tabular">{s.start}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display leading-snug font-bold group-hover:text-coral-deep">
                          {s.title}
                          {s.note ? <span className="font-light text-ink-muted"> · {s.note}</span> : null}
                        </span>
                        <span className="block text-sm text-ink-muted">
                          {s.activity.kicker ?? s.activity.summary}
                        </span>
                        <span className="mt-2 inline-flex rounded-full bg-teal-soft px-3 py-0.5 font-display text-sm font-semibold sm:hidden">
                          {s.audience.label}
                        </span>
                      </span>
                      <span className="hidden shrink-0 rounded-full bg-teal-soft px-3 py-1 font-display text-sm font-semibold sm:inline-flex">
                        {s.audience.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── LA MOSTRA */}
      <section aria-labelledby="la-mostra" className="mt-24 bg-ink text-cream sm:mt-32">
        <div className="relative container-festival grid gap-12 overflow-hidden py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-40 size-[26rem] rounded-full bg-teal/90 sm:size-[34rem]"
          />
          <div className="relative">
            <p className="eyebrow text-teal-soft">La mostra · tutti i giorni 17–22</p>
            <h2 id="la-mostra" className="mt-6 font-display text-headline">
              <span className="font-black">Radici libere.</span>{" "}
              <span className="mt-2 block text-title font-light">
                Peppino Impastato, una vita per immagini
              </span>
            </h2>
            <p className="mt-8 max-w-[56ch] font-serif text-lg leading-relaxed text-cream/90 sm:text-xl">
              Nato in una famiglia di mafia, scelse altre radici. Dai microfoni di Radio Aut, la radio libera
              che fondò nel 1977, denunciò gli affari dei boss fino a pagare con la vita, il 9 maggio 1978. La
              mostra racconta la sua storia per immagini ed è aperta per tutta la durata del festival.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/mostra-peppino-impastato" icon={<ArrowRight size={18} />}>
                Scopri la mostra
              </ButtonLink>
            </div>
          </div>
          <dl className="relative grid gap-4 self-end rounded-[1.5rem] bg-cream p-6 text-ink sm:grid-cols-2 sm:p-8 lg:grid-cols-1">
            {[
              ["Dove", "Villa dei lettori, nella villa comunale"],
              ["Quando", "16, 17 e 18 ottobre, dalle 17 alle 22"],
              ["Inaugurazione", "Venerdì 16 alle 17, prima visita guidata alle 17:20"],
              ["Ingresso", "Libero"],
            ].map(([dt, dd]) => (
              <div key={dt} className="border-b border-ink/12 pb-4 last:border-b-0 last:pb-0">
                <dt className="font-display text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">
                  {dt}
                </dt>
                <dd className="mt-1 font-display text-lg leading-snug font-bold">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────── #LAMIARADICE */}
      <section aria-labelledby="la-mia-radice" className="bg-coral text-ink">
        <div className="container-festival grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">#LaMiaRadice</p>
            <h2 id="la-mia-radice" className="mt-6 font-display text-headline">
              <span className="font-black">Chi ti ha messo in mano</span>{" "}
              <span className="font-light">il primo libro?</span>
            </h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                [
                  "Scrivi",
                  "il suo nome sul cartellino dell'Albero delle radici, alla Villa dei lettori. O crealo qui sul sito.",
                ],
                ["Fotografa", "il tuo cartellino, appeso all'albero o sul telefono."],
                ["Tagga", "quella persona con #LaMiaRadice: il festival viaggia sui profili di tutti."],
              ].map(([t, d], i) => (
                <li key={t} className="rounded-2xl bg-cream/95 p-5">
                  <span className="font-display text-sm font-black text-coral-deep">0{i + 1}</span>
                  <p className="mt-1 font-display text-xl font-black">{t}</p>
                  <p className="mt-1 text-[0.95rem] leading-snug text-ink/85">{d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ButtonLink href="/lamiaradice" variant="ink" icon={<ArrowRight size={18} />}>
                Crea il tuo cartellino
              </ButtonLink>
            </div>
          </div>
          <div className="flex justify-center pt-16 lg:pt-0">
            <KraftTag />
          </div>
        </div>
      </section>

      {/* ───────────────── LUOGHI E INFO */}
      <section aria-labelledby="due-luoghi" className="container-festival pt-24 sm:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              id="due-luoghi"
              eyebrow="Dove"
              title="Due luoghi,"
              light="a due passi."
              intro="Il palco per ascoltare, la villa per fare. Li unisce un sentiero di luci di circa cinquanta metri, nel centro storico di Acate."
            />
            <ul className="mt-10 grid gap-4">
              {[
                {
                  Icon: Ticket,
                  t: "Ingresso libero",
                  d: "A tutti gli appuntamenti, alla mostra e ai laboratori. Non serve prenotare.",
                },
                {
                  Icon: Kids,
                  t: "Con i bambini",
                  d: "Laboratori in parallelo agli incontri, con braccialetto numerato.",
                },
                {
                  Icon: Rain,
                  t: "Se piove",
                  d: "Palco coperto, mostra e laboratori in gazebo chiusi. Eventuali spostamenti annunciati qui entro le 15.",
                },
              ].map(({ Icon, t, d }) => (
                <li key={t} className="flex gap-4 rounded-2xl bg-paper p-5">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-ink">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold">{t}</span>
                    <span className="block leading-snug text-ink/80">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/info" variant="secondary" icon={<ArrowRight size={18} />}>
                Info e come arrivare
              </ButtonLink>
            </div>
          </div>
          <div data-reveal>
            <VenueMap />
          </div>
        </div>
      </section>
    </>
  );
}
