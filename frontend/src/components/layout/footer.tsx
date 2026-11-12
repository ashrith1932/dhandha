import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#121217] text-gray-400 pt-10 pb-16 lg:pb-8 mt-auto border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        {/* Brand Header & Social Icons */}
        <div className="flex flex-col items-center justify-center pb-8 border-b border-white/10 space-y-3.5">
          {/* Logo: dhandha BY DHANDHA */}
          <div className="flex flex-col items-center">
            <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-1">
              <span>dhandha</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.22em] text-gray-400 uppercase">
              BY DHANDHA
            </span>
          </div>

          {/* Social Icons (WhatsApp, Facebook, Instagram, X, YouTube) */}
          <div className="flex items-center justify-center gap-3 text-white">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition-colors"
              aria-label="X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 3 Main Columns + Download App matching District footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-white/10 text-left text-xs">
          {/* Help */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Safety & Screening
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Announcements
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cooks" className="hover:text-white transition-colors">
                  Find a Cook
                </Link>
              </li>
              <li>
                <Link href="/chefs" className="hover:text-white transition-colors">
                  Book a Chef
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-white transition-colors">
                  Home Tiffins
                </Link>
              </li>
              <li>
                <Link href="/dashboard/restaurant" className="hover:text-white transition-colors">
                  Kitchen Staffing
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  Community Discussions
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  Cook Salaries
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  FSSAI Guidelines
                </Link>
              </li>
              <li>
                <Link href="/dashboard/cook" className="hover:text-white transition-colors">
                  Join as Cook
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App badges */}
          <div className="col-span-2 md:col-span-1 space-y-2.5">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Download App</h4>
            <div className="flex flex-col gap-2">
              <a
                href="#app"
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all text-left"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.65-2.82 1.46-.6.7-1.13 1.83-.99 2.94 1.07.08 2.16-.48 2.82-1.3z" />
                </svg>
                <div className="leading-tight">
                  <span className="text-[8px] block text-gray-400 uppercase">Download on the</span>
                  <span className="font-heading font-bold text-xs text-white">App Store</span>
                </div>
              </a>

              <a
                href="#app"
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all text-left"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.007 2.007 0 0 1-.61-.926V2.74c.15-.36.368-.686.61-.926zm11.603 11.603l2.257 2.257-11.89 6.81a1.986 1.986 0 0 1-.95.275l10.583-9.342zm0-2.834L4.629 1.24a1.99 1.99 0 0 1 .95.276l11.89 6.81-2.257 2.258zm1.414 1.414l3.197 1.83a1.997 1.997 0 0 1 0 3.473l-3.197 1.83-2.074-2.074 2.074-2.059z" />
                </svg>
                <div className="leading-tight">
                  <span className="text-[8px] block text-gray-400 uppercase">GET IT ON</span>
                  <span className="font-heading font-bold text-xs text-white">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <p>© 2026 DHANDHA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cancellation" className="hover:text-white transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
