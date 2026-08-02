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
    <div className={`book-card ${className}`.trim()} style={{ width: "var(--spec-w, 220px)" }}>
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
    <div className={`quote-card ${className}`.trim()} style={{ width: "var(--spec-w, 400px)" }}>
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

// ─── NOW READING CARD ───
// Icône kebab HORIZONTALE (3 points côte à côte, stroke) — propre à Now Reading,
// distincte du KebabDots vertical plein des autres cartes.
const NowReadingKebab = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" />
  </svg>
);

export const NOW_READING_ANNOS = [
  { n: 1, side: "left", target: ".now-reading-date" },
  { n: 2, side: "left", target: ".now-reading-cover" },
  { n: 3, side: "right", target: ".now-reading-text" },
  { n: 4, side: "right", target: ".now-reading-menu-btn" },
];

// hideMenu : retire le kebab (absolu) pour le Spacing — sinon le gap racine
// body↔menu produit une bande parasite ~8px.
export function NowReadingCardSpec({ className = "", hideMenu = false }) {
  return (
    <div className={`now-reading-card ${className}`.trim()} role="button" tabIndex={-1} style={{ width: "var(--spec-w, 340px)" }}>
      <div className="now-reading-body">
        <span className="now-reading-date">Started Apr 28</span>
        <div className="now-reading-row">
          <div className="now-reading-cover now-reading-cover-empty" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }}>
            <span className="now-reading-cover-letter">A</span>
          </div>
          <div className="now-reading-text">
            <div className="now-reading-title">A Brief History of Time</div>
            <div className="now-reading-author">Stephen Hawking</div>
            <div className="book-meta"><span>Science</span><span className="book-meta-sep" aria-hidden="true">·</span><span>1988</span></div>
          </div>
        </div>
      </div>
      {!hideMenu && (
        <div className="now-reading-menu">
          <button type="button" className="now-reading-menu-btn" aria-label="More actions"><NowReadingKebab /></button>
        </div>
      )}
    </div>
  );
}

// ─── DICTIONARY CARD ───
export const DICT_ANNOS = [
  { n: 1, side: "right", target: ".dictionary-saved-card" },
  { n: 2, side: "left", target: ".dictionary-saved-head" },
  { n: 3, side: "right", target: ".col-card-kebab" },
  { n: 4, side: "left", target: ".dictionary-saved-body" },
];

export function DictionaryCardSpec({ className = "", expanded = false, fluid = false }) {
  return (
    <div className={`dictionary-saved-card${expanded ? " expanded" : ""} ${className}`.trim()} style={fluid ? { width: "100%" } : { width: "var(--spec-w, 400px)" }}>
      <div className="dictionary-saved-head" role="button" tabIndex={0} aria-expanded={expanded}>
        <span className="dictionary-saved-toggle">
          <svg className={`dictionary-chevron${expanded ? " open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="dictionary-saved-word">Voiture</span>
        </span>
        <button type="button" className="col-card-kebab" aria-label="More"><KebabDots /></button>
      </div>
      {expanded && (
        <div className="dictionary-saved-body">
          <div className="dictionary-definition">
            <span className="dictionary-pos">nom féminin</span>
            <p className="dictionary-meaning">Véhicule à roues mû par un moteur, destiné au transport de personnes ou de marchandises.</p>
            <div className="dictionary-example">
              <span className="dictionary-example-label">Exemple</span>
              <p className="dictionary-example-text">Ils ont acheté une nouvelle voiture électrique le mois dernier.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
