"use client";
import { useEffect, useRef, useState } from "react";

export default function QuotesView({ quotes, allBooks = [], onAdd, onDelete, onOpen, t }) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? quotes.filter(q =>
        q.text.toLowerCase().includes(search.toLowerCase()) ||
        q.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
        q.bookAuthor.toLowerCase().includes(search.toLowerCase())
      )
    : quotes;

  return (
    <div className="quotes-wrap">
      <div className="search-row">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="counter-actions">
          <button className="add-btn" onClick={onAdd}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {t.quoteAdd}
          </button>
        </div>
      </div>

      {quotes.length === 0 ? (
        <div className="empty">
          <svg className="empty-icon" viewBox="0 0 80 80" fill="none">
            <rect x="12" y="16" width="56" height="48" rx="4" fill="var(--accent-bg)"/>
            <path d="M24 32 Q24 26 30 26 Q30 32 24 32Z" fill="var(--accent)" opacity="0.8"/>
            <path d="M36 32 Q36 26 42 26 Q42 32 36 32Z" fill="var(--accent)" opacity="0.8"/>
            <line x1="24" y1="44" x2="56" y2="44" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
            <line x1="24" y1="52" x2="48" y2="52" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
          </svg>
          <p className="empty-title">{t.quoteEmpty}</p>
          <p className="empty-sub">{t.quoteEmptySub}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-title">{t.emptyNoMatch}</div>
          <div className="empty-sub">{t.emptyNoMatchSub}</div>
        </div>
      ) : (
        <div className="quotes-list">
          {filtered.map(q => (
            <QuoteCard key={q.id} quote={q} book={allBooks.find(b => b.id === q.bookId)} onDelete={onDelete} onOpen={onOpen} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuoteCard({ quote, book, onDelete, onOpen, t }) {
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

  const activate = () => onOpen?.(quote);
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
  };

  return (
    <div
      className="quote-card"
      role="button"
      tabIndex={0}
      onClick={activate}
      onKeyDown={onKeyDown}
      aria-label={quote.bookTitle || t.quoteAdd}
    >
      <div className="quote-card-head">
        <span className="list-title">{quote.bookTitle}</span>
        <span className="list-author">{quote.bookAuthor || 'NC'}</span>
        <span className="list-genre">{book?.genre || 'NC'}</span>
        <span className="list-year">{book?.year || 'NC'}</span>
        <button className="delete-row-btn" onClick={e => { e.stopPropagation(); onDelete(quote.id); }} aria-label={t.quoteDelete}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3h4"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M5 6l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"/>
          </svg>
        </button>
      </div>
      <div className="quote-card-divider" />
      <div ref={textRef} className={`quote-card-text${expanded ? ' expanded' : ''}`}>
        <span className="quote-mark">"</span>
        {quote.text}
        <span className="quote-mark">"</span>
      </div>
      {overflows && (
        <button type="button" className="quote-see-more" onClick={e => { e.stopPropagation(); setExpanded(ex => !ex); }}>
          {expanded ? t.quoteSeeLess : t.quoteSeeMore}
        </button>
      )}
    </div>
  );
}
