"use client";

import { Printer } from "./icons";

export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer size={18} /> Stampa il programma
    </button>
  );
}
