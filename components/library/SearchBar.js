"use client";
import ExportMenu from "@/components/library/ExportMenu";

export default function SearchBar({ search, setSearch, t, editMode, setEditMode, setSelected, tab, data, exportData, exportPDF, setAddModal, view, switchView }) {
  return (
    <div className="search-row">
      {/* Search box */}
      <div className="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className={`search-clear${search ? ' visible' : ''}`}
          onClick={() => setSearch('')}
          aria-label="Clear search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Actions */}
      <div className="counter-actions">
        <button
          onClick={() => setAddModal(true)}
          className="add-btn"
          disabled={editMode}
          aria-disabled={editMode}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {t.btnAdd}
        </button>

        <div className="counter-secondary-actions">
          {data[tab].length > 0 && (
            <button
              onClick={() => { setEditMode(!editMode); if (editMode) setSelected(new Set()); }}
              className="edit-btn">
              {editMode ? t.btnDone : t.btnEdit}
            </button>
          )}

          <ExportMenu
            exportData={exportData}
            exportPDF={exportPDF}
            disabled={data[tab].length === 0}
            t={t}
          />
        </div>

        {/* View toggle */}
        <div className="view-btns">
          <button onClick={() => switchView('grid')} className={`view-btn${view === 'grid' ? ' active' : ''}`} title="Card view">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
          </button>
          <button onClick={() => switchView('list')} className={`view-btn${view === 'list' ? ' active' : ''}`} title="List view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
