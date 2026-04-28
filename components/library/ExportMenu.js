"use client";
import { useState, useRef, useEffect } from "react";

export default function ExportMenu({ exportData, exportPDF, exportMD, disabled, t }) {
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
        aria-label={t.btnExport}
      >
        <svg
          className="export-btn-icon"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span className="export-btn-label">{t.btnExport}</span>
        <svg
          className="export-btn-chevron"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="dropdown-menu" role="listbox">
          {exportPDF && (
            <button
              className="dropdown-item"
              role="option"
              onClick={() => { exportPDF(); setOpen(false); }}
            >
              pdf
            </button>
          )}
          {exportMD && (
            <button
              className="dropdown-item"
              role="option"
              onClick={() => { exportMD(); setOpen(false); }}
            >
              md
            </button>
          )}
          {exportData && (
            <button
              className="dropdown-item"
              role="option"
              onClick={() => { exportData(); setOpen(false); }}
            >
              json
            </button>
          )}
        </div>
      )}
    </div>
  );
}
