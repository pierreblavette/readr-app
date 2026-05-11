"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function BookCardKebab({ book, tab, readingCount, maxReading, onStartReading, onFinishReading, onCancelReading, onAddQuoteFromBook, onEditFinished, onMoveToLibrary, onDelete, onShared, t }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const isWishlist = tab === 'wishlist';
  const isFinished = !!book.finishedAt;
  const isReading = !!book.startedAt && !book.finishedAt;
  const isNotStarted = !book.startedAt && !book.finishedAt;
  const canStartReading = (readingCount ?? 0) < (maxReading ?? Infinity);

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (btnRef.current?.contains(e.target)) return;
      if (menuRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function onScroll() { setOpen(false); }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open]);

  function handleToggle() {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(o => !o);
  }

  async function handleShare() {
    setOpen(false);
    const text = t.shareText ? t.shareText(book.title, book.author) : `"${book.title}"\n${book.author}`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(text); onShared?.(); } catch {}
    }
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="col-card-kebab"
        onClick={e => { e.stopPropagation(); handleToggle(); }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.moreActions}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="6" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="18" r="2"/>
        </svg>
      </button>
      {open && pos && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          className="dropdown-menu dropdown-menu--portal"
          role="menu"
          style={{ position: 'fixed', top: pos.top, right: pos.right }}
          onClick={e => e.stopPropagation()}>
          {isWishlist && onMoveToLibrary && (
            <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onMoveToLibrary(book); }}>
              {t.selConfirmOwned}
            </button>
          )}
          {!isWishlist && isNotStarted && onStartReading && (
            <button type="button" className="dropdown-item" disabled={!canStartReading} title={!canStartReading ? t.nowReadingLimit : undefined}
                    onClick={() => { if (!canStartReading) return; setOpen(false); onStartReading(book); }}>
              {t.btnStartReading}
            </button>
          )}
          {!isWishlist && isReading && (
            <>
              {onFinishReading && (
                <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onFinishReading(book); }}>
                  {t.btnFinishReading}
                </button>
              )}
              {onAddQuoteFromBook && (
                <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onAddQuoteFromBook(book); }}>
                  {t.quoteAdd}
                </button>
              )}
              {onCancelReading && (
                <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onCancelReading(book); }}>
                  {t.btnCancelReading}
                </button>
              )}
            </>
          )}
          {!isWishlist && isFinished && onEditFinished && (
            <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onEditFinished(book); }}>
              {(book.rating || book.note) ? t.btnEditReview : t.btnAddReview}
            </button>
          )}
          <button type="button" className="dropdown-item" onClick={handleShare}>
            {t.btnShare}
          </button>
          <div className="dropdown-divider" role="separator" />
          <button type="button" className="dropdown-item is-destructive" onClick={() => { setOpen(false); onDelete(book); }}>
            {t.btnDelete}
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
