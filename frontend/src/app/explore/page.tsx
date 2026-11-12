"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChefHat,
  Sparkles,
  UtensilsCrossed,
  Briefcase,
  Users,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  Filter,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  sampleCooks,
  sampleChefServices,
  sampleFoodListings,
  sampleJobs,
  popularCuisines,
} from "@/lib/sample-data";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";

type ActiveTab = "ALL" | "COOKS" | "CHEFS" | "FOOD" | "JOBS";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [vegOnly, setVegOnly] = useState(false);

  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ElementType }> = [
    { id: "ALL", label: "For You", icon: Sparkles },
    { id: "COOKS", label: "Cooks", icon: ChefHat },
    { id: "CHEFS", label: "Private Chefs", icon: Sparkles },
    { id: "FOOD", label: "Homemade Food", icon: UtensilsCrossed },
    { id: "JOBS", label: "Kitchen Jobs", icon: Briefcase },
  ];

  return (
    <MainLayout>
      {/* Top Banner (District Reference Style) */}
      <div className="bg-prussian text-white py-8 sm:py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge variant="saffron" className="text-xs font-bold">
            Unified Discovery
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Discover Cooking in Your City
          </h1>
          <p className="text-sm sm:text-base text-almond-500 max-w-xl">
            Explore trusted home cooks, master event chefs, authentic home kitchens, and
            kitchen employment opportunities.
          </p>

          {/* District-style Search Bar */}
          <div className="relative max-w-2xl pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by cook name, cuisine, dish or restaurant..."
              className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-2xl bg-white text-prussian placeholder:text-text-muted text-sm sm:text-base font-medium shadow-elevated focus:outline-none focus:ring-2 focus:ring-saffron"
            />
          </div>
        </div>
      </div>

      {/* District-style Horizontal Navigation Pills */}
      <div className="sticky top-16 sm:top-20 z-30 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Scrollable Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
                    isSelected
                      ? "bg-prussian text-white shadow-sm"
                      : "bg-almond-900/60 text-text-secondary hover:text-prussian hover:bg-almond-800/80"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isSelected ? "text-saffron" : "")} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Veg Toggle */}
          {(activeTab === "ALL" || activeTab === "FOOD") && (
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              className={cn(
                "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shrink-0",
                vegOnly
                  ? "border-success bg-success-light text-success"
                  : "border-border text-text-secondary hover:border-text-secondary"
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              <span>Veg Only</span>
            </button>
          )}
        </div>

        {/* Cuisine Chips */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-text-muted font-semibold text-[11px] mr-1 shrink-0">
            Cuisines:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCuisine(null)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0",
              selectedCuisine === null
                ? "bg-saffron text-white font-bold"
                : "bg-almond-800/50 text-text-secondary hover:text-prussian"
            )}
          >
            All
          </button>
          {popularCuisines.slice(0, 10).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCuisine(selectedCuisine === c ? null : c)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0",
                selectedCuisine === c
                  ? "bg-saffron text-white font-bold"
                  : "bg-almond-800/50 text-text-secondary hover:text-prussian"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Container */}
      <SectionContainer className="pt-6">
        {/* Cooks Section */}
        {(activeTab === "ALL" || activeTab === "COOKS") && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-prussian">
                  Available Household Cooks
                </h2>
                <p className="text-xs text-text-secondary">
                  Ready for daily hire, part-time or full-time
                </p>
              </div>
              <Link href="/cooks" className="text-xs font-bold text-saffron-dark hover:text-saffron">
                View all ({sampleCooks.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleCooks.map((cook) => (
                <Card
                  key={cook.id}
                  className="p-5 border border-border hover:border-saffron hover:shadow-card-hover transition-all flex flex-col justify-between rounded-3xl bg-surface group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Avatar className="w-14 h-14 border border-border">
                        <AvatarImage src={cook.user?.avatarUrl} />
                        <AvatarFallback>{cook.user?.fullName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Badge variant="saffron" className="text-xs gap-1 font-semibold">
                        <Star className="w-3 h-3 fill-saffron text-saffron" />
                        <span>{cook.averageRating}</span>
                      </Badge>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading font-bold text-base text-prussian group-hover:text-saffron-dark transition-colors">
                          {cook.user?.fullName}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-success" />
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-1">
                        {cook.professionalTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <MapPin className="w-3.5 h-3.5 text-text-muted" />
                      <span>{cook.locality}, {cook.city}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {cook.cuisines.slice(0, 3).map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 rounded-md bg-almond-800 text-prussian text-[10px] font-medium"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-text-muted block">Expected</span>
                      <span className="font-heading font-bold text-xs text-prussian">
                        {formatCurrency(cook.expectedSalaryMin || 15000)}/mo
                      </span>
                    </div>
                    <Link href={`/cooks/${cook.id}`}>
                      <Button size="sm" variant="default" className="rounded-xl text-xs font-bold">
                        View
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Food Section */}
        {(activeTab === "ALL" || activeTab === "FOOD") && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-prussian">
                  Homemade Food & Tiffins
                </h2>
                <p className="text-xs text-text-secondary">
                  Fresh meals delivered from local home kitchens
                </p>
              </div>
              <Link href="/food" className="text-xs font-bold text-saffron-dark hover:text-saffron">
                View all ({sampleFoodListings.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {sampleFoodListings.map((food) => (
                <Card
                  key={food.id}
                  className="overflow-hidden border border-border hover:border-saffron hover:shadow-card-hover transition-all flex flex-col rounded-3xl bg-surface group"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-almond-800">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface/90 text-[10px] font-bold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          food.dietaryType === "VEG" ? "bg-success" : "bg-danger"
                        }`}
                      />
                      <span>{food.dietaryType}</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-semibold text-text-muted">
                        {food.provider?.providerName}
                      </span>
                      <h3 className="font-heading font-bold text-sm text-prussian line-clamp-1 group-hover:text-saffron-dark">
                        {food.name}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <span className="font-heading font-bold text-sm text-prussian">
                        {formatCurrency(food.price)}
                      </span>
                      <Link href={`/food/${food.id}`}>
                        <Button size="sm" variant="outline" className="rounded-xl text-xs font-semibold">
                          Order
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Chef Services */}
        {(activeTab === "ALL" || activeTab === "CHEFS") && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-prussian">
                  Executive Chef Booking
                </h2>
                <p className="text-xs text-text-secondary">
                  Special event and fine dining chefs
                </p>
              </div>
              <Link href="/chefs" className="text-xs font-bold text-saffron-dark hover:text-saffron">
                View all chefs →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleChefServices.map((service) => (
                <Card
                  key={service.id}
                  className="p-5 border border-border hover:border-prussian hover:shadow-card-hover transition-all flex flex-col justify-between rounded-3xl bg-surface group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-prussian text-white flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-saffron" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-prussian group-hover:text-saffron-dark">
                      {service.serviceType}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2">
                      {service.description}
                    </p>
                    <span className="text-xs font-medium text-text-secondary block">
                      Capacity: {service.minimumGuests} – {service.maximumGuests} guests
                    </span>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-text-muted block">From</span>
                      <span className="font-heading font-bold text-sm text-prussian">
                        {formatCurrency(service.basePrice)}
                      </span>
                    </div>
                    <Link href={`/chefs/${service.id}`}>
                      <Button size="sm" className="bg-prussian hover:bg-prussian-600 text-white rounded-xl text-xs font-bold">
                        Book
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Jobs Section */}
        {(activeTab === "ALL" || activeTab === "JOBS") && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-prussian">
                  Cooking & Kitchen Jobs
                </h2>
                <p className="text-xs text-text-secondary">
                  Full-time, part-time, household & restaurant vacancies
                </p>
              </div>
              <Link href="/jobs" className="text-xs font-bold text-saffron-dark hover:text-saffron">
                View all jobs ({sampleJobs.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-5 border border-border hover:border-prussian hover:shadow-card-hover transition-all flex flex-col justify-between rounded-3xl bg-surface group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={job.jobType === "RESTAURANT" ? "default" : "secondary"} className="text-[10px]">
                        {job.jobType}
                      </Badge>
                      <span className="text-xs text-text-muted">
                        Posted {timeAgo(job.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-prussian group-hover:text-saffron-dark">
                      {job.title}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {job.restaurant?.name || job.postedByUser?.fullName} • {job.city}, {job.locality}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-prussian">
                      {formatCurrency(job.salaryMin || 15000)} – {formatCurrency(job.salaryMax || 25000)}/mo
                    </span>
                    <Link href={`/jobs/${job.id}`}>
                      <Button size="sm" className="bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold">
                        Apply
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </SectionContainer>
    </MainLayout>
  );
}
