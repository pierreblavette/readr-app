"use client";
import { useState, useEffect } from "react";
import { coverColors, coverLetter, fetchBookCover, loadGBCache, saveGBCache } from "@/lib/bookUtils";

export default function BookPanel({ book, tab, onClose, onDelete, onMoveToLibrary, t }) {
  const [cover, setCover] = useState(null);
  const [synopsis, setSynopsis] = useState(null);

  useEffect(() => {
    if (book) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [book]);

  useEffect(() => {
    if (!book) return;
    setCover(null);
    setSynopsis(null);
    const cache = loadGBCache();
    const key   = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) {
      setCover(cache[key]?.thumb || null);
      setSynopsis(cache[key]?.description || null);
      return;
    }
    fetchBookCover(book.title, book.author, cache).then(res => {
      const next = { ...cache, [key]: res };
      saveGBCache(next);
      setCover(res?.thumb || null);
      setSynopsis(res?.description || null);
    });
  }, [book]);

  const [c1, c2] = book ? coverColors(book.title) : ['#ccc', '#aaa'];
  const letter   = book ? coverLetter(book.title) : '';

  return (
    <div className={`book-panel${book ? ' open' : ''}`}>
      {book && (
        <div className="panel-inner">

          {/* Share button */}
          <button className="panel-share">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>

          {/* Close button */}
          <button className="panel-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Cover */}
          <div className={`panel-cover-wrap${cover ? '' : ' panel-cover-empty'}`} style={{ background: cover ? `linear-gradient(135deg, ${c1}, ${c2})` : undefined }}>
            {cover && <img src={cover} alt={book.title} className="panel-cover-img" />}
          </div>

          {/* Body */}
          <div className="panel-body">
            <div className="panel-title">{book.title}</div>
            <div className="panel-author">{book.author}</div>
            <div className="panel-meta">
              {book.genre && <span>{book.genre}</span>}
              {book.genre && book.year && <span className="panel-meta-sep">·</span>}
              {book.year && <span>{book.year}</span>}
            </div>
            {synopsis
              ? <div className="panel-synopsis">{synopsis}</div>
              : <div className="panel-synopsis-placeholder">No synopsis available.</div>
            }
            <div className="panel-actions">
              {tab === 'wishlist' && (
                <button className="panel-move-btn" onClick={() => onMoveToLibrary(book)}>
                  {t.selConfirmOwned || 'Move to Library'}
                </button>
              )}
              <button className="panel-delete-btn" onClick={() => { onDelete(book); onClose(); }}>
                {t.btnDelete || 'Delete'}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
