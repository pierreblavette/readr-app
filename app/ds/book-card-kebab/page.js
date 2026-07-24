import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

const KebabIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="6" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="18" r="2" />
  </svg>
);

// Les 4 jeux d'items, dans l'ordre exact où BookCardKebab les rend.
// Share + divider + Delete sont communs à tous les états, d'où leur absence ici.
const MENUS = [
  ["Wishlist", ["Mark as owned"]],
  ["Not started", ["Start reading"]],
  ["Reading", ["Mark as finished", "Add a quote", "Cancel reading"]],
  ["Finished", ["Edit review"]],
];

function Menu({ items, disabledFirst }) {
  return (
    <div className="dropdown-menu dropdown-menu--portal ds-menu-static" role="menu">
      {items.map((label, i) => (
        <button
          key={label}
          type="button"
          className="dropdown-item"
          disabled={disabledFirst && i === 0}
        >
          {label}
        </button>
      ))}
      <button type="button" className="dropdown-item">Share</button>
      <div className="dropdown-divider" role="separator" />
      <button type="button" className="dropdown-item is-destructive">Delete</button>
    </div>
  );
}

export default function BookCardKebabPage() {
  return (
    <DSSection
      id="book-card-kebab"
      title="Book Card Kebab"
      sub="Déclencheur trois points des cartes de livre — ouvre un menu contextuel dont les items dépendent de l'état du livre."
    >
      {/* ─────────── 1. STATES — le déclencheur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <button type="button" className="col-card-kebab" aria-haspopup="menu" aria-expanded="false" aria-label="More actions">
                <KebabIcon />
              </button>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="col-card-kebab" aria-haspopup="menu" aria-expanded="true" aria-label="More actions">
                <KebabIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Deux cellules : repos (transparent) et <strong>ouvert</strong> (fond). Hover et menu ouvert partagent le même style, porté par <code>[aria-expanded=&quot;true&quot;]</code> et non une classe — l&apos;attribut d&apos;accessibilité est déjà la source de vérité, une classe en parallèle pourrait en diverger.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — le déclencheur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          {/* Le bouton est enveloppé pour que boxSelector le cible en descendant :
              cote 40×40 · r8. Le glyphe (18) est décrit dans le token-block. */}
          <div className="ds-redline-board">
            <Redline boxSelector=".col-card-kebab">
              <div>
                <button type="button" className="col-card-kebab" aria-label="More actions">
                  <KebabIcon />
                </button>
              </div>
            </Redline>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Trigger</div>
            <p>40×40, radius 8, fond transparent, svg 18 (trois points de 2px). Cible tactile de 40px. Fond transparent au repos, teinté à l&apos;ouverture — l&apos;état ouvert est porté par <code>[aria-expanded=&quot;true&quot;]</code>, pas par une classe : l&apos;attribut d&apos;accessibilité est déjà la source de vérité, une classe en parallèle pourrait en diverger.</p>
            <span className="ds-class">.col-card-kebab</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. USAGE — le menu ouvert, positionnement, comportement ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <Menu items={MENUS[2][1]} />
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Menu it opens</div>
            <p>Un seul menu montré — l&apos;état <strong>Reading</strong>, le plus fourni. Seul le <strong>bloc de tête</strong> change selon l&apos;état du livre (les items exacts sont de la logique produit, pas du DS) ; <strong>Share</strong> et <strong>Delete</strong> sont communs. L&apos;anatomie du conteneur et de la cellule (padding, états, rayons imbriqués) vit dans <strong>Dropdown Menu</strong> — Kebab n&apos;en est qu&apos;un consommateur.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Positioning</div>
            <p>Le menu sort de son parent via <code>createPortal</code> et passe en <code>position: fixed</code> (<span className="ds-class">.dropdown-menu--portal</span>) — sinon il serait rogné par le contexte d&apos;empilement de la carte. <code>min-width: 180</code>, <code>z-index: 1000</code>. <code>top</code> / <code>right</code> dérivés du <code>getBoundingClientRect()</code> du déclencheur (6px sous lui), <strong>jamais recalculés</strong> : plutôt que suivre le déclencheur au scroll, le menu se ferme — un menu qui poursuit sa cible pendant qu&apos;on défile est plus déroutant qu&apos;un menu qui disparaît.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Closing</div>
            <p>Clic extérieur (<code>mousedown</code>, pas <code>click</code> — la fermeture doit précéder l&apos;action visée), <code>Escape</code>, scroll (capture) et resize. Écouteurs posés à l&apos;ouverture et retirés à la fermeture, jamais montés en permanence.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Share</div>
            <p><code>navigator.share</code> quand il existe (mobile), sinon repli sur <code>clipboard.writeText</code> + toast « Copied! ». Le toast n&apos;est déclenché que sur la branche presse-papiers : la feuille de partage native donne déjà son propre retour.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility</div>
            <p><code>aria-haspopup=&quot;menu&quot;</code> + <code>aria-expanded</code> sur le déclencheur, <code>role=&quot;menu&quot;</code> sur le conteneur, items en <code>&lt;button&gt;</code>, <code>role=&quot;separator&quot;</code> sur le divider. Pas de piège de focus : menu contextuel léger, Escape suffit.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers &amp; contextual adjustments</div>
            <p><code>BookCard</code> (grille et liste), <code>QuotesView</code>, <code>CollectionDetailView</code> partagent <code>BookCardKebab.js</code>. Dans <span className="ds-class">.list-row</span> le déclencheur passe en <code>inline-flex</code> pour se laisser pousser à droite ; dans <span className="ds-class">.quote-card</span> il déborde de 8px en marge négative, pour que son aire de clic de 40px morde le padding de la carte au lieu de l&apos;épaissir.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
