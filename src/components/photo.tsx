import Image from "next/image";
import type { Photo as PhotoData } from "@/content/photos";

/** Riga dei crediti: autore, licenza e fonte, come chiedono le licenze Creative Commons. */
export function PhotoCredit({ photo, tone = "dark" }: { photo: PhotoData; tone?: "dark" | "light" }) {
  const link = "underline decoration-1 underline-offset-2 hover:decoration-2";
  return (
    <span className={tone === "dark" ? "text-ink-muted" : "text-cream/80"}>
      Foto: {photo.author} ·{" "}
      <a href={photo.licenseUrl} rel="license noopener" target="_blank" className={link}>
        {photo.license}
        <span className="visually-hidden"> (licenza, nuova scheda)</span>
      </a>{" "}
      ·{" "}
      <a href={photo.source} rel="noopener" target="_blank" className={link}>
        Wikimedia Commons<span className="visually-hidden"> (nuova scheda)</span>
      </a>
      {photo.edited ? ` · ${photo.edited}` : null}
    </span>
  );
}

/** Foto con didascalia e crediti. */
export function Photo({
  photo,
  sizes,
  className = "",
  imageClassName = "",
  tone = "dark",
  priority = false,
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  imageClassName?: string;
  tone?: "dark" | "light";
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <Image
        src={photo.src}
        alt={photo.alt}
        sizes={sizes}
        placeholder={photo.src.blurDataURL ? "blur" : "empty"}
        loading={priority ? "eager" : "lazy"}
        className={`h-auto w-full rounded-[1.5rem] object-cover ${imageClassName}`}
      />
      <figcaption className="mt-3 text-sm leading-snug">
        <span className={`block font-display font-semibold ${tone === "dark" ? "text-ink" : "text-cream"}`}>
          {photo.caption}
        </span>
        <PhotoCredit photo={photo} tone={tone} />
      </figcaption>
    </figure>
  );
}
