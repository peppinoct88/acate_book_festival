export type DayId = "ven" | "sab" | "dom";
export type VenueId = "palco" | "villa";

export type Kind =
  | "incontro"
  | "spettacolo"
  | "laboratorio"
  | "partecipazione"
  | "mostra"
  | "rito"
  | "firmacopie"
  | "cerimonia";

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
  theme: string; // "Radici della memoria"
  intro: string;
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
  tone: "coral" | "teal" | "ink" | "paper";
  type: "persona" | "compagnia";
}

export interface Format {
  slug: string;
  name: string;
  when: string;
  description: string;
  icon: "light" | "tree" | "books" | "kids" | "mic" | "letter" | "phone" | "screen";
  href?: string;
}
