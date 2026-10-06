import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Il programma dell'Acate Book Festival 2026";

export default function Image() {
  return renderOg({
    eyebrow: "Il programma",
    subtitle: "Mafia, donne, immigrazione",
    title: "Tre giornate, tre temi",
    meta: "16 / 17 / 18 ottobre · dalle 17 · ingresso libero",
  });
}
