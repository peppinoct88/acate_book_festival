import Link from "next/link";
import { Bookshelf } from "@/components/bookshelf";
import { buttonClass } from "@/components/button";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative container-festival overflow-hidden pt-16 pb-10 sm:pt-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-24 size-72 rounded-full bg-teal/80 sm:size-96"
      />
      <p className="eyebrow relative text-ink">Errore 404</p>
      <h1 className="relative mt-6 max-w-[14ch] font-display text-headline">
        <span className="font-black">Questa pagina</span>{" "}
        <span className="font-light">non ha messo radici.</span>
      </h1>
      <p className="relative mt-6 max-w-[52ch] font-serif text-xl leading-relaxed text-ink/85">
        Forse il link è sbagliato, o la pagina è stata spostata. Il programma, invece, è sempre al suo posto.
      </p>
      <div className="relative mt-9 flex flex-wrap gap-3">
        <Link href="/programma" className={buttonClass("primary")}>
          Vai al programma <ArrowRight size={18} />
        </Link>
        <Link href="/" className={buttonClass("secondary")}>
          Torna alla home
        </Link>
      </div>
      <Bookshelf className="mt-16" seed={404} height={56} />
    </section>
  );
}
