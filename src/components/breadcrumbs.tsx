import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  /** dark: su crema · color: su corallo/turchese · light: su indaco */
  tone?: "dark" | "color" | "light";
}) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Percorso" className="pt-2">
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-sm font-semibold ${tone === "dark" ? "text-ink-muted" : tone === "color" ? "text-ink" : "text-cream/80"}`}
      >
        {all.map((item, index) => {
          const last = index === all.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="inline-flex min-h-6 items-center hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={tone === "light" ? "text-cream" : "text-ink"}
                >
                  {item.name}
                </span>
              )}
              {!last ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
