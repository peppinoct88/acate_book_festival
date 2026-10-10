import Image from "next/image";
import Link from "next/link";
import heroIllustration from "@/assets/illustrazione-manifesto.png";
import { Logotype } from "@/components/logotype";
import { ButtonLink, buttonClass } from "@/components/button";
import { CalendarMenu } from "@/components/calendar-menu";
import { festivalCalendarOptions } from "@/lib/calendar";
import { ArrowRight, Clock, Kids, Ticket } from "@/components/icons";
import { FestivalStatus } from "@/components/festival-status";
import { SectionHeading } from "@/components/section-heading";
import { GuestCard } from "@/components/guest-card";
import { GuestVisual } from "@/components/guest-visual";
import { DayCard } from "@/components/day-card";
import { Photo } from "@/components/photo";
import { VenueMap } from "@/components/venue-map";
import { KraftTag } from "@/components/kraft-tag";
import { JsonLd } from "@/components/json-ld";
import { authorSlugs, getGuest, guests } from "@/content/guests";
import { photos } from "@/content/photos";
import { days } from "@/content/venues";
import { exhibition, festivalHours, openingSummary, sessions, spokenTime } from "@/content/program";
import { site } from "@/content/site";
import { festivalJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { MysteryGuestCard } from "@/components/mystery-guest";
import { anyHidden, isHidden } from "@/content/reveal";

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
  // un autore per giornata: chi è ancora segreto (reveal.ts) ha la scheda «Chi sarà?»
  const authors = authorSlugs.map((slug, index) => ({ slug, day: days[index], guest: getGuest(slug) }));
  const onStage = guests.filter((g) => !authorSlugs.includes(g.slug));
  const shuma = sessions.find((s) => s.activity.slug === "shuma")!;

  return (
    <>
      <JsonLd data={festivalJsonLd()} />

      {/* ───────────────── HERO: il manifesto */}
      <section aria-labelledby="titolo-festival" className="relative overflow-hidden">
        <div className="relative container-festival grid items-end gap-y-4 lg:static lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-4">
          <div className="relative z-10 pt-7 pb-2 sm:pt-12 lg:self-center lg:pt-4 lg:pb-12">
            <div className="flex animate-rise flex-wrap items-center gap-x-6 gap-y-3">
              <p className="eyebrow text-ink">I edizione</p>
              <FestivalStatus hours={festivalHours} />
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
                <time dateTime="2026-10-16">16</time> <span className="text-coral-strong">/</span>{" "}
                <time dateTime="2026-10-17">17</time> <span className="text-coral-strong">/</span>{" "}
                <time dateTime="2026-10-18">18 ottobre 2026</time>
              </p>
              <p className="eyebrow mt-3 tracking-[0.3em]! text-ink [&::after]:bg-coral">Acate</p>
            </div>

            <div className="mt-8 max-w-xl animate-rise [animation-delay:340ms] lg:mt-[min(3.5svh,2rem)]">
              <p className="font-display text-[1.35rem] leading-snug font-light text-ink sm:text-2xl">
                <strong className="font-black">Radici.</strong> Tre giornate, tre temi:{" "}
                <strong className="font-bold">mafia, donne, immigrazione.</strong> Libri, incontri, teatro e
                musica nel centro storico di Acate.
              </p>
              <p className="mt-3 font-display text-[0.95rem] font-semibold text-ink-muted">
                {openingSummary()} · ingresso libero
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
                <CalendarMenu
                  label="Aggiungi al calendario"
                  srContext="le tre giornate del festival"
                  options={festivalCalendarOptions()}
                  trackLocation="hero"
                  trackLabel="festival"
                  summaryClassName={buttonClass("secondary")}
                />
              </div>
            </div>
          </div>

          <div className="relative -mx-[clamp(1rem,4vw,3rem)] lg:absolute lg:right-0 lg:bottom-0 lg:mx-0 lg:h-[calc(100svh-5rem)] lg:max-h-[62rem] lg:w-[min(56vw,calc(100vw-30rem))] lg:max-w-[68rem]">
            <Image
              src={heroIllustration}
              alt="Illustrazione del manifesto: la chiesa e il castello di Acate costruiti con libri colorati, sotto un sole turchese."
              loading="eager"
              placeholder="blur"
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full animate-settle select-none [animation-delay:120ms] lg:h-full lg:object-contain lg:object-right-bottom"
            />
          </div>
        </div>
      </section>

      {/* ───────────────── TRE GIORNATE, TRE TEMI */}
      <section aria-labelledby="tre-giornate" className="container-festival pt-20 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeading id="tre-giornate" eyebrow="Il programma" title="Tre giornate," light="tre temi." />
          <p className="max-w-[56ch] font-serif text-lg leading-relaxed text-ink/85 sm:text-xl" data-reveal>
            Ogni lettore ha una radice: una persona, un libro, un luogo. Quest&apos;anno ogni giornata ne
            segue una: <em className="font-semibold text-ink not-italic">la memoria contro la mafia</em>,{" "}
            <em className="font-semibold text-ink not-italic">il coraggio delle donne</em>,{" "}
            <em className="font-semibold text-ink not-italic">il viaggio di chi arriva dal mare</em>.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {days.map((day, index) => (
            <li key={day.id} data-reveal style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}>
              <DayCard day={day} />
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
              intro={
                anyHidden
                  ? "Un autore per ogni giornata, svelato uno alla volta sui nostri social. E sul palco il teatro, la musica e i tamburi di Acate."
                  : "Un autore per ogni giornata: il fratello di Peppino Impastato, una scrittrice che racconta le donne dentro la Storia, una studiosa del Gattopardo. E sul palco il teatro, la musica e i tamburi di Acate."
              }
            />
            <ButtonLink href="/ospiti" variant="secondary" icon={<ArrowRight size={18} />}>
              Tutti gli ospiti
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map(({ slug, day, guest }, index) => (
              <div key={day.id} data-reveal style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
                {guest ? <GuestCard guest={guest} /> : <MysteryGuestCard slug={slug} day={day} />}
              </div>
            ))}
          </div>
          <h3 className="eyebrow mt-20 text-ink">Sul palco</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {onStage.map((guest) => (
              <li key={guest.slug}>
                <Link
                  href={`/ospiti/${guest.slug}`}
                  className="group flex h-full items-center gap-4 rounded-[1.5rem] bg-cream p-4 transition-colors hover:bg-cream/70"
                >
                  <span className="w-20 shrink-0">
                    <GuestVisual guest={guest} variant="avatar" sizes="5rem" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg leading-tight font-extrabold group-hover:text-coral-deep">
                      {guest.type === "compagnia" ? "Santa Briganti" : guest.name}
                    </span>
                    <span className="mt-1 block text-sm text-ink-muted">{guest.role}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────── PICCOLE RADICI */}
      <section aria-labelledby="piccole-radici" className="container-festival pt-24 sm:pt-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-teal-soft px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <span
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-44 rounded-full bg-teal/70 sm:-top-24 sm:-right-20 sm:size-80"
          />
          <div className="relative">
            <SectionHeading
              id="piccole-radici"
              eyebrow="Per le famiglie"
              title="Piccole radici:"
              light="teatro e letture."
            />
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="max-w-[46ch] font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
                  Venerdì «A colpi di mantice»: letture musicate dal vivo e un laboratorio per bambini e
                  ragazzi, con Santa Briganti. Domenica{" "}
                  {isHidden("maria-antonietta-ferraloro")
                    ? "un incontro sul Gattopardo per ragazze e ragazzi"
                    : "il Gattopardo raccontato alle ragazze e ai ragazzi"}{" "}
                  e, per chiudere, la favola in fondo al mare di «Shuma».
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
        <div className="relative container-festival grid gap-14 overflow-hidden py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 size-[26rem] rounded-full bg-teal/25 sm:size-[34rem]"
          />
          <div className="relative">
            <p className="eyebrow text-teal-soft">Venerdì 16 · Mafia · la mostra</p>
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
            <dl className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ["Dove", "Villa dei lettori"],
                ["Quando", "16–18 ottobre, 17–22"],
                ["Inaugurazione", "Venerdì 16 alle 17"],
                ["Ingresso", "Libero"],
              ].map(([dt, dd]) => (
                <div key={dt} className="border-t border-cream/20 pt-3">
                  <dt className="font-display text-xs font-semibold tracking-[0.18em] text-teal-soft uppercase">
                    {dt}
                  </dt>
                  <dd className="mt-1 font-display text-lg leading-snug font-bold">{dd}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/mostra-peppino-impastato" icon={<ArrowRight size={18} />}>
                Scopri la mostra
              </ButtonLink>
              <ButtonLink href="/giornate/mafia" variant="light" icon={<ArrowRight size={18} />}>
                La giornata sulla mafia
              </ButtonLink>
            </div>
          </div>
          <div data-reveal className="relative">
            <Photo
              photo={photos.casaMemoria}
              sizes="(min-width: 1024px) 40vw, 100vw"
              tone="light"
              imageClassName="aspect-[4/5] lg:aspect-[4/5]"
            />
          </div>
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

      {/* ───────────────── LA CITTÀ */}
      <section aria-labelledby="la-citta" className="container-festival pt-24 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div data-reveal className="order-2 lg:order-1">
            <Photo
              photo={photos.castello}
              sizes="(min-width: 1024px) 55vw, 100vw"
              imageClassName="aspect-[4/3]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading id="la-citta" eyebrow="La città" title="Acate," light="la città del festival." />
            <div className="mt-8 space-y-5 font-serif text-lg leading-relaxed text-ink/85">
              <p>
                Fino al 1938 si chiamava Biscari. Il Castello dei Principi di Biscari, la casata dei Paternò
                Castello, guarda piazza Libertà e il centro disegnato a scacchiera; di fronte, in via
                Archimede, c&apos;è il palco del festival.
              </p>
              <p>
                La città custodisce le reliquie del patrono, San Vincenzo martire, e ne rievoca ogni anno
                l&apos;arrivo con il Corteo storico, dove sfilano la Banda e i Tamburi di Acate. Intorno, la
                valle del Dirillo, i vigneti e le campagne che arrivano fino al mare.
              </p>
            </div>
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
              light="nel centro storico."
              intro="Il palco per ascoltare, all'aperto in via Archimede, di fronte al castello; la villa comunale per i libri, l'Albero delle radici e, venerdì, la mostra su Peppino Impastato."
            />
            <ul className="mt-10 grid gap-4">
              {[
                {
                  Icon: Ticket,
                  t: "Ingresso libero",
                  d: "A tutti gli appuntamenti e alla mostra. Non serve prenotare.",
                },
                {
                  Icon: Kids,
                  t: "Con i bambini",
                  d: `Venerdì alle 18 «A colpi di mantice», letture musicate e laboratorio. Domenica alle ${spokenTime(shuma.start)} «Shuma», dagli 8 anni.`,
                },
                {
                  Icon: Clock,
                  t: "La mostra",
                  d: `«Radici libere», alla Villa dei lettori: solo venerdì 16 ottobre, dalle ${spokenTime(exhibition.start)} alle ${spokenTime(exhibition.end)}.`,
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
