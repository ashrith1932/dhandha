"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  Crosshair,
  Check,
  ChevronDown,
  Building2,
  Navigation,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { popularCities } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

interface CitySelectorProps {
  currentCity?: string;
  onCityChange?: (city: string) => void;
  variant?: "header" | "button" | "pill";
}

const cityLandmarks: Record<string, string> = {
  Delhi: "India Gate & Red Fort",
  "Delhi NCR": "Capital Region",
  Gurugram: "Cyber Hub & DLF",
  Noida: "Sector Hub",
  Mumbai: "Gateway of India",
  Bengaluru: "Vidhana Soudha & Tech Parks",
  Hyderabad: "Charminar & HITEC City",
  Chennai: "Marina & Central",
  Kolkata: "Howrah & Park St",
  Pune: "Shaniwar Wada",
  Ahmedabad: "Sabarmati Ashram",
  Jaipur: "Hawa Mahal",
  Chandigarh: "Rock Garden",
  Lucknow: "Rumi Darwaza",
  Kochi: "Fort Kochi",
  Indore: "Sarafa & Rajwada",
};

export function CitySelector({
  currentCity = "Delhi NCR",
  onCityChange,
  variant = "header",
}: CitySelectorProps) {
  const [selectedCity, setSelectedCity] = useState(currentCity);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const filteredCities = popularCities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    onCityChange?.(city);
    setIsOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    // Simulate reverse geocoding
    setTimeout(() => {
      setIsLocating(false);
      handleSelect("Delhi NCR");
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {variant === "header" ? (
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-almond-800/60 border border-border/80 transition-all text-left text-xs sm:text-sm group focus:outline-none focus:ring-2 focus:ring-saffron"
            aria-label="Change city"
          >
            <div className="w-6 h-6 rounded-full bg-saffron-subtle flex items-center justify-center text-saffron shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-text-secondary leading-none">Location</span>
              <span className="font-semibold text-text-primary group-hover:text-saffron-dark transition-colors flex items-center gap-1">
                {selectedCity}
                <ChevronDown className="w-3 h-3 text-text-secondary transition-transform group-hover:translate-y-0.5" />
              </span>
            </div>
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border shadow-sm text-sm font-semibold hover:border-prussian transition-all"
          >
            <MapPin className="w-4 h-4 text-saffron" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md p-6 bg-surface rounded-3xl border-border">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-heading font-bold text-prussian">
            Select Your City
          </DialogTitle>
          <p className="text-xs text-text-secondary">
            Discover local cooks, chefs, homemade meals, and jobs near you
          </p>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mt-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, area or locality..."
            className="pl-10 h-11 bg-almond-900/60 border-border rounded-xl text-sm placeholder:text-text-muted"
          />
        </div>

        {/* Use Current Location Button */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="flex items-center gap-3 w-full p-3.5 rounded-xl border border-dashed border-saffron/60 bg-saffron-subtle/50 text-saffron-dark hover:bg-saffron-subtle transition-all text-sm font-semibold mt-2 group"
        >
          <div className="w-7 h-7 rounded-lg bg-saffron text-white flex items-center justify-center shrink-0">
            <Crosshair className={cn("w-4 h-4", isLocating && "animate-spin")} />
          </div>
          <div className="flex flex-col text-left">
            <span>{isLocating ? "Detecting location..." : "Use Current Location"}</span>
            <span className="text-[11px] font-normal text-text-secondary">
              GPS permission required for auto-detect
            </span>
          </div>
          <Navigation className="w-4 h-4 ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Popular Cities Grid - District style */}
        <div className="mt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-2.5">
            Popular Cities
          </span>
          <div className="grid grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
            {filteredCities.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all group relative",
                    isSelected
                      ? "border-saffron bg-saffron-subtle/40 text-saffron-dark shadow-sm"
                      : "border-border hover:border-prussian-600/40 bg-surface hover:bg-almond-900/50 text-text-primary"
                  )}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-saffron text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl mb-1.5 flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-saffron text-white"
                        : "bg-almond-800/80 text-prussian group-hover:bg-prussian group-hover:text-white"
                    )}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold leading-tight line-clamp-1">{city}</span>
                  <span className="text-[9px] text-text-secondary line-clamp-1 mt-0.5">
                    {cityLandmarks[city] || "Urban Hub"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
