"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Plus,
  Bell,
  User,
  ChefHat,
  Briefcase,
  Store,
  UtensilsCrossed,
  X,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const [postMenuOpen, setPostMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Compass },
    { label: "Post", href: "#post", icon: Plus, isAction: true },
    { label: "Activity", href: "/dashboard", icon: Bell },
    { label: "Profile", href: "/dashboard/settings", icon: User },
  ];

  return (
    <>
      {/* Contextual Post Menu Overlay */}
      {postMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-ink-black/60 backdrop-blur-sm flex flex-col justify-end p-4 animate-fade-in"
          onClick={() => setPostMenuOpen(false)}
        >
          <div
            className="bg-surface rounded-3xl p-5 border border-border shadow-modal space-y-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="font-heading font-bold text-base text-prussian">
                  Create or Post on DHANDHA
                </h3>
                <p className="text-xs text-text-secondary">
                  Choose what you want to create today
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPostMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-almond-800/80 flex items-center justify-center text-text-secondary hover:text-prussian"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/jobs/post?type=HOUSEHOLD"
                onClick={() => setPostMenuOpen(false)}
                className="flex flex-col p-3.5 rounded-2xl border border-border hover:border-saffron bg-almond-900/40 hover:bg-saffron-subtle/30 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-saffron-subtle text-saffron-dark flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-prussian">Hire a Cook</span>
                <span className="text-[10px] text-text-secondary mt-0.5">
                  Post home cooking need
                </span>
              </Link>

              <Link
                href="/jobs/post?type=RESTAURANT"
                onClick={() => setPostMenuOpen(false)}
                className="flex flex-col p-3.5 rounded-2xl border border-border hover:border-prussian bg-almond-900/40 hover:bg-almond-800/60 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-prussian text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-prussian">Restaurant Job</span>
                <span className="text-[10px] text-text-secondary mt-0.5">
                  Verified business hiring
                </span>
              </Link>

              <Link
                href="/dashboard/cook"
                onClick={() => setPostMenuOpen(false)}
                className="flex flex-col p-3.5 rounded-2xl border border-border hover:border-success bg-almond-900/40 hover:bg-success-light/30 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-success-light text-success flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-prussian">Cook Profile</span>
                <span className="text-[10px] text-text-secondary mt-0.5">
                  Get hired & start earning
                </span>
              </Link>

              <Link
                href="/food"
                onClick={() => setPostMenuOpen(false)}
                className="flex flex-col p-3.5 rounded-2xl border border-border hover:border-grape bg-almond-900/40 hover:bg-grape-100 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-grape-200 text-grape-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-prussian">Sell Food / Tiffin</span>
                <span className="text-[10px] text-text-secondary mt-0.5">
                  FSSAI registered kitchen
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border shadow-elevated safe-area-pb"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              !link.isAction &&
              (link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href));

            if (link.isAction) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => setPostMenuOpen(true)}
                  className="flex flex-col items-center justify-center -mt-5 focus:outline-none"
                  aria-label="Create requirement"
                >
                  <div className="w-12 h-12 rounded-full bg-saffron text-white shadow-[0_4px_16px_rgba(242,140,40,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-semibold text-text-primary mt-1">
                    Post
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all",
                  isActive
                    ? "text-saffron font-bold"
                    : "text-text-secondary hover:text-prussian"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
                <span className="text-[10px] mt-1 leading-none">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
