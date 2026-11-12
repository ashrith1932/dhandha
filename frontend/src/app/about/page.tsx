import React from "react";
import Link from "next/link";
import {
  Flame,
  ShieldCheck,
  Heart,
  Users,
  Award,
  Sparkles,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="bg-prussian text-white py-12 sm:py-20 border-b border-white/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <Badge variant="saffron" className="text-xs font-bold mx-auto">
            Our Mission & Story
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            Kaam bhi. Khana bhi.
          </h1>
          <p className="text-sm sm:text-lg text-almond-500 max-w-2xl mx-auto leading-relaxed">
            DHANDHA is building India&apos;s unified culinary marketplace. Bringing dignity,
            fair wages, and transparent opportunities to cooks while connecting households with
            authentic food and trusted kitchen talent.
          </p>
        </div>
      </div>

      <SectionContainer className="pt-12 max-w-4xl">
        <div className="space-y-12">
          {/* Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-surface border border-border shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-saffron-subtle text-saffron-dark flex items-center justify-center font-bold">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-prussian">
                Dignity for Cooks
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Empowering home cooks and domestic kitchen workers with verifiable digital
                profiles, fair contracts, and predictable incomes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface border border-border shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-prussian text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-saffron" />
              </div>
              <h3 className="font-heading font-bold text-lg text-prussian">
                Safety & Trust
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Every cook and business account undergoes strict Aadhaar, police, or FSSAI
                regulatory screening before engagement.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface border border-border shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-almond-800 text-prussian flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 text-danger" />
              </div>
              <h3 className="font-heading font-bold text-lg text-prussian">
                Culinary Heritage
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Celebrating regional Indian cuisines from Gujarati and Chettinad thalis to
                authentic Hyderabadi dum biryani and street delicacies.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact" className="p-8 rounded-3xl bg-surface border border-border shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-xl text-prussian">
              Contact the DHANDHA Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-text-secondary pt-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-saffron" />
                <span>New Delhi & Bengaluru, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-saffron" />
                <span>support@dhandha.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-saffron" />
                <span>+91 11 4000 8800</span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
