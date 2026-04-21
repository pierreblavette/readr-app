"use client";

export default function DeleteModal({ book, onClose, onConfirm, t }) {
  if (!book) return null;
  return (
    <div className="confirm-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="confirm-modal">
        <div className="confirm-modal-title">{t.deleteTitle}</div>
        <div className="confirm-modal-sub">{t.deleteMsg(book.title)}</div>
        <div className="confirm-modal-actions">
          <button className="modal-cancel" onClick={onClose}>{t.deleteBtnCancel}</button>
          <button className="confirm-modal-delete" onClick={() => { onConfirm(book.id); onClose(); }}>
            {t.deleteBtnConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
