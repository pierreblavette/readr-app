// Spec components de la famille Rows — primitives miroir des classes prod,
// partagées entre l'overview (rows/page.js) et chaque sous-page. Placeholders
// figés : aucun appel réseau, aucune logique, que du markup. Les covers montrent
// la branche de repli (dégradé + initiale) exactement comme en prod.

/* ─────────────────────────────── Book Row ─────────────────────────────── */

export const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="is-filled">
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
  </svg>
);

export function Cover({ from, to, letter }) {
  return (
    <div
      className="book-row-cover book-row-cover-placeholder"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span>{letter}</span>
    </div>
  );
}

export function BookRowBody({ title, author, rating }) {
  return (
    <div className="book-row-body">
      <div className="book-row-name">
        <div className="book-row-title">{title}</div>
        {author && <div className="book-row-author">{author}</div>}
      </div>
      {rating > 0 && (
        <div className="overview-stars" aria-label={`Rating ${rating}/5`}>
          {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} />)}
        </div>
      )}
    </div>
  );
}

export const Chevron = () => (
  <svg className="book-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const RemoveBtn = () => (
  <button type="button" className="book-row-remove" aria-label="Remove">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
);

// Preview compacte pour l'overview : la ligne interactive canonique.
export function BookRowSpec({ width = "100%" }) {
  return (
    <button type="button" className="book-row book-row-interactive" style={{ width }}>
      <Cover from="#4959E6" to="#00A699" letter="D" />
      <BookRowBody title="Dune" author="Frank Herbert" rating={5} />
      <Chevron />
    </button>
  );
}

/* ──────────────────────────── Collection Row ──────────────────────────── */

// La chip de collection = book-row interactif + modifier padding asymétrique.
// PAS de cover : nom + décompte dans .book-row-body (title/author directs, sans
// .book-row-name), puis chevron. Miroir exact de CollectionListPanel / BookPanel.
export function CollectionRowSpec({ width = "100%", title = "Sci-fi shelf", count = "12 books" }) {
  return (
    <button type="button" className="book-row book-row-interactive collection-chip" style={{ width }}>
      <div className="book-row-body">
        <div className="book-row-title">{title}</div>
        <div className="book-row-author">{count}</div>
      </div>
      <Chevron />
    </button>
  );
}
