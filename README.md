# Acate Book Festival 2026 · sito ufficiale

Sito della **I edizione dell'Acate Book Festival** — «Radici» — 16, 17 e 18 ottobre 2026, centro storico di Acate (RG).
Promosso dal Comune di Acate, con il contributo della Regione Siciliana – Assessorato regionale delle Autonomie
Locali e della Funzione Pubblica.

L'identità visiva riprende il manifesto ufficiale: la torre di libri, il sole turchese, il lettering corallo e indaco.

## Cosa c'è

| Pagina | Contenuto |
| --- | --- |
| `/` | Hero dal manifesto, i tre pomeriggi, ospiti, Piccole radici, la mostra, #LaMiaRadice, luoghi |
| `/programma` | Programma completo per giorno, filtro «Bambini e ragazzi», stato «In corso» durante il festival, stampa |
| `/programma/[slug]` | Scheda di ogni appuntamento: date, luogo, «Portami lì», calendario, condivisione, dati strutturati |
| `/ospiti`, `/ospiti/[slug]` | Ospiti con biografie verificate e libri |
| `/famiglie` | Piccole radici: teatro e laboratori per bambini e ragazzi |
| `/mostra-peppino-impastato` | La mostra «Radici libere» |
| `/lamiaradice` | La campagna #LaMiaRadice con il generatore di cartellini da condividere |
| `/festival` | Il tema, gli otto format, chi lo organizza, il manifesto da scaricare |
| `/info` | Luoghi, come arrivare, se piove, accessibilità, domande frequenti |
| `/adesso` | Cosa c'è adesso e tra poco (per i QR code sul posto) |

Indirizzi brevi per i materiali stampati: `/qr` e `/ora` → `/adesso`, `/mostra`, `/bambini`, `/come-arrivare`,
`/la-mia-radice`, `/manifesto`.

## Sviluppo

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + typecheck + formattazione
npm run build        # build di produzione
npm run test:e2e     # test end-to-end + accessibilità (dopo la build)
```

Requisiti: Node.js 20.9 o superiore.

## Pubblicazione su Vercel

1. Su [vercel.com/new](https://vercel.com/new) importa il repository GitHub: Vercel riconosce Next.js da solo.
2. In **Settings → Environment Variables** imposta `NEXT_PUBLIC_SITE_URL` con il dominio definitivo
   (es. `https://www.acatebookfestival.it`). Senza, il sito usa l'indirizzo di produzione di Vercel.
3. In **Settings → Domains** collega il dominio.
4. Nella scheda **Analytics** attiva Web Analytics e Speed Insights (senza cookie, nessun banner necessario).
5. Ogni push sul branch di produzione pubblica il sito; i branch e le pull request generano anteprime non indicizzate.

## Aggiornare i contenuti

Tutti i contenuti sono in `src/content/`:

- `program.ts` — programma (orari, spostamenti con `status: "spostato"`, annullamenti)
- `notices.ts` — avvisi in cima alle pagine (maltempo), con scadenza automatica
- `guests.ts`, `venues.ts`, `formats.ts`, `faq.ts`
- `site.ts` — profili social, email di contatto, dominio

Istruzioni passo passo in `.claude/skills/aggiorna-programma/SKILL.md`.

## Prima del lancio: da completare

- [ ] Profili social ufficiali (`site.social`) e handle da taggare per #LaMiaRadice
- [ ] Email di contatto pubblica (`site.contacts.email`)
- [ ] Dominio definitivo (`NEXT_PUBLIC_SITE_URL`)
- [ ] Moderatori degli incontri, quando confermati
- [ ] Conferma del titolare del trattamento indicato nella privacy (`site.production`)
- [ ] Se il sito è pubblicato dal Comune: dichiarazione di accessibilità ufficiale tramite form.agid.gov.it

## Crediti

- Illustrazione e grafica: manifesto ufficiale della I edizione.
- Font: [Outfit](https://fonts.google.com/specimen/Outfit) e [Literata](https://fonts.google.com/specimen/Literata),
  SIL Open Font License 1.1 (vedi `src/assets/fonts/OFL.txt`).
- Fonti dei contenuti: `docs/fonti.md`.
