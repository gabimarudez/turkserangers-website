import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { sponsorsByTier } from "@/data/sponsors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).sponsors.heading };
}

const tierStyles = {
  main: "h-28 text-base",
  partner: "h-24 text-sm",
  supporting: "h-20 text-sm",
} as const;

export default async function SponsorsPage({
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
        eyebrow={dict.sponsors.eyebrow}
        title={dict.sponsors.heading}
        description={dict.sponsors.intro}
      />

      <div className="container space-y-12 py-14 sm:py-16">
        {(["main", "partner", "supporting"] as const).map((tier) => (
          <section key={tier}>
            <Reveal>
              <h2 className="section-heading rule-accent mb-6">
                {dict.sponsors.tiers[tier]}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {sponsorsByTier(tier).map((sponsor) => {
                  const inner = (
                    <span className="font-display font-semibold uppercase tracking-wide text-white/70">
                      {sponsor.name}
                    </span>
                  );
                  const className = `flex ${tierStyles[tier]} items-center justify-center rounded-lg border border-rangers-border bg-rangers-surface px-4 text-center transition-colors hover:border-white/25`;

                  return sponsor.website ? (
                    <a
                      key={sponsor.id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={sponsor.id} className={className}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </section>
        ))}

        <Reveal>
          <section className="card overflow-hidden">
            <div className="grid grid-cols-1 gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="section-heading mb-4">{dict.sponsors.becomeHeading}</h2>
                <p className="text-white/60">{dict.sponsors.becomeBody}</p>
              </div>
              <div className="lg:justify-self-end">
                <Link href={href(locale, "/contact")} className="btn-primary">
                  {dict.sponsors.becomeCta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
