import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { club } from "@/data/club";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).contact.heading };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.heading}
        description={dict.contact.intro}
      />

      <div className="container grid grid-cols-1 gap-10 py-14 sm:py-16 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <h2 className="section-heading rule-accent mb-6">{dict.contact.formHeading}</h2>
          <ContactForm dict={dict} />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <h2 className="section-heading rule-accent mb-6">{dict.contact.infoHeading}</h2>

          <div className="card space-y-5 p-6">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rangers-red" aria-hidden="true" />
              <div>
                <p className="label mb-0.5">{dict.contact.address}</p>
                <p className="text-sm text-white/70">
                  {club.fullName}
                  <br />
                  {club.address.street}
                  <br />
                  {club.address.postalCode} {club.address.city}
                </p>
                <a
                  href={club.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-rangers-red hover:text-white"
                >
                  {dict.contact.routeCta} →
                </a>
              </div>
            </div>

            <div className="flex gap-3 border-t border-rangers-border pt-5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-rangers-red" aria-hidden="true" />
              <div>
                <p className="label mb-0.5">{dict.contact.phone}</p>
                <a
                  href={club.contact.phoneHref}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {club.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-3 border-t border-rangers-border pt-5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-rangers-red" aria-hidden="true" />
              <div className="min-w-0">
                <p className="label mb-0.5">{dict.contact.email}</p>
                <a
                  href={`mailto:${club.contact.email}`}
                  className="break-all text-sm text-white/70 hover:text-white"
                >
                  {club.contact.email}
                </a>
              </div>
            </div>

            <div className="border-t border-rangers-border pt-5">
              <p className="label mb-1">{dict.contact.openingHeading}</p>
              <p className="text-sm text-white/60">{dict.contact.opening}</p>
            </div>
          </div>

          <div className="card mt-5 overflow-hidden">
            <iframe
              title={`${club.fullName} — ${dict.contact.address}`}
              src="https://www.openstreetmap.org/export/embed.html?bbox=5.5290%2C50.9880%2C5.5590%2C51.0030&amp;layer=mapnik"
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </>
  );
}
