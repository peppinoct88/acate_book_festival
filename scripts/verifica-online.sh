#!/usr/bin/env bash
# Verifica il sito pubblicato: DNS, HTTPS, redirect, pagine, SEO tecnico, anteprime social, statistiche.
# Uso:            bash scripts/verifica-online.sh [dominio]   (default www.acatebookfestival.it)
# Su GitHub:      Actions → «Verifica sito online» → Run workflow
# Build locale:   SKIP_DNS=1 BASE=http://localhost:3100 bash scripts/verifica-online.sh
set -uo pipefail

HOST="${1:-www.acatebookfestival.it}"
APEX="${HOST#www.}"
CANONICAL="https://$HOST"
BASE="${BASE:-$CANONICAL}"
errors=0

ok() { printf '  ✓ %s\n' "$*"; }
ko() {
  printf '  ✗ %s\n' "$*"
  errors=$((errors + 1))
}
warn() { printf '  ! %s\n' "$*"; }
section() { printf '\n%s\n' "$*"; }

get() { curl -sS -L --max-time 20 "$1" 2>/dev/null; }
# codice HTTP e destinazione del redirect, senza seguirlo
probe() { curl -sS -o /dev/null --max-time 20 -w '%{http_code} %{redirect_url}' "$1" 2>/dev/null; }
header() {
  curl -sS -o /dev/null -D - --max-time 20 "$1" 2>/dev/null | tr -d '\r' |
    awk -v h="$2" 'tolower($0) ~ "^" h ":" { sub(/^[^:]*: */, ""); print; exit }'
}

printf 'Verifica di %s\n' "$BASE"

if [[ -z "${SKIP_DNS:-}" ]]; then
  section "DNS"
  if ! command -v dig >/dev/null; then
    warn "dig non installato: controlli DNS saltati"
  else
    ns=$(dig +short NS "$APEX" | sort | xargs)
    if [[ "$ns" == *.ns.cloudflare.com* ]]; then
      ok "nameserver Cloudflare: $ns"
    else
      ko "nameserver non ancora su Cloudflare: ${ns:-nessuna risposta}"
    fi
    for name in "$APEX" "$HOST"; do
      answer=$(dig +short "$name" | xargs)
      if [[ -z "$answer" ]]; then
        ko "$name non risolve"
      elif [[ "$answer" == *213.186.33.5* ]]; then
        ko "$name punta ancora alla pagina di cortesia di OVH ($answer)"
      else
        ok "$name → $answer"
      fi
    done
    mx=$(dig +short MX "$APEX" | xargs)
    if [[ -n "$mx" ]]; then ok "posta (MX): $mx"; else warn "nessun record MX: la posta @$APEX non arriva"; fi
  fi
fi

section "HTTPS e redirect"
read -r code _ <<<"$(probe "$BASE/")"
if [[ "$code" == 200 ]]; then ok "$BASE/ risponde 200"; else ko "$BASE/ risponde ${code:-errore (certificato o connessione)}"; fi
server=$(header "$BASE/" server)
case "$server" in
  *[Cc]loudflare*) ko "risponde Cloudflare: il record è col proxy attivo (nuvola arancione), va messo «DNS only»" ;;
  *[Vv]ercel*) ok "servito da Vercel" ;;
  *) warn "server: ${server:-non indicato}" ;;
esac
if [[ -n "$(header "$BASE/" strict-transport-security)" ]]; then ok "HSTS attivo"; else ko "manca l'header HSTS"; fi
if [[ -z "${SKIP_DNS:-}" ]]; then
  read -r code location <<<"$(probe "https://$APEX/")"
  if [[ "$code" == 30[178] && "$location" == "$CANONICAL/"* ]]; then
    ok "https://$APEX rimanda a $CANONICAL ($code)"
  else
    ko "https://$APEX non rimanda a $CANONICAL ($code ${location:-})"
  fi
  read -r code location <<<"$(probe "http://$HOST/")"
  if [[ "$code" == 30[178] && "$location" == "https://$HOST/"* ]]; then
    ok "http rimanda a https"
  else
    ko "http://$HOST non rimanda a https ($code ${location:-})"
  fi
fi
for pair in "/qr /adesso" "/mostra /mostra-peppino-impastato" "/mafia /giornate/mafia"; do
  read -r from to <<<"$pair"
  read -r code location <<<"$(probe "$BASE$from")"
  if [[ "$location" == *"$to" ]]; then ok "$from → $to"; else ko "$from non rimanda a $to ($code ${location:-})"; fi
done

section "Pagine"
for path in / /programma /programma/a-colpi-di-mantice /programma/shuma /ospiti /ospiti/banda-citta-di-acate \
  /giornate/mafia /giornate/donne /giornate/immigrazione \
  /famiglie /mostra-peppino-impastato /lamiaradice /festival /info /adesso /privacy /accessibilita; do
  read -r code _ <<<"$(probe "$BASE$path")"
  if [[ "$code" == 200 ]]; then ok "$path"; else ko "$path risponde ${code:-errore}"; fi
done
read -r code _ <<<"$(probe "$BASE/pagina-che-non-esiste")"
if [[ "$code" == 404 ]]; then ok "404 sulle pagine inesistenti"; else ko "una pagina inesistente risponde $code"; fi

section "SEO"
program=$(get "$BASE/programma")
canonical=$(grep -o '<link rel="canonical" href="[^"]*"' <<<"$program" | sed 's/.*href="//; s/"$//')
if [[ "$canonical" == "$CANONICAL/programma" ]]; then ok "canonical $canonical"; else ko "canonical di /programma: ${canonical:-assente}"; fi
if grep -q '<meta name="robots" content="[^"]*noindex' <<<"$program"; then
  ko "le pagine sono noindex (è un deploy di anteprima?)"
else
  ok "pagine indicizzabili"
fi
robots=$(get "$BASE/robots.txt")
if grep -q "Sitemap: $CANONICAL/sitemap.xml" <<<"$robots"; then ok "robots.txt indica la sitemap"; else ko "robots.txt senza $CANONICAL/sitemap.xml"; fi
if grep -qx 'Disallow: /' <<<"$robots"; then ko "robots.txt blocca tutto il sito"; fi
if grep -q "<loc>$CANONICAL/programma</loc>" <<<"$(get "$BASE/sitemap.xml")"; then
  ok "sitemap con gli indirizzi definitivi"
else
  ko "sitemap senza $CANONICAL/programma"
fi
og=$(grep -o '<meta property="og:image" content="[^"]*"' <<<"$(get "$BASE/programma/shuma")" | head -1 | sed 's/.*content="//; s/"$//')
if [[ "$og" == "$CANONICAL/programma/shuma/opengraph-image"* ]]; then
  read -r code type <<<"$(curl -sS -o /dev/null --max-time 20 -w '%{http_code} %{content_type}' "${og/#$CANONICAL/$BASE}")"
  if [[ "$code" == 200 && "$type" == image/png* ]]; then ok "anteprima social dedicata"; else ko "anteprima social: $code $type"; fi
else
  ko "og:image di /programma/shuma: ${og:-assente}"
fi
read -r code type <<<"$(curl -sS -o /dev/null --max-time 20 -w '%{http_code} %{content_type}' "$BASE/calendario/acate-book-festival-2026.ics")"
if [[ "$code" == 200 && "$type" == text/calendar* ]]; then ok "calendario .ics"; else ko "calendario .ics: $code $type"; fi

section "Statistiche Vercel"
for script in insights speed-insights; do
  read -r code _ <<<"$(probe "$BASE/_vercel/$script/script.js")"
  if [[ "$code" == 200 ]]; then ok "$script attivo"; else warn "$script non attivo ($code): va attivato nella dashboard di Vercel"; fi
done

printf '\n'
if ((errors)); then
  printf '%d controlli non superati.\n' "$errors"
  exit 1
fi
printf 'Tutto a posto: il sito è online.\n'
