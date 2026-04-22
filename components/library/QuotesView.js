"use client";
import { useState, Fragment } from "react";

export default function QuotesView({ quotes, allBooks = [], onAdd, onDelete, t }) {
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
      <div className="search-row" style={{ marginBottom: 16 }}>
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
            <QuoteCard key={q.id} quote={q} book={allBooks.find(b => b.id === q.bookId)} onDelete={onDelete} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuoteCard({ quote, book, onDelete, t }) {
  const metaParts = [];
  if (book?.genre) metaParts.push(book.genre);
  if (book?.year)  metaParts.push(book.year);
  if (quote.page)  metaParts.push(`p. ${quote.page}`);

  return (
    <div className="quote-card">
      <button className="card-delete-btn" onClick={e => { e.stopPropagation(); onDelete(quote.id); }} aria-label={t.quoteDelete}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
      <div className="quote-card-book">
        <div className="book-title">{quote.bookTitle}</div>
        {quote.bookAuthor && <div className="book-author">{quote.bookAuthor}</div>}
        {metaParts.length > 0 && (
          <div className="book-meta">
            {metaParts.map((p, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="book-meta-sep" aria-hidden="true">·</span>}
                <span>{p}</span>
              </Fragment>
            ))}
          </div>
        )}
      </div>
      <div className="quote-card-divider" />
      <div className="quote-card-text">
        <span className="quote-mark">"</span>
        {quote.text}
        <span className="quote-mark">"</span>
      </div>
    </div>
  );
}
