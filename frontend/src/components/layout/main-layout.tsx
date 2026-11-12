import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function MainLayout({ children, showFooter = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-saffron/20 selection:text-prussian">
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      {showFooter && <Footer />}
      <MobileNav />
    </div>
  );
}
