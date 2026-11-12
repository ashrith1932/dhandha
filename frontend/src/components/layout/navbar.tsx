"use client";

import React, { useState } from "react";
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
  Heart,
  PlusCircle,
  X,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  ChevronRight,
  User as UserIcon,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CitySelector } from "@/components/layout/city-selector";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleUsers } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

// District Category Tabs with icons matching media_1794460697493_4183360b.jpg & media_1794460697503_bc049302.jpg
export const districtTabs = [
  {
    id: "for-you",
    label: "For you",
    href: "/",
    icon: Sparkles,
  },
  {
    id: "cooks",
    label: "Find Cooks",
    href: "/cooks",
    icon: ChefHat,
  },
  {
    id: "chefs",
    label: "Dining & Chefs",
    href: "/chefs",
    icon: Utensils,
  },
  {
    id: "food",
    label: "Homemade Food",
    href: "/food",
    icon: UtensilsCrossed,
  },
  {
    id: "jobs",
    label: "Jobs & Staffing",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    id: "community",
    label: "Community",
    href: "/community",
    icon: Smile,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const currentUser = sampleUsers[0]; // Priya Sharma

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
      {/* Top Header Row (District Style: Location left, DHANDHA logo center/left, search middle, user avatar right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Left: Brand Logo & Location */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <Logo size="md" showTagline={false} />
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            <CitySelector variant="header" currentCity="Gurugram" />
          </div>

          {/* Center: Search Bar (District Embedded Pill) */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for cooks, private chefs and homemade food"
                className="w-full h-11 pl-11 pr-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-medium text-ink-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all shadow-inner"
              />
            </form>
          </div>

          {/* Right: Quick Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Post Requirement CTA */}
            <Link href="/dashboard" className="hidden lg:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-200 text-xs font-bold text-gray-700 hover:border-indigo-600 hover:text-indigo-700"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                Post Cook Need
              </Button>
            </Link>

            {/* Notifications */}
            <Link
              href="/dashboard"
              className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-saffron" />
            </Link>

            {/* Profile Dropdown / Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/20 transition-all focus:outline-none"
                  aria-label="User profile menu"
                >
                  <Avatar className="w-9 h-9 border border-gray-200 shadow-xs">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
                    <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs">
                      PS
                    </AvatarFallback>
                  </Avatar>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 bg-white rounded-3xl border border-gray-100 shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-5 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-11 h-11 border border-gray-200">
                          <AvatarImage src={currentUser.avatarUrl} />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-heading font-bold text-sm text-ink-black flex items-center gap-1">
                            {currentUser.fullName}
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <span className="text-[11px] text-gray-400 block">{currentUser.email}</span>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-purple-50 text-indigo-700 font-bold text-[10px]">
                            Universal Account
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 py-2 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/cook"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <ChefHat className="w-4 h-4 text-amber-500" />
                        <span>Cook / Chef Mode</span>
                      </Link>
                      <Link
                        href="/dashboard/restaurant"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <Building2 className="w-4 h-4 text-blue-500" />
                        <span>Commercial Hiring</span>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-gray-100 px-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  className="rounded-full bg-ink-black text-white hover:bg-black font-bold text-xs px-5 shadow-xs"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Row (Shown only on small screens) */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for events, cooks & private kitchens"
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </form>
        </div>
      </div>

      {/* Category Tabs Pill Bar (Exact match to District media_1794460697493_4183360b.jpg) */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2">
            {districtTabs.map((tab) => {
              const isActive =
                tab.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(tab.href);
              const IconComponent = tab.icon;

              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-purple-100 text-indigo-900 font-bold shadow-xs"
                      : "text-gray-600 hover:text-ink-black hover:bg-gray-50"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-indigo-700" : "text-gray-400"
                    )}
                  />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
