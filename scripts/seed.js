/* Readr — localStorage seed for QA across breakpoints.
 *
 * Usage :
 *   1. Open the Readr app in Chrome (npm run dev → http://localhost:3000).
 *   2. F12 → Console tab.
 *   3. Copy this entire file and paste into the console, then Enter.
 *   4. The page reloads with full content on every view :
 *      Overview / My Library / Wishlist / Collections / Quotes / Dictionary.
 *
 * What it generates :
 *   - 29 books owned (3 currently reading, ~16 finished with ratings + dates
 *     spread for the activity heatmap, ~9 not started)
 *   - 11 books wishlist
 *   - 5 collections (Best of 2024, Sci-Fi essentials, À relire,
 *     Non-fiction marquants, Classiques)
 *   - 24 quotes anchored to books (multiple quotes per book)
 *   - 25 dictionary words (mix EN/FR, varied letters for A-Z grouping)
 *   - reading goal 20 books/year, onboarding seen, tab = Overview
 *
 * QA coverage :
 *   - Authors filter : 3 Murakami + 2 McCarthy + 2 Ishiguro for multi-select.
 *   - Genres filter  : 7 distinct genres.
 *   - Rating filter  : ratings 3–5★ across finished books.
 *   - Reading status : reading / not-started / finished mix.
 *   - Activity heatmap : finishedAt spread across ~330 days.
 *   - Dictionary A–Z : words across many letters.
 */
(() => {
  const DAY = 86400000;
  const now = Date.now();
  let next = now;
  const id = () => ++next;

  // ─── BOOKS — owned ─────────────────────────────────────
  const owned = [
    // Currently reading (3 — max allowed by the app)
    { id: id(), title: 'Wellness', author: 'Nathan Hill', year: '2023', genre: 'Fiction', cover: null, startedAt: now - 5*DAY },
    { id: id(), title: 'James', author: 'Percival Everett', year: '2024', genre: 'Fiction', cover: null, startedAt: now - 12*DAY },
    { id: id(), title: 'La mort du roi Tsongor', author: 'Laurent Gaudé', year: '2013', genre: null, cover: null, startedAt: now - 2*DAY },

    // Finished — varied ratings + finishedAt spread for the activity heatmap
    { id: id(), title: '1984', author: 'George Orwell', year: '1949', genre: 'Fiction', cover: null, startedAt: now - 90*DAY, finishedAt: now - 80*DAY, rating: 5, note: 'Une dystopie qui résonne encore.' },
    { id: id(), title: 'Sapiens', author: 'Yuval Noah Harari', year: '2011', genre: 'History', cover: null, startedAt: now - 75*DAY, finishedAt: now - 60*DAY, rating: 4, note: 'Synthèse brillante.' },
    { id: id(), title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', genre: 'Fiction', cover: null, startedAt: now - 55*DAY, finishedAt: now - 45*DAY, rating: 4, note: null },
    { id: id(), title: 'Dune', author: 'Frank Herbert', year: '1965', genre: 'Sci-Fi', cover: null, startedAt: now - 40*DAY, finishedAt: now - 28*DAY, rating: 5, note: 'Worldbuilding incroyable.' },
    { id: id(), title: 'Norwegian Wood', author: 'Haruki Murakami', year: '1987', genre: 'Fiction', cover: null, startedAt: now - 25*DAY, finishedAt: now - 18*DAY, rating: 5, note: null },
    { id: id(), title: 'Kafka on the Shore', author: 'Haruki Murakami', year: '2002', genre: 'Fiction', cover: null, startedAt: now - 16*DAY, finishedAt: now - 9*DAY, rating: 4, note: null },
    { id: id(), title: 'The Road', author: 'Cormac McCarthy', year: '2006', genre: 'Fiction', cover: null, startedAt: now - 110*DAY, finishedAt: now - 100*DAY, rating: 5, note: 'Sombre et marquant.' },
    { id: id(), title: 'Atomic Habits', author: 'James Clear', year: '2018', genre: 'Non-fiction', cover: null, startedAt: now - 7*DAY, finishedAt: now - 3*DAY, rating: 3, note: 'Utile mais répétitif.' },
    { id: id(), title: 'Klara and the Sun', author: 'Kazuo Ishiguro', year: '2021', genre: 'Fiction', cover: null, startedAt: now - 35*DAY, finishedAt: now - 22*DAY, rating: 4, note: null },
    { id: id(), title: 'Project Hail Mary', author: 'Andy Weir', year: '2021', genre: 'Sci-Fi', cover: null, startedAt: now - 200*DAY, finishedAt: now - 180*DAY, rating: 5, note: 'Page turner SF.' },
    { id: id(), title: 'Educated', author: 'Tara Westover', year: '2018', genre: 'Memoir', cover: null, startedAt: now - 160*DAY, finishedAt: now - 145*DAY, rating: 5, note: null },
    { id: id(), title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011', genre: 'Non-fiction', cover: null, startedAt: now - 130*DAY, finishedAt: now - 105*DAY, rating: 4, note: 'Dense mais éclairant.' },
    { id: id(), title: 'The Body Keeps the Score', author: 'Bessel van der Kolk', year: '2014', genre: 'Non-fiction', cover: null, startedAt: now - 95*DAY, finishedAt: now - 70*DAY, rating: 4, note: null },
    { id: id(), title: 'Beloved', author: 'Toni Morrison', year: '1987', genre: 'Fiction', cover: null, startedAt: now - 220*DAY, finishedAt: now - 210*DAY, rating: 3, note: null },
    { id: id(), title: 'Crime and Punishment', author: 'Fyodor Dostoyevsky', year: '1866', genre: 'Fiction', cover: null, startedAt: now - 300*DAY, finishedAt: now - 270*DAY, rating: 5, note: 'Chef-d\'œuvre.' },
    { id: id(), title: 'The Three-Body Problem', author: 'Liu Cixin', year: '2008', genre: 'Sci-Fi', cover: null, startedAt: now - 250*DAY, finishedAt: now - 230*DAY, rating: 4, note: null },
    { id: id(), title: 'Pride and Prejudice', author: 'Jane Austen', year: '1813', genre: 'Romance', cover: null, startedAt: now - 350*DAY, finishedAt: now - 320*DAY, rating: 4, note: null },

    // Not started yet
    { id: id(), title: 'Brave New World', author: 'Aldous Huxley', year: '1932', genre: 'Fiction', cover: null },
    { id: id(), title: 'Foundation', author: 'Isaac Asimov', year: '1951', genre: 'Sci-Fi', cover: null },
    { id: id(), title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: '1954', genre: 'Fantasy', cover: null },
    { id: id(), title: 'Never Let Me Go', author: 'Kazuo Ishiguro', year: '2005', genre: 'Fiction', cover: null },
    { id: id(), title: 'No Country for Old Men', author: 'Cormac McCarthy', year: '2005', genre: 'Fiction', cover: null },
    { id: id(), title: '1Q84', author: 'Haruki Murakami', year: '2009', genre: 'Fiction', cover: null },
    { id: id(), title: 'Mindset', author: 'Carol Dweck', year: '2006', genre: 'Non-fiction', cover: null },
    { id: id(), title: 'The Midnight Library', author: 'Matt Haig', year: '2020', genre: 'Fiction', cover: null },
    { id: id(), title: 'Becoming', author: 'Michelle Obama', year: '2018', genre: 'Memoir', cover: null },
  ];

  // ─── BOOKS — wishlist ─────────────────────────────────────
  const wishlist = [
    { id: id(), title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', year: '2022', genre: 'Fiction', cover: null },
    { id: id(), title: 'Sea of Tranquility', author: 'Emily St. John Mandel', year: '2022', genre: 'Sci-Fi', cover: null },
    { id: id(), title: 'A Little Life', author: 'Hanya Yanagihara', year: '2015', genre: 'Fiction', cover: null },
    { id: id(), title: 'The Overstory', author: 'Richard Powers', year: '2018', genre: 'Fiction', cover: null },
    { id: id(), title: 'Pachinko', author: 'Min Jin Lee', year: '2017', genre: 'Fiction', cover: null },
    { id: id(), title: 'Hamnet', author: 'Maggie O\'Farrell', year: '2020', genre: 'Fiction', cover: null },
    { id: id(), title: 'The Master and Margarita', author: 'Mikhail Bulgakov', year: '1967', genre: 'Fiction', cover: null },
    { id: id(), title: 'Stoner', author: 'John Williams', year: '1965', genre: 'Fiction', cover: null },
    { id: id(), title: 'The Goldfinch', author: 'Donna Tartt', year: '2013', genre: 'Fiction', cover: null },
    { id: id(), title: 'Demon Copperhead', author: 'Barbara Kingsolver', year: '2022', genre: 'Fiction', cover: null },
    { id: id(), title: 'Range', author: 'David Epstein', year: '2019', genre: 'Non-fiction', cover: null },
  ];

  // ─── COLLECTIONS ─────────────────────────────────────
  const collections = [
    { id: id(), name: 'Best of 2024', bookIds: [owned[3].id, owned[10].id, owned[12].id, owned[14].id] },
    { id: id(), name: 'Sci-Fi essentials', bookIds: [owned[6].id, owned[13].id, owned[18].id] },
    { id: id(), name: 'À relire', bookIds: [owned[8].id, owned[9].id, owned[16].id, owned[17].id] },
    { id: id(), name: 'Non-fiction marquants', bookIds: [owned[8].id, owned[14].id, owned[15].id] },
    { id: id(), name: 'Classiques', bookIds: [owned[3].id, owned[5].id, owned[17].id, owned[19].id] },
  ];

  // ─── QUOTES ─────────────────────────────────────
  const quotes = [
    { id: id(), text: 'Big Brother is watching you.', bookTitle: '1984', bookAuthor: 'George Orwell', bookId: owned[3].id, page: '12', createdAt: now - 78*DAY },
    { id: id(), text: 'War is peace. Freedom is slavery. Ignorance is strength.', bookTitle: '1984', bookAuthor: 'George Orwell', bookId: owned[3].id, page: '4', createdAt: now - 79*DAY },
    { id: id(), text: 'If you want a picture of the future, imagine a boot stamping on a human face — for ever. And remember that it is for ever. The face will always be there to be stamped upon. The heretic, the enemy of society, will always be there, so that he can be defeated and humiliated over again.', bookTitle: '1984', bookAuthor: 'George Orwell', bookId: owned[3].id, page: '256', createdAt: now - 80*DAY },
    { id: id(), text: 'History is something very few people have been doing while everyone else was ploughing fields and carrying water buckets. We may have invented agriculture, but the wheat domesticated us, not the other way around: it tied us to the land, multiplied our worries, and gave us very little in return.', bookTitle: 'Sapiens', bookAuthor: 'Yuval Noah Harari', bookId: owned[4].id, page: '110', createdAt: now - 65*DAY },
    { id: id(), text: 'So we beat on, boats against the current, borne back ceaselessly into the past. Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that\'s no matter — tomorrow we will run faster, stretch out our arms farther.', bookTitle: 'The Great Gatsby', bookAuthor: 'F. Scott Fitzgerald', bookId: owned[5].id, page: '180', createdAt: now - 46*DAY },
    { id: id(), text: 'Fear is the mind-killer.', bookTitle: 'Dune', bookAuthor: 'Frank Herbert', bookId: owned[6].id, page: '8', createdAt: now - 30*DAY },
    { id: id(), text: 'I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past, I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.', bookTitle: 'Dune', bookAuthor: 'Frank Herbert', bookId: owned[6].id, page: '8', createdAt: now - 29*DAY },
    { id: id(), text: 'Death is not the opposite of life, but a part of it.', bookTitle: 'Norwegian Wood', bookAuthor: 'Haruki Murakami', bookId: owned[7].id, page: '32', createdAt: now - 19*DAY },
    { id: id(), text: 'If you only read the books that everyone else is reading, you can only think what everyone else is thinking. That\'s the world of the average person. Real reading is private — a conversation between the reader and a long line of strangers who chose to speak through ink.', bookTitle: 'Norwegian Wood', bookAuthor: 'Haruki Murakami', bookId: owned[7].id, page: '60', createdAt: now - 20*DAY },
    { id: id(), text: 'Memories warm you up from the inside. But they also tear you apart.', bookTitle: 'Kafka on the Shore', bookAuthor: 'Haruki Murakami', bookId: owned[8].id, page: '147', createdAt: now - 10*DAY },
    { id: id(), text: 'You don\'t have to be perfect to be a work of art. Sometimes it\'s the cracks that catch the light — the broken parts that make the whole thing breathe. People are like that too: more interesting where they\'ve been worn down, less so where they\'ve been polished.', bookTitle: 'Kafka on the Shore', bookAuthor: 'Haruki Murakami', bookId: owned[8].id, page: '210', createdAt: now - 11*DAY },
    { id: id(), text: 'Habits are the compound interest of self-improvement.', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', bookId: owned[10].id, page: '15', createdAt: now - 4*DAY },
    { id: id(), text: 'You do not rise to the level of your goals. You fall to the level of your systems. Goals are about the results you want to achieve. Systems are about the processes that lead to those results. If you want better outcomes, then forget about setting goals. Focus on your system instead.', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', bookId: owned[10].id, page: '27', createdAt: now - 5*DAY },
    { id: id(), text: 'The Sun gives us nourishment, and so we honour the Sun.', bookTitle: 'Klara and the Sun', bookAuthor: 'Kazuo Ishiguro', bookId: owned[11].id, page: '88', createdAt: now - 23*DAY },
    { id: id(), text: 'Some humans want a friend, but they don\'t want a friend who can see them too clearly. Perhaps that\'s why they keep us — the AFs — close enough to listen but distant enough to forget. Watching them, I began to understand that loneliness is sometimes a choice, not a condition.', bookTitle: 'Klara and the Sun', bookAuthor: 'Kazuo Ishiguro', bookId: owned[11].id, page: '195', createdAt: now - 24*DAY },
    { id: id(), text: 'I had been thinking about it. About being a hero. About what that word even means when there\'s no one left to witness the act. The universe doesn\'t hand out medals; it just keeps turning. And maybe that\'s the truest test — to do the right thing in an empty room.', bookTitle: 'Project Hail Mary', bookAuthor: 'Andy Weir', bookId: owned[12].id, page: '402', createdAt: now - 185*DAY },
    { id: id(), text: 'You can love someone and still choose to say goodbye to them. You can miss a person every day and still be glad they\'re no longer a part of your life. The hardest lesson I learned was this: love is not always a reason to stay.', bookTitle: 'Educated', bookAuthor: 'Tara Westover', bookId: owned[13].id, page: '329', createdAt: now - 150*DAY },
    { id: id(), text: 'Nothing in life is as important as you think it is, while you are thinking about it. The mind has a way of inflating the present moment, of pressing it against the edges of our perception until everything else seems to fade. But step back a year, and you\'ll find most of what felt urgent has dissolved into footnotes.', bookTitle: 'Thinking, Fast and Slow', bookAuthor: 'Daniel Kahneman', bookId: owned[14].id, page: '402', createdAt: now - 108*DAY },
    { id: id(), text: 'The body always keeps the score.', bookTitle: 'The Body Keeps the Score', bookAuthor: 'Bessel van der Kolk', bookId: owned[15].id, page: '88', createdAt: now - 80*DAY },
    { id: id(), text: 'Freeing yourself was one thing; claiming ownership of that freed self was another. To be free is not merely to cast off your chains, but to live in a way that respects and enhances the freedom of others. A new dawn breaks not just by leaving the past behind, but by daring to imagine a different future.', bookTitle: 'Beloved', bookAuthor: 'Toni Morrison', bookId: owned[16].id, page: '95', createdAt: now - 215*DAY },
    { id: id(), text: 'To live is to suffer, to survive is to find some meaning in the suffering. Pain is not the absence of grace — it is sometimes the soil in which grace grows. Those who have walked through darkness know things the bright daytime cannot teach. They carry a quiet that the comfortable will never quite recognize.', bookTitle: 'Crime and Punishment', bookAuthor: 'Fyodor Dostoyevsky', bookId: owned[17].id, page: '120', createdAt: now - 280*DAY },
    { id: id(), text: 'In the universe, an idea that goes against natural laws is doomed. Civilizations may rise and fall, technologies may dazzle and decay, but the cold equations of physics remain. To survive the long dark of cosmic time, a species must learn to listen — not to speak, not to broadcast, but to listen quietly and act with patience.', bookTitle: 'The Three-Body Problem', bookAuthor: 'Liu Cixin', bookId: owned[18].id, page: '305', createdAt: now - 235*DAY },
    { id: id(), text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.', bookTitle: 'Pride and Prejudice', bookAuthor: 'Jane Austen', bookId: owned[19].id, page: '1', createdAt: now - 330*DAY },
    { id: id(), text: 'Carry the fire.', bookTitle: 'The Road', bookAuthor: 'Cormac McCarthy', bookId: owned[9].id, page: '278', createdAt: now - 102*DAY },
  ];

  // ─── DICTIONARY — saved words ─────────────────────────────────────
  const words = [
    { id: id(), word: 'ephemeral',    lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Lasting for a very short time.', example: 'Ephemeral pleasures of childhood.' }], createdAt: now - 30*DAY },
    { id: id(), word: 'sonder',       lang: 'en', definitions: [{ pos: 'noun',         meaning: 'The realization that each random passerby is living a life as vivid and complex as your own.' }], createdAt: now - 22*DAY },
    { id: id(), word: 'limerence',    lang: 'en', definitions: [{ pos: 'noun',         meaning: 'A state of involuntary obsession with another person.', example: 'She fell into limerence during the summer.' }], createdAt: now - 18*DAY },
    { id: id(), word: 'mellifluous',  lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Sweet or musical; pleasant to hear.' }], createdAt: now - 12*DAY },
    { id: id(), word: 'petrichor',    lang: 'en', definitions: [{ pos: 'noun',         meaning: 'A pleasant smell that frequently accompanies the first rain after a long period of dry weather.' }], createdAt: now - 10*DAY },
    { id: id(), word: 'serendipity',  lang: 'en', definitions: [{ pos: 'noun',         meaning: 'The occurrence of events by chance in a happy or beneficial way.' }], createdAt: now - 8*DAY },
    { id: id(), word: 'ineffable',    lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Too great to be expressed in words.' }], createdAt: now - 6*DAY },
    { id: id(), word: 'apricity',     lang: 'en', definitions: [{ pos: 'noun',         meaning: 'The warmth of the sun in winter.' }], createdAt: now - 4*DAY },
    { id: id(), word: 'numinous',     lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Having a strong spiritual quality; indicating the presence of divinity.' }], createdAt: now - 90*DAY },
    { id: id(), word: 'quotidian',    lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Of or occurring every day; daily; ordinary.' }], createdAt: now - 70*DAY },
    { id: id(), word: 'défenestration', lang: 'fr', definitions: [{ pos: 'nom féminin', meaning: 'Action de jeter quelqu\'un ou quelque chose par une fenêtre.' }], createdAt: now - 60*DAY },
    { id: id(), word: 'velléité',     lang: 'fr', definitions: [{ pos: 'nom féminin',  meaning: 'Intention faible, qui n\'aboutit pas à une décision.', example: 'Il a eu la velléité de partir mais n\'a rien fait.' }], createdAt: now - 50*DAY },
    { id: id(), word: 'flâner',       lang: 'fr', definitions: [{ pos: 'verbe',        meaning: 'Se promener sans hâte, au hasard.' }], createdAt: now - 40*DAY },
    { id: id(), word: 'nonchalance',  lang: 'fr', definitions: [{ pos: 'nom féminin',  meaning: 'Caractère d\'une personne sans ardeur, sans empressement.' }], createdAt: now - 35*DAY },
    { id: id(), word: 'crépuscule',   lang: 'fr', definitions: [{ pos: 'nom masculin', meaning: 'Lumière qui suit le coucher du soleil ou précède son lever.' }], createdAt: now - 28*DAY },
    { id: id(), word: 'azur',         lang: 'fr', definitions: [{ pos: 'nom masculin', meaning: 'Couleur bleue intense du ciel.', example: 'L\'azur sans nuage de la Méditerranée.' }], createdAt: now - 20*DAY },
    { id: id(), word: 'mansuétude',   lang: 'fr', definitions: [{ pos: 'nom féminin',  meaning: 'Indulgence envers une faute commise.' }], createdAt: now - 15*DAY },
    { id: id(), word: 'palimpseste',  lang: 'fr', definitions: [{ pos: 'nom masculin', meaning: 'Parchemin manuscrit dont la première écriture a été grattée pour qu\'on puisse écrire un nouveau texte.' }], createdAt: now - 9*DAY },
    { id: id(), word: 'errance',      lang: 'fr', definitions: [{ pos: 'nom féminin',  meaning: 'Action d\'aller çà et là, à l\'aventure.' }], createdAt: now - 3*DAY },
    { id: id(), word: 'incandescent', lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Emitting light as a result of being heated.' }], createdAt: now - 95*DAY },
    { id: id(), word: 'beguile',      lang: 'en', definitions: [{ pos: 'verb',         meaning: 'Charm or enchant (someone), sometimes in a deceptive way.' }], createdAt: now - 100*DAY },
    { id: id(), word: 'wistful',      lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Having or showing a feeling of vague or regretful longing.' }], createdAt: now - 110*DAY },
    { id: id(), word: 'gossamer',     lang: 'en', definitions: [{ pos: 'noun',         meaning: 'A fine, filmy substance; very fine or delicate.' }], createdAt: now - 120*DAY },
    { id: id(), word: 'halcyon',      lang: 'en', definitions: [{ pos: 'adjective',    meaning: 'Denoting a period of time in the past that was idyllically happy and peaceful.' }], createdAt: now - 130*DAY },
    { id: id(), word: 'zephyr',       lang: 'en', definitions: [{ pos: 'noun',         meaning: 'A soft gentle breeze.' }], createdAt: now - 140*DAY },
  ];

  // ─── PERSIST ─────────────────────────────────────
  localStorage.setItem('readr-data',            JSON.stringify({ owned, wishlist }));
  localStorage.setItem('readr-collections',     JSON.stringify(collections));
  localStorage.setItem('readr-quotes',          JSON.stringify(quotes));
  localStorage.setItem('readr-dict-words',      JSON.stringify(words));
  localStorage.setItem('readr-reading-goal',    '20');
  localStorage.setItem('readr-onboarding-seen', '1');
  localStorage.setItem('readr-tab',             'overview');

  console.log('%c✓ Readr seed loaded', 'color:#4959E6;font-weight:600');
  console.log(`  ${owned.length} owned (${owned.filter(b=>b.startedAt&&!b.finishedAt).length} reading, ${owned.filter(b=>b.finishedAt).length} finished, ${owned.filter(b=>!b.startedAt).length} not started)`);
  console.log(`  ${wishlist.length} wishlist`);
  console.log(`  ${collections.length} collections`);
  console.log(`  ${quotes.length} quotes`);
  console.log(`  ${words.length} dictionary words`);
  console.log(`  reading goal : 20 books/year`);

  location.reload();
})();
