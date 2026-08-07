import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";
import { CloseIcon } from "../_specs";

// Décomposition numérotée sur la VRAIE UI (Add a book · Photo) — cohérent avec Delete /
// Finish. Le squelette abstrait vit désormais sur la page famille Modals.
const MODAL_ANNOS = [
  { n: 1, side: "top" },
  { n: 2, side: "left", target: ".modal-title" },
  { n: 3, side: "left", target: ".modal-tabs-section" },
  { n: 4, side: "bottom", target: ".modal-actions" },
  { n: 5, side: "right", target: ".modal-close" },
  { n: 6, side: "corner" },
];

// Icône AI (sparkle) de l'onglet Photo — OCR piloté par IA.
const AiSparkle = () => (
  <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="dsAiTabGrad" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F67BF8" /><stop offset="0.62" stopColor="#4959E6" />
      </linearGradient>
    </defs>
    <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#dsAiTabGrad)" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ScanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
  </svg>
);

// Gabarit de largeur unique des specimens de modal (les 3 pages) : la largeur réelle
// du composant — max 620, fluide en dessous. Cohérent avec l'overlay de prod.
const MODAL_STYLE = { maxWidth: 620, width: "100%" };

// La modal Add a book, onglet Photo actif — coquille .modal avec un corps à onglets.
const ImportTabs = () => (
  <div className="import-tabs-scroll">
    <div className="import-tabs">
      <div className="import-tab-indicator gradient" style={{ left: 0, width: 84 }} />
      <button type="button" className="import-tab active"><span className="import-tab-ai"><AiSparkle /><span className="import-tab-ai-text">Photo</span></span></button>
      <button type="button" className="import-tab">Barcode</button>
      <button type="button" className="import-tab">File</button>
      <button type="button" className="import-tab">Manual</button>
    </div>
  </div>
);

function AddBookPhotoModalSpec({ className = "", style }) {
  return (
    <div className={`modal ${className}`.trim()} style={{ ...MODAL_STYLE, animation: "none", ...style }}>
      <button type="button" className="modal-close" aria-label="Close"><CloseIcon /></button>
      <div className="modal-title">Add a book</div>
      <div className="modal-tabs-section">
        <ImportTabs />
        <div className="import-tab-pane">
          <div className="import-dropzone">
            <AiSparkle />
            <div className="import-dropzone-text">
              <div className="import-dropzone-title">Drop a photo or click to browse</div>
              <div className="import-dropzone-sub">JPG · PNG · HEIC. Photo d&apos;une étagère ou d&apos;une liste.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-outline btn-md">Cancel</button>
        <button type="button" className="btn btn-primary btn-md">Add</button>
      </div>
    </div>
  );
}

export default function FormModalPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="modal-form"
      title="Form Modal"
      sub="La fenêtre de saisie : un titre, un formulaire, deux actions. Un même cadre pour des contenus qui changent — champs, onglets d'import, ou note de lecture."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-modal-stage ds-preview">
            <AddBookPhotoModalSpec />
          </div>
          </div>
          <p className="ds-note">La modal <strong>Add a book</strong>, onglet <strong>Photo</strong> actif — montrée en flux (pas d&apos;overlay ni d&apos;anim d&apos;entrée). Structure canonique : titre → contenu (ici un corps à onglets <span className="ds-class">.modal-tabs-section</span>) → actions. Aucune marge entre les blocs — c&apos;est le <code>gap: 32</code> de la coquille qui rythme.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={MODAL_ANNOS} stack>
            <AddBookPhotoModalSpec className="ds-anno-organism" />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal</span></td><td>Coquille centrée : bg <span className="ds-token-chip">--card</span>, ombre, radius 8, <code>flex</code> colonne <code>gap: 32</code>. Voir <strong>Modals</strong> pour le langage complet.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.modal-title</span></td><td>Titre du dialog — <code>28 / 800 / −0.02em</code>, sans marge.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.modal-form</span></td><td>Corps : champs (<span className="ds-class">.modal-fields</span>, <code>gap: 24</code>) ou onglets (<span className="ds-class">.modal-tabs-section</span>). Submit hors form, lié par <code>form=&quot;…&quot;</code>. Voir <strong>Body</strong>.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.modal-actions</span></td><td>Footer sticky en bas, boutons <span className="ds-class">.btn</span> en <code>space-between</code>.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.modal-close</span></td><td>Bouton X 40×40, <code>absolute</code> (top / right 16).</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
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
              <Redline padSelector=".modal-actions">
                <AddBookPhotoModalSpec className="ds-fm-spec" style={{ width: 620 }} />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Coquille padding <strong>haut 32</strong> · <strong>côtés 24</strong> (bas 0, le footer porte le sien), <code>gap: 32</code> entre les blocs (titre → <span className="ds-class">.modal-tabs-section</span> → actions). Le corps est ici la vraie UI <strong>Add a book · Photo</strong> (même specimen que l&apos;Anatomy), mais son contenu varie selon l&apos;écran. Footer <span className="ds-class">.modal-actions</span> : padding interne <strong>16</strong> vertical / <strong>24</strong> horizontal (32 + 16 = 48, sur la grille). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — BODY (Add a book : les 4 méthodes d'import) */}
      <div className="ds-card">
        <div className="ds-card-head">Body · Add a book — quatre méthodes d&apos;import</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            {/* Photo */}
            <div className="ds-state-sample">
              <div className="import-tab-pane" style={{ width: "min(402px, 100%)" }}>
                <div className="import-dropzone">
                  <AiSparkle />
                  <div className="import-dropzone-text">
                    <div className="import-dropzone-title">Drop a photo or click to browse</div>
                    <div className="import-dropzone-sub">JPG · PNG · HEIC. Photo d&apos;une étagère ou d&apos;une liste.</div>
                  </div>
                </div>
              </div>
              <span className="ds-class">Photo · OCR IA</span>
            </div>
            {/* Barcode */}
            <div className="ds-state-sample">
              <div className="import-tab-pane" style={{ width: "min(402px, 100%)" }}>
                <div className="import-dropzone">
                  <ScanIcon />
                  <div className="import-dropzone-text">
                    <div className="import-dropzone-title">Point your camera at a barcode</div>
                    <div className="import-dropzone-sub">ISBN → détails du livre</div>
                  </div>
                </div>
              </div>
              <span className="ds-class">Barcode · scanner</span>
            </div>
            {/* File */}
            <div className="ds-state-sample">
              <div className="import-tab-pane" style={{ width: "min(402px, 100%)" }}>
                <div className="import-dropzone">
                  <UploadIcon />
                  <div className="import-dropzone-text">
                    <div className="import-dropzone-title">Drop a file or click to browse</div>
                    <div className="import-dropzone-sub">JSON (Readr) · CSV (Goodreads)</div>
                  </div>
                </div>
              </div>
              <span className="ds-class">File · import</span>
            </div>
            {/* Manual */}
            <div className="ds-state-sample">
              <div className="modal-fields" style={{ width: "min(402px, 100%)" }}>
                <div className="modal-field"><label>Title</label><input placeholder="e.g. Anna Karenina" readOnly /></div>
                <div className="modal-field"><label>Author</label><input placeholder="e.g. Leo Tolstoy" readOnly /></div>
                <div className="modal-field"><label>Year</label><input placeholder="e.g. 1877" readOnly /></div>
              </div>
              <span className="ds-class">Manual · champs</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Un socle unique <span className="ds-class">.modal</span> ; le corps <span className="ds-class">.modal-tabs-section</span> change selon l&apos;onglet, chaque <span className="ds-class">.import-tab-pane</span> portant sa méthode : <strong>Photo</strong> = dropzone OCR IA (sparkle en dégradé), <strong>Barcode</strong> = scanner caméra, <strong>File</strong> = dropzone d&apos;import, <strong>Manual</strong> = champs. Les autres consumers réutilisent le même socle avec un corps plus simple : <span className="ds-class">.modal-fields</span> (Add a quote, Create collection, Reading goal) ou <span className="ds-class">.panel-finished-field</span> (Finish reading — rating + note).</p>
        </div>
      </div>

      {/* 6 — BEHAVIOR (sticky actions, visuel) */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · sticky actions on scroll</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-modal-stage ds-modal-stage--scroll ds-preview">
            <div className="modal" style={MODAL_STYLE}>
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
          <p className="ds-note">Scrolle le form à l&apos;intérieur : <span className="ds-class">.modal-actions</span> reste épinglée en bas via <code>position: sticky; bottom: 0</code>, fond <code>inherit</code> + <code>border-top</code> <span className="ds-token-chip">--border-subtle</span>. Actif dès que le contenu peut déborder (Add a book avec liste de scan, Finish reading…). Le reste du cycle de vie (a11y, scroll-lock, motion) est commun à la famille — voir <strong>Modals</strong>.</p>
        </div>
      </div>

      {/* 7 — SIZING */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Width — desktop</div>
            <p><code>max-width: 630</code> · <code>width: 100%</code>. Une largeur <strong>unique</strong> — pas d&apos;échelle S / M / L : un form Readr est court, une seule taille suffit.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Width — mobile</div>
            <p>La coquille suit la largeur dispo, bornée par le padding <code>24</code> de l&apos;<span className="ds-class">.modal-overlay</span> → ≈ <code>viewport − 48</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Height</div>
            <p>S&apos;adapte au contenu, plafonnée à <code>calc(100vh − 80px)</code> puis <code>overflow-y: auto</code> — le corps scrolle, les actions restent sticky.</p>
          </div>
        </div>
      </div>

      {/* 8 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><strong>Add a book</strong> (4 onglets Photo / Barcode / File / Manual), <strong>Add a quote</strong>, <strong>Finish reading</strong> (rating + note), <strong>Reading goal</strong>, <strong>Create collection</strong>. Tous montent la même coquille <span className="ds-class">.modal</span> ; seul change le corps entre titre et actions.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Contained pieces</div>
            <p>À l&apos;intérieur du corps : <strong>Box Message</strong> (<span className="ds-class">.modal-info-box</span>), <strong>Upload Box</strong> (dropzone Photo / File), le groupe <span className="ds-class">.modal-toggle-group</span> (case « Mark as reading »). Documentés sur leurs pages.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sibling · Delete Modal</div>
            <p>Coquille sœur dédiée à la <strong>confirmation destructive</strong> (<span className="ds-class">.confirm-modal</span>) : même socle et même a11y, mais un message centré au lieu d&apos;un form. Voir <strong>Delete Modal</strong>.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
