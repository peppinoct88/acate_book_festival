import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Il programma dell'Acate Book Festival 2026";

export default function Image() {
  return renderOg({
    eyebrow: "Il programma",
    subtitle: "Incontri, teatro, laboratori e una mostra",
    title: "Tre pomeriggi, due luoghi",
    meta: "16 / 17 / 18 ottobre · 17–20 · ingresso libero",
  });
}
