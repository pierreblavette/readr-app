import DSSection from "../_components/DSSection";
import { BookPanelSpec } from "./book/_specs";

export default function PanelsFoundationPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="panels"
      title="Side Panels"
      sub="La famille des panneaux qui glissent depuis la droite pour recouvrir l'app. Un même socle décliné en deux fiches : le livre et la citation."
    >

      {/* 1 — PREVIEW — la coquille de référence */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <BookPanelSpec compact />
            </div>
          </div>
          <p className="ds-note">La coquille de référence (ici <a href="/design-system/panels/book"><strong>Book Panel</strong></a> en aperçu) : <span className="ds-class">.panel-inner</span> empile cover / sections séparées par des <span className="ds-class">.panel-divider</span>, chacune en tête d&apos;un <span className="ds-class">.panel-section-eyebrow</span>. Le contenu change d&apos;un membre à l&apos;autre ; le socle est commun. Présentée en carte détachée (radius 8 + ombre) — en prod <code>fixed</code>, dockée au bord droit, radius 0, slide-in.</p>
        </div>
      </div>

      {/* 2 — SHELL LANGUAGE (la primitive partagée) */}
      <div className="ds-card">
        <div className="ds-card-head">Shell language</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Surface &amp; docking — <span className="ds-cn">.book-panel</span></div>
            <p>Coquille <code>fixed</code> au bord droit, <code>width: 540</code>, <code>height: 100vh</code> ; fond <span className="ds-token-chip">--bg</span>, <code>border-left</code> <span className="ds-token-chip">--border-subtle</span>, <strong>radius 0</strong> (dockée, pas flottante). Entre par <code>transform: translateX(100% → 0)</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Contenu — <span className="ds-cn">.panel-inner</span></div>
            <p>Conteneur scrollable : padding <strong>96 / 32 / 72</strong> (haut dégage le close absolu), <code>flex</code> colonne, <code>align-items: center</code>, gap <strong>40</strong> entre zones.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Briques communes</div>
            <p><span className="ds-class">.panel-close</span> (<strong>44×44</strong> absolu haut-droite) · <span className="ds-class">.panel-divider</span> (filet <code>1px</code> <span className="ds-token-chip">--border-subtle</span> entre sections) · <span className="ds-class">.panel-section</span> + <span className="ds-class">.panel-section-eyebrow</span> (<code>11 / 700</code> uppercase <span className="ds-token-chip">--text-3</span>, gap 16) · <span className="ds-class">.panel-actions</span> (footer, <code>space-between</code>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Scroll-fade — <span className="ds-cn">.panel-scroll-fade</span></div>
            <p>Dégradé <code>sticky</code> en bas de la coquille, <code>pointer-events: none</code> — signale que le contenu déborde.</p>
          </div>
        </div>
      </div>

      {/* 3 — BEHAVIOR (doctrine partagée) */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · le socle partagé</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility — <span className="ds-cn">useModalA11y</span></div>
            <p><code>Escape</code> ferme, le focus part sur la coquille à l&apos;ouverture et <strong>revient sur le déclencheur</strong> à la fermeture, piégé à l&apos;intérieur. <code>role=&quot;dialog&quot;</code> + <code>aria-modal</code>. Même hook que les modales — voir <span className="ds-class">A11y modal/dropdown</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Scroll-lock</div>
            <p>À l&apos;ouverture, le body passe en <code>position: fixed</code> (offset <code>top: −scrollY</code>) — le fond ne scrolle plus derrière le panneau. Position restaurée dans le <em>cleanup</em> à la fermeture (jamais dans un <code>else</code>, bug connu).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Entry motion — slide-in</div>
            <p><code>transform: translateX(100% → 0)</code> sur la classe <span className="ds-class">.open</span>, <code>0.55s cubic-bezier(0.16, 1, 0.3, 1)</code> — la courbe canonique. Ici <code>transition</code> (pas <code>animation</code>) car piloté par un toggle d&apos;état. Voir <strong>Motion</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Safe-area (PWA)</div>
            <p>La coquille porte <code>padding: env(safe-area-inset-*)</code> pour tenir le contenu hors du notch / home indicator en PWA standalone iOS.</p>
          </div>
        </div>
      </div>

      {/* 4 — FAMILY */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Deux membres, deux contenus</div>
            <p><a href="/design-system/panels/book"><strong>Book Panel</strong></a> — le <strong>livre</strong> : cover + info + actions primaires, puis Collections, Finished, Cast / Quiz (AI), About, Quotes. <a href="/design-system/panels/quote"><strong>Quote Panel</strong></a> — la <strong>citation</strong> : texte + date, actions (Edit · Loved · Share), livre d&apos;origine (Book Row).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Même primitive, ailleurs</div>
            <p>Le montage <span className="ds-class">.book-panel</span> (slide-in, overlay, a11y, scroll-lock) porte aussi <a href="/design-system/filters/panel"><strong>Filters Panel</strong></a> et les List Panels (Word / Book / Collection) — rangés par feature, mais bâtis sur le même socle.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
