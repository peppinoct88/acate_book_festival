import { MapPin } from "./icons";
import { mapsUrl } from "@/lib/format";
import { venues } from "@/content/venues";

/**
 * Mappa schematica dei due spazi, in HTML (testo vero, leggibile e accessibile a ogni larghezza).
 * Nessuna mappa di terze parti: niente cookie, niente peso.
 */
export function VenueMap({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const palco = venues.palco;
  const villa = venues.villa;
  return (
    <div className="relative">
      <div className="rounded-t-[1.5rem] border-2 border-b-0 border-ink/80 bg-paper px-5 py-3 text-center font-display text-sm font-semibold tracking-[0.16em] text-ink uppercase">
        Via Archimede · di fronte al Castello dei Principi di Biscari
      </div>

      <section
        aria-labelledby="mappa-palco"
        className="rounded-b-[1.5rem] border-2 border-ink/80 bg-cream p-5 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <H
            id="mappa-palco"
            className="flex items-center gap-3 font-display text-2xl font-black tracking-[-0.02em]"
          >
            <span aria-hidden="true" className="size-4 rounded-full bg-coral ring-4 ring-coral/25" />
            {palco.name}
          </H>
          <a
            href={mapsUrl(palco.mapQuery)}
            data-track="map_open"
            data-track-location="mappa"
            data-track-label="palco"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 font-display text-sm font-semibold text-cream transition-colors hover:bg-coral hover:text-ink"
          >
            <MapPin size={17} /> Portami lì
            <span className="visually-hidden"> (Google Maps, nuova scheda)</span>
          </a>
        </div>
        <p className="mt-2 font-serif text-ink/85">{palco.description}</p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {[
            ["All'aperto", "incontri, teatro e musica"],
            ["Ledwall", "le foto #LaMiaRadice"],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-ink/15 bg-cream px-4 py-3">
              <span className="block font-display font-bold">{t}</span>
              <span className="block text-sm text-ink-muted">{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="mappa-villa"
        className="mt-5 rounded-[1.5rem] border-2 border-ink/80 bg-cream p-5 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <H
            id="mappa-villa"
            className="flex items-center gap-3 font-display text-2xl font-black tracking-[-0.02em]"
          >
            <span aria-hidden="true" className="size-4 rounded-full bg-teal ring-4 ring-teal/30" />
            {villa.name}
          </H>
          <a
            href={mapsUrl(villa.mapQuery)}
            data-track="map_open"
            data-track-location="mappa"
            data-track-label="villa"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 font-display text-sm font-semibold text-cream transition-colors hover:bg-teal-light hover:text-ink"
          >
            <MapPin size={17} /> Portami lì
            <span className="visually-hidden"> (Google Maps, nuova scheda)</span>
          </a>
        </div>
        <p className="mt-2 font-serif text-ink/85">{villa.description}</p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Accoglienza", "informazioni sul festival"],
            ["Mostra «Radici libere»", "aperta fino alle 22"],
            ["Bookshop", "i libri degli ospiti e le firmacopie"],
            ["Albero delle radici", "#LaMiaRadice"],
            ["Indovina il classico", "e la buca delle lettere (sabato)"],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-ink/15 bg-cream px-4 py-3">
              <span className="block font-display font-bold">{t}</span>
              <span className="block text-sm text-ink-muted">{d}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
