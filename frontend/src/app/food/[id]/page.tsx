"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Plus,
  Minus,
  Check,
  X as CloseIcon,
  ChefHat,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleFoodListings } from "@/lib/sample-data";
import { formatCurrency, cn } from "@/lib/utils";

function FoodDetailContent() {
  const params = useParams();
  const foodId = params?.id as string;
  const food = sampleFoodListings.find((f) => f.id === foodId) || sampleFoodListings[0];

  const galleryImages = food.galleryImages && food.galleryImages.length > 0
    ? food.galleryImages
    : [
        food.imageUrl || "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1668236543090-82bbe40920b1?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500&h=400&fit=crop",
      ];

  const [activeHeroImage, setActiveHeroImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = food.price * quantity;
  const deliveryFee = 35;
  const total = subtotal + deliveryFee;

  const whatsappOrderUrl = `https://wa.me/${(food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${food.provider?.providerName}, I want to order ${quantity}x ${food.name} (Total: ₹${total}) via DHANDHA!`)}`;
  const whatsappCallUrl = `https://wa.me/${(food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "")}`;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb matching ref8.html */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ink-black transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link href="/food" className="hover:text-ink-black transition-colors">
            Homemade Food
          </Link>
          <span>›</span>
          <span className="text-ink-black font-semibold truncate max-w-[200px]">
            {food.name}
          </span>
        </div>

        {/* Product Grid: Left Gallery & Right Details matching ref8.html */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Gallery (1 Hero + 3 Thumbnails with click-to-swap) */}
          <div className="space-y-2">
            <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden shadow-sm bg-gray-100 border border-gray-200">
              <img
                src={activeHeroImage}
                alt={food.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-ink-black text-xs font-bold shadow-xs flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>{food.dietaryType} • Certified Home Kitchen</span>
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

          {/* Details & Ordering Box matching ref8.html */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-indigo-200 text-indigo-900 bg-purple-50 text-[10px] font-bold">
                  {food.category}
                </Badge>
                <span className="text-xs text-gray-500">• {food.provider?.providerName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-ink-black tracking-tight">
                {food.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Price & Rating Box matching ref8.html .price-rating */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-500 block">Unit Price</span>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-ink-black">
                  {formatCurrency(food.price)}
                  <span className="text-xs font-normal text-gray-500 ml-1">/ meal box</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 block">Rating</span>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-ink-black flex items-center gap-1.5">
                  <span>{food.rating}</span>
                  <div className="flex text-amber-400 text-sm">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-xs font-normal text-gray-500">
                    ({food.totalOrders}+ ordered)
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quick Facts Cards in 2x2 Grid matching ref8.html .facts */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="border border-gray-200/90 rounded-2xl p-3 flex items-center gap-3 bg-white">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 block">Prep Time</span>
                  <span className="text-xs font-bold text-ink-black">{food.preparationTime} Minutes</span>
                </div>
              </div>

              <div className="border border-gray-200/90 rounded-2xl p-3 flex items-center gap-3 bg-white">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 block">Kitchen Type</span>
                  <span className="text-xs font-bold text-ink-black">Certified Home Kitchen</span>
                </div>
              </div>

              <div className="border border-gray-200/90 rounded-2xl p-3 flex items-center gap-3 bg-white">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 block">Locality</span>
                  <span className="text-xs font-bold text-ink-black">{food.provider?.locality}, {food.provider?.city}</span>
                </div>
              </div>

              <div className="border border-gray-200/90 rounded-2xl p-3 flex items-center gap-3 bg-white">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 block">Safety License</span>
                  <span className="text-xs font-bold text-ink-black">FSSAI Certified</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Ordering Buttons (per user's ref7.html mandate) */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Order Directly via WhatsApp
                </span>
                <span className="text-[10px] text-emerald-700 font-normal">Fastest Response</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </a>

                <a
                  href={whatsappCallUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-300 font-bold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call Kitchen</span>
                </a>
              </div>
            </div>

            {/* Direct In-App Order Box */}
            <div className="border border-gray-200 rounded-2xl p-5 shadow-xs bg-white space-y-4">
              <h2 className="text-base sm:text-lg font-heading font-bold text-ink-black">
                Order Through DHANDHA Platform
              </h2>

              {/* Quantity Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Select Meal Quantity
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 bg-gray-50">
                  <span className="text-xs font-bold text-ink-black ml-2">
                    {quantity} {quantity === 1 ? "Meal Box" : "Meal Boxes"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bill Details */}
              <div className="p-3.5 rounded-xl bg-gray-50 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal ({quantity}x):</span>
                  <span className="font-bold text-ink-black">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery fee:</span>
                  <span className="font-bold text-ink-black">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-bold text-sm text-ink-black">
                  <span>Total Amount:</span>
                  <span className="text-indigo-800">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Order Button */}
              {orderPlaced ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-center text-xs font-bold space-y-1">
                  <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                  <span>Order Placed Successfully!</span>
                  <p className="text-[11px] font-normal text-emerald-700">
                    Order #DH-{Math.floor(100000 + Math.random() * 900000)} sent to {food.provider?.providerName}.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={() => setOrderPlaced(true)}
                  className="w-full h-12 bg-ink-black hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                >
                  Confirm & Place Order
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Overview & Included / Excluded Checklist matching ref8.html */}
        <section className="mt-12 pt-10 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-black mb-3">
                About the Kitchen & Meal Preparation
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {food.provider?.description}
              </p>
            </div>

            {/* What's Included / Excluded Checklist matching ref8.html */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                <h3 className="font-heading font-bold text-sm text-emerald-950 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>What&apos;s in the Box</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  {(food.whatsIncluded || [
                    "Freshly cooked meal in thermal sealed eco-friendly packaging",
                    "Authentic homemade spice blend with zero artificial colors",
                    "Appropriate accompaniment chutneys, pickle or papad",
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-3">
                <h3 className="font-heading font-bold text-sm text-rose-950 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                    ✕
                  </span>
                  <span>Excluded</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <CloseIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Commercial preservatives or frozen bases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CloseIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Plastic single-use cutlery (order sustainable cutlery add-on)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Side Sticky Card matching ref8.html .side-card */}
          <div className="lg:col-span-4">
            <aside className="sticky top-28 border border-gray-200 rounded-2xl p-5 shadow-xs bg-white space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100">
                <span className="text-xs text-gray-500 block">Unit Price</span>
                <div className="text-2xl font-heading font-bold text-ink-black">
                  {formatCurrency(food.price)}
                </div>
                <span className="text-[11px] text-gray-500 block mt-0.5">
                  Made fresh to order • ~{food.preparationTime} mins
                </span>
              </div>

              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Private Kitchen: {food.provider?.fssaiNumber || "FSSAI Registered"}</span>
              </div>

              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>
            </aside>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default function FoodDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Food Details...</div>}>
      <FoodDetailContent />
    </Suspense>
  );
}
