"use client";
import { memo, useCallback, useEffect, useState } from "react";
import { fetchBookCover, getCoverFromCache, setCoverInCache, loadGBCache } from "@/lib/bookUtils";
import BookCardKebab from "./BookCardKebab";

function BookCard({ book, tab, editMode, selected, onToggleSelect, onOpen, onDelete, onStartReading, onFinishReading, onCancelReading, onAddQuoteFromBook, onEditFinished, onMoveToLibrary, onShared, readingCount, maxReading, t }) {
  // Lazy init : lit le cache singleton au 1er render → pas de flash placeholder.
  const [cover, setCover] = useState(() => getCoverFromCache(book.title, book.author)?.thumb || null);
  // Tracke le load réel de l'<img> — shimmer visible tant que l'image n'a
  // pas fini son fetch (HTTP cache miss au remount → re-download network).
  const [imageLoaded, setImageLoaded] = useState(false);
  const isSelected = selected.has(book.id);

  useEffect(() => {
    const cached = getCoverFromCache(book.title, book.author);
    if (cached !== undefined) { setCover(cached?.thumb || null); return; }
    fetchBookCover(book.title, book.author, loadGBCache()).then(res => {
      setCoverInCache(book.title, book.author, res);
      setCover(res?.thumb || null);
    });
  }, [book.title, book.author]);

  // Reset l'état loaded quand la URL change (nouveau book ou nouvelle cover).
  useEffect(() => { setImageLoaded(false); }, [cover]);

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
      <div className={`book-cover${cover && imageLoaded ? '' : ' book-cover-placeholder'}`}>
        {cover && (
          <img
            src={cover}
            alt=""
            width="160"
            height="148"
            loading="eager"
            decoding="sync"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            className="panel-cover-img"
          />
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
