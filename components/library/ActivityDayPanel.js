"use client";
import { Fragment, useMemo, useState } from "react";
import { useModalA11y } from "@/lib/useModalA11y";
import BookChip from "./BookChip";
import OverviewQuoteCard from "./OverviewQuoteCard";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function formatDayHeading(dayMs, lang) {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(dayMs));
}

export default function ActivityDayPanel({
  open, dayMs, owned = [], quotes = [], words = [],
  onClose, onOpenBook, onOpenQuote, lang = 'en', t,
}) {
  const panelRef = useModalA11y(open, onClose, { autoFocus: false });
  const [expandedWordIds, setExpandedWordIds] = useState(() => new Set());

  const dayData = useMemo(() => {
    if (!dayMs) return { books: [], quotes: [], words: [] };
    const nextDayMs = dayMs + MS_PER_DAY;
    return {
      books: owned.filter(b => b.finishedAt && b.finishedAt >= dayMs && b.finishedAt < nextDayMs),
      quotes: quotes.filter(q => q.createdAt && q.createdAt >= dayMs && q.createdAt < nextDayMs),
      words: words.filter(w => w.createdAt && w.createdAt >= dayMs && w.createdAt < nextDayMs),
    };
  }, [dayMs, owned, quotes, words]);

  function resolveBook(quote) {
    return owned.find(b => b.id === quote.bookId)
      || (quote.bookTitle ? { title: quote.bookTitle, author: quote.bookAuthor || '' } : null);
  }

  function toggleWord(id) {
    setExpandedWordIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const hasAny = dayData.books.length + dayData.quotes.length + dayData.words.length > 0;

  return (
    <>
      {open && <div className="panel-overlay" onClick={onClose} />}
      <div className={`book-panel${open ? ' open' : ''}`} ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true">
        {open && dayMs && (
          <div className="panel-inner">
            <button className="panel-close" onClick={onClose} aria-label={t.btnClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="panel-section activity-day-heading">
              <span className="panel-section-eyebrow">{t.overviewActivityTitle}</span>
              <h2 className="activity-day-title">{formatDayHeading(dayMs, lang)}</h2>
            </div>

            {!hasAny && (
              <div className="activity-day-empty">{t.overviewActivityDayEmpty}</div>
            )}

            {dayData.books.length > 0 && (
              <div className="panel-section">
                <span className="panel-section-eyebrow">{t.overviewActivityDayBooks}</span>
                <div className="overview-loved-list">
                  {dayData.books.map(b => (
                    <BookChip
                      key={b.id}
                      book={b}
                      rating={b.rating}
                      onClick={onOpenBook ? () => { onClose(); onOpenBook(b); } : undefined}
                    />
                  ))}
                </div>
              </div>
            )}

            {dayData.quotes.length > 0 && (
              <div className="panel-section">
                <span className="panel-section-eyebrow">{t.overviewActivityDayQuotes}</span>
                <div className="overview-quotes-list">
                  {dayData.quotes.map(q => (
                    <OverviewQuoteCard
                      key={q.id}
                      quote={q}
                      book={resolveBook(q)}
                      onOpen={onOpenQuote ? (qq) => { onClose(); onOpenQuote(qq); } : undefined}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            )}

            {dayData.words.length > 0 && (
              <div className="panel-section">
                <span className="panel-section-eyebrow">{t.overviewActivityDayWords}</span>
                <div className="dictionary-saved-list">
                  {dayData.words.map(w => {
                    const expanded = expandedWordIds.has(w.id);
                    return (
                      <div key={w.id} className={`dictionary-saved-card overview-word-card${expanded ? ' expanded' : ''}`}>
                        <div
                          className="dictionary-saved-head"
                          role="button"
                          tabIndex={0}
                          aria-expanded={expanded}
                          onClick={() => toggleWord(w.id)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleWord(w.id); }
                          }}>
                          <span className="dictionary-saved-toggle">
                            <svg className={`dictionary-chevron${expanded ? ' open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                            <span className="dictionary-saved-word">{w.word}</span>
                          </span>
                        </div>
                        {expanded && (
                          <div className="dictionary-saved-body">
                            {(w.definitions || []).map((d, i) => (
                              <Fragment key={i}>
                                {i > 0 && <div className="panel-divider" />}
                                <div className="dictionary-definition">
                                  {d.pos && <span className="dictionary-pos">{d.pos}</span>}
                                  <p className="dictionary-meaning">{d.meaning}</p>
                                  {d.example && (
                                    <div className="dictionary-example">
                                      <span className="dictionary-example-label">{t.dictionaryExample}</span>
                                      <p className="dictionary-example-text">{d.example}</p>
                                    </div>
                                  )}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
