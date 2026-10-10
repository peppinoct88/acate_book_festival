import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Autori segreti (src/content/reveal.ts): i test seguono lo stato di src/content/svelati.json */
const authors = [
  { slug: "giovanni-impastato", name: "Giovanni Impastato", day: "mafia", talk: "le-radici-che-si-scelgono" },
  {
    slug: "antonella-desiree-giuffre",
    name: "Antonella Desirée Giuffrè",
    day: "donne",
    talk: "la-seminatrice-di-coraggio",
  },
  {
    slug: "maria-antonietta-ferraloro",
    name: "Maria Antonietta Ferraloro",
    day: "immigrazione",
    talk: "il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi",
  },
];
const revealed: string[] = JSON.parse(readFileSync("src/content/svelati.json", "utf8")).svelati;
const isSecret = (slug: string) => !revealed.includes(slug);
const visibleAuthors = authors.filter((a) => !isSecret(a.slug));

const pages = [
  "/",
  "/programma",
  "/programma/a-colpi-di-mantice",
  "/programma/shuma",
  "/programma/monologo-sulle-donne",
  ...visibleAuthors.flatMap((a) => [`/programma/${a.talk}`, `/ospiti/${a.slug}`]),
  "/giornate/mafia",
  "/giornate/donne",
  "/giornate/immigrazione",
  "/ospiti",
  "/ospiti/banda-citta-di-acate",
  "/ospiti/matilde-masaracchio",
  "/ospiti/elisa-petrillo",
  "/famiglie",
  "/mostra-peppino-impastato",
  "/lamiaradice",
  "/festival",
  "/info",
  "/adesso",
  "/privacy",
  "/accessibilita",
];

test.describe("ogni pagina", () => {
  for (const path of pages) {
    test(`${path}: SEO di base, un solo H1, nessun errore`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      // titoli brevi (≤ 60 caratteri) che nominano sempre Acate
      await expect(page).toHaveTitle(/Acate/);
      expect((await page.title()).length).toBeLessThanOrEqual(60);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{60,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(path === "/" ? "^https?://[^/]+/?$" : `${path}$`),
      );
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
        "content",
        /^https?:\/\//,
      );
      await expect(page.locator("html")).toHaveAttribute("lang", "it");
      // finanziamento regionale: stemma e dicitura esatta in ogni pagina (obbligo di evidenza del contributo)
      const funding = page.locator("[data-funding]");
      await expect(funding).toContainText("Regione Siciliana");
      await expect(funding).toContainText("Assessorato delle Autonomie Locali e della Funzione Pubblica");
      await expect(funding.getByRole("img", { name: "Stemma della Regione Siciliana" })).toBeVisible();
      // Vercel Analytics, piano Pro: al massimo 2 proprietà per evento (attributi data-track-*)
      const overLimit = await page
        .locator("[data-track]")
        .evaluateAll((els) =>
          els
            .filter(
              (el) => Object.keys((el as HTMLElement).dataset).filter((k) => /^track./.test(k)).length > 2,
            )
            .map((el) => el.outerHTML.slice(0, 120)),
        );
      expect(overLimit).toEqual([]);
      expect(errors).toEqual([]);
    });

    test(`${path}: accessibilità WCAG 2.2 AA (axe)`, async ({ page }) => {
      // movimento ridotto: si misura lo stato finale, non le animazioni di comparsa
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.evaluate(() =>
        document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-revealed", "")),
      );
      await page.waitForTimeout(100);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        // WCAG 1.4.3: il testo che fa parte di un logotipo non ha requisiti di contrasto
        .exclude("[data-logotype]")
        .analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual(
        [],
      );
    });
  }
});

test("reflow a 320px senza scroll orizzontale", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const path of ["/", "/programma", "/programma/shuma", "/info", "/lamiaradice"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(1);
  }
});

test("programma: il filtro «Bambini e ragazzi» mostra solo gli appuntamenti per loro", async ({ page }) => {
  await page.goto("/programma");
  const rows = page.locator("#programma-lista li:has(> [data-session])");
  const total = await rows.count();
  expect(total).toBeGreaterThanOrEqual(12);
  await page.getByRole("button", { name: /Bambini e ragazzi/ }).click();
  await expect(page.getByRole("button", { name: /Bambini e ragazzi/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const visible = await rows.evaluateAll(
    (els) => els.filter((e) => getComputedStyle(e).display !== "none").length,
  );
  expect(visible).toBeLessThan(total);
  expect(visible).toBeGreaterThanOrEqual(4);
});

test("programma: la barra dei giorni segue lo scroll e in cima torna al venerdì", async ({ page }) => {
  await page.goto("/programma");
  const days = page.getByRole("navigation", { name: "Giorni del festival" });
  await page.evaluate(() => document.getElementById("domenica-18")?.scrollIntoView());
  await expect(days.getByRole("link", { name: /Dom 18/ })).toHaveAttribute("aria-current", "true");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(days.getByRole("link", { name: /Ven 16/ })).toHaveAttribute("aria-current", "true");
});

// Dopo il salto il banner della giornata sta subito sotto la barra: 24px su desktop, 16px su telefono
const anchorGap = (isMobile: boolean) => (isMobile ? 16 : 24);

/** Aspetta che lo scorrimento (anche smooth) sia finito */
async function scrollSettled(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let last = -1;
        let still = 0;
        const tick = () => {
          if (window.scrollY === last) still++;
          else {
            still = 0;
            last = window.scrollY;
          }
          if (still > 15) resolve();
          else requestAnimationFrame(tick);
        };
        tick();
      }),
  );
}

test("programma: i giorni si allineano sotto la barra, partendo dall'alto o già in fondo", async ({
  page,
  isMobile,
}) => {
  await page.goto("/programma");
  const bar = page.locator("[data-program-bar]");
  for (const [anchor, label] of [
    ["domenica-18", /Dom 18/],
    ["venerdi-16", /Ven 16/],
    ["sabato-17", /Sab 17/],
  ] as const) {
    await bar.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
    await scrollSettled(page);
    // poll: l'header può essere ancora nella transizione da 5 a 4rem
    await expect
      .poll(async () => {
        const barBox = (await bar.boundingBox())!;
        const banner = (await page.locator(`#${anchor} > header`).boundingBox())!;
        return Math.round(banner.y - (barBox.y + barBox.height));
      })
      .toBe(anchorGap(isMobile));
    await expect(bar.getByRole("link", { name: label })).toHaveAttribute("aria-current", "true");
  }
});

/** Distanza tra il bordo dell'header e l'elemento con quell'id */
const gapUnderHeader = (page: Page, id: string) =>
  page.evaluate((id) => {
    const header = document.querySelector("[data-site-header]")!.getBoundingClientRect();
    return Math.round(document.getElementById(id)!.getBoundingClientRect().top - header.bottom);
  }, id);

test("ancore delle altre pagine: il titolo si ferma subito sotto l'header", async ({ context, isMobile }) => {
  // link aperti da fuori: ogni volta una scheda nuova
  for (const path of ["/info#come-arrivare", "/info#domande", "/festival#crediti"]) {
    const tab = await context.newPage();
    await tab.goto(path);
    await expect
      .poll(() => gapUnderHeader(tab, path.split("#")[1]), { message: path })
      .toBe(anchorGap(isMobile));
    await tab.close();
  }
  // link interno da un'altra pagina, partendo dal fondo
  const page = await context.newPage();
  await page.goto("/");
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await page.locator('footer a[href="/info#come-arrivare"]').first().click();
  await expect(page).toHaveURL(/\/info#come-arrivare$/);
  await expect.poll(() => gapUnderHeader(page, "come-arrivare")).toBe(anchorGap(isMobile));
});

test.describe("senza JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("le pagine si leggono e le ancore si fermano sotto l'header", async ({ page, isMobile }) => {
    await page.goto("/info#domande");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Chiedi pure" })).toBeVisible();
    await expect.poll(() => gapUnderHeader(page, "domande")).toBe(anchorGap(isMobile));
  });
});

test("schede del programma: la freccia apre l'appuntamento, «Calendario» offre Google e iPhone", async ({
  page,
  isMobile,
}) => {
  await page.goto("/programma");
  const card = page.locator("[data-session='shuma-dom-1915']");
  await card.locator("summary").click();
  const google = card.getByRole("link", { name: /Google Calendar/ });
  await expect(google).toBeVisible();
  await expect(google).toHaveAttribute(
    "href",
    /^https:\/\/calendar\.google\.com\/calendar\/render\?action=TEMPLATE/,
  );
  await expect(card.getByRole("link", { name: /iPhone, Mac, Outlook/ })).toHaveAttribute(
    "href",
    "/calendario/shuma-dom-1915.ics",
  );
  await page.keyboard.press("Escape");
  await expect(google).toBeHidden();
  if (!isMobile) {
    const box = await card.locator("[data-card-arrow]").boundingBox();
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await expect(page).toHaveURL(/\/programma\/shuma$/);
  }
});

test("«Aggiungi al calendario»: le tre date in Google Calendar e il file per iPhone", async ({ page }) => {
  await page.goto("/");
  const menu = page.locator("main [data-calendar-menu]").first();
  await menu.locator("summary").click();
  await expect(menu.getByRole("link", { name: /Google Calendar/ })).toHaveCount(3);
  await expect(menu.getByRole("link", { name: /iPhone, Mac, Outlook/ })).toHaveAttribute(
    "href",
    "/calendario/acate-book-festival-2026.ics",
  );
});

test("programma: con ?ora= durante il festival segna gli appuntamenti in corso", async ({ page }) => {
  // sabato 18:30: dopo i dieci minuti del monologo, è in corso l'incontro con l'autrice
  await page.goto("/programma?ora=2026-10-17T18:30");
  const live = page.locator("[data-live='now']");
  await expect(live).toHaveCount(1);
  await expect(live).toHaveAttribute("data-session", "la-seminatrice-di-coraggio-sab-1810");
});

test("scheda evento: dati strutturati Event validi", async ({ page }) => {
  await page.goto("/programma/monologo-sulle-donne");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const data = blocks.map((b) => JSON.parse(b));
  const event = data.find((d) => d["@type"] === "TheaterEvent");
  expect(event).toBeTruthy();
  expect(event.startDate).toBe("2026-10-17T18:00:00+02:00");
  expect(event.location.address.addressLocality).toBe("Acate");
  expect(event.offers.price).toBe(0);
  expect(event.isAccessibleForFree).toBe(true);
  expect(data.some((d) => d["@type"] === "BreadcrumbList")).toBe(true);
});

test("home: dati strutturati Festival", async ({ page }) => {
  await page.goto("/");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const festival = blocks.map((b) => JSON.parse(b)).find((d) => d["@type"] === "Festival");
  expect(festival.startDate).toBe("2026-10-16T17:00:00+02:00");
  // domenica si chiude con «Shuma», 19:15–20:05
  expect(festival.endDate).toBe("2026-10-18T20:05:00+02:00");
  // gli incontri degli autori segreti non hanno pagina: arrivano quando sono svelati
  expect(festival.subEvent.length).toBeGreaterThanOrEqual(4 + visibleAuthors.length);
});

test("calendari .ics", async ({ request }) => {
  const all = await request.get("/calendario/acate-book-festival-2026.ics");
  expect(all.status()).toBe(200);
  expect(all.headers()["content-type"]).toContain("text/calendar");
  const body = await all.text();
  expect(body.startsWith("BEGIN:VCALENDAR")).toBe(true);
  expect(body.match(/BEGIN:VEVENT/g)).toHaveLength(3);

  const one = await (await request.get("/calendario/shuma-dom-1915.ics")).text();
  expect(one).toContain("DTSTART:20261018T171500Z");
  // i vecchi file degli orari cambiati il 10 ottobre portano ai nuovi
  const moved = await request.get("/calendario/shuma-dom-1930.ics", { maxRedirects: 0 });
  expect(moved.headers()["location"]).toBe("/calendario/shuma-dom-1915.ics");
  expect(one).toContain("SUMMARY:Shuma");

  const missing = await request.get("/calendario/inesistente.ics");
  expect(missing.status()).toBe(404);
});

test("pagina inesistente: 404 con link al programma", async ({ page }) => {
  const response = await page.goto("/pagina-che-non-esiste");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: /Vai al programma/ })).toBeVisible();
});

test("anteprime social: le pagine con un'immagine propria la usano", async ({ page, request }) => {
  for (const path of ["/programma", "/programma/shuma", "/ospiti/banda-citta-di-acate", "/famiglie"]) {
    await page.goto(path);
    const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(og).toContain(`${path}/opengraph-image`);
    const { pathname, search } = new URL(og!);
    const image = await request.get(pathname + search);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
  }
  await page.goto("/privacy");
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
    "content",
    /\/opengraph-image$/,
  );
});

test("le tre giornate: tema, colori e indirizzi brevi", async ({ page, request }) => {
  for (const [path, topic] of [
    ["/giornate/mafia", "Mafia"],
    ["/giornate/donne", "Donne"],
    ["/giornate/immigrazione", "Immigrazione"],
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toContainText(topic);
    await expect(page.locator("[data-session]").first()).toBeVisible();
  }
  const short = await request.get("/mafia", { maxRedirects: 0 });
  expect(short.headers()["location"]).toBe("/giornate/mafia");
  const removed = await request.get("/programma/rito-della-luce", { maxRedirects: 0 });
  expect(removed.headers()["location"]).toBe("/programma");
  const renamed = await request.get("/programma/il-gattopardo-raccontato-ai-nostri-figli", {
    maxRedirects: 0,
  });
  expect(renamed.headers()["location"]).toBe("/programma/il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi");
  const cancelled = await request.get("/programma/la-buca-delle-lettere-di-coraggio", { maxRedirects: 0 });
  expect(cancelled.headers()["location"]).toBe("/programma#sabato-17");
});

test("contenuti corretti dall'organizzazione: niente palco coperto, piano pioggia o laboratori inesistenti", async ({
  request,
}) => {
  for (const path of [
    "/",
    "/info",
    "/famiglie",
    "/programma",
    "/festival",
    "/lamiaradice",
    "/mostra-peppino-impastato",
    "/giornate/donne",
    "/adesso",
  ]) {
    const html = await (await request.get(path)).text();
    expect(html, path).not.toMatch(
      /palco coperto|200 posti|sentiero di luci|braccialett|radici di carta|gazebo|entro le 15|pagella dei sogni/i,
    );
    // correzioni del 10 ottobre: niente «Indovina il classico», cartoline, tamburi del sabato, mostra di tre giorni
    expect(html, path).not.toMatch(
      /indovina il classico|buca delle lettere|cartolin|scambio libri|tamburi aprono il pomeriggio|accompagna tutt[ei] e tre|aperta tutti e tre i giorni|ogni sera fino alle 22|firmacopie al bookshop/i,
    );
  }
  const info = await (await request.get("/info")).text();
  expect(info).toContain("via Archimede");
});

test("programma del 10 ottobre: sabato monologo, autrice e firmacopie; domenica «Shuma» alle 19:15", async ({
  page,
}) => {
  await page.goto("/programma");
  const saturday = page.locator("#sabato-17 [data-session]");
  await expect(saturday).toHaveCount(3);
  expect(await saturday.evaluateAll((els) => els.map((el) => el.getAttribute("data-session")))).toEqual([
    "monologo-sulle-donne-sab-1800",
    "la-seminatrice-di-coraggio-sab-1810",
    "firmacopie-sab-1910",
  ]);
  // le firmacopie sono sempre sotto il Palco del Castello
  for (const id of ["firmacopie-ven-2000", "firmacopie-sab-1910", "firmacopie-dom-1850"]) {
    await expect(page.locator(`[data-session='${id}']`)).toContainText("Palco del Castello");
  }
  await expect(page.locator("[data-session='shuma-dom-1915']")).toContainText("19:15");

  // chi modera sabato ha la sua scheda, con il ritratto
  await page.goto("/programma/la-seminatrice-di-coraggio");
  const moderator = page.getByRole("link", { name: "Elisa Petrillo" });
  await expect(moderator).toHaveAttribute("href", "/ospiti/elisa-petrillo");
  await page.goto("/ospiti/elisa-petrillo");
  await expect(page.locator("h1")).toHaveText("Elisa Petrillo");
  await expect(page.locator("[data-session='la-seminatrice-di-coraggio-sab-1810']")).toBeVisible();

  // la mostra è solo venerdì
  await page.goto("/mostra-peppino-impastato");
  await expect(page.locator("main")).toContainText("Solo venerdì 16");
});

test("autori: il ritratto se sono svelati, «Chi sarà?» finché sono segreti", async ({ page }) => {
  await page.goto("/ospiti");
  for (const author of authors) {
    const portrait = page.getByRole("img", { name: `Ritratto di ${author.name}` });
    if (isSecret(author.slug)) await expect(portrait).toHaveCount(0);
    else await expect(portrait).toBeVisible();
  }
  await expect(page.locator("[data-mystery-guest]")).toHaveCount(authors.length - visibleAuthors.length);
  for (const author of authors) {
    await page.goto(`/giornate/${author.day}`);
    if (isSecret(author.slug)) {
      await expect(page.locator("[data-mystery-guest]")).toHaveCount(1);
    } else {
      await expect(page.getByRole("img", { name: `Ritratto di ${author.name}` }).first()).toBeVisible();
    }
  }
});

test("autori segreti: nessun nome, foto, libro o indirizzo prima che siano svelati", async ({ request }) => {
  const leaks: Record<string, string[]> = {
    "giovanni-impastato": [
      "Giovanni Impastato",
      "giovanni-impastato",
      "fratello Giovanni",
      "Mio fratello",
      "Oltre i cento passi",
      "Resistere a Mafiopoli",
      "le-radici-che-si-scelgono",
      "Pienogiorno",
      "Piemme",
      "Stampa Alternativa",
    ],
    "antonella-desiree-giuffre": ["Giuffr", "giuffre", "Desirée", "seminatrice di coraggio", "Tre60"],
    "maria-antonietta-ferraloro": [
      "Ferraloro",
      "ferraloro",
      "raccontato alle ragazze",
      "raccontato a mia figlia",
      "Gallucci",
      "opera-orologio",
      "luoghi del Gattopardo",
      "Pacini",
      "Nuova Frontiera",
    ],
  };
  const secret = authors.filter((a) => isSecret(a.slug));
  test.skip(secret.length === 0, "Tutti gli autori sono svelati");
  const files = [
    ...pages,
    "/sitemap.xml",
    "/calendario/programma-completo.ics",
    "/calendario/acate-book-festival-2026.ics",
  ];
  for (const path of files) {
    const body = await (await request.get(path)).text();
    for (const author of secret) {
      for (const word of leaks[author.slug]) expect(body, `${path}: «${word}»`).not.toContain(word);
    }
  }
  for (const author of secret) {
    expect((await request.get(`/ospiti/${author.slug}`)).status()).toBe(404);
    expect((await request.get(`/programma/${author.talk}`)).status()).toBe(404);
  }
});

test("description scritte a mano: entrano intere nei 158 caratteri, senza «…»", async ({ request }) => {
  // le pagine di eventi e giornate la ricavano dai testi lunghi e la troncano apposta (truncate in lib/seo.ts)
  for (const path of [
    "/",
    "/programma",
    "/ospiti",
    "/famiglie",
    "/festival",
    "/info",
    "/lamiaradice",
    "/adesso",
  ]) {
    const html = await (await request.get(path)).text();
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    expect(description, path).not.toMatch(/…$/);
  }
});

test("crediti: gli editori delle copertine, solo degli autori già svelati", async ({ page }) => {
  const publishers: Record<string, string[]> = {
    "giovanni-impastato": ["Libreria Pienogiorno", "Piemme"],
    "antonella-desiree-giuffre": ["Tre60"],
    "maria-antonietta-ferraloro": ["Gallucci Bros.", "La Nuova Frontiera Junior", "Pacini Editore"],
  };
  await page.goto("/festival");
  const credit = page.getByRole("listitem").filter({ hasText: "Copertine dei libri" });
  await expect(credit).toHaveCount(1);
  for (const author of authors) {
    for (const name of publishers[author.slug]) {
      if (isSecret(author.slug)) await expect(credit).not.toContainText(name);
      else await expect(credit).toContainText(name);
    }
  }
});

test("home: le tre schede degli autori hanno le stesse misure, svelati o no", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator('section[aria-labelledby="gli-ospiti"] article');
  await expect(cards).toHaveCount(3);
  // il riquadro in cima alla scheda: il ritratto o il «?» degli autori segreti
  const sizes = await cards.evaluateAll((els) =>
    els.map((el) => {
      const box = el.firstElementChild!.getBoundingClientRect();
      return `${Math.round(box.width)}x${Math.round(box.height)}`;
    }),
  );
  expect(new Set(sizes).size, JSON.stringify(sizes)).toBe(1);
});

test("copertine originali: i libri degli ospiti, tutti alti uguali", async ({ page }) => {
  test.skip(isSecret("giovanni-impastato"), "Giovanni Impastato non è ancora svelato");
  await page.goto("/ospiti/giovanni-impastato");
  const books = page.locator("#libri ~ ul [data-book-cover]");
  await expect(books).toHaveCount(4);
  // due copertine originali; «Resistere a Mafiopoli» e «Il coraggio della memoria» restano disegnati
  await expect(books.locator("img")).toHaveCount(2);
  const heights = await books.evaluateAll((els) =>
    els.map((el) => Math.round((el.firstElementChild as HTMLElement).offsetHeight)),
  );
  expect(new Set(heights).size, JSON.stringify(heights)).toBe(1);
});

test("il libro della giornata: la copertina se l'autore è svelato, altrimenti «Lo sveliamo presto»", async ({
  page,
}) => {
  await page.goto("/giornate/donne");
  const aside = page.locator('aside[aria-labelledby="il-libro"]');
  if (isSecret("antonella-desiree-giuffre")) {
    await expect(aside.locator("img")).toHaveCount(0);
    await expect(aside.getByRole("paragraph").filter({ hasText: /^Lo sveliamo presto$/ })).toBeVisible();
  } else {
    await expect(aside.locator("[data-book-cover] img")).toHaveCount(1);
  }
});

test("copertine dei libri: le scritte restano dentro il libro", async ({ page }) => {
  for (const path of [
    "/",
    "/ospiti",
    "/giornate/immigrazione",
    ...visibleAuthors.flatMap((a) => [`/ospiti/${a.slug}`, `/programma/${a.talk}`]),
  ]) {
    await page.goto(path);
    const problems = await page.locator("[data-book-cover]").evaluateAll((covers) =>
      covers.flatMap((cover) => {
        const book = cover.firstElementChild as HTMLElement;
        return [...book.querySelectorAll("p")]
          .filter((p) => p.offsetHeight > 0)
          .filter(
            (p) => p.scrollWidth > p.clientWidth + 1 || p.offsetTop + p.offsetHeight > book.clientHeight - 2,
          )
          .map((p) => `${p.textContent} (${book.clientWidth}px)`);
      }),
    );
    expect(problems, path).toEqual([]);
  }
});

test("SEO tecnico: sitemap, robots, manifest", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/programma/shuma");
  for (const author of authors) {
    if (isSecret(author.slug)) expect(sitemap).not.toContain(`/ospiti/${author.slug}`);
    else expect(sitemap).toContain(`/ospiti/${author.slug}`);
  }
  expect(sitemap).toContain("/giornate/immigrazione");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Sitemap: .*\/sitemap\.xml/);
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.lang).toBe("it");
});

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "solo mobile");

  test("menu: si apre, si chiude con Esc e restituisce il focus", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menu" });
    await button.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Programma" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(button).toBeFocused();
  });
});

test("#LaMiaRadice: il cartellino si genera e si scarica", async ({ page }) => {
  await page.goto("/lamiaradice");
  await page.getByLabel("Chi ti ha messo in mano il primo libro?").fill("la maestra Lucia");
  await expect(page.locator("canvas")).toHaveAttribute("aria-label", /la maestra Lucia/);
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /Scarica l'immagine/ }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^lamiaradice-la-maestra-lucia\.png$/);
});
