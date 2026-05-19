"use client";
import { useModalA11y } from "@/lib/useModalA11y";

export default function AddBookToCollectionsModal({ open, book, collections, onAdd, onCreateNew, onClose, t }) {
  const modalRef = useModalA11y(open, onClose);
  if (!open || !book) return null;

  function handleSelect(colId) {
    onAdd(colId, book.id);
    onClose();
  }

  function handleCreate() {
    onCreateNew(book);
    onClose();
  }

  const sortedCollections = [...(collections || [])].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal add-to-col-modal" ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label={t.btnCancel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="modal-title">{t.panelAddToCollectionTitle}</div>

        <div className="add-to-col-section">
          {sortedCollections.length === 0 && (
            <div className="add-to-col-empty">{t.colNoCollectionsYet}</div>
          )}
          {sortedCollections.length > 0 && (
            <div className="panel-collections">
              {sortedCollections.map(col => {
                const alreadyIn = (col.bookIds || []).includes(book.id);
                return (
                  <button
                    key={col.id}
                    type="button"
                    className={`quote-book-chip quote-book-chip-interactive collection-chip${alreadyIn ? ' is-already-in' : ''}`}
                    disabled={alreadyIn}
                    onClick={() => handleSelect(col.id)}>
                    <div className="quote-book-chip-body">
                      <div className="quote-book-chip-title">{col.name}</div>
                      <div className="quote-book-chip-author">{t.colBookCount((col.bookIds || []).length)}</div>
                    </div>
                    {alreadyIn ? (
                      <svg className="quote-book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg className="quote-book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary btn-md" onClick={handleCreate}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>{t.colCreateNew}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
