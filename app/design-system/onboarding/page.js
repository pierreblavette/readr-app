import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import { OnboardingModalSpec, OB_SLIDES } from "./_specs";

// Largeur unique des specimens de modale (iso les pages Modals) : 620, fluide en
// dessous. La coquille réelle .ob-modal fait 630 comme .modal / .confirm-modal.
const MODAL_STYLE = { maxWidth: 620, width: "100%", margin: 0, animation: "none" };

const OB_ANNOS = [
  { n: 1, side: "left", target: ".ob-icon" },
  { n: 2, side: "right", target: ".ob-text" },
  { n: 3, side: "left", target: ".ob-dots" },
  { n: 4, side: "bottom", target: ".ob-footer" },
];

export default function OnboardingPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="onboarding"
      title="Onboarding"
      sub="La fenêtre d'accueil de la première visite : six écrans qui présentent l'app, ré-ouvrables depuis le pied de page."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <OnboardingModalSpec slide={0} style={MODAL_STYLE} />
            </div>
          </div>
          <p className="ds-note">Le slide 1 (Readr). La coquille empile <strong>illustration → texte → pagination</strong> dans le body, puis un <strong>footer</strong> de navigation. Montrée en flux, sans overlay ni anim d&apos;entrée. Prev est masqué au 1er slide, Skip au dernier.</p>
        </div>
      </div>

      {/* 2 — ICON SET */}
      <div className="ds-card">
        <div className="ds-card-head">Icon set · 6 illustrations (120×120, viewBox 60)</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-3">
            {OB_SLIDES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.key} className="ds-state-sample">
                  <div className="ob-icon"><Icon /></div>
                  <span className="panel-section-eyebrow">{s.key} · slide {i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Six SVG illustratifs, pilotés par les tokens <span className="ds-token-chip">--illus-*</span> (bg, mid, accent, stroke) → se recolorent en light / dark sans dupliquer le markup. Réutilisés tels quels ici depuis le composant réel.</p>
        </div>
      </div>

      {/* 3 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
            <AnnoScene annos={OB_ANNOS} stack>
              <OnboardingModalSpec slide={0} className="ds-anno-organism" style={MODAL_STYLE} />
            </AnnoScene>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>·</td><td><span className="ds-class">.ob-overlay</span> / <span className="ds-class">.ob-modal</span></td><td>Backdrop (fixed, teinté, clic extérieur = fermer) + coquille : max-width <strong>640</strong>, radius <strong>16</strong>, <span className="ds-token-chip">--card</span>, <span className="ds-token-chip">--shadow-lg</span>, entrée <code>modalIn</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.ob-icon</span></td><td>Slot illustration — le SVG fait <strong>120×120</strong> (viewBox 0 0 60 60). Dans <span className="ds-class">.ob-body</span> (padding <strong>48 / 32 / 32</strong>, centré) → <span className="ds-class">.ob-slides</span> (gap <strong>40</strong>).</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.ob-text</span></td><td><span className="ds-class">.ob-title</span> (h2, <code>20 / 800</code>, −0.02em) + <span className="ds-class">.ob-desc</span> (<code>16 / 500</code> <span className="ds-token-chip">--text-2</span>, lh 1.7, max-width 464). Gap 20.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.ob-dots</span></td><td>Pagination (<code>role=tablist</code>) : 6 <span className="ds-class">.ob-dot</span> de <strong>6×6</strong> ; l&apos;actif s&apos;étire à <strong>20×6</strong> + <span className="ds-token-chip">--primary-50</span>. Clic = saut direct au slide.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.ob-footer</span></td><td>Navigation (padding 18) : <span className="ds-class">.ob-skip</span> à gauche (masqué au dernier), <span className="ds-class">.ob-prev</span> + <span className="ds-class">.ob-next</span> à droite. <code>space-between</code>.</td><td>—</td></tr>
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
              <Redline boxPadSelector={[".ob-body", ".ob-footer"]} gapSelector={[".ob-slides", ".ob-text"]}>
                <OnboardingModalSpec slide={0} style={{ width: 620, margin: 0, animation: "none" }} />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Le corps <span className="ds-class">.ob-body</span> padde <strong>32 / 24</strong> — haut &amp; côtés canoniques (iso <span className="ds-class">.modal</span> 32/24), bas 32 = rythme vers le footer (iso le <code>gap: 32</code> des modales). Dans <span className="ds-class">.ob-slides</span>, illustration → texte → pagination sont espacés de <strong>40</strong> ; <span className="ds-class">.ob-text</span> sépare titre ↔ desc de <strong>20</strong>, et <span className="ds-class">.ob-dots</span> ses points de <strong>6</strong>. Le footer <span className="ds-class">.ob-footer</span> padde <strong>16 / 24</strong> — harmonisé sur le footer de modale (<span className="ds-class">.modal-actions</span> / <span className="ds-class">.confirm-modal-actions</span>), remplace l&apos;ancien 18 hors échelle. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Navigation</div>
            <p><strong>Next</strong> avance ; au dernier slide il devient <strong>Get started</strong> et ferme. <strong>Prev</strong> est <code>visibility: hidden</code> au slide 0 (garde sa place, footer stable). <strong>Skip</strong> ferme, masqué au dernier slide. Les <span className="ds-class">.ob-dot</span> sautent directement à un slide.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Reset à l&apos;ouverture</div>
            <p>Chaque ré-ouverture repart au <strong>slide 0</strong> (<code>useEffect</code> sur <code>open</code>). Pas de mémoire de la dernière position.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Motion</div>
            <p>Backdrop <code>overlayIn 0.4s ease-out</code> ; coquille <code>modalIn 0.8s</code> sur la courbe canonique <code>cubic-bezier(0.16, 1, 0.3, 1)</code> (expo-out) — commune à <a href="/design-system/modal"><strong>Modals</strong></a>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility &amp; responsive</div>
            <p>Pagination en <code>role=tablist</code> / <code>tab</code> + <code>aria-selected</code>. Clic sur le backdrop ferme. <span className="ds-class">.ob-title</span> passe en <code>white-space: pre-line</code> <strong>uniquement ≤600px</strong> (les <code>\n</code> i18n coupent les lignes sur mobile, se replient sur desktop) ; <span className="ds-class">.ob-desc</span> est <code>pre-line</code> partout.</p>
          </div>
        </div>
      </div>

      {/* 5 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Déclenchement</div>
            <p>Affichée à la <strong>première visite</strong> (flag localStorage), et <strong>ré-ouvrable</strong> depuis le <a href="/design-system/footer"><strong>Footer</strong></a> (« How it works »). Un seul consumer : <code>Onboarding.js</code>, monté au niveau layout.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Contenu &amp; i18n</div>
            <p>6 slides pilotés par les clés <code>obSlideNTitle</code> / <code>obSlideNDesc</code> + <code>obSkip</code> / <code>obPrevious</code> / <code>obNext</code> / <code>obGetStarted</code>. Titre en <strong>verbe</strong>, description en une phrase.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Illustrations tokenisées</div>
            <p>Les 6 SVG n&apos;ont <strong>aucune couleur en dur</strong> : tout passe par les tokens <span className="ds-token-chip">--illus-bg-1/2/3</span>, <span className="ds-token-chip">--illus-mid</span>, <span className="ds-token-chip">--illus-accent-1/2</span>, <span className="ds-token-chip">--illus-stroke</span> — un seul markup, rendu correct en light comme en dark.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
