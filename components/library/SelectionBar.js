"use client";

export default function SelectionBar({ editMode, selected, books, tab, t, onCancel, onSelectAll, onConfirm }) {
  const count       = selected.size;
  const allSelected = count === books.length && books.length > 0;

  return (
    <div className={`selection-bar${editMode ? ' visible' : ''}`}>

      <span className="selection-count">{t.selCount(count)}</span>

      <div className="sel-actions">
        <button className="sel-btn sel-select-all" onClick={onSelectAll}>
          {allSelected ? t.selDeselectAll : t.selSelectAll}
        </button>
        {tab === 'wishlist' && (
          <button className="sel-btn sel-confirm" disabled={count === 0} onClick={() => onConfirm('move')}>
            {t.selConfirmOwned}
          </button>
        )}
        <button className="sel-btn sel-confirm danger" disabled={count === 0} onClick={() => { if (count > 0) onConfirm('delete'); }}>
          {t.selConfirmRemove}
        </button>
      </div>

      <button className="sel-btn sel-cancel" onClick={onCancel}>
        <span>{t.selCancel}</span>
      </button>

    </div>
  );
}
