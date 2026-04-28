"use client";
import { useEffect, useState } from "react";
import BookChip from "./BookChip";

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className="finish-stars" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          className={`finish-star${display >= n ? ' filled' : ''}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function FinishReadingModal({ open, book, onClose, onConfirm, t }) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const isEditing = !!book?.finishedAt;

  useEffect(() => {
    if (open) {
      setRating(book?.rating || 0);
      setNote(book?.note || '');
    }
  }, [open, book]);

  if (!open || !book) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      rating: rating || null,
      note: note.trim() || null,
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal finish-modal">
        <button className="modal-close" onClick={onClose} aria-label={t.btnCancel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="modal-title">{t.finishModalTitle}</div>

        <form id="finish-reading-form" className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-fields">
            <div className="finish-modal-chip">
              <BookChip book={{ title: book.title, author: book.author || '' }} />
            </div>

            <div className="modal-field">
              <label className="modal-field-label">{t.finishModalRating}</label>
              <StarRating value={rating} onChange={setRating} />
            </div>

            <div className="modal-field">
              <label className="modal-field-label">{t.finishModalNote}</label>
              <textarea
                className="quote-textarea"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder={t.finishModalNotePlaceholder}
                rows={3}
                maxLength={500}
              />
            </div>
          </div>
        </form>

        <div className="modal-actions">
          <button type="button" className="modal-cancel" onClick={onClose}>
            {t.btnCancel}
          </button>
          <button type="submit" form="finish-reading-form" className="modal-submit">
            {t.finishModalSave}
          </button>
        </div>
      </div>
    </div>
  );
}
