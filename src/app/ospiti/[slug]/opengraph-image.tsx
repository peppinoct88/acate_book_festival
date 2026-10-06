import { getGuest, guests } from "@/content/guests";
import { sessionsForGuest } from "@/content/program";
import { daysById, venues } from "@/content/venues";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Ospite dell'Acate Book Festival 2026";

export function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guest = getGuest(slug);
  if (!guest) return renderOg({ eyebrow: "Ospiti", title: "Acate Book Festival" });
  const first = sessionsForGuest(slug).find((s) => s.activity.kind !== "firmacopie");
  const meta = first
    ? `${daysById.get(first.day)!.label} · ore ${first.start} · ${venues[first.venue].name}`
    : undefined;
  return renderOg({
    // nei colori della giornata in cui l'ospite sale sul palco
    tone: first ? daysById.get(first.day)!.tone : undefined,
    eyebrow: "Ospite · I edizione",
    subtitle: guest.role,
    title: guest.type === "compagnia" ? "Santa Briganti" : guest.name,
    meta,
    portrait: guest.photo ? `ospiti/${guest.slug}.jpg` : undefined,
  });
}
