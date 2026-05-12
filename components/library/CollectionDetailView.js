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
      exitEditMode();
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

  function normalize(str) {
    return (str || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/^(l'|le |la |les |un |une |des |the )/i, '');
  }
  const filtered = (() => {
    let list = [...books];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(b =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let cmp;
      if (sortCol === 'dateAdded') {
        cmp = (a.id || 0) - (b.id || 0);
      } else if (sortCol === 'year') {
        const ya = a.year ? parseInt(a.year) : 9999;
        const yb = b.year ? parseInt(b.year) : 9999;
        cmp = ya !== yb ? ya - yb : normalize(a.title).localeCompare(normalize(b.title), 'fr');
      } else if (sortCol === 'author') {
        const la = a.author.split(' ').pop() || a.author;
        const lb = b.author.split(' ').pop() || b.author;
        cmp = normalize(la).localeCompare(normalize(lb), 'fr');
      } else if (sortCol === 'genre') {
        cmp = (a.genre || '').localeCompare(b.genre || '', 'fr');
      } else {
        cmp = normalize(a.title).localeCompare(normalize(b.title), 'fr');
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  })();

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

      <div className="cell-row cell-row--lg cell-row--between search-row">
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
              <path d="M14 8H51C47 11 47 17 51 20H14C10.6863 20 8 17.3137 8 14C8 10.6863 10.6863 8 14 8Z" fill="var(--illus-bg-2)" stroke="var(--illus-stroke)" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24.5 7C20.3579 7 17 10.3579 17 14.5C17 18.6421 20.3579 22 24.5 22H14.5C10.3579 22 7 18.6421 7 14.5C7 10.3579 10.3579 7 14.5 7H24.5Z" fill="var(--illus-bg-3)"/>
              <path d="M14 10H52C53.1046 10 54 9.10457 54 8C54 6.89543 53.1046 6 52 6H14C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22H52C53.1046 22 54 21.1046 54 20C54 18.8954 53.1046 18 52 18H14C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10Z" fill="var(--illus-accent-1)"/>
              <path d="M37 6H14C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22H52C53.1046 22 54 21.1046 54 20C54 18.8954 53.1046 18 52 18H14C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10H52C53.1046 10 54 9.10457 54 8C54 6.89543 53.1046 6 52 6H43" stroke="var(--illus-stroke)" strokeLinecap="round"/>
              <path d="M46 24H9C13 27 13 33 9 36H46C49.3137 36 52 33.3137 52 30C52 26.6863 49.3137 24 46 24Z" fill="var(--illus-bg-2)" stroke="var(--illus-stroke)" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M35.5 23C39.6421 23 43 26.3579 43 30.5C43 34.6421 39.6421 38 35.5 38H45.5C49.6421 38 53 34.6421 53 30.5C53 26.3579 49.6421 23 45.5 23H35.5Z" fill="var(--illus-bg-3)"/>
              <path d="M46 26H8C6.89543 26 6 25.1046 6 24C6 22.8954 6.89543 22 8 22H46C50.4183 22 54 25.5817 54 30C54 34.4183 50.4183 38 46 38H8C6.89543 38 6 37.1046 6 36C6 34.8954 6.89543 34 8 34H46C48.2091 34 50 32.2091 50 30C50 27.7909 48.2091 26 46 26Z" fill="var(--illus-bg-3)"/>
              <path d="M22 26H46C48.2091 26 50 27.7909 50 30C50 32.2091 48.2091 34 46 34H8C6.89543 34 6 34.8954 6 36C6 37.1046 6.89543 38 8 38H46C50.4183 38 54 34.4183 54 30C54 25.5817 50.4183 22 46 22H8C6.89543 22 6 22.8954 6 24C6 25.1046 6.89543 26 8 26H16" stroke="var(--illus-stroke)" strokeLinecap="round"/>
              <path d="M14 40H51C47 43 47 49 51 52H14C10.6863 52 8 49.3137 8 46C8 42.6863 10.6863 40 14 40Z" fill="var(--illus-bg-2)" stroke="var(--illus-stroke)" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24.5 39C20.3579 39 17 42.3579 17 46.5C17 50.6421 20.3579 54 24.5 54H14.5C10.3579 54 7 50.6421 7 46.5C7 42.3579 10.3579 39 14.5 39H24.5Z" fill="var(--illus-bg-3)"/>
              <path d="M14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42Z" fill="var(--illus-accent-2)"/>
              <path d="M33 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H39" stroke="var(--illus-stroke)" strokeLinecap="round"/>
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
