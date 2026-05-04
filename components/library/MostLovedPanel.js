"use client";
import { useModalA11y } from "@/lib/useModalA11y";
import BookChip from "./BookChip";

export default function MostLovedPanel({ open, onClose, books, onOpenBook, t }) {
  const panelRef = useModalA11y(open, onClose, { autoFocus: false });

  return (
    <>
      {open && <div className="panel-overlay" onClick={onClose} />}
      <div className={`book-panel${open ? ' open' : ''}`} ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true">
        {open && (
          <div className="panel-inner">
            <button className="panel-close" onClick={onClose} aria-label={t.btnClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="panel-section">
              <span className="panel-section-eyebrow">{t.overviewLovedTitle}</span>
              <div className="overview-loved-list">
                {books.map(b => (
                  <BookChip
                    key={b.id}
                    book={b}
                    onClick={onOpenBook ? () => { onOpenBook(b); onClose(); } : undefined}
                    rating={b.rating}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
