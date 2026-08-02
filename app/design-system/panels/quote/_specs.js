// Spec de la page Quote Panel. Markup reproduit à l'identique de QuotePanel.js —
// réutilise la primitive .book-panel (coquille, a11y, scroll-lock, slide-in) comme
// Book Panel. .ds-panel-static neutralise le positionnement fixed pour la doc.

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);
// Icône « Loved » = marque-page (fill si actif) — comme QuotePanel.
const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21l-8-5-8 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
  </svg>
);
const ChevronIcon = () => (
  <svg className="book-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// className : .ds-anno-organism en Anatomy. saved : état du toggle « Loved ».
export function QuotePanelSpec({ className = "", saved = true }) {
  return (
    <div className={`book-panel ds-panel-static ${className}`.trim()} role="dialog" aria-modal="true" aria-label="Quote details">
      <div className="panel-inner">
        <button type="button" className="panel-close" aria-label="Close"><CloseIcon /></button>

        <div className="panel-info">
          {/* Meta — la citation */}
          <div className="panel-info-meta">
            <div className="panel-section">
              <span className="panel-section-eyebrow">Quote</span>
              <div className="quote-panel-content">
                <div className="quote-panel-text">
                  <span className="quote-mark">&ldquo;</span>
                  We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special.
                  <span className="quote-mark">&rdquo;</span>
                </div>
                <div className="quote-panel-date">Added on Mar 12, 2026</div>
              </div>
            </div>
          </div>

          {/* Actions — Edit + Loved (toggle) à gauche, Share à droite */}
          <div className="panel-actions">
            <div className="panel-header-actions-group">
              <button type="button" className="panel-move-btn">Edit</button>
              <button type="button" className={`btn btn-outline btn-md panel-header-like${saved ? " is-active" : ""}`} aria-pressed={saved}>
                <BookmarkIcon filled={saved} /><span>Loved</span>
              </button>
            </div>
            <button type="button" className="btn btn-outline btn-md panel-header-share" aria-label="Share">
              <ShareIcon /><span>Share</span>
            </button>
          </div>
        </div>

        {/* Book — la citation appartient à un livre (BookRow / Book Row) */}
        <div className="panel-divider" />
        <div className="panel-section">
          <span className="panel-section-eyebrow">Book</span>
          <button type="button" className="book-row book-row-interactive">
            <div className="book-row-cover book-row-cover-placeholder" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }}><span>A</span></div>
            <div className="book-row-body">
              <div className="book-row-name">
                <div className="book-row-title">A Brief History of Time</div>
                <div className="book-row-author">Stephen Hawking</div>
              </div>
            </div>
            <ChevronIcon />
          </button>
        </div>

        <div className="panel-divider" />
        <div className="panel-actions">
          <button type="button" className="panel-delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}
