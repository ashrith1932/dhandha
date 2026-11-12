"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  Crosshair,
  Check,
  ChevronDown,
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

function CityLandmarkIcon({ city }: { city: string }) {
  const strokeColor = "#474973"; // Dusty grape / Prussian tone
  switch (city) {
    case "Abu Dhabi":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 52h44M20 52V28m24 24V28M16 28h8v24h-8zm24 0h8v24h-8z" />
          <path d="M32 14c-6 5-8 12-8 20h16c0-8-2-15-8-20z" />
          <path d="M32 10v4M12 28l4-12 4 12M44 28l4-12 4 12" />
          <path d="M26 42a6 6 0 0 1 12 0" />
        </svg>
      );
    case "Ahmedabad":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 52h48M12 52V30h40v22" />
          <path d="M16 52v-12a4 4 0 0 1 8 0v12M28 52v-16a4 4 0 0 1 8 0v16M40 52v-12a4 4 0 0 1 8 0v12" />
          <path d="M12 30l4-8h8l4 8M36 30l4-8h8l4 8" />
          <path d="M14 22V14h4v8M46 22V14h4v8" />
        </svg>
      );
    case "Bengaluru":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 52h44M14 52V34h36v18" />
          <path d="M22 34V24h20v10" />
          <path d="M32 12c-4 3-6 8-6 12h12c0-4-2-9-6-12z" />
          <path d="M32 8v4M18 52V38m6 14V38m8 14V38m8 14V38m6 14V38" />
          <path d="M12 34l3-6h4l3 6M42 34l3-6h4l3 6" />
        </svg>
      );
    case "Chandigarh":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 52h32M24 52V42h16v10" />
          <path d="M32 42V32" />
          <path d="M22 30c-4-4-2-12 4-14 2 2 4 4 6 8 2-6 8-10 12-6 2 4 0 8-4 10 4 0 8 4 6 8-2 3-8 4-14 4-4 0-8-4-10-10z" />
        </svg>
      );
    case "Chennai":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 52h40M18 52V44h28v8" />
          <path d="M20 44l2-8h20l2 8" />
          <path d="M23 36l2-8h14l2 8" />
          <path d="M26 28l2-8h8l2 8" />
          <path d="M29 20V12h6v8" />
          <path d="M32 8v4" />
          <path d="M28 52v-6a4 4 0 0 1 8 0v6" />
        </svg>
      );
    case "Delhi NCR":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 52h40M16 52V20h32v32" />
          <path d="M14 20h36v-4H14z" />
          <path d="M22 16V10h20v6" />
          <path d="M24 52V36a8 8 0 0 1 16 0v16" />
          <path d="M18 30h4M42 30h4M18 42h4M42 42h4" />
        </svg>
      );
    case "Dubai":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 52h32M32 8v8M28 52V38m8 14V38" />
          <path d="M26 38l6-16 6 16" />
          <path d="M30 22l2-8 2 8" />
          <path d="M22 52l6-8m14 8l-6-8" />
        </svg>
      );
    case "Goa":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 52c8-2 16 2 22 0s14-2 22 0" />
          <path d="M14 56c8-2 16 2 22 0s14-2 20 0" />
          <path d="M26 50c2-12 8-22 16-28" />
          <path d="M42 22c-6-4-14-2-18 4m18-4c-2-8 4-12 10-10m-10 10c6 0 12 4 14 10m-14-10c-2 6-2 12 2 16" />
        </svg>
      );
    case "Hyderabad":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 52h44M18 52V28h28v24" />
          <path d="M24 52V38a8 8 0 0 1 16 0v14" />
          <path d="M14 52V18h4v34M46 52V18h4v34" />
          <path d="M12 18l4-8 4 8M44 18l4-8 4 8" />
          <path d="M22 28V20h20v8" />
          <path d="M32 16a4 4 0 0 1 4 4h-8a4 4 0 0 1 4-4z" />
        </svg>
      );
    case "Kolkata":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 50h48M12 50V30l20-14 20 14v20" />
          <path d="M20 50V36m24 14V36" />
          <path d="M12 30l16 10m24-10L36 40" />
          <path d="M28 40l4-24 4 24" />
        </svg>
      );
    case "Mumbai":
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 52h44M14 52V26h36v26" />
          <path d="M24 52V34a8 8 0 0 1 16 0v18" />
          <path d="M12 26l3-6h6l3 6M40 26l3-6h6l3 6" />
          <path d="M22 26V20h20v6" />
          <path d="M32 14a6 6 0 0 1 6 6H26a6 6 0 0 1 6-6z" />
          <path d="M18 52v-8a2 2 0 0 1 4 0v8M42 52v-8a2 2 0 0 1 4 0v8" />
        </svg>
      );
    case "Pune":
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 52h44M14 52V26h36v26" />
          <path d="M24 52V36a8 8 0 0 1 16 0v16" />
          <path d="M12 26h40V22H12z" />
          <path d="M14 22l2-6h6l2 6M38 22l2-6h6l2 6" />
          <path d="M18 36h4M42 36h4M18 44h4M42 44h4" />
        </svg>
      );
  }
}

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
    setTimeout(() => {
      setIsLocating(false);
      handleSelect("Gurugram");
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {variant === "header" ? (
          <button
            type="button"
            className="flex items-center gap-1.5 text-left group focus:outline-none transition-all py-1 px-1 rounded-lg hover:bg-black/5"
            aria-label="Change location"
          >
            <div className="w-7 h-7 rounded-full bg-purple-50 text-indigo-700 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-heading font-bold text-xs sm:text-sm text-prussian flex items-center gap-0.5 group-hover:text-indigo-700 transition-colors">
                {selectedCity}
                <ChevronDown className="w-3 h-3 text-gray-400 transition-transform group-hover:translate-y-0.5" />
              </span>
              <span className="text-[10px] text-gray-500 font-medium">India</span>
            </div>
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold hover:border-indigo-600 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </DialogTrigger>

      {/* District Location Modal */}
      <DialogContent className="max-w-sm sm:max-w-md p-5 bg-white rounded-2xl border-gray-200 shadow-xl overflow-hidden">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto -mt-1 mb-2.5" />

        <DialogHeader className="pb-1 text-left">
          <DialogTitle className="text-base sm:text-lg font-heading font-bold text-prussian tracking-tight">
            Select Location
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative mt-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, area or locality"
            className="h-10 pl-3.5 pr-9 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm placeholder:text-gray-400 focus-visible:ring-1.5 focus-visible:ring-indigo-600"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        </div>

        {/* Use Current Location */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="flex items-center gap-2 w-full py-2 text-left text-xs sm:text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-all group"
        >
          <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Crosshair className={cn("w-3.5 h-3.5", isLocating && "animate-spin")} />
          </div>
          <span>{isLocating ? "Detecting location..." : "Use Current Location"}</span>
        </button>

        {/* Popular Cities */}
        <div className="mt-1">
          <span className="text-xs font-heading font-bold text-prussian block mb-2">
            Popular Cities
          </span>

          <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
            {filteredCities.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all group relative cursor-pointer",
                    isSelected
                      ? "border-indigo-600 bg-purple-50/70 text-indigo-950 font-bold shadow-xs"
                      : "border-transparent bg-gray-50 hover:bg-purple-50/40 text-gray-800"
                  )}
                >
                  {isSelected && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </span>
                  )}

                  <div className="w-10 h-10 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform">
                    <CityLandmarkIcon city={city} />
                  </div>

                  <span className="text-[11px] font-medium leading-tight truncate w-full">
                    {city}
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
