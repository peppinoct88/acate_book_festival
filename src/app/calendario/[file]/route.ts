import { festivalCalendar, sessionsCalendar } from "@/lib/calendar";
import { sessions, sessionsById } from "@/content/program";
import { site } from "@/content/site";

/**
 * File .ics statici, generati in build:
 * - /calendario/acate-book-festival-2026.ics → «Salva le date» (un blocco per pomeriggio)
 * - /calendario/programma-completo.ics → tutti gli appuntamenti
 * - /calendario/<id-appuntamento>.ics → un singolo appuntamento
 */
export const dynamic = "force-static";
export const dynamicParams = false;

const FESTIVAL_FILE = "acate-book-festival-2026.ics";
const FULL_FILE = "programma-completo.ics";

export function generateStaticParams() {
  return [{ file: FESTIVAL_FILE }, { file: FULL_FILE }, ...sessions.map((s) => ({ file: `${s.id}.ics` }))];
}

export async function GET(_request: Request, { params }: RouteContext<"/calendario/[file]">) {
  const { file } = await params;
  let body: string | null = null;

  if (file === FESTIVAL_FILE) {
    body = festivalCalendar();
  } else if (file === FULL_FILE) {
    body = sessionsCalendar(`${site.name} ${site.year} · Programma`, sessions);
  } else if (file.endsWith(".ics")) {
    const session = sessionsById.get(file.slice(0, -4));
    if (session) body = sessionsCalendar(`${site.name} · ${session.title}`, [session]);
  }

  if (!body) return new Response("Calendario non trovato", { status: 404 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${file}"`,
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
