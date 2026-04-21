"use client";
import Link from "next/link";

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-black/8"
      style={{ background: "rgba(237,233,226,0.85)" }}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/library" className="font-heading text-[19px] font-normal tracking-[-0.02em] text-[#1B1B1B] no-underline">
          readr
        </Link>
        <Link href="/library"
          className="flex items-center gap-1.5 text-sm font-semibold text-[#4959E6] hover:gap-2.5 transition-all duration-200">
          Open app
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </nav>
  );
}
