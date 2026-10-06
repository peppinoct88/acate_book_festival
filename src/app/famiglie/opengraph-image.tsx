import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Piccole radici: teatro e letture per le famiglie all'Acate Book Festival";

export default function Image() {
  return renderOg({
    eyebrow: "Per le famiglie",
    subtitle: "Teatro e letture musicate",
    title: "Piccole radici",
    meta: "16 / 17 / 18 ottobre · ingresso libero",
  });
}
