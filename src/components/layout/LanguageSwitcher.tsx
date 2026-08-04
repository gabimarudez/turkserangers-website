"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { locales, localeNames, localeShort, isLocale, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  /** Compacte variant voor het mobiele menu. */
  variant?: "dropdown" | "inline";
}

/** Vervangt het taalsegment in het huidige pad, zodat je op dezelfde pagina blijft. */
function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${next}`;
  if (isLocale(segments[0])) {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }
  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({
  locale,
  label,
  variant = "dropdown",
}: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div>
        <p className="label">{label}</p>
        <div className="flex gap-2">
          {locales.map((code) => (
            <Link
              key={code}
              href={swapLocale(pathname, code)}
              lang={code}
              hrefLang={code}
              className={`rounded-md border px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
                code === locale
                  ? "border-rangers-red bg-rangers-red text-white"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {localeShort[code]}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-white"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        {localeShort[locale]}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-lg border border-rangers-border bg-rangers-surface py-1 shadow-card"
        >
          {locales.map((code) => (
            <Link
              key={code}
              href={swapLocale(pathname, code)}
              lang={code}
              hrefLang={code}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
            >
              {localeNames[code]}
              {code === locale && (
                <Check className="h-4 w-4 text-rangers-red" aria-hidden="true" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
