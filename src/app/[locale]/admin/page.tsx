"use client";

import Link from "next/link";
import { use } from "react";
import { CalendarDays, ImageIcon, Newspaper, Plus, UserSquare2 } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, StatCard } from "@/admin/ui";
import { getDictionary, href } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { can } from "@/data/users";

export default function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user } = useAdmin();

  if (!user) return null;

  const published = state.articles.filter((a) => a.status === "published").length;
  const pending = state.articles.filter((a) => a.status === "review").length;
  const upcoming = state.matches.filter(
    (m) => m.status === "scheduled" && +new Date(m.kickoff) >= Date.now(),
  ).length;
  const missingConsent = state.players.filter((p) => !p.publishConsent).length;

  const quickActions = [
    { path: "/admin/nieuws/bewerken?slug=nieuw", label: dict.admin.news, icon: Newspaper, resource: "news" as const },
    { path: "/admin/wedstrijden", label: dict.admin.matches, icon: CalendarDays, resource: "matches" as const },
    { path: "/admin/spelers", label: dict.admin.players, icon: UserSquare2, resource: "players" as const },
    { path: "/admin/media", label: dict.admin.media, icon: ImageIcon, resource: "media" as const },
  ].filter((action) => can(user.role, action.resource, "view"));

  return (
    <>
      <AdminPageHeader
        title={`${dict.admin.welcome}, ${user.name.split(" ").slice(-1)[0]}`}
        description={`${dict.admin.role}: ${dict.admin.roles[user.role]}`}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={dict.admin.news} value={published} hint={`${pending} ter review`} />
        <StatCard label={dict.admin.matches} value={upcoming} hint={dict.matches.upcoming} />
        <StatCard label={dict.admin.players} value={state.players.length} />
        <StatCard
          label="Zonder toestemming"
          value={missingConsent}
          hint="Naam/foto verborgen"
        />
      </div>

      {quickActions.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Snel aan de slag
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {quickActions.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={href(locale, path)}
                className="card flex items-center gap-3 p-4 text-sm text-white/70 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-rangers-red/15">
                  <Icon className="h-4 w-4 text-rangers-red" aria-hidden="true" />
                </span>
                {label}
                <Plus className="ml-auto h-4 w-4 text-white/30" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          {dict.admin.audit}
        </h2>
        <ul className="card divide-y divide-rangers-border">
          {state.audit.slice(0, 8).map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-sm">
              <span className="font-medium text-white/80">{entry.userName}</span>
              <code className="rounded bg-rangers-surface2 px-1.5 py-0.5 text-[11px] text-rangers-redSoft">
                {entry.action}
              </code>
              <span className="min-w-0 truncate text-white/50">{entry.target}</span>
              <time className="ml-auto shrink-0 text-xs text-white/30" dateTime={entry.at}>
                {new Date(entry.at).toLocaleString(locale === "tr" ? "tr-TR" : locale === "en" ? "en-GB" : "nl-BE")}
              </time>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
