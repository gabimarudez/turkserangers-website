"use client";

import { use, useState } from "react";
import { Save } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, RequirePermission } from "@/admin/ui";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale, localeNames, locales } from "@/i18n/config";
import { club } from "@/data/club";

export default function AdminSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { user } = useAdmin();
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const fields = [
    { label: dict.club.factFullName, value: club.fullName, name: "fullName" },
    { label: dict.contact.address, value: club.address.street, name: "street" },
    { label: "Postcode", value: club.address.postalCode, name: "postalCode" },
    { label: dict.common.location, value: club.address.city, name: "city" },
    { label: dict.contact.phone, value: club.contact.phone, name: "phone" },
    { label: dict.contact.email, value: club.contact.email, name: "email" },
    { label: dict.club.factGround, value: club.ground, name: "ground" },
    { label: dict.club.factRegistration, value: club.registrationNumber, name: "registration" },
    { label: "Instagram", value: club.social.instagram, name: "instagram" },
    { label: "Facebook", value: club.social.facebook, name: "facebook" },
    { label: "YouTube", value: club.social.youtube, name: "youtube" },
  ];

  return (
    <RequirePermission resource="settings" action="edit" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.settings}
        description={
          locale === "tr"
            ? "Bu bilgiler sitenin altbilgisinde, iletişim sayfasında ve kulüp sayfasında kullanılır."
            : locale === "en"
              ? "These details are used in the footer, on the contact page and on the club page."
              : "Deze gegevens worden gebruikt in de footer, op de contactpagina en op de clubpagina."
        }
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          window.setTimeout(() => setSaved(false), 2500);
        }}
        className="card max-w-3xl space-y-4 p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="label" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                className="field"
                defaultValue={field.value}
                placeholder={field.value ? undefined : "—"}
              />
            </div>
          ))}
        </div>

        <fieldset className="border-t border-rangers-border pt-4">
          <legend className="label">{dict.nav.language}</legend>
          <div className="flex flex-wrap gap-4">
            {locales.map((code) => (
              <label key={code} className="flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  defaultChecked
                  disabled={code === "nl"}
                  className="h-4 w-4 accent-rangers-red"
                />
                {localeNames[code]}
                {code === "nl" && (
                  <span className="text-xs text-white/30">
                    ({locale === "tr" ? "varsayılan" : locale === "en" ? "default" : "standaard"})
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-3 border-t border-rangers-border pt-4">
          <button type="submit" className="btn-primary">
            <Save className="h-4 w-4" aria-hidden="true" />
            {locale === "tr" ? "Kaydet" : locale === "en" ? "Save" : "Opslaan"}
          </button>
          {saved && (
            <span className="text-xs text-emerald-400">
              {locale === "tr"
                ? "Demo: değişiklikler henüz kalıcı değil."
                : locale === "en"
                  ? "Demo: changes are not persisted yet."
                  : "Demo: wijzigingen worden nog niet bewaard."}
            </span>
          )}
        </div>
      </form>
    </RequirePermission>
  );
}
