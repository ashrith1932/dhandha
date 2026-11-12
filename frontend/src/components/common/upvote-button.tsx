"use client";

import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export function UpvoteButton({ initialCount, label = "Upvote" }: { initialCount: number; label?: string }) {
  const [active, setActive] = useState(false);
  const { toast } = useToast();
  const count = initialCount + (active ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${label} (${count})`}
      onClick={() => {
        setActive((v) => !v);
        if (!active) {
          toast("Thanks for the love", { description: "Your upvote was added to the thread." });
        }
      }}
      className={cn(
        "tap inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all duration-200",
        active
          ? "border-saffron bg-saffron-subtle text-saffron-dark shadow-[0_4px_14px_-6px_rgba(242,140,40,0.5)]"
          : "border-border bg-white text-text-secondary hover:border-saffron hover:text-saffron-dark"
      )}
    >
      <ThumbsUp className={cn("h-3.5 w-3.5", active && "fill-saffron text-saffron")} />
      {count}
    </button>
  );
}
