// Spec de la page Sidebar. Markup reproduit à l'identique de components/Sidebar.js.
// Statique (pas de handlers ni useTheme). .ds-sidebar-static neutralise le sticky.
import LogoLockup from "../../../components/brand/LogoLockup";

const OverviewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
);
const LibIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
);
const WishIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
);
const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
);
const DictIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><line x1="8" y1="7" x2="14" y2="7" /><line x1="8" y1="11" x2="16" y2="11" /></svg>
);
const ColIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
);
// arrow-left-from-line (lucide) — replier vers la gauche.
const CollapseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="17" y1="12" y2="12" /><polyline points="9 6 3 12 9 18" /><path d="M21 19V5" /></svg>
);
// arrow-right-from-line (lucide) — déplier vers la droite.
const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="7" y1="12" y2="12" /><polyline points="15 18 21 12 15 6" /><path d="M3 5v14" /></svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const ChevronIcon = () => (
  <svg className="sidebar-section-chevron open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const SunIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>);

// active : clé de l'item actif (owned par défaut). collapsed : variante icônes seules.
export function SidebarSpec({ active = "owned", collapsed = false, className = "", style }) {
  const isA = (k) => active === k;
  return (
    <aside className={`sidebar ds-sidebar-static${collapsed ? " collapsed" : ""} ${className}`.trim()} style={style}>
      <div className="sidebar-logo">
        {collapsed ? (
          <button type="button" className="sidebar-logo-collapse sidebar-logo-collapse--arrow" aria-label="Expand sidebar"><ExpandIcon /></button>
        ) : (
          <>
            <LogoLockup className="logo" />
            <button type="button" className="sidebar-logo-collapse sidebar-logo-collapse--arrow" aria-label="Collapse sidebar"><CollapseIcon /></button>
          </>
        )}
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section sidebar-section--lone">
          <button type="button" className={`sidebar-item${isA("overview") ? " active" : ""}`}>
            <span className="sidebar-icon"><OverviewIcon /></span>
            {!collapsed && <span className="sidebar-label">Overview</span>}
          </button>
        </div>

        <div className="sidebar-section">
          {!collapsed && <div className="sidebar-section-head sidebar-section-head--no-action"><span className="sidebar-section-label">Shelves</span></div>}
          <button type="button" className={`sidebar-item${isA("owned") ? " active" : ""}`}>
            <span className="sidebar-icon"><LibIcon /></span>
            {!collapsed && (<><span className="sidebar-label">Library</span><span className="sidebar-badge">12</span></>)}
          </button>
          <button type="button" className={`sidebar-item${isA("wishlist") ? " active" : ""}`}>
            <span className="sidebar-icon"><WishIcon /></span>
            {!collapsed && (<><span className="sidebar-label">Wishlist</span><span className="sidebar-badge">5</span></>)}
          </button>
        </div>

        <div className="sidebar-section">
          {!collapsed && <div className="sidebar-section-head sidebar-section-head--no-action"><span className="sidebar-section-label">Notes</span></div>}
          <button type="button" className={`sidebar-item${isA("quotes") ? " active" : ""}`}>
            <span className="sidebar-icon"><QuoteIcon /></span>
            {!collapsed && (<><span className="sidebar-label">Quotes</span><span className="sidebar-badge">8</span></>)}
          </button>
          <button type="button" className={`sidebar-item${isA("dictionary") ? " active" : ""}`}>
            <span className="sidebar-icon"><DictIcon /></span>
            {!collapsed && (<><span className="sidebar-label">Dictionary</span><span className="sidebar-badge">23</span></>)}
          </button>
        </div>

        <div className="sidebar-section">
          {!collapsed ? (
            <div className="sidebar-section-head-row">
              <div className="sidebar-section-head sidebar-section-head--no-action"><span className="sidebar-section-label">Collections</span></div>
              <button type="button" className="sidebar-section-add" aria-label="New collection"><PlusIcon /></button>
            </div>
          ) : (
            <button type="button" className={`sidebar-item${isA("collections") ? " active" : ""}`}><span className="sidebar-icon"><ColIcon /></span></button>
          )}
          {!collapsed && (
            <>
              <div className={`sidebar-item sidebar-col-item sidebar-col-all${isA("collections") ? " active" : ""}`} role="button" tabIndex={0}>
                <button type="button" className="sidebar-col-toggle sidebar-col-toggle--sm" aria-label="Collapse"><ChevronIcon /></button>
                <span className="sidebar-label">All collections</span>
                <span className="sidebar-badge">2</span>
              </div>
              <button type="button" className="sidebar-item sidebar-col-item"><span className="sidebar-label">Science shelf</span><span className="sidebar-badge">12</span></button>
              <button type="button" className="sidebar-item sidebar-col-item"><span className="sidebar-label">Physics</span><span className="sidebar-badge">7</span></button>
            </>
          )}
        </div>
      </nav>

      <div className="sidebar-bottom">
        {!collapsed && (
          <div className="cell-row cell-row--lg sidebar-appearance-row">
            <span className="sidebar-row-label">Appearance</span>
            <button type="button" className="theme-btn" aria-label="Toggle theme"><span className="toggle-thumb"><SunIcon /></span></button>
          </div>
        )}
      </div>
    </aside>
  );
}
