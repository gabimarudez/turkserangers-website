import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/site";
import { news } from "@/data/news";
import { teams } from "@/data/teams";

// Bij een statische export wordt dit bestand één keer gemaakt, tijdens de build.
export const dynamic = "force-static";

/**
 * De sitemap die Google ophaalt: elke pagina, in elke taal.
 *
 * Per adres staan ook de andere talen vermeld (`alternates.languages`). Zo
 * begrijpt Google dat /nl/club, /tr/club en /en/club dezelfde pagina zijn en
 * toont het de bezoeker de versie in zijn eigen taal, in plaats van de drie
 * als concurrenten van elkaar te behandelen.
 */

/** Vaste pagina's, met hoe belangrijk ze zijn voor de vindbaarheid. */
const staticPaths: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "club", priority: 0.8 },
  { path: "teams", priority: 0.8 },
  { path: "jeugdopleiding", priority: 0.8 },
  { path: "wedstrijden", priority: 0.7 },
  { path: "nieuws", priority: 0.7 },
  { path: "fotogalerij", priority: 0.6 },
  { path: "sponsors", priority: 0.6 },
  { path: "contact", priority: 0.7 },
  { path: "clubreglement", priority: 0.3 },
  { path: "privacy", priority: 0.3 },
  { path: "cookies", priority: 0.3 },
];

function url(locale: string, path: string) {
  return `${siteUrl}/${locale}${path ? `/${path}` : ""}/`;
}

function entry(path: string, priority: number, lastModified?: string) {
  return locales.map((locale) => ({
    url: url(locale, path),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, url(l, path)])),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.flatMap(({ path, priority }) => entry(path, priority)),
    ...teams.flatMap((team) => entry(`teams/${team.slug}`, 0.6)),
    ...news.flatMap((article) =>
      entry(`nieuws/${article.slug}`, 0.5, article.publishedAt),
    ),
  ];
}
