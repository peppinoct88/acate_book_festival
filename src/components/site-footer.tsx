import Link from "next/link";
import { Bookshelf } from "./bookshelf";
import { Logotype } from "./logotype";
import { ArrowRight, Calendar, Facebook, Instagram } from "./icons";
import { buttonClass } from "./button";
import { PartnerBand } from "./partner-band";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";

export function SiteFooter() {
  const social = [
    site.social.instagram ? { href: site.social.instagram, label: "Instagram", Icon: Instagram } : null,
    site.social.facebook ? { href: site.social.facebook, label: "Facebook", Icon: Facebook } : null,
  ].filter((s) => s !== null);

  return (
    <footer data-site-footer className="mt-24 sm:mt-32">
      <Bookshelf className="text-ink" />
      <div className="bg-ink text-cream">
        <div className="container-festival grid gap-14 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-24">
          <div>
            <Logotype tone="light" className="text-[clamp(3rem,10vw,5.5rem)]" />
            <p className="mt-8 font-display text-base font-semibold tracking-[0.24em] uppercase">
              16 <span className="text-coral">/</span> 17 <span className="text-coral">/</span> 18 ottobre
              2026
            </p>
            <p className="mt-2 text-teal-soft">
              {site.place.label} · Ingresso libero a tutti gli appuntamenti
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/programma"
                className={buttonClass("primary")}
                data-track="cta_click"
                data-track-location="footer"
                data-track-label="programma"
              >
                Vedi il programma <ArrowRight size={18} />
              </Link>
              <a href="/calendario/acate-book-festival-2026.ics" download className={buttonClass("light")}>
                <Calendar size={18} /> Salva le date
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="eyebrow eyebrow--plain text-teal-soft">{group.title}</h2>
                <ul className="mt-5 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="link-underline inline-flex min-h-10 items-center py-1 font-display text-lg font-semibold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            {social.length ? (
              <div className="sm:col-span-2">
                <h2 className="eyebrow eyebrow--plain text-teal-soft">Seguici</h2>
                <ul className="mt-4 flex gap-3">
                  {social.map(({ href, label, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        rel="noopener"
                        target="_blank"
                        className="inline-flex size-12 items-center justify-center rounded-full border border-cream/30 transition-colors hover:bg-cream hover:text-ink"
                      >
                        <Icon size={22} />
                        <span className="visually-hidden">{label} (si apre in una nuova scheda)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <PartnerBand />

        <div className="border-t border-cream/15">
          <div className="container-festival grid gap-8 py-10 text-sm leading-relaxed text-cream/85 md:grid-cols-3">
            <div>
              <p className="eyebrow eyebrow--plain text-teal-soft">Promosso da</p>
              <p className="mt-3">
                <a
                  href={site.organizer.url}
                  className="link-underline font-semibold text-cream"
                  rel="noopener"
                >
                  {site.organizer.name}
                </a>
              </p>
            </div>
            <div>
              <p className="eyebrow eyebrow--plain text-teal-soft">Con il contributo di</p>
              <p className="mt-3">
                <span className="font-semibold text-cream">Regione Siciliana</span> – Assessorato regionale
                delle Autonomie Locali e della Funzione Pubblica
              </p>
            </div>
            <div>
              <p className="eyebrow eyebrow--plain text-teal-soft">Organizzazione</p>
              <p className="mt-3">
                <span className="font-semibold text-cream">{site.production.name}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/15">
          <div className="container-festival flex flex-col gap-4 py-6 text-sm text-cream/75 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.year} {site.name} · {site.edition}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline inline-flex min-h-6 items-center">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
