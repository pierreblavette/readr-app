"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ExportMenu from "@/components/library/ExportMenu";
import SortMenu from "@/components/library/SortMenu";
import GenresMenu from "@/components/library/GenresMenu";
import AuthorsMenu from "@/components/library/AuthorsMenu";
import MobileFiltersPanel from "@/components/library/MobileFiltersPanel";

function RatingStars({ count }) {
  return (
    <span className="rating-stars-inline" aria-hidden="true">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} viewBox="0 0 24 24" fill={i <= count ? 'currentColor' : 'var(--border)'}>
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

export default function SearchBar({ search, setSearch, t, editMode, setEditMode, setSelected, tab, data, exportData, exportPDF, setAddModal, view, switchView, sortCol, sortDir, setSort, filters, setFilter, bookCount, quotes = [] }) {
  const isBookTab = tab === 'owned' || tab === 'wishlist';
  const isOwned = tab === 'owned';
  const sortOptions = [
    { key: 'alpha',     label: t.sortAlpha     || 'A–Z' },
    { key: 'dateAdded', label: t.sortDateAdded || 'Date added' },
    ...(isOwned
      ? [{ key: 'dateFinished', label: t.sortDateFinished || 'Date finished' }]
      : []),
  ];
  const currentSortKey =
    sortCol === 'dateAdded'    && sortDir === 'desc' ? 'dateAdded' :
    sortCol === 'dateFinished' && sortDir === 'desc' ? 'dateFinished' :
    'alpha';
  function handleSort(key) {
    if (key === 'alpha')             setSort?.('title', 'asc');
    else if (key === 'dateAdded')    setSort?.('dateAdded', 'desc');
    else if (key === 'dateFinished') setSort?.('dateFinished', 'desc');
  }
  const availableGenres = useMemo(() => {
    if (!isOwned) return [];
    const set = new Set();
    (data.owned || []).forEach(b => { if (b.genre && b.genre.trim()) set.add(b.genre.trim()); });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data.owned, isOwned]);
  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (!isOwned) return counts;
    (data.owned || []).forEach(b => {
      const r = b.rating || 0;
      if (r >= 1 && r <= 5) counts[r]++;
    });
    return counts;
  }, [data.owned, isOwned]);
  const readingCounts = useMemo(() => {
    const counts = { any: 0, notStarted: 0, reading: 0, finished: 0 };
    if (!isOwned) return counts;
    const owned = data.owned || [];
    counts.any = owned.length;
    owned.forEach(b => {
      if (b.finishedAt) counts.finished++;
      else if (b.startedAt) counts.reading++;
      else counts.notStarted++;
    });
    return counts;
  }, [data.owned, isOwned]);
  const genreCounts = useMemo(() => {
    const counts = {};
    if (!isOwned) return counts;
    (data.owned || []).forEach(b => {
      const g = (b.genre || '').trim();
      if (g) counts[g] = (counts[g] || 0) + 1;
    });
    return counts;
  }, [data.owned, isOwned]);
  const availableAuthors = useMemo(() => {
    if (!isOwned) return [];
    const set = new Set();
    (data.owned || []).forEach(b => { if (b.author && b.author.trim()) set.add(b.author.trim()); });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'fr'));
  }, [data.owned, isOwned]);
  const authorCounts = useMemo(() => {
    const counts = {};
    if (!isOwned) return counts;
    (data.owned || []).forEach(b => {
      const a = (b.author || '').trim();
      if (a) counts[a] = (counts[a] || 0) + 1;
    });
    return counts;
  }, [data.owned, isOwned]);
  const booksWithQuotesCount = useMemo(() => {
    if (!isOwned) return 0;
    const bookIds = new Set(quotes.map(q => q.bookId).filter(Boolean));
    return (data.owned || []).filter(b => bookIds.has(b.id)).length;
  }, [data.owned, quotes, isOwned]);
  const [quotesMenuOpen, setQuotesMenuOpen] = useState(false);
  const quotesMenuRef = useRef(null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  function activeFilterCount() {
    if (!filters) return 0;
    let n = 0;
    if (filters.hasQuotes) n++;
    if (filters.readingStatus && filters.readingStatus !== 'any') n++;
    if (filters.rating && filters.rating !== 'any') n++;
    if (filters.genres?.size > 0) n++;
    if (filters.authors?.size > 0) n++;
    return n;
  }
  useEffect(() => {
    if (!quotesMenuOpen) return;
    function close(e) {
      if (!quotesMenuRef.current?.contains(e.target)) setQuotesMenuOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setQuotesMenuOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [quotesMenuOpen]);
  return (
    <div className="search-bar-wrap">
    <div className="cell-row cell-row--lg cell-row--between search-row">
      {/* Search box */}
      <div className="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className={`search-clear${search ? ' visible' : ''}`}
          onClick={() => setSearch('')}
          aria-label="Clear search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Actions */}
      <div className="counter-actions">
        <button
          onClick={() => setAddModal(true)}
          className="add-btn"
          disabled={editMode}
          aria-disabled={editMode}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {t.btnAdd}
        </button>

        <div className="counter-secondary-actions">
          {data[tab].length > 0 && (
            <button
              onClick={() => { setEditMode(!editMode); if (editMode) setSelected(new Set()); }}
              className="edit-btn">
              {editMode ? t.btnDone : t.btnEdit}
            </button>
          )}

          <ExportMenu
            exportData={exportData}
            exportPDF={exportPDF}
            disabled={data[tab].length === 0}
            t={t}
          />
        </div>

        {/* View toggle */}
        <div className="view-btns">
          <button onClick={() => switchView('grid')} className={`view-btn${view === 'grid' ? ' active' : ''}`} aria-label="Card view">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="6" height="6" rx="1.5"/>
              <rect x="14" y="4" width="6" height="6" rx="1.5"/>
              <rect x="4" y="14" width="6" height="6" rx="1.5"/>
              <rect x="14" y="14" width="6" height="6" rx="1.5"/>
            </svg>
          </button>
          <button onClick={() => switchView('list')} className={`view-btn${view === 'list' ? ' active' : ''}`} aria-label="List view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    {isBookTab && data[tab].length > 0 && (
      <div className="cell-row cell-row--lg filters-row">
        <button
          type="button"
          className={`dropdown-btn filters-mobile-trigger${activeFilterCount() > 0 ? ' is-active' : ''}`}
          onClick={() => setMobilePanelOpen(true)}
          aria-label={t.filterToggle || 'Filter'}>
          <svg className="dropdown-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3"  y1="6"  x2="21" y2="6"/>
            <line x1="6"  y1="12" x2="18" y2="12"/>
            <line x1="9"  y1="18" x2="15" y2="18"/>
          </svg>
          <span className="dropdown-btn-label">{t.filterToggle || 'Filter'}</span>
          {activeFilterCount() > 0 && <span className="filter-badge">{activeFilterCount()}</span>}
        </button>
        <SortMenu
          current={currentSortKey}
          onChange={handleSort}
          ariaLabel={t.sortToggle || 'Sort'}
          options={sortOptions}
        />
        {isOwned && filters && (
          <>
            <AuthorsMenu
              selected={filters.authors || new Set()}
              onToggle={author => {
                const next = new Set(filters.authors || new Set());
                if (next.has(author)) next.delete(author);
                else next.add(author);
                setFilter('authors', next);
              }}
              onReset={() => setFilter('authors', new Set())}
              availableAuthors={availableAuthors}
              counts={authorCounts}
              t={t}
            />
            <SortMenu
              current={filters.readingStatus}
              onChange={key => setFilter('readingStatus', key)}
              ariaLabel={t.filterReadingStatus}
              defaultTriggerLabel={t.filterReadingStatus}
              options={[
                { key: 'any',         label: t.filterReadingAny         || 'Any',                count: readingCounts.any },
                { key: 'notStarted',  label: t.filterReadingNotStarted  || 'Not started',        count: readingCounts.notStarted },
                { key: 'reading',     label: t.filterReadingCurrent     || 'Currently reading',  count: readingCounts.reading },
                { key: 'finished',    label: t.filterReadingFinished    || 'Finished',           count: readingCounts.finished },
              ]}
            />
            <SortMenu
              current={filters.rating}
              onChange={key => setFilter('rating', key)}
              ariaLabel={t.filterRating}
              defaultTriggerLabel={t.filterRating}
              options={[
                { key: 'any', label: t.filterRatingAll || 'All', count: (data.owned || []).length },
                { key: '5',   triggerLabel: <RatingStars count={5} />, label: <RatingStars count={5} />, count: ratingCounts[5] },
                { key: '4',   triggerLabel: <RatingStars count={4} />, label: <RatingStars count={4} />, count: ratingCounts[4] },
                { key: '3',   triggerLabel: <RatingStars count={3} />, label: <RatingStars count={3} />, count: ratingCounts[3] },
                { key: '2',   triggerLabel: <RatingStars count={2} />, label: <RatingStars count={2} />, count: ratingCounts[2] },
                { key: '1',   triggerLabel: <RatingStars count={1} />, label: <RatingStars count={1} />, count: ratingCounts[1] },
              ]}
            />
            <GenresMenu
              selected={filters.genres}
              onToggle={genre => {
                const next = new Set(filters.genres);
                if (next.has(genre)) next.delete(genre);
                else next.add(genre);
                setFilter('genres', next);
              }}
              availableGenres={availableGenres}
              counts={genreCounts}
              t={t}
            />
            <div className="dropdown-wrap quotes-toggle" ref={quotesMenuRef}>
              <button
                type="button"
                className={`dropdown-btn dropdown-btn--icon${filters.hasQuotes ? ' is-active' : ''}`}
                onClick={() => setQuotesMenuOpen(o => !o)}
                aria-haspopup="dialog"
                aria-expanded={quotesMenuOpen}
                aria-label={t.filterWithQuotes || 'Books with quotes'}
                title={t.filterWithQuotes || 'Books with quotes'}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3"  y1="6"  x2="21" y2="6"/>
                  <line x1="6"  y1="12" x2="18" y2="12"/>
                  <line x1="9"  y1="18" x2="15" y2="18"/>
                </svg>
              </button>
              {quotesMenuOpen && (
                <div className="dropdown-menu" role="dialog">
                  <div
                    className="filter-row"
                    role="checkbox"
                    aria-checked={filters.hasQuotes}
                    tabIndex={0}
                    onClick={() => setFilter('hasQuotes', !filters.hasQuotes)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilter('hasQuotes', !filters.hasQuotes); } }}>
                    <span className={`row-checkbox${filters.hasQuotes ? ' is-selected' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    <span className="dropdown-item-label">{t.filterWithQuotes}</span>
                  </div>
                </div>
              )}
            </div>
            {activeFilterCount() > 0 && (
              <button
                type="button"
                className="btn btn-md btn-secondary filters-reset-btn"
                onClick={() => {
                  setFilter('hasQuotes', false);
                  setFilter('readingStatus', 'any');
                  setFilter('rating', 'any');
                  setFilter('genres', new Set());
                  setFilter('authors', new Set());
                }}>
                {t.filterClear || 'Clear filters'}
              </button>
            )}
          </>
        )}
      </div>
    )}

    {isBookTab && (
      <MobileFiltersPanel
        open={mobilePanelOpen}
        onClose={() => setMobilePanelOpen(false)}
        sortCol={sortCol} sortDir={sortDir} setSort={setSort}
        filters={filters} setFilter={setFilter}
        isOwned={isOwned}
        availableGenres={availableGenres}
        totalCount={(data.owned || []).length}
        bookCount={bookCount}
        ratingCounts={ratingCounts}
        readingCounts={readingCounts}
        genreCounts={genreCounts}
        booksWithQuotesCount={booksWithQuotesCount}
        t={t}
      />
    )}
    </div>
  );
}
