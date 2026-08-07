import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import { SelectionBarSpec, AnatomyResponsive } from "../_specs";
import { ListViewSpec } from "../../list/_specs";

// Anatomy — deux jeux d'annos selon la disposition (AnatomyResponsive bascule au
// breakpoint conteneur). Horizontal : badges haut/bas, gauche → droite sur les
// feuilles. Vertical (barre empilée) : badges gauche/droite alternés, un par rangée.
const ANNOS = [
  { n: 1, side: "top", target: ".selection-count" },
  { n: 2, side: "bottom", target: ".sel-select-all" },
  { n: 3, side: "top", target: ".sel-confirm.danger" },
  { n: 4, side: "bottom", target: ".sel-cancel" },
];
const VERTICAL_ANNOS = [
  { n: 1, side: "left", target: ".selection-count" },
  { n: 2, side: "right", target: ".sel-select-all" },
  { n: 3, side: "left", target: ".sel-confirm.danger" },
  { n: 4, side: "right", target: ".sel-cancel" },
];

export default function BulkPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="bulk"
      title="Bulk"
      sub="Modifier plusieurs éléments d'un coup : on entre en mode sélection, on coche, puis on applique une action à tous via la barre flottante. Le pendant pour un seul élément est le menu contextuel."
    >
      {/* ─────────── 1. PREVIEW — le flow in-situ ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview" style={{ flexDirection: "column", gap: 32, alignItems: "center" }}>
              <ListViewSpec editMode selected={[0, 2]} className="ds-list-mobile" />
              <SelectionBarSpec count={2} total={3} responsive />
            </div>
          </div>
          <p className="ds-note">Le mode sélection <em>en situation</em> : la liste passe ses numéros en <span className="ds-class">.row-checkbox</span>, les rows cochées prennent l&apos;état <span className="ds-class">.selected</span>, et la <strong>Bulk bar</strong> monte du bas. Compteur live, actions à droite, Cancel pour sortir.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — la barre décomposée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnatomyResponsive horizontalAnnos={ANNOS} verticalAnnos={VERTICAL_ANNOS} count={2} total={3} threshold={720} />
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.selection-count</span></td><td>Compteur <strong>live</strong> du nombre d&apos;items cochés (« 2 selected »). Poussé à gauche ; opacité 0.75 pour rester secondaire face aux actions.</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.sel-actions</span></td><td>Wrapper du cluster central (gap <strong>8</strong>) : regroupe Select all, l&apos;action destructive et — en onglet Wishlist — « Mark as owned ». Son contenu est <strong>contextuel</strong>, pas du DS.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.sel-select-all</span></td><td>Bascule <strong>Select all / Deselect all</strong> — bouton fantôme (bord blanc translucide). Coche/décoche tout le lot d&apos;un geste.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.sel-confirm.danger</span></td><td>Action <strong>destructive</strong> (Remove / Delete) : désactivée à 0 sélection, passe par une <span className="ds-class">Delete Modal</span> avant d&apos;agir.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.sel-cancel</span></td><td>Sort du mode sélection sans rien appliquer. Toujours à droite, détaché du cluster d&apos;actions.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — la barre cotée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined ds-redline-board--roomy">
            <Redline keepShape padSelector=".selection-bar" gapSelector=".sel-actions">
              <SelectionBarSpec count={2} total={3} responsive need={720} />
            </Redline>
          </div>
          <p className="ds-note">La barre padde <strong>12 / 12 / 12 / 24</strong> — plus d&apos;air à gauche pour dégager le compteur. Les trois groupes (compteur · actions · Cancel) sont distribués en <code>space-between</code> (gap min <strong>16</strong>) ; le cluster <span className="ds-class">.sel-actions</span> espace ses boutons de <strong>8</strong>. Chaque <span className="ds-class">.sel-btn</span> fait <strong>40</strong> de haut (padding <strong>0 / 20</strong>, radius 8). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — la barre selon la sélection / l'onglet ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · bar</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <SelectionBarSpec count={0} total={3} responsive />
              <span className="panel-section-eyebrow">Aucune sélection</span>
            </div>
            <div className="ds-state-sample">
              <SelectionBarSpec count={3} total={3} responsive />
              <span className="panel-section-eyebrow">Lot complet · Deselect all</span>
            </div>
            <div className="ds-state-sample">
              <SelectionBarSpec count={2} total={3} tab="wishlist" responsive />
              <span className="panel-section-eyebrow">Onglet Wishlist · action « Mark as owned »</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">À <strong>0 sélection</strong> les actions destructives sont désactivées (opacité 0.4, pointer-events off) ; le libellé passe à <strong>Deselect all</strong> quand tout le lot est coché. Le cluster d&apos;actions dépend de l&apos;<strong>onglet</strong> — c&apos;est de la logique produit, pas du DS.</p>
        </div>
      </div>

      {/* ─────────── 4. BEHAVIOR ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Entrée / sortie du mode</div>
            <p>On entre en sélection depuis le Kebab (« Select ») ou un déclencheur d&apos;édition ; chaque row/carte swap son numéro/kebab pour une <span className="ds-class">.row-checkbox</span>. Cancel — ou vider la sélection puis sortir — rend la liste à son état normal.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Reveal</div>
            <p>La barre est <code>position: fixed</code>, ancrée en bas-centre au-dessus de la home indicator (<code>env(safe-area-inset-bottom)</code>). Elle monte via <code>transform: translateY</code> sur la courbe maison <code>cubic-bezier(0.16, 1, 0.3, 1)</code> ; masquée, elle coupe le hit-testing (<code>pointer-events: none</code>) pour ne pas intercepter les touches du panel en dessous.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility</div>
            <p>Les cases sont des cibles réelles ; Select all agit sur tout le lot. L&apos;action destructive est <code>disabled</code> tant que la sélection est vide, et confirmée par modale avant d&apos;agir — pas de suppression en un tap.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><code>SelectionBar.js</code> est piloté par <code>library/page.js</code> (Library, Wishlist) et <code>CollectionDetailView</code>. Le mode sélection touche <code>BookCard</code> (grille) et <code>BookList</code> (liste) — mêmes checkboxes, même barre.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
