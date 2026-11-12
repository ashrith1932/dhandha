"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  PlusCircle,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Eye,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { sampleRestaurants, sampleJobs } from "@/lib/sample-data";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function RestaurantDashboardPage() {
  const restaurant = sampleRestaurants[0]; // Spice Junction
  const restaurantJobs = sampleJobs.filter((j) => j.jobType === "RESTAURANT");

  return (
    <MainLayout>
      {/* Restaurant Header */}
      <div className="bg-prussian text-white py-8 sm:py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-prussian font-heading font-extrabold text-2xl flex items-center justify-center shadow-lg">
                SJ
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold">
                    {restaurant.name}
                  </h1>
                  <Badge variant="success" className="text-xs">
                    FSSAI Verified
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-almond-500">
                  Connaught Place, New Delhi • Multi-Cuisine Restaurant
                </p>
              </div>
            </div>

            <Link href="/jobs/post?type=RESTAURANT">
              <Button size="lg" className="bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl shadow-lg gap-2 text-sm">
                <PlusCircle className="w-4 h-4" />
                <span>Post Commercial Job</span>
              </Button>
            </Link>
          </div>

          {/* Restaurant Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Active Openings</span>
              <span className="font-heading font-extrabold text-xl text-white">
                {restaurantJobs.length} Positions
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Total Applications</span>
              <span className="font-heading font-extrabold text-xl text-saffron">
                42 Chefs
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">FSSAI Status</span>
              <span className="font-heading font-extrabold text-xl text-success">
                Active & Clear
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Kitchen Staff Size</span>
              <span className="font-heading font-extrabold text-xl text-white">
                14 Members
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Area: Active Jobs (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-prussian">
                    Live Restaurant Vacancies
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Review and interview culinary professionals who applied
                  </p>
                </div>
                <Link href="/jobs/post?type=RESTAURANT">
                  <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold">
                    + Post Another Position
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {restaurantJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-2xl border border-border bg-surface hover:border-prussian transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="text-[10px]">
                            {job.employmentType}
                          </Badge>
                          <span className="text-xs text-text-muted">
                            Posted {timeAgo(job.createdAt)}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-prussian">
                          {job.title}
                        </h3>
                        <span className="text-xs text-text-secondary">
                          {job.vacancies} vacancies • {job.experienceRequired}+ yrs experience
                        </span>
                      </div>

                      <span className="font-heading font-bold text-sm text-prussian">
                        {formatCurrency(job.salaryMin || 25000)} – {formatCurrency(job.salaryMax || 35000)}/mo
                      </span>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="font-semibold text-success">
                        👥 {job.applicationsCount} Culinary Applicants Received
                      </span>
                      <Link href={`/jobs/${job.id}`}>
                        <Button size="sm" className="bg-prussian hover:bg-prussian-600 text-white rounded-xl text-xs font-bold">
                          Review Applicants Pipeline →
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Restaurant Sidebar: Verification & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-prussian">
                Business Compliance Center
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-success-light/40 border border-success/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-prussian">FSSAI License</span>
                    <Badge variant="success" className="text-[10px]">
                      Verified
                    </Badge>
                  </div>
                  <span className="text-text-muted block text-[11px]">
                    License #10020011000452 (Valid till 2027)
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-success-light/40 border border-success/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-prussian">GSTIN Verification</span>
                    <Badge variant="success" className="text-[10px]">
                      Active
                    </Badge>
                  </div>
                  <span className="text-text-muted block text-[11px]">
                    07AAACS1429B1Z8
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-almond-900/40 border border-border space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-prussian">Kitchen Health Audit</span>
                    <span className="text-saffron-dark font-semibold">Scheduled Dec 2024</span>
                  </div>
                  <span className="text-text-muted block text-[11px]">
                    Annual physical kitchen audit for DHANDHA seal
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-3">
              <h3 className="font-heading font-bold text-base text-prussian">
                Restaurant Privileges
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                As a verified business account, you have direct phone access to candidates, priority job posting badges, and automated candidate shortlisting.
              </p>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
