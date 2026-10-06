import type { Guest } from "./types";

/**
 * Ospiti della I edizione.
 * Le biografie usano solo dati verificati su fonti pubbliche (vedi docs/fonti.md).
 * Per aggiungere una foto: mettere il file in public/ospiti/<slug>.jpg e aggiungere il campo `photo`.
 */
export const guests: Guest[] = [
  {
    slug: "giovanni-impastato",
    name: "Giovanni Impastato",
    role: "Scrittore e testimone",
    initials: "GI",
    short:
      "Fratello di Peppino Impastato, da quasi cinquant'anni ne custodisce la memoria e ne porta avanti la battaglia per la verità.",
    bio: [
      "Giovanni Impastato è nato a Cinisi nel 1953 ed è il fratello minore di Peppino Impastato, ucciso dalla mafia nel 1978. Ha raccolto l'eredità del fratello e ne porta avanti l'impegno in nome della legalità e della verità.",
      "È tra i fondatori di Casa Memoria Felicia e Peppino Impastato, la casa di famiglia a Cinisi diventata luogo di incontro e di impegno contro la criminalità organizzata. È spesso ospite di scuole, università e festival in tutta Italia.",
      "Ha raccontato la sua storia in diversi libri, tra cui «Oltre i cento passi» (Piemme) e il romanzo autobiografico «Mio fratello. Tutta una vita con Peppino» (Libreria Pienogiorno), che ripercorre la vita della famiglia Impastato e la forza dei due fratelli nella lotta all'illegalità.",
    ],
    books: [
      { title: "Mio fratello. Tutta una vita con Peppino", publisher: "Libreria Pienogiorno" },
      { title: "Oltre i cento passi", publisher: "Piemme", year: 2017 },
      {
        title: "Resistere a Mafiopoli",
        publisher: "Stampa Alternativa",
        year: 2009,
        note: "con Franco Vassia",
      },
    ],
    tone: "coral",
    type: "persona",
  },
  {
    slug: "antonella-desiree-giuffre",
    name: "Antonella Desirée Giuffrè",
    role: "Scrittrice",
    initials: "AG",
    short:
      "Autrice di romanzi e saggi storici, racconta le donne dentro la Storia: il loro coraggio, la loro tenacia.",
    bio: [
      "Antonella Desirée Giuffrè è un'autrice ligure appassionata di storia: scrive romanzi e saggi storici e mette al centro dei suoi libri le donne dentro la Storia, con il loro coraggio, la loro audacia e la loro determinazione.",
      "Con «La seminatrice di coraggio» (Tre60, 2025; in edizione tascabile TEA nel 2026) racconta la Sicilia della Grande Guerra: Maria Roccaforte, giovane maestra di un paese sul mare di Ragusa, si ritrova sola a mandare avanti casa e campi in un borgo dei Monti Iblei e diventa una delle «seminatrici di coraggio», le donne che portavano notizie dal fronte e scrivevano ai soldati.",
    ],
    books: [
      {
        title: "La seminatrice di coraggio",
        publisher: "Tre60",
        year: 2025,
        note: "anche in tascabile TEA",
      },
    ],
    tone: "teal",
    type: "persona",
  },
  {
    slug: "maria-antonietta-ferraloro",
    name: "Maria Antonietta Ferraloro",
    role: "Docente e saggista",
    initials: "MF",
    short:
      "Studiosa di Tomasi di Lampedusa, ha raccontato «Il Gattopardo» ai ragazzi con un libro scritto per sua figlia.",
    bio: [
      "Maria Antonietta Ferraloro è docente e saggista. Laureata in Lettere all'Università di Messina, ha conseguito il dottorato in Storia della cultura all'Università di Catania, dove collabora con il Dipartimento di Scienze Umanistiche, e si occupa di formazione degli insegnanti.",
      "Ai luoghi e alle pagine di Giuseppe Tomasi di Lampedusa ha dedicato «Tomasi di Lampedusa e i luoghi del Gattopardo» (Pacini Editore, 2014), finalista al Premio Brancati, e «L'opera-orologio. Saggi sul Gattopardo» (Pacini Editore).",
      "Con «Il Gattopardo raccontato a mia figlia» (La Nuova Frontiera Junior, 2017, illustrazioni di Giulia Rossi) ha portato il capolavoro di Tomasi di Lampedusa ai più giovani.",
    ],
    books: [
      {
        title: "Il Gattopardo raccontato a mia figlia",
        publisher: "La Nuova Frontiera Junior",
        year: 2017,
        note: "illustrazioni di Giulia Rossi",
      },
      { title: "Tomasi di Lampedusa e i luoghi del Gattopardo", publisher: "Pacini Editore", year: 2014 },
      { title: "L'opera-orologio. Saggi sul Gattopardo", publisher: "Pacini Editore" },
    ],
    tone: "ink",
    type: "persona",
  },
  {
    slug: "santa-briganti",
    name: "Santa Briganti",
    role: "Compagnia teatrale · Vittoria (RG)",
    initials: "SB",
    short:
      "La compagnia di Vittoria che porta letture ad alta voce, laboratori e spettacoli nelle scuole, nelle biblioteche e nelle piazze.",
    bio: [
      "L'Associazione Culturale Santa Briganti è una realtà teatrale di Vittoria, in provincia di Ragusa, che da anni porta letture ad alta voce, laboratori e spettacoli nelle scuole, nelle biblioteche, nelle piazze e nei luoghi di comunità della Sicilia e di altre regioni.",
      "Organizza Scenica Festival, vetrina internazionale di teatro, danza, musica e circo contemporaneo nel centro storico di Vittoria, con la direzione artistica di Andrea Burrafato.",
      "Ad Acate firma le letture musicate «A colpi di mantice», i laboratori per i ragazzi e lo spettacolo che chiude il festival, «Shuma», di e con Peppe Macauda dal testo «Shuma Tragliabissi» di Dario Muratore.",
    ],
    books: [],
    links: [{ label: "Scenica Festival", url: "https://www.scenicafestival.it" }],
    tone: "paper",
    type: "compagnia",
  },
];

export const guestsBySlug = new Map(guests.map((g) => [g.slug, g]));

export function getGuest(slug: string): Guest | undefined {
  return guestsBySlug.get(slug);
}
