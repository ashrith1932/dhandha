"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChefHat,
  UtensilsCrossed,
  Sparkles,
  Briefcase,
  Flame,
  Building2,
  Store,
  CheckCircle2,
  ArrowRight,
  User,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { popularCities } from "@/lib/sample-data";
import { cn } from "@/lib/utils";
import { ToastProvider, useToast } from "@/components/ui/toast";

function RegisterFlow() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Delhi NCR");

  // Selected Capabilities / Goals
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestOptions = [
    { id: "BOOK_COOK", label: "Find / Hire a Cook", icon: ChefHat, desc: "For home meals & daily cooking" },
    { id: "ORDER_FOOD", label: "Discover Homemade Food", icon: UtensilsCrossed, desc: "Tiffins & regional dishes" },
    { id: "BOOK_CHEF", label: "Book a Chef", icon: Sparkles, desc: "House parties & celebrations" },
    { id: "APPLY_FOR_JOB", label: "Find Cooking Jobs", icon: Briefcase, desc: "Cook & kitchen vacancies" },
    { id: "CREATE_COOK_PROFILE", label: "Work as Cook / Chef", icon: Flame, desc: "Earn through bookings" },
    { id: "POST_RESTAURANT_JOB", label: "Hire for Restaurant", icon: Building2, desc: "Commercial kitchen hiring" },
    { id: "LIST_FOOD", label: "Sell Homemade Food", icon: Store, desc: "List your tiffin service" },
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleComplete = () => {
    toast("Welcome aboard!", { description: "Your DHANDHA account is ready. Let's set up your kitchen." });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-6 sm:p-12">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Logo size="md" showTagline={true} />
        <Link href="/login" className="text-xs font-bold text-saffron-dark hover:underline">
          Already have an account? Sign in
        </Link>
      </header>

      <main className="max-w-2xl w-full mx-auto my-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step === s
                    ? "bg-saffron text-white shadow-md shadow-saffron/20"
                    : step > s
                    ? "bg-prussian text-white"
                    : "bg-border text-text-muted"
                )}
              >
                {step > s ? "✓" : s}
              </span>
              {s < 3 && <div className="w-8 sm:w-12 h-0.5 bg-border" />}
            </div>
          ))}
        </div>

        {/* STEP 1: Phone / Account Initiation */}
        {step === 1 && (
          <Card className="p-8 rounded-3xl border border-border shadow-elevated bg-surface space-y-6 animate-fade-in">
            <div className="space-y-1.5 text-center">
              <Badge variant="saffron" className="text-xs font-bold mx-auto">
                Step 1 of 3
              </Badge>
              <h1 className="text-2xl font-heading font-extrabold text-prussian">
                Create Your DHANDHA Account
              </h1>
              <p className="text-xs text-text-secondary">
                One universal account for food discovery, hiring, and culinary careers.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Mobile Number
                </label>
                <div className="flex rounded-2xl border border-border bg-surface overflow-hidden focus-within:ring-2 focus-within:ring-saffron shadow-xs">
                  <div className="flex items-center gap-1.5 px-3.5 bg-almond-900/60 border-r border-border text-xs font-bold text-prussian shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98765 43210"
                    className="flex-1 h-12 px-3.5 text-sm font-semibold tracking-wide text-prussian placeholder:text-text-muted focus:outline-none"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={phone.length < 10}
                className="w-full h-12 font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 2: Basic Profile */}
        {step === 2 && (
          <Card className="p-8 rounded-3xl border border-border shadow-elevated bg-surface space-y-6 animate-fade-in">
            <div className="space-y-1.5 text-center">
              <Badge variant="saffron" className="text-xs font-bold mx-auto">
                Step 2 of 3
              </Badge>
              <h1 className="text-2xl font-heading font-extrabold text-prussian">
                Tell Us About Yourself
              </h1>
              <p className="text-xs text-text-secondary">
                Your profile helps personalize cooks, food, and opportunities near you.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full h-11 px-3.5 rounded-xl border border-border bg-almond-900/30 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya@example.com"
                  className="w-full h-11 px-3.5 rounded-xl border border-border bg-almond-900/30 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Current City *
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

              <Button
                onClick={() => setStep(3)}
                disabled={!fullName.trim()}
                className="w-full h-12 font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm gap-2"
              >
                <span>Continue to Interests</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 3: Capability & Interest Customization */}
        {step === 3 && (
          <Card className="p-8 rounded-3xl border border-border shadow-elevated bg-surface space-y-6 animate-fade-in">
            <div className="space-y-1.5 text-center">
              <Badge variant="saffron" className="text-xs font-bold mx-auto">
                Step 3 of 3
              </Badge>
              <h1 className="text-2xl font-heading font-extrabold text-prussian">
                What brings you to DHANDHA?
              </h1>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                Select everything you&apos;re interested in. You can always switch or unlock more capabilities later.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {interestOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedInterests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id)}
                    className={cn(
                      "p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3",
                      isSelected
                        ? "border-saffron bg-saffron-subtle/50 text-saffron-dark ring-2 ring-saffron/20 shadow-xs"
                        : "border-border bg-almond-900/20 hover:bg-almond-900/60 text-prussian"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                        isSelected ? "bg-saffron text-white" : "bg-almond-800 text-prussian"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs block truncate">{opt.label}</span>
                      <span className="text-[10px] text-text-secondary block truncate mt-0.5">
                        {opt.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleComplete}
                className="text-xs font-semibold text-text-secondary hover:text-prussian underline order-2 sm:order-1"
              >
                Skip for now
              </button>
              <Button variant="secondary"
                onClick={handleComplete}
                className="w-full sm:w-auto h-12 rounded-2xl px-8 text-sm order-1 sm:order-2"
              >
                Complete Setup & Go to Marketplace
              </Button>
            </div>
          </Card>
        )}
      </main>

      <footer className="text-xs text-text-muted text-center">
        DHANDHA — Every Cook. Every Kitchen. Every Opportunity.
      </footer>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <ToastProvider>
      <RegisterFlow />
    </ToastProvider>
  );
}
