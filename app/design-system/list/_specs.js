// Spec de la page List View. Markup reproduit à l'identique de BookList.js : les
// classes de library.css (table-layout fixed + .list-cell-*) font le rendu.

const SortArrow = ({ dir }) =>
  dir === "asc" ? (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
  );

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);

const Kebab = () => (
  <button type="button" className="col-card-kebab" aria-label="More" style={{ pointerEvents: "none" }}>
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" /></svg>
  </button>
);

const BOOKS = [
  { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", year: "1965" },
  { title: "Sapiens", author: "Y. N. Harari", genre: "History", year: "2011" },
  { title: "1984", author: "George Orwell", genre: "Fiction", year: "1949" },
];
const COLS = [
  { key: "title", label: "Title", cellClass: "list-cell-title" },
  { key: "author", label: "Author", cellClass: "list-cell-meta list-cell-meta--col-author" },
  { key: "genre", label: "Genre", cellClass: "list-cell-tag" },
  { key: "year", label: "Year", cellClass: "list-cell-meta" },
];

// Une rangée seule (mini-table sans header) dans un état donné — pour la carte States.
// hover : simule le :hover (bg --primary-3) que la doc statique ne peut pas déclencher.
export function ListRowSample({ editMode = false, selected = false, hover = false, className = "" }) {
  return (
    <div className={`books-list ds-list-spec ${className}`.trim()}>
      <table className="list-table">
        <tbody>
          <tr className={`list-row${selected ? " selected" : ""}`} style={hover ? { background: "var(--primary-3)" } : undefined}>
            {editMode ? (
              <td className="list-cell-num"><div className="row-checkbox">{selected && <CheckIcon />}</div></td>
            ) : (
              <td className="list-cell-num">1</td>
            )}
            <td className="list-cell-title"><span className="list-title">Dune</span></td>
            <td className="list-cell-meta list-cell-meta--col-author"><span className="list-author">Frank Herbert</span></td>
            <td className="list-cell-tag"><span className="list-genre">Sci-Fi</span></td>
            <td className="list-cell-meta"><span className="list-year">1965</span></td>
            <td className="list-cell-action">{!editMode && <Kebab />}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// editMode : colonne de sélection (checkbox + select-all) au lieu du numéro + kebab.
// selected : indices des rangées cochées. sortCol/sortDir : colonne triée + sens.
export function ListViewSpec({ editMode = false, selected = [], sortCol = "title", sortDir = "asc", rows = BOOKS, className = "" }) {
  const allSelected = editMode && selected.length === rows.length && rows.length > 0;
  return (
    <div className={`books-list ds-list-spec ${className}`.trim()}>
      <table className="list-table">
        <thead className="table-head">
          <tr>
            <th className="list-cell-num">
              {editMode && (
                <div className="th-checkbox-wrap">
                  <div className={`row-checkbox${allSelected ? " all-selected" : ""}`}>{allSelected && <CheckIcon />}</div>
                </div>
              )}
            </th>
            {COLS.map((c) => (
              <th key={c.key} className={`${c.cellClass}${sortCol === c.key ? " sorted" : ""}`}>
                <div className="th-inner">{c.label}{sortCol === c.key && <span className="sort-arrow"><SortArrow dir={sortDir} /></span>}</div>
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((b, i) => {
            const isSel = selected.includes(i);
            return (
              <tr key={i} className={`list-row${isSel ? " selected" : ""}`}>
                {editMode ? (
                  <td className="list-cell-num"><div className="row-checkbox">{isSel && <CheckIcon />}</div></td>
                ) : (
                  <td className="list-cell-num">{i + 1}</td>
                )}
                <td className="list-cell-title"><span className="list-title">{b.title}</span></td>
                <td className="list-cell-meta list-cell-meta--col-author"><span className="list-author">{b.author}</span></td>
                <td className="list-cell-tag"><span className="list-genre">{b.genre}</span></td>
                <td className="list-cell-meta"><span className="list-year">{b.year}</span></td>
                <td className="list-cell-action">{!editMode && <Kebab />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
