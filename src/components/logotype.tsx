/**
 * Il lettering del manifesto, ricomposto con Outfit:
 * ACATE (corallo, nero) / BOOK (navy, nero) / FESTIVAL (navy, light).
 * Le proporzioni tra le righe sono calibrate sulle larghezze reali dei glifi
 * perché le tre parole abbiano la stessa misura, come nel poster.
 * La dimensione si controlla con il font-size del contenitore (className).
 */
export function Logotype({
  className = "",
  as: Tag = "span",
  tone = "dark",
}: {
  className?: string;
  as?: "span" | "h1" | "p";
  tone?: "dark" | "light";
}) {
  const ink = tone === "dark" ? "text-navy" : "text-cream";
  return (
    <Tag data-logotype className={`block font-display uppercase ${className}`}>
      <span className="block leading-[0.8] font-black tracking-[-0.03em] text-coral">Acate</span>
      <span className={`block text-[1.0985em] leading-[0.8] font-black tracking-[-0.03em] ${ink}`}>Book</span>
      <span className={`block text-[0.803em] leading-[0.92] font-light tracking-[-0.045em] ${ink}`}>
        Festival
      </span>
    </Tag>
  );
}
