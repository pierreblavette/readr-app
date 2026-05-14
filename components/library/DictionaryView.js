"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ExportMenu from "@/components/library/ExportMenu";
import NoMatchesIcon from "@/components/library/NoMatchesIcon";

function WordKebab({ wordId, onDelete, t }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (btnRef.current?.contains(e.target)) return;
      if (menuRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function onScroll() { setOpen(false); }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open]);

  function handleToggle() {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(o => !o);
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="col-card-kebab"
        onClick={e => { e.stopPropagation(); handleToggle(); }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.moreActions}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="6" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="18" r="2"/>
        </svg>
      </button>
      {open && pos && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          className="dropdown-menu dropdown-menu--portal"
          role="menu"
          style={{ position: 'fixed', top: pos.top, right: pos.right }}
          onClick={e => e.stopPropagation()}>
          <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onDelete(wordId); }}>
            {t.dictionaryDelete}
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

const CACHE_KEY = 'readr-dict-cache';

function loadCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; }
}
function saveCache(c) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}

export default function DictionaryView({ lang, t, words, onSave, onDelete, exportMD, exportPDF }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [savedSearch, setSavedSearch] = useState('');
  const inputRef = useRef(null);

  const sortedWords = useMemo(() => {
    return [...words].sort((a, b) =>
      a.word.localeCompare(b.word, lang === 'fr' ? 'fr' : 'en', { sensitivity: 'base' })
    );
  }, [words, lang]);

  const filteredSavedWords = useMemo(() => {
    const q = savedSearch.trim().toLowerCase();
    if (!q) return sortedWords;
    return sortedWords.filter(w => w.word.toLowerCase().includes(q));
  }, [sortedWords, savedSearch]);

  const groupedByLetter = useMemo(() => {
    const groups = {};
    for (const w of filteredSavedWords) {
      const first = w.word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toUpperCase();
      const key = /^[A-Z]$/.test(first) ? first : '#';
      if (!groups[key]) groups[key] = [];
      groups[key].push(w);
    }
    return Object.entries(groups).sort(([a], [b]) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });
  }, [filteredSavedWords]);

  const savedKey = result
    ? `${result.lang}::${result.word.toLowerCase()}`
    : null;
  const savedEntry = savedKey
    ? words.find(w => `${w.lang}::${w.word.toLowerCase()}` === savedKey)
    : null;
  const alreadySaved = !!savedEntry;

  async function lookup(raw) {
    const word = raw.trim();
    if (!word) return;
    setError(''); setResult(null);

    const key = `${lang}::${word.toLowerCase()}`;
    const cache = loadCache();
    if (cache[key]) { setResult(cache[key]); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/vision/define', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, lang }),
      });
      const data = await res.json();
      if (res.status === 404 || data.error === 'not_found') {
        setError((t.dictionaryNotFound || 'No definition').replace('{word}', word));
        return;
      }
      if (!res.ok || !Array.isArray(data.definitions)) {
        setError(t.dictionaryError || 'Error');
        return;
      }
      saveCache({ ...cache, [key]: data });
      setResult(data);
    } catch {
      setError(t.dictionaryError || 'Error');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    lookup(input);
  }

  function toggleExpanded(id) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="dictionary-wrap">
      <form className="dictionary-form" onSubmit={handleSubmit}>
        <div className="search-box dictionary-search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            placeholder={t.dictionaryPlaceholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <button type="submit" className="add-btn dictionary-submit" disabled={!input.trim() || loading}>
          {loading && (
            <svg className="dictionary-submit-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
            </svg>
          )}
          {loading ? (t.dictionaryLoading || 'Loading…') : (t.dictionarySearch || 'Search')}
        </button>
      </form>

      {error && <div className="dictionary-error">{error}</div>}

      {result && !loading && (
        <div className="dictionary-result">
          <div className="dictionary-result-head">
            <div className="dictionary-word">{result.word}</div>
            <button
              type="button"
              className={`edit-btn dictionary-save-toggle${alreadySaved ? ' is-saved' : ''}`}
              onClick={() => alreadySaved ? onDelete(savedEntry.id) : onSave(result)}
              aria-label={alreadySaved ? t.dictionaryDelete : t.dictionarySave}>
              {!alreadySaved && (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span className="dict-save-label">{t.dictionarySave}</span>
                </>
              )}
              {alreadySaved && (
                <>
                  <span className="dict-save-rest">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="dict-save-label">{t.dictionarySaved}</span>
                  </span>
                  <span className="dict-save-hover">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span className="dict-save-label">{t.dictionaryDelete}</span>
                  </span>
                </>
              )}
            </button>
          </div>
          <div className="dictionary-definitions">
            {result.definitions.map((d, i) => (
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
        </div>
      )}

      <div className="dictionary-saved-section">
        <span className="panel-section-eyebrow">{t.dictionarySavedTitle}</span>

        {sortedWords.length === 0 ? (
          <div className="empty">
            <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
              <path d="M10 10C10 7.79086 11.7909 6 14 6H48C49.1046 6 50 6.89543 50 8V52C50 53.1046 49.1046 54 48 54H14C11.7909 54 10 52.2091 10 50V10Z" fill="var(--illus-bg-3)"/>
              <path d="M10 50C10 47.7909 11.7909 46 14 46H50V52C50 53.1046 49.1046 54 48 54H14C11.7909 54 10 52.2091 10 50Z" fill="var(--illus-bg-1)"/>
              <path d="M21 46C18.7909 46 17 47.7909 17 50C17 52.2091 18.7909 54 21 54H14C11.7909 54 10 52.2091 10 50C10 47.7909 11.7909 46 14 46H21Z" fill="var(--illus-bg-3)"/>
              <path d="M50 43V50C50 52.2091 48.2091 54 46 54H14C11.7909 54 10 52.2091 10 50M10 50V10C10 7.79086 11.7909 6 14 6L48 6C49.1046 6 50 6.89543 50 8V44C50 45.1046 49.1046 46 48 46H42M10 50C10 47.7909 11.7909 46 14 46H38" stroke="var(--illus-stroke)" strokeLinecap="round"/>
              <path d="M14 20C14 18.8954 14.8954 18 16 18H26C27.1046 18 28 18.8954 28 20V32C28 33.1046 27.1046 34 26 34H16C14.8954 34 14 33.1046 14 32V20Z" fill="var(--illus-bg-1)"/>
              <path d="M28 26V20C28 18.8954 27.1046 18 26 18H16C14.8954 18 14 18.8954 14 20V32C14 33.1046 14.8954 34 16 34H26C27.1046 34 28 33.1046 28 32V30" stroke="var(--illus-stroke)" strokeLinecap="round"/>
              <path d="M18 29L21 23L24 29" stroke="var(--illus-stroke)" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.5 26H22.5" stroke="var(--illus-stroke)" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M32 20C32 18.8954 32.8954 18 34 18H44C45.1046 18 46 18.8954 46 20V32C46 33.1046 45.1046 34 44 34H34C32.8954 34 32 33.1046 32 32V20Z" fill="var(--illus-accent-1)"/>
              <path d="M46 26V20C46 18.8954 45.1046 18 44 18H34C32.8954 18 32 18.8954 32 20V32C32 33.1046 32.8954 34 34 34H44C45.1046 34 46 33.1046 46 32V30" stroke="var(--illus-stroke)" strokeLinecap="round"/>
              <path d="M41 29H37L41 23H37" stroke="var(--illus-bg-1)" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 50H44V55.5858C44 56.4767 42.9229 56.9229 42.2929 56.2929L40.1768 54.1768C40.0791 54.0791 39.9209 54.0791 39.8232 54.1768L37.7071 56.2929C37.0771 56.9229 36 56.4767 36 55.5858V50Z" fill="var(--illus-accent-1)" stroke="var(--illus-stroke)" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 50H46" stroke="var(--illus-stroke)" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="empty-text">
              <p className="empty-title">{t.dictionarySavedEmpty}</p>
              <p className="empty-sub">{t.dictionarySavedEmptySub}</p>
            </div>
          </div>
        ) : (
          <div className="dictionary-saved-wrap">
            <div className="cell-row cell-row--lg cell-row--between search-row">
              <div className="search-box dictionary-saved-search">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  className="search-input"
                  placeholder={t.dictionarySavedSearchPlaceholder || 'Search saved words…'}
                  value={savedSearch}
                  onChange={e => setSavedSearch(e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div className="counter-actions">
                {(exportPDF || exportMD) && (
                  <ExportMenu
                    t={t}
                    exportPDF={exportPDF}
                    exportMD={exportMD}
                    disabled={!words.length}
                  />
                )}
              </div>
            </div>

            {filteredSavedWords.length === 0 ? (
              <div className="empty dictionary-saved-empty">
                <NoMatchesIcon />
                <div className="empty-text">
                  <p className="empty-title">{t.emptyNoMatch}</p>
                  <p className="empty-sub">{t.emptyNoMatchSub}</p>
                </div>
              </div>
            ) : (
              <div className="dictionary-saved-letters">
                {groupedByLetter.map(([letter, items]) => (
                  <div key={letter} className="books-list">
                  <table className="list-table dictionary-letter-table">
                    <thead className="table-head">
                      <tr>
                        <th className="dictionary-letter-head">{letter}</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(w => {
                        const expanded = expandedIds.has(w.id);
                        return (
                          <Fragment key={w.id}>
                            <tr
                              className={`list-row dictionary-saved-row${expanded ? ' expanded' : ''}`}
                              role="button"
                              tabIndex={0}
                              aria-expanded={expanded}
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => toggleExpanded(w.id)}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpanded(w.id); }
                              }}>
                              <td className="list-cell-title">
                                <span className="dictionary-saved-toggle">
                                  <svg className={`dictionary-chevron${expanded ? ' open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <polyline points="9 18 15 12 9 6"/>
                                  </svg>
                                  <span className="dictionary-saved-word">{w.word}</span>
                                </span>
                              </td>
                              <td className="list-cell-action" onClick={e => e.stopPropagation()}>
                                <WordKebab wordId={w.id} onDelete={onDelete} t={t} />
                              </td>
                            </tr>
                            {expanded && (
                              <tr className="dictionary-saved-row-body">
                                <td colSpan={2}>
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
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
