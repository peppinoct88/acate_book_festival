import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AudienceBadge, FreeBadge, KindBadge, StatusBadge, VenueTag } from "@/components/badges";
import { BookCover } from "@/components/book-cover";
import { CalendarActions } from "@/components/calendar-actions";
import { ShareActions } from "@/components/share-actions";
import { GuestCard } from "@/components/guest-card";
import { SessionCard } from "@/components/session-card";
import { LiveStatus } from "@/components/live-status";
import { JsonLd } from "@/components/json-ld";
import { ArrowLeft, ArrowRight, Clock, Info, Rain, Users } from "@/components/icons";
import { getGuest } from "@/content/guests";
import {
  getActivity,
  kindLabels,
  pagedActivities,
  programUpdatedAt,
  sessionsForActivity,
  sessionsForDay,
} from "@/content/program";
import { absoluteUrl } from "@/content/site";
import { daysById, venues } from "@/content/venues";
import { durationLabel, formatItalianDate } from "@/lib/format";
import { breadcrumbJsonLd, sessionEventJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { dayTones } from "@/lib/day-tone";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagedActivities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programma/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) return {};
  const first = sessionsForActivity(slug)[0];
  const day = first ? daysById.get(first.day) : undefined;
  const when = first && day ? `${day.label}, ore ${first.start}: ` : "";
  return pageMetadata({
    title: activity.seoTitle ?? activity.title,
    absoluteTitle: Boolean(activity.seoTitle),
    description: `${when}${activity.summary}`,
    path: `/programma/${slug}`,
    socialTitle: activity.kicker
      ? `${activity.kicker}: «${activity.title}»`
      : `${activity.title} · Acate Book Festival`,
    ownImage: true,
  });
}

export default async function ActivityPage({ params }: PageProps<"/programma/[slug]">) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity || !activity.page) notFound();

  const list = sessionsForActivity(slug);
  const first = list[0];
  const firstDay = daysById.get(first.day)!;
  const guests = (activity.guests ?? []).map((g) => getGuest(g)).filter((g) => g !== undefined);
  const sameDay = sessionsForDay(first.day).filter((s) => s.activity.slug !== slug && s.start >= first.start);
  const index = pagedActivities.findIndex((a) => a.slug === slug);
  const prev = index > 0 ? pagedActivities[index - 1] : undefined;
  const next = index < pagedActivities.length - 1 ? pagedActivities[index + 1] : undefined;
  const url = absoluteUrl(`/programma/${slug}`);
  const isTalk = activity.kind === "incontro";

  return (
    <>
      {list.map((s) => (
        <JsonLd key={s.id} data={sessionEventJsonLd(s)} />
      ))}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Programma", path: "/programma" },
          { name: activity.title },
        ])}
      />

      <article>
        <header className="relative overflow-hidden">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-16 -right-36 size-[12rem] rounded-full sm:top-12 sm:-right-32 sm:size-[24rem] ${isTalk ? "bg-coral/90" : activity.audience.kids ? "bg-teal-soft" : "bg-teal/80"}`}
          />
          <div className="relative container-festival pt-8 pb-12 sm:pt-12 sm:pb-16">
            <Breadcrumbs
              items={[
                { name: "Programma", href: "/programma" },
                { name: firstDay.label, href: `/programma#${firstDay.anchor}` },
                { name: activity.title },
              ]}
            />
            <div className="mt-10 max-w-4xl sm:mt-14">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/giornate/${firstDay.slug}`}
                  className={`inline-flex min-h-8 items-center rounded-full px-3 font-display text-xs font-semibold tracking-[0.12em] uppercase transition-transform hover:-translate-y-0.5 ${dayTones[firstDay.tone].surface} ${dayTones[firstDay.tone].text}`}
                >
                  {firstDay.short} · {firstDay.topic}
                </Link>
                <KindBadge kind={activity.kind} />
                <VenueTag venue={first.venue} />
              </div>
              {activity.kicker ? (
                <p className="mt-6 font-display text-xl font-semibold text-ink-muted sm:text-2xl">
                  {activity.kicker}
                </p>
              ) : null}
              <h1 className="mt-3 font-display text-headline font-black">
                {isTalk || activity.kind === "spettacolo" ? `«${activity.title}»` : activity.title}
              </h1>
              {activity.book ? (
                <p className="mt-4 font-display text-lg font-light text-ink">
                  dal libro «{activity.book.title}» ({activity.book.publisher}
                  {activity.book.year ? `, ${activity.book.year}` : ""})
                </p>
              ) : null}
              <p className="mt-6 max-w-[60ch] font-serif text-xl leading-relaxed text-ink/85">
                {activity.summary}
              </p>
              {activity.moderator ? (
                <p className="mt-5 font-display text-lg text-ink">
                  <span className="font-light">Modera</span>{" "}
                  <strong className="font-bold">{activity.moderator}</strong>
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <div className="container-festival grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:grid-rows-[auto_1fr]">
          <aside aria-label="Quando e dove" className="lg:col-start-2 lg:row-start-1 lg:pt-2">
            <div className="rounded-[1.75rem] border-2 border-ink/85 bg-cream p-6">
              <h2 className="eyebrow eyebrow--plain text-ink">
                {list.length > 1 ? "Le date" : "Quando e dove"}
              </h2>
              <ul className="mt-5 space-y-6">
                {list.map((s) => {
                  const d = daysById.get(s.day)!;
                  return (
                    <li
                      key={s.id}
                      data-session={s.id}
                      data-start={s.startISO}
                      data-end={s.endISO}
                      className="space-y-3"
                    >
                      <p className="font-display text-xl leading-tight font-black">
                        {d.label}
                        {s.note ? (
                          <span className="block text-base font-light text-ink-muted">{s.note}</span>
                        ) : null}
                      </p>
                      <p className="flex items-center gap-2 font-display text-lg font-semibold tabular">
                        <Clock size={19} />
                        <time dateTime={s.startISO}>{s.start}</time>–<time dateTime={s.endISO}>{s.end}</time>
                        <span
                          data-live-badge
                          hidden
                          className="rounded-full bg-ink px-2.5 py-0.5 text-xs tracking-[0.1em] text-cream uppercase"
                        />
                      </p>
                      <VenueTag venue={s.venue} />
                      <p className="text-sm text-ink-muted">{venues[s.venue].where}</p>
                      <div className="flex flex-wrap gap-2">
                        <AudienceBadge audience={s.audience} />
                        <FreeBadge />
                        <StatusBadge status={s.status} note={s.statusNote} />
                      </div>
                      <CalendarActions session={s} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {activity.body ? (
              <div className="prose-festival">
                {activity.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            ) : null}

            {activity.credits?.length ? (
              <section aria-labelledby="crediti" className="mt-12">
                <h2 id="crediti" className="eyebrow eyebrow--plain text-ink">
                  Crediti
                </h2>
                <ul className="mt-4 space-y-1.5 font-display text-lg">
                  {activity.credits.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {activity.book ? (
              <section
                aria-labelledby="il-libro"
                className="mt-14 grid gap-8 rounded-[1.75rem] bg-paper p-6 sm:grid-cols-[10rem_1fr] sm:p-8"
              >
                <div className="group w-36 sm:w-40">
                  <BookCover
                    title={activity.book.title}
                    subtitle={activity.book.publisher}
                    footer={guests[0]?.name ?? ""}
                    tone={guests[0]?.tone ?? "coral"}
                  />
                </div>
                <div>
                  <h2 id="il-libro" className="eyebrow eyebrow--plain text-ink">
                    Il libro
                  </h2>
                  <p className="mt-3 font-display text-2xl leading-tight font-extrabold">
                    «{activity.book.title}»
                  </p>
                  <p className="mt-1 font-display text-ink-muted">
                    {activity.book.publisher}
                    {activity.book.year ? `, ${activity.book.year}` : ""}
                  </p>
                  <p className="mt-4 font-serif leading-relaxed text-ink/85">
                    Lo trovi al bookshop della Villa dei lettori, con le firmacopie subito dopo
                    l&apos;incontro.
                  </p>
                </div>
              </section>
            ) : null}

            {guests.length ? (
              <section aria-labelledby="ospiti" className="mt-16">
                <h2 id="ospiti" className="font-display text-title">
                  <span className="font-black">{guests.length > 1 ? "Gli ospiti" : "L'ospite"}</span>
                </h2>
                <div className="mt-8 grid max-w-2xl gap-10">
                  {guests.map((g) => (
                    <GuestCard key={g.slug} guest={g} layout="row" />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside aria-label="Da sapere e condivisione" className="lg:col-start-2 lg:row-start-2">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-[1.75rem] bg-paper p-6">
                <h2 className="eyebrow eyebrow--plain text-ink">Da sapere</h2>
                <ul className="mt-4 space-y-3 text-[0.95rem] leading-snug">
                  <li className="flex gap-3">
                    <Users size={19} className="mt-0.5 shrink-0" />
                    <span>
                      {activity.audience.kids ? "Pensato per bambini e ragazzi." : "Per tutti."} Ingresso
                      libero, senza prenotazione.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Clock size={19} className="mt-0.5 shrink-0" />
                    <span>Durata: {activity.duration ?? durationLabel(first.start, first.end)}.</span>
                  </li>
                  {(activity.practical ?? []).map((p) => (
                    <li key={p} className="flex gap-3">
                      <Info size={19} className="mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                  <li className="flex gap-3">
                    <Rain size={19} className="mt-0.5 shrink-0" />
                    <span>
                      Se piove, eventuali spostamenti sono annunciati entro le 15.{" "}
                      <Link href="/info#se-piove" className="underline underline-offset-2">
                        Cosa succede
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="eyebrow eyebrow--plain text-ink">Passaparola</h2>
                <div className="mt-4">
                  <ShareActions
                    title={`${activity.title} · Acate Book Festival`}
                    text={`${activity.kicker ? `${activity.kicker}: ` : ""}«${activity.title}» – ${firstDay.label}, ore ${first.start}, Acate Book Festival.`}
                    url={url}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {sameDay.length ? (
          <section aria-labelledby="stesso-pomeriggio" className="container-festival mt-24">
            <p className="eyebrow text-ink">{firstDay.label}</p>
            <h2 id="stesso-pomeriggio" className="mt-4 font-display text-title">
              <span className="font-black">Nello stesso</span> <span className="font-light">pomeriggio</span>
            </h2>
            <ol className="mt-6 border-b border-ink/12">
              {sameDay.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <SessionCard session={s} />
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <nav aria-label="Altri appuntamenti" className="container-festival mt-16 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/programma/${prev.slug}`}
              className="group flex flex-col rounded-[1.5rem] border-2 border-ink/15 p-6 transition-colors hover:border-ink"
            >
              <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink-muted">
                <ArrowLeft size={17} /> Precedente
              </span>
              <span className="mt-2 font-display text-xl font-extrabold group-hover:text-coral-deep">
                {prev.title}
              </span>
              <span className="text-sm text-ink-muted">{kindLabels[prev.kind]}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/programma/${next.slug}`}
              className="group flex flex-col items-end rounded-[1.5rem] border-2 border-ink/15 p-6 text-right transition-colors hover:border-ink"
            >
              <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink-muted">
                Successivo <ArrowRight size={17} />
              </span>
              <span className="mt-2 font-display text-xl font-extrabold group-hover:text-coral-deep">
                {next.title}
              </span>
              <span className="text-sm text-ink-muted">{kindLabels[next.kind]}</span>
            </Link>
          ) : null}
        </nav>

        <p className="container-festival mt-10 font-display text-sm text-ink-muted">
          Scheda aggiornata al {formatItalianDate(programUpdatedAt)}.{" "}
          <Link href="/programma" className="underline underline-offset-2">
            Torna al programma completo
          </Link>
        </p>
      </article>
      <LiveStatus />
    </>
  );
}
