import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { NewsGridCard } from "@/components/site/NewsCard";
import { formatDate, getDictionary, href } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { articleBySlug, categoryLabels, news, newsByDate } from "@/data/news";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    news.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = articleBySlug(slug);
  if (!article) return { title: getDictionary(locale).news.notFound };
  return {
    title: article.title[locale],
    description: article.excerpt[locale],
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const article = articleBySlug(slug);
  if (!article) notFound();

  const dict = getDictionary(locale);
  const related = newsByDate.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      <header className="border-b border-rangers-border bg-black">
        <div className="container max-w-3xl py-14 sm:py-16">
          <Reveal>
            <Link
              href={href(locale, "/nieuws")}
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {dict.news.heading}
            </Link>

            <span className="badge bg-rangers-red text-white">
              {categoryLabels[article.category][locale]}
            </span>

            <h1 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-4xl">
              {article.title[locale]}
            </h1>

            <p className="mt-4 text-lg text-white/60">{article.excerpt[locale]}</p>

            <p className="mt-6 flex flex-wrap items-center gap-x-2 text-xs text-white/40">
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt, locale)}
              </time>
              <span aria-hidden="true">·</span>
              <span>
                {dict.news.author} {article.author}
              </span>
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container max-w-3xl py-12">
        <Reveal>
          <PhotoSlot
            src={article.image}
            alt={article.imageAlt[locale]}
            className="aspect-[16/9] w-full rounded-xl"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10 space-y-5">
          {article.body[locale].map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-white/70">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="border-t border-rangers-border bg-black py-14">
          <div className="container">
            <Reveal>
              <h2 className="section-heading rule-accent mb-8">
                {dict.news.relatedHeading}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.06}>
                  <NewsGridCard article={item} locale={locale} dict={dict} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
