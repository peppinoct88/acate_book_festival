import { site } from "./site";
import { daysById } from "./venues";
import type { Activity, Audience, DayId, Kind, Session } from "./types";

/**
 * PROGRAMMA DEFINITIVO — fonte: documento «Acate Book Festival 2026 · Radici — Programma definitivo».
 * Per modificare un orario o aggiungere un avviso su un singolo appuntamento
 * basta cambiare la sessione qui: pagine, calendari .ics, dati strutturati e anteprime si aggiornano da soli.
 * Per segnalare uno spostamento: status: "spostato", statusNote: "Si sposta in ...".
 */
export const programUpdatedAt = "2026-10-06";

const forAll: Audience = { label: "Per tutti", kids: false };
const families: Audience = { label: "Per tutti", kids: true };

const braccialetto =
  "Consegna e ritiro dei bambini con braccialetto numerato, all'accoglienza della Villa dei lettori.";

export const activities: Activity[] = [
  // ───────────────────────── VENERDÌ 16 · Radici della memoria
  {
    slug: "apertura-del-festival",
    title: "Apertura del festival e inaugurazione della mostra",
    kicker: "Si comincia",
    seoTitle: "Apertura del festival · Acate Book Festival",
    kind: "cerimonia",
    summary:
      "Saluti di benvenuto alla Villa dei lettori e inaugurazione di «Radici libere», la mostra su Peppino Impastato aperta per tutto il festival.",
    body: [
      "L'Acate Book Festival comincia alla Villa dei lettori, nella villa comunale: i saluti di benvenuto aprono la prima edizione e inaugurano «Radici libere. Peppino Impastato, una vita per immagini», la mostra fotografica che accompagna tutte e tre le giornate.",
      "Alle 17:20 parte la prima visita guidata alla mostra. Alle 17:40 si accende l'Albero delle radici: i bambini appendono i primi cartellini con il nome di chi ha messo loro in mano il primo libro, e comincia #LaMiaRadice.",
      "Poi il sentiero di luci porta al Palco del Castello, dove alle 18 cominciano le letture musicate di Santa Briganti.",
    ],
    audience: forAll,
    page: true,
    sessions: [{ day: "ven", start: "17:00", end: "17:20", venue: "villa" }],
  },
  {
    slug: "visita-guidata-alla-mostra",
    title: "Prima visita guidata alla mostra «Radici libere»",
    kind: "mostra",
    summary: "Un primo percorso accompagnato tra le immagini della vita di Peppino Impastato.",
    audience: forAll,
    page: false,
    href: "/mostra-peppino-impastato",
    sessions: [{ day: "ven", start: "17:20", end: "17:40", venue: "villa" }],
  },
  {
    slug: "si-accende-l-albero-delle-radici",
    title: "Si accende l'Albero delle radici",
    kind: "partecipazione",
    summary:
      "I bambini appendono i primi nomi di chi ha messo loro in mano il primo libro: parte #LaMiaRadice.",
    audience: families,
    page: false,
    href: "/lamiaradice",
    sessions: [{ day: "ven", start: "17:40", end: "18:00", venue: "villa" }],
  },
  {
    slug: "a-colpi-di-mantice",
    title: "A colpi di mantice",
    kicker: "Letture musicate per bambini",
    kind: "spettacolo",
    summary:
      "Fiabe della tradizione popolare e albi illustrati, letti ad alta voce con la fisarmonica dal vivo. Tre repliche, una per pomeriggio.",
    body: [
      "Una voce, una fisarmonica e una pila di libri: «A colpi di mantice» sono letture animate e musicate dal vivo, dedicate ai bambini, con fiabe della tradizione popolare italiana e albi illustrati.",
      "Le firma l'Associazione Culturale Santa Briganti di Vittoria, che da anni porta la lettura ad alta voce nelle scuole, nelle biblioteche e nelle piazze. Le repliche sono tre, una per ogni pomeriggio, ciascuna pensata per un'età: venerdì per tutti i bambini, sabato per i più piccoli (4–7 anni), domenica per i più grandi (8–11 anni).",
      "Le prime file della platea, con i cuscini, sono per i bambini.",
    ],
    guests: ["santa-briganti"],
    credits: ["Associazione Culturale Santa Briganti"],
    duration: "40 minuti",
    audience: { label: "Per bambini", kids: true },
    page: true,
    featured: true,
    sessions: [
      { day: "ven", start: "18:00", end: "18:40", venue: "palco" },
      {
        day: "sab",
        start: "17:00",
        end: "17:40",
        venue: "palco",
        note: "seconda replica, per i più piccoli",
        audience: { label: "4–7 anni", kids: true, minAge: 4, maxAge: 7 },
      },
      {
        day: "dom",
        start: "17:00",
        end: "17:40",
        venue: "palco",
        note: "terza replica",
        audience: { label: "8–11 anni", kids: true, minAge: 8, maxAge: 11 },
      },
    ],
  },
  {
    slug: "laboratorio-santa-briganti",
    title: "Laboratorio con Santa Briganti",
    kicker: "Laboratorio per ragazzi",
    kind: "laboratorio",
    summary:
      "Mentre i genitori ascoltano Giovanni Impastato, i ragazzi lavorano con gli artisti di Santa Briganti alla Villa dei lettori.",
    body: [
      "La regola dei grandi festival per famiglie vale anche ad Acate: mentre sul palco c'è l'incontro, i ragazzi sono al laboratorio. Il venerdì lo conducono gli artisti dell'Associazione Culturale Santa Briganti, alla Villa dei lettori.",
      "Il laboratorio comincia alle 18:40, in tempo perché i genitori raggiungano il Palco del Castello per l'incontro delle 19 con Giovanni Impastato.",
    ],
    guests: ["santa-briganti"],
    practical: [braccialetto],
    audience: { label: "Per ragazzi", kids: true },
    page: true,
    sessions: [{ day: "ven", start: "18:40", end: "19:30", venue: "villa" }],
  },
  {
    slug: "rito-della-luce",
    title: "Il rito della luce",
    kicker: "Ogni sera, al calare del buio",
    kind: "rito",
    summary:
      "Quando finisce la luce del giorno, un bambino legge una frase scelta dall'ospite della serata e il festival si accende.",
    body: [
      "In questi giorni ad Acate il sole tramonta poco dopo le 18:20 e verso le 18:50 l'ultima luce se ne va. È lì che il festival si accende: un bambino sale sul palco, legge una frase scelta dall'ospite della serata, e si illuminano le luci del sentiero e la facciata del Castello.",
      "Il rito si ripete ogni sera e segna il passaggio dal pomeriggio alla sera: subito dopo comincia l'appuntamento principale. Domenica porta con sé anche i riconoscimenti #LaMiaRadice: le storie più belle ricevono le copie autografate dagli autori del festival.",
    ],
    audience: forAll,
    page: true,
    sessions: [
      { day: "ven", start: "18:45", end: "18:52", venue: "palco" },
      { day: "sab", start: "18:45", end: "18:52", venue: "palco" },
      {
        day: "dom",
        start: "18:50",
        end: "18:57",
        venue: "palco",
        title: "Il rito della luce e i riconoscimenti #LaMiaRadice",
      },
    ],
  },
  {
    slug: "le-radici-che-si-scelgono",
    title: "Le radici che si scelgono",
    kicker: "Incontro con Giovanni Impastato",
    seoTitle: "Giovanni Impastato ad Acate: «Le radici che si scelgono»",
    kind: "incontro",
    summary:
      "Il fratello di Peppino racconta una famiglia, una scelta e una voce libera: quella di chi, nato dentro la mafia, ha scelto altre radici.",
    body: [
      "Peppino Impastato era nato a Cinisi in una famiglia mafiosa. Da ragazzo ruppe con il padre, scelse altre radici e dai microfoni di Radio Aut denunciò a voce alta gli affari dei mafiosi di Cinisi e Terrasini, fino all'assassinio, nella notte tra l'8 e il 9 maggio 1978. Suo fratello Giovanni ne custodisce la memoria da allora.",
      "Nella giornata che il festival dedica alle radici della memoria, Giovanni Impastato sale sul Palco del Castello per raccontare cosa vuol dire scegliere da che parte stare: la famiglia, la casa di Cinisi diventata Casa Memoria, gli incontri con i ragazzi delle scuole di tutta Italia.",
      "L'incontro chiude il percorso cominciato alle 17 con l'inaugurazione della mostra «Radici libere». Alle 20, firmacopie al bookshop della Villa dei lettori.",
    ],
    guests: ["giovanni-impastato"],
    audience: forAll,
    page: true,
    featured: true,
    sessions: [{ day: "ven", start: "19:00", end: "20:00", venue: "palco" }],
  },
  {
    slug: "firmacopie",
    title: "Firmacopie",
    kind: "firmacopie",
    summary: "Al bookshop della Villa dei lettori, con l'ospite della serata.",
    audience: forAll,
    page: false,
    sessions: [
      {
        day: "ven",
        start: "20:00",
        end: "20:30",
        venue: "villa",
        title: "Firmacopie con Giovanni Impastato",
        guests: ["giovanni-impastato"],
      },
      {
        day: "sab",
        start: "20:00",
        end: "20:30",
        venue: "villa",
        title: "Firmacopie con Antonella Desirée Giuffrè",
        guests: ["antonella-desiree-giuffre"],
      },
      {
        day: "dom",
        start: "18:40",
        end: "19:00",
        venue: "villa",
        title: "Firmacopie con Maria Antonietta Ferraloro",
        guests: ["maria-antonietta-ferraloro"],
      },
    ],
  },

  // ───────────────────────── SABATO 17 · Radici di coraggio
  {
    slug: "la-buca-delle-lettere-di-coraggio",
    title: "La buca delle lettere di coraggio",
    kicker: "Scrivi a chi è lontano",
    kind: "partecipazione",
    summary:
      "Scrivi una cartolina del festival a chi è lontano: la imbuchi alla Villa dei lettori e la spediamo noi.",
    body: [
      "C'è qualcuno lontano a cui vorresti scrivere? Alla Villa dei lettori trovi le cartoline del festival e una buca delle lettere: scrivi, imbuchi, e al resto pensiamo noi. Le cartoline partono lunedì 19 ottobre.",
      "L'idea nasce da «La seminatrice di coraggio» di Antonella Desirée Giuffrè, il romanzo protagonista della serata: durante la Grande Guerra le seminatrici di coraggio scrivevano ai soldati al fronte e portavano notizie alle famiglie. Una lettera, allora come oggi, può essere un gesto di coraggio.",
    ],
    audience: families,
    page: true,
    sessions: [{ day: "sab", start: "17:00", end: "20:00", venue: "villa" }],
  },
  {
    slug: "lettere-di-coraggio",
    title: "Lettere di coraggio",
    kicker: "Laboratorio per ragazzi",
    kind: "laboratorio",
    summary:
      "Ispirato alle seminatrici di coraggio della Grande Guerra: a chi scriveresti per dargli coraggio?",
    body: [
      "Più di cento anni fa, durante la Grande Guerra, le «seminatrici di coraggio» portavano notizie dal fronte alle famiglie e scrivevano ai soldati lontani. Il laboratorio parte da quella storia, raccontata nel romanzo di Antonella Desirée Giuffrè, per chiedere ai ragazzi: a chi scriveresti per dargli coraggio? E chi ha dato coraggio a te?",
      "Si scrive, si disegna, si cercano le parole giuste da mettere in una lettera. Il laboratorio si tiene alla Villa dei lettori mentre sul Palco del Castello vanno in scena «Le seminatrici di oggi».",
    ],
    credits: ["A cura degli educatori del festival"],
    practical: [braccialetto],
    audience: { label: "8–13 anni", kids: true, minAge: 8, maxAge: 13 },
    page: true,
    sessions: [{ day: "sab", start: "17:45", end: "18:45", venue: "villa" }],
  },
  {
    slug: "le-seminatrici-di-oggi",
    title: "Le seminatrici di oggi",
    kicker: "Storie di coraggio e microfono aperto",
    kind: "partecipazione",
    summary:
      "Tre donne di Acate raccontano in cinque minuti un loro gesto di coraggio. Poi il microfono passa al pubblico: «Leggi una pagina».",
    body: [
      "Tre donne di Acate salgono sul palco e raccontano, in cinque minuti ciascuna, un loro gesto di coraggio: sono le seminatrici di oggi.",
      "Subito dopo comincia «Leggi una pagina»: il microfono è aperto a tutti, tre minuti a testa per leggere la pagina che ti ha cambiato qualcosa. Porta il libro con la tua pagina.",
    ],
    practical: ["Per leggere ci si iscrive all'accoglienza della Villa dei lettori."],
    audience: forAll,
    page: true,
    sessions: [{ day: "sab", start: "18:00", end: "18:40", venue: "palco" }],
  },
  {
    slug: "la-seminatrice-di-coraggio",
    title: "La seminatrice di coraggio",
    kicker: "Incontro con Antonella Desirée Giuffrè",
    seoTitle: "Antonella Desirée Giuffrè: «La seminatrice di coraggio»",
    kind: "incontro",
    summary:
      "Sicilia, 1914: una giovane maestra, una guerra lontana e le donne che seminarono coraggio. L'autrice racconta il suo romanzo.",
    body: [
      "Sicilia, 1914. Maria Roccaforte, giovane maestra di un paese sul mare di Ragusa, sposa un proprietario terriero e si trasferisce in un borgo dei Monti Iblei. Quando il marito parte per la Grande Guerra resta sola a mandare avanti casa e campi, tra la diffidenza delle contadine, le confische dei raccolti e i briganti.",
      "A Palermo incontra Sofia Bisi Albini e le «seminatrici di coraggio», le donne che portavano notizie dal fronte alle famiglie più povere: diventerà una di loro.",
      "Antonella Desirée Giuffrè racconta il suo romanzo e le donne che la Storia ha spesso lasciato ai margini, nella giornata che il festival dedica alle radici di coraggio. Alle 20, firmacopie al bookshop della Villa dei lettori.",
    ],
    guests: ["antonella-desiree-giuffre"],
    book: { title: "La seminatrice di coraggio", publisher: "Tre60", year: 2025 },
    audience: forAll,
    page: true,
    featured: true,
    sessions: [{ day: "sab", start: "19:00", end: "20:00", venue: "palco" }],
  },

  // ───────────────────────── DOMENICA 18 · Radici in viaggio
  {
    slug: "la-pagella-dei-sogni",
    title: "La pagella dei sogni",
    kicker: "Laboratorio per bambini",
    kind: "laboratorio",
    summary:
      "Ogni bambino scrive la sua pagella dei sogni, cosa sa fare e cosa vuole imparare, e la porta allo spettacolo delle 19.",
    body: [
      "Una pagella diversa da tutte le altre: niente voti, solo quello che sai fare e quello che vuoi imparare. Ogni bambino scrive e decora la sua «pagella dei sogni» alla Villa dei lettori.",
      "Poi la porta con sé allo spettacolo delle 19, «Shuma», ispirato alla storia vera di un ragazzo del Mali che nel naufragio del 18 aprile 2015 portava la pagella cucita nella giacca. Si arriva in platea con qualcosa di prezioso in tasca.",
    ],
    credits: ["A cura degli educatori del festival"],
    practical: [braccialetto],
    audience: { label: "6–11 anni", kids: true, minAge: 6, maxAge: 11 },
    page: true,
    sessions: [{ day: "dom", start: "17:45", end: "18:40", venue: "villa" }],
  },
  {
    slug: "il-gattopardo-raccontato-ai-nostri-figli",
    title: "Il Gattopardo raccontato ai nostri figli",
    kicker: "Incontro con Maria Antonietta Ferraloro",
    seoTitle: "Il Gattopardo ai ragazzi con Maria Antonietta Ferraloro",
    kind: "incontro",
    summary:
      "Come si racconta un capolavoro ai ragazzi di oggi? Maria Antonietta Ferraloro parte dal libro scritto per sua figlia.",
    body: [
      "«Il Gattopardo» è il romanzo siciliano più famoso al mondo: ma come lo si racconta a un ragazzo di oggi? Maria Antonietta Ferraloro, docente e studiosa di Tomasi di Lampedusa, lo ha fatto in un libro scritto per sua figlia, «Il Gattopardo raccontato a mia figlia» (La Nuova Frontiera Junior).",
      "Da quelle pagine nasce un incontro per genitori, figli e insegnanti su come le storie passano da una generazione all'altra: i personaggi, i luoghi, le parole che restano.",
      "Alle 18:40, firmacopie al bookshop della Villa dei lettori.",
    ],
    guests: ["maria-antonietta-ferraloro"],
    book: {
      title: "Il Gattopardo raccontato a mia figlia",
      publisher: "La Nuova Frontiera Junior",
      year: 2017,
    },
    audience: { label: "Per famiglie", kids: true },
    page: true,
    featured: true,
    sessions: [{ day: "dom", start: "18:00", end: "18:40", venue: "palco" }],
  },
  {
    slug: "shuma",
    title: "Shuma",
    kicker: "Una favola in fondo al mare",
    kind: "spettacolo",
    summary:
      "Un bambino cade in mare e intraprende un lungo viaggio verso il «SopraSopra». Lo spettacolo di Peppe Macauda che chiude il festival.",
    body: [
      "Un bambino cade in mare e, tra le bolle, chiede aiuto come in una preghiera. Insieme a un cavalluccio marino comincia un lungo viaggio verso il «SopraSopra»: una fiaba umana ambientata in fondo al mare, allegoria delle rotte dei migranti e della scelta tra andare e restare.",
      "Lo spettacolo è ispirato alla storia vera di un ragazzo del Mali che, nel naufragio del 18 aprile 2015, portava con sé la pagella scolastica cucita nella giacca. Peppe Macauda lo porta in scena in italiano e in dialetto siciliano, con momenti che richiamano la tradizione del cunto, mentre alle sue spalle scorrono le illustrazioni di Bruna Fornaro.",
      "È lo spettacolo che chiude la prima edizione: comincia alle 19, quando è già buio, perché le immagini proiettate si vedano al meglio.",
    ],
    guests: ["santa-briganti"],
    credits: [
      "di e con Peppe Macauda",
      "dal testo «Shuma Tragliabissi» di Dario Muratore",
      "illustrazioni di Bruna Fornaro",
      "produzione Associazione Culturale Santa Briganti",
      "con il patrocinio dell'UNHCR",
    ],
    duration: "50 minuti",
    audience: { label: "Dagli 8 anni", kids: true, minAge: 8 },
    page: true,
    featured: true,
    sessions: [{ day: "dom", start: "19:00", end: "19:50", venue: "palco" }],
  },
  {
    slug: "saluti-e-arrivederci",
    title: "Saluti e arrivederci al 2027",
    kind: "cerimonia",
    summary:
      "Chiusura della prima edizione e donazione alla Biblioteca comunale di una selezione dei libri presentati. La mostra resta aperta fino alle 22.",
    audience: forAll,
    page: false,
    href: "/festival",
    sessions: [{ day: "dom", start: "20:00", end: "20:15", venue: "palco" }],
  },
];

export const kindLabels: Record<Kind, string> = {
  incontro: "Incontro",
  spettacolo: "Teatro e letture",
  laboratorio: "Laboratorio",
  partecipazione: "Partecipa",
  mostra: "Mostra",
  rito: "Rito della luce",
  firmacopie: "Firmacopie",
  cerimonia: "Cerimonia",
};

export function isoFor(day: DayId, time: string): string {
  const d = daysById.get(day);
  if (!d) throw new Error(`Giorno sconosciuto: ${day}`);
  return `${d.date}T${time}:00${site.utcOffset}`;
}

const dayOrder: Record<DayId, number> = { ven: 0, sab: 1, dom: 2 };

function buildSessions(): Session[] {
  const list: Session[] = [];
  for (const activity of activities) {
    for (const s of activity.sessions) {
      const guests = s.guests ?? activity.guests ?? [];
      const href = activity.page
        ? `/programma/${activity.slug}`
        : (activity.href ?? (guests[0] ? `/ospiti/${guests[0]}` : undefined));
      list.push({
        id: `${activity.slug}-${s.day}-${s.start.replace(":", "")}`,
        activity,
        day: s.day,
        start: s.start,
        end: s.end,
        venue: s.venue,
        title: s.title ?? activity.title,
        note: s.note,
        audience: s.audience ?? activity.audience,
        guests,
        status: s.status ?? "programmato",
        statusNote: s.statusNote,
        href,
        startISO: isoFor(s.day, s.start),
        endISO: isoFor(s.day, s.end),
      });
    }
  }
  return list.sort(
    (a, b) =>
      dayOrder[a.day] - dayOrder[b.day] || a.start.localeCompare(b.start) || a.end.localeCompare(b.end),
  );
}

export const sessions: Session[] = buildSessions();

export const activitiesBySlug = new Map(activities.map((a) => [a.slug, a]));
export const pagedActivities = activities.filter((a) => a.page);

export function getActivity(slug: string): Activity | undefined {
  return activitiesBySlug.get(slug);
}

export function sessionsForDay(day: DayId): Session[] {
  return sessions.filter((s) => s.day === day);
}

export function sessionsForActivity(slug: string): Session[] {
  return sessions.filter((s) => s.activity.slug === slug);
}

export function sessionsForGuest(slug: string): Session[] {
  return sessions.filter((s) => s.guests.includes(slug));
}

/** Gli appuntamenti in evidenza per la home: tre per giorno */
export const highlightIds: Record<DayId, string[]> = {
  ven: [
    "apertura-del-festival-ven-1700",
    "a-colpi-di-mantice-ven-1800",
    "le-radici-che-si-scelgono-ven-1900",
  ],
  sab: [
    "a-colpi-di-mantice-sab-1700",
    "le-seminatrici-di-oggi-sab-1800",
    "la-seminatrice-di-coraggio-sab-1900",
  ],
  dom: [
    "la-pagella-dei-sogni-dom-1745",
    "il-gattopardo-raccontato-ai-nostri-figli-dom-1800",
    "shuma-dom-1900",
  ],
};

export const sessionsById = new Map(sessions.map((s) => [s.id, s]));

export function highlightsForDay(day: DayId): Session[] {
  return highlightIds[day].map((id) => {
    const s = sessionsById.get(id);
    if (!s) throw new Error(`Highlight non trovato: ${id}`);
    return s;
  });
}

/** Sempre aperti alla Villa dei lettori, tutti e tre i giorni */
export const alwaysOn = [
  {
    title: "Mostra «Radici libere»",
    when: "17:00–22:00",
    text: "Peppino Impastato, una vita per immagini.",
    href: "/mostra-peppino-impastato",
  },
  {
    title: "L'Albero delle radici",
    when: "Sempre",
    text: "Appendi il nome di chi ti ha messo in mano il primo libro.",
    href: "/lamiaradice",
  },
  {
    title: "Radici di carta",
    when: "Sempre",
    text: "Scambio libri lungo il sentiero di luci: prendi un libro, lasciane un altro.",
    href: "/festival#radici-di-carta",
  },
  {
    title: "Indovina il classico",
    when: "Sempre",
    text: "Leggi in siciliano l'incipit di un classico: diventa un video del festival.",
    href: "/festival#indovina-il-classico",
  },
  {
    title: "Bookshop",
    when: "Sempre",
    text: "I libri degli ospiti del festival, con le firmacopie dopo ogni incontro.",
    href: "/info#bookshop",
  },
] as const;
