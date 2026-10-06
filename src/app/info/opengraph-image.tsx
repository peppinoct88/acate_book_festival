import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Info pratiche e come arrivare all'Acate Book Festival";

export default function Image() {
  return renderOg({
    eyebrow: "Info pratiche",
    subtitle: "Luoghi, orari, come arrivare",
    title: "Tutto quello che serve sapere",
  });
}
