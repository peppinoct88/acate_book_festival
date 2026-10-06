"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Close, Menu } from "./icons";
import { isActivePath } from "./nav-links";
import type { NavItem } from "@/content/navigation";
import { site } from "@/content/site";

/**
 * Menu mobile su <dialog> nativo: focus trap, Esc e sfondo inerte gratis dal browser.
 * Il focus torna al pulsante alla chiusura.
 */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const titleId = useId();

  const close = useCallback(() => dialogRef.current?.close(), []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    track("menu_open");
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Chiude il menu quando cambia pagina
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink/85 px-4 font-display text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream xl:hidden"
      >
        <Menu size={18} />
        <span>Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="group/menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-ink p-0 text-cream opacity-0 transition-[opacity,transform,overlay,display] transition-discrete duration-300 ease-soft backdrop:bg-ink/40 open:opacity-100 xl:hidden starting:open:opacity-0"
      >
        <div className="relative isolate flex min-h-full flex-col overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-teal/90 sm:size-96"
          />
          <div className="container-festival flex h-[4.25rem] items-center justify-between sm:h-20">
            <p id={titleId} className="eyebrow text-cream">
              Menu
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-4 font-display text-sm font-semibold text-ink"
            >
              <Close size={18} />
              <span>Chiudi</span>
            </button>
          </div>

          <nav aria-label="Menu principale" className="container-festival flex-1 pt-6 pb-10">
            <ul className="space-y-1">
              {items.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li
                    key={item.href}
                    className="translate-y-3 opacity-0 transition duration-500 ease-soft group-open/menu:translate-y-0 group-open/menu:opacity-100 starting:group-open/menu:translate-y-3 starting:group-open/menu:opacity-0"
                    style={{ transitionDelay: `${80 + index * 45}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline justify-between gap-4 border-b border-cream/15 py-4"
                    >
                      <span className="font-display text-[clamp(2rem,9vw,3.25rem)] leading-none font-black tracking-[-0.03em] uppercase transition-colors group-hover:text-coral group-aria-[current=page]:text-coral">
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="hidden max-w-[16rem] text-right text-sm text-teal-soft sm:block">
                          {item.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="container-festival pb-10">
            <p className="font-display text-sm font-semibold tracking-[0.22em] text-cream uppercase">
              16 <span className="text-coral">/</span> 17 <span className="text-coral">/</span> 18 ottobre
              2026
            </p>
            <p className="mt-2 text-sm text-teal-soft">{site.place.label} · Ingresso libero</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
