import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// Décomposition numérotée du modal : chaque numéro dans sa gouttière, trait vers la
// partie visée. AnnoScene mesure les positions au runtime.
const MODAL_ANNOS = [
  { n: 1, side: "top" },
  { n: 2, side: "left", target: ".ds-schema-title" },
  { n: 3, side: "left", target: ".ds-schema-input" },
  { n: 4, side: "bottom", target: ".ds-schema-footer" },
  { n: 5, side: "right", target: ".ds-schema-close" },
  { n: 6, side: "corner" },
];

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ModalPage() {
  return (
    <DSSection
      id="modal"
      title="Modal"
      sub="Coquille de modal centrée pour la saisie — form + actions. Assemblage de composants (titre, champs, boutons) piloté par une logique d'ouverture/fermeture accessible. Coquille sœur du Delete Modal, dédiée à l'input plutôt qu'à la confirmation."
    >
      {/* ─────────── 1. PREVIEW — la coquille assemblée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-modal-stage ds-preview">
            <div className="modal">
              <button type="button" className="modal-close" aria-label="Close"><CloseIcon /></button>
              <div className="modal-title">Add a quote</div>
              <form className="modal-form">
                <div className="modal-fields">
                  <div className="modal-field"><label>Quote</label><input placeholder="e.g. All happy families are alike…" readOnly /></div>
                  <div className="modal-field"><label>Page</label><input placeholder="e.g. 42" readOnly /></div>
                </div>
              </form>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline btn-md">Cancel</button>
                <button type="button" className="btn btn-primary btn-md">Save</button>
              </div>
            </div>
          </div>
          </div>
          <p className="ds-note">La coquille montrée en flux (pas d&apos;overlay ni d&apos;anim d&apos;entrée). En usage réel elle est centrée sur un <span className="ds-class">.modal-overlay</span> fixe qui verrouille le fond. Structure canonique : titre → contenu (form ou tabs) → actions. Aucune marge entre les blocs — c&apos;est le <code>gap</code> de la coquille qui rythme.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — cotes de padding & spacing (Redline) + parties ─────────── */}
      {/* ── 2a. ANATOMY — décomposition numérotée sur l'organisme réel ── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={MODAL_ANNOS}>
            <div className="modal ds-anno-organism" style={{ maxWidth: 560, width: "100%", paddingBottom: 24, animation: "none" }}>
              <div className="ds-schema-close" aria-hidden="true"><CloseIcon /></div>
              <div className="ds-schema-title">Title</div>
              <div className="ds-schema-block ds-schema-input" />
              <div className="ds-schema-block ds-schema-footer" />
            </div>
          </AnnoScene>
          </div>
        </div>
      </div>

      {/* ── 2b. ELEMENTS — table descriptive des parties numérotées ── */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal</span></td><td>Coquille centrée : bg <span className="ds-token-chip">--card</span>, ombre, radius 8, <code>flex</code> colonne <code>gap: 32</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.modal-title</span></td><td>Titre du dialog — <code>28 / 800 / −0.02em</code>, sans marge.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.modal-form</span></td><td>Corps : champs (<span className="ds-class">.modal-fields</span>, <code>gap: 24</code>) ou onglets (<span className="ds-class">.modal-tabs-section</span>). Submit hors form, lié par <code>form=&quot;…&quot;</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.modal-actions</span></td><td>Footer sticky en bas, boutons <span className="ds-class">.btn</span> en <code>space-between</code>.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.modal-close</span></td><td>Bouton X 40×40, <code>absolute</code> (top / right 16).</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>6</td><td><span className="ds-class">.modal-overlay</span></td><td>Backdrop <code>fixed</code>, padding <code>40 24</code> — centre la coquille et capte le clic-hors.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 2c. SPACING — cotes de padding & gaps mesurées (modal complet) ── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline padSelector=".modal-actions">
                <div className="modal" style={{ width: 440, animation: "none" }}>
                  <div className="modal-title" style={{ margin: 0 }}>Add a quote</div>
                  <div className="ds-schema-block" aria-hidden="true" />
                  <div className="modal-actions" style={{ borderTop: "none" }}>
                    <button type="button" className="btn btn-outline btn-md">Cancel</button>
                    <button type="button" className="btn btn-primary btn-md">Save</button>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Modal complet coté d&apos;un seul bloc : coquille padding <strong>haut 32</strong> · <strong>côtés 24</strong> (bas 0, le footer porte le sien), espacement entre blocs <code>gap: 32</code>. Le <strong>body</strong> est une <strong>zone bleue</strong> — contenu variable (champs, onglets, message…). Footer <span className="ds-class">.modal-actions</span> : padding interne <strong>16</strong> vertical / <strong>24</strong> horizontal (32 + 16 = 48, sur la grille). Stries horizontales = mesures verticales, stries verticales = horizontales — mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 2b. SIZING — largeur / hauteur par breakpoint ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Width — desktop</div>
            <p><code>max-width: 630</code> · <code>width: 100%</code>. Une largeur <strong>unique</strong> — pas d&apos;échelle S / M / L : un modal Readr porte un form court, une seule taille suffit.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Width — mobile</div>
            <p>La coquille suit la largeur disponible, bornée par le padding <code>24</code> de l&apos;<span className="ds-class">.modal-overlay</span> → ≈ <code>viewport − 48</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Height</div>
            <p>S&apos;adapte au contenu, plafonnée à <code>calc(100vh − 80px)</code> (le padding vertical <code>40</code> de l&apos;overlay, haut + bas) puis <code>overflow-y: auto</code> — le corps scrolle, les actions restent sticky.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 3. BEHAVIOR — sticky, a11y, scroll-lock, motion ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · sticky actions on scroll</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-modal-stage ds-modal-stage--scroll ds-preview">
            <div className="modal">
              <div className="modal-title">Long form</div>
              <form className="modal-form">
                <div className="modal-fields">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="modal-field"><label>Field {i + 1}</label><input placeholder="—" readOnly /></div>
                  ))}
                </div>
              </form>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline btn-md">Cancel</button>
                <button type="button" className="btn btn-primary btn-md">Save</button>
              </div>
            </div>
          </div>
          </div>
          <p className="ds-note">Scrolle le form à l&apos;intérieur : <span className="ds-class">.modal-actions</span> reste épinglée en bas via <code>position: sticky; bottom: 0</code>, fond <code>inherit</code> + <code>border-top</code> <span className="ds-token-chip">--border-subtle</span>. Actif sur tout modal dont le contenu peut déborder (Add a book avec liste de scan, Mark as finished…).</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility</div>
            <p>Monté avec <span className="ds-class">useModalA11y</span> : <code>Escape</code> ferme, le focus part sur le modal à l&apos;ouverture et <strong>revient sur le déclencheur</strong> à la fermeture, focus piégé à l&apos;intérieur. <code>role=&quot;dialog&quot;</code> + <code>aria-modal</code> + <code>aria-labelledby</code> sur le titre.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Scroll-lock</div>
            <p>Le scroll du body est verrouillé tant que le modal est ouvert (la position est mémorisée puis restaurée à la fermeture, dans le cleanup — jamais dans un <code>else</code>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Entry motion</div>
            <p>Doctrine unifiée : overlay en fondu, coquille qui monte légèrement — une seule courbe <code>cubic-bezier(0.16, 1, 0.3, 1)</code>, <code>animation</code> (pas <code>transition</code>) car c&apos;est une entrée au montage. Voir <strong>Motion</strong>.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 4. USAGE — consommateurs + pièces + sœur ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><strong>Add a book</strong> (4 onglets Photo / Barcode / File / Manual dans une <span className="ds-class">.modal-tabs-section</span>, submit qui s&apos;adapte Library / Wishlist), <strong>Add a quote</strong>, <strong>Finish Reading Modal</strong> (note + commentaire), <strong>Reading Goal</strong>. Tous montent la même coquille <span className="ds-class">.modal</span> ; seul change le contenu entre titre et actions.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Contained pieces</div>
            <p>À l&apos;intérieur du corps : <strong>Message Box</strong> (<span className="ds-class">.modal-info-box</span> — compteur de lecture, erreurs de scan), <strong>Upload Box</strong> (dropzone Photo / File), le groupe <span className="ds-class">.modal-toggle-group</span> (case « Mark as reading »). Documentés sur leurs pages dédiées.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sibling · Delete Modal</div>
            <p>Coquille sœur dédiée à la <strong>confirmation destructive</strong> (<span className="ds-class">.confirm-modal</span>) : même montage, même a11y, mais un message centré + deux boutons au lieu d&apos;un form. Voir <strong>Delete Modal</strong>.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
