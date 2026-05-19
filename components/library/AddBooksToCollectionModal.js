"use client";
import { useState, useEffect } from "react";
import { coverColors, coverLetter, fetchBookCover, getCoverFromCache, setCoverInCache, loadGBCache } from "../../lib/bookUtils";
import { MAX_BOOKS_PER_COLLECTION } from "../../lib/useLibrary";
import { useModalA11y } from "../../lib/useModalA11y";

function AddBookRow({ book, isSelected, isDisabled, onToggle }) {
  const [cover, setCover] = useState(() => getCoverFromCache(book.title, book.author)?.thumb || null);
  const [c1, c2] = coverColors(book.title);
  const letter = coverLetter(book.title);

  useEffect(() => {
    const cached = getCoverFromCache(book.title, book.author);
    if (cached !== undefined) { setCover(cached?.thumb || null); return; }
    fetchBookCover(book.title, book.author, loadGBCache()).then(res => {
      setCoverInCache(book.title, book.author, res);
      setCover(res?.thumb || null);
    });
  }, [book.title, book.author]);

  return (
    <div className={`book-chip add-to-col-row${isSelected ? ' is-selected' : ''}${isDisabled && !isSelected ? ' is-disabled' : ''}`}>
      <div
        className={`book-chip-cover${cover ? '' : ' book-chip-cover-placeholder'}`}
        style={{ background: cover ? undefined : `linear-gradient(135deg, ${c1}, ${c2})` }}
      >
        {cover ? <img src={cover} alt="" /> : <span>{letter}</span>}
      </div>
      <div className="book-chip-body">
        <div className="book-chip-title">{book.title}</div>
        {book.author && <div className="book-chip-author">{book.author}</div>}
      </div>
      <button
        type="button"
        className="add-to-col-toggle"
        onClick={() => onToggle(book.id)}
        disabled={isDisabled && !isSelected}
        aria-label={isSelected ? 'Remove' : 'Add'}>
        {isSelected ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        )}
      </button>
    </div>
  );
}

export default function AddBooksToCollectionModal({ open, collection, allBooks, onAdd, onClose, t }) {
  const modalRef = useModalA11y(open, onClose);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    if (open) {
      setSearch('');
      setSelected(new Set());
    }
  }, [open]);

  if (!open || !collection) return null;

  const existing = new Set(collection.bookIds || []);
  const available = allBooks.filter(b => !existing.has(b.id));
  const filtered = search.trim()
    ? available.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
      )
    : available;

  const currentCount = existing.size;
  const totalAfterAdd = currentCount + selected.size;
  const remaining = MAX_BOOKS_PER_COLLECTION - totalAfterAdd;
  const limitReached = remaining <= 0;

  function toggleSelect(bookId) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        if (existing.size + next.size >= MAX_BOOKS_PER_COLLECTION) return prev;
        next.add(bookId);
      }
      return next;
    });
  }

  function handleConfirm() {
    onAdd(collection.id, Array.from(selected));
    onClose();
  }

  const emptyMessage = available.length === 0
    ? t.colAllBooksAdded
    : t.emptyNoMatch;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal add-to-col-modal" ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label={t.btnCancel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="modal-title">{t.colAddBooksTo(collection.name)}</div>

        <div className="add-to-col-section">
          <div className="search-box add-to-col-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className={`search-clear${search ? ' visible' : ''}`}
              onClick={() => setSearch('')}
              aria-label="Clear search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {limitReached && (
            <div className="modal-info-box modal-info-box--alert" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>{t.colLimitReached(MAX_BOOKS_PER_COLLECTION)}</span>
            </div>
          )}

          <div className="add-to-col-list-wrap">
            <div className="add-to-col-meta">
              <span className="add-to-col-info">{t.colLimitInfo(MAX_BOOKS_PER_COLLECTION)}</span>
              <span className="add-to-col-count">{t.colLimitCount(totalAfterAdd, MAX_BOOKS_PER_COLLECTION)}</span>
            </div>

            <div className="add-to-col-list">
            {filtered.length === 0 && (
              <div className="add-to-col-empty">{emptyMessage}</div>
            )}
            {filtered.map(book => (
              <AddBookRow
                key={book.id}
                book={book}
                isSelected={selected.has(book.id)}
                isDisabled={limitReached}
                onToggle={toggleSelect}
              />
            ))}
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline btn-md" onClick={onClose}>{t.btnCancel}</button>
          <button
            className="btn btn-primary btn-md"
            onClick={handleConfirm}
            disabled={selected.size === 0}>
            {t.btnConfirm || 'Confirm'}{selected.size > 0 ? ` (${selected.size})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
