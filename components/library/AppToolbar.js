"use client";
import { useTheme } from "next-themes";

export default function AppToolbar({
  lang, setLang, t,
  view, switchView,
  editMode, setEditMode, setSelected,
  setAddModal, exportData,
  onOpenSidebar,
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="toolbar toolbar-mobile-only">
      <div className="toolbar-inner">

        {/* Hamburger (mobile) */}
        <button className="toolbar-hamburger" onClick={onOpenSidebar} aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Logo */}
        <div className="logo">readr</div>

        {/* Right controls */}
        <div className="toolbar-right">

          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-btn" aria-label="Toggle theme">
            <span className="toggle-thumb">
              {theme === 'dark'
                ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                : <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
              }
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
