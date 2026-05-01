"use client";
import { useState, useEffect, useRef } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "../../lib/bookUtils";

function CoverCell({ book }) {
  const [cover, setCover] = useState(null);
  const [c1, c2] = book ? coverColors(book.title) : ['#E8EAFD', '#C1C7FB'];

  useEffect(() => {
    if (!book) return;
    const cache = loadGBCache();
    const key = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) { setCover(cache[key]?.thumb || null); return; }
    fetchBookCover(book.title, book.author, cache).then(res => {
      saveGBCache({ ...cache, [key]: res });
      setCover(res?.thumb || null);
    });
  }, [book]);

  if (!book) {
    return <div className="col-card-cover-cell"><div className="col-card-cover-placeholder" /></div>;
  }
  return (
    <div className="col-card-cover-cell">
      {cover
        ? <img src={cover} alt="" className="col-card-cover-img" />
        : <div className="col-card-cover-placeholder" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />
      }
    </div>
  );
}

function CollectionsIcon() {
  return (
    <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
      <rect x="12" y="14" width="9" height="34" rx="2" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="14" y1="20" x2="19" y2="20" stroke="#131860" strokeLinecap="round"/>
      <rect x="22" y="20" width="9" height="28" rx="2" fill="#C1C7FB" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="24" y1="26" x2="29" y2="26" stroke="#131860" strokeLinecap="round"/>
      <rect x="32" y="16" width="9" height="32" rx="2" fill="#6F7CF2" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="34" y1="22" x2="39" y2="22" stroke="#131860" strokeLinecap="round"/>
      <rect x="42" y="22" width="9" height="26" rx="2" fill="#3646D4" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="44" y1="28" x2="49" y2="28" stroke="#FFFFFF" strokeLinecap="round"/>
      <line x1="8" y1="50" x2="52" y2="50" stroke="#131860" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CollectionCoverGrid({ books }) {
  const slots = [0, 1, 2, 3];
  return (
    <div className="col-card-cover-grid">
      {slots.map(i => <CoverCell key={i} book={books[i] || null} />)}
    </div>
  );
}

function ColCardKebab({ col, onRename, onDelete, t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div className="dropdown-wrap col-card-kebab-wrap" ref={ref} onClick={e => e.stopPropagation()}>
      <button
        type="button"
        className="col-card-kebab"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.colMoreActions}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="18" r="2"/>
        </svg>
      </button>
      {open && (
        <div className="dropdown-menu" role="menu">
          <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onRename(col); }}>
            {t.colRename}
          </button>
          <div className="dropdown-divider" role="separator" />
          <button type="button" className="dropdown-item is-destructive" onClick={() => { setOpen(false); onDelete(col); }}>
            {t.colDeleteCollection}
          </button>
        </div>
      )}
    </div>
  );
}

export default function CollectionsView({ collections, data, view, onOpen, onCreate, onDelete, onRename, t }) {
  const allBooks = [...(data.owned || []), ...(data.wishlist || [])];

  function getBooksForCol(col) {
    return (col.bookIds || []).map(id => allBooks.find(b => b.id === id)).filter(Boolean);
  }

  if (collections.length === 0) {
    return (
      <div className="empty">
        <CollectionsIcon />
        <div className="empty-text">
          <p className="empty-title">{t.colViewEmpty}</p>
          <p className="empty-sub">{t.colViewEmptySub}</p>
        </div>
        <button className="empty-cta" onClick={onCreate}>{t.colViewEmptyCta}</button>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="books-list">
        <table className="list-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th className="list-cell-title list-cell-title--col-name">Name</th>
              <th className="list-cell-meta">Books</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {collections.map(col => {
              const books = getBooksForCol(col);
              return (
                <tr key={col.id} className="list-row" onClick={() => onOpen(col)}>
                  <td className="list-cell-title">{col.name}</td>
                  <td className="list-cell-meta">{t.colBookCount(books.length)}</td>
                  <td className="list-cell-action">
                    <button className="delete-row-btn" onClick={e => { e.stopPropagation(); onDelete(col); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="col-grid">
      {collections.map(col => {
        const books = getBooksForCol(col);
        return (
          <div
            key={col.id}
            className="col-card"
            role="button"
            tabIndex={0}
            onClick={() => onOpen(col)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(col); } }}>
            <CollectionCoverGrid books={books} />
            <div className="col-card-body">
              <div className="col-card-info">
                <div className="col-card-name">{col.name}</div>
                <div className="col-card-count">{t.colBookCount(books.length)}</div>
              </div>
              <ColCardKebab col={col} onRename={onRename} onDelete={onDelete} t={t} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
