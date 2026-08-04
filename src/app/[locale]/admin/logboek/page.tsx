"use client";

import { use } from "react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission } from "@/admin/ui";
import { getDictionary } from "@/i18n";
import { defaultLocale, intlLocale, isLocale } from "@/i18n/config";

export default function AdminAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user } = useAdmin();

  if (!user) return null;

  return (
    <RequirePermission resource="audit" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.audit}
        description={
          locale === "tr"
            ? "Kim ne zaman neyi değiştirdi. Birden fazla yönetici çalıştığında bu kayıt şarttır."
            : locale === "en"
              ? "Who changed what, and when. Essential once several administrators work on the site."
              : "Wie heeft wat gewijzigd, en wanneer. Onmisbaar zodra meerdere beheerders aan de site werken."
        }
      />

      <DataTable
        headers={[
          dict.common.date,
          locale === "tr" ? "Kullanıcı" : locale === "en" ? "User" : "Gebruiker",
          dict.admin.role,
          locale === "tr" ? "İşlem" : locale === "en" ? "Action" : "Actie",
          locale === "tr" ? "Hedef" : locale === "en" ? "Target" : "Onderwerp",
        ]}
      >
        {state.audit.map((entry) => (
          <tr key={entry.id} className="border-b border-rangers-border/60 last:border-0">
            <td className="whitespace-nowrap px-4 py-3 text-xs text-white/40">
              {new Date(entry.at).toLocaleString(intlLocale[locale])}
            </td>
            <td className="px-4 py-3 text-white/80">{entry.userName}</td>
            <td className="px-4 py-3 text-xs text-white/45">
              {dict.admin.roles[entry.role]}
            </td>
            <td className="px-4 py-3">
              <code className="rounded bg-rangers-surface2 px-1.5 py-0.5 text-[11px] text-rangers-redSoft">
                {entry.action}
              </code>
            </td>
            <td className="px-4 py-3 text-white/55">{entry.target}</td>
          </tr>
        ))}
      </DataTable>
    </RequirePermission>
  );
}
