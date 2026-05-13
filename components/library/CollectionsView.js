"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import SelectionBar from "./SelectionBar";
import CollectionCoverGrid from "./CollectionCoverGrid";
import NoMatchesIcon from "./NoMatchesIcon";

function CollectionsIcon() {
  return (
    <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
      <path d="M7 52C7 53.1046 7.89543 54 9 54H51C52.1046 54 53 53.1046 53 52V8C53 6.89543 52.1046 6 51 6H9C7.89543 6 7 6.89543 7 8V52Z" fill="var(--illus-bg-2)"/>
      <path d="M40 6H9C7.89543 6 7 6.89543 7 8V52C7 53.1046 7.89543 54 9 54H51C52.1046 54 53 53.1046 53 52V8C53 6.89543 52.1046 6 51 6H44" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M9 9C9 8.44771 9.44772 8 10 8H16C16.5523 8 17 8.44772 17 9V51C17 51.5523 16.5523 52 16 52H10C9.44772 52 9 51.5523 9 51V9Z" fill="var(--illus-bg-2)"/>
      <path d="M17 36V9C17 8.44772 16.5523 8 16 8H10C9.44772 8 9 8.44771 9 9V51C9 51.5523 9.44772 52 10 52H16C16.5523 52 17 51.5523 17 51V40" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M19 15C19 14.4477 19.4477 14 20 14H27C27.5523 14 28 14.4477 28 15V51C28 51.5523 27.5523 52 27 52H20C19.4477 52 19 51.5523 19 51L19 15Z" fill="var(--illus-mid)"/>
      <path d="M28 28V51C28 51.5523 27.5523 52 27 52H20C19.4477 52 19 51.5523 19 51L19 15C19 14.4477 19.4477 14 20 14H27C27.5523 14 28 14.4477 28 15V24" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M30 13C30 12.4477 30.4477 12 31 12H40C40.5523 12 41 12.4477 41 13V51C41 51.5523 40.5523 52 40 52H31C30.4477 52 30 51.5523 30 51V13Z" fill="var(--illus-accent-1)"/>
      <path d="M41 44V13C41 12.4477 40.5523 12 40 12H31C30.4477 12 30 12.4477 30 13V51C30 51.5523 30.4477 52 31 52H40C40.5523 52 41 51.5523 41 51V48" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M43 17C43 16.4477 43.4477 16 44 16H50C50.5523 16 51 16.4477 51 17V51C51 51.5523 50.5523 52 50 52H44C43.4477 52 43 51.5523 43 51V17Z" fill="var(--illus-accent-2)"/>
      <path d="M51 24V51C51 51.5523 50.5523 52 50 52H44C43.4477 52 43 51.5523 43 51V17C43 16.4477 43.4477 16 44 16H50C50.5523 16 51 16.4477 51 17V20" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M11 14H15" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M21 22H26" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M32 18H39" stroke="var(--illus-stroke)" strokeLinecap="round"/>
      <path d="M45 24H49" stroke="var(--illus-bg-1)" strokeLinecap="round"/>
    </svg>
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
          <NoMatchesIcon />
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
