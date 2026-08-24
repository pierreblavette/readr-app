"use client";
import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// Bouton X d'une modale. En prod il est absolu (top/right 16) ; en specimen
// on le rend statique (style) pour les grilles, sauf le Preview qui le montre
// dans un coin de modale factice.
function ModalClose({ mod = "", style, cls = "modal-close" }) {
  return (
    <button type="button" className={`${cls}${mod ? " " + mod : ""}`} style={style} aria-label="Close">
      <CloseIcon />
    </button>
  );
}

const STATIC = { position: "static" };

const ANNOS = [
  { n: 1, side: "top", target: ".modal-close" },
  { n: 2, side: "bottom", target: ".modal-close svg" },
];

const STATES = [
  ["Default", "", ".modal-close"],
  ["Hover", "is-hover", ":hover"],
];

export default function ModalClosePage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="buttons-modal-close"
      title="Modal Close"
      sub="Le bouton X qui ferme une modale : ghost carré, ancré en haut à droite. Fait partie de la famille Buttons ; une variante sœur ferme les side panels."
    >
      {/* 1 — PREVIEW — en situation (coin de modale) */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview ds-preview--roomy">
              <div style={{ position: "relative", width: "min(402px, 100%)", background: "var(--card)", borderRadius: 12, padding: 20, minHeight: 104, boxShadow: "var(--shadow-md)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text)" }}>Modal title</div>
                <ModalClose />
              </div>
            </div>
          </div>
          <p className="ds-note">Specimen <strong>live</strong> — survole le X. Bouton <strong>ghost carré 40×40</strong>, <span className="ds-token-chip">--radius-8</span>, ancré <code>absolute</code> à <strong>16 / 16</strong> du coin haut-droit de la coquille. Au repos il ne porte que l&apos;icône (<span className="ds-token-chip">--text</span>) ; le fond n&apos;apparaît qu&apos;au survol.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
            <AnnoScene annos={ANNOS} stack>
              <div className="ds-anno-organism" style={{ display: "inline-flex", background: "var(--card)", borderRadius: 12, padding: 16, boxShadow: "var(--shadow-md)" }}>
                <ModalClose style={STATIC} />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal-close</span></td><td>Bouton <code>&lt;button&gt;</code> <strong>40×40</strong>, <code>position: absolute</code> (<code>top / right 16</code>), radius 8, fond transparent, couleur <span className="ds-token-chip">--text</span>. La coquille réserve la place via un <code>padding-right</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">svg</span></td><td>Croix <strong>24×24</strong>, <code>stroke-width 2</code> — deux traits diagonaux.</td><td>—</td></tr>
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
              <Redline keepShape><ModalClose style={STATIC} /></Redline>
            </div>
          </div>
          <p className="ds-note">Boîte <strong>40×40</strong>, icône <strong>24</strong> centrée (8px de marge optique tout autour). Ancrage <strong>16 / 16</strong> depuis le coin de la coquille — non coté ici (relève du layout de la modale). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([label, mod, cap]) => (
              <div key={label} className="ds-state-sample">
                <ModalClose mod={mod} style={STATIC} />
                <span className="ds-class">{cap}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Default — icône seule <span className="ds-token-chip">--text</span>, fond transparent · <span className="ds-class">:hover</span> — fond <span className="ds-token-chip">--ghost-hover</span> + icône <span className="ds-token-chip">--primary-50</span> (dark : <span className="ds-token-chip">--primary-40</span>). C&apos;est le <strong>hover ghost canonique</strong>, identique aux kebabs / like / menu — <span className="ds-class">.modal-close</span> et <span className="ds-class">.panel-close</span> convergés dessus. Transition <code>background</code> / <code>color</code> 0.15s.</p>
          <p className="ds-note"><strong>Gap a11y</strong> : <span className="ds-class">.modal-close</span> force <code>outline: none</code> → <strong>aucun anneau de focus clavier</strong>, contrairement à tous les autres boutons (qui héritent du <code>*:focus-visible</code> global). Seul bouton de l&apos;app dans ce cas — candidat à corriger (retirer <code>outline: none</code>).</p>
        </div>
      </div>

      {/* 6 — SURFACES & SIZES */}
      <div className="ds-card">
        <div className="ds-card-head">Surfaces &amp; sizes</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Un geste, deux tailles</div>
            <p>Le même bouton close — X ghost, hover <span className="ds-token-chip">--ghost-hover</span> + icône <span className="ds-token-chip">--primary-50</span> (le hover ghost canonique). Seule la <strong>taille</strong> change selon la surface fermée ; le traitement visuel est identique (convergé).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Modal close — <span className="ds-cn">.modal-close</span></div>
            <p><strong>40×40</strong>. Ferme les modales (<span className="ds-class">.modal</span> / <span className="ds-class">.confirm-modal</span>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Panel close — <span className="ds-cn">.panel-close</span></div>
            <p><strong>44×44</strong> — cible tactile élargie, <code>top</code> conscient de <code>env(safe-area-inset-top)</code> (les panels peuvent être plein écran sur mobile / notch). Ferme les <strong>side panels</strong> (Book Panel, Quote Panel).</p>
          </div>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Placement</div>
            <p>Toujours <code>absolute</code> dans le coin haut-droit de la coquille, jamais dans le flux. La coquille réserve sa gouttière (padding-right) pour que le titre ne passe pas dessous. Escape ferme aussi (voir <strong>Modals · Behavior</strong>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><span className="ds-class">.modal-close</span> : toutes les modales. <span className="ds-class">.panel-close</span> : side panels. Même geste (fermer), deux peaux selon la surface.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
