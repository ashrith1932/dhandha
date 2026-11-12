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
  ChevronRight,
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
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const subtotal = food.price * quantity;
  const deliveryFee = 35;
  const total = subtotal + deliveryFee;

  const whatsappOrderUrl = `https://wa.me/${(food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${food.provider?.providerName}, I want to order ${quantity}x ${food.name} (Total: ₹${total}) via DHANDHA!`)}`;
  const whatsappCallUrl = `https://wa.me/${(food.provider?.whatsappNumber || "+919876543210").replace(/\D/g, "")}`;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-prussian transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/food" className="hover:text-prussian transition-colors">
            Homemade Food
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-prussian font-semibold truncate max-w-[180px]">
            {food.name}
          </span>
        </div>

        {/* Product Grid: Left Gallery & Right Details */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-2">
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-xl overflow-hidden shadow-xs bg-gray-100 border border-gray-200">
              <img
                src={activeHeroImage}
                alt={food.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-prussian text-[11px] font-bold shadow-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
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

          {/* Details & Ordering Box (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-saffron/30 text-saffron-dark bg-saffron-subtle text-[10px] font-bold py-0 px-2">
                  {food.category}
                </Badge>
                <span className="text-xs text-gray-500">• {food.provider?.providerName}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-prussian tracking-tight">
                {food.name}
              </h1>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Price & Rating Box */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
              <div>
                <span className="text-[11px] text-gray-500 block">Unit Price</span>
                <div className="text-xl sm:text-2xl font-heading font-bold text-prussian">
                  {formatCurrency(food.price)}
                  <span className="text-xs font-normal text-gray-500 ml-1">/ meal box</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-gray-500 block">Rating</span>
                <div className="text-xl sm:text-2xl font-heading font-bold text-prussian flex items-center gap-1.5">
                  <span>{food.rating}</span>
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-xs font-normal text-gray-500">
                    ({food.totalOrders}+ orders)
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quick Facts Cards in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-gray-200/90 rounded-xl p-2.5 flex items-center gap-2.5 bg-white">
                <div className="w-8 h-8 rounded-lg bg-saffron-subtle text-saffron-dark flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Prep Time</span>
                  <span className="text-xs font-bold text-prussian">{food.preparationTime} Minutes</span>
                </div>
              </div>

              <div className="border border-gray-200/90 rounded-xl p-2.5 flex items-center gap-2.5 bg-white">
                <div className="w-8 h-8 rounded-lg bg-saffron-subtle text-saffron-dark flex items-center justify-center shrink-0">
                  <ChefHat className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Kitchen Type</span>
                  <span className="text-xs font-bold text-prussian">Home Kitchen</span>
                </div>
              </div>

              <div className="border border-gray-200/90 rounded-xl p-2.5 flex items-center gap-2.5 bg-white">
                <div className="w-8 h-8 rounded-lg bg-saffron-subtle text-saffron-dark flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Locality</span>
                  <span className="text-xs font-bold text-prussian truncate">{food.provider?.locality}</span>
                </div>
              </div>

              <div className="border border-gray-200/90 rounded-xl p-2.5 flex items-center gap-2.5 bg-white">
                <div className="w-8 h-8 rounded-lg bg-saffron-subtle text-saffron-dark flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">License</span>
                  <span className="text-xs font-bold text-prussian">FSSAI Certified</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Ordering (per ref7.html mandate) */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Direct WhatsApp Order Available
                </span>
                <span className="text-[10px] text-emerald-700 font-normal">Fastest Response</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Order</span>
                </a>

                <a
                  href={whatsappCallUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-300 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Kitchen</span>
                </a>
              </div>
            </div>

            {/* Direct In-App Order Box */}
            <div className="border border-gray-200 rounded-xl p-4 shadow-xs bg-white space-y-3">
              <h2 className="text-sm font-heading font-bold text-prussian">
                Instant In-App Order
              </h2>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between h-9 px-3 rounded-lg border border-gray-200 bg-gray-50">
                <span className="text-xs font-bold text-prussian">
                  {quantity} {quantity === 1 ? "Meal Box" : "Meal Boxes"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Bill Details */}
              <div className="p-2.5 rounded-lg bg-gray-50 space-y-1 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal ({quantity}x):</span>
                  <span className="font-bold text-prussian">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery fee:</span>
                  <span className="font-bold text-prussian">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="pt-1.5 border-t border-gray-200 flex items-center justify-between font-bold text-xs text-prussian">
                  <span>Total Amount:</span>
                  <span className="text-prussian">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Order Button */}
              {orderPlaced ? (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-center text-xs font-bold space-y-0.5">
                  <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600" />
                  <span>Order Placed Successfully!</span>
                  <p className="text-[10px] font-normal text-emerald-700">
                    Order #DH-{orderId} sent to {food.provider?.providerName}.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={() => setOrderPlaced(true)}
                  className="w-full h-9 bg-prussian hover:bg-prussian-light text-white font-bold rounded-lg text-xs shadow-xs transition-colors"
                >
                  Confirm & Place Order
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Overview & Included / Excluded Checklist */}
        <section className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-prussian mb-2">
                About the Kitchen & Meal Preparation
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {food.provider?.description}
              </p>
            </div>

            {/* What's Included / Excluded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                <h3 className="font-heading font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>What&apos;s in the Box</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {(food.whatsIncluded || [
                    "Freshly cooked meal in thermal sealed eco-packaging",
                    "Authentic homemade spices with zero artificial colors",
                    "Accompaniment chutneys, pickle or papad included",
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
                  <span>Excluded</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-start gap-1.5">
                    <CloseIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Commercial preservatives or bulk frozen gravies</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CloseIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Single-use plastic cutlery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Side Sticky Card (4 cols) */}
          <div className="lg:col-span-4">
            <aside className="sticky top-24 border border-gray-200 rounded-xl p-4 shadow-xs bg-white space-y-3">
              <div className="p-3 rounded-lg bg-saffron-subtle/60 border border-saffron/20">
                <span className="text-[10px] text-gray-400 block uppercase font-semibold">Unit Price</span>
                <div className="text-xl font-heading font-bold text-prussian">
                  {formatCurrency(food.price)}
                </div>
                <span className="text-[10px] text-gray-500 block">
                  Fresh to order • ~{food.preparationTime} mins prep
                </span>
              </div>

              <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Private Kitchen: {food.provider?.fssaiNumber || "FSSAI Registered"}</span>
              </div>

              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
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
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs">Loading Food Details...</div>}>
      <FoodDetailContent />
    </Suspense>
  );
}
