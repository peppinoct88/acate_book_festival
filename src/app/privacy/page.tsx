import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy e cookie",
  description:
    "Informativa sul trattamento dei dati personali e sui cookie del sito dell'Acate Book Festival: nessun cookie, nessun banner, statistiche anonime.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const contact = site.contacts.email || site.production.pec;
  return (
    <>
      <PageHero
        eyebrow="Note legali"
        title="Privacy"
        light="e cookie."
        crumbs={[{ name: "Privacy e cookie" }]}
        intro="In breve: questo sito non usa cookie, non salva nulla sul tuo dispositivo, non ti chiede dati personali e misura le visite solo in forma anonima e aggregata."
      />
      <div className="container-festival">
        <div className="prose-festival">
          <h2>Chi tratta i dati</h2>
          <p>
            Il sito è gestito da {site.production.name}, {site.production.address}, P.IVA{" "}
            {site.production.vat}, organizzatrice dell&apos;Acate Book Festival promosso dal{" "}
            {site.organizer.name}. Per qualsiasi richiesta sui tuoi dati puoi scrivere a{" "}
            <a href={`mailto:${contact}`}>{contact}</a>.
          </p>

          <h2>Quali dati raccogliamo</h2>
          <ul>
            <li>
              <strong>Dati di navigazione.</strong> Come ogni sito, i server del fornitore di hosting (Vercel
              Inc.) registrano dati tecnici come l&apos;indirizzo IP e il tipo di browser, necessari per
              mostrare le pagine e proteggerle da abusi. Sono conservati per il tempo strettamente necessario.
            </li>
            <li>
              <strong>Statistiche anonime.</strong> Usiamo Vercel Web Analytics e Speed Insights per sapere
              quante persone visitano le pagine e quanto sono veloci. Questi strumenti non usano cookie, non
              ti riconoscono da una visita all&apos;altra e restituiscono solo dati aggregati.
            </li>
            <li>
              <strong>Il cartellino #LaMiaRadice.</strong> Il generatore funziona interamente sul tuo
              dispositivo: il nome che scrivi non viene inviato né salvato da nessuna parte.
            </li>
          </ul>
          <p>
            Il sito non contiene moduli di raccolta dati, mappe incorporate, video di terze parti o pulsanti
            social che ti tracciano. Quando apri un link esterno (Google Maps, Google Calendar, WhatsApp) si
            applicano le informative di quei servizi.
          </p>

          <h2>Cookie</h2>
          <p>
            Il sito non installa cookie, né tecnici né di profilazione, e non salva altre informazioni sul tuo
            dispositivo: anche le statistiche funzionano senza cookie. Non ci sono contenuti di terze parti
            che ne installino, come video di YouTube, mappe o pulsanti dei social: i video del festival sono
            caricati sul sito stesso.
          </p>
          <p>
            Per questo non c&apos;è il banner dei cookie. Secondo le{" "}
            <a
              href="https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876"
              rel="noopener"
              target="_blank"
            >
              linee guida del Garante per la protezione dei dati personali
              <span className="visually-hidden"> (nuova scheda)</span>
            </a>{" "}
            del 10 giugno 2021, il banner serve a chiedere il consenso ai cookie e agli altri strumenti di
            tracciamento diversi da quelli tecnici: qui non ce ne sono, quindi non c&apos;è nessun consenso da
            chiederti.
          </p>

          <h2>Fornitori e trasferimenti</h2>
          <p>
            Vercel Inc. agisce come responsabile del trattamento per l&apos;hosting e le statistiche. Gli
            eventuali trasferimenti di dati verso gli Stati Uniti avvengono nell&apos;ambito dell&apos;EU-U.S.
            Data Privacy Framework e delle clausole contrattuali standard.
          </p>

          <h2>Foto e riprese al festival</h2>
          <p>
            Gli appuntamenti del festival vengono fotografati e ripresi per raccontarli sul sito e sui canali
            del festival. Se non vuoi essere ripreso puoi dirlo al personale dell&apos;accoglienza. Per i
            minori che partecipano al laboratorio di «A colpi di mantice» chiediamo il consenso firmato di un
            genitore.
          </p>

          <h2>I tuoi diritti</h2>
          <p>
            Puoi chiedere in ogni momento l&apos;accesso ai tuoi dati, la rettifica, la cancellazione, la
            limitazione o l&apos;opposizione al trattamento (articoli 15–22 del Regolamento UE 2016/679),
            scrivendo all&apos;indirizzo indicato sopra. Hai anche il diritto di proporre reclamo al Garante
            per la protezione dei dati personali (garanteprivacy.it).
          </p>

          <p className="text-base text-ink-muted">Ultimo aggiornamento: 11 ottobre 2026.</p>
        </div>
      </div>
    </>
  );
}
