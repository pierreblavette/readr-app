"use client";

export default function DeleteModal({ book, onClose, onConfirm, t }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] shadow-xl p-6"
        style={{ background: 'var(--card)' }}>
        <h3 className="text-base font-bold text-[var(--text)]">{t.deleteTitle}</h3>
        <p className="mt-2 text-sm text-[var(--text-2)]">{t.deleteMsg(book.title)}</p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-2)] hover:bg-[var(--bg3)] transition-colors">
            {t.deleteBtnCancel}
          </button>
          <button onClick={() => { onConfirm(book.id); onClose(); }}
            className="px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">
            {t.deleteBtnConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
