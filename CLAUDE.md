@AGENTS.md

# Acate Book Festival — sito ufficiale (I edizione, 16-18 ottobre 2026)

Tre giornate, tre temi: venerdì 16 mafia (blu `ink`), sabato 17 donne (`coral`), domenica 18 immigrazione (`teal-deep`).

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
- `bash scripts/verifica-online.sh` — verifica il sito pubblicato (DNS, HTTPS, redirect, SEO, statistiche);
  su GitHub è il workflow «Verifica sito online»

## Dove stanno le cose

- `src/content/` — **unica fonte dei contenuti**. Programma, ospiti, luoghi, format, FAQ, avvisi, configurazione.
  - `program.ts`: attività e sessioni. Da qui derivano lista, schede, calendari .ics, JSON-LD, anteprime OG, sitemap.
  - `venues.ts`: luoghi e giornate (`topic`, `slug`, `claim`, `body`, `tone`) → pagine `/giornate/[slug]`.
  - `guests.ts`: ospiti (`authorSlugs` = un autore per giornata, `tone` = colore della sua giornata), `photo`/`logo`.
  - `photos.ts`: foto da Wikimedia Commons con autore, licenza, fonte e modifiche (sempre mostrati: `components/photo.tsx`
    e `/festival#crediti`). Nuove foto: workflow GitHub «Importa foto da Wikimedia Commons» (Commons non è
    raggiungibile dalle sessioni cloud); scarica in `src/assets/foto/commons/`, poi si ritaglia e si sposta in `src/assets/foto/`.
  - `partners.ts`: loghi dei partner nei crediti del footer (`components/footer-credits.tsx`, file in
    `src/assets/partner/` preparati per fondo blu); stemmi di Regione e Comune a parte, senza sfondo.
  - `covers.ts`: copertine originali dei libri (© editori) per titolo, in `src/assets/copertine/`; nuove con il
    workflow GitHub «Importa copertine dei libri» (`scripts/copertine.json`). Senza copertina il libro resta disegnato.
  - `reveal.ts` + `svelati.json`: autori segreti, svelati uno alla volta (workflow GitHub «Svela un autore»,
    poi «Verifica sito online», che controlla svelati e segreti sul sito pubblicato).
    Finché sono segreti non compaiono da nessuna parte: valgono i `teaser` di `program.ts` e `venues.ts` e le
    schede «Chi sarà?» (`components/mystery-guest.tsx`). Un test controlla che non trapeli nulla.
  - `notices.ts`: avvisi in cima a tutte le pagine (maltempo, spostamenti) con scadenza automatica.
  - `site.ts`: URL, date, contatti, social, enti. I campi vuoti non vengono mostrati.
- `src/app/` — pagine (server component). Client component solo dove serve interattività.
- `src/components/` — UI. `src/lib/` — calendario .ics, JSON-LD, metadata, anteprime OG, tempo, colori delle giornate (`day-tone.ts`).
- `src/assets/` — illustrazione del manifesto, foto, loghi dei partner, font TTF per le anteprime OG (OFL).
  Ritratti degli ospiti: `src/assets/ospiti/<slug>.jpg` (forniti dall'organizzazione) + campo `photo` in `guests.ts`.
- `scripts/` — screenshot, rendering icone SVG → PNG. `tests/` — suite e2e.

## Regole per i contenuti

- Lingua: italiano. Orari sempre `17:00`, titoli di libri e spettacoli tra «caporali».
- **Non inventare fatti.** Biografie, libri ed editori vengono da fonti verificate (`docs/fonti.md`).
  Se un dato non è confermato (moderatori, profili social, email) il campo resta vuoto.
- Non dedurre il genere dai nomi: formule neutre («l'ospite», «gli appuntamenti»).
- Dai contratti si pubblicano solo titoli, nomi d'arte e orari: mai dati anagrafici, recapiti o compensi.
- Il footer di ogni pagina riporta lo stemma della Regione Siciliana e la dicitura del finanziamento
  (`site.funding`: «Regione Siciliana – Assessorato delle Autonomie Locali e della Funzione Pubblica», D.D.G.):
  è un obbligo dell'avviso, non va tolto né abbreviato (i test lo controllano).
- Foto solo con licenza libera e crediti visibili; niente immagini di persone reali in difficoltà (naufragi, migranti).
- Correzioni dell'organizzazione (6 ottobre, `docs/fonti.md`): il Palco del Castello è all'aperto in via Archimede,
  senza numero di posti; niente piano pioggia; l'unico laboratorio è dentro «A colpi di mantice»; non esistono
  sentiero di luci, «Radici di carta» né braccialetti. Un test blocca queste frasi.
- La pagina della mostra su Peppino Impastato ha tono sobrio: niente giochi di parole.
- Il logo/lettering del manifesto è ricomposto con Outfit (`components/logotype.tsx`): non sostituirlo con immagini.

## Design system (src/app/globals.css)

- Colori dal manifesto definitivo: `cream` #fff9e9 (fondo), `ink` #072a5f, `navy` #093370, `coral` #ff5e3e,
  `teal` #269c9f, `teal-light` #86cfcb, `ochre` #fccb89, `paper`, `teal-soft`; varianti per il testo:
  `ink-muted`, `coral-strong`, `coral-deep`, `teal-deep` #176b6e.
- Contrasti verificati (WCAG 2.2 AA):
  - testo piccolo su cream/paper: `ink`, `ink-muted`, `coral-deep`, `teal-deep` — **mai** `coral` o `teal`
  - testo grande (≥ 24px) corallo su cream: `coral-strong`
  - su `coral` solo `ink` pieno (4.6:1): con l'opacità scende sotto 4.5:1
  - su `teal` niente testo piccolo (ink 4.2:1, cream 3.2:1): per i fondi si usa `teal-light` (ink 7.8:1) o `teal-deep` (cream 5.9:1)
  - bottone primario: fondo `coral` + testo `ink`; su fondo `ink`: testo `cream`, `coral`, `teal-soft`
  - i «soli» decorativi dietro al testo: la coppia sole/testo deve reggere 4.5:1 (vedi `book-cover.tsx`, `day-tone.ts`)
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
- axe ignora il ritaglio `overflow: hidden` dei cerchi decorativi: un cerchio che sborda verso l'header viene
  preso come fondo del bottone «Menu». Per questo l'header ha sempre `bg-cream`, anche in cima alla pagina.
- Ancore (`#venerdi-16`, `/info#domande`…): lo scarto è solo lo `scroll-padding-top` di html (`--header-h`,
  `--sticky-h`, `--anchor-gap` in `globals.css`; su /programma conta anche la barra dei giorni). Le sezioni con
  un id hanno lo spazio sopra come margine, mai padding né `scroll-mt-*`. Se cambia l'altezza dell'header o
  della barra, vanno aggiornate quelle variabili: i test misurano l'allineamento al pixel.
- Le `key` di React finiscono nei dati della pagina (payload RSC): mai usare come key qualcosa che deve restare
  segreto, come lo slug di un autore non ancora svelato.
- Niente `loading.tsx`: in un sito statico mette ogni pagina in un `<div hidden>` sostituito da uno script,
  quindi senza JavaScript si vede solo lo scheletro e i link con #ancora a volte non scorrono.
- Dominio: `https://www.acatebookfestival.it` (`productionUrl` in `src/content/site.ts`), DNS su Cloudflare
  in modalità «DNS only». Vercel Analytics (piano Pro): massimo 2 proprietà `data-track-*` per evento.

## Verifica prima di consegnare

1. `npm run check` e `npm run build` puliti.
2. `npm run test:e2e` tutto verde (aggiungere test per ogni nuova pagina o funzione).
3. Per modifiche visive: `npm run screenshots` e controllo a 390px e 1440px.

Per aggiornare il programma durante il festival: skill di progetto `.claude/skills/aggiorna-programma`.
