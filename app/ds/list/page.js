import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import { ListViewSpec, ListRowSample } from "./_specs";

const STATES = [
  { label: ".list-row", props: {} },
  { label: ".list-row:hover", props: { hover: true } },
  { label: ".list-row.selected", props: { selected: true } },
  { label: ".row-checkbox · edit", props: { editMode: true, selected: true } },
];

const ANNOS = [
  { n: 1, side: "top", target: ".table-head th.sorted" },
  { n: 2, side: "left", target: ".list-row .list-cell-num" },
  { n: 3, side: "bottom", target: ".list-row .list-cell-title" },
  { n: 4, side: "bottom", target: ".list-row .list-cell-tag" },
  { n: 5, side: "right", target: ".list-row .list-cell-action" },
];

export default function ListViewPage() {
  return (
    <DSSection
      id="list"
      title="Table"
      sub="Affichage tabulaire de la bibliothèque — la primitive .list-table (table-layout fixed) : un header trié, des rangées .list-row de 60px, cinq types de cellule (num, title, meta, tag, action). Socle partagé par les listes de livres, le Dictionnaire, les Collections."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview ds-scene--list">
              <ListViewSpec />
            </div>
          </div>
          <p className="ds-note">Mode consultation : colonne <strong>#</strong> (index), <strong>Title</strong> (triée), <strong>Author</strong>, <strong>Genre</strong>, <strong>Year</strong>, et un <span className="ds-class">.col-card-kebab</span> par rangée. Clic sur un en-tête trie la colonne ; clic sur une rangée ouvre le <a href="/ds/panels/book"><strong>Book Panel</strong></a>. En mode édition, la 1re colonne devient une case à cocher (voir <strong>States</strong>).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--list">
            <AnnoScene annos={ANNOS}>
              <ListViewSpec className="ds-anno-organism" />
            </AnnoScene>
          </div>
        </div>
      </div>

      {/* 3 — ELEMENTS */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>·</td><td><span className="ds-class">.list-table</span></td><td>Table <code>table-layout: fixed</code>, <code>width: 100%</code>, <code>border-collapse</code>, <code>font-size: 14</code>. Largeurs de colonnes figées → colonnes stables, texte tronqué.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.table-head</span> th</td><td>En-tête trié : fond <span className="ds-token-chip">--bg-head</span>, th <code>11 / 700</code> uppercase <span className="ds-token-chip">--text-2</span>, cliquable ; <span className="ds-class">.sorted</span> → <span className="ds-token-chip">--accent</span> + <span className="ds-class">.sort-arrow</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.list-cell-num</span></td><td>Colonne fixe <strong>64px</strong> : index de rangée (<code>14 / 600</code> <span className="ds-token-chip">--text-3</span>, tabular) ou <span className="ds-class">.row-checkbox</span> en édition.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.list-cell-title</span></td><td>Titre — <span className="ds-class">.list-title</span> <code>15 / 700</code> <span className="ds-token-chip">--text</span>, tronqué. Largeur <strong>30%</strong>.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.list-cell-meta</span> / <span className="ds-class">.list-cell-tag</span></td><td>Author (30%), Genre (tag, 20%), Year (auto) — <code>15 / 500</code> <span className="ds-token-chip">--text-2</span>, tronqués.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.list-cell-action</span></td><td>Colonne fixe <strong>64px</strong>, <code>sticky right</code> : le <span className="ds-class">Kebab</span> reste épinglé au scroll horizontal. Hérite le bg de la rangée.</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.list-row</span></td><td>Rangée : hauteur <strong>60</strong>, bg <span className="ds-token-chip">--card</span>, <code>border-bottom</code> <span className="ds-token-chip">--border-subtle</span>. <span className="ds-class">.selected</span> → <span className="ds-token-chip">--primary-5</span>.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Header — <span className="ds-cn">.table-head</span></div>
            <p>Hauteur <span className="ds-token-chip">--height-head</span>, fond <span className="ds-token-chip">--bg-head</span>, <code>border-bottom</code> 1px <span className="ds-token-chip">--border-subtle</span>. Chaque <code>th</code> padde <strong>11 / 24</strong> ; <span className="ds-class">.th-inner</span> aligne label ↔ flèche à gap <strong>4</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Rangée &amp; cellules — <span className="ds-cn">.list-row</span> / td</div>
            <p>Rangée haute de <strong>60</strong>. Chaque <code>td</code> padde <strong>10 / 24</strong> (<code>vertical-align: middle</code>). La colonne <span className="ds-class">.list-cell-num</span> padde <strong>10 / 0</strong> (centrée), l&apos;action <strong>0 / 8</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Colonnes (table-layout fixed)</div>
            <p><span className="ds-class">.list-cell-num</span> et <span className="ds-class">.list-cell-action</span> : <strong>64px</strong> fixes. <span className="ds-class">.list-cell-title</span> et author : <strong>30%</strong>. Genre (<span className="ds-class">.list-cell-tag</span>) : <strong>20%</strong>. Year : <code>auto</code> (prend le reste). Le texte qui déborde est coupé en <code>ellipsis</code>. <em>Fragilité</em> : sous ~1080px de table, ce « reste » de Year tombe à ~0 et se coupe — le repli <code>overflow-x</code> de <span className="ds-class">.books-list</span> ne se déclenche pas (pas de <code>min-width</code>). La scène /ds étant plus étroite, la doc affiche la table en <strong>content-sizing</strong> (colonnes ajustées au contenu) pour éviter cet écrasement.</p>
          </div>
        </div>
      </div>

      {/* 5 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-list-states">
            {STATES.map((s) => (
              <div key={s.label} className="ds-list-state">
                <ListRowSample {...s.props} />
                <span className="ds-class">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="ds-note">Quatre états de la rangée. <strong>Default</strong> : bg <span className="ds-token-chip">--card</span>. <strong>Hover</strong> : <span className="ds-token-chip">--primary-3</span>. <strong>Selected</strong> (édition) : <span className="ds-token-chip">--primary-5</span>, la <span className="ds-class">.row-checkbox</span> se remplit (<span className="ds-token-chip">--primary-50</span>). <strong>Edit</strong> : la colonne d&apos;index devient une case à cocher (<strong>18×18</strong>, radius 5, réutilise <span className="ds-class">Row Checkbox</span>) + un <em>select-all</em> dans le header. Le tri de colonne (<span className="ds-class">.sorted</span> → <span className="ds-token-chip">--accent</span> + flèche) est couvert dans <strong>Behavior</strong>.</p>
        </div>
      </div>

      {/* 6 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Tri</div>
            <p>Clic sur un <code>th</code> appelle <code>toggleSort(key)</code> : la colonne devient active (<span className="ds-token-chip">--accent</span> + <span className="ds-class">.sort-arrow</span>), le sens bascule asc ↔ desc. Le tri lui-même est calculé par le parent (Library / Wishlist).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Action épinglée</div>
            <p><span className="ds-class">.list-cell-action</span> est <code>position: sticky; right: 0</code> — le kebab reste visible quand la table déborde et scrolle horizontalement (mobile). Pas de fond solide : la cellule hérite l&apos;état de la rangée (hover / selected).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sélection</div>
            <p>En mode édition, clic sur une rangée = <code>toggleSelect</code> (au lieu d&apos;ouvrir le panel) ; le <em>select-all</em> du header coche / décoche tout. La rangée passe <span className="ds-class">.selected</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Layout fixe + ellipsis</div>
            <p><code>table-layout: fixed</code> fige les largeurs ; <code>td {'{'} max-width: 0; text-overflow: ellipsis {'}'}</code> tronque le texte long sans casser la grille. Les colonnes ne dansent pas d&apos;une rangée à l&apos;autre.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Responsive — colonnes qui se replient</div>
            <p>Par <code>@media</code> viewport, <strong>Year</strong> se cache entre <strong>769–1280px</strong>, puis <strong>Author</strong> aussi <strong>≤768px</strong> — la table garde l&apos;essentiel (num, title, genre) sur écran étroit. <em>Fragilité connue</em> : Year étant <code>width: auto</code>, en dessous de ~1080px de table (avant le repli) son « reste » tombe à ~0 et se coupe, car le <code>overflow-x</code> de <span className="ds-class">.books-list</span> ne se déclenche pas (pas de <code>min-width</code>). Le specimen force l&apos;affichage complet et un <strong>content-sizing</strong> pour la lisibilité de la doc.</p>
          </div>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Primitive cross-table</div>
            <p><span className="ds-class">.list-table</span> / <span className="ds-class">.list-row</span> / <span className="ds-class">.list-cell-*</span> est le socle partagé : List View des livres (Library / Wishlist), tables du Dictionnaire (<span className="ds-class">.dictionary-letter-table</span>), Collections, et les List Panels. Voir <span className="ds-class">List tables pattern</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumer</div>
            <p><code>BookList</code>, monté par Library / Wishlist en mode liste. Le kebab est <span className="ds-class">Kebab</span> (<code>BookCardKebab</code>), la case à cocher <span className="ds-class">Row Checkbox</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Alternative — grille</div>
            <p>La même donnée en grille = <a href="/ds/card/book"><strong>Book Card</strong></a>. On bascule liste ↔ grille via le <span className="ds-class">View Toggle</span>.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
