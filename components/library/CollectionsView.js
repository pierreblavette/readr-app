"use client";
import CollectionsEmptyIllustration from "./CollectionsEmptyIllustration";

function CollectionCoverGrid({ books }) {
  const covers = books.slice(0, 4).map(b => b.cover).filter(Boolean);
  const slots = [0, 1, 2, 3];

  return (
    <div className="col-card-cover-grid">
      {slots.map(i => (
        <div key={i} className="col-card-cover-cell">
          {covers[i]
            ? <img src={covers[i]} alt="" className="col-card-cover-img" />
            : <div className="col-card-cover-placeholder" />
          }
        </div>
      ))}
    </div>
  );
}

export default function CollectionsView({ collections, data, view, onOpen, onCreate, onDelete, t }) {
  const allBooks = [...(data.owned || []), ...(data.wishlist || [])];

  function getBooksForCol(col) {
    return (col.bookIds || []).map(id => allBooks.find(b => b.id === id)).filter(Boolean);
  }

  if (collections.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon" style={{ width: 160, height: 160 }}>
          <CollectionsEmptyIllustration />
        </div>
        <p className="empty-title">{t.colViewEmpty}</p>
        <p className="empty-sub">{t.colViewEmptySub}</p>
        <button className="empty-cta" onClick={onCreate}>{t.colViewEmptyCta}</button>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="books-list">
        <table className="list-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: 40 }}></th>
              <th>Name</th>
              <th>Books</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {collections.map(col => {
              const books = getBooksForCol(col);
              return (
                <tr key={col.id} onClick={() => onOpen(col)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontSize: '1.2rem', textAlign: 'center' }}>{col.emoji}</td>
                  <td className="list-title-cell">{col.name}</td>
                  <td className="list-author-cell">{t.colBookCount(books.length)}</td>
                  <td className="list-del-cell">
                    <button className="delete-row-btn" onClick={e => { e.stopPropagation(); onDelete(col); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="col-grid">
      {collections.map(col => {
        const books = getBooksForCol(col);
        return (
          <button key={col.id} className="col-card" onClick={() => onOpen(col)}>
            <CollectionCoverGrid books={books} />
            <div className="col-card-body">
              <span className="col-card-emoji">{col.emoji}</span>
              <div className="col-card-info">
                <div className="col-card-name">{col.name}</div>
                <div className="col-card-count">{t.colBookCount(books.length)}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
