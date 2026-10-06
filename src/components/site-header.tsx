import Link from "next/link";
import { Logotype } from "./logotype";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { HeaderScroll } from "./header-scroll";
import { buttonClass } from "./button";
import { mainNav, programNav } from "@/content/navigation";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header
      data-site-header
      className="group/header sticky top-0 z-50 border-b border-transparent bg-cream transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:border-ink/10 data-[scrolled=true]:bg-cream/92 data-[scrolled=true]:shadow-[0_10px_30px_-22px_rgb(7_42_95/0.45)] data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="container-festival flex h-[4.25rem] items-center justify-between gap-4 transition-[height] duration-300 sm:h-20 group-data-[scrolled=true]/header:sm:h-16">
        <Link
          href="/"
          aria-label={`${site.name} – Home`}
          className="-m-2 rounded-lg p-2 transition-opacity hover:opacity-85"
        >
          <Logotype className="text-[15px] sm:text-[17px]" />
        </Link>

        <nav aria-label="Principale" className="hidden xl:block">
          <NavLinks items={mainNav} />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={programNav.href}
            data-track="cta_click"
            data-track-location="header"
            data-track-label="programma"
            className={buttonClass("primary", "min-h-11 px-5 text-sm sm:px-6 sm:text-[0.95rem]")}
          >
            {programNav.label}
          </Link>
          <MobileMenu items={[programNav, ...mainNav]} />
        </div>
      </div>
      <HeaderScroll />
    </header>
  );
}
