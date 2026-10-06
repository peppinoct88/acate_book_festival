import type { FestivalDay, Venue, VenueId } from "./types";

export const venues: Record<VenueId, Venue> = {
  palco: {
    id: "palco",
    name: "Palco del Castello",
    short: "Palco",
    where: "Davanti al Castello dei Principi di Biscari",
    description:
      "Il palco per ascoltare: incontri con gli autori e spettacoli, nell'area davanti al Castello dei Principi di Biscari.",
    features: [
      "Palco coperto",
      "Platea da 200 posti, prime file con cuscini per i bambini",
      "Ledwall con le foto #LaMiaRadice tra un evento e l'altro",
    ],
    mapQuery: "Castello dei Principi di Biscari, Acate RG",
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

export const days: FestivalDay[] = [
  {
    id: "ven",
    date: "2026-10-16",
    weekday: "Venerdì",
    label: "Venerdì 16 ottobre",
    short: "Ven 16",
    anchor: "venerdi-16",
    theme: "Radici della memoria",
    intro:
      "Si apre con la mostra su Peppino Impastato e si chiude con suo fratello Giovanni: la memoria come radice che si sceglie.",
  },
  {
    id: "sab",
    date: "2026-10-17",
    weekday: "Sabato",
    label: "Sabato 17 ottobre",
    short: "Sab 17",
    anchor: "sabato-17",
    theme: "Radici di coraggio",
    intro:
      "Il coraggio delle donne, ieri e oggi: dalle seminatrici della Grande Guerra alle donne di Acate che salgono sul palco.",
  },
  {
    id: "dom",
    date: "2026-10-18",
    weekday: "Domenica",
    label: "Domenica 18 ottobre",
    short: "Dom 18",
    anchor: "domenica-18",
    theme: "Radici in viaggio",
    intro:
      "Dal Gattopardo raccontato ai ragazzi al mare di «Shuma»: le radici che partono, attraversano e arrivano.",
  },
];

export const daysById = new Map(days.map((d) => [d.id, d]));
