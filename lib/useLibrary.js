"use client";
import { useState, useEffect, useCallback } from "react";
import { STRINGS } from "./i18n";

const READR_DATA_KEY    = 'readr-data';
const READR_LANG_KEY    = 'readr-lang';
const READR_THEME_KEY   = 'biblio-theme';
const READR_VIEW_KEY    = 'biblio-view';
const READR_OB_KEY      = 'readr-onboarding-seen';

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/^(l'|le |la |les |un |une |des |the )/i, '');
}

export function useLibrary() {
  const [data, setData]               = useState({ owned: [], wishlist: [] });
  const [tab, setTab]                 = useState('owned');
  const [view, setView]               = useState('grid');
  const [lang, setLangState]          = useState('en');
  const [search, setSearch]           = useState('');
  const [sortCol, setSortCol]         = useState('title');
  const [sortDir, setSortDir]         = useState('asc');
  const [editMode, setEditMode]       = useState(false);
  const [selected, setSelected]       = useState(new Set());
  const [panelBook, setPanelBook]     = useState(null);
  const [addModalOpen, setAddModal]   = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [obOpen, setObOpen]           = useState(false);
  const [hydrated, setHydrated]       = useState(false);

  // Load from localStorage (client only)
  useEffect(() => {
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
    setHydrated(true);
  }, []);

  const saveData = useCallback((newData) => {
    setData(newData);
    try { localStorage.setItem(READR_DATA_KEY, JSON.stringify(newData)); } catch(e) {}
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem(READR_LANG_KEY, l);
  }, []);

  const switchView = useCallback((v) => {
    setView(v);
    localStorage.setItem(READR_VIEW_KEY, v);
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
      if (sortCol === 'year') {
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
    const newData = { ...data, [tab]: [...data[tab], { ...book, id: Date.now() }] };
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

  const exportData = useCallback(() => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'readr-library.json'; a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback((parsed) => {
    if (!Array.isArray(parsed.owned) || !Array.isArray(parsed.wishlist)) throw new Error('invalid');
    saveData({ owned: parsed.owned, wishlist: parsed.wishlist });
  }, [saveData]);

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

  return {
    data, tab, setTab, view, switchView, lang, setLang, t,
    search, setSearch, sortCol, sortDir, toggleSort,
    editMode, setEditMode, selected, setSelected,
    toggleSelected, toggleSelectAll,
    panelBook, setPanelBook,
    addModalOpen, setAddModal,
    deleteTarget, setDeleteTarget,
    obOpen, closeOb,
    books, hydrated,
    addBook, deleteBook, moveToLibrary, deleteMany, exportData, importData,
  };
}
