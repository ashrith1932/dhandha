"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Sparkles,
  Users,
  Calendar,
  Clock,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
  Utensils,
  Plus,
  Minus,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleChefServices } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

function ChefDetailContent() {
  const params = useParams();
  const serviceId = params?.id as string;
  const service =
    sampleChefServices.find((s) => s.id === serviceId) || sampleChefServices[0];

  const [guestCount, setGuestCount] = useState(service.minimumGuests || 4);
  const [eventDate, setEventDate] = useState("2024-12-20");
  const [dietaryNote, setDietaryNote] = useState("Vegetarian & Jain options needed");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Calculation
  const subtotal =
    service.pricingType === "PER_PERSON"
      ? service.basePrice * guestCount
      : service.basePrice;
  const platformFee = Math.round(subtotal * 0.05);
  const total = subtotal + platformFee;

  return (
    <MainLayout>
      <div className="bg-surface border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-text-secondary">
            <Link href="/" className="hover:text-prussian">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <Link href="/chefs" className="hover:text-prussian">Chefs</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <span className="font-semibold text-prussian">{service.serviceType}</span>
          </nav>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
              <div className="space-y-2">
                <Badge variant="saffron" className="text-xs font-bold">
                  Exclusive Experience
                </Badge>
                <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-prussian">
                  {service.serviceType}
                </h1>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Chef Profile Card */}
              <div className="p-4 rounded-2xl bg-almond-900/40 border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border border-border">
                    <AvatarImage src={service.cook?.user?.avatarUrl} />
                    <AvatarFallback>{service.cook?.user?.fullName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold text-sm text-prussian">
                        Chef {service.cook?.user?.fullName}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-xs text-text-secondary">
                      {service.cook?.yearsExperience} years culinary experience • {service.cook?.city}
                    </span>
                  </div>
                </div>

                <Link href={`/cooks/${service.cook?.id}`}>
                  <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold">
                    View Full Profile
                  </Button>
                </Link>
              </div>

              {/* What's Included */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base text-prussian">
                  What&apos;s Included in This Experience
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Personalized menu design & consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Fresh ingredient procurement & preparation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Live culinary preparation at your venue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Plating, service support & complete kitchen clean-up</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Widget (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-elevated sticky top-24 space-y-6">
              <div>
                <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider block">
                  Package Pricing
                </span>
                <div className="font-heading font-extrabold text-2xl text-prussian">
                  {formatCurrency(service.basePrice)}
                  <span className="text-xs font-normal text-text-secondary">
                    {service.pricingType === "PER_PERSON" ? " / guest" : " fixed"}
                  </span>
                </div>
              </div>

              {/* Guest Counter */}
              {service.pricingType === "PER_PERSON" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                    Number of Guests
                  </label>
                  <div className="flex items-center justify-between p-3 rounded-2xl border border-border bg-almond-900/30">
                    <span className="text-sm font-bold text-prussian">
                      {guestCount} Guests
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(Math.max((service.minimumGuests || 2), guestCount - 1))
                        }
                        className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-almond-800"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(Math.min((service.maximumGuests || 50), guestCount + 1))
                        }
                        className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-almond-800"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border bg-almond-900/30 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              {/* Cost Breakdown */}
              <div className="p-3.5 rounded-2xl bg-almond-900/40 border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Chef Services:</span>
                  <span className="font-semibold text-prussian">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Platform & Insurance Fee:</span>
                  <span className="font-semibold text-prussian">{formatCurrency(platformFee)}</span>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between font-bold text-sm text-prussian">
                  <span>Total Payable:</span>
                  <span className="text-saffron-dark">{formatCurrency(total)}</span>
                </div>
              </div>

              {bookingSuccess ? (
                <div className="p-4 rounded-2xl bg-success-light text-success text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <span className="font-bold text-sm block">Chef Booking Requested!</span>
                  <p className="text-xs">
                    Chef {service.cook?.user?.fullName} will review your event date and contact you for menu consultation.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={() => setBookingSuccess(true)}
                  className="w-full h-12 bg-prussian hover:bg-prussian-600 text-white font-bold rounded-2xl shadow-lg text-sm"
                >
                  Reserve Chef Experience
                </Button>
              )}
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}

export default function ChefDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading Chef Experience...</div>}>
      <ChefDetailContent />
    </Suspense>
  );
}
