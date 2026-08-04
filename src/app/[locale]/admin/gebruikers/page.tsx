"use client";

import { use, useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, DataTable, RequirePermission } from "@/admin/ui";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { roles, type Role } from "@/data/users";
import { teamsByOrder } from "@/data/teams";

export default function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user, saveUser, deleteUser } = useAdmin();
  const [showForm, setShowForm] = useState(false);

  if (!user) return null;

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const role = String(form.get("role")) as Role;

    saveUser({
      id: `u-${Date.now()}`,
      name: String(form.get("name")),
      email: String(form.get("email")).toLowerCase(),
      demoPassword: String(form.get("password") || "demo1234"),
      role,
      teamSlugs:
        role === "teammanager" ? form.getAll("teamSlugs").map(String) : undefined,
      active: true,
    });

    event.currentTarget.reset();
    setShowForm(false);
  }

  const t = {
    newUser: locale === "tr" ? "Yeni kullanıcı" : locale === "en" ? "New user" : "Nieuwe gebruiker",
    name: locale === "tr" ? "Ad soyad" : locale === "en" ? "Name" : "Naam",
    status: locale === "tr" ? "Durum" : locale === "en" ? "Status" : "Status",
    active: locale === "tr" ? "Aktif" : locale === "en" ? "Active" : "Actief",
    inactive: locale === "tr" ? "Pasif" : locale === "en" ? "Inactive" : "Inactief",
    teams: locale === "tr" ? "Sorumlu olduğu takımlar" : locale === "en" ? "Assigned teams" : "Toegewezen ploegen",
    lastLogin: locale === "tr" ? "Son giriş" : locale === "en" ? "Last login" : "Laatste aanmelding",
    passwordNote:
      locale === "tr"
        ? "Demoda şifreler düz metin olarak saklanır. Nihai sürümde Supabase Auth ile hash'lenir."
        : locale === "en"
          ? "In this demo passwords are stored in plain text. The final version uses hashed passwords via Supabase Auth."
          : "In deze demo staan wachtwoorden in platte tekst. De definitieve versie gebruikt gehashte wachtwoorden via Supabase Auth.",
  };

  return (
    <RequirePermission resource="users" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.users}
        description={t.passwordNote}
        action={
          <button type="button" onClick={() => setShowForm((v) => !v)} className="btn-primary">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {t.newUser}
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleCreate} className="card mb-6 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">{t.name}</label>
            <input id="name" name="name" className="field" required />
          </div>
          <div>
            <label className="label" htmlFor="email">{dict.admin.email}</label>
            <input id="email" name="email" type="email" className="field" required />
          </div>
          <div>
            <label className="label" htmlFor="password">{dict.admin.password}</label>
            <input id="password" name="password" className="field" defaultValue="demo1234" />
          </div>
          <div>
            <label className="label" htmlFor="role">{dict.admin.role}</label>
            <select id="role" name="role" className="field">
              {roles.map((role) => (
                <option key={role} value={role}>
                  {dict.admin.roles[role]}
                </option>
              ))}
            </select>
          </div>
          <fieldset className="sm:col-span-2">
            <legend className="label">{t.teams}</legend>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {teamsByOrder.slice(0, 6).map((team) => (
                <label key={team.slug} className="flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    name="teamSlugs"
                    value={team.slug}
                    className="h-4 w-4 accent-rangers-red"
                  />
                  {team.name}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">
              {locale === "tr" ? "Kullanıcı oluştur" : locale === "en" ? "Create user" : "Gebruiker aanmaken"}
            </button>
          </div>
        </form>
      )}

      <DataTable
        headers={[t.name, dict.admin.email, dict.admin.role, t.teams, t.status, t.lastLogin, ""]}
      >
        {state.users.map((account) => (
          <tr key={account.id} className="border-b border-rangers-border/60 last:border-0">
            <td className="px-4 py-3 text-white/85">{account.name}</td>
            <td className="px-4 py-3 text-white/50">{account.email}</td>
            <td className="px-4 py-3">
              <select
                value={account.role}
                onChange={(e) => saveUser({ ...account, role: e.target.value as Role })}
                className="rounded-md border border-rangers-border bg-rangers-surface2 px-2 py-1.5 text-xs text-white focus:border-rangers-red focus:outline-none"
                aria-label={`${dict.admin.role}: ${account.name}`}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {dict.admin.roles[role]}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-3 text-xs text-white/45">
              {account.teamSlugs?.join(", ") || "—"}
            </td>
            <td className="px-4 py-3">
              <button
                type="button"
                onClick={() => saveUser({ ...account, active: !account.active })}
                className={`badge ${
                  account.active
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {account.active ? t.active : t.inactive}
              </button>
            </td>
            <td className="px-4 py-3 text-xs text-white/35">
              {account.lastLogin
                ? new Date(account.lastLogin).toLocaleDateString(
                    locale === "tr" ? "tr-TR" : locale === "en" ? "en-GB" : "nl-BE",
                  )
                : "—"}
            </td>
            <td className="px-4 py-3 text-right">
              {account.id !== user.id && (
                <button
                  type="button"
                  onClick={() => deleteUser(account.id)}
                  className="rounded-md p-2 text-white/50 transition-colors hover:bg-rangers-red/15 hover:text-rangers-redSoft"
                  aria-label={`Verwijder ${account.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </td>
          </tr>
        ))}
      </DataTable>
    </RequirePermission>
  );
}
