import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GuestCard } from "@/components/guest-card";
import { guests } from "@/content/guests";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ospiti",
  description:
    "Gli ospiti dell'Acate Book Festival 2026: Giovanni Impastato, Antonella Desirée Giuffrè, Maria Antonietta Ferraloro e la compagnia Santa Briganti.",
  path: "/ospiti",
  ownImage: true,
});

export default function GuestsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gli ospiti"
        title="Ogni ospite"
        light="è un libro."
        crumbs={[{ name: "Ospiti" }]}
        intro="Tre autori e una compagnia di teatro per tre pomeriggi: la memoria di Peppino Impastato raccontata da suo fratello, il coraggio delle donne nella Sicilia della Grande Guerra, il Gattopardo spiegato ai ragazzi e il mare di «Shuma»."
      />
      <div className="container-festival">
        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {guests.map((guest, index) => (
            <li key={guest.slug} data-reveal style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
              <GuestCard guest={guest} headingLevel={2} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
