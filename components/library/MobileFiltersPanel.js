"use client";
import { useModalA11y } from "@/lib/useModalA11y";

function FilterSection({ label, children }) {
  return (
    <div className="panel-section filters-panel-section">
      <span className="panel-section-eyebrow">{label}</span>
      <div className="filters-panel-rows">{children}</div>
    </div>
  );
}

function RadioRow({ checked, onSelect, label, count }) {
  return (
    <div
      className="filter-row"
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}>
      <span className={`row-checkbox${checked ? ' is-selected' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
      <span className="dropdown-item-label">{label}</span>
      <span className="dropdown-item-count-wrap">
        {count !== undefined && (
          <span className="dropdown-item-count sidebar-badge">{count}</span>
        )}
      </span>
    </div>
  );
}

function CheckboxRow({ checked, onToggle, label, count }) {
  return (
    <div
      className="filter-row"
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}>
      <span className={`row-checkbox${checked ? ' is-selected' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
      <span className="dropdown-item-label">{label}</span>
      <span className="dropdown-item-count-wrap">
        {count !== undefined && (
          <span className="dropdown-item-count sidebar-badge">{count}</span>
        )}
      </span>
    </div>
  );
}

function StarsLabel({ count }) {
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

export default function MobileFiltersPanel({
  open, onClose,
  sortCol, sortDir, setSort,
  filters, setFilter,
  isOwned,
  availableGenres,
  totalCount,
  bookCount,
  ratingCounts,
  readingCounts,
  genreCounts,
  booksWithQuotesCount,
  t,
}) {
  const panelRef = useModalA11y(open, onClose, { autoFocus: false });

  const currentSortKey =
    sortCol === 'dateAdded'    && sortDir === 'desc' ? 'dateAdded' :
    sortCol === 'dateFinished' && sortDir === 'desc' ? 'dateFinished' :
    'alpha';
  function handleSort(key) {
    if (key === 'alpha')             setSort('title', 'asc');
    else if (key === 'dateAdded')    setSort('dateAdded', 'desc');
    else if (key === 'dateFinished') setSort('dateFinished', 'desc');
  }
  function toggleGenre(genre) {
    const next = new Set(filters.genres);
    if (next.has(genre)) next.delete(genre);
    else next.add(genre);
    setFilter('genres', next);
  }
  const hasActiveFilters =
    filters.hasQuotes ||
    filters.readingStatus !== 'any' ||
    filters.rating !== 'any' ||
    filters.genres.size > 0;
  function resetAllFilters() {
    setFilter('hasQuotes', false);
    setFilter('readingStatus', 'any');
    setFilter('rating', 'any');
    setFilter('genres', new Set());
  }

  return (
    <>
      {open && <div className="panel-overlay" onClick={onClose} />}
      <div className={`book-panel filters-panel${open ? ' open' : ''}`} ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true">
        {open && (
          <div className="panel-inner">
            <button className="panel-close" onClick={onClose} aria-label={t.btnClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {typeof bookCount === 'number' && (
              <div className="filters-panel-header">
                <span className="filters-panel-count">
                  {bookCount < totalCount
                    ? t.resultQuery(bookCount, totalCount)
                    : t.resultTotal(totalCount)}
                </span>
                {isOwned && hasActiveFilters && (
                  <button type="button" className="btn btn-sm btn-secondary" onClick={resetAllFilters}>
                    {t.filterClear || 'Clear filters'}
                  </button>
                )}
              </div>
            )}

            <FilterSection label={t.sortToggle || 'Sort'}>
              <RadioRow checked={currentSortKey === 'alpha'}     onSelect={() => handleSort('alpha')}     label={t.sortAlpha     || 'A–Z'} />
              <RadioRow checked={currentSortKey === 'dateAdded'} onSelect={() => handleSort('dateAdded')} label={t.sortDateAdded || 'Date added'} />
              {isOwned && (
                <RadioRow checked={currentSortKey === 'dateFinished'} onSelect={() => handleSort('dateFinished')} label={t.sortDateFinished || 'Date finished'} />
              )}
            </FilterSection>

            {isOwned && (
              <>
                <FilterSection label={t.filterReadingStatus}>
                  <RadioRow checked={filters.readingStatus === 'any'}        onSelect={() => setFilter('readingStatus', 'any')}        label={t.filterReadingAny}         count={readingCounts.any} />
                  <RadioRow checked={filters.readingStatus === 'notStarted'} onSelect={() => setFilter('readingStatus', 'notStarted')} label={t.filterReadingNotStarted}  count={readingCounts.notStarted} />
                  <RadioRow checked={filters.readingStatus === 'reading'}    onSelect={() => setFilter('readingStatus', 'reading')}    label={t.filterReadingCurrent}     count={readingCounts.reading} />
                  <RadioRow checked={filters.readingStatus === 'finished'}   onSelect={() => setFilter('readingStatus', 'finished')}   label={t.filterReadingFinished}    count={readingCounts.finished} />
                </FilterSection>

                <FilterSection label={t.filterRating}>
                  <RadioRow checked={filters.rating === 'any'} onSelect={() => setFilter('rating', 'any')} label={t.filterRatingAll || 'All'} count={totalCount} />
                  {[5, 4, 3, 2, 1].map(n => (
                    <RadioRow
                      key={n}
                      checked={filters.rating === String(n)}
                      onSelect={() => setFilter('rating', String(n))}
                      label={<StarsLabel count={n} />}
                      count={ratingCounts[n]}
                    />
                  ))}
                </FilterSection>

                {availableGenres.length > 0 && (
                  <FilterSection label={t.filterGenres}>
                    {availableGenres.map(genre => (
                      <CheckboxRow
                        key={genre}
                        checked={filters.genres.has(genre)}
                        onToggle={() => toggleGenre(genre)}
                        label={genre}
                        count={genreCounts[genre]}
                      />
                    ))}
                  </FilterSection>
                )}

                <FilterSection label={t.tabQuotes}>
                  <CheckboxRow
                    checked={filters.hasQuotes}
                    onToggle={() => setFilter('hasQuotes', !filters.hasQuotes)}
                    label={t.filterWithQuotes}
                    count={booksWithQuotesCount}
                  />
                </FilterSection>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
