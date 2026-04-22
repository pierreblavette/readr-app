"use client";
import "./library.css";
import { useState } from "react";
import { useLibrary } from "@/lib/useLibrary";
import Sidebar       from "@/components/Sidebar";
import AppToolbar    from "@/components/library/AppToolbar";
import SearchBar     from "@/components/library/SearchBar";
import BookCard      from "@/components/library/BookCard";
import BookList      from "@/components/library/BookList";
import BookPanel     from "@/components/library/BookPanel";
import EmptyState    from "@/components/library/EmptyState";
import SelectionBar  from "@/components/library/SelectionBar";
import AddModal      from "@/components/library/AddModal";
import DeleteModal   from "@/components/library/DeleteModal";
import CreateCollectionModal from "@/components/library/CreateCollectionModal";
import CollectionsView from "@/components/library/CollectionsView";
import CollectionDetailView from "@/components/library/CollectionDetailView";
import AddBooksToCollectionModal from "@/components/library/AddBooksToCollectionModal";
import QuotesView    from "@/components/library/QuotesView";
import AddQuoteModal from "@/components/library/AddQuoteModal";
import Onboarding    from "@/components/library/Onboarding";
import Toast         from "@/components/library/Toast";

export default function LibraryPage() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [createColOpen, setCreateColOpen] = useState(false);
  const [addBooksColOpen, setAddBooksColOpen] = useState(false);
  const [addQuoteOpen, setAddQuoteOpen] = useState(false);
  const [quotePrefillBook, setQuotePrefillBook] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
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
    addBook, addMany, deleteBook, moveToLibrary, deleteMany, exportData, exportPDF,
    collections, createCollection, deleteCollection,
    addBookToCollection, removeBookFromCollection, getBooksForCollection,
    activeCollection, setActiveCollection,
    quotes, addQuote, deleteQuote, getQuotesForBook,
    sidebarCollapsed, toggleSidebarCollapsed,
  } = lib;

  const isCollections = tab === 'collections';
  const isQuotes = tab === 'quotes';
  const currentCollection = activeCollection ? collections.find(c => c.id === activeCollection) : null;
  const pageTitle = tab === 'owned' ? t.pageLibrary : tab === 'wishlist' ? t.pageWishlist : tab === 'collections' ? t.pageCollections : t.pageQuotes;
  const resultInfo = !isCollections && !isQuotes && data[tab]
    ? search.trim()
      ? t.resultQuery(books.length, data[tab].length)
      : t.resultTotal(data[tab].length)
    : '';

  function handleConfirmSelection(action) {
    if (action === 'delete') {
      setDeleteTarget({ bulk: true, ids: new Set(selected), count: selected.size });
      return;
    }
    if (action === 'move') moveToLibrary(selected);
    setSelected(new Set());
    setEditMode(false);
  }

  function handleDeleteConfirm(payload) {
    if (payload instanceof Set) {
      deleteMany(payload);
      setSelected(new Set());
      setEditMode(false);
    } else {
      deleteBook(payload);
    }
  }

  return (
    <>
    <div className="app-root">
    <div className={`page-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>

      <Sidebar
        tab={tab} setTab={setTab}
        data={data} collections={collections}
        collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed}
        onCreateCollection={() => setCreateColOpen(true)}
        onOpenCollection={col => { setActiveCollection(col.id); }}
        activeCollection={activeCollection}
        t={t} lang={lang} setLang={setLang}
        mobileOpen={mobileSidebarOpen} onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="page-main">
      <AppToolbar
        lang={lang} setLang={setLang} t={t}
        view={view} switchView={switchView}
        editMode={editMode} setEditMode={setEditMode} setSelected={setSelected}
        setAddModal={setAddModal} exportData={exportData}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
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
        onAddQuote={b => { setQuotePrefillBook(b); setAddQuoteOpen(true); }}
        quotes={panelBook ? getQuotesForBook(panelBook.id) : []}
        t={t}
      />

      {/* Main */}
      <div className="main-wrap">

        {/* Quotes view */}
        {isQuotes && (
          <>
            <h1 className="page-title">{t.pageQuotes}</h1>
            <QuotesView
              quotes={quotes}
              allBooks={[...data.owned, ...data.wishlist]}
              onAdd={() => { setQuotePrefillBook(null); setAddQuoteOpen(true); }}
              onDelete={deleteQuote}
              t={t}
            />
          </>
        )}

        {/* Collections view */}
        {isCollections && !currentCollection && (
          <>
            <h1 className="page-title">{t.pageCollections}</h1>
            <div className="search-row" style={{ marginBottom: 16 }}>
              <div />
              <div className="counter-actions">
                <button className="add-btn" onClick={() => setCreateColOpen(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{width:18,height:18}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  {t.colNewCollection}
                </button>
                <div className="view-btns">
                  <button onClick={() => switchView('grid')} className={`view-btn${view === 'grid' ? ' active' : ''}`} aria-label="Grid view">
                    <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                  </button>
                  <button onClick={() => switchView('list')} className={`view-btn${view === 'list' ? ' active' : ''}`} aria-label="List view">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </button>
                </div>
              </div>
            </div>
            <CollectionsView
              collections={collections}
              data={data}
              view={view}
              onOpen={col => setActiveCollection(col.id)}
              onCreate={() => setCreateColOpen(true)}
              onDelete={col => deleteCollection(col.id)}
              t={t}
            />
          </>
        )}

        {/* Collection detail view */}
        {isCollections && currentCollection && (
          <CollectionDetailView
            collection={currentCollection}
            books={getBooksForCollection(currentCollection.id)}
            allBooks={[...data.owned, ...data.wishlist]}
            view={view}
            onBack={() => setActiveCollection(null)}
            onDelete={col => { deleteCollection(col.id); setActiveCollection(null); }}
            onAddBooks={() => setAddBooksColOpen(true)}
            onRemoveBook={removeBookFromCollection}
            onOpenBook={b => setPanelBook(b)}
            t={t} sortCol={sortCol} sortDir={sortDir} toggleSort={toggleSort}
          />
        )}

        {/* Library / Wishlist view */}
        {!isCollections && !isQuotes && (
          <>
            <h1 className="page-title">{pageTitle}</h1>

            <SearchBar
              search={search} setSearch={setSearch} t={t}
              editMode={editMode} setEditMode={setEditMode} setSelected={setSelected}
              tab={tab} data={data} exportData={exportData} exportPDF={exportPDF}
              setAddModal={setAddModal} view={view} switchView={switchView}
            />

            {data[tab].length > 0 && (
              <div className="result-line">{resultInfo}</div>
            )}

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
          </>
        )}
      </div>

      </div>{/* end page-main */}

      {/* Modals & bars */}
      <SelectionBar
        editMode={editMode}
        selected={selected} books={books} tab={tab} t={t}
        onCancel={() => { setEditMode(false); setSelected(new Set()); }}
        onSelectAll={toggleSelectAll}
        onConfirm={handleConfirmSelection}
      />
      <AddModal open={addModalOpen} onClose={() => setAddModal(false)}
        onAdd={b => { const ok = addBook(b); if (ok) setToastMsg(t.toastAdded || 'Book added to your library'); }}
        onAddMany={b => { addMany(b); setToastMsg(t.toastImported?.(b.length) || `${b.length} book${b.length > 1 ? 's' : ''} imported`); }}
        t={t} />
      <DeleteModal target={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} t={t} />
      <CreateCollectionModal open={createColOpen} onClose={() => setCreateColOpen(false)} onCreate={createCollection} t={t} />
      <AddQuoteModal
        open={addQuoteOpen}
        onClose={() => { setAddQuoteOpen(false); setQuotePrefillBook(null); }}
        onSave={q => { addQuote(q); setToastMsg(t.quoteAdd); }}
        allBooks={[...data.owned, ...data.wishlist]}
        prefillBook={quotePrefillBook}
        t={t}
      />
      <AddBooksToCollectionModal
        open={addBooksColOpen}
        collection={currentCollection}
        allBooks={[...data.owned, ...data.wishlist]}
        onAdd={addBookToCollection}
        onClose={() => setAddBooksColOpen(false)}
        t={t}
      />
      <Onboarding open={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
      <Toast message={toastMsg} onDismiss={() => setToastMsg('')} />

    </div>{/* end page-shell */}

    <footer className="library-footer">
      <div className="library-footer-inner">
        {/* Gauche — produit */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a className="footer-link" href="/">About readr</a>
          <span className="footer-sep">·</span>
          <button className="footer-link" onClick={() => setOnboardingOpen(true)}>{t.footerHowItWorks}</button>
          <span className="footer-sep">·</span>
          <div className="lang-toggle">
            <button onClick={() => setLang('en')} className={`lang-btn${lang === 'en' ? ' active' : ''}`}>EN</button>
            <span className="lang-sep">·</span>
            <button onClick={() => setLang('fr')} className={`lang-btn${lang === 'fr' ? ' active' : ''}`}>FR</button>
          </div>
        </span>
        {/* Centre — app */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>{t.footerDataInfo}</span>
          <span className="footer-sep">·</span>
          <span>v1.0</span>
        </span>
        {/* Droite — profil */}
        <span className="footer-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>© 2026 Pierre Blavette</span>
          <span className="footer-sep">·</span>
          <a className="footer-link" href="https://pierreblavette.com" target="_blank" rel="noopener">pierreblavette.com</a>
          <span className="footer-sep">·</span>
          <a className="footer-link" href="https://www.linkedin.com/in/pierreblavette/" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.554v-5.57c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.667H9.356V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.368-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </span>
      </div>
    </footer>

    </div>{/* end app-root */}
    </>
  );
}
