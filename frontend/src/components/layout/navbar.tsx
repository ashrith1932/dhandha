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
  PlusCircle,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CitySelector } from "@/components/layout/city-selector";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleUsers } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

// District Category Tabs with icons matching media_1794460697493_4183360b.jpg
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

  const currentUser = sampleUsers[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E8E3DC] shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all">
      {/* Top Header Row: Location left, DHANDHA logo center/left, search middle, user avatar right */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Left: Brand Logo & Location */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Logo size="md" showTagline={false} />
            <div className="h-5 w-px bg-gray-200 hidden sm:block" />
            <CitySelector variant="header" currentCity="Gurugram" />
          </div>

          {/* Center: Search Bar (District Embedded Pill) */}
          <div className="flex-1 max-w-lg hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for cooks, private chefs and homemade food"
                className="w-full h-9 pl-10 pr-3 rounded-full bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-prussian placeholder:text-gray-400 focus:outline-none focus:ring-1.5 focus:ring-indigo-600 focus:bg-white transition-all"
              />
            </form>
          </div>

          {/* Right: Quick Actions & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Post Requirement CTA */}
            <Link href="/dashboard" className="hidden lg:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full border-gray-200 text-xs font-semibold text-prussian hover:border-indigo-600 hover:text-indigo-700 px-3"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Post Need
              </Button>
            </Link>

            {/* Notifications */}
            <Link
              href="/dashboard"
              className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-saffron" />
            </Link>

            {/* Profile Dropdown / Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-indigo-500/20 transition-all focus:outline-none"
                  aria-label="User profile menu"
                >
                  <Avatar className="w-8 h-8 border border-gray-200 shadow-xs">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
                    <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs">
                      PS
                    </AvatarFallback>
                  </Avatar>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="w-9 h-9 border border-gray-200">
                          <AvatarImage src={currentUser.avatarUrl} />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-heading font-bold text-xs text-prussian flex items-center gap-1 truncate">
                            {currentUser.fullName}
                            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          </div>
                          <span className="text-[10px] text-gray-400 block truncate">{currentUser.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-1.5 py-1.5 space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/cook"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <ChefHat className="w-3.5 h-3.5 text-amber-500" />
                        <span>Cook / Chef Mode</span>
                      </Link>
                      <Link
                        href="/dashboard/restaurant"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Building2 className="w-3.5 h-3.5 text-blue-500" />
                        <span>Commercial Hiring</span>
                      </Link>
                    </div>

                    <div className="pt-1.5 border-t border-gray-100 px-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
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
                  className="h-8 rounded-full bg-prussian text-white hover:bg-black font-semibold text-xs px-4"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Input (Shown only on small screens) */}
        <div className="pb-2.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for events, cooks & private kitchens"
              className="w-full h-8.5 pl-9 pr-3 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium placeholder:text-gray-400 focus:outline-none focus:ring-1.5 focus:ring-indigo-600"
            />
          </form>
        </div>
      </div>

      {/* Category Tabs Pill Bar (Exact match to District media_1794460697493_4183360b.jpg) */}
      <div className="border-t border-[#E8E3DC] bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1.5">
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
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-purple-100/80 text-indigo-950 font-bold"
                      : "text-gray-600 hover:text-prussian hover:bg-gray-50"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-3.5 h-3.5 transition-colors",
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
