"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      toast("That email doesn't look right", {
        description: "Enter a valid address like you@example.com",
        variant: "warning",
      });
      return;
    }
    setDone(true);
    toast("Welcome to the Kitchen Table", {
      description: "Recipe drops, chef launches and neighbourhood food — once a week.",
    });
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        You&apos;re on the list — see you at the next drop.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md items-center gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email for newsletter
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-11 w-full rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none backdrop-blur transition focus:border-[#FFB03A] focus:ring-2 focus:ring-[#F28C28]/30"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB03A] to-[#E45A37] text-white shadow-[0_8px_22px_-6px_rgba(242,140,40,0.65)] transition-transform hover:scale-110 active:scale-95"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
