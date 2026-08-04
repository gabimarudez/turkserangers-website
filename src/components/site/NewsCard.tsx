import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { formatDate, href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import type { NewsArticle } from "@/data/types";
import { categoryLabels } from "@/data/news";

interface NewsCardProps {
  article: NewsArticle;
  locale: Locale;
  dict: Dictionary;
}

export function FeaturedNewsCard({ article, locale, dict }: NewsCardProps) {
  return (
    <Link
      href={href(locale, `/nieuws/${article.slug}`)}
      className="card group block overflow-hidden"
    >
      <PhotoSlot
        src={article.image}
        alt={article.imageAlt[locale]}
        className="aspect-[16/10] w-full"
      />
      <div className="p-6">
        <span className="badge bg-rangers-red text-white">
          {categoryLabels[article.category][locale]}
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-white transition-colors group-hover:text-rangers-red sm:text-2xl">
          {article.title[locale]}
        </h3>
        <p className="mt-2 text-sm text-white/55">{article.excerpt[locale]}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-white/40">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt, locale)}
          </time>
          <span className="inline-flex items-center gap-1 font-semibold text-rangers-red">
            {dict.common.readMore}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CompactNewsCard({ article, locale }: NewsCardProps) {
  return (
    <Link
      href={href(locale, `/nieuws/${article.slug}`)}
      className="card group flex gap-4 p-3"
    >
      <PhotoSlot
        src={article.image}
        alt={article.imageAlt[locale]}
        className="h-20 w-20 shrink-0 rounded-lg"
        showLabel={false}
      />
      <div className="min-w-0">
        <span className="eyebrow">{categoryLabels[article.category][locale]}</span>
        <h3 className="mt-1 line-clamp-2 font-display text-sm font-semibold leading-snug text-white transition-colors group-hover:text-rangers-red">
          {article.title[locale]}
        </h3>
        <time
          dateTime={article.publishedAt}
          className="mt-1 block text-xs text-white/40"
        >
          {formatDate(article.publishedAt, locale)}
        </time>
      </div>
    </Link>
  );
}

/** Kaart voor het nieuwsoverzicht: beeld boven, tekst onder. */
export function NewsGridCard({ article, locale, dict }: NewsCardProps) {
  return (
    <Link
      href={href(locale, `/nieuws/${article.slug}`)}
      className="card group flex h-full flex-col overflow-hidden"
    >
      <PhotoSlot
        src={article.image}
        alt={article.imageAlt[locale]}
        className="aspect-[16/10] w-full"
        showLabel={false}
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="badge self-start bg-rangers-surface2 text-white/60">
          {categoryLabels[article.category][locale]}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-rangers-red">
          {article.title[locale]}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-white/55">
          {article.excerpt[locale]}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-white/40">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt, locale)}
          </time>
          <span className="inline-flex items-center gap-1 font-semibold text-rangers-red">
            {dict.common.readMore}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
