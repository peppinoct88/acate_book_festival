#!/usr/bin/env python3
"""Cerca e scarica le copertine originali dei libri degli ospiti, per ISBN.

Gira su GitHub Actions (workflow «Importa copertine dei libri»): dalle sessioni cloud i cataloghi
delle librerie non sono raggiungibili. Legge scripts/copertine.json: per ogni libro gli ISBN (immagini
di IBS, laFeltrinelli e Open Library), le pagine di editori o recensioni (og:image) e gli elenchi in cui
cercare il link del libro (pagina dell'autore, catalogo dell'editore). Salva i candidati in
copertine-candidati/ con un report: la scelta finale (e il ritaglio in src/assets/copertine/) si fa
a mano, guardandoli.
"""

import io
import json
import os
import re
import ssl
import sys
import urllib.error
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
    except urllib.error.URLError as error:
        # alcuni server di copertine non mandano il certificato intermedio: solo per le immagini
        # (che poi si guardano una per una prima di usarle) si riprova senza verificare la catena
        if binary and isinstance(error.reason, ssl.SSLCertVerificationError):
            print(f"    ~ {url}: certificato incompleto, scarico senza verifica (controllare a vista)")
            with urllib.request.urlopen(req, timeout=30, context=ssl._create_unverified_context()) as res:
                return res.read()
        print(f"    ! {url}: {error}")
        return None
    except Exception as error:  # noqa: BLE001 — un catalogo che non risponde non ferma gli altri
        print(f"    ! {url}: {error}")
        return None


def isbn13(value):
    digits = re.sub(r"[^0-9X]", "", value.upper())
    return digits if len(digits) == 13 and digits.startswith(("978", "979")) else None


def og_image(url):
    """L'immagine di anteprima (og:image) di una pagina: per editori e recensioni è la copertina."""
    page = fetch(url) or ""
    found = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)', page) or re.search(
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image', page
    )
    return urllib.parse.urljoin(url, found.group(1)) if found else None


def da_elenco(pagina, parola):
    """ISBN e pagine dei libri linkati da un elenco (pagina dell'autore, catalogo) che contengono la parola."""
    page = fetch(pagina) or ""
    links = {urllib.parse.urljoin(pagina, h) for h in re.findall(r'href=["\']([^"\']+)', page) if parola in h.lower()}
    isbns = [m for link in links for m in re.findall(r"(97[89]\d{10})", link)]
    return list(dict.fromkeys(isbns)), sorted(links)[:5]


def google_books(isbn):
    """Copertina di Google Books per ISBN, nella misura più grande che concede."""
    data = fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
    for item in json.loads(data).get("items", []) if data else []:
        link = (item.get("volumeInfo", {}).get("imageLinks") or {}).get("thumbnail")
        if link:
            link = link.replace("http://", "https://").replace("&edge=curl", "")
            return [link.replace("zoom=1", "zoom=0") + "&fife=w1200", link]
    return []


def immagini_per_isbn(isbn):
    """Per ogni catalogo le misure dalla più grande: si tiene la prima che risponde."""
    for host in ("www.ibs.it", "www.lafeltrinelli.it"):
        sizes = ("0_0_1200_75", "0_1200_0_75", "0_536_0_75")
        yield host.removeprefix("www."), [f"https://{host}/images/{isbn}_{size}.jpg" for size in sizes]
    yield "openlibrary", [f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg?default=false"]
    yield "googlebooks", google_books(isbn)


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
    solo = {x.strip() for x in os.environ.get("SOLO", "").split(",") if x.strip()}
    for libro in libri:
        slug = libro["slug"]
        if solo and slug not in solo:
            continue
        print(f"\n== {slug}")
        isbns = [i for i in map(isbn13, libro.get("isbn", [])) if i]
        pagine = list(libro.get("pagine", []))
        for elenco in libro.get("elenchi", []):
            trovati, links = da_elenco(elenco["pagina"], elenco["parola"])
            note.append(f"- {slug}: da {elenco['pagina']} ISBN {trovati}, pagine {links}")
            isbns += trovati
            pagine += [link for link in links if not re.search(r"97[89]\d{10}", link)]
        isbns = list(dict.fromkeys(isbns))[:6]
        note.append(f"- {slug}: ISBN provati {isbns}")
        for isbn in isbns:
            for fonte, urls in immagini_per_isbn(isbn):
                for url in urls:
                    if salva(slug, f"{isbn}-{fonte}", url, report):
                        break
        for i, pagina in enumerate(pagine):
            immagine = og_image(pagina)
            note.append(f"- {slug}: og:image di {pagina} → {immagine}")
            if immagine:
                salva(slug, f"pagina-{i}", immagine, report)
    with open(os.path.join(OUT, "report.md"), "w", encoding="utf-8") as f:
        f.write("# Copertine candidate\n\n" + "\n".join(report) + "\n\n## Note\n\n" + "\n".join(note) + "\n")
    print("\n".join(report))
    return 0


if __name__ == "__main__":
    sys.exit(main())
