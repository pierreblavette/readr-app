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
    <div className="sticky top-0 z-50 border-b border-[var(--border)]"
      style={{ background: "var(--nav)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div className="flex items-center px-10 h-[60px] gap-4">

        {/* Logo */}
        <div className="font-heading text-[19px] font-normal tracking-[-0.02em] text-[var(--text)] select-none flex-shrink-0">
          readr
        </div>

        {/* Tabs */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1 bg-[var(--bg3)] p-1 rounded-xl">
            {[
              { key: 'owned',    label: t.tabLibrary,   count: ownedCount },
              { key: 'wishlist', label: t.tabWishlist,  count: wishlistCount },
            ].map(({ key, label, count }) => (
              <button key={key}
                onClick={() => handleTab(key)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  tab === key
                    ? 'bg-white text-[var(--text)] shadow-sm'
                    : 'text-[var(--text-2)] hover:text-[var(--text)]'
                }`}>
                {label}
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                  tab === key ? 'bg-[var(--primary-10)] text-[var(--accent)]' : 'bg-[var(--border)] text-[var(--text-3)]'
                }`}>{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Lang */}
          <div className="flex items-center gap-1 text-xs font-semibold">
            {['en','fr'].map((l, i) => (
              <>
                {i > 0 && <span key={`sep-${l}`} className="text-[var(--border)]">·</span>}
                <button key={l} onClick={() => setLang(l)}
                  className={`px-1 ${lang === l ? 'text-[var(--accent)]' : 'text-[var(--text-3)] hover:text-[var(--text)]'}`}>
                  {l.toUpperCase()}
                </button>
              </>
            ))}
          </div>

          {/* Theme toggle */}
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-12 h-6 rounded-full relative flex items-center px-1.5 transition-colors duration-300"
            style={{ background: theme === 'dark' ? '#4959E6' : '#E0E0E0' }}>
            <span className={`w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-transform duration-300 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}>
              {theme === 'dark'
                ? <svg className="w-2.5 h-2.5 text-[#4959E6]" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                : <svg className="w-2.5 h-2.5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/></svg>
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
