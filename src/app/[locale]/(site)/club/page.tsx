import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { board, club, coaches, history } from "@/data/club";
import { teamBySlug } from "@/data/teams";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).club.heading };
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const aKern = teamBySlug("a-kern");

  const facts = [
    { label: dict.club.factFullName, value: club.fullName },
    { label: dict.club.factFounded, value: String(club.founded) },
    { label: dict.club.factRegistration, value: club.registrationNumber },
    { label: dict.club.factColors, value: dict.club.colorsValue },
    { label: dict.club.factGround, value: club.ground },
    { label: dict.club.factLeague, value: aKern?.league[locale] ?? "—" },
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.club.eyebrow}
        title={dict.club.heading}
        description={dict.club.intro}
      />

      {/* Clubgegevens */}
      <section className="container py-14 sm:py-16">
        <Reveal>
          <h2 className="section-heading rule-accent mb-8">{dict.club.factsHeading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-rangers-border bg-rangers-border sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-rangers-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-white">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Geschiedenis */}
      <section id="geschiedenis" className="scroll-mt-24 border-y border-rangers-border bg-black py-14 sm:py-16">
        <div className="container">
          <Reveal>
            <h2 className="section-heading rule-accent mb-10">
              {dict.club.historyHeading}
            </h2>
          </Reveal>

          <ol className="relative space-y-8 border-l border-rangers-border pl-8">
            {history.map((event, index) => (
              <Reveal as="li" key={event.year} delay={index * 0.08} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.28rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-rangers-red bg-rangers-black"
                />
                <p className="font-display text-2xl font-bold text-rangers-red">
                  {event.year}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  {event.title[locale]}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-white/60">
                  {event.body[locale]}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Bestuur */}
      <section id="bestuur" className="container scroll-mt-24 py-14 sm:py-16">
        <Reveal>
          <h2 className="section-heading rule-accent mb-3">{dict.club.boardHeading}</h2>
          <p className="mb-8 max-w-2xl text-white/60">{dict.club.boardIntro}</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {board.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.05}>
              <article className="card overflow-hidden">
                <PhotoSlot
                  src={member.photo}
                  alt={member.name}
                  className="aspect-[3/4] w-full"
                  showLabel={false}
                />
                <div className="p-3">
                  <p className="font-display text-sm font-semibold leading-tight text-white">
                    {member.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-rangers-red">
                    {member.role[locale]}
                  </p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] text-white/45 hover:text-white"
                    >
                      <Mail className="h-3 w-3" aria-hidden="true" />
                      E-mail
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trainers & staf */}
      <section id="staf" className="scroll-mt-24 border-y border-rangers-border bg-black py-14 sm:py-16">
        <div className="container">
          <Reveal>
            <h2 className="section-heading rule-accent mb-8">{dict.club.staffHeading}</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-rangers-border bg-rangers-border sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach) => (
              <div key={coach.id} className="flex items-center gap-4 bg-rangers-surface p-4">
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
        </div>
      </section>

      {/* Vrijwilligers */}
      <section id="vrijwilligers" className="container scroll-mt-24 py-14 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="section-heading rule-accent mb-5">
              {dict.club.volunteersHeading}
            </h2>
            <p className="max-w-lg text-white/60">{dict.club.volunteersBody}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <PhotoSlot
              alt={
                locale === "tr"
                  ? "Maç günü kantinde gönüllüler"
                  : locale === "en"
                    ? "Volunteers in the canteen on a matchday"
                    : "Vrijwilligers in de kantine op een wedstrijddag"
              }
              className="aspect-[16/10] w-full rounded-xl"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
