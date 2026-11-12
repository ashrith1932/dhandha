import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps { className?: string; variant?: "light" | "dark"; size?: "sm" | "md" | "lg" | "xl"; showTagline?: boolean; }

export function Logo({ className, variant = "light", size = "md", showTagline = false }: LogoProps) {
  const dark = variant === "dark";
  const sizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl", xl: "text-3xl" };
  return <Link href="/" className={cn("group inline-flex flex-col leading-none", className)} aria-label="Dhandha home"><span className={cn("font-heading font-extrabold tracking-[-0.06em] transition-colors", sizes[size], dark ? "text-white" : "text-[#171513] group-hover:text-[#e45a37]")}>DHANDHA<span className="text-[#e45a37]">.</span></span>{showTagline && <span className={cn("mt-1 text-[8px] font-bold uppercase tracking-[0.18em]", dark ? "text-white/60" : "text-[#9c968e]")}>Kaam bhi. Khana bhi.</span>}</Link>;
}
