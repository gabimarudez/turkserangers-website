"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Vertraging in seconden, voor een trapsgewijze opbouw binnen een blok. */
  delay?: number;
  as?: ElementType;
}

/**
 * Laat inhoud opkomen zodra die in beeld scrollt.
 *
 * De begintoestand staat in CSS achter `.js` (zie globals.css). Zonder
 * JavaScript blijft alles zichtbaar; dat was precies het probleem met de
 * testsite, waar de halve pagina op `opacity: 0` bleef staan.
 */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
