#!/usr/bin/env python3
"""Apre le pagine delle fonti e ne stampa il testo utile, per controllarle prima di pubblicare un fatto.

Gira su GitHub Actions (workflow «Leggi le fonti»): dalle sessioni cloud i siti esterni non sono
raggiungibili. Per ogni indirizzo in URLS stampa titolo, descrizione e anteprima social, poi i passaggi del
testo che contengono le PAROLE cercate (senza distinguere maiuscole), con un po' di contesto intorno.
Un indirizzo di ricerca (per esempio https://html.duckduckgo.com/html/?q=...) stampa i risultati.
"""

import html
import os
import re
import sys
import urllib.error
import urllib.request

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
CONTESTO = 260
MASSIMO = 30


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "it-IT,it;q=0.9"})
    with urllib.request.urlopen(req, timeout=30) as res:
        charset = res.headers.get_content_charset() or "utf-8"
        return res.status, res.geturl(), res.read().decode(charset, "replace")


def meta(page, name):
    found = re.search(
        rf'<meta[^>]+(?:property|name)=["\']{re.escape(name)}["\'][^>]+content=["\']([^"\']*)', page, re.I
    ) or re.search(rf'<meta[^>]+content=["\']([^"\']*)["\'][^>]+(?:property|name)=["\']{re.escape(name)}', page, re.I)
    return html.unescape(found.group(1)).strip() if found else ""


def testo(page):
    page = re.sub(r"(?is)<(script|style|noscript|svg|template)\b.*?</\1>", " ", page)
    page = re.sub(r"(?s)<!--.*?-->", " ", page)
    page = re.sub(r"(?i)<(br|/p|/div|/li|/h[1-6]|/tr)\b[^>]*>", "\n", page)
    page = re.sub(r"<[^>]+>", " ", page)
    page = html.unescape(page)
    page = re.sub(r"[ \t\r\f\v]+", " ", page)
    return re.sub(r"\n\s*\n+", "\n", page).strip()


def main():
    urls = [u for u in os.environ.get("URLS", "").split() if u.startswith("http")]
    parole = [p.strip() for p in os.environ.get("PAROLE", "").split(",") if p.strip()]
    for url in urls:
        print("\n" + "=" * 100 + f"\n{url}")
        try:
            status, final, page = fetch(url)
        except urllib.error.HTTPError as error:
            print(f"  ! HTTP {error.code}")
            continue
        except Exception as error:  # noqa: BLE001 — una fonte che non risponde non ferma le altre
            print(f"  ! {error}")
            continue
        title = re.search(r"(?is)<title[^>]*>(.*?)</title>", page)
        print(f"  stato {status} · {final}")
        print(f"  titolo: {html.unescape(title.group(1)).strip() if title else ''}")
        for name in ("description", "og:title", "og:description", "article:published_time", "og:image"):
            value = meta(page, name)
            if value:
                print(f"  {name}: {value[:400]}")
        body = testo(page)
        print(f"  testo: {len(body)} caratteri")
        if "duckduckgo" in url:
            print(body[:6000])
            continue
        trovati = 0
        ultimo = -1
        for match in re.finditer("|".join(re.escape(p) for p in parole) or r"$^", body, re.I):
            if match.start() < ultimo:
                continue
            start, end = max(0, match.start() - CONTESTO), min(len(body), match.end() + CONTESTO)
            print(f"  … {body[start:end].replace(chr(10), ' / ')} …")
            ultimo = end
            trovati += 1
            if trovati >= MASSIMO:
                print("  (altri passaggi omessi)")
                break
        if not trovati:
            print(f"  inizio del testo: {body[:1500].replace(chr(10), ' / ')}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
