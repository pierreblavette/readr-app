"use client";
import { useState, useEffect } from "react";
import { useModalA11y } from "@/lib/useModalA11y";

export default function ReadingGoalModal({ open, onClose, onSetGoal, year, currentCount, t }) {
  const [draft, setDraft] = useState('');
  const modalRef = useModalA11y(open, onClose, { autoFocus: false });

  useEffect(() => {
    if (open) setDraft(currentCount > 0 ? String(currentCount) : '');
  }, [open, currentCount]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const n = parseInt(draft, 10);
    if (Number.isFinite(n) && n > 0) {
      onSetGoal(year, n);
      onClose();
    }
  }

  function handleRemove() {
    onSetGoal(year, 0);
    onClose();
  }

  const isSet = currentCount > 0;
  const parsed = parseInt(draft, 10);
  const canSubmit = Number.isFinite(parsed) && parsed > 0 && parsed !== currentCount;

  return (
    <div className="confirm-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="confirm-modal create-col-modal" ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true">
        <div className="confirm-modal-title">{t.overviewGoalTitle}</div>

        <form id="reading-goal-form" onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label htmlFor="reading-goal-input">{t.overviewGoalLabel}</label>
            <input
              id="reading-goal-input"
              type="number"
              min="1"
              inputMode="numeric"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder={t.overviewGoalPlaceholder}
            />
          </div>
        </form>

        <div className="confirm-modal-actions">
          <button type="button" className="modal-cancel" onClick={onClose}>
            {t.btnCancel}
          </button>
          {isSet && (
            <button type="button" className="modal-cancel overview-goal-remove" onClick={handleRemove}>
              {t.overviewGoalRemove}
            </button>
          )}
          <button type="submit" form="reading-goal-form" className="modal-submit" disabled={!canSubmit}>
            {t.overviewGoalSave}
          </button>
        </div>
      </div>
    </div>
  );
}
