import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

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
      className="book-chip-cover book-chip-cover-placeholder"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span>{letter}</span>
    </div>
  );
}

// Corps identique à BookChip.js : title + author TOUJOURS enveloppés dans
// .book-chip-name, les étoiles en second enfant de .book-chip-body.
function Body({ title, author, rating }) {
  return (
    <div className="book-chip-body">
      <div className="book-chip-name">
        <div className="book-chip-title">{title}</div>
        {author && <div className="book-chip-author">{author}</div>}
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
  <svg className="book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function BookChipPage() {
  return (
    <DSSection
      id="book-chip"
      title="Book Chip"
      sub="Bloc de référence d'un livre — vignette de couverture + titre + auteur. Quatre modes selon les props passées."
    >
      {/* ─────────── 1. STATES — chip interactif ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <button type="button" className="book-chip book-chip-interactive" style={{ width: 260 }}>
                <Cover from="#6F7CF2" to="#F67BF8" letter="D" />
                <Body title="Default" author="--bg3" />
                <Chevron />
              </button>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-chip book-chip-interactive is-hover" style={{ width: 260 }}>
                <Cover from="#9EEB97" to="#4959E6" letter="H" />
                <Body title="Hover" author="--primary-10" />
                <Chevron />
              </button>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-chip book-chip-interactive is-active" style={{ width: 260 }}>
                <Cover from="#FE7E4E" to="#FFCEE3" letter="A" />
                <Body title="Active" author="--primary-10" />
                <Chevron />
              </button>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-chip book-chip-interactive is-focus" style={{ width: 260 }}>
                <Cover from="#4959E6" to="#00A699" letter="F" />
                <Body title="Focus" author="ring --primary-50" />
                <Chevron />
              </button>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Réservé au mode <strong>interactif</strong> (<code>&lt;button&gt;</code>) : le chip ne réagit qu&apos;au fond. Survol et press partagent <span className="ds-token-chip">--primary-10</span> — donc <strong>Hover et Active sont visuellement identiques</strong>, aucun lift ni ombre. Le focus clavier pose un anneau <span className="ds-token-chip">--primary-50</span> (<code>:focus-visible</code>). Les modes Display / With remove, non cliquables, n&apos;ont aucun de ces états.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          {/* Planche cotée au runtime — boxSelector cadre la vignette (32×44 · r4) ;
              padding 12, gaps et hauteur mesurés. */}
          <div className="ds-redline-board">
            <Redline boxSelector=".book-chip-cover">
              <button type="button" className="book-chip book-chip-interactive" style={{ width: 260 }}>
                <Cover from="#6F7CF2" to="#F67BF8" letter="T" />
                <Body title="Tropique du Cancer" author="Henry Miller" />
                <Chevron />
              </button>
            </Redline>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Container</div>
            <p>Flex, gap 12, padding 12 uniforme, bg <span className="ds-token-chip">--bg3</span>, radius 8 — le padding canonique d&apos;un conteneur chip, partagé avec <span className="ds-class">.book-chip-interactive</span> et <span className="ds-class">.collection-chip</span>. La variante <span className="ds-class">.collection-chip</span> le passe en asymétrique 12/16 pour compenser le chevron à droite.</p>
            <span className="ds-class">.book-chip</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Cover</div>
            <p>32×44 (ratio de couverture), radius 4, <code>overflow: hidden</code>, sans ombre portée. Sans image : <span className="ds-class">.book-chip-cover-placeholder</span> — dégradé + initiale 16/700 blanc.</p>
            <span className="ds-class">.book-chip-cover</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Body</div>
            <p><code>flex: 1</code> et surtout <code>min-width: 0</code> — sans lui un titre long refuserait de se compresser et ferait déborder le chip au lieu de s&apos;ellipser. Gap 4 entre le nom et les étoiles.</p>
            <span className="ds-class">.book-chip-body</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Name</div>
            <p>Toujours présent, même sans note : c&apos;est lui qui garde titre et auteur serrés (gap 2) quand les étoiles s&apos;ajoutent au gap 4 du body. Titre 15/600, auteur 13/500 <span className="ds-token-chip">--text-2</span>, les deux en <code>ellipsis</code> sur une ligne.</p>
            <span className="ds-class">.book-chip-name</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Chevron</div>
            <p>16×16, <code>align-self: center</code>, <code>margin-left: 4</code>. Il ne s&apos;affiche qu&apos;en mode interactif : le chevron est la seule marque visible qu&apos;un chip est cliquable, le fond ne change qu&apos;au survol.</p>
            <span className="ds-class">.book-chip-chevron</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Remove</div>
            <p>28×28, radius 6, svg 14. Hover bg <span className="ds-token-chip">--primary-10</span>. Cible de 28px seulement — acceptable parce que le chip lui-même n&apos;est pas cliquable dans ce mode, il n&apos;y a donc pas de risque de toucher l&apos;un pour l&apos;autre.</p>
            <span className="ds-class">.book-chip-remove</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. VARIANTS · modes ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · modes</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <div className="book-chip" style={{ width: 260 }}>
                <Cover from="#6F7CF2" to="#F67BF8" letter="T" />
                <Body title="Tropique du Cancer" author="Henry Miller" />
              </div>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-chip book-chip-interactive" style={{ width: 260 }}>
                <Cover from="#9EEB97" to="#4959E6" letter="1" />
                <Body title="1984" author="George Orwell" />
                <Chevron />
              </button>
            </div>
            <div className="ds-state-sample">
              <div className="book-chip" style={{ width: 260 }}>
                <Cover from="#FE7E4E" to="#FFCEE3" letter="B" />
                <Body title="A Brief History of Time" author="Stephen Hawking" />
                <button type="button" className="book-chip-remove" aria-label="Remove">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="book-chip book-chip-interactive" style={{ width: 260 }}>
                <Cover from="#4959E6" to="#00A699" letter="D" />
                <Body title="Dune" author="Frank Herbert" rating={5} />
                <Chevron />
              </button>
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

      {/* ─────────── 4. USAGE — surcharges contextuelles + source ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Base surface · QuotePanel, AddQuoteModal</div>
            <p>Fond <span className="ds-token-chip">--bg3</span>, hover <span className="ds-token-chip">--primary-10</span>. Le chip est posé sur une surface neutre, il doit se détacher.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Flattened in <span className="ds-cn">.quote-card</span></div>
            <p>Fond transparent et padding 0 : à l&apos;intérieur d&apos;une carte de citation le chip n&apos;est pas cliquable, il se lit comme une ligne d&apos;attribution et non comme une cellule actionnable. Un fond y ferait une boîte dans une boîte.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Collection chip · padding asymétrique</div>
            <p>12 / 12 / 12 / 16 — le chevron aligné à droite tire le regard, le retrait gauche rétablit l&apos;équilibre optique. Même logique que le padding asymétrique des boutons à icône.</p>
            <span className="ds-class">.collection-chip</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">With stars · alignement haut</div>
            <p><code>.book-chip:has(.overview-stars)</code> passe en <code>align-items: flex-start</code> : la vignette se cale en haut au lieu de flotter au centre d&apos;un bloc devenu plus haut. Le chevron garde son <code>align-self: center</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Source</div>
            <p><code>BookChip.js</code>. La couverture est résolue par titre/auteur avec cache local, et retombe sur le dégradé + initiale si aucune image n&apos;est trouvée.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
