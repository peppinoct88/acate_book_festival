/**
 * Una copertina di libro disegnata in CSS, nei colori del manifesto.
 * Usata per gli ospiti («ogni ospite è un libro») e per i loro titoli:
 * niente foto o copertine prese in prestito, nessun problema di diritti.
 * Tipografia e spaziature in unità cqw: la copertina si adatta a qualunque larghezza.
 */
type Tone = "coral" | "teal" | "ink" | "paper";

const tones: Record<
  Tone,
  { bg: string; fg: string; accent: string; line: string; sun: string; ring: string }
> = {
  coral: { bg: "bg-coral", fg: "text-ink", accent: "bg-ink", line: "bg-ink/25", sun: "bg-teal", ring: "" },
  teal: { bg: "bg-teal", fg: "text-ink", accent: "bg-coral", line: "bg-ink/20", sun: "bg-coral", ring: "" },
  ink: { bg: "bg-ink", fg: "text-cream", accent: "bg-coral", line: "bg-cream/25", sun: "bg-teal", ring: "" },
  paper: {
    bg: "bg-paper",
    fg: "text-ink",
    accent: "bg-teal",
    line: "bg-ink/15",
    sun: "bg-coral",
    ring: "ring-1 ring-inset ring-ink/15",
  },
};

export function BookCover({
  title,
  subtitle,
  footer = "Acate Book Festival · 2026",
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
    <div aria-hidden="true" className={`@container ${className}`}>
      <div
        className={`relative isolate aspect-[3/4] overflow-hidden rounded-[0.35rem_1rem_1rem_0.35rem] ${t.bg} ${t.fg} ${t.ring} [transform:perspective(900px)_rotateY(0deg)] shadow-[0_1px_0_rgb(30_21_74/0.2),0_18px_40px_-22px_rgb(30_21_74/0.55)] transition-transform duration-500 ease-soft group-hover:[transform:perspective(900px)_rotateY(-9deg)]`}
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
          <p className="mt-[6cqw] font-display text-[clamp(0.8rem,10.5cqw,3rem)] leading-[0.92] font-black tracking-[-0.02em] text-balance uppercase">
            {title}
          </p>
          {subtitle ? (
            <p className="mt-[4cqw] font-display text-[clamp(0.6rem,5.2cqw,1.15rem)] leading-snug font-light">
              {subtitle}
            </p>
          ) : null}
          <p className="mt-auto max-w-[70%] font-display text-[clamp(0.45rem,3.6cqw,0.75rem)] font-semibold tracking-[0.16em] uppercase">
            {footer}
          </p>
        </div>
      </div>
    </div>
  );
}
