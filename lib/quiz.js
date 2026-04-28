const CACHE_KEY = 'biblio-quiz-v1';
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000;

export function loadQuizCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p.ts && Date.now() - p.ts < CACHE_TTL) return p.data || {};
    }
  } catch (e) {}
  return {};
}

export function saveQuizCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: cache })); } catch (e) {}
}

export function quizKey(title, author, lang) {
  return `${title}||${author || ''}||${lang}`;
}

export async function fetchQuiz(title, author, lang) {
  const res = await fetch('/api/vision/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, lang }),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data?.error || `quiz_error_${res.status}`);
    err.status = res.status;
    throw err;
  }
  return Array.isArray(data.questions) ? data.questions : [];
}
