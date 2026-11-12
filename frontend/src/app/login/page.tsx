"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  Flame,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThreeDElement } from "@/components/common/three-d-element";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background">
      {/* Left Column: Form Area (District Style) */}
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-12 xl:p-16">
        <div>
          <Logo size="md" showTagline={true} />
        </div>

        <div className="max-w-md w-full mx-auto my-12 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-prussian">
              {otpSent ? "Verify your phone" : "Welcome to DHANDHA"}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              {otpSent
                ? `Enter the 6-digit OTP sent to +91 ${phoneNumber}`
                : "Enter your mobile number to sign in or create an account"}
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
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
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="98765 43210"
                    className="flex-1 h-12 px-3.5 text-sm font-semibold tracking-wide text-prussian placeholder:text-text-muted focus:outline-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || phoneNumber.length < 10}
                className="w-full h-12 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm"
              >
                {isLoading ? "Sending OTP..." : "Continue with OTP"}
              </Button>

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <span className="relative px-3 bg-background text-[11px] font-bold text-text-muted uppercase">
                  or
                </span>
              </div>

              {/* Real Google OAuth Button */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full h-12 rounded-2xl border border-border bg-surface hover:bg-almond-900/40 text-prussian font-bold text-xs flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                  Enter 6-digit OTP
                </label>
                <div className="flex gap-2 justify-between">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={otp[idx]}
                      onChange={(e) => {
                        const val = e.target.value;
                        const next = [...otp];
                        next[idx] = val;
                        setOtp(next);
                      }}
                      className="w-12 h-14 rounded-xl border border-border bg-surface text-center font-heading font-extrabold text-lg text-prussian focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm"
              >
                {isLoading ? "Verifying..." : "Verify & Sign In"}
              </Button>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-text-secondary hover:text-prussian underline"
                >
                  Change phone number
                </button>
                <button
                  type="button"
                  className="text-saffron-dark font-bold hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          <p className="text-[11px] text-text-muted text-center leading-relaxed">
            By continuing, you agree to DHANDHA&apos;s{" "}
            <Link href="/terms" className="underline hover:text-prussian">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-prussian">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="text-xs text-text-muted text-center">
          DHANDHA — India&apos;s Cooking Services Marketplace
        </div>
      </div>

      {/* Right Column: 3D Visual & Brand Pitch */}
      <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-prussian via-ink-black to-prussian p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <Badge variant="saffron" className="text-xs font-bold">
            One Account • Endless Kitchen Opportunities
          </Badge>
          <span className="text-xs text-almond-500 font-semibold">
            Kaam bhi. Khana bhi.
          </span>
        </div>

        <div className="my-auto py-10 relative z-10 flex flex-col items-center">
          <div className="w-80 h-80 mb-6">
            <ThreeDElement
              variant="hero"
              badgeText="Universal Marketplace"
              className="w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-center max-w-sm">
            Cooks, Chefs, Foodies and Kitchens — All Connected.
          </h2>
          <p className="text-xs text-almond-500 text-center max-w-xs mt-2">
            One single login allows you to hire a cook, order homemade tiffins, or apply for
            cooking jobs across India.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-almond-600 border-t border-white/10 pt-4">
          <span>100% Verified Community</span>
          <span>FSSAI Compliant Platform</span>
        </div>
      </div>
    </div>
  );
}
