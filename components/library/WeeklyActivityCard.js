"use client";
import { useMemo, useState, useRef, useLayoutEffect, useEffect } from "react";
import { OverviewIcon } from "./EmptyState";
import ActivityDayPanel from "./ActivityDayPanel";
import SortMenu from "./SortMenu";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Width below which the head switches to the compact dropdown layout.
const COMPACT_BREAKPOINT = 740;
// Run before paint on the client (no flash) ; fall back to useEffect on SSR.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function getWeekStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dayOfWeek = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dayOfWeek);
  return d;
}

function getMonthStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(1);
  return d;
}

function dayInitials(lang) {
  return lang === 'fr'
    ? ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
}

function formatWeekRange(weekStart, lang) {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  const sameMonth = weekStart.getMonth() === end.getMonth();
  const sameYear = weekStart.getFullYear() === end.getFullYear();
  const fmtDay = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  const fmtMonth = new Intl.DateTimeFormat(locale, { month: 'short' });

  if (sameMonth) {
    return lang === 'fr'
      ? `${fmtDay.format(weekStart)} – ${fmtDay.format(end)} ${fmtMonth.format(end)}`
      : `${fmtMonth.format(end)} ${fmtDay.format(weekStart)} – ${fmtDay.format(end)}`;
  }
  if (sameYear) {
    return lang === 'fr'
      ? `${fmtDay.format(weekStart)} ${fmtMonth.format(weekStart)} – ${fmtDay.format(end)} ${fmtMonth.format(end)}`
      : `${fmtMonth.format(weekStart)} ${fmtDay.format(weekStart)} – ${fmtMonth.format(end)} ${fmtDay.format(end)}`;
  }
  const fmtFull = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  return `${fmtFull.format(weekStart)} – ${fmtFull.format(end)}`;
}

function formatMonthLabel(monthStart, lang) {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(monthStart);
}

export default function WeeklyActivityCard({
  owned = [], quotes = [], words = [], lang = 'en', t,
  onOpenBook, onOpenQuote,
}) {
  const [view, setView] = useState('week');
  const [metric, setMetric] = useState('all');
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  // Compact head layout (dropdowns) vs full (pills) — driven by the card's
  // real width via ResizeObserver. JS instead of a CSS container query because
  // WebKit (Safari / Mac web app) fails to resolve @container on first layout.
  // Default true = compact, so the wide 3-col head never renders (and overflows)
  // before the first measurement.
  const cardRef = useRef(null);
  const [isCompact, setIsCompact] = useState(true);

  useIsoLayoutEffect(() => {
    const el = cardRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      setIsCompact(entry.contentRect.width < COMPACT_BREAKPOINT);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const todayMs = useMemo(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime();
  }, []);

  function countsForDay(dayMs) {
    const nextDayMs = dayMs + MS_PER_DAY;
    const books = owned.filter(b => b.finishedAt && b.finishedAt >= dayMs && b.finishedAt < nextDayMs).length;
    const quotesCount = quotes.filter(q => q.createdAt && q.createdAt >= dayMs && q.createdAt < nextDayMs).length;
    const wordsCount = words.filter(w => w.createdAt && w.createdAt >= dayMs && w.createdAt < nextDayMs).length;
    let count;
    if (metric === 'books') count = books;
    else if (metric === 'quotes') count = quotesCount;
    else if (metric === 'words') count = wordsCount;
    else count = books + quotesCount + wordsCount;
    return { count, books, quotes: quotesCount, words: wordsCount };
  }

  const earliestActivityMs = useMemo(() => {
    const all = [
      ...owned.filter(b => b.finishedAt).map(b => b.finishedAt),
      ...quotes.map(q => q.createdAt).filter(Boolean),
      ...words.map(w => w.createdAt).filter(Boolean),
    ];
    if (all.length === 0) return null;
    return Math.min(...all);
  }, [owned, quotes, words]);

  const earliestWeekOffset = useMemo(() => {
    if (earliestActivityMs === null) return 0;
    const earliestWeek = getWeekStart(new Date(earliestActivityMs)).getTime();
    const currentWeek = getWeekStart(new Date()).getTime();
    return -Math.round((currentWeek - earliestWeek) / (7 * MS_PER_DAY));
  }, [earliestActivityMs]);

  const earliestMonthOffset = useMemo(() => {
    if (earliestActivityMs === null) return 0;
    const earliest = new Date(earliestActivityMs);
    const now = new Date();
    return (earliest.getFullYear() - now.getFullYear()) * 12 + (earliest.getMonth() - now.getMonth());
  }, [earliestActivityMs]);

  const weekData = useMemo(() => {
    const weekStart = getWeekStart(new Date());
    weekStart.setDate(weekStart.getDate() + weekOffset * 7);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(weekStart);
      dayStart.setDate(dayStart.getDate() + i);
      const dayMs = dayStart.getTime();
      const { count, books, quotes: q, words: w } = countsForDay(dayMs);
      days.push({ dayMs, count, books, quotes: q, words: w });
    }
    const max = Math.max(0, ...days.map(d => d.count));
    const segMax = Math.max(0, ...days.flatMap(d => [d.books, d.quotes, d.words]));
    return { weekStart, days, max, segMax };
  }, [metric, weekOffset, owned, quotes, words]);

  const monthData = useMemo(() => {
    const monthStart = getMonthStart(new Date());
    monthStart.setMonth(monthStart.getMonth() + monthOffset);
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstWeekday = (monthStart.getDay() + 6) % 7; // 0 = Mon
    const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

    const cells = [];
    let max = 0;
    let segMax = 0;
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - firstWeekday + 1;
      if (dayNum < 1 || dayNum > daysInMonth) {
        cells.push({ inMonth: false });
      } else {
        const cellDate = new Date(year, month, dayNum);
        const dayMs = cellDate.getTime();
        const { count, books, quotes: q, words: w } = countsForDay(dayMs);
        if (count > max) max = count;
        if (books > segMax) segMax = books;
        if (q > segMax) segMax = q;
        if (w > segMax) segMax = w;
        cells.push({ inMonth: true, dayMs, dayNum, count, books, quotes: q, words: w });
      }
    }
    return { monthStart, cells, max, segMax };
  }, [metric, monthOffset, owned, quotes, words]);

  const isMonth = view === 'month';
  const canPrev = isMonth ? monthOffset > earliestMonthOffset : weekOffset > earliestWeekOffset;
  const canNext = isMonth ? monthOffset < 0 : weekOffset < 0;
  const initials = dayInitials(lang);
  const hasAnyActivity = earliestActivityMs !== null;

  function handlePrev() {
    if (!canPrev) return;
    if (isMonth) setMonthOffset(o => o - 1); else setWeekOffset(o => o - 1);
  }
  function handleNext() {
    if (!canNext) return;
    if (isMonth) setMonthOffset(o => o + 1); else setWeekOffset(o => o + 1);
  }

  function handleCubeClick(cell) {
    if (!cell.inMonth || cell.count === 0) return;
    setSelectedDay(cell.dayMs);
  }

  const dateLabel = isMonth
    ? formatMonthLabel(monthData.monthStart, lang)
    : formatWeekRange(weekData.weekStart, lang);

  return (
    <div className={`overview-card overview-activity${isCompact ? ' is-compact' : ''}`} ref={cardRef}>
      <div className="overview-card-head">
        <div className="overview-activity-head-row">
          <div className="overview-activity-pills is-md" role="tablist" aria-label={t.overviewActivityTitle}>
            <button type="button" role="tab" aria-selected={metric === 'all'}
                    className={`overview-activity-pill is-md${metric === 'all' ? ' is-active' : ''}`}
                    onClick={() => setMetric('all')}>
              {t.overviewActivityAll}
            </button>
            <button type="button" role="tab" aria-selected={metric === 'books'}
                    className={`overview-activity-pill is-md${metric === 'books' ? ' is-active' : ''}`}
                    onClick={() => setMetric('books')}>
              {t.overviewActivityBooks}
            </button>
            <button type="button" role="tab" aria-selected={metric === 'quotes'}
                    className={`overview-activity-pill is-md${metric === 'quotes' ? ' is-active' : ''}`}
                    onClick={() => setMetric('quotes')}>
              {t.overviewActivityQuotes}
            </button>
            <button type="button" role="tab" aria-selected={metric === 'words'}
                    className={`overview-activity-pill is-md${metric === 'words' ? ' is-active' : ''}`}
                    onClick={() => setMetric('words')}>
              {t.overviewActivityWords}
            </button>
          </div>
          <div className="overview-activity-range is-md" role="tablist" aria-label={t.overviewActivityTitle}>
            <button type="button" role="tab" aria-selected={view === 'week'}
                    className={`overview-activity-pill is-md${view === 'week' ? ' is-active' : ''}`}
                    onClick={() => setView('week')}>
              {t.overviewActivityWeek}
            </button>
            <button type="button" role="tab" aria-selected={view === 'month'}
                    className={`overview-activity-pill is-md${view === 'month' ? ' is-active' : ''}`}
                    onClick={() => setView('month')}>
              {t.overviewActivityMonth}
            </button>
          </div>
          <div className="overview-activity-mobile-filters">
            <SortMenu
              current={metric}
              onChange={setMetric}
              options={[
                { key: 'all', label: t.overviewActivityAll },
                { key: 'books', label: t.overviewActivityBooks },
                { key: 'quotes', label: t.overviewActivityQuotes },
                { key: 'words', label: t.overviewActivityWords },
              ]}
              ariaLabel={t.overviewActivityTitle}
            />
            <div className="range-dropdown-wrap">
              <SortMenu
                current={view}
                onChange={setView}
                options={[
                  { key: 'week', label: t.overviewActivityWeek },
                  { key: 'month', label: t.overviewActivityMonth },
                ]}
                ariaLabel={t.overviewActivityTitle}
              />
            </div>
          </div>
          <div className="overview-activity-nav">
            <button type="button" className="overview-activity-nav-btn" disabled={!canPrev}
                    aria-label={t.overviewActivityPrev}
                    onClick={handlePrev}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <span className="overview-activity-week-label">{dateLabel}</span>
            <button type="button" className="overview-activity-nav-btn" disabled={!canNext}
                    aria-label={t.overviewActivityNext}
                    onClick={handleNext}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="overview-activity-divider" aria-hidden="true"/>
      {!hasAnyActivity ? (
        <div className="empty overview-card-empty">
          <OverviewIcon />
          <div className="empty-text">
            <p className="empty-title">{t.overviewActivityEmptyTitle}</p>
            <p className="empty-sub">{t.overviewActivityEmptySub}</p>
          </div>
        </div>
      ) : isMonth ? (
        <div className="overview-activity-grid" role="grid">
          <div className="overview-activity-grid-head" aria-hidden="true">
            {initials.map((d, i) => (
              <span key={i} className="overview-activity-grid-day">{d}</span>
            ))}
          </div>
          <div className="overview-activity-grid-body">
            {monthData.cells.map((cell, i) => {
              if (!cell.inMonth) {
                return <div key={i} className="overview-activity-cube is-out" aria-hidden="true"/>;
              }
              const isToday = cell.dayMs === todayMs;
              const classes = [
                'overview-activity-cube',
                cell.count === 0 ? 'is-empty' : '',
                isToday ? 'is-today' : '',
                cell.count > 0 ? 'is-clickable' : '',
              ].filter(Boolean).join(' ');
              const label = `${cell.dayNum} · ${cell.count}`;
              const fillHeight = monthData.max > 0 ? Math.max(8, (cell.count / monthData.max) * 100) : 0;
              return cell.count > 0 ? (
                <button key={i} type="button" className={classes}
                        onClick={() => handleCubeClick(cell)}
                        aria-label={label}>
                  <span className="overview-activity-cube-num">{cell.dayNum}</span>
                  {metric === 'all' ? (
                    <div className="overview-activity-fill is-stacked">
                      <div className={`overview-activity-seg overview-activity-seg--books${cell.books > 0 ? '' : ' is-empty'}`}
                           style={cell.books > 0 ? { height: `${Math.max(8, (cell.books / monthData.segMax) * 100)}%` } : undefined}>
                        {cell.books > 0 && <span className="overview-activity-count">{cell.books}</span>}
                      </div>
                      <div className={`overview-activity-seg overview-activity-seg--quotes${cell.quotes > 0 ? '' : ' is-empty'}`}
                           style={cell.quotes > 0 ? { height: `${Math.max(8, (cell.quotes / monthData.segMax) * 100)}%` } : undefined}>
                        {cell.quotes > 0 && <span className="overview-activity-count">{cell.quotes}</span>}
                      </div>
                      <div className={`overview-activity-seg overview-activity-seg--words${cell.words > 0 ? '' : ' is-empty'}`}
                           style={cell.words > 0 ? { height: `${Math.max(8, (cell.words / monthData.segMax) * 100)}%` } : undefined}>
                        {cell.words > 0 && <span className="overview-activity-count">{cell.words}</span>}
                      </div>
                    </div>
                  ) : (
                    <div className={`overview-activity-fill is-${metric}`} style={{ height: `${fillHeight}%` }}>
                      <span className="overview-activity-count">{cell.count}</span>
                    </div>
                  )}
                  <div className="overview-activity-cube-counter-wrap">
                    <span className="overview-activity-cube-counter">{cell.count}</span>
                  </div>
                </button>
              ) : (
                <div key={i} className={classes} aria-label={label}>
                  <span className="overview-activity-cube-num">{cell.dayNum}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="overview-activity-bars">
          {weekData.days.map((d, i) => {
            const ratio = weekData.max > 0 ? d.count / weekData.max : 0;
            const fillHeight = Math.max(8, ratio * 100);
            const Wrap = d.count > 0 ? 'button' : 'div';
            const wrapProps = d.count > 0 ? {
              type: 'button',
              className: 'overview-activity-col is-clickable',
              onClick: () => setSelectedDay(d.dayMs),
              'aria-label': `${initials[i]} · ${d.count}`,
            } : {
              className: 'overview-activity-col',
            };
            return (
              <Wrap key={i} {...wrapProps}>
                <span className="overview-activity-day">{initials[i]}</span>
                <div className="overview-activity-track" aria-hidden="true">
                  {d.count === 0 ? (
                    <div className="overview-activity-dot"/>
                  ) : metric === 'all' ? (
                    <div className="overview-activity-fill is-stacked">
                      <div className={`overview-activity-seg overview-activity-seg--books${d.books > 0 ? '' : ' is-empty'}`}
                           style={d.books > 0 ? { height: `${Math.max(8, (d.books / weekData.segMax) * 100)}%` } : undefined}>
                        {d.books > 0 && <span className="overview-activity-count">{d.books}</span>}
                      </div>
                      <div className={`overview-activity-seg overview-activity-seg--quotes${d.quotes > 0 ? '' : ' is-empty'}`}
                           style={d.quotes > 0 ? { height: `${Math.max(8, (d.quotes / weekData.segMax) * 100)}%` } : undefined}>
                        {d.quotes > 0 && <span className="overview-activity-count">{d.quotes}</span>}
                      </div>
                      <div className={`overview-activity-seg overview-activity-seg--words${d.words > 0 ? '' : ' is-empty'}`}
                           style={d.words > 0 ? { height: `${Math.max(8, (d.words / weekData.segMax) * 100)}%` } : undefined}>
                        {d.words > 0 && <span className="overview-activity-count">{d.words}</span>}
                      </div>
                    </div>
                  ) : (
                    <div className={`overview-activity-fill is-${metric}`} style={{ height: `${fillHeight}%` }}>
                      <span className="overview-activity-count">{d.count}</span>
                    </div>
                  )}
                  {d.count > 0 && (
                    <div className="overview-activity-cube-counter-wrap">
                      <span className="overview-activity-cube-counter">{d.count}</span>
                    </div>
                  )}
                </div>
              </Wrap>
            );
          })}
        </div>
      )}
      <div className="overview-activity-divider" aria-hidden="true"/>
      <div className="overview-activity-legend">
        <span className="overview-activity-legend-item">
          <span className="overview-activity-legend-dot is-books" aria-hidden="true"/>
          <span>{t.overviewActivityBooks}</span>
        </span>
        <span className="overview-activity-legend-item">
          <span className="overview-activity-legend-dot is-quotes" aria-hidden="true"/>
          <span>{t.overviewActivityQuotes}</span>
        </span>
        <span className="overview-activity-legend-item">
          <span className="overview-activity-legend-dot is-words" aria-hidden="true"/>
          <span>{t.overviewActivityWords}</span>
        </span>
      </div>
      <ActivityDayPanel
        open={selectedDay !== null}
        dayMs={selectedDay}
        owned={owned}
        quotes={quotes}
        words={words}
        onClose={() => setSelectedDay(null)}
        onOpenBook={onOpenBook}
        onOpenQuote={onOpenQuote}
        lang={lang}
        t={t}
      />
    </div>
  );
}
