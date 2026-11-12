"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  MapPin,
  Bell,
  Shield,
  Key,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleUsers } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const user = sampleUsers[0];
  const [activeTab, setActiveTab] = useState<"PROFILE" | "ADDRESSES" | "NOTIFICATIONS" | "CAPABILITIES">("PROFILE");

  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone || "");
  const [city, setCity] = useState("Delhi NCR");
  const [bio, setBio] = useState("Food enthusiast and tech entrepreneur looking for authentic home meals and private chef services.");

  const [addresses, setAddresses] = useState([
    {
      id: "addr1",
      label: "Home",
      line1: "Flat 402, Royal Palms, Sector 11",
      locality: "Dwarka",
      city: "Delhi",
      postalCode: "110075",
      isDefault: true,
    },
    {
      id: "addr2",
      label: "Office",
      line1: "Building 10B, DLF Cyber City",
      locality: "Cyber Hub",
      city: "Gurugram",
      postalCode: "122002",
      isDefault: false,
    },
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <MainLayout>
      <div className="band-dark bg-noise relative overflow-hidden text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <Badge variant="saffron" className="text-xs font-bold">
            Account Preferences
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Settings & Universal Profile
          </h1>
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-1 bg-surface p-3 rounded-3xl border border-border h-fit">
            <button
              type="button"
              onClick={() => setActiveTab("PROFILE")}
              className={cn(
                "w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer",
                activeTab === "PROFILE"
                  ? "bg-prussian text-white shadow-xs"
                  : "text-text-secondary hover:bg-almond-900/50 hover:text-prussian"
              )}
            >
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ADDRESSES")}
              className={cn(
                "w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer",
                activeTab === "ADDRESSES"
                  ? "bg-prussian text-white shadow-xs"
                  : "text-text-secondary hover:bg-almond-900/50 hover:text-prussian"
              )}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery & Service Addresses</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("CAPABILITIES")}
              className={cn(
                "w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer",
                activeTab === "CAPABILITIES"
                  ? "bg-prussian text-white shadow-xs"
                  : "text-text-secondary hover:bg-almond-900/50 hover:text-prussian"
              )}
            >
              <Shield className="w-4 h-4" />
              <span>Universal Capabilities</span>
            </button>
          </aside>

          {/* Settings Tab Content (9 cols) */}
          <main className="lg:col-span-9">
            {activeTab === "PROFILE" && (
              <Card className="p-6 sm:p-8 rounded-3xl border border-border bg-surface shadow-xs space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-xl text-prussian">
                    Personal Details
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Manage your identity across the DHANDHA marketplace
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <Avatar className="w-16 h-16 border-2 border-saffron">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <span className="font-bold text-sm text-prussian block">
                        Profile Photo
                      </span>
                      <Button type="button" variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-border bg-almond-900/30 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                        Mobile Number (Verified)
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={phone}
                        className="w-full h-11 px-3 rounded-xl border border-border bg-almond-800 text-xs font-bold text-text-muted cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-prussian uppercase tracking-wider block">
                      Bio / Short Note
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-almond-900/30 text-xs leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {savedSuccess ? (
                      <span className="text-xs font-bold text-success flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Changes Saved Successfully!</span>
                      </span>
                    ) : (
                      <div />
                    )}
                    <Button type="submit" className="rounded-xl text-xs font-bold px-6">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {activeTab === "ADDRESSES" && (
              <Card className="p-6 sm:p-8 rounded-3xl border border-border bg-surface shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading font-bold text-xl text-prussian">
                      Saved Addresses
                    </h2>
                    <p className="text-xs text-text-secondary">
                      Used for food delivery and home cook visits (Private coordinates)
                    </p>
                  </div>
                  <Button size="sm" className="rounded-xl text-xs font-bold gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-2xl border border-border bg-almond-900/20 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-prussian text-sm">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <Badge variant="saffron" className="text-[10px]">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-text-secondary">{addr.line1}</p>
                        <p className="text-text-muted">
                          {addr.locality}, {addr.city} — {addr.postalCode}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setAddresses((prev) => prev.filter((a) => a.id !== addr.id));
                          toast("Address removed", { description: `${addr.label} address was deleted.`, variant: "info" });
                        }}
                        className="text-text-muted hover:text-danger p-1 rounded-lg transition-colors"
                        aria-label={`Delete ${addr.label} address`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === "CAPABILITIES" && (
              <Card className="p-6 sm:p-8 rounded-3xl border border-border bg-surface shadow-xs space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-xl text-prussian">
                    Active Universal Capabilities
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Your single account holds these operational privileges across the marketplace
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { cap: "ORDER_FOOD", label: "Order Food & Tiffins", active: true },
                    { cap: "BOOK_COOK", label: "Book Household Cooks", active: true },
                    { cap: "BOOK_CHEF", label: "Book Executive Chefs", active: true },
                    { cap: "POST_GENERAL_JOB", label: "Post Cook Needs", active: true },
                    { cap: "CREATE_COOK_PROFILE", label: "Work as Professional Cook", active: true },
                    { cap: "POST_RESTAURANT_JOB", label: "Restaurant Commercial Hiring", active: true },
                    { cap: "LIST_FOOD", label: "Sell Homemade Food (FSSAI)", active: false },
                  ].map((c) => (
                    <div
                      key={c.cap}
                      className="p-3.5 rounded-2xl border border-border bg-almond-900/20 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-prussian">{c.label}</span>
                      <Badge variant={c.active ? "success" : "outline"} className="text-[10px]">
                        {c.active ? "Enabled" : "Locked (Verify)"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </main>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
