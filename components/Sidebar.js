"use client";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Sidebar({
  tab, setTab, data, collections,
  collapsed, onToggleCollapse,
  onCreateCollection, onOpenCollection, activeCollection,
  t, lang, setLang,
  mobileOpen, onCloseMobile,
}) {
  const { theme, setTheme } = useTheme();
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  function handleNav(key) {
    setTab(key);
    onCloseMobile?.();
  }

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onCloseMobile} />
      )}

      <aside className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>

        {/* Logo + collapse */}
        <div className="sidebar-logo">
          {collapsed ? (
            <button className="sidebar-logo-collapse" onClick={onToggleCollapse} aria-label="Expand sidebar">
              <span className="sidebar-logo-mark">r</span>
            </button>
          ) : (
            <>
              <span className="logo">readr</span>
              <button className="sidebar-logo-collapse sidebar-logo-collapse--arrow" onClick={onToggleCollapse} aria-label="Collapse sidebar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Primary nav */}
        <nav className="sidebar-nav">
          {!collapsed && (
            <div className="sidebar-section-head sidebar-section-head--no-action">
              <span className="sidebar-section-label">{t.tabLibrary || 'My Library'}</span>
            </div>
          )}
          {[
            { key: 'owned',    label: t.tabLibrary,  count: data.owned.length,    icon: <LibIcon /> },
            { key: 'wishlist', label: t.tabWishlist, count: data.wishlist.length,  icon: <WishIcon /> },
          ].map(({ key, label, count, icon }) => (
            <button key={key}
              className={`sidebar-item${tab === key ? ' active' : ''}${key === 'owned' ? ' sidebar-item--owned' : ''}`}
              onClick={() => handleNav(key)}>
              <span className="sidebar-icon">{icon}</span>
              {!collapsed && (
                <>
                  <span className="sidebar-label">{label}</span>
                  <span className="sidebar-badge">{count}</span>
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Collections */}
        <div className="sidebar-section">
          {!collapsed ? (
            <div className="sidebar-section-head-row">
              <div className="sidebar-section-head" onClick={() => { setCollectionsOpen(o => !o); setTab('collections'); onCloseMobile?.(); }}>
                <svg className={`sidebar-section-chevron${collectionsOpen ? ' open' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
                <span className="sidebar-section-label">Collections</span>
              </div>
              <button className="sidebar-section-add"
                onClick={e => { e.stopPropagation(); onCreateCollection?.(); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
          ) : (
            <button className={`sidebar-item${tab === 'collections' ? ' active' : ''}`} onClick={() => handleNav('collections')}>
              <span className="sidebar-icon"><ColIcon /></span>
            </button>
          )}

          {!collapsed && collectionsOpen && collections.map(col => (
            <button key={col.id}
              className={`sidebar-item sidebar-col-item${tab === 'collections' && activeCollection === col.id ? ' active' : ''}`}
              onClick={() => { handleNav('collections'); onOpenCollection?.(col); }}>
              <span className="sidebar-col-emoji">{col.emoji}</span>
              <span className="sidebar-label">{col.name}</span>
            </button>
          ))}

          {!collapsed && collectionsOpen && collections.length === 0 && (
            <div className="sidebar-empty">
              {t.colEmpty || 'No collections yet'}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="sidebar-bottom">

          {!collapsed && (
            <div className="sidebar-appearance-row">
              <span className="sidebar-appearance-label">
                {t.themeAppearance || 'Appearance'}
              </span>
              <button
                className="theme-btn"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme">
                <span className="toggle-thumb">
                  {theme === 'dark'
                    ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    : <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                  }
                </span>
              </button>
            </div>
          )}

        </div>

      </aside>
    </>
  );
}

function LibIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}

function WishIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function ColIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
