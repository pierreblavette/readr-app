import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";
import { QUOTE } from "../_specs";

const TEXTAREA_ANNOS = [
  { n: 1, side: "right", target: ".modal-field" },
  { n: 2, side: "left", target: ".modal-field-label" },
  { n: 3, side: "left", target: ".quote-textarea" },
];

export default function TextareaPage() {
  return (
    <DSSection className="ds-scene-frame" id="inputs-textarea" title="Textarea" sub="Le champ multi-lignes : le socle du Text Field décliné pour un texte qui respire — citations, notes.">

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <div style={{ width: 360 }}>
              <div className="modal-field" style={{ width: "100%" }}>
                <label className="modal-field-label">Quote</label>
                <textarea className="quote-textarea is-focus" rows={3} readOnly defaultValue={QUOTE} style={{ width: "100%" }} />
              </div>
            </div>
          </div>
          </div>
          <p className="ds-note">Le socle du <a href="/design-system/inputs/text-field"><strong>Text Field</strong></a> décliné <strong>multi-lignes</strong> — seul champ à padding vertical (le texte respire sur plusieurs lignes) et <code>resize: vertical</code>. Utilisé en QuoteModal / BookPanel.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={TEXTAREA_ANNOS} stack>
            <div className="ds-anno-organism" style={{ width: 360 }}>
              <div className="modal-field" style={{ width: "100%" }}>
                <label className="modal-field-label">Quote</label>
                <textarea className="quote-textarea is-focus" rows={3} readOnly defaultValue={QUOTE} style={{ width: "100%" }} />
              </div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal-field</span></td><td>Conteneur : <code>flex</code> colonne, <strong>gap 8</strong> entre label et champ — identique au text field.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.modal-field-label</span></td><td>Libellé : 13/500 <span className="ds-token-chip">--text-2</span>, toujours visible.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.quote-textarea</span></td><td>Champ multi-lignes : padding <strong>12 14</strong> (vertical rétabli vs <code>0 14</code>), <code>line-height: 1.6</code>, <code>resize: vertical</code>, radius 8, border 1.5 <span className="ds-token-chip">transparent</span>, bg <span className="ds-token-chip">--bg3</span>, font 15/600.</td><td>—</td></tr>
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
                <div className="modal-field" style={{ width: 320 }}>
                  <label className="modal-field-label">Quote</label>
                  <textarea className="quote-textarea" rows={3} readOnly defaultValue={QUOTE} style={{ width: "100%", background: "var(--card)" }} />
                </div>
              </Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <textarea className="quote-textarea" rows={2} readOnly defaultValue="Padding 12 14" style={{ width: 260 }} />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Champ : <strong>gap 8</strong> (label → textarea). Textarea : padding <strong>12 14</strong> (vertical rétabli vs le <code>0 14</code> du text field), <code>line-height: 1.6</code>. Hover / focus identiques au text field (bg <span className="ds-token-chip">--primary-5</span>, bord <span className="ds-token-chip">--primary-50</span>, anneau <span className="ds-token-chip">--primary-20</span>). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

    </DSSection>
  );
}
