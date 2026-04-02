"use client";

export default function SelectionBar({ selected, books, tab, t, onCancel, onSelectAll, onConfirm }) {
  const count     = selected.size;
  const allSelected = count === books.length && books.length > 0;

  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border border-[var(--border)]"
      style={{ background: 'var(--card)', backdropFilter: 'blur(16px)' }}>
      <button onClick={onCancel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-[var(--text-2)] hover:bg-[var(--bg3)] transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        {t.selCancel}
      </button>

      <span className="text-sm font-semibold text-[var(--text-2)] px-2">{t.selCount(count)}</span>

      <button onClick={onSelectAll}
        className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[var(--text-2)] hover:bg-[var(--bg3)] transition-colors">
        {allSelected ? t.selDeselectAll : t.selSelectAll}
      </button>

      <button onClick={() => onConfirm('delete')}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        </svg>
        {t.selConfirmRemove}
      </button>

      {tab === 'wishlist' && (
        <button onClick={() => onConfirm('move')}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--primary-60)] transition-colors">
          {t.selConfirmOwned}
        </button>
      )}
    </div>
  );
}
