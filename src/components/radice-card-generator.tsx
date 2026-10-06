"use client";

import { track } from "@vercel/analytics";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Download, Share } from "./icons";

const W = 1080;
const H = 1350;
const COLORS = {
  cream: "#fefaef",
  ink: "#1e154a",
  coral: "#fd644f",
  teal: "#68cbc8",
  tealSoft: "#abded6",
  kraft: "#d9b98a",
  kraftDark: "#b8935e",
};

function fontFamily(variable: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/\s+\S*$/, "")}…`;
    return kept;
  }
  return lines;
}

function draw(ctx: CanvasRenderingContext2D, name: string, book: string, outfit: string, literata: string) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(0, 0, W, H);

  // sole e nuvola
  ctx.fillStyle = COLORS.teal;
  ctx.beginPath();
  ctx.arc(W - 120, 170, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.tealSoft;
  ctx.beginPath();
  ctx.ellipse(150, 1010, 150, 52, 0, 0, Math.PI * 2);
  ctx.ellipse(230, 975, 90, 70, 0, 0, Math.PI * 2);
  ctx.ellipse(110, 990, 70, 50, 0, 0, Math.PI * 2);
  ctx.fill();

  // hashtag
  ctx.fillStyle = COLORS.coral;
  ctx.font = `900 92px ${outfit}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText("#LaMia", 80, 170);
  ctx.fillStyle = COLORS.ink;
  ctx.fillText("Radice", 80, 262);

  // cartellino kraft (angolo tagliato e foro in alto a destra, spago verso il sole)
  ctx.save();
  ctx.translate(W / 2, 720);
  ctx.rotate((-4 * Math.PI) / 180);
  const tw = 780;
  const th = 540;
  const x = -tw / 2;
  const y = -th / 2;
  const cut = 120;
  const holeX = x + tw - 100;
  const holeY = y + 78;
  const tagPath = (dx = 0, dy = 0) => {
    ctx.beginPath();
    ctx.moveTo(x + dx, y + dy);
    ctx.lineTo(x + tw - cut + dx, y + dy);
    ctx.lineTo(x + tw + dx, y + cut + dy);
    ctx.lineTo(x + tw + dx, y + th + dy);
    ctx.lineTo(x + dx, y + th + dy);
    ctx.closePath();
  };
  // spago
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(holeX, holeY);
  ctx.bezierCurveTo(holeX + 10, holeY - 160, holeX + 70, holeY - 300, holeX + 150, holeY - 470);
  ctx.stroke();
  // ombra
  ctx.fillStyle = "rgba(30, 21, 74, 0.18)";
  tagPath(14, 22);
  ctx.fill();
  // carta
  ctx.fillStyle = COLORS.kraft;
  tagPath();
  ctx.fill();
  // grana
  ctx.save();
  tagPath();
  ctx.clip();
  ctx.fillStyle = "rgba(30, 21, 74, 0.05)";
  for (let i = 0; i < 1100; i++) {
    ctx.fillRect(x + ((i * 97) % tw), y + ((i * 53) % th), 2, 2);
  }
  ctx.restore();
  // foro
  ctx.fillStyle = COLORS.cream;
  ctx.strokeStyle = COLORS.kraftDark;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(holeX, holeY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // testo
  ctx.fillStyle = COLORS.ink;
  ctx.font = `600 30px ${outfit}`;
  ctx.letterSpacing = "6px";
  ctx.fillText("LA MIA RADICE DI LETTORE È", x + 70, y + 175);
  ctx.letterSpacing = "0px";
  ctx.font = `400 ${name.length > 22 ? 62 : 76}px ${literata}`;
  const lines = wrap(ctx, name || "…", tw - 140, 2);
  lines.forEach((l, i) => ctx.fillText(l, x + 70, y + 275 + i * 84));
  const afterName = y + 275 + (lines.length - 1) * 84 + 36;
  ctx.setLineDash([14, 10]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(30, 21, 74, 0.45)";
  ctx.beginPath();
  ctx.moveTo(x + 70, afterName);
  ctx.lineTo(x + tw - 70, afterName);
  ctx.stroke();
  ctx.setLineDash([]);
  if (book) {
    ctx.font = `300 34px ${outfit}`;
    const bookLines = wrap(ctx, `e il libro era «${book}»`, tw - 140, 2);
    bookLines.forEach((l, i) => ctx.fillText(l, x + 70, afterName + 62 + i * 44));
  }
  ctx.restore();

  // firma
  ctx.fillStyle = COLORS.coral;
  ctx.font = `900 58px ${outfit}`;
  ctx.fillText("ACATE", 80, H - 168);
  ctx.fillStyle = COLORS.ink;
  ctx.font = `900 64px ${outfit}`;
  ctx.fillText("BOOK", 80, H - 116);
  ctx.font = `300 46px ${outfit}`;
  ctx.fillText("FESTIVAL", 82, H - 70);
  ctx.font = `600 30px ${outfit}`;
  ctx.letterSpacing = "4px";
  ctx.textAlign = "right";
  ctx.fillText("16 / 17 / 18 OTTOBRE 2026", W - 80, H - 112);
  ctx.font = `300 30px ${outfit}`;
  ctx.fillText("ACATE (RG)", W - 80, H - 70);
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";
  ctx.fillStyle = COLORS.coral;
  ctx.fillRect(80, H - 40, W - 160, 5);
}

const subscribeNoop = () => () => {};

let fileShareSupport: boolean | null = null;
function detectFileShare(): boolean {
  if (fileShareSupport !== null) return fileShareSupport;
  try {
    const probe = new File(["x"], "probe.png", { type: "image/png" });
    fileShareSupport = typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] });
  } catch {
    fileShareSupport = false;
  }
  return fileShareSupport;
}

export function RadiceCardGenerator({ hashtag }: { hashtag: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [ready, setReady] = useState(false);
  const canShareFiles = useSyncExternalStore(subscribeNoop, detectFileShare, () => false);
  const [message, setMessage] = useState("");
  const nameId = useId();
  const bookId = useId();
  const hintId = useId();

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const outfit = fontFamily("--font-outfit", "system-ui, sans-serif");
    const literata = fontFamily("--font-literata", "Georgia, serif");
    try {
      await Promise.all([
        document.fonts.load(`900 64px ${outfit}`),
        document.fonts.load(`300 32px ${outfit}`),
        document.fonts.load(`600 30px ${outfit}`),
        document.fonts.load(`400 64px ${literata}`),
      ]);
    } catch {
      /* si disegna comunque con i font di riserva */
    }
    draw(ctx, name.trim(), book.trim(), outfit, literata);
    setReady(true);
  }, [name, book]);

  useEffect(() => {
    void render();
  }, [render]);

  const toBlob = () =>
    new Promise<Blob | null>((resolve) => canvasRef.current?.toBlob((b) => resolve(b), "image/png"));

  const fileName = `lamiaradice-${(name || "cartellino")
    .toLowerCase()
    .replace(/[^a-z0-9àèéìòù]+/gi, "-")
    .replace(/^-|-$/g, "")}.png`;

  const download = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    setMessage("Immagine scaricata: ora pubblicala e tagga la tua radice!");
    track("lamiaradice_card", { action: "scarica" });
  };

  const share = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const file = new File([blob], fileName, { type: "image/png" });
    try {
      await navigator.share({
        files: [file],
        text: `La mia radice di lettore è ${name || "…"} ${hashtag}`,
      });
      track("lamiaradice_card", { action: "condividi" });
    } catch {
      /* annullato */
    }
  };

  const altText = `Cartellino #LaMiaRadice: la mia radice di lettore è ${name.trim() || "…"}${book.trim() ? `, e il libro era «${book.trim()}»` : ""}. Acate Book Festival, 16-18 ottobre 2026.`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          void download();
        }}
      >
        <div>
          <label htmlFor={nameId} className="block font-display text-lg font-bold">
            Chi ti ha messo in mano il primo libro?
          </label>
          <input
            id={nameId}
            type="text"
            value={name}
            maxLength={40}
            autoComplete="off"
            aria-describedby={hintId}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es. nonna Rosa, la maestra Lucia, mio padre"
            className="mt-3 block min-h-14 w-full rounded-2xl border-2 border-ink/80 bg-cream px-5 font-serif text-xl text-ink placeholder:text-ink/60 focus:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
          />
          <p id={hintId} className="mt-2 text-sm text-ink-muted">
            Massimo 40 caratteri. Il cartellino si crea sul tuo dispositivo: non riceviamo né salviamo quello
            che scrivi.
          </p>
        </div>
        <div>
          <label htmlFor={bookId} className="block font-display text-lg font-bold">
            E il libro era… <span className="font-light text-ink-muted">(facoltativo)</span>
          </label>
          <input
            id={bookId}
            type="text"
            value={book}
            maxLength={48}
            autoComplete="off"
            onChange={(e) => setBook(e.target.value)}
            placeholder="Es. Pinocchio"
            className="mt-3 block min-h-14 w-full rounded-2xl border-2 border-ink/80 bg-cream px-5 font-serif text-xl text-ink placeholder:text-ink/60 focus:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={!ready || !name.trim()}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-6 font-display font-semibold text-cream transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#2c2266] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Download size={18} /> Scarica l&apos;immagine
          </button>
          {canShareFiles ? (
            <button
              type="button"
              onClick={share}
              disabled={!ready || !name.trim()}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-ink/85 px-6 font-display font-semibold text-ink transition-colors hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Share size={18} /> Condividi
            </button>
          ) : null}
        </div>
        <p aria-live="polite" className="min-h-6 font-display font-semibold text-teal-deep">
          {message}
        </p>
        <ol className="space-y-2 font-serif text-lg text-ink/85">
          <li>
            <strong className="font-display">1.</strong> Scarica (o condividi) il tuo cartellino.
          </li>
          <li>
            <strong className="font-display">2.</strong> Pubblicalo nelle storie o nel feed con{" "}
            <strong className="font-display">{hashtag}</strong>.
          </li>
          <li>
            <strong className="font-display">3.</strong> Tagga la persona che hai scritto: è il suo modo di
            scoprire che è stata la tua radice.
          </li>
        </ol>
      </form>

      <div className="mx-auto w-full max-w-md">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          role="img"
          aria-label={altText}
          className="h-auto w-full rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgb(30_21_74/0.55)] ring-1 ring-ink/10"
        />
        <p className="mt-3 text-center font-display text-sm text-ink-muted">
          Anteprima · formato 4:5, 1080×1350
        </p>
      </div>
    </div>
  );
}
