import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { NowNext, type NowNextSession } from "@/components/now-next";
import { ArrowRight } from "@/components/icons";
import { buttonClass } from "@/components/button";
import { sessions } from "@/content/program";
import { daysById, venues } from "@/content/venues";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Adesso al festival",
  description:
    "Cosa c'è adesso e cosa comincia tra poco all'Acate Book Festival: il programma in tempo reale, da consultare sul posto.",
  path: "/adesso",
  ownImage: true,
});

export default function NowPage() {
  const list: NowNextSession[] = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    kicker: s.activity.kicker && s.title === s.activity.title ? s.activity.kicker : undefined,
    start: s.start,
    end: s.end,
    startISO: s.startISO,
    endISO: s.endISO,
    date: daysById.get(s.day)!.date,
    dayLabel: daysById.get(s.day)!.label,
    venue: venues[s.venue].name,
    venueId: s.venue,
    href: s.href,
    audience: s.audience.label,
  }));

  return (
    <>
      <PageHero
        eyebrow="In tempo reale"
        title="Adesso"
        light="al festival."
        crumbs={[{ name: "Adesso" }]}
        intro="Sei ad Acate? Questa pagina ti dice cosa sta succedendo e cosa comincia tra poco, tra il Palco del Castello e la Villa dei lettori."
      />
      <div className="container-festival">
        <NowNext sessions={list} />
        <div className="mt-14 flex flex-wrap gap-3 border-t border-ink/12 pt-10">
          <Link href="/programma" className={buttonClass("ink")}>
            Il programma completo <ArrowRight size={18} />
          </Link>
          <Link href="/info#luoghi" className={buttonClass("secondary")}>
            Dove sono i due luoghi
          </Link>
        </div>
      </div>
    </>
  );
}
