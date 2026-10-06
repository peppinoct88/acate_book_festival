// Screenshot delle pagine principali, mobile e desktop, per la revisione visiva.
// Uso: BASE_URL=http://localhost:3000 node scripts/screenshots.mjs [cartella-output] [pagine...]
// In ambienti con Chromium preinstallato: PW_CHROMIUM_PATH=/percorso/chrome
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = process.argv[2] ?? "screenshots";
const pages = process.argv.slice(3).length
  ? process.argv.slice(3)
  : [
      "/",
      "/programma",
      "/programma/le-radici-che-si-scelgono",
      "/giornate/mafia",
      "/giornate/donne",
      "/giornate/immigrazione",
      "/ospiti",
      "/ospiti/giovanni-impastato",
      "/famiglie",
      "/mostra-peppino-impastato",
      "/lamiaradice",
      "/festival",
      "/info",
      "/adesso",
    ];

const viewports = [
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || undefined,
});

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    reducedMotion: "reduce",
    locale: "it-IT",
    timezoneId: "Europe/Rome",
  });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // rivela gli elementi con animazione allo scroll
    await page.evaluate(() =>
      document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-revealed", "")),
    );
    // scorre la pagina perché si carichino le immagini differite (loading="lazy")
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.8) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);
    const slug = path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "_").replace(/[?=&]/g, "-");
    await page.screenshot({ path: `${out}/${vp.name}-${slug}.png`, fullPage: true });
    await page.screenshot({ path: `${out}/${vp.name}-${slug}-fold.png`, fullPage: false });
    console.log(`✓ ${vp.name} ${path}`);
  }
  await context.close();
}
await browser.close();
