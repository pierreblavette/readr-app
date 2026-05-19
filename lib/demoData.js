const DAY = 24 * 60 * 60 * 1000;
const cover = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

function makeBooks(now) {
  const books = [
    { isbn: "9780441172719", title: "Dune", author: "Frank Herbert", year: "1965", genre: "Sci-fi", state: "finished", daysAgoFinish: 12, daysAgoStart: 38, rating: 5, note: "Politique, écologie, mysticisme. Best of 2026 so far." },
    { isbn: "9780547928227", title: "The Hobbit", author: "J.R.R. Tolkien", year: "1937", genre: "Fantasy", state: "finished", daysAgoFinish: 24, daysAgoStart: 41, rating: 4 },
    { isbn: "9780451524935", title: "1984", author: "George Orwell", year: "1949", genre: "Dystopia", state: "finished", daysAgoFinish: 5, daysAgoStart: 19, rating: 5, note: "Plus pertinent qu'en 2010." },
    { isbn: "9780593135204", title: "Project Hail Mary", author: "Andy Weir", year: "2021", genre: "Sci-fi", state: "reading", daysAgoStart: 8 },
    { isbn: "9780062316097", title: "Sapiens", author: "Yuval Noah Harari", year: "2014", genre: "Non-fiction", state: "reading", daysAgoStart: 14 },
    { isbn: "9780756404741", title: "The Name of the Wind", author: "Patrick Rothfuss", year: "2007", genre: "Fantasy", state: "reading", daysAgoStart: 3 },
    { isbn: "9780135957059", title: "The Pragmatic Programmer", author: "David Thomas, Andrew Hunt", year: "1999", genre: "Tech", state: "finished", daysAgoFinish: 45, daysAgoStart: 60, rating: 5 },
    { isbn: "9780553293357", title: "Foundation", author: "Isaac Asimov", year: "1951", genre: "Sci-fi", state: "finished", daysAgoFinish: 55, daysAgoStart: 70, rating: 5 },
    { isbn: "9780735211292", title: "Atomic Habits", author: "James Clear", year: "2018", genre: "Self-help", state: "finished", daysAgoFinish: 65, daysAgoStart: 75, rating: 4 },
    { isbn: "9780441569595", title: "Neuromancer", author: "William Gibson", year: "1984", genre: "Sci-fi", state: "finished", daysAgoFinish: 80, daysAgoStart: 95, rating: 4 },
    { isbn: "9780553283686", title: "Hyperion", author: "Dan Simmons", year: "1989", genre: "Sci-fi", state: "finished", daysAgoFinish: 100, daysAgoStart: 120, rating: 5, note: "The Canterbury Tales en sci-fi. Magistral." },
    { isbn: "9781635575637", title: "Piranesi", author: "Susanna Clarke", year: "2020", genre: "Fantasy", state: "finished", daysAgoFinish: 30, daysAgoStart: 40, rating: 4 },
    { isbn: "9780375704024", title: "Norwegian Wood", author: "Haruki Murakami", year: "1987", genre: "Fiction", state: "finished", daysAgoFinish: 110, daysAgoStart: 125, rating: 4 },
    { isbn: "9780399590504", title: "Educated", author: "Tara Westover", year: "2018", genre: "Memoir", state: "finished", daysAgoFinish: 130, daysAgoStart: 145, rating: 5 },
    { isbn: "9782070360024", title: "L'Étranger", author: "Albert Camus", year: "1942", genre: "Classique", state: "finished", daysAgoFinish: 150, daysAgoStart: 158, rating: 5 },
  ];

  const wishlistRaw = [
    { isbn: "9780765382030", title: "The Three-Body Problem", author: "Liu Cixin", year: "2008", genre: "Sci-fi" },
    { isbn: "9781449373320", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", year: "2017", genre: "Tech" },
    { isbn: "9780553380958", title: "Snow Crash", author: "Neal Stephenson", year: "1992", genre: "Sci-fi" },
    { isbn: "9780316452502", title: "Children of Time", author: "Adrian Tchaikovsky", year: "2015", genre: "Sci-fi" },
    { isbn: "9780441478125", title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", year: "1969", genre: "Sci-fi" },
    { isbn: "9780374104092", title: "Annihilation", author: "Jeff VanderMeer", year: "2014", genre: "Sci-fi" },
    { isbn: "9780571364879", title: "Klara and the Sun", author: "Kazuo Ishiguro", year: "2021", genre: "Fiction" },
    { isbn: "9781524763138", title: "Becoming", author: "Michelle Obama", year: "2018", genre: "Memoir" },
    { isbn: "9781400079278", title: "Kafka on the Shore", author: "Haruki Murakami", year: "2002", genre: "Fiction" },
    { isbn: "9782253096337", title: "Les Misérables", author: "Victor Hugo", year: "1862", genre: "Classique" },
  ];

  let id = now;
  const owned = books.map((b, i) => {
    const bookId = id++;
    const startedAt = b.daysAgoStart != null ? now - b.daysAgoStart * DAY : null;
    const finishedAt = b.daysAgoFinish != null ? now - b.daysAgoFinish * DAY : null;
    return {
      id: bookId,
      title: b.title,
      author: b.author,
      year: b.year,
      genre: b.genre,
      cover: cover(b.isbn),
      startedAt,
      finishedAt,
      rating: b.rating ?? null,
      note: b.note ?? null,
      addedToLibraryAt: startedAt ? startedAt - 2 * DAY : now - (60 + i) * DAY,
    };
  });

  const wishlist = wishlistRaw.map((b, i) => ({
    id: id++,
    title: b.title,
    author: b.author,
    year: b.year,
    genre: b.genre,
    cover: cover(b.isbn),
    startedAt: null,
    finishedAt: null,
    rating: null,
    note: null,
  }));

  return { owned, wishlist, nextId: id };
}

function makeQuotes(owned, now, startId) {
  const quotesByTitle = {
    "Dune": [
      { text: "Fear is the mind-killer. Fear is the little-death that brings total obliteration.", page: "12" },
      { text: "He who controls the spice controls the universe.", page: "187" },
      { text: "Le mystère de la vie n'est pas un problème à résoudre, mais une réalité à expérimenter.", page: "342" },
    ],
    "1984": [
      { text: "Big Brother is watching you.", page: "3" },
      { text: "War is peace. Freedom is slavery. Ignorance is strength.", page: "18" },
      { text: "Who controls the past controls the future. Who controls the present controls the past.", page: "32" },
    ],
    "The Hobbit": [
      { text: "In a hole in the ground there lived a hobbit.", page: "1" },
      { text: "It's a dangerous business, going out your door.", page: "82" },
    ],
    "Project Hail Mary": [
      { text: "I penetrated the outer cell membrane with a nanosyringe.", page: "44" },
    ],
    "Sapiens": [
      { text: "Money is the most universal and most efficient system of mutual trust ever devised.", page: "201" },
      { text: "We did not domesticate wheat. It domesticated us.", page: "86" },
    ],
    "The Pragmatic Programmer": [
      { text: "Don't live with broken windows.", page: "8" },
      { text: "Tracer bullets cut through dark and fog to show where you're aiming.", page: "61" },
    ],
    "Foundation": [
      { text: "Violence is the last refuge of the incompetent.", page: "67" },
    ],
    "Atomic Habits": [
      { text: "You do not rise to the level of your goals. You fall to the level of your systems.", page: "27" },
      { text: "Every action you take is a vote for the type of person you wish to become.", page: "38" },
    ],
    "Neuromancer": [
      { text: "The sky above the port was the color of television, tuned to a dead channel.", page: "1" },
    ],
    "Hyperion": [
      { text: "The world is full of doors, doorways, places between places.", page: "234" },
      { text: "Time, the wave that breaks on every shore.", page: "451" },
    ],
    "Piranesi": [
      { text: "The Beauty of the House is immeasurable; its Kindness infinite.", page: "5" },
    ],
    "Norwegian Wood": [
      { text: "Death is not the opposite of life, but a part of it.", page: "152" },
      { text: "Si tu ne penses qu'à toi, tu deviens fou.", page: "210" },
    ],
    "Educated": [
      { text: "You can love someone and still choose to say goodbye to them.", page: "315" },
    ],
    "L'Étranger": [
      { text: "Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas.", page: "1" },
      { text: "Comme si cette grande colère m'avait purgé du mal, vidé d'espoir.", page: "184" },
    ],
  };

  let id = startId;
  const quotes = [];
  let dayOffset = 0;
  for (const book of owned) {
    const quotesForBook = quotesByTitle[book.title];
    if (!quotesForBook) continue;
    for (const q of quotesForBook) {
      const createdAt = (book.finishedAt ?? book.startedAt ?? now) + dayOffset * DAY * 0.3;
      quotes.push({
        id: id++,
        text: q.text,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookId: book.id,
        page: q.page,
        saved: Math.random() < 0.35,
        createdAt: Math.min(createdAt, now),
      });
      dayOffset++;
    }
  }
  return { quotes, nextId: id };
}

function makeWords(now, startId) {
  const raw = [
    { word: "ephemeral", lang: "en", defs: [{ pos: "adj.", meaning: "Lasting for a very short time.", example: "An ephemeral moment of joy." }] },
    { word: "petrichor", lang: "en", defs: [{ pos: "n.", meaning: "The pleasant earthy smell after rain falls on dry soil." }] },
    { word: "sonder", lang: "en", defs: [{ pos: "n.", meaning: "The realization that each random passerby is living a life as vivid as your own." }] },
    { word: "limerence", lang: "en", defs: [{ pos: "n.", meaning: "A state of intense romantic infatuation." }] },
    { word: "saudade", lang: "en", defs: [{ pos: "n.", meaning: "A deep emotional state of nostalgic longing for an absent something." }] },
    { word: "ineffable", lang: "en", defs: [{ pos: "adj.", meaning: "Too great to be expressed in words." }] },
    { word: "serendipity", lang: "en", defs: [{ pos: "n.", meaning: "The occurrence of events by chance in a happy way." }] },
    { word: "ataraxia", lang: "en", defs: [{ pos: "n.", meaning: "A state of serene calmness, freedom from emotional disturbance." }] },
    { word: "flâner", lang: "fr", defs: [{ pos: "v.", meaning: "Se promener sans but, en prenant son temps." }] },
    { word: "dépaysement", lang: "fr", defs: [{ pos: "n.m.", meaning: "Sentiment de se retrouver dans un environnement totalement différent." }] },
    { word: "anachorète", lang: "fr", defs: [{ pos: "n.m.", meaning: "Personne qui se retire du monde pour vivre dans la solitude." }] },
    { word: "ressac", lang: "fr", defs: [{ pos: "n.m.", meaning: "Retour violent des vagues sur elles-mêmes après avoir frappé un obstacle." }] },
    { word: "atavisme", lang: "fr", defs: [{ pos: "n.m.", meaning: "Réapparition d'un caractère ancestral après plusieurs générations." }] },
    { word: "estran", lang: "fr", defs: [{ pos: "n.m.", meaning: "Zone littorale alternativement couverte et découverte par la marée." }] },
    { word: "lambiner", lang: "fr", defs: [{ pos: "v.", meaning: "Agir avec lenteur, traîner." }] },
  ];

  let id = startId;
  return raw.map((w, i) => ({
    id: id++,
    word: w.word,
    lang: w.lang,
    definitions: w.defs,
    createdAt: now - (i * 3 + Math.floor(Math.random() * 2)) * DAY,
  }));
}

function makeCollections(owned, startId) {
  const byTitle = Object.fromEntries(owned.map(b => [b.title, b.id]));
  const raw = [
    { name: "Sci-fi favorites", titles: ["Dune", "Foundation", "Hyperion", "Neuromancer", "Project Hail Mary"] },
    { name: "To re-read this year", titles: ["1984", "L'Étranger", "The Hobbit"] },
    { name: "Tech essentials", titles: ["The Pragmatic Programmer"] },
    { name: "Gift ideas", titles: ["Educated", "Norwegian Wood", "Piranesi", "Sapiens"] },
  ];

  let id = startId;
  return raw.map(c => ({
    id: id++,
    name: c.name,
    bookIds: c.titles.map(t => byTitle[t]).filter(Boolean),
  }));
}

export function loadDemoData() {
  const now = Date.now();
  const { owned, wishlist, nextId: idAfterBooks } = makeBooks(now);
  const { quotes, nextId: idAfterQuotes } = makeQuotes(owned, now, idAfterBooks);
  const words = makeWords(now, idAfterQuotes);
  const collections = makeCollections(owned, idAfterQuotes + words.length);
  const goal = { year: new Date(now).getFullYear(), count: 30 };

  try {
    localStorage.setItem("readr-data", JSON.stringify({ owned, wishlist }));
    localStorage.setItem("readr-quotes", JSON.stringify(quotes));
    localStorage.setItem("readr-dict-words", JSON.stringify(words));
    localStorage.setItem("readr-collections", JSON.stringify(collections));
    localStorage.setItem("readr-reading-goal", JSON.stringify(goal));
    return { ok: true, counts: { books: owned.length, wishlist: wishlist.length, quotes: quotes.length, words: words.length, collections: collections.length } };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export function wipeAllData() {
  const keys = [
    "readr-data",
    "readr-quotes",
    "readr-dict-words",
    "readr-collections",
    "readr-reading-goal",
    "readr-tab",
    "readr-active-collection",
    "readr-sidebar-collapsed",
  ];
  try {
    keys.forEach(k => localStorage.removeItem(k));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
