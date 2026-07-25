import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// Déclencheur canonique : bouton outline .dropdown-btn (icône + label + chevron).
function Trigger({ open = false }) {
  return (
    <button type="button" className="dropdown-btn" aria-haspopup="menu" aria-expanded={open}>
      <svg className="dropdown-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span className="dropdown-btn-label">Actions</span>
      <svg className="dropdown-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={open ? { transform: "rotate(180deg)" } : undefined}>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

const ITEM_STATES = [
  ["Default", ""],
  ["Hover", "is-hover"],
  ["Active", "is-active"],
  ["Destructive", "is-destructive"],
  ["Disabled", ""],
];

// Décomposition numérotée : trigger (1 + parties 2/3/4) puis menu (5 + parties 6/7/8).
const ANNOS = [
  { n: 1, side: "left", target: ".dropdown-btn" },
  { n: 2, side: "top", target: ".dropdown-btn-icon" },
  { n: 3, side: "top", target: ".dropdown-btn-label" },
  { n: 4, side: "top", target: ".dropdown-btn-chevron" },
  { n: 5, side: "left", target: ".dropdown-menu" },
  { n: 6, side: "right", target: ".dropdown-item" },
  { n: 7, side: "right", target: ".dropdown-divider" },
  { n: 8, side: "right", target: ".dropdown-item.is-destructive" },
];

export default function DropdownMenuPage() {
  return (
    <DSSection
      id="dropdown"
      title="Dropdown Menu"
      sub="Déclencheur .dropdown-btn + liste flottante .dropdown-menu. Un clic sur le bouton ouvre/ferme le menu ; le chevron pivote. Primitive partagée : Book Card Kebab, Export Menu, Sort Menu et Filters s'appuient dessus."
    >
      {/* ─────────── 1. PREVIEW — trigger + menu assemblés ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <div className="ds-anno-dropdown">
              <Trigger open />
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
          <p className="ds-note">Le déclencheur ouvre le menu, positionné juste dessous. Rendu <code>position: static</code> pour la doc ; en usage réel le menu est portalisé (voir Behavior).</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée (trigger + menu) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-dropdown ds-anno-organism">
              <Trigger open />
              <div className="dropdown-menu ds-menu-static" role="menu" style={{ width: 340 }}>
                <button type="button" className="dropdown-item">Label</button>
                <button type="button" className="dropdown-item">Label</button>
                <div className="dropdown-divider" role="separator" />
                <button type="button" className="dropdown-item is-destructive">Destructive</button>
              </div>
            </div>
          </AnnoScene>
          </div>
        </div>
      </div>

      {/* ─────────── 3. ELEMENTS — table des parties ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.dropdown-btn</span></td><td>Déclencheur : bouton <strong>Outline</strong> qui ouvre/ferme le menu (voir <strong>Buttons</strong>). <code>aria-haspopup</code> + <code>aria-expanded</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.dropdown-btn-icon</span></td><td>Icône de tête (svg 16) — padding gauche réduit de 4 (asymétrie icône).</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.dropdown-btn-label</span></td><td>Libellé du bouton, 15/600.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.dropdown-btn-chevron</span></td><td>Chevron de fin — <code>rotate(180deg)</code> à l&apos;ouverture. Gouttière droite réduite de 8.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.dropdown-menu</span></td><td>Conteneur flottant : padding <code>4</code>, radius 10, border 1.5 <span className="ds-token-chip">--border-subtle</span>, ombre, <code>width: fit-content</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>6</td><td><span className="ds-class">.dropdown-item</span></td><td>Action : height 40, padding <code>0 12</code>, font 15/500 <span className="ds-token-chip">--text</span>, <code>width: 100%</code>. Icône svg 16 + gap 12 optionnelle.</td><td>—</td></tr>
              <tr className="table-row"><td>7</td><td><span className="ds-class">.dropdown-divider</span></td><td>Séparateur : 1px <span className="ds-token-chip">--border-subtle</span>, <code>margin: 4px 8px</code>. Regroupe les items par bloc logique.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>8</td><td><span className="ds-class">.is-destructive</span></td><td>Variante destructive d&apos;un item : texte <span className="ds-token-chip">--destructive</span>, hover fond rouge 0.08.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 4. SPACING — trigger + item + conteneur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><Trigger /></Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <button type="button" className="dropdown-item" style={{ width: 260 }}>Mark as finished</button>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              {/* Pas de --portal (min-width 180 + width auto déborderait le mat inline-flex). */}
              <Redline cellSeparators>
                <div className="dropdown-menu ds-menu-static" role="menu" style={{ width: 260 }}>
                  <button type="button" className="dropdown-item">Mark as finished</button>
                  <button type="button" className="dropdown-item">Add a quote</button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Trigger <span className="ds-class">.dropdown-btn</span> : gouttières asymétriques (icône −4 à gauche, chevron −8 à droite). Item : padding <strong>0 12</strong>, hauteur 40. Conteneur : padding <strong>4</strong> sur les 4 côtés. <strong>Contrat des listes flottantes 10 / 4 / 6</strong> : menu radius 10 · padding 4 · item radius 6 (= 10 − 4, rayons imbriqués). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 5. STATES — item + note trigger ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · item</div>
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
          <p className="ds-note">Item — Hover <span className="ds-token-chip">--primary-5</span> + texte <span className="ds-token-chip">--primary-50</span> · Active <span className="ds-token-chip">--primary-10</span> · Destructive texte <span className="ds-token-chip">--destructive</span> · Disabled opacité 0.4, <strong>visible</strong>. Trigger <span className="ds-class">.dropdown-btn</span> — suit les états du bouton <strong>Outline</strong> ; ouvert, le chevron pivote de 180°.</p>
        </div>
      </div>

      {/* ─────────── 6. SIZING ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Menu width</div>
            <p><code>width: fit-content</code> — le menu s&apos;ajuste à son item le plus large ; en usage portal, un <strong>gabarit minimal 180</strong>. L&apos;item est <code>width: 100%</code> dans son menu. Le menu n&apos;est <strong>pas</strong> aligné sur la largeur du trigger.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Height</div>
            <p>Somme des items (40 chacun) + padding 4 + dividers. Pas de <code>max-height</code> par défaut.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 7. BEHAVIOR ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Toggle</div>
            <p>Clic sur <span className="ds-class">.dropdown-btn</span> → ouvre/ferme le menu ; le chevron pivote de 180°. <code>aria-expanded</code> reflète l&apos;état, clic-hors et Escape ferment.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Portal</div>
            <p>En usage réel, le menu est portalisé sur <code>document.body</code> (<code>position: fixed</code>) et positionné sous son déclencheur — évite le clipping par un parent <code>overflow</code>. Rendu <code>static</code> ici pour la doc. Voir <strong>Book Card Kebab</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Disabled item &amp; nested radii</div>
            <p>Un item disabled reste <strong>visible</strong> (opacité 0.4, <code>title</code> + early return). Item radius 6 = radius menu (10) − padding (4) : deux courbes concentriques ne se lisent parallèles que si leur écart vaut l&apos;espace qui les sépare.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 8. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Le déclencheur, le positionnement et les items dépendent du contexte : <strong>Book Card Kebab</strong> (trois points au lieu du <span className="ds-class">.dropdown-btn</span>), <strong>Export Menu</strong>, <strong>Sort Menu</strong>, <strong>Filters</strong>. Tous montent le même <span className="ds-class">.dropdown-menu</span> / <span className="ds-class">.dropdown-item</span> ; seuls le trigger et la liste d&apos;actions changent.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
