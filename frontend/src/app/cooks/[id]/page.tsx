"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  MapPin,
  ShieldCheck,
  Calendar,
  Clock,
  Heart,
  Share2,
  CheckCircle2,
  ChefHat,
  MessageSquare,
  Award,
  BadgeCheck,
  ChevronRight,
  Phone,
  FileCheck,
  UserCheck,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleCooks, sampleReviews } from "@/lib/sample-data";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";

function CookProfileDetailContent() {
  const params = useParams();
  const cookId = params?.id as string;
  // Match cook or fallback to first
  const cook = sampleCooks.find((c) => c.id === cookId) || sampleCooks[0];

  const [bookingType, setBookingType] = useState<"MONTHLY" | "DAILY" | "HOURLY">("MONTHLY");
  const [selectedShift, setSelectedShift] = useState<"BOTH" | "LUNCH" | "DINNER">("BOTH");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const calculateTotal = () => {
    if (bookingType === "MONTHLY") {
      const base = cook.expectedSalaryMin || 16000;
      const platformFee = 500;
      return { base, platformFee, total: base + platformFee };
    }
    if (bookingType === "DAILY") {
      const base = cook.dailyRate || 1200;
      const platformFee = 99;
      return { base, platformFee, total: base + platformFee };
    }
    const base = (cook.hourlyRate || 350) * 3;
    const platformFee = 49;
    return { base, platformFee, total: base + platformFee };
  };

  const pricing = calculateTotal();

  return (
    <MainLayout>
      {/* Breadcrumb Navigation */}
      <div className="bg-surface border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-text-secondary">
            <Link href="/" className="hover:text-prussian">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <Link href="/cooks" className="hover:text-prussian">Cooks</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <span className="font-semibold text-prussian">{cook.user?.fullName}</span>
          </nav>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Profile Info (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Profile Card */}
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-surface shadow-md">
                      <AvatarImage src={cook.user?.avatarUrl} />
                      <AvatarFallback>{cook.user?.fullName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-success ring-2 ring-white flex items-center justify-center text-white text-[10px]">
                      ✓
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-prussian">
                        {cook.user?.fullName}
                      </h1>
                      <ShieldCheck className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-sm font-medium text-text-secondary">
                      {cook.professionalTitle}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-secondary pt-1">
                      <MapPin className="w-3.5 h-3.5 text-text-muted" />
                      <span>{cook.locality}, {cook.city}</span>
                      <span>•</span>
                      <span className="font-semibold text-prussian">
                        {cook.yearsExperience} Years Experience
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl gap-1 text-xs">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl gap-1 text-xs">
                    <Heart className="w-3.5 h-3.5 text-danger" />
                    <span>Save</span>
                  </Button>
                </div>
              </div>

              {/* Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-almond-900/40 border border-border flex items-center gap-3">
                  <Star className="w-5 h-5 text-saffron fill-saffron shrink-0" />
                  <div>
                    <span className="font-heading font-bold text-sm text-prussian block">
                      {cook.averageRating} / 5.0
                    </span>
                    <span className="text-[10px] text-text-muted">{cook.totalReviews} reviews</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-almond-900/40 border border-border flex items-center gap-3">
                  <Award className="w-5 h-5 text-saffron shrink-0" />
                  <div>
                    <span className="font-heading font-bold text-sm text-prussian block">
                      {cook.completedJobs} Jobs
                    </span>
                    <span className="text-[10px] text-text-muted">Completed</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-almond-900/40 border border-border flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-success shrink-0" />
                  <div>
                    <span className="font-heading font-bold text-sm text-prussian block">
                      Govt ID
                    </span>
                    <span className="text-[10px] text-success font-semibold">Verified</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-almond-900/40 border border-border flex items-center gap-3">
                  <BadgeCheck className="w-5 h-5 text-success shrink-0" />
                  <div>
                    <span className="font-heading font-bold text-sm text-prussian block">
                      Police Check
                    </span>
                    <span className="text-[10px] text-success font-semibold">Clear</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-prussian">
                  About the Cook
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {cook.description}
                </p>
              </div>

              {/* Cuisines */}
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-prussian">
                  Specialized Cuisines
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cook.cuisines.map((c) => (
                    <Badge
                      key={c.id}
                      variant="default"
                      className="text-xs px-3 py-1 font-semibold bg-prussian text-white"
                    >
                      {c.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills and Specialties */}
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-prussian">
                  Key Skills & Techniques
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cook.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-xl border border-border bg-surface flex items-center justify-between"
                    >
                      <span className="text-xs font-semibold text-prussian">
                        {skill.skillName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-saffron-subtle text-saffron-dark font-bold">
                        {skill.proficiencyLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Availability Schedule */}
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-saffron" />
                <h3 className="font-heading font-bold text-lg text-prussian">
                  Standard Availability
                </h3>
              </div>
              <p className="text-xs text-text-secondary">
                Typical working slots. Can be customized during final hiring confirmation.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                  <div
                    key={day}
                    className={`p-3 rounded-2xl border text-center ${
                      idx < 6
                        ? "border-success/30 bg-success-light/30 text-prussian"
                        : "border-border bg-almond-900/30 text-text-muted"
                    }`}
                  >
                    <span className="text-xs font-bold block">{day}</span>
                    <span className="text-[10px] mt-1 block">
                      {idx < 6 ? "7 AM - 8 PM" : "Day Off"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews Section */}
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-prussian">
                    Household Reviews ({sampleReviews.length})
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Verified ratings from completed bookings on DHANDHA
                  </p>
                </div>
                <div className="flex items-center gap-1 font-heading font-extrabold text-xl text-prussian">
                  <Star className="w-5 h-5 text-saffron fill-saffron" />
                  <span>{cook.averageRating}</span>
                </div>
              </div>

              <div className="space-y-4">
                {sampleReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl border border-border bg-almond-900/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{rev.reviewer?.fullName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-bold text-xs text-prussian block">
                            {rev.reviewer?.fullName}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            Verified Hirer in {cook.city}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-saffron">
                        <Star className="w-3.5 h-3.5 fill-saffron" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      &ldquo;{rev.reviewText}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Widget (4 cols) */}
          <div className="lg:col-span-4" id="hire">
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-elevated sticky top-24 space-y-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-border">
                <div>
                  <span className="text-[11px] text-text-muted uppercase tracking-wider block font-semibold">
                    Starting From
                  </span>
                  <div className="font-heading font-extrabold text-2xl text-prussian">
                    {formatCurrency(pricing.base)}
                    <span className="text-xs font-normal text-text-secondary">
                      /{bookingType === "MONTHLY" ? "month" : bookingType === "DAILY" ? "day" : "shift"}
                    </span>
                  </div>
                </div>
                <Badge variant="success" className="text-xs">
                  Available Now
                </Badge>
              </div>

              {/* Service Model Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Select Hiring Model
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-almond-900/60 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setBookingType("MONTHLY")}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      bookingType === "MONTHLY"
                        ? "bg-prussian text-white shadow-xs"
                        : "text-text-secondary hover:text-prussian"
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType("DAILY")}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      bookingType === "DAILY"
                        ? "bg-prussian text-white shadow-xs"
                        : "text-text-secondary hover:text-prussian"
                    )}
                  >
                    Daily
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType("HOURLY")}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      bookingType === "HOURLY"
                        ? "bg-prussian text-white shadow-xs"
                        : "text-text-secondary hover:text-prussian"
                    )}
                  >
                    Trial (1-day)
                  </button>
                </div>
              </div>

              {/* Shift Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Shift Timing
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedShift("BOTH")}
                    className={cn(
                      "p-2.5 rounded-xl border text-center transition-all text-xs font-semibold cursor-pointer",
                      selectedShift === "BOTH"
                        ? "border-saffron bg-saffron-subtle text-saffron-dark"
                        : "border-border text-text-secondary"
                    )}
                  >
                    Both Meals
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedShift("LUNCH")}
                    className={cn(
                      "p-2.5 rounded-xl border text-center transition-all text-xs font-semibold cursor-pointer",
                      selectedShift === "LUNCH"
                        ? "border-saffron bg-saffron-subtle text-saffron-dark"
                        : "border-border text-text-secondary"
                    )}
                  >
                    Lunch Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedShift("DINNER")}
                    className={cn(
                      "p-2.5 rounded-xl border text-center transition-all text-xs font-semibold cursor-pointer",
                      selectedShift === "DINNER"
                        ? "border-saffron bg-saffron-subtle text-saffron-dark"
                        : "border-border text-text-secondary"
                    )}
                  >
                    Dinner Only
                  </button>
                </div>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="p-3.5 rounded-2xl bg-almond-900/40 border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Cook Remuneration:</span>
                  <span className="font-semibold text-prussian">{formatCurrency(pricing.base)}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>DHANDHA Platform Fee:</span>
                  <span className="font-semibold text-prussian">{formatCurrency(pricing.platformFee)}</span>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between font-bold text-sm text-prussian">
                  <span>Total Payable:</span>
                  <span className="text-saffron-dark">{formatCurrency(pricing.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {bookingSuccess ? (
                <div className="p-4 rounded-2xl bg-success-light text-success text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <span className="font-bold text-sm block">Hiring Request Submitted!</span>
                  <p className="text-xs">
                    {cook.user?.fullName} has received your requirement. You will receive an SMS and WhatsApp update shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => setBookingSuccess(true)}
                    className="w-full h-12 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm"
                  >
                    Book Cook / Request Trial
                  </Button>
                  <Link href={`/jobs/post?type=HOUSEHOLD`} className="block">
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl text-xs font-semibold"
                    >
                      Post Custom Need Instead
                    </Button>
                  </Link>
                </div>
              )}

              <p className="text-[11px] text-text-muted text-center leading-relaxed">
                🛡️ 100% replacement guarantee if you are not satisfied within the first 3 days.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}

export default function CookProfileDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading Cook Profile...</div>}>
      <CookProfileDetailContent />
    </Suspense>
  );
}
