/**
 * Una copertina di libro disegnata in CSS, nei colori del manifesto.
 * Usata per gli ospiti («ogni ospite è un libro») e per i loro titoli:
 * niente foto o copertine prese in prestito, nessun problema di diritti.
 * Tipografia e spaziature solo in unità cqw, senza minimi: a qualunque larghezza la copertina è la stessa,
 * in scala. Sulle copertine piccole spariscono prima il piede, poi il sottotitolo, sotto 5rem anche il titolo.
 * Il sole passa dietro al testo: ogni coppia fondo/sole regge il contrasto AA con il colore del testo.
 */
type Tone = "coral" | "teal" | "ink" | "paper";

const tones: Record<
  Tone,
  { bg: string; fg: string; accent: string; line: string; sun: string; ring: string }
> = {
  coral: {
    bg: "bg-coral",
    fg: "text-ink",
    accent: "bg-ink",
    line: "bg-ink/25",
    sun: "bg-teal-light",
    ring: "",
  },
  teal: {
    bg: "bg-teal-light",
    fg: "text-ink",
    accent: "bg-ink",
    line: "bg-ink/20",
    sun: "bg-coral",
    ring: "",
  },
  ink: {
    bg: "bg-ink",
    fg: "text-cream",
    accent: "bg-coral",
    line: "bg-cream/25",
    sun: "bg-teal-deep",
    ring: "",
  },
  paper: {
    bg: "bg-paper",
    fg: "text-ink",
    accent: "bg-teal",
    line: "bg-ink/15",
    sun: "bg-coral",
    ring: "ring-1 ring-inset ring-ink/15",
  },
};

/** Corpo del titolo in cqw: la parola più lunga entra nella copertina, i titoli lunghi scendono un po' */
function titleSize(title: string) {
  const longest = Math.max(...title.split(/\s+|(?<=-)/).map((word) => word.length));
  // circa 0.7em per lettera maiuscola in Outfit Black; il testo ha 79cqw di spazio
  const byWord = 74 / (longest * 0.7);
  const byLength = title.length > 40 ? 8 : title.length > 28 ? 9.2 : 10.5;
  return Math.min(10.5, byWord, byLength);
}

export function BookCover({
  title,
  subtitle,
  footer = "Acate Book Festival\u00a0·\u00a02026",
  tone = "coral",
  className = "",
}: {
  title: string;
  subtitle?: string;
  footer?: string;
  tone?: Tone;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div aria-hidden="true" className={`@container ${className}`} data-book-cover>
      <div
        className={`relative isolate aspect-[3/4] overflow-hidden rounded-[0.35rem_1rem_1rem_0.35rem] ${t.bg} ${t.fg} ${t.ring} [transform:perspective(900px)_rotateY(0deg)] shadow-[0_1px_0_rgb(7_42_95/0.2),0_18px_40px_-22px_rgb(7_42_95/0.55)] transition-transform duration-500 ease-soft group-hover:[transform:perspective(900px)_rotateY(-9deg)]`}
      >
        {/* il sole del manifesto */}
        <span
          className={`absolute -right-[22cqw] -bottom-[22cqw] -z-10 size-[78cqw] rounded-full ${t.sun} opacity-90`}
        />
        {/* dorso */}
        <span className="absolute inset-y-0 left-0 w-[5cqw] bg-linear-to-r from-black/25 via-black/5 to-transparent" />
        <span className={`absolute inset-y-0 left-[5cqw] w-px ${t.line}`} />
        <div className="flex h-full flex-col p-[8cqw] pl-[13cqw]">
          <span className={`h-[2.4cqw] w-[16cqw] rounded-full ${t.accent}`} />
          <p
            className="mt-[6cqw] font-display leading-[0.92] font-black tracking-[-0.02em] text-balance uppercase @max-[5rem]:hidden"
            style={{ fontSize: `${titleSize(title)}cqw` }}
          >
            {title}
          </p>
          {subtitle ? (
            <p className="mt-[4cqw] font-display text-[5.6cqw] leading-snug font-light @max-[6rem]:hidden">
              {subtitle}
            </p>
          ) : null}
          <p className="mt-auto max-w-[70%] pt-[3cqw] font-display text-[3.6cqw] leading-normal font-semibold tracking-[0.16em] text-balance uppercase @max-[8rem]:hidden">
            {footer}
          </p>
        </div>
      </div>
    </div>
  );
}
