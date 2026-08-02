import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// Reprise exacte des suggestions telles que l'API les renvoie : titre + sep + auteur.
const SUGGESTIONS = [
  ["1984", "George Orwell"],
  ["Nineteen Eighty-Four", "George Orwell"],
  ["1984 (annotated)", "Various"],
];

// Le champ + sa liste de suggestions (réutilisé Preview / Anatomy). focused = 1er item.
function Field() {
  return (
    <div className="modal-field">
      <label>Title</label>
      <input defaultValue="1984" autoComplete="off" readOnly className="is-focus" />
      <ul className="autocomplete-list open">
        {SUGGESTIONS.map(([title, author], i) => (
          <li key={title} className={`autocomplete-item${i === 0 ? " focused" : ""}`}>
            {title}
            <span className="autocomplete-sep">·</span>
            <span>{author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ITEM_STATES = [
  ["Default", ""],
  ["Focused", "focused"],
];

// Décomposition numérotée : champ (1 + parties 2/3) puis liste (4 + parties 5/6).
const ANNOS = [
  { n: 1, side: "left", target: ".modal-field" },
  { n: 2, side: "top", target: ".ds-anno-autocomplete label" },
  { n: 3, side: "right", target: ".ds-anno-autocomplete input" },
  { n: 4, side: "left", target: ".autocomplete-list" },
  { n: 5, side: "right", target: ".autocomplete-item:not(.focused)" },
  { n: 6, side: "right", target: ".autocomplete-item.focused" },
];

export default function AutocompletePage() {
  return (
    <DSSection
      id="autocomplete"
      title="Autocomplete"
      sub="La liste de suggestions qui apparaît sous le champ titre quand on cherche un livre à ajouter."
    >
      {/* ─────────── 1. PREVIEW — champ focus + liste ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          {/* Markup identique à AddModal (.modal-field > label + input + ul.open) : la
              doc monte le composant réel. La liste est absolute → réserve de hauteur
              par .ds-autocomplete-stage sinon elle sortirait de la carte. */}
          <div className="ds-preview-board">
          <div className="ds-preview">
            <div className="ds-autocomplete-stage">
              <Field />
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée (UI réelle) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-autocomplete ds-anno-organism">
              <Field />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal-field</span></td><td>Champ hôte : label + input, <code>position: relative</code> — ancre la liste flottante.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">label</span></td><td>Libellé du champ, 13/500 <span className="ds-token-chip">--text-2</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">input</span></td><td>Saisie. L&apos;autocomplete n&apos;apparaît qu&apos;au <strong>focus</strong> (bordure <span className="ds-token-chip">--primary-50</span> + anneau).</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.autocomplete-list</span></td><td>Liste flottante <code>absolute</code> à <code>top: calc(100% + 4px)</code>, <code>left/right: 0</code> (épouse la largeur du champ). Bg <span className="ds-token-chip">--card</span>, border 1.5 <span className="ds-token-chip">--border-subtle</span>, radius 10, padding 4, ombre, <code>z-index: 700</code>. <span className="ds-class">.open</span> la révèle.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.autocomplete-item</span></td><td>Suggestion : padding <code>10 14</code>, radius 6, title 15/600 + <span className="ds-class">.autocomplete-sep</span> <span className="ds-token-chip">--text-3</span> + auteur 14/400 <span className="ds-token-chip">--text-2</span>. Ellipsis sur une ligne.</td><td>—</td></tr>
              <tr className="table-row"><td>6</td><td><span className="ds-class">.focused</span></td><td>Item survolé / clavier : bg <span className="ds-token-chip">--primary-5</span>, color <span className="ds-token-chip">--primary-50</span>. Un seul état visuel pour souris et flèches.</td><td>—</td></tr>
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
                <div className="autocomplete-item" style={{ width: 260, position: "static" }}>
                  1984<span className="autocomplete-sep">·</span><span>George Orwell</span>
                </div>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline cellSeparators>
                <ul className="autocomplete-list open" style={{ position: "static", width: 260 }}>
                  {SUGGESTIONS.slice(0, 2).map(([title, author], i) => (
                    <li key={title} className={`autocomplete-item${i === 0 ? " focused" : ""}`}>
                      {title}<span className="autocomplete-sep">·</span><span>{author}</span>
                    </li>
                  ))}
                </ul>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Item : padding <strong>10 14</strong>, radius 6. Conteneur <span className="ds-class">.autocomplete-list</span> : padding <strong>4</strong> sur les 4 côtés. <strong>Contrat des listes flottantes 10 / 4 / 6</strong> : liste radius 10 · padding 4 · item radius 6 (= 10 − 4, rayons imbriqués) — commun à dropdown, autocomplete, filter, voir <strong>Shadows &amp; Radius</strong>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 5. STATES — item ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · item</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {ITEM_STATES.map(([label, mod]) => (
              <div key={label} className="ds-state-sample">
                <div className={`autocomplete-item${mod ? " " + mod : ""}`} style={{ width: 240, position: "static" }}>
                  {label}<span className="autocomplete-sep">·</span><span>George Orwell</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Deux états seulement : Default, et <strong>Focused</strong> (survol souris <span className="ds-class">.autocomplete-item:hover</span> = flèches clavier <span className="ds-class">.focused</span>) — bg <span className="ds-token-chip">--primary-5</span> + color <span className="ds-token-chip">--primary-50</span> (<span className="ds-token-chip">--primary-40</span> en dark). L&apos;état vide n&apos;existe pas : la liste n&apos;est montée que si l&apos;API renvoie ≥ 1 suggestion.</p>
        </div>
      </div>

      {/* ─────────── 6. SIZING ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Width</div>
            <p>La liste <strong>épouse la largeur du champ</strong> (<code>left/right: 0</code>) — jamais une largeur fixe ni <code>fit-content</code>, pour rester alignée sous l&apos;input.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Height</div>
            <p><code>max-height: 220px</code> + <code>overflow-y: auto</code> — au-delà de ~5 suggestions la liste défile au lieu de pousser la modale.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 7. BEHAVIOR ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Selection</div>
            <p>Déclenchée sur <code>onMouseDown</code>, pas <code>onClick</code> : le <code>click</code> arrive après le <code>blur</code> du champ, qui a déjà démonté la liste — la suggestion ne serait jamais sélectionnée. Elle pré-remplit titre + auteur.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Keyboard</div>
            <p>Flèches haut/bas déplacent <span className="ds-class">.focused</span>, Enter valide, Escape ferme. L&apos;index actif est porté par l&apos;état du composant parent, pas par le focus DOM (le champ garde le focus pendant la navigation).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Nested radii</div>
            <p>Item radius 6 = radius liste (10) − padding (4) : deux courbes concentriques ne se lisent parallèles que si leur écart vaut l&apos;espace qui les sépare.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 8. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Deux consommateurs : <strong>AddModal</strong> (champ Title, onglet Manual) et <strong>AddQuoteModal</strong> (recherche du livre rattaché). Toute nouvelle occurrence réutilise <span className="ds-class">.autocomplete-list</span> / <span className="ds-class">.autocomplete-item</span> plutôt que de recréer une liste de suggestions.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
