"use client";
import { useState, useRef, useEffect } from "react";

export default function SortMenu({ current, onChange, options, ariaLabel }) {
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

  const currentOpt = options.find(o => o.key === current) || options[0];

  return (
    <div className="dropdown-wrap sort-menu" ref={ref}>
      <button
        type="button"
        className="export-btn sort-menu-btn"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        {currentOpt.label}
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ width: 14, height: 14, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown-menu" role="listbox">
          {options.map(opt => (
            <button
              key={opt.key}
              className="dropdown-item"
              role="option"
              aria-selected={opt.key === current}
              onClick={() => { onChange(opt.key); setOpen(false); }}
            >
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ width: 14, height: 14, flexShrink: 0, opacity: opt.key === current ? 1 : 0 }}
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
