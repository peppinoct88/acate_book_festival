"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { currentTime, festivalPhase, romeDate } from "@/lib/now";

export interface NowNextSession {
  id: string;
  title: string;
  kicker?: string;
  start: string;
  end: string;
  startISO: string;
  endISO: string;
  date: string;
  dayLabel: string;
  venue: string;
  venueId: "palco" | "villa";
  href?: string;
  audience: string;
}

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 30_000);
  return () => window.clearInterval(timer);
}

// Arrotonda al minuto: lo snapshot resta stabile tra un render e l'altro
const getSnapshot = () => Math.floor(currentTime() / 60_000) * 60_000;

function Row({ s, highlight }: { s: NowNextSession; highlight?: boolean }) {
  const content = (
    <>
      <span className="w-16 shrink-0 font-display text-2xl leading-none font-black tabular">{s.start}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg leading-snug font-extrabold">{s.title}</span>
        {s.kicker ? <span className="block text-sm text-ink-muted">{s.kicker}</span> : null}
        <span className="mt-1 inline-flex items-center gap-2 font-display text-sm font-semibold">
          <span
            aria-hidden="true"
            className={`size-2.5 rounded-full ${s.venueId === "palco" ? "bg-coral" : "bg-teal"}`}
          />
          {s.venue} · fino alle {s.end}
        </span>
      </span>
    </>
  );
  const cls = `flex items-start gap-4 rounded-2xl p-4 ${highlight ? "bg-teal-soft" : "bg-paper"}`;
  return (
    <li>
      {s.href ? (
        <Link href={s.href} className={`${cls} transition-colors hover:bg-teal-soft`}>
          {content}
        </Link>
      ) : (
        <div className={cls}>{content}</div>
      )}
    </li>
  );
}

export function NowNext({ sessions }: { sessions: NowNextSession[] }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, () => null);

  if (now === null) {
    return (
      <div className="rounded-[1.75rem] border-2 border-ink/15 p-8">
        <p className="font-display text-lg font-semibold text-ink-muted">Sto controllando l&apos;orario…</p>
      </div>
    );
  }

  const phase = festivalPhase(now);
  const today = romeDate(now);
  const current = sessions.filter((s) => Date.parse(s.startISO) <= now && now < Date.parse(s.endISO));
  const upcoming = sessions.filter((s) => Date.parse(s.startISO) > now);
  const nextToday = upcoming.filter((s) => s.date === today).slice(0, 3);

  if (phase.phase === "after") {
    return (
      <div className="rounded-[1.75rem] bg-ink p-8 text-cream sm:p-10">
        <p className="font-display text-title font-black">Il festival è finito.</p>
        <p className="mt-3 max-w-[50ch] font-serif text-lg text-cream/90">
          Grazie, Acate: le radici sono piantate. Ci vediamo alla seconda edizione, nel 2027.
        </p>
        <Link
          href="/festival"
          className="mt-6 inline-flex font-display font-semibold text-teal-soft underline underline-offset-4"
        >
          Cosa resta del festival
        </Link>
      </div>
    );
  }

  if (phase.phase === "live") {
    return (
      <div className="grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="adesso-titolo">
          <h2 id="adesso-titolo" className="flex items-center gap-3 font-display text-title font-black">
            <span aria-hidden="true" className="relative inline-flex size-3.5 rounded-full bg-coral">
              <span className="absolute inset-0 animate-ping rounded-full bg-coral" />
            </span>
            Adesso
          </h2>
          {current.length ? (
            <ul className="mt-6 space-y-3">
              {current.map((s) => (
                <Row key={s.id} s={s} highlight />
              ))}
            </ul>
          ) : (
            <p className="mt-6 rounded-2xl bg-paper p-5 font-serif text-lg">
              Tra un appuntamento e l&apos;altro: alla Villa dei lettori la mostra, l&apos;Albero delle radici
              e lo scambio libri sono sempre aperti.
            </p>
          )}
        </section>
        <section aria-labelledby="tra-poco-titolo">
          <h2 id="tra-poco-titolo" className="font-display text-title">
            <span className="font-black">Tra poco</span>
          </h2>
          {nextToday.length ? (
            <ul className="mt-6 space-y-3">
              {nextToday.map((s) => (
                <Row key={s.id} s={s} />
              ))}
            </ul>
          ) : (
            <p className="mt-6 rounded-2xl bg-paper p-5 font-serif text-lg">
              Per oggi gli appuntamenti sono finiti: la mostra resta aperta fino alle 22.
            </p>
          )}
        </section>
      </div>
    );
  }

  // prima del festival, la mattina dei giorni di festival o tra un giorno e l'altro
  const nextDay = upcoming[0]?.date;
  const nextList = upcoming.filter((s) => s.date === nextDay).slice(0, 4);
  const label =
    phase.phase === "before"
      ? phase.daysLeft === 1
        ? "Domani si comincia"
        : `Mancano ${phase.daysLeft} giorni`
      : "Oggi dalle 17";
  return (
    <section aria-labelledby="prossimi-titolo">
      <p className="eyebrow text-ink">{label}</p>
      <h2 id="prossimi-titolo" className="mt-4 font-display text-title">
        <span className="font-black">I prossimi appuntamenti</span>
        {nextList[0] ? <span className="font-light"> · {nextList[0].dayLabel}</span> : null}
      </h2>
      <ul className="mt-6 grid gap-3 lg:grid-cols-2">
        {nextList.map((s) => (
          <Row key={s.id} s={s} />
        ))}
      </ul>
    </section>
  );
}
