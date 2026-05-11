"use client";
import { useState } from "react";
import { useModalA11y } from "@/lib/useModalA11y";

export default function WordListPanel({ open, onClose, words, onSeeAll, t }) {
  const panelRef = useModalA11y(open, onClose, { autoFocus: false });
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  function toggle(id) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <>
      {open && <div className="panel-overlay" onClick={onClose} />}
      <div className={`book-panel${open ? ' open' : ''}`} ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true">
        {open && (
          <div className="panel-inner">
            <button className="panel-close" onClick={onClose} aria-label={t.btnClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="panel-section">
              <span className="panel-section-eyebrow">{t.tabDictionary}</span>
              <div className="dictionary-saved-list">
                {words.map(w => {
                  const expanded = expandedIds.has(w.id);
                  return (
                    <div key={w.id} className={`dictionary-saved-card overview-word-card${expanded ? ' expanded' : ''}`}>
                      <div
                        className="dictionary-saved-head"
                        role="button"
                        tabIndex={0}
                        aria-expanded={expanded}
                        onClick={() => toggle(w.id)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(w.id); }
                        }}>
                        <span className="dictionary-saved-toggle">
                          <svg className={`dictionary-chevron${expanded ? ' open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                          <span className="dictionary-saved-word">{w.word}</span>
                        </span>
                      </div>
                      {expanded && (
                        <div className="dictionary-saved-body">
                          {w.definitions.map((d, i) => (
                            <div key={i} className="dictionary-definition">
                              {d.pos && <span className="dictionary-pos">{d.pos}</span>}
                              <p className="dictionary-meaning">{d.meaning}</p>
                              {d.example && (
                                <div className="dictionary-example">
                                  <span className="dictionary-example-label">{t.dictionaryExample}</span>
                                  <p className="dictionary-example-text">{d.example}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="btn btn-outline btn-md overview-loved-more"
                onClick={onSeeAll}>
                <span>{t.overviewLovedSeeMore}</span>
                <svg className="sidebar-section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
