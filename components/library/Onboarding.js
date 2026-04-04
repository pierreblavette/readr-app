"use client";
import { useState } from "react";

const SLIDES = [
  {
    title: "Hi, I'm Readr.",
    desc: ["I'm here to help you organize your reading life. Every book you own, every one you dream of."],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="10" y="8" width="28" height="40" rx="4" fill="var(--accent-bg)"/>
        <rect x="10" y="8" width="6" height="40" rx="2" fill="var(--accent)" opacity="0.5"/>
        <rect x="26" y="8" width="28" height="40" rx="4" fill="var(--accent-bg)"/>
        <rect x="26" y="8" width="6" height="40" rx="2" fill="var(--accent)" opacity="0.7"/>
      </svg>
    ),
  },
  {
    title: "Your books, finally in one place.",
    desc: ["Keep track of every book you own and everything you want to read.", "In one clean, beautiful space."],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="10" width="22" height="44" rx="4" fill="var(--accent-bg)"/>
        <rect x="8" y="10" width="5" height="44" rx="2" fill="var(--accent)"/>
        <rect x="20" y="14" width="22" height="44" rx="4" fill="var(--accent-bg)"/>
        <rect x="20" y="14" width="5" height="44" rx="2" fill="var(--accent)" opacity="0.6"/>
        <rect x="32" y="18" width="22" height="40" rx="4" fill="var(--accent-bg)"/>
        <rect x="32" y="18" width="5" height="40" rx="2" fill="var(--accent)" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: "Adding a book takes seconds.",
    desc: ["Snap a photo, upload a file, or type it in.", "However you prefer, I'll take care of the rest."],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="16" width="48" height="36" rx="6" fill="var(--accent-bg)"/>
        <circle cx="32" cy="34" r="10" fill="var(--accent)" opacity="0.15"/>
        <circle cx="32" cy="34" r="6" fill="var(--accent)" opacity="0.4"/>
        <rect x="20" y="12" width="24" height="8" rx="3" fill="var(--accent)" opacity="0.3"/>
        <line x1="32" y1="28" x2="32" y2="40" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="26" y1="34" x2="38" y2="34" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Two spaces, one home.",
    desc: ["Books you own, books you want.", "Switch between them in one click."],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="6" y="20" width="24" height="30" rx="4" fill="var(--accent-bg)"/>
        <rect x="6" y="20" width="5" height="30" rx="2" fill="var(--accent)"/>
        <rect x="34" y="20" width="24" height="30" rx="4" fill="var(--teal-bg)"/>
        <rect x="34" y="20" width="5" height="30" rx="2" fill="var(--teal)"/>
        <path d="M28 35 L36 35" stroke="var(--border)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Your data stays yours.",
    desc: ["Everything is stored locally in your browser.", "No account, no cloud, no tracking. Just you and your books."],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="16" y="28" width="32" height="26" rx="5" fill="var(--accent-bg)"/>
        <path d="M22 28v-6a10 10 0 0 1 20 0v6" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <circle cx="32" cy="41" r="4" fill="var(--accent)" opacity="0.7"/>
        <line x1="32" y1="45" x2="32" y2="49" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
  },
];

export default function Onboarding({ open, onClose }) {
  const [slide, setSlide] = useState(0);

  if (!open) return null;

  function next() {
    if (slide < SLIDES.length - 1) setSlide(s => s + 1);
    else onClose();
  }

  function prev() { setSlide(s => Math.max(s - 1, 0)); }

  const current = SLIDES[slide];
  const isLast  = slide === SLIDES.length - 1;

  return (
    <div className="ob-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ob-modal">
        <div className="ob-body">
          <div className="ob-slides">
            <div className="ob-slide active">
              <div className="ob-icon">{current.icon}</div>
              <h2 className="ob-title">{current.title}</h2>
              {current.desc.map((d, i) => (
                <p key={i} className="ob-desc">{d}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="ob-footer">
          <div className="ob-dots">
            {SLIDES.map((_, i) => (
              <div key={i} className={`ob-dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} />
            ))}
          </div>
          <div className="ob-footer-nav">
            <div className="ob-footer-left">
              {isLast
                ? <button className="ob-prev" onClick={prev}>Previous</button>
                : <button className="ob-skip" onClick={onClose}>Skip</button>
              }
            </div>
            <div className="ob-footer-right">
              {!isLast && (
                <button className="ob-prev" onClick={prev} style={{ visibility: slide === 0 ? 'hidden' : 'visible' }}>
                  Previous
                </button>
              )}
              <button className="ob-next" onClick={next}>
                {isLast ? 'Get started' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
