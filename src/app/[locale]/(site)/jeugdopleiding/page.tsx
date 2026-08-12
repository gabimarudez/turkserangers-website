import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { club } from "@/data/club";
import { teamsByOrder } from "@/data/teams";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).youth.heading };
}

const vision = [
  {
    icon: Heart,
    title: { nl: "Plezier eerst", tr: "Önce eğlence", en: "Enjoyment first" },
    body: {
      nl: "Kinderen leren het snelst wanneer ze graag komen. Winnen is mooi, maar nooit het enige doel.",
      tr: "Çocuklar gelmekten keyif aldıklarında en hızlı öğrenirler. Kazanmak güzeldir ama tek amaç değildir.",
      en: "Children learn fastest when they enjoy being here. Winning is nice, but never the only goal.",
    },
  },
  {
    icon: Sparkles,
    title: { nl: "Iedereen speelt", tr: "Herkes oynar", en: "Everyone plays" },
    body: {
      nl: "Bij de jongste ploegen krijgt elke speler evenveel speelminuten, ongeacht niveau.",
      tr: "En küçük yaş gruplarında her oyuncu, seviyesi ne olursa olsun eşit süre alır.",
      en: "In the youngest age groups every player gets equal playing time, whatever their level.",
    },
  },
  {
    icon: ShieldCheck,
    title: { nl: "Respect en veiligheid", tr: "Saygı ve güvenlik", en: "Respect and safety" },
    body: {
      nl: "Respect voor ploegmaats, tegenstander en scheidsrechter. De club heeft een aanspreekpunt integriteit.",
      tr: "Takım arkadaşlarına, rakibe ve hakeme saygı. Kulübün bir bütünlük irtibat kişisi vardır.",
      en: "Respect for teammates, opponents and officials. The club has a designated safeguarding contact.",
    },
  },
];

export default async function YouthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const youthTeams = teamsByOrder.filter((t) => t.category === "youth");

  return (
    <>
      <PageHeader
        eyebrow={dict.youth.eyebrow}
        title={dict.youth.heading}
        description={dict.youth.intro}
      />

      <div className="container space-y-16 py-14 sm:py-16">
        <Reveal>
          <figure>
            <PhotoSlot
              src={club.images.youth}
              alt={
                locale === "tr"
                  ? "Vural Soylu tribününde toplanan bütün altyapı takımları"
                  : locale === "en"
                    ? "All youth teams together in the Vural Soylu stand"
                    : "Alle jeugdploegen samen op de Vural Soylu-tribune"
              }
              className="aspect-[16/9] w-full rounded-xl sm:aspect-[21/9]"
              showLabel={false}
            />
            <figcaption className="mt-3 text-xs text-white/40">
              {locale === "tr"
                ? "U6'dan U17'ye kadar bütün altyapı takımları, sezon açılışında."
                : locale === "en"
                  ? "Every youth team, from U6 to U17, at the start of the season."
                  : "Alle jeugdploegen, van U6 tot U17, bij de start van het seizoen."}
            </figcaption>
          </figure>
        </Reveal>

        <section>
          <Reveal>
            <h2 className="section-heading rule-accent mb-8">
              {dict.youth.visionHeading}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {vision.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title.en} delay={index * 0.08}>
                <div className="card h-full p-6">
                  <Icon className="h-6 w-6 text-rangers-red" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {title[locale]}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{body[locale]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <h2 className="section-heading rule-accent mb-8">
              {dict.youth.trainingHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-rangers-border text-left text-[11px] uppercase tracking-wider text-white/40">
                      <th scope="col" className="px-5 py-3 font-semibold">
                        {dict.teams.heading}
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        {dict.club.factLeague}
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        {dict.teams.trainingHeading}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {youthTeams.map((team) => (
                      <tr
                        key={team.slug}
                        className="border-b border-rangers-border/60 last:border-0"
                      >
                        <td className="px-5 py-3">
                          <Link
                            href={href(locale, `/teams/${team.slug}`)}
                            className="font-display font-semibold text-white hover:text-rangers-red"
                          >
                            {team.name}
                          </Link>
                        </td>
                        <td className="px-5 py-3 text-white/50">{team.league[locale]}</td>
                        <td className="px-5 py-3 text-white/60">
                          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
                            {team.trainingTimes.map((slot, index) => (
                              <span
                                key={`${team.slug}-${index}`}
                                className="inline-flex items-center gap-1.5"
                              >
                                <Clock
                                  className="h-3.5 w-3.5 text-rangers-red"
                                  aria-hidden="true"
                                />
                                {slot.day[locale]} {slot.time}
                              </span>
                            ))}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <section className="card grid grid-cols-1 gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="section-heading mb-4">{dict.youth.joinHeading}</h2>
              <p className="text-white/60">{dict.youth.joinBody}</p>
            </div>
            <div className="lg:justify-self-end">
              <Link href={href(locale, "/contact")} className="btn-primary">
                {dict.contact.heading}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
