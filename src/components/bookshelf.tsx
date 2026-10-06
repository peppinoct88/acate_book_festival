/**
 * Una mensola di dorsi di libri, generata in modo deterministico (stesso risultato a ogni build).
 * Puramente decorativa: richiama la torre di libri del manifesto.
 */
const palette = ["#fd644f", "#1e154a", "#68cbc8", "#f6eedc", "#e8503b", "#abded6", "#2c2266"];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Spine {
  x: number;
  w: number;
  h: number;
  color: string;
  bands: number;
  tilt: number;
}

function buildShelf(width: number, height: number, seed: number): Spine[] {
  const rand = mulberry32(seed);
  const spines: Spine[] = [];
  let x = 0;
  let lastColor = "";
  while (x < width) {
    const w = 14 + Math.round(rand() * 22);
    const h = Math.round(height * (0.55 + rand() * 0.45));
    let color = palette[Math.floor(rand() * palette.length)];
    if (color === lastColor) color = palette[(palette.indexOf(color) + 2) % palette.length];
    lastColor = color;
    const tilt = rand() < 0.07 ? (rand() < 0.5 ? -6 : 6) : 0;
    spines.push({ x, w, h, color, bands: Math.floor(rand() * 3), tilt });
    x += w + (tilt ? 6 : 1.5);
  }
  return spines;
}

export function Bookshelf({
  className = "",
  height = 72,
  seed = 2026,
}: {
  className?: string;
  height?: number;
  seed?: number;
}) {
  const width = 1800;
  const spines = buildShelf(width, height, seed);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`block h-[var(--shelf-h)] w-full ${className}`}
      style={{ ["--shelf-h" as string]: `${height}px` }}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMax slice"
    >
      {spines.map((s, i) => {
        const y = height - s.h;
        const light = s.color === "#f6eedc" || s.color === "#abded6";
        const band = light ? "#1e154a" : "#fefaef";
        return (
          <g key={i} transform={s.tilt ? `rotate(${s.tilt} ${s.x + s.w / 2} ${height})` : undefined}>
            <rect x={s.x} y={y} width={s.w} height={s.h} rx={2} fill={s.color} />
            {s.bands > 0 ? (
              <rect x={s.x + 2} y={y + 8} width={s.w - 4} height={2} fill={band} opacity={0.55} />
            ) : null}
            {s.bands > 1 ? (
              <rect x={s.x + 2} y={y + s.h - 14} width={s.w - 4} height={2} fill={band} opacity={0.55} />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
