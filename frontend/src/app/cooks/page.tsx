"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  MapPin,
  ShieldCheck,
  ChefHat,
  CheckCircle2,
  Calendar,
  X,
  ArrowUpDown,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleCooks, popularCuisines, popularCities } from "@/lib/sample-data";
import { formatCurrency, cn } from "@/lib/utils";

export default function CooksDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"RATING" | "EXPERIENCE" | "PRICE">("RATING");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter logic
  const filteredCooks = sampleCooks
    .filter((cook) => {
      const matchesSearch =
        cook.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cook.professionalTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cook.cuisines.some((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCity =
        selectedCity === "All" ||
        cook.city?.toLowerCase() === selectedCity.toLowerCase();

      const matchesCuisine =
        selectedCuisine === "All" ||
        cook.cuisines.some(
          (c) => c.name.toLowerCase() === selectedCuisine.toLowerCase()
        );

      const matchesVerified = !verifiedOnly || cook.verificationStatus === "VERIFIED";

      return matchesSearch && matchesCity && matchesCuisine && matchesVerified;
    })
    .sort((a, b) => {
      if (sortBy === "RATING") return b.averageRating - a.averageRating;
      if (sortBy === "EXPERIENCE") return b.yearsExperience - a.yearsExperience;
      if (sortBy === "PRICE")
        return (a.expectedSalaryMin || 0) - (b.expectedSalaryMin || 0);
      return 0;
    });

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-prussian text-white py-10 sm:py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge variant="saffron" className="text-xs font-bold">
            Hire a Cook
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Find Trusted Home Cooks Near You
          </h1>
          <p className="text-sm sm:text-base text-almond-500 max-w-2xl">
            Browse verified daily cooks, part-time meal preparers, vegetarian cooks, and
            regional cuisine experts for your household.
          </p>

          {/* Quick Search */}
          <div className="relative max-w-xl pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by cook name, cuisine (e.g. North Indian, Jain), or skill..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white text-prussian placeholder:text-text-muted text-sm font-medium shadow-elevated focus:outline-none focus:ring-2 focus:ring-saffron"
            />
          </div>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-surface p-6 rounded-3xl border border-border shadow-xs h-fit sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2 font-heading font-bold text-base text-prussian">
                <SlidersHorizontal className="w-4 h-4 text-saffron" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCity("All");
                  setSelectedCuisine("All");
                  setVerifiedOnly(false);
                  setSearchQuery("");
                }}
                className="text-xs text-saffron-dark hover:underline font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                City / Region
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border bg-almond-900/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-saffron"
              >
                <option value="All">All Cities</option>
                {popularCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                Cuisine Specialty
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCuisine("All")}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center justify-between",
                    selectedCuisine === "All"
                      ? "bg-prussian text-white font-bold"
                      : "hover:bg-almond-800 text-text-primary"
                  )}
                >
                  <span>All Cuisines</span>
                </button>
                {popularCuisines.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCuisine(c)}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center justify-between",
                      selectedCuisine === c
                        ? "bg-prussian text-white font-bold"
                        : "hover:bg-almond-800 text-text-primary"
                    )}
                  >
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Toggle */}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-prussian block">
                  Verified Cooks Only
                </span>
                <span className="text-[10px] text-text-secondary">
                  Govt ID & police checked
                </span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 accent-saffron cursor-pointer"
              />
            </div>

            {/* Post Cook Requirement CTA */}
            <div className="pt-4 border-t border-border bg-saffron-subtle/40 p-4 rounded-2xl border border-dashed border-saffron/40 space-y-2 text-center">
              <span className="font-heading font-bold text-xs text-saffron-dark block">
                Can&apos;t find the right cook?
              </span>
              <p className="text-[11px] text-text-secondary leading-snug">
                Post your custom cooking requirement and let verified cooks contact you directly.
              </p>
              <Link href="/jobs/post?type=HOUSEHOLD" className="block pt-1">
                <Button size="sm" className="w-full bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold">
                  Post Requirement (Free)
                </Button>
              </Link>
            </div>
          </aside>

          {/* Results Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Bar: Results Count & Sort Dropdown */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                <span className="font-bold text-prussian">{filteredCooks.length}</span>
                <span>cooks available</span>
                {selectedCity !== "All" && (
                  <Badge variant="outline" className="text-xs">
                    in {selectedCity}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-text-muted">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="h-8 px-2 rounded-lg border border-border bg-almond-900/30 text-xs font-bold text-prussian focus:outline-none"
                  >
                    <option value="RATING">Highest Rated</option>
                    <option value="EXPERIENCE">Most Experienced</option>
                    <option value="PRICE">Price: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cooks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCooks.map((cook) => (
                <Card
                  key={cook.id}
                  className="overflow-hidden border border-border hover:border-saffron hover:shadow-elevated transition-all flex flex-col justify-between rounded-3xl bg-surface group"
                >
                  <div className="p-5 space-y-4">
                    {/* Avatar & Rating */}
                    <div className="flex items-start justify-between">
                      <div className="relative">
                        <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                          <AvatarImage src={cook.user?.avatarUrl} />
                          <AvatarFallback>{cook.user?.fullName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success ring-2 ring-white" />
                      </div>
                      <Badge variant="saffron" className="text-xs font-semibold gap-1">
                        <Star className="w-3 h-3 fill-saffron text-saffron" />
                        <span>{cook.averageRating}</span>
                        <span className="text-[10px] text-text-muted">({cook.totalReviews})</span>
                      </Badge>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading font-bold text-base text-prussian group-hover:text-saffron-dark transition-colors">
                          {cook.user?.fullName}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                        {cook.professionalTitle}
                      </p>
                    </div>

                    {/* Location & Experience */}
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                      <span className="truncate">{cook.locality}, {cook.city}</span>
                      <span>•</span>
                      <span className="shrink-0">{cook.yearsExperience} yrs exp</span>
                    </div>

                    {/* Cuisines */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cook.cuisines.map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 rounded-md bg-almond-800 text-prussian text-[10px] font-semibold"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="pt-3 border-t border-border flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-text-muted block">Expected Salary</span>
                        <span className="font-heading font-bold text-sm text-prussian">
                          {formatCurrency(cook.expectedSalaryMin || 15000)} – {formatCurrency(cook.expectedSalaryMax || 22000)}
                          <span className="text-[10px] font-normal text-text-secondary">/mo</span>
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-success">
                        {cook.completedJobs} jobs done
                      </span>
                    </div>
                  </div>

                  {/* Actions with Direct WhatsApp Support per ref7.html */}
                  <div className="p-4 bg-almond-900/30 border-t border-border flex items-center gap-2">
                    {cook.whatsappNumber && (
                      <a
                        href={`https://wa.me/${cook.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${cook.user?.fullName}, I found your cook profile on DHANDHA!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                        aria-label="WhatsApp Cook"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                      </a>
                    )}
                    <Link href={`/cooks/${cook.id}`} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full bg-prussian hover:bg-prussian-600 text-white rounded-xl text-xs font-bold"
                      >
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/cooks/${cook.id}`}>
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold"
                      >
                        Hire Cook
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredCooks.length === 0 && (
              <div className="bg-surface p-12 text-center rounded-3xl border border-border space-y-4">
                <div className="w-16 h-16 rounded-full bg-almond-800 flex items-center justify-center mx-auto text-prussian">
                  <ChefHat className="w-8 h-8 text-saffron" />
                </div>
                <h3 className="font-heading font-bold text-lg text-prussian">
                  No cooks matching your criteria
                </h3>
                <p className="text-xs text-text-secondary max-w-sm mx-auto">
                  Try adjusting your filters, clearing the cuisine selection, or post a
                  household cook job to invite cooks directly.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCity("All");
                    setSelectedCuisine("All");
                    setVerifiedOnly(false);
                    setSearchQuery("");
                  }}
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-bold"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
