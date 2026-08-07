import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";
import { Field, ErrorIcon, WarnIcon } from "../_specs";

// Default / Hover / Focus / Disabled — les 4 états réels du champ (mirror is-* / attr).
const STATES = [
  ["Default", "", false, ".modal-field-input"],
  ["Hover", "is-hover", false, ":hover"],
  ["Focus", "is-focus", false, ":focus"],
  ["Disabled", "", true, ":disabled"],
];

// sm 32 / md 40 (actuel) / lg 48. Pas 8, comme les boutons.
const SIZES = [
  ["Small", "modal-field-input--sm", "32", "0 12", "14"],
  ["Medium", "", "40", "0 14", "15"],
  ["Large", "modal-field-input--lg", "48", "0 16", "16"],
];

// Décomposition numérotée : le champ (1 = container) + ses parties (2/3/4).
const ANNOS = [
  { n: 1, side: "right", target: ".modal-field" },
  { n: 2, side: "left", target: ".modal-field-label" },
  { n: 3, side: "left", target: ".modal-field-input" },
  { n: 4, side: "left", target: ".modal-field-hint" },
];

export default function TextFieldPage() {
  return (
    <DSSection className="ds-scene-frame" id="inputs-text-field" title="Text Field" sub="Le champ de saisie classique : label, champ, message. Le socle dont dérivent la zone de texte et la recherche.">

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <div style={{ width: 340 }}><Field /></div>
          </div>
          </div>
          <p className="ds-note">Un champ = <strong>label + field + helper</strong>. Le label est toujours présent et discret ; le placeholder ne le remplace jamais. Bordure <strong>transparente au repos</strong> qui se colore au hover/focus — le champ ne saute pas de taille.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={ANNOS} stack>
            <div className="ds-anno-organism" style={{ width: 340 }}><Field /></div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal-field</span></td><td>Conteneur : <code>flex</code> colonne, <strong>gap 8</strong> constant entre label / field / helper.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.modal-field-label</span></td><td>Libellé : 13/500 <span className="ds-token-chip">--text-2</span>, toujours visible.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.modal-field-input</span></td><td>Champ : height 40, radius 8, border 1.5 <span className="ds-token-chip">transparent</span>, bg <span className="ds-token-chip">--bg3</span>, font 15/600, padding <code>0 14</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.modal-field-hint</span></td><td>Helper : guidance <em>permanente</em> 13/500 <span className="ds-token-chip">--text-2</span> — remplacé par un message d&apos;erreur/warning quand la validation échoue (jamais les deux).</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
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
                <div className="modal-field" style={{ width: 300 }}>
                  <label className="modal-field-label">Title</label>
                  <input type="text" className="modal-field-input" defaultValue="Normal People" readOnly style={{ width: "100%", background: "var(--card)" }} />
                  <span className="modal-field-hint">Helper text.</span>
                </div>
              </Redline>
            </div>
            {SIZES.map(([name, mod]) => (
              <div key={name} className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
                <Redline>
                  <input type="text" className={`modal-field-input${mod ? " " + mod : ""}`} defaultValue={name} readOnly style={{ width: 260 }} />
                </Redline>
              </div>
            ))}
          </div>
          <p className="ds-note">Champ : <strong>gap 8</strong> constant (label → field → helper). Field : padding <strong>0 12 / 0 14 / 0 16</strong> (sm / md / lg), height <strong>32 / 40 / 48</strong>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            {STATES.map(([state, mod, disabled, cap]) => (
              <div key={state} className="ds-state-sample">
                <div className="modal-field" style={{ width: "min(402px, 100%)" }}>
                  <label className="modal-field-label">{state}</label>
                  <input
                    type="text"
                    className={`modal-field-input${mod ? " " + mod : ""}`}
                    defaultValue={disabled ? "Locked value" : "Normal People"}
                    disabled={disabled}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="ds-class">{cap}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Bordure transparente au repos, colorée au hover/focus. Hover : bg <span className="ds-token-chip">--primary-5</span> + bord <span className="ds-token-chip">--primary-50</span>. Focus : idem + anneau <code>0 0 0 3px</code> <span className="ds-token-chip">--primary-20</span> (dark <code>rgba(73,89,230,0.4)</code>). Disabled : texte <span className="ds-token-chip">--text-2</span>, <code>cursor: not-allowed</code>.</p>
        </div>
      </div>

      {/* 6 — SIZING */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            {SIZES.map(([name, mod]) => (
              <div key={name} className="ds-state-sample">
                <div className="modal-field" style={{ width: "min(402px, 100%)" }}>
                  <label className="modal-field-label">Title</label>
                  <input type="text" className={`modal-field-input${mod ? " " + mod : ""}`} defaultValue={name} readOnly style={{ width: "100%" }} />
                </div>
                <span className="ds-class">{mod ? `.${mod}` : ".modal-field-input"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {SIZES.map(([name, mod, h, p, f]) => (
            <div key={name} className="ds-token-block">
              <div className="ds-token-name">{name} · {h}px</div>
              <p>height {h} · padding {p} · font {f}</p>
            </div>
          ))}
          <p className="ds-note">L&apos;app n&apos;utilise aujourd&apos;hui que <code>md</code> ; l&apos;échelle <code>sm / lg</code> (pas 8, iso boutons) est désormais <strong>disponible</strong> dans library.css.</p>
        </div>
      </div>

      {/* 7 — VARIANTS · validation */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · validation</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            <div className="ds-state-sample">
              <div className="modal-toggle-field" style={{ width: "min(402px, 100%)" }}>
                <div className="modal-field" style={{ width: "100%" }}>
                  <label className="modal-field-label">Error</label>
                  <input type="text" className="modal-field-input is-invalid" defaultValue="" placeholder="Title" readOnly style={{ width: "100%" }} />
                </div>
                <span className="modal-toggle-message is-error"><ErrorIcon /> Title is required.</span>
              </div>
              <span className="ds-class">.is-invalid</span>
            </div>
            <div className="ds-state-sample">
              <div className="modal-toggle-field" style={{ width: "min(402px, 100%)" }}>
                <div className="modal-field" style={{ width: "100%" }}>
                  <label className="modal-field-label">Warning</label>
                  <input type="text" className="modal-field-input is-warn" defaultValue="978-000000000" readOnly style={{ width: "100%" }} />
                </div>
                <span className="modal-toggle-message is-warning"><WarnIcon /> ISBN looks incomplete.</span>
              </div>
              <span className="ds-class">.is-warn</span>
            </div>
            <div className="ds-state-sample">
              <div className="modal-field" style={{ width: "min(402px, 100%)" }}>
                <label className="modal-field-label">Read-only</label>
                <input type="text" className="modal-field-input is-readonly" defaultValue="Sally Rooney" readOnly style={{ width: "100%" }} />
              </div>
              <span className="ds-class">.is-readonly</span>
            </div>
            <div className="ds-state-sample">
              <div className="modal-field" style={{ width: "min(402px, 100%)" }}>
                <label className="modal-field-label">Helper text</label>
                <input type="text" className="modal-field-input" defaultValue="" placeholder="e.g. 978-0-571-33465-0" readOnly style={{ width: "100%" }} />
                <span className="modal-field-hint">10 or 13 digits, dashes optional.</span>
              </div>
              <span className="ds-class">.modal-field-hint</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Message · réutilise <span className="ds-cn">.modal-toggle-message</span></div>
            <p>La primitive de message existe déjà (checkbox) : icône 16 + texte 13/500, <span className="ds-class">.is-error</span> <span className="ds-token-chip">--destructive</span> · <span className="ds-class">.is-warning</span> <code>#B45309</code> (dark <code>#FBBF24</code>). À généraliser en <span className="ds-class">.modal-field-message</span> le jour où on la partage avec les champs texte — pas une classe parallèle.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Bordure d&apos;état · proposé</div>
            <p>Error <span className="ds-token-chip">--destructive</span> + anneau focus <code>rgba(239,68,68,0.2)</code> · Warning <code>#B45309</code> · Read-only bord <span className="ds-token-chip">--border-subtle</span>, fond transparent, texte <span className="ds-token-chip">--text-2</span> (non éditable mais lisible, pas grisé comme disabled).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Helper text vs erreur</div>
            <p>Le helper (<span className="ds-class">.modal-field-hint</span>) est une guidance <em>permanente</em>. Le message d&apos;erreur est <em>conditionnel</em> et le remplace quand la validation échoue — jamais les deux à la fois.</p>
          </div>
          <p className="ds-note"><strong>Proposition</strong> — le vocabulaire couleur existe déjà, seul l&apos;habillage du bord et le câblage validation manquent dans library.css. Aujourd&apos;hui l&apos;app affiche les erreurs via <span className="ds-class">.modal-error</span> (13/<span className="ds-token-chip">--destructive</span>, sans bord rouge).</p>
        </div>
      </div>

    </DSSection>
  );
}
