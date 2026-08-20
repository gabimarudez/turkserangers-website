"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, href } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * De pagina voor een adres dat niet bestaat.
 *
 * Zonder dit bestand valt Next terug op zijn eigen 404, en bij een statische
 * export levert die een lege pagina op: de tekst wordt daar pas door
 * JavaScript ingevuld. Een bezoeker die zich vertypt kreeg dus een zwart vlak.
 *
 * Dit is een clientcomponent omdat `not-found.tsx` geen route-parameters
 * krijgt. De taal staat wél in het adres (/nl/…), dus die halen we daaruit —
 * zo krijgt de bezoeker de melding in de taal waarin hij aan het lezen was.
 */
export default function NotFound() {
  const segment = usePathname()?.split("/").filter(Boolean)[0];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl font-semibold text-rangers-red sm:text-7xl">
        {dict.notFound.code}
      </p>
      <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
        {dict.notFound.heading}
      </h1>
      <p className="mt-4 max-w-md text-white/60">{dict.notFound.body}</p>
      <Link href={href(locale, "/")} className="btn-primary mt-8">
        {dict.notFound.cta}
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
