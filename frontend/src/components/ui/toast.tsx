"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "info" | "warning";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (title: string, options?: { description?: string; variant?: ToastVariant }) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => undefined,
});

export function useToast() {
  return useContext(ToastContext);
}

const variantStyles: Record<ToastVariant, { icon: React.ElementType; ring: string; chip: string }> = {
  success: { icon: CheckCircle2, ring: "border-success/30", chip: "bg-success-light text-success" },
  info: { icon: Info, ring: "border-saffron/40", chip: "bg-saffron-subtle text-saffron-dark" },
  warning: { icon: AlertTriangle, ring: "border-warning/40", chip: "bg-warning-light text-warning" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (title: string, options?: { description?: string; variant?: ToastVariant }) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev.slice(-2), { id, title, description: options?.description, variant: options?.variant ?? "success" }]);
    },
    []
  );

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 4200)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast viewport — sits above the mobile bottom nav */}
      <div
        aria-live="polite"
        className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-[60] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => {
          const V = variantStyles[t.variant];
          const Icon = V.icon;
          return (
            <div
              key={t.id}
              role="status"
              className={cn(
                "pointer-events-auto animate-toast-in flex items-start gap-3 rounded-2xl border bg-surface/95 backdrop-blur-xl px-4 py-3 shadow-elevated",
                V.ring
              )}
            >
              <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full", V.chip)}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-text-primary leading-snug">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-[11px] leading-snug text-text-secondary">{t.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="shrink-0 rounded-full p-1 text-text-muted hover:bg-almond-900 hover:text-text-primary transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
