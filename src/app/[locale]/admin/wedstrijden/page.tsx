"use client";

import { use, useState, type FormEvent } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission } from "@/admin/ui";
import { formatDate, getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { canManageTeam } from "@/data/users";
import { teamsByOrder } from "@/data/teams";
import { club } from "@/data/club";
import type { Competition, Match } from "@/data/types";

export default function AdminMatchesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user, saveMatch, deleteMatch } = useAdmin();
  const [showForm, setShowForm] = useState(false);

  if (!user) return null;

  // Ploegverantwoordelijken zien enkel hun eigen ploegen.
  const editable = state.matches.filter((m) => canManageTeam(user, m.teamSlug));
  const sorted = [...editable].sort((a, b) => +new Date(b.kickoff) - +new Date(a.kickoff));

  function handleScore(match: Match, field: "scoreFor" | "scoreAgainst", value: string) {
    const parsed = value === "" ? undefined : Math.max(0, Number.parseInt(value, 10) || 0);
    const next = { ...match, [field]: parsed };
    next.status =
      next.scoreFor != null && next.scoreAgainst != null ? "played" : "scheduled";
    saveMatch(next);
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const date = String(form.get("date"));
    const time = String(form.get("time") || "15:00");

    saveMatch({
      id: `m-${Date.now()}`,
      teamSlug: String(form.get("teamSlug")),
      kickoff: `${date}T${time}:00+02:00`,
      opponent: String(form.get("opponent")),
      isHome: form.get("isHome") === "on",
      venue: String(form.get("venue") || club.ground),
      competition: String(form.get("competition")) as Competition,
      matchday: form.get("matchday") ? Number(form.get("matchday")) : undefined,
      status: "scheduled",
    });

    event.currentTarget.reset();
    setShowForm(false);
  }

  const t = {
    newMatch: locale === "tr" ? "Yeni maç" : locale === "en" ? "New match" : "Nieuwe wedstrijd",
    opponent: locale === "tr" ? "Rakip" : locale === "en" ? "Opponent" : "Tegenstander",
    score: locale === "tr" ? "Skor" : locale === "en" ? "Score" : "Uitslag",
    homeGame: locale === "tr" ? "İç saha" : locale === "en" ? "Home game" : "Thuiswedstrijd",
  };

  return (
    <RequirePermission resource="matches" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.matches}
        description={
          locale === "tr"
            ? "Skoru girdiğinizde maç otomatik olarak 'oynandı' durumuna geçer."
            : locale === "en"
              ? "Entering a score automatically marks the match as played."
              : "Zodra je een uitslag invult, wordt de wedstrijd automatisch als gespeeld gemarkeerd."
        }
        action={
          <button type="button" onClick={() => setShowForm((v) => !v)} className="btn-primary">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {t.newMatch}
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleCreate} className="card mb-6 grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
          <div>
            <label className="label" htmlFor="teamSlug">{dict.admin.teams}</label>
            <select id="teamSlug" name="teamSlug" className="field" required>
              {teamsByOrder
                .filter((team) => canManageTeam(user, team.slug))
                .map((team) => (
                  <option key={team.slug} value={team.slug}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="opponent">{t.opponent}</label>
            <input id="opponent" name="opponent" className="field" required />
          </div>
          <div>
            <label className="label" htmlFor="competition">{dict.matches.competition}</label>
            <select id="competition" name="competition" className="field">
              <option value="league">{dict.matches.competition}</option>
              <option value="cup">{dict.matches.cup}</option>
              <option value="friendly">{dict.matches.friendly}</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="date">{dict.common.date}</label>
            <input id="date" name="date" type="date" className="field" required />
          </div>
          <div>
            <label className="label" htmlFor="time">{dict.common.time}</label>
            <input id="time" name="time" type="time" className="field" defaultValue="15:00" />
          </div>
          <div>
            <label className="label" htmlFor="venue">{dict.common.location}</label>
            <input id="venue" name="venue" className="field" defaultValue={club.ground} />
          </div>
          <div className="flex items-end gap-4 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input type="checkbox" name="isHome" defaultChecked className="h-4 w-4 accent-rangers-red" />
              {t.homeGame}
            </label>
            <div className="flex-1">
              <label className="label" htmlFor="matchday">{dict.common.matchday}</label>
              <input id="matchday" name="matchday" type="number" min={1} className="field" />
            </div>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">
              <Save className="h-4 w-4" aria-hidden="true" />
              {locale === "tr" ? "Kaydet" : locale === "en" ? "Save" : "Opslaan"}
            </button>
          </div>
        </form>
      )}

      <DataTable
        headers={[
          dict.common.date,
          dict.admin.teams,
          t.opponent,
          dict.matches.competition,
          t.score,
          "",
        ]}
      >
        {sorted.map((match) => (
          <tr key={match.id} className="border-b border-rangers-border/60 last:border-0">
            <td className="whitespace-nowrap px-4 py-3 text-white/60">
              {formatDate(match.kickoff, locale, { day: "2-digit", month: "2-digit", year: "numeric" })}
            </td>
            <td className="px-4 py-3 text-white/80">{match.teamSlug}</td>
            <td className="px-4 py-3">
              <span className="text-white">{match.opponent}</span>
              <span className="ml-2 text-xs text-white/35">
                {match.isHome ? dict.matches.home : dict.matches.away}
              </span>
            </td>
            <td className="px-4 py-3 text-white/50">
              {match.competition === "friendly"
                ? dict.matches.friendly
                : match.competition === "cup"
                  ? dict.matches.cup
                  : `${dict.common.matchday} ${match.matchday ?? "—"}`}
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  aria-label={`${dict.matches.home} ${match.opponent}`}
                  value={match.scoreFor ?? ""}
                  onChange={(e) => handleScore(match, "scoreFor", e.target.value)}
                  className="w-14 rounded-md border border-rangers-border bg-rangers-surface2 px-2 py-1.5 text-center text-sm text-white focus:border-rangers-red focus:outline-none"
                />
                <span className="text-white/30">—</span>
                <input
                  type="number"
                  min={0}
                  aria-label={`${dict.matches.away} ${match.opponent}`}
                  value={match.scoreAgainst ?? ""}
                  onChange={(e) => handleScore(match, "scoreAgainst", e.target.value)}
                  className="w-14 rounded-md border border-rangers-border bg-rangers-surface2 px-2 py-1.5 text-center text-sm text-white focus:border-rangers-red focus:outline-none"
                />
              </div>
            </td>
            <td className="px-4 py-3 text-right">
              <button
                type="button"
                onClick={() => deleteMatch(match.id)}
                className="rounded-md p-2 text-white/50 transition-colors hover:bg-rangers-red/15 hover:text-rangers-redSoft"
                aria-label={`Verwijder ${match.opponent}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </RequirePermission>
  );
}
