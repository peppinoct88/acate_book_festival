import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { VenueMap } from "@/components/venue-map";
import { JsonLd } from "@/components/json-ld";
import {
  Accessibility,
  ArrowRight,
  Books,
  Bus,
  Calendar,
  Camera,
  Car,
  Clock,
  Kids,
  Plane,
  Ticket,
  Train,
} from "@/components/icons";
import { faq } from "@/content/faq";
import { photos } from "@/content/photos";
import { Photo } from "@/components/photo";
import { site } from "@/content/site";
import { faqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Info, luoghi e come arrivare",
  description:
    "Orari, luoghi, come arrivare ad Acate, accessibilità e domande frequenti sull'Acate Book Festival, 16-18 ottobre 2026. Ingresso libero.",
  path: "/info",
  ownImage: true,
});

const essentials = [
  { Icon: Calendar, title: "Quando", text: "Venerdì 16, sabato 17 e domenica 18 ottobre 2026." },
  {
    Icon: Clock,
    title: "Orari",
    text: "Appuntamenti dalle 17 alle 20:30 circa. La mostra resta aperta fino alle 22.",
  },
  { Icon: Ticket, title: "Ingresso", text: "Libero a tutti gli appuntamenti, senza prenotazione." },
  {
    Icon: Kids,
    title: "Bambini",
    text: "Venerdì alle 18 «A colpi di mantice», letture musicate e laboratorio. Domenica alle 19:30 «Shuma», dagli 8 anni.",
  },
];

const gettingThere = [
  {
    Icon: Car,
    title: "In auto",
    text: "Acate è nella parte occidentale della provincia di Ragusa, a circa 8 km da Vittoria, 28 km da Gela e 34 km da Ragusa. È il modo più comodo per arrivare.",
  },
  {
    Icon: Plane,
    title: "In aereo",
    text: "L'aeroporto più vicino è quello di Comiso, a circa 15 km (un quarto d'ora d'auto). L'aeroporto di Catania Fontanarossa è a circa un'ora e mezza.",
  },
  {
    Icon: Bus,
    title: "In autobus",
    text: "Acate è collegata da linee extraurbane AST (Azienda Siciliana Trasporti): gli orari si consultano sul sito dell'azienda.",
  },
  {
    Icon: Train,
    title: "In treno",
    text: "La stazione ferroviaria di Acate è sulla linea Siracusa–Gela–Canicattì, servita da poche corse al giorno: controlla orari e collegamenti con il centro prima di partire.",
  },
];

export default function InfoPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <PageHero
        eyebrow="Info pratiche"
        title="Tutto quello"
        light="che serve sapere."
        crumbs={[{ name: "Info" }]}
        intro="Il festival si svolge nel centro storico di Acate, tra il Castello dei Principi di Biscari e la villa comunale. Ecco come arrivare, cosa aspettarsi e a chi chiedere."
      >
        <nav aria-label="In questa pagina">
          <ul className="flex flex-wrap gap-2 font-display text-[0.95rem] font-semibold">
            {[
              ["#luoghi", "I luoghi"],
              ["#come-arrivare", "Come arrivare"],
              ["#accessibilita", "Accessibilità"],
              ["#domande", "Domande frequenti"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-ink/80 bg-cream px-4 hover:bg-ink hover:text-cream"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-festival">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {essentials.map(({ Icon, title, text }) => (
            <li key={title} className="rounded-[1.5rem] bg-paper p-6">
              <Icon size={24} />
              <h2 className="mt-3 font-display text-xl font-extrabold">{title}</h2>
              <p className="mt-1 leading-snug text-ink/85">{text}</p>
            </li>
          ))}
        </ul>

        <section id="luoghi" aria-labelledby="luoghi-titolo" className="scroll-mt-28 pt-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow text-ink">Dove</p>
              <h2 id="luoghi-titolo" className="mt-4 font-display text-title">
                <span className="font-black">Due luoghi,</span>{" "}
                <span className="font-light">nel centro storico</span>
              </h2>
              <div className="prose-festival mt-6">
                <p>
                  Il <strong>Palco del Castello</strong> è all&apos;aperto, in via Archimede, di fronte al
                  Castello dei Principi di Biscari: qui si tengono gli incontri con gli autori e gli
                  spettacoli.
                </p>
                <p>
                  La <strong>Villa dei lettori</strong> è nella villa comunale: qui trovi l&apos;accoglienza,
                  la mostra, il bookshop e l&apos;Albero delle radici.
                </p>
                <p>
                  Il <strong>Comune di Acate</strong> è in {site.organizer.address}.
                </p>
              </div>
            </div>
            <VenueMap headingLevel={3} />
          </div>
        </section>

        <section id="come-arrivare" aria-labelledby="arrivare-titolo" className="scroll-mt-28 pt-24">
          <p className="eyebrow text-ink">Come arrivare</p>
          <h2 id="arrivare-titolo" className="mt-4 font-display text-title">
            <span className="font-black">Acate,</span> <span className="font-light">provincia di Ragusa</span>
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {gettingThere.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-5 rounded-[1.5rem] border-2 border-ink/12 p-6">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-soft">
                  <Icon size={22} />
                </span>
                <span>
                  <h3 className="font-display text-xl font-extrabold">{title}</h3>
                  <p className="mt-1 leading-relaxed text-ink/85">{text}</p>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            Distanze e tempi sono indicativi. Per raggiungere i due luoghi del festival usa i pulsanti
            «Portami lì» nella mappa qui sopra.
          </p>
          <Photo
            photo={photos.acateDallAlto}
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="mt-12 max-w-4xl"
            imageClassName="aspect-[16/9]"
          />
        </section>

        <section id="accessibilita" aria-labelledby="accessibilita-titolo" className="scroll-mt-28 pt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow text-ink">Per tutti</p>
              <h2 id="accessibilita-titolo" className="mt-4 font-display text-title">
                <span className="font-black">Accessibilità</span>
              </h2>
            </div>
            <ul className="grid gap-4">
              {[
                {
                  Icon: Accessibility,
                  t: "Spazi all'aperto",
                  d: "Gli appuntamenti si svolgono all'aperto, tra via Archimede, di fronte al Castello, e la villa comunale. Se hai bisogno di un posto riservato o di essere accompagnato, rivolgiti all'accoglienza della Villa dei lettori o ai volontari «Radici»: ti aiutiamo noi.",
                },
                {
                  Icon: Books,
                  t: "Il sito",
                  d: "Questo sito è progettato per essere usato da tastiera, con i lettori di schermo e a ogni dimensione dello schermo.",
                },
                {
                  Icon: Camera,
                  t: "Foto e riprese",
                  d: "Gli appuntamenti vengono fotografati e ripresi per raccontare il festival. Per i minori del laboratorio di «A colpi di mantice» chiediamo il consenso di un genitore.",
                },
              ].map(({ Icon, t, d }) => (
                <li key={t} className="flex gap-5 rounded-[1.5rem] bg-paper p-6">
                  <Icon size={24} className="mt-1 shrink-0" />
                  <span>
                    <h3 className="font-display text-xl font-extrabold">{t}</h3>
                    <p className="mt-1 leading-relaxed text-ink/85">{d}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            Leggi anche la{" "}
            <Link href="/accessibilita" className="underline underline-offset-2">
              dichiarazione di accessibilità del sito
            </Link>
            .
          </p>
        </section>

        <section id="bookshop" aria-labelledby="bookshop-titolo" className="scroll-mt-28 pt-24">
          <div className="grid gap-6 rounded-[2rem] border-2 border-ink/85 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 id="bookshop-titolo" className="font-display text-title">
                <span className="font-black">Il bookshop</span>
              </h2>
              <p className="mt-3 max-w-[60ch] font-serif text-lg leading-relaxed text-ink/85">
                Alla Villa dei lettori trovi i libri degli ospiti del festival, con Mondadori Bookstore
                Vittoria, la libreria partner. Dopo ogni incontro gli autori firmano le copie.
              </p>
            </div>
            <Link
              href="/ospiti"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-display font-semibold text-cream hover:bg-coral hover:text-ink"
            >
              Gli ospiti e i loro libri <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section id="domande" aria-labelledby="domande-titolo" className="scroll-mt-28 pt-24">
          <p className="eyebrow text-ink">Domande frequenti</p>
          <h2 id="domande-titolo" className="mt-4 font-display text-title">
            <span className="font-black">Chiedi</span> <span className="font-light">pure</span>
          </h2>
          <div className="mt-10 divide-y divide-ink/12 border-y border-ink/12">
            {faq.map((item) => (
              <details key={item.q} className="group py-2">
                <summary className="flex min-h-14 items-center justify-between gap-6 py-3 font-display text-xl font-bold">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink/80 text-2xl leading-none font-light transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[70ch] pr-14 pb-5 font-serif text-lg leading-relaxed text-ink/85">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="contatti-titolo" className="pt-24">
          <div className="rounded-[2rem] bg-paper p-8 sm:p-10">
            <h2 id="contatti-titolo" className="font-display text-title">
              <span className="font-black">Contatti</span>
            </h2>
            <div className="prose-festival mt-4">
              {site.contacts.email ? (
                <p>
                  Per informazioni scrivi a{" "}
                  <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>.
                </p>
              ) : null}
              <p>
                Durante il festival trovi l&apos;accoglienza alla Villa dei lettori, dalle 17 alle 22. Il
                festival è promosso dal{" "}
                <a href={site.organizer.url} rel="noopener">
                  {site.organizer.name}
                </a>{" "}
                ({site.organizer.address}).
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
