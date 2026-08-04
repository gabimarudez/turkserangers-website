"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  FileText,
  Handshake,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  RotateCcw,
  Settings,
  Shield,
  Trophy,
  Users,
  UserSquare2,
  X,
} from "lucide-react";
import { useAdmin } from "./store";
import { LoginScreen } from "./LoginScreen";
import { can, type Resource } from "@/data/users";
import { href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";

interface NavEntry {
  resource: Resource;
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export function AdminShell({
  children,
  locale,
  dict,
}: {
  children: ReactNode;
  locale: Locale;
  dict: Dictionary;
}) {
  const { user, ready, logout, resetDemo } = useAdmin();
  const pathname = usePathname() || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-white/40">
        {dict.common.loading}
      </div>
    );
  }

  if (!user) return <LoginScreen locale={locale} dict={dict} />;

  const entries: NavEntry[] = [
    { resource: "dashboard", path: "/admin", label: dict.admin.dashboard, icon: LayoutDashboard },
    { resource: "news", path: "/admin/nieuws", label: dict.admin.news, icon: Newspaper },
    { resource: "matches", path: "/admin/wedstrijden", label: dict.admin.matches, icon: CalendarDays },
    { resource: "players", path: "/admin/spelers", label: dict.admin.players, icon: UserSquare2 },
    { resource: "teams", path: "/admin/teams", label: dict.admin.teams, icon: Trophy },
    { resource: "media", path: "/admin/media", label: dict.admin.media, icon: ImageIcon },
    { resource: "sponsors", path: "/admin/sponsors", label: dict.admin.sponsors, icon: Handshake },
    { resource: "users", path: "/admin/gebruikers", label: dict.admin.users, icon: Users },
    { resource: "audit", path: "/admin/logboek", label: dict.admin.audit, icon: ClipboardList },
    { resource: "pages", path: "/admin/paginas", label: dict.admin.pages, icon: FileText },
    { resource: "settings", path: "/admin/instellingen", label: dict.admin.settings, icon: Settings },
  ];

  const visible = entries.filter((entry) => can(user.role, entry.resource, "view"));

  const isActive = (path: string) => {
    const full = href(locale, path);
    if (path === "/admin") return pathname === full;
    return pathname.startsWith(full);
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-rangers-border px-5 py-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rangers-surface2 ring-1 ring-white/10">
          <Shield className="h-5 w-5 text-rangers-red" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            {dict.admin.brand}
          </p>
          <p className="text-[11px] uppercase tracking-widest2 text-white/40">
            Turkse Rangers
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {visible.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                href={href(locale, path)}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive(path)
                    ? "bg-rangers-red/15 font-semibold text-rangers-redSoft"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-1 border-t border-rangers-border p-3">
        <Link
          href={href(locale, "/")}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {dict.admin.backToSite}
        </Link>
        <button
          type="button"
          onClick={resetDemo}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Demo resetten
        </button>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          {dict.admin.logout}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh bg-rangers-black">
      <aside className="hidden w-64 shrink-0 border-r border-rangers-border bg-rangers-surface lg:block">
        <div className="sticky top-0 h-dvh">{sidebar}</div>
      </aside>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-rangers-border bg-rangers-surface lg:hidden">
            {sidebar}
          </aside>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-rangers-border bg-rangers-black/95 px-5 backdrop-blur">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-[11px] uppercase tracking-wider text-rangers-red">
                {dict.admin.roles[user.role]}
              </p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rangers-surface2 font-display text-sm font-semibold text-white ring-1 ring-white/10">
              {user.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">
          <div className="mb-6 rounded-md border border-rangers-border bg-rangers-surface2 px-4 py-3 text-xs text-white/50">
            {dict.admin.demoNotice}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
