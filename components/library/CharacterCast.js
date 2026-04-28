"use client";
import { useEffect, useState } from "react";
import { loadCastCache, saveCastCache, castKey, fetchCharacterCast } from "@/lib/cast";

export default function CharacterCast({ book, lang, t }) {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCast(null);
    setError(null);
    setLoading(false);
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

  return (
    <div className="panel-section panel-cast">
      <span className="panel-section-eyebrow">{t.castSectionTitle}</span>

      {!cast && !loading && !error && (
        <div className="panel-cast-empty">
          <p className="panel-cast-hint">{t.castEmptyHint}</p>
          <button type="button" className="btn btn-primary btn-md" onClick={handleGenerate}>
            {t.castGenerateBtn}
          </button>
        </div>
      )}

      {loading && (
        <div className="panel-cast-loading">
          <div className="panel-spinner" />
          <span>{t.castLoading}</span>
        </div>
      )}

      {error && !loading && (
        <div className="panel-cast-error">
          <p>{error === 'not_found' ? t.castNotFound : t.castError}</p>
          <button type="button" className="btn btn-outline btn-sm" onClick={handleGenerate}>
            {t.castRegenerateBtn}
          </button>
        </div>
      )}

      {cast && cast.length > 0 && !loading && (
        <>
          <ul className="panel-cast-list">
            {cast.map((c, i) => (
              <li key={`${c.name}-${i}`} className="panel-cast-item">
                <div className="panel-cast-name">{c.name}</div>
                {c.role && <div className="panel-cast-role">{c.role}</div>}
                {c.relations && <div className="panel-cast-relations">{c.relations}</div>}
              </li>
            ))}
          </ul>
          <div className="panel-cast-footer">
            <span className="panel-cast-disclaimer">{t.castDisclaimer}</span>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleGenerate}>
              {t.castRegenerateBtn}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
