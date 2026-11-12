"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** "compact" renders values >= 1000 as "350k"; default uses en-IN locale grouping */
  format?: "compact" | "default";
}

/** Counts up from 0 to `end` the first time it scrolls into view. */
export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 1800,
  className,
  format,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(2, -10 * progress);
            setValue(progress === 1 ? end : Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  const display =
    format === "compact"
      ? `${(value / 1000).toFixed(0)}k+`
      : value.toLocaleString("en-IN");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
