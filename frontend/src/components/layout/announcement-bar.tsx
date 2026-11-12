"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, X } from "lucide-react";

const MESSAGES = [
  "Trial day free on every cook booking — before you commit",
  "Homemade tiffins from FSSAI-registered private kitchens",
  "Now live in 120+ cities across India",
  "First tiffin order: 20% off with code KITCHEN20",
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      try {
        setDismissed(window.sessionStorage.getItem("dhandha-announce-dismissed") === "1");
      } catch {
        setDismissed(false);
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem("dhandha-announce-dismissed", "1");
    } catch {
      /* storage unavailable — hide for this session only */
    }
  };

  const doubled = [...MESSAGES, ...MESSAGES];

  return (
    <div className="relative hidden sm:flex h-9 items-center overflow-hidden bg-prussian text-white">
      <div className="marquee marquee-paused flex-1">
        {doubled.map((msg, i) => (
          <Link
            key={i}
            href="/explore"
            className="mx-6 inline-flex items-center gap-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-[#FFB03A]"
          >
            <Flame className="h-3 w-3 text-[#FFB03A]" />
            {msg}
          </Link>
        ))}
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
