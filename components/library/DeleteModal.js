"use client";
import { useEffect, useRef, useState } from "react";
import BookChip from "./BookChip";

function QuotePreview({ text, t }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const hadExpanded = el.classList.contains('expanded');
      if (hadExpanded) el.classList.remove('expanded');
      setOverflows(el.scrollHeight > el.clientHeight + 1);
      if (hadExpanded) el.classList.add('expanded');
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div className="confirm-modal-quote-wrap">
      <p ref={ref} className={`confirm-modal-quote${expanded ? ' expanded' : ''}`}>"{text}"</p>
      {overflows && (
        <button
          type="button"
          className="quote-see-more"
          onClick={() => setExpanded(v => !v)}>
          {expanded ? t.quoteSeeLess : t.quoteSeeMore}
        </button>
      )}
    </div>
  );
}

function StarsDisplay({ value }) {
  return (
    <div className="panel-rating-stars" aria-label={`Rating ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} viewBox="0 0 24 24" fill="currentColor" className={value >= n ? 'is-filled' : ''}>
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function DeleteModal({ target, onClose, onConfirm, t }) {
  if (!target) return null;
  const isBulk = target.bulk === true;
  const isQuote = target.type === 'quote';
  const isWord = target.type === 'word';
  const isCancelReading = target.type === 'cancelReading';
  const isRemoveFinished = target.type === 'removeFinished';
  const isSingleBook = !isBulk && !isQuote && !isWord && !isRemoveFinished; // single delete OR cancelReading

  const title = isBulk
    ? t.deleteBulkTitle(target.count)
    : isQuote ? t.quoteDeleteTitle
    : isWord  ? t.wordDeleteTitle
    : isCancelReading ? t.cancelReadingTitle
    : isRemoveFinished ? t.removeFinishedTitle
    : t.deleteTitle;
  const msg = isBulk
    ? t.deleteBulkMsg(target.count)
    : isQuote ? t.quoteDeleteMsg
    : isWord  ? t.wordDeleteMsg(target.title)
    : isCancelReading ? t.cancelReadingMsg(target.title)
    : isRemoveFinished ? t.removeFinishedMsg
    : t.deleteMsg(target.title);
  const confirmLabel = isCancelReading
    ? t.cancelReadingConfirm
    : isRemoveFinished ? t.removeFinishedConfirm
    : t.deleteBtnConfirm;
  const confirmClass = isCancelReading ? 'ob-next' : 'confirm-modal-delete';

  function handleConfirm() {
    if (isBulk) onConfirm(target.ids);
    else        onConfirm(target);
    onClose();
  }

  return (
    <div className="confirm-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="confirm-modal">
        <div className="confirm-modal-title">{title}</div>
        <div className="modal-fields">
          <div className="confirm-modal-sub">{msg}</div>
          {isSingleBook && target.title && (
            <div className="confirm-modal-chip">
              <BookChip book={{ title: target.title, author: target.author || '' }} />
            </div>
          )}
          {isRemoveFinished && (
            <>
              {target.rating && (
                <div className="panel-finished-field">
                  <span className="panel-finished-label">{t.finishedRatingLabel}</span>
                  <StarsDisplay value={target.rating} />
                </div>
              )}
              {target.note && (
                <div className="panel-finished-field">
                  <span className="panel-finished-label">{t.finishedNoteLabel}</span>
                  <div className="panel-finished-note">{target.note}</div>
                </div>
              )}
            </>
          )}
          {isQuote && target.text && (
            <QuotePreview text={target.text} t={t} />
          )}
        </div>
        <div className="confirm-modal-actions">
          <button className="modal-cancel" onClick={onClose}>{t.deleteBtnCancel}</button>
          <button className={confirmClass} onClick={handleConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
