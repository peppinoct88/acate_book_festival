import bandaLogo from "@/assets/partner/banda-citta-di-acate.png";
import grifoniLogo from "@/assets/partner/grifoni-di-biscari.png";
import santaBrigantiLogo from "@/assets/partner/santa-briganti.png";
import type { Guest } from "./types";

/**
 * Ospiti della I edizione: autori, artisti e i gruppi musicali di Acate.
 * Le biografie usano solo dati verificati su fonti pubbliche (vedi docs/fonti.md).
 * Per aggiungere una foto: file in src/assets/ospiti/<slug>.jpg, import qui sopra e campo `photo`.
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
    tone: "ink",
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
    tone: "coral",
    type: "persona",
  },
  {
    slug: "maria-antonietta-ferraloro",
    name: "Maria Antonietta Ferraloro",
    role: "Docente e saggista",
    initials: "MF",
    short:
      "Studiosa di Tomasi di Lampedusa, racconta «Il Gattopardo» alle ragazze e ai ragazzi nel suo nuovo libro.",
    bio: [
      "Maria Antonietta Ferraloro è docente e saggista. Laureata in Lettere all'Università di Messina, ha conseguito il dottorato in Storia della cultura all'Università di Catania, dove collabora con il Dipartimento di Scienze Umanistiche, e si occupa di formazione degli insegnanti.",
      "Ai luoghi e alle pagine di Giuseppe Tomasi di Lampedusa ha dedicato «Tomasi di Lampedusa e i luoghi del Gattopardo» (Pacini Editore, 2014), finalista al Premio Brancati, e «L'opera-orologio. Saggi sul Gattopardo» (Pacini Editore).",
      "Con «Il Gattopardo raccontato a mia figlia» (La Nuova Frontiera Junior, 2017, illustrazioni di Giulia Rossi) ha portato il capolavoro di Tomasi di Lampedusa ai più giovani. Nel 2026 è uscito «Il Gattopardo raccontato alle ragazze e ai ragazzi» (Gallucci Bros.), che presenta all'Acate Book Festival.",
    ],
    books: [
      {
        title: "Il Gattopardo raccontato alle ragazze e ai ragazzi",
        publisher: "Gallucci Bros.",
        year: 2026,
      },
      {
        title: "Il Gattopardo raccontato a mia figlia",
        publisher: "La Nuova Frontiera Junior",
        year: 2017,
        note: "illustrazioni di Giulia Rossi",
      },
      { title: "Tomasi di Lampedusa e i luoghi del Gattopardo", publisher: "Pacini Editore", year: 2014 },
      { title: "L'opera-orologio. Saggi sul Gattopardo", publisher: "Pacini Editore" },
    ],
    tone: "teal",
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
      "Ad Acate porta «A colpi di mantice», lettura musicata dal vivo e laboratorio per bambini e ragazzi, di e con Veronica Caggia e Peppe Macauda, e lo spettacolo che chiude il festival, «Shuma», di e con Peppe Macauda dal testo «Shuma Tragliabissi» di Dario Muratore.",
    ],
    books: [],
    links: [{ label: "Scenica Festival", url: "https://www.scenicafestival.it" }],
    tone: "paper",
    type: "compagnia",
    logo: santaBrigantiLogo,
  },
  {
    slug: "matilde-masaracchio",
    name: "Matilde Masaracchio",
    role: "Attrice",
    initials: "MM",
    short: "Attrice del teatro ragusano, porta sul palco un monologo sulle donne.",
    bio: [
      "Matilde Masaracchio è un'attrice e recita nei teatri del Ragusano.",
      "All'Acate Book Festival sale sul Palco del Castello sabato 17 ottobre alle 18 con un monologo sulle donne: è il cuore della giornata che il festival dedica al loro coraggio.",
    ],
    books: [],
    tone: "coral",
    type: "persona",
  },
  {
    slug: "banda-citta-di-acate",
    name: "Banda Città di Acate",
    role: "Banda musicale",
    initials: "BA",
    short: "La banda della città: accompagna le feste e le processioni di Acate.",
    bio: [
      "La Banda Città di Acate accompagna le feste e le processioni della città, a cominciare dal Corteo storico della festa di San Vincenzo, il patrono.",
      "Al festival suona due volte: venerdì 16 ottobre sfila con I Grifoni di Biscari per l'inaugurazione, domenica 18 apre l'ultima giornata.",
    ],
    books: [],
    tone: "ink",
    type: "gruppo",
    logo: bandaLogo,
  },
  {
    slug: "grifoni-di-biscari",
    name: "I Grifoni di Biscari",
    role: "Tamburi di Acate",
    initials: "GB",
    short: "Tamburi imperiali che accompagnano cortei e rievocazioni storiche.",
    bio: [
      "I Grifoni di Biscari – Tamburi di Acate sono un gruppo di tamburi imperiali che accompagna cortei e rievocazioni storiche. Il nome ricorda Biscari, come si chiamava Acate fino al 1938.",
      "Sfilano ogni anno nel Corteo storico della festa di San Vincenzo. Al festival aprono l'inaugurazione di venerdì 16 ottobre, insieme alla Banda Città di Acate, e il pomeriggio di sabato 17.",
    ],
    books: [],
    tone: "ink",
    type: "gruppo",
    logo: grifoniLogo,
  },
];

/** Gli autori dei tre incontri, in ordine di giornata */
export const authorSlugs = ["giovanni-impastato", "antonella-desiree-giuffre", "maria-antonietta-ferraloro"];

/** Nome pubblico (la compagnia si presenta con il nome completo dell'associazione) */
export function guestName(guest: Guest): string {
  return guest.type === "compagnia" ? "Associazione Culturale Santa Briganti" : guest.name;
}

export const guestsBySlug = new Map(guests.map((g) => [g.slug, g]));

export function getGuest(slug: string): Guest | undefined {
  return guestsBySlug.get(slug);
}
