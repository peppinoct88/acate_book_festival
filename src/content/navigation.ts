export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

/** Voci principali (desktop e menu mobile). «Programma» è la call to action sempre visibile. */
export const mainNav: NavItem[] = [
  { href: "/festival", label: "Il festival", description: "Il tema Radici, i format, chi lo fa" },
  { href: "/ospiti", label: "Ospiti", description: "Autori e compagnie della I edizione" },
  { href: "/famiglie", label: "Famiglie", description: "Piccole radici: teatro e letture" },
  {
    href: "/mostra-peppino-impastato",
    label: "La mostra",
    description: "«Radici libere», Peppino Impastato",
  },
  { href: "/lamiaradice", label: "#LaMiaRadice", description: "Chi ti ha messo in mano il primo libro?" },
  { href: "/info", label: "Info", description: "Come arrivare, accessibilità, domande frequenti" },
];

export const programNav: NavItem = {
  href: "/programma",
  label: "Programma",
  description: "Tre pomeriggi, due luoghi, ingresso libero",
};

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Il festival",
    items: [
      { href: "/programma", label: "Programma" },
      { href: "/ospiti", label: "Ospiti" },
      { href: "/famiglie", label: "Piccole radici" },
      { href: "/mostra-peppino-impastato", label: "La mostra «Radici libere»" },
      { href: "/lamiaradice", label: "#LaMiaRadice" },
      { href: "/festival", label: "Il tema e i format" },
    ],
  },
  {
    title: "Visita",
    items: [
      { href: "/adesso", label: "Adesso al festival" },
      { href: "/info#come-arrivare", label: "Come arrivare" },
      { href: "/info#luoghi", label: "I luoghi" },
      { href: "/info#domande", label: "Domande frequenti" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { href: "/privacy", label: "Privacy e cookie" },
  { href: "/accessibilita", label: "Accessibilità" },
];
