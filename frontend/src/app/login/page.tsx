"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";

function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 500);
  };

  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = window.setInterval(() => setResendCooldown((v) => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(t);
  }, [resendCooldown]);

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    toast("Code resent", { description: `A fresh OTP was sent to +91 ${phoneNumber}.` });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast("Namaste, Priya!", { description: "Welcome back to your kitchen dashboard." });
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-black/40 flex items-center justify-center p-0 sm:p-4 font-sans">
      {/* Modal / Card Container matching media_1794460711922_654d5bf0.png */}
      <div className="w-full max-w-md bg-white rounded-none sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col min-h-screen sm:min-h-0 border border-gray-100">
        {/* Top Hero Banner (Purple/Violet Geometric Gradient) */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-br from-[#232B4E] via-[#161B33] to-[#0D0C1D] p-8 flex flex-col items-center justify-center text-center text-white overflow-hidden">
          {/* Ambient ember glow */}
          <div aria-hidden className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(242,140,40,0.4),transparent_70%)] blur-3xl" />
          <div aria-hidden className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(228,90,55,0.35),transparent_70%)] blur-3xl" />
          {/* Subtle geometric polygon background lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="none">
              <polygon points="0,0 200,300 400,0" fill="white" />
              <polygon points="400,300 200,0 0,300" fill="white" opacity="0.4" />
            </svg>
          </div>

          {/* Logo: dhandha BY DHANDHA */}
          <div className="relative z-10 flex flex-col items-center space-y-1">
            <span className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-white drop-shadow-md">
              dhandha
            </span>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#FFB03A]/90 uppercase">
              BY DHANDHA
            </span>
          </div>

          {/* Tagline matching reference */}
          <p className="relative z-10 text-xs sm:text-sm text-almond/90 font-medium max-w-xs mt-4 leading-relaxed">
            Experience the best in Home Cooks, Private Chefs, and Homemade Kitchens.
          </p>
        </div>

        {/* Bottom Form Sheet matching media_1794460711922_654d5bf0.png */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-6">
            {/* Header Text */}
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-ink-black tracking-tight">
                {otpSent ? "Enter 6-digit OTP" : "Enter your mobile number"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {otpSent
                  ? `We've sent an SMS verification code to +91 ${phoneNumber}`
                  : "If you don't have an account yet, we'll create one for you"}
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleContinue} className="space-y-4">
                {/* Phone Input with +91 Country selector */}
                <div className="flex items-center rounded-2xl border border-gray-200 focus-within:border-saffron focus-within:ring-2 focus-within:ring-saffron/25 bg-white overflow-hidden transition-all h-13 shadow-xs">
                  {/* Flag & Dial code */}
                  <div className="flex items-center gap-1.5 px-3.5 border-r border-gray-200 text-sm font-semibold text-ink-black shrink-0 bg-gray-50/50 h-full">
                    <span>🇮🇳</span>
                    <span>+91</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>

                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter mobile number"
                    className="flex-1 h-full px-4 text-sm sm:text-base font-semibold text-ink-black placeholder:text-gray-400 focus:outline-none"
                  />
                </div>

                {/* Continue Dark Pill Button matching media_1794460711922_654d5bf0.png */}
                <Button variant="dark"
                  type="submit"
                  disabled={isLoading || phoneNumber.length < 10}
                  className="w-full h-12 sm:h-13 rounded-2xl text-sm"
                >
                  {isLoading ? "Please wait..." : "Continue"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {/* OTP Digits */}
                <div className="grid grid-cols-6 gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const newOtp = [...otp];
                        newOtp[index] = val;
                        setOtp(newOtp);
                        if (val && index < 5) {
                          document.getElementById(`otp-${index + 1}`)?.focus();
                        }
                      }}
                      className="w-full h-12 text-center text-lg font-bold rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/25 bg-gray-50 focus:bg-white focus:outline-none"
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || otp.join("").length < 6}
                  className="w-full h-12 sm:h-13 bg-gradient-to-r from-[#F28C28] to-[#E45A37] hover:from-[#FFB03A] hover:to-[#F28C28] text-white font-bold rounded-2xl text-sm transition-all shadow-md cursor-pointer"
                >
                  {isLoading ? "Verifying..." : "Verify & Sign In"}
                </Button>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-saffron-dark font-bold hover:underline"
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className="text-gray-500 hover:text-ink-black disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Terms Notice matching media_1794460711922_654d5bf0.png */}
          <div className="text-center pt-4">
            <p className="text-[11px] text-gray-400">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-gray-600 underline font-medium hover:text-ink-black">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-gray-600 underline font-medium hover:text-ink-black">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <ToastProvider>
      <LoginForm />
    </ToastProvider>
  );
}
