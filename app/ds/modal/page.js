import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

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
          <div className="ds-modal-stage">
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
          <p className="ds-note">La coquille montrée en flux (pas d&apos;overlay ni d&apos;anim d&apos;entrée). En usage réel elle est centrée sur un <span className="ds-class">.modal-overlay</span> fixe qui verrouille le fond. Structure canonique : titre → contenu (form ou tabs) → actions. Aucune marge entre les blocs — c&apos;est le <code>gap</code> de la coquille qui rythme.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — cotes de padding & spacing (Redline) + parties ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>

        {/* Cotes de padding & gaps mesurées : coquille (haut/côtés + gap blocs) + footer */}
        <div className="ds-card-body col">
          <div className="ds-redline-board">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="modal" style={{ width: 380, animation: "none" }}>
                  <div className="modal-title" style={{ margin: 0 }}>Add a quote</div>
                  <form className="modal-form">
                    <div className="modal-fields">
                      <div className="modal-field"><label>Quote</label><input placeholder="—" readOnly /></div>
                    </div>
                  </form>
                </div>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline noGaps>
                <div className="modal-actions" style={{ margin: 0, width: 380 }}>
                  <button type="button" className="btn btn-outline btn-md">Cancel</button>
                  <button type="button" className="btn btn-primary btn-md">Save</button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Coquille : padding <strong>haut 32</strong>, <strong>côtés 24</strong>, bas 0 (le footer porte le sien) ; l&apos;espacement entre blocs = <code>gap: 32</code> (coté entre title et body). Footer <span className="ds-class">.modal-actions</span> : <strong>18</strong> vertical, <strong>24</strong> horizontal. Les <strong>stries horizontales</strong> cotent les paddings/gaps verticaux, les <strong>verticales</strong> les horizontaux — mesurées à l&apos;exécution.</p>
        </div>

        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Overlay</div>
            <p>Backdrop <code>position: fixed</code>, padding <code>40 24</code>, voile clair. Centre la coquille et capte le clic-hors pour fermer.</p>
            <span className="ds-class">.modal-overlay</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Shell</div>
            <p><code>max-width: 630</code>, padding <code>32 24 0</code>, <code>flex</code> colonne <code>gap: 32</code>. C&apos;est le gap qui espace titre / contenu / actions — <strong>zéro marge</strong> sur les enfants.</p>
            <span className="ds-class">.modal</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Close</div>
            <p>Bouton X en <code>position: absolute</code> (<code>top: 16 · right: 16</code>), 40×40, svg 24. Hors du flux pour ne pas décaler le titre.</p>
            <span className="ds-class">.modal-close</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Title</div>
            <p>Titre <code>28 / 800 / −0.02em</code>, sans marge (l&apos;espacement vient du gap de la coquille).</p>
            <span className="ds-class">.modal-title</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Form + fields</div>
            <p>Le <code>&lt;form&gt;</code> enveloppe <strong>les champs seuls</strong> (<span className="ds-class">.modal-fields</span>, <code>flex</code> colonne <code>gap: 24</code>) ; chaque paire label + input = <span className="ds-class">.modal-field</span> (<code>gap: 8</code>, label <code>13 / 500</code> <span className="ds-token-chip">--text-2</span>). Le bouton submit est <strong>hors</strong> du form (dans les actions) et le référence par <code>form=&quot;…&quot;</code>.</p>
            <span className="ds-class">.modal-form</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Tabs section</div>
            <p>Alternative au form : onglets + contenu de l&apos;onglet actif (<code>flex</code> colonne <code>gap: 20</code>). Présente seulement quand le modal a des onglets (Add a book).</p>
            <span className="ds-class">.modal-tabs-section</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Actions</div>
            <p>Rangée de boutons, <strong>sœur du form</strong> (pas dedans). <code>flex</code> space-between, <code>margin: 0 -24px</code> (rejoint les bords), padding <code>18 24</code>, <strong><code>position: sticky; bottom: 0</code></strong>, <code>border-top: 1px</code> <span className="ds-token-chip">--border-subtle</span>, <code>z-index: 1</code>. Les boutons sont canoniques : <span className="ds-class">.btn</span> <span className="ds-class">.btn-outline</span> <span className="ds-class">.btn-md</span> (Cancel) + <span className="ds-class">.btn-primary</span> (submit) — pas de classe de bouton dédiée au modal.</p>
            <span className="ds-class">.modal-actions</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. BEHAVIOR — sticky, a11y, scroll-lock, motion ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · sticky actions on scroll</div>
        <div className="ds-card-body col">
          <div className="ds-modal-stage ds-modal-stage--scroll">
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
