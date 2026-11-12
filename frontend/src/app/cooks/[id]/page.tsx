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
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleCooks } from "@/lib/sample-data";
import { formatCurrency, cn } from "@/lib/utils";

function CookProfileDetailContent() {
  const params = useParams();
  const cookId = params?.id as string;
  const cook = sampleCooks.find((c) => c.id === cookId) || sampleCooks[0];

  const galleryImages = cook.galleryImages && cook.galleryImages.length > 0
    ? cook.galleryImages
    : [
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&h=400&fit=crop",
      ];

  const [activeHeroImage, setActiveHeroImage] = useState(galleryImages[0]);
  const [selectedShift, setSelectedShift] = useState(0);
  const [startDate, setStartDate] = useState("2026-11-20");
  const [familyMembers, setFamilyMembers] = useState(4);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const shifts = cook.shifts || ["Morning Shift", "Evening Shift", "Both Shifts (Full Day)"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const whatsappChatUrl = `https://wa.me/${(cook.whatsappNumber || "+919876543210").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${cook.user?.fullName}, I found your cook profile on DHANDHA and would like to inquire about hiring you for ${shifts[selectedShift]}!`)}`;
  const whatsappCallUrl = `https://wa.me/${(cook.whatsappNumber || "+919876543210").replace(/\D/g, "")}`;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-prussian transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/cooks" className="hover:text-prussian transition-colors">
            Find Cooks
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-prussian font-semibold truncate max-w-[180px]">
            {cook.user?.fullName}
          </span>
        </div>

        {/* Product Grid: Left Gallery & Right Details matching ref8.html */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-2">
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-xl overflow-hidden shadow-xs bg-gray-100 border border-gray-200">
              <img
                src={activeHeroImage}
                alt={cook.user?.fullName}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-prussian text-[11px] font-bold shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Cook</span>
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
                      ? "border-indigo-600 ring-2 ring-indigo-600/30"
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
                <Badge variant="saffron" className="text-[10px] font-bold py-0 px-2">
                  Domestic Cook
                </Badge>
                <span className="text-xs text-gray-500">• {cook.city}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-prussian tracking-tight">
                {cook.user?.fullName} — {cook.cuisines[0]?.name} Specialist
              </h1>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {cook.professionalTitle}
              </p>
            </div>

            {/* Price & Rating Box */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
              <div>
                <span className="text-[11px] text-gray-500 block">Starting from</span>
                <div className="text-xl sm:text-2xl font-heading font-bold text-prussian">
                  {formatCurrency(cook.expectedSalaryMin || 15000)}
                  <span className="text-xs font-normal text-gray-500 ml-1">/ month</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-gray-500 block">Rating</span>
                <div className="text-xl sm:text-2xl font-heading font-bold text-prussian flex items-center gap-1.5">
                  <span>{cook.averageRating}</span>
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-xs font-normal text-gray-500">
                    ({cook.totalReviews})
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quick Facts Cards in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              {(cook.quickFacts || [
                { icon: "Clock", label: "Shift Duration", value: "4 Hours / Shift" },
                { icon: "Users", label: "Family Size", value: "Up to 6 Persons" },
                { icon: "MapPin", label: "Service Area", value: `${cook.locality || "Dwarka"}, ${cook.city}` },
                { icon: "ChefHat", label: "Speciality", value: cook.cuisines[0]?.name || "North Indian" },
              ]).map((fact, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200/90 rounded-xl p-2.5 flex items-center gap-2.5 bg-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-indigo-700 flex items-center justify-center shrink-0">
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
                  Direct WhatsApp Available
                </span>
                <span className="text-[10px] text-emerald-700 font-normal">Instant Contact</span>
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
                Book Cook / Request 1-Day Trial
              </h2>

              {/* Shift Segment Buttons */}
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

              {/* Date & Persons in 2 cols */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-8.5 px-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-prussian focus:outline-none focus:ring-1.5 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                    Family Size
                  </label>
                  <div className="flex items-center justify-between h-8.5 px-2 rounded-lg border border-gray-200 bg-gray-50">
                    <span className="text-xs font-bold text-prussian">
                      {familyMembers} Persons
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setFamilyMembers(Math.max(1, familyMembers - 1))}
                        className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setFamilyMembers(familyMembers + 1)}
                        className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              {bookingConfirmed ? (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-center text-xs font-bold space-y-0.5">
                  <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600" />
                  <span>Trial Request Sent to {cook.user?.fullName}!</span>
                  <p className="text-[10px] font-normal text-emerald-700">
                    The cook will confirm timing directly via WhatsApp or phone call.
                  </p>
                </div>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-9 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg text-xs shadow-xs transition-colors"
                >
                  Book 1-Day Trial Experience
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
                Overview & Culinary Background
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {cook.description}
              </p>
            </div>

            {/* Cuisines & Skills */}
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-xs text-prussian">
                Cuisines & Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cook.cuisines.map((c) => (
                  <span
                    key={c.id}
                    className="px-2.5 py-1 rounded-lg bg-purple-50 text-indigo-950 text-xs font-semibold"
                  >
                    {c.name}
                  </span>
                ))}
                {cook.skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs"
                  >
                    {s.skillName}
                  </span>
                ))}
              </div>
            </div>

            {/* What's Included / Excluded Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                <h3 className="font-heading font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>What&apos;s Included</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {(cook.whatsIncluded || [
                    "Complete home cooking of breakfast, lunch, or dinner",
                    "Atta kneading, fresh roti/paratha on tawa",
                    "Dal, sabzi, curries, and rice preparation",
                    "Basic counter sanitization and dish organization",
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
                  {(cook.whatsExcluded || [
                    "Grocery purchasing (must be provided by host)",
                    "Deep floor scrubbing or non-cooking utensil wash",
                    "Commercial bulk batch banquet cooking",
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
                    Household Reviews
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Rated {cook.averageRating} out of 5 based on {cook.totalReviews} verified reviews
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-heading font-bold text-prussian">
                    {cook.averageRating}
                  </span>
                  <div className="text-amber-400 text-xs">★★★★★</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-prussian">Priya S. (Dwarka Sector 12)</span>
                  <span className="text-[10px] text-gray-400">2 weeks ago</span>
                </div>
                <div className="text-amber-400 text-xs">★★★★★</div>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  &ldquo;{cook.user?.fullName} has been cooking for our family for 6 months. Punctual, hygienic and makes amazing rotis!&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Side Sticky Card (4 cols) */}
          <div className="lg:col-span-4">
            <aside className="sticky top-24 border border-gray-200 rounded-xl p-4 shadow-xs bg-white space-y-3">
              <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-100">
                <span className="text-[10px] text-gray-400 block uppercase font-semibold">Starting from</span>
                <div className="text-xl font-heading font-bold text-prussian">
                  {formatCurrency(cook.expectedSalaryMin || 15000)}
                </div>
                <span className="text-[10px] text-gray-500 block">
                  per month • Up to 6 family members
                </span>
              </div>

              <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified ID & Screening Cleared</span>
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

export default function CookProfileDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs">Loading Cook Profile...</div>}>
      <CookProfileDetailContent />
    </Suspense>
  );
}
