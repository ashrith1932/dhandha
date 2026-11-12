import Link from "next/link";
import { ArrowUpRight, ChefHat, ShieldCheck, Flame, MapPin, ArrowUp, Camera, MonitorPlay, AtSign, Globe } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const exploreLinks: [string, string][] = [
  ["Find a cook", "/cooks"],
  ["Private chefs", "/chefs"],
  ["Homemade food", "/food"],
  ["Kitchen jobs", "/jobs"],
  ["Explore everything", "/explore"],
];

const networkLinks: [string, string][] = [
  ["Community", "/community"],
  ["Post a requirement", "/jobs/post"],
  ["Cook dashboard", "/dashboard/cook"],
  ["Commercial hiring", "/dashboard/restaurant"],
  ["Admin console", "/dashboard/admin"],
  ["About Dhandha", "/about"],
];

const supportLinks: [string, string][] = [
  ["Help centre", "/about"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Cancellation", "/cancellation"],
];

const socials = [
  { icon: Camera, href: "https://instagram.com/dhandha.in", label: "Instagram" },
  { icon: MonitorPlay, href: "https://youtube.com/@dhandha", label: "YouTube" },
  { icon: AtSign, href: "https://twitter.com/dhandha_in", label: "Twitter / X" },
  { icon: Globe, href: "https://linkedin.com/company/dhandha", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden text-white">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-aurora-dark" aria-hidden />
      <div className="absolute inset-0 bg-dots-light opacity-60" aria-hidden />
      <ChefHat
        className="pointer-events-none absolute -right-10 -bottom-16 h-72 w-72 text-white/[0.04] rotate-12"
        strokeWidth={1}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pb-8">
        {/* Top: brand + newsletter */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo variant="dark" size="lg" showTagline />
            <p className="mt-5 text-sm leading-6 text-white/60">
              India&apos;s cooking marketplace — hire trusted home cooks, book private chefs,
              order from FSSAI-registered home kitchens and find kitchen careers, all in one place.
            </p>
            <Link
              href="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FFB03A]/40 bg-[#F28C28]/10 px-5 py-2 text-sm font-bold text-[#FFB03A] transition-all hover:bg-[#F28C28] hover:text-white hover:border-[#F28C28]"
            >
              Join the network <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="w-full max-w-md">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FFB03A]">The Kitchen Table</p>
            <p className="mt-1.5 text-sm text-white/60">One weekly drop — new home kitchens, chef launches and neighbourhood favourites.</p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">Why DHANDHA</h3>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/60">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> FSSAI &amp; ID verified kitchens</li>
              <li className="flex items-center gap-2"><Flame className="h-4 w-4 text-[#FFB03A]" /> 100% home-cooked, zero shortcuts</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#FF8FAB]" /> Live in 120+ Indian cities</li>
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:scale-110 hover:border-[#FFB03A] hover:text-[#FFB03A]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="For the network" links={networkLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center">
          <span>© 2026 DHANDHA Technologies Pvt. Ltd. Built for the people behind the kitchen.</span>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline">Gurugram · India</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <a href="#top" className="group flex items-center gap-1.5 font-bold text-white/60 transition-colors hover:text-[#FFB03A]">
              Back to top
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-all group-hover:-translate-y-0.5 group-hover:border-[#FFB03A]">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex items-center gap-1 text-[13px] font-medium text-white/65 transition-colors hover:text-[#FFB03A]"
            >
              {label}
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
