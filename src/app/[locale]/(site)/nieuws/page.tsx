import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { NewsGridCard } from "@/components/site/NewsCard";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { newsByDate } from "@/data/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).news.heading };
}

export default async function NewsPage({
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
        eyebrow={dict.news.eyebrow}
        title={dict.news.heading}
        description={dict.news.intro}
      />

      <div className="container py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {newsByDate.map((article, index) => (
            <Reveal key={article.slug} delay={Math.min(index, 5) * 0.06}>
              <NewsGridCard article={article} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
