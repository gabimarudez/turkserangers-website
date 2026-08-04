import { ImageIcon } from "lucide-react";

interface PhotoSlotProps {
  src?: string;
  alt: string;
  className?: string;
  /** Toont het onderschrift in het lege kader (handig bij grote vlakken). */
  showLabel?: boolean;
  /** Verbergt ook het icoon — voor sfeervlakken zoals de hero. */
  decorative?: boolean;
  priority?: boolean;
}

/**
 * Toont een foto, of — zolang de club het beeld nog niet aangeleverd heeft —
 * een net kader met de omschrijving. Zo blijft de lay-out kloppen en is
 * meteen zichtbaar welk beeld er nog ontbreekt.
 */
export function PhotoSlot({
  src,
  alt,
  className = "",
  showLabel = true,
  decorative = false,
  priority = false,
}: PhotoSlotProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`object-cover ${className}`}
      />
    );
  }

  // Bewust een grid in plaats van absolute lagen: zo hoeft dit kader zelf geen
  // `relative` te zijn en kan de aanroeper de positionering bepalen. (Met
  // `relative` in de basisklassen won die het altijd van een meegegeven
  // `absolute`, waardoor het kader in de flow bleef staan.)
  return (
    <div
      role="img"
      aria-label={alt}
      className={`grid overflow-hidden bg-rangers-surface2 ${className}`}
    >
      <div
        aria-hidden="true"
        className="col-start-1 row-start-1 h-full w-full opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 18px)",
        }}
      />
      <div
        aria-hidden="true"
        className="col-start-1 row-start-1 h-full w-full bg-gradient-to-br from-rangers-red/10 via-transparent to-black/40"
      />
      {!decorative && (
        <div className="col-start-1 row-start-1 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <ImageIcon className="h-6 w-6 text-white/25" strokeWidth={1.5} aria-hidden="true" />
          {showLabel && (
            <span className="max-w-[220px] text-xs font-medium text-white/30">{alt}</span>
          )}
        </div>
      )}
    </div>
  );
}
