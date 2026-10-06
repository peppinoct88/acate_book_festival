import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ink" | "ghost" | "light";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 font-display text-[0.95rem] font-semibold leading-tight tracking-[0.01em] transition-[transform,background-color,color,box-shadow] duration-200 ease-soft active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  // Corallo con testo ink: 4.6:1 (al passaggio il corallo schiarisce e il contrasto sale)
  primary:
    "bg-coral text-ink shadow-[0_1px_0_rgb(7_42_95/0.25),0_8px_20px_-8px_rgb(255_94_62/0.7)] hover:-translate-y-0.5 hover:bg-[#ff735f] hover:shadow-[0_1px_0_rgb(7_42_95/0.25),0_14px_28px_-10px_rgb(255_94_62/0.8)]",
  secondary: "border-2 border-ink/85 text-ink hover:-translate-y-0.5 hover:bg-ink hover:text-cream",
  ink: "bg-ink text-cream hover:-translate-y-0.5 hover:bg-navy",
  ghost: "text-ink underline-offset-4 hover:underline px-2",
  light: "border-2 border-cream/80 text-cream hover:-translate-y-0.5 hover:bg-cream hover:text-ink",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
};

export function ButtonLink({
  variant = "primary",
  className = "",
  icon,
  iconPosition = "end",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {icon && iconPosition === "start" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>
      ) : null}
    </Link>
  );
}
