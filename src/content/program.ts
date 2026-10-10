import { guestsBySlug } from "./guests";
import { site } from "./site";
import { isHidden } from "./reveal";
import { days, daysById } from "./venues";
import type { Activity, Audience, DayId, Kind, Session } from "./types";

/**
 * PROGRAMMA DEFINITIVO — fonti: «Acate Book Festival 2026 · Radici — Programma definitivo» (4 ottobre),
 * contratto con Santa Briganti (6 ottobre) e indicazioni dell'organizzazione (6 ottobre: temi delle giornate,
 * banda e tamburi, monologo, moderatore, titolo dell'incontro con Maria Antonietta Ferraloro; senza rito della
 * luce, seminatrici di oggi e saluti finali; l'unico laboratorio è dentro «A colpi di mantice»).
 * Correzioni del 10 ottobre: firmacopie sempre sotto il Palco del Castello; sabato niente banda né tamburi e
 * niente buca delle lettere; monologo di 10 minuti alle 18 e subito dopo l'autrice, moderata da Elisa Petrillo;
 * domenica l'autrice alle 18 per circa 50 minuti, poi firmacopie e «Shuma» alle 19:15; mostra solo venerdì 16.
 * Per modificare un orario o aggiungere un avviso su un singolo appuntamento
 * basta cambiare la sessione qui: pagine, calendari .ics, dati strutturati e anteprime si aggiornano da soli.
 * Per segnalare uno spostamento: status: "spostato", statusNote: "Si sposta in ...".
 */
export const programUpdatedAt = "2026-10-10";

const forAll: Audience = { label: "Per tutti", kids: false };
const families: Audience = { label: "Per tutti", kids: true };

const allActivities: Activity[] = [
  // ───────────────────────── VENERDÌ 16 · Mafia · Radici della memoria
  {
    slug: "apertura-del-festival",
    title: "Banda e tamburi aprono il festival",
    kicker: "Inaugurazione",
    seoTitle: "Inaugurazione con banda e tamburi · Acate Book Festival",
    kind: "cerimonia",
    summary:
      "La Banda Città di Acate e I Grifoni di Biscari – Tamburi di Acate sfilano e inaugurano la prima edizione e la mostra su Peppino Impastato.",
    body: [
      "La prima edizione dell'Acate Book Festival si apre con la musica della città: la Banda Città di Acate e I Grifoni di Biscari – Tamburi di Acate sfilano e inaugurano il festival.",
      "Con il festival si inaugura «Radici libere. Peppino Impastato, una vita per immagini», la mostra fotografica alla Villa dei lettori, aperta fino alle 22 solo in questa prima giornata. Alle 17:20 parte la prima visita guidata; alle 17:40 si accende l'Albero delle radici e comincia #LaMiaRadice.",
      "È la giornata che il festival dedica alla mafia e alla memoria: alle 18 «A colpi di mantice» per bambini e ragazzi, alle 19 l'incontro con Giovanni Impastato.",
    ],
    teaser: {
      for: ["giovanni-impastato"],
      body: [
        "La prima edizione dell'Acate Book Festival si apre con la musica della città: la Banda Città di Acate e I Grifoni di Biscari – Tamburi di Acate sfilano e inaugurano il festival.",
        "Con il festival si inaugura «Radici libere. Peppino Impastato, una vita per immagini», la mostra fotografica alla Villa dei lettori, aperta fino alle 22 solo in questa prima giornata. Alle 17:20 parte la prima visita guidata; alle 17:40 si accende l'Albero delle radici e comincia #LaMiaRadice.",
        "È la giornata che il festival dedica alla mafia e alla memoria: alle 18 «A colpi di mantice» per bambini e ragazzi, alle 19 l'incontro con l'ospite della giornata, che sveliamo presto.",
      ],
    },
    guests: ["banda-citta-di-acate", "grifoni-di-biscari"],
    audience: forAll,
    page: true,
    featured: true,
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
    kicker: "Letture musicate e laboratorio",
    kind: "spettacolo",
    summary:
      "Fiabe e albi illustrati letti ad alta voce con la musica dal vivo, poi un laboratorio per bambini e ragazzi. Di e con Veronica Caggia e Peppe Macauda.",
    body: [
      "Una voce, una fisarmonica e una pila di libri: «A colpi di mantice» è una lettura ad alta voce musicata dal vivo, dedicata a bambini e ragazzi. Subito dopo la lettura, sul posto, comincia il laboratorio: in tutto, circa un'ora.",
      "È di e con Veronica Caggia e Peppe Macauda, dell'Associazione Culturale Santa Briganti di Vittoria, che da anni porta la lettura ad alta voce nelle scuole, nelle biblioteche e nelle piazze. «A colpi di mantice» è nato come percorso di lettura nelle classi delle scuole di Vittoria; a marzo 2026 è arrivato al Festival del Libro e della Lettura di Enna, con le «Fiabe italiane» di Italo Calvino. Quest'anno c'è una sola replica: venerdì alle 18, sul Palco del Castello.",
      "Alle 19, sullo stesso palco, l'incontro con Giovanni Impastato.",
    ],
    teaser: {
      for: ["giovanni-impastato"],
      body: [
        "Una voce, una fisarmonica e una pila di libri: «A colpi di mantice» è una lettura ad alta voce musicata dal vivo, dedicata a bambini e ragazzi. Subito dopo la lettura, sul posto, comincia il laboratorio: in tutto, circa un'ora.",
        "È di e con Veronica Caggia e Peppe Macauda, dell'Associazione Culturale Santa Briganti di Vittoria, che da anni porta la lettura ad alta voce nelle scuole, nelle biblioteche e nelle piazze. Quest'anno c'è una sola replica: venerdì alle 18, sul Palco del Castello.",
        "Alle 19, sullo stesso palco, l'incontro con l'ospite della giornata.",
      ],
    },
    guests: ["santa-briganti"],
    credits: ["di e con Veronica Caggia e Peppe Macauda", "Associazione Culturale Santa Briganti"],
    duration: "circa un'ora, laboratorio compreso",
    audience: { label: "Bambini e ragazzi", kids: true },
    page: true,
    featured: true,
    sessions: [{ day: "ven", start: "18:00", end: "19:00", venue: "palco" }],
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
      "Nella giornata che il festival dedica alla mafia, Giovanni Impastato sale sul Palco del Castello per raccontare cosa vuol dire scegliere da che parte stare: la famiglia, la casa di Cinisi diventata Casa Memoria, gli incontri con i ragazzi delle scuole di tutta Italia. Modera Giorgio Straquadanio.",
      "L'incontro chiude il percorso cominciato alle 17 con l'inaugurazione della mostra «Radici libere». Alle 20, firmacopie sotto il Palco del Castello.",
    ],
    teaser: {
      for: ["giovanni-impastato"],
      slug: "l-ospite-di-venerdi",
      title: "L'ospite della giornata",
      kicker: "Chi sarà? Lo sveliamo presto",
      summary:
        "Nella giornata dedicata alla mafia, sul Palco del Castello sale un ospite che sveliamo presto sui nostri social.",
      page: false,
    },
    guests: ["giovanni-impastato"],
    moderator: "Giorgio Straquadanio",
    audience: forAll,
    page: true,
    featured: true,
    sessions: [{ day: "ven", start: "19:00", end: "20:00", venue: "palco" }],
  },
  {
    slug: "firmacopie",
    title: "Firmacopie",
    kind: "firmacopie",
    summary: "Sotto il Palco del Castello, subito dopo l'incontro, con l'ospite della serata.",
    audience: forAll,
    page: false,
    sessions: [
      {
        day: "ven",
        start: "20:00",
        end: "20:30",
        venue: "palco",
        title: "Firmacopie con Giovanni Impastato",
        teaserTitle: "Firmacopie con l'ospite della serata",
        guests: ["giovanni-impastato"],
      },
      {
        day: "sab",
        start: "19:10",
        end: "19:40",
        venue: "palco",
        title: "Firmacopie con Antonella Desirée Giuffrè",
        teaserTitle: "Firmacopie con l'ospite della serata",
        guests: ["antonella-desiree-giuffre"],
      },
      {
        day: "dom",
        start: "18:50",
        end: "19:15",
        venue: "palco",
        title: "Firmacopie con Maria Antonietta Ferraloro",
        teaserTitle: "Firmacopie con l'ospite della serata",
        guests: ["maria-antonietta-ferraloro"],
      },
    ],
  },

  // ───────────────────────── SABATO 17 · Donne · Radici di coraggio
  {
    slug: "monologo-sulle-donne",
    title: "Un monologo sulle donne",
    kicker: "Teatro · Matilde Masaracchio",
    seoTitle: "Matilde Masaracchio, un monologo sulle donne · Acate",
    kind: "spettacolo",
    summary:
      "Dieci minuti di teatro aprono la serata dedicata alle donne: l'attrice Matilde Masaracchio porta sul palco un monologo sul loro coraggio.",
    body: [
      "La giornata che il festival dedica alle donne ha al centro il loro coraggio, quello che la Storia ha spesso lasciato ai margini.",
      "Alle 18 l'attrice Matilde Masaracchio sale sul Palco del Castello con un monologo sulle donne: una decina di minuti che aprono la serata. Subito dopo, sullo stesso palco, Antonella Desirée Giuffrè racconta «La seminatrice di coraggio».",
    ],
    teaser: {
      for: ["antonella-desiree-giuffre"],
      body: [
        "La giornata che il festival dedica alle donne ha al centro il loro coraggio, quello che la Storia ha spesso lasciato ai margini.",
        "Alle 18 l'attrice Matilde Masaracchio sale sul Palco del Castello con un monologo sulle donne: una decina di minuti che aprono la serata. Subito dopo, sullo stesso palco, l'incontro con l'ospite della giornata.",
      ],
    },
    guests: ["matilde-masaracchio"],
    duration: "circa 10 minuti",
    audience: forAll,
    page: true,
    featured: true,
    sessions: [{ day: "sab", start: "18:00", end: "18:10", venue: "palco" }],
  },
  {
    slug: "la-seminatrice-di-coraggio",
    title: "La seminatrice di coraggio",
    kicker: "Incontro con Antonella Desirée Giuffrè",
    seoTitle: "Desirée Giuffrè ad Acate: «La seminatrice di coraggio»",
    kind: "incontro",
    summary:
      "Sicilia, 1914: una giovane maestra, una guerra lontana e le donne che seminarono coraggio. L'autrice racconta il suo romanzo.",
    body: [
      "Sicilia, 1914. Maria Roccaforte, giovane maestra di un paese sul mare di Ragusa, sposa un proprietario terriero e si trasferisce in un borgo dei Monti Iblei. Quando il marito parte per la Grande Guerra resta sola a mandare avanti casa e campi, tra la diffidenza delle contadine, le confische dei raccolti e i briganti.",
      "A Palermo incontra Sofia Bisi Albini e le «seminatrici di coraggio», le donne che portavano notizie dal fronte alle famiglie più povere: diventerà una di loro.",
      "Antonella Desirée Giuffrè racconta il suo romanzo e le donne che la Storia ha spesso lasciato ai margini, nella giornata che il festival dedica alle donne. Modera Elisa Petrillo. L'incontro comincia subito dopo il monologo di Matilde Masaracchio; alla fine, firmacopie sotto il Palco del Castello.",
    ],
    teaser: {
      for: ["antonella-desiree-giuffre"],
      slug: "l-ospite-di-sabato",
      title: "L'ospite della giornata",
      kicker: "Chi sarà? Lo sveliamo presto",
      summary:
        "Nella giornata dedicata alle donne, sul Palco del Castello sale un ospite che sveliamo presto sui nostri social.",
      page: false,
    },
    guests: ["antonella-desiree-giuffre"],
    moderator: "Elisa Petrillo",
    book: { title: "La seminatrice di coraggio", publisher: "Tre60", year: 2025 },
    audience: forAll,
    page: true,
    featured: true,
    sessions: [{ day: "sab", start: "18:10", end: "19:10", venue: "palco" }],
  },

  // ───────────────────────── DOMENICA 18 · Immigrazione · Radici in viaggio
  {
    slug: "la-banda-citta-di-acate",
    title: "La banda apre il pomeriggio",
    kicker: "Banda Città di Acate",
    kind: "musica",
    summary: "La Banda Città di Acate apre l'ultima giornata del festival, dedicata all'immigrazione.",
    guests: ["banda-citta-di-acate"],
    audience: forAll,
    page: false,
    sessions: [{ day: "dom", start: "17:00", end: "17:30", venue: "palco" }],
  },
  {
    slug: "il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi",
    title: "Il Gattopardo raccontato alle ragazze e ai ragazzi",
    kicker: "Incontro con Maria Antonietta Ferraloro",
    seoTitle: "Ferraloro ad Acate: il Gattopardo alle ragazze e ai ragazzi",
    kind: "incontro",
    summary:
      "Maria Antonietta Ferraloro presenta il suo nuovo libro: «Il Gattopardo», un romanzo che comincia con uno sbarco, raccontato ai più giovani.",
    body: [
      "«Il Gattopardo» comincia con uno sbarco: è il maggio del 1860 e Garibaldi è appena arrivato a Marsala con i Mille. Il suo autore, Giuseppe Tomasi di Lampedusa, porta nel nome un'isola che oggi è il primo approdo in Europa per tante persone che attraversano il Mediterraneo. E nel romanzo il principe di Salina descrive la Sicilia come una terra che porta sulle spalle «magnifiche civiltà eterogenee, tutte venute da fuori».",
      "Maria Antonietta Ferraloro, docente e studiosa di Tomasi di Lampedusa, presenta «Il Gattopardo raccontato alle ragazze e ai ragazzi» (Gallucci Bros., 2026), il libro nato per raccontare il romanzo a sua figlia: la Sicilia che passa dai Borbone al Regno d'Italia, i personaggi, i luoghi, le parole che restano. Un incontro per ragazze e ragazzi, genitori e insegnanti, nella giornata che il festival dedica all'immigrazione.",
      "Dopo l'incontro, firmacopie sotto il Palco del Castello. Alle 19:15, sullo stesso palco, «Shuma» chiude il festival.",
    ],
    teaser: {
      for: ["maria-antonietta-ferraloro"],
      slug: "l-ospite-di-domenica",
      title: "L'ospite della giornata",
      kicker: "Chi sarà? Lo sveliamo presto",
      summary:
        "Un incontro per ragazze e ragazzi sulla Sicilia del «Gattopardo», il romanzo che comincia con uno sbarco. Chi lo racconta lo sveliamo presto sui nostri social.",
      page: false,
    },
    guests: ["maria-antonietta-ferraloro"],
    book: {
      title: "Il Gattopardo raccontato alle ragazze e ai ragazzi",
      publisher: "Gallucci Bros.",
      year: 2026,
    },
    audience: { label: "Per famiglie", kids: true },
    page: true,
    featured: true,
    sessions: [{ day: "dom", start: "18:00", end: "18:50", venue: "palco" }],
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
      "Il testo di Dario Muratore, «Shuma Tragliabissi», ha vinto il primo premio nella sezione Teatro Ragazzi del Concorso Autori Italiani di Sipario (2021) ed è diventato anche un libro illustrato (Torri del Vento, 2022).",
      "È lo spettacolo che chiude la prima edizione, nella giornata dedicata all'immigrazione: comincia alle 19:15, quando è già buio e le illustrazioni proiettate si vedono al meglio.",
    ],
    guests: ["santa-briganti"],
    credits: [
      "di e con Peppe Macauda",
      "dal testo «Shuma Tragliabissi» di Dario Muratore",
      "illustrazioni di Bruna Fornaro",
      "disegno luci di Simone Fini",
      "produzione Associazione Culturale Santa Briganti",
      "con il sostegno del CSD Casa Evangelica Valdese di Vittoria",
      "con il patrocinio dell'UNHCR",
    ],
    duration: "50 minuti",
    audience: { label: "Dagli 8 anni", kids: true, minAge: 8 },
    page: true,
    featured: true,
    sessions: [{ day: "dom", start: "19:15", end: "20:05", venue: "palco" }],
  },
];

/**
 * Le attività pubblicate: finché un ospite è segreto (src/content/reveal.ts) valgono i testi «teaser»,
 * senza il suo nome, il suo libro né la sua pagina. Un'attività con un ospite segreto senza teaser
 * blocca la build: meglio un errore che uno spoiler.
 */
function publish(activity: Activity): Activity {
  const { teaser, ...rest } = activity;
  const visible = (list?: string[]) => list?.filter((g) => !isHidden(g));
  const sessions = activity.sessions.map((s) => {
    const secret = (s.guests ?? []).some(isHidden);
    if (secret && !s.teaserTitle)
      throw new Error(`Manca teaserTitle per ${activity.slug} ${s.day} ${s.start}`);
    return { ...s, guests: visible(s.guests), title: secret ? s.teaserTitle : s.title };
  });
  const base: Activity = { ...rest, guests: visible(activity.guests), sessions };
  if (!teaser || !teaser.for.some(isHidden)) {
    if ((activity.guests ?? []).some(isHidden)) throw new Error(`Manca il teaser per ${activity.slug}`);
    return base;
  }
  // l'incontro dell'ospite segreto: testi del teaser e basta (niente fallback ai testi veri)
  const ownSecret = (activity.guests ?? []).some(isHidden);
  return {
    ...base,
    slug: teaser.slug ?? activity.slug,
    title: teaser.title ?? activity.title,
    kicker: ownSecret ? teaser.kicker : (teaser.kicker ?? activity.kicker),
    seoTitle: ownSecret ? undefined : activity.seoTitle,
    summary: teaser.summary ?? activity.summary,
    body: ownSecret ? teaser.body : (teaser.body ?? activity.body),
    book: ownSecret ? undefined : activity.book,
    page: teaser.page ?? activity.page,
  };
}

export const activities: Activity[] = allActivities.map(publish);

export const kindLabels: Record<Kind, string> = {
  incontro: "Incontro",
  spettacolo: "Teatro e letture",
  laboratorio: "Laboratorio",
  partecipazione: "Partecipa",
  mostra: "Mostra",
  firmacopie: "Firmacopie",
  cerimonia: "Inaugurazione",
  musica: "Musica",
};

export function isoFor(day: DayId, time: string): string {
  const d = daysById.get(day);
  if (!d) throw new Error(`Giorno sconosciuto: ${day}`);
  return `${d.date}T${time}:00${site.utcOffset}`;
}

const dayOrder: Record<DayId, number> = { ven: 0, sab: 1, dom: 2 };

/** Le repliche anche per chiave «vera» (slug dell'attività prima del teaser): solo per uso interno */
const sessionsByKey = new Map<string, Session>();
/** L'incontro di ogni autore segreto, per la scheda «Chi sarà?» */
const secretTalks = new Map<string, Session>();

function buildSessions(): Session[] {
  const list: Session[] = [];
  for (const [index, activity] of activities.entries()) {
    for (const s of activity.sessions) {
      const guests = s.guests ?? activity.guests ?? [];
      const href = activity.page
        ? `/programma/${activity.slug}`
        : (activity.href ?? (guests[0] ? `/ospiti/${guests[0]}` : undefined));
      const time = s.start.replace(":", "");
      const session: Session = {
        id: `${activity.slug}-${s.day}-${time}`,
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
      };
      sessionsByKey.set(`${allActivities[index].slug}-${s.day}-${time}`, session);
      for (const guest of allActivities[index].guests ?? []) {
        if (isHidden(guest) && !secretTalks.has(guest)) secretTalks.set(guest, session);
      }
      list.push(session);
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

/** L'incontro di un autore ancora segreto (reveal.ts), già con i testi teaser */
export function secretTalkFor(slug: string): Session | undefined {
  return secretTalks.get(slug);
}

/** Gli appuntamenti di un ospite: quelli in cui è ospite e quelli che modera (campo `moderator`) */
export function sessionsForGuest(slug: string): Session[] {
  const name = guestsBySlug.get(slug)?.name;
  return sessions.filter(
    (s) => s.guests.includes(slug) || (name !== undefined && s.activity.moderator === name),
  );
}

/** Gli appuntamenti in evidenza per la home: tre per giorno (id con lo slug vero, vale anche col teaser) */
export const highlightIds: Record<DayId, string[]> = {
  ven: [
    "apertura-del-festival-ven-1700",
    "a-colpi-di-mantice-ven-1800",
    "le-radici-che-si-scelgono-ven-1900",
  ],
  sab: ["monologo-sulle-donne-sab-1800", "la-seminatrice-di-coraggio-sab-1810", "firmacopie-sab-1910"],
  dom: [
    "la-banda-citta-di-acate-dom-1700",
    "il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi-dom-1800",
    "shuma-dom-1915",
  ],
};

export const sessionsById = new Map(sessions.map((s) => [s.id, s]));

export function highlightsForDay(day: DayId): Session[] {
  return highlightIds[day].map((id) => {
    const s = sessionsByKey.get(id);
    if (!s) throw new Error(`Highlight non trovato: ${id}`);
    return s;
  });
}

/** La mostra «Radici libere» alla Villa dei lettori: solo venerdì 16, nella giornata sulla mafia (10 ottobre) */
export const exhibition = { day: "ven" as DayId, start: "17:00", end: "22:00" };

/** Dal primo all'ultimo appuntamento di una giornata */
export function sessionHours(day: DayId): { start: string; end: string } {
  const list = sessionsForDay(day);
  const ends = list.map((s) => s.end).sort();
  return { start: list[0].start, end: ends[ends.length - 1] };
}

/** Inizio e fine di ogni giornata: gli appuntamenti e, venerdì, la mostra aperta fino alle 22 */
export function dayHours(day: DayId): { start: string; end: string } {
  const h = sessionHours(day);
  if (day !== exhibition.day) return h;
  return {
    start: exhibition.start < h.start ? exhibition.start : h.start,
    end: exhibition.end > h.end ? exhibition.end : h.end,
  };
}

/** «17», «18:10»: un orario HH:MM detto a voce, senza i minuti quando è l'ora piena */
export function spokenTime(time: string): string {
  const [h, m] = time.split(":");
  return m === "00" ? String(Number(h)) : `${Number(h)}:${m}`;
}

/** «Dalle 17 (sabato dalle 18)»: l'inizio delle tre giornate in breve, ricavato dal programma */
export function openingSummary(): string {
  const starts = days.map((d) => ({ weekday: d.weekday.toLowerCase(), start: sessionHours(d.id).start }));
  const counts = new Map<string, number>();
  for (const { start } of starts) counts.set(start, (counts.get(start) ?? 0) + 1);
  const usual = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const others = starts
    .filter((d) => d.start !== usual)
    .map((d) => `${d.weekday} dalle ${spokenTime(d.start)}`);
  return `Dalle ${spokenTime(usual)}${others.length ? ` (${others.join(", ")})` : ""}`;
}

/** Le stesse ore in formato ISO, per i componenti che girano nel browser (pagina «Adesso», contatore in home) */
export const festivalHours = days.map((d) => {
  const h = dayHours(d.id);
  return { date: d.date, open: isoFor(d.id, h.start), close: isoFor(d.id, h.end) };
});

/** Alla Villa dei lettori, tra un appuntamento e l'altro */
export const alwaysOn = [
  {
    title: "Mostra «Radici libere»",
    when: `Solo venerdì 16 · ${exhibition.start}–${exhibition.end}`,
    text: "Peppino Impastato, una vita per immagini.",
    href: "/mostra-peppino-impastato",
  },
  {
    title: "L'Albero delle radici",
    when: "Tutti e tre i giorni",
    text: "Appendi il nome di chi ti ha messo in mano il primo libro: sui rami si possono attaccare anche le immagini.",
    href: "/lamiaradice",
  },
  {
    title: "Bookshop",
    when: "Tutti e tre i giorni",
    text: "I libri degli ospiti, con Mondadori Bookstore Vittoria. Le firmacopie, dopo ogni incontro, sotto il Palco del Castello.",
    href: "/info#bookshop",
  },
] as const;
