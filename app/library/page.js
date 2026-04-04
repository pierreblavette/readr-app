"use client";
import "./library.css";
import { useState } from "react";
import { useLibrary } from "@/lib/useLibrary";
import AppToolbar    from "@/components/library/AppToolbar";
import SearchBar     from "@/components/library/SearchBar";
import BookCard      from "@/components/library/BookCard";
import BookList      from "@/components/library/BookList";
import BookPanel     from "@/components/library/BookPanel";
import EmptyState    from "@/components/library/EmptyState";
import SelectionBar  from "@/components/library/SelectionBar";
import AddModal      from "@/components/library/AddModal";
import DeleteModal   from "@/components/library/DeleteModal";
import Onboarding    from "@/components/library/Onboarding";

export default function LibraryPage() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const lib = useLibrary();

  if (!lib.hydrated) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="panel-spinner" />
    </div>
  );

  const {
    data, tab, setTab, view, switchView, lang, setLang, t,
    search, setSearch, sortCol, sortDir, toggleSort,
    editMode, setEditMode, selected, setSelected,
    toggleSelected, toggleSelectAll,
    panelBook, setPanelBook,
    addModalOpen, setAddModal,
    deleteTarget, setDeleteTarget,
    books,
    addBook, addMany, deleteBook, moveToLibrary, deleteMany, exportData,
  } = lib;

  const pageTitle = tab === 'owned' ? t.pageLibrary : t.pageWishlist;
  const resultInfo = search.trim()
    ? t.resultQuery(books.length, data[tab].length)
    : t.resultTotal(data[tab].length);

  function handleConfirmSelection(action) {
    if (action === 'delete') deleteMany(selected);
    else if (action === 'move') moveToLibrary(selected);
    setSelected(new Set());
    setEditMode(false);
  }

  return (
    <div className="page-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <AppToolbar
        tab={tab} setTab={setTab} lang={lang} setLang={setLang} t={t}
        data={data} view={view} switchView={switchView}
        editMode={editMode} setEditMode={setEditMode} setSelected={setSelected}
        setAddModal={setAddModal} exportData={exportData}
      />

      {/* Panel overlay */}
      {panelBook && (
        <div className="panel-overlay" onClick={() => setPanelBook(null)} />
      )}
      <BookPanel
        book={panelBook}
        tab={tab}
        onClose={() => setPanelBook(null)}
        onDelete={b => { setPanelBook(null); setDeleteTarget(b); }}
        onMoveToLibrary={b => { moveToLibrary(new Set([b.id])); setPanelBook(null); }}
        t={t}
      />

      {/* Main */}
      <div className="main-wrap" >

        <h1 className="page-title">{pageTitle}</h1>

        <SearchBar
          search={search} setSearch={setSearch} t={t}
          editMode={editMode} setEditMode={setEditMode} setSelected={setSelected}
          tab={tab} data={data} exportData={exportData}
          setAddModal={setAddModal} view={view} switchView={switchView}
        />

        {data[tab].length > 0 && (
          <div className="result-line">{resultInfo}</div>
        )}

        {/* Books */}
        {view === 'grid' ? (
          <div className="books-grid">
            {books.length === 0
              ? <EmptyState tab={tab} search={search} t={t} onAdd={() => setAddModal(true)} />
              : books.map(book => (
                  <BookCard key={book.id} book={book} tab={tab}
                    editMode={editMode} selected={selected}
                    onToggleSelect={toggleSelected}
                    onOpen={b => setPanelBook(b)}
                    onDelete={b => setDeleteTarget(b)}
                    t={t}
                  />
                ))
            }
          </div>
        ) : books.length === 0 ? (
          <EmptyState tab={tab} search={search} t={t} onAdd={() => setAddModal(true)} />
        ) : (
          <BookList books={books} tab={tab}
            editMode={editMode} selected={selected}
            onToggleSelect={toggleSelected}
            onSelectAll={toggleSelectAll}
            onOpen={b => setPanelBook(b)}
            onDelete={b => setDeleteTarget(b)}
            t={t} sortCol={sortCol} sortDir={sortDir} toggleSort={toggleSort}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="library-footer">
        <div className="library-footer-inner">
          <span className="footer-row-desktop" style={{ alignItems: 'center', gap: 12 }}>
            <span>© 2026 Pierre Blavette</span>
            <span className="footer-sep">·</span>
            <button className="footer-link" onClick={() => setOnboardingOpen(true)}>{t.footerHowItWorks}</button>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>{t.footerDataInfo}</span>
            <span className="footer-sep">·</span>
            <span>v1.0</span>
          </span>
          <span className="footer-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a className="footer-link" href="/">About readr</a>
            <span className="footer-sep">·</span>
            <a className="footer-link" href="https://pierreblavette.com" target="_blank" rel="noopener">pierreblavette.com</a>
            <span className="footer-sep">·</span>
            <a className="footer-link" href="https://www.linkedin.com/in/pierreblavette/" target="_blank" rel="noopener">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.554v-5.57c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.667H9.356V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.368-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </span>
        </div>
      </footer>

      {/* Modals & bars */}
      <SelectionBar
        editMode={editMode}
        selected={selected} books={books} tab={tab} t={t}
        onCancel={() => { setEditMode(false); setSelected(new Set()); }}
        onSelectAll={toggleSelectAll}
        onConfirm={handleConfirmSelection}
      />
      <AddModal open={addModalOpen} onClose={() => setAddModal(false)} onAdd={addBook} onAddMany={addMany} t={t} />
      <DeleteModal book={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={deleteBook} t={t} />
      <Onboarding open={onboardingOpen} onClose={() => setOnboardingOpen(false)} />

    </div>
  );
}
