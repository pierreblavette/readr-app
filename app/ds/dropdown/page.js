import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

// États d'un item, layout buttons : une cellule par état, le label EST l'état.
// Hover / Active sont forcés par classe doc (mirror de library.css) ; Destructive
// est la vraie classe ; Disabled passe par l'attribut.
const ITEM_STATES = [
  ["Default", ""],
  ["Hover", "is-hover"],
  ["Active", "is-active"],
  ["Destructive", "is-destructive"],
  ["Disabled", ""],
];

export default function DropdownMenuPage() {
  return (
    <DSSection
      id="dropdown"
      title="Dropdown Menu"
      sub="Liste flottante d'actions — conteneur .dropdown-menu + items .dropdown-item. Primitive partagée : Book Card Kebab, Export Menu, Sort Menu et Filters s'appuient dessus."
    >
      {/* ─────────── 1. STATES — l'item et ses réactions ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {ITEM_STATES.map(([label, mod]) => (
              <div key={label} className="ds-state-sample">
                <button
                  type="button"
                  className={`dropdown-item${mod ? " " + mod : ""}`}
                  disabled={label === "Disabled"}
                  style={{ width: "auto" }}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Hover <span className="ds-token-chip">--primary-5</span> + texte <span className="ds-token-chip">--primary-50</span> · Active <span className="ds-token-chip">--primary-10</span> · Destructive texte <span className="ds-token-chip">--destructive</span> (hover fond rouge 0.08) · Disabled opacité 0.4, <strong>visible</strong> plutôt que retiré — un <code>title</code> porte la raison, le handler sort en early return (<code>disabled</code> seul ne garantit pas qu&apos;aucune action ne passe).</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — item + conteneur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          {/* Deux planches empilées : l'item, puis le conteneur (bandes = padding 4). */}
          <div className="ds-redline-board">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <button type="button" className="dropdown-item" style={{ width: 220 }}>Mark as finished</button>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              {/* Pas de --portal ici : son min-width 180 déborderait le mat de mesure
                  (inline-flex) et décalerait la bande de padding droite. L'anatomy
                  cote la boîte (padding 4 / radius 10), pas le gabarit du portal. */}
              <Redline>
                <div className="dropdown-menu ds-menu-static" role="menu">
                  <button type="button" className="dropdown-item">Mark as finished</button>
                  <button type="button" className="dropdown-item">Add a quote</button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Item (padding 0 12, hauteur 40) puis conteneur (les bandes montrent le padding 4 sur les 4 côtés). Cotes mesurées à l&apos;exécution.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Item</div>
            <p>Hauteur 40, padding 0 12, font 15/500 <span className="ds-token-chip">--text</span>, <code>text-align: left</code>. Icône optionnelle svg 16 + gap 12. <code>width: 100%</code> dans son menu (forcé à <code>auto</code> ici pour l&apos;échantillon).</p>
            <span className="ds-class">.dropdown-item</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Nested radii — item 6</div>
            <p>Item radius 6 = radius du menu (10) moins son padding (4) : deux courbes concentriques ne se lisent parallèles que si leur écart vaut l&apos;espace qui les sépare. La pastille de hover épouse alors le coin du menu sans le déborder.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Menu (container)</div>
            <p>Padding <strong>4</strong> sur les 4 côtés, radius 10, border 1.5 <span className="ds-token-chip">--border-subtle</span>, ombre portée. <code>width: fit-content</code>, gabarit minimal 180 en usage.</p>
            <span className="ds-class">.dropdown-menu</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Floating-list contract — 10 / 4 / 6</div>
            <p>Menu radius 10 · padding 4 · item radius 6. Contrat commun à toutes les listes flottantes (dropdown, autocomplete, filter) — voir <strong>Shadows &amp; Radius</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Divider</div>
            <p>Trait 1px <span className="ds-token-chip">--border-subtle</span>, <code>margin: 4px 8px</code> — inset horizontal de 8 pour ne pas toucher les bords. Regroupe les items par bloc logique.</p>
            <span className="ds-class">.dropdown-divider</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. USAGE — menu assemblé + consommateurs ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <div className="dropdown-menu dropdown-menu--portal ds-menu-static" role="menu">
                <button type="button" className="dropdown-item">Mark as finished</button>
                <button type="button" className="dropdown-item">Add a quote</button>
                <button type="button" className="dropdown-item">Share</button>
                <div className="dropdown-divider" role="separator" />
                <button type="button" className="dropdown-item is-destructive">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">In context</div>
            <p>Rendu <code>position: static</code> pour la doc. En usage réel le menu est portalisé sur <code>document.body</code> (<code>position: fixed</code>) et positionné sous son déclencheur — voir <strong>Book Card Kebab</strong> pour le cycle ouverture/fermeture d&apos;un consommateur.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Le déclencheur, le positionnement et les items dépendent du contexte : <strong>Book Card Kebab</strong> (trois points, items selon l&apos;état du livre), <strong>Export Menu</strong>, <strong>Sort Menu</strong>, <strong>Filters</strong>. Tous montent le même <span className="ds-class">.dropdown-menu</span> / <span className="ds-class">.dropdown-item</span> ; seule change la liste d&apos;actions.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
