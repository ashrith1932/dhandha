"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Home,
  CheckCircle2,
  Users,
  ShieldCheck,
  ChevronRight,
  Send,
  AlertCircle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { sampleJobs } from "@/lib/sample-data";
import { formatCurrency, timeAgo } from "@/lib/utils";

function JobDetailContent() {
  const params = useParams();
  const jobId = params?.id as string;
  const job = sampleJobs.find((j) => j.id === jobId) || sampleJobs[0];

  const [coverMessage, setCoverMessage] = useState("");
  const [expectedSalary, setExpectedSalary] = useState(job.salaryMin?.toString() || "18000");
  const [applied, setApplied] = useState(false);

  return (
    <MainLayout>
      <div className="bg-surface border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-text-secondary">
            <Link href="/" className="hover:text-prussian">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <Link href="/jobs" className="hover:text-prussian">Jobs</Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <span className="font-semibold text-prussian">{job.title}</span>
          </nav>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Main Job Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={job.jobType === "RESTAURANT" ? "default" : "secondary"}>
                    {job.jobType === "RESTAURANT" ? "Commercial Job" : "Household Requirement"}
                  </Badge>
                  <span className="text-xs text-text-muted">
                    Posted {timeAgo(job.createdAt)}
                  </span>
                  <span className="text-xs text-text-muted">•</span>
                  <span className="text-xs text-success font-semibold">
                    {job.vacancies} {job.vacancies === 1 ? "Vacancy" : "Vacancies"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-prussian">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                  {job.restaurant ? (
                    <span className="font-semibold text-prussian flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-grape" />
                      {job.restaurant.name}
                    </span>
                  ) : (
                    <span className="font-semibold text-prussian flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-saffron" />
                      Family Residence
                    </span>
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    {job.locality}, {job.city}
                  </span>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-almond-900/40 border border-border text-xs">
                <div>
                  <span className="text-text-muted block">Employment</span>
                  <span className="font-bold text-prussian">{job.employmentType}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Experience Req.</span>
                  <span className="font-bold text-prussian">{job.experienceRequired}+ Years</span>
                </div>
                <div>
                  <span className="text-text-muted block">Working Hours</span>
                  <span className="font-bold text-prussian">{job.workingHours || "Flexible"}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base text-prussian">
                  Job Description & Requirements
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Employer / Hirer Trust Info */}
              <div className="p-4 rounded-2xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                    Posted By
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-heading font-bold text-sm text-prussian">
                      {job.restaurant?.name || job.postedByUser?.fullName}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-xs text-text-secondary">
                    Identity Verified Member on DHANDHA
                  </span>
                </div>
                <Badge variant="success" className="text-xs">
                  Active Hiring
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Apply Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-surface p-6 rounded-3xl border border-border shadow-elevated sticky top-24 space-y-6">
              <div>
                <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider block">
                  Offered Salary
                </span>
                <div className="font-heading font-extrabold text-2xl text-prussian">
                  {formatCurrency(job.salaryMin || 15000)} – {formatCurrency(job.salaryMax || 25000)}
                  <span className="text-xs font-normal text-text-secondary">
                    /{job.salaryPeriod?.toLowerCase() || "month"}
                  </span>
                </div>
              </div>

              {applied ? (
                <div className="p-4 rounded-2xl bg-success-light text-success text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <span className="font-bold text-sm block">Application Submitted!</span>
                  <p className="text-xs">
                    The employer has received your cook profile and will contact you directly on DHANDHA.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                      Expected Monthly Salary (₹)
                    </label>
                    <input
                      type="number"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-border bg-almond-900/30 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                      Short Note / Pitch to Hirer
                    </label>
                    <textarea
                      rows={3}
                      value={coverMessage}
                      onChange={(e) => setCoverMessage(e.target.value)}
                      placeholder="e.g. Experienced in North Indian food, available immediately..."
                      className="w-full p-3 rounded-xl border border-border bg-almond-900/30 text-xs focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  </div>

                  <Button
                    onClick={() => setApplied(true)}
                    className="w-full h-12 font-bold rounded-2xl shadow-lg shadow-saffron/20 text-sm gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </Button>

                  <p className="text-[11px] text-text-muted text-center">
                    Universal DHANDHA profile will be shared with the hirer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading Opportunity...</div>}>
      <JobDetailContent />
    </Suspense>
  );
}
