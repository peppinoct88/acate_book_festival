import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Apertura delle pagine interne: occhiello, titolo pieno + leggero, introduzione. */
export function PageHero({
  eyebrow,
  title,
  light,
  intro,
  crumbs,
  tone = "cream",
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  light?: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  tone?: "cream" | "ink" | "coral" | "teal";
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const bg =
    tone === "ink"
      ? "bg-ink text-cream"
      : tone === "coral"
        ? "bg-coral text-ink"
        : tone === "teal"
          ? "bg-teal-soft text-ink"
          : "text-ink";
  const muted = tone === "ink" ? "text-cream/90" : "text-ink/85";
  const eyebrowColor = tone === "ink" ? "text-teal-soft" : "text-ink";
  return (
    <section className={`relative overflow-hidden ${bg}`}>
      {tone === "ink" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-10 -right-32 size-[13rem] rounded-full bg-teal/85 sm:-right-28 sm:size-[28rem]"
        />
      ) : tone === "cream" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-16 -right-36 size-[12rem] rounded-full bg-teal/80 sm:top-12 sm:-right-32 sm:size-[24rem]"
        />
      ) : tone === "teal" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-12 -right-32 size-[13rem] rounded-full bg-teal sm:-right-28 sm:size-[26rem]"
        />
      ) : null}
      <div className="relative container-festival pt-8 pb-14 sm:pt-12 sm:pb-20">
        {crumbs ? (
          <Breadcrumbs items={crumbs} tone={tone === "ink" ? "light" : tone === "cream" ? "dark" : "color"} />
        ) : null}
        <div className={`grid gap-10 ${aside ? "lg:grid-cols-[1.3fr_1fr] lg:items-end" : ""}`}>
          <div className={crumbs ? "mt-10 sm:mt-14" : "mt-6 sm:mt-10"}>
            <p className={`eyebrow animate-rise ${eyebrowColor}`}>{eyebrow}</p>
            <h1 className="mt-6 max-w-[16ch] animate-rise font-display text-headline [animation-delay:80ms]">
              <span className="font-black">{title}</span>
              {light ? (
                light.length > 28 ? (
                  <span className="mt-2 block text-title font-light">{light}</span>
                ) : (
                  <>
                    {" "}
                    <span className="font-light">{light}</span>
                  </>
                )
              ) : null}
            </h1>
            {intro ? (
              <div
                className={`mt-7 max-w-[60ch] animate-rise font-serif text-lg leading-relaxed [animation-delay:160ms] sm:text-xl ${muted}`}
              >
                {intro}
              </div>
            ) : null}
            {children ? <div className="mt-8 animate-rise [animation-delay:220ms]">{children}</div> : null}
          </div>
          {aside ? <div className="relative">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
