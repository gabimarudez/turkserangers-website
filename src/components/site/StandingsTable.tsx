import { formatDate } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import type { Standing } from "@/data/types";

export function StandingsTable({
  standing,
  locale,
  dict,
}: {
  standing: Standing;
  locale: Locale;
  dict: Dictionary;
}) {
  const cols = dict.matches.standingsCols;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rangers-border px-5 py-4">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
          {standing.competition[locale]}
        </h3>
        <p className="text-xs text-white/40">
          {dict.common.season} {standing.season} ·{" "}
          {formatDate(standing.updatedAt, locale)}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-rangers-border text-left text-[11px] uppercase tracking-wider text-white/40">
              <th scope="col" className="px-3 py-3 font-semibold">{cols.pos}</th>
              <th scope="col" className="px-3 py-3 font-semibold">{cols.team}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.played}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.won}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.drawn}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.lost}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.goalsFor}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.goalsAgainst}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.diff}</th>
              <th scope="col" className="px-3 py-3 text-center font-semibold">{cols.points}</th>
            </tr>
          </thead>
          <tbody>
            {standing.rows.map((row) => (
              <tr
                key={row.position}
                className={`border-b border-rangers-border/60 last:border-0 ${
                  row.isOwn ? "bg-rangers-red/10" : ""
                }`}
              >
                <td className="px-3 py-3 text-white/50">{row.position}</td>
                <td
                  className={`px-3 py-3 font-medium ${
                    row.isOwn ? "text-rangers-redSoft" : "text-white/85"
                  }`}
                >
                  {row.team}
                </td>
                <td className="px-3 py-3 text-center text-white/60">{row.played}</td>
                <td className="px-3 py-3 text-center text-white/60">{row.won}</td>
                <td className="px-3 py-3 text-center text-white/60">{row.drawn}</td>
                <td className="px-3 py-3 text-center text-white/60">{row.lost}</td>
                <td className="px-3 py-3 text-center text-white/60">{row.goalsFor}</td>
                <td className="px-3 py-3 text-center text-white/60">{row.goalsAgainst}</td>
                <td className="px-3 py-3 text-center text-white/60">
                  {row.goalsFor - row.goalsAgainst > 0 ? "+" : ""}
                  {row.goalsFor - row.goalsAgainst}
                </td>
                <td className="px-3 py-3 text-center font-display font-semibold text-white">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-rangers-border px-5 py-3 text-xs text-white/35">
        {dict.matches.standingsNote}
      </p>
    </div>
  );
}
