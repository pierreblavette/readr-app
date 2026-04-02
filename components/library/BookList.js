"use client";

export default function BookList({ books, tab, editMode, selected, onToggleSelect, onOpen, onDelete, t, sortCol, sortDir, toggleSort }) {
  const cols = [
    { key: 'title',  label: t.colTitle,  style: 'w-[28%]' },
    { key: 'author', label: t.colAuthor, style: 'w-[28%]' },
    { key: 'genre',  label: t.colGenre,  style: 'w-[28%]' },
    { key: 'year',   label: t.colYear,   style: 'w-[9%]' },
  ];

  return (
    <div className="rounded-lg border border-[var(--border)] overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[var(--border)]" style={{ background: 'var(--bg3)' }}>
            {editMode && <th className="w-10 px-4 py-3" />}
            <th className="w-[5%] px-8 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--text-3)]">#</th>
            {cols.map(({ key, label, style }) => (
              <th key={key} onClick={() => toggleSort(key)}
                className={`${style} px-8 py-3 text-left text-[11px] font-bold uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-[var(--text)] ${sortCol === key ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'}`}>
                {label}
                {sortCol === key && <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>}
              </th>
            ))}
            <th className="w-[60px]" />
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book.id} onClick={() => editMode ? onToggleSelect(book.id) : onOpen(book)}
              className="border-b border-[var(--border)] last:border-0 cursor-pointer transition-colors hover:bg-[var(--primary-5)] group"
              style={{ background: selected.has(book.id) ? 'var(--primary-5)' : undefined }}>

              {editMode && (
                <td className="px-4">
                  <div className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-colors ${
                    selected.has(book.id) ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--border)]'
                  }`}>
                    {selected.has(book.id) && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                </td>
              )}

              <td className="px-8 py-4 text-sm text-[var(--text-3)]">{i + 1}</td>
              <td className="px-8 py-4 text-sm font-semibold text-[var(--text)] truncate max-w-0">
                {book.title}
                {tab === 'wishlist' && <span className="ml-2 text-[9px] font-bold bg-[var(--accent)] text-white px-1.5 py-0.5 rounded-full">{t.wishBadge}</span>}
              </td>
              <td className="px-8 py-4 text-sm text-[var(--text-2)] truncate max-w-0">{book.author}</td>
              <td className="px-8 py-4 text-sm text-[var(--text-2)] truncate max-w-0">{book.genre || '—'}</td>
              <td className="px-8 py-4 text-sm text-[var(--text-3)]">{book.year || '—'}</td>
              <td className="px-4">
                {!editMode && (
                  <button onClick={e => { e.stopPropagation(); onDelete(book); }}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--text-3)] opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
