import type { StaticImageData } from "next/image";

export type DayId = "ven" | "sab" | "dom";
export type VenueId = "palco" | "villa";

export type Kind =
  | "incontro"
  | "spettacolo"
  | "laboratorio"
  | "partecipazione"
  | "mostra"
  | "firmacopie"
  | "cerimonia"
  | "musica";

export type SessionStatus = "programmato" | "spostato" | "annullato";

export interface Audience {
  /** Etichetta mostrata sul badge, es. "Per tutti", "4–7 anni" */
  label: string;
  /** true se l'appuntamento è pensato per bambini e ragazzi (filtro «Piccole radici») */
  kids: boolean;
  minAge?: number;
  maxAge?: number;
}

export interface Book {
  title: string;
  publisher: string;
  year?: number;
  note?: string;
}

export interface FestivalDay {
  id: DayId;
  date: string; // YYYY-MM-DD
  weekday: string;
  label: string; // "Venerdì 16 ottobre"
  short: string; // "Ven 16"
  anchor: string; // "venerdi-16"
  /** Il macro tema della giornata, es. "Mafia" */
  topic: string;
  /** Pagina della giornata: /giornate/<slug> */
  slug: string;
  theme: string; // "Radici della memoria"
  /** Una riga che dice di cosa parla la giornata */
  claim: string;
  intro: string;
  /** Testo della pagina della giornata */
  body: string[];
  /** Colore della giornata, preso dal manifesto */
  tone: "ink" | "coral" | "teal";
}

export interface Venue {
  id: VenueId;
  name: string;
  short: string;
  where: string;
  description: string;
  features: string[];
  /** Query per le app di mappe: niente coordinate inventate */
  mapQuery: string;
}

export interface SessionInput {
  day: DayId;
  start: string; // HH:MM
  end: string; // HH:MM
  venue: VenueId;
  /** Titolo specifico della singola replica, se diverso da quello dell'attività */
  title?: string;
  /** Nota breve accanto al titolo, es. "seconda replica" */
  note?: string;
  audience?: Audience;
  guests?: string[];
  status?: SessionStatus;
  statusNote?: string;
}

export interface Activity {
  slug: string;
  title: string;
  /** Riga sopra il titolo, es. "Incontro con Giovanni Impastato" */
  kicker?: string;
  /** Titolo per Google (assoluto, max 60 caratteri) se quello standard è troppo lungo */
  seoTitle?: string;
  kind: Kind;
  /** 1–2 frasi per le card del programma */
  summary: string;
  /** Paragrafi della pagina di dettaglio */
  body?: string[];
  guests?: string[];
  /** Chi modera l'incontro (solo il nome, finché non c'è una biografia) */
  moderator?: string;
  audience: Audience;
  credits?: string[];
  duration?: string;
  practical?: string[];
  book?: Book;
  /** Ha una pagina /programma/[slug]? */
  page: boolean;
  /** Destinazione alternativa quando non c'è una pagina dedicata */
  href?: string;
  featured?: boolean;
  sessions: SessionInput[];
}

export interface Session extends Required<Pick<SessionInput, "day" | "start" | "end" | "venue">> {
  id: string;
  activity: Activity;
  title: string;
  note?: string;
  audience: Audience;
  guests: string[];
  status: SessionStatus;
  statusNote?: string;
  href?: string;
  startISO: string;
  endISO: string;
}

export interface Guest {
  slug: string;
  name: string;
  role: string;
  /** Iniziali per il monogramma */
  initials: string;
  short: string;
  bio: string[];
  books: Book[];
  links?: { label: string; url: string }[];
  /** Colore della copertina e delle iniziali: per gli autori quello della loro giornata */
  tone: "coral" | "teal" | "ink" | "paper";
  type: "persona" | "compagnia" | "gruppo";
  /** Ritratto (src/assets/ospiti/<slug>.jpg), fornito dall'organizzazione */
  photo?: StaticImageData;
  /** Logo per compagnie e gruppi (src/assets/partner/) */
  logo?: StaticImageData;
}

export interface Partner {
  name: string;
  role: string;
  logo: StaticImageData;
  /** Il logo è chiaro e va su fondo scuro */
  onDark?: boolean;
  url?: string;
  /** Pagina interna dedicata (ospite) */
  href?: string;
}

export interface Format {
  slug: string;
  name: string;
  when: string;
  description: string;
  icon: "light" | "tree" | "books" | "kids" | "mic" | "letter" | "phone" | "screen" | "drum";
  href?: string;
}
