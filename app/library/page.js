"use client";
import "./library.css";
import { useState, useEffect } from "react";
import { useLibrary, MAX_READING } from "@/lib/useLibrary";
import Sidebar       from "@/components/Sidebar";
import AppToolbar    from "@/components/library/AppToolbar";
import SearchBar     from "@/components/library/SearchBar";
import BookCard      from "@/components/library/BookCard";
import BookList      from "@/components/library/BookList";
import BookPanel     from "@/components/library/BookPanel";
import QuotePanel    from "@/components/library/QuotePanel";
import EmptyState    from "@/components/library/EmptyState";
import NowReadingSection from "@/components/library/NowReadingSection";
import FinishReadingModal from "@/components/library/FinishReadingModal";
import SelectionBar  from "@/components/library/SelectionBar";
import AddModal      from "@/components/library/AddModal";
import DeleteModal   from "@/components/library/DeleteModal";
import CreateCollectionModal from "@/components/library/CreateCollectionModal";
import CollectionsView from "@/components/library/CollectionsView";
import CollectionDetailView from "@/components/library/CollectionDetailView";
import AddBooksToCollectionModal from "@/components/library/AddBooksToCollectionModal";
import QuotesView    from "@/components/library/QuotesView";
import DictionaryView from "@/components/library/DictionaryView";
import AddQuoteModal from "@/components/library/AddQuoteModal";
import Onboarding    from "@/components/library/Onboarding";
import Toast         from "@/components/library/Toast";

export default function LibraryPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [createColOpen, setCreateColOpen] = useState(false);
  const [addBooksColOpen, setAddBooksColOpen] = useState(false);
  const [addQuoteOpen, setAddQuoteOpen] = useState(false);
  const [quotePrefillBook, setQuotePrefillBook] = useState(null);
  const [panelQuote, setPanelQuote] = useState(null);
  const [editingQuote, setEditingQuote] = useState(null);
  const [finishBook, setFinishBook] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const lib = useLibrary();

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
    };
  }, [mobileSidebarOpen]);

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
    obOpen, openOb, closeOb,
    books,
    addBook, addMany, deleteBook, moveToLibrary, deleteMany, exportData, exportPDF,
    readingBooks, startReading, finishReading, cancelReading, updateFinished,
    collections, createCollection, deleteCollection,
    addBookToCollection, removeBookFromCollection, getBooksForCollection,
    activeCollection, setActiveCollection,
    quotes, addQuote, updateQuote, deleteQuote, getQuotesForBook, exportQuotesMD, exportQuotesPDF,
    words, saveWord, deleteWord, exportWordsMD, exportWordsPDF,
    sidebarCollapsed, toggleSidebarCollapsed,
  } = lib;

  const isCollections = tab === 'collections';
  const isQuotes = tab === 'quotes';
  const isDictionary = tab === 'dictionary';
  const currentCollection = activeCollection ? collections.find(c => c.id === activeCollection) : null;
  const pageTitle = tab === 'owned' ? t.pageLibrary : tab === 'wishlist' ? t.pageWishlist : tab === 'collections' ? t.pageCollections : tab === 'dictionary' ? t.pageDictionary : t.pageQuotes;
  const resultInfo = !isCollections && !isQuotes && !isDictionary && data[tab]
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
      return;
    }
    if (payload?.type === 'quote') {
      deleteQuote(payload.id);
    } else if (payload?.type === 'word') {
      deleteWord(payload.id);
    } else if (payload?.type === 'cancelReading') {
      cancelReading(payload.id);
    } else if (payload?.type === 'removeFinished') {
      updateFinished(payload.id, { rating: null, note: null });
    } else {
      deleteBook(payload.id);
    }
  }

  return (
    <>
    <div className="app-root">
    <div className={`page-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>

      <Sidebar
        tab={tab}
        setTab={next => {
          setTab(next);
          setPanelBook(null);
          setPanelQuote(null);
          if (typeof window !== 'undefined') window.scrollTo(0, 0);
        }}
        data={data} collections={collections}
        quotes={quotes} words={words}
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
        mobileSidebarOpen={mobileSidebarOpen}
        onToggleSidebar={() => setMobileSidebarOpen(o => !o)}
      />

      {/* Panel overlay */}
      {(panelBook || panelQuote) && (
        <div className="panel-overlay" onClick={() => { setPanelBook(null); setPanelQuote(null); }} />
      )}
      <BookPanel
        /* Re-resolve the book from current data so the panel reflects
           reading state changes (startReading/finishReading) immediately. */
        book={panelBook ? [...data.owned, ...data.wishlist].find(b => b.id === panelBook.id) || panelBook : null}
        tab={tab}
        onClose={() => setPanelBook(null)}
        onDelete={b => { setPanelBook(null); setDeleteTarget(b); }}
        onMoveToLibrary={b => { moveToLibrary(new Set([b.id])); setPanelBook(null); }}
        onAddQuote={b => { setQuotePrefillBook(b); setAddQuoteOpen(true); }}
        onOpenQuote={q => { setPanelBook(null); setPanelQuote(q); }}
        onStartReading={b => { startReading(b.id); }}
        onFinishReading={b => { setFinishBook(b); }}
        onCancelReading={b => { setDeleteTarget({ type: 'cancelReading', id: b.id, title: b.title, author: b.author }); setPanelBook(null); }}
        onEditFinished={b => { setFinishBook(b); }}
        onRemoveFinished={b => { setDeleteTarget({ type: 'removeFinished', id: b.id, rating: b.rating, note: b.note }); }}
        readingCount={readingBooks.length}
        maxReading={MAX_READING}
        quotes={panelBook ? getQuotesForBook(panelBook) : []}
        lang={lang}
        t={t}
      />
      <QuotePanel
        quote={panelQuote}
        book={(() => {
          if (!panelQuote) return null;
          const all = [...data.owned, ...data.wishlist];
          const byId = panelQuote.bookId ? all.find(b => b.id === panelQuote.bookId) : null;
          if (byId) return byId;
          const t = (panelQuote.bookTitle || '').toLowerCase().trim();
          const a = (panelQuote.bookAuthor || '').toLowerCase().trim();
          if (!t) return null;
          return all.find(b =>
            (b.title || '').toLowerCase().trim() === t &&
            (b.author || '').toLowerCase().trim() === a
          ) || null;
        })()}
        onClose={() => setPanelQuote(null)}
        onDelete={q => { setPanelQuote(null); setDeleteTarget({ type: 'quote', id: q.id, text: q.text }); }}
        onEdit={q => { setPanelQuote(null); setEditingQuote(q); setAddQuoteOpen(true); }}
        onOpenBook={b => { setPanelQuote(null); setPanelBook(b); }}
        lang={lang}
        t={t}
      />

      {/* Main */}
      <div className="main-wrap">

        {/* Dictionary view */}
        {isDictionary && (
          <>
            <h1 className="page-title">{t.pageDictionary}</h1>
            <DictionaryView
              lang={lang}
              t={t}
              words={words}
              onSave={saveWord}
              onDelete={id => setDeleteTarget({ type: 'word', id, title: words.find(w => w.id === id)?.word || '' })}
              exportMD={exportWordsMD}
              exportPDF={exportWordsPDF}
            />
          </>
        )}

        {/* Quotes view */}
        {isQuotes && (
          <>
            <h1 className="page-title">{t.pageQuotes}</h1>
            <QuotesView
              quotes={quotes}
              allBooks={[...data.owned, ...data.wishlist]}
              onAdd={() => { setQuotePrefillBook(null); setAddQuoteOpen(true); }}
              onDelete={q => setDeleteTarget({ type: 'quote', id: q.id, text: q.text })}
              onOpen={q => setPanelQuote(q)}
              onOpenBook={b => setPanelBook(b)}
              exportMD={exportQuotesMD}
              exportPDF={exportQuotesPDF}
              lang={lang}
              t={t}
            />
          </>
        )}

        {/* Collections view */}
        {isCollections && !currentCollection && (
          <>
            <h1 className="page-title">{t.pageCollections}</h1>
            <div className="search-row">
              <div />
              <div className="counter-actions">
                <button className="add-btn" onClick={() => setCreateColOpen(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
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
        {!isCollections && !isQuotes && !isDictionary && (
          <>
            <h1 className="page-title">{pageTitle}</h1>

            {tab === 'owned' && (
              <NowReadingSection
                books={readingBooks}
                onOpenBook={b => setPanelBook(b)}
                onFinish={b => setFinishBook(b)}
                onAddQuote={b => { setQuotePrefillBook(b); setAddQuoteOpen(true); }}
                onCancel={b => setDeleteTarget({ type: 'cancelReading', id: b.id, title: b.title, author: b.author })}
                lang={lang}
                t={t}
              />
            )}

            <SearchBar
              search={search} setSearch={setSearch} t={t}
              editMode={editMode} setEditMode={setEditMode} setSelected={setSelected}
              tab={tab} data={data} exportData={exportData} exportPDF={exportPDF}
              setAddModal={setAddModal} view={view} switchView={switchView}
            />

            <div className="books-section">
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
            </div>
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
        onClose={() => { setAddQuoteOpen(false); setQuotePrefillBook(null); setEditingQuote(null); }}
        onSave={q => {
          if (editingQuote) {
            updateQuote(editingQuote.id, q);
            setToastMsg(t.quoteUpdated);
          } else {
            addQuote(q);
            setToastMsg(t.quoteAdd);
          }
        }}
        allBooks={[...data.owned, ...data.wishlist]}
        prefillBook={quotePrefillBook}
        editing={editingQuote}
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
      <FinishReadingModal
        open={!!finishBook}
        book={finishBook}
        onClose={() => setFinishBook(null)}
        onConfirm={({ rating, note }) => {
          if (finishBook?.finishedAt) {
            // Editing an already-finished book
            updateFinished(finishBook.id, { rating, note });
          } else {
            // Marking as finished for the first time
            finishReading(finishBook.id, { finishedAt: Date.now(), rating, note });
          }
        }}
        t={t}
      />
      <Onboarding open={obOpen} onClose={closeOb} t={t} />
      <Toast message={toastMsg} onDismiss={() => setToastMsg('')} />

    </div>{/* end page-shell */}

    <footer className="library-footer">
      <div className="library-footer-inner">
        {/* Gauche — produit */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="footer-group">
            <a className="footer-link" href="/">About readr</a>
            <span className="footer-sep">·</span>
            <button className="footer-link" onClick={openOb}>{t.footerHowItWorks}</button>
          </span>
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
          <span className="footer-group">
            <a className="footer-link" href="https://pierreblavette.com" target="_blank" rel="noopener" aria-label="pierreblavette.com">
              <span className="footer-link-text">pierreblavette.com</span>
              <svg className="footer-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </a>
            <span className="footer-sep">·</span>
            <a className="footer-link" href="https://www.linkedin.com/in/pierreblavette/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.554v-5.57c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.667H9.356V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.368-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </span>
        </span>
      </div>
    </footer>

    </div>{/* end app-root */}
    </>
  );
}
