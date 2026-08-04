import { notFound } from "next/navigation";
import { AdminProvider } from "@/admin/store";
import { AdminShell } from "@/admin/AdminShell";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export const metadata = {
  title: "Clubbeheer",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <AdminProvider>
      <AdminShell locale={locale} dict={dict}>
        {children}
      </AdminShell>
    </AdminProvider>
  );
}
