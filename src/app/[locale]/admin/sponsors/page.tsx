"use client";

import { use, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission } from "@/admin/ui";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import type { SponsorTier } from "@/data/types";

const tiers: SponsorTier[] = ["main", "partner", "supporting"];

export default function AdminSponsorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user, saveSponsor, deleteSponsor } = useAdmin();

  if (!user) return null;

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    saveSponsor({
      id: `sp-${Date.now()}`,
      name: String(form.get("name")),
      tier: String(form.get("tier")) as SponsorTier,
      website: String(form.get("website") || "") || undefined,
    });
    event.currentTarget.reset();
  }

  return (
    <RequirePermission resource="sponsors" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.sponsors}
        description={
          locale === "tr"
            ? "Logo yüklenmemişse site sponsorun adını marka çerçevesinde gösterir."
            : locale === "en"
              ? "Without an uploaded logo the site shows the sponsor's name in a branded frame."
              : "Zonder geüpload logo toont de site de naam van de sponsor in een merkkader."
        }
      />

      <form onSubmit={handleCreate} className="card mb-6 grid grid-cols-1 gap-4 p-5 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="name">
            {locale === "tr" ? "Sponsor adı" : locale === "en" ? "Sponsor name" : "Naam sponsor"}
          </label>
          <input id="name" name="name" className="field" required />
        </div>
        <div>
          <label className="label" htmlFor="tier">
            {locale === "tr" ? "Kademe" : locale === "en" ? "Tier" : "Categorie"}
          </label>
          <select id="tier" name="tier" className="field">
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {dict.sponsors.tiers[tier]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {locale === "tr" ? "Ekle" : locale === "en" ? "Add" : "Toevoegen"}
          </button>
        </div>
        <div className="sm:col-span-4">
          <label className="label" htmlFor="website">Website</label>
          <input id="website" name="website" type="url" className="field" placeholder="https://" />
        </div>
      </form>

      <DataTable
        headers={[
          locale === "tr" ? "Sponsor" : locale === "en" ? "Sponsor" : "Sponsor",
          locale === "tr" ? "Kademe" : locale === "en" ? "Tier" : "Categorie",
          "Website",
          "",
        ]}
      >
        {state.sponsors.map((sponsor) => (
          <tr key={sponsor.id} className="border-b border-rangers-border/60 last:border-0">
            <td className="px-4 py-3 text-white/85">{sponsor.name}</td>
            <td className="px-4 py-3">
              <select
                value={sponsor.tier}
                onChange={(e) =>
                  saveSponsor({ ...sponsor, tier: e.target.value as SponsorTier })
                }
                className="rounded-md border border-rangers-border bg-rangers-surface2 px-2 py-1.5 text-xs text-white focus:border-rangers-red focus:outline-none"
                aria-label={`Categorie ${sponsor.name}`}
              >
                {tiers.map((tier) => (
                  <option key={tier} value={tier}>
                    {dict.sponsors.tiers[tier]}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-3 text-xs text-white/45">{sponsor.website || "—"}</td>
            <td className="px-4 py-3 text-right">
              <button
                type="button"
                onClick={() => deleteSponsor(sponsor.id)}
                className="rounded-md p-2 text-white/50 transition-colors hover:bg-rangers-red/15 hover:text-rangers-redSoft"
                aria-label={`Verwijder ${sponsor.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </RequirePermission>
  );
}
