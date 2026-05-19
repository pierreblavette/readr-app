"use client";
import { useModalA11y } from "@/lib/useModalA11y";

export default function CollectionListPanel({ open, onClose, title, collections, getBooksForCol, onOpenCollection, t }) {
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
              <span className="panel-section-eyebrow">{title}</span>
              <div className="overview-loved-list">
                {collections.map(col => {
                  const books = getBooksForCol(col);
                  return (
                    <button
                      key={col.id}
                      type="button"
                      className="book-chip book-chip-interactive collection-chip"
                      onClick={() => { onOpenCollection?.(col); onClose(); }}>
                      <div className="book-chip-body">
                        <div className="book-chip-title">{col.name}</div>
                        <div className="book-chip-author">{t.colBookCount(books.length)}</div>
                      </div>
                      <svg className="book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
