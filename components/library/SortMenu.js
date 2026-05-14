"use client";
import { useState, useRef, useEffect } from "react";

export default function SortMenu({ current, onChange, options, ariaLabel, defaultTriggerLabel, triggerIcon, className }) {
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

  const currentOpt = options.find(o => o.key === current) || options[0];
  const isDefaultSelection = current === options[0].key;
  const triggerLabel = (defaultTriggerLabel && isDefaultSelection)
    ? defaultTriggerLabel
    : (currentOpt.triggerLabel ?? currentOpt.label);

  return (
    <div className={`dropdown-wrap sort-menu${className ? ' ' + className : ''}`} ref={ref}>
      <button
        type="button"
        className={`dropdown-btn sort-menu-btn${defaultTriggerLabel && !isDefaultSelection ? ' is-active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        {triggerIcon}
        <span className="sort-menu-btn-label">{triggerLabel}</span>
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
              <span className="dropdown-item-label">{opt.label}</span>
              <span className="dropdown-item-count-wrap">
                {opt.count !== undefined && <span className="dropdown-item-count sidebar-badge">{opt.count}</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
