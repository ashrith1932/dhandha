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
  Briefcase,
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  Utensils,
  ThumbsUp,
  MessageCircle,
  Flame,
  Heart,
  Crown,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer, SectionHeader } from "@/components/layout/section";
import { ThreeDElement } from "@/components/common/three-d-element";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  sampleCooks,
  sampleChefServices,
  sampleFoodListings,
  sampleFoodProviders,
  sampleJobs,
  sampleCommunityPosts,
  serviceCategories,
} from "@/lib/sample-data";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function HomePage() {
  return (
    <MainLayout>
      {/* ===== HERO SECTION (District Meets DHANDHA) ===== */}
      <section className="relative overflow-hidden bg-white text-ink-black pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-xs font-bold text-indigo-900">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                <span>Kaam bhi. Khana bhi. • India&apos;s Cooking Marketplace</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-ink-black leading-[1.1]">
                  Every Cook. Every Kitchen. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-900 to-saffron-dark">
                    Every Opportunity.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Discover trusted household cooks, book celebrity executive chefs, order from
                  authentic private home kitchens, or hire kitchen teams for your food business.
                </p>
              </div>

              {/* District-Style Search Input Box */}
              <div className="max-w-xl mx-auto lg:mx-0">
                <Link
                  href="/explore"
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/80 border border-gray-200 shadow-sm transition-all group"
                >
                  <Search className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-sm sm:text-base text-gray-500 group-hover:text-ink-black transition-colors flex-1 text-left">
                    Search for cooks, private chefs and homemade food...
                  </span>
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-ink-black text-white group-hover:bg-indigo-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>

              {/* Category Quick Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-gray-500 font-medium">
                <span className="text-gray-400">Trending:</span>
                <Link href="/cooks?cuisine=North+Indian" className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-indigo-700 transition-colors">
                  Daily Punjabi Cook
                </Link>
                <Link href="/chefs" className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-indigo-700 transition-colors">
                  House Party Chef
                </Link>
                <Link href="/food" className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-indigo-700 transition-colors">
                  Gujarati Home Tiffin
                </Link>
                <Link href="/jobs" className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-indigo-700 transition-colors">
                  Tandoor Chef Jobs
                </Link>
              </div>
            </div>

            {/* Right: 3D Interactive Culinary Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-[32px] overflow-hidden shadow-2xl border border-gray-100">
                <ThreeDElement
                  variant="hero"
                  badgeText="3D Culinary Space"
                  className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-orange-50/40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1: "COOKS & CHEFS IN YOUR DISTRICT" ===== */}
      {/* (Exact match to District "Artists in your District" in media_1794460697493_4183360b.jpg) */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-black tracking-tight">
              Cooks & Chefs in your District
            </h2>
            <Link
              href="/cooks"
              className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
            >
              <span>See all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Avatar Circles Row (dds-rounded-full style) */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar pb-2">
            {sampleCooks.map((cook) => (
              <Link
                key={cook.id}
                href={`/cooks/${cook.id}`}
                className="flex flex-col items-center flex-shrink-0 group text-center cursor-pointer"
              >
                {/* Circular Photo Avatar */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-transparent group-hover:border-saffron transition-all duration-300">
                  <img
                    src={cook.user?.avatarUrl}
                    alt={cook.user?.fullName}
                    className="w-full h-full rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-ink-black text-white text-[10px] font-bold flex items-center gap-0.5 shadow-xs">
                    <Star className="w-2.5 h-2.5 fill-saffron text-saffron" />
                    <span>{cook.averageRating}</span>
                  </span>
                </div>

                <h5 className="font-heading font-bold text-sm sm:text-base text-ink-black group-hover:text-indigo-700 transition-colors mt-2.5 max-w-[120px] truncate">
                  {cook.user?.fullName}
                </h5>
                <span className="text-[11px] text-gray-500 max-w-[120px] truncate">
                  {cook.cuisines[0]?.name} • {cook.city}
                </span>
              </Link>
            ))}

            {/* Additional Chef Avatars */}
            {sampleChefServices.map((service) => (
              <Link
                key={service.id}
                href={`/chefs/${service.id}`}
                className="flex flex-col items-center flex-shrink-0 group text-center cursor-pointer"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-transparent group-hover:border-indigo-600 transition-all duration-300">
                  <img
                    src={service.cook?.user?.avatarUrl}
                    alt={service.serviceType}
                    className="w-full h-full rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-indigo-700 text-white text-[10px] font-bold flex items-center gap-0.5 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5 text-saffron" />
                    <span>Chef</span>
                  </span>
                </div>

                <h5 className="font-heading font-bold text-sm sm:text-base text-ink-black group-hover:text-indigo-700 transition-colors mt-2.5 max-w-[120px] truncate">
                  Chef {service.cook?.user?.fullName}
                </h5>
                <span className="text-[11px] text-gray-500 max-w-[120px] truncate">
                  {service.serviceType}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: "EXPERIENCES & DINNERS HAPPENING NEAR YOU" ===== */}
      {/* (Exact match to District "Events happening at venues near you" in media_1794460697493_4183360b.jpg) */}
      <section className="py-8 sm:py-10 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-black tracking-tight">
                Experiences & Dinners happening near you
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Private chef tables, live weekend tasting menus, and home cooking experiences
              </p>
            </div>
            <Link
              href="/chefs"
              className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
            >
              <span>Explore all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Horizontal Scrolling Dark Photo Cards (District Event Cards Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sampleChefServices.map((service, idx) => (
              <Link
                key={service.id}
                href={`/chefs/${service.id}`}
                className="group block relative rounded-[24px] overflow-hidden aspect-[4/5] bg-ink-black shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Background Photo */}
                <img
                  src={service.galleryImages?.[0] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=800&fit=crop"}
                  alt={service.serviceType}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                    {service.shifts?.[0]?.split("(")[0] || "Evening Shift"}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-saffron text-white text-[11px] font-bold">
                    ★ 4.9
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                  <div className="text-[11px] font-medium text-gray-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-saffron" />
                    <span>
                      {idx === 0 ? "2.4 km • Sector 14, DLF Phase 2" : "3.8 km • Koramangala 4th Block"}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-saffron-light transition-colors line-clamp-2">
                    {service.serviceType}
                  </h3>

                  <div className="flex items-center justify-between pt-1 border-t border-white/15 text-xs">
                    <span className="text-gray-300">
                      Starting from <strong className="text-white font-bold">{formatCurrency(service.basePrice)}</strong>
                    </span>
                    <span className="font-semibold text-saffron-light flex items-center gap-0.5">
                      Book Now →
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
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-r from-[#211E48] via-[#352F72] to-[#1E1940] text-white p-8 sm:p-12 shadow-xl border border-indigo-900/40">
            {/* Background Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-saffron/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
              <span className="font-heading italic font-light text-sm sm:text-base text-purple-200 block tracking-wide">
                Seamlessly Crafted
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
                Dining Experiences
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-lg mx-auto">
                Discover private chefs, explore bespoke multicourse menus, book chef tables,
                and pay transparently — all in one place.
              </p>

              {/* Embedded Search Bar in Banner */}
              <div className="pt-2 max-w-md mx-auto">
                <Link
                  href="/chefs"
                  className="flex items-center gap-3 p-2 pl-4 rounded-full bg-white text-ink-black shadow-lg hover:shadow-2xl transition-all group"
                >
                  <Search className="w-4 h-4 text-indigo-700" />
                  <span className="text-xs sm:text-sm text-gray-500 flex-1 text-left">
                    Search for a chef, occasion or cuisine
                  </span>
                  <div className="w-9 h-9 rounded-full bg-indigo-900 text-white flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: "SHOP BY COOKING CATEGORIES" (District 4-Column Grid) ===== */}
      {/* (Exact match to District "Shop by Categories" in media_1794460711972_ae0a0995.jpg) */}
      <section className="py-8 sm:py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-black tracking-tight">
              Shop by Categories
            </h2>
            <Link
              href="/explore"
              className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900"
            >
              See all categories
            </Link>
          </div>

          {/* 4-Column Rounded Cards Matching media_1794460711972_ae0a0995.jpg */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col justify-between p-4 sm:p-5 rounded-[22px] bg-purple-50/40 hover:bg-purple-50 border border-purple-100/60 hover:border-purple-200 transition-all duration-200 group text-left cursor-pointer min-h-[170px] sm:min-h-[190px]"
              >
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-ink-black group-hover:text-indigo-800 transition-colors">
                    {cat.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {cat.count}+ active services
                  </span>
                </div>

                {/* Clean Product Cut / Photographic image below */}
                <div className="w-full flex justify-end mt-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-300">
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
      <section className="py-10 bg-amber-50/40 border-t border-amber-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Certified Private Home Kitchens Only • No Commercial Restaurants</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-black tracking-tight">
                Authentic Homemade Meals & Daily Tiffins
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Prepared with organic ingredients and traditional home recipes. Direct WhatsApp ordering available.
              </p>
            </div>

            <Link
              href="/food"
              className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 shrink-0"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleFoodListings.slice(0, 3).map((food) => (
              <Card
                key={food.id}
                className="overflow-hidden border border-gray-200/80 hover:border-indigo-600 hover:shadow-xl transition-all rounded-[24px] bg-white group flex flex-col justify-between"
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
                      <span>{food.preparationTime} min prep</span>
                    </div>
                  </div>

                  {/* Food Information */}
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
                      <span>Private Kitchen • FSSAI Registered</span>
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
                        href={`https://wa.me/${food.provider.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${food.provider.providerName}, I want to order ${food.name} via DHANDHA!`)}`}
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
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: "FROM THE DHANDHA KITCHEN TABLE" (Community Table) ===== */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Kitchen Community"
            title="From the DHANDHA Kitchen Table"
            subtitle="Cook salary transparency, grandmother's secret recipes, and Indian household stories"
            viewAllHref="/community"
            viewAllText="Join Discussions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleCommunityPosts.slice(0, 2).map((post) => (
              <Card
                key={post.id}
                className="p-6 border border-gray-200/80 hover:border-indigo-600 hover:shadow-lg transition-all rounded-[24px] bg-white flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-gray-200">
                      <AvatarImage src={post.user?.avatarUrl} />
                      <AvatarFallback>{post.user?.fullName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-ink-black">{post.user?.fullName}</span>
                      <span className="text-gray-300">•</span>
                      <Badge variant="outline" className="text-[10px] py-0 px-2 rounded-md">
                        {post.category}
                      </Badge>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400">{timeAgo(post.createdAt)}</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-ink-black group-hover:text-indigo-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {post.body}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-bold text-ink-black">
                      <ThumbsUp className="w-3.5 h-3.5 text-saffron" />
                      {post.upvotes} Upvotes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                      {post.commentsCount} Comments
                    </span>
                  </div>
                  <Link
                    href="/community"
                    className="font-bold text-indigo-700 hover:text-indigo-900 transition-colors"
                  >
                    Read Thread →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: PLATFORM CTA BANNER ===== */}
      <section className="py-16 bg-[#161B33] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <Badge variant="saffron" className="text-xs px-3 py-1 font-bold">
            Kaam bhi. Khana bhi.
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
            India&apos;s Cooking Marketplace is Here.
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            One universal account to hire a daily cook, book an executive chef for your party,
            or get hired in verified home and commercial kitchens.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl px-8 shadow-lg shadow-saffron/30"
              >
                Get Started in 2 Minutes
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-7"
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
