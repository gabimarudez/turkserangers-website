import Link from "next/link";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import type { Team } from "@/data/types";

const categoryLabelKey = {
  first: "categoryFirst",
  youth: "categoryYouth",
  women: "categoryWomen",
} as const;

export function TeamCard({
  team,
  locale,
  dict,
}: {
  team: Team;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={href(locale, `/teams/${team.slug}`)}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl"
    >
      <PhotoSlot
        src={team.photo}
        alt={`${dict.teams.heading} ${team.name}`}
        className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
        showLabel={false}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-display text-sm font-semibold uppercase leading-none text-white">
          {team.name}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
          {dict.teams[categoryLabelKey[team.category]]}
        </p>
      </div>
    </Link>
  );
}
