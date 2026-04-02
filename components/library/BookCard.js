"use client";
import { useState, useEffect } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "@/lib/bookUtils";

export default function BookCard({ book, tab, editMode, selected, onToggleSelect, onOpen, onDelete, t }) {
  const [cover, setCover] = useState(null);
  const isSelected = selected.has(book.id);
  const [c1, c2] = coverColors(book.title);
  const letter   = coverLetter(book.title);

  useEffect(() => {
    const cache = loadGBCache();
    const key   = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) { setCover(cache[key]?.thumb || null); return; }
    fetchBookCover(book.title, book.author, cache).then(res => {
      const next = { ...cache, [key]: res };
      saveGBCache(next);
      setCover(res?.thumb || null);
    });
  }, [book.title, book.author]);

  return (
    <div onClick={() => editMode ? onToggleSelect(book.id) : onOpen(book)}
      className={`relative rounded-lg border overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 group ${
        isSelected
          ? 'border-[var(--accent)] outline outline-2 outline-[var(--accent)] outline-offset-1'
          : 'border-[var(--border)] hover:border-[var(--primary-30)]'
      }`}
      style={{ background: 'var(--card)', animationFillMode: 'both' }}>

      {/* Cover */}
      <div className="relative w-full aspect-[3/4] flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
        {cover
          ? <img src={cover} alt={book.title} className="w-full h-full object-cover" />
          : <span className="text-white text-4xl font-bold opacity-80 select-none">{letter}</span>
        }
        {tab === 'wishlist' && (
          <span className="absolute top-2 right-2 text-[9px] font-bold bg-[var(--accent)] text-white px-1.5 py-0.5 rounded-full">
            {t.wishBadge}
          </span>
        )}

        {/* Edit checkbox */}
        {editMode && (
          <div className={`absolute top-2 left-2 w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
            isSelected ? 'bg-[var(--accent)] border-[var(--accent)]' : 'bg-white/80 border-white/60'
          }`}>
            {isSelected && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
          </div>
        )}

        {/* Delete on hover (non-edit mode) */}
        {!editMode && (
          <button onClick={e => { e.stopPropagation(); onDelete(book); }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
            </svg>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-sm font-semibold text-[var(--text)] leading-tight line-clamp-2">{book.title}</div>
        <div className="text-xs text-[var(--text-2)] mt-1 truncate">{book.author}</div>
        {(book.genre || book.year) && (
          <div className="flex items-center gap-1 mt-2 flex-wrap">
            {book.genre && <span className="text-[10px] font-semibold bg-[var(--bg3)] text-[var(--text-3)] px-1.5 py-0.5 rounded-full">{book.genre}</span>}
            {book.year  && <span className="text-[10px] font-semibold bg-[var(--bg3)] text-[var(--text-3)] px-1.5 py-0.5 rounded-full">{book.year}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
