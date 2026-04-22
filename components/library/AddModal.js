"use client";
import { useState, useRef, useEffect } from "react";
import GradientDropzone from "./GradientDropzone";
import { prepareImage } from "../../lib/prepareImage";

const TABS = ['photo', 'file', 'manual'];

function PhotoDropzone({ onClick }) {
  return (
    <GradientDropzone onClick={onClick} gradientId="photoGradBorder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <div className="import-dropzone-title">Drop a photo or click to browse</div>
      <div className="import-dropzone-sub">JPG · PNG · HEIC — photo of a bookshelf or a handwritten list</div>
    </GradientDropzone>
  );
}

export default function AddModal({ open, onClose, onAdd, onAddMany, t }) {
  const [activeTab, setActiveTab] = useState('photo');
  const [suggestions, setSuggestions] = useState([]);
  const [sugFocused, setSugFocused] = useState(-1);
  const debounceRef = useRef(null);
  const [title,  setTitle]  = useState('');
  const [author, setAuthor] = useState('');
  const [year,   setYear]   = useState('');
  const [genre,  setGenre]  = useState('');
  const [error,  setError]  = useState('');
  const [importError, setImportError] = useState('');
  const [previewBooks, setPreviewBooks] = useState([]);
  const [photoState, setPhotoState] = useState('idle');
  const [photoError, setPhotoError] = useState('');
  const fileInputRef  = useRef(null);
  const photoInputRef = useRef(null);

  // Tab indicator
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const idx = TABS.indexOf(activeTab);
    const el  = tabRefs.current[idx];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab, open]);

  useEffect(() => {
    if (open) {
      setPhotoState('idle'); setPhotoError(''); setPreviewBooks([]);
      setTitle(''); setAuthor(''); setYear(''); setGenre(''); setError('');
      setImportError(''); setSuggestions([]); setSugFocused(-1);
      setActiveTab('photo');
    }
  }, [open]);

  if (!open) return null;

  function handleTitleInput(val) {
    setTitle(val);
    setSugFocused(-1);
    clearTimeout(debounceRef.current);
    if (val.trim().length < 2) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL || 'https://readr-vision.pierreblavette.workers.dev';
        const url = `${workerUrl}/books?q=${encodeURIComponent(val)}`;
        const res = await fetch(url);
        const data = await res.json();
        const items = (data.items || []).map(item => ({
          title:  item.volumeInfo?.title  || '',
          author: (item.volumeInfo?.authors || []).join(', '),
          year:   item.volumeInfo?.publishedDate?.slice(0, 4) || '',
        })).filter(b => b.title);
        setSuggestions(items);
      } catch { setSuggestions([]); }
    }, 300);
  }

  function pickSuggestion(s) {
    onAdd({ title: s.title, author: s.author, year: s.year || null, genre: null });
    resetAndClose();
  }

  function handleTitleKeydown(e) {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setSugFocused(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSugFocused(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && sugFocused >= 0) { e.preventDefault(); pickSuggestion(suggestions[sugFocused]); }
    else if (e.key === 'Escape') setSuggestions([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) { setError('Title and author are required.'); return; }
    onAdd({ title: title.trim(), author: author.trim(), year: year.trim() || null, genre: genre.trim() || null });
    resetAndClose();
  }

  function handleImportConfirm() {
    onAddMany(previewBooks);
    resetAndClose();
  }

  function resetAndClose() {
    setTitle(''); setAuthor(''); setYear(''); setGenre(''); setError('');
    setImportError(''); setPreviewBooks([]); setSuggestions([]); setSugFocused(-1);
    setPhotoState('idle'); setPhotoError('');
    setActiveTab('photo');
    onClose();
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoInputRef.current) photoInputRef.current.value = '';
    setPhotoError(''); setPhotoState('scanning');
    try {
      const { base64, mimeType } = await prepareImage(file);
      const res = await fetch('/api/vision/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType }),
      });
      if (res.status === 413) throw new Error('Photo too large after resizing. Try a smaller image.');
      const data = await res.json();
      if (!res.ok || data.error) {
        console.error('[vision/books] upstream error', { status: res.status, data });
        throw new Error(data.error || `Worker error ${res.status}`);
      }
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      const books = JSON.parse(match?.[0] || '[]');
      if (!books.length) {
        console.warn('[vision/books] no books detected in Gemini response', { raw });
        throw new Error('no books');
      }
      setPreviewBooks(prev => [...prev, ...books.filter(b => b.title)]);
      setPhotoError('');
      setPhotoState('idle');
    } catch (err) {
      console.error('[vision/books] scan failed', err);
      const msg = err?.message === 'no books'
        ? 'No books detected. Try a clearer photo with visible titles.'
        : `Scan failed: ${err?.message || 'unknown error'}`;
      setPhotoError(msg);
      setPhotoState('idle');
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    parseFile(file);
  }

  function parseFile(file) {
    setImportError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        let books = [];
        if (file.name.endsWith('.json')) {
          const data = JSON.parse(text);
          books = (Array.isArray(data) ? data : data.books || data.owned || [])
            .map(b => ({ title: b.title, author: b.author, year: b.year || null, genre: b.genre || null }))
            .filter(b => b.title && b.author);
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split('\n').filter(l => l.trim());
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          const tIdx = headers.indexOf('title');
          const aIdx = headers.indexOf('author');
          books = lines.slice(1)
            .map(line => {
              const cols = line.split(',');
              return { title: cols[tIdx]?.trim(), author: cols[aIdx]?.trim(), year: null, genre: null };
            })
            .filter(b => b.title && b.author);
        }
        if (books.length === 0) { setImportError('No valid books found in file.'); return; }
        setPreviewBooks(books);
      } catch {
        setImportError('Could not read file. Please check the format.');
      }
    };
    reader.readAsText(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const file = e.dataTransfer.files?.[0];
    if (file) parseFile(file);
  }

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) resetAndClose(); }}>
      <div className="modal" style={{ maxWidth: 620 }}>

        {/* Close */}
        <button className="modal-close" onClick={resetAndClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-title">{t.modalTitle}</div>

        {/* Tabs */}
        <div className="import-tabs">
          <div className={`import-tab-indicator${activeTab === 'photo' ? ' gradient' : ''}`} style={{ left: indicator.left, width: indicator.width }} />
          <button
            ref={el => tabRefs.current[0] = el}
            className={`import-tab${activeTab === 'photo' ? ' active' : ''}`}
            onClick={() => setActiveTab('photo')}>
            <span className="import-tab-ai">
              <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="aiTabGrad" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F67BF8"/>
                    <stop offset="0.62" stopColor="#4959E6"/>
                  </linearGradient>
                </defs>
                <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiTabGrad)"/>
              </svg>
              <span className="import-tab-ai-text">Photo</span>
            </span>
          </button>

          <button
            ref={el => tabRefs.current[1] = el}
            className={`import-tab${activeTab === 'file' ? ' active' : ''}`}
            onClick={() => setActiveTab('file')}>
            File
          </button>

          <button
            ref={el => tabRefs.current[2] = el}
            className={`import-tab${activeTab === 'manual' ? ' active' : ''}`}
            onClick={() => setActiveTab('manual')}>
            Manual
          </button>
        </div>

        {/* Photo tab */}
        {activeTab === 'photo' && (
          <div>
            <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
            {photoState === 'scanning' ? (
              <GradientDropzone>
                <svg className="quote-scanning-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg>
                <div className="import-dropzone-title">Scanning cover...</div>
                <div className="import-dropzone-sub">Detecting title and author from your photo</div>
              </GradientDropzone>
            ) : previewBooks.length === 0 ? (
              <PhotoDropzone onClick={() => photoInputRef.current?.click()} />
            ) : (
              <button className="import-change-file" onClick={() => photoInputRef.current?.click()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                Add another photo
              </button>
            )}
            {photoError && (
              <div className="scan-alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {photoError}
              </div>
            )}
            {previewBooks.length > 0 && (
              <div className="import-preview">
                <div className="import-preview-header">
                  <span className="import-preview-title">{previewBooks.length} book{previewBooks.length > 1 ? 's' : ''} detected</span>
                </div>
                <div className="import-preview-list">
                  {previewBooks.map((b, i) => (
                    <div key={i} className="import-preview-item">
                      <div>
                        <div className="import-preview-book">{b.title}</div>
                        <div className="import-preview-author">{b.author}</div>
                      </div>
                      <button className="import-preview-remove" onClick={() => setPreviewBooks(prev => prev.filter((_, j) => j !== i))}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={resetAndClose}>{t.btnCancel}</button>
              <button type="button" className="modal-submit"
                disabled={photoState === 'scanning' || previewBooks.length === 0}
                onClick={handleImportConfirm}>
                Import {previewBooks.length > 0 ? `(${previewBooks.length})` : ''}
              </button>
            </div>
          </div>
        )}

        {/* File tab */}
        {activeTab === 'file' && (
          <div>
            {previewBooks.length === 0 ? (
              <div
                className="import-dropzone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
                onDragLeave={e => e.currentTarget.classList.remove('dragover')}
                onDrop={handleDrop}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <div className="import-dropzone-title">Drop a file or click to browse</div>
                <div className="import-dropzone-sub">JSON (Readr) · CSV (Goodreads)</div>
              </div>
            ) : (
              <button className="import-change-file" onClick={() => fileInputRef.current?.click()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Change file
              </button>
            )}
            <input ref={fileInputRef} type="file" accept=".json,.csv" style={{ display: 'none' }} onChange={handleFileChange} />

            {importError && <div className="import-error">{importError}</div>}

            {previewBooks.length > 0 && (
              <div className="import-preview">
                <div className="import-preview-header">
                  <span className="import-preview-title">{previewBooks.length} book{previewBooks.length > 1 ? 's' : ''} found</span>
                </div>
                <div className="import-preview-list">
                  {previewBooks.map((b, i) => (
                    <div key={i} className="import-preview-item">
                      <div>
                        <div className="import-preview-book">{b.title}</div>
                        <div className="import-preview-author">{b.author}</div>
                      </div>
                      <button className="import-preview-remove" onClick={() => setPreviewBooks(prev => prev.filter((_, j) => j !== i))}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={resetAndClose}>{t.btnCancel}</button>
              <button
                type="button"
                className="modal-submit"
                disabled={previewBooks.length === 0}
                onClick={handleImportConfirm}>
                Import {previewBooks.length > 0 ? `(${previewBooks.length})` : ''}
              </button>
            </div>
          </div>
        )}

        {/* Manual tab */}
        {activeTab === 'manual' && (
          <form onSubmit={handleSubmit}>
            <div className="modal-fields">
              {/* Title with autocomplete */}
              <div className="modal-field" style={{ position: 'relative' }}>
                <label>{t.labelTitle}</label>
                <input
                  placeholder={t.placeholderTitle}
                  value={title}
                  onChange={e => handleTitleInput(e.target.value)}
                  onKeyDown={handleTitleKeydown}
                  autoComplete="off"
                />
                {suggestions.length > 0 && (
                  <ul className="autocomplete-list open">
                    {suggestions.map((s, i) => (
                      <li key={i}
                        className={`autocomplete-item${sugFocused === i ? ' focused' : ''}`}
                        onMouseDown={() => pickSuggestion(s)}>
                        {s.title}
                        {s.author && <><span className="autocomplete-sep">·</span><span>{s.author}</span></>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Other fields */}
              {[
                { label: t.labelAuthor, ph: t.placeholderAuthor, val: author, set: setAuthor },
                { label: t.labelYear,   ph: t.placeholderYear,   val: year,   set: setYear   },
                { label: t.labelGenre,  ph: t.placeholderGenre,  val: genre,  set: setGenre  },
              ].map(({ label, ph, val, set }) => (
                <div key={label} className="modal-field">
                  <label>{label}</label>
                  <input placeholder={ph} value={val} onChange={e => set(e.target.value)} />
                </div>
              ))}
            </div>

            {error && <div className="modal-error">{error}</div>}

            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={resetAndClose}>{t.btnCancel}</button>
              <button type="submit" className="modal-submit" disabled={!title.trim() || !author.trim()}>{t.btnAddLibrary}</button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
