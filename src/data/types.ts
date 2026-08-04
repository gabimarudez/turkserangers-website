import type { Locale } from "@/i18n/config";

/**
 * Tekst die in alle drie de talen bestaat. In de definitieve versie komt dit
 * uit een `translations`-tabel; de vorm blijft dezelfde zodat de UI niet hoeft
 * te veranderen.
 */
export type Localized<T = string> = Record<Locale, T>;

export type Position = "GK" | "DF" | "MF" | "FW";
export type Foot = "left" | "right" | "both";
export type TeamCategory = "first" | "youth" | "women";

export interface Team {
  slug: string;
  name: string;
  category: TeamCategory;
  /** Bijv. "1e Provinciale A" of "U10 — Gewestelijk". */
  league: Localized;
  description: Localized;
  coachIds: string[];
  photo?: string;
  trainingTimes: { day: Localized; time: string }[];
  /** Volgorde in overzichten (laag = eerst). */
  order: number;
}

export interface Player {
  id: string;
  teamSlug: string;
  firstName: string;
  lastName: string;
  shirtNumber: number;
  position: Position;
  /** ISO-datum. */
  birthDate: string;
  heightCm: number;
  foot: Foot;
  nationality: string;
  joinedYear: number;
  photo?: string;
  /**
   * GDPR: bij minderjarigen mag naam/foto pas online na schriftelijke
   * toestemming van de ouders. Staat dit op false, dan toont de site enkel
   * het rugnummer en de positie.
   */
  publishConsent: boolean;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
}

export interface StaffMember {
  id: string;
  name: string;
  role: Localized;
  photo?: string;
  /** Vult de bestuurspagina; staf zonder bestuursfunctie laat dit leeg. */
  isBoard: boolean;
  email?: string;
  order: number;
}

export type MatchStatus = "scheduled" | "played" | "postponed" | "cancelled";
export type Competition = "league" | "cup" | "friendly";

export interface Match {
  id: string;
  teamSlug: string;
  /** ISO-datum met tijd, in Europe/Brussels bedoeld. */
  kickoff: string;
  opponent: string;
  isHome: boolean;
  venue: string;
  competition: Competition;
  matchday?: number;
  status: MatchStatus;
  scoreFor?: number;
  scoreAgainst?: number;
  report?: Localized;
}

export interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  /** Markeert de eigen club, zodat we die kunnen highlighten. */
  isOwn?: boolean;
}

export interface Standing {
  teamSlug: string;
  competition: Localized;
  season: string;
  updatedAt: string;
  rows: StandingRow[];
}

export type NewsCategory = "club" | "matches" | "youth" | "sponsors";

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  title: Localized;
  excerpt: Localized;
  /** Alinea's; bewust geen HTML zodat er niets ongefilterd gerenderd wordt. */
  body: Localized<string[]>;
  publishedAt: string;
  author: string;
  image?: string;
  imageAlt: Localized;
  featured: boolean;
}

export type SponsorTier = "main" | "partner" | "supporting";

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  website?: string;
  logo?: string;
}

export interface GalleryAlbum {
  slug: string;
  title: Localized;
  date: string;
  cover?: string;
  photos: { src?: string; alt: Localized }[];
}

export interface HistoryEvent {
  year: string;
  title: Localized;
  body: Localized;
}
