// Spec de la page Book Panel. Markup reproduit à l'identique de BookPanel.js : les
// classes de library.css font le rendu, aucune donnée figée ne diverge de la prod.
// État montré = un livre OWNED + FINISHED, le plus riche du composant (cover, header
// + pill Finished + Share, Collections, Finished rating/note, About, Quotes, Delete).
// Les autres états (To read, Reading, Wishlist) sont décrits en prose sur la page —
// mutuellement exclusifs, non répliqués en specimens.

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);
const ChevronIcon = () => (
  <svg className="book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

function StarsDisplay({ value = 4 }) {
  return (
    <div className="panel-rating-stars" aria-label={`Rating ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" fill="currentColor" className={value >= n ? "is-filled" : ""}>
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// Étincelle AI du bouton .btn-ai (dégradé). id unique par section pour éviter deux
// <linearGradient> avec le même id dans le DOM.
export const AiSparkle = ({ id }) => (
  <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={id} x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F67BF8" /><stop offset="0.62" stopColor="#4959E6" />
      </linearGradient>
    </defs>
    <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill={`url(#${id})`} />
  </svg>
);

// Character Cast (AI) — état collapsed (hint + bouton). Reading only en prod.
function CastSection() {
  return (
    <div className="panel-section panel-cast">
      <div className="panel-cast-content">
        <span className="panel-section-eyebrow">Character cast</span>
        <p className="panel-cast-hint">Reveal the main characters — who they are and how they relate.</p>
      </div>
      <button type="button" className="btn btn-ai btn-md panel-cast-action"><AiSparkle id="dsAiCast" />Reveal the cast</button>
    </div>
  );
}

// Book Quiz (AI) — état collapsed (hint + bouton). Finished only en prod.
function QuizSection() {
  return (
    <div className="panel-section panel-quiz">
      <div className="panel-quiz-content">
        <span className="panel-section-eyebrow">Book quiz</span>
        <div className="panel-quiz-hint-group">
          <p className="panel-quiz-hint">Test what you remember — 10 questions on this book.</p>
          <p className="panel-quiz-hint-note">Once started, the quiz is timed.</p>
        </div>
      </div>
      <button type="button" className="btn btn-ai btn-md panel-quiz-action"><AiSparkle id="dsAiQuiz" />Start the quiz</button>
    </div>
  );
}

// className : permet d'ajouter .ds-anno-organism en Anatomy. .ds-panel-static (partagé
// avec Filters Panel) neutralise le positionnement fixed/slide-in pour l'afficher en flux.
// compact : Preview allégée — ne garde que Cover + panel-info-header + divider + About
// (le composite complet reste pour l'Anatomy).
export function BookPanelSpec({ className = "", compact = false }) {
  return (
    <div className={`book-panel ds-panel-static ${className}`.trim()} role="dialog" aria-modal="true" aria-label="Book details">
      <div className="panel-inner">
        <button type="button" className="panel-close" aria-label="Close"><CloseIcon /></button>

        {/* Main — cover (centrée) + bloc info (gauche), gap 60 */}
        <div className="panel-main">
          <div className="panel-cover-wrap panel-cover-empty" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }}>
            <span className="panel-cover-letter">A</span>
          </div>
          <div className="panel-info">
            <div className="panel-info-header">
              <div className="panel-title">A Brief History of Time</div>
              <div className="panel-byline">
                <div className="panel-author">Stephen Hawking</div>
                <div className="panel-meta">
                  <span>Science</span>
                  <span className="panel-meta-sep" aria-hidden="true">·</span>
                  <span>1988</span>
                </div>
              </div>
              <div className="panel-header-actions">
                <button type="button" className="btn btn-outline btn-md panel-header-finished" disabled aria-disabled="true">Finished</button>
                <button type="button" className="btn btn-outline btn-md panel-header-share" aria-label="Share">
                  <ShareIcon /><span>Share</span>
                </button>
              </div>
            </div>

            {/* Collections + Finished — imbriquées dans .panel-info (masquées en compact) */}
            {!compact && (<>
            <div className="panel-divider" />
            <div className="panel-collections-section">
              <div className="panel-section">
                <span className="panel-section-eyebrow">Collections</span>
                <div className="panel-collections">
                  <button type="button" className="book-chip book-chip-interactive collection-chip">
                    <div className="book-chip-body">
                      <div className="book-chip-title">Science shelf</div>
                      <div className="book-chip-author">12 books</div>
                    </div>
                    <ChevronIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Finished — rating + note (livre terminé) */}
            <div className="panel-divider" />
            <div className="panel-section is-finished">
              <div className="panel-finished-content">
                <span className="panel-section-eyebrow">Finished</span>
                <div className="panel-finished-date">Finished on Mar 12, 2026</div>
                <div className="panel-finished-field">
                  <span className="panel-finished-label">Rating</span>
                  <StarsDisplay value={4} />
                </div>
                <div className="panel-finished-field">
                  <span className="panel-finished-label">Note</span>
                  <div className="panel-finished-note">A landmark in popular science. Hawking makes cosmology accessible without dumbing it down.</div>
                </div>
              </div>
              <div className="panel-finished-actions">
                <button type="button" className="panel-finished-btn">Edit review</button>
                <button type="button" className="panel-finished-btn">Delete</button>
              </div>
            </div>
            </>)}
          </div>
        </div>

        {/* Sections enfants directs de .panel-inner. Composite doc (Anatomy) : Cast
            (reading) et Quiz (finished) coexistent pour montrer toutes les briques —
            un vrai panel n'en affiche qu'un sous-ensemble selon l'état. */}
        {!compact && (<>
        <div className="panel-divider" />
        <CastSection />

        <div className="panel-divider" />
        <QuizSection />
        </>)}

        <div className="panel-divider" />
        <div className="panel-section">
          <span className="panel-section-eyebrow">About</span>
          <div className="panel-synopsis">A landmark volume in science writing — how did the universe begin, what is the nature of time, and what lies at the edge of a black hole. Hawking guides the reader from the Big Bang to the search for a single unifying theory.</div>
        </div>

        {!compact && (<>
        <div className="panel-divider" />
        <div className="panel-quotes">
          <div className="panel-quotes-content">
            <span className="panel-section-eyebrow">Quotes</span>
            <div className="panel-quotes-list">
              <button type="button" className="panel-quote-item">
                <p className="panel-quote-text">&ldquo;We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special.&rdquo;</p>
                <span className="panel-quote-page">p. 42</span>
              </button>
            </div>
          </div>
          <button type="button" className="panel-quotes-add">
            <PlusIcon />Add a quote
          </button>
        </div>

        <div className="panel-divider" />
        <div className="panel-actions">
          <button type="button" className="panel-delete-btn">Delete</button>
        </div>
        </>)}
      </div>
    </div>
  );
}
