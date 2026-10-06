import Link from "next/link";
import { Alert, ArrowRight, Info } from "./icons";
import { NoticeExpiry } from "./notice-expiry";
import { notices } from "@/content/notices";

// Istante della build: gli avvisi già scaduti non finiscono nell'HTML
const BUILD_TIME = Date.now();

/** Avvisi in cima alle pagine (maltempo, spostamenti). Si gestiscono da src/content/notices.ts */
export function NoticeBanner() {
  const active = notices.filter((n) => !n.until || new Date(n.until).getTime() > BUILD_TIME);
  if (active.length === 0) return null;
  return (
    <div role="region" aria-label="Avvisi">
      {active.map((notice) => {
        const Icon = notice.tone === "alert" ? Alert : Info;
        return (
          <NoticeExpiry key={notice.id} until={notice.until}>
            <div className={notice.tone === "alert" ? "bg-coral text-ink" : "bg-teal-light text-ink"}>
              <div className="container-festival flex flex-wrap items-center gap-x-4 gap-y-1 py-3 font-display text-[0.95rem] font-semibold">
                <Icon size={20} />
                <p className="flex-1">{notice.text}</p>
                {notice.href ? (
                  <Link
                    href={notice.href}
                    className="inline-flex items-center gap-1.5 underline underline-offset-4"
                  >
                    {notice.linkLabel ?? "Dettagli"} <ArrowRight size={16} />
                  </Link>
                ) : null}
              </div>
            </div>
          </NoticeExpiry>
        );
      })}
    </div>
  );
}
