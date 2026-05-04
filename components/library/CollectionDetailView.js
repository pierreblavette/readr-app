"use client";
import { useState, useRef, useEffect } from "react";
import BookCard from "./BookCard";
import BookList from "./BookList";
import SelectionBar from "./SelectionBar";
import { MAX_BOOKS_PER_COLLECTION } from "../../lib/useLibrary";

export default function CollectionDetailView({
  collection, books, view, switchView,
  onBack, onDelete, onShare, onAddBooks, onRequestRemoveBook, onRequestRemoveMany, onOpenBook, onRenameRequest,
  t, sortCol, sortDir, toggleSort,
}) {
  const [search, setSearch] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const moreRef = useRef(null);
  const editMenuRef = useRef(null);

  function toggleSelected(id) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  function toggleSelectAll() {
    setSelected(prev => prev.size === filtered.length ? new Set() : new Set(filtered.map(b => b.id)));
  }
  function exitEditMode() {
    setEditMode(false);
    setSelected(new Set());
  }
  function handleConfirmSelection(action) {
    if (action === 'delete' && selected.size > 0) {
      onRequestRemoveMany(collection, Array.from(selected));
    }
  }

  useEffect(() => {
    if (!moreOpen) return;
    function close(e) {
      if (!moreRef.current?.contains(e.target)) setMoreOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setMoreOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [moreOpen]);

  useEffect(() => {
    if (!editMenuOpen) return;
    function close(e) {
      if (!editMenuRef.current?.contains(e.target)) setEditMenuOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setEditMenuOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [editMenuOpen]);

  const filtered = search.trim()
    ? books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
      )
    : books;

  const resultInfo = search.trim()
    ? t.resultQuery(filtered.length, books.length)
    : t.colLimitCount(books.length, MAX_BOOKS_PER_COLLECTION);
  const limitReached = books.length >= MAX_BOOKS_PER_COLLECTION;

  return (
    <>
      <div className="col-detail-header">
        <button className="col-back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          {t.pageCollections}
        </button>

        <h1 className="page-title">{collection.name}</h1>
      </div>

      <div className="search-row">
        <div className="search-box">
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

        <div className="counter-actions">
          <button onClick={onAddBooks} className="add-btn" disabled={limitReached || editMode} aria-disabled={limitReached || editMode}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {t.colAddBooks}
          </button>

          {editMode ? (
            <button onClick={exitEditMode} className="edit-btn">{t.btnDone}</button>
          ) : (
            <div className="dropdown-wrap col-edit-dropdown" ref={editMenuRef}>
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setEditMenuOpen(o => !o)}
                aria-haspopup="menu"
                aria-expanded={editMenuOpen}>
                <span className="dropdown-btn-label">{t.btnEdit}</span>
                <svg
                  className="dropdown-btn-chevron"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform 0.15s', transform: editMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  aria-hidden="true">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {editMenuOpen && (
                <div className="dropdown-menu" role="menu">
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => { setEditMenuOpen(false); onRenameRequest?.(collection); }}>
                    {t.colRename}
                  </button>
                  {books.length > 0 && (
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => { setEditMenuOpen(false); setEditMode(true); }}>
                      {t.colEditList}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="dropdown-wrap" ref={moreRef}>
            <button
              type="button"
              className="col-more-btn"
              onClick={() => setMoreOpen(o => !o)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              aria-label={t.colMoreActions}
              title={t.colMoreActions}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="6" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="18" r="2"/>
              </svg>
            </button>
            {moreOpen && (
              <div className="dropdown-menu" role="menu">
                <button
                  type="button"
                  className="dropdown-item dropdown-item--mobile-only"
                  onClick={() => { setMoreOpen(false); onRenameRequest?.(collection); }}>
                  {t.colRename}
                </button>
                {books.length > 0 && (
                  <button
                    type="button"
                    className="dropdown-item dropdown-item--mobile-only"
                    onClick={() => { setMoreOpen(false); setEditMode(true); }}>
                    {t.colEditList}
                  </button>
                )}
                <div className="dropdown-divider dropdown-divider--mobile-only" role="separator" />
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => { setMoreOpen(false); onShare?.(collection); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  {t.colShare}
                </button>
                <div className="dropdown-divider" role="separator" />
                <button
                  type="button"
                  className="dropdown-item is-destructive"
                  onClick={() => { setMoreOpen(false); onDelete(collection); }}>
                  {t.colDeleteCollection}
                </button>
              </div>
            )}
          </div>

          <div className="view-btns">
            <button onClick={() => switchView('grid')} className={`view-btn${view === 'grid' ? ' active' : ''}`} aria-label="Card view">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="6" height="6" rx="1.5"/>
                <rect x="14" y="4" width="6" height="6" rx="1.5"/>
                <rect x="4" y="14" width="6" height="6" rx="1.5"/>
                <rect x="14" y="14" width="6" height="6" rx="1.5"/>
              </svg>
            </button>
            <button onClick={() => switchView('list')} className={`view-btn${view === 'list' ? ' active' : ''}`} aria-label="List view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <div className="books-section">
        {books.length > 0 && (
          <div className="result-line">{resultInfo}</div>
        )}

        {books.length === 0 && (
          <div className="empty">
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
            <div className="empty-text">
              <p className="empty-title">{t.colDetailEmpty}</p>
              <p className="empty-sub">{t.colDetailEmptySub}</p>
              <p className="empty-info">{t.colLimitInfo(MAX_BOOKS_PER_COLLECTION)}</p>
            </div>
            <button className="empty-cta" onClick={onAddBooks}>{t.colDetailEmptyCta}</button>
          </div>
        )}

        {books.length > 0 && filtered.length === 0 && (
          <div className="empty">
            <div className="empty-text">
              <p className="empty-title">{t.emptyNoMatch}</p>
              <p className="empty-sub">{t.emptyNoMatchSub}</p>
            </div>
          </div>
        )}

        {filtered.length > 0 && view === 'grid' && (
          <div className="books-grid">
            {filtered.map(book => (
              <BookCard key={book.id} book={book} tab="owned"
                editMode={editMode} selected={selected}
                onToggleSelect={toggleSelected}
                onOpen={onOpenBook}
                onDelete={b => onRequestRemoveBook(collection, b)}
                t={t}
              />
            ))}
          </div>
        )}

        {filtered.length > 0 && view === 'list' && (
          <BookList books={filtered} tab="owned"
            editMode={editMode} selected={selected}
            onToggleSelect={toggleSelected} onSelectAll={toggleSelectAll}
            onOpen={onOpenBook}
            onDelete={b => onRequestRemoveBook(collection, b)}
            t={t} sortCol={sortCol} sortDir={sortDir} toggleSort={toggleSort}
          />
        )}
      </div>

      <SelectionBar
        editMode={editMode}
        selected={selected} books={filtered} tab="collections" t={t}
        onCancel={exitEditMode}
        onSelectAll={toggleSelectAll}
        onConfirm={handleConfirmSelection}
      />
    </>
  );
}
