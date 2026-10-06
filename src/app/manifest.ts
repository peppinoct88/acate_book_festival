import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} 2026`,
    short_name: site.name,
    description: site.description,
    lang: "it",
    start_url: "/",
    display: "standalone",
    background_color: "#fff9e9",
    theme_color: "#fff9e9",
    categories: ["books", "entertainment", "events"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Programma", url: "/programma" },
      { name: "Adesso al festival", url: "/adesso" },
    ],
  };
}
