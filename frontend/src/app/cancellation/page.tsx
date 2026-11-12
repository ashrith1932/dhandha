import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export default function CancellationPage() {
  return (
    <MainLayout>
      <div className="bg-prussian text-white py-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <Badge variant="saffron" className="text-xs font-bold">
            Customer Assurance
          </Badge>
          <h1 className="text-3xl font-heading font-extrabold">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-almond-500">Transparent guidelines for bookings and food orders</p>
        </div>
      </div>

      <SectionContainer className="pt-8 max-w-4xl">
        <div className="bg-surface p-8 rounded-3xl border border-border shadow-xs space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              1. Household Cook Replacement Guarantee
            </h2>
            <p>
              If a household cook is unable to attend or fails to meet dietary expectations
              within the initial 3-day trial period, DHANDHA provides an immediate replacement cook
              at zero additional platform surcharge, or a full refund of platform matchmaking fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              2. Executive Chef Bookings
            </h2>
            <p>
              Cancellations initiated more than 48 hours prior to the scheduled event time are
              eligible for a 100% refund. Cancellations within 24-48 hours are subject to a 20%
              ingredient procurement fee to compensate the chef.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-prussian">
              3. Food Marketplace Orders
            </h2>
            <p>
              Orders can be cancelled free of charge before the kitchen marks the item as &ldquo;In
              Preparation&rdquo;. Once culinary preparation commences, cancellations cannot be processed
              due to perishable food safety regulations.
            </p>
          </section>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
