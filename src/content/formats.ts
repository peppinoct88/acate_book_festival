import type { Format } from "./types";

/** I format che riempiono il festival tra un appuntamento e l'altro */
export const formats: Format[] = [
  {
    slug: "banda-e-tamburi",
    name: "Banda e tamburi",
    when: "Ogni pomeriggio alle 17",
    description:
      "Il pomeriggio si apre con la musica di Acate: venerdì la Banda Città di Acate e I Grifoni di Biscari sfilano insieme per l'inaugurazione, sabato suonano i tamburi, domenica la banda.",
    icon: "drum",
    href: "/programma",
  },
  {
    slug: "albero-delle-radici",
    name: "L'Albero delle radici",
    when: "Sempre, alla Villa dei lettori",
    description:
      "Scrivi su un cartellino il nome di chi ti ha messo in mano il primo libro, appendilo, fotografalo e tagga quella persona con #LaMiaRadice. Ricorda l'albero davanti alla casa di Peppino a Cinisi, dove i visitatori lasciano le loro dediche.",
    icon: "tree",
    href: "/lamiaradice",
  },
  {
    slug: "radici-di-carta",
    name: "Radici di carta",
    when: "Sempre, lungo il sentiero di luci",
    description:
      "Scambio libri in cassette da frutta: prendi un libro, lasciane un altro. Dopo il festival le cassette restano alla villa come piccola biblioteca libera.",
    icon: "books",
  },
  {
    slug: "laboratori-in-parallelo",
    name: "Laboratori in parallelo",
    when: "Sabato e domenica",
    description:
      "Mentre sul palco c'è l'incontro, i bambini sono al laboratorio alla Villa dei lettori, con consegna e ritiro tramite braccialetto numerato. Così i genitori restano all'incontro.",
    icon: "kids",
    href: "/famiglie",
  },
  {
    slug: "buca-delle-lettere",
    name: "La buca delle lettere di coraggio",
    when: "Sabato dalle 17 alle 20",
    description:
      "Cartoline del festival da scrivere a chi è lontano: le imbuchi alla villa e il festival le spedisce lunedì 19 ottobre.",
    icon: "letter",
    href: "/programma/la-buca-delle-lettere-di-coraggio",
  },
  {
    slug: "indovina-il-classico",
    name: "Indovina il classico, dal vivo",
    when: "Sempre, alla Villa dei lettori",
    description:
      "Un angolo con una luce e un telefono sul cavalletto: chi vuole legge in siciliano l'incipit di un classico, senza dire il titolo, e diventa un video del festival.",
    icon: "phone",
  },
  {
    slug: "ledwall-dei-lettori",
    name: "Il ledwall dei lettori",
    when: "Tra un evento e l'altro",
    description:
      "Lo schermo del palco mostra le foto #LaMiaRadice pubblicate dal pubblico. Si spegne solo durante «Shuma».",
    icon: "screen",
    href: "/lamiaradice",
  },
];
