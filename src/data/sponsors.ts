import type { GalleryAlbum, Sponsor } from "./types";

/**
 * Sponsornamen overgenomen uit de bestaande testsite. Logo's ontbreken nog —
 * zolang `logo` leeg is toont de site de naam in een merkkader.
 */
export const sponsors: Sponsor[] = [
  { id: "sp-1", name: "Dalga Vis & Food", tier: "main" },
  { id: "sp-2", name: "Alu Men — Ramen & Deuren", tier: "main" },
  { id: "sp-3", name: "PVM Ramen & Deuren", tier: "main" },
  { id: "sp-4", name: "voetbalshop.be", tier: "partner" },
  { id: "sp-5", name: "JAKO", tier: "partner" },
  { id: "sp-6", name: "Sport Vlaanderen", tier: "partner" },
  { id: "sp-7", name: "Cristal", tier: "supporting" },
  { id: "sp-8", name: "Coca-Cola", tier: "supporting" },
  { id: "sp-9", name: "Bakkerij Waterschei", tier: "supporting" },
  { id: "sp-10", name: "Garage Hoevenzavel", tier: "supporting" },
];

export function sponsorsByTier(tier: Sponsor["tier"]): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier);
}

/**
 * Fotoalbums. Alleen echte clubfoto's — geen verzonnen albumtitels bij beeld
 * dat er nog niet is. De galerijpagina toont vanzelf meer zodra de club nieuwe
 * foto's aanlevert; tot dan blijft dit album klein en klopt het wel.
 *
 * Voor de jeugdfoto's heeft de club schriftelijke toestemming van de ouders.
 */
export const albums: GalleryAlbum[] = [
  {
    slug: "clubfotos",
    date: "2026-08-01",
    title: {
      nl: "Clubfoto's",
      tr: "Kulüp fotoğrafları",
      en: "Club photos",
    },
    photos: [
      {
        src: "/images/jeugd-groepsfoto-klein.jpg",
        alt: {
          nl: "Alle jeugdploegen samen op de Vural Soylu-tribune",
          tr: "Vural Soylu tribününde toplanan bütün altyapı takımları",
          en: "All youth teams together in the Vural Soylu stand",
        },
      },
      {
        src: "/images/terrein-tribune-klein.jpg",
        alt: {
          nl: "Het terrein aan Anfield met de Vural Soylu-tribune",
          tr: "Anfield sahası ve Vural Soylu tribünü",
          en: "The Anfield pitch and the Vural Soylu stand",
        },
      },
    ],
  },
];

export function albumBySlug(slug: string): GalleryAlbum | undefined {
  return albums.find((a) => a.slug === slug);
}

export const allPhotos = albums.flatMap((album) =>
  album.photos.map((photo) => ({ ...photo, album: album.slug })),
);
