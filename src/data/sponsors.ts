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

/** DEMO-DATA — albums zonder echte foto's; de site toont dan een kader. */
export const albums: GalleryAlbum[] = [
  {
    slug: "voorbereiding-2026",
    date: "2026-08-01",
    title: {
      nl: "Voorbereiding 2026-2027",
      tr: "2026-2027 hazırlık dönemi",
      en: "Pre-season 2026-2027",
    },
    photos: [
      { alt: { nl: "Eerste training van het seizoen", tr: "Sezonun ilk antrenmanı", en: "First session of the season" } },
      { alt: { nl: "Loopoefeningen op het hoofdveld", tr: "Ana sahada koşu çalışmaları", en: "Running drills on the main pitch" } },
      { alt: { nl: "Partijvorm tijdens de training", tr: "Antrenmanda çift kale", en: "Small-sided game in training" } },
      { alt: { nl: "Groepsfoto van de A-kern", tr: "A takımı grup fotoğrafı", en: "First team group photo" } },
      { alt: { nl: "Keeperstraining", tr: "Kaleci antrenmanı", en: "Goalkeeping session" } },
      { alt: { nl: "Nabespreking met de staf", tr: "Teknik ekiple değerlendirme", en: "Debrief with the staff" } },
    ],
  },
  {
    slug: "sfeerbeelden-tribune",
    date: "2026-05-24",
    title: {
      nl: "Sfeerbeelden vanop de tribune",
      tr: "Tribünden atmosfer görüntüleri",
      en: "Atmosphere from the stands",
    },
    photos: [
      { alt: { nl: "Sfeeractie met rook", tr: "Dumanla tribün gösterisi", en: "Smoke display in the stands" } },
      { alt: { nl: "Supporters vieren een doelpunt", tr: "Taraftarlar golü kutluyor", en: "Supporters celebrating a goal" } },
      { alt: { nl: "Vlaggen langs het veld", tr: "Saha kenarında bayraklar", en: "Flags along the pitch" } },
      { alt: { nl: "Volle tribune bij de derby", tr: "Derbide dolu tribün", en: "Packed stand for the derby" } },
    ],
  },
  {
    slug: "jeugddag-2026",
    date: "2026-06-14",
    title: {
      nl: "Jeugddag 2026",
      tr: "2026 Altyapı Günü",
      en: "Youth day 2026",
    },
    photos: [
      { alt: { nl: "Jeugdspelers op het veld", tr: "Sahada altyapı oyuncuları", en: "Youth players on the pitch" } },
      { alt: { nl: "Penaltywedstrijd voor de jongsten", tr: "Küçükler için penaltı yarışması", en: "Penalty contest for the youngest" } },
      { alt: { nl: "Medailles voor alle deelnemers", tr: "Tüm katılımcılara madalya", en: "Medals for every participant" } },
      { alt: { nl: "Ouders langs de lijn", tr: "Saha kenarında veliler", en: "Parents on the touchline" } },
      {
        // Echte clubfoto; de rest van dit album wacht nog op beeld.
        src: "/images/jeugd-groepsfoto-klein.jpg",
        alt: { nl: "Groepsfoto van de jeugdwerking", tr: "Altyapı grup fotoğrafı", en: "Youth academy group photo" },
      },
    ],
  },
  {
    slug: "clubarchief",
    date: "2026-01-15",
    title: {
      nl: "Uit het clubarchief",
      tr: "Kulüp arşivinden",
      en: "From the club archive",
    },
    photos: [
      { alt: { nl: "Ploegfoto uit de beginjaren", tr: "İlk yıllardan takım fotoğrafı", en: "Team photo from the early years" } },
      { alt: { nl: "Het oude clubhuis", tr: "Eski kulüp binası", en: "The old clubhouse" } },
      { alt: { nl: "Kampioenenviering", tr: "Şampiyonluk kutlaması", en: "Title celebration" } },
    ],
  },
];

export function albumBySlug(slug: string): GalleryAlbum | undefined {
  return albums.find((a) => a.slug === slug);
}

export const allPhotos = albums.flatMap((album) =>
  album.photos.map((photo) => ({ ...photo, album: album.slug })),
);
