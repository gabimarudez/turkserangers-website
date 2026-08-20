import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { club } from "@/data/club";
import { siteUrl } from "@/site";

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
    // Zonder deze basis worden de deel-afbeeldingen en canonieke links
    // relatief; Facebook, WhatsApp en Google hebben absolute URL's nodig.
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s — FC Turkse Rangers`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
        // Bezoekers uit landen zonder eigen versie krijgen het Nederlands.
        "x-default": `/${defaultLocale}/`,
      },
    },
    // Het clubwapen dient ook als tabbladicoon, zodra het bestand er is.
    ...(club.images.logo
      ? { icons: { icon: club.images.logo, apple: club.images.logo } }
      : {}),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}/`,
      siteName: club.name,
      locale,
      type: "website",
      // Wat WhatsApp, Facebook en Instagram tonen bij een gedeelde link.
      images: [{ url: club.images.hero, width: 2400, height: 1600, alt: club.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [club.images.hero],
    },
    // De demo-uitgave staat met voorbeelddata online. Die mag niet in Google
    // terechtkomen naast — of in plaats van — de echte clubsite.
    ...(process.env.DEMO_NOINDEX === "1"
      ? { robots: { index: false, follow: false } }
      : {}),
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
