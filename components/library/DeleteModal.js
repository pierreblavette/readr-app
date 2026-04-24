"use client";

export default function DeleteModal({ target, onClose, onConfirm, t }) {
  if (!target) return null;
  const isBulk = target.bulk === true;
  const isQuote = target.type === 'quote';
  const isWord = target.type === 'word';
  const title = isBulk
    ? t.deleteBulkTitle(target.count)
    : isQuote ? t.quoteDeleteTitle
    : isWord  ? t.wordDeleteTitle
    : t.deleteTitle;
  const msg = isBulk
    ? t.deleteBulkMsg(target.count)
    : isQuote ? t.quoteDeleteMsg
    : isWord  ? t.wordDeleteMsg(target.title)
    : t.deleteMsg(target.title);

  function handleConfirm() {
    if (isBulk) onConfirm(target.ids);
    else        onConfirm(target);
    onClose();
  }

  return (
    <div className="confirm-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="confirm-modal">
        <div className="confirm-modal-title">{title}</div>
        <div className="confirm-modal-sub">{msg}</div>
        <div className="confirm-modal-actions">
          <button className="modal-cancel" onClick={onClose}>{t.deleteBtnCancel}</button>
          <button className="confirm-modal-delete" onClick={handleConfirm}>
            {t.deleteBtnConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
