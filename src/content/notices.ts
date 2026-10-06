/**
 * AVVISI — compaiono in cima a tutte le pagine.
 * Usali per maltempo, spostamenti o cambi di programma. Esempio:
 *
 * {
 *   id: "pioggia-sabato",
 *   tone: "alert",
 *   text: "Sabato 17 per la pioggia gli incontri si spostano al chiuso.",
 *   href: "/programma",
 *   until: "2026-10-17T23:59:00+02:00",
 * }
 *
 * Un avviso scompare da solo dopo `until` (alla prima visita successiva).
 */
export interface Notice {
  id: string;
  tone: "info" | "alert";
  text: string;
  href?: string;
  linkLabel?: string;
  until?: string;
}

export const notices: Notice[] = [];
