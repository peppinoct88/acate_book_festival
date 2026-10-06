import type { FestivalDay, Venue, VenueId } from "./types";

export const venues: Record<VenueId, Venue> = {
  palco: {
    id: "palco",
    name: "Palco del Castello",
    short: "Palco",
    where: "Piazza Libertà, davanti al Castello dei Principi di Biscari",
    description:
      "Il palco per ascoltare: incontri con gli autori e spettacoli in piazza Libertà, davanti al Castello dei Principi di Biscari.",
    features: [
      "Palco coperto",
      "Platea da 200 posti, prime file con cuscini per i bambini",
      "Ledwall con le foto #LaMiaRadice tra un evento e l'altro",
    ],
    mapQuery: "Piazza Libertà, 97011 Acate RG",
  },
  villa: {
    id: "villa",
    name: "Villa dei lettori",
    short: "Villa",
    where: "Nella villa comunale, a circa 50 metri dal palco",
    description:
      "Il luogo per fare: mostra, bookshop, laboratori e l'Albero delle radici, nella villa comunale lungo il sentiero di luci.",
    features: [
      "Accoglienza e punto informazioni",
      "Mostra «Radici libere», aperta fino alle 22",
      "Bookshop con i libri degli ospiti e firmacopie",
      "Laboratori per bambini e ragazzi",
      "Albero delle radici e scambio libri",
    ],
    mapQuery: "Villa comunale, Acate RG",
  },
};

export const venueList: Venue[] = [venues.palco, venues.villa];

/**
 * Le tre giornate e i loro macro temi: mafia, donne, immigrazione.
 * Il colore (tone) viene dal manifesto e segue la giornata in home, nel programma e nella sua pagina.
 */
export const days: FestivalDay[] = [
  {
    id: "ven",
    date: "2026-10-16",
    weekday: "Venerdì",
    label: "Venerdì 16 ottobre",
    short: "Ven 16",
    anchor: "venerdi-16",
    topic: "Mafia",
    slug: "mafia",
    theme: "Radici della memoria",
    claim: "La memoria di Peppino Impastato e la scelta di stare dalla parte giusta.",
    intro:
      "Si apre con la Banda e i Tamburi di Acate e con la mostra su Peppino Impastato, si chiude con suo fratello Giovanni: la memoria come radice che si sceglie.",
    body: [
      "La prima giornata è dedicata alla mafia e a chi ha scelto di opporsi. Peppino Impastato era nato in una famiglia mafiosa di Cinisi: da ragazzo ruppe con il padre e dai microfoni di Radio Aut denunciò gli affari dei boss, fino all'assassinio, nella notte tra l'8 e il 9 maggio 1978.",
      "Alle 17 la Banda Città di Acate e I Grifoni di Biscari – Tamburi di Acate sfilano e aprono il festival, che si inaugura insieme a «Radici libere», la mostra sulla vita di Peppino. Alle 18 Santa Briganti porta in scena «A colpi di mantice» per bambini e ragazzi. Alle 19 Giovanni Impastato sale sul Palco del Castello, con Giorgio Straquadanio.",
    ],
    tone: "ink",
  },
  {
    id: "sab",
    date: "2026-10-17",
    weekday: "Sabato",
    label: "Sabato 17 ottobre",
    short: "Sab 17",
    anchor: "sabato-17",
    topic: "Donne",
    slug: "donne",
    theme: "Radici di coraggio",
    claim: "Il coraggio delle donne, ieri e oggi.",
    intro:
      "I tamburi aprono il pomeriggio, poi un monologo sulle donne e il romanzo delle seminatrici di coraggio della Grande Guerra.",
    body: [
      "La seconda giornata è dedicata alle donne e al loro coraggio, che la Storia ha spesso lasciato ai margini.",
      "Alle 17 I Grifoni di Biscari – Tamburi di Acate aprono il pomeriggio. Alle 18 Matilde Masaracchio porta sul palco un monologo sulle donne. Alle 19 Antonella Desirée Giuffrè racconta «La seminatrice di coraggio», il romanzo delle donne che durante la Grande Guerra portavano notizie dal fronte alle famiglie. Alla Villa dei lettori, per tutto il pomeriggio, la buca delle lettere di coraggio e un laboratorio per i ragazzi.",
    ],
    tone: "coral",
  },
  {
    id: "dom",
    date: "2026-10-18",
    weekday: "Domenica",
    label: "Domenica 18 ottobre",
    short: "Dom 18",
    anchor: "domenica-18",
    topic: "Immigrazione",
    slug: "immigrazione",
    theme: "Radici in viaggio",
    claim: "Chi parte, chi arriva, chi resta: le radici che attraversano il mare.",
    intro:
      "La banda apre l'ultima giornata, poi la Sicilia del Gattopardo, che comincia con uno sbarco, e il mare di «Shuma», lo spettacolo che chiude il festival.",
    body: [
      "L'ultima giornata è dedicata all'immigrazione e ai viaggi: le radici che partono, attraversano il mare e arrivano. La Sicilia lo sa da sempre, terra di approdi e di partenze.",
      "Lo sa anche «Il Gattopardo», che comincia con uno sbarco: è il maggio del 1860 e Garibaldi è appena arrivato a Marsala. Il suo autore porta nel nome Lampedusa, l'isola che oggi è il primo approdo in Europa per tante persone che attraversano il Mediterraneo, e il principe di Salina descrive la Sicilia come una terra di «magnifiche civiltà eterogenee, tutte venute da fuori». Alle 18 Maria Antonietta Ferraloro lo racconta alle ragazze e ai ragazzi.",
      "Alle 17 la Banda Città di Acate apre il pomeriggio, e alla Villa dei lettori i bambini scrivono la loro «pagella dei sogni». Alle 19:30, quando è già buio, Peppe Macauda porta in scena «Shuma», ispirato alla storia vera di un ragazzo del Mali che nel naufragio del 18 aprile 2015 portava la pagella cucita nella giacca. È lo spettacolo che chiude la prima edizione.",
    ],
    tone: "teal",
  },
];

export const daysBySlug = new Map(days.map((d) => [d.slug, d]));
export const daysById = new Map(days.map((d) => [d.id, d]));
