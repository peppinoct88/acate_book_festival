import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/button";
import { ArrowRight, MapPin } from "@/components/icons";
import { Photo, PhotoCredit } from "@/components/photo";
import { photos } from "@/content/photos";
import { venues } from "@/content/venues";
import { breadcrumbJsonLd, exhibitionJsonLd } from "@/lib/jsonld";
import { mapsUrl } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mostra su Peppino Impastato ad Acate: «Radici libere»",
  absoluteTitle: true,
  description:
    "«Radici libere. Peppino Impastato, una vita per immagini»: la mostra fotografica dell'Acate Book Festival, 16-18 ottobre 2026, dalle 17 alle 22.",
  path: "/mostra-peppino-impastato",
  ownImage: true,
});

const timeline = [
  {
    year: "1948",
    text: "Il 5 gennaio Giuseppe «Peppino» Impastato nasce a Cinisi, in provincia di Palermo, in una famiglia legata alla mafia.",
  },
  {
    year: "Anni '60",
    text: "Da ragazzo rompe con il padre e con quel mondo, e sceglie l'impegno politico e culturale.",
  },
  {
    year: "1977",
    text: "Fonda Radio Aut, una radio libera e autofinanziata. Dai suoi microfoni denuncia gli affari dei mafiosi di Cinisi e Terrasini; nella trasmissione satirica «Onda pazza a Mafiopoli» li mette alla berlina.",
  },
  {
    year: "1978",
    text: "È candidato alle elezioni comunali di Cinisi. Nella notte tra l'8 e il 9 maggio viene ucciso: il suo corpo, dilaniato da una carica di tritolo sui binari della ferrovia, viene fatto passare per quello di un attentatore. Pochi giorni dopo gli elettori di Cinisi lo eleggono simbolicamente in consiglio comunale.",
  },
  {
    year: "2002",
    text: "L'11 aprile il boss Gaetano Badalamenti è condannato all'ergastolo come mandante dell'omicidio.",
  },
  {
    year: "Oggi",
    text: "La sua memoria vive a Cinisi, in Casa Memoria Felicia e Peppino Impastato, la casa di famiglia aperta a chi vuole conoscerne la storia.",
  },
];

export default function ExhibitionPage() {
  return (
    <>
      <JsonLd data={exhibitionJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "La mostra «Radici libere»" }])} />

      <PageHero
        tone="ink"
        eyebrow="La mostra · 16, 17 e 18 ottobre"
        title="Radici libere."
        light="Peppino Impastato, una vita per immagini"
        crumbs={[{ name: "La mostra" }]}
        intro="La mostra fotografica che accompagna tutti e tre i giorni del festival, alla Villa dei lettori. Aperta dalle 17 alle 22, a ingresso libero."
      >
        <dl className="grid max-w-3xl gap-px overflow-hidden rounded-[1.25rem] bg-cream/20 sm:grid-cols-3">
          {[
            ["Dove", "Villa dei lettori"],
            ["Orari", "17:00–22:00, tutti i giorni"],
            ["Inaugurazione", "Ven 16 alle 17 · visita guidata alle 17:20"],
          ].map(([dt, dd]) => (
            <div key={dt} className="bg-ink px-5 py-4">
              <dt className="font-display text-xs font-semibold tracking-[0.18em] text-teal-soft uppercase">
                {dt}
              </dt>
              <dd className="mt-1 font-display text-lg leading-snug font-bold text-cream">{dd}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <div className="container-festival grid gap-16 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        <section aria-labelledby="il-nome">
          <h2 id="il-nome" className="font-display text-title">
            <span className="font-black">Perché</span> <span className="font-light">«Radici libere»</span>
          </h2>
          <div className="prose-festival mt-6">
            <p>
              Peppino Impastato era nato in una famiglia di mafia e scelse altre radici. Il titolo tiene
              insieme le due cose: le radici che si scelgono, che sono il filo di tutto il festival, e la
              libertà della sua voce, quella di Radio Aut, la radio libera che fondò nel 1977.
            </p>
            <p>
              La mostra racconta la sua vita per immagini, ed è il filo che tiene insieme le tre giornate: si
              inaugura venerdì 16 alle 17, nella giornata che il festival dedica alla mafia, poco prima
              dell&apos;incontro con suo fratello Giovanni, e resta aperta ogni sera fino alle 22.
            </p>
          </div>
          <Photo
            photo={photos.casaMemoria}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="mt-10"
            imageClassName="aspect-[4/3]"
          />

          <figure className="mt-14 rounded-[1.5rem] bg-cream p-6 ring-1 ring-ink/12">
            <Image
              src={photos.radioAut.src}
              alt={photos.radioAut.alt}
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="h-auto w-full max-w-sm"
            />
            <figcaption className="mt-3 text-sm leading-snug">
              <span className="block font-display font-semibold text-ink">{photos.radioAut.caption}</span>
              <PhotoCredit photo={photos.radioAut} />
            </figcaption>
          </figure>

          <h2 className="mt-14 font-display text-title">
            <span className="font-black">Lo scaffale</span> <span className="font-light">di Peppino</span>
          </h2>
          <div className="prose-festival mt-6">
            <p>
              Accanto alle fotografie, una mensola con i libri di Peppino. Nella sua stanza, ricostruita a
              Cinisi, sul comodino c&apos;è ancora l&apos;ultimo libro che lesse: «La scomparsa di Majorana»
              di Leonardo Sciascia. Nella sala lettura della casa ci sono anche «La peste» di Albert Camus e
              le opere di Lenin.
            </p>
          </div>

          <h2 className="mt-14 font-display text-title">
            <span className="font-black">Come</span> <span className="font-light">visitarla</span>
          </h2>
          <ul className="prose-festival mt-6">
            <li>
              Dopo il tramonto la mostra è illuminata: è l&apos;unico spazio del festival aperto fino alle 22.
            </li>
            <li>
              All&apos;ingresso un pannello racconta Peppino in poche righe; ogni pannello riporta i crediti
              delle fotografie.
            </li>
            <li>
              Venerdì 16, subito dopo l&apos;inaugurazione, alle 17:20 c&apos;è la prima visita guidata.
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mapsUrl(venues.villa.mapQuery)}
              data-track="map_open"
              data-track-location="mostra"
              data-track-label="villa"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-display font-semibold text-cream hover:bg-coral hover:text-ink"
            >
              <MapPin size={18} /> Portami alla Villa dei lettori
              <span className="visually-hidden"> (Google Maps, nuova scheda)</span>
            </a>
            <ButtonLink
              href="/programma/le-radici-che-si-scelgono"
              variant="secondary"
              icon={<ArrowRight size={18} />}
            >
              L&apos;incontro con Giovanni Impastato
            </ButtonLink>
          </div>
        </section>

        <section aria-labelledby="la-vita">
          <h2 id="la-vita" className="font-display text-title">
            <span className="font-black">Una vita,</span> <span className="font-light">in breve</span>
          </h2>
          <ol className="relative mt-8 space-y-8 border-l-2 border-ink/15 pl-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[2.55rem] size-4 rounded-full border-[3px] border-cream bg-teal ring-2 ring-ink/15"
                />
                <p className="font-display text-sm font-black tracking-[0.16em] text-teal-deep uppercase">
                  {item.year}
                </p>
                <p className="mt-1.5 font-serif text-[1.07rem] leading-relaxed text-ink/90">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 rounded-[1.25rem] bg-paper p-5 text-[0.95rem] leading-relaxed text-ink/85">
            I crediti delle fotografie sono indicati su ciascun pannello della mostra. Per conoscere meglio la
            storia di Peppino:{" "}
            <Link href="/ospiti/giovanni-impastato" className="text-coral-deep underline underline-offset-2">
              Giovanni Impastato
            </Link>{" "}
            e Casa Memoria Felicia e Peppino Impastato, a Cinisi.
          </p>
        </section>
      </div>
    </>
  );
}
