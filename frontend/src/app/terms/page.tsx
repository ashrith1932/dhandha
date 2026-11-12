import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="bg-prussian text-white py-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <Badge variant="saffron" className="text-xs font-bold">
            Legal & Compliance
          </Badge>
          <h1 className="text-3xl font-heading font-extrabold">Terms & Conditions</h1>
          <p className="text-xs text-almond-500">Last updated: November 2024</p>
        </div>
      </div>

      <SectionContainer className="pt-8 max-w-4xl">
        <div className="bg-surface p-8 rounded-3xl border border-border shadow-xs space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              1. Platform Nature & Unified Marketplace
            </h2>
            <p>
              DHANDHA operates as a digital communications and service matchmaking marketplace
              connecting consumers, independent domestic cooks, professional event chefs,
              food providers, and commercial food businesses in India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              2. Capability System & Verification Rules
            </h2>
            <p>
              All registered users possess a Universal Account. Operational privileges (such
              as listing food items or posting restaurant vacancies) are granted subject to
              satisfying statutory compliance checks, including valid Food Safety and
              Standards Authority of India (FSSAI) registrations and GSTIN credentials where applicable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              3. Payments & Fair Remuneration
            </h2>
            <p>
              Payments processed via DHANDHA are subject to transparent platform service charges.
              All monetary values are denominated and accounted in Indian Rupees (INR).
            </p>
          </section>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
