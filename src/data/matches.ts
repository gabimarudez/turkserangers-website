import type { Match, Standing } from "./types";
import { club } from "./club";

/**
 * DEMO-DATA. Momentopname begin augustus 2026: de voorbereiding op seizoen
 * 2026-2027 is gespeeld, de competitie moet nog beginnen. Het klassement
 * hieronder is dus de eindstand van 2025-2026.
 */

export const currentSeason = "2026-2027";
const homeVenue = club.ground;

export const matches: Match[] = [
  // ── Voorbereiding A-kern (gespeeld) ────────────────────────────────────
  {
    id: "m-001",
    teamSlug: "a-kern",
    kickoff: "2026-07-04T18:00:00+02:00",
    opponent: "KFC Zwartberg",
    isHome: true,
    venue: homeVenue,
    competition: "friendly",
    status: "played",
    scoreFor: 4,
    scoreAgainst: 1,
  },
  {
    id: "m-002",
    teamSlug: "a-kern",
    kickoff: "2026-07-11T19:00:00+02:00",
    opponent: "K. Park Houthalen",
    isHome: false,
    venue: "Sportpark Houthalen",
    competition: "friendly",
    status: "played",
    scoreFor: 2,
    scoreAgainst: 2,
  },
  {
    id: "m-003",
    teamSlug: "a-kern",
    kickoff: "2026-07-18T19:00:00+02:00",
    opponent: "K. Heusden-Zolder",
    isHome: true,
    venue: homeVenue,
    competition: "friendly",
    status: "played",
    scoreFor: 3,
    scoreAgainst: 1,
    report: {
      nl: "Een sterke tweede helft besliste de partij. Na de rust liep de ploeg vlot uit naar 3-1.",
      tr: "Güçlü bir ikinci yarı maçı belirledi. Devre arasından sonra takım rahat şekilde 3-1'i buldu.",
      en: "A strong second half settled it. After the break the side eased clear to 3-1.",
    },
  },
  {
    id: "m-004",
    teamSlug: "a-kern",
    kickoff: "2026-07-25T18:30:00+02:00",
    opponent: "KVV Vlaamse Ardennen",
    isHome: false,
    venue: "Gemeentelijk Sportstadion",
    competition: "friendly",
    status: "played",
    scoreFor: 1,
    scoreAgainst: 2,
  },
  {
    id: "m-005",
    teamSlug: "a-kern",
    kickoff: "2026-08-01T18:30:00+02:00",
    opponent: "FC Winterslag Boys",
    isHome: true,
    venue: homeVenue,
    competition: "friendly",
    status: "played",
    scoreFor: 2,
    scoreAgainst: 0,
  },

  // ── Competitie A-kern (komt eraan) ─────────────────────────────────────
  {
    id: "m-010",
    teamSlug: "a-kern",
    kickoff: "2026-08-16T15:00:00+02:00",
    opponent: "K. Park Houthalen",
    isHome: true,
    venue: homeVenue,
    competition: "league",
    matchday: 1,
    status: "scheduled",
  },
  {
    id: "m-011",
    teamSlug: "a-kern",
    kickoff: "2026-08-23T15:00:00+02:00",
    opponent: "KFC Lommel United B",
    isHome: false,
    venue: "Soevereinstadion",
    competition: "league",
    matchday: 2,
    status: "scheduled",
  },
  {
    id: "m-012",
    teamSlug: "a-kern",
    kickoff: "2026-08-30T15:00:00+02:00",
    opponent: "K. Heusden-Zolder",
    isHome: true,
    venue: homeVenue,
    competition: "league",
    matchday: 3,
    status: "scheduled",
  },
  {
    id: "m-013",
    teamSlug: "a-kern",
    kickoff: "2026-09-06T15:00:00+02:00",
    opponent: "SV Bocholt B",
    isHome: false,
    venue: "Damburg",
    competition: "league",
    matchday: 4,
    status: "scheduled",
  },
  {
    id: "m-014",
    teamSlug: "a-kern",
    kickoff: "2026-09-13T15:00:00+02:00",
    opponent: "KVV Thes Sport B",
    isHome: true,
    venue: homeVenue,
    competition: "league",
    matchday: 5,
    status: "scheduled",
  },
  {
    id: "m-015",
    teamSlug: "a-kern",
    kickoff: "2026-09-20T15:00:00+02:00",
    opponent: "Racing Peer",
    isHome: false,
    venue: "Gemeentelijk Sportcentrum Peer",
    competition: "league",
    matchday: 6,
    status: "scheduled",
  },

  // ── B-kern ─────────────────────────────────────────────────────────────
  {
    id: "m-020",
    teamSlug: "b-kern",
    kickoff: "2026-07-19T15:00:00+02:00",
    opponent: "KFC Zwartberg B",
    isHome: true,
    venue: homeVenue,
    competition: "friendly",
    status: "played",
    scoreFor: 3,
    scoreAgainst: 2,
  },
  {
    id: "m-021",
    teamSlug: "b-kern",
    kickoff: "2026-08-16T11:00:00+02:00",
    opponent: "Sporting Genk Zuid",
    isHome: false,
    venue: "Genk Zuid",
    competition: "league",
    matchday: 1,
    status: "scheduled",
  },
  {
    id: "m-022",
    teamSlug: "b-kern",
    kickoff: "2026-08-23T11:00:00+02:00",
    opponent: "KVK Wellen B",
    isHome: true,
    venue: homeVenue,
    competition: "league",
    matchday: 2,
    status: "scheduled",
  },

  // ── Dames ──────────────────────────────────────────────────────────────
  {
    id: "m-030",
    teamSlug: "dames",
    kickoff: "2026-07-26T14:00:00+02:00",
    opponent: "DVC Eva's Tienen",
    isHome: true,
    venue: homeVenue,
    competition: "friendly",
    status: "played",
    scoreFor: 2,
    scoreAgainst: 1,
  },
  {
    id: "m-031",
    teamSlug: "dames",
    kickoff: "2026-08-22T14:00:00+02:00",
    opponent: "KFC Diest Dames",
    isHome: false,
    venue: "Warandestadion",
    competition: "league",
    matchday: 1,
    status: "scheduled",
  },

  // ── Jeugd ──────────────────────────────────────────────────────────────
  {
    id: "m-040",
    teamSlug: "u17",
    kickoff: "2026-08-22T11:00:00+02:00",
    opponent: "K. Bree-Beek U17",
    isHome: true,
    venue: homeVenue,
    competition: "league",
    matchday: 1,
    status: "scheduled",
  },
  {
    id: "m-041",
    teamSlug: "u17",
    kickoff: "2026-08-29T11:00:00+02:00",
    opponent: "KVV Thes Sport U17",
    isHome: false,
    venue: "Thessenhof",
    competition: "league",
    matchday: 2,
    status: "scheduled",
  },
  {
    id: "m-042",
    teamSlug: "u10",
    kickoff: "2026-08-22T09:30:00+02:00",
    opponent: "KFC Zwartberg U10",
    isHome: true,
    venue: homeVenue,
    competition: "league",
    matchday: 1,
    status: "scheduled",
  },
];

export function matchesByTeam(teamSlug: string): Match[] {
  return matches
    .filter((m) => m.teamSlug === teamSlug)
    .sort((a, b) => +new Date(a.kickoff) - +new Date(b.kickoff));
}

export function upcomingMatches(teamSlug?: string, now = new Date()): Match[] {
  return matches
    .filter((m) => m.status === "scheduled" && +new Date(m.kickoff) >= +now)
    .filter((m) => !teamSlug || m.teamSlug === teamSlug)
    .sort((a, b) => +new Date(a.kickoff) - +new Date(b.kickoff));
}

export function playedMatches(teamSlug?: string): Match[] {
  return matches
    .filter((m) => m.status === "played")
    .filter((m) => !teamSlug || m.teamSlug === teamSlug)
    .sort((a, b) => +new Date(b.kickoff) - +new Date(a.kickoff));
}

export function nextMatch(teamSlug = "a-kern", now = new Date()): Match | undefined {
  return upcomingMatches(teamSlug, now)[0];
}

export function lastResult(teamSlug = "a-kern"): Match | undefined {
  return playedMatches(teamSlug)[0];
}

/** "W" | "D" | "L" vanuit het oogpunt van onze club. */
export function outcomeOf(match: Match): "W" | "D" | "L" | null {
  if (match.status !== "played" || match.scoreFor == null || match.scoreAgainst == null) {
    return null;
  }
  if (match.scoreFor > match.scoreAgainst) return "W";
  if (match.scoreFor < match.scoreAgainst) return "L";
  return "D";
}

export const standings: Standing[] = [
  {
    teamSlug: "a-kern",
    competition: {
      nl: "1e Provinciale A — eindstand",
      tr: "1. Eyalet Ligi A — final puan durumu",
      en: "Provincial Division 1A — final table",
    },
    season: "2025-2026",
    updatedAt: "2026-05-24",
    rows: [
      { position: 1, team: "KFC Lommel United B", played: 30, won: 21, drawn: 5, lost: 4, goalsFor: 68, goalsAgainst: 29, points: 68 },
      { position: 2, team: "FC Turkse Rangers", played: 30, won: 20, drawn: 4, lost: 6, goalsFor: 64, goalsAgainst: 33, points: 64, isOwn: true },
      { position: 3, team: "K. Heusden-Zolder", played: 30, won: 18, drawn: 6, lost: 6, goalsFor: 59, goalsAgainst: 34, points: 60 },
      { position: 4, team: "SV Bocholt B", played: 30, won: 16, drawn: 7, lost: 7, goalsFor: 55, goalsAgainst: 38, points: 55 },
      { position: 5, team: "KVV Thes Sport B", played: 30, won: 14, drawn: 8, lost: 8, goalsFor: 51, goalsAgainst: 40, points: 50 },
      { position: 6, team: "K. Park Houthalen", played: 30, won: 13, drawn: 7, lost: 10, goalsFor: 47, goalsAgainst: 42, points: 46 },
      { position: 7, team: "Racing Peer", played: 30, won: 12, drawn: 6, lost: 12, goalsFor: 44, goalsAgainst: 45, points: 42 },
      { position: 8, team: "KVK Wellen", played: 30, won: 11, drawn: 7, lost: 12, goalsFor: 41, goalsAgainst: 44, points: 40 },
      { position: 9, team: "Sporting Genk Zuid", played: 30, won: 10, drawn: 6, lost: 14, goalsFor: 38, goalsAgainst: 48, points: 36 },
      { position: 10, team: "KFC Zwartberg", played: 30, won: 9, drawn: 6, lost: 15, goalsFor: 35, goalsAgainst: 51, points: 33 },
      { position: 11, team: "K. Bree-Beek", played: 30, won: 8, drawn: 6, lost: 16, goalsFor: 33, goalsAgainst: 55, points: 30 },
      { position: 12, team: "FC Winterslag Boys", played: 30, won: 5, drawn: 4, lost: 21, goalsFor: 26, goalsAgainst: 72, points: 19 },
    ],
  },
];

export function standingFor(teamSlug: string): Standing | undefined {
  return standings.find((s) => s.teamSlug === teamSlug);
}

export function ownRow(standing: Standing) {
  return standing.rows.find((r) => r.isOwn);
}
