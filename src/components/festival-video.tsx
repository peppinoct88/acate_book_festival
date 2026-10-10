"use client";

import { track } from "@vercel/analytics";
import { useRef, useState, useSyncExternalStore } from "react";
import { Play } from "./icons";
import type { FestivalVideo as Video } from "@/content/videos";

const subscribe = () => () => {};

/**
 * Un video verticale del festival (content/videos.ts), ospitato sul sito. Non parte da solo: ha la voce.
 * Sulla copertina un tasto «Guarda il video»; dopo il primo play restano i controlli del browser.
 * preload="none": finché non si preme play non si scarica nulla. Senza JavaScript il tasto non c'è
 * e il video ha subito i controlli del browser.
 */
export function FestivalVideo({ video, trackLabel }: { video: Video; trackLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const showCover = hydrated && !started;

  function start() {
    setStarted(true);
    track("video_play", { label: trackLabel });
    // se il browser non riesce a partire restano i controlli, con cui riprovare
    ref.current?.play().catch(() => {});
  }

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_30px_60px_-30px_rgb(7_42_95/0.6)]">
      <video
        ref={ref}
        width={video.width}
        height={video.height}
        poster={video.poster}
        preload="none"
        playsInline
        controls={!showCover}
        aria-label={video.title}
        onPlay={() => setStarted(true)}
        className="block aspect-[9/16] h-auto w-full"
        data-video={trackLabel}
      >
        {video.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        <p className="p-6 text-cream">
          Il browser non riesce a mostrare il video: <a href={video.sources[0].src}>scaricalo qui</a>.
        </p>
      </video>
      {showCover ? (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 flex items-end justify-center pb-[9%]"
        >
          {/* su due righe: entra anche nel video largo 288px dei telefoni da 320px */}
          <span className="inline-flex items-center gap-3 rounded-full bg-coral py-2 pr-6 pl-2 text-left font-display text-ink shadow-[0_12px_30px_-10px_rgb(7_42_95/0.7)] transition-transform duration-300 ease-soft group-hover:scale-105">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
              <Play size={20} />
            </span>
            <span className="leading-tight">
              <span className="block font-bold">Guarda il video</span>
              <span className="block text-sm font-semibold">{video.durationLabel}, con l&apos;audio</span>
            </span>
          </span>
        </button>
      ) : null}
    </div>
  );
}
