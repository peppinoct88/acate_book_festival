import type { StaticImageData } from "next/image";
import gattopardoMiaFiglia from "@/assets/copertine/il-gattopardo-raccontato-a-mia-figlia.jpg";
import gattopardoRagazzi from "@/assets/copertine/il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi.jpg";
import operaOrologio from "@/assets/copertine/l-opera-orologio.jpg";
import seminatrice from "@/assets/copertine/la-seminatrice-di-coraggio.jpg";
import mioFratello from "@/assets/copertine/mio-fratello-tutta-una-vita-con-peppino.jpg";
import oltreCentoPassi from "@/assets/copertine/oltre-i-cento-passi.jpg";
import tomasiLuoghi from "@/assets/copertine/tomasi-di-lampedusa-e-i-luoghi-del-gattopardo.jpg";

/**
 * Copertine originali dei libri degli ospiti (© gli editori), per titolo come in guests.ts e program.ts.
 * Riprodotte per presentare i libri al festival; ISBN e fonti in docs/fonti.md, crediti in /festival#crediti.
 * Nuove copertine: workflow GitHub «Importa copertine dei libri» (scripts/copertine.json), poi src/assets/copertine/.
 * Un libro senza copertina qui resta disegnato (components/book-cover.tsx).
 */
const covers: Record<string, StaticImageData> = {
  "Mio fratello. Tutta una vita con Peppino": mioFratello,
  "Oltre i cento passi": oltreCentoPassi,
  "La seminatrice di coraggio": seminatrice,
  "Il Gattopardo raccontato alle ragazze e ai ragazzi": gattopardoRagazzi,
  "Il Gattopardo raccontato a mia figlia": gattopardoMiaFiglia,
  "Tomasi di Lampedusa e i luoghi del Gattopardo": tomasiLuoghi,
  "L'opera-orologio. Saggi sul Gattopardo": operaOrologio,
};

export function coverOf(title: string): StaticImageData | undefined {
  return covers[title];
}
