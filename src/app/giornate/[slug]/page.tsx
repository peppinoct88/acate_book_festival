import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/book-cover";
import { coverOf } from "@/content/covers";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button";
import { GuestCard } from "@/components/guest-card";
import { GuestVisual } from "@/components/guest-visual";
import { ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { LiveStatus } from "@/components/live-status";
import { Photo } from "@/components/photo";
import { SessionCard } from "@/components/session-card";
import { ShareActions } from "@/components/share-actions";
import { authorSlugs, getGuest } from "@/content/guests";
import { photos } from "@/content/photos";
import { sessionsForDay } from "@/content/program";
import { absoluteUrl } from "@/content/site";
import { days, daysBySlug } from "@/content/venues";
import { dayTones } from "@/lib/day-tone";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return days.map((d) => ({ slug: d.slug }));
}

function seoTitle(day: (typeof days)[number]) {
  return `${day.topic} · ${day.weekday} ${Number(day.date.slice(-2))} ottobre · Acate Book Festival`;
}

export async function generateMetadata({ params }: PageProps<"/giornate/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const day = daysBySlug.get(slug);
  if (!day) return {};
  return pageMetadata({
    title: seoTitle(day),
    absoluteTitle: true,
    description: `${day.label}, ${day.topic.toLowerCase()}: ${day.claim} ${day.intro}`,
    path: `/giornate/${slug}`,
    ownImage: true,
  });
}

export default async function DayPage({ params }: PageProps<"/giornate/[slug]">) {
  const { slug } = await params;
  const day = daysBySlug.get(slug);
  if (!day) notFound();

  const t = dayTones[day.tone];
  const list = sessionsForDay(day.id);
  const index = days.indexOf(day);
  const author = getGuest(authorSlugs[index]);
  const others = days.filter((d) => d.id !== day.id);
  // accanto al racconto: la foto (la casa di Peppino, per la mafia) o il libro dell'autore della giornata
  const photo = day.slug === "mafia" ? photos.casaMemoria : undefined;
  const bookSession = list.find((s) => s.activity.book);
  // la parola del tema riempie la riga, come le parole del manifesto
  const topicSize = `min(${(100 / (day.topic.length * 0.74)).toFixed(1)}cqi, 11rem)`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Programma", path: "/programma" },
          { name: `${day.label}: ${day.topic.toLowerCase()}` },
        ])}
      />
      <article>
        <header className={`relative isolate overflow-hidden ${t.surface} ${t.text}`}>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -right-24 -bottom-24 -z-10 size-56 rounded-full sm:-top-32 sm:-right-24 sm:bottom-auto sm:size-[30rem] ${t.sun}`}
          />
          <div className="container-festival pt-8 pb-14 sm:pt-12 sm:pb-20">
            <Breadcrumbs
              items={[{ name: "Programma", href: "/programma" }, { name: day.label }]}
              tone={day.tone === "coral" ? "color" : "light"}
            />
            <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)] lg:items-end">
              <div className="[container-type:inline-size]">
                <p className={`eyebrow animate-rise ${t.eyebrow}`}>{day.label} · il tema</p>
                <h1 className="mt-6 animate-rise font-display [animation-delay:80ms]">
                  <span
                    className="block leading-[0.85] font-black tracking-[-0.04em] uppercase"
                    style={{ fontSize: topicSize }}
                  >
                    {day.topic}
                  </span>
                  <span className="mt-4 block text-title font-light">{day.theme}</span>
                </h1>
                <p className={`mt-8 max-w-[44ch] font-serif text-xl leading-relaxed sm:text-2xl ${t.soft}`}>
                  {day.claim}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <ButtonLink
                    href={`/programma#${day.anchor}`}
                    variant={t.button}
                    icon={<ArrowRight size={18} />}
                  >
                    Gli orari nel programma
                  </ButtonLink>
                  <ShareActions
                    title={`${day.label}: ${day.topic.toLowerCase()} · Acate Book Festival`}
                    url={absoluteUrl(`/giornate/${slug}`)}
                    tone={day.tone === "coral" ? "dark" : "light"}
                  />
                </div>
              </div>
              {author ? (
                <div className="hidden lg:block">
                  <GuestCardCompact slug={author.slug} />
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="container-festival mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-start lg:gap-16">
          <section aria-labelledby="la-giornata">
            <h2 id="la-giornata" className="eyebrow text-ink">
              La giornata
            </h2>
            <div className="prose-festival mt-6 text-ink">
              {day.body.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>
          {photo ? (
            <Photo photo={photo} sizes="(min-width: 1024px) 32rem, 100vw" imageClassName="aspect-[4/3]" />
          ) : bookSession?.activity.book ? (
            <aside
              aria-labelledby="il-libro"
              className="grid grid-cols-[8rem_minmax(0,1fr)] items-center gap-4 rounded-[1.75rem] bg-paper p-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:p-8"
            >
              <div className="group" data-reveal>
                <BookCover
                  title={bookSession.activity.book.title}
                  subtitle={bookSession.activity.book.publisher}
                  footer={author?.name}
                  tone={day.tone}
                  image={coverOf(bookSession.activity.book.title)}
                  sizes="10rem"
                  className="book-in"
                />
              </div>
              <div>
                <h2 id="il-libro" className="eyebrow eyebrow--plain text-ink">
                  Il libro della giornata
                </h2>
                <p className="mt-3 font-display text-xl leading-tight font-extrabold sm:text-2xl">
                  «{bookSession.activity.book.title}»
                </p>
                <p className="mt-1 font-display text-ink-muted">
                  {bookSession.activity.book.publisher}
                  {bookSession.activity.book.year ? `, ${bookSession.activity.book.year}` : ""}
                </p>
                {bookSession.href ? (
                  <p className="mt-4">
                    <Link href={bookSession.href} className="link-underline font-display font-semibold">
                      L&apos;incontro delle {bookSession.start}
                      <ArrowRight size={16} className="ml-1.5 inline align-[-0.15em]" />
                    </Link>
                  </p>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>

        <section aria-labelledby="in-programma" className="container-festival mt-20 lg:mt-24">
          <h2 id="in-programma" className="eyebrow text-ink">
            In programma
          </h2>
          <ol className="mt-4 border-b border-ink/12">
            {list.map((s) => (
              <li key={s.id}>
                <SessionCard session={s} />
              </li>
            ))}
          </ol>
          {author ? (
            <div className="mt-12 lg:hidden">
              <p className="eyebrow text-ink">L&apos;ospite della giornata</p>
              <div className="mt-6">
                <GuestCard guest={author} layout="row" />
              </div>
            </div>
          ) : null}
        </section>

        <nav aria-label="Le altre giornate" className="container-festival mt-24">
          <p className="eyebrow text-ink">Le altre giornate</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((d) => {
              const o = dayTones[d.tone];
              return (
                <li key={d.id}>
                  <Link
                    href={`/giornate/${d.slug}`}
                    className={`group flex h-full items-center justify-between gap-6 rounded-[1.75rem] p-6 transition-transform hover:-translate-y-0.5 sm:p-8 ${o.surface} ${o.text}`}
                  >
                    <span>
                      <span className={`eyebrow eyebrow--plain ${o.eyebrow}`}>{d.label}</span>
                      <span className="mt-3 block font-display text-[2rem] leading-none font-black tracking-[-0.03em] uppercase sm:text-[2.5rem]">
                        {d.topic}
                      </span>
                      <span className="mt-2 block font-display text-lg font-light">{d.theme}</span>
                    </span>
                    <ArrowRight
                      size={24}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </article>
      <LiveStatus />
    </>
  );
}

/** L'autore della giornata nella testata, su fondo colorato. */
function GuestCardCompact({ slug }: { slug: string }) {
  const guest = getGuest(slug);
  if (!guest) return null;
  return (
    <Link
      href={`/ospiti/${slug}`}
      className="group block rounded-[1.75rem] bg-cream p-4 text-ink shadow-[0_30px_60px_-30px_rgb(7_42_95/0.6)] transition-transform hover:-translate-y-1"
    >
      <GuestVisual guest={guest} sizes="22rem" priority />
      <span className="mt-4 block px-2 font-display text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">
        L&apos;ospite della giornata
      </span>
      <span className="mt-1 block px-2 pb-2 font-display text-xl leading-tight font-extrabold group-hover:text-coral-deep">
        {guest.name}
      </span>
    </Link>
  );
}
