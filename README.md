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

## Pubblicazione: Vercel, dominio su Cloudflare

Il dominio definitivo è **www.acatebookfestival.it** (`src/content/site.ts`): canonical, sitemap e anteprime
social puntano lì. `acatebookfestival.it` senza www rimanda allo stesso sito. Oggi il dominio usa i DNS di OVH.

1. **Vercel**: su [vercel.com/new](https://vercel.com/new) importa il repository GitHub. Next.js viene
   riconosciuto da solo. Serve il piano **Pro**: l'Hobby è solo per uso personale non commerciale, e un sito
   realizzato su incarico è uso commerciale.
2. **Domini su Vercel**: in **Settings → Domains** aggiungi `www.acatebookfestival.it` e
   `acatebookfestival.it`, con il secondo che rimanda al primo. Vercel mostra i record DNS da creare.
3. **Cloudflare**: aggiungi il dominio `acatebookfestival.it` col piano Free. Nella lista dei record DNS:
   - elimina i record A di OVH (`213.186.33.5`) su `acatebookfestival.it` e `www`, e il TXT `1|www.acatebookfestival.it`;
   - crea i record indicati da Vercel (A per `acatebookfestival.it`, CNAME per `www`), copiando i valori dalla
     pagina di Vercel, con **Proxy status: DNS only** (nuvola grigia): con il proxy attivo Vercel non riesce a
     verificare il dominio e a emettere il certificato HTTPS;
   - lascia i record MX e il TXT SPF di OVH se usate la posta @acatebookfestival.it.
4. **OVH**: Web Cloud → Nomi di dominio → `acatebookfestival.it` → **Server DNS** → sostituisci
   `ns111.ovh.net` e `dns111.ovh.net` con i due nameserver assegnati da Cloudflare. DNSSEC oggi non è attivo,
   quindi non c'è niente da disattivare prima.
5. Quando Cloudflare segnala il dominio come attivo, Vercel lo verifica ed emette da solo il certificato HTTPS.
6. Nella scheda **Analytics** di Vercel attiva Web Analytics e Speed Insights (senza cookie, nessun banner).
   Con il piano Pro ogni evento personalizzato ha al massimo 2 proprietà: i test lo controllano.
7. In Google Search Console aggiungi `acatebookfestival.it` come proprietà di dominio e invia
   `https://www.acatebookfestival.it/sitemap.xml`.

Ogni push sul branch di produzione pubblica il sito; i branch e le pull request generano anteprime non
indicizzate. Per cambiare dominio senza toccare il codice c'è la variabile `NEXT_PUBLIC_SITE_URL`.

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
- [ ] Dominio collegato su Vercel, DNS su Cloudflare (vedi sopra)
- [ ] Moderatori degli incontri, quando confermati
- [ ] Conferma del titolare del trattamento indicato nella privacy (`site.production`)
- [ ] Se il sito è pubblicato dal Comune: dichiarazione di accessibilità ufficiale tramite form.agid.gov.it

## Crediti

- Illustrazione e grafica: manifesto ufficiale della I edizione.
- Font: [Outfit](https://fonts.google.com/specimen/Outfit) e [Literata](https://fonts.google.com/specimen/Literata),
  SIL Open Font License 1.1 (vedi `src/assets/fonts/OFL.txt`).
- Fonti dei contenuti: `docs/fonti.md`.
