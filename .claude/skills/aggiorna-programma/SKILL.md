---
name: aggiorna-programma
description: Aggiorna il programma dell'Acate Book Festival (orari, spostamenti, annullamenti, nuovi appuntamenti, moderatori) o pubblica un avviso di maltempo. Usala quando l'organizzazione chiede di cambiare qualcosa nel programma o di avvisare il pubblico.
---

# Aggiornare il programma

Il programma vive in un solo file: `src/content/program.ts`. Pagine, calendari .ics, dati strutturati,
anteprime social e sitemap si rigenerano da lì.

## Casi tipici

**Cambio di orario** — modifica `start`/`end` della sessione (formato `HH:MM`). Se cambia l'ordine nella
giornata non serve fare altro: la lista si ordina da sola. Gli orari compaiono anche nei testi scritti a mano:
il racconto delle giornate in `src/content/venues.ts` (`intro`, `body`) e alcune pagine (`famiglie`, `lamiaradice`,
home). Cercali con `grep -rn "19:30" src` e aggiornali insieme.

**Spostamento di luogo (es. pioggia)** — sulla sessione:
```ts
status: "spostato",
statusNote: "Per la pioggia si tiene nella sala ...",
```
e, se riguarda tutto il pomeriggio, aggiungi un avviso in `src/content/notices.ts` con `until` a fine giornata
(`"2026-10-17T23:59:00+02:00"`) e `href: "/info#se-piove"`.

**Annullamento** — `status: "annullato"` con `statusNote` (il calendario .ics esporta STATUS:CANCELLED e il JSON-LD
EventCancelled). Non cancellare la sessione: Google chiede di mantenere data e luogo originali.

**Moderatori, titoli di libri confermati** — `moderator` (compare come «Modera …»), `credits`, `book` o il testo
`body` dell'attività. Solo dati confermati dall'organizzazione.

**Ritratto di un ospite** — file in `src/assets/ospiti/<slug>.jpg` (ritaglio 3:4, almeno 900 px di larghezza),
import in `src/content/guests.ts` e campo `photo`: schede, pagine delle giornate e home lo usano al posto della
copertina disegnata.

**Nuovo appuntamento** — aggiungi un oggetto in `activities` (o una sessione a un'attività esistente).
`page: true` crea la scheda `/programma/<slug>`; `featured: true` lo evidenzia. Aggiorna `programUpdatedAt`.

## Dopo ogni modifica

1. `npm run check && npm run build`
2. `npm run test:e2e` (con `PW_CHROMIUM_PATH` se serve)
3. Commit con messaggio in italiano che dica cosa è cambiato per il pubblico.
