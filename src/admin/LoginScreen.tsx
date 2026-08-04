"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowLeft, Shield } from "lucide-react";
import { useAdmin } from "./store";
import { href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";

export function LoginScreen({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { login, state } = useAdmin();
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = login(
      String(form.get("email") ?? ""),
      String(form.get("password") ?? ""),
    );
    setError(!result);
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-rangers-black px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rangers-surface2 ring-1 ring-white/10">
            <Shield className="h-7 w-7 text-rangers-red" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-white">
            {dict.admin.brand}
          </h1>
          <p className="mt-1 text-sm text-white/45">{dict.admin.loginIntro}</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          <div>
            <label className="label" htmlFor="admin-email">
              {dict.admin.email}
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="field"
              defaultValue="superadmin@turkserangers.be"
            />
          </div>

          <div>
            <label className="label" htmlFor="admin-password">
              {dict.admin.password}
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="field"
              defaultValue="demo1234"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-md bg-rangers-red/10 px-3 py-2 text-sm text-rangers-redSoft">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {dict.admin.invalid}
            </p>
          )}

          <button type="submit" className="btn-primary w-full">
            {dict.admin.login}
          </button>
        </form>

        <div className="card mt-5 p-5">
          <p className="label">{dict.admin.demoAccounts}</p>
          <ul className="space-y-2 text-xs">
            {state.users.map((account) => (
              <li key={account.id} className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-white/60">{account.email}</span>
                <span className="shrink-0 rounded bg-rangers-surface2 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/45">
                  {dict.admin.roles[account.role]}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-white/35">
            Wachtwoord voor alle demo-accounts: <code className="text-white/60">demo1234</code>
          </p>
        </div>

        <Link
          href={href(locale, "/")}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {dict.admin.backToSite}
        </Link>
      </div>
    </div>
  );
}
