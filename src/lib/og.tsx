import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Anteprime social (1200×630) generate in build con next/og.
 * Tipografia Outfit (TTF in src/assets/fonts) e torre di libri del manifesto definitivo, col suo sole turchese.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const assets = join(process.cwd(), "src/assets");

let cache: Promise<{
  fonts: { name: string; data: Buffer; weight: 300 | 600 | 900; style: "normal" }[];
  tower: string;
}> | null = null;

function load() {
  cache ??= (async () => {
    const [light, semibold, black, tower] = await Promise.all([
      readFile(join(assets, "fonts/Outfit-300.ttf")),
      readFile(join(assets, "fonts/Outfit-600.ttf")),
      readFile(join(assets, "fonts/Outfit-900.ttf")),
      readFile(join(assets, "og/tower.png")),
    ]);
    return {
      fonts: [
        { name: "Outfit", data: light, weight: 300 as const, style: "normal" as const },
        { name: "Outfit", data: semibold, weight: 600 as const, style: "normal" as const },
        { name: "Outfit", data: black, weight: 900 as const, style: "normal" as const },
      ],
      tower: `data:image/png;base64,${tower.toString("base64")}`,
    };
  })();
  return cache;
}

type Tone = "cream" | "ink" | "coral" | "teal";

const palette: Record<Tone, { bg: string; fg: string; acate: string; accent: string }> = {
  cream: { bg: "#fff9e9", fg: "#093370", acate: "#ff5e3e", accent: "#ff5e3e" },
  ink: { bg: "#072a5f", fg: "#fff9e9", acate: "#ff5e3e", accent: "#ff5e3e" },
  coral: { bg: "#ff5e3e", fg: "#072a5f", acate: "#fff9e9", accent: "#072a5f" },
  teal: { bg: "#176b6e", fg: "#fff9e9", acate: "#fccb89", accent: "#fccb89" },
};

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  meta,
  tone = "cream",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: string;
  tone?: Tone;
}) {
  const { fonts, tower } = await load();
  const c = palette[tone];
  const titleSize = title.length > 46 ? 58 : title.length > 30 ? 70 : title.length > 18 ? 84 : 100;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: c.bg,
        fontFamily: "Outfit",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- JSX di next/og (Satori), non del DOM */}
      <img
        src={tower}
        alt=""
        width={380}
        height={751}
        style={{ position: "absolute", right: 0, bottom: -70, width: 380, height: 751 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px 52px",
          width: 820,
          height: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.82 }}>
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: c.acate,
                letterSpacing: -0.8,
              }}
            >
              ACATE
            </span>
            <span style={{ fontSize: 28.5, fontWeight: 900, color: c.fg, letterSpacing: -0.8 }}>BOOK</span>
            <span style={{ fontSize: 21, fontWeight: 300, color: c.fg, letterSpacing: -0.9 }}>FESTIVAL</span>
          </div>
          <div style={{ width: 2, height: 64, background: c.fg, opacity: 0.25 }} />
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 4,
              color: c.fg,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {subtitle ? (
            <span style={{ fontSize: 34, fontWeight: 300, color: c.fg, marginBottom: 14 }}>{subtitle}</span>
          ) : null}
          <span
            style={{
              fontSize: titleSize,
              fontWeight: 900,
              color: c.fg,
              lineHeight: 0.98,
              letterSpacing: -2,
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ width: 360, height: 4, background: c.accent, borderRadius: 4 }} />
          <span
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 3.5,
              color: c.fg,
              textTransform: "uppercase",
            }}
          >
            {meta ?? "16 / 17 / 18 ottobre 2026 · Acate"}
          </span>
        </div>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}
