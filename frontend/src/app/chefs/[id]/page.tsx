"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  MapPin,
  Clock,
  Users,
  ChefHat,
  ShieldCheck,
  Check,
  X as CloseIcon,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleChefServices } from "@/lib/sample-data";
import { formatCurrency, cn } from "@/lib/utils";

function ChefDetailContent() {
  const params = useParams();
  const serviceId = params?.id as string;
  const service = sampleChefServices.find((s) => s.id === serviceId) || sampleChefServices[0];

  // Gallery interactive state matching ref8.html setHero()
  const galleryImages = service.galleryImages && service.galleryImages.length > 0
    ? service.galleryImages
    : [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=400&fit=crop",
      ];

  const [activeHeroImage, setActiveHeroImage] = useState(galleryImages[0]);
  const [selectedShift, setSelectedShift] = useState(0);
  const [eventDate, setEventDate] = useState("2026-12-15");
  const [guestCount, setGuestCount] = useState(service.minimumGuests || 6);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const shifts = service.shifts || ["Lunch Banquet", "Evening Dinner Party", "Full Day Culinary Experience"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const whatsappChatUrl = `https://wa.me/${(service.whatsappNumber || "+919876543215").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Chef ${service.cook?.user?.fullName}, I would like to inquire about booking your "${service.serviceType}" for ${guestCount} guests on ${eventDate} via DHANDHA!`)}`;
  const whatsappCallUrl = `https://wa.me/${(service.whatsappNumber || "+919876543215").replace(/\D/g, "")}`;

  // Price calculations
  const subtotal = service.pricingType === "PER_PERSON" ? service.basePrice * guestCount : service.basePrice;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb matching ref8.html */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ink-black transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link href="/chefs" className="hover:text-ink-black transition-colors">
            Chefs & Dining
          </Link>
          <span>›</span>
          <span className="text-ink-black font-semibold truncate max-w-[200px]">
            {service.serviceType}
          </span>
        </div>

        {/* Product Grid: Left Gallery & Right Details matching ref8.html */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Gallery (1 Hero + 3 Thumbnails with click-to-swap) */}
          <div className="space-y-2">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-sm bg-gray-100 border border-gray-200">
              <img
                src={activeHeroImage}
                alt={service.serviceType}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ink-black/90 text-white backdrop-blur-md text-xs font-bold shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-saffron" />
                <span>Executive Dining Experience</span>
              </span>
            </div>

            {/* 3 Clickable Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.slice(1, 4).map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveHeroImage(thumb)}
                  className={cn(
                    "relative h-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all cursor-pointer",
                    activeHeroImage === thumb
                      ? "border-indigo-600 ring-2 ring-indigo-600/30"
                      : "border-transparent opacity-75 hover:opacity-100"
                  )}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Booking Box matching ref8.html */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="bg-indigo-900 text-white text-[10px] font-bold">
                  Chef Table Experience
                </Badge>
                <span className="text-xs text-gray-500">• Chef {service.cook?.user?.fullName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-ink-black tracking-tight">
                {service.serviceType}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* Price & Rating Box matching ref8.html .price-rating */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-500 block">Starting from</span>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-ink-black">
                  {formatCurrency(service.basePrice)}
                  <span className="text-xs font-normal text-gray-500 ml-1">
                    {service.pricingType === "PER_PERSON" ? "/ person" : " fixed"}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 block">Rating</span>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-ink-black flex items-center gap-1.5">
                  <span>4.9</span>
                  <div className="flex text-amber-400 text-sm">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-xs font-normal text-gray-500">
                    (124 Reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quick Facts Cards in 2x2 Grid matching ref8.html .facts */}
            <div className="grid grid-cols-2 gap-2.5">
              {(service.quickFacts || [
                { icon: "Clock", label: "Duration", value: "5 Hours" },
                { icon: "Users", label: "Group Size", value: `${service.minimumGuests} - ${service.maximumGuests} Guests` },
                { icon: "MapPin", label: "Location", value: "Private Home or Villa" },
                { icon: "ChefHat", label: "Format", value: "Multi-Course Plating" },
              ]).map((fact, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200/90 rounded-2xl p-3 flex items-center gap-3 bg-white"
                >
                  <div className="w-9 h-9 rounded-full bg-purple-50 text-indigo-700 flex items-center justify-center shrink-0 text-sm">
                    {idx === 0 && <Clock className="w-4 h-4" />}
                    {idx === 1 && <Users className="w-4 h-4" />}
                    {idx === 2 && <MapPin className="w-4 h-4" />}
                    {idx === 3 && <ChefHat className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] text-gray-500 block truncate">{fact.label}</span>
                    <span className="text-xs font-bold text-ink-black truncate block">{fact.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Action Buttons (per user's ref7.html mandate) */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Direct Chef WhatsApp Access
                </span>
                <span className="text-[10px] text-emerald-700 font-normal">Instant Menu Discussion</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={whatsappCallUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-300 font-bold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Booking Form matching ref8.html .booking */}
            <form onSubmit={handleBookingSubmit} className="border border-gray-200 rounded-2xl p-5 shadow-xs bg-white space-y-4">
              <h2 className="text-base sm:text-lg font-heading font-bold text-ink-black">
                Book This Experience
              </h2>

              {/* Segmented Shift Control matching ref8.html .segment */}
              <div className="grid grid-cols-3 p-1 rounded-xl bg-gray-100 border border-gray-200/80 gap-1 text-center">
                {shifts.map((shift, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedShift(idx)}
                    className={cn(
                      "py-2 px-2 rounded-lg text-xs font-bold transition-all truncate",
                      selectedShift === idx
                        ? "bg-ink-black text-white shadow-xs"
                        : "text-gray-600 hover:text-ink-black"
                    )}
                  >
                    {shift.split("(")[0]}
                  </button>
                ))}
              </div>

              {/* Date Input */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Select Event Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-ink-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              {/* Guests Counter */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Number of Guests
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 bg-gray-50">
                  <span className="text-xs font-bold text-ink-black ml-2">
                    {guestCount} Guests
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(service.minimumGuests || 2, guestCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-100"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(service.maximumGuests || 50, guestCount + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimated Total */}
              <div className="p-3 rounded-xl bg-purple-50/60 flex items-center justify-between text-xs">
                <span className="text-gray-600">Estimated Total:</span>
                <span className="font-heading font-extrabold text-base text-ink-black">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* Submit CTA */}
              {bookingConfirmed ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-center text-xs font-bold space-y-1">
                  <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                  <span>Chef Booking Reserved!</span>
                  <p className="text-[11px] font-normal text-emerald-700">
                    Chef {service.cook?.user?.fullName} will review and confirm via WhatsApp within 2 hours.
                  </p>
                </div>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                >
                  Confirm & Reserve Experience
                </Button>
              )}
            </form>
          </div>
        </section>

        {/* Overview & Included / Excluded Checklist matching ref8.html .overview */}
        <section className="mt-12 pt-10 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-black mb-3">
                Experience Overview
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* What's Included / Excluded Checklist matching ref8.html */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* What's Included */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                <h3 className="font-heading font-bold text-sm text-emerald-950 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>What&apos;s Included</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  {(service.whatsIncluded || [
                    "Custom 5-course gourmet tasting menu",
                    "Dedicated chef and sous-chef brigade live on site",
                    "Artisanal plating and personalized course storytelling",
                    "Total kitchen station sanitization and cleanup",
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Excluded */}
              <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-3">
                <h3 className="font-heading font-bold text-sm text-rose-950 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                    ✕
                  </span>
                  <span>What&apos;s Excluded</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  {(service.whatsExcluded || [
                    "Alcohol and wine provisioning",
                    "Rentals of cutlery or crystal glassware",
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CloseIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Guest Reviews Section matching ref8.html */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-bold text-ink-black">
                    Guest Reviews
                  </h3>
                  <p className="text-xs text-gray-500">
                    Rated 4.9 out of 5 based on 124 verified event reviews
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-heading font-bold text-ink-black">
                    4.9
                  </span>
                  <div className="text-amber-400 text-xs">★★★★★</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-ink-black">Vikram S. (South Mumbai)</span>
                  <span className="text-gray-400">Private Dining • 3 weeks ago</span>
                </div>
                <div className="text-amber-400 text-xs">★★★★★</div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  &ldquo;Chef {service.cook?.user?.fullName} created an extraordinary dining experience for our anniversary.
                  Every course was art on a plate. The storytelling and warmth made it truly unforgettable.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Side Card matching ref8.html .side-card */}
          <div className="lg:col-span-4">
            <aside className="sticky top-28 border border-gray-200 rounded-2xl p-5 shadow-xs bg-white space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100">
                <span className="text-xs text-gray-500 block">Starting from</span>
                <div className="text-2xl font-heading font-bold text-ink-black">
                  {formatCurrency(service.basePrice)}
                </div>
                <span className="text-[11px] text-gray-500 block mt-0.5">
                  {service.pricingType === "PER_PERSON" ? "per person" : "fixed event fee"} • Up to {service.maximumGuests} guests
                </span>
              </div>

              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Executive Verified Chef • FSSAI Standards</span>
              </div>

              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>

              <p className="text-[11px] text-gray-400 text-center leading-tight">
                Direct booking backed by DHANDHA&apos;s culinary satisfaction guarantee.
              </p>
            </aside>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default function ChefDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Chef Details...</div>}>
      <ChefDetailContent />
    </Suspense>
  );
}
