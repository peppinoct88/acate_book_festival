import type { MetadataRoute } from "next";
import { guests } from "@/content/guests";
import { days } from "@/content/venues";
import { pagedActivities, programUpdatedAt } from "@/content/program";
import { absoluteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${programUpdatedAt}T12:00:00+02:00`);
  const pages: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/programma", priority: 0.95, changeFrequency: "daily" },
    { path: "/ospiti", priority: 0.8, changeFrequency: "weekly" },
    { path: "/famiglie", priority: 0.8, changeFrequency: "weekly" },
    { path: "/mostra-peppino-impastato", priority: 0.8, changeFrequency: "weekly" },
    { path: "/lamiaradice", priority: 0.8, changeFrequency: "weekly" },
    { path: "/festival", priority: 0.7, changeFrequency: "weekly" },
    { path: "/info", priority: 0.8, changeFrequency: "weekly" },
    { path: "/adesso", priority: 0.5, changeFrequency: "daily" },
    { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
    { path: "/accessibilita", priority: 0.2, changeFrequency: "monthly" },
  ];

  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...days.map((d) => ({
      url: absoluteUrl(`/giornate/${d.slug}`),
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...pagedActivities.map((a) => ({
      url: absoluteUrl(`/programma/${a.slug}`),
      lastModified,
      changeFrequency: "daily" as const,
      priority: a.featured ? 0.9 : 0.7,
    })),
    ...guests.map((g) => ({
      url: absoluteUrl(`/ospiti/${g.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
