import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "#LaMiaRadice: chi ti ha messo in mano il primo libro?";

export default function Image() {
  return renderOg({
    eyebrow: "#LaMiaRadice",
    title: "Chi ti ha messo in mano il primo libro?",
    meta: "Scrivi · Fotografa · Tagga",
    tone: "coral",
  });
}
