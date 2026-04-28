"use client";
import { useEffect, useState } from "react";
import { loadCastCache, saveCastCache, castKey, fetchCharacterCast } from "@/lib/cast";

const CAST_PREVIEW_LIMIT = 4;

export default function CharacterCast({ book, lang, t }) {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setCast(null);
    setError(null);
    setLoading(false);
    setExpanded(false);
    if (!book) return;
    const cache = loadCastCache();
    const key = castKey(book.title, book.author, lang);
    if (cache[key]) setCast(cache[key]);
  }, [book?.id, lang]);

  async function handleGenerate() {
    if (!book || loading) return;
    setLoading(true);
    setError(null);
    try {
      const characters = await fetchCharacterCast(book.title, book.author, lang);
      const cache = loadCastCache();
      const key = castKey(book.title, book.author, lang);
      cache[key] = characters;
      saveCastCache(cache);
      setCast(characters);
    } catch (e) {
      setError(e.status === 404 ? 'not_found' : 'error');
    } finally {
      setLoading(false);
    }
  }

  const showError = error && !loading;
  const showList  = cast && cast.length > 0 && !loading;
  const showHint  = !cast && !error;

  const buttonClass = showList
    ? 'btn btn-outline btn-md panel-cast-action'
    : 'btn btn-ai btn-md panel-cast-action';

  const buttonLabel = loading
    ? t.castLoading
    : showList
      ? t.castRegenerateBtn
      : showError
        ? t.castRegenerateBtn
        : t.castGenerateBtn;

  return (
    <div className="panel-section panel-cast">
      <div className="panel-cast-content">
        <span className="panel-section-eyebrow">{t.castSectionTitle}</span>

        {showHint && (
          <p className="panel-cast-hint">{t.castEmptyHint}</p>
        )}

        {showError && (
          <p className="panel-cast-hint">
            {error === 'not_found' ? t.castNotFound : t.castError}
          </p>
        )}

        {showList && (
          <>
            <ul className="panel-cast-list">
              {(expanded ? cast : cast.slice(0, CAST_PREVIEW_LIMIT)).map((c, i) => (
                <li key={`${c.name}-${i}`} className="panel-cast-item">
                  <div className="panel-cast-name">{c.name}</div>
                  {c.role && (
                    <div className="panel-cast-field">
                      <span className="panel-cast-field-label">{t.castRoleLabel}</span>
                      <span className="panel-cast-role">{c.role}</span>
                    </div>
                  )}
                  {c.relations && (
                    <div className="panel-cast-field">
                      <span className="panel-cast-field-label">{t.castRelationLabel}</span>
                      <span className="panel-cast-relations">{c.relations}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {cast.length > CAST_PREVIEW_LIMIT && (
              <button
                type="button"
                className="quote-see-more panel-cast-show-more"
                onClick={() => setExpanded(v => !v)}
              >
                {expanded ? t.castShowLess : t.castShowMore}
              </button>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        className={buttonClass}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? (
          <svg className="panel-cast-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
          </svg>
        ) : showList ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
        ) : (
          <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="aiCastGrad" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F67BF8"/>
                <stop offset="0.62" stopColor="#4959E6"/>
              </linearGradient>
            </defs>
            <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiCastGrad)"/>
          </svg>
        )}
        {buttonLabel}
      </button>

      {showList && (
        <span className="panel-cast-disclaimer">{t.castDisclaimer}</span>
      )}
    </div>
  );
}
