import DSSection from "../_components/DSSection";

// Échelle de spacing 4px. base : html { font-size:14px } → les rem sont dérivés
// de 14 (1rem = 14px). On documente le pas + l'usage courant, pas de mapping figé.
const SCALE = [
  [2, "0.125rem", "Micro gap (badge)"],
  [4, "0.286rem", "Tight gap"],
  [6, "0.428rem", "Small gap"],
  [8, "0.571rem", "Default gap interne"],
  [12, "0.857rem", "Gap composants"],
  [16, "1.143rem", "Padding cards, gap sections"],
  [20, "1.428rem", "Padding boutons LG"],
  [24, "1.714rem", "Padding modal, contenu"],
  [32, "2.286rem", "Margin sections"],
  [40, "2.857rem", "Padding pages"],
  [48, "3.428rem", "Espacement sections"],
  [64, "4.571rem", "Espacement majeur"],
];

export default function SpacingPage() {
  return (
    <DSSection id="spacing" title="Spacing" sub="4px base scale. Main values used across the interface.">

      {/* 1 — SCALE */}
      <div className="ds-card">
        <div className="ds-card-head">Scale</div>
        <div className="ds-card-body col">
          {SCALE.map(([px, rem, use]) => (
            <div key={px} className="spacing-row">
              <div className="spacing-block" style={{ width: px }} />
              <span className="spacing-label">{px}px</span>
              <span className="type-sample-meta">{rem} · {use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2 — PAGE RHYTHM */}
      <div className="ds-card">
        <div className="ds-card-head">Page rhythm — applied scale</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.main-wrap</span> · 64px</div>
            <p>Top-level page blocks — separates page-title, search-row, content section.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.dictionary-wrap</span> · 64px</div>
            <p>Mirrors <span className="ds-class">.main-wrap</span> — between lookup form and saved section.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.books-section</span> / <span className="ds-cn">.quotes-section</span> / <span className="ds-cn">.dictionary-saved-section</span> · 16px</div>
            <p>Internal sub-header (eyebrow / result-line) → content list.</p>
          </div>
          <p className="ds-note">Two-tier rhythm : <strong>64px</strong> between major page blocks, <strong>16px</strong> inside a section. Keeps breathing at the top while densifying list content.</p>
        </div>
      </div>

    </DSSection>
  );
}
