"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  UtensilsCrossed,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  ShoppingBag,
  MapPin,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleFoodListings } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

function FoodDetailContent() {
  const params = useParams();
  const foodId = params?.id as string;
  const food =
    sampleFoodListings.find((f) => f.id === foodId) || sampleFoodListings[0];

  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = food.price * quantity;
  const deliveryFee = 30;
  const platformFee = 15;
  const total = subtotal + deliveryFee + platformFee;

  return (
    <MainLayout>
      <div className="bg-surface border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-text-secondary">
            <Link href="/" className="hover:text-prussian">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <Link href="/food" className="hover:text-prussian">Food Market</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <span className="font-semibold text-prussian">{food.name}</span>
          </nav>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-elevated bg-almond-800 border border-border">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-xs font-bold">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    food.dietaryType === "VEG" ? "bg-success" : "bg-danger"
                  }`}
                />
                <span>{food.dietaryType}</span>
              </div>
            </div>

            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border space-y-4 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {food.category}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-prussian">
                    {food.name}
                  </h1>
                </div>
                <div className="flex items-center gap-1 text-saffron font-bold text-lg">
                  <Star className="w-5 h-5 fill-saffron" />
                  <span>{food.rating}</span>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {food.description}
              </p>

              {/* Kitchen / Provider Info */}
              <div className="p-4 rounded-2xl bg-almond-900/40 border border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                    Home Kitchen Provider
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-heading font-bold text-sm text-prussian">
                      {food.provider?.providerName}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-xs text-text-secondary">
                    {food.provider?.locality}, {food.provider?.city} • FSSAI Registered
                  </span>
                </div>
                <Badge variant="success" className="text-xs">
                  Verified Kitchen
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-saffron" />
                  <span>Prep time: ~{food.preparationTime} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-prussian" />
                  <span>{food.totalOrders}+ orders placed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Checkout Widget (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-elevated sticky top-24 space-y-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-border">
                <div>
                  <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider block">
                    Unit Price
                  </span>
                  <span className="font-heading font-extrabold text-2xl text-prussian">
                    {formatCurrency(food.price)}
                  </span>
                </div>
                <Badge variant="saffron" className="text-xs">
                  Fresh Daily
                </Badge>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Select Quantity
                </label>
                <div className="flex items-center justify-between p-3 rounded-2xl border border-border bg-almond-900/30">
                  <span className="text-sm font-bold text-prussian">
                    {quantity} {quantity === 1 ? "Meal / Box" : "Meals / Boxes"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-almond-800"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-almond-800"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bill Details */}
              <div className="p-4 rounded-2xl bg-almond-900/40 border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Item Subtotal ({quantity}x):</span>
                  <span className="font-semibold text-prussian">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Delivery Partner Fee:</span>
                  <span className="font-semibold text-prussian">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Platform & Packaging:</span>
                  <span className="font-semibold text-prussian">{formatCurrency(platformFee)}</span>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between font-bold text-sm text-prussian">
                  <span>To Pay:</span>
                  <span className="text-saffron-dark">{formatCurrency(total)}</span>
                </div>
              </div>

              {orderPlaced ? (
                <div className="p-4 rounded-2xl bg-success-light text-success text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <span className="font-bold text-sm block">Order Placed Successfully!</span>
                  <p className="text-xs">
                    Order #DH-{Math.floor(100000 + Math.random() * 900000)} is sent to{" "}
                    {food.provider?.providerName}.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={() => setOrderPlaced(true)}
                  className="w-full h-12 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm"
                >
                  Confirm & Place Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}

export default function FoodDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading Food Details...</div>}>
      <FoodDetailContent />
    </Suspense>
  );
}
