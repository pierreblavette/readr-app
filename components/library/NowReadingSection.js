"use client";
import { useEffect, useRef, useState } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "@/lib/bookUtils";

function formatDate(ts, lang) {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      month: 'short', day: 'numeric',
    });
  } catch { return ''; }
}

function NowReadingMenu({ book, onFinish, onAddQuote, onCancel, t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function close(e) { if (!ref.current?.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  function handleClick(e, action) {
    e.stopPropagation();
    setOpen(false);
    action(book);
  }

  return (
    <div className="dropdown-wrap now-reading-menu" ref={ref}>
      <button
        type="button"
        className="now-reading-menu-btn"
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.nowReadingMenuLabel}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown-menu now-reading-menu-list" role="menu">
          <button className="dropdown-item" role="menuitem" onClick={e => handleClick(e, onFinish)}>
            {t.btnFinishReading}
          </button>
          <button className="dropdown-item" role="menuitem" onClick={e => handleClick(e, onAddQuote)}>
            {t.quoteAdd}
          </button>
          <div className="dropdown-divider" />
          <button className="dropdown-item" role="menuitem" onClick={e => handleClick(e, onCancel)}>
            {t.btnCancelReading}
          </button>
        </div>
      )}
    </div>
  );
}

function NowReadingCard({ book, onOpen, onFinish, onAddQuote, onCancel, lang, t }) {
  const [cover, setCover] = useState(null);
  const [c1, c2] = coverColors(book.title);
  const letter = coverLetter(book.title);

  useEffect(() => {
    const cache = loadGBCache();
    const key = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) { setCover(cache[key]?.thumb || null); return; }
    fetchBookCover(book.title, book.author, cache).then(res => {
      const next = { ...cache, [key]: res };
      saveGBCache(next);
      setCover(res?.thumb || null);
    });
  }, [book.title, book.author]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="now-reading-card"
      onClick={() => onOpen(book)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(book); } }}>
      <div className="now-reading-body">
        {book.startedAt && (
          <span className="now-reading-date">{t.nowReadingStartedOn(formatDate(book.startedAt, lang))}</span>
        )}
        <div className="now-reading-row">
          <div
            className={`now-reading-cover${cover ? '' : ' now-reading-cover-empty'}`}
            style={{ background: cover ? undefined : `linear-gradient(135deg, ${c1}, ${c2})` }}>
            {cover
              ? <img src={cover} alt={book.title} />
              : <span className="now-reading-cover-letter">{letter}</span>}
          </div>
          <div className="now-reading-text">
            <div className="now-reading-title">{book.title}</div>
            <div className="now-reading-author">{book.author}</div>
            <div className="book-meta">
              <span>{book.genre || 'NC'}</span>
              <span className="book-meta-sep" aria-hidden="true">·</span>
              <span>{book.year || 'NC'}</span>
            </div>
          </div>
        </div>
      </div>
      <NowReadingMenu
        book={book}
        onFinish={onFinish}
        onAddQuote={onAddQuote}
        onCancel={onCancel}
        t={t}
      />
    </div>
  );
}

export default function NowReadingSection({ books, onOpenBook, onFinish, onAddQuote, onCancel, lang, t }) {
  if (!books || books.length === 0) return null;

  return (
    <section className="now-reading-section">
      <span className="panel-section-eyebrow">{t.nowReadingTitle}</span>
      <div className="now-reading-list">
        {books.map(b => (
          <NowReadingCard
            key={b.id}
            book={b}
            onOpen={onOpenBook}
            onFinish={onFinish}
            onAddQuote={onAddQuote}
            onCancel={onCancel}
            lang={lang}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}
