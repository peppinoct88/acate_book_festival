import { Calendar, MapPin } from "./icons";
import { googleCalendarUrl } from "@/lib/calendar";
import { mapsUrl } from "@/lib/format";
import { venues } from "@/content/venues";
import type { Session } from "@/content/types";

export function CalendarActions({ session, compact = false }: { session: Session; compact?: boolean }) {
  const pill =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 font-display text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream";
  return (
    <div className="flex flex-wrap gap-2" data-no-print>
      <a
        href={`/calendario/${session.id}.ics`}
        download
        className={pill}
        data-track="calendar_add"
        data-track-location="scheda-ics"
        data-track-label={session.id}
      >
        <Calendar size={17} /> Aggiungi al calendario
        <span className="visually-hidden"> (file .ics per Apple, Outlook e altri)</span>
      </a>
      <a
        href={googleCalendarUrl(session)}
        target="_blank"
        rel="noopener"
        className={pill}
        data-track="calendar_add"
        data-track-location="scheda-google"
        data-track-label={session.id}
      >
        Google Calendar<span className="visually-hidden"> (nuova scheda)</span>
      </a>
      {!compact ? (
        <a
          href={mapsUrl(venues[session.venue].mapQuery)}
          target="_blank"
          rel="noopener"
          className={pill}
          data-track="map_open"
          data-track-location="scheda"
          data-track-label={session.venue}
        >
          <MapPin size={17} /> Portami lì<span className="visually-hidden"> (Google Maps, nuova scheda)</span>
        </a>
      ) : null}
    </div>
  );
}
