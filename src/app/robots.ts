import type { MetadataRoute } from "next";
import { siteUrl } from "@/site";

// Bij een statische export wordt dit bestand één keer gemaakt, tijdens de build.
export const dynamic = "force-static";

/**
 * Wat zoekmachines wel en niet mogen indexeren.
 *
 * Het beheerpaneel hoort niet in Google: die pagina's zijn voor bestuur en
 * trainers, niet voor bezoekers. DEMO_NOINDEX=1 zet de hele site op slot —
 * dat is voor de voorbeeldversie met verzonnen data.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.DEMO_NOINDEX === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/nl/admin", "/tr/admin", "/en/admin"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
