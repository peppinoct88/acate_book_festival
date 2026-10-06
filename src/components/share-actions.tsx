"use client";

import { track } from "@vercel/analytics";
import { useState, useSyncExternalStore } from "react";
import { Check, Link as LinkIcon, Share, WhatsApp } from "./icons";

const subscribe = () => () => {};

/**
 * Condivisione: WhatsApp (il canale principale in un piccolo comune), copia link
 * e, dove disponibile, il pannello di condivisione nativo del telefono.
 */
export function ShareActions({
  title,
  url,
  text,
  tone = "dark",
}: {
  title: string;
  url: string;
  text?: string;
  /** dark: su fondo chiaro · light: su fondo scuro */
  tone?: "dark" | "light";
}) {
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(
    subscribe,
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );
  const message = text ?? title;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("share_click", { channel: "copia_link", label: url });
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copia il link", url);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: message, url });
      track("share_click", { channel: "nativo", label: url });
    } catch {
      /* annullato dall'utente */
    }
  };

  const pill = `inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-display text-sm font-semibold transition-colors ${
    tone === "dark"
      ? "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream"
      : "border-cream/50 text-cream hover:border-cream hover:bg-cream hover:text-ink"
  }`;

  return (
    <div className="flex flex-wrap items-center gap-2" data-no-print>
      {canShare ? (
        <button type="button" onClick={nativeShare} className={pill}>
          <Share size={17} /> Condividi
        </button>
      ) : null}
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener"
        onClick={() => track("share_click", { channel: "whatsapp", label: url })}
        className={pill}
      >
        <WhatsApp size={17} /> WhatsApp<span className="visually-hidden"> (nuova scheda)</span>
      </a>
      <button type="button" onClick={copy} className={pill} aria-live="polite">
        {copied ? <Check size={17} /> : <LinkIcon size={17} />}
        {copied ? "Link copiato" : "Copia link"}
      </button>
    </div>
  );
}
