"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  ChefHat,
  UtensilsCrossed,
  Utensils,
  Briefcase,
  Smile,
  Bell,
  PlusCircle,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  CheckCheck,
  CalendarClock,
  BadgePercent,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CitySelector } from "@/components/layout/city-selector";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/toast";
import { sampleUsers, sampleNotifications } from "@/lib/sample-data";
import { cn, timeAgo } from "@/lib/utils";

export const districtTabs = [
  { id: "for-you", label: "For you", href: "/", icon: Sparkles },
  { id: "cooks", label: "Find Cooks", href: "/cooks", icon: ChefHat },
  { id: "chefs", label: "Dining & Chefs", href: "/chefs", icon: Utensils },
  { id: "food", label: "Homemade Food", href: "/food", icon: UtensilsCrossed },
  { id: "jobs", label: "Jobs & Staffing", href: "/jobs", icon: Briefcase },
  { id: "community", label: "Community", href: "/community", icon: Smile },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const searchRef = useRef<HTMLInputElement>(null);

  const currentUser = sampleUsers[0];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Press "/" anywhere to jump to search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast("All caught up", { description: "Every notification is marked as read." });
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
    toast("Signed out", { description: "See you at the next meal prep.", variant: "info" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "bg-white/90 border-border shadow-[0_8px_30px_-12px_rgba(22,27,51,0.25)]"
          : "bg-white/80 border-transparent"
      )}
    >
      {/* Top row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Left: brand + city */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Logo size="md" showTagline={false} />
            <div className="h-5 w-px bg-border hidden sm:block" />
            <CitySelector variant="header" currentCity="Gurugram" />
          </div>

          {/* Center: search (desktop) */}
          <div className="flex-1 max-w-lg hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative" role="search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cooks, chefs, tiffins & kitchen jobs…"
                aria-label="Search DHANDHA"
                className="w-full h-10 pl-11 pr-14 rounded-full bg-almond-900/60 border border-transparent text-[13px] font-medium text-prussian placeholder:text-text-muted transition-all duration-300 focus:outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20 hover:bg-almond-900"
              />
              <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden lg:inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-white text-[11px] font-bold text-text-muted shadow-xs pointer-events-none">
                /
              </kbd>
            </form>
          </div>

          {/* Right: actions + profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link href="/jobs/post" className="hidden lg:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-full border-border text-xs font-bold text-prussian hover:border-saffron hover:text-saffron-dark px-4 bg-white/70"
              >
                <PlusCircle className="w-4 h-4 text-ember" />
                Post Need
              </Button>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen((v) => !v);
                  setUserDropdownOpen(false);
                }}
                className="relative h-10 w-10 rounded-full bg-almond-900/60 hover:bg-almond-800 flex items-center justify-center text-prussian transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                aria-expanded={notificationsOpen}
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#F28C28] to-[#E45A37] px-1 text-[9px] font-black text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} aria-hidden />
                  <div className="absolute right-0 mt-3 w-[22rem] max-w-[calc(100vw-1.5rem)] rounded-3xl border border-border bg-white shadow-modal z-50 overflow-hidden animate-scale-in origin-top-right">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-surface-raised">
                      <span className="font-heading text-sm font-extrabold text-prussian flex items-center gap-2">
                        <CalendarClock className="h-4 w-4 text-ember" /> Notifications
                        {unreadCount > 0 && (
                          <span className="rounded-full bg-saffron-subtle px-2 py-0.5 text-[10px] font-bold text-saffron-dark">
                            {unreadCount} new
                          </span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={markAllRead}
                        className="flex items-center gap-1 text-[11px] font-bold text-text-secondary hover:text-saffron-dark transition-colors"
                      >
                        <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-border-subtle">
                      {notifications.length === 0 ? (
                        <p className="px-5 py-8 text-center text-xs text-text-muted">No notifications yet.</p>
                      ) : (
                        notifications.map((n) => (
                          <Link
                            key={n.id}
                            href={n.actionUrl || "/dashboard"}
                            onClick={() => {
                              setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)));
                              setNotificationsOpen(false);
                            }}
                            className={cn(
                              "flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-almond-900/50",
                              !n.isRead && "bg-saffron-subtle/40"
                            )}
                          >
                            <span className={cn(
                              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                              n.isRead ? "bg-transparent" : "bg-saffron"
                            )} />
                            <span className="min-w-0">
                              <span className="block text-xs font-bold text-prussian leading-snug">{n.title}</span>
                              <span className="mt-0.5 block text-[11px] leading-snug text-text-secondary line-clamp-2">{n.body}</span>
                              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wider text-text-muted">{timeAgo(n.createdAt)}</span>
                            </span>
                          </Link>
                        ))
                      )}
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setNotificationsOpen(false)}
                      className="flex items-center justify-center gap-1 border-t border-border-subtle px-4 py-2.5 text-[11px] font-bold text-saffron-dark hover:bg-saffron-subtle/50 transition-colors"
                    >
                      View activity dashboard <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Profile dropdown / sign in */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen((v) => !v);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-1.5 p-0.5 rounded-full ring-2 ring-transparent hover:ring-saffron/40 transition-all duration-200 focus:outline-none"
                  aria-label="User profile menu"
                  aria-expanded={userDropdownOpen}
                >
                  <Avatar className="w-9 h-9 border border-border shadow-xs">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
                    <AvatarFallback className="bg-prussian text-saffron-light font-bold text-xs">PS</AvatarFallback>
                  </Avatar>
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} aria-hidden />
                    <div className="absolute right-0 mt-3 w-64 rounded-3xl border border-border bg-white shadow-modal z-50 py-2 animate-scale-in origin-top-right overflow-hidden">
                      <div className="px-4 py-3 border-b border-border-subtle bg-surface-raised">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="w-10 h-10 border border-border">
                            <AvatarImage src={currentUser.avatarUrl} />
                            <AvatarFallback className="bg-prussian text-saffron-light text-xs font-bold">PS</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="font-heading font-bold text-xs text-prussian flex items-center gap-1 truncate">
                              {currentUser.fullName}
                              <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                            </div>
                            <span className="text-[10px] text-text-muted block truncate">{currentUser.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-1.5 py-1.5 space-y-0.5">
                        {[
                          { href: "/dashboard", icon: LayoutDashboard, label: "My Dashboard", tint: "text-saffron-dark" },
                          { href: "/dashboard/cook", icon: ChefHat, label: "Cook / Chef Mode", tint: "text-ember" },
                          { href: "/dashboard/restaurant", icon: Building2, label: "Commercial Hiring", tint: "text-grape" },
                        ].map(({ href, icon: Icon, label, tint }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-almond-900 rounded-xl transition-colors hover:text-prussian"
                          >
                            <Icon className={cn("w-4 h-4", tint)} />
                            <span>{label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-1.5 border-t border-border-subtle px-1.5">
                        <button
                          type="button"
                          onClick={signOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-danger hover:bg-danger-light rounded-xl transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="h-9 rounded-full font-bold text-xs px-5">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-2 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative" role="search">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cooks, tiffins & chefs…"
              aria-label="Search DHANDHA"
              className="w-full h-10 pl-10 pr-4 rounded-full bg-almond-900/60 border border-transparent text-xs font-medium placeholder:text-text-muted focus:outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20"
            />
          </form>
        </div>
      </div>

      {/* Category tab bar */}
      <div className="border-t border-border-subtle/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {districtTabs.map((tab) => {
              const isActive =
                tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
              const IconComponent = tab.icon;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? "bg-prussian text-saffron-light shadow-[0_6px_18px_-6px_rgba(22,27,51,0.55)] scale-[1.02]"
                      : "text-text-secondary hover:text-prussian hover:bg-almond-900"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-saffron" : "text-text-muted"
                    )}
                  />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
            {/* Slim offer chip on the right */}
            <span className="ml-auto hidden xl:inline-flex items-center gap-1.5 rounded-full border border-saffron/30 bg-saffron-subtle px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-saffron-dark">
              <BadgePercent className="h-3.5 w-3.5" /> First tiffin 20% off
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
