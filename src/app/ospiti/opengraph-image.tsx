import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Gli ospiti dell'Acate Book Festival 2026";

export default function Image() {
  return renderOg({
    eyebrow: "Gli ospiti",
    subtitle: "Impastato · Giuffrè · Ferraloro · Santa Briganti",
    title: "Ogni ospite è un libro",
  });
}
