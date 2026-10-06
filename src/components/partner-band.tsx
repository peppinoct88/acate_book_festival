import Image from "next/image";
import Link from "next/link";
import { partners } from "@/content/partners";

/** I loghi di chi fa il festival, su fondo blu. Altezze diverse per un peso ottico simile. */
export function PartnerBand() {
  return (
    <section aria-labelledby="partner" className="border-t border-cream/15">
      <div className="container-festival py-12 sm:py-16">
        <h2 id="partner" className="eyebrow eyebrow--plain text-teal-soft">
          Il festival lo fanno insieme
        </h2>
        {/* righe centrate: un logo rimasto da solo in fondo non resta appeso a sinistra */}
        <ul className="mt-10 flex flex-wrap items-end justify-center gap-x-6 gap-y-12">
          {partners.map((p) => {
            const wide = p.logo.width / p.logo.height > 1.6;
            const logo = (
              <Image
                src={p.logo}
                alt={p.name}
                sizes="(min-width: 1024px) 12rem, 40vw"
                className={`w-auto max-w-full object-contain ${wide ? "h-14 sm:h-16" : "h-20 sm:h-24"}`}
              />
            );
            const frame = "flex min-h-24 items-end justify-center sm:min-h-28";
            return (
              <li
                key={p.name}
                className="flex w-[calc(50%-0.75rem)] flex-col items-center gap-4 text-center sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]"
              >
                {p.href ? (
                  <Link href={p.href} className={`${frame} rounded-lg transition-opacity hover:opacity-85`}>
                    {logo}
                  </Link>
                ) : p.url ? (
                  <a
                    href={p.url}
                    rel="noopener"
                    target="_blank"
                    className={`${frame} rounded-lg transition-opacity hover:opacity-85`}
                  >
                    {logo}
                    <span className="visually-hidden"> (sito, nuova scheda)</span>
                  </a>
                ) : (
                  <span className={frame}>{logo}</span>
                )}
                <span className="font-display text-sm font-semibold text-cream/85">{p.role}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
