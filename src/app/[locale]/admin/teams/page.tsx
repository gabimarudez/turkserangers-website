"use client";

import { use } from "react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission } from "@/admin/ui";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { teamsByOrder } from "@/data/teams";
import { canManageTeam } from "@/data/users";

export default function AdminTeamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user } = useAdmin();

  if (!user) return null;

  return (
    <RequirePermission resource="teams" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.teams}
        description={
          locale === "tr"
            ? "Takım bilgileri şu an kod içinde tanımlı. Bir sonraki adımda buradan düzenlenebilir olacak."
            : locale === "en"
              ? "Team details are currently defined in code. Editing them here comes in the next step."
              : "Ploeggegevens staan nu nog in de code. Ze hier bewerken volgt in de volgende stap."
        }
      />

      <DataTable
        headers={[
          dict.admin.teams,
          dict.club.factLeague,
          dict.admin.players,
          dict.admin.matches,
          dict.teams.trainingHeading,
        ]}
      >
        {teamsByOrder.map((team) => {
          const squad = state.players.filter((p) => p.teamSlug === team.slug);
          const fixtures = state.matches.filter((m) => m.teamSlug === team.slug);
          const mine = canManageTeam(user, team.slug);

          return (
            <tr key={team.slug} className="border-b border-rangers-border/60 last:border-0">
              <td className="px-4 py-3">
                <span className="font-display font-semibold text-white">{team.name}</span>
                {mine && (
                  <span className="ml-2 badge bg-rangers-red/15 text-rangers-redSoft">
                    {locale === "tr" ? "Benim" : locale === "en" ? "Mine" : "Van mij"}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-white/50">{team.league[locale]}</td>
              <td className="px-4 py-3 text-white/60">{squad.length}</td>
              <td className="px-4 py-3 text-white/60">{fixtures.length}</td>
              <td className="px-4 py-3 text-xs text-white/45">
                {team.trainingTimes
                  .map((slot) => `${slot.day[locale]} ${slot.time}`)
                  .join(" · ")}
              </td>
            </tr>
          );
        })}
      </DataTable>
    </RequirePermission>
  );
}
