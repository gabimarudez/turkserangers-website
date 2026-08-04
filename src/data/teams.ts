import type { Localized, Team } from "./types";

const day = {
  mon: { nl: "Maandag", tr: "Pazartesi", en: "Monday" },
  tue: { nl: "Dinsdag", tr: "Salı", en: "Tuesday" },
  wed: { nl: "Woensdag", tr: "Çarşamba", en: "Wednesday" },
  thu: { nl: "Donderdag", tr: "Perşembe", en: "Thursday" },
  fri: { nl: "Vrijdag", tr: "Cuma", en: "Friday" },
  sat: { nl: "Zaterdag", tr: "Cumartesi", en: "Saturday" },
} satisfies Record<string, Localized>;

/** Bouwt een jeugdploeg; scheelt veel herhaling voor dertien teams. */
function youthTeam(
  age: number,
  order: number,
  trainingDays: Localized[],
  time: string,
): Team {
  const label = `U${age}`;
  return {
    slug: label.toLowerCase(),
    name: label,
    category: "youth",
    league: {
      nl: age <= 9 ? `${label} — Gewestelijk` : `${label} — Provinciaal`,
      tr: age <= 9 ? `${label} — Bölgesel` : `${label} — Eyalet ligi`,
      en: age <= 9 ? `${label} — Regional` : `${label} — Provincial`,
    },
    description: {
      nl: `Onze ${label}-ploeg. Plezier, techniek en samenspel staan centraal.`,
      tr: `${label} takımımız. Merkezde eğlence, teknik ve takım oyunu var.`,
      en: `Our ${label} side. Enjoyment, technique and teamwork come first.`,
    },
    coachIds: ["coach-y1"],
    trainingTimes: trainingDays.map((d) => ({ day: d, time })),
    order,
  };
}

export const teams: Team[] = [
  {
    slug: "a-kern",
    name: "A-kern",
    category: "first",
    league: {
      nl: "1e Provinciale A",
      tr: "1. Eyalet Ligi A",
      en: "Provincial Division 1A",
    },
    description: {
      nl: "Het eerste elftal van FC Turkse Rangers, actief in de hoogste provinciale reeks van Limburg.",
      tr: "FC Turkse Rangers'ın A takımı, Limburg'un en üst eyalet ligindeki mücadelesini sürdürüyor.",
      en: "The first team of FC Turkse Rangers, competing in the highest provincial division in Limburg.",
    },
    coachIds: ["coach-a1", "coach-a2", "coach-gk"],
    trainingTimes: [
      { day: day.tue, time: "19:30 — 21:00" },
      { day: day.thu, time: "19:30 — 21:00" },
    ],
    order: 1,
  },
  {
    slug: "b-kern",
    name: "B-kern",
    category: "first",
    league: {
      nl: "3e Provinciale",
      tr: "3. Eyalet Ligi",
      en: "Provincial Division 3",
    },
    description: {
      nl: "De B-kern vormt de brug tussen de jeugdopleiding en het eerste elftal.",
      tr: "B takımı, altyapı ile A takımı arasındaki köprüyü oluşturur.",
      en: "The B team bridges the gap between the youth academy and the first team.",
    },
    coachIds: ["coach-b1"],
    trainingTimes: [
      { day: day.mon, time: "19:30 — 21:00" },
      { day: day.wed, time: "19:30 — 21:00" },
    ],
    order: 2,
  },
  {
    slug: "reserven",
    name: "Reserven",
    category: "first",
    league: {
      nl: "Reservecompetitie",
      tr: "Rezerv ligi",
      en: "Reserve league",
    },
    description: {
      nl: "Onze reserveploeg speelt wekelijks en houdt de brede kern wedstrijdfit.",
      tr: "Rezerv takımımız haftalık maçlarla geniş kadronun form tutmasını sağlar.",
      en: "Our reserve side plays weekly and keeps the wider squad match fit.",
    },
    coachIds: ["coach-b1"],
    trainingTimes: [{ day: day.wed, time: "20:00 — 21:30" }],
    order: 3,
  },
  {
    slug: "dames",
    name: "Dames",
    category: "women",
    league: {
      nl: "Damesvoetbal Provinciaal",
      tr: "Kadın Futbolu Eyalet Ligi",
      en: "Women's Provincial",
    },
    description: {
      nl: "Onze damesploeg groeit elk seizoen. Nieuwe speelsters zijn altijd welkom.",
      tr: "Kadın takımımız her sezon büyüyor. Yeni oyuncular her zaman bekleniyor.",
      en: "Our women's team grows every season. New players are always welcome.",
    },
    coachIds: ["coach-w1"],
    trainingTimes: [
      { day: day.tue, time: "19:00 — 20:30" },
      { day: day.fri, time: "19:00 — 20:30" },
    ],
    order: 4,
  },
  youthTeam(6, 10, [day.wed], "14:00 — 15:00"),
  youthTeam(7, 11, [day.wed], "15:00 — 16:00"),
  youthTeam(8, 12, [day.tue, day.thu], "17:30 — 18:45"),
  youthTeam(9, 13, [day.tue, day.thu], "17:30 — 18:45"),
  youthTeam(10, 14, [day.tue, day.thu], "18:00 — 19:15"),
  youthTeam(11, 15, [day.tue, day.thu], "18:00 — 19:15"),
  youthTeam(12, 16, [day.mon, day.wed], "18:00 — 19:30"),
  youthTeam(13, 17, [day.mon, day.wed], "18:00 — 19:30"),
  youthTeam(14, 18, [day.mon, day.wed], "18:30 — 20:00"),
  youthTeam(15, 19, [day.tue, day.thu], "18:30 — 20:00"),
  youthTeam(16, 20, [day.tue, day.thu], "19:00 — 20:30"),
  youthTeam(17, 21, [day.mon, day.wed], "19:00 — 20:30"),
  youthTeam(19, 22, [day.tue, day.thu], "19:30 — 21:00"),
];

export const teamsByOrder = [...teams].sort((a, b) => a.order - b.order);

export function teamBySlug(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

/** De ploegen die op de homepagina uitgelicht worden. */
export const featuredTeamSlugs = [
  "a-kern",
  "b-kern",
  "reserven",
  "dames",
  "u10",
  "u17",
];
