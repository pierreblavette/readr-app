import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

// Échelle de spacing 4px. base : html { font-size:14px } → les rem sont dérivés
// de 14 (1rem = 14px). On documente le pas + l'usage courant, pas de mapping figé.
const SCALE = [
  [2, "0.125rem", "Micro gap (badge)"],
  [4, "0.286rem", "Tight gap"],
  [6, "0.428rem", "Small gap"],
  [8, "0.571rem", "Default gap interne"],
  [12, "0.857rem", "Gap composants"],
  [16, "1.143rem", "Padding cards, gap sections"],
  [20, "1.428rem", "Padding boutons MD"],
  [24, "1.714rem", "Padding boutons LG, modal"],
  [32, "2.286rem", "Margin sections"],
  [40, "2.857rem", "Padding pages"],
  [48, "3.428rem", "Espacement sections"],
  [64, "4.571rem", "Espacement majeur"],
];

// Bloc-témoin d'une maquette de rythme (les cotes tombent sur les gaps entre eux).
function Block({ label }) {
  return <div style={{ background: "var(--primary-3)", borderRadius: 6, padding: "10px 12px", fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{label}</div>;
}

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

      {/* 2 — PAGE RHYTHM — démo visuelle cotée */}
      <div className="ds-card">
        <div className="ds-card-head">Page rhythm</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline showHeight={false}>
                <div style={{ display: "flex", flexDirection: "column", gap: 64, width: 300 }}>
                  <Block label="Page title" />
                  <Block label="Search row" />
                  <Block label="Content section" />
                </div>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline showHeight={false}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
                  <Block label="Section eyebrow" />
                  <Block label="List row" />
                  <Block label="List row" />
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Rythme à <strong>deux niveaux</strong> : <strong>64</strong> entre les grands blocs de page (planche du haut), <strong>16</strong> à l&apos;intérieur d&apos;une section (planche du bas). Respiration en tête de page, densité dans les listes. Cotes mesurées à l&apos;exécution.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <button className="btn btn-outline btn-md"><span>Add book</span></button>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".book-chip-cover">
                <div className="book-chip" style={{ width: 300 }}>
                  <div className="book-chip-cover" style={{ background: "var(--primary-30)" }}>D</div>
                  <div className="book-chip-body">
                    <div className="book-chip-name">
                      <div className="book-chip-title">Dune</div>
                      <div className="book-chip-author">Frank Herbert</div>
                    </div>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>In use</strong> — le barème sur de vrais composants : bouton MD padding <strong>0 20</strong> (<span className="ds-class">.btn-md</span>) ; book row padding <strong>12</strong> · gap <strong>12</strong> vignette→corps (<span className="ds-class">.book-chip</span>). Mêmes valeurs que l&apos;échelle ci-dessus.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Blocs de page · <code>64px</code></div>
            <p>Sépare les blocs de haut niveau — page-title, search-row, content section. <span className="ds-class">.dictionary-wrap</span> le reprend (formulaire → section sauvegardée).</p>
            <span className="ds-class">.main-wrap</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Intérieur d&apos;une section · <code>16px</code></div>
            <p>Sous-en-tête (eyebrow / result-line) → liste de contenu. Partagé par <span className="ds-class">.books-section</span>, <span className="ds-class">.quotes-section</span>, <span className="ds-class">.dictionary-saved-section</span>.</p>
            <span className="ds-class">.books-section</span>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
