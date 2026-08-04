import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import type { Player, Position } from "@/data/types";
import { ageOf } from "@/data/players";

const positionOrder: Position[] = ["GK", "DF", "MF", "FW"];

/**
 * Toont de naam van een speler, of een neutrale aanduiding als er geen
 * publicatietoestemming is. Bij minderjarigen mogen naam en foto pas online
 * na schriftelijke toestemming van de ouders.
 */
function displayName(player: Player, dict: Dictionary): string {
  if (player.publishConsent) return `${player.firstName} ${player.lastName}`;
  return `${dict.teams.player} #${player.shirtNumber}`;
}

export function SquadTable({
  players,
  locale,
  dict,
}: {
  players: Player[];
  locale: Locale;
  dict: Dictionary;
}) {
  if (players.length === 0) {
    return (
      <div className="card p-8 text-center text-sm text-white/50">
        {dict.teams.noPlayers}
      </div>
    );
  }

  const grouped = positionOrder
    .map((position) => ({
      position,
      players: players.filter((p) => p.position === position),
    }))
    .filter((group) => group.players.length > 0);

  return (
    <div className="space-y-10">
      {grouped.map((group) => (
        <section key={group.position}>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest2 text-white/40">
            {dict.teams.positions[group.position]}
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.players.map((player) => (
              <article key={player.id} className="card group overflow-hidden">
                <div className="relative">
                  <PhotoSlot
                    src={player.publishConsent ? player.photo : undefined}
                    alt={displayName(player, dict)}
                    className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-105"
                    showLabel={false}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"
                  />
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-rangers-red font-display text-sm font-bold text-white">
                    {player.shirtNumber}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="font-display text-sm font-semibold uppercase leading-tight text-white">
                      {displayName(player, dict)}
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/50">
                      {dict.teams.positions[player.position]}
                      {player.publishConsent && (
                        <>
                          {" · "}
                          {ageOf(player.birthDate)} {dict.teams.playerInfo.yearsSuffix}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-3 divide-x divide-rangers-border border-t border-rangers-border text-center">
                  {[
                    { label: dict.teams.apps, value: player.stats.appearances },
                    { label: dict.teams.goals, value: player.stats.goals },
                    { label: dict.teams.assists, value: player.stats.assists },
                  ].map((stat) => (
                    <div key={stat.label} className="px-1 py-2.5">
                      <dt className="text-[10px] uppercase tracking-wider text-white/35">
                        {stat.label}
                      </dt>
                      <dd className="font-display text-base font-semibold text-white">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className="text-xs text-white/35">
        {locale === "tr"
          ? "Reşit olmayan oyuncuların adı ve fotoğrafı yalnızca veli izni verildikten sonra gösterilir."
          : locale === "en"
            ? "Names and photos of underage players are only shown once parental consent has been given."
            : "Namen en foto's van minderjarige spelers worden pas getoond na toestemming van de ouders."}
      </p>
    </div>
  );
}
