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
  Sparkles,
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
      {/* Banner matching District style */}
      <div className="bg-gradient-to-r from-[#1E1940] via-[#2A2359] to-[#161B33] text-white py-10 sm:py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Private Home Kitchens Only • No Commercial Restaurants</span>
            </div>

            {cartCount > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron text-white text-xs font-bold animate-pulse">
                <ShoppingBag className="w-4 h-4" />
                <span>{cartCount} In Cart</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            Authentic Homemade Meals & Daily Tiffins
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Order nutritious home-cooked meals and subscription tiffins directly from verified
            private home kitchens in your neighborhood. Order directly or connect via WhatsApp.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Gujarati Thali, Dosa, Misal Pav)..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white text-ink-black placeholder:text-gray-400 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Category Pills & Pure Veg Toggle */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "bg-purple-100 text-indigo-900 shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:text-ink-black hover:bg-gray-200/70"
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
              "flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all shrink-0 cursor-pointer",
              vegOnly
                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Pure Veg Only</span>
          </button>
        </div>
      </div>

      {/* Food Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFood.map((food) => {
            const whatsappOrderUrl = `https://wa.me/${(food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${food.provider?.providerName}, I want to order ${food.name} (₹${food.price}) via DHANDHA!`)}`;

            return (
              <Card
                key={food.id}
                className="overflow-hidden border border-gray-200/90 hover:border-indigo-600 hover:shadow-xl transition-all rounded-[24px] bg-white group flex flex-col justify-between"
              >
                <div>
                  {/* Food Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-gray-800 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>{food.dietaryType}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-black/90 text-white backdrop-blur-sm text-[11px] font-semibold">
                      <Clock className="w-3 h-3 text-saffron" />
                      <span>{food.preparationTime} min</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-indigo-900 bg-purple-50 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                        {food.provider?.providerName}
                      </span>
                      <span className="flex items-center gap-1 text-saffron-dark font-bold">
                        <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
                        <span>{food.rating}</span>
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-ink-black group-hover:text-indigo-700 transition-colors line-clamp-1">
                      {food.name}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>

                    <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Certified Private Home Kitchen</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action (WhatsApp Chat + Order) */}
                <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Price</span>
                    <span className="font-heading font-extrabold text-base text-ink-black">
                      {formatCurrency(food.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Direct WhatsApp Option per ref7.html */}
                    {food.provider?.whatsappNumber && (
                      <a
                        href={whatsappOrderUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                        aria-label="Order via WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    <Link href={`/food/${food.id}`}>
                      <Button
                        size="sm"
                        className="bg-ink-black hover:bg-indigo-700 text-white rounded-xl text-xs font-bold px-4"
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
