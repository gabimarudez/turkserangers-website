import { notFound } from "next/navigation";
import { LegalPage } from "@/components/site/LegalPage";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { clubRules } from "@/data/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).nav.rules };
}

export default async function ClubRulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <LegalPage
      document={clubRules}
      eyebrow={dict.club.eyebrow}
      title={dict.nav.rules}
      locale={locale}
      dict={dict}
    />
  );
}
