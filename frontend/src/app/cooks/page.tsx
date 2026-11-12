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
      {/* Compact Header */}
      <div className="bg-prussian text-white py-6 sm:py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
          <Badge variant="saffron" className="text-[10px] font-bold py-0 px-2">
            Hire a Cook
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            Find Trusted Home Cooks Near You
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
            Browse verified daily cooks, part-time meal preparers, vegetarian specialists, and regional cuisine experts.
          </p>

          {/* Quick Search */}
          <div className="relative max-w-md pt-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by cook name, cuisine or locality..."
              className="w-full h-9 pl-10 pr-3 rounded-full bg-white text-prussian placeholder:text-gray-400 text-xs sm:text-sm font-medium shadow-xs focus:outline-none focus:ring-1.5 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="space-y-4 lg:block">
            <div className="bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-heading font-bold text-xs uppercase tracking-wider text-prussian">
                  Filters
                </span>
                {(selectedCity !== "All" || selectedCuisine !== "All" || verifiedOnly) && (
                  <button
                    onClick={() => {
                      setSelectedCity("All");
                      setSelectedCuisine("All");
                      setVerifiedOnly(false);
                    }}
                    className="text-[11px] text-saffron-dark font-semibold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* City filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-prussian block">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-8.5 px-2.5 rounded-lg border border-gray-200 bg-gray-50 text-xs font-medium text-prussian focus:outline-none focus:ring-1.5 focus:ring-indigo-600"
                >
                  <option value="All">All Cities</option>
                  {popularCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Cuisine filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-prussian block">Cuisine</label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full h-8.5 px-2.5 rounded-lg border border-gray-200 bg-gray-50 text-xs font-medium text-prussian focus:outline-none focus:ring-1.5 focus:ring-indigo-600"
                >
                  <option value="All">All Cuisines</option>
                  {popularCuisines.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Verified Only */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <span className="text-xs text-prussian font-medium">Verified cooks only</span>
              </label>
            </div>
          </aside>

          {/* Results Area */}
          <main className="lg:col-span-3 space-y-4">
            {/* Top Bar: Results Count & Sort Dropdown */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="font-bold text-prussian">{filteredCooks.length}</span>
                <span>cooks available</span>
                {selectedCity !== "All" && (
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                    in {selectedCity}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-7.5 px-2 rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-prussian focus:outline-none"
                >
                  <option value="RATING">Highest Rated</option>
                  <option value="EXPERIENCE">Most Experienced</option>
                  <option value="PRICE">Price: Low to High</option>
                </select>
              </div>
            </div>

            {/* Cooks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCooks.map((cook) => (
                <Card
                  key={cook.id}
                  className="overflow-hidden border border-gray-200 hover:border-indigo-600 hover:shadow-card-hover transition-all flex flex-col justify-between rounded-2xl bg-white group"
                >
                  <div className="p-4 space-y-3">
                    {/* Avatar & Rating */}
                    <div className="flex items-start justify-between">
                      <div className="relative">
                        <Avatar className="w-13 h-13 border-2 border-white shadow-xs">
                          <AvatarImage src={cook.user?.avatarUrl} />
                          <AvatarFallback>{cook.user?.fullName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-600 ring-2 ring-white" />
                      </div>
                      <Badge variant="saffron" className="text-xs font-semibold gap-1 py-0 px-2">
                        <Star className="w-3 h-3 fill-saffron text-saffron" />
                        <span>{cook.averageRating}</span>
                        <span className="text-[9px] text-gray-400">({cook.totalReviews})</span>
                      </Badge>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-heading font-bold text-sm text-prussian group-hover:text-indigo-700 transition-colors">
                          {cook.user?.fullName}
                        </h3>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {cook.professionalTitle}
                      </p>
                    </div>

                    {/* Location & Experience */}
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{cook.locality}, {cook.city}</span>
                      <span>•</span>
                      <span className="shrink-0">{cook.yearsExperience} yrs exp</span>
                    </div>

                    {/* Cuisines */}
                    <div className="flex flex-wrap gap-1">
                      {cook.cuisines.map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-indigo-950 text-[10px] font-semibold"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[9px] text-gray-400 uppercase font-semibold block leading-none">Expected Salary</span>
                        <span className="font-heading font-bold text-xs sm:text-sm text-prussian">
                          {formatCurrency(cook.expectedSalaryMin || 15000)} – {formatCurrency(cook.expectedSalaryMax || 22000)}
                          <span className="text-[9px] font-normal text-gray-400">/mo</span>
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700">
                        {cook.completedJobs} jobs done
                      </span>
                    </div>
                  </div>

                  {/* Actions with Direct WhatsApp Support */}
                  <div className="p-3 bg-gray-50/70 border-t border-gray-100 flex items-center gap-2">
                    {cook.whatsappNumber && (
                      <a
                        href={`https://wa.me/${cook.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${cook.user?.fullName}, I found your cook profile on DHANDHA!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors shrink-0"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                    )}
                    <Link href={`/cooks/${cook.id}`} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full h-8 bg-prussian hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
