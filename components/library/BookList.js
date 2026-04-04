"use client";

export default function BookList({ books, tab, editMode, selected, onToggleSelect, onOpen, onDelete, onSelectAll, t, sortCol, sortDir, toggleSort }) {
  const cols = [
    { key: 'title',  label: t.colTitle  },
    { key: 'author', label: t.colAuthor },
    { key: 'genre',  label: t.colGenre  },
    { key: 'year',   label: t.colYear   },
  ];

  const allSelected = selected.size === books.length && books.length > 0;

  return (
    <div className="books-list">
      <table className="list-table">
        <thead>
          <tr>
            <th>
              {editMode && (
                <div className="th-checkbox-wrap" onClick={onSelectAll}>
                  <div className={`row-checkbox${allSelected ? ' all-selected' : ''}`}>
                    {allSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </th>
            {cols.map(({ key, label }) => (
              <th key={key}
                onClick={() => toggleSort(key)}
                className={sortCol === key ? 'sorted' : ''}>
                <div className="th-inner">
                  {label}
                  {sortCol === key && (
                    <span className="sort-arrow">
                      {sortDir === 'asc'
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                      }
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th style={{ width: 60 }} />
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book.id}
              onClick={() => editMode ? onToggleSelect(book.id) : onOpen(book)}
              className={selected.has(book.id) ? 'selected' : ''}>

              {editMode ? (
                <td style={{ padding: '0 8px 0 28px', width: 40, overflow: 'visible', whiteSpace: 'normal', textOverflow: 'clip', verticalAlign: 'middle' }}>
                  <div className="row-checkbox" style={{ margin: '0 auto' }}>
                    {selected.has(book.id) && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                </td>
              ) : (
                <td className="list-num">{i + 1}</td>
              )}

              <td><span className="list-title">{book.title}</span></td>
              <td><span className="list-author">{book.author}</span></td>
              <td><span className="list-genre">{book.genre || '—'}</span></td>
              <td><span className="list-year">{book.year || '—'}</span></td>

              <td style={{ overflow: 'visible', maxWidth: 'none', padding: '0 8px' }}>
                <button
                  className={`delete-row-btn${editMode ? ' disabled' : ''}`}
                  disabled={editMode}
                  onClick={e => { e.stopPropagation(); onDelete(book); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3h4"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M5 6l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"/>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
