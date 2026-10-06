import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMeta {
  title: string;
  /** Titolo completo senza il suffisso « · Acate Book Festival» */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  /** Titolo per i social, se diverso da quello della scheda */
  socialTitle?: string;
  noindex?: boolean;
}

/**
 * Metadata coerenti per ogni pagina: title, description, canonical, Open Graph e Twitter.
 * Le immagini di anteprima arrivano dai file opengraph-image della route.
 */
/** Anteprima di default (il manifesto): le route con un proprio opengraph-image la sostituiscono */
const defaultImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Acate Book Festival, I edizione: 16, 17 e 18 ottobre 2026 ad Acate.",
};

export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  socialTitle,
  noindex,
}: PageMeta): Metadata {
  const ogTitle = socialTitle ?? (absoluteTitle ? title : `${title} · ${site.name}`);
  description = truncate(description, 158);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: `${site.name} ${site.year}`,
      url: path,
      title: ogTitle,
      description,
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [defaultImage.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Tronca a fine parola, per description entro i limiti mostrati da Google */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

/** Le anteprime di Vercel non devono finire su Google */
export const isProductionDeployment = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
