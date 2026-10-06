import { getGuest } from "@/content/guests";
import { getActivity, pagedActivities, sessionsForActivity } from "@/content/program";
import { daysById, venues } from "@/content/venues";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Appuntamento dell'Acate Book Festival 2026";

export function generateStaticParams() {
  return pagedActivities.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = getActivity(slug);
  const list = sessionsForActivity(slug);
  const first = list[0];
  if (!activity || !first) {
    return renderOg({ eyebrow: "Programma", title: "Acate Book Festival" });
  }
  const day = daysById.get(first.day)!;
  const meta =
    list.length > 1
      ? `${list.length} repliche · ${venues[first.venue].name}`
      : `${day.label} · ore ${first.start} · ${venues[first.venue].name}`;
  const quoted = activity.kind === "incontro" || activity.kind === "spettacolo";
  const author = (activity.guests ?? []).map((g) => getGuest(g)).find((g) => g?.photo);
  return renderOg({
    eyebrow: day.theme,
    subtitle: activity.kicker,
    title: quoted ? `«${activity.title}»` : activity.title,
    meta,
    tone: author ? day.tone : undefined,
    portrait: author ? `ospiti/${author.slug}.jpg` : undefined,
  });
}
