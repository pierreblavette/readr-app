"use client";

export default function SearchBar({ search, setSearch, t, editMode, setEditMode, setSelected, tab, data, exportData, setAddModal, view, switchView }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="flex items-center gap-2 flex-1 min-w-[200px] h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus-within:border-[var(--accent)] transition-colors">
        <svg className="w-4 h-4 text-[var(--text-3)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-3)]"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-[var(--text-3)] hover:text-[var(--text)] transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button onClick={() => setAddModal(true)}
          className="h-9 px-4 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--primary-60)] transition-colors">
          {t.btnAdd}
        </button>
        {data[tab].length > 0 && (
          <button onClick={() => { setEditMode(!editMode); if (editMode) setSelected(new Set()); }}
            className="h-9 px-4 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            {editMode ? t.btnDone : t.btnEdit}
          </button>
        )}
        <button onClick={exportData} disabled={data.owned.length + data.wishlist.length === 0}
          className="h-9 px-4 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {t.btnExport}
        </button>

        {/* View toggle */}
        <div className="flex items-center gap-0.5 border border-[var(--border)] rounded-lg p-0.5">
          {[
            { key: 'grid', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg> },
            { key: 'list', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg> },
          ].map(({ key, icon }) => (
            <button key={key} onClick={() => switchView(key)}
              className={`w-8 h-7 flex items-center justify-center rounded-md transition-colors ${view === key ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-3)] hover:text-[var(--text)]'}`}>
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
