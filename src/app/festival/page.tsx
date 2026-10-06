import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import manifesto from "@/assets/manifesto.jpg";
import { PageHero } from "@/components/page-hero";
import { PhotoCredit } from "@/components/photo";
import { photos } from "@/content/photos";
import { buttonClass } from "@/components/button";
import {
  ArrowRight,
  Books,
  Download,
  Drum,
  Kids,
  Letter,
  Light,
  Mic,
  Phone,
  Screen,
  Tree,
} from "@/components/icons";
import { formats } from "@/content/formats";
import { days } from "@/content/venues";
import { site } from "@/content/site";
import type { Format } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Il festival e il tema Radici",
  description:
    "L'Acate Book Festival è la nuova festa del libro di Acate (RG): tre giornate su mafia, donne e immigrazione, una mostra, musica e teatro per i bambini.",
  path: "/festival",
  ownImage: true,
});

const formatCount: Record<number, string> = { 4: "Quattro", 5: "Cinque", 6: "Sei", 7: "Sette", 8: "Otto" };

const icons: Record<Format["icon"], typeof Light> = {
  light: Light,
  tree: Tree,
  books: Books,
  kids: Kids,
  mic: Mic,
  letter: Letter,
  phone: Phone,
  screen: Screen,
  drum: Drum,
};

export default function FestivalPage() {
  return (
    <>
      <PageHero
        eyebrow={`${site.edition} · ${site.year}`}
        title="Un festival"
        light="che mette radici."
        crumbs={[{ name: "Il festival" }]}
        intro={
          <p>
            «{site.claim}»: con questa idea il Comune di Acate apre la prima edizione del suo festival del
            libro. Tre giornate e tre temi, la mafia, le donne e l&apos;immigrazione, che mettono al centro i
            bambini e i ragazzi, l&apos;incontro fra generazioni e fra le diverse comunità che oggi vivono ad
            Acate, e la lettura come modo di stare insieme.
          </p>
        }
      />

      <section
        aria-labelledby="il-tema"
        className="container-festival grid gap-12 pt-8 lg:grid-cols-[1fr_1.2fr]"
      >
        <div>
          <p className="eyebrow text-ink">Il tema</p>
          <h2 id="il-tema" className="mt-4 font-display text-title">
            <span className="font-black">Il coraggio di scegliere</span>{" "}
            <span className="font-light">le proprie radici</span>
          </h2>
        </div>
        <ol className="grid gap-4">
          {days.map((d) => (
            <li
              key={d.id}
              className="grid gap-1 rounded-[1.5rem] bg-paper p-6 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <p className="font-display text-sm font-semibold tracking-[0.16em] text-ink-muted uppercase">
                {d.label}
              </p>
              <div>
                <h3 className="font-display text-xl">
                  <Link href={`/giornate/${d.slug}`} className="link-underline">
                    <span className="font-black uppercase">{d.topic}</span>{" "}
                    <span className="font-light">· {d.theme}</span>
                  </Link>
                </h3>
                <p className="mt-1 font-serif leading-relaxed text-ink/85">{d.claim}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="i-format" className="mt-24 bg-ink py-20 text-cream sm:py-28">
        <div className="container-festival">
          <p className="eyebrow text-teal-soft">Tra un incontro e l&apos;altro</p>
          <h2 id="i-format" className="mt-4 font-display text-headline">
            <span className="font-black">{formatCount[formats.length] ?? formats.length} format,</span>{" "}
            <span className="font-light">nessun momento vuoto</span>
          </h2>
          <p className="mt-6 max-w-[60ch] font-serif text-lg leading-relaxed text-cream/90">
            Il palco del Castello e la Villa dei lettori lavorano sempre insieme: mentre da una parte si
            ascolta, dall&apos;altra si fa. Ogni fascia del pomeriggio ha un appuntamento riconoscibile.
          </p>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f) => {
              const Icon = icons[f.icon];
              return (
                <li
                  key={f.slug}
                  id={f.slug}
                  className="relative flex scroll-mt-28 flex-col rounded-[1.5rem] bg-cream/[0.06] p-6 ring-1 ring-cream/15 transition-colors hover:bg-cream/10"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-teal text-ink">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-tight font-extrabold">
                    {f.href ? (
                      <Link href={f.href} className="after:absolute after:inset-0 hover:text-coral">
                        {f.name}
                      </Link>
                    ) : (
                      f.name
                    )}
                  </h3>
                  <p className="mt-1 font-display text-sm font-semibold text-teal-soft">{f.when}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/85">{f.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="chi-lo-fa"
        className="container-festival grid gap-14 pt-24 lg:grid-cols-[1fr_1.1fr]"
      >
        <div>
          <p className="eyebrow text-ink">Chi fa crescere il festival</p>
          <h2 id="chi-lo-fa" className="mt-4 font-display text-title">
            <span className="font-black">Una comunità</span> <span className="font-light">al lavoro</span>
          </h2>
          <div className="prose-festival mt-6">
            <p>
              L&apos;Acate Book Festival è promosso dal <strong>Comune di Acate</strong> ed è finanziato dalla{" "}
              <strong>
                {site.funding.region} – {site.funding.department}
              </strong>{" "}
              (contributo concesso con {site.funding.decree}).
            </p>
            <p>
              L&apos;organizzazione è di <strong>{site.production.name}</strong>, in collaborazione con
              l&apos;<strong>Associazione Culturale Santa Briganti</strong> di Vittoria, che firma «A colpi di
              mantice», letture musicate con laboratorio, e lo spettacolo di chiusura, con la{" "}
              <strong>Banda Città di Acate</strong> e <strong>I Grifoni di Biscari – Tamburi di Acate</strong>
              , che aprono le giornate, e con <strong>Mondadori Bookstore Vittoria</strong>, la libreria
              partner.
            </p>
            <p>
              Ad accogliervi ci sono i volontari «Radici», con la maglietta del festival: come le «magliette
              blu» di Festivaletteratura, sono il volto del festival tra il palco e la villa.
            </p>
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-paper p-7 sm:p-9">
          <p className="eyebrow text-ink">Dopo il festival</p>
          <h2 className="mt-4 font-display text-2xl font-black">Quello che resta ad Acate</h2>
          <ul className="prose-festival mt-6">
            <li>Una selezione dei libri presentati viene donata alla Biblioteca comunale.</li>
            <li>L&apos;audio degli incontri diventa l&apos;archivio del festival.</li>
            <li>E l&apos;appuntamento con la seconda edizione, nel 2027.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="il-manifesto" className="container-festival pt-24">
        <div className="grid items-center gap-12 rounded-[2rem] border-2 border-ink/85 p-6 sm:p-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="mx-auto w-full max-w-sm">
            <Image
              src={manifesto}
              alt="Il manifesto della I edizione: la scritta Acate Book Festival, 16/17/18 ottobre 2026, e la chiesa e il castello di Acate costruiti con i libri sotto un sole turchese."
              sizes="(min-width: 1024px) 24rem, 80vw"
              placeholder="blur"
              className="h-auto w-full rounded-lg shadow-[0_30px_60px_-30px_rgb(7_42_95/0.6)]"
            />
          </div>
          <div>
            <p className="eyebrow text-ink">Il manifesto</p>
            <h2 id="il-manifesto" className="mt-4 font-display text-title">
              <span className="font-black">Una città</span> <span className="font-light">fatta di libri</span>
            </h2>
            <p className="mt-6 max-w-[52ch] font-serif text-lg leading-relaxed text-ink/85">
              Il manifesto della prima edizione costruisce con i libri la torre del Castello dei Principi di
              Biscari e la chiesa accanto, il cuore del centro storico di Acate. In alto, i loghi di chi fa il
              festival. Puoi scaricarlo e condividerlo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/manifesto/acate-book-festival-2026-manifesto.jpg"
                download
                data-track="content_download"
                data-track-label="manifesto"
                className={buttonClass("ink")}
              >
                <Download size={18} /> Scarica il manifesto (JPG)
              </a>
              <Link href="/programma" className={buttonClass("secondary")}>
                Vedi il programma <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="crediti"
        aria-labelledby="crediti-titolo"
        className="container-festival scroll-mt-28 pt-24"
      >
        <p className="eyebrow text-ink">Crediti</p>
        <h2 id="crediti-titolo" className="mt-4 font-display text-title">
          <span className="font-black">Le immagini</span> <span className="font-light">del sito</span>
        </h2>
        <ul className="mt-8 grid gap-4 text-[0.95rem] leading-relaxed md:grid-cols-2">
          <li className="rounded-[1.25rem] bg-paper p-5">
            <span className="block font-display font-bold">Illustrazioni e lettering</span>
            Dal manifesto ufficiale della I edizione.
          </li>
          <li className="rounded-[1.25rem] bg-paper p-5">
            <span className="block font-display font-bold">Ritratti e loghi</span>I ritratti degli autori sono
            forniti dall&apos;organizzazione; i loghi dalle associazioni e dai partner. Lo stemma del Comune
            di Acate è quello del manifesto.
          </li>
          {Object.values(photos).map((photo) => (
            <li key={photo.source} className="rounded-[1.25rem] bg-paper p-5">
              <span className="block font-display font-bold">{photo.caption}</span>
              <PhotoCredit photo={photo} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
