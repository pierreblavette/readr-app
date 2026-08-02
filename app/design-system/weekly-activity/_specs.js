"use client";
// Spec de la page Data Visualization (Weekly Activity). Markup reproduit à l'identique
// de components/library/WeeklyActivityCard.js (head → chart → legend). Données figées,
// hauteurs calculées à la main comme le composant (fill = value/max × 100%, min 8%).
import { useRef, useState, useEffect } from "react";
import AnnoScene from "../_components/AnnoScene";

const INITIALS = ["M", "T", "W", "T", "F", "S", "S"];

const METRIC_LABELS = { all: "All", books: "Books", quotes: "Quotes", words: "Words" };
const VIEW_LABELS = { week: "Week", month: "Month" };

// Trigger fermé d'un SortMenu (dropdown-btn), pour le head compact (mobile).
function SortTrigger({ label, wrap = false }) {
  const btn = (
    <div className="dropdown-wrap sort-menu">
      <button type="button" className="dropdown-btn sort-menu-btn" aria-haspopup="listbox" aria-expanded={false}>
        <span className="sort-menu-btn-label">{label}</span>
        <svg className="dropdown-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
    </div>
  );
  return wrap ? <div className="range-dropdown-wrap">{btn}</div> : btn;
}

// 7 jours (books / quotes / words). Un jour vide (index 2) → point.
const WEEK = [
  { books: 0, quotes: 2, words: 1 },
  { books: 1, quotes: 3, words: 0 },
  { books: 0, quotes: 0, words: 0 },
  { books: 0, quotes: 1, words: 4 },
  { books: 2, quotes: 0, words: 2 },
  { books: 0, quotes: 4, words: 3 },
  { books: 1, quotes: 0, words: 1 },
];

const h = (v, max) => `${Math.max(8, (v / max) * 100)}%`;

function Pill({ active, children }) {
  return (
    <button type="button" role="tab" aria-selected={active} className={`overview-activity-pill is-md${active ? " is-active" : ""}`}>{children}</button>
  );
}

function Nav({ label }) {
  const Chevron = ({ d }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points={d} /></svg>
  );
  return (
    <div className="overview-activity-nav">
      <button type="button" className="overview-activity-nav-btn" aria-label="Previous"><Chevron d="15 18 9 12 15 6" /></button>
      <span className="overview-activity-week-label">{label}</span>
      <button type="button" className="overview-activity-nav-btn" disabled aria-label="Next"><Chevron d="9 18 15 12 9 6" /></button>
    </div>
  );
}

function Head({ metric, view }) {
  return (
    <div className="overview-card-head">
      <div className="overview-activity-head-row">
        <div className="overview-activity-pills is-md" role="tablist">
          <Pill active={metric === "all"}>All</Pill>
          <Pill active={metric === "books"}>Books</Pill>
          <Pill active={metric === "quotes"}>Quotes</Pill>
          <Pill active={metric === "words"}>Words</Pill>
        </div>
        <div className="overview-activity-range is-md" role="tablist">
          <Pill active={view === "week"}>Week</Pill>
          <Pill active={view === "month"}>Month</Pill>
        </div>
        <div className="overview-activity-mobile-filters">
          <SortTrigger label={METRIC_LABELS[metric]} />
          <SortTrigger label={VIEW_LABELS[view]} wrap />
        </div>
        <Nav label={view === "month" ? "May 2026" : "May 4 – 10"} />
      </div>
    </div>
  );
}

function StackedFill({ d, segMax }) {
  return (
    <div className="overview-activity-fill is-stacked">
      {["books", "quotes", "words"].map((k) => (
        <div key={k} className={`overview-activity-seg overview-activity-seg--${k}${d[k] > 0 ? "" : " is-empty"}`} style={d[k] > 0 ? { height: h(d[k], segMax) } : undefined}>
          {d[k] > 0 && <span className="overview-activity-count">{d[k]}</span>}
        </div>
      ))}
    </div>
  );
}

export function WeekBars({ metric = "all" }) {
  const days = WEEK.map((d) => ({ ...d, count: d.books + d.quotes + d.words }));
  const weekMax = Math.max(1, ...days.map((d) => (metric === "all" ? d.count : d[metric])));
  const segMax = Math.max(1, ...days.flatMap((d) => [d.books, d.quotes, d.words]));
  return (
    <div className="overview-activity-bars">
      {days.map((d, i) => {
        const val = metric === "all" ? d.count : d[metric];
        return (
          <div key={i} className={`overview-activity-col${val > 0 ? " is-clickable" : ""}`}>
            <span className="overview-activity-day">{INITIALS[i]}</span>
            <div className="overview-activity-track" aria-hidden="true">
              {val === 0 ? (
                <div className="overview-activity-dot" />
              ) : metric === "all" ? (
                <StackedFill d={d} segMax={segMax} />
              ) : (
                <div className={`overview-activity-fill is-${metric}`} style={{ height: h(val, weekMax) }}>
                  <span className="overview-activity-count">{val}</span>
                </div>
              )}
              {val > 0 && (
                <div className="overview-activity-cube-counter-wrap"><span className="overview-activity-cube-counter">{val}</span></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Grille mensuelle compacte (5 semaines) : quelques cases actives, le reste vide/out.
const MONTH_CELLS = (() => {
  const cells = [];
  // 2 cases hors-mois en tête (le mois commence un mercredi)
  for (let i = 0; i < 2; i++) cells.push({ out: true });
  const active = { 4: 2, 9: 3, 10: 1, 15: 4, 16: 2, 22: 5, 23: 1, 28: 3 };
  for (let day = 1; day <= 31; day++) cells.push({ day, count: active[day] || 0, today: day === 16 });
  while (cells.length % 7 !== 0) cells.push({ out: true });
  return cells;
})();

export function MonthGrid({ metric = "all" }) {
  const max = 5;
  return (
    <div className="overview-activity-grid" role="grid">
      <div className="overview-activity-grid-head" aria-hidden="true">
        {INITIALS.map((d, i) => <span key={i} className="overview-activity-grid-day">{d}</span>)}
      </div>
      <div className="overview-activity-grid-body">
        {MONTH_CELLS.map((c, i) => {
          if (c.out) return <div key={i} className="overview-activity-cube is-out" aria-hidden="true" />;
          const cls = ["overview-activity-cube", c.count === 0 ? "is-empty" : "", c.today ? "is-today" : "", c.count > 0 ? "is-clickable" : ""].filter(Boolean).join(" ");
          if (c.count === 0) return <div key={i} className={cls}><span className="overview-activity-cube-num">{c.day}</span></div>;
          return (
            <div key={i} className={cls}>
              <span className="overview-activity-cube-num">{c.day}</span>
              <div className={`overview-activity-fill is-${metric === "all" ? "books" : metric}`} style={{ height: h(c.count, max) }}>
                <span className="overview-activity-count">{c.count}</span>
              </div>
              <div className="overview-activity-cube-counter-wrap"><span className="overview-activity-cube-counter">{c.count}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// metric : all | books | quotes | words. view : week | month.
// compact : rend la version mobile (.is-compact) — head = dropdowns + nav pleine largeur.
export function WeeklyActivitySpec({ metric = "all", view = "week", compact = false, className = "", style }) {
  return (
    <div className={`overview-card overview-activity${compact ? " is-compact" : ""} ${className}`.trim()} style={style}>
      <Head metric={metric} view={view} />
      <div className="overview-activity-divider" aria-hidden="true" />
      {view === "month" ? <MonthGrid metric={metric} /> : <WeekBars metric={metric} />}
      <div className="overview-activity-divider" aria-hidden="true" />
      <div className="overview-activity-legend">
        <span className="overview-activity-legend-item"><span className="overview-activity-legend-dot is-books" aria-hidden="true" /><span>Books</span></span>
        <span className="overview-activity-legend-item"><span className="overview-activity-legend-dot is-quotes" aria-hidden="true" /><span>Quotes</span></span>
        <span className="overview-activity-legend-item"><span className="overview-activity-legend-dot is-words" aria-hidden="true" /><span>Words</span></span>
      </div>
    </div>
  );
}

// Version responsive : bascule desktop ↔ mobile selon la largeur RÉELLE de la carte
// (ResizeObserver, comme le vrai composant — pas le viewport). Sous `threshold` (740,
// iso prod) → .is-compact (head en dropdowns). Défaut compact (état contraint avant
// 1re mesure). maxWidth borne la taille imposante de la carte.
export function WeeklyActivityResponsive({ metric = "all", view = "week", threshold = 740, maxWidth = 780 }) {
  const ref = useRef(null);
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const card = ref.current?.firstElementChild;
    if (!card) return;
    const measure = () => setCompact(card.getBoundingClientRect().width < threshold);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    return () => ro.disconnect();
  }, [threshold]);
  return (
    <div ref={ref} style={{ width: "100%", maxWidth }}>
      <WeeklyActivitySpec metric={metric} view={view} compact={compact} />
    </div>
  );
}

// Anatomy responsive (pattern Editing · Bulk) : DEUX scènes distinctes montées selon la
// largeur du CONTENEUR (.ds-anno-board) — pas la carte (la carte mobile est toujours
// < 740 → mesurer la carte créerait une hystérésis qui la bloquerait en mobile). Desktop
// = badges pills/range/nav ; mobile = badges mobile-filters/nav. Défaut compact.
export function WeeklyActivityAnatomy({ desktopAnnos, mobileAnnos, threshold = 860 }) {
  const ref = useRef(null);
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const el = ref.current;
    const container = el?.closest(".ds-anno-board") || el?.parentElement;
    if (!container) return;
    const measure = () => {
      const cs = getComputedStyle(container);
      const avail = container.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
      setCompact(avail < threshold);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [threshold]);
  return (
    <div ref={ref}>
      {compact ? (
        <AnnoScene annos={mobileAnnos} stack>
          <WeeklyActivitySpec metric="all" view="week" compact className="ds-anno-organism" style={{ width: "100%", maxWidth: 780 }} />
        </AnnoScene>
      ) : (
        <AnnoScene annos={desktopAnnos}>
          <WeeklyActivitySpec metric="all" view="week" className="ds-anno-organism" style={{ width: "100%", maxWidth: 780 }} />
        </AnnoScene>
      )}
    </div>
  );
}
