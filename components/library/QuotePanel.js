"use client";
import { useEffect, useRef } from "react";
import BookChip from "./BookChip";
import { useModalA11y } from "../../lib/useModalA11y";

function formatDate(ts, lang) {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return ''; }
}

export default function QuotePanel({ quote, book, onClose, onEdit, onDelete, onShared, onOpenBook, lang, t }) {
  const panelRef = useModalA11y(!!quote, onClose);

  async function handleShare() {
    if (!quote) return;
    const source = quote.bookTitle ? `\n${quote.bookTitle}${quote.bookAuthor ? ', ' + quote.bookAuthor : ''}` : '';
    const text = `"${quote.text}"${source}`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(text); onShared?.(); } catch {}
    }
  }

  const scrollYRef = useRef(0);
  useEffect(() => {
    if (!quote) return;
    scrollYRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollYRef.current);
    };
  }, [quote]);

  return (
    <div className={`book-panel${quote ? ' open' : ''}`} ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true">
      {quote && (
        <div className="panel-inner">

          <button className="panel-close" onClick={onClose} aria-label={t.btnClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="panel-info">
            <div className="panel-info-meta">
              <div className="panel-section">
                <span className="panel-section-eyebrow">{t.quoteLabel}</span>
                <div className="quote-panel-content">
                  <div className="quote-panel-text">
                    <span className="quote-mark">"</span>
                    {quote.text}
                    <span className="quote-mark">"</span>
                  </div>
                  {quote.createdAt && (
                    <div className="quote-panel-date">{t.quoteAddedOn(formatDate(quote.createdAt, lang))}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="panel-actions">
              <button className="panel-move-btn" onClick={() => onEdit(quote)}>
                {t.quoteEdit}
              </button>
              <button className="panel-delete-btn" onClick={() => { onDelete(quote); onClose(); }}>
                {t.btnDelete || 'Delete'}
              </button>
              <button className="btn btn-outline btn-md panel-header-share" onClick={handleShare} aria-label={t.btnShare} title={t.btnShare}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                <span>{t.btnShare}</span>
              </button>
            </div>
          </div>

          {(book || quote.bookTitle) && (
            <>
              <div className="panel-divider" />
              <div className="panel-section">
                <span className="panel-section-eyebrow">{t.quoteBookSection}</span>
                <BookChip
                  book={book || { title: quote.bookTitle, author: quote.bookAuthor || '' }}
                  onClick={onOpenBook ? () => { if (book) onOpenBook(book); } : undefined}
                />
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
