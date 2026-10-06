import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const pages = [
  "/",
  "/programma",
  "/programma/le-radici-che-si-scelgono",
  "/programma/a-colpi-di-mantice",
  "/programma/shuma",
  "/programma/monologo-sulle-donne",
  "/programma/il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi",
  "/giornate/mafia",
  "/giornate/donne",
  "/giornate/immigrazione",
  "/ospiti",
  "/ospiti/banda-citta-di-acate",
  "/ospiti/antonella-desiree-giuffre",
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
  expect(total).toBeGreaterThanOrEqual(15);
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
  const card = page.locator("[data-session='shuma-dom-1930']");
  await card.locator("summary").click();
  const google = card.getByRole("link", { name: /Google Calendar/ });
  await expect(google).toBeVisible();
  await expect(google).toHaveAttribute(
    "href",
    /^https:\/\/calendar\.google\.com\/calendar\/render\?action=TEMPLATE/,
  );
  await expect(card.getByRole("link", { name: /iPhone, Mac, Outlook/ })).toHaveAttribute(
    "href",
    "/calendario/shuma-dom-1930.ics",
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
  // sabato 18:10: la buca delle lettere e il monologo sono in corso insieme
  await page.goto("/programma?ora=2026-10-17T18:10");
  await expect(page.locator("[data-live='now']")).toHaveCount(2);
});

test("scheda evento: dati strutturati Event validi", async ({ page }) => {
  await page.goto("/programma/le-radici-che-si-scelgono");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const data = blocks.map((b) => JSON.parse(b));
  const event = data.find((d) => d["@type"] === "LiteraryEvent");
  expect(event).toBeTruthy();
  expect(event.startDate).toBe("2026-10-16T19:00:00+02:00");
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
  expect(festival.endDate).toBe("2026-10-18T22:00:00+02:00");
  expect(festival.subEvent.length).toBeGreaterThanOrEqual(8);
});

test("calendari .ics", async ({ request }) => {
  const all = await request.get("/calendario/acate-book-festival-2026.ics");
  expect(all.status()).toBe(200);
  expect(all.headers()["content-type"]).toContain("text/calendar");
  const body = await all.text();
  expect(body.startsWith("BEGIN:VCALENDAR")).toBe(true);
  expect(body.match(/BEGIN:VEVENT/g)).toHaveLength(3);

  const one = await (await request.get("/calendario/shuma-dom-1930.ics")).text();
  expect(one).toContain("DTSTART:20261018T173000Z");
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
  for (const path of ["/programma", "/programma/shuma", "/ospiti/giovanni-impastato", "/famiglie"]) {
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
});

test("contenuti corretti dall'organizzazione: niente palco coperto, piano pioggia o laboratori inesistenti", async ({
  request,
}) => {
  for (const path of ["/", "/info", "/famiglie", "/programma", "/festival", "/lamiaradice"]) {
    const html = await (await request.get(path)).text();
    expect(html, path).not.toMatch(
      /palco coperto|200 posti|sentiero di luci|braccialett|radici di carta|gazebo|entro le 15|pagella dei sogni/i,
    );
  }
  const info = await (await request.get("/info")).text();
  expect(info).toContain("via Archimede");
});

test("ritratti degli autori dove se ne parla", async ({ page }) => {
  await page.goto("/ospiti");
  for (const name of ["Giovanni Impastato", "Antonella Desirée Giuffrè", "Maria Antonietta Ferraloro"]) {
    await expect(page.getByRole("img", { name: `Ritratto di ${name}` })).toBeVisible();
  }
  await page.goto("/giornate/mafia");
  await expect(page.getByRole("img", { name: "Ritratto di Giovanni Impastato" }).first()).toBeVisible();
});

test("home: le tre schede degli autori hanno le stesse misure", async ({ page }) => {
  await page.goto("/");
  const portraits = page.locator('section[aria-labelledby="gli-ospiti"] img[alt^="Ritratto di"]');
  await expect(portraits).toHaveCount(3);
  const sizes = await portraits.evaluateAll((imgs) =>
    imgs.map((img) => ({
      width: Math.round(img.getBoundingClientRect().width),
      height: Math.round(img.getBoundingClientRect().height),
      column: Math.round(img.closest("article")!.getBoundingClientRect().width),
    })),
  );
  expect(new Set(sizes.map((s) => `${s.width}x${s.height}`)).size, JSON.stringify(sizes)).toBe(1);
});

test("copertine dei libri: le scritte restano dentro il libro", async ({ page }) => {
  for (const path of [
    "/",
    "/ospiti",
    "/ospiti/maria-antonietta-ferraloro",
    "/giornate/immigrazione",
    "/programma/il-gattopardo-raccontato-alle-ragazze-e-ai-ragazzi",
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
  expect(sitemap).toContain("/ospiti/giovanni-impastato");
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
