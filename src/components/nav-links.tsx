"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/navigation";

export function isActivePath(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="relative inline-flex min-h-11 items-center rounded-full px-3.5 font-display text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink/[0.06] aria-[current=page]:text-coral-deep"
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full bg-coral transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
