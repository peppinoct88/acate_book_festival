import data from "./svelati.json";

/**
 * AUTORI SEGRETI — sui social gli autori si svelano uno alla volta. Finché lo slug di un autore non è in
 * svelati.json, sul sito è «l'ospite della giornata»: niente nome, foto, libro né pagina in nessun file
 * pubblicato (pagine, anteprime social, calendari, sitemap, dati per Google). L'appuntamento resta in
 * programma con i testi «teaser» di program.ts e venues.ts.
 * Per svelare: workflow GitHub «Svela un autore» (Vercel pubblica in un paio di minuti),
 * oppure aggiungere lo slug a svelati.json. I test controllano che non trapeli nulla.
 */
export const secretGuests = ["giovanni-impastato", "antonella-desiree-giuffre", "maria-antonietta-ferraloro"];

const revealed = new Set<string>(data.svelati);

export function isHidden(slug: string): boolean {
  return secretGuests.includes(slug) && !revealed.has(slug);
}

/** Almeno un autore è ancora da svelare */
export const anyHidden = secretGuests.some(isHidden);
