/**
 * Configurazione generale del sito.
 * Tutto ciò che l'organizzazione deve poter cambiare senza toccare i componenti sta qui.
 * I campi vuoti ("") non vengono mostrati sul sito.
 */

/** Dominio definitivo. Su Vercel acatebookfestival.it (senza www) rimanda qui. */
const productionUrl = "https://www.acatebookfestival.it";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Su Vercel canonical, sitemap e anteprime social puntano sempre al dominio definitivo,
  // anche dagli indirizzi *.vercel.app
  if (process.env.VERCEL) return productionUrl;
  return "http://localhost:3000";
}

export const site = {
  name: "Acate Book Festival",
  edition: "I edizione",
  year: 2026,
  theme: "Radici",
  /** Titolo ufficiale dell'avviso pubblico del Comune */
  claim: "La cultura che fa crescere un territorio",
  url: resolveSiteUrl(),
  locale: "it_IT",
  timeZone: "Europe/Rome",
  /** Offset UTC valido per le date del festival (ora legale fino al 25 ottobre 2026) */
  utcOffset: "+02:00",
  description:
    "Acate Book Festival, I edizione, 16-18 ottobre 2026: tre giornate su mafia, donne e immigrazione, con incontri, teatro, musica e una mostra. Ingresso libero.",
  dates: {
    start: "2026-10-16",
    end: "2026-10-18",
    label: "16 / 17 / 18 ottobre 2026",
    short: "16–18 ottobre 2026",
  },
  hours: {
    program: "17:00–20:30",
    exhibition: "17:00–22:00",
  },
  place: {
    town: "Acate",
    province: "RG",
    region: "Sicilia",
    postalCode: "97011",
    label: "Centro storico di Acate (RG)",
    /** Coordinate del centro storico di Acate */
    geo: { latitude: 37.0339, longitude: 14.4942 },
  },
  hashtag: "#LaMiaRadice",
  /** Profili social ufficiali: inserire gli URL quando gli account sono attivi */
  social: {
    instagram: "",
    instagramHandle: "",
    facebook: "",
  },
  contacts: {
    email: "",
  },
  organizer: {
    name: "Comune di Acate",
    url: "https://www.comune.acate.rg.it",
    address: "Piazza Libertà 34, 97011 Acate (RG)",
  },
  /**
   * Il finanziamento regionale va citato in ogni pagina (footer), con lo stemma della Regione:
   * obbligo di evidenza del contributo (art. 8 dell'avviso). Dicitura ufficiale da regione.sicilia.it.
   */
  funding: {
    region: "Regione Siciliana",
    department: "Assessorato delle Autonomie Locali e della Funzione Pubblica",
    decree: "D.D.G. n. 475/S6 del 07.08.2026",
  },
  /** Organizzazione e gestione del sito (titolare del trattamento nella privacy policy) */
  production: {
    name: "CIVIKA S.R.L.",
    address: "Via Camelia 12, 95031 Adrano (CT)",
    vat: "06209750873",
    pec: "civikasrl@pec.it",
  },
} as const;

export type Site = typeof site;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
