import { notFound } from "next/navigation";
import { LegalPage } from "@/components/site/LegalPage";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { cookies } from "@/data/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).legal.cookiesHeading };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <LegalPage
      document={cookies}
      eyebrow={dict.footer.info}
      title={dict.legal.cookiesHeading}
      locale={locale}
      dict={dict}
    />
  );
}
