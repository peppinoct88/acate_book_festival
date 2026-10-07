import { site } from "./site";
import { isHidden } from "./reveal";
import { daysById } from "./venues";
import type { Activity, Audience, DayId, Kind, Session } from "./types";

/**
 * PROGRAMMA DEFINITIVO — fonti: «Acate Book Festival 2026 · Radici — Programma definitivo» (4 ottobre),
 * contratto con Santa Briganti (6 ottobre) e indicazioni dell'organizzazione (6 ottobre: temi delle giornate,
 * banda e tamburi, monologo, moderatore, titolo dell'incontro con Maria Antonietta Ferraloro; senza rito della
 * luce, seminatrici di oggi e saluti finali; l'unico laboratorio è dentro «A colpi di mantice»).
 * Per modificare un orario o aggiungere un avviso su un singolo appuntamento
 * basta cambiare la sessione qui: pagine, calendari .ics, dati strutturati e anteprime si aggiornano da soli.
 * Per segnalare uno spostamento: status: "spostato", statusNote: "Si sposta in ...".
 */
export const programUpdatedAt = "2026-10-06";

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
      "Con il festival si inaugura «Radici libere. Peppino Impastato, una vita per immagini», la mostra fotografica alla Villa dei lettori che accompagna tutte e tre le giornate. Alle 17:20 parte la prima visita guidata; alle 17:40 si accende l'Albero delle radici e comincia #LaMiaRadice.",
      "È la giornata che il festival dedica alla mafia e alla memoria: alle 18 «A colpi di mantice» per bambini e ragazzi, alle 19 l'incontro con Giovanni Impastato.",
    ],
    teaser: {
      for: ["giovanni-impastato"],
      body: [
        "La prima edizione dell'Acate Book Festival si apre con la musica della città: la Banda Città di Acate e I Grifoni di Biscari – Tamburi di Acate sfilano e inaugurano il festival.",
        "Con il festival si inaugura «Radici libere. Peppino Impastato, una vita per immagini», la mostra fotografica alla Villa dei lettori che accompagna tutte e tre le giornate. Alle 17:20 parte la prima visita guidata; alle 17:40 si accende l'Albero delle radici e comincia #LaMiaRadice.",
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
      "È di e con Veronica Caggia e Peppe Macauda, dell'Associazione Culturale Santa Briganti di Vittoria, che da anni porta la lettura ad alta voce nelle scuole, nelle biblioteche e nelle piazze. Quest'anno c'è una sola replica: venerdì alle 18, sul Palco del Castello.",
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
      "L'incontro chiude il percorso cominciato alle 17 con l'inaugurazione della mostra «Radici libere». Alle 20, firmacopie al bookshop della Villa dei lettori.",
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
        teaserTitle: "Firmacopie con l'ospite della serata",
        guests: ["giovanni-impastato"],
      },
      {
        day: "sab",
        start: "20:00",
        end: "20:30",
        venue: "villa",
        title: "Firmacopie con Antonella Desirée Giuffrè",
        teaserTitle: "Firmacopie con l'ospite della serata",
        guests: ["antonella-desiree-giuffre"],
      },
      {
        day: "dom",
        start: "18:40",
        end: "19:00",
        venue: "villa",
        title: "Firmacopie con Maria Antonietta Ferraloro",
        teaserTitle: "Firmacopie con l'ospite della serata",
        guests: ["maria-antonietta-ferraloro"],
      },
    ],
  },

  // ───────────────────────── SABATO 17 · Donne · Radici di coraggio
  {
    slug: "i-tamburi-di-biscari",
    title: "I tamburi aprono il pomeriggio",
    kicker: "I Grifoni di Biscari – Tamburi di Acate",
    kind: "musica",
    summary: "I tamburi imperiali dei Grifoni di Biscari aprono la giornata dedicata alle donne.",
    guests: ["grifoni-di-biscari"],
    audience: forAll,
    page: false,
    sessions: [{ day: "sab", start: "17:00", end: "17:30", venue: "palco" }],
  },
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
    teaser: {
      for: ["antonella-desiree-giuffre"],
      body: [
        "C'è qualcuno lontano a cui vorresti scrivere? Alla Villa dei lettori trovi le cartoline del festival e una buca delle lettere: scrivi, imbuchi, e al resto pensiamo noi. Le cartoline partono lunedì 19 ottobre.",
        "L'idea nasce dal libro protagonista della serata, che sveliamo presto insieme al suo ospite. Una lettera, allora come oggi, può essere un gesto di coraggio.",
      ],
    },
    audience: families,
    page: true,
    sessions: [{ day: "sab", start: "17:00", end: "20:00", venue: "villa" }],
  },
  {
    slug: "monologo-sulle-donne",
    title: "Un monologo sulle donne",
    kicker: "Teatro · Matilde Masaracchio",
    seoTitle: "Matilde Masaracchio, un monologo sulle donne · Acate",
    kind: "spettacolo",
    summary:
      "Nella giornata dedicata alle donne, l'attrice Matilde Masaracchio porta sul palco un monologo sul loro coraggio.",
    body: [
      "La giornata che il festival dedica alle donne ha al centro il loro coraggio, quello che la Storia ha spesso lasciato ai margini.",
      "Alle 18 l'attrice Matilde Masaracchio sale sul Palco del Castello con un monologo sulle donne. Alle 19, sullo stesso palco, Antonella Desirée Giuffrè racconta «La seminatrice di coraggio».",
    ],
    teaser: {
      for: ["antonella-desiree-giuffre"],
      body: [
        "La giornata che il festival dedica alle donne ha al centro il loro coraggio, quello che la Storia ha spesso lasciato ai margini.",
        "Alle 18 l'attrice Matilde Masaracchio sale sul Palco del Castello con un monologo sulle donne. Alle 19, sullo stesso palco, l'incontro con l'ospite della giornata.",
      ],
    },
    guests: ["matilde-masaracchio"],
    audience: forAll,
    page: true,
    featured: true,
    sessions: [{ day: "sab", start: "18:00", end: "18:40", venue: "palco" }],
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
      "Antonella Desirée Giuffrè racconta il suo romanzo e le donne che la Storia ha spesso lasciato ai margini, nella giornata che il festival dedica alle donne. Alle 20, firmacopie al bookshop della Villa dei lettori.",
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
    book: { title: "La seminatrice di coraggio", publisher: "Tre60", year: 2025 },
    audience: forAll,
    page: true,
    featured: true,
    sessions: [{ day: "sab", start: "19:00", end: "20:00", venue: "palco" }],
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
      "Alle 18:40, firmacopie al bookshop della Villa dei lettori. Alle 19:30, sullo stesso palco, «Shuma» chiude il festival.",
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
      "È lo spettacolo che chiude la prima edizione, nella giornata dedicata all'immigrazione: comincia alle 19:30, quando è già buio e le illustrazioni proiettate si vedono al meglio.",
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
    sessions: [{ day: "dom", start: "19:30", end: "20:20", venue: "palco" }],
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

export function sessionsForGuest(slug: string): Session[] {
  return sessions.filter((s) => s.guests.includes(slug));
}

/** Gli appuntamenti in evidenza per la home: tre per giorno (id con lo slug vero, vale anche col teaser) */
export const highlightIds: Record<DayId, string[]> = {
  ven: [
    "apertura-del-festival-ven-1700",
    "a-colpi-di-mantice-ven-1800",
    "le-radici-che-si-scelgono-ven-1900",
  ],
  sab: [
    "i-tamburi-di-biscari-sab-1700",
    "monologo-sulle-donne-sab-1800",
    "la-seminatrice-di-coraggio-sab-1900",
  ],
  dom: [
    "la-banda-citta-di-acate-dom-1700",
    "il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi-dom-1800",
    "shuma-dom-1930",
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
    title: "Indovina il classico",
    when: "Sempre",
    text: "Leggi in siciliano l'incipit di un classico: diventa un video del festival.",
    href: "/festival#indovina-il-classico",
  },
  {
    title: "Bookshop",
    when: "Sempre",
    text: "I libri degli ospiti, con le firmacopie dopo ogni incontro. Libreria partner: Mondadori Bookstore Vittoria.",
    href: "/info#bookshop",
  },
] as const;
