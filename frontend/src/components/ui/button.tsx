import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold tracking-[-0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "shine bg-gradient-to-b from-[#FFB03A] via-[#F28C28] to-[#E07B1E] text-white shadow-[0_6px_20px_-6px_rgba(242,140,40,0.65),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_10px_32px_-6px_rgba(242,140,40,0.75),inset_0_1px_0_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        gradient:
          "shine bg-gradient-to-r from-[#E45A37] via-[#F28C28] to-[#FFB03A] bg-[length:200%_100%] text-white shadow-[0_10px_30px_-8px_rgba(228,90,55,0.6)] hover:bg-[position:100%_0] hover:-translate-y-0.5 active:scale-[0.97]",
        secondary:
          "bg-prussian text-white shadow-[0_8px_24px_-10px_rgba(22,27,51,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-prussian-light hover:-translate-y-0.5 active:scale-[0.98]",
        dark:
          "bg-[#111116] text-white shadow-[0_10px_28px_-12px_rgba(17,17,22,0.7)] hover:bg-black hover:-translate-y-0.5 active:scale-[0.97]",
        outline:
          "border-[1.5px] border-border bg-surface/60 backdrop-blur-sm text-text-primary hover:border-saffron hover:text-saffron-dark hover:bg-saffron-subtle/60 hover:-translate-y-0.5 active:scale-[0.98]",
        outlineLight:
          "border border-white/25 bg-white/5 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 active:scale-[0.97]",
        ghost:
          "text-text-primary hover:bg-almond-900",
        link:
          "text-saffron-dark underline-offset-4 hover:underline hover:text-ember rounded-none",
        danger:
          "bg-danger text-white shadow-sm hover:bg-red-700 active:scale-[0.97]",
        success:
          "bg-success text-white shadow-sm hover:bg-green-800 active:scale-[0.97]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-13 px-8 text-base rounded-2xl",
        xl: "h-15 px-10 text-lg rounded-2xl",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
