"use client";
import { useState, useEffect } from "react";
import { useModalA11y } from "@/lib/useModalA11y";

export default function CreateCollectionModal({ open, onClose, onCreate, editing, onRename, t }) {
  const [name, setName] = useState('');
  const modalRef = useModalA11y(open, onClose);

  useEffect(() => {
    if (open) {
      setName(editing?.name || '');
    }
  }, [open, editing]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    if (editing) onRename(editing.id, trimmed);
    else onCreate(trimmed);
    onClose();
  }

  const title = editing
    ? (t.colRenameTitle || 'Rename collection')
    : (t.colModalTitle || 'New collection');
  const submitLabel = editing
    ? (t.btnConfirm || 'Confirm')
    : (t.colCreate || 'Create');

  return (
    <div className="confirm-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="confirm-modal create-col-modal" ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true">
        <div className="confirm-modal-title">{title}</div>

        <form id="create-col-form" onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label htmlFor="collection-name">{t.colNameLabel || 'Name'}</label>
            <input
              id="collection-name"
              className="col-name-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t.colNamePlaceholder || 'Collection name…'}
              maxLength={40}
            />
          </div>
        </form>
        <div className="confirm-modal-actions">
          <button type="button" className="modal-cancel" onClick={onClose}>
            {t.btnCancel}
          </button>
          <button type="submit" form="create-col-form" className="modal-submit" disabled={!name.trim() || (editing && name.trim() === editing.name)}>
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
