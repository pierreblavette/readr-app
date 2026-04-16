"use client";
import { useState, useRef, useEffect } from "react";

export default function ExportMenu({ exportData, exportPDF, disabled, t }) {
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
    <div className="dropdown-wrap" ref={ref}>
      <button
        className="export-btn"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {t.btnExport}
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
          <button
            className="dropdown-item"
            role="option"
            onClick={() => { exportData(); setOpen(false); }}
          >
            json
          </button>
          <button
            className="dropdown-item"
            role="option"
            onClick={() => { exportPDF(); setOpen(false); }}
          >
            pdf
          </button>
        </div>
      )}
    </div>
  );
}
