import type { Metadata, Viewport } from "next";
import { Literata, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NoticeBanner } from "@/components/notice-banner";
import { RevealObserver } from "@/components/reveal";
import { TrackClicks } from "@/components/track-clicks";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { isProductionDeployment } from "@/lib/seo";
import "./globals.css";
import { isHidden } from "@/content/reveal";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  // Font da lettura: se non arriva subito si resta sul serif di riserva calibrato, senza ridisegnare la pagina
  display: "optional",
});

export const viewport: Viewport = {
  themeColor: "#fff9e9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} 2026 · 16–18 ottobre · Acate (RG)`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Acate Book Festival",
    "festival del libro",
    "Acate",
    "Ragusa",
    "Sicilia",
    ...(isHidden("giovanni-impastato") ? [] : ["Giovanni Impastato"]),
    "Peppino Impastato",
    "libri",
    "teatro per bambini",
    "ottobre 2026",
  ],
  authors: [{ name: site.organizer.name, url: site.organizer.url }],
  creator: site.name,
  publisher: site.organizer.name,
  category: "events",
  formatDetection: { telephone: false, address: false, email: false },
  robots: isProductionDeployment
    ? { index: true, follow: true, "max-image-preview": "large" }
    : { index: false, follow: false },
  other: {
    "geo.region": "IT-RG",
    "geo.placename": "Acate",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${outfit.variable} ${literata.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Abilita le animazioni di comparsa solo se JavaScript è attivo: senza JS tutto resta visibile */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenuto"
          className="skip-link fixed top-3 left-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-cream transition-transform focus-visible:translate-y-0"
        >
          Vai al contenuto
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <NoticeBanner />
        <SiteHeader />
        <main id="contenuto" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <TrackClicks />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
