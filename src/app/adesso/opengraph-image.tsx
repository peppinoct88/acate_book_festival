import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Adesso all'Acate Book Festival";

export default function Image() {
  return renderOg({
    eyebrow: "In tempo reale",
    subtitle: "Cosa c'è adesso, cosa comincia tra poco",
    title: "Adesso al festival",
  });
}
