"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Search,
  Clock,
  Star,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
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

  const categories = ["All", "Thali", "Breakfast", "Snacks", "Daily Meal", "Beverages"];

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
      {/* Compact Banner */}
      <div className="band-dark bg-noise relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Private Home Kitchens Only • No Commercial Restaurants</span>
            </div>

            {cartCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron text-white text-xs font-bold animate-pulse">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{cartCount} In Cart</span>
              </div>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] leading-[1.02] max-w-3xl">
            Authentic homemade meals<br className="hidden sm:block" />
            <span className="text-gradient-gold"> & daily tiffins.</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
            Nutritious home-cooked meals and daily subscription tiffins prepared in certified private home kitchens. Order in-app or chat directly on WhatsApp.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md pt-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Gujarati Thali, Dosa, Misal Pav)..."
              className="w-full h-9 pl-10 pr-3 rounded-full bg-white text-prussian placeholder:text-gray-400 text-xs sm:text-sm font-medium shadow-xs focus:outline-none focus:ring-1.5 focus:ring-saffron"
            />
          </div>
        </div>
      </div>

      {/* Category Pills & Pure Veg Toggle */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8E3DC] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "bg-[#FFB03A] text-ink-black font-black shadow-glow-soft"
                    : "bg-gray-100 text-gray-600 hover:text-prussian hover:bg-gray-200"
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
              "flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-all shrink-0 cursor-pointer",
              vegOnly
                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Pure Veg Only</span>
          </button>
        </div>
      </div>

      {/* Food Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredFood.map((food) => {
            const whatsappOrderUrl = `https://wa.me/${(food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${food.provider?.providerName}, I want to order ${food.name} (₹${food.price}) via DHANDHA!`)}`;

            return (
              <Card
                key={food.id}
                className="overflow-hidden border border-gray-200/90 hover:border-saffron hover:shadow-card-hover transition-all rounded-2xl bg-white group flex flex-col justify-between"
              >
                <div>
                  {/* Food Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-bold text-gray-800 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{food.dietaryType}</span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-prussian/85 text-white backdrop-blur-sm text-[10px] font-semibold">
                      <Clock className="w-3 h-3 text-saffron" />
                      <span>{food.preparationTime} min</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-prussian bg-saffron-subtle px-2 py-0.2 rounded-md truncate max-w-[150px] text-[11px]">
                        {food.provider?.providerName}
                      </span>
                      <span className="flex items-center gap-1 text-saffron font-bold text-xs">
                        <Star className="w-3 h-3 fill-saffron text-saffron" />
                        <span>{food.rating}</span>
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-sm text-prussian group-hover:text-ember transition-colors line-clamp-1">
                      {food.name}
                    </h3>

                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>

                    <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 pt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Certified Home Kitchen</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase font-semibold block leading-none">Price</span>
                    <span className="font-heading font-bold text-sm sm:text-base text-prussian">
                      {formatCurrency(food.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {food.provider?.whatsappNumber && (
                      <a
                        href={whatsappOrderUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors inline-flex items-center gap-1"
                        aria-label="Order via WhatsApp"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span className="text-[11px]">WhatsApp</span>
                      </a>
                    )}

                    <Link href={`/food/${food.id}`}>
                      <Button variant="secondary"
                        size="sm"
                        className="h-9 rounded-xl text-xs font-bold px-4"
                      >
                        Order
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
