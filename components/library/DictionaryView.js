"use client";
import { useMemo, useRef, useState } from "react";
import ExportMenu from "@/components/library/ExportMenu";
import SortMenu from "@/components/library/SortMenu";

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
  const [savedSort, setSavedSort] = useState('recent');
  const inputRef = useRef(null);

  const sortedWords = useMemo(() => {
    const arr = [...words];
    if (savedSort === 'alpha') {
      return arr.sort((a, b) => a.word.localeCompare(b.word, lang === 'fr' ? 'fr' : 'en', { sensitivity: 'base' }));
    }
    return arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [words, savedSort, lang]);

  const filteredSavedWords = useMemo(() => {
    const q = savedSearch.trim().toLowerCase();
    if (!q) return sortedWords;
    return sortedWords.filter(w => w.word.toLowerCase().includes(q));
  }, [sortedWords, savedSearch]);

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
                  {t.dictionarySave}
                </>
              )}
              {alreadySaved && (
                <>
                  <span className="dict-save-rest">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t.dictionarySaved}
                  </span>
                  <span className="dict-save-hover">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    {t.dictionaryDelete}
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
          <div className="empty dictionary-saved-empty">
            <svg className="empty-icon" viewBox="0 0 80 80" fill="none">
              <rect x="12" y="16" width="56" height="48" rx="4" fill="var(--accent-bg)"/>
              <path d="M28 44 L36 26 L44 44" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="31" y1="38" x2="41" y2="38" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
              <line x1="24" y1="52" x2="56" y2="52" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              <line x1="24" y1="58" x2="48" y2="58" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
            </svg>
            <p className="empty-title">{t.dictionarySavedEmpty}</p>
            <p className="empty-sub">{t.dictionarySavedEmptySub}</p>
          </div>
        ) : (
          <>
            <div className="search-row dictionary-saved-search-row">
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
                <SortMenu
                  current={savedSort}
                  onChange={setSavedSort}
                  ariaLabel={t.dictionarySortToggle || 'Sort'}
                  options={[
                    { key: 'recent', label: t.dictionarySortRecent || 'Recent' },
                    { key: 'alpha',  label: t.dictionarySortAlpha  || 'A–Z' },
                  ]}
                />
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
                <p className="empty-title">{t.emptyNoMatch}</p>
                <p className="empty-sub">{t.emptyNoMatchSub}</p>
              </div>
            ) : (
              <div className="dictionary-saved-list">
                {filteredSavedWords.map(w => {
                  const expanded = expandedIds.has(w.id);
                  return (
                    <div key={w.id} className={`dictionary-saved-card${expanded ? ' expanded' : ''}`}>
                      <div
                        className="dictionary-saved-head"
                        role="button"
                        tabIndex={0}
                        aria-expanded={expanded}
                        onClick={() => toggleExpanded(w.id)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpanded(w.id); }
                        }}>
                        <span className="dictionary-saved-toggle">
                          <svg className={`dictionary-chevron${expanded ? ' open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                          <span className="dictionary-saved-word">{w.word}</span>
                        </span>
                        <button
                          type="button"
                          className="dictionary-delete-btn"
                          onClick={e => { e.stopPropagation(); onDelete(w.id); }}
                          aria-label={t.dictionaryDelete}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 3h4"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M5 6l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"/>
                          </svg>
                        </button>
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
