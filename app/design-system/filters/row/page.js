import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { Trigger, QuotesToggle, QuotesLines, MobileTrigger, FiltersRowSpec } from "../_specs";
import FiltersRowFit from "../_FiltersRowFit";

const ANNOS = [
  { n: 1, side: "top", target: ".filters-row" },
  { n: 2, side: "bottom", target: ".filters-sort" },
  { n: 3, side: "bottom", target: ".quotes-toggle" },
];

// Une cellule du tableau de fold : les triggers restés inline + (option) le bouton Filter.
function FoldCell({ labels, quotes, filter }) {
  return (
    <div className="ds-fold-cell">
      {labels.map((l, i) => (
        <Trigger key={l} label={l} wrap={i === 0 ? "sort-menu filters-sort" : "sort-menu"} />
      ))}
      {quotes && <QuotesToggle />}
      {filter ? <MobileTrigger count={0} /> : null}
    </div>
  );
}

const F = ["Date added", "Authors", "Reading status", "Rating", "Genres"];

export default function FiltersRowPage() {
  return (
    <DSSection
      id="filters-row"
      title="Filters Row"
      sub="La rangée de filtres sous la recherche : chaque bouton affine la liste sur un critère. Quand la place manque, les filtres se replient dans un panneau."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <FiltersRowFit className="ds-filters-row--center" />
          </div>
          </div>
          <p className="ds-note">Le cluster <strong>responsive</strong> (redimensionne la fenêtre pour voir les triggers se replier progressivement dans le bouton <strong>Filter</strong>), sous la barre de recherche dans <span className="ds-class">.search-bar-wrap</span>. Chaque trigger réutilise la brique <span className="ds-class">Dropdown</span> ; un filtre actif passe en <span className="ds-class">.is-active</span> (bord + fond <span className="ds-token-chip">--primary-50</span> / <span className="ds-token-chip">--primary-5</span>).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--filters-row">
          <AnnoScene annos={ANNOS}>
            <FiltersRowFit className="ds-anno-organism ds-filters-row--center" />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.filters-row</span></td><td>Rangée <span className="ds-class">.cell-row--lg</span> en <code>flex-wrap</code>, gap 8.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.dropdown-btn</span></td><td>Trigger radio ou multi-select : label + chevron. Brique <span className="ds-class">Dropdown</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.dropdown-btn--icon</span></td><td>Toggle icône 40×40 (Books with quotes).</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.filters-mobile-trigger</span></td><td>Ouvre le Filters Panel. Icône + label + <span className="ds-token-chip">.filter-badge</span>.</td><td><span className="now-reading-date now-reading-date--sm">≤1280</span></td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.filters-reset-btn</span></td><td>Vide tous les filtres.</td><td><span className="now-reading-date now-reading-date--sm">si actif</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="cell-row cell-row--lg filters-row" style={{ flexWrap: "nowrap", width: "fit-content" }}>
                  <Trigger label="Date added" wrap="sort-menu filters-sort" />
                  <Trigger label="Rating" wrap="sort-menu filters-rating" />
                  <QuotesToggle />
                  <button type="button" className="dropdown-btn filters-mobile-trigger">
                    <QuotesLines className="dropdown-btn-icon" />
                    <span className="dropdown-btn-label">Filter</span>
                  </button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Le rythme propre à la rangée : gap <strong>8</strong> entre triggers (row-gap <strong>12</strong> quand ça wrappe). Le padding et les cotes internes d&apos;un trigger vivent sur la page <span className="ds-class">Dropdown</span>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — BEHAVIOR · fold (tableau visuel) */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · fold progressif vers le panel</div>
        <div className="ds-card-body col">
          <table className="token-table ds-fold-visual">
            <thead className="table-head"><tr><th>Breakpoint</th><th>Triggers inline</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td className="mono">≥ 1281</td><td><FoldCell labels={F} quotes /></td></tr>
              <tr className="table-row"><td className="mono">≤ 1280</td><td><FoldCell labels={F} filter={1} /></td></tr>
              <tr className="table-row"><td className="mono">≤ 1080</td><td><FoldCell labels={F.slice(0, 4)} filter={2} /></td></tr>
              <tr className="table-row"><td className="mono">≤ 768</td><td><FoldCell labels={F.slice(0, 3)} filter={3} /></td></tr>
              <tr className="table-row"><td className="mono">≤ 600</td><td><FoldCell labels={F.slice(0, 2)} filter={4} /></td></tr>
              <tr className="table-row"><td className="mono">≤ 480</td><td><FoldCell labels={F.slice(0, 1)} filter={5} /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">À chaque palier qui rétrécit, le <strong>filtre suivant</strong> (ordre de priorité) quitte la rangée et rejoint le bouton <strong>Filter</strong>, qui donne accès aux filtres repliés dans le <a href="/design-system/filters/panel"><strong>Filters Panel</strong></a>. <strong>Sort reste toujours inline.</strong> <code>SearchBar</code> réplique ces breakpoints via <span className="ds-class">useMediaQuery</span> pour que le panel saute les filtres déjà inline — pas de doublon.</p>
        </div>
      </div>

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Trois types de trigger</div>
            <p><strong>Radio</strong> (<span className="ds-class">SortMenu</span>) — un choix exclusif : Sort, Reading, Rating. <strong>Multi-select</strong> (<span className="ds-class">AuthorsMenu</span> / <span className="ds-class">GenresMenu</span>) — cases cumulables. <strong>Toggle icône</strong> (<span className="ds-class">.quotes-toggle</span>) — un booléen. Tous partagent la brique <span className="ds-class">Dropdown</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Filtrage immédiat</div>
            <p>Le filtre s&apos;applique <strong>au tap</strong>, la liste se met à jour derrière — pas de bouton Apply. <strong>Reset</strong> vide tout en un handler (auto-batching React). Les filtres se réinitialisent au changement d&apos;onglet.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sœur mobile</div>
            <p>La contrepartie mobile est le <a href="/design-system/filters/panel"><strong>Filters Panel</strong></a> (slide-in <span className="ds-class">.book-panel</span> qui déplie les dimensions repliées). Consumers : <code>SearchBar</code> (Library / Wishlist), <code>CollectionDetailView</code>.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
