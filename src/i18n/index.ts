import nl, { type Dictionary } from "./dictionaries/nl";
import tr from "./dictionaries/tr";
import en from "./dictionaries/en";
import { defaultLocale, intlLocale, isLocale, type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { nl, tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Bouwt een pad met de juiste taalprefix: href("tr", "/teams") -> "/tr/teams". */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function formatDate(
  iso: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    ...options,
    timeZone: "Europe/Brussels",
  }).format(new Date(iso));
}

export function formatWeekday(iso: string, locale: Locale): string {
  return formatDate(iso, locale, { weekday: "long", day: "numeric", month: "long" });
}

export function formatTime(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Brussels",
  }).format(new Date(iso));
}

export type { Dictionary };
export { isLocale, defaultLocale };
export type { Locale };
