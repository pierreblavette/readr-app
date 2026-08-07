import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";
import { SearchBox } from "../_specs";

const SEARCH_ANNOS = [
  { n: 1, side: "top", target: ".search-box" },
  { n: 2, side: "left", target: ".search-box > svg" },
  { n: 3, side: "bottom", target: ".search-input" },
  { n: 4, side: "right", target: ".search-clear" },
];

export default function SearchFieldPage() {
  return (
    <DSSection className="ds-scene-frame" id="inputs-search" title="Search Field" sub="Le champ de recherche : le socle du Text Field en pill, avec loupe et bouton d'effacement. Vit sur fond de page.">

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <div style={{ width: "min(360px, 100%)" }}>
              <SearchBox focus style={{ width: "100%" }} />
            </div>
          </div>
          </div>
          <p className="ds-note">Même socle que le <a href="/design-system/inputs/text-field"><strong>Text Field</strong></a> (height 40, font 15/600) en <strong>pill</strong> (radius 32), loupe à gauche et bouton clear à droite. Vit sur fond de page — bord visible au repos. Library, Wishlist, Dictionary.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={SEARCH_ANNOS} stack>
            <div className="ds-anno-organism" style={{ width: 340 }}>
              <SearchBox focus style={{ width: "100%" }} />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.search-box</span></td><td>Coquille <strong>pill</strong> : height 40, radius 32, border 1.5 <span className="ds-token-chip">--border-subtle</span> (visible — vit sur fond de page), <code>position: relative</code> pour les éléments absolus.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.search-box svg</span></td><td>Loupe 15×15 <span className="ds-token-chip">--text-2</span>, absolue à <code>left: 14</code>, <code>pointer-events: none</code>, <code>stroke-width 2.5</code> (constant — même graisse au repos et à l&apos;interaction).</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.search-input</span></td><td>Champ transparent : padding <strong>0 38</strong> (gauche, dégage la loupe) / <strong>34</strong> (droite, dégage le clear), font 15/600.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.search-clear</span></td><td>Pastille ronde 18×18 <span className="ds-token-chip">--text-3</span> (hover <span className="ds-token-chip">--text-2</span>), croix 10×10, absolue à <code>right: 10</code>. <span className="ds-class">.visible</span> quand le champ est rempli.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
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
              <Redline boxSelector=".search-clear" hInsets={{ icon: ":scope > svg", padded: ".search-input", control: ".search-clear" }}>
                <SearchBox style={{ width: "var(--spec-w, 300px)", flex: "none" }} />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Coquille height <strong>40</strong>, pill radius 32. Loupe (15×15) : <strong>14</strong> du bord gauche, <strong>9</strong> jusqu&apos;au texte. Clear <span className="ds-class">.search-clear</span> (<strong>18×18</strong>, pill) : <strong>6</strong> depuis le texte, <strong>10</strong> du bord droit. Le padding de l&apos;input (<code>0 38 / 34</code>) = ces segments cumulés. Cotes mesurées à l&apos;exécution.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Variante · <span className="ds-cn">.authors-search-input</span></div>
            <p>Même graphie d&apos;icône (38/34) mais radius 8 et bg <span className="ds-token-chip">--bg3</span> au lieu du pill blanc — variante « encastrée » pour l&apos;en-tête du menu Authors.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
