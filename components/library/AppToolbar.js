"use client";
import { useTheme } from "next-themes";

export default function AppToolbar({
  tab, setTab, lang, setLang, t,
  data, view, switchView,
  editMode, setEditMode, setSelected,
  setAddModal, exportData,
}) {
  const { theme, setTheme } = useTheme();
  const ownedCount    = data.owned.length;
  const wishlistCount = data.wishlist.length;

  function handleTab(newTab) {
    setTab(newTab);
    setEditMode(false);
    setSelected(new Set());
  }

  return (
    <div className="toolbar">
      <div className="toolbar-inner">

        {/* Logo */}
        <div className="logo">readr</div>

        {/* Tabs */}
        <div className="toolbar-tabs">
          <div className="tabs">
            {[
              { key: 'owned',    label: t.tabLibrary,  count: ownedCount },
              { key: 'wishlist', label: t.tabWishlist, count: wishlistCount },
            ].map(({ key, label, count }) => (
              <button key={key}
                onClick={() => handleTab(key)}
                className={`tab${tab === key ? ' active' : ''}`}>
                {label}
                <span className="badge">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right controls */}
        <div className="toolbar-right">
          {/* Lang */}
          <div className="lang-toggle">
            <button onClick={() => setLang('en')} className={`lang-btn${lang === 'en' ? ' active' : ''}`}>EN</button>
            <span className="lang-sep">·</span>
            <button onClick={() => setLang('fr')} className={`lang-btn${lang === 'fr' ? ' active' : ''}`}>FR</button>
          </div>

          <div className="toolbar-divider" />

          {/* Theme toggle */}
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
