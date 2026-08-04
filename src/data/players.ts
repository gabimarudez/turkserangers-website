import type { Foot, Player, Position } from "./types";

/**
 * DEMO-DATA — alle spelersnamen hieronder zijn verzonnen en dienen enkel om
 * het ontwerp te tonen. Ze moeten vóór publicatie vervangen worden door de
 * echte selectie, en bij minderjarigen pas na schriftelijke toestemming van
 * de ouders (zie `publishConsent`).
 */

type Seed = [
  first: string,
  last: string,
  shirt: number,
  position: Position,
  birthYear: number,
  height: number,
  foot: Foot,
  apps: number,
  goals: number,
  assists: number,
];

function makeId(teamSlug: string, shirt: number) {
  return `${teamSlug}-${shirt}`;
}

function build(teamSlug: string, seeds: Seed[], consent = true): Player[] {
  return seeds.map(
    ([first, last, shirt, position, birthYear, height, foot, apps, goals, assists]) => ({
      id: makeId(teamSlug, shirt),
      teamSlug,
      firstName: first,
      lastName: last,
      shirtNumber: shirt,
      position,
      birthDate: `${birthYear}-0${((shirt % 9) + 1)}-1${(shirt % 9)}`,
      heightCm: height,
      foot,
      nationality: "BE",
      joinedYear: 2026 - ((shirt % 6) + 1),
      publishConsent: consent,
      stats: {
        appearances: apps,
        goals,
        assists,
        yellowCards: shirt % 5,
        redCards: shirt % 17 === 0 ? 1 : 0,
      },
    }),
  );
}

const aKernSeeds: Seed[] = [
  ["Emre", "Aydin", 1, "GK", 1994, 189, "right", 4, 0, 0],
  ["Jens", "Peeters", 12, "GK", 2001, 186, "right", 1, 0, 0],
  ["Kaan", "Demir", 2, "DF", 1998, 181, "right", 5, 0, 1],
  ["Mattias", "Vermeulen", 3, "DF", 1996, 184, "left", 5, 1, 0],
  ["Ridvan", "Arslan", 4, "DF", 1999, 187, "right", 4, 1, 0],
  ["Milan", "Claes", 5, "DF", 2002, 183, "right", 3, 0, 0],
  ["Younes", "El Amrani", 15, "DF", 2003, 178, "left", 4, 0, 2],
  ["Serkan", "Sahin", 6, "MF", 1997, 176, "right", 5, 0, 2],
  ["Levent", "Coskun", 8, "MF", 1995, 179, "both", 5, 2, 3],
  ["Noah", "Janssens", 10, "MF", 2000, 174, "left", 5, 3, 4],
  ["Bilal", "Bakkali", 14, "MF", 2004, 172, "right", 3, 1, 1],
  ["Okan", "Guler", 16, "MF", 2001, 180, "right", 2, 0, 0],
  ["Deniz", "Yildiz", 7, "FW", 1999, 177, "right", 5, 4, 1],
  ["Baran", "Kaya", 9, "FW", 1997, 185, "left", 5, 6, 2],
  ["Ilias", "Nasri", 11, "FW", 2002, 175, "right", 4, 2, 3],
  ["Furkan", "Bulut", 17, "FW", 2003, 181, "right", 3, 1, 0],
  ["Yusuf", "Ozturk", 18, "DF", 2000, 182, "right", 2, 0, 0],
  ["Selim", "Toprak", 19, "MF", 2005, 173, "left", 1, 0, 1],
  ["Diego", "Maes", 20, "FW", 1998, 179, "both", 3, 1, 1],
  ["Tarik", "Erdem", 21, "MF", 2004, 176, "right", 2, 0, 0],
  ["Ayoub", "Sonmez", 22, "DF", 2001, 186, "right", 3, 0, 0],
  ["Cem", "Hendrickx", 23, "MF", 2003, 178, "right", 1, 0, 0],
];

const bKernSeeds: Seed[] = [
  ["Rayan", "Cetin", 1, "GK", 2003, 185, "right", 6, 0, 0],
  ["Anass", "Wouters", 2, "DF", 2004, 180, "right", 6, 0, 1],
  ["Emre", "Sahin", 3, "DF", 2002, 183, "left", 5, 1, 0],
  ["Kaan", "Claes", 4, "DF", 2005, 178, "right", 6, 0, 0],
  ["Noah", "Bulut", 5, "DF", 2003, 184, "right", 4, 0, 1],
  ["Serkan", "Maes", 6, "MF", 2004, 175, "both", 6, 1, 2],
  ["Yusuf", "Janssens", 7, "MF", 2006, 172, "left", 5, 2, 1],
  ["Levent", "Toprak", 8, "MF", 2002, 177, "right", 6, 1, 3],
  ["Deniz", "Peeters", 9, "FW", 2005, 181, "right", 6, 5, 1],
  ["Bilal", "Demir", 10, "FW", 2003, 174, "left", 5, 3, 2],
  ["Milan", "Guler", 11, "FW", 2004, 179, "right", 4, 2, 0],
  ["Okan", "Vermeulen", 12, "GK", 2006, 182, "right", 1, 0, 0],
  ["Tarik", "Kaya", 14, "MF", 2005, 176, "right", 3, 0, 1],
  ["Selim", "Nasri", 15, "DF", 2004, 180, "left", 4, 0, 0],
  ["Furkan", "Arslan", 16, "FW", 2006, 173, "right", 2, 1, 0],
  ["Ayoub", "Erdem", 17, "MF", 2003, 178, "right", 3, 0, 1],
];

const damesSeeds: Seed[] = [
  ["Elif", "Aydin", 1, "GK", 2001, 173, "right", 5, 0, 0],
  ["Zeynep", "Peeters", 2, "DF", 2003, 168, "right", 5, 0, 1],
  ["Lotte", "Demir", 3, "DF", 2000, 171, "left", 4, 1, 0],
  ["Nour", "Bakkali", 4, "DF", 2004, 166, "right", 5, 0, 0],
  ["Merve", "Claes", 5, "DF", 2002, 170, "right", 4, 0, 1],
  ["Sara", "Yildiz", 6, "MF", 2005, 165, "both", 5, 1, 2],
  ["Fatma", "Janssens", 7, "MF", 2001, 167, "right", 5, 2, 1],
  ["Amber", "Toprak", 8, "MF", 2003, 169, "left", 4, 0, 3],
  ["Dilara", "Kaya", 9, "FW", 2002, 172, "right", 5, 4, 1],
  ["Yasmin", "Maes", 10, "FW", 2004, 164, "right", 5, 3, 2],
  ["Ilayda", "Guler", 11, "FW", 2006, 168, "left", 3, 1, 0],
  ["Emma", "Vermeulen", 12, "GK", 2005, 170, "right", 1, 0, 0],
  ["Hande", "Arslan", 14, "MF", 2003, 166, "right", 3, 0, 1],
  ["Julie", "Sonmez", 15, "DF", 2001, 173, "right", 4, 0, 0],
];

/**
 * Bij de jeugd staat `publishConsent` bewust niet overal op true: zo zie je in
 * de demo hoe een speler zonder ouderlijke toestemming getoond wordt.
 */
const u17Seeds: Seed[] = [
  ["Mert", "Aydin", 1, "GK", 2009, 180, "right", 8, 0, 0],
  ["Sami", "Peeters", 2, "DF", 2009, 174, "right", 8, 0, 1],
  ["Berkay", "Demir", 3, "DF", 2010, 172, "left", 7, 1, 0],
  ["Adam", "Claes", 4, "DF", 2009, 176, "right", 8, 0, 0],
  ["Eren", "Bulut", 5, "MF", 2010, 168, "right", 6, 1, 2],
  ["Lars", "Janssens", 6, "MF", 2009, 171, "both", 8, 2, 1],
  ["Kerem", "Toprak", 7, "MF", 2010, 166, "left", 7, 1, 3],
  ["Zakaria", "Nasri", 8, "FW", 2009, 175, "right", 8, 6, 2],
  ["Timo", "Maes", 9, "FW", 2010, 173, "right", 7, 4, 1],
  ["Ugur", "Guler", 10, "FW", 2009, 170, "left", 6, 3, 2],
  ["Robbe", "Vermeulen", 11, "DF", 2010, 177, "right", 5, 0, 0],
];

const u10Seeds: Seed[] = [
  ["Demo", "Speler 1", 1, "GK", 2016, 140, "right", 9, 0, 0],
  ["Demo", "Speler 2", 2, "DF", 2016, 138, "right", 9, 1, 0],
  ["Demo", "Speler 3", 3, "DF", 2017, 135, "left", 8, 0, 1],
  ["Demo", "Speler 4", 4, "MF", 2016, 137, "right", 9, 2, 2],
  ["Demo", "Speler 5", 5, "MF", 2017, 134, "right", 7, 1, 1],
  ["Demo", "Speler 6", 6, "FW", 2016, 139, "left", 9, 5, 1],
  ["Demo", "Speler 7", 7, "FW", 2017, 133, "right", 8, 3, 2],
];

export const players: Player[] = [
  ...build("a-kern", aKernSeeds),
  ...build("b-kern", bKernSeeds),
  ...build("dames", damesSeeds),
  // Twee U17-spelers zonder publicatietoestemming, om de GDPR-afhandeling te tonen.
  ...build("u17", u17Seeds).map((p, i) =>
    i >= u17Seeds.length - 2 ? { ...p, publishConsent: false } : p,
  ),
  ...build("u10", u10Seeds, false),
];

export function playersByTeam(teamSlug: string): Player[] {
  return players
    .filter((p) => p.teamSlug === teamSlug)
    .sort((a, b) => a.shirtNumber - b.shirtNumber);
}

export function playerById(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}

export function ageOf(birthDate: string, on = new Date()): number {
  const born = new Date(birthDate);
  let age = on.getFullYear() - born.getFullYear();
  const monthDiff = on.getMonth() - born.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && on.getDate() < born.getDate())) age--;
  return age;
}

/** Topscorers over alle ploegen heen, voor het dashboard. */
export function topScorers(limit = 5): Player[] {
  return [...players].sort((a, b) => b.stats.goals - a.stats.goals).slice(0, limit);
}
