"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChefHat,
  ShoppingBag,
  Briefcase,
  Calendar,
  Sparkles,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleUsers, sampleNotifications, sampleJobs, sampleCooks } from "@/lib/sample-data";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function UniversalDashboardPage() {
  const user = sampleUsers[0]; // Priya Sharma
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "ORDERS" | "BOOKINGS" | "JOBS">("OVERVIEW");

  return (
    <MainLayout>
      {/* Universal Account Header */}
      <div className="bg-prussian text-white py-8 sm:py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-saffron shadow-lg">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.fullName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold">
                    Namaste, {user.fullName}
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-success" />
                </div>
                <p className="text-xs sm:text-sm text-almond-500">
                  {user.phone} • Universal Account Member since 2024
                </p>
              </div>
            </div>

            {/* Quick Mode Switcher (Core DHANDHA Principle) */}
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/dashboard/cook">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-xl text-xs gap-1.5 font-bold">
                  <ChefHat className="w-4 h-4 text-saffron" />
                  <span>Cook / Chef Mode</span>
                </Button>
              </Link>
              <Link href="/dashboard/restaurant">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-xl text-xs gap-1.5 font-bold">
                  <Building2 className="w-4 h-4 text-almond-400" />
                  <span>Restaurant Hub</span>
                </Button>
              </Link>
              <Link href="/dashboard/admin">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-xl text-xs gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Admin Hub</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Active Bookings</span>
              <span className="font-heading font-extrabold text-xl text-white">1 Cook</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Tiffin Orders</span>
              <span className="font-heading font-extrabold text-xl text-white">2 Active</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Posted Needs</span>
              <span className="font-heading font-extrabold text-xl text-saffron">1 Live</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Verified Status</span>
              <span className="font-heading font-extrabold text-xl text-success">Active</span>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Active Bookings Card */}
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-prussian">
                    Upcoming Bookings & Household Cooks
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Your scheduled meal services and chef appointments
                  </p>
                </div>
                <Link href="/cooks">
                  <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold">
                    Hire Another Cook
                  </Button>
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-almond-900/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border border-border">
                    <AvatarImage src={sampleCooks[0].user?.avatarUrl} />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold text-sm text-prussian">
                        Rajesh Kumar
                      </span>
                      <ShieldCheck className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-xs text-text-secondary">
                      Daily Household Cook • Lunch & Dinner • Dwarka
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <Badge variant="success" className="text-xs">
                    Service Confirmed
                  </Badge>
                  <span className="text-[11px] text-text-muted block mt-1">
                    Next visit: Today at 5:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* My Job Postings */}
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-prussian">
                    Your Posted Requirements
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Applications received from local cooks
                  </p>
                </div>
                <Link href="/jobs/post?type=HOUSEHOLD">
                  <Button size="sm" className="bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold gap-1">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Post New</span>
                  </Button>
                </Link>
              </div>

              <div className="p-4 rounded-2xl border border-border bg-surface space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="text-[10px] mb-1">
                      Household Need
                    </Badge>
                    <h3 className="font-heading font-bold text-sm text-prussian">
                      {sampleJobs[0].title}
                    </h3>
                    <span className="text-xs text-text-muted">
                      Dwarka, Delhi • Posted {timeAgo(sampleJobs[0].createdAt)}
                    </span>
                  </div>
                  <Badge variant="saffron" className="text-xs font-bold">
                    12 Applicants
                  </Badge>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-bold text-prussian">
                    Budget: ₹15,000 – ₹20,000/mo
                  </span>
                  <Link href={`/jobs/${sampleJobs[0].id}`}>
                    <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold">
                      Review Applicants →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Notifications Feed */}
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
              <h2 className="font-heading font-bold text-lg text-prussian">
                Recent Marketplace Activity
              </h2>
              <div className="space-y-3">
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3.5 rounded-2xl border border-border bg-almond-900/20 flex items-start justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="font-bold text-prussian block">{notif.title}</span>
                      <p className="text-text-secondary leading-relaxed">{notif.body}</p>
                    </div>
                    <span className="text-[10px] text-text-muted shrink-0">
                      {timeAgo(notif.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Quick Actions & Profile Status (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-prussian">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link href="/cooks" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl text-xs font-bold gap-2">
                    <ChefHat className="w-4 h-4 text-saffron" />
                    <span>Search Cooks Near You</span>
                  </Button>
                </Link>
                <Link href="/food" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl text-xs font-bold gap-2">
                    <ShoppingBag className="w-4 h-4 text-success" />
                    <span>Order Lunch / Dinner Tiffin</span>
                  </Button>
                </Link>
                <Link href="/chefs" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl text-xs font-bold gap-2">
                    <Sparkles className="w-4 h-4 text-prussian" />
                    <span>Book Chef for House Party</span>
                  </Button>
                </Link>
                <Link href="/community" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl text-xs font-bold gap-2">
                    <Star className="w-4 h-4 text-saffron" />
                    <span>Culinary Community & Recipes</span>
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-prussian">
                Safety & Transparency Guarantee
              </h3>
              <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>100% Aadhaar & criminal background verified cooks</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>Transparent salary contracts without hidden markups</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>Full replacement guarantee in case of leave or mismatch</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
