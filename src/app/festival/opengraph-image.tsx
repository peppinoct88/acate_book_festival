import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Acate Book Festival: un festival che mette radici";

export default function Image() {
  return renderOg({
    eyebrow: "Il festival",
    subtitle: "La cultura che fa crescere un territorio",
    title: "Un festival che mette radici",
  });
}
