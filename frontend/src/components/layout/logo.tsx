import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
}

export function Logo({
  className,
  variant = "light",
  size = "md",
  showTagline = false,
}: LogoProps) {
  const isDark = variant === "dark";

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  const flameSizes = {
    sm: "w-3.5 h-3.5 -top-1 left-3.5",
    md: "w-5 h-5 -top-1.5 left-5",
    lg: "w-6 h-6 -top-2 left-6",
    xl: "w-8 h-8 -top-2.5 left-8",
  };

  return (
    <Link
      href="/"
      className={cn("inline-flex flex-col group select-none", className)}
      aria-label="DHANDHA - Kaam bhi. Khana bhi."
    >
      <div className="relative inline-flex items-center">
        {/* Subtle Cooking Flame Accent */}
        <span
          className={cn(
            "absolute pointer-events-none transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-0.5",
            flameSizes[size]
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-saffron drop-shadow-[0_2px_8px_rgba(242,140,40,0.5)]"
          >
            <path
              d="M12 2C10.5 5 7 7.5 7 12C7 15.3137 9.68629 18 13 18C16.3137 18 19 15.3137 19 12C19 8.5 16.5 6 15 4C14.5 5.5 13.5 6.5 12.5 7C12.5 5 13 3 12 2Z"
              fill="currentColor"
            />
            <path
              d="M12 11C11 12.5 9.5 13.5 9.5 15.5C9.5 17 10.6193 18 12 18C13.3807 18 14.5 17 14.5 15.5C14.5 14 13.5 12.5 13 12C12.6667 11.5 12.3333 11 12 11Z"
              fill="#FFB45E"
            />
          </svg>
        </span>

        {/* Wordmark */}
        <span
          className={cn(
            "font-heading font-extrabold tracking-tight transition-colors",
            sizeClasses[size],
            isDark ? "text-white" : "text-prussian"
          )}
        >
          DH<span className="text-saffron group-hover:text-saffron-dark transition-colors">A</span>NDHA
        </span>

        <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-saffron" />
      </div>

      {showTagline && (
        <span
          className={cn(
            "text-[10px] tracking-wider uppercase font-semibold transition-colors -mt-0.5",
            isDark ? "text-lilac-800" : "text-grape-500"
          )}
        >
          Kaam bhi. Khana bhi.
        </span>
      )}
    </Link>
  );
}
