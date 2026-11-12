"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Filter,
  Building2,
  Home,
  CheckCircle2,
  Users,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { sampleJobs, popularCities } from "@/lib/sample-data";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const jobTypes = [
    { id: "ALL", label: "All Jobs" },
    { id: "HOUSEHOLD", label: "Household Cooks" },
    { id: "RESTAURANT", label: "Restaurant & Cloud Kitchens" },
    { id: "EVENT", label: "Events & Catering" },
  ];

  const filteredJobs = sampleJobs.filter((job) => {
    const matchesType = selectedType === "ALL" || job.jobType === selectedType;
    const matchesCity = selectedCity === "All" || job.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCity && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-prussian text-white py-10 sm:py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="saffron" className="text-xs font-bold">
                Kaam bhi. Khana bhi.
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
                Cooking & Kitchen Employment
              </h1>
              <p className="text-sm sm:text-base text-almond-500 max-w-xl">
                Find stable household cooking engagements or advance your career in top
                Indian restaurants, cafes, and catering businesses.
              </p>
            </div>

            <Link href="/jobs/post">
              <Button size="lg" className="bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl shadow-lg gap-2 text-sm">
                <PlusCircle className="w-4 h-4" />
                <span>Post a Job / Need</span>
              </Button>
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, cuisine or restaurant..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white text-prussian placeholder:text-text-muted text-sm font-medium shadow-elevated focus:outline-none focus:ring-2 focus:ring-saffron"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 sm:top-20 z-30 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {jobTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
                  selectedType === type.id
                    ? "bg-prussian text-white shadow-xs"
                    : "bg-almond-900/60 text-text-secondary hover:text-prussian hover:bg-almond-800"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="h-9 px-3 rounded-xl border border-border bg-almond-900/40 text-xs font-bold text-prussian focus:outline-none shrink-0"
          >
            <option value="All">All Cities</option>
            {popularCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="space-y-4 max-w-5xl mx-auto">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="p-6 border border-border hover:border-prussian hover:shadow-card-hover transition-all rounded-3xl bg-surface group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={job.jobType === "RESTAURANT" ? "default" : "secondary"}
                      className="text-[10px] font-bold"
                    >
                      {job.jobType === "RESTAURANT" ? "Commercial Kitchen" : "Household Need"}
                    </Badge>
                    <span className="text-xs text-text-muted">
                      Posted {timeAgo(job.createdAt)}
                    </span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs font-semibold text-success">
                      {job.applicationsCount} Applicants
                    </span>
                  </div>

                  <Link href={`/jobs/${job.id}`}>
                    <h2 className="text-lg sm:text-xl font-heading font-extrabold text-prussian group-hover:text-saffron-dark transition-colors">
                      {job.title}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                    {job.restaurant ? (
                      <span className="flex items-center gap-1 text-prussian">
                        <Building2 className="w-3.5 h-3.5 text-grape" />
                        {job.restaurant.name}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-prussian">
                        <Home className="w-3.5 h-3.5 text-saffron" />
                        Private Residence ({job.postedByUser?.fullName})
                      </span>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1 text-text-secondary">
                      <MapPin className="w-3.5 h-3.5 text-text-muted" />
                      {job.locality}, {job.city}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed pt-1">
                    {job.description}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 space-y-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                  <div>
                    <span className="text-[10px] text-text-muted block font-semibold">
                      Monthly Salary
                    </span>
                    <span className="font-heading font-extrabold text-lg text-prussian">
                      {formatCurrency(job.salaryMin || 15000)} – {formatCurrency(job.salaryMax || 25000)}
                    </span>
                  </div>

                  <Link href={`/jobs/${job.id}`} className="block">
                    <Button className="w-full sm:w-auto bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold px-6">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
