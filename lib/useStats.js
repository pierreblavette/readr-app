"use client";
import { useMemo } from "react";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function dayKey(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function todayKey() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function computeStreak(activityDays) {
  if (activityDays.size === 0) return { current: 0, best: 0 };

  const today = todayKey();
  const yesterday = today - MS_PER_DAY;

  let current = 0;
  let cursor = activityDays.has(today) ? today : (activityDays.has(yesterday) ? yesterday : null);
  while (cursor !== null && activityDays.has(cursor)) {
    current += 1;
    cursor -= MS_PER_DAY;
  }

  const sorted = [...activityDays].sort((a, b) => a - b);
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] - sorted[i - 1] === MS_PER_DAY) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  if (sorted.length === 0) best = 0;

  return { current, best };
}

function computeHeatmap(eventDays) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayOfWeek = (today.getDay() + 6) % 7;
  const lastColumnStart = today.getTime() - dayOfWeek * MS_PER_DAY;

  const weeks = [];
  for (let w = 51; w >= 0; w--) {
    const colStart = lastColumnStart - w * 7 * MS_PER_DAY;
    const days = [];
    for (let d = 0; d < 7; d++) {
      const dayTs = colStart + d * MS_PER_DAY;
      const inFuture = dayTs > today.getTime();
      const count = inFuture ? null : (eventDays.get(dayTs) || 0);
      days.push({ ts: dayTs, count });
    }
    weeks.push(days);
  }
  return weeks;
}

function pickRandom(arr, n) {
  if (arr.length <= n) return [...arr];
  const pool = [...arr];
  const out = [];
  while (out.length < n && pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}

export function useStats({ owned = [], quotes = [], words = [], readingGoal = null } = {}) {
  return useMemo(() => {
    const finishedBooks = owned.filter(b => b.finishedAt);
    const heroStats = {
      finished: finishedBooks.length,
      quotesCount: quotes.length,
      wordsCount: words.length,
    };

    const genreCounts = new Map();
    for (const b of finishedBooks) {
      const g = (b.genre || '').trim();
      if (!g) continue;
      genreCounts.set(g, (genreCounts.get(g) || 0) + 1);
    }
    const topGenres = [...genreCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));

    const streakDays = new Set();
    for (const b of owned) {
      if (b.startedAt) streakDays.add(dayKey(b.startedAt));
      if (b.finishedAt) streakDays.add(dayKey(b.finishedAt));
    }
    for (const q of quotes) if (q.createdAt) streakDays.add(dayKey(q.createdAt));
    for (const w of words) if (w.createdAt) streakDays.add(dayKey(w.createdAt));
    const streak = computeStreak(streakDays);

    const eventDays = new Map();
    function bump(ts) {
      if (!ts) return;
      const k = dayKey(ts);
      eventDays.set(k, (eventDays.get(k) || 0) + 1);
    }
    for (const b of owned) {
      bump(b.startedAt);
      bump(b.finishedAt);
    }
    for (const q of quotes) bump(q.createdAt);
    for (const w of words) bump(w.createdAt);
    const heatmap = computeHeatmap(eventDays);

    const heatmapMax = [...eventDays.values()].reduce((m, v) => v > m ? v : m, 0);

    const quotesSpotlight = pickRandom(quotes, 3);

    const currentYear = new Date().getFullYear();
    const goal = readingGoal && readingGoal.year === currentYear ? readingGoal : null;
    const finishedThisYear = finishedBooks.filter(b => {
      const y = new Date(b.finishedAt).getFullYear();
      return y === currentYear;
    }).length;
    const goalState = {
      year: currentYear,
      target: goal?.count ?? 0,
      progress: finishedThisYear,
      ratio: goal?.count ? Math.min(1, finishedThisYear / goal.count) : 0,
      isSet: !!goal?.count,
    };

    return {
      heroStats,
      topGenres,
      streak,
      heatmap,
      heatmapMax,
      quotesSpotlight,
      goal: goalState,
    };
  }, [owned, quotes, words, readingGoal]);
}
