import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary } from "@/i18n";
import { isLocale, locales, type Locale } from "@/i18n/config";

const display = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.title,
      template: `%s — FC Turkse Rangers`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <head>
        {/*
          Zet de `js`-klasse vóór de eerste paint. Alle scroll-animaties hangen
          hieraan vast, zodat de pagina zonder JavaScript gewoon zichtbaar is.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        {children as React.ReactNode}
      </body>
    </html>
  );
}

export type LocaleParams = { locale: Locale };
