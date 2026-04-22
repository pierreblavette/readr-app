const PALETTE = [
  ['#FF6B6B','#FF8E8E'], ['#FF9F43','#FFBE7A'], ['#54A0FF','#74B9FF'],
  ['#5F27CD','#A29BFE'], ['#00D2D3','#48DBFB'], ['#FF6B81','#FF9FB2'],
  ['#1DD1A1','#55EFC4'], ['#FFC312','#F9CA24'], ['#C84B31','#E55039'],
  ['#2C3A47','#4A6FA5'], ['#227093','#40A8C4'], ['#B33771','#E15F87'],
];

export function coverColors(title) {
  let h = 0;
  for (let c of title) h = Math.imul(31, h) + c.charCodeAt(0) | 0;
  return PALETTE[Math.abs(h) % PALETTE.length];
}

export function coverLetter(title) {
  return title.replace(/^(L'|Le |La |Les |Un |Une |Des |The )/i, '').charAt(0).toUpperCase();
}

// Normalize uniformly-cased strings (ALL CAPS or all lowercase) to Title Case.
// Leaves mixed-case strings untouched (Gemini sometimes returns them correctly).
export function toTitleCase(str) {
  if (!str || typeof str !== 'string') return str;
  const trimmed = str.trim();
  const isMonoCase = trimmed === trimmed.toUpperCase() || trimmed === trimmed.toLowerCase();
  if (!isMonoCase) return trimmed;
  return trimmed.toLowerCase().replace(/(^|[\s\-'])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());
}

const CACHE_KEY = 'biblio-gbooks-v5';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

export function loadGBCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p.ts && Date.now() - p.ts < CACHE_TTL) return p.data || {};
    }
  } catch(e) {}
  return {};
}

export function saveGBCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: cache })); } catch(e) {}
}

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://readr-vision.pierreblavette.workers.dev';

export async function fetchBookCover(title, author, cache) {
  const key = `${title}||${author}`;
  if (cache[key] !== undefined) return cache[key];
  try {
    const url = `${WORKER_URL}/books?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const item = data.items?.[0]?.volumeInfo;
    const thumb = item?.imageLinks?.thumbnail?.replace('http:', 'https:') || null;
    const description = item?.description || null;
    return { thumb, year: item?.publishedDate?.slice(0, 4) || null, description };
  } catch(e) {
    return { thumb: null, year: null };
  }
}
