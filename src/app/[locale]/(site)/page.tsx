import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  ChevronDown,
  ImageIcon,
  Instagram,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHeading } from "@/components/ui/Section";
import { NextMatchCard } from "@/components/site/MatchCard";
import { FeaturedNewsCard, CompactNewsCard } from "@/components/site/NewsCard";
import { TeamCard } from "@/components/site/TeamCard";
import { formatTime, formatWeekday, getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { club } from "@/data/club";
import { newsByDate } from "@/data/news";
import { featuredTeamSlugs, teamBySlug, teamsByOrder } from "@/data/teams";
import {
  lastResult,
  nextMatch,
  outcomeOf,
  ownRow,
  playedMatches,
  standingFor,
} from "@/data/matches";
import { albums } from "@/data/sponsors";
import { sponsorsByTier } from "@/data/sponsors";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const featured = newsByDate[0];
  const secondary = newsByDate.slice(1, 4);
  const upcoming = nextMatch("a-kern");
  const last = lastResult("a-kern");
  const recent = playedMatches("a-kern").slice(0, 4);
  const standing = standingFor("a-kern");
  const position = standing ? ownRow(standing) : undefined;
  const teams = featuredTeamSlugs
    .map((slug) => teamBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const galleryPhotos = albums.flatMap((a) => a.photos).slice(0, 5);

  const quickLinks = [
    {
      icon: Calendar,
      label: dict.home.nextMatch,
      value: upcoming
        ? `${club.shortName} — ${upcoming.opponent}`
        : dict.matches.noUpcoming,
      meta: upcoming
        ? `${formatWeekday(upcoming.kickoff, locale)} · ${formatTime(upcoming.kickoff, locale)}`
        : "",
      path: "/wedstrijden",
    },
    {
      icon: Trophy,
      label: dict.home.lastResult,
      value: last ? `${last.scoreFor} — ${last.scoreAgainst}` : "—",
      meta: last ? `${club.shortName} vs ${last.opponent}` : "",
      path: "/wedstrijden#uitslagen",
    },
    {
      icon: BarChart3,
      label: dict.home.standing,
      value: position ? `${position.position}.` : "—",
      meta: standing ? `${standing.competition[locale]} · ${standing.season}` : "",
      path: "/wedstrijden#klassement",
    },
    {
      icon: ImageIcon,
      label: dict.gallery.heading,
      value: `${albums.reduce((sum, a) => sum + a.photos.length, 0)} ${dict.gallery.photos}`,
      meta: dict.home.galleryTeaser,
      path: "/fotogalerij",
    },
  ];

  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-rangers-black">
        <PhotoSlot
          src={club.images.hero}
          alt={
            locale === "tr"
              ? "Anfield sahası ve Vural Soylu tribünü"
              : locale === "en"
                ? "The Anfield pitch and the Vural Soylu stand"
                : "Het terrein aan Anfield met de Vural Soylu-tribune"
          }
          className="absolute inset-0 h-full w-full"
          decorative
          priority
        />
        {/*
          De foto is bij daglicht genomen; zonder deze extra donkere laag
          leest de witte titel er niet op.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-1/4 h-72 w-72 animate-flarePulse rounded-full bg-rangers-red/25 blur-[90px]" />
          <div
            className="absolute right-0 top-0 h-96 w-96 animate-smokeDrift rounded-full bg-rangers-red/10 blur-[110px]"
            style={{ animationDelay: "1.2s" }}
          />
        </div>

        {/* w-full is nodig: de sectie is een flexbox, anders krimpt de container. */}
        <div className="container relative z-10 w-full pb-20 pt-40 sm:pb-28">
          <Reveal>
            <p className="eyebrow mb-4">{dict.home.heroEyebrow}</p>
            <h1 className="max-w-3xl font-display text-5xl font-semibold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {club.name} {club.city}
            </h1>
            <p className="mt-5 max-w-md text-base text-white/70">
              {dict.home.heroTagline}
              <br />
              {dict.home.heroSubline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(locale, "/wedstrijden")} className="btn-primary">
                {dict.home.ctaMatches}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={href(locale, "/contact")} className="btn-outline">
                {dict.home.ctaMember}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 sm:flex"
        >
          <span className="text-[11px] uppercase tracking-widest2">
            {dict.common.scroll}
          </span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* ──────────────────── Snelle info-strip ──────────────────── */}
      <Reveal className="relative z-20">
        <div className="container">
          <div className="grid grid-cols-1 divide-y divide-rangers-border rounded-xl border border-rangers-border bg-rangers-surface shadow-card sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {quickLinks.map(({ icon: Icon, label, value, meta, path }) => (
              <Link
                key={label}
                href={href(locale, path)}
                className="group flex flex-col gap-2 p-6 transition-colors hover:bg-white/[0.03]"
              >
                <span className="flex items-center gap-2 text-rangers-red">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {label}
                  </span>
                </span>
                <span className="font-display text-xl font-semibold text-white">
                  {value}
                </span>
                <span className="text-xs text-white/45">{meta}</span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ───────────────────────── Nieuws ───────────────────────── */}
      <section className="container py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow={dict.home.newsEyebrow}
              title={dict.home.newsHeading}
              action={
                <Link
                  href={href(locale, "/nieuws")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-rangers-red hover:text-white"
                >
                  {dict.common.viewAll}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
              <Reveal className="sm:col-span-3">
                <FeaturedNewsCard article={featured} locale={locale} dict={dict} />
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col gap-4 sm:col-span-2">
                {secondary.map((article) => (
                  <CompactNewsCard
                    key={article.slug}
                    article={article}
                    locale={locale}
                    dict={dict}
                  />
                ))}
              </Reveal>
            </div>
          </div>

          <div className="space-y-5">
            {upcoming && (
              <Reveal delay={0.1}>
                <NextMatchCard match={upcoming} locale={locale} dict={dict} />
              </Reveal>
            )}

            {recent.length > 0 && (
              <Reveal delay={0.15}>
                <div className="card p-6">
                  <p className="eyebrow mb-4">{dict.matches.results}</p>
                  <ul className="divide-y divide-rangers-border">
                    {recent.map((match) => {
                      const outcome = outcomeOf(match);
                      return (
                        <li
                          key={match.id}
                          className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                        >
                          <span className="min-w-0 truncate text-sm text-white/70">
                            {match.opponent}
                          </span>
                          <span
                            className={`shrink-0 rounded px-2 py-1 font-display text-sm font-semibold ${
                              outcome === "W"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : outcome === "L"
                                  ? "bg-rangers-red/15 text-rangers-redSoft"
                                  : "bg-white/10 text-white/60"
                            }`}
                          >
                            {match.scoreFor} — {match.scoreAgainst}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    href={href(locale, "/wedstrijden#uitslagen")}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rangers-red hover:text-white"
                  >
                    {dict.common.viewAll}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Teams ───────────────────────── */}
      <section className="container py-8 sm:py-12">
        <SectionHeading
          eyebrow={dict.home.teamsEyebrow}
          title={dict.home.teamsHeading}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {teams.map((team, index) => (
            <Reveal key={team.slug} delay={index * 0.05}>
              <TeamCard team={team} locale={locale} dict={dict} />
            </Reveal>
          ))}
          <Reveal delay={teams.length * 0.05}>
            <Link
              href={href(locale, "/teams")}
              className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 text-center text-white/60 transition-colors hover:border-rangers-red hover:text-white"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span className="font-display text-xs font-semibold uppercase tracking-wide">
                {dict.home.allTeams}
              </span>
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider">
                {teamsByOrder.length}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── Club in cijfers ──────────────────── */}
      <section className="relative overflow-hidden border-y border-rangers-border bg-black py-16">
        <Shield
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 text-white/[0.03]"
        />
        <div className="container relative">
          <Reveal>
            <p className="eyebrow mb-8">{dict.home.statsEyebrow}</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: String(club.stats.founded), label: dict.home.statFounded },
              { value: String(club.stats.teams), label: dict.home.statTeams },
              { value: `${club.stats.members}+`, label: dict.home.statMembers },
              { value: String(club.stats.volunteers), label: dict.home.statVolunteers },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <Counter
                  value={stat.value}
                  className="font-display text-4xl font-bold text-rangers-red sm:text-5xl"
                />
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest2 text-white/50">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── Galerij ──────────────────────── */}
      <section className="container py-16 sm:py-20">
        <SectionHeading
          eyebrow={dict.home.galleryEyebrow}
          title={dict.home.galleryHeading}
        />
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {galleryPhotos.map((photo, index) => (
              <div
                key={`${photo.alt[locale]}-${index}`}
                className={`group relative overflow-hidden rounded-xl ${
                  index === 4 ? "hidden sm:block" : ""
                }`}
              >
                <PhotoSlot
                  src={photo.src}
                  alt={photo.alt[locale]}
                  className="aspect-[4/5] transition-transform duration-500 group-hover:scale-105"
                  showLabel={false}
                />
              </div>
            ))}
            <Link
              href={href(locale, "/fotogalerij")}
              className="group relative flex aspect-[4/5] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-rangers-red text-center transition-colors hover:bg-rangers-redDark"
            >
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                {dict.home.viewAllPhotos}
              </span>
              <ArrowRight
                className="h-4 w-4 text-white transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ──────────────────────── Sponsors ──────────────────────── */}
      <section className="container pb-16 sm:pb-20">
        <SectionHeading
          eyebrow={dict.home.sponsorsEyebrow}
          title={dict.home.sponsorsHeading}
          action={
            <Link
              href={href(locale, "/sponsors")}
              className="inline-flex items-center gap-1 text-sm font-semibold text-rangers-red hover:text-white"
            >
              {dict.home.becomeSponsor}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {(["main", "partner", "supporting"] as const).map((tier, index) => (
            <Reveal key={tier} delay={index * 0.1}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-white/40">
                {dict.sponsors.tiers[tier]}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {sponsorsByTier(tier).map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="flex h-16 items-center justify-center rounded-lg border border-rangers-border bg-rangers-surface px-3 text-center transition-colors hover:border-white/25"
                  >
                    <span className="font-display text-sm font-semibold uppercase tracking-wide text-white/70">
                      {sponsor.name}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────── Over de club ─────────────────────── */}
      <section className="container pb-16 sm:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">{dict.home.aboutEyebrow}</p>
            <h2 className="section-heading mb-5">{dict.home.aboutHeading}</h2>
            <p className="max-w-lg text-white/60">{dict.home.aboutBody}</p>
            <Link href={href(locale, "/club")} className="btn-primary mt-6">
              {dict.home.aboutCta}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <PhotoSlot
              src={club.images.ground}
              alt={
                locale === "tr"
                  ? "Kulübün sahası ve tribünü"
                  : locale === "en"
                    ? "The club's pitch and stand"
                    : "Het terrein en de tribune van de club"
              }
              className="aspect-[16/10] w-full rounded-xl lg:aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────── Instagram ──────────────────────── */}
      <section className="container pb-20 sm:pb-24">
        <SectionHeading
          eyebrow={dict.home.socialEyebrow}
          title={dict.home.socialHeading}
        />
        <Reveal>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {albums[1].photos.concat(albums[2].photos).slice(0, 6).map((photo, index) => (
              <div
                key={`ig-${index}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <PhotoSlot
                  src={photo.src}
                  alt={photo.alt[locale]}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  showLabel={false}
                />
              </div>
            ))}
            <a
              href={club.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-3 flex flex-col items-center justify-center gap-2 rounded-lg bg-rangers-red p-6 text-center transition-colors hover:bg-rangers-redDark sm:col-span-4 lg:col-span-1"
            >
              <Instagram className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="font-display text-xs font-semibold uppercase leading-tight text-white">
                {dict.home.followUs}
                <br />
                {club.social.instagramHandle}
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
