import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import type { LegalDocument } from "@/data/legal";

export function LegalPage({
  document,
  eyebrow,
  title,
  locale,
  dict,
}: {
  document: LegalDocument;
  eyebrow: string;
  title: string;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} />

      <div className="container max-w-3xl space-y-10 py-14 sm:py-16">
        <Reveal>
          <div className="flex items-start gap-2 rounded-md border border-rangers-border bg-rangers-surface2 p-4 text-xs text-white/50">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-rangers-red" aria-hidden="true" />
            <p>{dict.legal.draftNotice}</p>
          </div>
          <p className="mt-4 text-xs text-white/35">
            {dict.legal.lastUpdated}: {formatDate(document.updatedAt, locale)}
          </p>
        </Reveal>

        {document.sections.map((section, index) => (
          <Reveal key={section.title.en} delay={Math.min(index, 4) * 0.06} as="section">
            <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-white">
              {section.title[locale]}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs[locale].map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-white/65">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
