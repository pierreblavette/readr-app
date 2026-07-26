import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

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

function Menu({ items }) {
  return (
    <div className="dropdown-menu dropdown-menu--portal ds-menu-static" role="menu">
      {items.map((label) => (
        <button key={label} type="button" className="dropdown-item">{label}</button>
      ))}
      <button type="button" className="dropdown-item">Share</button>
      <div className="dropdown-divider" role="separator" />
      <button type="button" className="dropdown-item is-destructive">Delete</button>
    </div>
  );
}

// Renderer flexible pour les menus par carte (items explicites : chaque carte a son
// jeu, l'auto-append Share/Delete ne colle qu'à book/quote). divider = séparateur.
const DIV = { divider: true };
function MenuFull({ items }) {
  return (
    <div className="dropdown-menu dropdown-menu--portal ds-menu-static" role="menu">
      {items.map((it, i) => it.divider
        ? <div key={i} className="dropdown-divider" role="separator" />
        : <button key={i} type="button" className={`dropdown-item${it.destructive ? " is-destructive" : ""}`}>{it.label}</button>
      )}
    </div>
  );
}

// Le menu réel ouvert par le kebab de chaque type de carte (dans l'ordre affiché).
const CARD_MENUS = [
  ["Book", [{ label: "Mark as finished" }, { label: "Add a quote" }, { label: "Cancel reading" }, { label: "Share" }, DIV, { label: "Delete", destructive: true }]],
  ["Quote", [{ label: "Edit review" }, { label: "Add to favorites" }, { label: "Share" }, DIV, { label: "Delete", destructive: true }]],
  ["Dictionary", [{ label: "Delete", destructive: true }]],
  ["Collection", [{ label: "Rename" }, DIV, { label: "Delete", destructive: true }]],
];

// Déclencheur + menu assemblés (le résultat réel d'un clic sur le kebab).
function KebabOpen({ items, className = "" }) {
  return (
    <div className={`ds-kebab-open${className ? " " + className : ""}`}>
      <button type="button" className="col-card-kebab" aria-haspopup="menu" aria-expanded="true" aria-label="More actions">
        <KebabIcon />
      </button>
      <Menu items={items} />
    </div>
  );
}

// Décomposition numérotée : trigger (1) + menu (2) + item contextuel (3) + delete (4).
const ANNOS = [
  { n: 1, side: "top", target: ".col-card-kebab" },
  { n: 2, side: "left", target: ".dropdown-menu" },
  { n: 3, side: "right", target: ".dropdown-item" },
  { n: 4, side: "right", target: ".dropdown-item.is-destructive" },
];

export default function BookCardKebabPage() {
  return (
    <DSSection
      id="book-card-kebab"
      title="Kebab"
      sub="Déclencheur trois points partagé par les cartes — book, quote, dictionary, collection. Un clic ouvre un menu contextuel dont les items dépendent de la carte et de son état."
    >
      {/* ─────────── 1. PREVIEW — trigger + menu assemblés ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <KebabOpen items={MENUS[2][1]} />
          </div>
          </div>
          <p className="ds-note">Le kebab est un <strong>déclencheur</strong> : un clic ouvre un menu contextuel 6px sous lui. Ici l&apos;état <strong>Reading</strong> (le plus fourni). Le déclencheur seul (repos / ouvert) est en States.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <KebabOpen items={MENUS[2][1]} className="ds-anno-organism" />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.col-card-kebab</span></td><td>Déclencheur : 40×40, radius 8, svg 18 (trois points de 2px). Fond transparent → teinté à l&apos;ouverture, porté par <code>[aria-expanded=&quot;true&quot;]</code>, pas une classe.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.dropdown-menu</span></td><td>Menu ouvert : conteneur porté (<span className="ds-class">.dropdown-menu--portal</span>), min-width 180, 6px sous le trigger. <strong>Anatomie complète du conteneur et des cellules → Dropdown Menu</strong> ; le Kebab n&apos;en est qu&apos;un consommateur.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.dropdown-item</span></td><td>Bloc de tête <strong>contextuel</strong> : les items changent selon la <strong>carte</strong> (book / quote / dictionary / collection) et son état (logique produit — cf. Variants), pas du DS.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.is-destructive</span></td><td>Delete : <strong>commun</strong> à tous les états, après un <span className="ds-class">.dropdown-divider</span>. Share (juste au-dessus) est également commun.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — le déclencheur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <Redline boxSelector=".col-card-kebab">
              <div>
                <button type="button" className="col-card-kebab" aria-label="More actions">
                  <KebabIcon />
                </button>
              </div>
            </Redline>
          </div>
          <p className="ds-note">Déclencheur <strong>40×40</strong> (radius 8) coté en boîte — cible tactile 40px pour un glyphe de 18. Le fond ne change qu&apos;à l&apos;ouverture. L&apos;espacement <em>du menu</em> (padding, gaps, rayons imbriqués) vit dans <strong>Dropdown Menu</strong>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — le déclencheur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · trigger</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <button type="button" className="col-card-kebab" aria-haspopup="menu" aria-expanded="false" aria-label="More actions">
                <KebabIcon />
              </button>
              <span className="ds-class">[aria-expanded=&quot;false&quot;]</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="col-card-kebab" aria-haspopup="menu" aria-expanded="true" aria-label="More actions">
                <KebabIcon />
              </button>
              <span className="ds-class">[aria-expanded=&quot;true&quot;]</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Deux cellules : repos (transparent) et <strong>ouvert</strong> (fond). Hover et menu ouvert partagent le même style, porté par <code>[aria-expanded=&quot;true&quot;]</code> et non une classe — l&apos;attribut d&apos;accessibilité est déjà la source de vérité, une classe en parallèle pourrait en diverger.</p>
        </div>
      </div>

      {/* ─────────── 5. VARIANTS · menu by card ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · menu by card</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            {CARD_MENUS.map(([label, items]) => (
              <div key={label} className="ds-state-sample">
                <MenuFull items={items} />
                <span className="ds-class">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Le même déclencheur ouvre un menu <strong>propre à chaque carte</strong> : <strong>Book</strong> (items par état — cf. planche suivante), <strong>Quote</strong> (Edit · Favorite · Share · Delete), <strong>Dictionary</strong> (Delete seul), <strong>Collection</strong> (Rename · Delete). <strong>Delete</strong> (<span className="ds-class">.is-destructive</span>) ferme chaque menu après un <span className="ds-class">.dropdown-divider</span>. Le conteneur et les cellules sont documentés dans <strong>Dropdown Menu</strong> — le kebab n&apos;en est qu&apos;un consommateur.</p>
        </div>
      </div>

      {/* ─────────── 6. VARIANTS · book menu by state ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · book menu by state</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            {MENUS.map(([state, items]) => (
              <div key={state} className="ds-state-sample">
                <Menu items={items} />
                <span className="ds-class">{state}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Sur une carte <strong>book</strong>, le bloc de tête change selon l&apos;état du livre (Wishlist, Not started, Reading, Finished) — <strong>logique produit</strong>, pas du DS. <strong>Share</strong>, le <span className="ds-class">.dropdown-divider</span> et <strong>Delete</strong> (<span className="ds-class">.is-destructive</span>) closent chaque menu, identiques partout.</p>
        </div>
      </div>

      {/* ─────────── 6. BEHAVIOR — positionnement + fermeture ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Positioning</div>
            <p>Le menu sort de son parent via <code>createPortal</code> et passe en <code>position: fixed</code> (<span className="ds-class">.dropdown-menu--portal</span>) — sinon il serait rogné par le contexte d&apos;empilement de la carte. <code>min-width: 180</code>, <code>z-index: 1000</code>. <code>top</code> / <code>right</code> dérivés du <code>getBoundingClientRect()</code> du déclencheur (6px sous lui), <strong>jamais recalculés</strong> : plutôt que suivre le déclencheur au scroll, le menu se ferme — un menu qui poursuit sa cible pendant qu&apos;on défile est plus déroutant qu&apos;un menu qui disparaît.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Closing</div>
            <p>Clic extérieur (<code>mousedown</code>, pas <code>click</code> — la fermeture doit précéder l&apos;action visée), <code>Escape</code>, scroll (capture) et resize. Écouteurs posés à l&apos;ouverture et retirés à la fermeture, jamais montés en permanence.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 7. USAGE — share, a11y, consumers ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
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
