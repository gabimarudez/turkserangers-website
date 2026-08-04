import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TeamCard } from "@/components/site/TeamCard";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { teamsByOrder } from "@/data/teams";
import type { TeamCategory } from "@/data/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).teams.heading };
}

const groups: { category: TeamCategory; key: "categoryFirst" | "categoryWomen" | "categoryYouth" }[] =
  [
    { category: "first", key: "categoryFirst" },
    { category: "women", key: "categoryWomen" },
    { category: "youth", key: "categoryYouth" },
  ];

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.teams.eyebrow}
        title={dict.teams.heading}
        description={dict.teams.intro}
      />

      <div className="container space-y-16 py-14 sm:py-16">
        {groups.map(({ category, key }) => {
          const teams = teamsByOrder.filter((t) => t.category === category);
          if (teams.length === 0) return null;

          return (
            <section key={category} id={category}>
              <Reveal>
                <h2 className="section-heading rule-accent mb-8">{dict.teams[key]}</h2>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {teams.map((team, index) => (
                  <Reveal key={team.slug} delay={Math.min(index, 6) * 0.05}>
                    <TeamCard team={team} locale={locale} dict={dict} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
