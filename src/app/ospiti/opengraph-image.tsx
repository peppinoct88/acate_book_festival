import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { anyHidden } from "@/content/reveal";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Gli ospiti dell'Acate Book Festival 2026";

export default function Image() {
  return renderOg({
    eyebrow: "Gli ospiti",
    subtitle: anyHidden
      ? "Tre autori, svelati uno alla volta · Santa Briganti"
      : "Impastato · Giuffrè · Ferraloro · Santa Briganti",
    title: "Ogni ospite è un libro",
  });
}
