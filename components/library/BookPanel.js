"use client";
import { useState, useEffect, useRef } from "react";
import { coverColors, coverLetter, fetchBookCover, getCoverFromCache, setCoverInCache, loadGBCache, getAmazonSearchUrl, getFnacSearchUrl } from "@/lib/bookUtils";
import { useModalA11y } from "@/lib/useModalA11y";
import CharacterCast from "./CharacterCast";
import BookQuiz from "./BookQuiz";

function formatDate(ts, lang) {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return ''; }
}

function StarsDisplay({ value }) {
  return (
    <div className="panel-rating-stars" aria-label={`Rating ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} viewBox="0 0 24 24" fill="currentColor" className={value >= n ? 'is-filled' : ''}>
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function BookPanel({ book, tab, onClose, onDelete, onMoveToLibrary, onAddQuote, onOpenQuote, onStartReading, onFinishReading, onCancelReading, onEditFinished, onRemoveFinished, onShared, onOpenCollection, onAddToCollection, readingCount, maxReading, quotes, collections = [], lang, t }) {
  const [cover, setCover] = useState(null);
  const [synopsis, setSynopsis] = useState(null);
  // Lien Apple Books quand la couverture provient de leur store — attribution +
  // intention « drive to store » attendue par les conditions d'usage Apple.
  const [appleUrl, setAppleUrl] = useState(null);
  // Tonalité du fond teinté du header ('light' | 'dark' | null) → encre auto
  // (noir/blanc) en opposition, calculée depuis la luminance de la cover.
  const [bgTone, setBgTone] = useState(null);
  const panelRef = useModalA11y(!!book, onClose, { autoFocus: false });

  async function handleShare() {
    const text = t.shareText ? t.shareText(book.title, book.author) : `"${book.title}"\n${book.author}`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(text); onShared?.(); } catch {}
    }
  }

  const scrollYRef = useRef(0);
  useEffect(() => {
    if (!book) return;
    scrollYRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollYRef.current);
    };
  }, [book]);

  useEffect(() => {
    if (!book) return;
    // Lit le cache synchronement avant tout setState à null — si déjà en
    // mémoire, le 1er render après book change utilise la cover directement.
    const cached = getCoverFromCache(book.title, book.author);
    if (cached !== undefined) {
      setCover(cached?.thumb || null);
      setSynopsis(cached?.description || null);
      setAppleUrl(cached?.appleUrl || null);
      return;
    }
    setCover(null);
    setSynopsis(null);
    setAppleUrl(null);
    fetchBookCover(book.title, book.author, loadGBCache()).then(res => {
      setCoverInCache(book.title, book.author, res);
      setCover(res?.thumb || null);
      setSynopsis(res?.description || null);
      setAppleUrl(res?.appleUrl || null);
    });
  }, [book]);

  const [c1, c2] = book ? coverColors(book.title) : ['#ccc', '#aaa'];
  const letter   = book ? coverLetter(book.title) : '';

  // L'écho de fond interpole la cover dans un url("…") CSS : on n'accepte qu'une
  // URL http(s) sans caractère susceptible de casser le url() (guillemet,
  // parenthèse, antislash, espace). Sinon pas d'écho — l'<img> reste inchangée.
  const echoCover = cover && /^https?:\/\/[^\s"'()\\]+$/.test(cover) ? cover : null;

  // Encre du header en opposition au fond teinté : on échantillonne la cover
  // (canvas), on composite avec l'opacité 0.8 de l'écho + le scrim + le bg du
  // panneau (theme-aware), puis on seuil la luminance → 'light' (encre noire) /
  // 'dark' (encre blanche). Fallback sur le dégradé placeholder si l'image est
  // cross-origin non-CORS (canvas tainted) ou absente.
  useEffect(() => {
    if (!book) return;
    let cancelled = false;
    const attr = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : null;
    const isDark = attr === 'dark' || (!attr && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const panelBg = isDark ? [0.118, 0.118, 0.118] : [0.996, 0.996, 1];
    const scrim = isDark ? { c: [8/255, 10/255, 26/255], a: 0.5 } : { c: [235/255, 237/255, 255/255], a: 0.1 };
    const hexRgb = h => [parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255];
    // Seuil de bascule de l'encre. Plus proche de 1 → encre BLANCHE dans quasi
    // tous les cas (seuls les fonds ~blancs repassent en encre noire) ; plus bas
    // → davantage d'encre noire. 0.90 = « blanc partout sauf cover à fond blanc ».
    const LIGHT_THRESHOLD = 0.90;
    const decide = rgb => {
      const mixed = rgb.map((c, i) => c * 0.8 + panelBg[i] * 0.2);
      const fin = mixed.map((c, i) => c * (1 - scrim.a) + scrim.c[i] * scrim.a);
      const lum = 0.299 * fin[0] + 0.587 * fin[1] + 0.114 * fin[2];
      if (!cancelled) setBgTone(lum > LIGHT_THRESHOLD ? 'light' : 'dark');
    };
    const fromGradient = () => {
      const [a, b] = coverColors(book.title);
      const ra = hexRgb(a), rb = hexRgb(b);
      decide([(ra[0]+rb[0])/2, (ra[1]+rb[1])/2, (ra[2]+rb[2])/2]);
    };
    if (echoCover && typeof document !== 'undefined') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const w = 12, h = 18, cv = document.createElement('canvas');
          cv.width = w; cv.height = h;
          const ctx = cv.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const d = ctx.getImageData(0, 0, w, h).data;
          let r = 0, g = 0, bl = 0, n = 0;
          for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; bl += d[i+2]; n++; }
          decide([r/n/255, g/n/255, bl/n/255]);
        } catch { fromGradient(); }
      };
      img.onerror = () => fromGradient();
      img.src = echoCover;
    } else {
      fromGradient();
    }
    return () => { cancelled = true; };
  }, [book, echoCover]);

  return (
    <div className={`book-panel${book ? ' open' : ''}`} ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true">
      {book && (
        <div className="panel-inner panel-inner--sectioned">

          {/* Header — cover + primary metadata, posés sur l'écho teinté de la
              cover. Le fond teinté est scopé à ce conteneur → séparation franche
              avec le corps neutre en dessous. */}
          <div
            className={`panel-header${echoCover ? ' panel-header--echo' : ''}${bgTone === 'light' ? ' is-light-bg' : bgTone === 'dark' ? ' is-dark-bg' : ''}`}
            style={echoCover ? { '--panel-cover': `url("${echoCover}")` } : undefined}
          >

            {/* Close button */}
            <button className="panel-close" onClick={onClose} aria-label={t.btnClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div
              className={`panel-cover-wrap${cover ? '' : ' panel-cover-empty'}`}
              style={{ background: cover ? undefined : `linear-gradient(135deg, ${c1}, ${c2})` }}>
              {cover
                ? <img src={cover} alt={book.title} className="panel-cover-img" />
                : <span className="panel-cover-letter">{letter}</span>}
            </div>
                <div className="panel-title">{book.title}</div>
                <div className="panel-byline">
                  <div className="panel-author">{book.author}</div>
                  <div className="panel-meta">
                    <span>{book.genre || 'NC'}</span>
                    <span className="panel-meta-sep" aria-hidden="true">·</span>
                    <span>{book.year || 'NC'}</span>
                  </div>
                </div>
                {book.startedAt && !book.finishedAt && (
                  <span className="now-reading-date">{t.nowReadingStartedOn(formatDate(book.startedAt, lang))}</span>
                )}
                <div className="panel-header-actions">
                  {tab === 'owned' && !book.startedAt && (
                    <button
                      className="panel-move-btn"
                      onClick={() => onStartReading?.(book)}
                      disabled={readingCount >= maxReading}
                      title={readingCount >= maxReading ? t.nowReadingLimit : undefined}>
                      {t.btnStartReading}
                    </button>
                  )}
                  {tab === 'owned' && book.startedAt && !book.finishedAt && (
                    <div className="panel-header-actions-group">
                      <button className="panel-move-btn" onClick={() => onFinishReading?.(book)}>
                        {t.btnFinishReading}
                      </button>
                      <button className="btn btn-secondary btn-md" onClick={() => onCancelReading?.(book)}>
                        {t.btnCancelReading}
                      </button>
                    </div>
                  )}
                  {tab === 'owned' && book.finishedAt && (
                    <button
                      type="button"
                      className="btn btn-outline btn-md panel-header-finished"
                      disabled
                      aria-disabled="true">
                      {t.btnBookFinished || 'Finished'}
                    </button>
                  )}
                  {tab === 'wishlist' && (
                    <button className="panel-move-btn" onClick={() => onMoveToLibrary(book)}>
                      {t.selConfirmOwned || 'Move to Library'}
                    </button>
                  )}
                  <button className="btn btn-outline btn-md panel-header-share" onClick={handleShare} aria-label={t.btnShare} title={t.btnShare}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/>
                      <polyline points="16 6 12 2 8 6"/>
                      <line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                    <span>{t.btnShare}</span>
                  </button>
                </div>
          </div>{/* end panel-header */}

          <div className="panel-body">
              {tab === 'wishlist' && (
                <>
                  <div className="panel-divider" />
                  <div className="panel-section">
                    <span className="panel-section-eyebrow">{t.panelFindOnline}</span>
                    <div className="panel-find-online-list">
                      <a
                        href={getAmazonSearchUrl(book)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-md panel-find-online-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        </svg>
                        <span>{t.panelViewOnAmazon}</span>
                      </a>
                      <a
                        href={getFnacSearchUrl(book)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-md panel-find-online-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        </svg>
                        <span>{t.panelViewOnFnac}</span>
                      </a>
                      {appleUrl && (
                        <a
                          href={appleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-md panel-find-online-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          </svg>
                          <span>{t.panelViewOnAppleBooks}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="panel-divider" />
              <div className="panel-collections-section">
                <div className="panel-section">
                  <span className="panel-section-eyebrow">{t.panelCollectionsSection}</span>
                  {collections.length > 0 ? (
                    <div className="panel-collections">
                      {collections.map(col => (
                        <button
                          key={col.id}
                          type="button"
                          className="book-row book-row-interactive collection-chip"
                          onClick={() => onOpenCollection?.(col)}>
                          <div className="book-row-body">
                            <div className="book-row-title">{col.name}</div>
                            <div className="book-row-author">{t.colBookCount((col.bookIds || []).length)}</div>
                          </div>
                          <svg className="book-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="panel-empty-text">{t.panelBookNoCollections}</p>
                  )}
                </div>
                {collections.length === 0 && (
                  <button
                    type="button"
                    className="btn btn-primary btn-md panel-add-to-collection"
                    onClick={() => onAddToCollection?.(book)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>{t.panelAddToCollection}</span>
                  </button>
                )}
              </div>
              {/* Finished section — same outer rhythm as .panel-quiz */}
              {book.finishedAt && (
                <>
                <div className="panel-divider" />
                <div className="panel-section is-finished">
                  <div className="panel-finished-content">
                    <span className="panel-section-eyebrow">{t.finishedSectionTitle}</span>
                    <div className="panel-finished-date">{t.nowReadingFinishedOn(formatDate(book.finishedAt, lang))}</div>
                    {book.rating && (
                      <div className="panel-finished-field">
                        <span className="panel-finished-label">{t.finishedRatingLabel}</span>
                        <StarsDisplay value={book.rating} />
                      </div>
                    )}
                    {book.note && (
                      <div className="panel-finished-field">
                        <span className="panel-finished-label">{t.finishedNoteLabel}</span>
                        <div className="panel-finished-note">{book.note}</div>
                      </div>
                    )}
                  </div>
                  <div className="panel-finished-actions">
                    <button type="button" className="panel-finished-btn" onClick={() => onEditFinished?.(book)}>
                      {(book.rating || book.note) ? t.btnEditReview : t.btnAddReview}
                    </button>
                    {(book.rating || book.note) && (
                      <button type="button" className="panel-finished-btn" onClick={() => onRemoveFinished?.(book)}>
                        {t.btnDelete}
                      </button>
                    )}
                  </div>
                </div>
                </>
              )}

          <div className="panel-divider" />

          {/* Character cast — Now reading only */}
          {book.startedAt && !book.finishedAt && (
            <>
              <CharacterCast book={book} lang={lang} t={t} />
              <div className="panel-divider" />
            </>
          )}

          {/* Quiz — finished books only (reward for completion) */}
          {book.finishedAt && (
            <>
              <BookQuiz book={book} lang={lang} t={t} />
              <div className="panel-divider" />
            </>
          )}

          {/* About section */}
          <div className="panel-section">
            <span className="panel-section-eyebrow">{t.aboutSectionTitle}</span>
            {synopsis
              ? <div className="panel-synopsis">{synopsis}</div>
              : <div className="panel-empty-text">No synopsis available.</div>
            }
          </div>

          {/* Quotes section — owned books only (no sense for wishlist) */}
          {tab !== 'wishlist' && (
            <>
              <div className="panel-divider" />
              <div className="panel-quotes">
                <div className="panel-quotes-content">
                  <span className="panel-section-eyebrow">{t.tabQuotes || 'Quotes'}</span>
                  {quotes && quotes.length > 0 ? (
                    <div className="panel-quotes-list">
                      {quotes.map(q => (
                        <PanelQuoteItem key={q.id} quote={q} onOpen={onOpenQuote} t={t} />
                      ))}
                    </div>
                  ) : (
                    <p className="panel-empty-text">{t.quoteEmptyBook || 'No quotes for this book yet.'}</p>
                  )}
                </div>
                <button className="panel-quotes-add" onClick={() => onAddQuote?.(book)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add a quote
                </button>
              </div>
            </>
          )}

          <div className="panel-divider" />

          {/* Footer actions — Delete only (Move to Library now lives in
              .panel-header-actions next to the other primary actions) */}
          <div className="panel-actions">
            <button className="panel-delete-btn" onClick={() => { onDelete(book); onClose(); }}>
              {t.btnDelete || 'Delete'}
            </button>
          </div>

          </div>{/* end panel-body */}

        </div>
      )}
    </div>
  );
}

function PanelQuoteItem({ quote, onOpen, t }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => {
      const hadExpanded = el.classList.contains('expanded');
      if (hadExpanded) el.classList.remove('expanded');
      const overflow = el.scrollHeight > el.clientHeight + 1;
      if (hadExpanded) el.classList.add('expanded');
      setOverflows(overflow);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [quote.text]);

  return (
    <button type="button" className="panel-quote-item" onClick={() => onOpen?.(quote)}>
      <p ref={textRef} className={`panel-quote-text${expanded ? ' expanded' : ''}`}>"{quote.text}"</p>
      {quote.page && <span className="panel-quote-page">p. {quote.page}</span>}
      {overflows && (
        <span
          role="button"
          tabIndex={0}
          className="quote-see-more panel-quote-see-more"
          onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(v => !v);
            }
          }}
        >
          {expanded ? t.quoteSeeLess : t.quoteSeeMore}
        </span>
      )}
    </button>
  );
}
