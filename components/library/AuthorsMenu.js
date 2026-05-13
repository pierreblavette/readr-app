"use client";
import { useState, useRef, useEffect } from "react";

export default function AuthorsMenu({ selected, onToggle, onReset, availableAuthors, counts = {}, t }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Reset internal search when the menu closes so reopening starts fresh.
  useEffect(() => { if (!open) setSearch(''); }, [open]);

  const count = selected.size;
  const isActive = count > 0;
  const label = t.filterAuthors || 'Authors';

  if (availableAuthors.length === 0) return null;

  const q = search.trim().toLowerCase();
  const filtered = q
    ? availableAuthors.filter(a => a.toLowerCase().includes(q))
    : availableAuthors;

  return (
    <div className="dropdown-wrap sort-menu authors-menu" ref={ref}>
      <button
        type="button"
        className={`dropdown-btn sort-menu-btn${isActive ? ' is-active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}>
        {label}
        {count > 0 && <span className="filter-badge">{count}</span>}
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ width: 14, height: 14, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
          aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown-menu filter-dropdown authors-dropdown" role="listbox">
          <div className="authors-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="authors-search-input"
              placeholder={t.placeholderAuthor || 'e.g. F. Scott Fitzgerald'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="authors-list">
            {filtered.length === 0 ? (
              <div className="authors-empty">{t.emptyNoMatch || 'No matches'}</div>
            ) : filtered.map(author => {
              const isSelected = selected.has(author);
              return (
                <div
                  key={author}
                  className="filter-row"
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => onToggle(author)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(author); } }}>
                  <span className={`row-checkbox${isSelected ? ' is-selected' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span className="dropdown-item-label">{author}</span>
                  <span className="dropdown-item-count-wrap">
                    {counts[author] !== undefined && (
                      <span className="dropdown-item-count sidebar-badge">{counts[author]}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          {isActive && (
            <div className="authors-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onReset}>
                {t.filterAuthorsReset || 'Reset'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
