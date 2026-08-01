// Specs partagés par la famille Filters (Foundation / Row / Panel).
// Markup reproduit à l'identique de SearchBar (triggers) et MobileFiltersPanel (rows).

export const Chevron = () => (
  <svg className="dropdown-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);

export const QuotesLines = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);

// ─── ROW (triggers) ───
export function Trigger({ label, wrap = "sort-menu", active }) {
  return (
    <div className={`dropdown-wrap ${wrap}`}>
      <button type="button" className={`dropdown-btn sort-menu-btn${active ? " is-active" : ""}`}>
        <span className="sort-menu-btn-label">{label}</span>
        <Chevron />
      </button>
    </div>
  );
}

export const QuotesToggle = () => (
  <div className="dropdown-wrap quotes-toggle">
    <button type="button" className="dropdown-btn dropdown-btn--icon" aria-label="Books with quotes" title="Books with quotes">
      <QuotesLines />
    </button>
  </div>
);

export const MobileTrigger = ({ count = 3 }) => (
  <button type="button" className="dropdown-btn filters-mobile-trigger" style={{ display: "inline-flex" }}>
    <QuotesLines className="dropdown-btn-icon" />
    <span className="dropdown-btn-label">Filter</span>
    {count > 0 && <span className="filter-badge">{count}</span>}
  </button>
);

// Cluster complet, ordre de priorité : Sort → Authors → Reading → Rating → Genres → Quotes.
// fold : mode responsive RÉEL (comme la prod) — on retire le forçage .ds-filters-row--all
// et on ajoute le trigger mobile ; les @media viewport de library replient alors
// progressivement les triggers (≤1280 quotes → ≤480 authors) dans .filters-mobile-trigger.
// Défaut (fold=false) = cluster complet figé pour la doc (page Filters Row).
export function FiltersRowSpec({ className = "", fold = false }) {
  const cls = fold
    ? `cell-row cell-row--lg filters-row ${className}`
    : `cell-row cell-row--lg filters-row ds-filters-row--all ${className}`;
  return (
    <div className={cls.trim()}>
      <Trigger label="Date added" wrap="sort-menu filters-sort" />
      <Trigger label="Authors" wrap="authors-menu" />
      <Trigger label="Reading status" wrap="sort-menu filters-reading" />
      <Trigger label="Rating" wrap="sort-menu filters-rating" />
      <Trigger label="Genres" wrap="genres-menu" />
      <QuotesToggle />
      {/* Trigger mobile SANS style display inline (contrairement à <MobileTrigger/>) :
          c'est le @media de library qui le montre (≤1280) / cache (≥1281). */}
      {fold && (
        <button type="button" className="dropdown-btn filters-mobile-trigger">
          <QuotesLines className="dropdown-btn-icon" />
          <span className="dropdown-btn-label">Filter</span>
        </button>
      )}
    </div>
  );
}

// ─── PANEL (rows) ───
export function FilterRow({ role = "checkbox", checked, label, count }) {
  return (
    <div className="filter-row" role={role} aria-checked={checked} tabIndex={0}>
      <span className={`row-checkbox${checked ? " is-selected" : ""}`}><Check /></span>
      <span className="dropdown-item-label">{label}</span>
      <span className="dropdown-item-count-wrap">
        {count !== undefined && <span className="dropdown-item-count sidebar-badge">{count}</span>}
      </span>
    </div>
  );
}

export function FilterSection({ label, children }) {
  return (
    <div className="panel-section filters-panel-section">
      <span className="panel-section-eyebrow">{label}</span>
      <div className="filters-panel-rows">{children}</div>
    </div>
  );
}

export const StarsLabel = ({ count }) => (
  <span className="rating-stars-inline" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} viewBox="0 0 24 24" fill={i <= count ? "currentColor" : "var(--border)"}>
        <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
      </svg>
    ))}
  </span>
);

// Le panel complet (statique) — header + sections + footer. Position neutralisée en /ds
// via .ds-panel-stage (la vraie primitive .book-panel est fixed / slide-in).
export function FiltersPanelSpec() {
  return (
    <div className="book-panel filters-panel ds-panel-static">
      <div className="panel-inner">
        <button type="button" className="panel-close" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <div className="filters-panel-wrap">
          <div className="filters-panel-header">
            <span className="filters-panel-count">42 of 128 books</span>
          </div>
          <FilterSection label="Reading status">
            <FilterRow role="radio" checked label="Any" count={128} />
            <FilterRow role="radio" label="Not started" count={54} />
            <FilterRow role="radio" label="Currently reading" count={12} />
            <FilterRow role="radio" label="Finished" count={62} />
          </FilterSection>
          <FilterSection label="Rating">
            <FilterRow role="radio" checked label="All" count={128} />
            <FilterRow role="radio" label={<StarsLabel count={5} />} count={31} />
            <FilterRow role="radio" label={<StarsLabel count={4} />} count={44} />
          </FilterSection>
          <FilterSection label="Books with quotes">
            <FilterRow role="checkbox" checked label="With quotes" count={37} />
          </FilterSection>
          <div className="filters-panel-footer">
            <button type="button" className="btn btn-md btn-primary filters-panel-confirm">
              <span>Confirm</span><span className="filters-confirm-count">42</span>
            </button>
            <button type="button" className="btn btn-md btn-secondary">Clear filters</button>
          </div>
        </div>
      </div>
    </div>
  );
}
