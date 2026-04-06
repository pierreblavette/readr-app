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
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div className="empty-title">{t.colDetailEmpty}</div>
          <div className="empty-sub">{t.colDetailEmptySub}</div>
          <button className="btn btn-md btn-primary" onClick={onAddBooks}>{t.colDetailEmptyCta}</button>
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
