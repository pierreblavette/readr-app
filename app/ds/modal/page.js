import DSSection from "../_components/DSSection";
import { FormModalSpec } from "./_specs";

export default function ModalFoundationPage() {
  return (
    <DSSection
      id="modal"
      title="Modals"
      sub="Famille de coquilles modales — même socle (overlay centré, surface --card, radius 8, padding 32/24/0, gap 32, shadow-xl) et même cycle de vie (a11y, scroll-lock, motion), décliné par usage. Form Modal (saisie) et Delete Modal (confirmation) documentées en pages dédiées."
    >

      {/* 1 — PREVIEW — la famille */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-modal-stage ds-preview">
            <FormModalSpec style={{ maxWidth: 620, width: "100%" }} />
          </div>
          </div>
          <p className="ds-note">La coquille de référence — <strong>Add a quote</strong> : titre → form → actions, montée sur un overlay centré (masqué ici, montré en flux). Le socle est commun à toute la famille ; deux déclinaisons en pages dédiées : <strong>Form Modal</strong> (<span className="ds-class">.modal</span>, la saisie) et <strong>Delete Modal</strong> (<span className="ds-class">.confirm-modal</span>, la confirmation).</p>
        </div>
      </div>

      {/* 2 — SHELL LANGUAGE (la primitive partagée) */}
      <div className="ds-card">
        <div className="ds-card-head">Shell language</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Surface &amp; layout</div>
            <p>Fond <span className="ds-token-chip">--card</span> · radius <strong>8</strong> · <span className="ds-token-chip">--shadow-xl</span> · <code>flex</code> colonne <code>gap: 32</code> · padding <strong>32 24 0</strong> (le footer d&apos;actions porte son propre bas). <code>max-width: 630</code>, <code>width: 100%</code>. Socle commun à <em>toutes</em> les modales.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Overlay — <span className="ds-cn">.modal-overlay</span> / <span className="ds-cn">.confirm-modal-overlay</span></div>
            <p>Backdrop <code>fixed</code> qui verrouille le fond, centre la coquille et capte le clic-hors. Padding <strong>40 24</strong> — borne la largeur mobile (≈ <code>viewport − 48</code>) et la hauteur (<code>calc(100vh − 80px)</code> puis <code>overflow-y: auto</code>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Title — <span className="ds-cn">.modal-title</span> / <span className="ds-cn">.confirm-modal-title</span></div>
            <p>Titre du dialog : <code>28 / 800 / −0.02em</code> <span className="ds-token-chip">--text</span>, sans marge. Toujours en première position, cible du <code>aria-labelledby</code>.</p>
          </div>
        </div>
      </div>

      {/* 3 — BEHAVIOR (doctrine partagée) */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · le cycle de vie partagé</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility — <span className="ds-cn">useModalA11y</span></div>
            <p><code>Escape</code> ferme, le focus part sur la coquille à l&apos;ouverture et <strong>revient sur le déclencheur</strong> à la fermeture, focus piégé à l&apos;intérieur. <code>role=&quot;dialog&quot;</code> (form) ou <code>role=&quot;alertdialog&quot;</code> (confirmation) + <code>aria-modal</code> + <code>aria-labelledby</code>. Voir <span className="ds-class">A11y modal/dropdown</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Scroll-lock</div>
            <p>Le scroll du body est verrouillé tant que la modale est ouverte — position mémorisée puis restaurée dans le <em>cleanup</em> (jamais dans un <code>else</code>, bug connu).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Entry motion — <span className="ds-cn">modalIn</span></div>
            <p>Overlay en fondu, coquille qui monte légèrement (<code>translateY 64→0</code>). Une seule courbe <code>cubic-bezier(0.16, 1, 0.3, 1)</code>, <code>animation</code> (pas <code>transition</code>) car c&apos;est une entrée au montage. Voir <strong>Motion</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sticky actions</div>
            <p>Le footer d&apos;actions reste épinglé en bas (<code>position: sticky; bottom: 0</code>) quand le corps déborde — fond <code>inherit</code> + <code>border-top</code> <span className="ds-token-chip">--border-subtle</span>. Détaillé sur <strong>Form Modal</strong>.</p>
          </div>
        </div>
      </div>

      {/* 4 — FAMILY */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Deux coquilles, deux intentions</div>
            <p><span className="ds-class">.modal</span> — <strong>Form Modal</strong> : la saisie (Add a book, Add a quote, Reading goal, Finish reading, Create collection). <span className="ds-class">.confirm-modal</span> — <strong>Delete Modal</strong> : la confirmation destructive, un message centré + deux boutons, dispatché par <code>target.type</code>.</p>
          </div>
          <p className="ds-note"><strong>Dette</strong> : <span className="ds-class">.modal</span> et <span className="ds-class">.confirm-modal</span> sont aujourd&apos;hui des classes <em>parallèles</em> (mêmes valeurs, dupliquées). Candidat à une primitive <span className="ds-class">.modal-shell</span> partagée (surface + padding + gap + overlay + a11y) que chaque coquille composerait — fix prod séparé.</p>
        </div>
      </div>

    </DSSection>
  );
}
