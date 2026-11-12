"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChefHat,
  Building2,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Home,
  PlusCircle,
  FileText,
  Upload,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { popularCities } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

function PostJobContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as "HOUSEHOLD" | "RESTAURANT") || "HOUSEHOLD";

  const [jobType, setJobType] = useState<"HOUSEHOLD" | "RESTAURANT">(initialType);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Delhi NCR");
  const [locality, setLocality] = useState("");
  const [salaryMin, setSalaryMin] = useState("15000");
  const [salaryMax, setSalaryMax] = useState("20000");
  const [description, setDescription] = useState("");

  // Restaurant specific compliance fields
  const [restaurantName, setRestaurantName] = useState("");
  const [fssaiNumber, setFssaiNumber] = useState("");
  const [gstin, setGstin] = useState("");
  const [isRestaurantVerified, setIsRestaurantVerified] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <MainLayout>
      <div className="band-dark bg-noise relative overflow-hidden text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <Badge variant="saffron" className="text-xs font-bold">
            Post Requirement
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Post a Cooking Opportunity on DHANDHA
          </h1>
          <p className="text-sm text-almond-500 max-w-xl">
            Reach thousands of skilled cooks and culinary professionals across India.
          </p>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <Card className="p-8 text-center rounded-3xl border border-border space-y-4 bg-surface shadow-elevated">
              <div className="w-16 h-16 rounded-full bg-success-light text-success flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-prussian">
                Requirement Published Successfully!
              </h2>
              <p className="text-sm text-text-secondary max-w-md mx-auto">
                {jobType === "HOUSEHOLD"
                  ? "Your household cook requirement is now live. Local verified cooks will be notified."
                  : "Your restaurant hiring post is live. Verified applicants will be routed to your dashboard."}
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <Link href="/jobs">
                  <Button className="rounded-xl font-bold">
                    View in Job Listings
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="rounded-xl font-bold">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vertical Selector: Household vs Restaurant */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Select Posting Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setJobType("HOUSEHOLD")}
                    className={cn(
                      "p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2",
                      jobType === "HOUSEHOLD"
                        ? "border-saffron bg-saffron-subtle/40 ring-2 ring-saffron/20"
                        : "border-border bg-surface hover:bg-almond-900/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-saffron-subtle text-saffron-dark flex items-center justify-center">
                        <Home className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        No Business Docs Needed
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-prussian">
                        Household Cook Requirement
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5 leading-snug">
                        For personal residence, family daily meals, or part-time cook needs.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setJobType("RESTAURANT")}
                    className={cn(
                      "p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2",
                      jobType === "RESTAURANT"
                        ? "border-prussian bg-almond-800/40 ring-2 ring-prussian/20"
                        : "border-border bg-surface hover:bg-almond-900/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-prussian text-white flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        Business Account
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-prussian">
                        Restaurant / Food Business
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5 leading-snug">
                        Commercial kitchen, cloud kitchen, banquet or cafe staffing.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Restaurant Compliance Banner if RESTAURANT selected */}
              {jobType === "RESTAURANT" && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Restaurant Business Compliance Required</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Under DHANDHA platform security rules, commercial listings require verified business
                    registration. Please provide your establishment details below.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-bold block mb-1">
                        Restaurant / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="e.g. Spice Junction"
                        className="w-full h-10 px-3 rounded-xl border border-amber-300 bg-white text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold block mb-1">
                        FSSAI License / Registration No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={fssaiNumber}
                        onChange={(e) => setFssaiNumber(e.target.value)}
                        placeholder="14-digit FSSAI number"
                        className="w-full h-10 px-3 rounded-xl border border-amber-300 bg-white text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Common Job Details */}
              <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                    Job Title / Requirement Summary *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      jobType === "HOUSEHOLD"
                        ? "e.g. Full-time Vegetarian Home Cook needed in Dwarka"
                        : "e.g. Senior Tandoor & Kebab Chef for Fine Dine Restaurant"
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-border bg-almond-900/30 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-border bg-almond-900/30 text-xs font-bold text-prussian focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      {popularCities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                      Locality / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="e.g. Sector 14, Koramangala, Bandra West"
                      className="w-full h-11 px-3.5 rounded-xl border border-border bg-almond-900/30 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                      Min Monthly Salary (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-border bg-almond-900/30 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                      Max Monthly Salary (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-border bg-almond-900/30 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                    Detailed Description & Specific Cuisine Expectations *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your family size or restaurant cuisine requirements, working hours, weekly off day, and any specific preferences (e.g. Jain food, breakfast + dinner, hygiene expectations)..."
                    className="w-full p-3.5 rounded-xl border border-border bg-almond-900/30 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm"
              >
                {isSubmitting ? "Publishing Opportunity..." : "Publish Job Requirement"}
              </Button>
            </form>
          )}
        </div>
      </SectionContainer>
    </MainLayout>
  );
}

export default function PostJobPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <PostJobContent />
    </Suspense>
  );
}
