"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ExportMenu from "@/components/library/ExportMenu";
import SortMenu from "@/components/library/SortMenu";
import BookChip from "@/components/library/BookChip";

export default function QuotesView({ quotes, allBooks = [], onAdd, onDelete, onOpen, onOpenBook, exportMD, exportPDF, lang, t }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');

  const filtered = search.trim()
    ? quotes.filter(q =>
        q.text.toLowerCase().includes(search.toLowerCase()) ||
        q.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
        q.bookAuthor.toLowerCase().includes(search.toLowerCase())
      )
    : quotes;

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'book') {
      return arr.sort((a, b) =>
        (a.bookTitle || '').localeCompare(b.bookTitle || '', lang === 'fr' ? 'fr' : 'en', { sensitivity: 'base' })
      );
    }
    return arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [filtered, sort, lang]);

  return (
    <>
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
          {quotes.length > 0 && (
            <SortMenu
              current={sort}
              onChange={setSort}
              ariaLabel={t.quoteSortToggle || 'Sort'}
              options={[
                { key: 'recent', label: t.quoteSortRecent || 'Recent' },
                { key: 'book',   label: t.quoteSortBook   || 'By book' },
              ]}
            />
          )}
          {(exportPDF || exportMD) && (
            <ExportMenu
              t={t}
              exportPDF={exportPDF}
              exportMD={exportMD}
              disabled={!quotes.length}
            />
          )}
        </div>
      </div>

      <div className="quotes-section">
        {quotes.length > 0 && (
          <span className="panel-section-eyebrow">{t.quoteCount(filtered.length)}</span>
        )}

        {quotes.length === 0 ? (
          <div className="empty">
            <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
              <path d="M6 14C6 10.2288 6 8.34315 7.17157 7.17157C8.34315 6 10.2288 6 14 6H46C49.7712 6 51.6569 6 52.8284 7.17157C54 8.34315 54 10.2288 54 14V36C54 39.7712 54 41.6569 52.8284 42.8284C51.6569 44 49.7712 44 46 44H40L36.5099 48.8862C33.5423 53.0408 32.0585 55.1181 30 55.1181C27.9415 55.1181 26.4577 53.0408 23.4901 48.8862L20 44H14C10.2288 44 8.34315 44 7.17157 42.8284C6 41.6569 6 39.7712 6 36V14Z" fill="#E8EAFD"/>
              <path d="M26 44L29.4902 48.8857C30.9309 50.9026 32.0232 52.429 33 53.4668C31.9647 54.5668 31.0592 55.1182 30 55.1182C27.9415 55.1182 26.4578 53.0404 23.4902 48.8857L20 44H26ZM20 6C16.2288 6 14.3434 6.0003 13.1719 7.17188C12.0003 8.34345 12 10.2288 12 14V36C12 39.7712 12.0003 41.6566 13.1719 42.8281C14.3434 43.9997 16.2288 44 20 44H14C10.2288 44 8.34345 43.9997 7.17188 42.8281C6.0003 41.6566 6 39.7712 6 36V14C6 10.2288 6.0003 8.34345 7.17188 7.17188C8.34345 6.0003 10.2288 6 14 6H20Z" fill="#C1C7FB"/>
              <path d="M20 44H14C10.2288 44 8.34315 44 7.17157 42.8284C6 41.6569 6 39.7712 6 36V14C6 10.2288 6 8.34315 7.17157 7.17157C8.34315 6 10.2288 6 14 6H38M22.5 47.5L23.4901 48.8862C26.4577 53.0408 27.9415 55.1181 30 55.1181C32.0585 55.1181 33.5423 53.0408 36.5099 48.8862L40 44H46C49.7712 44 51.6569 44 52.8284 42.8284C54 41.6569 54 39.7712 54 36V14C54 10.2288 54 8.34315 52.8284 7.17157C51.6569 6 49.7712 6 46 6H42" stroke="#131860" strokeLinecap="round"/>
              <path d="M28 34C28 35.1046 27.1046 36 26 36H19C18.4477 36 18 35.5523 18 35V33C18 32.4477 18.4477 32 19 32H23C23.5523 32 24 31.5523 24 31V29C24 28.4477 23.5523 28 23 28H18C16.8954 28 16 27.1046 16 26V18C16 16.8954 16.8954 16 18 16H26C27.1046 16 28 16.8954 28 18V34Z" fill="#9BA5F8"/>
              <path d="M28 32C28 33.8856 28 34.8284 27.4142 35.4142C26.8284 36 25.8856 36 24 36H20C19.0572 36 18.5858 36 18.2929 35.7071C18 35.4142 18 34.9428 18 34C18 33.0572 18 32.5858 18.2929 32.2929C18.5858 32 19.0572 32 20 32H22C22.9428 32 23.4142 32 23.7071 31.7071C24 31.4142 24 30.9428 24 30C24 29.0572 24 28.5858 23.7071 28.2929C23.4142 28 22.9428 28 22 28H20C18.1144 28 17.1716 28 16.5858 27.4142C16 26.8284 16 25.8856 16 24V20C16 18.1144 16 17.1716 16.5858 16.5858C17.1716 16 18.1144 16 20 16H24C25.8856 16 26.8284 16 27.4142 16.5858C28 17.1716 28 18.1144 28 20V32Z" stroke="#131860" strokeLinecap="round"/>
              <path d="M44 34C44 35.1046 43.1046 36 42 36H35C34.4477 36 34 35.5523 34 35V33C34 32.4477 34.4477 32 35 32H39C39.5523 32 40 31.5523 40 31V29C40 28.4477 39.5523 28 39 28H34C32.8954 28 32 27.1046 32 26V18C32 16.8954 32.8954 16 34 16H42C43.1046 16 44 16.8954 44 18V34Z" fill="#6F7CF2"/>
              <path d="M44 32C44 33.8856 44 34.8284 43.4142 35.4142C42.8284 36 41.8856 36 40 36H36C35.0572 36 34.5858 36 34.2929 35.7071C34 35.4142 34 34.9428 34 34C34 33.0572 34 32.5858 34.2929 32.2929C34.5858 32 35.0572 32 36 32H38C38.9428 32 39.4142 32 39.7071 31.7071C40 31.4142 40 30.9428 40 30C40 29.0572 40 28.5858 39.7071 28.2929C39.4142 28 38.9428 28 38 28H36C34.1144 28 33.1716 28 32.5858 27.4142C32 26.8284 32 25.8856 32 24V20C32 18.1144 32 17.1716 32.5858 16.5858C33.1716 16 34.1144 16 36 16H40C41.8856 16 42.8284 16 43.4142 16.5858C44 17.1716 44 18.1144 44 20V32Z" stroke="#131860" strokeLinecap="round"/>
            </svg>
            <div className="empty-text">
              <p className="empty-title">{t.quoteEmpty}</p>
              <p className="empty-sub">{t.quoteEmptySub}</p>
            </div>
            <button className="empty-cta" onClick={onAdd}>{t.quoteEmptyCta}</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-text">
              <div className="empty-title">{t.emptyNoMatch}</div>
              <div className="empty-sub">{t.emptyNoMatchSub}</div>
            </div>
          </div>
        ) : (
          <div className="quotes-list">
            {sorted.map(q => {
              const byId = q.bookId ? allBooks.find(b => b.id === q.bookId) : null;
              const byMeta = !byId && q.bookTitle
                ? allBooks.find(b =>
                    (b.title || '').toLowerCase().trim() === (q.bookTitle || '').toLowerCase().trim() &&
                    (b.author || '').toLowerCase().trim() === (q.bookAuthor || '').toLowerCase().trim()
                  )
                : null;
              const book = byId || byMeta || null;
              return (
                <QuoteCard key={q.id} quote={q} book={book} onDelete={onDelete} onOpen={onOpen} onOpenBook={onOpenBook} t={t} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function QuoteCard({ quote, book, onDelete, onOpen, onOpenBook, t }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      if (!width) return;
      const style = getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight);
      const maxLines = 3;

      const clone = el.cloneNode(true);
      clone.classList.add('expanded');
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.pointerEvents = 'none';
      clone.style.left = '-99999px';
      clone.style.top = '0';
      clone.style.width = `${width}px`;
      clone.style.maxHeight = 'none';
      clone.style.height = 'auto';
      el.parentElement.appendChild(clone);
      const naturalHeight = clone.scrollHeight;
      clone.remove();

      const lines = lineHeight ? Math.round(naturalHeight / lineHeight) : 0;
      setOverflows(lines > maxLines);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
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
      <div className="quote-card-body">
        <div className="quote-card-text-wrap">
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
        <button
          type="button"
          className="delete-row-btn quote-card-delete"
          onClick={e => { e.stopPropagation(); onDelete(quote); }}
          aria-label={t.quoteDelete}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3h4"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M5 6l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"/>
          </svg>
        </button>
      </div>
      <div className="quote-card-divider" />
      <BookChip
        book={book || { title: quote.bookTitle || '', author: quote.bookAuthor || '' }}
        onClick={onOpenBook ? (e) => { e.stopPropagation(); if (book) onOpenBook(book); } : undefined}
      />
    </div>
  );
}
