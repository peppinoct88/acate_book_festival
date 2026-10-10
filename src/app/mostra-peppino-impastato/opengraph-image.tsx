import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "La mostra «Radici libere. Peppino Impastato, una vita per immagini»";

export default function Image() {
  return renderOg({
    eyebrow: "La mostra",
    subtitle: "Peppino Impastato, una vita per immagini",
    title: "Radici libere",
    meta: "Villa dei lettori · venerdì 16 ottobre · 17–22",
    tone: "ink",
  });
}
