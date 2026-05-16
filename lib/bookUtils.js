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

const CACHE_KEY = 'biblio-cover-v6';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

// Singleton in-memory mirror : lit le localStorage 1 fois au 1er accès,
// puis sert toutes les requêtes synchrones depuis la mémoire. Les writes
// updatent l'in-memory ET flush vers localStorage. Permet un lazy-init
// des composants sans flash null→cover (chaque consumer lit la cover
// déjà résolue au premier render).
let memCache = null;
function ensureCache() {
  if (memCache !== null) return memCache;
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null;
    if (raw) {
      const p = JSON.parse(raw);
      if (p.ts && Date.now() - p.ts < CACHE_TTL) memCache = p.data || {};
    }
  } catch(e) {}
  if (memCache === null) memCache = {};
  return memCache;
}

export function loadGBCache() {
  return ensureCache();
}

export function saveGBCache(cache) {
  memCache = cache;
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: cache })); } catch(e) {}
}

// Helpers synchrones pour lazy init dans les useState (rend la cover
// déjà connue dès le premier render — pas de flash placeholder→image).
export function getCoverFromCache(title, author) {
  const key = `${title}||${author}`;
  return ensureCache()[key];
}

export function setCoverInCache(title, author, value) {
  const c = ensureCache();
  const key = `${title}||${author}`;
  c[key] = value;
  saveGBCache(c);
  // Préchauffe le HTTP cache du browser dès qu'une nouvelle URL est connue.
  if (value?.thumb) preloadImage(value.thumb);
}

// Module-level Map qui garde les Image() instances vivantes — empêche le
// GC du browser de purger les bytes du HTTP cache (les Google Books URLs
// ont parfois des Cache-Control restrictives qui causent un re-fetch
// network à chaque remount d'<img>). Maintenir un Image() en mémoire
// force le browser à servir depuis le memory cache instantanément.
const liveImageRefs = new Map();
export function preloadImage(url) {
  if (!url || typeof Image === 'undefined' || liveImageRefs.has(url)) return;
  const img = new Image();
  img.src = url;
  liveImageRefs.set(url, img);
}

// Itère sur tout le cache et précharge chaque cover connue. À appeler
// 1 fois au mount initial de la page library (useEffect [], pas de deps).
export function preloadKnownCovers() {
  const c = ensureCache();
  for (const entry of Object.values(c)) {
    if (entry?.thumb) preloadImage(entry.thumb);
  }
}

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://readr-vision.pierreblavette.workers.dev';

export async function fetchBookCover(title, author, cache) {
  const key = `${title}||${author}`;
  if (cache[key] !== undefined) return cache[key];
  try {
    const url = `${WORKER_URL}/cover?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
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
