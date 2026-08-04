"use client";

import { use, useState } from "react";
import { ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission } from "@/admin/ui";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { canManageTeam } from "@/data/users";
import { teamsByOrder } from "@/data/teams";
import { ageOf } from "@/data/players";
import type { Player } from "@/data/types";

export default function AdminPlayersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user, savePlayer, deletePlayer } = useAdmin();

  const manageable = teamsByOrder.filter((team) => user && canManageTeam(user, team.slug));
  const [teamSlug, setTeamSlug] = useState(manageable[0]?.slug ?? "a-kern");

  if (!user) return null;

  const squad = state.players
    .filter((p) => p.teamSlug === teamSlug)
    .sort((a, b) => a.shirtNumber - b.shirtNumber);

  const updateStat = (player: Player, key: keyof Player["stats"], value: string) =>
    savePlayer({
      ...player,
      stats: { ...player.stats, [key]: Math.max(0, Number.parseInt(value, 10) || 0) },
    });

  const t = {
    consent:
      locale === "tr"
        ? "Yayın izni"
        : locale === "en"
          ? "Publication consent"
          : "Publicatietoestemming",
    consentHint:
      locale === "tr"
        ? "İzin kapalıyken oyuncunun adı ve fotoğrafı sitede gösterilmez — yalnızca numarası ve pozisyonu."
        : locale === "en"
          ? "With consent off, the player's name and photo are hidden on the site — only the number and position are shown."
          : "Staat de toestemming uit, dan verbergt de site naam en foto — enkel rugnummer en positie blijven zichtbaar.",
  };

  return (
    <RequirePermission resource="players" message={dict.admin.noAccess}>
      <AdminPageHeader title={dict.admin.players} description={t.consentHint} />

      <div className="mb-5 flex flex-wrap gap-2">
        {manageable.map((team) => (
          <button
            key={team.slug}
            type="button"
            onClick={() => setTeamSlug(team.slug)}
            className={`rounded-md border px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
              team.slug === teamSlug
                ? "border-rangers-red bg-rangers-red text-white"
                : "border-rangers-border text-white/60 hover:border-white/30 hover:text-white"
            }`}
          >
            {team.name}
          </button>
        ))}
      </div>

      {squad.length === 0 ? (
        <p className="card p-6 text-sm text-white/50">{dict.teams.noPlayers}</p>
      ) : (
        <DataTable
          headers={[
            dict.teams.number,
            dict.teams.player,
            dict.teams.position,
            dict.teams.age,
            dict.teams.apps,
            dict.teams.goals,
            dict.teams.assists,
            t.consent,
            "",
          ]}
        >
          {squad.map((player) => (
            <tr key={player.id} className="border-b border-rangers-border/60 last:border-0">
              <td className="px-4 py-3 font-display font-semibold text-white">
                {player.shirtNumber}
              </td>
              <td className="px-4 py-3 text-white/85">
                {player.firstName} {player.lastName}
              </td>
              <td className="px-4 py-3 text-white/50">
                {dict.teams.positions[player.position]}
              </td>
              <td className="px-4 py-3 text-white/50">{ageOf(player.birthDate)}</td>
              {(["appearances", "goals", "assists"] as const).map((key) => (
                <td key={key} className="px-4 py-3">
                  <input
                    type="number"
                    min={0}
                    aria-label={`${key} ${player.firstName} ${player.lastName}`}
                    value={player.stats[key]}
                    onChange={(e) => updateStat(player, key, e.target.value)}
                    className="w-16 rounded-md border border-rangers-border bg-rangers-surface2 px-2 py-1.5 text-center text-sm text-white focus:border-rangers-red focus:outline-none"
                  />
                </td>
              ))}
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() =>
                    savePlayer({ ...player, publishConsent: !player.publishConsent })
                  }
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    player.publishConsent
                      ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                      : "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"
                  }`}
                >
                  {player.publishConsent ? (
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ShieldOff className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {player.publishConsent
                    ? locale === "tr" ? "Var" : locale === "en" ? "Yes" : "Ja"
                    : locale === "tr" ? "Yok" : locale === "en" ? "No" : "Nee"}
                </button>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => deletePlayer(player.id)}
                  className="rounded-md p-2 text-white/50 transition-colors hover:bg-rangers-red/15 hover:text-rangers-redSoft"
                  aria-label={`Verwijder ${player.firstName} ${player.lastName}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </RequirePermission>
  );
}
