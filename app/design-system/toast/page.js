import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import { ToastSpec } from "./_specs";

// Décomposition : icône de tête (1) + message (2).
const ANNOS = [
  { n: 1, side: "top", target: ".toast svg" },
  { n: 2, side: "bottom", target: ".toast span" },
];

export default function ToastPage() {
  return (
    <DSSection
      id="toast"
      title="Toast"
      sub="Feedback de confirmation global après une action — suppression, changement d'état, partage. Surface de la même famille que la Selection Bar (bleu plein), auto-dismiss après 3s, un seul par fois."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <ToastSpec message="Reading started" />
            </div>
          </div>
          <p className="ds-note">Une pastille flottante ancrée en bas-centre : icône check + message. Elle monte du bas, tient 3s, repart. Pas de bouton de fermeture.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={ANNOS}>
              <ToastSpec message="Reading started" className="ds-anno-organism" />
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
              <tr className="table-row"><td>·</td><td><span className="ds-class">.toast</span></td><td>Conteneur flottant : <code>position: fixed</code>, bas-centre à <strong>28</strong> du bord, fond <span className="ds-token-chip">--primary-50</span> (light &amp; dark), radius 8, ombre <code>0 8 32 rgba(0,0,0,.25)</code>, <code>white-space: nowrap</code>. <code>z-index: 2000</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.toast svg</span></td><td>Icône de tête (check) : <strong>16×16</strong>, <code>padding: 2</code> en <code>content-box</code> → cadre <strong>20</strong>, stroke <strong>2.5</strong> (formule 36/16). Ne rétrécit pas (<code>flex-shrink: 0</code>).</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">span</span></td><td>Message : <code>15 / 500</code>, <span className="ds-token-chip">#FFFFFF</span>. Texte i18n (clés <code>toastXxx</code>).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <Redline keepShape>
              <ToastSpec message="Reading started" />
            </Redline>
          </div>
          <p className="ds-note">Padding <strong>13 / 20 / 13 / 12</strong> — asymétrique, plus serré à gauche (12) pour le cadre d&apos;icône, plus d&apos;air à droite (20), iso <span className="ds-class">.btn-md</span> avec icône à gauche. Gap <strong>8</strong> entre l&apos;icône et le message. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 4 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Reveal &amp; auto-dismiss · 3s</div>
            <p>Elle monte via <code>transform: translateY</code> (20 → 0) sur la courbe maison <code>cubic-bezier(0.16, 1, 0.3, 1)</code>, opacité 0 → 1. Pas de bouton de fermeture : un <code>setTimeout(3000)</code> par message ; un nouveau message <strong>réarme</strong> le timer.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Fade-out à largeur stable</div>
            <p>Un <code>useState(&apos;shown&apos;)</code> local mémorise le dernier message non vide ; le <code>&lt;span&gt;</code> rend <code>shown</code>, pas <code>message</code>. Sans ça, quand le parent vide <code>message</code> à la fermeture, la pastille rétrécirait pendant qu&apos;elle disparaît.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility</div>
            <p><code>role=&quot;status&quot;</code> + <code>aria-live=&quot;polite&quot;</code> : annoncée par les lecteurs d&apos;écran sans voler le focus. <code>pointer-events</code> coupé à l&apos;état masqué.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Canal de feedback unique</div>
            <p>Le Toast est le <strong>seul</strong> canal de confirmation — plus d&apos;icône ou de label qui se retourne en contexte après le câblage du Toast (cohérence cross-surface).</p>
          </div>
        </div>
      </div>

      {/* 5 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Famille de surface</div>
            <p>Même famille bleu plein que la <span className="ds-class">Selection Bar</span> (elle en <span className="ds-token-chip">--primary-60</span>, le Toast en <span className="ds-token-chip">--primary-50</span>) et le fixe bas-centre. Registre « système parle à l&apos;utilisateur », distinct des surfaces de contenu.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Wording &amp; i18n</div>
            <p>Clés préfixées <code>toastXxx</code> dans <code>lib/i18n.js</code>. Pluriels FR via fonctions <code>(n) =&gt; …</code> (ex. <code>toastBooksRemoved(3)</code>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumer</div>
            <p><code>Toast.js</code>, monté une fois au niveau layout ; le message est piloté par l&apos;état parent (<code>toastMsg</code>) déclenché après chaque action confirmée (mark as reading, remove, share « Copied! »…).</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
