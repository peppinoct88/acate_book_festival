import type { Format } from "./types";

/** I format che riempiono il festival tra un appuntamento e l'altro */
export const formats: Format[] = [
  {
    slug: "banda-e-tamburi",
    name: "Banda e tamburi",
    when: "Venerdì e domenica alle 17",
    description:
      "Il pomeriggio si apre con la musica di Acate: venerdì la Banda Città di Acate e I Grifoni di Biscari sfilano insieme per l'inaugurazione, domenica la banda apre l'ultima giornata.",
    icon: "drum",
    href: "/programma",
  },
  {
    slug: "albero-delle-radici",
    name: "L'Albero delle radici",
    when: "Sempre, alla Villa dei lettori",
    description:
      "Scrivi su un cartellino il nome di chi ti ha messo in mano il primo libro, appendilo, fotografalo e tagga quella persona con #LaMiaRadice: sui rami si possono attaccare anche le immagini. Ricorda l'albero davanti alla casa di Peppino a Cinisi, dove i visitatori lasciano le loro dediche.",
    icon: "tree",
    href: "/lamiaradice",
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
