"use client";
import { useMemo, useState } from "react";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getWeekStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dayOfWeek = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dayOfWeek);
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

export default function WeeklyActivityCard({ owned = [], quotes = [], words = [], lang = 'en', t }) {
  const [metric, setMetric] = useState('all');
  const [weekOffset, setWeekOffset] = useState(0);

  const earliestWeekOffset = useMemo(() => {
    const all = [
      ...owned.filter(b => b.finishedAt).map(b => b.finishedAt),
      ...quotes.map(q => q.createdAt).filter(Boolean),
      ...words.map(w => w.createdAt).filter(Boolean),
    ];
    if (all.length === 0) return 0;
    const earliestTs = Math.min(...all);
    const earliestWeek = getWeekStart(new Date(earliestTs)).getTime();
    const currentWeek = getWeekStart(new Date()).getTime();
    return -Math.round((currentWeek - earliestWeek) / (7 * MS_PER_DAY));
  }, [owned, quotes, words]);

  const weekData = useMemo(() => {
    const weekStart = getWeekStart(new Date());
    weekStart.setDate(weekStart.getDate() + weekOffset * 7);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(weekStart);
      dayStart.setDate(dayStart.getDate() + i);
      const dayMs = dayStart.getTime();
      const nextDayMs = dayMs + MS_PER_DAY;

      const books = owned.filter(b => b.finishedAt && b.finishedAt >= dayMs && b.finishedAt < nextDayMs).length;
      const quotesCount = quotes.filter(q => q.createdAt && q.createdAt >= dayMs && q.createdAt < nextDayMs).length;
      const wordsCount = words.filter(w => w.createdAt && w.createdAt >= dayMs && w.createdAt < nextDayMs).length;

      let count;
      if (metric === 'books') count = books;
      else if (metric === 'quotes') count = quotesCount;
      else if (metric === 'words') count = wordsCount;
      else count = books + quotesCount + wordsCount;

      days.push({ count, books, quotes: quotesCount, words: wordsCount });
    }
    const max = Math.max(0, ...days.map(d => d.count));
    const segMax = Math.max(0, ...days.flatMap(d => [d.books, d.quotes, d.words]));
    return { weekStart, days, max, segMax };
  }, [metric, weekOffset, owned, quotes, words]);

  const canPrev = weekOffset > earliestWeekOffset;
  const canNext = weekOffset < 0;
  const initials = dayInitials(lang);

  return (
    <div className="overview-card overview-activity">
      <div className="overview-card-head overview-activity-head">
        <div className="overview-activity-pills" role="tablist" aria-label={t.overviewActivityTitle}>
          <button type="button" role="tab" aria-selected={metric === 'all'}
                  className={`overview-activity-pill${metric === 'all' ? ' is-active' : ''}`}
                  onClick={() => setMetric('all')}>
            {t.overviewActivityAll}
          </button>
          <button type="button" role="tab" aria-selected={metric === 'books'}
                  className={`overview-activity-pill${metric === 'books' ? ' is-active' : ''}`}
                  onClick={() => setMetric('books')}>
            {t.overviewActivityBooks}
          </button>
          <button type="button" role="tab" aria-selected={metric === 'quotes'}
                  className={`overview-activity-pill${metric === 'quotes' ? ' is-active' : ''}`}
                  onClick={() => setMetric('quotes')}>
            {t.overviewActivityQuotes}
          </button>
          <button type="button" role="tab" aria-selected={metric === 'words'}
                  className={`overview-activity-pill${metric === 'words' ? ' is-active' : ''}`}
                  onClick={() => setMetric('words')}>
            {t.overviewActivityWords}
          </button>
        </div>
        <div className="overview-activity-nav">
          <button type="button" className="overview-activity-nav-btn" disabled={!canPrev}
                  aria-label={t.overviewActivityPrev}
                  onClick={() => canPrev && setWeekOffset(o => o - 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span className="overview-activity-week-label">{formatWeekRange(weekData.weekStart, lang)}</span>
          <button type="button" className="overview-activity-nav-btn" disabled={!canNext}
                  aria-label={t.overviewActivityNext}
                  onClick={() => canNext && setWeekOffset(o => o + 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="overview-activity-divider" aria-hidden="true"/>
      <div className="overview-activity-bars">
        {weekData.days.map((d, i) => {
          const ratio = weekData.max > 0 ? d.count / weekData.max : 0;
          const fillHeight = Math.max(8, ratio * 100);
          return (
            <div key={i} className="overview-activity-col">
              {metric !== 'all' && (
                <span className={`overview-activity-count${d.count > 0 ? '' : ' is-empty'}`}>
                  {d.count > 0 ? d.count : ''}
                </span>
              )}
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
                  <div className={`overview-activity-fill is-${metric}`} style={{ height: `${fillHeight}%` }}/>
                )}
              </div>
              <span className="overview-activity-day">{initials[i]}</span>
            </div>
          );
        })}
      </div>
      <div className="overview-activity-divider" aria-hidden="true"/>
      {metric === 'all' && (
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
      )}
    </div>
  );
}
