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
  Phone,
  MessageCircle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
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
    { id: "WEDDING", label: "Luxury Weddings" },
    { id: "PARTY", label: "House Parties" },
    { id: "CORPORATE", label: "Corporate Lunches" },
  ];

  return (
    <MainLayout>
      {/* Premium Hero Banner */}
      <div className="bg-gradient-to-r from-[#1B153D] via-[#2A1F5E] to-[#161B33] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <Badge variant="saffron" className="text-xs font-bold">
            Executive Dining & Private Chefs
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            Book an Executive Chef for Your Special Occasion
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Elevate intimate house parties, multi-course tasting dinners, and celebrations with
            renowned culinary talent. Bespoke menus created right in your home.
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
                    ? "bg-purple-100 text-indigo-950 shadow-xs"
                    : "bg-white/10 hover:bg-white/15 text-gray-300 border border-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleChefServices.map((service) => {
            const whatsappChatUrl = `https://wa.me/${(service.whatsappNumber || "+919876543215").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Chef ${service.cook?.user?.fullName}, I found your "${service.serviceType}" on DHANDHA!`)}`;

            return (
              <Card
                key={service.id}
                className="overflow-hidden border border-gray-200/90 hover:border-indigo-600 hover:shadow-xl transition-all flex flex-col justify-between rounded-[24px] bg-white group"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img
                      src={service.galleryImages?.[0] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop"}
                      alt={service.serviceType}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-ink-black shadow-xs flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-saffron" />
                      <span>{service.pricingType === "PER_PERSON" ? "Per Person" : "Fixed Package"}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-black/90 text-white backdrop-blur-sm text-[11px] font-semibold">
                      <Star className="w-3 h-3 fill-saffron text-saffron" />
                      <span>4.9 (124+ reviews)</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Service Details */}
                    <div>
                      <h3 className="font-heading font-bold text-xl text-ink-black group-hover:text-indigo-700 transition-colors">
                        {service.serviceType}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-3 mt-1.5 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Capacity & Chef Info */}
                    <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>Guest Capacity:</span>
                        </span>
                        <span className="font-bold text-ink-black">
                          {service.minimumGuests} – {service.maximumGuests} guests
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Master Chef:</span>
                        <span className="font-bold text-indigo-900">
                          Chef {service.cook?.user?.fullName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Action */}
                <div className="p-5 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-semibold">Starting from</span>
                    <span className="font-heading font-extrabold text-xl text-ink-black">
                      {formatCurrency(service.basePrice)}
                      <span className="text-xs font-normal text-gray-500 ml-0.5">
                        {service.pricingType === "PER_PERSON" ? "/person" : ""}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* WhatsApp Action per ref7.html */}
                    {service.whatsappNumber && (
                      <a
                        href={whatsappChatUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                      </a>
                    )}

                    <Link href={`/chefs/${service.id}`}>
                      <Button className="bg-ink-black hover:bg-indigo-700 text-white rounded-xl px-5 text-xs font-bold">
                        Book Experience
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
