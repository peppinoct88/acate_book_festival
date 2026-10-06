"use client";

import Link from "next/link";
import { buttonClass } from "@/components/button";

/** Errore imprevisto: stesso linguaggio visivo della 404, con la possibilità di riprovare. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="relative container-festival overflow-hidden pt-16 pb-24 sm:pt-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 -right-28 size-64 rounded-full bg-coral/80 sm:size-80"
      />
      <p className="eyebrow relative text-ink">Qualcosa è andato storto</p>
      <h1 className="relative mt-6 max-w-[14ch] font-display text-headline">
        <span className="font-black">Una pagina</span> <span className="font-light">si è strappata.</span>
      </h1>
      <p className="relative mt-6 max-w-[52ch] font-serif text-xl leading-relaxed text-ink/85">
        Riprova tra un attimo. Se il problema continua, il programma completo è sempre raggiungibile.
      </p>
      <div className="relative mt-9 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={buttonClass("primary")}>
          Riprova
        </button>
        <Link href="/programma" className={buttonClass("secondary")}>
          Vai al programma
        </Link>
      </div>
    </section>
  );
}
