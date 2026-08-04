import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SquadTable } from "@/components/site/SquadTable";
import { MatchRow } from "@/components/site/MatchCard";
import { StandingsTable } from "@/components/site/StandingsTable";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { teamBySlug, teams } from "@/data/teams";
import { playersByTeam } from "@/data/players";
import { matchesByTeam, standingFor } from "@/data/matches";
import { staffById } from "@/data/club";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    teams.map((team) => ({ locale, slug: team.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const team = teamBySlug(slug);
  return { title: team ? team.name : getDictionary(locale).teams.heading };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const team = teamBySlug(slug);
  if (!team) notFound();

  const dict = getDictionary(locale);
  const squad = playersByTeam(team.slug);
  const fixtures = matchesByTeam(team.slug);
  const standing = standingFor(team.slug);
  const coaches = team.coachIds
    .map((id) => staffById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageHeader
        eyebrow={team.league[locale]}
        title={team.name}
        description={team.description[locale]}
      />

      <div className="container space-y-16 py-14 sm:py-16">
        {/* Staf + trainingsuren */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h2 className="section-heading rule-accent mb-6">{dict.teams.staffHeading}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {coaches.map((coach) => (
                <div key={coach.id} className="card flex items-center gap-4 p-4">
                  <PhotoSlot
                    src={coach.photo}
                    alt={coach.name}
                    className="h-14 w-14 shrink-0 rounded-full"
                    showLabel={false}
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-white">
                      {coach.name}
                    </p>
                    <p className="text-xs text-white/45">{coach.role[locale]}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="section-heading rule-accent mb-6">
              {dict.teams.trainingHeading}
            </h2>
            <ul className="card divide-y divide-rangers-border">
              {team.trainingTimes.map((slot, index) => (
                <li
                  key={`${slot.day[locale]}-${index}`}
                  className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm"
                >
                  <span className="text-white/80">{slot.day[locale]}</span>
                  <span className="inline-flex items-center gap-1.5 text-white/50">
                    <Clock className="h-3.5 w-3.5 text-rangers-red" aria-hidden="true" />
                    {slot.time}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Selectie */}
        <section>
          <Reveal>
            <h2 className="section-heading rule-accent mb-8">{dict.teams.squadHeading}</h2>
          </Reveal>
          <SquadTable players={squad} locale={locale} dict={dict} />
        </section>

        {/* Kalender */}
        {fixtures.length > 0 && (
          <section>
            <Reveal>
              <h2 className="section-heading rule-accent mb-8">
                {dict.teams.scheduleHeading}
              </h2>
            </Reveal>
            <ul className="space-y-3">
              {fixtures.map((match) => (
                <MatchRow key={match.id} match={match} locale={locale} dict={dict} />
              ))}
            </ul>
          </section>
        )}

        {/* Klassement */}
        {standing && (
          <section>
            <Reveal>
              <h2 className="section-heading rule-accent mb-8">
                {dict.matches.standings}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <StandingsTable standing={standing} locale={locale} dict={dict} />
            </Reveal>
          </section>
        )}
      </div>
    </>
  );
}
