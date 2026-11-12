import React from "react";
import Link from "next/link";
import {
  ChefHat,
  Search,
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  UtensilsCrossed,
  Utensils,
  ThumbsUp,
  MessageCircle,
  Phone,
  Flame,
  ChevronRight,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { ThreeDElement } from "@/components/common/three-d-element";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  sampleCooks,
  sampleChefServices,
  sampleFoodListings,
  sampleCommunityPosts,
  serviceCategories,
} from "@/lib/sample-data";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function HomePage() {
  return (
    <MainLayout>
      {/* ===== HERO SECTION (Compact, Balanced, Human-Crafted) ===== */}
      <section className="bg-white text-prussian pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              {/* Tagline Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/60 text-[11px] font-bold text-indigo-900">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                <span>Kaam bhi. Khana bhi. • India&apos;s Cooking Marketplace</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-prussian leading-tight">
                  Every Cook. Every Kitchen. <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-indigo-900 to-saffron">
                    Every Opportunity.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-normal max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Discover verified domestic cooks, book private dinner chefs, order from certified
                  private home kitchens, or hire kitchen teams for food businesses.
                </p>
              </div>

              {/* District-Style Search Input Box */}
              <div className="max-w-md mx-auto lg:mx-0 pt-1">
                <Link
                  href="/explore"
                  className="flex items-center gap-2.5 p-2.5 pl-3.5 rounded-full bg-gray-50 hover:bg-gray-100/90 border border-gray-200 shadow-xs transition-all group"
                >
                  <Search className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-500 group-hover:text-prussian transition-colors flex-1 text-left truncate">
                    Search cooks, private chefs and homemade food...
                  </span>
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-prussian text-white group-hover:bg-indigo-700 transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>

              {/* Trending Quick Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-0.5 text-[11px] text-gray-500 font-medium">
                <span className="text-gray-400">Popular:</span>
                <Link href="/cooks?cuisine=North+Indian" className="px-2.5 py-0.5 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-indigo-700 transition-colors">
                  North Indian Cook
                </Link>
                <Link href="/chefs" className="px-2.5 py-0.5 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-indigo-700 transition-colors">
                  House Party Chef
                </Link>
                <Link href="/food" className="px-2.5 py-0.5 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-indigo-700 transition-colors">
                  Home Tiffin
                </Link>
              </div>
            </div>

            {/* Right: Realistic Marketplace Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-gradient-to-br from-purple-50/70 via-white to-amber-50/30 rounded-2xl border border-gray-200/90 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
                  <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-saffron" />
                    Spotlight Cook of the District
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-13 h-13 border-2 border-white shadow-xs shrink-0">
                    <AvatarImage src={sampleCooks[0].user?.avatarUrl} alt={sampleCooks[0].user?.fullName} />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-sm text-prussian truncate">
                        {sampleCooks[0].user?.fullName}
                      </h4>
                      <span className="text-xs font-bold text-prussian flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-saffron text-saffron" />
                        4.8
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate">
                      {sampleCooks[0].professionalTitle}
                    </p>
                    <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{sampleCooks[0].locality}, {sampleCooks[0].city}</span>
                    </div>
                  </div>
                </div>

                {/* Micro 3D preview & quick action */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Expected Rate</span>
                    <span className="font-bold text-prussian">
                      {formatCurrency(sampleCooks[0].expectedSalaryMin || 15000)}
                      <span className="text-[10px] font-normal text-gray-500">/mo</span>
                    </span>
                  </div>
                  <Link href={`/cooks/${sampleCooks[0].id}`}>
                    <Button size="sm" className="h-8 rounded-xl bg-prussian hover:bg-black text-white text-xs font-bold px-3">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1: "COOKS & CHEFS IN YOUR DISTRICT" (Compact District Avatars) ===== */}
      {/* (Exact match to District "Artists in your District" in media_1794460697493_4183360b.jpg) */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-prussian tracking-tight">
              Artists & Cooks in your District
            </h2>
            <Link
              href="/cooks"
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5"
            >
              <span>See all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* District Compact Circles Carousel */}
          <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-1">
            {sampleCooks.map((cook) => (
              <Link
                key={cook.id}
                href={`/cooks/${cook.id}`}
                className="flex flex-col items-center flex-shrink-0 group text-center cursor-pointer max-w-[80px] sm:max-w-[96px]"
              >
                {/* Compact Circular Photo Avatar (w-16 h-16 sm:w-20 sm:h-20) */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 border border-transparent group-hover:border-saffron transition-all duration-200">
                  <img
                    src={cook.user?.avatarUrl}
                    alt={cook.user?.fullName}
                    className="w-full h-full rounded-full object-cover shadow-xs group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="absolute bottom-0 right-0 px-1 py-0.2 rounded-full bg-prussian text-white text-[9px] font-bold flex items-center gap-0.5 shadow-xs">
                    <Star className="w-2 h-2 fill-saffron text-saffron" />
                    <span>{cook.averageRating}</span>
                  </span>
                </div>

                <h5 className="font-heading font-semibold text-xs sm:text-sm text-prussian group-hover:text-indigo-700 transition-colors mt-1.5 truncate w-full">
                  {cook.user?.fullName}
                </h5>
                <span className="text-[10px] text-gray-500 truncate w-full">
                  {cook.cuisines[0]?.name}
                </span>
              </Link>
            ))}

            {sampleChefServices.map((service) => (
              <Link
                key={service.id}
                href={`/chefs/${service.id}`}
                className="flex flex-col items-center flex-shrink-0 group text-center cursor-pointer max-w-[80px] sm:max-w-[96px]"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 border border-transparent group-hover:border-indigo-600 transition-all duration-200">
                  <img
                    src={service.cook?.user?.avatarUrl}
                    alt={service.serviceType}
                    className="w-full h-full rounded-full object-cover shadow-xs group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="absolute bottom-0 right-0 px-1 py-0.2 rounded-full bg-indigo-800 text-white text-[9px] font-bold flex items-center gap-0.5 shadow-xs">
                    <Sparkles className="w-2 h-2 text-saffron" />
                    <span>Chef</span>
                  </span>
                </div>

                <h5 className="font-heading font-semibold text-xs sm:text-sm text-prussian group-hover:text-indigo-700 transition-colors mt-1.5 truncate w-full">
                  Chef {service.cook?.user?.fullName}
                </h5>
                <span className="text-[10px] text-gray-500 truncate w-full">
                  {service.cook?.city}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: "EXPERIENCES & DINNERS HAPPENING NEAR YOU" (Horizontal Peek Carousel) ===== */}
      {/* (Exact match to District "Events happening at venues near you" in media_1794460697493_4183360b.jpg) */}
      <section className="py-6 sm:py-8 bg-gray-50/70 border-t border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-prussian tracking-tight">
                Events happening at venues near you
              </h2>
              <p className="text-xs text-gray-500">
                Private chef tables, live tasting menus and boutique culinary sessions
              </p>
            </div>
            <Link
              href="/chefs"
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5"
            >
              <span>See all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Horizontal Peek Carousel (cards sized 240px-280px so they don't look giant or AI-ish) */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x">
            {sampleChefServices.map((service, idx) => (
              <Link
                key={service.id}
                href={`/chefs/${service.id}`}
                className="group relative flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] rounded-2xl overflow-hidden aspect-[3/4] bg-ink-black shadow-xs hover:shadow-md transition-all duration-200 snap-start"
              >
                {/* Background Photo */}
                <img
                  src={service.galleryImages?.[0] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=700&fit=crop"}
                  alt={service.serviceType}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Top Shift Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold">
                    {service.shifts?.[0]?.split("(")[0] || "Evening Shift"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-saffron text-white text-[10px] font-bold">
                    ★ 4.9
                  </span>
                </div>

                {/* Bottom Content matching District reference */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <div className="text-[10px] text-gray-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-saffron shrink-0" />
                    <span className="truncate">
                      {idx === 0 ? "2.4 km • Sector 14, DLF Phase 2" : "3.8 km • Koramangala 4th Block"}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-saffron-light transition-colors line-clamp-1">
                    {service.serviceType}
                  </h3>

                  <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[11px]">
                    <span className="text-gray-300">
                      From <strong className="text-white font-bold">{formatCurrency(service.basePrice)}</strong>
                    </span>
                    <span className="font-semibold text-saffron-light">
                      Book →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: "SEAMLESSLY CRAFTED DINING EXPERIENCES" BANNER ===== */}
      {/* (Exact match to District Dining Banner in media_1794460697503_bc049302.jpg) */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#211E48] via-[#352F72] to-[#1E1940] text-white py-6 px-6 sm:py-8 sm:px-10 shadow-md">
            <div className="relative z-10 max-w-xl mx-auto text-center space-y-2.5">
              <span className="font-heading italic font-light text-xs sm:text-sm text-purple-200 block tracking-wide">
                Seamlessly Crafted
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                Dining Experiences
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-md mx-auto">
                Discover private chefs, explore menus, book chef tables, and pay bills — all in one place.
              </p>

              {/* Inline Search Pill */}
              <div className="pt-1.5 max-w-sm mx-auto">
                <Link
                  href="/chefs"
                  className="flex items-center gap-2 p-1.5 pl-3.5 rounded-full bg-white text-prussian shadow-sm hover:shadow-md transition-all group"
                >
                  <Search className="w-3.5 h-3.5 text-indigo-700" />
                  <span className="text-xs text-gray-500 flex-1 text-left truncate">
                    Search for a restaurant or chef name
                  </span>
                  <div className="w-7 h-7 rounded-full bg-indigo-950 text-white flex items-center justify-center group-hover:bg-indigo-700 transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: "SHOP BY CATEGORIES" (District 4-Column Grid) ===== */}
      {/* (Exact match to District "Shop by Categories" in media_1794460711972_ae0a0995.jpg) */}
      <section className="py-6 sm:py-8 bg-white border-t border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-prussian tracking-tight">
              Shop by Categories
            </h2>
            <Link
              href="/explore"
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5"
            >
              <span>See all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4-Column Rounded Cards Matching media_1794460711972_ae0a0995.jpg */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3.5">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col justify-between p-3 rounded-xl bg-[#F7F7F8] hover:bg-[#EFEFF1] border border-gray-100 transition-all duration-150 group text-left cursor-pointer min-h-[110px] sm:min-h-[125px]"
              >
                <h4 className="font-heading font-semibold text-xs text-prussian group-hover:text-indigo-800 transition-colors line-clamp-2">
                  {cat.name}
                </h4>

                {/* Clean Product Cutout at Bottom */}
                <div className="w-full flex justify-end mt-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: "CERTIFIED PRIVATE HOME KITCHENS ONLY" ===== */}
      {/* (Direct fulfillment of user directive in ref7.html: NO commercial restaurants selling food, WhatsApp direct chat & call) */}
      <section className="py-8 bg-amber-50/30 border-t border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Certified Private Home Kitchens Only • No Commercial Restaurants</span>
              </div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-prussian tracking-tight">
                Authentic Homemade Meals & Daily Tiffins
              </h2>
            </div>

            <Link
              href="/food"
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 shrink-0"
            >
              <span>View Full Menu</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sampleFoodListings.slice(0, 3).map((food) => {
              const whatsappOrderUrl = `https://wa.me/${(food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${food.provider?.providerName}, I want to order ${food.name} via DHANDHA!`)}`;

              return (
                <Card
                  key={food.id}
                  className="overflow-hidden border border-gray-200/80 hover:border-indigo-600 hover:shadow-card-hover transition-all rounded-2xl bg-white group flex flex-col justify-between"
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

                    {/* Food Information */}
                    <div className="p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-indigo-900 bg-purple-50 px-2 py-0.2 rounded-md truncate max-w-[150px] text-[11px]">
                          {food.provider?.providerName}
                        </span>
                        <span className="flex items-center gap-1 text-saffron font-bold text-xs">
                          <Star className="w-3 h-3 fill-saffron text-saffron" />
                          <span>{food.rating}</span>
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-sm text-prussian group-hover:text-indigo-700 transition-colors line-clamp-1">
                        {food.name}
                      </h3>

                      <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                        {food.description}
                      </p>

                      <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 pt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Private Home Kitchen • FSSAI Registered</span>
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
                        <Button
                          size="sm"
                          className="h-8 bg-prussian hover:bg-indigo-700 text-white rounded-lg text-xs font-bold px-3"
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
      </section>

      {/* ===== SECTION 6: COMMUNITY DISCUSSIONS ===== */}
      <section className="py-8 bg-white border-t border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-prussian tracking-tight">
              From the DHANDHA Kitchen Table
            </h2>
            <Link
              href="/community"
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5"
            >
              <span>Join discussions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleCommunityPosts.slice(0, 2).map((post) => (
              <Card
                key={post.id}
                className="p-4 border border-gray-200/80 hover:border-indigo-600 hover:shadow-card-hover transition-all rounded-2xl bg-white flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7 border border-gray-200">
                      <AvatarImage src={post.user?.avatarUrl} />
                      <AvatarFallback>{post.user?.fullName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-bold text-prussian">{post.user?.fullName}</span>
                      <span className="text-gray-300">•</span>
                      <Badge variant="outline" className="text-[9px] py-0 px-1.5 rounded-md">
                        {post.category}
                      </Badge>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400">{timeAgo(post.createdAt)}</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-sm text-prussian group-hover:text-indigo-700 transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {post.body}
                  </p>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-bold text-prussian text-[11px]">
                      <ThumbsUp className="w-3 h-3 text-saffron" />
                      {post.upvotes} Upvotes
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <MessageCircle className="w-3 h-3 text-gray-400" />
                      {post.commentsCount} Comments
                    </span>
                  </div>
                  <Link
                    href="/community"
                    className="font-bold text-indigo-700 hover:text-indigo-900 transition-colors text-xs"
                  >
                    Read Thread →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: COMPACT CTA BANNER ===== */}
      <section className="py-10 bg-prussian text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <Badge variant="saffron" className="text-[10px] px-2.5 py-0.5 font-bold">
            Kaam bhi. Khana bhi.
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            India&apos;s Cooking Marketplace is Here.
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
            One universal account to hire a daily cook, book an executive chef for your party,
            or get hired in verified home and commercial kitchens.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/register">
              <Button
                size="sm"
                className="bg-saffron hover:bg-saffron-dark text-white font-bold rounded-xl px-5 h-9 shadow-xs"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-xl px-5 h-9"
              >
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
