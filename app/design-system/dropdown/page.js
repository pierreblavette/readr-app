import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// Menu d'actions canonique (.dropdown-menu) : items + divider + destructif.
function ActionMenu({ width, extra = "" }) {
  return (
    <div className={`dropdown-menu ds-menu-static ${extra}`.trim()} role="menu" style={width ? { width } : undefined}>
      <button type="button" className="dropdown-item">Mark as finished</button>
      <button type="button" className="dropdown-item">Add a quote</button>
      <button type="button" className="dropdown-item">Share</button>
      <div className="dropdown-divider" role="separator" />
      <button type="button" className="dropdown-item is-destructive">Delete</button>
    </div>
  );
}

// Ligne de filtre (case + label + compteur) — partagée par filter-dropdown et authors-dropdown.
function FilterRow({ label, count, selected }) {
  return (
    <div className="filter-row" role="checkbox" aria-checked={selected} tabIndex={0}>
      <span className={`row-checkbox${selected ? " is-selected" : ""}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
      </span>
      <span className="dropdown-item-label">{label}</span>
      <span className="dropdown-item-count-wrap"><span className="dropdown-item-count sidebar-badge">{count}</span></span>
    </div>
  );
}

// Menu filtre (.filter-dropdown) : lignes cases à cocher + compteur. Statique (doc).
const FILTER_ROWS = [["Fiction", 42, true], ["Fantasy", 18, false], ["History", 7, true]];
function FilterMenu() {
  return (
    <div className="dropdown-menu filter-dropdown ds-menu-static" role="listbox" style={{ minWidth: 240 }}>
      <div className="filter-section">
        {FILTER_ROWS.map(([g, c, sel]) => <FilterRow key={g} label={g} count={c} selected={sel} />)}
      </div>
    </div>
  );
}

// Menu filtre RECHERCHABLE (.authors-dropdown, sur .filter-dropdown) : search épinglée +
// liste scrollable + footer Reset. La variante filtre la plus élaborée. Statique (doc).
const AUTHOR_ROWS = [["George Orwell", 4, true], ["Jane Austen", 2, false], ["Leo Tolstoy", 1, true]];
function AuthorsMenu() {
  return (
    <div className="dropdown-menu filter-dropdown authors-dropdown ds-menu-static" role="listbox" style={{ width: 300 }}>
      <div className="authors-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" className="authors-search-input" placeholder="e.g. F. Scott Fitzgerald" readOnly />
      </div>
      <div className="authors-list">
        {AUTHOR_ROWS.map(([name, c, sel]) => <FilterRow key={name} label={name} count={c} selected={sel} />)}
      </div>
      <div className="authors-footer">
        <button type="button" className="btn btn-md btn-secondary">Reset</button>
      </div>
    </div>
  );
}

const ITEM_STATES = [
  ["Default", "", ".dropdown-item"],
  ["Hover", "is-hover", ":hover"],
  ["Active", "is-active", ":active"],
  ["Destructive", "is-destructive", ".is-destructive"],
  ["Disabled", "", ":disabled"],
];

// Décomposition numérotée : le menu seul (le déclencheur est un bouton — voir Buttons).
const ANNOS = [
  { n: 1, side: "left", target: ".dropdown-menu" },
  { n: 2, side: "right", target: ".dropdown-item" },
  { n: 3, side: "right", target: ".dropdown-divider" },
  { n: 4, side: "right", target: ".dropdown-item.is-destructive" },
];

export default function DropdownMenuPage() {
  return (
    <DSSection
      id="dropdown"
      title="Dropdown Menu"
      sub="Le menu flottant qui s'ouvre depuis un bouton : une liste d'actions ou de filtres à choisir. Plusieurs variantes selon ce qu'il contient."
    >
      {/* ─────────── 1. PREVIEW — le menu d'actions canonique ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <ActionMenu />
            </div>
          </div>
          <p className="ds-note">La surface flottante, ouverte sous son déclencheur. Le <strong>déclencheur</strong> — un bouton (kebab, dropdown button, filter button) — vit dans <strong>Buttons</strong> ; c&apos;est <em>lui</em> qui décide du type de menu. Rendu <code>position: static</code> pour la doc (en usage réel, portalisé — voir Behavior).</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée (le menu) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={ANNOS}>
              <div className="ds-anno-organism">
                <div className="dropdown-menu ds-menu-static" role="menu" style={{ width: "var(--spec-w, 340px)" }}>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.dropdown-menu</span></td><td>Conteneur flottant : padding <code>4</code>, radius 10, border 1.5 <span className="ds-token-chip">--border-subtle</span>, ombre, <code>width: fit-content</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.dropdown-item</span></td><td>Action : height 40, padding <code>0 12</code>, radius 6, font 15/500 <span className="ds-token-chip">--text</span>, <code>width: 100%</code>. Icône svg 16 + gap 12 optionnelle.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.dropdown-divider</span></td><td>Séparateur : 1px <span className="ds-token-chip">--border-subtle</span>, <code>margin: 4px 8px</code>. Regroupe les items par bloc logique.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.is-destructive</span></td><td>Variante destructive d&apos;un item : texte <span className="ds-token-chip">--destructive</span>, hover fond rouge 0.08.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.filter-row</span></td><td>Ligne du <span className="ds-class">.filter-dropdown</span> : <span className="ds-class">.row-checkbox</span> + <span className="ds-class">.dropdown-item-label</span> + compteur. <code>role="checkbox"</code>, multi-sélection.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 4. SPACING — item + conteneur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
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
          <p className="ds-note">Item : padding <strong>0 12</strong>, hauteur 40. Conteneur : padding <strong>4</strong> sur les 4 côtés. <strong>Contrat des listes flottantes 10 / 4 / 6</strong> : menu radius 10 · padding 4 · item radius 6 (= 10 − 4, rayons imbriqués). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 5. STATES — item ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · item</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {ITEM_STATES.map(([label, mod, cap]) => (
              <div key={label} className="ds-state-sample">
                <button
                  type="button"
                  className={`dropdown-item${mod ? " " + mod : ""}`}
                  disabled={label === "Disabled"}
                  style={{ width: "auto" }}
                >
                  {label}
                </button>
                <span className="ds-class">{cap}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Item — Hover <span className="ds-token-chip">--primary-5</span> + texte <span className="ds-token-chip">--primary-50</span> · Active <span className="ds-token-chip">--primary-10</span> · Destructive texte <span className="ds-token-chip">--destructive</span> · Disabled opacité 0.4, <strong>visible</strong>.</p>
        </div>
      </div>

      {/* ─────────── 6. SIZING ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Menu width</div>
            <p><span className="ds-class">.dropdown-menu</span> <code>width: fit-content</code> — s&apos;ajuste à son item le plus large, <strong>pas</strong> aligné sur le trigger. <span className="ds-class">.dropdown-menu--portal</span> ajoute <code>min-width: 180</code>. <span className="ds-class">.filter-dropdown</span> <code>min-width: 240</code>, <span className="ds-class">.authors-dropdown</span> <code>width: 300</code>. L&apos;item est <code>width: 100%</code> dans son menu.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Height</div>
            <p>Somme des items (40 chacun) + padding 4 + dividers. Pas de <code>max-height</code> sur un menu d&apos;actions ; le <span className="ds-class">.filter-dropdown</span> plafonne à <code>max-height: 60vh</code> puis scrolle.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 7. VARIANTS · types de menu ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            <div className="ds-state-sample">
              <ActionMenu />
              <span className="ds-class">.dropdown-menu</span>
            </div>
            <div className="ds-state-sample">
              <ActionMenu width={180} extra="dropdown-menu--portal" />
              <span className="ds-class">.dropdown-menu--portal</span>
            </div>
            <div className="ds-state-sample">
              <FilterMenu />
              <span className="ds-class">.filter-dropdown</span>
            </div>
            <div className="ds-state-sample">
              <AuthorsMenu />
              <span className="ds-class">.authors-dropdown</span>
            </div>
          </div>
          <p className="ds-note"><strong>Menu d&apos;actions</strong> <span className="ds-class">.dropdown-menu</span> — items cliquables, largeur <code>fit-content</code> (Kebab, Export, Sort). <strong>Portalisé</strong> <span className="ds-class">.dropdown-menu--portal</span> — même peau, monté sur <code>body</code> en <code>fixed</code> (échappe au clipping) + gabarit <code>min-width: 180</code>. <strong>Filtre</strong> <span className="ds-class">.filter-dropdown</span> — <code>role="listbox"</code>, lignes <span className="ds-class">.filter-row</span> à case + compteur, multi-sélection, <code>min-width: 240</code> (Genres). <strong>Filtre recherchable</strong> <span className="ds-class">.authors-dropdown</span> — variante du <span className="ds-class">.filter-dropdown</span> : <span className="ds-class">.authors-search</span> épinglée + <span className="ds-class">.authors-list</span> scrollable + <span className="ds-class">.authors-footer</span> (Reset), <code>width: 300</code> (Authors). Un même conteneur, quatre contenus.</p>
        </div>
      </div>

      {/* ─────────── 8. BEHAVIOR ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Le déclencheur décide du type</div>
            <p>Le menu n&apos;existe jamais seul : un <strong>bouton</strong> l&apos;ouvre (voir <strong>Buttons</strong>). Un <strong>kebab</strong> ou un <strong>dropdown button</strong> ouvre un menu d&apos;<strong>actions</strong> ; un <strong>filter button</strong> ouvre un menu à <strong>cases</strong> — <span className="ds-class">.filter-dropdown</span> (Genres) ou sa variante recherchable <span className="ds-class">.authors-dropdown</span> (Authors). Un bouton filtre n&apos;ouvre jamais un menu d&apos;actions, et inversement.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Toggle</div>
            <p>Clic sur le déclencheur → ouvre/ferme ; <code>aria-expanded</code> reflète l&apos;état, clic-hors et <strong>Escape</strong> ferment. Le chevron du bouton pivote de 180°.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Portal</div>
            <p>En usage réel, le menu est portalisé sur <code>document.body</code> (<code>position: fixed</code>, <span className="ds-class">.dropdown-menu--portal</span>, <code>z-index: 1000</code>) et positionné sous son déclencheur — évite le clipping par un parent <code>overflow</code>. Rendu <code>static</code> ici pour la doc. Voir <strong>Book Card Kebab</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Disabled item &amp; nested radii</div>
            <p>Un item disabled reste <strong>visible</strong> (opacité 0.4, <code>title</code> + early return). Item radius 6 = radius menu (10) − padding (4) : deux courbes concentriques ne se lisent parallèles que si leur écart vaut l&apos;espace qui les sépare.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 9. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Le déclencheur, le positionnement et le contenu dépendent du contexte : <strong>Book Card Kebab</strong> (trois points), <strong>Export Menu</strong>, <strong>Sort Menu</strong> (menus d&apos;actions), <strong>Filtering</strong> (Genres <span className="ds-class">.filter-dropdown</span>, Authors <span className="ds-class">.authors-dropdown</span>). Tous montent le même <span className="ds-class">.dropdown-menu</span> ; seuls le trigger et le contenu changent.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
