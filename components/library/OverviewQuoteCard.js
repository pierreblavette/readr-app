"use client";
import BookChip from "./BookChip";

export default function OverviewQuoteCard({ quote, book, onOpen, t }) {
  function activate() { onOpen?.(quote); }
  function onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
  }
  const chipBook = book || { title: quote.bookTitle || '', author: quote.bookAuthor || '' };
  return (
    <div
      className="quote-card overview-quote-card"
      role="button"
      tabIndex={0}
      onClick={activate}
      onKeyDown={onKeyDown}
      aria-label={quote.bookTitle || t.overviewQuotesTitle}>
      <div className="quote-card-body">
        <div className="quote-card-text-wrap">
          <div className="quote-card-text">
            <span className="quote-mark">&ldquo;</span>
            {quote.text}
            <span className="quote-mark">&rdquo;</span>
          </div>
        </div>
      </div>
      {(book || quote.bookTitle) && (
        <>
          <div className="quote-card-divider" />
          <BookChip book={chipBook} />
        </>
      )}
    </div>
  );
}
