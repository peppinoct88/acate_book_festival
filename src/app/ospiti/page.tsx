import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GuestCard } from "@/components/guest-card";
import { authorSlugs, guests } from "@/content/guests";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ospiti",
  description:
    "Gli ospiti 2026: Giovanni Impastato, Antonella Desirée Giuffrè, Maria Antonietta Ferraloro, Matilde Masaracchio, Santa Briganti e la musica di Acate.",
  path: "/ospiti",
  ownImage: true,
});

export default function GuestsPage() {
  const authors = authorSlugs.map((slug) => guests.find((g) => g.slug === slug)!);
  const onStage = guests.filter((g) => !authorSlugs.includes(g.slug));
  return (
    <>
      <PageHero
        eyebrow="Gli ospiti"
        title="Ogni ospite"
        light="è un libro."
        crumbs={[{ name: "Ospiti" }]}
        intro="Un autore per ogni giornata: la memoria di Peppino Impastato raccontata da suo fratello, il coraggio delle donne nella Sicilia della Grande Guerra, il Gattopardo spiegato ai ragazzi. E sul palco il teatro, la musica e i tamburi di Acate."
      />
      <section aria-labelledby="autori" className="container-festival">
        <h2 id="autori" className="eyebrow text-ink">
          Gli autori
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((guest, index) => (
            <li key={guest.slug} data-reveal style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
              <GuestCard guest={guest} />
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
