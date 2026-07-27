// Specs partagés par la famille Modals (Foundation / Form / Delete).
// Markup reproduit à l'identique des composants réels (Modal / DeleteModal) : les
// classes de library.css font le rendu, aucune donnée figée ne diverge de la prod.

export const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── FORM MODAL (.modal) ───
// Coquille de saisie : titre → form (champs/tabs) → actions. Submit hors <form>,
// lié par form="…" en prod ; ici en lecture seule pour la doc.
export function FormModalSpec({ style }) {
  return (
    <div className="modal" style={{ animation: "none", ...style }}>
      <button type="button" className="modal-close" aria-label="Close"><CloseIcon /></button>
      <div className="modal-title">Add a quote</div>
      <form className="modal-form">
        <div className="modal-fields">
          <div className="modal-field">
            <label className="modal-field-label">Quote</label>
            <textarea className="quote-textarea" placeholder="e.g. All happy families are alike; each unhappy family is unhappy in its own way." readOnly />
          </div>
          <div className="modal-field">
            <label className="modal-field-label">Link to book</label>
            <div className="book-chip">
              <div className="book-chip-cover" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }}>A</div>
              <div className="book-chip-body"><div className="book-chip-name"><div className="book-chip-title">Anna Karenina</div><div className="book-chip-author">Leo Tolstoy</div></div></div>
            </div>
          </div>
        </div>
      </form>
      <div className="modal-actions">
        <button type="button" className="btn btn-outline btn-md">Cancel</button>
        <button type="button" className="btn btn-primary btn-md">Save</button>
      </div>
    </div>
  );
}

// ─── DELETE MODAL (.confirm-modal) ───
// Confirmation destructive : titre → message + body addon (selon target.type) → actions.
// Cancel = .btn.btn-outline.btn-md (comme en prod, PAS .modal-cancel qui n'existe pas).
const CONFIRM = {
  book: {
    title: "Remove this book?",
    sub: '"A Brief History of Time" will be permanently removed from your library.',
  },
  quote: {
    title: "Remove this quote?",
    sub: "This quote will be permanently removed.",
  },
  bulk: {
    title: "Remove 3 books?",
    sub: "These 3 books will be permanently removed from your library.",
  },
  finished: {
    title: "Remove rating and note?",
    sub: "The rating and note attached to this finished book will be removed. The finished status stays.",
  },
};

// Le corps seul (message + addon selon la variante) — partagé par la coquille
// complète (ConfirmModalSpec) et la planche Body de la page Delete Modal.
export function ConfirmBodySpec({ variant = "book" }) {
  const v = CONFIRM[variant] ?? CONFIRM.book;
  return (
    <div className="modal-fields">
      <div className="confirm-modal-sub">{v.sub}</div>
      {variant === "book" && (
        <div className="confirm-modal-chip">
          <div className="book-chip">
            <div className="book-chip-cover" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }}>A</div>
            <div className="book-chip-body"><div className="book-chip-name"><div className="book-chip-title">A Brief History of Time</div><div className="book-chip-author">Stephen Hawking</div></div></div>
          </div>
        </div>
      )}
      {variant === "quote" && (
        <div className="confirm-modal-quote-wrap">
          <p className="confirm-modal-quote">&ldquo;We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special.&rdquo;</p>
        </div>
      )}
      {variant === "finished" && (
        <>
          <div className="panel-finished-field">
            <span className="panel-finished-label">Rating</span>
            <div className="panel-rating-stars" aria-label="Rating 4 out of 5">
              {[1, 2, 3, 4, 5].map((n) => (
                <svg key={n} viewBox="0 0 24 24" fill="currentColor" className={4 >= n ? "is-filled" : ""}>
                  <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="panel-finished-field">
            <span className="panel-finished-label">Note</span>
            <div className="panel-finished-note">A landmark in popular science. Hawking makes cosmology accessible without dumbing it down.</div>
          </div>
        </>
      )}
    </div>
  );
}

export function ConfirmModalSpec({ variant = "book", style, className = "" }) {
  const v = CONFIRM[variant] ?? CONFIRM.book;
  return (
    <div className={`confirm-modal ${className}`.trim()} style={{ animation: "none", boxShadow: "var(--shadow-lg)", ...style }}>
      <div className="confirm-modal-title">{v.title}</div>
      <ConfirmBodySpec variant={variant} />
      <div className="confirm-modal-actions">
        <button type="button" className="btn btn-outline btn-md">Cancel</button>
        <button type="button" className="confirm-modal-delete">Remove</button>
      </div>
    </div>
  );
}
