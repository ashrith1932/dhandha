import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline"
  | "saffron"
  | "ember"
  | "glass";

function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariant;
}) {
  const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-prussian text-white shadow-xs",
    secondary: "bg-grape/12 text-grape border border-grape/15",
    success: "bg-success-light text-success border border-success/20",
    warning: "bg-warning-light text-warning border border-warning/25",
    danger: "bg-danger-light text-danger border border-danger/20",
    outline: "border border-border text-text-secondary bg-surface/60 backdrop-blur-sm",
    saffron: "bg-saffron-subtle text-saffron-dark border border-saffron/25",
    ember: "bg-gradient-to-r from-[#E45A37] to-[#F28C28] text-white shadow-[0_4px_14px_-4px_rgba(228,90,55,0.6)]",
    glass: "bg-white/10 text-white border border-white/15 backdrop-blur-md",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.01em] transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
