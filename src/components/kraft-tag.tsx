/** Il cartellino kraft dell'Albero delle radici, disegnato in CSS. Decorativo. */
export function KraftTag({
  name = "nonna Rosa",
  className = "",
  rotate = -4,
}: {
  name?: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-[17rem] select-none sm:w-[19rem] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* spago */}
      <span className="absolute -top-16 left-[3.1rem] h-20 w-px origin-bottom rotate-[8deg] bg-ink/60" />
      <div
        className="relative rounded-[0.6rem] bg-[#d9b98a] px-7 pt-12 pb-7 text-ink shadow-[0_22px_40px_-20px_rgb(30_21_74/0.6)]"
        style={{
          clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%, 0 18%)",
          backgroundImage:
            "radial-gradient(rgb(30 21 74 / 0.06) 1px, transparent 1px), radial-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px)",
          backgroundSize: "7px 7px, 11px 11px",
        }}
      >
        <span className="absolute top-5 left-[2.6rem] size-4 rounded-full bg-cream ring-[3px] ring-[#b8935e]" />
        <p className="font-display text-[0.8rem] font-semibold tracking-[0.18em] uppercase">
          La mia radice di lettore è
        </p>
        <p className="mt-3 border-b-2 border-dashed border-ink/40 pb-2 font-serif text-[1.65rem] leading-tight">
          {name}
        </p>
        <p className="mt-4 font-display text-sm font-black">#LaMiaRadice</p>
        <p className="font-display text-xs font-semibold opacity-80">Acate Book Festival · 2026</p>
      </div>
    </div>
  );
}
