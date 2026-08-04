"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, use, useState, type FormEvent } from "react";
import { ArrowLeft, Check, Info, Save } from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, RequirePermission } from "@/admin/ui";
import type { AdminArticle, PublishState } from "@/admin/types";
import { getDictionary, href } from "@/i18n";
import { defaultLocale, isLocale, localeNames, locales, type Locale } from "@/i18n/config";
import { newsCategories, categoryLabels } from "@/data/news";
import { can } from "@/data/users";
import type { NewsCategory } from "@/data/types";

function emptyArticle(): AdminArticle {
  const blank = { nl: "", tr: "", en: "" };
  return {
    slug: "",
    category: "club",
    title: { ...blank },
    excerpt: { ...blank },
    body: { nl: [""], tr: [""], en: [""] },
    imageAlt: { ...blank },
    publishedAt: new Date().toISOString().slice(0, 10),
    author: "",
    featured: false,
    status: "draft",
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

/**
 * Het te bewerken artikel komt uit `?slug=`, niet uit een dynamisch pad.
 * Reden: een clientpagina kan geen `generateStaticParams` leveren, en zonder
 * dat kan de site niet volledig statisch geëxporteerd worden.
 */
export default function AdminArticleEditorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <AdminArticleEditor params={params} />
    </Suspense>
  );
}

function AdminArticleEditor({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const slug = useSearchParams().get("slug") ?? "nieuw";
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const router = useRouter();
  const { state, user, saveArticle } = useAdmin();

  const isNew = slug === "nieuw";
  const existing = state.articles.find((a) => a.slug === slug);
  const [draft, setDraft] = useState<AdminArticle>(
    () => existing ?? { ...emptyArticle(), author: user?.name ?? "" },
  );
  const [tab, setTab] = useState<Locale>(locale);
  const [saved, setSaved] = useState(false);

  if (!user) return null;
  if (!isNew && !existing) {
    return <p className="card p-6 text-sm text-white/60">{dict.news.notFound}</p>;
  }

  // Auteurs mogen indienen, niet publiceren.
  const mayPublish = can(user.role, "news", "publish");

  const update = <K extends keyof AdminArticle>(key: K, value: AdminArticle[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const updateLocalized = (
    field: "title" | "excerpt" | "imageAlt",
    value: string,
  ) => setDraft((prev) => ({ ...prev, [field]: { ...prev[field], [tab]: value } }));

  const updateBody = (value: string) =>
    setDraft((prev) => ({
      ...prev,
      body: { ...prev.body, [tab]: value.split("\n\n").map((p) => p.trim()) },
    }));

  function handleSubmit(event: FormEvent<HTMLFormElement>, status: PublishState) {
    event.preventDefault();
    const finalSlug = draft.slug || slugify(draft.title.nl || draft.title[tab]);
    if (!finalSlug) return;

    saveArticle({ ...draft, slug: finalSlug, status });
    setSaved(true);
    window.setTimeout(() => router.push(href(locale, "/admin/nieuws")), 500);
  }

  const labels = {
    title: locale === "tr" ? "Başlık" : locale === "en" ? "Title" : "Titel",
    excerpt: locale === "tr" ? "Özet" : locale === "en" ? "Excerpt" : "Samenvatting",
    body: locale === "tr" ? "Metin" : locale === "en" ? "Body" : "Tekst",
    imageAlt:
      locale === "tr"
        ? "Fotoğraf açıklaması"
        : locale === "en"
          ? "Image description"
          : "Fotobeschrijving",
    newArticle: locale === "tr" ? "Yeni haber" : locale === "en" ? "New article" : "Nieuw artikel",
    save: locale === "tr" ? "Taslak olarak kaydet" : locale === "en" ? "Save draft" : "Opslaan als concept",
    submit: locale === "tr" ? "İncelemeye gönder" : locale === "en" ? "Submit for review" : "Indienen ter review",
    publish: locale === "tr" ? "Yayınla" : locale === "en" ? "Publish" : "Publiceren",
    bodyHint:
      locale === "tr"
        ? "Paragrafları boş bir satırla ayırın."
        : locale === "en"
          ? "Separate paragraphs with a blank line."
          : "Scheid alinea's met een lege regel.",
    translationHint:
      locale === "tr"
        ? "Her dil için ayrı ayrı doldurun. Boş bırakılan dilde bu alan görünmez."
        : locale === "en"
          ? "Fill this in for each language. A language left empty will show nothing."
          : "Vul dit per taal in. Een taal die je leeg laat, toont niets.",
  };

  return (
    <RequirePermission resource="news" action="edit" message={dict.admin.noAccess}>
      <Link
        href={href(locale, "/admin/nieuws")}
        className="mb-4 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {dict.admin.news}
      </Link>

      <AdminPageHeader
        title={isNew ? labels.newArticle : draft.title[locale] || draft.slug}
        description={labels.translationHint}
      />

      <form className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* Taaltabs */}
          <div className="flex gap-1 rounded-lg border border-rangers-border bg-rangers-surface p-1">
            {locales.map((code) => {
              const filled = Boolean(draft.title[code]?.trim());
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setTab(code)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
                    tab === code
                      ? "bg-rangers-red text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {localeNames[code]}
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      filled ? "bg-emerald-400" : "bg-white/25"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="card space-y-4 p-5">
            <div>
              <label className="label" htmlFor="title">
                {labels.title} — {localeNames[tab]}
              </label>
              <input
                id="title"
                className="field"
                value={draft.title[tab]}
                onChange={(e) => updateLocalized("title", e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="excerpt">
                {labels.excerpt} — {localeNames[tab]}
              </label>
              <textarea
                id="excerpt"
                rows={2}
                className="field resize-y"
                value={draft.excerpt[tab]}
                onChange={(e) => updateLocalized("excerpt", e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="body">
                {labels.body} — {localeNames[tab]}
              </label>
              <textarea
                id="body"
                rows={12}
                className="field resize-y font-mono text-[13px] leading-relaxed"
                value={draft.body[tab].join("\n\n")}
                onChange={(e) => updateBody(e.target.value)}
              />
              <p className="mt-1.5 text-xs text-white/35">{labels.bodyHint}</p>
            </div>

            <div>
              <label className="label" htmlFor="imageAlt">
                {labels.imageAlt} — {localeNames[tab]}
              </label>
              <input
                id="imageAlt"
                className="field"
                value={draft.imageAlt[tab]}
                onChange={(e) => updateLocalized("imageAlt", e.target.value)}
              />
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="card space-y-4 p-5">
            <div>
              <label className="label" htmlFor="slug">
                URL
              </label>
              <input
                id="slug"
                className="field"
                placeholder={slugify(draft.title.nl) || "url-van-artikel"}
                value={draft.slug}
                onChange={(e) => update("slug", slugify(e.target.value))}
                readOnly={!isNew}
              />
            </div>

            <div>
              <label className="label" htmlFor="category">
                {dict.news.categories}
              </label>
              <select
                id="category"
                className="field"
                value={draft.category}
                onChange={(e) => update("category", e.target.value as NewsCategory)}
              >
                {newsCategories.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabels[category][locale]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="publishedAt">
                {dict.common.date}
              </label>
              <input
                id="publishedAt"
                type="date"
                className="field"
                value={draft.publishedAt}
                onChange={(e) => update("publishedAt", e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="author">
                {dict.news.author}
              </label>
              <input
                id="author"
                className="field"
                value={draft.author}
                onChange={(e) => update("author", e.target.value)}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4 accent-rangers-red"
              />
              {locale === "tr"
                ? "Ana sayfada öne çıkar"
                : locale === "en"
                  ? "Feature on homepage"
                  : "Uitlichten op homepagina"}
            </label>
          </div>

          {!mayPublish && (
            <div className="flex items-start gap-2 rounded-md border border-rangers-border bg-rangers-surface2 p-3 text-xs text-white/50">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-rangers-red" aria-hidden="true" />
              <p>
                {locale === "tr"
                  ? "Yazar rolü yayınlayamaz. Kaydettiğinizde haber editör onayına düşer."
                  : locale === "en"
                    ? "The author role cannot publish. Your article goes to an editor for review."
                    : "De rol auteur kan niet publiceren. Je artikel gaat naar een redacteur ter review."}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <button
              type="submit"
              onClick={(e) =>
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>, "draft")
              }
              className="btn-outline w-full"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              {labels.save}
            </button>

            <button
              type="submit"
              onClick={(e) =>
                handleSubmit(
                  e as unknown as FormEvent<HTMLFormElement>,
                  mayPublish ? "published" : "review",
                )
              }
              className="btn-primary w-full"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              {mayPublish ? labels.publish : labels.submit}
            </button>

            {saved && (
              <p className="text-center text-xs text-emerald-400">
                {locale === "tr" ? "Kaydedildi" : locale === "en" ? "Saved" : "Opgeslagen"}
              </p>
            )}
          </div>
        </aside>
      </form>
    </RequirePermission>
  );
}
