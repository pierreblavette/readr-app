import DSSection from "../_components/DSSection";

// Spinner SVG (loader) : cercle-track faible + arc plein qui tourne. Iso .panel-cast-spinner.
function SvgSpinner({ className = "panel-cast-spinner" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

export default function SpinnerPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="spinner"
      title="Spinner"
      sub="L'indicateur de chargement, quand l'app attend sans savoir combien de temps. Deux formes : un anneau et un petit loader d'action."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview ds-preview--roomy">
              <div className="panel-spinner" role="status" aria-label="Loading" />
            </div>
          </div>
          <p className="ds-note">L&apos;anneau <span className="ds-class">.panel-spinner</span> — une bordure 2px grise dont un seul côté (haut) prend la couleur du texte, mise en rotation continue. Aucune image : la roue naît du <code>border-top-color</code>.</p>
        </div>
      </div>

      {/* 2 — SIZING */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <div className="panel-spinner" role="status" aria-label="Loading" />
              <span className="ds-class">24 · autonome</span>
            </div>
            <div className="ds-state-sample">
              <SvgSpinner />
              <span className="ds-class">16 · inline</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Deux tailles selon le contexte : <strong>24</strong> pour un spinner qui occupe seul une zone (anneau), <strong>16</strong> pour un loader accolé à un texte (hérite de sa couleur et s&apos;aligne sur la ligne). Épaisseur de trait proportionnelle (2 / 2.5).</p>
        </div>
      </div>

      {/* 3 — VARIANTS · anneau / loader SVG */}
      <div className="ds-card">
        <div className="ds-card-head">Variants</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <div className="panel-spinner" role="status" aria-label="Loading" />
              <span className="ds-class">.panel-spinner</span>
            </div>
            <div className="ds-state-sample">
              <SvgSpinner />
              <span className="ds-class">.panel-cast-spinner</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Anneau CSS · .panel-spinner</div>
            <p>24×24, <code>border: 2px</code> <span className="ds-token-chip">--border</span> + <code>border-top-color</code> <span className="ds-token-chip">--text</span>, <code>border-radius: 50%</code>. Zéro markup interne (<code>&lt;div /&gt;</code>). Pour un chargement <strong>autonome</strong> (scan, vue en attente).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Loader SVG · .panel-cast-spinner</div>
            <p>16×16, un <code>&lt;svg&gt;</code> : cercle-track <code>strokeOpacity 0.3</code> + arc plein <code>strokeLinecap round</code> qui tourne, hérite de <code>currentColor</code>. Pour un chargement <strong>inline</strong> à côté d&apos;un label (bouton AI « Generate », soumission).</p>
          </div>
        </div>
      </div>

      {/* 4 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Rotation</div>
            <p>Une keyframe partagée <code>@keyframes spin {`{ to { transform: rotate(360deg) } }`}</code>, jouée <code>0.7s linear infinite</code>. Même vitesse pour les deux formes — la rotation constante lit « en cours », sans début ni fin (chargement indéterminé).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Reduced-motion</div>
            <p><span className="ds-token-chip">prefers-reduced-motion: reduce</span> → <code>animation: none</code> : le spinner se <strong>fige</strong> (l&apos;anneau reste visible, l&apos;arc SVG aussi) plutôt que de tourner. Le sens « chargement » passe alors par le contexte (texte « Generating… », zone grisée), pas par le mouvement.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibilité</div>
            <p>Le conteneur porte <code>role="status"</code> + <code>aria-label</code> (anneau autonome) ; le loader inline est <code>aria-hidden</code> car le label texte voisin (« Generating… ») porte déjà le sens.</p>
          </div>
        </div>
      </div>

      {/* 5 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Anneau <span className="ds-class">.panel-spinner</span> — BarcodeScanner (scan en cours). Loader SVG <span className="ds-class">.panel-cast-spinner</span> — CharacterCast / BookQuiz (génération AI), BarcodeScanner. Soumission — <span className="ds-class">.dictionary-submit-spinner</span> (même glyphe SVG).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dette · classes parallèles</div>
            <p>Trois classes (<span className="ds-class">.panel-cast-spinner</span>, <span className="ds-class">.dictionary-submit-spinner</span>, + l&apos;anneau) recopient la même mécanique <code>spin 0.7s</code>. <strong>Candidat à un primitive unique</strong> <span className="ds-class">.spinner</span> (+ modifier <code>--ring</code> / <code>--inline</code>) le jour d&apos;un passage prod, plutôt que de dupliquer la keyframe par consommateur.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
