"use client";
import { useState } from "react";

export default function AddModal({ open, onClose, onAdd, t }) {
  const [title,  setTitle]  = useState('');
  const [author, setAuthor] = useState('');
  const [year,   setYear]   = useState('');
  const [genre,  setGenre]  = useState('');
  const [error,  setError]  = useState('');

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) { setError('Title and author are required.'); return; }
    onAdd({ title: title.trim(), author: author.trim(), year: year.trim() || null, genre: genre.trim() || null });
    setTitle(''); setAuthor(''); setYear(''); setGenre(''); setError('');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] shadow-xl p-6"
        style={{ background: 'var(--card)' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[var(--text)]">{t.modalTitle}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-3)] hover:bg-[var(--bg3)] transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { label: t.labelTitle,  ph: t.placeholderTitle,  val: title,  set: setTitle,  required: true },
            { label: t.labelAuthor, ph: t.placeholderAuthor, val: author, set: setAuthor, required: true },
            { label: t.labelYear,   ph: t.placeholderYear,   val: year,   set: setYear },
            { label: t.labelGenre,  ph: t.placeholderGenre,  val: genre,  set: setGenre },
          ].map(({ label, ph, val, set }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--text-2)]">{label}</label>
              <input
                className="h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-3)]"
                placeholder={ph} value={val} onChange={e => set(e.target.value)}
              />
            </div>
          ))}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center justify-end gap-3 mt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-2)] hover:bg-[var(--bg3)] transition-colors">
              {t.btnCancel}
            </button>
            <button type="submit"
              className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--primary-60)] transition-colors">
              {t.btnAddLibrary}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
