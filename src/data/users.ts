export const roles = [
  "superadmin",
  "admin",
  "editor",
  "teammanager",
  "author",
] as const;

export type Role = (typeof roles)[number];

export const resources = [
  "dashboard",
  "news",
  "teams",
  "players",
  "matches",
  "standings",
  "media",
  "sponsors",
  "board",
  "pages",
  "menu",
  "users",
  "audit",
  "settings",
] as const;

export type Resource = (typeof resources)[number];

export type Action = "view" | "create" | "edit" | "delete" | "publish";

const ALL: Action[] = ["view", "create", "edit", "delete", "publish"];
const RW: Action[] = ["view", "create", "edit"];
const RO: Action[] = ["view"];

/**
 * Rechtenmatrix. Ontbreekt een resource bij een rol, dan heeft die rol daar
 * geen enkele toegang — het menu verbergt het onderdeel dan ook.
 */
export const permissions: Record<Role, Partial<Record<Resource, Action[]>>> = {
  superadmin: Object.fromEntries(resources.map((r) => [r, ALL])) as Record<Resource, Action[]>,
  admin: {
    dashboard: RO,
    news: ALL,
    teams: ALL,
    players: ALL,
    matches: ALL,
    standings: ALL,
    media: ALL,
    sponsors: ALL,
    board: ALL,
    pages: ALL,
    menu: ALL,
    audit: RO,
    settings: ["view", "edit"],
  },
  editor: {
    dashboard: RO,
    news: ALL,
    media: ALL,
    pages: ["view", "edit"],
    teams: RO,
    players: RO,
    matches: RO,
    standings: RO,
    sponsors: RO,
  },
  teammanager: {
    dashboard: RO,
    // Beperkt tot de eigen ploeg; zie `canManageTeam`.
    teams: ["view", "edit"],
    players: RW,
    matches: ["view", "create", "edit"],
    standings: ["view", "edit"],
    media: RW,
    news: ["view", "create", "edit"],
  },
  author: {
    dashboard: RO,
    // Mag schrijven maar niet publiceren: artikelen gaan naar 'ter review'.
    news: ["view", "create", "edit"],
    media: ["view", "create"],
  },
};

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  /**
   * DEMO ONLY. In de definitieve versie gebeurt authenticatie via Supabase Auth
   * met gehashte wachtwoorden; er staat dan nooit een wachtwoord in de code.
   */
  demoPassword: string;
  role: Role;
  /** Enkel voor de rol `teammanager`: de ploegen die deze persoon beheert. */
  teamSlugs?: string[];
  active: boolean;
  lastLogin?: string;
}

export const demoUsers: AdminUser[] = [
  {
    id: "u-1",
    name: "Demo Superbeheerder",
    email: "superadmin@turkserangers.be",
    demoPassword: "demo1234",
    role: "superadmin",
    active: true,
    lastLogin: "2026-08-03T20:14:00+02:00",
  },
  {
    id: "u-2",
    name: "Demo Beheerder",
    email: "admin@turkserangers.be",
    demoPassword: "demo1234",
    role: "admin",
    active: true,
    lastLogin: "2026-08-02T18:40:00+02:00",
  },
  {
    id: "u-3",
    name: "Demo Redacteur",
    email: "redactie@turkserangers.be",
    demoPassword: "demo1234",
    role: "editor",
    active: true,
    lastLogin: "2026-08-01T09:12:00+02:00",
  },
  {
    id: "u-4",
    name: "Demo Ploegverantwoordelijke",
    email: "akern@turkserangers.be",
    demoPassword: "demo1234",
    role: "teammanager",
    teamSlugs: ["a-kern", "b-kern"],
    active: true,
    lastLogin: "2026-07-30T21:05:00+02:00",
  },
  {
    id: "u-5",
    name: "Demo Auteur",
    email: "auteur@turkserangers.be",
    demoPassword: "demo1234",
    role: "author",
    active: true,
  },
];

export function can(role: Role, resource: Resource, action: Action = "view"): boolean {
  return permissions[role]?.[resource]?.includes(action) ?? false;
}

/** Ploegverantwoordelijken mogen enkel hun eigen ploegen aanpassen. */
export function canManageTeam(user: Pick<AdminUser, "role" | "teamSlugs">, teamSlug: string): boolean {
  if (user.role === "teammanager") return user.teamSlugs?.includes(teamSlug) ?? false;
  return can(user.role, "teams", "edit");
}

export interface AuditEntry {
  id: string;
  at: string;
  userName: string;
  role: Role;
  action: string;
  target: string;
}

export const auditLog: AuditEntry[] = [
  { id: "a-9", at: "2026-08-03T20:16:00+02:00", userName: "Demo Superbeheerder", role: "superadmin", action: "user.create", target: "auteur@turkserangers.be" },
  { id: "a-8", at: "2026-08-02T19:02:00+02:00", userName: "Demo Beheerder", role: "admin", action: "sponsor.update", target: "Dalga Vis & Food" },
  { id: "a-7", at: "2026-08-02T18:44:00+02:00", userName: "Demo Beheerder", role: "admin", action: "match.result", target: "A-kern — FC Winterslag Boys 2-0" },
  { id: "a-6", at: "2026-08-01T09:20:00+02:00", userName: "Demo Redacteur", role: "editor", action: "news.publish", target: "vijftig-jaar-turkse-rangers" },
  { id: "a-5", at: "2026-07-31T22:11:00+02:00", userName: "Demo Auteur", role: "author", action: "news.submit", target: "kantine-vrijwilligers-gezocht" },
  { id: "a-4", at: "2026-07-30T21:08:00+02:00", userName: "Demo Ploegverantwoordelijke", role: "teammanager", action: "player.update", target: "a-kern — #9 Baran Kaya" },
  { id: "a-3", at: "2026-07-29T17:35:00+02:00", userName: "Demo Beheerder", role: "admin", action: "media.upload", target: "voorbereiding-2026 (12 foto's)" },
  { id: "a-2", at: "2026-07-28T12:02:00+02:00", userName: "Demo Redacteur", role: "editor", action: "news.publish", target: "start-jeugdtrainingen-2026-2027" },
  { id: "a-1", at: "2026-07-27T19:50:00+02:00", userName: "Demo Superbeheerder", role: "superadmin", action: "settings.update", target: "Clubgegevens" },
];
