import { Shield } from "lucide-react";
import { club } from "@/data/club";

interface ClubCrestProps {
  /** Maat van het terugvalschild — vierkant, bijv. "h-12 w-12". */
  className?: string;
  /**
   * Maat van het echte wapen. Dat is hoger dan breed, dus hier stellen we de
   * hoogte in en laten we de breedte meelopen; in een vierkant kader zou het
   * anders onnodig klein uitvallen.
   */
  logoClassName?: string;
  /** Iets kleiner icoon dan het kader, zodat het schild niet tegen de rand plakt. */
  iconClassName?: string;
  priority?: boolean;
}

/**
 * Het clubembleem. Zolang `club.images.logo` leeg is, valt dit terug op een
 * neutraal schild — zo blijft de lay-out kloppen tot het echte wapen er is,
 * en hoeft er daarna maar één pad ingevuld te worden.
 */
export function ClubCrest({
  className = "h-12 w-12",
  logoClassName,
  iconClassName = "h-6 w-6",
  priority = false,
}: ClubCrestProps) {
  if (club.images.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={club.images.logo}
        alt={`${club.name} — clublogo`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`shrink-0 object-contain ${logoClassName ?? className}`}
      />
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-rangers-surface2 ring-1 ring-white/10 ${className}`}
    >
      <Shield className={`${iconClassName} text-rangers-red`} aria-hidden="true" />
    </span>
  );
}
