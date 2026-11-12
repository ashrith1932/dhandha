import React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  UtensilsCrossed,
  Utensils,
  MessageCircle,
  Phone,
  Flame,
  ChevronRight,
  ChefHat,
  Briefcase,
  Building2,
  Users,
  BadgeCheck,
  Soup,
  IndianRupee,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Reveal } from "@/components/common/reveal";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { UpvoteButton } from "@/components/common/upvote-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  sampleCooks,
  sampleChefServices,
  sampleFoodListings,
  sampleCommunityPosts,
  popularCuisines,
} from "@/lib/sample-data";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function HomePage() {
  const heroCook = sampleCooks[0];

  return (
    <MainLayout>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-aurora-light bg-noise border-b border-border/70">
        {/* Ambient glow orbs */}
        <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,200,122,0.55),transparent_70%)] blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-28 bottom-8 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(228,90,55,0.3),transparent_70%)] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* ---- Copy side ---- */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Live pill */}
              <Link
                href="/explore"
                className="group inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-white/70 backdrop-blur px-3.5 py-1.5 shadow-xs transition-all hover:border-saffron hover:shadow-glow-soft"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-saffron" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#FFB03A] to-[#E45A37]" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] text-saffron-dark">
                  India&apos;s Cooking Marketplace
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-saffron-dark transition-transform group-hover:translate-x-0.5" />
              </Link>

              {/* Headline */}
              <h1 className="mt-5 font-heading font-extrabold tracking-[-0.045em] text-text-primary leading-[0.98] text-[2.3rem] sm:text-6xl xl:text-[4.35rem]">
                Every Cook.
                <br />
                Every Kitchen.
                <br />
                <span className="text-gradient-warm">Every Opportunity.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-text-secondary">
                Hire verified home cooks, book private chefs for occasions, order from FSSAI-registered
                home kitchens — or turn your cooking into a career.
              </p>

              {/* Search pill */}
              <div className="mt-6 w-full max-w-lg">
                <Link
                  href="/explore"
                  className="group flex items-center gap-3 rounded-2xl sm:rounded-full border border-border bg-white/85 backdrop-blur p-2 pl-4 sm:pl-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-saffron/60 focus-visible:outline-none"
                  aria-label="Search the marketplace"
                >
                  <Search className="h-5 w-5 shrink-0 text-ember transition-transform duration-300 group-hover:scale-110" strokeWidth={2.4} />
                  <span className="flex-1 truncate text-left text-[13px] sm:text-sm text-text-muted group-hover:text-text-secondary transition-colors">
                    Search &ldquo;North Indian cook&rdquo;, &ldquo;tiffin&rdquo;, &ldquo;chef for 20&rdquo;…
                  </span>
                  <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-full bg-prussian text-saffron-light transition-all duration-300 group-hover:bg-ink-black group-hover:text-[#FFB03A]">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} />
                  </span>
                </Link>

                {/* Popular chips */}
                <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-[10px] sm:text-[11px] font-semibold text-text-secondary">
                  <span className="text-text-muted mr-0.5">Popular:</span>
                  {[
                    ["North Indian cook", "/cooks?cuisine=North+Indian"],
                    ["House party chef", "/chefs"],
                    ["Home tiffin", "/food"],
                  ].map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      className="rounded-full border border-border bg-white/70 px-2.5 py-1 transition-all hover:border-saffron hover:text-saffron-dark hover:bg-saffron-subtle"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social proof row */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {sampleCooks.slice(0, 5).map((c, i) => (
                    <Avatar key={i} className="h-9 w-9 border-2 border-background ring-1 ring-border">
                      <AvatarImage src={c.user?.avatarUrl} alt="" />
                      <AvatarFallback className="bg-prussian text-[9px] font-bold text-saffron-light">
                        {c.user?.fullName?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-saffron text-saffron" />
                      ))}
                    </div>
                    <span className="text-xs font-extrabold text-prussian">4.9</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-text-muted">
                    <span className="font-bold text-prussian">12,400+</span> verified cooks · 350k meals delivered
                  </p>
                </div>
              </div>
            </div>

            {/* ---- Visual side: layered photo collage ---- */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Rotating dashed halo */}
              <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[26rem] w-[26rem] sm:h-[30rem] sm:w-[30rem] rounded-full border-2 border-dashed border-saffron/35 spin-slower" />

              <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
                {/* Main photo card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80"
                    alt="Verified cook plating a fresh meal in a modern Indian home kitchen"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-black/85 via-ink-black/15 to-transparent" />
                  {/* FSSAI strip */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1.5 text-[10px] font-bold text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" /> FSSAI Verified Kitchen
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FFB03A]">Spotlight Cook</p>
                    <h3 className="mt-0.5 font-heading text-lg font-extrabold leading-tight text-white">{heroCook.user?.fullName}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/75">
                      <MapPin className="h-3 w-3" /> {heroCook.locality}, {heroCook.city}
                      <span className="mx-1 text-white/30">•</span>
                      <Star className="h-3 w-3 fill-saffron text-saffron" /> {heroCook.averageRating} rating
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-white/50">From</span>
                        <span className="font-heading text-base font-extrabold text-white">
                          {formatCurrency(heroCook.expectedSalaryMin || 15000)}
                          <span className="text-[10px] font-semibold text-white/60">/month</span>
                        </span>
                      </div>
                      <Link href={`/cooks/${heroCook.id}`}>
                        <Button size="sm" className="h-9 rounded-full px-4 text-[11px] font-black">
                          View Profile <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating chip — live order */}
                <div className="absolute -left-3 sm:-left-8 top-16 sm:top-20 float-soft">
                  <div className="glass rounded-2xl px-3.5 py-2.5 shadow-card">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                        <Soup className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="text-[10px] font-black text-prussian leading-tight">Tiffin delivered</p>
                        <p className="text-[9px] text-text-muted">Punjabi thali · 2 min ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating chip — rating */}
                <div className="absolute -right-3 sm:-right-8 top-1/3 float-soft-delay">
                  <div className="glass rounded-2xl px-3.5 py-2.5 shadow-card">
                    <div className="flex items-center gap-2">
                      <Star className="h-6 w-6 fill-saffron text-saffron" />
                      <div>
                        <p className="text-[13px] font-black text-prussian leading-none">4.9/5</p>
                        <p className="mt-0.5 text-[9px] text-text-muted">2,300+ reviews</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating chip — earnings */}
                <div className="absolute -left-2 sm:-left-6 bottom-24 float-soft-slow">
                  <div className="rounded-2xl bg-prussian/95 backdrop-blur px-3.5 py-2.5 shadow-elevated border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-saffron/20 text-[#FFB03A]">
                        <IndianRupee className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="text-[11px] font-black text-white leading-tight">₹38k / month</p>
                        <p className="text-[9px] text-white/55">avg. full-time cook pay</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ CUISINE MARQUEE ============ */}
        <div className="relative border-t border-border/70 bg-prussian text-white/80 overflow-hidden">
          <div className="marquee marquee-slow py-2.5 items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
            {[...popularCuisines, ...popularCuisines].map((cuisine, i) => (
              <span key={i} className="mx-5 inline-flex items-center gap-2 whitespace-nowrap">
                <Flame className="h-3.5 w-3.5 text-[#FFB03A]" /> {cuisine}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT DO YOU NEED (BENTO) ================= */}
      <section className="py-10 sm:py-14 bg-background bg-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-ember">One app, every kitchen need</p>
                <h2 className="mt-1.5 font-heading text-2xl sm:text-4xl font-extrabold tracking-[-0.035em] text-prussian">
                  What brings you here today?
                </h2>
              </div>
              <Link href="/explore" className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-saffron-dark hover:text-ember transition-colors shrink-0">
                Explore the marketplace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[168px] gap-3 sm:gap-4">
            {/* Large tile — hire cook */}
            <Reveal className="col-span-2 row-span-2" delay={0}>
              <Link href="/cooks" className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-border shadow-card transition-shadow hover:shadow-elevated">
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80" alt="Home cook preparing regional Indian dishes" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/30 to-transparent" />
                <div className="relative p-5 sm:p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-saffron/90 text-white shadow-glow-soft"><ChefHat className="h-5 w-5" /></span>
                  <h3 className="mt-3 font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight">Hire a Cook</h3>
                  <p className="mt-1 text-[10px] sm:text-[11px] leading-snug text-white/70 max-w-[16rem]">Daily, part-time &amp; full-time home cooks — trial day included, background verified.</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#FFB03A]">2,450 verified profiles <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" /></span>
                </div>
              </Link>
            </Reveal>

            {/* Chef tile */}
            <Reveal className="col-span-2" delay={80}>
              <Link href="/chefs" className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-border shadow-card hover:shadow-card-hover transition-all">
                <img src="https://images.unsplash.com/photo-1414238497428-b8f859a7b1bb?auto=format&fit=crop&w=900&q=80" alt="Private chef tasting menu" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/88 via-ink-black/25 to-transparent" />
                <div className="relative p-4 sm:p-5">
                  <span className="flex items-center gap-2 font-heading text-base sm:text-lg font-extrabold text-white"><Utensils className="h-5 w-5 text-[#FFB03A]" /> Book an Executive Chef</span>
                  <p className="mt-0.5 text-[9px] sm:text-[10px] text-white/65">Tasting menus, parties &amp; weddings at home</p>
                </div>
              </Link>
            </Reveal>

            {/* Food tile */}
            <Reveal delay={140}>
              <Link href="/food" className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-white p-4 sm:p-5 shadow-card transition-all hover:-translate-y-1 hover:border-saffron/60 hover:shadow-card-hover">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron-subtle text-saffron-dark transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"><UtensilsCrossed className="h-5.5 w-5.5" /></span>
                <span>
                  <span className="font-heading text-sm sm:text-base font-extrabold text-prussian block leading-tight">Home Tiffin &amp; Thalis</span>
                  <span className="mt-1 block text-[9px] sm:text-[10px] text-text-muted">Private kitchens only · WhatsApp ordering</span>
                </span>
              </Link>
            </Reveal>

            {/* Jobs tile */}
            <Reveal delay={200}>
              <Link href="/jobs" className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-white p-4 sm:p-5 shadow-card transition-all hover:-translate-y-1 hover:border-saffron/60 hover:shadow-card-hover">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-grape/10 text-grape transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"><Briefcase className="h-5.5 w-5.5" /></span>
                <span>
                  <span className="font-heading text-sm sm:text-base font-extrabold text-prussian block leading-tight">Kitchen Jobs</span>
                  <span className="mt-1 block text-[9px] sm:text-[10px] text-text-muted">Households, restaurants &amp; cloud kitchens</span>
                </span>
              </Link>
            </Reveal>

            {/* Restaurant hiring tile */}
            <Reveal delay={260}>
              <Link href="/jobs/post?type=RESTAURANT" className="group flex h-full flex-col justify-between rounded-3xl border border-prussian/10 bg-prussian p-4 sm:p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#FFB03A] transition-transform duration-300 group-hover:scale-110"><Building2 className="h-5.5 w-5.5" /></span>
                <span>
                  <span className="font-heading text-sm sm:text-base font-extrabold text-white block leading-tight">Hire for Restaurants</span>
                  <span className="mt-1 block text-[9px] sm:text-[10px] text-white/55">FSSAI + GSTIN verified businesses only</span>
                </span>
              </Link>
            </Reveal>

            {/* Community tile */}
            <Reveal delay={320}>
              <Link href="/community" className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-[#FFF7EA] to-[#FFE9D2] p-4 sm:p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ember shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"><Users className="h-5.5 w-5.5" /></span>
                <span>
                  <span className="font-heading text-sm sm:text-base font-extrabold text-prussian block leading-tight">The Kitchen Table</span>
                  <span className="mt-1 block text-[9px] sm:text-[10px] text-text-muted">Recipes, advice &amp; kitchen confessions</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= COOKS IN YOUR DISTRICT ================= */}
      <section className="border-y border-border/70 bg-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-heading text-base sm:text-xl font-extrabold tracking-tight text-prussian">
              Cooks &amp; chefs in your district
            </h2>
            <Link href="/cooks" className="group flex shrink-0 items-center gap-0.5 text-[11px] sm:text-xs font-black text-saffron-dark hover:text-ember transition-colors">
              See all <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {sampleCooks.map((cook) => (
              <Link
                key={cook.id}
                href={`/cooks/${cook.id}`}
                className="group flex w-[76px] sm:w-24 flex-shrink-0 flex-col items-center text-center"
              >
                <div className="relative rounded-full p-[3px] bg-gradient-to-br from-[#FFC87A] via-[#F28C28] to-[#E45A37] shadow-[0_6px_16px_-6px_rgba(242,140,40,0.6)] transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={cook.user?.avatarUrl}
                    alt={cook.user?.fullName}
                    loading="lazy"
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-[3px] border-white object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 flex items-center gap-0.5 rounded-full bg-prussian px-1.5 py-0.5 text-[9px] font-black text-[#FFB03A] ring-2 ring-white">
                    <Star className="h-2.5 w-2.5 fill-[#FFB03A] text-[#FFB03A]" />{cook.averageRating}
                  </span>
                </div>
                <p className="mt-2 w-full truncate text-[10px] sm:text-[11px] font-bold text-prussian group-hover:text-ember transition-colors">{cook.user?.fullName}</p>
                <p className="w-full truncate text-[9px] sm:text-[9.5px] text-text-muted">{cook.cuisines[0]?.name}</p>
              </Link>
            ))}
            {sampleChefServices.slice(0, 3).map((service) => (
              <Link
                key={service.id}
                href={`/chefs/${service.id}`}
                className="group flex w-[76px] sm:w-24 flex-shrink-0 flex-col items-center text-center"
              >
                <div className="relative rounded-full p-[3px] bg-gradient-to-br from-[#8E7BFF] via-[#5B3BD6] to-[#2B1066] shadow-[0_6px_16px_-6px_rgba(91,59,214,0.55)] transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={service.cook?.user?.avatarUrl}
                    alt={service.serviceType}
                    loading="lazy"
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-[3px] border-white object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-[#2B1066] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-[#FFB03A] ring-2 ring-white">
                    Chef
                  </span>
                </div>
                <p className="mt-2 w-full truncate text-[10px] sm:text-[11px] font-bold text-prussian group-hover:text-[#5B3BD6] transition-colors">{service.cook?.user?.fullName}</p>
                <p className="w-full truncate text-[9px] sm:text-[9.5px] text-text-muted">Private chef</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRIVATE CHEF EXPERIENCES ================= */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-ember">Occasions worth remembering</p>
              <h2 className="mt-1 font-heading text-xl sm:text-3xl font-extrabold tracking-[-0.03em] text-prussian">
                Private chef experiences near you
              </h2>
            </div>
            <Link href="/chefs" className="group flex shrink-0 items-center gap-1 text-[11px] sm:text-xs font-black text-saffron-dark hover:text-ember transition-colors">
              See all <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {sampleChefServices.map((service, idx) => (
              <Link
                key={service.id}
                href={`/chefs/${service.id}`}
                className="group relative w-[230px] sm:w-[260px] md:w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-3xl aspect-[3/4.2] bg-ink-black shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated"
              >
                <img
                  src={service.galleryImages?.[0] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=700&fit=crop"}
                  alt={service.serviceType}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-ink-black/35 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full glass-dark px-2.5 py-1 text-[9px] font-bold text-white/90">
                    {service.shifts?.[0]?.split("(")[0]?.trim() || "Evening"}
                  </span>
                  <span className="rounded-full bg-saffron px-2 py-1 text-[9px] font-black text-white shadow-glow-soft">★ 4.9</span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <p className="flex items-center gap-1 text-[9px] sm:text-[10px] text-white/60">
                    <MapPin className="h-3 w-3 shrink-0 text-[#FFB03A]" />
                    {idx === 0 ? "2.4 km · DLF Phase 2, Gurugram" : "4.1 km · Koramangala, Bengaluru"}
                  </p>
                  <h3 className="mt-1.5 font-heading text-[13px] sm:text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#FFD9A0] transition-colors">{service.serviceType}</h3>
                  <div className="mt-2.5 flex items-center justify-between border-t border-white/15 pt-2.5 text-[10px] sm:text-[11px]">
                    <span className="text-white/65">From <strong className="font-extrabold text-white">{formatCurrency(service.basePrice)}</strong></span>
                    <span className="inline-flex items-center gap-1 font-black text-[#FFB03A]">Book <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOMEMADE FOOD (PRIVATE KITCHENS) ================= */}
      <section className="py-8 sm:py-12 bg-white border-y border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-1 flex items-end justify-between gap-3">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-ember"><Flame className="h-4 w-4" /> Straight from home kitchens</p>
              <h2 className="mt-1 font-heading text-xl sm:text-3xl font-extrabold tracking-[-0.03em] text-prussian">What&apos;s cooking near you</h2>
            </div>
            <Link href="/food" className="group flex shrink-0 items-center gap-1 text-[11px] sm:text-xs font-black text-saffron-dark hover:text-ember transition-colors">
              See all <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="text-[10px] sm:text-[11px] text-text-muted mb-5">Private home kitchens only — no restaurant listings. Every order routes via WhatsApp to the cook.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {sampleFoodListings.slice(0, 3).map((food) => {
              const waNumber = (food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "");
              const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${food.provider?.providerName}, I'd like to order ${food.name} via DHANDHA!`)}`;
              return (
                <Card key={food.id} className="group overflow-hidden rounded-3xl flex flex-col p-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-almond-900">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />{food.dietaryType}
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-prussian/85 backdrop-blur px-2.5 py-1 text-[9px] font-bold text-white">
                      <Clock className="h-3 w-3 text-[#FFB03A]" />{food.preparationTime} min
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 text-[10px]">
                      <span className="truncate rounded-md bg-saffron-subtle px-2 py-0.5 font-bold text-saffron-dark">{food.provider?.providerName}</span>
                      <span className="flex shrink-0 items-center gap-1 font-black text-prussian"><Star className="h-3.5 w-3.5 fill-saffron text-saffron" />{food.rating}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-[15px] sm:text-base font-extrabold leading-snug text-prussian line-clamp-1">{food.name}</h3>
                    <p className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-text-secondary line-clamp-2">{food.description}</p>
                    <p className="mt-2 flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" /> Private kitchen · FSSAI registered</p>

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-border-subtle pt-3 mt-3">
                      <div>
                        <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-text-muted">Price</span>
                        <span className="font-heading text-base sm:text-lg font-extrabold text-prussian">{formatCurrency(food.price)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Order ${food.name} on WhatsApp`}
                          className="tap inline-flex h-10 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 text-[10px] sm:text-[11px] font-black text-emerald-800 transition-all hover:bg-emerald-100 hover:border-emerald-300"
                        >
                          <Phone className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp
                        </a>
                        <Link href={`/food/${food.id}`} aria-label={`View ${food.name}`}>
                          <Button size="sm" className="h-10 rounded-full px-4 text-[10px] sm:text-[11px] font-black">Order</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS + TRUST ================= */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-ember">Zero guesswork</p>
            <h2 className="mt-1.5 font-heading text-2xl sm:text-4xl font-extrabold tracking-[-0.035em] text-prussian leading-[1.05]">From craving to cooked,<br /><span className="text-gradient-warm">in three steps.</span></h2>
            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-text-secondary">Tell us what you need, meet verified matches with transparent rates, and book — with a trial day before you commit.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Verified IDs", "Trial day first", "Transparent pricing", "WhatsApp support"].map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] font-bold"><BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />{tag}</Badge>
              ))}
            </div>
          </Reveal>

          <ol className="relative space-y-3 sm:space-y-4">
            {[
              { step: "1", title: "Tell us your need", body: "Post a requirement — daily cook, occasion chef, tiffin plan or a kitchen job. Takes 40 seconds.", icon: Search },
              { step: "2", title: "Match with verified pros", body: "Compare rates, cuisine specialities, ratings and availability. Every pro is ID & FSSAI checked.", icon: ShieldCheck },
              { step: "3", title: "Trial, then book", body: "One supervised trial day, then lock in your plan. Pay through DHANDHA — never in cash upfront.", icon: CheckCircle2 },
            ].map(({ step, title, body, icon: Icon }, i) => (
              <Reveal key={step} delay={i * 120}>
                <li className="group flex items-start gap-4 rounded-3xl border border-border bg-white p-4 sm:p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-saffron/60 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFB03A] to-[#E45A37] font-heading text-lg sm:text-xl font-black text-white shadow-glow-soft">
                    {step}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm sm:text-base font-extrabold text-prussian">{title}</h3>
                    <p className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-text-secondary">{body}</p>
                  </div>
                  <Icon className="ml-auto h-5 w-5 shrink-0 self-center text-saffron/70 transition-transform duration-300 group-hover:scale-125" />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= STATS BAND (DARK) ================= */}
      <section className="band-dark bg-noise relative overflow-hidden text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { content: <AnimatedCounter end={12400} suffix="+" duration={1800} />, label: "Verified cooks & chefs" },
              { content: <AnimatedCounter end={350000} duration={2000} format="compact" />, label: "Meals lovingly delivered" },
              { content: <AnimatedCounter end={120} suffix="+" duration={1600} />, label: "Cities across India" },
              { content: <span>4.9★</span>, label: "Average kitchen rating" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-heading text-2xl sm:text-4xl xl:text-5xl font-black tracking-tight text-gradient-gold">
                  {s.content}
                </span>
                <span className="mt-2 text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 max-w-[9.5rem]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY ================= */}
      <section className="py-8 sm:py-12 bg-white border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-ember">The Kitchen Table</p>
              <h2 className="mt-1 font-heading text-xl sm:text-3xl font-extrabold tracking-[-0.03em] text-prussian">From the community</h2>
            </div>
            <Link href="/community" className="group flex shrink-0 items-center gap-1 text-[11px] sm:text-xs font-black text-saffron-dark hover:text-ember transition-colors">
              Join discussions <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {sampleCommunityPosts.slice(0, 2).map((post) => (
              <article key={post.id} className="group flex flex-col rounded-3xl border border-border bg-surface-raised p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-saffron/50 hover:shadow-card-hover">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={post.user?.avatarUrl} />
                    <AvatarFallback className="bg-prussian text-[10px] font-bold text-saffron-light">{post.user?.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px]">
                    <span className="font-extrabold text-prussian">{post.user?.fullName}</span>
                    <span className="text-border">•</span>
                    <Badge variant="outline" className="px-1.5 py-0 text-[9px]">{post.category}</Badge>
                    <span className="text-border">•</span>
                    <span className="text-text-muted">{timeAgo(post.createdAt)}</span>
                  </div>
                </div>
                <h3 className="mt-3 font-heading text-sm sm:text-base font-extrabold leading-snug text-prussian line-clamp-2 group-hover:text-ember transition-colors">{post.title}</h3>
                <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-text-secondary line-clamp-2">{post.body}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border-subtle pt-3 mt-4">
                  <div className="flex items-center gap-3">
                    <UpvoteButton initialCount={post.upvotes} />
                    <Link href="/community" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-bold text-text-secondary transition-colors hover:border-saffron hover:text-saffron-dark">
                      <MessageCircle className="h-3.5 w-3.5" />{post.commentsCount}
                    </Link>
                  </div>
                  <Link href="/community" className="inline-flex items-center gap-1 text-[11px] font-black text-saffron-dark hover:text-ember transition-colors">
                    Read thread <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="band-dark bg-noise relative overflow-hidden text-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Badge variant="glass" className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-black">Kaam bhi. Khana bhi.</Badge>
          <h2 className="mt-4 font-heading text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] leading-[1.02]">
            India&apos;s kitchen economy<br />
            <span className="text-gradient-gold">is cooking up.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-white/65">
            One universal account to hire a daily cook, book an executive chef, order homemade meals —
            or get hired by India&apos;s best kitchens.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register">
              <Button size="lg" className="h-12 rounded-2xl px-8 text-sm font-black">Get Started Free <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Link href="/explore">
              <Button variant="outlineLight" size="lg" className="h-12 rounded-2xl px-8 text-sm font-bold">Browse Marketplace</Button>
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-semibold text-white/40">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> No fees to browse · FSSAI verified kitchens · Cancel anytime
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
