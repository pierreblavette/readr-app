import DSSection from "../../_components/DSSection";

const STATES = [
  ["Default", "", ".btn-link"],
  ["Hover", "is-hover", ":hover"],
  ["Focus", "is-focus", ":focus-visible"],
];

export default function ButtonLinkPage() {
  return (
    <DSSection
      id="buttons-link"
      title="Link"
      sub="Action texte inline .btn-link — sans hauteur, bordure ni fond. Pour un geste discret dans un formulaire ou une carte (« Remove goal »). Variante critical pour le destructif. Fait partie de la famille Buttons."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <button type="button" className="btn-link">Remove goal</button>
            </div>
          </div>
          <p className="ds-note"><span className="ds-class">.btn-link</span> — 14/600 <span className="ds-token-chip">--primary-50</span>, souligné au hover. Ni padding, ni bordure, ni hauteur fixe : il se pose <em>dans</em> le texte, pas à côté d&apos;un bouton plein.</p>
        </div>
      </div>

      {/* 2 — VARIANTS */}
      <div className="ds-card">
        <div className="ds-card-head">Variants</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <button type="button" className="btn-link">Remove goal</button>
              <span className="ds-class">.btn-link</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="btn-link btn-link--critical">Remove goal</button>
              <span className="ds-class">.btn-link--critical</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Default</div>
            <p>14 / 600 · <span className="ds-token-chip">--primary-50</span> · hover <span className="ds-token-chip">--primary-60</span> + underline. Pour les actions basses (ex. « Remove goal » dans ReadingGoalModal).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Critical</div>
            <p><span className="ds-token-chip">--destructive</span> · même typo et comportement. Pour un geste destructif discret.</p>
          </div>
        </div>
      </div>

      {/* 3 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-3">
            {STATES.map(([label, mod, cap]) => (
              <div key={label} className="ds-state-sample">
                <button type="button" className={`btn-link${mod ? " " + mod : ""}`}>Remove goal</button>
                <span className="ds-class">{cap}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Hover <span className="ds-token-chip">--primary-60</span> + underline · Focus anneau 2px <span className="ds-token-chip">--primary-50</span> via <code>box-shadow</code>, radius 4 (ou <span className="ds-token-chip">--destructive</span> pour la variante critical). Pas d&apos;outline par défaut.</p>
        </div>
      </div>

      {/* 4 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Couplage au formulaire · :has()</div>
            <p><code>.modal-form:has(.btn-link) {`{ gap: 12px }`}</code> — le gap du formulaire se resserre automatiquement (24 → 12) dès qu&apos;un <span className="ds-class">.btn-link</span> est présent, pour qu&apos;il colle au champ du dessus plutôt que de flotter.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Quand l&apos;employer</div>
            <p>Un <span className="ds-class">.btn-link</span> n&apos;est <strong>pas</strong> un CTA. Pour une action primaire → <span className="ds-class">.btn.btn-primary</span> (voir <strong>Buttons</strong>). Pour un choix de valeur → <strong>Select</strong>. Le link reste réservé aux gestes accessoires, à côté du contenu.</p>
          </div>
        </div>
      </div>

      {/* 5 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><span className="ds-class">.btn-link</span> (Remove goal, expand / collapse), <span className="ds-class">.btn-link--critical</span> (destructif inline), <span className="ds-class">.quote-see-more</span> (voir plus / moins), <span className="ds-class">.footer-link</span> (variante propre au footer).</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
