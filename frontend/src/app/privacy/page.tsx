import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="band-dark bg-noise relative overflow-hidden text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <Badge variant="saffron" className="text-xs font-bold">
            Data Protection
          </Badge>
          <h1 className="text-3xl font-heading font-extrabold">Privacy Policy</h1>
          <p className="text-xs text-almond-500">In compliance with Digital Personal Data Protection Act (DPDP)</p>
        </div>
      </div>

      <SectionContainer className="pt-8 max-w-4xl">
        <div className="bg-surface p-8 rounded-3xl border border-border shadow-xs space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              1. Address & Geo-location Privacy
            </h2>
            <p>
              In accordance with DHANDHA product security guidelines, precise GPS coordinates
              and personal household residential addresses are strictly encrypted and masked.
              Exact address lines are disclosed only to the confirmed cook or delivery partner
              upon a verified, confirmed transaction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              2. Document Storage & KYC Cryptography
            </h2>
            <p>
              Government identification numbers (including Aadhaar, PAN, FSSAI numbers) are
              never stored as plain text. All identity credentials undergo field-level
              encryption and are accessible strictly by authorized administrative audit personnel.
            </p>
          </section>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
