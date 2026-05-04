"use client";
import { useMemo, useState } from "react";
import { useStats } from "@/lib/useStats";
import BookChip from "./BookChip";

export default function OverviewView({
  owned, quotes, words, wishlist = [],
  readingGoal, setReadingGoal,
  onOpenBook, onOpenQuote, onAddBook, onNavigate,
  t, lang,
}) {
  const stats = useStats({ owned, quotes, words, readingGoal });
  const [shuffleKey, setShuffleKey] = useState(0);

  const spotlightQuotes = useMemo(() => {
    if (quotes.length === 0) return [];
    const pool = [...quotes];
    const out = [];
    const n = Math.min(3, pool.length);
    while (out.length < n && pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      out.push(pool.splice(i, 1)[0]);
    }
    return out;
  }, [quotes, shuffleKey]);

  const finishedBooks = useMemo(() => owned.filter(b => b.finishedAt), [owned]);

  const isEmpty = owned.length === 0 && quotes.length === 0 && words.length === 0;

  if (isEmpty) {
    return (
      <div className="overview-empty">
        <h2 className="overview-empty-title">{t.overviewEmptyTitle}</h2>
        <p className="overview-empty-hint">{t.overviewEmptyHint}</p>
        <button className="btn-primary" onClick={onAddBook}>{t.btnAdd}</button>
      </div>
    );
  }

  function handleHeroBooks() {
    if (finishedBooks.length === 1) onOpenBook?.(finishedBooks[0]);
    else onNavigate?.('owned');
  }
  function handleHeroQuotes() {
    if (quotes.length === 1) onOpenQuote?.(quotes[0]);
    else onNavigate?.('quotes');
  }
  function handleHeroWords() {
    onNavigate?.('dictionary');
  }

  const allBooks = [...owned, ...wishlist];
  function resolveBook(q) {
    if (q.bookId) {
      const b = allBooks.find(x => x.id === q.bookId);
      if (b) return b;
    }
    const t = (q.bookTitle || '').toLowerCase().trim();
    const a = (q.bookAuthor || '').toLowerCase().trim();
    if (!t) return null;
    return allBooks.find(b =>
      (b.title || '').toLowerCase().trim() === t &&
      (b.author || '').toLowerCase().trim() === a
    ) || null;
  }

  return (
    <div className="overview-grid">

      <div className="overview-hero-row">
        <HeroCard
          num={stats.heroStats.finished}
          label={t.overviewHeroFinished(stats.heroStats.finished)}
          onClick={handleHeroBooks}
        />
        <HeroCard
          num={stats.heroStats.quotesCount}
          label={t.overviewHeroQuotes(stats.heroStats.quotesCount)}
          onClick={handleHeroQuotes}
        />
        <HeroCard
          num={stats.heroStats.wordsCount}
          label={t.overviewHeroWords(stats.heroStats.wordsCount)}
          onClick={handleHeroWords}
        />
      </div>

      <div className="overview-row-2">
        <ReadingGoalCard
          goal={stats.goal}
          onSetGoal={setReadingGoal}
          t={t}
        />
        <StreakCard streak={stats.streak} t={t} />
      </div>

      <HeatmapCard
        weeks={stats.heatmap}
        max={stats.heatmapMax}
        t={t}
        lang={lang}
      />

      <TopGenresCard genres={stats.topGenres} t={t} />

      <QuotesSpotlightCard
        quotes={spotlightQuotes}
        onOpen={onOpenQuote}
        onOpenBook={onOpenBook}
        onShuffle={() => setShuffleKey(k => k + 1)}
        canShuffle={quotes.length > 3}
        resolveBook={resolveBook}
        t={t}
      />

    </div>
  );
}

function HeroCard({ num, label, onClick }) {
  return (
    <button type="button" className="overview-hero-card" onClick={onClick}>
      <span className="overview-hero-num">{num}</span>
      <span className="cell-row cell-row--sm cell-row--between overview-hero-label-row">
        <span className="overview-hero-label">{label}</span>
        <svg className="sidebar-section-chevron overview-hero-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </span>
    </button>
  );
}

function ReadingGoalCard({ goal, onSetGoal, t }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goal.target ? String(goal.target) : '');

  function startEdit() {
    setDraft(goal.target ? String(goal.target) : '');
    setEditing(true);
  }

  function save() {
    const n = parseInt(draft, 10);
    if (Number.isFinite(n) && n > 0) {
      onSetGoal(goal.year, n);
      setEditing(false);
    }
  }

  function remove() {
    onSetGoal(goal.year, 0);
    setEditing(false);
  }

  if (!goal.isSet && !editing) {
    return (
      <div className="overview-card overview-goal overview-goal--empty">
        <span className="panel-section-eyebrow">{t.overviewGoalTitle}</span>
        <span className="panel-quotes-empty">{t.overviewGoalEmptyHint}</span>
        <button type="button" className="add-btn" onClick={startEdit}>
          {t.overviewGoalEmpty}
        </button>
      </div>
    );
  }

  return (
    <div className="overview-card overview-goal">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewGoalTitle}</span>
        {!editing && (
          <button type="button" className="overview-card-action" onClick={startEdit}>
            {t.overviewGoalEdit}
          </button>
        )}
      </div>

      {editing ? (
        <form
          className="overview-goal-form"
          onSubmit={e => { e.preventDefault(); save(); }}
          onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); setEditing(false); } }}
        >
          <input
            type="number"
            min="1"
            inputMode="numeric"
            className="overview-goal-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={t.overviewGoalPlaceholder}
            autoFocus
          />
          <div className="overview-goal-form-actions">
            <button type="button" className="modal-cancel" onClick={() => setEditing(false)}>
              {t.btnCancel}
            </button>
            {goal.isSet && (
              <button type="button" className="modal-cancel overview-goal-remove" onClick={remove}>
                {t.overviewGoalRemove}
              </button>
            )}
            <button type="submit" className="btn-primary overview-goal-save">{t.overviewGoalSave}</button>
          </div>
        </form>
      ) : (
        <>
          <div className="cell-row cell-row--md cell-row--between overview-goal-progress-row">
            <span className="overview-goal-num">{t.overviewGoalProgress(goal.progress, goal.target)}</span>
            <span className="overview-goal-pct">{Math.round(goal.ratio * 100)}%</span>
          </div>
          <div className="overview-goal-bar" aria-hidden="true">
            <div className="overview-goal-bar-fill" style={{ width: `${goal.ratio * 100}%` }} />
          </div>
        </>
      )}
    </div>
  );
}

function StreakCard({ streak, t }) {
  const hasAny = streak.current > 0 || streak.best > 0;
  return (
    <div className="overview-card overview-streak">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewStreakTitle}</span>
      </div>
      {!hasAny ? (
        <span className="overview-card-empty">{t.overviewStreakEmpty}</span>
      ) : (
        <>
          <div className="overview-streak-body">
            <span className="overview-streak-current">{t.overviewStreakDays(streak.current)}</span>
            {streak.best > 0 && streak.best !== streak.current && (
              <span className="overview-streak-best">{t.overviewStreakBest(streak.best)}</span>
            )}
          </div>
          <span className="panel-synopsis-placeholder">{t.overviewStreakHint}</span>
        </>
      )}
    </div>
  );
}

function HeatmapCard({ weeks, max, t, lang }) {
  const isEmpty = max === 0;

  if (isEmpty) {
    return (
      <div className="overview-card overview-heatmap">
        <div className="overview-card-head">
          <span className="panel-section-eyebrow">{t.overviewHeatmapTitle}</span>
        </div>
        <span className="overview-card-empty">{t.overviewHeatmapEmpty}</span>
      </div>
    );
  }

  const cellSize = 12;
  const cellGap = 3;
  const cols = weeks.length;
  const rows = 7;
  const w = cols * (cellSize + cellGap) - cellGap;
  const h = rows * (cellSize + cellGap) - cellGap;

  function level(count) {
    if (count == null) return -1;
    if (count === 0) return 0;
    const ratio = count / max;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  }

  function fmtDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div className="overview-card overview-heatmap">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewHeatmapTitle}</span>
      </div>
      <svg
        className="overview-heatmap-svg"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={t.overviewHeatmapTitle}
      >
        {weeks.map((days, ci) => days.map((d, ri) => {
          const lvl = level(d.count);
          if (lvl < 0) return null;
          return (
            <rect
              key={`${ci}-${ri}`}
              x={ci * (cellSize + cellGap)}
              y={ri * (cellSize + cellGap)}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              className={`overview-heatmap-cell overview-heatmap-cell--${lvl}`}
            >
              <title>{`${fmtDate(d.ts)}: ${d.count} ${d.count === 1 ? 'event' : 'events'}`}</title>
            </rect>
          );
        }))}
      </svg>
      <div className="overview-heatmap-legend">
        <span className="overview-heatmap-legend-label">{t.overviewHeatmapLegendLess}</span>
        <span className="overview-heatmap-cell-static overview-heatmap-cell--0" />
        <span className="overview-heatmap-cell-static overview-heatmap-cell--1" />
        <span className="overview-heatmap-cell-static overview-heatmap-cell--2" />
        <span className="overview-heatmap-cell-static overview-heatmap-cell--3" />
        <span className="overview-heatmap-cell-static overview-heatmap-cell--4" />
        <span className="overview-heatmap-legend-label">{t.overviewHeatmapLegendMore}</span>
      </div>
    </div>
  );
}

function TopGenresCard({ genres, t }) {
  return (
    <div className="overview-card overview-genres">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewGenresTitle}</span>
      </div>
      {genres.length === 0 ? (
        <span className="overview-card-empty">{t.overviewGenresEmpty}</span>
      ) : (
        <div className="overview-genres-cloud">
          {genres.map(g => (
            <span key={g.name} className="overview-genre-chip">
              <span className="overview-genre-chip-name">{g.name}</span>
              <span className="overview-genre-chip-count">{g.count}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function QuotesSpotlightCard({ quotes, onOpen, onOpenBook, onShuffle, canShuffle, resolveBook, t }) {
  return (
    <div className="overview-card overview-quotes">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewQuotesTitle}</span>
        {canShuffle && (
          <button type="button" className="overview-card-action" onClick={onShuffle}>
            {t.overviewQuotesShuffle}
          </button>
        )}
      </div>
      {quotes.length === 0 ? (
        <span className="overview-card-empty">{t.overviewQuotesEmpty}</span>
      ) : (
        <div className="overview-quotes-list">
          {quotes.map(q => (
            <SpotlightQuote
              key={q.id}
              quote={q}
              book={resolveBook(q)}
              onOpen={onOpen}
              onOpenBook={onOpenBook}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SpotlightQuote({ quote, book, onOpen, onOpenBook, t }) {
  function activate() { onOpen?.(quote); }
  function onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
  }
  const chipBook = book || { title: quote.bookTitle || '', author: quote.bookAuthor || '' };
  const handleChipClick = book && onOpenBook
    ? (e) => { e.stopPropagation(); onOpenBook(book); }
    : undefined;
  return (
    <div
      className="quote-card overview-quote-card"
      role="button"
      tabIndex={0}
      onClick={activate}
      onKeyDown={onKeyDown}
      aria-label={quote.bookTitle || t.overviewQuotesTitle}
    >
      <div className="quote-card-body">
        <div className="quote-card-text-wrap">
          <div className="quote-card-text">
            <span className="quote-mark">&ldquo;</span>
            {quote.text}
            <span className="quote-mark">&rdquo;</span>
          </div>
        </div>
      </div>
      {(book || quote.bookTitle) && (
        <>
          <div className="quote-card-divider" />
          <BookChip book={chipBook} onClick={handleChipClick} />
        </>
      )}
    </div>
  );
}
