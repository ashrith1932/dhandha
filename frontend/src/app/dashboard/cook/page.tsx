"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChefHat,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Star,
  Users,
  Settings,
  ArrowRight,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleCooks } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

export default function CookDashboardPage() {
  const cook = sampleCooks[0]; // Rajesh Kumar
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <MainLayout>
      {/* Cook Header */}
      <div className="band-dark bg-noise relative overflow-hidden text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-saffron shadow-lg">
                <AvatarImage src={cook.user?.avatarUrl} />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold">
                    {cook.user?.fullName} (Professional Mode)
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-success" />
                </div>
                <p className="text-xs sm:text-sm text-almond-500">
                  {cook.professionalTitle} • Dwarka, Delhi
                </p>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-3 bg-white/10 p-2 px-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-almond-400">
                Work Status:
              </span>
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  isAvailable
                    ? "bg-success text-white shadow-xs"
                    : "bg-danger text-white shadow-xs"
                }`}
              >
                {isAvailable ? "Available for Hiring" : "Fully Booked"}
              </button>
            </div>
          </div>

          {/* Cook Metric Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">This Month&apos;s Earnings</span>
              <span className="font-heading font-extrabold text-xl text-saffron">
                {formatCurrency(38500)}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Active Households</span>
              <span className="font-heading font-extrabold text-xl text-white">2 Homes</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Rating Score</span>
              <span className="font-heading font-extrabold text-xl text-white flex items-center gap-1">
                <Star className="w-4 h-4 fill-saffron text-saffron" />
                <span>{cook.averageRating}</span>
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Police & ID Clearance</span>
              <span className="font-heading font-extrabold text-xl text-success">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Work Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Pending Booking Enquiries */}
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-prussian">
                    New Hiring Enquiries (2)
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Households in Dwarka requesting cooking visits
                  </p>
                </div>
                <Badge variant="saffron" className="text-xs font-bold">
                  2 Pending
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-border bg-almond-900/20 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-heading font-bold text-sm text-prussian block">
                        Family of 4 — North Indian Vegetarian
                      </span>
                      <span className="text-xs text-text-muted">
                        Sector 11, Dwarka • Monthly Full-time (Lunch + Dinner)
                      </span>
                    </div>
                    <span className="font-heading font-bold text-sm text-saffron-dark">
                      ₹18,000/mo
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" className="rounded-xl text-xs font-bold">
                      Accept & Call Hirer
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl text-xs font-semibold">
                      Decline
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-almond-900/20 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-heading font-bold text-sm text-prussian block">
                        Weekend Party Catering (15 Guests)
                      </span>
                      <span className="text-xs text-text-muted">
                        Janakpuri, Delhi • Dal Makhani, Shahi Paneer, Naan
                      </span>
                    </div>
                    <span className="font-heading font-bold text-sm text-saffron-dark">
                      ₹6,500 One-time
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" className="rounded-xl text-xs font-bold">
                      Accept Booking
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl text-xs font-semibold">
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
              <h2 className="font-heading font-bold text-lg text-prussian">
                Today&apos;s Cooking Schedule
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl border border-border bg-surface flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-saffron-subtle text-saffron-dark flex items-center justify-center font-bold">
                      7 AM
                    </div>
                    <div>
                      <span className="font-bold text-prussian block">Morning Shift: Sharma Residence</span>
                      <span className="text-text-muted">Breakfast & Lunch prep (4 members)</span>
                    </div>
                  </div>
                  <Badge variant="success">Completed</Badge>
                </div>

                <div className="p-3.5 rounded-2xl border border-border bg-surface flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-prussian text-white flex items-center justify-center font-bold">
                      5 PM
                    </div>
                    <div>
                      <span className="font-bold text-prussian block">Evening Shift: Sharma Residence</span>
                      <span className="text-text-muted">Fresh Rotis & Dinner prep</span>
                    </div>
                  </div>
                  <Badge variant="saffron">Upcoming</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Cook Sidebar: Verification Documents (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-prussian">
                Verification Documents
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-success-light/40 border border-success/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="font-bold text-prussian">Aadhaar Card Verified</span>
                  </div>
                  <span className="text-success font-semibold">Active</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-success-light/40 border border-success/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="font-bold text-prussian">Police Clearance Record</span>
                  </div>
                  <span className="text-success font-semibold">Clear</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-almond-900/40 border border-border">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-saffron" />
                    <span className="font-bold text-prussian">FSSAI Hygiene Certificate</span>
                  </div>
                  <span className="text-saffron-dark font-semibold">Optional</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-prussian">
                Bank Payout Details
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Bank of Baroda • Account ending in **4521 • Instant UPI settlements every Monday.
              </p>
              <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold">
                Manage Payout Account
              </Button>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
