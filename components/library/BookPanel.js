"use client";
import { useState, useEffect } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "@/lib/bookUtils";

export default function BookPanel({ book, onClose, onDelete, t }) {
  const [cover, setCover] = useState(null);

  useEffect(() => {
    if (!book) return;
    setCover(null);
    const cache = loadGBCache();
    const key   = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) { setCover(cache[key]?.thumb || null); return; }
    fetchBookCover(book.title, book.author, cache).then(res => {
      const next = { ...cache, [key]: res };
      saveGBCache(next);
      setCover(res?.thumb || null);
    });
  }, [book]);

  const [c1, c2] = book ? coverColors(book.title) : ['#ccc','#aaa'];
  const letter   = book ? coverLetter(book.title) : '';

  return (
    <div className={`fixed top-[60px] right-0 h-[calc(100vh-60px)] w-[420px] border-l border-[var(--border)] z-40 overflow-y-auto transition-transform duration-300 ${book ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ background: 'var(--card)', backdropFilter: 'blur(16px)' }}>

      {book && (
        <div className="flex flex-col">
          {/* Cover */}
          <div className="relative w-full h-56 flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
            {cover
              ? <img src={cover} alt={book.title} className="h-full w-auto max-w-full object-contain p-4" />
              : <span className="text-white text-6xl font-bold opacity-80 select-none">{letter}</span>
            }
            <button onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-[1.75rem] font-normal leading-tight tracking-[-0.02em] text-[var(--text)]">
                {book.title}
              </h2>
              <p className="text-base text-[var(--text-2)] mt-1">{book.author}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {book.genre && <span className="text-xs font-semibold bg-[var(--bg3)] text-[var(--text-2)] px-2.5 py-1 rounded-full">{book.genre}</span>}
              {book.year  && <span className="text-xs font-semibold bg-[var(--bg3)] text-[var(--text-2)] px-2.5 py-1 rounded-full">{book.year}</span>}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <button onClick={() => onDelete(book)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                </svg>
                {t.deleteBtnConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
