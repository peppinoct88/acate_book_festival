import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Acate Book Festival, I edizione, 16-18 ottobre 2026: tre giornate su mafia, donne e immigrazione. Illustrazione del castello di Acate costruito con i libri.";

export default function Image() {
  return renderOg({
    eyebrow: "I edizione · Acate",
    subtitle: "Tre giornate: mafia, donne, immigrazione",
    title: "La cultura che fa crescere un territorio",
    meta: "16–18 ottobre 2026 · ingresso libero",
  });
}
