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
  Sparkles,
  CheckCircle2,
  ChevronRight,
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

  const subtotal = service.pricingType === "PER_PERSON" ? service.basePrice * guestCount : service.basePrice;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-prussian transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/chefs" className="hover:text-prussian transition-colors">
            Chefs & Dining
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-prussian font-semibold truncate max-w-[180px]">
            {service.serviceType}
          </span>
        </div>

        {/* Product Grid: Left Gallery & Right Details */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-2">
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-xl overflow-hidden shadow-xs bg-gray-100 border border-gray-200">
              <img
                src={activeHeroImage}
                alt={service.serviceType}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-prussian/90 text-white backdrop-blur-md text-[11px] font-bold shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-saffron" />
                <span>Executive Experience</span>
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
                    "relative h-18 sm:h-22 rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                    activeHeroImage === thumb
                      ? "border-saffron ring-2 ring-saffron/30"
                      : "border-transparent opacity-80 hover:opacity-100"
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

          {/* Details & Booking Box (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="bg-prussian text-white text-[10px] font-bold py-0 px-2">
                  Chef Table
                </Badge>
                <span className="text-xs text-gray-500">• Chef {service.cook?.user?.fullName}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-prussian tracking-tight">
                {service.serviceType}
              </h1>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* Price & Rating Box */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
              <div>
                <span className="text-[11px] text-gray-500 block">Starting from</span>
                <div className="text-xl sm:text-2xl font-heading font-bold text-prussian">
                  {formatCurrency(service.basePrice)}
                  <span className="text-xs font-normal text-gray-500 ml-1">
                    {service.pricingType === "PER_PERSON" ? "/ person" : " fixed"}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-gray-500 block">Rating</span>
                <div className="text-xl sm:text-2xl font-heading font-bold text-prussian flex items-center gap-1.5">
                  <span>4.9</span>
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-xs font-normal text-gray-500">
                    (124 Reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quick Facts Cards */}
            <div className="grid grid-cols-2 gap-2">
              {(service.quickFacts || [
                { icon: "Clock", label: "Duration", value: "5 Hours" },
                { icon: "Users", label: "Capacity", value: `${service.minimumGuests}-${service.maximumGuests} Guests` },
                { icon: "MapPin", label: "Location", value: "Private Residence" },
                { icon: "ChefHat", label: "Format", value: "Multi-Course" },
              ]).map((fact, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200/90 rounded-xl p-2.5 flex items-center gap-2.5 bg-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-saffron-subtle text-saffron-dark flex items-center justify-center shrink-0">
                    {idx === 0 && <Clock className="w-3.5 h-3.5" />}
                    {idx === 1 && <Users className="w-3.5 h-3.5" />}
                    {idx === 2 && <MapPin className="w-3.5 h-3.5" />}
                    {idx === 3 && <ChefHat className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-400 block truncate">{fact.label}</span>
                    <span className="text-xs font-bold text-prussian truncate block">{fact.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Action Buttons (per ref7.html mandate) */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Direct Chef WhatsApp Access
                </span>
                <span className="text-[10px] text-emerald-700 font-normal">Instant Menu Discussion</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={whatsappCallUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-300 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Call</span>
                </a>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="border border-gray-200 rounded-xl p-4 shadow-xs bg-white space-y-3">
              <h2 className="text-sm font-heading font-bold text-prussian">
                Book This Experience
              </h2>

              <div className="grid grid-cols-3 p-0.5 rounded-lg bg-gray-100 border border-gray-200 gap-0.5 text-center">
                {shifts.map((shift, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedShift(idx)}
                    className={cn(
                      "py-1.5 px-1 rounded-md text-[11px] font-bold transition-all truncate",
                      selectedShift === idx
                        ? "bg-prussian text-white shadow-xs"
                        : "text-gray-600 hover:text-prussian"
                    )}
                  >
                    {shift.split("(")[0]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full h-8.5 px-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-prussian focus:outline-none focus:ring-1.5 focus:ring-saffron"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                    Guests
                  </label>
                  <div className="flex items-center justify-between h-8.5 px-2 rounded-lg border border-gray-200 bg-gray-50">
                    <span className="text-xs font-bold text-prussian">
                      {guestCount} Guests
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(service.minimumGuests || 2, guestCount - 1))}
                        className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(service.maximumGuests || 50, guestCount + 1))}
                        className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Calculation Pill */}
              <div className="p-2 rounded-lg bg-saffron-subtle/70 flex items-center justify-between text-xs">
                <span className="text-gray-600">Estimated Total:</span>
                <span className="font-heading font-bold text-sm text-prussian">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* Submit CTA */}
              {bookingConfirmed ? (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-center text-xs font-bold space-y-0.5">
                  <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600" />
                  <span>Chef Booking Request Sent!</span>
                  <p className="text-[10px] font-normal text-emerald-700">
                    Chef {service.cook?.user?.fullName} will confirm via WhatsApp within 2 hours.
                  </p>
                </div>
              ) : (
                <Button variant="secondary"
                  type="submit"
                  className="w-full h-10 rounded-xl text-xs"
                >
                  Reserve Chef Experience
                </Button>
              )}
            </form>
          </div>
        </section>

        {/* Overview & Included / Excluded Checklist */}
        <section className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-prussian mb-2">
                Experience Overview
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* What's Included / Excluded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                <h3 className="font-heading font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>What&apos;s Included</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {(service.whatsIncluded || [
                    "Custom 5-course gourmet tasting menu",
                    "Dedicated chef and sous-chef on site",
                    "Artisanal tableside course presentation",
                    "Complete kitchen station cleanup",
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100 space-y-2">
                <h3 className="font-heading font-bold text-xs text-rose-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">
                    ✕
                  </span>
                  <span>What&apos;s Excluded</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {(service.whatsExcluded || [
                    "Alcohol and wine provisioning",
                    "Rentals of crystal glassware and linen",
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CloseIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-heading font-bold text-prussian">
                    Guest Reviews
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Rated 4.9 out of 5 based on 124 verified reviews
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-heading font-bold text-prussian">4.9</span>
                  <div className="text-amber-400 text-xs">★★★★★</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-prussian">Vikram S. (South Mumbai)</span>
                  <span className="text-[10px] text-gray-400">3 weeks ago</span>
                </div>
                <div className="text-amber-400 text-xs">★★★★★</div>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  &ldquo;Chef {service.cook?.user?.fullName} created an extraordinary anniversary dinner. Every course was Michelin grade.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Side Card (4 cols) */}
          <div className="lg:col-span-4">
            <aside className="sticky top-24 border border-gray-200 rounded-xl p-4 shadow-xs bg-white space-y-3">
              <div className="p-3 rounded-lg bg-saffron-subtle/60 border border-saffron/20">
                <span className="text-[10px] text-gray-400 block uppercase font-semibold">Starting from</span>
                <div className="text-xl font-heading font-bold text-prussian">
                  {formatCurrency(service.basePrice)}
                </div>
                <span className="text-[10px] text-gray-500 block">
                  {service.pricingType === "PER_PERSON" ? "per person" : "fixed fee"} • Up to {service.maximumGuests} guests
                </span>
              </div>

              <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Executive Verified Chef</span>
              </div>

              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat via WhatsApp</span>
              </a>
            </aside>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default function ChefDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs">Loading Chef Details...</div>}>
      <ChefDetailContent />
    </Suspense>
  );
}
