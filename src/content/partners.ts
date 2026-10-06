import comuneLogo from "@/assets/partner/comune-di-acate.png";
import bandaLogo from "@/assets/partner/banda-citta-di-acate.png";
import grifoniLogo from "@/assets/partner/grifoni-di-biscari.png";
import mondadoriLogo from "@/assets/partner/mondadori-bookstore-vittoria.png";
import santaBrigantiLogo from "@/assets/partner/santa-briganti.png";
import type { Partner } from "./types";

/**
 * Chi fa il festival insieme al Comune: i loghi sono nelle versioni per fondo scuro (fascia blu nel footer).
 * Lo stemma è ritagliato dal manifesto ufficiale; gli altri loghi li hanno forniti le associazioni.
 */
export const partners: Partner[] = [
  {
    name: "Comune di Acate",
    role: "Promuove il festival",
    logo: comuneLogo,
    url: "https://www.comune.acate.rg.it",
  },
  {
    name: "Associazione Culturale Santa Briganti",
    role: "Teatro e letture",
    logo: santaBrigantiLogo,
    href: "/ospiti/santa-briganti",
  },
  {
    name: "Mondadori Bookstore Vittoria",
    role: "Libreria partner",
    logo: mondadoriLogo,
  },
  {
    name: "Banda Città di Acate",
    role: "Musica",
    logo: bandaLogo,
    href: "/ospiti/banda-citta-di-acate",
  },
  {
    name: "I Grifoni di Biscari – Tamburi di Acate",
    role: "Tamburi",
    logo: grifoniLogo,
    href: "/ospiti/grifoni-di-biscari",
  },
];
