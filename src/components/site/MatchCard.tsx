import Link from "next/link";
import { Calendar, Clock, MapPin, Shield } from "lucide-react";
import { formatTime, formatWeekday, href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import type { Match } from "@/data/types";
import { outcomeOf } from "@/data/matches";
import { club } from "@/data/club";
import { teamBySlug } from "@/data/teams";

const outcomeStyles = {
  W: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  D: "bg-white/10 text-white/70 ring-white/20",
  L: "bg-rangers-red/15 text-rangers-redSoft ring-rangers-red/30",
} as const;

function competitionLabel(match: Match, dict: Dictionary) {
  if (match.competition === "friendly") return dict.matches.friendly;
  if (match.competition === "cup") return dict.matches.cup;
  return match.matchday
    ? `${dict.common.matchday} ${match.matchday}`
    : dict.matches.competition;
}

/** Grote kaart met wapenschilden — gebruikt voor de eerstvolgende wedstrijd. */
export function NextMatchCard({
  match,
  locale,
  dict,
}: {
  match: Match;
  locale: Locale;
  dict: Dictionary;
}) {
  const team = teamBySlug(match.teamSlug);
  const homeName = match.isHome ? club.name : match.opponent;
  const awayName = match.isHome ? match.opponent : club.name;

  return (
    <div className="card flex h-full flex-col p-6">
      <span className="eyebrow mb-5">
        {team?.league[locale]} · {competitionLabel(match, dict)}
      </span>

      <div className="flex items-center justify-between gap-3">
        {[homeName, awayName].map((name, index) => (
          <div key={`${name}-${index}`} className="contents">
            {index === 1 && (
              <span className="font-display text-sm font-semibold text-white/30">
                {dict.common.vs}
              </span>
            )}
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rangers-surface2 ring-1 ring-white/10">
                <Shield
                  className={`h-6 w-6 ${name === club.name ? "text-rangers-red" : "text-white/40"}`}
                  aria-hidden="true"
                />
              </span>
              <span className="text-xs font-medium text-white/70">{name}</span>
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-6 space-y-3 border-t border-rangers-border pt-5 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-rangers-red" aria-hidden="true" />
          <dt className="sr-only">{dict.common.date}</dt>
          <dd className="capitalize">{formatWeekday(match.kickoff, locale)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-rangers-red" aria-hidden="true" />
          <dt className="sr-only">{dict.common.time}</dt>
          <dd>{formatTime(match.kickoff, locale)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-rangers-red" aria-hidden="true" />
          <dt className="sr-only">{dict.common.location}</dt>
          <dd>{match.venue}</dd>
        </div>
      </dl>

      <Link href={href(locale, "/wedstrijden")} className="btn-primary mt-6 w-full">
        {dict.matches.heading}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

/** Compacte rij voor lijsten met wedstrijden en uitslagen. */
export function MatchRow({
  match,
  locale,
  dict,
}: {
  match: Match;
  locale: Locale;
  dict: Dictionary;
}) {
  const team = teamBySlug(match.teamSlug);
  const outcome = outcomeOf(match);
  const played = match.status === "played";

  return (
    <li className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="w-24 shrink-0 text-xs text-white/45">
          <span className="block capitalize text-white/70">
            {formatWeekday(match.kickoff, locale)}
          </span>
          <span className="block">{formatTime(match.kickoff, locale)}</span>
        </div>

        <div className="min-w-0">
          <p className="font-display text-base font-semibold text-white">
            {match.isHome ? club.shortName : match.opponent}
            <span className="mx-2 text-white/30">—</span>
            {match.isHome ? match.opponent : club.shortName}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
            <span>{team?.name}</span>
            <span aria-hidden="true">·</span>
            <span>{competitionLabel(match, dict)}</span>
            <span aria-hidden="true">·</span>
            <span>{match.isHome ? dict.matches.home : dict.matches.away}</span>
            <span aria-hidden="true">·</span>
            <span>{match.venue}</span>
          </p>
        </div>
      </div>

      <div className="shrink-0">
        {played && outcome ? (
          <span
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-display text-base font-semibold ring-1 ${outcomeStyles[outcome]}`}
          >
            {match.scoreFor} — {match.scoreAgainst}
          </span>
        ) : (
          <span className="badge bg-rangers-surface2 text-white/50">
            {formatTime(match.kickoff, locale)}
          </span>
        )}
      </div>
    </li>
  );
}
