"use client";

import { use, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission } from "@/admin/ui";
import { getDictionary, href } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";

interface MenuEntry {
  id: string;
  label: string;
  path: string;
  visible: boolean;
}

/**
 * Menubeheer voor de demo: de volgorde en zichtbaarheid zijn bewerkbaar zodat
 * het bestuur ziet hoe het werkt. In de definitieve versie wordt dit uit de
 * database gelezen en stuurt het de echte navigatie aan.
 */
export default function AdminPagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { user } = useAdmin();

  const [entries, setEntries] = useState<MenuEntry[]>([
    { id: "1", label: dict.nav.home, path: "/", visible: true },
    { id: "2", label: dict.nav.club, path: "/club", visible: true },
    { id: "3", label: dict.nav.teams, path: "/teams", visible: true },
    { id: "4", label: dict.nav.matches, path: "/wedstrijden", visible: true },
    { id: "5", label: dict.nav.news, path: "/nieuws", visible: true },
    { id: "6", label: dict.nav.gallery, path: "/fotogalerij", visible: true },
    { id: "7", label: dict.nav.sponsors, path: "/sponsors", visible: true },
    { id: "8", label: dict.nav.contact, path: "/contact", visible: true },
    { id: "9", label: dict.nav.youth, path: "/jeugdopleiding", visible: true },
    { id: "10", label: dict.nav.rules, path: "/clubreglement", visible: true },
    { id: "11", label: dict.legal.privacyHeading, path: "/privacy", visible: true },
    { id: "12", label: dict.legal.cookiesHeading, path: "/cookies", visible: true },
  ]);

  if (!user) return null;

  function move(index: number, direction: -1 | 1) {
    setEntries((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  function toggle(id: string) {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, visible: !entry.visible } : entry,
      ),
    );
  }

  return (
    <RequirePermission resource="pages" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={`${dict.admin.pages} & ${dict.admin.menu}`}
        description={
          locale === "tr"
            ? "Menü sırasını değiştirin veya bir sayfayı geçici olarak gizleyin."
            : locale === "en"
              ? "Reorder the menu or temporarily hide a page."
              : "Wijzig de volgorde van het menu of verberg tijdelijk een pagina."
        }
      />

      <DataTable
        headers={[
          locale === "tr" ? "Sayfa" : locale === "en" ? "Page" : "Pagina",
          "URL",
          locale === "tr" ? "Görünürlük" : locale === "en" ? "Visibility" : "Zichtbaar",
          locale === "tr" ? "Sıra" : locale === "en" ? "Order" : "Volgorde",
          "",
        ]}
      >
        {entries.map((entry, index) => (
          <tr key={entry.id} className="border-b border-rangers-border/60 last:border-0">
            <td className="px-4 py-3 text-white/85">{entry.label}</td>
            <td className="px-4 py-3 text-xs text-white/45">{entry.path}</td>
            <td className="px-4 py-3">
              <button
                type="button"
                onClick={() => toggle(entry.id)}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  entry.visible
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {entry.visible ? (
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {entry.visible
                  ? locale === "tr" ? "Açık" : locale === "en" ? "Visible" : "Zichtbaar"
                  : locale === "tr" ? "Gizli" : locale === "en" ? "Hidden" : "Verborgen"}
              </button>
            </td>
            <td className="px-4 py-3">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-25"
                  aria-label="Omhoog"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === entries.length - 1}
                  className="rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-25"
                  aria-label="Omlaag"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </td>
            <td className="px-4 py-3 text-right">
              <Link
                href={href(locale, entry.path)}
                target="_blank"
                className="inline-flex rounded-md p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                aria-label={`${entry.label} openen`}
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
    </RequirePermission>
  );
}
