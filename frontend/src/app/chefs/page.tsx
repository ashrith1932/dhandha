"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Calendar,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleChefServices } from "@/lib/sample-data";
import { formatCurrency, cn } from "@/lib/utils";

export default function ChefsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "All Experiences" },
    { id: "PRIVATE", label: "Private Dining" },
    { id: "WEDDING", label: "Weddings" },
    { id: "PARTY", label: "House Parties" },
    { id: "CORPORATE", label: "Corporate Lunches" },
  ];

  return (
    <MainLayout>
      {/* Premium Hero Banner */}
      <div className="bg-gradient-to-r from-prussian via-ink-black to-prussian text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <Badge variant="saffron" className="text-xs font-bold">
            Executive & Event Chefs
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            Book an Executive Chef for Your Special Occasion
          </h1>
          <p className="text-sm sm:text-base text-almond-500 max-w-2xl leading-relaxed">
            Elevate intimate house parties, bespoke celebrations, and luxury weddings with
            five-star culinary talent. Customized multi-course menus crafted right in your kitchen.
          </p>

          {/* Quick Experience Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-saffron text-white shadow-md shadow-saffron/20"
                    : "bg-white/10 hover:bg-white/15 text-almond-400 border border-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleChefServices.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden border border-border hover:border-saffron hover:shadow-elevated transition-all flex flex-col justify-between rounded-3xl bg-surface group"
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-prussian text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6 text-saffron" />
                  </div>
                  <Badge variant="saffron" className="text-xs font-bold">
                    {service.pricingType === "PER_PERSON" ? "Per Person" : "Fixed Package"}
                  </Badge>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="font-heading font-bold text-xl text-prussian group-hover:text-saffron-dark transition-colors">
                    {service.serviceType}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-3 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Capacity & Chef Info */}
                <div className="p-3.5 rounded-2xl bg-almond-900/40 border border-border space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>Guest Capacity:</span>
                    </span>
                    <span className="font-bold text-prussian">
                      {service.minimumGuests} – {service.maximumGuests} guests
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Master Chef:</span>
                    <span className="font-bold text-prussian">
                      {service.cook?.user?.fullName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className="p-5 bg-almond-900/20 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-muted block">Base Price</span>
                  <span className="font-heading font-extrabold text-xl text-prussian">
                    {formatCurrency(service.basePrice)}
                    <span className="text-xs font-normal text-text-secondary">
                      {service.pricingType === "PER_PERSON" ? "/person" : ""}
                    </span>
                  </span>
                </div>
                <Link href={`/chefs/${service.id}`}>
                  <Button className="bg-prussian hover:bg-prussian-600 text-white rounded-2xl px-5 text-xs font-bold">
                    Book Experience
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
