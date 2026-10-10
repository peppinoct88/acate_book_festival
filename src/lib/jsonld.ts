import { absoluteUrl, site } from "@/content/site";
import { getGuest } from "@/content/guests";
import { days, daysById, venues } from "@/content/venues";
import { dayHours, exhibition, programUpdatedAt, sessions } from "@/content/program";
import type { Activity, Session } from "@/content/types";
import type { FaqItem } from "@/content/faq";

/** Dati strutturati schema.org (JSON-LD). Un oggetto per tipo, coerente con ciò che la pagina mostra. */

type Json = Record<string, unknown>;

const festivalId = absoluteUrl("/#festival-2026");
const brandId = absoluteUrl("/#organizzazione");
const organizerId = absoluteUrl("/#comune-di-acate");

const festivalImages = [
  absoluteUrl("/images/festival-16x9.jpg"),
  absoluteUrl("/images/festival-4x3.jpg"),
  absoluteUrl("/images/festival-1x1.jpg"),
];

function postalAddress(): Json {
  return {
    "@type": "PostalAddress",
    addressLocality: site.place.town,
    postalCode: site.place.postalCode,
    addressRegion: site.place.province,
    addressCountry: "IT",
  };
}

function organizer(): Json {
  return {
    "@type": "GovernmentOrganization",
    "@id": organizerId,
    name: site.organizer.name,
    url: site.organizer.url,
  };
}

function funder(): Json {
  return {
    "@type": "GovernmentOrganization",
    name: `${site.funding.region} – ${site.funding.department}`,
  };
}

function freeOffer(url: string): Json {
  return {
    "@type": "Offer",
    price: 0,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    validFrom: `${programUpdatedAt}T00:00:00${site.utcOffset}`,
    url,
  };
}

function venuePlace(session: Pick<Session, "venue">): Json {
  const venue = venues[session.venue];
  return {
    "@type": "Place",
    name: `${venue.name} · ${venue.where}`,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.place.geo.latitude,
      longitude: site.place.geo.longitude,
    },
  };
}

export function organizationJsonLd(): Json {
  const sameAs = [site.social.instagram, site.social.facebook].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": brandId,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icons/icon-512.png"),
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.contacts.email ? { email: site.contacts.email } : {}),
  };
}

export function websiteJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} ${site.year}`,
    url: absoluteUrl("/"),
    inLanguage: "it-IT",
    publisher: { "@id": brandId },
  };
}

function eventType(activity: Activity): string {
  switch (activity.kind) {
    case "incontro":
      return "LiteraryEvent";
    case "spettacolo":
      return "TheaterEvent";
    case "laboratorio":
      return "ChildrensEvent";
    case "mostra":
      return "ExhibitionEvent";
    case "musica":
      return "MusicEvent";
    default:
      return "Event";
  }
}

function performers(session: Session): Json[] {
  return session.guests
    .map((slug) => getGuest(slug))
    .filter((g) => g !== undefined)
    .map((g) => ({
      "@type": g.type === "persona" ? "Person" : g.type === "gruppo" ? "MusicGroup" : "PerformingGroup",
      name: g.type === "compagnia" ? "Associazione Culturale Santa Briganti" : g.name,
      url: absoluteUrl(`/ospiti/${g.slug}`),
    }));
}

function ageRange(session: Session): string | undefined {
  const { minAge, maxAge } = session.audience;
  if (minAge && maxAge) return `${minAge}-${maxAge}`;
  if (minAge) return `${minAge}-`;
  return undefined;
}

export function sessionEventJsonLd(session: Session): Json {
  const url = absoluteUrl(session.href ?? "/programma");
  const performer = performers(session);
  const age = ageRange(session);
  return {
    "@context": "https://schema.org",
    "@type": eventType(session.activity),
    "@id": `${url}#${session.id}`,
    name: session.activity.kicker ? `${session.title} · ${session.activity.kicker}` : session.title,
    description: session.activity.summary,
    url,
    startDate: session.startISO,
    endDate: session.endISO,
    eventStatus:
      session.status === "annullato"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: venuePlace(session),
    image: festivalImages,
    organizer: organizer(),
    funder: funder(),
    ...(performer.length ? { performer } : {}),
    offers: freeOffer(url),
    isAccessibleForFree: true,
    inLanguage: "it",
    ...(age ? { typicalAgeRange: age } : {}),
    superEvent: { "@id": festivalId },
  };
}

export function festivalJsonLd(): Json {
  const subEvent = sessions
    .filter((s) => s.activity.page)
    .map((s) => ({ "@id": `${absoluteUrl(s.href ?? "/programma")}#${s.id}` }));
  return {
    "@context": "https://schema.org",
    "@type": "Festival",
    "@id": festivalId,
    name: `${site.name} 2026 · ${site.edition}`,
    alternateName: `${site.name} – ${site.claim}`,
    description: site.description,
    url: absoluteUrl("/"),
    startDate: `${site.dates.start}T${dayHours(days[0].id).start}:00${site.utcOffset}`,
    endDate: `${site.dates.end}T${dayHours(days[days.length - 1].id).end}:00${site.utcOffset}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: `${site.place.label} · Palco del Castello e Villa dei lettori`,
      address: postalAddress(),
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.place.geo.latitude,
        longitude: site.place.geo.longitude,
      },
    },
    image: festivalImages,
    organizer: organizer(),
    funder: funder(),
    offers: freeOffer(absoluteUrl("/programma")),
    isAccessibleForFree: true,
    inLanguage: "it",
    subEvent,
  };
}

export function exhibitionJsonLd(): Json {
  const url = absoluteUrl("/mostra-peppino-impastato");
  const exhibitionDate = daysById.get(exhibition.day)!.date;
  return {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "@id": `${url}#mostra`,
    name: "Radici libere. Peppino Impastato, una vita per immagini",
    description:
      "Mostra fotografica sulla vita di Peppino Impastato alla Villa dei lettori, aperta venerdì 16 ottobre, nella giornata dell'Acate Book Festival dedicata alla mafia, dalle 17 alle 22.",
    url,
    startDate: `${exhibitionDate}T${exhibition.start}:00${site.utcOffset}`,
    endDate: `${exhibitionDate}T${exhibition.end}:00${site.utcOffset}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: venuePlace({ venue: "villa" }),
    image: festivalImages,
    organizer: organizer(),
    offers: freeOffer(url),
    isAccessibleForFree: true,
    inLanguage: "it",
    superEvent: { "@id": festivalId },
  };
}

export function personJsonLd(slug: string): Json | null {
  const guest = getGuest(slug);
  if (!guest) return null;
  const url = absoluteUrl(`/ospiti/${guest.slug}`);
  if (guest.type === "compagnia") {
    return {
      "@context": "https://schema.org",
      "@type": "PerformingGroup",
      name: "Associazione Culturale Santa Briganti",
      description: guest.short,
      url,
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vittoria",
          addressRegion: "RG",
          addressCountry: "IT",
        },
      },
      ...(guest.links?.length ? { sameAs: guest.links.map((l) => l.url) } : {}),
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: guest.name,
    jobTitle: guest.role,
    description: guest.short,
    url,
  };
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
