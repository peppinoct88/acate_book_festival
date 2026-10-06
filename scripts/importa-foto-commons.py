#!/usr/bin/env python3
"""Importa foto con licenza libera da Wikimedia Commons, con i dati per i crediti.

Gira su GitHub Actions (workflow «Importa foto da Wikimedia Commons»), che ha accesso a Commons.
  MODALITA=elenco   VOCI="Category:Acate"            elenca file e sottocategorie con licenza e dimensioni
  MODALITA=scarica  VOCI="File:Uno.jpg|File:Due.jpg"  scarica in src/assets/foto/commons/ e aggiorna crediti.json
Accetta solo licenze libere (pubblico dominio, CC0, CC BY, CC BY-SA).
"""

import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "AcateBookFestivalSite/1.0 (https://www.acatebookfestival.it)"
OUT = "src/assets/foto/commons"
FREE = re.compile(r"^(cc0|public domain|pd\b|pd-|cc by(-sa)? \d)", re.I)


def get(params):
    query = urllib.parse.urlencode({**params, "format": "json", "formatversion": "2"})
    req = urllib.request.Request(f"{API}?{query}", headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.load(res)


def text(value):
    return html.unescape(re.sub(r"<[^>]+>", "", value or "")).strip()


def meta(page):
    info = page["imageinfo"][0]
    ext = info.get("extmetadata", {})
    field = lambda key: text(ext.get(key, {}).get("value"))
    return {
        "titolo": page["title"],
        "pagina": info.get("descriptionurl", ""),
        "licenza": field("LicenseShortName"),
        "licenzaUrl": field("LicenseUrl"),
        "autore": field("Artist") or field("Credit"),
        "descrizione": field("ImageDescription")[:300],
        "larghezza": info.get("width"),
        "altezza": info.get("height"),
        "mime": info.get("mime"),
        "url": info.get("thumburl") or info.get("url"),
        "originale": info.get("url"),
    }


def files_info(titles, width):
    out = []
    for i in range(0, len(titles), 40):
        data = get(
            {
                "action": "query",
                "titles": "|".join(titles[i : i + 40]),
                "prop": "imageinfo",
                "iiprop": "url|size|mime|extmetadata",
                "iiurlwidth": width,
            }
        )
        out += [meta(p) for p in data["query"]["pages"] if p.get("imageinfo")]
    return out


def category(title, depth=2, seen=None):
    seen = seen if seen is not None else set()
    if title in seen:
        return []
    seen.add(title)
    files, cont = [], {}
    while True:
        data = get(
            {
                "action": "query",
                "list": "categorymembers",
                "cmtitle": title,
                "cmtype": "file|subcat",
                "cmlimit": "500",
                **cont,
            }
        )
        for m in data["query"]["categorymembers"]:
            if m["ns"] == 6:
                files.append(m["title"])
            elif m["ns"] == 14 and depth > 0:
                print(f"  sottocategoria: {m['title']}")
                files += category(m["title"], depth - 1, seen)
        if "continue" not in data:
            return files
        cont = data["continue"]


def slug(title):
    name = title.split(":", 1)[1].rsplit(".", 1)[0]
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:80]


def main():
    mode = os.environ.get("MODALITA", "elenco").strip()
    items = [v.strip() for v in os.environ.get("VOCI", "").split("|") if v.strip()]
    width = int(os.environ.get("LARGHEZZA", "2400") or 2400)
    if not items or any(not re.match(r"^(File|Category):[^/\\]{1,250}$", v) for v in items):
        sys.exit("VOCI deve contenere titoli «File:...» o «Category:...» separati da «|».")

    if mode == "elenco":
        titles = []
        for item in items:
            titles += category(item) if item.startswith("Category:") else [item]
        for m in files_info(sorted(set(titles)), 640):
            print(json.dumps({k: m[k] for k in ("titolo", "licenza", "autore", "larghezza", "altezza", "descrizione")}, ensure_ascii=False))
        return

    os.makedirs(OUT, exist_ok=True)
    credits_path = os.path.join(OUT, "crediti.json")
    credits = json.load(open(credits_path)) if os.path.exists(credits_path) else {}
    for m in files_info(items, width):
        if not FREE.match(m["licenza"]):
            print(f"SALTATO (licenza «{m['licenza']}»): {m['titolo']}")
            continue
        svg = m["mime"] == "image/svg+xml"
        ext = "svg" if svg else ("png" if "png" in (m["mime"] or "") else "jpg")
        name = f"{slug(m['titolo'])}.{ext}"
        url = m["originale"] if svg else m["url"]
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=60) as res:
            data = res.read()
        if len(data) > 25_000_000:
            print(f"SALTATO (troppo grande): {m['titolo']}")
            continue
        with open(os.path.join(OUT, name), "wb") as f:
            f.write(data)
        credits[name] = {k: m[k] for k in ("titolo", "pagina", "licenza", "licenzaUrl", "autore", "descrizione", "larghezza", "altezza")}
        print(f"OK {name} ← {m['titolo']} ({m['licenza']}, {m['autore']})")
    with open(credits_path, "w") as f:
        json.dump(credits, f, ensure_ascii=False, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
