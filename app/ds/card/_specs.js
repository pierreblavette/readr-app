// Specs partagés par les pages de la famille Cards (Foundation / Book / Quote).
// Mocks statiques : on reproduit le markup + les classes réelles, le CSS de library
// fait le rendu — aucune donnée figée, aucune divergence avec la prod.

export const KebabDots = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
  </svg>
);

// ─── BOOK CARD ───
export const BOOK_ANNOS = [
  { n: 1, side: "right", target: ".book-card" },
  { n: 2, side: "left", target: ".book-cover" },
  { n: 3, side: "left", target: ".book-body-info" },
  { n: 4, side: "right", target: ".col-card-kebab" },
];

export function BookCardSpec({ className = "" }) {
  return (
    <div className={`book-card ${className}`.trim()} style={{ width: 220 }}>
      <div className="book-cover" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }} />
      <div className="book-body">
        <div className="book-body-info">
          <div className="book-title">Normal People</div>
          <div className="book-author">Sally Rooney</div>
          <div className="book-meta"><span>Fiction</span><span className="book-meta-sep" aria-hidden="true">·</span><span>2018</span></div>
        </div>
        <button type="button" className="col-card-kebab" aria-label="More"><KebabDots /></button>
      </div>
    </div>
  );
}

// ─── QUOTE CARD ───
export const QUOTE_ANNOS = [
  { n: 1, side: "right", target: ".quote-card" },
  { n: 2, side: "left", target: ".quote-card-text" },
  { n: 3, side: "right", target: ".quote-card-actions" },
  { n: 4, side: "left", target: ".book-chip" },
];

export const QUOTE = "The world was ending and there was nothing to be done about it.";

export function QuoteCardSpec({ className = "", saved = false }) {
  return (
    <div className={`quote-card ${className}`.trim()} style={{ width: 400 }}>
      <div className="quote-card-body">
        <div className="quote-card-text-wrap">
          <div className="quote-card-text">
            <span className="quote-mark">“</span>{QUOTE}<span className="quote-mark">”</span>
          </div>
        </div>
        <div className="quote-card-actions">
          <button type="button" className={`quote-card-like${saved ? " is-saved" : ""}`} aria-label="Love" aria-pressed={saved}>
            <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21l-8-5-8 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" /></svg>
          </button>
          <button type="button" className="col-card-kebab" aria-label="More"><KebabDots /></button>
        </div>
      </div>
      <div className="quote-card-divider" />
      <div className="book-chip">
        <div className="book-chip-cover" style={{ background: "var(--primary-30)" }}>D</div>
        <div className="book-chip-body"><div className="book-chip-name"><div className="book-chip-title">Dune</div><div className="book-chip-author">Frank Herbert</div></div></div>
      </div>
    </div>
  );
}
