"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  /** Bijv. "1976", "400+" of "17". Niet-cijfers blijven gewoon staan. */
  value: string;
  className?: string;
}

/**
 * Telt op naar het eindgetal wanneer het in beeld komt.
 *
 * Belangrijk: de eerste render toont meteen de échte waarde. Op de testsite
 * stond hier een 0 in de HTML, waardoor bezoekers zonder JavaScript — en
 * zoekmachines — "0 leden" te zien kregen.
 */
export function Counter({ value, className = "" }: CounterProps) {
  const target = Number.parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[\d\s]/g, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const duration = 1400;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
