import Image from "next/image";
import { BookCover } from "./book-cover";
import { guestName } from "@/content/guests";
import type { Guest } from "@/content/types";

const initialsTone: Record<Guest["tone"], string> = {
  coral: "bg-coral text-ink",
  teal: "bg-teal-light text-ink",
  ink: "bg-ink text-cream",
  paper: "bg-paper text-ink",
};

/**
 * Ritratto dell'ospite con il suo libro (la copertina nei colori della giornata, «ogni ospite è un libro»);
 * per i gruppi il logo su fondo blu; se manca la foto, solo la copertina (o, in formato avatar, le iniziali).
 */
export function GuestVisual({
  guest,
  sizes,
  className = "",
  priority = false,
  variant = "card",
}: {
  guest: Guest;
  sizes: string;
  className?: string;
  priority?: boolean;
  variant?: "card" | "avatar";
}) {
  if (variant === "avatar") {
    const box = `flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl ${className}`;
    if (guest.photo) {
      return (
        <div className={box}>
          <Image src={guest.photo} alt="" sizes={sizes} className="h-full w-full object-cover" />
        </div>
      );
    }
    if (guest.logo) {
      return (
        <div className={`${box} bg-ink p-[14%]`}>
          <Image src={guest.logo} alt="" sizes={sizes} className="h-full w-full object-contain" />
        </div>
      );
    }
    return (
      <div
        aria-hidden="true"
        className={`${box} font-display text-xl font-black ${initialsTone[guest.tone]}`}
      >
        {guest.initials}
      </div>
    );
  }
  if (guest.photo) {
    return (
      <div className={`relative pb-[12%] ${className}`}>
        <div className="overflow-hidden rounded-[1.25rem] bg-paper">
          <Image
            src={guest.photo}
            alt={`Ritratto di ${guest.name}`}
            sizes={sizes}
            placeholder="blur"
            loading={priority ? "eager" : "lazy"}
            className="aspect-[3/4] h-auto w-full object-cover"
          />
        </div>
        {/* il libro dell'ospite, nei colori della sua giornata: entra quando la scheda appare
            (.book-pop in globals.css) e si apre quando ci passi sopra */}
        <BookCover
          title={guestName(guest)}
          subtitle={guest.role}
          tone={guest.tone}
          className="book-pop absolute bottom-0 left-[6%] w-[40%] -rotate-6 transition-[rotate,translate] duration-500 ease-soft group-hover:-translate-y-2 group-hover:-rotate-9"
        />
      </div>
    );
  }
  if (guest.logo) {
    return (
      <div
        className={`flex aspect-[3/4] items-center justify-center rounded-[1.25rem] bg-ink p-[16%] ${className}`}
      >
        <Image src={guest.logo} alt="" sizes={sizes} className="h-auto max-h-full w-full object-contain" />
      </div>
    );
  }
  return (
    <BookCover
      title={guestName(guest)}
      subtitle={guest.role}
      tone={guest.tone}
      className={`w-full ${className}`}
    />
  );
}
