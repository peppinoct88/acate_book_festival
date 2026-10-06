#!/usr/bin/env python3
"""Cerca e scarica le copertine originali dei libri degli ospiti, per ISBN.

Gira su GitHub Actions (workflow «Importa copertine dei libri»): dalle sessioni cloud i cataloghi
delle librerie non sono raggiungibili. Legge scripts/copertine.json (slug, titolo, autore, ISBN noti),
trova altri ISBN con Google Books, Open Library e la ricerca di IBS, e prova le immagini di IBS,
laFeltrinelli, Google Books e Open Library. Salva i candidati in copertine-candidati/ con un report:
la scelta finale (e il ritaglio in src/assets/copertine/) si fa a mano, guardandoli.
"""

import io
import json
import os
import re
import sys
import urllib.parse
import urllib.request

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
OUT = "copertine-candidati"
LIBRI = "scripts/copertine.json"


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "it-IT,it;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            data = res.read()
            return data if binary else data.decode("utf-8", "replace")
    except Exception as error:  # noqa: BLE001 — un catalogo che non risponde non ferma gli altri
        print(f"    ! {url}: {error}")
        return None


def isbn13(value):
    digits = re.sub(r"[^0-9X]", "", value.upper())
    return digits if len(digits) == 13 and digits.startswith(("978", "979")) else None


def titolo_principale(libro):
    """Il titolo senza sottotitolo: «L'opera-orologio. Saggi sul Gattopardo» → «L'opera-orologio»"""
    return re.split(r"[.:]", libro["titolo"])[0]


def google_books(libro):
    query = f'intitle:"{titolo_principale(libro)}" inauthor:{libro["autore"].split()[-1]}'
    url = "https://www.googleapis.com/books/v1/volumes?" + urllib.parse.urlencode(
        {"q": query, "maxResults": 10, "printType": "books"}
    )
    data = fetch(url)
    trovati = []
    for item in json.loads(data).get("items", []) if data else []:
        info = item.get("volumeInfo", {})
        isbns = [isbn13(i["identifier"]) for i in info.get("industryIdentifiers", [])]
        immagine = (info.get("imageLinks") or {}).get("thumbnail")
        trovati.append(
            {
                "titolo": info.get("title"),
                "editore": info.get("publisher"),
                "anno": info.get("publishedDate"),
                "isbn": [i for i in isbns if i],
                "immagine": immagine.replace("zoom=1", "zoom=0").replace("&edge=curl", "") + "&fife=w1000"
                if immagine
                else None,
            }
        )
    return trovati


def open_library(libro):
    url = "https://openlibrary.org/search.json?" + urllib.parse.urlencode(
        {"title": titolo_principale(libro), "author": libro["autore"].split()[-1], "limit": 5}
    )
    data = fetch(url)
    isbns = []
    for doc in json.loads(data).get("docs", []) if data else []:
        isbns += [i for i in map(isbn13, doc.get("isbn", [])) if i]
    return isbns


def ibs_search(libro):
    url = "https://www.ibs.it/search/?" + urllib.parse.urlencode(
        {"ts": "as", "query": f'{libro["titolo"]} {libro["autore"]}'}
    )
    page = fetch(url) or ""
    return list(dict.fromkeys(re.findall(r"/e/(97[89]\d{10})", page)))[:6]


def immagini_per_isbn(isbn):
    """Per ogni catalogo le misure dalla più grande: si tiene la prima che risponde."""
    for host in ("www.ibs.it", "www.lafeltrinelli.it"):
        sizes = ("0_0_1200_75", "0_1200_0_75", "0_536_0_75")
        yield host.removeprefix("www."), [f"https://{host}/images/{isbn}_{size}.jpg" for size in sizes]
    yield "openlibrary", [f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg?default=false"]


def salva(slug, etichetta, url, report):
    data = fetch(url, binary=True)
    if not data or len(data) < 3000:
        return False
    try:
        from PIL import Image

        image = Image.open(io.BytesIO(data))
        image.load()
    except Exception as error:  # noqa: BLE001
        print(f"    ! non è un'immagine: {url} ({error})")
        return False
    if image.width < 200 or image.height < 280:
        return False
    nome = re.sub(r"[^a-z0-9-]+", "-", f"{slug}--{etichetta}".lower())[:120] + ".jpg"
    image.convert("RGB").save(os.path.join(OUT, nome), quality=92)
    report.append(f"| {slug} | {etichetta} | {image.width}×{image.height} | {url} |")
    print(f"    + {nome} {image.width}x{image.height}")
    return True


def main():
    os.makedirs(OUT, exist_ok=True)
    libri = json.load(open(LIBRI, encoding="utf-8"))
    report = ["| libro | fonte | misure | url |", "| --- | --- | --- | --- |"]
    note = []
    for libro in libri:
        slug = libro["slug"]
        print(f"\n== {slug}")
        isbns = [i for i in map(isbn13, libro.get("isbn", [])) if i]
        trovati = google_books(libro)
        for t in trovati:
            note.append(f"- {slug}: Google Books «{t['titolo']}» {t['editore']} {t['anno']} ISBN {t['isbn']}")
            isbns += t["isbn"]
        isbns += open_library(libro)
        isbns += ibs_search(libro)
        isbns = list(dict.fromkeys(isbns))[:8]
        print(f"   ISBN: {isbns}")
        note.append(f"- {slug}: ISBN provati {isbns}")
        for isbn in isbns:
            for fonte, urls in immagini_per_isbn(isbn):
                for url in urls:
                    if salva(slug, f"{isbn}-{fonte}", url, report):
                        break
        for i, t in enumerate(trovati[:3]):
            if t["immagine"]:
                salva(slug, f"google-{i}-{'-'.join(t['isbn'][:1]) or 'x'}", t["immagine"], report)
    with open(os.path.join(OUT, "report.md"), "w", encoding="utf-8") as f:
        f.write("# Copertine candidate\n\n" + "\n".join(report) + "\n\n## Note\n\n" + "\n".join(note) + "\n")
    print("\n".join(report))
    return 0


if __name__ == "__main__":
    sys.exit(main())
