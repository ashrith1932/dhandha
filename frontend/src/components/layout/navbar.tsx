"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Heart,
  User,
  PlusCircle,
  Menu,
  X,
  ChefHat,
  Briefcase,
  UtensilsCrossed,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building2,
  ChevronRight,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CitySelector } from "@/components/layout/city-selector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleUsers } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Explore", href: "/explore", badge: null },
  { label: "Find Cooks", href: "/cooks", badge: "Hot" },
  { label: "Book Chef", href: "/chefs", badge: null },
  { label: "Food Market", href: "/food", badge: null },
  { label: "Jobs", href: "/jobs", badge: "Hiring" },
  { label: "Community", href: "/community", badge: null },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default mock logged in

  const currentUser = sampleUsers[0]; // Priya Sharma (Customer & hirer)

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b border-border shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Logo & City Selector */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <Logo size="md" showTagline={false} />
            <div className="hidden sm:block">
              <CitySelector />
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5",
                    isActive
                      ? "text-prussian bg-almond-800/60 font-bold"
                      : "text-text-secondary hover:text-prussian hover:bg-almond-900/50"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-saffron-subtle text-saffron-dark font-bold leading-tight">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-saffron rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile city selector trigger */}
            <div className="sm:hidden">
              <CitySelector />
            </div>

            {/* Post Requirement CTA Button */}
            <Link href="/jobs/post" className="hidden md:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-full border-saffron/70 text-saffron-dark bg-saffron-subtle/30 hover:bg-saffron hover:text-white transition-all text-xs font-semibold px-3.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Requirement</span>
              </Button>
            </Link>

            {/* Notifications Bell */}
            <Link
              href="/dashboard"
              className="relative p-2 rounded-full hover:bg-almond-800/60 text-text-secondary hover:text-prussian transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-saffron ring-2 ring-white" />
            </Link>

            {/* User Dropdown / Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-border hover:border-prussian transition-all focus:outline-none focus:ring-2 focus:ring-saffron"
                  aria-expanded={userDropdownOpen}
                >
                  <Avatar className="w-7 h-7 sm:w-8 sm:h-8 border border-white">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
                    <AvatarFallback>{currentUser.fullName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden xl:inline text-xs font-semibold text-text-primary max-w-[100px] truncate">
                    {currentUser.fullName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-surface border border-border shadow-elevated p-2 animate-fade-in z-50"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    {/* User summary */}
                    <div className="p-3 border-b border-border/80 flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-saffron/30">
                        <AvatarImage src={currentUser.avatarUrl} />
                        <AvatarFallback>{currentUser.fullName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-heading font-bold text-sm text-prussian">
                          {currentUser.fullName}
                        </span>
                        <span className="text-xs text-text-secondary">{currentUser.phone}</span>
                        <span className="text-[10px] font-semibold text-saffron mt-0.5">
                          Universal DHANDHA Account
                        </span>
                      </div>
                    </div>

                    {/* Role & Dashboard Switcher (Key Product Principle) */}
                    <div className="p-2 space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted px-2 block">
                        Switch Capabilities
                      </span>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-prussian hover:bg-almond-800/60 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-prussian" />
                        <span>Customer Dashboard</span>
                      </Link>

                      <Link
                        href="/dashboard/cook"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-prussian hover:bg-almond-800/60 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <ChefHat className="w-4 h-4 text-saffron" />
                          <span>Cook / Chef Mode</span>
                        </div>
                        <Badge variant="saffron" className="text-[9px] px-1.5 py-0">
                          Active
                        </Badge>
                      </Link>

                      <Link
                        href="/dashboard/restaurant"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-prussian hover:bg-almond-800/60 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-grape" />
                          <span>Restaurant Hiring</span>
                        </div>
                        <ShieldCheck className="w-3.5 h-3.5 text-success" />
                      </Link>

                      <Link
                        href="/dashboard/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-almond-800/60 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-prussian" />
                        <span>Admin Verification Hub</span>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-border/80">
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-text-secondary hover:text-prussian hover:bg-almond-800/60 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Account Settings & Addresses</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-danger hover:bg-danger-light transition-colors text-left font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-semibold text-xs sm:text-sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" className="font-semibold text-xs sm:text-sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-prussian hover:bg-almond-800/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-modal">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-text-primary hover:bg-almond-800/60 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/jobs/post"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="default" className="w-full justify-center gap-2">
                <PlusCircle className="w-4 h-4" />
                <span>Post Requirement / Job</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
