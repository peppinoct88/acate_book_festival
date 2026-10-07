import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GuestCard } from "@/components/guest-card";
import { authorSlugs, getGuest, guests } from "@/content/guests";
import { pageMetadata } from "@/lib/seo";
import { MysteryGuestCard } from "@/components/mystery-guest";
import { anyHidden } from "@/content/reveal";
import { days } from "@/content/venues";

export const metadata: Metadata = pageMetadata({
  title: "Ospiti",
  description: `Gli ospiti 2026: ${[
    ...authorSlugs.flatMap((slug) => getGuest(slug)?.name ?? []),
    "Matilde Masaracchio",
    "Santa Briganti",
  ].join(", ")}${anyHidden ? ", gli autori che sveliamo uno alla volta" : ""} e la musica di Acate.`,
  path: "/ospiti",
  ownImage: true,
});

export default function GuestsPage() {
  // un autore per giornata: chi è ancora segreto (reveal.ts) ha la scheda «Chi sarà?»
  const authors = authorSlugs.map((slug, index) => ({ slug, day: days[index], guest: getGuest(slug) }));
  const onStage = guests.filter((g) => !authorSlugs.includes(g.slug));
  return (
    <>
      <PageHero
        eyebrow="Gli ospiti"
        title="Ogni ospite"
        light="è un libro."
        crumbs={[{ name: "Ospiti" }]}
        intro={
          anyHidden
            ? "Un autore per ogni giornata: la memoria contro la mafia, il coraggio delle donne, i viaggi di chi arriva dal mare. I nomi li sveliamo uno alla volta sui nostri social. E sul palco il teatro, la musica e i tamburi di Acate."
            : "Un autore per ogni giornata: la memoria di Peppino Impastato raccontata da suo fratello, il coraggio delle donne nella Sicilia della Grande Guerra, il Gattopardo raccontato alle ragazze e ai ragazzi. E sul palco il teatro, la musica e i tamburi di Acate."
        }
      />
      <section aria-labelledby="autori" className="container-festival">
        <h2 id="autori" className="eyebrow text-ink">
          Gli autori
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map(({ slug, day, guest }, index) => (
            <li key={day.id} data-reveal style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
              {guest ? <GuestCard guest={guest} /> : <MysteryGuestCard slug={slug} day={day} />}
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="sul-palco" className="container-festival mt-24">
        <h2 id="sul-palco" className="eyebrow text-ink">
          Sul palco
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {onStage.map((guest, index) => (
            <li key={guest.slug} data-reveal style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
              <GuestCard guest={guest} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
