import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-border bg-surface-raised px-4 py-2 text-sm text-text-primary shadow-xs transition-all duration-200 placeholder:text-text-muted hover:border-[#DCD2C3] focus-visible:outline-none focus-visible:border-saffron focus-visible:ring-4 focus-visible:ring-saffron/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
