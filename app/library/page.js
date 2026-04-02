"use client";
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

export default function LibraryPage() {
  const lib = useLibrary();

  if (!lib.hydrated) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-6 h-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
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
    addBook, deleteBook, moveToLibrary, deleteMany, exportData,
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
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <AppToolbar
        tab={tab} setTab={setTab} lang={lang} setLang={setLang} t={t}
        data={data} view={view} switchView={switchView}
        editMode={editMode} setEditMode={setEditMode} setSelected={setSelected}
        setAddModal={setAddModal} exportData={exportData}
      />

      {/* Panel overlay */}
      {panelBook && (
        <div className="fixed inset-0 z-30 bg-black/20" onClick={() => setPanelBook(null)} />
      )}
      <BookPanel book={panelBook} onClose={() => setPanelBook(null)}
        onDelete={b => { setPanelBook(null); setDeleteTarget(b); }} t={t} />

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${panelBook ? 'mr-[420px]' : ''}`}>
        <div className="max-w-[1280px] mx-auto px-10 py-8">

          {/* Page title */}
          <h1 className="font-heading font-normal tracking-[-0.025em] leading-[1.04] text-[var(--text)] mb-6"
            style={{ fontSize: 'clamp(2.4rem,4.5vw,3.3rem)' }}>
            {pageTitle}
          </h1>

          {/* Search + actions */}
          <SearchBar
            search={search} setSearch={setSearch} t={t}
            editMode={editMode} setEditMode={setEditMode} setSelected={setSelected}
            tab={tab} data={data} exportData={exportData}
            setAddModal={setAddModal} view={view} switchView={switchView}
          />

          {/* Result info */}
          {data[tab].length > 0 && (
            <p className="mt-3 text-sm text-[var(--text-3)]">{resultInfo}</p>
          )}

          {/* Books */}
          <div className="mt-6">
            {books.length === 0 ? (
              <EmptyState tab={tab} search={search} t={t} onAdd={() => setAddModal(true)} />
            ) : view === 'grid' ? (
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                {books.map(book => (
                  <BookCard key={book.id} book={book} tab={tab}
                    editMode={editMode} selected={selected}
                    onToggleSelect={toggleSelected}
                    onOpen={b => setPanelBook(b)}
                    onDelete={b => setDeleteTarget(b)}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <BookList books={books} tab={tab}
                editMode={editMode} selected={selected}
                onToggleSelect={toggleSelected}
                onOpen={b => setPanelBook(b)}
                onDelete={b => setDeleteTarget(b)}
                t={t} sortCol={sortCol} sortDir={sortDir} toggleSort={toggleSort}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] mt-auto px-10 py-5 flex items-center justify-between text-sm text-[var(--text-3)]"
          style={{ background: 'var(--card)' }}>
          <span>{t.footerHowItWorks}</span>
          <span>{t.footerDataInfo}</span>
        </footer>
      </main>

      {/* Modals */}
      <SelectionBar
        selected={selected} books={books} tab={tab} t={t}
        onCancel={() => { setEditMode(false); setSelected(new Set()); }}
        onSelectAll={toggleSelectAll}
        onConfirm={handleConfirmSelection}
      />
      <AddModal open={addModalOpen} onClose={() => setAddModal(false)} onAdd={addBook} t={t} />
      <DeleteModal book={deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={deleteBook} t={t} />
    </div>
  );
}
