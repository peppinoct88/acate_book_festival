import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dichiarazione di accessibilità",
  description:
    "Come abbiamo reso accessibile il sito dell'Acate Book Festival (WCAG 2.2 livello AA) e come segnalarci un problema.",
  path: "/accessibilita",
});

export default function AccessibilityPage() {
  const contact = site.contacts.email || site.production.pec;
  return (
    <>
      <PageHero
        eyebrow="Per tutti"
        title="Accessibilità"
        light="del sito."
        crumbs={[{ name: "Accessibilità" }]}
        intro="Vogliamo che chiunque possa consultare il programma del festival: da tastiera, con un lettore di schermo, ingrandendo il testo o da un telefono piccolo."
      />
      <div className="container-festival">
        <div className="prose-festival">
          <h2>Obiettivo</h2>
          <p>
            Il sito è progettato per rispettare le Linee guida per l&apos;accessibilità dei contenuti web{" "}
            <strong>WCAG 2.2 al livello AA</strong>, il riferimento della norma europea EN 301 549.
          </p>

          <h2>Cosa abbiamo fatto</h2>
          <ul>
            <li>
              Struttura con titoli in ordine, punti di riferimento (intestazione, navigazione, contenuto) e un
              collegamento per saltare al contenuto.
            </li>
            <li>
              Tutte le funzioni sono usabili da tastiera, con il focus sempre visibile e mai nascosto
              dall&apos;intestazione.
            </li>
            <li>
              Contrasto dei testi verificato: almeno 4,5:1 per il testo normale e 3:1 per quello grande e per
              i controlli.
            </li>
            <li>
              Il programma è testo vero, non un&apos;immagine: luoghi ed età sono scritti, non affidati solo
              ai colori.
            </li>
            <li>
              Le immagini hanno un testo alternativo; quelle decorative sono ignorate dai lettori di schermo.
            </li>
            <li>Le pagine si adattano fino a 320 pixel di larghezza e allo zoom al 200%.</li>
            <li>
              Le animazioni si disattivano se nel dispositivo è attiva la preferenza «riduci movimento».
            </li>
            <li>Aree cliccabili di almeno 24×24 pixel, spesso 44×44.</li>
          </ul>

          <h2>Come lo verifichiamo</h2>
          <p>
            A ogni modifica il sito passa test automatici con axe-core su tutte le pagine e verifiche manuali
            da tastiera e con lettore di schermo.
          </p>

          <h2>Limiti noti</h2>
          <ul>
            <li>
              Il manifesto scaricabile è un&apos;immagine: tutte le informazioni che contiene sono riportate
              come testo nelle pagine del sito.
            </li>
            <li>
              Il cartellino #LaMiaRadice è un&apos;immagine generata sul momento: il suo testo alternativo si
              aggiorna con quello che scrivi.
            </li>
          </ul>

          <h2>Segnalaci un problema</h2>
          <p>
            Se trovi un contenuto che non riesci a usare, scrivi a <a href={`mailto:${contact}`}>{contact}</a>
            : rispondiamo e, se serve, ti mandiamo le informazioni in un altro formato.
          </p>
          <p className="text-base text-ink-muted">Dichiarazione redatta il 6 ottobre 2026.</p>
        </div>
      </div>
    </>
  );
}
