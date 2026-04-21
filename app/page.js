"use client";
import Link from "next/link";
import { useState } from "react";
import LandingNav from "@/components/LandingNav";
import LandingFooter from "@/components/LandingFooter";

const faqs = [
  { q: "Is readr really free?", a: "Yes, completely. No premium tier, no subscription, no hidden fees. readr is free and open — forever." },
  { q: "Do I need to create an account?", a: "No account, no email, no password. You open the app and start adding books immediately. Your data is stored directly in your browser." },
  { q: "What happens to my data if I clear my browser?", a: "Your library lives in your browser's local storage. Clearing it will remove your data. We recommend using readr on a device you trust and keep — or exporting your list regularly." },
  { q: "How does the photo recognition work?", a: "Take a photo of your bookshelf and readr sends it to a Gemini AI model that identifies the titles and authors. The image is processed and immediately discarded — nothing is stored." },
  { q: "Does it work on iPhone and Android?", a: "Yes. readr is a web app that works in any modern browser on any device — iPhone, Android, Mac, PC. Add it to your home screen for a native-like experience." },
  { q: "Can I import books from another app?", a: "You can import books via a JSON file or by pasting a list of titles. The photo recognition feature also makes it easy to add a whole shelf at once." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left text-base font-semibold text-[#1B1B1B] hover:text-[#4959E6] transition-colors"
      >
        {q}
        <span className={`flex-shrink-0 w-5 h-5 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      {open && <p className="pb-5 text-[#555] leading-relaxed text-sm">{a}</p>}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#EDE9E2", fontFamily: "var(--font-jakarta)" }}>
      <LandingNav />

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-12 w-full">
        <div className="flex-1 max-w-xl">
          <h1 className="font-heading font-normal text-[#1B1B1B] leading-[1.06] tracking-[-0.025em]"
            style={{ fontSize: "clamp(3rem,5.5vw,5.5rem)" }}>
            Your books,<br />
            <span className="relative inline-block">
              finally in their place.
              <svg className="absolute left-0 w-full overflow-visible" style={{ bottom: "-6px", height: "10px" }}
                viewBox="0 0 340 10" preserveAspectRatio="none">
                <path d="M0 5 C20 2, 35 8, 55 5 C75 2, 90 8, 110 5 C130 2, 145 8, 165 5 C185 2, 200 8, 220 5 C240 2, 255 8, 275 5 C295 2, 310 8, 340 5"
                  fill="none" stroke="#4959E6" strokeWidth="3.5" strokeLinecap="round"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: 400,
                    animation: "drawWave 0.9s cubic-bezier(0.4,0,0.2,1) 0.3s forwards"
                  }}
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 text-lg font-semibold text-[#1B1B1B]">A quiet place for your books.</p>
          <p className="mt-2 text-[#555] leading-relaxed">Track what you read, remember what comes next. No account needed.</p>
          <div className="mt-8">
            <Link href="/library"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[#4959E6] text-white text-sm font-semibold hover:bg-[#3646D4] transition-colors">
              Open app
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            {["Free & open", "No account", "Stored locally"].map((label) => (
              <span key={label} className="text-xs font-semibold text-[#555] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#4959E6]/10 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4959E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* App mockup */}
        <div className="flex-1 max-w-sm w-full">
          <div className="rounded-2xl border border-black/8 bg-white/60 backdrop-blur-sm overflow-hidden shadow-lg">
            <div className="px-4 pt-4 pb-0 border-b border-black/6 flex gap-3">
              <button className="text-xs font-bold text-[#4959E6] border-b-2 border-[#4959E6] pb-3 px-1">
                My Library <span className="ml-1 text-[10px] bg-[#4959E6]/10 text-[#4959E6] px-1.5 py-0.5 rounded-full">7</span>
              </button>
              <button className="text-xs font-semibold text-[#888] pb-3 px-1">
                Wishlist <span className="ml-1 text-[10px] bg-black/6 text-[#888] px-1.5 py-0.5 rounded-full">4</span>
              </button>
            </div>
            <div className="p-4 space-y-2">
              {[
                { title: "The Great Gatsby", author: "F. Scott Fitzgerald", color: "#4959E6" },
                { title: "Sapiens", author: "Yuval Noah Harari", color: "#E6496A" },
                { title: "The Almanack of Naval", author: "Eric Jorgenson", color: "#49C4E6" },
              ].map((book) => (
                <div key={book.title} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/4 transition-colors cursor-pointer">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: book.color }} />
                  <div>
                    <div className="text-xs font-semibold text-[#1B1B1B]">{book.title}</div>
                    <div className="text-[10px] text-[#888] mt-0.5">{book.author}</div>
                    <div className="flex gap-1 mt-1.5">
                      <span className="text-[9px] font-semibold bg-black/6 text-[#555] px-1.5 py-0.5 rounded-full">Fiction</span>
                      <span className="text-[9px] font-semibold bg-[#4959E6]/10 text-[#4959E6] px-1.5 py-0.5 rounded-full">✓ Read</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#4959E6]">FAQ</span>
            <h2 className="font-heading font-light text-[#1B1B1B] mt-3 leading-tight tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)" }}>
              Got questions?
            </h2>
            <p className="mt-3 text-sm text-[#555] leading-relaxed">
              Everything you need to know about readr.{" "}
              <Link href="/library" className="text-[#4959E6] font-semibold hover:underline">Open the app</Link>{" "}
              and try it yourself.
            </p>
          </div>
          <div>
            {faqs.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 w-full">
        <div className="bg-[#4959E6] rounded-2xl px-8 py-16 text-center">
          <h2 className="font-heading font-light text-white leading-tight tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)" }}>
            Ready to start?
          </h2>
          <p className="mt-3 text-white/70 text-sm">It takes less than a minute to add your first book.</p>
          <Link href="/library"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-white text-[#4959E6] text-sm font-bold hover:bg-white/90 transition-colors">
            Open readr
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>

      <LandingFooter />

      <style>{`
        @keyframes drawWave { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
