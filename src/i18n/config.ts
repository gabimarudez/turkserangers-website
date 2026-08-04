export const locales = ["nl", "tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  tr: "Türkçe",
  en: "English",
};

export const localeShort: Record<Locale, string> = {
  nl: "NL",
  tr: "TR",
  en: "EN",
};

/** Datum-locale voor Intl.DateTimeFormat. */
export const intlLocale: Record<Locale, string> = {
  nl: "nl-BE",
  tr: "tr-TR",
  en: "en-GB",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
