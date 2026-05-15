"use client";
import { useState, useRef, useEffect } from "react";

export default function GenresMenu({ selected, onToggle, availableGenres, counts = {}, t }) {
  const [open, setOpen] = useState(false);
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

  const count = selected.size;
  const isActive = count > 0;
  const label = t.filterGenres || 'Genres';

  if (availableGenres.length === 0) return null;

  return (
    <div className="dropdown-wrap sort-menu genres-menu" ref={ref}>
      <button
        type="button"
        className={`dropdown-btn sort-menu-btn${isActive ? ' is-active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}>
        <span className="sort-menu-btn-label">{label}</span>
        {count > 0 && <span className="filter-badge">{count}</span>}
        <svg
          className="dropdown-btn-chevron"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown-menu filter-dropdown" role="listbox">
          <div className="filter-section">
            {availableGenres.map(genre => {
              const isSelected = selected.has(genre);
              return (
                <div
                  key={genre}
                  className="filter-row"
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => onToggle(genre)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(genre); } }}>
                  <span className={`row-checkbox${isSelected ? ' is-selected' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span className="dropdown-item-label">{genre}</span>
                  <span className="dropdown-item-count-wrap">
                    {counts[genre] !== undefined && (
                      <span className="dropdown-item-count sidebar-badge">{counts[genre]}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
