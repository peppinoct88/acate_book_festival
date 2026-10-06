import Image from "next/image";
import Link from "next/link";
import comuneLogo from "@/assets/partner/comune-di-acate.png";
import { partners } from "@/content/partners";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

/**
 * I crediti in fondo a ogni pagina, in un blu più chiaro del footer: a sinistra le istituzioni
 * (gli stemmi nascono per il bianco, quindi stanno su una piastrella chiara), a destra i partner,
 * piccoli e su una riga. Stemma e dicitura della Regione sono un obbligo dell'avviso: i test li controllano.
 */
export function FooterCredits() {
  return (
    <div className="border-t border-cream/15 bg-navy">
      <div className="container-festival grid gap-10 py-10 text-sm leading-relaxed text-cream/85 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex items-start gap-4" data-funding>
            <span className="shrink-0 rounded-xl bg-cream p-1.5">
              <Image
                src={photos.stemmaRegione.src}
                alt={photos.stemmaRegione.alt}
                sizes="3rem"
                className="h-14 w-auto"
              />
            </span>
            <div>
              <p className="eyebrow eyebrow--plain text-teal-soft">Finanziato da</p>
              <p className="mt-2 text-cream">
                <span className="font-display font-bold">{site.funding.region}</span>
                <br />
                {site.funding.department}
              </p>
              <p className="mt-1.5 text-cream/75">Contributo concesso con {site.funding.decree}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="shrink-0 rounded-xl bg-cream p-1.5">
              <Image src={comuneLogo} alt="Stemma del Comune di Acate" sizes="5rem" className="h-14 w-auto" />
            </span>
            <div>
              <p className="eyebrow eyebrow--plain text-teal-soft">Promosso da</p>
              <p className="mt-2">
                <a
                  href={site.organizer.url}
                  rel="noopener"
                  className="link-underline font-display font-bold text-cream"
                >
                  {site.organizer.name}
                </a>
              </p>
              <p className="eyebrow eyebrow--plain mt-4 text-teal-soft">Organizzazione</p>
              <p className="mt-2 font-display font-bold text-cream">{site.production.name}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="eyebrow eyebrow--plain text-teal-soft">Il festival lo fanno insieme</h2>
          <ul className="mt-5 flex flex-wrap items-center gap-x-9 gap-y-6">
            {partners.map((p) => {
              // altezze diverse per un peso ottico simile: i loghi larghi più bassi
              const wide = p.logo.width / p.logo.height > 1.6;
              const logo = (
                <Image
                  src={p.logo}
                  alt={p.name}
                  sizes="8rem"
                  className={`w-auto object-contain ${wide ? "h-9" : "h-14"}`}
                />
              );
              const link = "inline-flex rounded-md opacity-90 transition-opacity hover:opacity-100";
              return (
                <li key={p.name} className="flex items-center">
                  {p.href ? (
                    <Link href={p.href} className={link}>
                      {logo}
                    </Link>
                  ) : p.url ? (
                    <a href={p.url} rel="noopener" target="_blank" className={link}>
                      {logo}
                      <span className="visually-hidden"> (sito, nuova scheda)</span>
                    </a>
                  ) : (
                    <span className="inline-flex opacity-90">{logo}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
