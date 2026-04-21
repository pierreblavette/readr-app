"use client";
import { useState } from "react";
import BookCard from "./BookCard";
import BookList from "./BookList";

export default function CollectionDetailView({
  collection, books, allBooks, view,
  onBack, onDelete, onAddBooks, onRemoveBook, onOpenBook,
  t, sortCol, sortDir, toggleSort,
}) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
      )
    : books;

  return (
    <div className="col-detail-wrap">

      {/* Back + header */}
      <div className="col-detail-header">
        <button className="col-back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          {t.pageCollections}
        </button>
      </div>

      <div className="col-detail-title-row">
        <span className="col-detail-emoji">{collection.emoji}</span>
        <h1 className="page-title" style={{ margin: 0 }}>{collection.name}</h1>
      </div>

      {/* Toolbar */}
      <div className="col-detail-toolbar">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-md btn-primary" onClick={onAddBooks}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {t.colAddBooks}
        </button>
        <button className="btn btn-md btn-outline col-delete-btn" onClick={() => onDelete(collection)}>
          {t.colDeleteCollection}
        </button>
      </div>

      {filtered.length === 0 && books.length === 0 && (
        <div className="empty">
          <svg className="empty-icon" viewBox="0 0 80 80" fill="none">
            <path d="M8 30C8 27.8 9.8 26 12 26H32L38 32H68C70.2 32 72 33.8 72 36V62C72 64.2 70.2 66 68 66H12C9.8 66 8 64.2 8 62V30Z" fill="var(--accent-bg)"/>
            <path d="M8 30C8 27.8 9.8 26 12 26H32L38 32H8V30Z" fill="var(--accent)" opacity="0.5"/>
            <rect x="24" y="38" width="20" height="18" rx="2" fill="var(--accent)" opacity="0.6"/>
            <rect x="24" y="38" width="4" height="18" rx="1" fill="var(--accent)"/>
            <line x1="32" y1="44" x2="40" y2="44" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="32" y1="49" x2="38" y2="49" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <circle cx="54" cy="54" r="13" fill="var(--accent)"/>
            <line x1="49" y1="54" x2="59" y2="54" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            <line x1="54" y1="49" x2="54" y2="59" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <p className="empty-title">{t.colDetailEmpty}</p>
          <p className="empty-sub">{t.colDetailEmptySub}</p>
          <button className="empty-cta" onClick={onAddBooks}>{t.colDetailEmptyCta}</button>
        </div>
      )}

      {filtered.length === 0 && books.length > 0 && (
        <div className="empty">
          <div className="empty-title">{t.emptyNoMatch}</div>
          <div className="empty-sub">{t.emptyNoMatchSub}</div>
        </div>
      )}

      {filtered.length > 0 && view === 'grid' && (
        <div className="books-grid">
          {filtered.map(book => (
            <BookCard key={book.id} book={book} tab="owned"
              editMode={false} selected={new Set()}
              onToggleSelect={() => {}}
              onOpen={onOpenBook}
              onDelete={b => onRemoveBook(collection.id, b.id)}
              t={t}
            />
          ))}
        </div>
      )}

      {filtered.length > 0 && view === 'list' && (
        <BookList books={filtered} tab="owned"
          editMode={false} selected={new Set()}
          onToggleSelect={() => {}} onSelectAll={() => {}}
          onOpen={onOpenBook}
          onDelete={b => onRemoveBook(collection.id, b.id)}
          t={t} sortCol={sortCol} sortDir={sortDir} toggleSort={toggleSort}
        />
      )}
    </div>
  );
}
