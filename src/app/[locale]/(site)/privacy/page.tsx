import { notFound } from "next/navigation";
import { LegalPage } from "@/components/site/LegalPage";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { privacy } from "@/data/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).legal.privacyHeading };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <LegalPage
      document={privacy}
      eyebrow={dict.footer.info}
      title={dict.legal.privacyHeading}
      locale={locale}
      dict={dict}
    />
  );
}
