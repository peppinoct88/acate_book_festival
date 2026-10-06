import { days, daysBySlug } from "@/content/venues";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Una giornata dell'Acate Book Festival 2026 e il suo tema";

export function generateStaticParams() {
  return days.map((d) => ({ slug: d.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const day = daysBySlug.get(slug) ?? days[0];
  return renderOg({
    eyebrow: `${day.label} · il tema`,
    subtitle: day.theme,
    title: day.topic,
    meta: "Acate (RG) · ingresso libero",
    tone: day.tone,
  });
}
