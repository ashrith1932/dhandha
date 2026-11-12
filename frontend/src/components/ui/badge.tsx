import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "saffron";
}) {
  const variantClasses = {
    default: "bg-prussian text-white",
    secondary: "bg-grape-900 text-grape-500",
    success: "bg-success-light text-success",
    warning: "bg-warning-light text-warning",
    danger: "bg-danger-light text-danger",
    outline: "border border-border text-text-secondary bg-transparent",
    saffron: "bg-saffron-subtle text-saffron-dark",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
