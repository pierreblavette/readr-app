"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import SelectionBar from "./SelectionBar";
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
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (btnRef.current?.contains(e.target)) return;
      if (menuRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function onScroll() { setOpen(false); }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open]);

  function handleToggle() {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(o => !o);
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="col-card-kebab"
        onClick={e => { e.stopPropagation(); handleToggle(); }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.colMoreActions}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="18" r="2"/>
        </svg>
      </button>
      {open && pos && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          className="dropdown-menu dropdown-menu--portal"
          role="menu"
          style={{ position: 'fixed', top: pos.top, right: pos.right }}
          onClick={e => e.stopPropagation()}>
          <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onRename(col); }}>
            {t.colRename}
          </button>
          <div className="dropdown-divider" role="separator" />
          <button type="button" className="dropdown-item is-destructive" onClick={() => { setOpen(false); onDelete(col); }}>
            {t.colDeleteCollection}
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

export default function CollectionsView({ collections, data, view, switchView, onOpen, onCreate, onDelete, onRename, onRequestDeleteMany, t }) {
  const [search, setSearch] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(new Set());

  const allBooks = [...(data.owned || []), ...(data.wishlist || [])];

  function getBooksForCol(col) {
    return (col.bookIds || []).map(id => allBooks.find(b => b.id === id)).filter(Boolean);
  }

  const filtered = search.trim()
    ? collections.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : collections;

  function toggleSelected(id) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  function toggleSelectAll() {
    setSelected(prev => prev.size === filtered.length ? new Set() : new Set(filtered.map(c => c.id)));
  }
  function exitEditMode() {
    setEditMode(false);
    setSelected(new Set());
  }
  function handleConfirmSelection(action) {
    if (action === 'delete' && selected.size > 0) {
      onRequestDeleteMany(Array.from(selected));
    }
  }

  function handleCardClick(col) {
    if (editMode) toggleSelected(col.id);
    else onOpen(col);
  }

  return (
    <>
      <h1 className="page-title">{t.pageCollections}</h1>

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
          <button className="add-btn" onClick={onCreate} disabled={editMode} aria-disabled={editMode}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {t.colNewCollection}
          </button>

          {collections.length > 0 && (
            <button onClick={() => editMode ? exitEditMode() : setEditMode(true)} className="edit-btn">
              {editMode ? t.btnDone : t.btnEdit}
            </button>
          )}

          <div className="view-btns">
            <button onClick={() => switchView('grid')} className={`view-btn${view === 'grid' ? ' active' : ''}`} aria-label="Grid view">
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

      {collections.length === 0 ? (
        <div className="empty">
          <CollectionsIcon />
          <div className="empty-text">
            <p className="empty-title">{t.colViewEmpty}</p>
            <p className="empty-sub">{t.colViewEmptySub}</p>
          </div>
          <button className="empty-cta" onClick={onCreate}>{t.colViewEmptyCta}</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-text">
            <p className="empty-title">{t.emptyNoMatch}</p>
            <p className="empty-sub">{t.emptyNoMatchSub}</p>
          </div>
        </div>
      ) : view === 'list' ? (
        <div className="books-list">
          <table className="list-table">
            <thead className="table-head">
              <tr>
                {editMode && (
                  <th className="list-cell-num">
                    <div className="th-checkbox-wrap" onClick={toggleSelectAll}>
                      <div className={`row-checkbox${selected.size === filtered.length && filtered.length > 0 ? ' all-selected' : ''}`}>
                        {selected.size === filtered.length && filtered.length > 0 && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </th>
                )}
                <th className="list-cell-title list-cell-title--col-name">Name</th>
                <th className="list-cell-meta">Books</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map(col => {
                const books = getBooksForCol(col);
                const isSelected = selected.has(col.id);
                return (
                  <tr key={col.id}
                    className={`list-row${isSelected ? ' selected' : ''}`}
                    onClick={() => handleCardClick(col)}>
                    {editMode && (
                      <td className="list-cell-num">
                        <div className="row-checkbox">
                          {isSelected && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </div>
                      </td>
                    )}
                    <td className="list-cell-title list-cell-title--col-name">{col.name}</td>
                    <td className="list-cell-meta">{t.colBookCount(books.length)}</td>
                    <td className="list-cell-action">
                      {!editMode && <ColCardKebab col={col} onRename={onRename} onDelete={onDelete} t={t} />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="col-grid">
          {filtered.map(col => {
            const books = getBooksForCol(col);
            const isSelected = selected.has(col.id);
            return (
              <div
                key={col.id}
                className={`col-card${isSelected ? ' selected' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(col)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(col); } }}>
                {editMode && (
                  <div className="card-checkbox" aria-hidden="true">
                    {isSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                )}
                <CollectionCoverGrid books={books} />
                <div className="col-card-body">
                  <div className="col-card-info">
                    <div className="col-card-name">{col.name}</div>
                    <div className="col-card-count">{t.colBookCount(books.length)}</div>
                  </div>
                  {!editMode && <ColCardKebab col={col} onRename={onRename} onDelete={onDelete} t={t} />}
                </div>
              </div>
            );
          })}
        </div>
      )}

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
