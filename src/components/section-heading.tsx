import type { ReactNode } from "react";

/**
 * Titolo di sezione nello stile del manifesto: parola piena (nero) + parola leggera (light),
 * con l'occhiello «— —» sopra.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  light,
  intro,
  tone = "dark",
  as: Tag = "h2",
  className = "",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  light?: string;
  intro?: ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}) {
  const eyebrowColor = tone === "dark" ? "text-ink" : "text-teal-soft";
  const textColor = tone === "dark" ? "text-ink" : "text-cream";
  return (
    <div className={className}>
      {eyebrow ? <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p> : null}
      <Tag id={id} className={`mt-5 font-display text-headline ${textColor} ${Tag === "h1" ? "" : ""}`}>
        <span className="font-black">{title}</span>
        {light ? (
          <>
            {" "}
            <span className="font-light">{light}</span>
          </>
        ) : null}
      </Tag>
      {intro ? (
        <div
          className={`mt-6 max-w-[60ch] font-serif text-lg leading-relaxed sm:text-xl ${tone === "dark" ? "text-ink/85" : "text-cream/90"}`}
        >
          {intro}
        </div>
      ) : null}
      {children}
    </div>
  );
}
