import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { FiltersPanelSpec, FilterSection, FilterRow } from "../_specs";

const ANNOS = [
  { n: 1, side: "right", target: ".filters-panel" },
  { n: 2, side: "left", target: ".filters-panel-header" },
  { n: 3, side: "left", target: ".filters-panel-section" },
  { n: 4, side: "left", target: ".filter-row" },
  { n: 5, side: "bottom", target: ".filters-panel-footer" },
];

export default function FiltersPanelPage() {
  return (
    <DSSection
      id="filters-panel"
      title="Filters Panel"
      sub="Panneau slide-in (mobile ≤1280) qui déplie inline toutes les dimensions repliées de la Filters Row. Réutilise la primitive .book-panel ; header (résultat) → sections de filtres → footer sticky (Confirm + Clear)."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <FiltersPanelSpec />
          </div>
          </div>
          <p className="ds-note">Le panneau montré en flux (position <code>fixed</code> / slide-in neutralisée pour la doc). En usage réel il glisse depuis la droite sur un <span className="ds-class">.panel-overlay</span>, ouvert par le bouton « Filter » de la <a href="/design-system/filters/row"><strong>Filters Row</strong></a>. Il ne montre que les filtres <strong>pas déjà inline</strong> (les <code>promotedFilters</code> sont sautés).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="book-panel filters-panel ds-panel-static ds-anno-organism">
              <div className="panel-inner">
                <button type="button" className="panel-close" aria-label="Close">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
                <div className="filters-panel-wrap">
                  <div className="filters-panel-header"><span className="filters-panel-count">42 of 128 books</span></div>
                  <FilterSection label="Reading status">
                    <FilterRow role="radio" checked label="Any" count={128} />
                    <FilterRow role="radio" label="Not started" count={54} />
                    <FilterRow role="radio" label="Currently reading" count={12} />
                    <FilterRow role="radio" label="Finished" count={62} />
                  </FilterSection>
                  <div className="filters-panel-footer" style={{ margin: "0 -32px", position: "static" }}>
                    <button type="button" className="btn btn-md btn-primary filters-panel-confirm"><span>Confirm</span><span className="filters-confirm-count">42</span></button>
                    <button type="button" className="btn btn-md btn-secondary">Clear filters</button>
                  </div>
                </div>
              </div>
            </div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.book-panel.filters-panel</span></td><td>Coquille slide-in : réutilise la primitive <span className="ds-class">.book-panel</span> (fixed, translateX, overlay, a11y). Largeur 540, glisse depuis la droite.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.filters-panel-header</span></td><td>Compteur de résultat (28) : <code>N of total</code> quand un filtre restreint, <code>total</code> sinon.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.filters-panel-section</span></td><td>Groupe labellisé : <span className="ds-class">.panel-section-eyebrow</span> + <span className="ds-class">.filters-panel-rows</span>. Une par dimension repliée.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.filter-row</span></td><td>Ligne : <span className="ds-class">Row Checkbox</span> (radio ou checkbox) + label + compteur <span className="ds-token-chip">.sidebar-badge</span>. Hover bg <span className="ds-token-chip">--primary-5</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.filters-panel-footer</span></td><td>Sticky bas : <strong>Confirm</strong> + pill compteur, <strong>Clear filters</strong> (disabled si aucun filtre). Débord latéral <code>0 −32</code> pour un fond flush.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          {/* global — coquille : padding + rythme */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector=".filters-panel-wrap">
                <div className="panel-inner" style={{ position: "relative", width: 420, alignItems: "stretch", paddingBottom: 0, gap: 0 }}>
                  <div className="filters-panel-wrap">
                    <div className="filters-panel-header"><span className="filters-panel-count">42 of 128 books</span></div>
                    <FilterSection label="Reading status">
                      <FilterRow role="radio" checked label="Any" count={128} />
                      <FilterRow role="radio" label="Finished" count={62} />
                    </FilterSection>
                    <div className="filters-panel-footer" style={{ margin: 0, position: "static" }}>
                      <button type="button" className="btn btn-md btn-primary filters-panel-confirm"><span>Confirm</span><span className="filters-confirm-count">42</span></button>
                      <button type="button" className="btn btn-md btn-secondary">Clear</button>
                    </div>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Coquille</strong> — <span className="ds-class">.panel-inner</span> padde <strong>96 / 32 / 0</strong> : haut <strong>96</strong> (dégage le bouton close), côtés <strong>32</strong>, <strong>bas 0</strong> — dans le contexte <span className="ds-class">.filters-panel</span>, c&apos;est le footer sticky qui porte le bas (le padding-bottom 72 par défaut de <span className="ds-class">.panel-inner</span> est surchargé à 0). Le rythme entre header → sections → footer est un gap <strong>40</strong> (porté par <span className="ds-class">.filters-panel-wrap</span>, le panel-inner étant à gap 0). Le footer déborde de <strong>−32</strong> latéraux pour un fond flush.</p>

          {/* section + rows — une seule planche (gapSelector cote les gaps des rows imbriquées) */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector=".filters-panel-rows">
                <div className="panel-section filters-panel-section" style={{ width: 320 }}>
                  <span className="panel-section-eyebrow">Reading status</span>
                  <div className="filters-panel-rows">
                    <FilterRow role="radio" checked label="Any" count={128} />
                    <FilterRow role="radio" label="Not started" count={54} />
                    <FilterRow role="radio" label="Currently reading" count={12} />
                    <FilterRow role="radio" label="Finished" count={62} />
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Section &amp; rows</strong> — <span className="ds-class">.filters-panel-section</span> : gap <strong>16</strong> entre l&apos;eyebrow et le bloc de rows (hérité de <span className="ds-class">.panel-section</span>). <span className="ds-class">.filters-panel-rows</span> : gap <strong>4</strong> entre lignes. <em>Note :</em> la surcharge <code>.filters-panel-section {'{'} gap: 8 {'}'}</code> est <strong>morte</strong> — écrasée par <span className="ds-class">.panel-section</span> à l&apos;ordre source (le redline runtime le révèle) ; candidat cleanup prod. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Confirm ne fait que fermer</div>
            <p>Les filtres sont <strong>déjà appliqués</strong> (au tap, la liste se met à jour derrière le panel). <em>Confirm</em> ferme simplement ; le compteur sur le bouton rappelle que le filtrage est automatique. <em>Clear filters</em> vide les 4 filtres en un handler (auto-batching React).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sections dynamiques</div>
            <p>Le panel ne montre que les dimensions <strong>pas déjà inline</strong> dans la Filters Row (les <code>promotedFilters</code> passés par <code>SearchBar</code> sont sautés). Authors et Genres se masquent aussi si la bibliothèque n&apos;en a aucun.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Primitive partagée — <span className="ds-cn">.book-panel</span></div>
            <p>Même montage que Book Panel / Quote Panel / Word List Panel : slide-in <code>transform</code>, overlay, <span className="ds-class">useModalA11y</span> (Escape + focus trap + restauration), scroll-lock. Voir la future famille <strong>Panels</strong>.</p>
          </div>
        </div>
      </div>

      {/* 5 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Sœur desktop</div>
            <p>Contrepartie de la <a href="/design-system/filters/row"><strong>Filters Row</strong></a> : les triggers qui se replient au fil des breakpoints atterrissent ici, en sections. Ensemble ils forment le système <strong>Filters</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><code>MobileFiltersPanel</code> monté par <code>SearchBar</code> (Library / Wishlist) et <code>CollectionDetailView</code>, ouvert par le trigger <span className="ds-class">.filters-mobile-trigger</span>.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
