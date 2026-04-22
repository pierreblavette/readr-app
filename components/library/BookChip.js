"use client";
import { useEffect, useState } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "../../lib/bookUtils";

export default function BookChip({ book, onRemove, onClick, ariaLabel }) {
  const [cover, setCover] = useState(null);
  const [c1, c2] = coverColors(book.title);
  const letter = coverLetter(book.title);

  useEffect(() => {
    const cache = loadGBCache();
    const key = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) { setCover(cache[key]?.thumb || null); return; }
    fetchBookCover(book.title, book.author, cache).then(res => {
      saveGBCache({ ...cache, [key]: res });
      setCover(res?.thumb || null);
    });
  }, [book.title, book.author]);

  const inner = (
    <>
      <div
        className={`quote-book-chip-cover${cover ? '' : ' quote-book-chip-cover-placeholder'}`}
        style={{ background: cover ? undefined : `linear-gradient(135deg, ${c1}, ${c2})` }}
      >
        {cover ? <img src={cover} alt="" /> : <span>{letter}</span>}
      </div>
      <div className="quote-book-chip-body">
        <div className="quote-book-chip-title">{book.title}</div>
        {book.author && <div className="quote-book-chip-author">{book.author}</div>}
      </div>
      {onRemove && (
        <button type="button" className="quote-book-chip-remove" onClick={onRemove} aria-label={ariaLabel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className="quote-book-chip quote-book-chip-interactive" onClick={onClick}>
        {inner}
      </button>
    );
  }

  return <div className="quote-book-chip">{inner}</div>;
}
