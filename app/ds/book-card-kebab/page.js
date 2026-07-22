import DSSection from "../_components/DSSection";

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
      <div className="ds-card">
        <div className="ds-card-head">Trigger</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid">
            <div className="ds-state-sample">
              <span className="panel-section-eyebrow">Default</span>
              <button type="button" className="col-card-kebab" aria-haspopup="menu" aria-expanded="false" aria-label="More actions">
                <KebabIcon />
              </button>
            </div>
            <div className="ds-state-sample">
              <span className="panel-section-eyebrow">Hover / Open</span>
              <button type="button" className="col-card-kebab" aria-haspopup="menu" aria-expanded="true" aria-label="More actions">
                <KebabIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">.col-card-kebab</div>
            <p>40×40, radius 8, fond transparent, svg 18. Hover et menu ouvert partagent le même style — l&apos;état ouvert est porté par <code>[aria-expanded=&quot;true&quot;]</code>, pas par une classe : l&apos;attribut d&apos;accessibilité est déjà la source de vérité, une classe en parallèle pourrait en diverger.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Menus — items selon l&apos;état du livre</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--top">
            {MENUS.map(([state, items]) => (
              <div key={state} className="ds-state-sample">
                <span className="panel-section-eyebrow">{state}</span>
                <Menu items={items} />
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Menus rendus <code>position: static</code> pour la doc. En usage réel ils sont portalisés (voir Positionnement). <strong>Share</strong> et <strong>Delete</strong> sont communs aux quatre états ; seul le bloc de tête change.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">État désactivé — limite de lecture</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--top">
            <div className="ds-state-sample">
              <span className="panel-section-eyebrow">Limite atteinte</span>
              <Menu items={["Start reading"]} disabledFirst />
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Start reading · disabled</div>
            <p>Désactivé quand le nombre de lectures en cours atteint le plafond. L&apos;item reste <strong>visible</strong> plutôt que retiré : le faire disparaître laisserait l&apos;utilisateur sans explication. Un <code>title</code> porte la raison, et le handler sort en early return — l&apos;attribut <code>disabled</code> seul ne suffit pas à garantir qu&apos;aucune action ne passe.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Positionnement</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">.dropdown-menu--portal · portalisé sur document.body</div>
            <p>Le menu sort de son parent via <code>createPortal</code> et passe en <code>position: fixed</code>. Sans ça il serait rogné par le contexte d&apos;empilement de la carte ou de la table qui le contient. <code>min-width: 180</code> pour un gabarit minimal cohérent, <code>width: auto</code> au-delà, <code>z-index: 1000</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Coordonnées calculées à l&apos;ouverture</div>
            <p><code>top</code> et <code>right</code> sont dérivés du <code>getBoundingClientRect()</code> du déclencheur, avec 6px de décalage sous lui — et ne sont <strong>jamais recalculés</strong> ensuite. C&apos;est un choix, pas un oubli : plutôt que suivre le déclencheur au scroll, le menu se ferme. Un menu contextuel qui poursuit sa cible pendant qu&apos;on défile est plus déroutant qu&apos;un menu qui disparaît.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Comportement</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Fermeture</div>
            <p>Clic extérieur (<code>mousedown</code>, pas <code>click</code> — la fermeture doit précéder l&apos;action visée), <code>Escape</code>, scroll (capture) et resize. Tous les écouteurs sont posés à l&apos;ouverture et retirés à la fermeture, jamais montés en permanence.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Share</div>
            <p><code>navigator.share</code> quand il existe (mobile), sinon repli sur <code>clipboard.writeText</code> suivi d&apos;un toast « Copied! ». Le toast n&apos;est déclenché que sur la branche presse-papiers : la feuille de partage native donne déjà son propre retour.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibilité</div>
            <p><code>aria-haspopup=&quot;menu&quot;</code> + <code>aria-expanded</code> sur le déclencheur, <code>role=&quot;menu&quot;</code> sur le conteneur, items en <code>&lt;button&gt;</code>, <code>role=&quot;separator&quot;</code> sur le divider. Pas de piège de focus : c&apos;est un menu contextuel léger, Escape suffit.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consommateurs</div>
            <p><code>BookCard</code> (grille et liste), <code>QuotesView</code> et <code>CollectionDetailView</code> partagent le même composant — <code>components/library/BookCardKebab.js</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Ajustements contextuels</div>
            <p>Dans <code>.list-row</code> le déclencheur passe en <code>inline-flex</code> pour se laisser pousser à droite par <code>text-align</code>. Dans <code>.quote-card</code> il déborde de 8px en marge négative, pour que son aire de clic de 40px vienne mordre le padding de la carte au lieu de l&apos;épaissir.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
