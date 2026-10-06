import type { FestivalDay } from "@/content/types";

/**
 * I colori delle tre giornate, presi dal manifesto. Ogni combinazione testo/fondo è AA:
 * cream su ink 13.3:1 · ink su coral 4.6:1 (mai ink con opacità sul corallo) · cream su teal-deep 5.9:1.
 */
export const dayTones: Record<
  FestivalDay["tone"],
  {
    surface: string;
    text: string;
    soft: string;
    eyebrow: string;
    sun: string;
    chip: string;
    rule: string;
    venue: "dark" | "light";
    button: "primary" | "ink" | "light";
  }
> = {
  ink: {
    surface: "bg-ink",
    text: "text-cream",
    soft: "text-cream/90",
    eyebrow: "text-teal-soft",
    sun: "bg-teal",
    chip: "bg-cream text-ink",
    rule: "border-cream/20",
    venue: "light",
    button: "primary",
  },
  coral: {
    surface: "bg-coral",
    text: "text-ink",
    soft: "text-ink",
    eyebrow: "text-ink",
    sun: "bg-ochre",
    chip: "bg-ink text-cream",
    rule: "border-ink/25",
    venue: "dark",
    button: "ink",
  },
  teal: {
    surface: "bg-teal-deep",
    text: "text-cream",
    soft: "text-cream/90",
    eyebrow: "text-teal-soft",
    sun: "bg-coral",
    chip: "bg-cream text-ink",
    rule: "border-cream/20",
    venue: "light",
    button: "light",
  },
};
