"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Search,
  Clock,
  Star,
  ShoppingBag,
  CheckCircle2,
  Filter,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { sampleFoodListings } from "@/lib/sample-data";
import { formatCurrency, cn } from "@/lib/utils";

export default function FoodMarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const categories = ["All", "Thali", "Breakfast", "Snacks", "Biryani", "Beverages", "Daily Meal"];

  const filteredFood = sampleFoodListings.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;
    const matchesVeg = !vegOnly || food.dietaryType === "VEG";
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.provider?.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesVeg && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Banner */}
      <div className="bg-prussian text-white py-10 sm:py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="saffron" className="text-xs font-bold">
              Food Marketplace
            </Badge>
            {cartCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron text-white text-xs font-bold animate-pulse">
                <ShoppingBag className="w-4 h-4" />
                <span>{cartCount} Items in Order</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            Authentic Homemade Meals & Daily Tiffins
          </h1>
          <p className="text-sm sm:text-base text-almond-500 max-w-2xl">
            Order delicious, preservative-free home-cooked food and subscription tiffins
            directly from certified home kitchens in your neighborhood.
          </p>

          {/* Search */}
          <div className="relative max-w-xl pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Gujarati Thali, Dosa, Biryani)..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white text-prussian placeholder:text-text-muted text-sm font-medium shadow-elevated focus:outline-none focus:ring-2 focus:ring-saffron"
            />
          </div>
        </div>
      </div>

      {/* Category Pills & Veg Switch */}
      <div className="sticky top-16 sm:top-20 z-30 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "bg-prussian text-white shadow-xs"
                    : "bg-almond-900/60 text-text-secondary hover:text-prussian hover:bg-almond-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setVegOnly(!vegOnly)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shrink-0 cursor-pointer",
              vegOnly
                ? "border-success bg-success-light text-success"
                : "border-border text-text-secondary hover:border-prussian"
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span>Pure Veg</span>
          </button>
        </div>
      </div>

      {/* Food Listings Grid */}
      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFood.map((food) => (
            <Card
              key={food.id}
              className="overflow-hidden border border-border hover:border-saffron hover:shadow-elevated transition-all flex flex-col justify-between rounded-3xl bg-surface group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-almond-800">
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-[10px] font-bold">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        food.dietaryType === "VEG" ? "bg-success" : "bg-danger"
                      }`}
                    />
                    <span>{food.dietaryType}</span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-prussian/85 text-white backdrop-blur-sm text-[11px] font-semibold">
                    <Clock className="w-3 h-3 text-saffron" />
                    <span>{food.preparationTime} min</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-muted truncate max-w-[140px]">
                      {food.provider?.providerName}
                    </span>
                    <span className="flex items-center gap-1 text-saffron font-bold text-xs">
                      <Star className="w-3 h-3 fill-saffron" />
                      {food.rating}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-prussian line-clamp-1 group-hover:text-saffron-dark transition-colors">
                    {food.name}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {food.description}
                  </p>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="p-4 bg-almond-900/20 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-muted block">Price</span>
                  <span className="font-heading font-extrabold text-base text-prussian">
                    {formatCurrency(food.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/food/${food.id}`}>
                    <Button variant="ghost" size="sm" className="text-xs font-semibold">
                      Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => setCartCount(cartCount + 1)}
                    className="bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold"
                  >
                    Add +
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
