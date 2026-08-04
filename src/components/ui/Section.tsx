import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <Reveal className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="section-heading rule-accent">{title}</h2>
        {description && <p className="mt-5 text-white/60">{description}</p>}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Bovenkant van elke binnenpagina — donker vlak met rode gloed. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-rangers-border bg-rangers-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-rangers-red/20 blur-[100px] animate-flarePulse" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-rangers-red/10 blur-[90px]" />
      </div>
      <div className="container relative py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-white/60">{description}</p>
          )}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
