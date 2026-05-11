"use client";
import { useMemo, useState } from "react";
import { useStats } from "@/lib/useStats";
import BookChip from "./BookChip";
import ReadingGoalModal from "./ReadingGoalModal";
import BookListPanel from "./BookListPanel";
import QuoteListPanel from "./QuoteListPanel";
import WordListPanel from "./WordListPanel";
import OverviewQuoteCard from "./OverviewQuoteCard";
import WeeklyActivityCard from "./WeeklyActivityCard";
import NowReadingSection from "./NowReadingSection";

export default function OverviewView({
  owned, quotes, words, wishlist = [],
  readingGoal, setReadingGoal,
  readingBooks = [],
  onOpenBook, onOpenQuote, onAddBook, onNavigate,
  onFinishReading, onAddQuoteFromBook, onCancelReading,
  lang, t,
}) {
  const stats = useStats({ owned, quotes, words, readingGoal });
  const [shuffleKey, setShuffleKey] = useState(0);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [lovedPanelOpen, setLovedPanelOpen] = useState(false);
  const [finishedPanelOpen, setFinishedPanelOpen] = useState(false);
  const [quotesPanelOpen, setQuotesPanelOpen] = useState(false);
  const [wordsPanelOpen, setWordsPanelOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState(null);
  const [activeAuthor, setActiveAuthor] = useState(null);

  const spotlightQuotes = useMemo(() => {
    if (quotes.length === 0) return [];
    const pool = [...quotes];
    const out = [];
    const n = Math.min(2, pool.length);
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
    if (finishedBooks.length === 0) onNavigate?.('owned');
    else if (finishedBooks.length === 1) onOpenBook?.(finishedBooks[0]);
    else setFinishedPanelOpen(true);
  }

  function handleGenreSelect(genre) {
    const matches = stats.finishedBooks.filter(b => (b.genre || '').trim() === genre.name);
    if (matches.length === 1) onOpenBook?.(matches[0]);
    else if (matches.length > 1) setActiveGenre(genre.name);
  }
  const activeGenreBooks = activeGenre
    ? stats.finishedBooks.filter(b => (b.genre || '').trim() === activeGenre)
    : [];

  function handleAuthorSelect(author) {
    const matches = stats.finishedBooks.filter(b => (b.author || '').trim() === author.name);
    if (matches.length === 1) onOpenBook?.(matches[0]);
    else if (matches.length > 1) setActiveAuthor(author.name);
  }
  const activeAuthorBooks = activeAuthor
    ? stats.finishedBooks.filter(b => (b.author || '').trim() === activeAuthor)
    : [];
  function handleHeroQuotes() {
    if (quotes.length === 0) onNavigate?.('quotes');
    else setQuotesPanelOpen(true);
  }
  function handleHeroWords() {
    if (words.length === 0) onNavigate?.('dictionary');
    else setWordsPanelOpen(true);
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
          icon={
            <span className="overview-hero-icon-chip">
              <svg className="overview-hero-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </span>
          }
          onClick={handleHeroBooks}
        />
        <HeroCard
          num={stats.heroStats.quotesCount}
          label={t.overviewHeroQuotes(stats.heroStats.quotesCount)}
          icon={
            <span className="overview-hero-icon-chip">
              <svg className="overview-hero-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 21c3 0 7-1 7-8V5H3v8h4"/>
                <path d="M14 21c3 0 7-1 7-8V5h-7v8h4"/>
              </svg>
            </span>
          }
          onClick={handleHeroQuotes}
        />
        <HeroCard
          num={stats.heroStats.wordsCount}
          label={t.overviewHeroWords(stats.heroStats.wordsCount)}
          icon={
            <span className="overview-hero-icon-chip">
              <svg className="overview-hero-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="17" y1="10" x2="3" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="17" y1="18" x2="3" y2="18"/>
              </svg>
            </span>
          }
          onClick={handleHeroWords}
        />
      </div>

      {readingBooks.length > 0 && (
        <div className="overview-card overview-now-reading">
          <div className="overview-card-head">
            <span className="panel-section-eyebrow">{t.nowReadingTitle}</span>
          </div>
          <NowReadingSection
            bare
            books={readingBooks}
            onOpenBook={onOpenBook}
            onFinish={onFinishReading}
            onAddQuote={onAddQuoteFromBook}
            onCancel={onCancelReading}
            lang={lang}
            t={t}
          />
        </div>
      )}

      <div className="overview-row-2">
        <ReadingGoalCard
          goal={stats.goal}
          onEdit={() => setGoalModalOpen(true)}
          t={t}
        />
        <StreakCard streak={stats.streak} t={t} />
      </div>

      <ReadingGoalModal
        open={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        onSetGoal={setReadingGoal}
        year={stats.goal.year}
        currentCount={stats.goal.target}
        t={t}
      />

      <WeeklyActivityCard owned={owned} quotes={quotes} words={words} lang={lang} t={t} />

      <TopGenresCard genres={stats.topGenres.slice(0, 5)} onSelect={handleGenreSelect} t={t} />

      <TopAuthorsCard authors={stats.topAuthors.slice(0, 5)} onSelect={handleAuthorSelect} t={t} />

      <MostLovedCard
        books={stats.mostLoved}
        onOpenBook={onOpenBook}
        onSeeMore={() => setLovedPanelOpen(true)}
        t={t}
      />

      <BookListPanel
        open={lovedPanelOpen}
        onClose={() => setLovedPanelOpen(false)}
        title={t.overviewLovedTitle}
        books={stats.mostLoved}
        onOpenBook={onOpenBook}
        t={t}
      />

      <BookListPanel
        open={finishedPanelOpen}
        onClose={() => setFinishedPanelOpen(false)}
        title={t.overviewFinishedListTitle}
        books={stats.finishedBooks}
        onOpenBook={onOpenBook}
        t={t}
      />

      <BookListPanel
        open={!!activeGenre}
        onClose={() => setActiveGenre(null)}
        title={activeGenre || ''}
        books={activeGenreBooks}
        onOpenBook={onOpenBook}
        t={t}
      />

      <BookListPanel
        open={!!activeAuthor}
        onClose={() => setActiveAuthor(null)}
        title={activeAuthor || ''}
        books={activeAuthorBooks}
        onOpenBook={onOpenBook}
        t={t}
      />

      <QuoteListPanel
        open={quotesPanelOpen}
        onClose={() => setQuotesPanelOpen(false)}
        quotes={quotes}
        resolveBook={resolveBook}
        onOpenQuote={onOpenQuote}
        onSeeAll={() => { setQuotesPanelOpen(false); onNavigate?.('quotes'); }}
        t={t}
      />

      <WordListPanel
        open={wordsPanelOpen}
        onClose={() => setWordsPanelOpen(false)}
        words={words}
        onSeeAll={() => { setWordsPanelOpen(false); onNavigate?.('dictionary'); }}
        t={t}
      />

      <QuotesSpotlightCard
        quotes={spotlightQuotes}
        totalQuotes={quotes.length}
        onOpen={onOpenQuote}
        onShuffle={() => setShuffleKey(k => k + 1)}
        canShuffle={quotes.length > 2}
        onSeeAll={() => onNavigate?.('quotes')}
        resolveBook={resolveBook}
        t={t}
      />

    </div>
  );
}

function HeroCard({ num, label, icon, onClick }) {
  return (
    <button type="button" className="overview-hero-card" onClick={onClick}>
      <span className="overview-hero-num">{num}</span>
      <span className="cell-row cell-row--sm cell-row--between overview-hero-label-row">
        <span className="cell-row cell-row--sm">
          {icon}
          <span className="overview-hero-label">{label}</span>
        </span>
        <svg className="sidebar-section-chevron overview-hero-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </span>
    </button>
  );
}

function ReadingGoalCard({ goal, onEdit, t }) {
  if (!goal.isSet) {
    return (
      <div className="overview-card overview-goal overview-goal--empty">
        <span className="panel-section-eyebrow">{t.overviewGoalTitle}</span>
        <span className="panel-quotes-empty">{t.overviewGoalEmptyHint}</span>
        <button type="button" className="add-btn" onClick={onEdit}>
          {t.overviewGoalEmpty}
        </button>
      </div>
    );
  }

  const achieved = goal.progress >= goal.target;
  return (
    <div className={`overview-card overview-goal${achieved ? ' overview-goal--achieved' : ''}`}>
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewGoalTitle}</span>
        <button type="button" className="overview-card-action" onClick={onEdit}>
          {t.overviewGoalEdit}
        </button>
      </div>
      <div className="overview-goal-meter">
        <div className="cell-row cell-row--md cell-row--between overview-goal-progress-row">
          <span className="overview-goal-num">{t.overviewGoalProgress(goal.progress, goal.target)}</span>
          <span className="overview-goal-pct">
            {achieved ? t.overviewGoalReached : `${Math.round(goal.ratio * 100)}%`}
          </span>
        </div>
        <div className="overview-goal-bar" aria-hidden="true">
          <div className="overview-goal-bar-fill" style={{ width: `${goal.ratio * 100}%` }} />
        </div>
        {!achieved && goal.pace && (
          <div className={`overview-goal-pace${goal.pace.delta >= 0 ? ' overview-goal-pace--ahead' : ' overview-goal-pace--behind'}`}>
            <span className="overview-goal-pace-projected">{t.overviewPaceProjected(goal.pace.projected, goal.target)}</span>
            <span className="overview-goal-pace-delta">{t.overviewPaceDelta(goal.pace.delta)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StreakCard({ streak, t }) {
  const hasAny = streak.current > 0 || streak.best > 0;
  // When no active streak but a best exists, surface the best as the
  // primary metric — losing it visually would erase past progress.
  const showBestAsPrimary = streak.current === 0 && streak.best > 0;
  return (
    <div className="overview-card overview-streak">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewStreakTitle}</span>
      </div>
      {!hasAny ? (
        <span className="panel-quotes-empty">{t.overviewStreakEmpty}</span>
      ) : (
        <div className="overview-streak-meter">
          <div className="overview-streak-body">
            {showBestAsPrimary ? (
              <span className="overview-streak-current">{t.overviewStreakBest(streak.best)}</span>
            ) : (
              <>
                <span className="overview-streak-current">{t.overviewStreakDays(streak.current)}</span>
                {streak.best > 0 && streak.best !== streak.current && (
                  <span className="overview-streak-best">{t.overviewStreakBest(streak.best)}</span>
                )}
              </>
            )}
          </div>
          <span className="panel-synopsis-placeholder">{t.overviewStreakHint}</span>
        </div>
      )}
    </div>
  );
}

function TopGenresCard({ genres, onSelect, t }) {
  return (
    <div className="overview-card overview-genres">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewGenresTitle}</span>
      </div>
      {genres.length === 0 ? (
        <span className="panel-quotes-empty">{t.overviewGenresEmpty}</span>
      ) : (
        <div className="overview-cloud">
          {genres.map(g => (
            <button
              key={g.name}
              type="button"
              className="overview-cloud-chip"
              onClick={() => onSelect?.(g)}
            >
              <span className="overview-cloud-chip-name">{g.name}</span>
              <span className="overview-cloud-chip-count">{g.count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TopAuthorsCard({ authors, onSelect, t }) {
  return (
    <div className="overview-card overview-authors">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewAuthorsTitle}</span>
      </div>
      {authors.length === 0 ? (
        <span className="panel-quotes-empty">{t.overviewAuthorsEmpty}</span>
      ) : (
        <div className="overview-cloud">
          {authors.map(a => (
            <button
              key={a.name}
              type="button"
              className="overview-cloud-chip"
              onClick={() => onSelect?.(a)}
            >
              <span className="overview-cloud-chip-name">{a.name}</span>
              <span className="overview-cloud-chip-count">{a.count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MostLovedCard({ books, onOpenBook, onSeeMore, t }) {
  if (books.length === 0) {
    return (
      <div className="overview-card overview-loved">
        <div className="overview-card-head">
          <span className="panel-section-eyebrow">{t.overviewLovedTitle}</span>
        </div>
        <span className="panel-quotes-empty">{t.overviewLovedEmpty}</span>
      </div>
    );
  }
  return (
    <div className="overview-card overview-loved">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewLovedTitle}</span>
      </div>
      <div className="overview-loved-list">
        {books.slice(0, 3).map(b => (
          <BookChip
            key={b.id}
            book={b}
            onClick={onOpenBook ? () => onOpenBook(b) : undefined}
            rating={b.rating}
          />
        ))}
      </div>
      {books.length > 3 && (
        <button
          type="button"
          className="btn btn-outline btn-md overview-loved-more"
          onClick={onSeeMore}
        >
          <span>{t.overviewLovedSeeMore}</span>
          <svg className="sidebar-section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}

function QuotesSpotlightCard({ quotes, totalQuotes, onOpen, onShuffle, canShuffle, onSeeAll, resolveBook, t }) {
  return (
    <div className="overview-card overview-quotes">
      <div className="overview-card-head">
        <span className="panel-section-eyebrow">{t.overviewQuotesTitle}</span>
        {canShuffle && (
          <button type="button" className="overview-card-action" onClick={onShuffle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 3h5v5" />
              <path d="M4 20L21 3" />
              <path d="M21 16v5h-5" />
              <path d="M15 15l6 6" />
              <path d="M4 4l5 5" />
            </svg>
            {t.overviewQuotesShuffle}
          </button>
        )}
      </div>
      {quotes.length === 0 ? (
        <span className="panel-quotes-empty">{t.overviewQuotesEmpty}</span>
      ) : (
        <div className="overview-quotes-list">
          {quotes.map(q => (
            <OverviewQuoteCard
              key={q.id}
              quote={q}
              book={resolveBook(q)}
              onOpen={onOpen}
              t={t}
            />
          ))}
        </div>
      )}
      {totalQuotes > 3 && (
        <button
          type="button"
          className="btn btn-outline btn-md overview-loved-more"
          onClick={onSeeAll}
        >
          <span>{t.overviewLovedSeeMore}</span>
          <svg className="sidebar-section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}

