"use client";
import { memo, useCallback, useEffect, useState } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "@/lib/bookUtils";
import BookCardKebab from "./BookCardKebab";

function BookCard({ book, tab, editMode, selected, onToggleSelect, onOpen, onDelete, onStartReading, onFinishReading, onCancelReading, onAddQuoteFromBook, onEditFinished, onMoveToLibrary, onShared, readingCount, maxReading, t }) {
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

  const handleActivate = useCallback(() => {
    editMode ? onToggleSelect(book.id) : onOpen(book);
  }, [editMode, book, onToggleSelect, onOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  }, [handleActivate]);

  return (
    <div
      role={editMode ? "checkbox" : "button"}
      aria-checked={editMode ? isSelected : undefined}
      aria-label={`${book.title}, ${book.author}`}
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      className={`book-card${isSelected ? ' selected' : ''}`}>

      {/* Cover */}
      <div
        className={`book-cover${cover ? '' : ' book-cover-placeholder'}`}
        style={{ background: cover ? undefined : `linear-gradient(135deg, ${c1}, ${c2})` }}>
        {cover ? (
          <img
            src={cover}
            alt=""
            width="160"
            height="148"
            loading="lazy"
            decoding="async"
            className="panel-cover-img"
          />
        ) : (
          <span className="cover-letter">{letter}</span>
        )}

        {tab === 'wishlist' && !cover && (
          <span className="wishlist-badge">{t.wishBadge}</span>
        )}

        {/* Checkbox in edit mode */}
        {editMode && (
          <div className="card-checkbox" aria-hidden="true">
            {isSelected && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="book-body">
        <div className="book-body-info">
          <div className="book-title">{book.title}</div>
          <div className="book-author">{book.author}</div>
          <div className="book-meta">
            <span>{book.genre || 'NC'}</span>
            <span className="book-meta-sep" aria-hidden="true">·</span>
            <span>{book.year || 'NC'}</span>
          </div>
        </div>
        {!editMode && (
          <BookCardKebab
            book={book}
            tab={tab}
            readingCount={readingCount}
            maxReading={maxReading}
            onStartReading={onStartReading}
            onFinishReading={onFinishReading}
            onCancelReading={onCancelReading}
            onAddQuoteFromBook={onAddQuoteFromBook}
            onEditFinished={onEditFinished}
            onMoveToLibrary={onMoveToLibrary}
            onDelete={onDelete}
            onShared={onShared}
            t={t}
          />
        )}
      </div>
    </div>
  );
}

export default memo(BookCard);
