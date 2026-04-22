"use client";
import { useEffect, useState } from "react";
import BookChip from "./BookChip";

function formatDate(ts, lang) {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return ''; }
}

export default function QuotePanel({ quote, book, onClose, onEdit, onDelete, onOpenBook, lang, t }) {
  const [shared, setShared] = useState(false);

  async function handleShare() {
    if (!quote) return;
    const source = quote.bookTitle ? ` — ${quote.bookTitle}${quote.bookAuthor ? ', ' + quote.bookAuthor : ''}` : '';
    const text = `"${quote.text}"${source}`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }

  useEffect(() => {
    if (quote) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [quote]);

  return (
    <div className={`book-panel${quote ? ' open' : ''}`}>
      {quote && (
        <div className="panel-inner">

          <button className="panel-share" onClick={handleShare} title={shared ? (t.shareCopied || 'Copied!') : 'Share'}>
            {shared ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            )}
          </button>

          <button className="panel-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="panel-body quote-panel-body">

            <div className="quote-panel-book-section">
              <span className="panel-section-eyebrow">{t.quoteLabel}</span>
              <div className="quote-panel-text">
                <span className="quote-mark">"</span>
                {quote.text}
                <span className="quote-mark">"</span>
              </div>
            </div>

            {quote.createdAt && (
              <div className="quote-panel-date">{t.quoteAddedOn(formatDate(quote.createdAt, lang))}</div>
            )}

            <div className="panel-actions">
              <button className="panel-move-btn" onClick={() => onEdit(quote)}>
                {t.quoteEdit}
              </button>
              <button className="panel-delete-btn" onClick={() => { onDelete(quote.id); onClose(); }}>
                {t.btnDelete || 'Delete'}
              </button>
            </div>

            {(book || quote.bookTitle) && (
              <>
                <div className="quote-panel-divider" />
                <div className="quote-panel-book-section">
                  <span className="panel-section-eyebrow">{t.quoteBookSection}</span>
                  <BookChip
                    book={book || { title: quote.bookTitle, author: quote.bookAuthor || '' }}
                    onClick={quote.bookId && book ? () => onOpenBook(book) : undefined}
                  />
                </div>
              </>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
