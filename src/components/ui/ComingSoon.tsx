import { Hourglass } from "lucide-react";

interface ComingSoonProps {
  title: string;
  body: string;
  className?: string;
}

/**
 * Staat op de plek van gegevens die de club nog moet aanleveren.
 *
 * Bewust geen verzonnen namen of uitslagen als opvulling: een bezoeker kan
 * niet zien dat die niet echt zijn. Liever een leeg vak dat zegt dat het nog
 * volgt dan een gevuld vak dat niet klopt.
 */
export function ComingSoon({ title, body, className = "" }: ComingSoonProps) {
  return (
    <div className={`card flex flex-col items-center px-6 py-12 text-center ${className}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rangers-surface2 ring-1 ring-white/10">
        <Hourglass className="h-5 w-5 text-rangers-red" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <p className="mt-5 font-display text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 max-w-md text-sm text-white/55">{body}</p>
    </div>
  );
}
