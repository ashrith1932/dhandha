import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { ToastProvider } from "@/components/ui/toast";

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function MainLayout({ children, showFooter = true }: MainLayoutProps) {
  return (
    <ToastProvider>
      <div id="top" className="min-h-screen flex flex-col bg-background selection:bg-saffron/25 selection:text-prussian">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        {showFooter && <Footer />}
        <MobileNav />
      </div>
    </ToastProvider>
  );
}
