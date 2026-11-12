"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck,
  Building2,
  ChefHat,
  Store,
  DollarSign,
  TrendingUp,
  Settings,
  AlertTriangle,
  Eye,
  Sliders,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [activeQueue, setActiveQueue] = useState<"COOKS" | "RESTAURANTS" | "FOOD_PROVIDERS">("COOKS");

  // Configurable platform commission state
  const [cookCommission, setCookCommission] = useState("5");
  const [chefCommission, setChefCommission] = useState("8");
  const [foodCommission, setFoodCommission] = useState("10");

  const [verificationItems, setVerificationItems] = useState([
    {
      id: "v1",
      name: "Rameshwar Prasad",
      type: "COOK",
      docType: "Aadhaar + Delhi Police Verification Certificate",
      submittedDate: "2 hours ago",
      status: "PENDING",
      city: "Delhi NCR",
    },
    {
      id: "v2",
      name: "The Yellow Chilli Kitchen",
      type: "RESTAURANT",
      docType: "FSSAI License #10019011002341 + GSTIN Certificate",
      submittedDate: "5 hours ago",
      status: "PENDING",
      city: "Bengaluru",
    },
    {
      id: "v3",
      name: "Kavita's Tiffin Express",
      type: "FOOD_PROVIDER",
      docType: "FSSAI Food Business Registration",
      submittedDate: "1 day ago",
      status: "PENDING",
      city: "Mumbai",
    },
  ]);

  const handleApprove = (id: string) => {
    setVerificationItems(
      verificationItems.map((item) =>
        item.id === id ? { ...item, status: "APPROVED" } : item
      )
    );
  };

  const handleReject = (id: string) => {
    setVerificationItems(
      verificationItems.map((item) =>
        item.id === id ? { ...item, status: "REJECTED" } : item
      )
    );
  };

  return (
    <MainLayout>
      {/* Admin Header */}
      <div className="band-dark bg-noise relative overflow-hidden text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge variant="saffron" className="text-xs font-bold">
            Administrative Operations
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight">
            DHANDHA Platform Governance & Verification
          </h1>
          <p className="text-xs sm:text-sm text-almond-500 max-w-xl">
            Audit compliance, verify FSSAI/Govt documents, review disputed jobs, and configure
            marketplace take-rates.
          </p>

          {/* Quick Platform Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Pending Verifications</span>
              <span className="font-heading font-extrabold text-xl text-saffron">
                3 Queue Items
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Monthly GMV</span>
              <span className="font-heading font-extrabold text-xl text-white">
                {formatCurrency(1480000)}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Platform Revenue</span>
              <span className="font-heading font-extrabold text-xl text-success">
                {formatCurrency(118400)}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-almond-600 block">Compliance Rate</span>
              <span className="font-heading font-extrabold text-xl text-white">
                99.4%
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Area: Verification Queue (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-prussian">
                    Identity & Compliance Review Queue
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Review submitted documents before activating commercial capabilities
                  </p>
                </div>
                <Badge variant="outline" className="text-xs font-bold">
                  Live Queue
                </Badge>
              </div>

              <div className="space-y-4">
                {verificationItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-border bg-almond-900/20 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={item.type === "RESTAURANT" ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {item.type}
                          </Badge>
                          <span className="text-xs text-text-muted">
                            Submitted {item.submittedDate}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-prussian">
                          {item.name}
                        </h3>
                        <span className="text-xs text-text-secondary flex items-center gap-1">
                          <span>City: {item.city}</span>
                        </span>
                      </div>

                      <Badge
                        variant={
                          item.status === "APPROVED"
                            ? "success"
                            : item.status === "REJECTED"
                            ? "danger"
                            : "warning"
                        }
                        className="text-xs font-bold"
                      >
                        {item.status}
                      </Badge>
                    </div>

                    <div className="p-3 rounded-xl bg-surface border border-border text-xs space-y-1">
                      <span className="text-text-muted block font-semibold">
                        Submitted Document(s):
                      </span>
                      <span className="font-bold text-prussian flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-saffron" />
                        <span>{item.docType}</span>
                      </span>
                    </div>

                    {item.status === "PENDING" && (
                      <div className="pt-2 flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(item.id)}
                          className="text-danger hover:bg-danger-light hover:text-danger rounded-xl text-xs font-bold"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          <span>Reject</span>
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(item.id)}
                          className="bg-success hover:bg-green-700 text-white rounded-xl text-xs font-bold"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          <span>Approve & Grant Capability</span>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Configurable Commission Engine (Prompt Section 17) (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-saffron" />
                <h3 className="font-heading font-bold text-base text-prussian">
                  Commission Engine
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Configure platform take-rates by vertical without redeploying code.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-prussian block">
                    Household Cook Bookings (%)
                  </label>
                  <input
                    type="number"
                    value={cookCommission}
                    onChange={(e) => setCookCommission(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-almond-900/30 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-prussian block">
                    Chef Services Commission (%)
                  </label>
                  <input
                    type="number"
                    value={chefCommission}
                    onChange={(e) => setChefCommission(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-almond-900/30 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-prussian block">
                    Food Marketplace Take-Rate (%)
                  </label>
                  <input
                    type="number"
                    value={foodCommission}
                    onChange={(e) => setFoodCommission(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-almond-900/30 text-xs font-bold"
                  />
                </div>

                <Button variant="secondary" className="w-full rounded-xl text-xs font-bold mt-2">
                  Save Platform Rates
                </Button>
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-3">
              <h3 className="font-heading font-bold text-base text-prussian">
                Audit Trail Notice
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Every administrative action, capability grant, and document verification is cryptographically signed and logged for Indian regulatory compliance.
              </p>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
