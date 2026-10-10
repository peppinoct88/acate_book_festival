import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookCover } from "@/components/book-cover";
import { coverOf } from "@/content/covers";
import { GuestVisual } from "@/components/guest-visual";
import { SessionCard } from "@/components/session-card";
import { ShareActions } from "@/components/share-actions";
import { LiveStatus } from "@/components/live-status";
import { JsonLd } from "@/components/json-ld";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { getGuest, guestName, guests } from "@/content/guests";
import { sessionsForGuest } from "@/content/program";
import { absoluteUrl } from "@/content/site";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ospiti/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guest = getGuest(slug);
  if (!guest) return {};
  const name = guestName(guest);
  return pageMetadata({
    title: name,
    description: `${name}, ${guest.role.toLowerCase()}, all'Acate Book Festival 2026. ${guest.short}`.slice(
      0,
      158,
    ),
    path: `/ospiti/${slug}`,
    ownImage: true,
  });
}

export default async function GuestPage({ params }: PageProps<"/ospiti/[slug]">) {
  const { slug } = await params;
  const guest = getGuest(slug);
  if (!guest) notFound();

  const appearances = sessionsForGuest(slug);
  const name = guestName(guest);
  const others = guests.filter((g) => g.slug !== slug);

  return (
    <>
      <JsonLd data={personJsonLd(slug)} />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Ospiti", path: "/ospiti" }, { name }])}
      />
      <article>
        <header className="container-festival pt-8 pb-12 sm:pt-12 sm:pb-16">
          <Breadcrumbs items={[{ name: "Ospiti", href: "/ospiti" }, { name }]} />
          <div className="mt-10 grid gap-10 sm:mt-14 md:grid-cols-[minmax(0,1fr)_17rem] md:items-end lg:grid-cols-[minmax(0,1fr)_21rem]">
            <div>
              <p className="eyebrow text-ink">{guest.role}</p>
              <h1 className="mt-6 font-display text-headline font-black">{name}</h1>
              <p className="mt-6 max-w-[56ch] font-serif text-xl leading-relaxed text-ink/85">
                {guest.short}
              </p>
              <div className="mt-8">
                <ShareActions title={`${name} · Acate Book Festival`} url={absoluteUrl(`/ospiti/${slug}`)} />
              </div>
            </div>
            {/* su telefono il ritratto è largo quanto la colonna (al massimo 28rem) */}
            <div className="group mx-auto w-full max-w-md md:mx-0 md:max-w-none">
              <GuestVisual
                guest={guest}
                sizes="(min-width: 1024px) 21rem, (min-width: 768px) 17rem, (min-width: 480px) 28rem, 100vw"
                priority
              />
            </div>
          </div>
        </header>

        <div className="container-festival grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <section aria-labelledby="biografia">
            <h2 id="biografia" className="eyebrow text-ink">
              Biografia
            </h2>
            <div className="prose-festival mt-6">
              {guest.bio.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            {guest.links?.length ? (
              <ul className="mt-8 flex flex-wrap gap-3">
                {guest.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/25 px-4 font-display text-sm font-semibold hover:border-ink"
                    >
                      {l.label} <ArrowUpRight size={16} />
                      <span className="visually-hidden"> (nuova scheda)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          {guest.books.length ? (
            <section aria-labelledby="libri">
              <h2 id="libri" className="eyebrow text-ink">
                {guest.books.length > 1 ? "Tra i suoi libri" : "Il libro"}
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {guest.books.map((book, i) => (
                  <li
                    key={book.title}
                    className="group"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                  >
                    <BookCover
                      title={book.title}
                      subtitle={book.publisher}
                      footer={guest.name}
                      tone={(["coral", "ink", "teal", "paper"] as const)[(i + guest.slug.length) % 4]}
                      image={coverOf(book.title)}
                      sizes="(min-width: 1280px) 12rem, (min-width: 640px) 14rem, 45vw"
                      className="book-in"
                    />
                    <p className="mt-4 font-display leading-snug font-bold">«{book.title}»</p>
                    <p className="text-sm text-ink-muted">
                      {book.publisher}
                      {book.year ? `, ${book.year}` : ""}
                      {book.note ? ` · ${book.note}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-serif text-ink/80">
                I libri degli ospiti sono in vendita al bookshop della Villa dei lettori, con le firmacopie
                dopo ogni incontro.
              </p>
            </section>
          ) : null}
        </div>

        <section aria-labelledby="al-festival" className="container-festival mt-20">
          <p className="eyebrow text-ink">Dove e quando</p>
          <h2 id="al-festival" className="mt-4 font-display text-title">
            <span className="font-black">Gli appuntamenti</span>{" "}
            <span className="font-light">al festival</span>
          </h2>
          <ol className="mt-6 border-b border-ink/12">
            {appearances.map((s) => (
              <li key={s.id}>
                <SessionCard session={s} showDay />
              </li>
            ))}
          </ol>
        </section>

        <nav aria-label="Gli altri ospiti" className="container-festival mt-20">
          <p className="eyebrow text-ink">Gli altri ospiti</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/ospiti/${g.slug}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-[1.5rem] border-2 border-ink/15 p-5 transition-colors hover:border-ink"
                >
                  <span>
                    <span className="block font-display text-lg leading-tight font-extrabold group-hover:text-coral-deep">
                      {g.type === "compagnia" ? "Santa Briganti" : g.name}
                    </span>
                    <span className="text-sm text-ink-muted">{g.role}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <LiveStatus />
    </>
  );
}
