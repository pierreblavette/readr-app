"use client";
import { useState } from "react";

export default function AddBooksToCollectionModal({ open, collection, allBooks, onAdd, onClose, t }) {
  const [search, setSearch] = useState('');

  if (!open || !collection) return null;

  const existing = new Set(collection.bookIds || []);
  const available = allBooks.filter(b => !existing.has(b.id));
  const filtered = search.trim()
    ? available.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
      )
    : available;

  function handleAdd(book) {
    onAdd(collection.id, book.id);
  }

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 560 }}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="modal-title">{t.colAddBooks} — {collection.emoji} {collection.name}</div>
        <div className="modal-field" style={{ marginBottom: 12 }}>
          <input
            className="search-input"
            style={{ width: '100%' }}
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        <div className="add-to-col-list">
          {filtered.length === 0 && (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.9rem' }}>
              {available.length === 0 ? 'All books are already in this collection.' : t.emptyNoMatch}
            </div>
          )}
          {filtered.map(book => (
            <div key={book.id} className="add-to-col-item">
              <div>
                <div className="add-to-col-title">{book.title}</div>
                <div className="add-to-col-author">{book.author}</div>
              </div>
              <button className="btn btn-sm btn-primary" onClick={() => handleAdd(book)}>Add</button>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>{t.btnCancel}</button>
        </div>
      </div>
    </div>
  );
}
