import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RadiceCardGenerator } from "@/components/radice-card-generator";
import { KraftTag } from "@/components/kraft-tag";
import { ShareActions } from "@/components/share-actions";
import { Camera, Phone, Sparkle, Tree } from "@/components/icons";
import { absoluteUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "#LaMiaRadice",
  description:
    "Chi ti ha messo in mano il primo libro? Scrivi il suo nome, crea il cartellino #LaMiaRadice e tagga quella persona. L'idea dell'Acate Book Festival.",
  path: "/lamiaradice",
  socialTitle: "#LaMiaRadice · Chi ti ha messo in mano il primo libro?",
  ownImage: true,
});

const classics = [
  "I promessi sposi",
  "Pinocchio",
  "I Malavoglia",
  "Il fu Mattia Pascal",
  "La Divina Commedia",
  "Cuore",
];

export default function LaMiaRadicePage() {
  const handle = site.social.instagramHandle;
  return (
    <>
      <PageHero
        tone="coral"
        eyebrow={site.hashtag}
        title="Chi ti ha messo in mano"
        light="il primo libro?"
        crumbs={[{ name: "#LaMiaRadice" }]}
        intro={
          <p>
            Una nonna, una maestra, un padre, un&apos;amica: ogni lettore ha una radice. Scrivi il suo nome,
            fotografalo e <strong>taggalo con {site.hashtag}</strong>
            {handle ? (
              <>
                {" "}
                e <strong>@{handle}</strong>
              </>
            ) : null}
            . Chi viene taggato scopre di essere stato la radice di qualcuno, e il festival viaggia sui
            profili di tutti.
          </p>
        }
        aside={
          <div className="hidden justify-center pt-10 lg:flex">
            <KraftTag name="la maestra Lucia" rotate={5} />
          </div>
        }
      />

      <section aria-labelledby="crea-cartellino" className="container-festival pt-16 sm:pt-24">
        <p className="eyebrow text-ink">Il tuo cartellino</p>
        <h2 id="crea-cartellino" className="mt-4 font-display text-title">
          <span className="font-black">Crealo qui,</span>{" "}
          <span className="font-light">pubblicalo ovunque</span>
        </h2>
        <div className="mt-10">
          <RadiceCardGenerator hashtag={site.hashtag} />
        </div>
      </section>

      <section aria-labelledby="albero" className="container-festival pt-24">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.75rem] bg-paper p-7 lg:col-span-2">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-teal-soft">
              <Tree size={24} />
            </span>
            <h2 id="albero" className="mt-5 font-display text-title">
              <span className="font-black">L&apos;Albero</span>{" "}
              <span className="font-light">delle radici</span>
            </h2>
            <div className="prose-festival mt-5">
              <p>
                Alla Villa dei lettori c&apos;è un albero che aspetta i vostri nomi. Prendi un cartellino
                kraft, scrivi chi ti ha messo in mano il primo libro, appendilo ai rami, fotografalo e tagga
                quella persona.
              </p>
              <p>
                Si accende venerdì 16 alle 17:40, quando i bambini appendono i primi nomi, e cresce per tre
                giorni. Ricorda l&apos;albero davanti alla casa di Peppino Impastato a Cinisi, dove i
                visitatori lasciano le loro dediche.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[1.75rem] bg-ink p-7 text-cream">
            <div>
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-coral text-ink">
                <Sparkle size={24} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-black">I riconoscimenti</h2>
              <p className="mt-3 font-serif leading-relaxed text-cream/90">
                Domenica 18 alle 18:50, durante il rito della luce, le storie {site.hashtag} più belle
                ricevono le copie autografate dagli autori del festival. Nessuna estrazione a sorte: le storie
                le sceglie il festival.
              </p>
            </div>
            <Link
              href="/programma/rito-della-luce"
              className="mt-6 inline-flex font-display font-semibold text-teal-soft underline underline-offset-4"
            >
              Il rito della luce
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="indovina" className="container-festival pt-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.75rem] bg-teal-soft p-7 lg:col-span-2">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-cream">
              <Phone size={24} />
            </span>
            <h2 id="indovina" className="mt-5 font-display text-title">
              <span className="font-black">Indovina</span> <span className="font-light">il classico</span>
            </h2>
            <div className="prose-festival mt-5">
              <p>
                I nonni di Acate leggono in siciliano l&apos;incipit di un grande classico, senza dire il
                titolo. Tu scrivi la risposta nei commenti dei video del festival. E alla Villa dei lettori
                c&apos;è un angolo con luce e telefono: chi vuole legge il suo incipit e diventa un video del
                festival.
              </p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {classics.map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-cream px-3.5 py-1.5 font-display text-sm font-semibold"
                >
                  «{c}»
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border-2 border-ink/85 p-7">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-paper">
              <Camera size={24} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-black">Poche regole</h2>
            <ul className="mt-4 space-y-3 text-[0.98rem] leading-snug text-ink/85">
              <li>Usa {site.hashtag} e tagga la tua radice: è tutto quello che serve.</li>
              <li>Se nella foto ci sono bambini, pubblicala solo con il consenso dei genitori.</li>
              <li>
                Tra un evento e l&apos;altro il ledwall del palco mostra le foto pubblicate con {site.hashtag}
                .
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-festival pt-16">
        <div className="flex flex-col items-start gap-5 rounded-[1.75rem] bg-paper p-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-bold">Fai girare la domanda.</p>
          <ShareActions
            title="#LaMiaRadice · Acate Book Festival"
            text="Chi ti ha messo in mano il primo libro? Crea il tuo cartellino #LaMiaRadice:"
            url={absoluteUrl("/lamiaradice")}
          />
        </div>
      </section>
    </>
  );
}
