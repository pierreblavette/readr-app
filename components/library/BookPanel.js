"use client";
import { useState, useEffect, useRef } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "@/lib/bookUtils";

export default function BookPanel({ book, tab, onClose, onDelete, onMoveToLibrary, onAddQuote, onOpenQuote, quotes, t }) {
  const [cover, setCover] = useState(null);
  const [synopsis, setSynopsis] = useState(null);
  const [shared, setShared] = useState(false);

  async function handleShare() {
    const text = t.shareText ? t.shareText(book.title, book.author) : `"${book.title}" — ${book.author}`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }

  useEffect(() => {
    if (book) {
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
  }, [book]);

  useEffect(() => {
    if (!book) return;
    setCover(null);
    setSynopsis(null);
    const cache = loadGBCache();
    const key   = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) {
      setCover(cache[key]?.thumb || null);
      setSynopsis(cache[key]?.description || null);
      return;
    }
    fetchBookCover(book.title, book.author, cache).then(res => {
      const next = { ...cache, [key]: res };
      saveGBCache(next);
      setCover(res?.thumb || null);
      setSynopsis(res?.description || null);
    });
  }, [book]);

  const [c1, c2] = book ? coverColors(book.title) : ['#ccc', '#aaa'];
  const letter   = book ? coverLetter(book.title) : '';

  return (
    <div className={`book-panel${book ? ' open' : ''}`}>
      {book && (
        <div className="panel-inner">

          {/* Share button */}
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

          {/* Close button */}
          <button className="panel-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Main — cover + info block (gap 40px between them) */}
          <div className="panel-main">
            <div className={`panel-cover-wrap${cover ? '' : ' panel-cover-empty'}`} style={{ background: cover ? `linear-gradient(135deg, ${c1}, ${c2})` : undefined }}>
              {cover && <img src={cover} alt={book.title} className="panel-cover-img" />}
            </div>
            <div className="panel-info">
              <div className="panel-title">{book.title}</div>
              <div className="panel-byline">
                <div className="panel-author">{book.author}</div>
                <div className="panel-meta">
                  {book.genre && <span>{book.genre}</span>}
                  {book.genre && book.year && <span className="panel-meta-sep">·</span>}
                  {book.year && <span>{book.year}</span>}
                </div>
              </div>
              {/* About section */}
              <div className="panel-section">
                <span className="panel-section-eyebrow">About</span>
                {synopsis
                  ? <div className="panel-synopsis">{synopsis}</div>
                  : <div className="panel-synopsis-placeholder">No synopsis available.</div>
                }
              </div>

              <div className="panel-actions">
                {tab === 'wishlist' && (
                  <button className="panel-move-btn" onClick={() => onMoveToLibrary(book)}>
                    {t.selConfirmOwned || 'Move to Library'}
                  </button>
                )}
                <button className="panel-delete-btn" onClick={() => { onDelete(book); onClose(); }}>
                  {t.btnDelete || 'Delete'}
                </button>
              </div>
            </div>
          </div>

          <div className="panel-divider" />

          {/* Quotes section — eyebrow + list + add button (gap-driven) */}
          <div className="panel-quotes">
            <span className="panel-section-eyebrow">{t.tabQuotes || 'Quotes'}</span>
            {quotes && quotes.length > 0 ? (
              <div className="panel-quotes-list">
                {quotes.map(q => (
                  <PanelQuoteItem key={q.id} quote={q} onOpen={onOpenQuote} t={t} />
                ))}
              </div>
            ) : (
              <p className="panel-quotes-empty">{t.quoteEmptyBook || 'No quotes for this book yet.'}</p>
            )}
            <button className="panel-quotes-add" onClick={() => onAddQuote?.(book)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add a quote
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

function PanelQuoteItem({ quote, onOpen, t }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => {
      const hadExpanded = el.classList.contains('expanded');
      if (hadExpanded) el.classList.remove('expanded');
      const overflow = el.scrollHeight > el.clientHeight + 1;
      if (hadExpanded) el.classList.add('expanded');
      setOverflows(overflow);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [quote.text]);

  return (
    <button type="button" className="panel-quote-item" onClick={() => onOpen?.(quote)}>
      <p ref={textRef} className={`panel-quote-text${expanded ? ' expanded' : ''}`}>"{quote.text}"</p>
      {quote.page && <span className="panel-quote-page">p. {quote.page}</span>}
      {overflows && (
        <span
          role="button"
          tabIndex={0}
          className="quote-see-more panel-quote-see-more"
          onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(v => !v);
            }
          }}
        >
          {expanded ? t.quoteSeeLess : t.quoteSeeMore}
        </span>
      )}
    </button>
  );
}
