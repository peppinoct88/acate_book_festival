import Image, { type StaticImageData } from "next/image";

/**
 * Un libro: la copertina originale (image, da src/content/covers.ts) oppure una copertina disegnata
 * in CSS nei colori del manifesto, per gli ospiti («ogni ospite è un libro») e per i titoli senza immagine.
 * I libri si muovono anche sul telefono: girano un poco mentre la pagina scorre (.book-turn in globals.css)
 * e si aprono al passaggio del mouse o al tocco.
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

/** Il libro si apre un poco al passaggio del mouse e, sul telefono, al tocco */
const open =
  "transition-transform duration-500 ease-soft [transform:perspective(900px)_rotateY(0deg)] group-hover:[transform:perspective(900px)_rotateY(-12deg)] group-active:[transform:perspective(900px)_rotateY(-12deg)]";

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
  image,
  sizes = "16rem",
}: {
  title: string;
  subtitle?: string;
  footer?: string;
  tone?: Tone;
  className?: string;
  /** Copertina originale: se c'è, il libro la mostra al posto di quella disegnata */
  image?: StaticImageData;
  sizes?: string;
}) {
  const t = tones[tone];
  if (image) {
    // alta come una copertina disegnata (3:4), larga quanto vuole la copertina: in fila i libri hanno
    // tutti la stessa altezza, anche accanto a uno disegnato, e nessuna copertina viene tagliata o deformata
    return (
      <div aria-hidden="true" className={`@container ${className}`} data-book-cover>
        <div className="book-turn h-[calc(100cqw*4/3)]">
          <div
            className={`${open} relative h-full max-w-full`}
            style={{ width: `${((400 / 3) * image.width) / image.height}cqw` }}
          >
            {/* il taglio delle pagine, dietro la copertina */}
            <span className="absolute inset-y-[1.5%] -right-[3cqw] w-[6cqw] rounded-r-[0.3rem] bg-[repeating-linear-gradient(180deg,#fffaf0_0_2px,#eadfc6_2px_3px)] shadow-[inset_-1px_0_0_rgb(7_42_95/0.18)]" />
            <Image
              src={image}
              alt=""
              sizes={sizes}
              className="relative block h-full w-full rounded-[0.2rem_0.45rem_0.45rem_0.2rem] object-cover shadow-[0_1px_0_rgb(7_42_95/0.2),0_18px_40px_-22px_rgb(7_42_95/0.6)]"
            />
            {/* dorso e un filo di lucido, come sulla carta patinata */}
            <span className="pointer-events-none absolute inset-y-0 left-0 w-[7cqw] rounded-l-[0.2rem] bg-linear-to-r from-black/30 via-white/12 to-transparent" />
            <span className="pointer-events-none absolute inset-0 rounded-[0.2rem_0.45rem_0.45rem_0.2rem] bg-linear-to-br from-white/18 via-transparent to-black/8" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className={`@container ${className}`} data-book-cover>
      <div className="book-turn">
        <div
          className={`${open} relative isolate aspect-[3/4] overflow-hidden rounded-[0.35rem_1rem_1rem_0.35rem] ${t.bg} ${t.fg} ${t.ring} shadow-[0_1px_0_rgb(7_42_95/0.2),0_18px_40px_-22px_rgb(7_42_95/0.55)]`}
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
    </div>
  );
}
