"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Piano eventi (Vercel Web Analytics, senza cookie).
 * Basta aggiungere a un link o a un bottone:
 *   data-track="calendar_add" data-track-location="hero" data-track-label="festival"
 * Tutti gli attributi data-track-* diventano proprietà dell'evento. Il piano Pro di Vercel ne accetta
 * al massimo 2 (di solito location e label); la pagina dell'evento la registra già Vercel.
 *
 * Eventi in uso: cta_click · calendar_add · map_open · content_download ·
 * share_click · lamiaradice_card · program_filter · menu_open
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      const name = target.dataset.track;
      if (!name) return;
      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(target.dataset)) {
        if (key.startsWith("track") && key !== "track" && value) {
          const prop = key.slice(5).replace(/^./, (c) => c.toLowerCase());
          props[prop] = value;
        }
      }
      track(name, props);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
