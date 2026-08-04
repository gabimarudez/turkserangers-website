import type { Match, NewsArticle, Player, Sponsor } from "@/data/types";
import type { AdminUser, AuditEntry } from "@/data/users";

export type PublishState = "draft" | "review" | "published";

export interface AdminArticle extends NewsArticle {
  /**
   * Auteurs mogen schrijven maar niet publiceren; hun artikelen belanden op
   * `review` tot een redacteur ze goedkeurt.
   */
  status: PublishState;
}

export interface MediaItem {
  id: string;
  name: string;
  /** Data-URL in de demo; in de definitieve versie een pad in de opslag. */
  dataUrl?: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  album: string;
}

export interface AdminState {
  articles: AdminArticle[];
  players: Player[];
  matches: Match[];
  sponsors: Sponsor[];
  media: MediaItem[];
  users: AdminUser[];
  audit: AuditEntry[];
}

export type { Match, Player, Sponsor, AdminUser, AuditEntry };
