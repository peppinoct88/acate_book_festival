import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SessionCard } from "@/components/session-card";
import { LiveStatus } from "@/components/live-status";
import { ButtonLink } from "@/components/button";
import { ArrowRight, Kids, Letter, Tree, Ticket } from "@/components/icons";
import { sessionsForDay } from "@/content/program";
import { days } from "@/content/venues";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Piccole radici: per le famiglie",
  description:
    "Teatro, letture musicate e laboratori per bambini e ragazzi all'Acate Book Festival, 16-18 ottobre 2026, mentre i genitori seguono gli incontri.",
  path: "/famiglie",
});

const howItWorks = [
  {
    Icon: Kids,
    title: "Mentre i grandi ascoltano",
    text: "I laboratori si svolgono alla Villa dei lettori mentre l'autore parla sul palco: i genitori restano all'incontro, i bambini creano.",
  },
  {
    Icon: Ticket,
    title: "Braccialetto numerato",
    text: "All'accoglienza della Villa dei lettori ogni bambino riceve un braccialetto: si consegna e si ritira con quello.",
  },
  {
    Icon: Tree,
    title: "In prima fila",
    text: "Davanti al Palco del Castello le prime file della platea hanno i cuscini: sono per i bambini.",
  },
  {
    Icon: Letter,
    title: "Ognuno alla sua età",
    text: "Accanto a ogni appuntamento trovi l'età consigliata. Le tre repliche di «A colpi di mantice» sono pensate per età diverse.",
  },
];

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        tone="teal"
        eyebrow="Per le famiglie"
        title="Piccole radici:"
        light="teatro e laboratori."
        crumbs={[{ name: "Famiglie" }]}
        intro="Ogni pomeriggio c'è un appuntamento per i bambini prima dell'autore, e un laboratorio mentre l'autore parla. Tutto a ingresso libero, senza prenotazione."
      />

      <section aria-labelledby="come-funziona" className="container-festival pt-16 sm:pt-20">
        <h2 id="come-funziona" className="eyebrow text-ink">
          Come funziona
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map(({ Icon, title, text }) => (
            <li key={title} className="rounded-[1.5rem] bg-paper p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-teal-soft">
                <Icon size={21} />
              </span>
              <h3 className="mt-4 font-display text-xl font-extrabold">{title}</h3>
              <p className="mt-2 leading-snug text-ink/85">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="container-festival">
        {days.map((day) => {
          const list = sessionsForDay(day.id).filter((s) => s.audience.kids);
          return (
            <section key={day.id} aria-labelledby={`famiglie-${day.anchor}`} className="pt-16 sm:pt-20">
              <p className="eyebrow text-ink">{day.theme}</p>
              <h2 id={`famiglie-${day.anchor}`} className="mt-4 font-display text-title font-black uppercase">
                {day.label}
              </h2>
              <ol className="mt-6 border-b border-ink/12">
                {list.map((s) => (
                  <li key={s.id}>
                    <SessionCard session={s} />
                  </li>
                ))}
              </ol>
            </section>
          );
        })}

        <section className="mt-20 grid gap-6 rounded-[2rem] bg-ink p-8 text-cream sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-teal-soft">Il finale</p>
            <h2 className="mt-4 font-display text-title">
              <span className="font-black">«Shuma»,</span>{" "}
              <span className="font-light">una favola in fondo al mare</span>
            </h2>
            <p className="mt-4 max-w-[56ch] font-serif text-lg leading-relaxed text-cream/90">
              Domenica alle 19 lo spettacolo di Peppe Macauda chiude il festival: un bambino caduto in mare e
              un lungo viaggio verso il «SopraSopra». Consigliato dagli 8 anni. Prima, alle 17:45, il
              laboratorio «La pagella dei sogni» prepara i più piccoli allo spettacolo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/programma/shuma" icon={<ArrowRight size={18} />}>
              Scopri «Shuma»
            </ButtonLink>
          </div>
        </section>

        <p className="mt-12 font-serif text-lg text-ink/85">
          Per le domande pratiche (pioggia, foto, cosa portare) c&apos;è la pagina{" "}
          <Link href="/info#domande" className="text-coral-deep underline underline-offset-4">
            Info e domande frequenti
          </Link>
          .
        </p>
      </div>
      <LiveStatus />
    </>
  );
}
