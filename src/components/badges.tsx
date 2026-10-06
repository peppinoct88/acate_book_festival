import { kindLabels } from "@/content/program";
import { venues } from "@/content/venues";
import type { Audience, Kind, SessionStatus, VenueId } from "@/content/types";

export function VenueTag({ venue, tone = "dark" }: { venue: VenueId; tone?: "dark" | "light" }) {
  const v = venues[venue];
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold tracking-[0.12em] uppercase ${tone === "dark" ? "text-ink" : "text-cream"}`}
    >
      <span
        aria-hidden="true"
        className={`size-2.5 shrink-0 rounded-full ${venue === "palco" ? "bg-coral" : "bg-teal"} ring-2 ${tone === "dark" ? "ring-cream" : "ring-ink"}`}
      />
      {v.name}
    </span>
  );
}

export function KindBadge({ kind }: { kind: Kind }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/20 px-2.5 py-0.5 font-display text-xs font-semibold tracking-[0.1em] text-ink-muted uppercase">
      {kindLabels[kind]}
    </span>
  );
}

export function AudienceBadge({ audience }: { audience: Audience }) {
  if (audience.kids) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1 font-display text-[0.8125rem] font-semibold text-ink">
        <span aria-hidden="true">✦</span>
        {audience.label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-paper px-3 py-1 font-display text-[0.8125rem] font-semibold text-ink">
      {audience.label}
    </span>
  );
}

export function FreeBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-paper px-3 py-1 font-display text-[0.8125rem] font-semibold text-ink">
      Ingresso libero
    </span>
  );
}

export function StatusBadge({ status, note }: { status: SessionStatus; note?: string }) {
  if (status === "programmato") return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-2 rounded-xl bg-coral px-3 py-1.5 font-display text-[0.8125rem] font-semibold text-ink">
      <span className="tracking-[0.1em] uppercase">{status === "spostato" ? "Spostato" : "Annullato"}</span>
      {note ? <span className="font-normal">{note}</span> : null}
    </span>
  );
}
