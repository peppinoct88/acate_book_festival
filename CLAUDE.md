@AGENTS.md

# Acate Book Festival — sito ufficiale (I edizione, 16-18 ottobre 2026)

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript · deploy su Vercel.
Tutto il sito è statico (prerender in build): nessun database, nessun form, nessun cookie.

## Comandi

- `npm run dev` — sviluppo su http://localhost:3000
- `npm run check` — lint + typecheck + prettier (da eseguire prima di ogni commit)
- `npm run build` — build di produzione (deve chiudere con 0 errori)
- `npm run test:e2e` — Playwright + axe-core su tutte le pagine, desktop e mobile (richiede `npm run build`)
  - nelle sessioni cloud con Chromium preinstallato: `PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:e2e`
- `npm run screenshots` — screenshot mobile/desktop di tutte le pagine (`BASE_URL`, cartella di output come argomento)
- Simulare il festival «live»: aggiungere `?ora=2026-10-16T19:10` a /programma o /adesso

## Dove stanno le cose

- `src/content/` — **unica fonte dei contenuti**. Programma, ospiti, luoghi, format, FAQ, avvisi, configurazione.
  - `program.ts`: attività e sessioni. Da qui derivano lista, schede, calendari .ics, JSON-LD, anteprime OG, sitemap.
  - `notices.ts`: avvisi in cima a tutte le pagine (maltempo, spostamenti) con scadenza automatica.
  - `site.ts`: URL, date, contatti, social, enti. I campi vuoti non vengono mostrati.
- `src/app/` — pagine (server component). Client component solo dove serve interattività.
- `src/components/` — UI. `src/lib/` — calendario .ics, JSON-LD, metadata, anteprime OG, tempo.
- `src/assets/` — illustrazioni ricavate dal manifesto, font TTF per le anteprime OG (OFL).
- `scripts/` — screenshot, rendering icone SVG → PNG. `tests/` — suite e2e.

## Regole per i contenuti

- Lingua: italiano. Orari sempre `17:00`, titoli di libri e spettacoli tra «caporali».
- **Non inventare fatti.** Biografie, libri ed editori vengono da fonti verificate (`docs/fonti.md`).
  Se un dato non è confermato (moderatori, profili social, email) il campo resta vuoto.
- Non dedurre il genere dai nomi: formule neutre («l'ospite», «gli appuntamenti»).
- La pagina della mostra su Peppino Impastato ha tono sobrio: niente giochi di parole.
- Il logo/lettering del manifesto è ricomposto con Outfit (`components/logotype.tsx`): non sostituirlo con immagini.

## Design system (src/app/globals.css)

- Colori dal manifesto: `cream` #fefaef (fondo), `ink` #1e154a, `coral` #fd644f, `teal` #68cbc8, `paper`, `teal-soft`.
- Contrasti verificati (WCAG 2.2 AA):
  - testo piccolo su cream/paper: `ink`, `ink-muted`, `coral-deep`, `teal-deep` — **mai** `coral` o `teal`
  - testo grande (≥ 24px) corallo su cream: `coral-strong`
  - bottone primario: fondo `coral` + testo `ink` (5.6:1); su fondo `ink`: testo `cream`, `coral`, `teal-soft`
  - il lettering «ACATE» in `coral` è un logotipo (esente, WCAG 1.4.3): i test axe lo escludono con `[data-logotype]`
- Font: Outfit (titoli/UI, precaricato) + Literata (testi lunghi, `display: optional`).
- Titoli nello stile del poster: parola piena `font-black` + parola leggera `font-light` (`SectionHeading`, `PageHero`).
- Animazioni sopra la piega solo di movimento (`animate-rise`, `animate-settle`), mai da opacità 0: rovinano l'LCP.
  Sotto la piega `data-reveal`. Tutto si disattiva con `prefers-reduced-motion`.

## Gotcha

- Next 16: `params` è una Promise (`const { slug } = await params`); `next/image` usa `preload`/`fetchPriority`, non `priority`.
- Le pagine che impostano `openGraph` perdono l'immagine del layout: `pageMetadata()` mette il manifesto come default.
  Le route con un proprio `opengraph-image.tsx` passano `ownImage: true`, altrimenti il default copre il file.
- Le anteprime OG (`src/lib/og.tsx`) usano solo flexbox e i TTF in `src/assets/fonts`.
- `/_vercel/insights` e `/_vercel/speed-insights` danno 404 in locale: esistono solo su Vercel.
- Per fermare il server locale usa il PID (`kill <pid>`): `pkill -f "next start"` uccide anche la shell corrente.
- I deploy di anteprima Vercel sono `noindex` (vedi `isProductionDeployment` in `src/lib/seo.ts`).
- Dominio: `https://www.acatebookfestival.it` (`productionUrl` in `src/content/site.ts`), DNS su Cloudflare
  in modalità «DNS only». Vercel Analytics (piano Pro): massimo 2 proprietà `data-track-*` per evento.

## Verifica prima di consegnare

1. `npm run check` e `npm run build` puliti.
2. `npm run test:e2e` tutto verde (aggiungere test per ogni nuova pagina o funzione).
3. Per modifiche visive: `npm run screenshots` e controllo a 390px e 1440px.

Per aggiornare il programma durante il festival: skill di progetto `.claude/skills/aggiorna-programma`.
