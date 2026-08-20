import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { MatchRow } from "@/components/site/MatchCard";
import { StandingsTable } from "@/components/site/StandingsTable";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { playedMatches, standings, upcomingMatches } from "@/data/matches";
import { dataReady } from "@/data/status";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).matches.heading };
}

export default async function MatchesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const upcoming = upcomingMatches();
  const results = playedMatches();

  return (
    <>
      <PageHeader
        eyebrow={dict.matches.eyebrow}
        title={dict.matches.heading}
        description={dict.teams.intro}
      />

      <div className="container space-y-16 py-14 sm:py-16">
        {!dataReady.matches ? (
          <Reveal>
            <ComingSoon title={dict.pending.heading} body={dict.pending.matches} />
          </Reveal>
        ) : (
        <>
        <section id="kalender" className="scroll-mt-24">
          <Reveal>
            <h2 className="section-heading rule-accent mb-8">{dict.matches.upcoming}</h2>
          </Reveal>
          {upcoming.length > 0 ? (
            <ul className="space-y-3">
              {upcoming.map((match) => (
                <MatchRow key={match.id} match={match} locale={locale} dict={dict} />
              ))}
            </ul>
          ) : (
            <p className="card p-8 text-center text-sm text-white/50">
              {dict.matches.noUpcoming}
            </p>
          )}
        </section>

        <section id="uitslagen" className="scroll-mt-24">
          <Reveal>
            <h2 className="section-heading rule-accent mb-8">{dict.matches.results}</h2>
          </Reveal>
          {results.length > 0 ? (
            <ul className="space-y-3">
              {results.map((match) => (
                <MatchRow key={match.id} match={match} locale={locale} dict={dict} />
              ))}
            </ul>
          ) : (
            <p className="card p-8 text-center text-sm text-white/50">
              {dict.matches.noResults}
            </p>
          )}
        </section>

        <section id="klassement" className="scroll-mt-24">
          <Reveal>
            <h2 className="section-heading rule-accent mb-8">{dict.matches.standings}</h2>
          </Reveal>
          <div className="space-y-8">
            {standings.map((standing) => (
              <Reveal key={standing.teamSlug}>
                <StandingsTable standing={standing} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </section>
        </>
        )}
      </div>
    </>
  );
}
