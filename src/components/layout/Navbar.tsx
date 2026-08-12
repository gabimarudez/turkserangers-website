"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ClubCrest } from "@/components/ui/ClubCrest";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import { club } from "@/data/club";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const items: NavItem[] = [
    { label: dict.nav.home, path: "/" },
    {
      label: dict.nav.club,
      path: "/club",
      children: [
        { label: dict.footer.aboutClub, path: "/club" },
        { label: dict.nav.history, path: "/club#geschiedenis" },
        { label: dict.nav.board, path: "/club#bestuur" },
        { label: dict.nav.staff, path: "/club#staf" },
        { label: dict.nav.youth, path: "/jeugdopleiding" },
        { label: dict.nav.rules, path: "/clubreglement" },
      ],
    },
    {
      label: dict.nav.teams,
      path: "/teams",
      children: [
        { label: dict.teams.categoryAll, path: "/teams" },
        { label: "A-kern", path: "/teams/a-kern" },
        { label: "B-kern", path: "/teams/b-kern" },
        { label: dict.teams.categoryWomen, path: "/teams/dames" },
        { label: dict.teams.categoryYouth, path: "/teams?cat=youth" },
      ],
    },
    { label: dict.nav.matches, path: "/wedstrijden" },
    { label: dict.nav.news, path: "/nieuws" },
    { label: dict.nav.gallery, path: "/fotogalerij" },
    { label: dict.nav.sponsors, path: "/sponsors" },
    { label: dict.nav.contact, path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sluit menu's bij navigatie.
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Voorkomt scrollen achter het open mobiele menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    const full = href(locale, path.split("#")[0].split("?")[0]);
    if (path === "/") return pathname === href(locale, "/");
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-rangers-border bg-rangers-black/95 backdrop-blur"
          : "border-b border-transparent bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href={href(locale, "/")} className="flex shrink-0 items-center gap-3">
          <ClubCrest
            className="h-12 w-12 shrink-0"
            logoClassName="h-14 w-auto"
            iconClassName="h-6 w-6"
            priority
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold uppercase tracking-wide text-white">
              {club.name}
            </span>
            <span className="block text-[11px] uppercase tracking-widest2 text-white/45">
              {club.city} · {club.founded}
            </span>
          </span>
        </Link>

        <nav aria-label={dict.nav.home} className="hidden items-center gap-0.5 xl:flex">
          {items.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.path)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              <Link
                href={href(locale, item.path)}
                className={`flex items-center gap-1 px-3.5 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive(item.path) ? "text-rangers-red" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </Link>
              <span
                aria-hidden="true"
                className={`absolute -bottom-[1px] left-3.5 right-3.5 h-[2px] origin-left rounded-full bg-rangers-red transition-transform ${
                  isActive(item.path) ? "scale-x-100" : "scale-x-0"
                }`}
              />

              {item.children && openDropdown === item.path && (
                <div className="absolute left-0 top-full z-50 min-w-[13rem] overflow-hidden rounded-lg border border-rangers-border bg-rangers-surface py-1 shadow-card">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={href(locale, child.path)}
                      className="block px-4 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <LanguageSwitcher locale={locale} label={dict.nav.language} />
          </div>
          <Link href={href(locale, "/contact")} className="btn-primary hidden xl:inline-flex">
            {dict.nav.becomeMember}
            <span aria-hidden="true">→</span>
          </Link>

          <div className="xl:hidden">
            <LanguageSwitcher locale={locale} label={dict.nav.language} />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white xl:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-rangers-border bg-rangers-black xl:hidden">
          <nav className="container flex flex-col gap-1 py-6">
            {items.map((item) => (
              <div key={item.path} className="border-b border-rangers-border/60 py-1">
                <Link
                  href={href(locale, item.path)}
                  className={`block py-3 font-display text-lg font-semibold uppercase tracking-wide ${
                    isActive(item.path) ? "text-rangers-red" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={href(locale, child.path)}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6 space-y-5">
              <LanguageSwitcher
                locale={locale}
                label={dict.nav.language}
                variant="inline"
              />
              <Link href={href(locale, "/contact")} className="btn-primary w-full">
                {dict.nav.becomeMember}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
