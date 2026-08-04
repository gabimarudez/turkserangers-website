"use client";

import Link from "next/link";
import { use } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission, statusStyles } from "@/admin/ui";
import { formatDate, getDictionary, href } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { categoryLabels } from "@/data/news";
import { can } from "@/data/users";

export default function AdminNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user, deleteArticle } = useAdmin();

  if (!user) return null;

  const statusLabels: Record<string, string> = {
    published: locale === "tr" ? "Yayında" : locale === "en" ? "Published" : "Gepubliceerd",
    review: locale === "tr" ? "İncelemede" : locale === "en" ? "In review" : "Ter review",
    draft: locale === "tr" ? "Taslak" : locale === "en" ? "Draft" : "Concept",
  };

  return (
    <RequirePermission resource="news" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.news}
        description={`${state.articles.length} ${locale === "tr" ? "haber" : locale === "en" ? "articles" : "artikelen"}`}
        action={
          can(user.role, "news", "create") ? (
            <Link href={href(locale, "/admin/nieuws/bewerken?slug=nieuw")} className="btn-primary">
              <Plus className="h-4 w-4" aria-hidden="true" />
              {locale === "tr" ? "Yeni haber" : locale === "en" ? "New article" : "Nieuw artikel"}
            </Link>
          ) : undefined
        }
      />

      <DataTable
        headers={[
          locale === "tr" ? "Başlık" : locale === "en" ? "Title" : "Titel",
          dict.news.categories,
          "Status",
          dict.common.date,
          dict.news.author,
          "",
        ]}
      >
        {state.articles.map((article) => (
          <tr key={article.slug} className="border-b border-rangers-border/60 last:border-0">
            <td className="px-4 py-3">
              <Link
                href={href(locale, `/admin/nieuws/bewerken?slug=${article.slug}`)}
                className="font-medium text-white hover:text-rangers-red"
              >
                {article.title[locale]}
              </Link>
              <p className="mt-0.5 text-xs text-white/35">{article.slug}</p>
            </td>
            <td className="px-4 py-3 text-white/60">
              {categoryLabels[article.category][locale]}
            </td>
            <td className="px-4 py-3">
              <span className={`badge ${statusStyles[article.status]}`}>
                {statusLabels[article.status]}
              </span>
            </td>
            <td className="px-4 py-3 text-white/50">
              {formatDate(article.publishedAt, locale)}
            </td>
            <td className="px-4 py-3 text-white/50">{article.author}</td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={href(locale, `/admin/nieuws/bewerken?slug=${article.slug}`)}
                  className="rounded-md p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label={`${dict.common.readMore}: ${article.title[locale]}`}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                {can(user.role, "news", "delete") && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`${article.title[locale]} — ?`)) {
                        deleteArticle(article.slug);
                      }
                    }}
                    className="rounded-md p-2 text-white/50 transition-colors hover:bg-rangers-red/15 hover:text-rangers-redSoft"
                    aria-label={`Verwijder ${article.title[locale]}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </RequirePermission>
  );
}
