import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="is-filled">
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
  </svg>
);

// Placeholder de couverture : c'est la branche de repli du vrai composant
// (dégradé issu de coverColors(title) + initiale), volontairement figée ici.
function Cover({ from, to, letter }) {
  return (
    <div
      className="book-row-cover book-row-cover-placeholder"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span>{letter}</span>
    </div>
  );
}

// Corps identique à BookRow.js : title + author TOUJOURS enveloppés dans
// .book-row-name, les étoiles en second enfant de .book-row-body.
function Body({ title, author, rating }) {
  return (
    <div className="book-row-body">
      <div className="book-row-name">
        <div className="book-row-title">{title}</div>
        {author && <div className="book-row-author">{author}</div>}
      </div>
      {rating > 0 && (
        <div className="overview-stars" aria-label={`Rating ${rating}/5`}>
          {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} />)}
        </div>
      )}
    </div>
  );
}

const Chevron = () => (
  <svg className="book-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// Décomposition numérotée : container (1) + cover (2) + name (3) + chevron (4).
const ANNOS = [
  { n: 1, side: "top", target: ".book-row" },
  { n: 2, side: "bottom", target: ".book-row-cover" },
  { n: 3, side: "bottom", target: ".book-row-name" },
  { n: 4, side: "right", target: ".book-row-chevron" },
];

export default function BookRowPage() {
  return (
    <DSSection
      id="book-row"
      title="Book Row"
      sub="La ligne qui référence un livre : sa vignette, son titre, son auteur. Utilisée partout où un livre doit être cité de façon compacte."
    >
      {/* ─────────── 1. PREVIEW — la ligne canonique (interactif) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <button type="button" className="book-row book-row-interactive" style={{ width: "var(--spec-w, 300px)" }}>
              <Cover from="#4959E6" to="#00A699" letter="D" />
              <Body title="Dune" author="Frank Herbert" rating={5} />
              <Chevron />
            </button>
          </div>
          </div>
          <p className="ds-note">Media object : <strong>vignette + titre + auteur</strong>, note optionnelle sous le nom. Ici en mode <strong>interactif</strong> (<code>&lt;button&gt;</code> + chevron). Quatre modes selon les props — cf. Variants.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <button type="button" className="book-row book-row-interactive ds-anno-organism" style={{ width: 300 }}>
              <Cover from="#6F7CF2" to="#F67BF8" letter="T" />
              <Body title="Tropique du Cancer" author="Henry Miller" />
              <Chevron />
            </button>
          </AnnoScene>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.book-row</span></td><td>Container : flex, gap 12, padding 12 uniforme, bg <span className="ds-token-chip">--bg3</span>, radius 8 — padding canonique partagé avec <span className="ds-class">.collection-chip</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.book-row-cover</span></td><td>Vignette : 32×44 (ratio couverture), radius 4, <code>overflow: hidden</code>, sans ombre. Sans image → <span className="ds-class">.book-row-cover-placeholder</span> (dégradé + initiale 16/700).</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.book-row-body</span></td><td>Corps : <code>flex: 1</code> + <code>min-width: 0</code> (sans lui, un titre long déborderait au lieu de s&apos;ellipser). Gap 4 entre nom et étoiles.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.book-row-name</span></td><td>Nom : titre 15/600 + auteur 13/500 <span className="ds-token-chip">--text-2</span>, gap 2, <code>ellipsis</code> 1 ligne. Toujours présent — garde titre/auteur serrés quand les étoiles s&apos;ajoutent.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.book-row-chevron</span></td><td>Chevron : 16×16, <code>align-self: center</code>, <code>margin-left: 4</code>. Seule marque visible qu&apos;une ligne est cliquable.</td><td><span className="now-reading-date now-reading-date--sm">Interactive</span></td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.book-row-remove</span></td><td>Croix : 28×28, radius 6, svg 14, hover bg <span className="ds-token-chip">--primary-10</span>. Cible 28px acceptable car la ligne n&apos;est pas cliquable dans ce mode.</td><td><span className="now-reading-date now-reading-date--sm">With remove</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — padding + gaps + vignette ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".book-row-cover">
                <div className="book-row" style={{ width: 300 }}>
                  <Cover from="#6F7CF2" to="#F67BF8" letter="T" />
                  <Body title="Display" author="Henry Miller" />
                </div>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".book-row-cover">
                <button type="button" className="book-row book-row-interactive" style={{ width: 300 }}>
                  <Cover from="#9EEB97" to="#4959E6" letter="1" />
                  <Body title="Interactive" author="George Orwell" />
                  <Chevron />
                </button>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".book-row-cover">
                <div className="book-row" style={{ width: 300 }}>
                  <Cover from="#FE7E4E" to="#FFCEE3" letter="B" />
                  <Body title="With remove" author="Stephen Hawking" />
                  <button type="button" className="book-row-remove" aria-label="Remove">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".book-row-cover">
                <button type="button" className="book-row book-row-interactive" style={{ width: 300 }}>
                  <Cover from="#4959E6" to="#00A699" letter="D" />
                  <Body title="Rating" author="Frank Herbert" rating={5} />
                  <Chevron />
                </button>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Une planche par mode. Base : padding <strong>12</strong> uniforme (4 côtés), gap <strong>12</strong> vignette → corps, vignette <strong>32×44</strong> (r4) cotée en boîte. <strong>Interactive</strong> ajoute le chevron (gap 4, <code>margin-left</code>). <strong>With remove</strong> remplace le chevron par la croix 28×28. <strong>Rating</strong> passe en <code>align-items: flex-start</code> (vignette calée en haut). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — interactif ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · interactive</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            <div className="ds-state-sample">
              <button type="button" className="book-row book-row-interactive" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#6F7CF2" to="#F67BF8" letter="D" />
                <Body title="Default" author="--bg3" />
                <Chevron />
              </button>
              <span className="ds-class">.book-row-interactive</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-row book-row-interactive is-hover" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#9EEB97" to="#4959E6" letter="H" />
                <Body title="Hover" author="--primary-10" />
                <Chevron />
              </button>
              <span className="ds-class">:hover</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-row book-row-interactive is-active" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#FE7E4E" to="#FFCEE3" letter="A" />
                <Body title="Active" author="--primary-10" />
                <Chevron />
              </button>
              <span className="ds-class">:active</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-row book-row-interactive is-focus" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#4959E6" to="#00A699" letter="F" />
                <Body title="Focus" author="ring --primary-50" />
                <Chevron />
              </button>
              <span className="ds-class">:focus-visible</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Réservé au mode <strong>interactif</strong> (<code>&lt;button&gt;</code>) : la ligne ne réagit qu&apos;au fond. Survol et press partagent <span className="ds-token-chip">--primary-10</span> — donc <strong>Hover et Active sont visuellement identiques</strong>, aucun lift ni ombre. Le focus clavier pose un anneau <span className="ds-token-chip">--primary-50</span> (<code>:focus-visible</code>). Les modes Display / With remove, non cliquables, n&apos;ont aucun de ces états.</p>
        </div>
      </div>

      {/* ─────────── 5. VARIANTS · modes ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · modes</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            <div className="ds-state-sample">
              <div className="book-row" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#6F7CF2" to="#F67BF8" letter="T" />
                <Body title="Tropique du Cancer" author="Henry Miller" />
              </div>
              <span className="ds-class">.book-row</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-row book-row-interactive" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#9EEB97" to="#4959E6" letter="1" />
                <Body title="1984" author="George Orwell" />
                <Chevron />
              </button>
              <span className="ds-class">.book-row-interactive</span>
            </div>
            <div className="ds-state-sample">
              <div className="book-row" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#FE7E4E" to="#FFCEE3" letter="B" />
                <Body title="A Brief History of Time" author="Stephen Hawking" />
                <button type="button" className="book-row-remove" aria-label="Remove">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <span className="ds-class">.book-row-remove</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-row book-row-interactive" style={{ width: "100%", maxWidth: "var(--spec-max, 260px)" }}>
                <Cover from="#4959E6" to="#00A699" letter="D" />
                <Body title="Dune" author="Frank Herbert" rating={5} />
                <Chevron />
              </button>
              <span className="ds-class">.overview-stars</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Les vignettes montrent la <strong>branche de repli</strong> (dégradé <code>coverColors(title)</code> + initiale) : la doc ne déclenche aucun appel réseau. Le mode est déterminé par les props passées :</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Display — aucune prop d&apos;action</div>
            <p>Rendu en <code>&lt;div&gt;</code>, non focusable. Mode par défaut.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Interactive — onClick</div>
            <p>Rendu en <code>&lt;button&gt;</code> avec chevron, hover et <code>focus-visible</code>. Dans un parent lui-même cliquable, appeler <code>e.stopPropagation()</code> sinon les deux actions partent ensemble.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">With remove — onRemove</div>
            <p>Ajoute la croix à droite. <strong>Mutuellement exclusif avec onClick</strong> : un bouton dans un bouton est un markup invalide, et l&apos;utilisateur ne saurait pas quelle action il déclenche.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Rating — 1 à 5 étoiles</div>
            <p>Ajoute <span className="ds-class">.overview-stars</span> sous le nom, 14×14, remplies <span className="ds-token-chip">--primary-50</span> / vides <span className="ds-token-chip">--border</span>. Se combine avec les autres modes.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 6. USAGE — surcharges contextuelles + source ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Base surface · QuotePanel, AddQuoteModal</div>
            <p>Fond <span className="ds-token-chip">--bg3</span>, hover <span className="ds-token-chip">--primary-10</span>. La ligne est posée sur une surface neutre, elle doit se détacher.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Flattened in <span className="ds-cn">.quote-card</span></div>
            <p>Fond transparent et padding 0 : à l&apos;intérieur d&apos;une carte de citation la ligne n&apos;est pas cliquable, elle se lit comme une attribution et non comme une cellule actionnable. Un fond y ferait une boîte dans une boîte.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Collection chip · padding asymétrique</div>
            <p>12 / 12 / 12 / 16 — le chevron aligné à droite tire le regard, le retrait gauche rétablit l&apos;équilibre optique. Même logique que le padding asymétrique des boutons à icône.</p>
            <span className="ds-class">.collection-chip</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">With stars · alignement haut</div>
            <p><code>.book-row:has(.overview-stars)</code> passe en <code>align-items: flex-start</code> : la vignette se cale en haut au lieu de flotter au centre d&apos;un bloc devenu plus haut. Le chevron garde son <code>align-self: center</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Source</div>
            <p><code>BookRow.js</code>. La couverture est résolue par titre/auteur avec cache local, et retombe sur le dégradé + initiale si aucune image n&apos;est trouvée.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
