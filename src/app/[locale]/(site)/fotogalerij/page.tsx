import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { formatDate, getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { albums } from "@/data/sponsors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).gallery.heading };
}

export default async function GalleryPage({
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
        eyebrow={dict.gallery.eyebrow}
        title={dict.gallery.heading}
        description={dict.gallery.intro}
      />

      <div className="container space-y-14 py-14 sm:py-16">
        {albums.map((album) => (
          <section key={album.slug}>
            <Reveal>
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="section-heading">{album.title[locale]}</h2>
                <p className="text-sm text-white/40">
                  {formatDate(album.date, locale)} · {album.photos.length}{" "}
                  {dict.gallery.photos}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {album.photos.map((photo, index) => (
                  <figure
                    key={`${album.slug}-${index}`}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <PhotoSlot
                      src={photo.src}
                      alt={photo.alt[locale]}
                      className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>
                ))}
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
