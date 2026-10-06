"use client";

import { useEffect } from "react";
import { currentTime } from "@/lib/now";

const SOON_MS = 45 * 60 * 1000;

/**
 * Segna gli appuntamenti [data-session] «In corso» o «Tra poco» durante il festival.
 * Aggiorna ogni 30 secondi. Non cambia nulla prima e dopo le date del festival.
 */
export function LiveStatus() {
  useEffect(() => {
    const update = () => {
      const now = currentTime();
      document.querySelectorAll<HTMLElement>("[data-session]").forEach((el) => {
        const start = Date.parse(el.dataset.start ?? "");
        const end = Date.parse(el.dataset.end ?? "");
        const badge = el.querySelector<HTMLElement>("[data-live-badge]");
        let state: "now" | "soon" | "" = "";
        if (now >= start && now < end) state = "now";
        else if (start > now && start - now <= SOON_MS) state = "soon";
        if (state) el.dataset.live = state;
        else delete el.dataset.live;
        if (badge) {
          badge.hidden = !state;
          badge.textContent = state === "now" ? "● In corso" : state === "soon" ? "Tra poco" : "";
        }
      });
    };
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return null;
}
