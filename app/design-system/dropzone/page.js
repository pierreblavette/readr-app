import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import GradientDropzone from "@/components/library/GradientDropzone";

// Icône upload (arrow-up into tray) — glyphe réel des dropzones AddModal.
function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

// Dropzone fichier (.import-dropzone--svg) : bord SVG uni, drag&drop JSON/CSV.
function FileDrop({ state = "" }) {
  return (
    <GradientDropzone solid className={`import-dropzone import-dropzone--svg${state ? " " + state : ""}`}>
      <UploadIcon />
      <div className="import-dropzone-text">
        <div className="import-dropzone-title">Drop a file or click to browse</div>
        <div className="import-dropzone-sub">JSON (Readr) · CSV (Goodreads)</div>
      </div>
    </GradientDropzone>
  );
}

// Dropzone photo (.import-dropzone-photo) : bord + fond en dégradé rose→bleu (import AI/OCR).
function PhotoDrop() {
  return (
    <GradientDropzone gradientId="dzPhotoGrad">
      <UploadIcon />
      <div className="import-dropzone-text">
        <div className="import-dropzone-title">Drop a photo or click to browse</div>
        <div className="import-dropzone-sub">JPG · PNG · HEIC. Photo of a bookshelf or a handwritten list.</div>
      </div>
    </GradientDropzone>
  );
}

const PARSED = [
  ["The Great Gatsby", "F. Scott Fitzgerald"],
  ["Beloved", "Toni Morrison"],
  ["Dune", "Frank Herbert"],
];
function ImportPreview() {
  return (
    <div className="import-preview">
      <div className="import-preview-header">
        <span className="import-preview-title">{PARSED.length} books found</span>
      </div>
      <div className="import-preview-list">
        {PARSED.map(([title, author]) => (
          <div key={title} className="import-preview-item">
            <div>
              <div className="import-preview-book">{title}</div>
              <div className="import-preview-author">{author}</div>
            </div>
            <button type="button" className="import-preview-remove" aria-label={`Remove ${title}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Largeur uniforme des specimens dropzone : cap 402 (iPhone 16 Pro), fluide en dessous.
const DZW = { width: "min(402px, 100%)" };

const ANNOS = [
  { n: 1, side: "left", target: ".import-dropzone" },
  { n: 2, side: "top", target: ".import-dropzone > svg:not(.photo-dropzone-border)" },
  { n: 3, side: "right", target: ".import-dropzone-title" },
  { n: 4, side: "right", target: ".import-dropzone-sub" },
];

export default function DropzonePage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="dropzone"
      title="Dropzone"
      sub="La zone où déposer un fichier ou une photo pour importer des livres : glisser-déposer, ou clic pour parcourir. Deux variantes selon la source."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <div style={DZW}><FileDrop /></div>
            </div>
          </div>
          <p className="ds-note">La dropzone <span className="ds-class">.import-dropzone</span> — 200px de haut, bord <strong>tireté</strong> (dash 6/4, radius 10), icône + invite. Cliquer parcourt les fichiers ; glisser-déposer marche aussi (état <span className="ds-class">.dragover</span>). Le bord est dessiné en <strong>SVG</strong> (une bordure CSS ne peut ni porter un dégradé ni caler le rythme des tirets).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={ANNOS}>
              <div className="ds-anno-organism" style={{ width: "min(402px, 100%)" }}>
                <FileDrop />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.import-dropzone</span></td><td>Conteneur : flex colonne centré, padding <code>24</code>, gap <code>16</code>, <code>min-height: 200</code>, radius 10, fond <span className="ds-token-chip">--primary-3</span>. Cliquable / cible du drop.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><code>svg</code></td><td>Icône d&apos;upload — 28×28, <span className="ds-token-chip">--primary-50</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.import-dropzone-title</span></td><td>Invite principale, 15/600 <span className="ds-token-chip">--text</span> (« Drop a file or click to browse »).</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.import-dropzone-sub</span></td><td>Formats acceptés, 13/500 <span className="ds-token-chip">--text-2</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.photo-dropzone-border</span></td><td>Bord tireté dessiné en SVG (<code>rect</code> dash <code>6 4</code>, <code>rx 9</code>) — mesuré au <code>ResizeObserver</code>. Uni <span className="ds-token-chip">--primary-20</span> (fichier) ou dégradé rose→bleu (photo).</td><td>—</td></tr>
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
              <Redline>
                <div className="import-dropzone" style={{ minHeight: "auto", width: "var(--spec-w, 402px)" }}>
                  <UploadIcon />
                  <div className="import-dropzone-text">
                    <div className="import-dropzone-title">Drop a file or click to browse</div>
                    <div className="import-dropzone-sub">JSON (Readr) · CSV (Goodreads)</div>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Conteneur : padding <strong>24</strong> sur les 4 côtés, gap <strong>16</strong> entre icône et texte (<code>min-height: 200</code> en usage, réduit ici pour la cote). Radius 10. Le <span className="ds-class">.import-dropzone-text</span> a un gap <strong>8</strong> interne (titre / sous-titre). Bord SVG : <code>rect</code> dash <code>6 4</code>, <code>rx 9</code>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            <div className="ds-state-sample">
              <div style={DZW}><FileDrop /></div>
              <span className="ds-class">.import-dropzone</span>
            </div>
            <div className="ds-state-sample">
              <div style={DZW}><FileDrop state="dragover" /></div>
              <span className="ds-class">.dragover</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Repos — bord <span className="ds-token-chip">--primary-20</span>, fond <span className="ds-token-chip">--primary-3</span>. <span className="ds-class">.dragover</span> (survol souris ou fichier au-dessus) — bord <span className="ds-token-chip">--accent</span>, fond <span className="ds-token-chip">--primary-5</span> : la zone « s&apos;arme » pour signaler qu&apos;un dépôt sera capté.</p>
        </div>
      </div>

      {/* 6 — VARIANTS */}
      <div className="ds-card">
        <div className="ds-card-head">Variants</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            <div className="ds-state-sample">
              <div style={DZW}><FileDrop /></div>
              <span className="ds-class">.import-dropzone--svg</span>
            </div>
            <div className="ds-state-sample">
              <div style={DZW}><PhotoDrop /></div>
              <span className="ds-class">.import-dropzone-photo</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Fichier · .import-dropzone--svg</div>
            <p>Bord SVG <strong>uni</strong> <span className="ds-token-chip">--primary-20</span> (→ <span className="ds-token-chip">--accent</span> au survol / drop). Vrai <code>drag&amp;drop</code> + clic. Import structuré : <strong>JSON</strong> (Readr) / <strong>CSV</strong> (Goodreads).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Photo · .import-dropzone-photo</div>
            <p>Bord <strong>dégradé</strong> rose→bleu + fond dégradé léger — signe l&apos;action <strong>AI</strong>. Import d&apos;une photo (étagère, liste manuscrite) → OCR / extraction. Même dash 6/4, même rythme.</p>
          </div>
        </div>
      </div>

      {/* 7 — IMPORT PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Import preview</div>
        <div className="ds-card-body col">
          <ImportPreview />
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Après upload, la dropzone laisse place à la <span className="ds-class">.import-preview</span> — la liste des livres <strong>parsés</strong>, à valider avant l&apos;ajout. <span className="ds-class">.import-preview-header</span> (compteur « N books found ») + <span className="ds-class">.import-preview-list</span> scrollable (<code>max-height</code> clampée). Chaque <span className="ds-class">.import-preview-item</span> — <span className="ds-class">.import-preview-book</span> (titre 15/600) + <span className="ds-class">.import-preview-author</span> (13 <span className="ds-token-chip">--text-2</span>) + un <span className="ds-class">.import-preview-remove</span> pour l&apos;écarter. Le flux : <strong>dropzone → preview → confirm</strong>.</p>
        </div>
      </div>

      {/* 7b — SPACING · import preview */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing · import preview</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline noGaps boxSelector=".import-preview-remove">
                <div className="import-preview-item" style={{ width: "var(--spec-w, 402px)" }}>
                  <div>
                    <div className="import-preview-book">The Great Gatsby</div>
                    <div className="import-preview-author">F. Scott Fitzgerald</div>
                  </div>
                  <button type="button" className="import-preview-remove" aria-label="Remove">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Item</strong> <span className="ds-class">.import-preview-item</span> : padding <strong>8 / 12</strong>, radius 8, fond <span className="ds-token-chip">--bg3</span>, <code>space-between</code> (titre/auteur ↔ croix). Titre → auteur : <strong>4</strong> (<code>margin-top</code> sur <span className="ds-class">.import-preview-author</span>). Croix <span className="ds-class">.import-preview-remove</span> <strong>32×32</strong> (svg 14, radius 7), <code>margin-left: 8</code>, cotée en boîte. Autour : les items s&apos;empilent dans <span className="ds-class">.import-preview-list</span> à gap <strong>8</strong> (padding 8, bord 1.5), et <span className="ds-class">.import-preview-header</span> est séparé de la liste par un gap <strong>8</strong>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 8 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Déposer ou parcourir</div>
            <p>Deux entrées équivalentes : <strong>glisser-déposer</strong> un fichier sur la zone, ou <strong>cliquer</strong> pour ouvrir le sélecteur natif (<code>&lt;input type="file"&gt;</code> masqué). Le <code>onDragOver</code> ajoute <span className="ds-class">.dragover</span> (feedback), <code>onDragLeave</code> le retire, <code>onDrop</code> parse le fichier.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Parsing → preview</div>
            <p>Le fichier lu (JSON / CSV) ou la photo (OCR) produit une liste de livres → <span className="ds-class">.import-preview</span>. L&apos;utilisateur retire les faux positifs avant de confirmer. Une erreur de format s&apos;affiche en <span className="ds-class">.import-error</span> (<span className="ds-token-chip">--destructive</span>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Après un premier fichier</div>
            <p>La dropzone pleine hauteur cède la place à un bouton compact <span className="ds-class">.import-change-file</span> (« Change file ») — la zone de dépôt a fait son travail, on n&apos;en garde qu&apos;un rappel discret au-dessus de la preview.</p>
          </div>
        </div>
      </div>

      {/* 9 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><strong>AddModal</strong> — onglet <strong>Photo</strong> (<span className="ds-class">.import-dropzone-photo</span>, import AI d&apos;une étagère / liste manuscrite) et onglet <strong>Import</strong> (<span className="ds-class">.import-dropzone--svg</span>, fichier JSON / CSV). Les deux montent <span className="ds-class">GradientDropzone</span> ; seuls le bord (dégradé vs uni) et le contenu changent.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Primitive partagée</div>
            <p><span className="ds-class">GradientDropzone</span> (<code>_components</code> prod) dessine le bord SVG et mesure sa taille au <code>ResizeObserver</code>. Prop <code>solid</code> = bord uni piloté par CSS (états <code>:hover</code> / <code>.dragover</code>) ; défaut = dégradé rose→bleu.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
