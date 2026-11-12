import Link from "next/link";
import { ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
}

export function Logo({ className, variant = "light", size = "md", showTagline = false }: LogoProps) {
  const dark = variant === "dark";
  const sizes = {
    sm: { text: "text-lg", tile: "h-7 w-7 rounded-lg", icon: "h-4 w-4" },
    md: { text: "text-[22px]", tile: "h-8 w-8 rounded-xl", icon: "h-4.5 w-4.5" },
    lg: { text: "text-3xl", tile: "h-11 w-11 rounded-2xl", icon: "h-6 w-6" },
    xl: { text: "text-4xl", tile: "h-14 w-14 rounded-2xl", icon: "h-7 w-7" },
  }[size];

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2 leading-none", className)} aria-label="DHANDHA home">
      {/* Gradient flame tile */}
      <span
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-[#FFB03A] via-[#F28C28] to-[#E45A37] shadow-[0_6px_16px_-4px_rgba(242,140,40,0.6),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]",
          sizes.tile
        )}
      >
        <ChefHat className={cn("text-white drop-shadow", sizes.icon)} strokeWidth={2.2} />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-heading font-extrabold tracking-[-0.055em] transition-colors",
            sizes.text,
            dark ? "text-white" : "text-prussian group-hover:text-ink-black"
          )}
        >
          DHANDHA<span className="text-ember">.</span>
        </span>
        {showTagline && (
          <span className={cn("mt-1 text-[8px] font-bold uppercase tracking-[0.22em]", dark ? "text-white/55" : "text-text-muted")}>
            Kaam bhi. Khana bhi.
          </span>
        )}
      </span>
    </Link>
  );
}
