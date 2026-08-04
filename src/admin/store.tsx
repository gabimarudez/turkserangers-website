"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { news } from "@/data/news";
import { players as seedPlayers } from "@/data/players";
import { matches as seedMatches } from "@/data/matches";
import { sponsors as seedSponsors } from "@/data/sponsors";
import { auditLog, demoUsers, type AdminUser, type AuditEntry, type Role } from "@/data/users";
import type { AdminArticle, AdminState, MediaItem } from "./types";
import type { Match, Player, Sponsor } from "@/data/types";

const STORAGE_KEY = "tr-admin-state-v1";
const SESSION_KEY = "tr-admin-session-v1";

function seedState(): AdminState {
  return {
    articles: news.map((article) => ({ ...article, status: "published" })),
    players: seedPlayers.map((p) => ({ ...p })),
    matches: seedMatches.map((m) => ({ ...m })),
    sponsors: seedSponsors.map((s) => ({ ...s })),
    media: [],
    users: demoUsers.map((u) => ({ ...u })),
    audit: [...auditLog],
  };
}

interface AdminContextValue {
  state: AdminState;
  user: AdminUser | null;
  ready: boolean;
  login: (email: string, password: string) => AdminUser | null;
  logout: () => void;
  saveArticle: (article: AdminArticle) => void;
  deleteArticle: (slug: string) => void;
  savePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
  saveMatch: (match: Match) => void;
  deleteMatch: (id: string) => void;
  saveSponsor: (sponsor: Sponsor) => void;
  deleteSponsor: (id: string) => void;
  addMedia: (items: MediaItem[]) => void;
  deleteMedia: (id: string) => void;
  saveUser: (user: AdminUser) => void;
  deleteUser: (id: string) => void;
  resetDemo: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(seedState);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  // Inlezen gebeurt na de eerste render, zodat server- en client-HTML gelijk zijn.
  useEffect(() => {
    try {
      const storedState = window.localStorage.getItem(STORAGE_KEY);
      if (storedState) setState({ ...seedState(), ...JSON.parse(storedState) });

      const storedSession = window.localStorage.getItem(SESSION_KEY);
      if (storedSession) setUser(JSON.parse(storedSession));
    } catch {
      // Corrupte opslag mag de demo niet blokkeren.
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(SESSION_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Opslag vol of geblokkeerd: de demo werkt verder, alleen zonder bewaren.
    }
  }, [state, ready]);

  const log = useCallback(
    (action: string, target: string, actor: AdminUser | null) => {
      if (!actor) return;
      const entry: AuditEntry = {
        id: `a-${Date.now()}`,
        at: new Date().toISOString(),
        userName: actor.name,
        role: actor.role,
        action,
        target,
      };
      setState((prev) => ({ ...prev, audit: [entry, ...prev.audit].slice(0, 200) }));
    },
    [],
  );

  const login = useCallback<AdminContextValue["login"]>((email, password) => {
    const found = state.users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.demoPassword === password &&
        u.active,
    );
    if (!found) return null;

    const session = { ...found, lastLogin: new Date().toISOString() };
    setUser(session);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    log("auth.login", found.email, session);
    return session;
  }, [state.users, log]);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo<AdminContextValue>(() => {
    const upsert = <T,>(list: T[], item: T, key: (x: T) => string) => {
      const index = list.findIndex((x) => key(x) === key(item));
      if (index === -1) return [item, ...list];
      const copy = [...list];
      copy[index] = item;
      return copy;
    };

    return {
      state,
      user,
      ready,
      login,
      logout,

      saveArticle(article) {
        setState((prev) => ({
          ...prev,
          articles: upsert(prev.articles, article, (a) => a.slug),
        }));
        log(article.status === "published" ? "news.publish" : "news.save", article.slug, user);
      },
      deleteArticle(slug) {
        setState((prev) => ({
          ...prev,
          articles: prev.articles.filter((a) => a.slug !== slug),
        }));
        log("news.delete", slug, user);
      },

      savePlayer(player) {
        setState((prev) => ({
          ...prev,
          players: upsert(prev.players, player, (p) => p.id),
        }));
        log("player.save", `${player.teamSlug} — #${player.shirtNumber}`, user);
      },
      deletePlayer(id) {
        setState((prev) => ({ ...prev, players: prev.players.filter((p) => p.id !== id) }));
        log("player.delete", id, user);
      },

      saveMatch(match) {
        setState((prev) => ({
          ...prev,
          matches: upsert(prev.matches, match, (m) => m.id),
        }));
        log("match.save", `${match.teamSlug} — ${match.opponent}`, user);
      },
      deleteMatch(id) {
        setState((prev) => ({ ...prev, matches: prev.matches.filter((m) => m.id !== id) }));
        log("match.delete", id, user);
      },

      saveSponsor(sponsor) {
        setState((prev) => ({
          ...prev,
          sponsors: upsert(prev.sponsors, sponsor, (s) => s.id),
        }));
        log("sponsor.save", sponsor.name, user);
      },
      deleteSponsor(id) {
        setState((prev) => ({ ...prev, sponsors: prev.sponsors.filter((s) => s.id !== id) }));
        log("sponsor.delete", id, user);
      },

      addMedia(items) {
        setState((prev) => ({ ...prev, media: [...items, ...prev.media] }));
        log("media.upload", `${items.length} bestand(en)`, user);
      },
      deleteMedia(id) {
        setState((prev) => ({ ...prev, media: prev.media.filter((m) => m.id !== id) }));
        log("media.delete", id, user);
      },

      saveUser(nextUser) {
        setState((prev) => ({
          ...prev,
          users: upsert(prev.users, nextUser, (u) => u.id),
        }));
        log("user.save", nextUser.email, user);
      },
      deleteUser(id) {
        setState((prev) => ({ ...prev, users: prev.users.filter((u) => u.id !== id) }));
        log("user.delete", id, user);
      },

      resetDemo() {
        const fresh = seedState();
        setState(fresh);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      },
    };
  }, [state, user, ready, login, logout, log]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin moet binnen AdminProvider gebruikt worden");
  return context;
}

export type { Role };
