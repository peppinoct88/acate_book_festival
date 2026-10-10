import giuffrePhoto from "@/assets/ospiti/antonella-desiree-giuffre.jpg";
import petrilloPhoto from "@/assets/ospiti/elisa-petrillo.jpg";
import impastatoPhoto from "@/assets/ospiti/giovanni-impastato.jpg";
import ferraloroPhoto from "@/assets/ospiti/maria-antonietta-ferraloro.jpg";
import masaracchioPhoto from "@/assets/ospiti/matilde-masaracchio.jpg";
import bandaLogo from "@/assets/partner/banda-citta-di-acate.png";
import grifoniLogo from "@/assets/partner/grifoni-di-biscari.png";
import santaBrigantiLogo from "@/assets/partner/santa-briganti.png";
import type { Guest } from "./types";
import { isHidden } from "./reveal";

/**
 * Ospiti della I edizione: autori, artisti e i gruppi musicali di Acate.
 * Le biografie usano solo dati verificati su fonti pubbliche (vedi docs/fonti.md).
 * Ritratti degli autori forniti dall'organizzazione (6 ottobre; Matilde Masaracchio ed Elisa Petrillo il 10 ottobre):
 * src/assets/ospiti/<slug>.jpg + campo `photo`, ritagliati in 3:4 con la stessa inquadratura
 * (occhi a un terzo dall'alto, volti della stessa grandezza).
 */
const allGuests: Guest[] = [
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
      "Dal maggio 2025 Casa Memoria, insieme al Centro siciliano di documentazione «Giuseppe Impastato» e all'associazione culturale Peppino Impastato, ha in concessione dalla Regione Siciliana il casolare di Cinisi dove Peppino fu ucciso: restaurato, è aperto al pubblico come luogo della memoria.",
      "Ha raccontato la sua storia in diversi libri: «Resistere a Mafiopoli», il libro-intervista con Franco Vassia ripubblicato nel 2023 da Navarra Editore, «Oltre i cento passi» (Piemme), «Il coraggio della memoria» (2021) e «Mio fratello. Tutta una vita con Peppino» (Libreria Pienogiorno, 2021), il «romanzo della vita» di Peppino, che ripercorre la storia della famiglia Impastato.",
      "Nel film «I cento passi» di Marco Tullio Giordana (2000), tornato nelle sale nel dicembre 2025 in versione restaurata, Giovanni è interpretato da Paolo Briguglia.",
    ],
    books: [
      { title: "Mio fratello. Tutta una vita con Peppino", publisher: "Libreria Pienogiorno", year: 2021 },
      { title: "Oltre i cento passi", publisher: "Piemme", year: 2017 },
      {
        title: "Resistere a Mafiopoli",
        publisher: "Navarra Editore",
        year: 2023,
        note: "con Franco Vassia; prima edizione Stampa Alternativa, 2009",
      },
      {
        title: "Il coraggio della memoria",
        publisher: "CMI",
        year: 2021,
        note: "scritti dalla scomparsa di mamma Felicia",
      },
    ],
    tone: "ink",
    photo: impastatoPhoto,
    type: "persona",
  },
  {
    slug: "antonella-desiree-giuffre",
    name: "Antonella Desirée Giuffrè",
    role: "Scrittrice",
    initials: "AG",
    short: "Con il suo primo romanzo racconta le donne dentro la Storia: il loro coraggio, la loro tenacia.",
    bio: [
      "Antonella Desirée Giuffrè è un'autrice ligure appassionata di storia: si dedica alla scrittura a tempo pieno e ha frequentato il Master in Tecniche della Narrazione della Scuola Holden di Torino.",
      "«La seminatrice di coraggio» (Tre60, 2025; in edizione tascabile TEA nel 2026) è il suo romanzo d'esordio e racconta la Sicilia della Grande Guerra: Maria Roccaforte, giovane maestra di un paese sul mare di Ragusa, si ritrova sola a mandare avanti casa e campi in un borgo dei Monti Iblei e diventa una delle «seminatrici di coraggio», le donne che portavano notizie dal fronte e scrivevano ai soldati.",
      "Le seminatrici di coraggio sono esistite davvero: l'associazione era stata fondata durante la Grande Guerra dalla scrittrice e giornalista Sofia Bisi Albini, alla cui storia l'autrice ha dedicato un articolo su ilLibraio.it.",
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
    photo: giuffrePhoto,
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
      "Maria Antonietta Ferraloro è docente e saggista. Laureata in Lettere all'Università di Messina, ha conseguito il dottorato in Storia della cultura all'Università di Catania, dove è tutor coordinatrice dell'Alta scuola di formazione insegnanti. Scrive di didattica della lettura e della letteratura per Focus Scuola.",
      "Ai luoghi e alle pagine di Giuseppe Tomasi di Lampedusa ha dedicato «Tomasi di Lampedusa e i luoghi del Gattopardo» (Pacini Editore, 2014; seconda edizione accresciuta nel 2024), finalista al Premio Brancati e al Premio Città di Castello, e «L'opera-orologio. Saggi sul Gattopardo» (Pacini Editore, 2017).",
      "Con le sue ricerche ha ricostruito un periodo poco noto della vita dello scrittore, i mesi che passò da sfollato a Ficarra, sui Nebrodi, nell'estate del 1943, e ha riportato il borgo sulla mappa dei luoghi del Gattopardo. È stata consulente scientifica del TG2 Dossier «Sulle tracce del Gattopardo».",
      "Con «Il Gattopardo raccontato a mia figlia» (La Nuova Frontiera Junior, 2017, illustrazioni di Giulia Rossi) ha portato il capolavoro di Tomasi di Lampedusa ai più giovani. Nel settembre 2026 è uscito «Il Gattopardo raccontato alle ragazze e ai ragazzi» (Gallucci Bros., dai 14 anni), che presenta all'Acate Book Festival.",
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
      {
        title: "Tomasi di Lampedusa e i luoghi del Gattopardo",
        publisher: "Pacini Editore",
        year: 2014,
        note: "seconda edizione accresciuta, 2024",
      },
      { title: "L'opera-orologio. Saggi sul Gattopardo", publisher: "Pacini Editore", year: 2017 },
    ],
    tone: "teal",
    photo: ferraloroPhoto,
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
      "L'Associazione Culturale Santa Briganti è nata nel 2007 a Vittoria, in provincia di Ragusa, e da allora porta letture ad alta voce, laboratori e spettacoli nelle scuole, nelle biblioteche, nelle piazze e nei luoghi di comunità della Sicilia e di altre regioni. Dal dicembre 2024 ha una sua sala a Vittoria, il Wunder Casa Teatro.",
      "Organizza Scenica Festival, vetrina di teatro, danza, musica e circo contemporaneo nel centro storico di Vittoria, con la direzione artistica di Andrea Burrafato: nato nel 2009 come un piccolo esperimento, dal 2018 è riconosciuto dal Ministero della Cultura e nel 2026 è arrivato alla diciottesima edizione. Dal 2023 la sezione «Raccordi», coordinata da Veronica Caggia, coinvolge le comunità migranti che vivono e lavorano a Vittoria.",
      "Ad Acate porta «A colpi di mantice», lettura musicata dal vivo e laboratorio per bambini e ragazzi, di e con Veronica Caggia e Peppe Macauda, nato come percorso di lettura ad alta voce nelle classi delle scuole di Vittoria; e lo spettacolo che chiude il festival, «Shuma», di e con Peppe Macauda dal testo «Shuma Tragliabissi» di Dario Muratore, primo premio Teatro Ragazzi al Concorso Autori Italiani di Sipario.",
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
    short: "Recita nei teatri del Ragusano: apre la serata del sabato con un monologo sulle donne.",
    bio: [
      "Matilde Masaracchio è un'attrice e recita nei teatri del Ragusano: a inizio 2026 era nel cast della commedia «Il matrimonio perfetto» alla Casamatta di Ragusa, nel 2025 in quello di «Una rosa tra le spine», la rappresentazione su santa Rita da Cascia diretta da Andrea Traina a Vittoria.",
      "All'Acate Book Festival sale sul Palco del Castello sabato 17 ottobre alle 18 con un monologo sulle donne: una decina di minuti che aprono la giornata che il festival dedica al loro coraggio, subito prima dell'incontro con Antonella Desirée Giuffrè.",
    ],
    books: [],
    tone: "coral",
    photo: masaracchioPhoto,
    type: "persona",
  },
  {
    slug: "elisa-petrillo",
    name: "Elisa Petrillo",
    role: "Giornalista",
    initials: "EP",
    short:
      "Conduttrice televisiva e presentatrice di eventi in Sicilia, modera l'incontro con Antonella Desirée Giuffrè.",
    bio: [
      "Elisa Petrillo è giornalista: dal 2000 lavora nella comunicazione, come corrispondente da Catania per i quotidiani La Sicilia e Giornale di Sicilia e come redattrice e conduttrice dei telegiornali di La Sesta, Prima Tv e Zerouno Tv.",
      "Conduce format televisivi, di cui è anche autrice, e presenta eventi culturali in Sicilia: nell'ottobre 2026 ha condotto il Gran Galà del Sikania Film Festival al Teatro Sangiorgi di Catania e moderato l'inaugurazione del Cammino del Verismo, sulle tracce di Verga e Capuana.",
      "Ad Acate modera l'incontro con Antonella Desirée Giuffrè su «La seminatrice di coraggio», sabato 17 ottobre sul Palco del Castello, nella giornata che il festival dedica alle donne.",
    ],
    books: [],
    tone: "coral",
    photo: petrilloPhoto,
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
      "L'ha costituita e formata il maestro Ottavio Baglio, raccogliendo la tradizione di Acate, che fino agli anni Cinquanta aveva una banda comunale apprezzata in tutta la Sicilia. Nel settembre 2024 ha suonato in piazza San Pietro, all'udienza di papa Francesco.",
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
      "Sfilano ogni anno nel Corteo storico della festa di San Vincenzo. Al festival aprono l'inaugurazione di venerdì 16 ottobre, insieme alla Banda Città di Acate.",
    ],
    books: [],
    tone: "ink",
    type: "gruppo",
    logo: grifoniLogo,
  },
];

/** Gli autori dei tre incontri, in ordine di giornata */
/**
 * Gli ospiti pubblicati: gli autori ancora segreti (src/content/reveal.ts) non compaiono da nessuna parte,
 * né nelle liste né con una pagina; al loro posto le schede «l'ospite della giornata».
 */
export const guests: Guest[] = allGuests.filter((g) => !isHidden(g.slug));

/** Un autore per giornata, nell'ordine delle giornate (segreti compresi: per sapere dove va la scheda) */
export const authorSlugs = ["giovanni-impastato", "antonella-desiree-giuffre", "maria-antonietta-ferraloro"];

/** Nome pubblico (la compagnia si presenta con il nome completo dell'associazione) */
export function guestName(guest: Guest): string {
  return guest.type === "compagnia" ? "Associazione Culturale Santa Briganti" : guest.name;
}

export const guestsBySlug = new Map(guests.map((g) => [g.slug, g]));

/** La scheda di chi modera un incontro (il campo `moderator` di program.ts), se c'è */
export function guestByName(name: string): Guest | undefined {
  return guests.find((g) => g.name === name);
}

export function getGuest(slug: string): Guest | undefined {
  return guestsBySlug.get(slug);
}
