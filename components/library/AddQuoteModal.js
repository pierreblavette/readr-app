"use client";
import { useState, useEffect, useRef } from "react";
import GradientDropzone from "./GradientDropzone";
import BookChip from "./BookChip";
import { prepareImage } from "../../lib/prepareImage";

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://readr-vision.pierreblavette.workers.dev';

const INPUT_TABS = ['photo', 'manual'];

export default function AddQuoteModal({ open, onClose, onSave, allBooks, prefillBook, editing, t }) {
  const [inputMode, setInputMode]     = useState('photo');
  const [photoState, setPhotoState]   = useState('idle'); // 'idle' | 'scanning' | 'done'
  const [scanStep, setScanStep]       = useState('prep'); // 'prep' | 'reading'
  const [readingIdx, setReadingIdx]   = useState(0);
  const [scanError, setScanError]     = useState('');
  const [text, setText]               = useState('');
  const [bookSearch, setBookSearch]   = useState('');
  const [bookAuthor, setBookAuthor]   = useState('');
  const [bookId, setBookId]           = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [linkSearch, setLinkSearch]   = useState('');
  const [linkSuggestions, setLinkSuggestions] = useState([]);
  const [linkDropOpen, setLinkDropOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop]       = useState(false);
  const textareaRef  = useRef(null);
  const fileRef      = useRef(null);
  const debounceRef  = useRef(null);
  const linkDebounceRef = useRef(null);
  const linkDropdownRef = useRef(null);
  const linkInputRef = useRef(null);

  // Rotate reading-phase messages while scanning
  useEffect(() => {
    if (photoState !== 'scanning' || scanStep !== 'reading') return;
    const pool = t.quoteReadingPool || [];
    if (pool.length < 2) return;
    setReadingIdx(0);
    const id = setInterval(() => {
      setReadingIdx(i => (i + 1) % pool.length);
    }, 2200);
    return () => clearInterval(id);
  }, [photoState, scanStep, t]);

  // Tab indicator
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const el = tabRefs.current[INPUT_TABS.indexOf(inputMode)];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [inputMode, open]);

  // Ensure link dropdown is visible when opened (modal has overflow-y: auto)
  // Add a bit of breathing room so the dropdown doesn't stick to the modal bottom
  useEffect(() => {
    if (!linkDropOpen) return;
    const id = requestAnimationFrame(() => {
      const el = linkDropdownRef.current;
      if (!el) return;
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const modal = el.closest('.modal');
      if (!modal) return;
      const BOTTOM_GAP = 24;
      setTimeout(() => {
        const dropdownBottom = el.getBoundingClientRect().bottom;
        const modalBottom = modal.getBoundingClientRect().bottom;
        const overflow = dropdownBottom + BOTTOM_GAP - modalBottom;
        if (overflow > 0) modal.scrollTop += overflow;
      }, 320);
    });
    return () => cancelAnimationFrame(id);
  }, [linkDropOpen]);

  useEffect(() => {
    setBookSearch(''); setBookAuthor(''); setBookId(null);
    setSuggestions([]); setShowDrop(false);
    setLinkSearch(''); setLinkSuggestions([]); setLinkDropOpen(false);
    setScanError('');
    clearTimeout(debounceRef.current);
    clearTimeout(linkDebounceRef.current);

    if (editing) {
      setInputMode('photo');
      setPhotoState('done');
      setText(editing.text || '');
      if (editing.bookId) {
        const book = allBooks.find(b => b.id === editing.bookId);
        setSelectedBook({
          id: editing.bookId,
          title: book?.title || editing.bookTitle || '',
          author: book?.author || editing.bookAuthor || '',
          source: 'library',
        });
      } else if (editing.bookTitle) {
        setSelectedBook({
          id: null,
          title: editing.bookTitle,
          author: editing.bookAuthor || '',
          source: 'manual',
        });
      } else {
        setSelectedBook(null);
      }
    } else {
      setInputMode('photo'); setPhotoState('idle');
      setText('');
      setSelectedBook(prefillBook ? {
        id: prefillBook.id,
        title: prefillBook.title,
        author: prefillBook.author || '',
        source: 'library',
      } : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prefillBook, editing]);

  if (!open) return null;

  const canSave = text.trim().length > 0;

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanError(''); setScanStep('prep'); setPhotoState('scanning'); setText('');
    try {
      const [{ base64, mimeType }] = await Promise.all([
        prepareImage(file),
        new Promise(r => setTimeout(r, 600)),
      ]);
      setScanStep('reading');
      const readingStart = Date.now();
      const res = await fetch('/api/vision/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType }),
      });
      if (res.status === 413) throw new Error('Photo too large after resizing. Try a smaller image.');
      const data = await res.json();
      if (!res.ok || data.error) {
        console.error('[vision/quote] upstream error', { status: res.status, data });
        throw new Error(data.error || `Worker error ${res.status}`);
      }
      if (!data.text) throw new Error('empty');
      const readingElapsed = Date.now() - readingStart;
      if (readingElapsed < 700) await new Promise(r => setTimeout(r, 700 - readingElapsed));
      setText(data.text.replace(/([^\n])\n([^\n])/g, '$1 $2').trim());
      setPhotoState('done');
      setTimeout(() => textareaRef.current?.focus(), 80);
    } catch (err) {
      console.error('[vision/quote] scan failed', err);
      setScanError(t.quotePhotoError);
      setPhotoState('idle');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  // Manual-mode autocomplete (unchanged)
  const localMatches = allBooks.filter(b => {
    const q = bookSearch.toLowerCase();
    return q.length > 0 && (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  });
  const combined = [
    ...localMatches,
    ...suggestions.filter(s => !localMatches.some(b => b.title.toLowerCase() === s.title.toLowerCase())),
  ];

  function handleSelectBook(item) {
    setBookSearch(item.title);
    setBookAuthor(item.author || '');
    setBookId(item.id || null);
    setSuggestions([]);
    setShowDrop(false);
  }

  function handleBookSearchChange(val) {
    setBookSearch(val);
    setBookAuthor('');
    setBookId(null);
    clearTimeout(debounceRef.current);
    if (val.trim().length < 2) { setSuggestions([]); setShowDrop(false); return; }
    setShowDrop(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${WORKER_URL}/books?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        const items = (data.items || []).map(item => ({
          title: item.volumeInfo?.title || '',
          author: (item.volumeInfo?.authors || []).join(', '),
        })).filter(s => s.title);
        setSuggestions(items.slice(0, 6));
      } catch { setSuggestions([]); }
    }, 300);
  }

  // Photo-mode link selector — shows all library books on focus, filters on type
  const linkQuery = linkSearch.toLowerCase();
  const linkLocalMatches = linkQuery
    ? allBooks.filter(b => b.title.toLowerCase().includes(linkQuery) || b.author.toLowerCase().includes(linkQuery))
    : allBooks;
  const linkCombined = [
    ...linkLocalMatches.map(b => ({ ...b, source: 'library' })),
    ...linkSuggestions
      .filter(s => !linkLocalMatches.some(b => b.title.toLowerCase() === s.title.toLowerCase()))
      .map(s => ({ ...s, source: 'google' })),
  ];

  function handleLinkSelect(item) {
    setSelectedBook({
      id: item.source === 'library' ? item.id : null,
      title: item.title,
      author: item.author || '',
      source: item.source,
    });
    setLinkSearch('');
    setLinkSuggestions([]);
    setLinkDropOpen(false);
  }

  function handleLinkSearchChange(val) {
    setLinkSearch(val);
    clearTimeout(linkDebounceRef.current);
    if (val.trim().length < 2) { setLinkSuggestions([]); setLinkDropOpen(false); return; }
    setLinkDropOpen(true);
    linkDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${WORKER_URL}/books?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        const items = (data.items || []).map(item => ({
          title: item.volumeInfo?.title || '',
          author: (item.volumeInfo?.authors || []).join(', '),
        })).filter(s => s.title);
        setLinkSuggestions(items.slice(0, 6));
      } catch { setLinkSuggestions([]); }
    }, 300);
  }

  function handleSave() {
    if (!canSave) return;
    const bookData = inputMode === 'photo'
      ? {
          bookTitle: selectedBook?.title || '',
          bookAuthor: selectedBook?.author || '',
          bookId: selectedBook?.id || null,
        }
      : {
          bookTitle: bookSearch.trim(),
          bookAuthor: bookAuthor.trim(),
          bookId,
        };
    const payload = editing
      ? { text: text.trim(), ...bookData }
      : { text: text.trim(), ...bookData, page: '' };
    onSave(payload);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 620 }}>

        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-title">{editing ? t.quoteEdit : t.quoteAdd}</div>

        {/* Tabs: Photo | Manual — hidden in edit mode */}
        {!editing && <div className="import-tabs">
          <div className={`import-tab-indicator${inputMode === 'photo' ? ' gradient' : ''}`} style={{ left: indicator.left, width: indicator.width }} />
          <button ref={el => tabRefs.current[0] = el}
            className={`import-tab${inputMode === 'photo' ? ' active' : ''}`}
            onClick={() => { setInputMode('photo'); setShowDrop(false); }}>
            <span className="import-tab-ai">
              <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="aiTabGradQ" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F67BF8"/>
                    <stop offset="0.62" stopColor="#4959E6"/>
                  </linearGradient>
                </defs>
                <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiTabGradQ)"/>
              </svg>
              <span className="import-tab-ai-text">{t.quoteInputPhoto}</span>
            </span>
          </button>
          <button ref={el => tabRefs.current[1] = el}
            className={`import-tab${inputMode === 'manual' ? ' active' : ''}`}
            onClick={() => { setInputMode('manual'); setShowDrop(false); }}>
            {t.quoteInputManual}
          </button>
        </div>}

        <div className="modal-fields">

          {/* ── Photo tab ── */}
          {inputMode === 'photo' && photoState === 'idle' && (
            <>
              <input ref={fileRef} type="file" accept="image/*"
                style={{ display: 'none' }} onChange={handlePhotoChange} />
              <GradientDropzone onClick={() => fileRef.current?.click()} gradientId="quoteGradBorder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <div className="import-dropzone-title">Drop a photo or click to browse</div>
                <div className="import-dropzone-sub">JPG · PNG · HEIC. Photo of a bookshelf or a handwritten list.</div>
              </GradientDropzone>
              {scanError && (
                <div className="scan-alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {scanError}
                </div>
              )}
            </>
          )}

          {inputMode === 'photo' && photoState === 'scanning' && (
            <GradientDropzone gradientId="quoteGradScan">
              <svg className="quote-scanning-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg>
              <div key={`qtitle-${scanStep}-${readingIdx}`} className="import-dropzone-title scan-step-fade">{scanStep === 'prep' ? t.quoteStepPrep : (t.quoteReadingPool?.[readingIdx] || t.quoteStepReading)}</div>
              <div key={`qsub-${scanStep}`} className="import-dropzone-sub scan-step-fade">{scanStep === 'prep' ? t.quoteStepPrepSub : t.quoteStepReadingSub}</div>
            </GradientDropzone>
          )}

          {inputMode === 'photo' && photoState === 'done' && (
            <>
              <div className="quote-scan-result">
                {!editing && (
                  <button className="import-change-file"
                    onClick={() => { setPhotoState('idle'); setText(''); setScanError(''); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    {t.quoteTryAgain}
                  </button>
                )}
                <div className="modal-field">
                  <label className="modal-field-label">{t.quoteLabel}</label>
                  <textarea ref={textareaRef} className="quote-textarea"
                    placeholder={t.quotePlaceholder}
                    value={text} onChange={e => setText(e.target.value)} rows={5} />
                </div>
              </div>

              <div className={`modal-field quote-link-section${linkDropOpen && !selectedBook ? ' is-open' : ''}`} style={{ position: 'relative' }}>
                <label className="modal-field-label">{t.quoteLinkToBook}</label>
                {selectedBook ? (
                  <BookChip book={selectedBook} onRemove={() => setSelectedBook(null)} ariaLabel={t.quoteLinkRemove} />
                ) : (
                  <div className={`quote-link-select${linkDropOpen ? ' open' : ''}`}>
                    <input
                      ref={linkInputRef}
                      className="modal-field-input quote-link-select-input"
                      placeholder={t.quoteLinkSearch}
                      value={linkSearch}
                      onChange={e => handleLinkSearchChange(e.target.value)}
                      onMouseDown={e => {
                        if (linkDropOpen && document.activeElement === linkInputRef.current) {
                          e.preventDefault();
                          setLinkDropOpen(false);
                          linkInputRef.current?.blur();
                        }
                      }}
                      onFocus={() => setLinkDropOpen(true)}
                      onBlur={() => setTimeout(() => setLinkDropOpen(false), 150)}
                      autoComplete="off"
                      role="combobox"
                      aria-expanded={linkDropOpen}
                      aria-controls="quote-link-listbox"
                    />
                    <svg className="quote-link-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    {linkDropOpen && linkCombined.length > 0 && (
                      <ul ref={linkDropdownRef} id="quote-link-listbox" className="autocomplete-list open" role="listbox">
                        {linkCombined.map((b, i) => (
                          <li key={b.id || `g-${i}`} className="autocomplete-item" role="option" onMouseDown={() => handleLinkSelect(b)}>
                            {b.title}<span className="autocomplete-sep">·</span><span>{b.author}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── Manual tab ── */}
          {inputMode === 'manual' && (
            <>
              <div className="modal-field">
                <label className="modal-field-label">{t.quoteLabel}</label>
                <textarea ref={textareaRef} className="quote-textarea"
                  placeholder={t.quotePlaceholder}
                  value={text} onChange={e => setText(e.target.value)} rows={5} />
              </div>

              <div className="modal-field" style={{ position: 'relative' }}>
                <label className="modal-field-label">{t.quoteBookTitle}</label>
                <input
                  className="modal-field-input"
                  placeholder={t.placeholderTitle}
                  value={bookSearch}
                  onChange={e => handleBookSearchChange(e.target.value)}
                  onFocus={() => bookSearch.trim().length > 0 && setShowDrop(true)}
                  onBlur={() => setTimeout(() => setShowDrop(false), 150)}
                  autoComplete="off"
                />
                {showDrop && combined.length > 0 && (
                  <ul className="autocomplete-list open">
                    {combined.slice(0, 6).map((b, i) => (
                      <li key={b.id || i} className="autocomplete-item" onMouseDown={() => handleSelectBook(b)}>
                        {b.title}<span className="autocomplete-sep">·</span><span>{b.author}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="modal-field">
                <label className="modal-field-label">{t.quoteBookAuthor}</label>
                <input
                  className="modal-field-input"
                  placeholder={t.placeholderAuthor}
                  value={bookAuthor}
                  onChange={e => setBookAuthor(e.target.value)}
                />
              </div>
            </>
          )}

        </div>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>{t.btnCancel}</button>
          <button className="modal-submit" onClick={handleSave} disabled={!canSave}>
            {editing ? t.quoteSaveEdit : t.quoteSave}
          </button>
        </div>

      </div>
    </div>
  );
}

