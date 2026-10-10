/**
 * I video promozionali del festival, realizzati dall'organizzazione (docs/fonti.md).
 * File in public/video/, ospitati sul sito: niente YouTube, quindi niente cookie di terze parti.
 * Verticali 9:16, ricompressi per il web a 720×1280: MP4 (H.264 + AAC, «faststart») per tutti i browser e WebM
 * (VP9 + Opus) per quelli senza H.264, come il Chromium dei test:
 *   ffmpeg -i originale.mp4 -vf scale=720:1280 -c:v libx264 -preset slow -crf 24 -c:a aac -b:a 128k -ar 48000 \
 *     -movflags +faststart public/video/nome.mp4
 *   ffmpeg -i originale.mp4 -vf scale=720:1280 -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -c:a libopus -b:a 96k \
 *     public/video/nome.webm
 * Copertina: un fotogramma a 720×1280 (stesso nome, .jpg). Le scritte sono già nel video; `transcript` è il testo
 * completo, parlato e scritto, che la pagina mostra sotto il video per chi non può ascoltare.
 */
export type FestivalVideo = {
  title: string;
  description: string;
  /** MP4 per primo: il browser prende il primo formato che sa leggere */
  sources: { src: string; type: "video/mp4" | "video/webm" }[];
  poster: string;
  width: number;
  height: number;
  /** ISO 8601, per i dati strutturati */
  duration: string;
  durationLabel: string;
  uploadDate: string;
  transcript: string[];
};

export const spotVideo: FestivalVideo = {
  title: "Acate Book Festival 2026 in 30 secondi",
  description:
    "Lo spot della prima edizione: l'inaugurazione con la banda e i tamburi, gli autori sul Palco del Castello, il teatro e le letture per i bambini.",
  sources: [
    { src: "/video/acate-book-festival-2026-spot.mp4", type: "video/mp4" },
    { src: "/video/acate-book-festival-2026-spot.webm", type: "video/webm" },
  ],
  poster: "/video/acate-book-festival-2026-spot.jpg",
  width: 720,
  height: 1280,
  duration: "PT30S",
  durationLabel: "30 secondi",
  uploadDate: "2026-10-10",
  transcript: [
    "Nasce l'Acate Book Festival. Si inaugura venerdì 16 ottobre con la Banda Città di Acate e i tamburi dei Grifoni di Biscari.",
    "Fino a domenica, sul Palco del Castello, tre autori incontrano il pubblico: Giovanni Impastato, scrittore e testimone; Antonella Desirée Giuffrè, scrittrice; Maria Antonietta Ferraloro, docente e saggista.",
    "C'è anche il teatro, in collaborazione con l'Associazione Santa Briganti, e ci sono letture per i bambini. La partecipazione è gratuita: vi aspettiamo!",
    "Acate Book Festival, I edizione: 16, 17 e 18 ottobre 2026, nel centro storico di Acate. acatebookfestival.it",
  ],
};
