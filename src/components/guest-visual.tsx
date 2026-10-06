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
 * Ritratto dell'ospite; per i gruppi il logo su fondo blu; se manca la foto, la copertina tipografica
 * (o, in formato avatar, le iniziali).
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
      <div className={`overflow-hidden rounded-[1.25rem] bg-paper ${className}`}>
        <Image
          src={guest.photo}
          alt={`Ritratto di ${guest.name}`}
          sizes={sizes}
          placeholder="blur"
          loading={priority ? "eager" : "lazy"}
          className="aspect-[3/4] h-auto w-full object-cover"
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
