#!/usr/bin/env python3
"""Svela (o nasconde di nuovo) un autore: aggiorna src/content/svelati.json.

Gira nel workflow GitHub «Svela un autore» (AUTORE = nome scelto, AZIONE = svela | nascondi);
il commit fa partire la pubblicazione su Vercel. Vedi src/content/reveal.ts.
"""

import json
import os
import sys

FILE = "src/content/svelati.json"
AUTORI = {
    "Giovanni Impastato": "giovanni-impastato",
    "Antonella Desirée Giuffrè": "antonella-desiree-giuffre",
    "Maria Antonietta Ferraloro": "maria-antonietta-ferraloro",
}


def main():
    scelta = os.environ["AUTORE"]
    azione = os.environ.get("AZIONE", "svela")
    nomi = list(AUTORI) if scelta == "Tutti e tre" else [scelta]
    slugs = [AUTORI[nome] for nome in nomi]
    with open(FILE, encoding="utf-8") as f:
        data = json.load(f)
    svelati = [s for s in data["svelati"] if s not in slugs]
    if azione == "svela":
        svelati += slugs
    ordine = list(AUTORI.values())
    data["svelati"] = sorted(set(svelati), key=ordine.index)
    with open(FILE, "w", encoding="utf-8") as f:
        # come lo scrive Prettier (npm run check controlla anche questo file): l'elenco su una riga
        f.write('{\n  "svelati": ' + json.dumps(data["svelati"], ensure_ascii=False) + "\n}\n")
    verbo = "Svelato" if azione == "svela" else "Di nuovo segreto"
    with open(os.environ.get("MESSAGGIO", "/tmp/messaggio"), "w", encoding="utf-8") as f:
        f.write(f"{verbo}: {', '.join(nomi)}\n\nAutori svelati sul sito: {', '.join(data['svelati']) or 'nessuno'}.\n")
    print(f"{verbo}: {', '.join(nomi)} → svelati {data['svelati']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
