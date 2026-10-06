import type { StaticImageData } from "next/image";
import acateDallAlto from "@/assets/foto/acate-dall-alto.jpg";
import casaMemoria from "@/assets/foto/casa-memoria-cinisi.jpg";
import castello from "@/assets/foto/castello-dei-principi-di-biscari.jpg";
import radioAut from "@/assets/foto/radio-aut.png";
import stemmaRegione from "@/assets/partner/regione-siciliana.png";

export interface Photo {
  src: StaticImageData;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  /** Pagina della foto su Wikimedia Commons */
  source: string;
  /** Modifiche da dichiarare (licenze CC BY-SA) */
  edited?: string;
}

/**
 * Immagini con licenza libera da Wikimedia Commons: autore, licenza e fonte vanno sempre mostrati
 * accanto all'immagine (componente Photo) e nella pagina /festival#crediti.
 */
export const photos = {
  castello: {
    src: castello,
    alt: "La facciata del Castello dei Principi di Biscari ad Acate, con la torre merlata al sole del pomeriggio.",
    caption: "Il Castello dei Principi di Biscari, ad Acate",
    author: "Antonio Lima",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.it",
    source:
      "https://commons.wikimedia.org/wiki/File:Facciata_sinistra_del_Castello_dei_Principi_di_Biscari_-_Acate.JPG",
  },
  casaMemoria: {
    src: casaMemoria,
    alt: "L'ingresso di Casa Memoria Felicia e Peppino Impastato a Cinisi, con la lapide per Peppino e i manifesti alle pareti.",
    caption: "Casa Memoria Felicia e Peppino Impastato, a Cinisi",
    author: "Davide Mauro",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.it",
    source: "https://commons.wikimedia.org/wiki/File:Casa_Memoria_Felicia_e_Peppino_Impastato.jpg",
    edited: "ritagliata",
  },
  acateDallAlto: {
    src: acateDallAlto,
    alt: "Acate vista dall'alto: il centro disegnato a scacchiera, circondato da campagne e serre.",
    caption: "Acate vista dall'alto",
    author: "Ra Boe / Wikipedia",
    license: "CC BY-SA 3.0 DE",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.it",
    source: "https://commons.wikimedia.org/wiki/File:Luftaufnahmen_Flug_Hamburg_Malta_2019_by-RaBoe_134.jpg",
    edited: "ritagliata, contrasto aumentato",
  },
  radioAut: {
    src: radioAut,
    alt: "Il cartellone di Radio Aut: «giornale di controinformazione radiodiffuso, 98.800 MHz».",
    caption: "Il cartellone di Radio Aut, la radio libera di Peppino Impastato",
    author: "Andre86",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.it",
    source: "https://commons.wikimedia.org/wiki/File:Radio_Aut.png",
  },
  /** Nel footer, accanto alla dicitura del finanziamento regionale */
  stemmaRegione: {
    src: stemmaRegione,
    alt: "Stemma della Regione Siciliana",
    caption: "Lo stemma della Regione Siciliana",
    author: "Dmytrosk2024",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.it",
    source: "https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_Sicily_(president_website).svg",
    edited: "colori adattati, contorno aggiunto",
  },
} satisfies Record<string, Photo>;
