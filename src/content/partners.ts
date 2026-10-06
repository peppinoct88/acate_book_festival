import bandaLogo from "@/assets/partner/banda-citta-di-acate.png";
import grifoniLogo from "@/assets/partner/grifoni-di-biscari.png";
import mondadoriLogo from "@/assets/partner/mondadori-bookstore-vittoria.png";
import santaBrigantiLogo from "@/assets/partner/santa-briganti.png";
import type { Partner } from "./types";

/**
 * Chi fa il festival insieme al Comune, nei crediti del footer (components/footer-credits.tsx).
 * Loghi forniti dalle associazioni, nelle versioni per fondo scuro. Gli stemmi di Regione e Comune
 * stanno a parte, con «Finanziato da» e «Promosso da».
 */
export const partners: Partner[] = [
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
