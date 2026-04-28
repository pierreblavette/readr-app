"use client";
import { useState, useEffect, useCallback } from "react";
import { STRINGS } from "./i18n";

const READR_DATA_KEY        = 'readr-data';
const READR_LANG_KEY        = 'readr-lang';
const READR_THEME_KEY       = 'biblio-theme';
const READR_VIEW_KEY        = 'biblio-view';
const READR_OB_KEY          = 'readr-onboarding-seen';
const READR_COLLECTIONS_KEY = 'readr-collections';
const READR_SIDEBAR_KEY     = 'readr-sidebar-collapsed';
const READR_QUOTES_KEY      = 'readr-quotes';
const READR_WORDS_KEY       = 'readr-dict-words';
const READR_TAB_KEY         = 'readr-tab';
const READR_ACTIVE_COL_KEY  = 'readr-active-collection';

export const MAX_READING = 3;

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/^(l'|le |la |les |un |une |des |the )/i, '');
}

export function useLibrary() {
  const [data, setData]               = useState({ owned: [], wishlist: [] });
  const [tab, setTabState]            = useState('owned');
  const [view, setView]               = useState('grid');
  const [lang, setLangState]          = useState('en');
  const [search, setSearch]           = useState('');
  const [sortCol, setSortCol]         = useState('dateAdded');
  const [sortDir, setSortDir]         = useState('desc');
  const [editMode, setEditMode]       = useState(false);
  const [selected, setSelected]       = useState(new Set());
  const [panelBook, setPanelBook]     = useState(null);
  const [addModalOpen, setAddModal]   = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [obOpen, setObOpen]           = useState(false);
  const [hydrated, setHydrated]       = useState(false);
  const [collections, setCollections]           = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCollection, setActiveCollectionState] = useState(null); // collection id or null
  const [quotes, setQuotes]                     = useState([]);
  const [words, setWords]                       = useState([]);

  // Load from localStorage (client only)
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(READR_DATA_KEY);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setData({ owned: parsed.owned || [], wishlist: parsed.wishlist || [] });
        } catch(e) {}
      }
      setLangState(localStorage.getItem(READR_LANG_KEY) || 'en');
      setView(localStorage.getItem(READR_VIEW_KEY) || 'grid');
      if (!localStorage.getItem(READR_OB_KEY)) setObOpen(true);
      let parsedCols = [];
      const savedCols = localStorage.getItem(READR_COLLECTIONS_KEY);
      if (savedCols) {
        try { parsedCols = JSON.parse(savedCols) || []; setCollections(parsedCols); } catch(e) {}
      }
      const savedQuotes = localStorage.getItem(READR_QUOTES_KEY);
      if (savedQuotes) { try { setQuotes(JSON.parse(savedQuotes)); } catch(e) {} }
      const savedWords = localStorage.getItem(READR_WORDS_KEY);
      if (savedWords) { try { setWords(JSON.parse(savedWords)); } catch(e) {} }
      setSidebarCollapsed(localStorage.getItem(READR_SIDEBAR_KEY) === '1');
      const savedTab = localStorage.getItem(READR_TAB_KEY);
      if (['owned', 'wishlist', 'collections', 'quotes', 'dictionary'].includes(savedTab)) setTabState(savedTab);
      const savedActiveCol = localStorage.getItem(READR_ACTIVE_COL_KEY);
      if (savedActiveCol && parsedCols.some(c => c.id === savedActiveCol)) {
        setActiveCollectionState(savedActiveCol);
      }
    } catch(e) {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    setEditMode(false);
    setSelected(new Set());
    setSearch('');
  }, [tab, activeCollection]);

  const saveData = useCallback((newData) => {
    setData(newData);
    try { localStorage.setItem(READR_DATA_KEY, JSON.stringify(newData)); } catch(e) {}
  }, []);

  const saveCollections = useCallback((cols) => {
    setCollections(cols);
    try { localStorage.setItem(READR_COLLECTIONS_KEY, JSON.stringify(cols)); } catch(e) {}
  }, []);

  const saveQuotes = useCallback((q) => {
    setQuotes(q);
    try { localStorage.setItem(READR_QUOTES_KEY, JSON.stringify(q)); } catch(e) {}
  }, []);

  const saveWordsList = useCallback((w) => {
    setWords(w);
    try { localStorage.setItem(READR_WORDS_KEY, JSON.stringify(w)); } catch(e) {}
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem(READR_LANG_KEY, l);
  }, []);

  const switchView = useCallback((v) => {
    setView(v);
    localStorage.setItem(READR_VIEW_KEY, v);
  }, []);

  const setTab = useCallback((t) => {
    setTabState(t);
    try { localStorage.setItem(READR_TAB_KEY, t); } catch(e) {}
  }, []);

  const setActiveCollection = useCallback((id) => {
    setActiveCollectionState(id);
    try {
      if (id) localStorage.setItem(READR_ACTIVE_COL_KEY, id);
      else    localStorage.removeItem(READR_ACTIVE_COL_KEY);
    } catch(e) {}
  }, []);

  const t = STRINGS[lang] || STRINGS.en;

  // Computed books for current tab
  const books = (() => {
    let list = [...(data[tab] || [])];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(b =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let cmp;
      if (sortCol === 'dateAdded') {
        cmp = (a.id || 0) - (b.id || 0);
      } else if (sortCol === 'year') {
        const ya = a.year ? parseInt(a.year) : 9999;
        const yb = b.year ? parseInt(b.year) : 9999;
        cmp = ya !== yb ? ya - yb : normalize(a.title).localeCompare(normalize(b.title), 'fr');
      } else if (sortCol === 'author') {
        const la = a.author.split(' ').pop() || a.author;
        const lb = b.author.split(' ').pop() || b.author;
        cmp = normalize(la).localeCompare(normalize(lb), 'fr');
      } else if (sortCol === 'genre') {
        cmp = (a.genre || '').localeCompare(b.genre || '', 'fr');
      } else {
        cmp = normalize(a.title).localeCompare(normalize(b.title), 'fr');
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  })();

  const addBook = useCallback((book) => {
    const isDuplicate = data[tab].some(
      b => b.title.trim().toLowerCase() === book.title.trim().toLowerCase() &&
           b.author.trim().toLowerCase() === book.author.trim().toLowerCase()
    );
    if (isDuplicate) return false;
    const newData = { ...data, [tab]: [...data[tab], { ...book, id: Date.now() }] };
    saveData(newData);
    return true;
  }, [data, tab, saveData]);

  const addMany = useCallback((books) => {
    const existing = data[tab];
    const toAdd = books.filter(book =>
      !existing.some(
        b => b.title.trim().toLowerCase() === book.title.trim().toLowerCase() &&
             b.author.trim().toLowerCase() === book.author.trim().toLowerCase()
      )
    ).map((book, i) => ({ ...book, id: Date.now() + i }));
    if (toAdd.length === 0) return;
    const newData = { ...data, [tab]: [...existing, ...toAdd] };
    saveData(newData);
  }, [data, tab, saveData]);

  const deleteBook = useCallback((id) => {
    const newData = { ...data, [tab]: data[tab].filter(b => b.id !== id) };
    saveData(newData);
    if (panelBook?.id === id) setPanelBook(null);
  }, [data, tab, saveData, panelBook]);

  const moveToLibrary = useCallback((ids) => {
    const toMove = data.wishlist.filter(b => ids.has(b.id));
    const newData = {
      owned: [...data.owned, ...toMove],
      wishlist: data.wishlist.filter(b => !ids.has(b.id)),
    };
    saveData(newData);
  }, [data, saveData]);

  const deleteMany = useCallback((ids) => {
    const newData = { ...data, [tab]: data[tab].filter(b => !ids.has(b.id)) };
    saveData(newData);
  }, [data, tab, saveData]);

  // ─── Now Reading ─────────────────────────────────────────────────────
  // A book is "reading" when startedAt is set and finishedAt is null.
  // Only books in `owned` can be started. Capped at MAX_READING simultaneous.
  // Sorted most-recently-started first.
  const readingBooks = data.owned
    .filter(b => b.startedAt && !b.finishedAt)
    .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));

  const startReading = useCallback((id) => {
    const book = data.owned.find(b => b.id === id);
    if (!book) return false;
    if (book.startedAt && !book.finishedAt) return false; // already reading
    const currentlyReading = data.owned.filter(b => b.startedAt && !b.finishedAt).length;
    if (currentlyReading >= MAX_READING) return false;
    const newOwned = data.owned.map(b => b.id === id
      ? { ...b, startedAt: Date.now(), finishedAt: null }
      : b);
    saveData({ ...data, owned: newOwned });
    return true;
  }, [data, saveData]);

  const finishReading = useCallback((id, { finishedAt, rating, note } = {}) => {
    const book = data.owned.find(b => b.id === id);
    if (!book || !book.startedAt || book.finishedAt) return false;
    const newOwned = data.owned.map(b => b.id === id
      ? {
          ...b,
          finishedAt: finishedAt ?? Date.now(),
          ...(rating != null ? { rating } : {}),
          ...(note != null ? { note } : {}),
        }
      : b);
    saveData({ ...data, owned: newOwned });
    return true;
  }, [data, saveData]);

  // Clear all reading metadata — used if the user wants to restart from scratch.
  const cancelReading = useCallback((id) => {
    const newOwned = data.owned.map(b => b.id === id
      ? { ...b, startedAt: null, finishedAt: null, rating: null, note: null }
      : b);
    saveData({ ...data, owned: newOwned });
  }, [data, saveData]);

  // Edit rating/note on an already-finished book (pass null to clear a field).
  const updateFinished = useCallback((id, { rating, note } = {}) => {
    const book = data.owned.find(b => b.id === id);
    if (!book || !book.finishedAt) return false;
    const newOwned = data.owned.map(b => b.id === id
      ? { ...b, rating: rating ?? null, note: note ?? null }
      : b);
    saveData({ ...data, owned: newOwned });
    return true;
  }, [data, saveData]);

  const exportData = useCallback(() => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'readr-library.json'; a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const exportPDF = useCallback(() => {
    function esc(str) {
      return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    const isFr = lang === 'fr';
    const date = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const total = data.owned.length + data.wishlist.length;
    const thTitle = isFr ? 'Titre' : 'Title';
    const thAuthor = isFr ? 'Auteur' : 'Author';
    const thYear = isFr ? 'Année' : 'Year';
    const emptyStr = isFr ? 'Aucun livre' : 'No books';

    function renderTable(books) {
      if (!books.length) return `<p class="empty">${emptyStr}</p>`;
      return `<table>
        <thead><tr><th>${thTitle}</th><th>${thAuthor}</th><th>${thYear}</th><th>Genre</th></tr></thead>
        <tbody>${books.map(b => `<tr>
          <td class="td-title">${esc(b.title)}</td>
          <td class="td-author">${esc(b.author)}</td>
          <td class="td-meta">${esc(b.year) || '\u2014'}</td>
          <td class="td-meta">${esc(b.genre) || '\u2014'}</td>
        </tr>`).join('')}</tbody>
      </table>`;
    }

    const lines = [
      '<!DOCTYPE html>',
      `<html lang="${isFr ? 'fr' : 'en'}">`,
      '<head>',
      '<meta charset="utf-8">',
      `<title>readr \u2014 ${isFr ? 'Ma biblioth\u00e8que' : 'My Library'}</title>`,
      '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet">',
      '<style>',
      '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}',
      'body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;font-size:12px;color:#111827;background:#fff;padding:48px 56px}',
      '.header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:40px;border-bottom:1px solid #e5e7eb;padding-bottom:16px}',
      '.logo{font-family:"Fraunces",Georgia,serif;font-size:28px;font-weight:400;color:#111827;letter-spacing:-0.5px}',
      '.meta{font-size:11px;color:#9ca3af}',
      '.section{margin-bottom:36px}',
      'h2{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#4959E6;margin-bottom:12px}',
      'table{width:100%;border-collapse:collapse}',
      'th{text-align:left;font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.07em;color:#9ca3af;padding:6px 10px;border-bottom:1px solid #e5e7eb}',
      'td{padding:9px 10px;border-bottom:1px solid #f3f4f6;vertical-align:top;line-height:1.4}',
      '.td-title{font-weight:500;color:#111827}',
      '.td-author{color:#4b5563}',
      '.td-meta{color:#9ca3af}',
      '.empty{color:#9ca3af;font-style:italic;padding:12px 10px}',
      '@page{margin:0}',
      '@media print{body{padding:32px 40px}}',
      '</style>',
      '</head>',
      '<body>',
      '<div class="header">',
      '<span class="logo">readr</span>',
      `<span class="meta">${date} \u00b7 ${total} ${isFr ? (total > 1 ? 'livres' : 'livre') : (total > 1 ? 'books' : 'book')}</span>`,
      '</div>',
      '<div class="section">',
      `<h2>${isFr ? 'Ma biblioth\u00e8que' : 'My Library'} (${data.owned.length})</h2>`,
      renderTable(data.owned),
      '</div>',
      '<div class="section">',
      `<h2>Wishlist (${data.wishlist.length})</h2>`,
      renderTable(data.wishlist),
      '</div>',
      '</body>',
      '</html>',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.addEventListener('load', () => {
        win.print();
        URL.revokeObjectURL(url);
      });
    } else {
      URL.revokeObjectURL(url);
    }
  }, [data, lang]);

  const importData = useCallback((parsed) => {
    if (!Array.isArray(parsed.owned) || !Array.isArray(parsed.wishlist)) throw new Error('invalid');
    saveData({ owned: parsed.owned, wishlist: parsed.wishlist });
  }, [saveData]);

  const createCollection = useCallback((name, emoji = '📚') => {
    const col = { id: Date.now(), name, emoji, bookIds: [] };
    saveCollections([...collections, col]);
    return col;
  }, [collections, saveCollections]);

  const deleteCollection = useCallback((id) => {
    saveCollections(collections.filter(c => c.id !== id));
    if (activeCollection === id) setActiveCollection(null);
  }, [collections, activeCollection, saveCollections]);

  const addBookToCollection = useCallback((colId, bookId) => {
    saveCollections(collections.map(c =>
      c.id === colId
        ? { ...c, bookIds: c.bookIds?.includes(bookId) ? c.bookIds : [...(c.bookIds || []), bookId] }
        : c
    ));
  }, [collections, saveCollections]);

  const removeBookFromCollection = useCallback((colId, bookId) => {
    saveCollections(collections.map(c =>
      c.id === colId ? { ...c, bookIds: (c.bookIds || []).filter(id => id !== bookId) } : c
    ));
  }, [collections, saveCollections]);

  const getBooksForCollection = useCallback((colId) => {
    const col = collections.find(c => c.id === colId);
    if (!col) return [];
    const allBooks = [...data.owned, ...data.wishlist];
    return (col.bookIds || []).map(id => allBooks.find(b => b.id === id)).filter(Boolean);
  }, [collections, data]);

  const addQuote = useCallback(({ text, bookTitle, bookAuthor, bookId, page }) => {
    const quote = {
      id: Date.now(),
      text: text.trim(),
      bookTitle: bookTitle?.trim() || '',
      bookAuthor: bookAuthor?.trim() || '',
      bookId: bookId || null,
      page: page?.trim() || '',
      createdAt: Date.now(),
    };
    saveQuotes([quote, ...quotes]);
    return quote;
  }, [quotes, saveQuotes]);

  const deleteQuote = useCallback((id) => {
    saveQuotes(quotes.filter(q => q.id !== id));
  }, [quotes, saveQuotes]);

  const updateQuote = useCallback((id, updates) => {
    saveQuotes(quotes.map(q => q.id === id ? {
      ...q,
      text: updates.text?.trim() ?? q.text,
      bookTitle: updates.bookTitle?.trim() ?? q.bookTitle,
      bookAuthor: updates.bookAuthor?.trim() ?? q.bookAuthor,
      bookId: updates.bookId !== undefined ? updates.bookId : q.bookId,
      page: updates.page?.trim() ?? q.page,
    } : q));
  }, [quotes, saveQuotes]);

  const saveWord = useCallback(({ word, lang, definitions }) => {
    const key = `${lang}::${word.trim().toLowerCase()}`;
    const existing = words.find(w => `${w.lang}::${w.word.toLowerCase()}` === key);
    if (existing) {
      saveWordsList(words.map(w => w.id === existing.id ? { ...w, definitions } : w));
      return existing.id;
    }
    const entry = {
      id: Date.now(),
      word: word.trim(),
      lang,
      definitions,
      createdAt: Date.now(),
    };
    saveWordsList([entry, ...words]);
    return entry.id;
  }, [words, saveWordsList]);

  const deleteWord = useCallback((id) => {
    saveWordsList(words.filter(w => w.id !== id));
  }, [words, saveWordsList]);

  const exportWordsMD = useCallback(() => {
    const isFr = lang === 'fr';
    const date = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word, isFr ? 'fr' : 'en', { sensitivity: 'base' }));
    const exampleLabel = isFr ? 'Exemple' : 'Example';
    const title = isFr ? 'Dictionnaire' : 'Dictionary';
    const emptyLine = isFr ? '_Aucun mot sauvegardé._' : '_No saved words._';

    const lines = [`# readr — ${title}`, `_${date} · ${words.length} ${isFr ? (words.length > 1 ? 'mots' : 'mot') : (words.length > 1 ? 'words' : 'word')}_`, ''];
    if (!sorted.length) {
      lines.push(emptyLine);
    } else {
      sorted.forEach(w => {
        lines.push(`## ${w.word}`);
        (w.definitions || []).forEach(d => {
          const pos = d.pos ? `**${d.pos}** — ` : '';
          lines.push(`- ${pos}${d.meaning || ''}`);
          if (d.example) lines.push(`  - _${exampleLabel}_: ${d.example}`);
        });
        lines.push('');
      });
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'readr-dictionary.md'; a.click();
    URL.revokeObjectURL(url);
  }, [words, lang]);

  const exportWordsPDF = useCallback(() => {
    function esc(str) {
      return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    const isFr = lang === 'fr';
    const date = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word, isFr ? 'fr' : 'en', { sensitivity: 'base' }));
    const title = isFr ? 'Dictionnaire' : 'Dictionary';
    const exampleLabel = isFr ? 'Exemple' : 'Example';
    const countLabel = isFr ? (words.length > 1 ? 'mots' : 'mot') : (words.length > 1 ? 'words' : 'word');
    const emptyStr = isFr ? 'Aucun mot sauvegardé' : 'No saved words';

    function renderEntry(w) {
      const defs = (w.definitions || []).map(d => `
        <div class="def">
          ${d.pos ? `<span class="pos">${esc(d.pos)}</span>` : ''}
          <p class="meaning">${esc(d.meaning)}</p>
          ${d.example ? `<div class="example"><span class="example-label">${exampleLabel}</span><p class="example-text">${esc(d.example)}</p></div>` : ''}
        </div>`).join('');
      return `<article class="entry"><h3>${esc(w.word)}</h3>${defs}</article>`;
    }

    const lines = [
      '<!DOCTYPE html>',
      `<html lang="${isFr ? 'fr' : 'en'}">`,
      '<head>',
      '<meta charset="utf-8">',
      `<title>readr — ${title}</title>`,
      '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">',
      '<style>',
      '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}',
      'body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;font-size:12px;color:#111827;background:#fff;padding:48px 56px}',
      '.header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:40px;border-bottom:1px solid #e5e7eb;padding-bottom:16px}',
      '.logo{font-family:"Fraunces",Georgia,serif;font-size:28px;font-weight:400;color:#111827;letter-spacing:-0.5px}',
      '.meta{font-size:11px;color:#9ca3af}',
      'h2{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#4959E6;margin-bottom:16px}',
      '.entry{padding:16px 0;border-bottom:1px solid #f3f4f6;break-inside:avoid}',
      '.entry:last-child{border-bottom:none}',
      'h3{font-family:"Fraunces",Georgia,serif;font-size:20px;font-weight:400;color:#111827;margin-bottom:12px}',
      '.def{margin-bottom:12px}',
      '.def:last-child{margin-bottom:0}',
      '.pos{display:inline-block;padding:2px 8px;border-radius:999px;background:rgba(73,89,230,0.10);color:#4959E6;font-size:9px;font-weight:700;text-transform:lowercase;letter-spacing:0.02em;margin-bottom:6px}',
      '.meaning{font-size:13px;line-height:1.6;color:#111827;padding:0 12px}',
      '.example{margin-top:8px;padding:10px 12px;background:rgba(73,89,230,0.05);border-radius:6px}',
      '.example-label{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#4959E6;display:block;margin-bottom:2px}',
      '.example-text{font-size:12px;font-style:italic;color:#4b5563;line-height:1.5}',
      '.empty{color:#9ca3af;font-style:italic;padding:12px 0}',
      '@page{margin:0}',
      '@media print{body{padding:32px 40px}.entry{break-inside:avoid}}',
      '</style>',
      '</head>',
      '<body>',
      '<div class="header">',
      '<span class="logo">readr</span>',
      `<span class="meta">${date} · ${words.length} ${countLabel}</span>`,
      '</div>',
      `<h2>${title}</h2>`,
      sorted.length ? sorted.map(renderEntry).join('') : `<p class="empty">${emptyStr}</p>`,
      '</body>',
      '</html>',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.addEventListener('load', () => {
        win.print();
        URL.revokeObjectURL(url);
      });
    } else {
      URL.revokeObjectURL(url);
    }
  }, [words, lang]);

  const exportQuotesMD = useCallback(() => {
    const isFr = lang === 'fr';
    const date = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const title = isFr ? 'Citations' : 'Quotes';
    const countLabel = isFr
      ? (quotes.length > 1 ? 'citations' : 'citation')
      : (quotes.length > 1 ? 'quotes' : 'quote');
    const emptyLine = isFr ? '_Aucune citation._' : '_No quotes._';
    const pageLabel = isFr ? 'p.' : 'p.';

    const groups = new Map();
    quotes.forEach(q => {
      const key = `${q.bookTitle || ''}|${q.bookAuthor || ''}`;
      if (!groups.has(key)) groups.set(key, { bookTitle: q.bookTitle, bookAuthor: q.bookAuthor, items: [] });
      groups.get(key).items.push(q);
    });
    const sorted = [...groups.values()].sort((a, b) =>
      (a.bookTitle || '').localeCompare(b.bookTitle || '', isFr ? 'fr' : 'en', { sensitivity: 'base' })
    );

    const lines = [`# readr — ${title}`, `_${date} · ${quotes.length} ${countLabel}_`, ''];
    if (!sorted.length) {
      lines.push(emptyLine);
    } else {
      sorted.forEach(g => {
        lines.push(`## ${g.bookTitle || ''}${g.bookAuthor ? ` — ${g.bookAuthor}` : ''}`);
        g.items.forEach(q => {
          lines.push(`> ${q.text}`);
          if (q.page) lines.push(`> — ${pageLabel}${q.page}`);
          lines.push('');
        });
      });
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'readr-quotes.md'; a.click();
    URL.revokeObjectURL(url);
  }, [quotes, lang]);

  const exportQuotesPDF = useCallback(() => {
    function esc(str) {
      return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    const isFr = lang === 'fr';
    const date = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const title = isFr ? 'Citations' : 'Quotes';
    const countLabel = isFr
      ? (quotes.length > 1 ? 'citations' : 'citation')
      : (quotes.length > 1 ? 'quotes' : 'quote');
    const emptyStr = isFr ? 'Aucune citation' : 'No quotes';
    const pageLabel = isFr ? 'p.' : 'p.';

    const groups = new Map();
    quotes.forEach(q => {
      const key = `${q.bookTitle || ''}|${q.bookAuthor || ''}`;
      if (!groups.has(key)) groups.set(key, { bookTitle: q.bookTitle, bookAuthor: q.bookAuthor, items: [] });
      groups.get(key).items.push(q);
    });
    const sorted = [...groups.values()].sort((a, b) =>
      (a.bookTitle || '').localeCompare(b.bookTitle || '', isFr ? 'fr' : 'en', { sensitivity: 'base' })
    );

    function renderGroup(g) {
      const items = g.items.map(q => `
        <div class="quote">
          <p class="text">"${esc(q.text)}"</p>
          ${q.page ? `<span class="page">${pageLabel}${esc(q.page)}</span>` : ''}
        </div>`).join('');
      return `<article class="entry">
        <header class="book">
          <h3>${esc(g.bookTitle || '')}</h3>
          ${g.bookAuthor ? `<span class="author">${esc(g.bookAuthor)}</span>` : ''}
        </header>
        ${items}
      </article>`;
    }

    const lines = [
      '<!DOCTYPE html>',
      `<html lang="${isFr ? 'fr' : 'en'}">`,
      '<head>',
      '<meta charset="utf-8">',
      `<title>readr — ${title}</title>`,
      '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">',
      '<style>',
      '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}',
      'body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;font-size:12px;color:#111827;background:#fff;padding:48px 56px}',
      '.header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:40px;border-bottom:1px solid #e5e7eb;padding-bottom:16px}',
      '.logo{font-family:"Fraunces",Georgia,serif;font-size:28px;font-weight:400;color:#111827;letter-spacing:-0.5px}',
      '.meta{font-size:11px;color:#9ca3af}',
      'h2{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#4959E6;margin-bottom:16px}',
      '.entry{padding:16px 0;border-bottom:1px solid #f3f4f6;break-inside:avoid}',
      '.entry:last-child{border-bottom:none}',
      '.book{margin-bottom:12px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}',
      'h3{font-family:"Fraunces",Georgia,serif;font-size:18px;font-weight:400;color:#111827}',
      '.author{font-size:11px;color:#6b7280}',
      '.quote{padding:10px 14px;margin-bottom:8px;background:rgba(73,89,230,0.04);border-left:2px solid #4959E6;border-radius:0 6px 6px 0;break-inside:avoid}',
      '.quote:last-child{margin-bottom:0}',
      '.text{font-size:13px;line-height:1.6;color:#111827;font-style:italic}',
      '.page{display:inline-block;margin-top:6px;font-size:10px;color:#9ca3af}',
      '.empty{color:#9ca3af;font-style:italic;padding:12px 0}',
      '@page{margin:0}',
      '@media print{body{padding:32px 40px}.entry{break-inside:avoid}.quote{break-inside:avoid}}',
      '</style>',
      '</head>',
      '<body>',
      '<div class="header">',
      '<span class="logo">readr</span>',
      `<span class="meta">${date} · ${quotes.length} ${countLabel}</span>`,
      '</div>',
      `<h2>${title}</h2>`,
      sorted.length ? sorted.map(renderGroup).join('') : `<p class="empty">${emptyStr}</p>`,
      '</body>',
      '</html>',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.addEventListener('load', () => {
        win.print();
        URL.revokeObjectURL(url);
      });
    } else {
      URL.revokeObjectURL(url);
    }
  }, [quotes, lang]);

  const getQuotesForBook = useCallback((book) => {
    if (!book) return [];
    const title = (book.title || '').toLowerCase().trim();
    const author = (book.author || '').toLowerCase().trim();
    return quotes.filter(q => {
      if (q.bookId === book.id) return true;
      if (title && (q.bookTitle || '').toLowerCase().trim() === title
          && (q.bookAuthor || '').toLowerCase().trim() === author) return true;
      return false;
    });
  }, [quotes]);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      try { localStorage.setItem(READR_SIDEBAR_KEY, next ? '1' : '0'); } catch(e) {}
      return next;
    });
  }, []);

  const toggleSort = useCallback((col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  }, [sortCol]);

  const toggleSelected = useCallback((id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selected.size === books.length) setSelected(new Set());
    else setSelected(new Set(books.map(b => b.id)));
  }, [selected, books]);

  const closeOb = useCallback(() => {
    setObOpen(false);
    localStorage.setItem(READR_OB_KEY, '1');
  }, []);

  const openOb = useCallback(() => setObOpen(true), []);

  return {
    data, tab, setTab, view, switchView, lang, setLang, t,
    search, setSearch, sortCol, sortDir, toggleSort,
    editMode, setEditMode, selected, setSelected,
    toggleSelected, toggleSelectAll,
    panelBook, setPanelBook,
    addModalOpen, setAddModal,
    deleteTarget, setDeleteTarget,
    obOpen, openOb, closeOb,
    books, hydrated,
    addBook, addMany, deleteBook, moveToLibrary, deleteMany, exportData, exportPDF, importData,
    readingBooks, startReading, finishReading, cancelReading, updateFinished,
    collections, createCollection, deleteCollection,
    addBookToCollection, removeBookFromCollection, getBooksForCollection,
    activeCollection, setActiveCollection,
    quotes, addQuote, updateQuote, deleteQuote, getQuotesForBook, exportQuotesMD, exportQuotesPDF,
    words, saveWord, deleteWord, exportWordsMD, exportWordsPDF,
    sidebarCollapsed, toggleSidebarCollapsed,
  };
}
