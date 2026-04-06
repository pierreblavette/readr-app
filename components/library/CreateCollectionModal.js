"use client";
import { useState, useEffect, useRef } from "react";

const EMOJIS = ['📚', '🔖', '⭐', '🎯', '🌟', '💡', '🎨', '🌍', '🔬', '🏛️', '🎭', '✨'];

export default function CreateCollectionModal({ open, onClose, onCreate, t }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('📚');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName('');
      setEmoji('📚');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), emoji);
    onClose();
  }

  return (
    <div className="confirm-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="confirm-modal create-col-modal">
        <div className="confirm-modal-title">{t.colModalTitle || 'New collection'}</div>

        {/* Emoji picker */}
        <div className="col-emoji-row">
          {EMOJIS.map(e => (
            <button key={e}
              className={`col-emoji-btn${emoji === e ? ' active' : ''}`}
              onClick={() => setEmoji(e)}
              type="button">
              {e}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="col-name-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t.colNamePlaceholder || 'Collection name…'}
            maxLength={40}
          />
          <div className="confirm-modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              {t.btnCancel}
            </button>
            <button type="submit" className="ob-next" disabled={!name.trim()}>
              {t.colCreate || 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
