import DSSection from "../_components/DSSection";
import GradientDropzone from "@/components/library/GradientDropzone";

// Source unique : le style de bordure rendu ET décrit viennent du même objet.
const STROKES = [
  {
    name: "Component frame",
    css: "1.5px solid",
    token: "--border-subtle",
    use: "default frame — buttons, inputs, cards, containers",
    style: { borderRadius: 8, background: "var(--card)", border: "1.5px solid var(--border-subtle)" },
  },
  {
    name: "Divider",
    css: "1px solid",
    token: "--border-subtle",
    use: "row separators and section lines, thinner than frames",
    style: { borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "transparent" },
  },
  {
    name: "Spinner ring",
    css: "2px solid",
    token: "--border",
    cls: ".panel-spinner",
    use: "single usage — the loading ring needs stronger contrast",
    style: { borderRadius: 8, background: "var(--card)", border: "2px solid var(--border)" },
  },
  {
    name: "Dropzone",
    css: "2px dashed",
    token: "--primary-20",
    cls: ".import-dropzone",
    use: "import file/photo zones — SVG-drawn (6/4 dash), primary-tinted",
    style: { borderRadius: 8, background: "var(--primary-3)", border: "2px dashed var(--primary-20)" },
  },
];

export default function StrokesPage() {
  return (
    <DSSection id="strokes" title="Strokes & Borders" sub="Canonical rules for borders across components, cards, inputs and dividers.">

      {/* 1 — STROKES : visuel + spéc dans la même rangée (iso section Radius) */}
      <div className="ds-card">
        <div className="ds-card-head">Strokes</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-stroke-tokens">
            {STROKES.map(({ name, css, token, cls, use, style }) => (
              <div key={name} className="ds-state-sample">
                <div className="ds-stroke-swatch" style={style} />
                <div className="ds-stroke-info">
                  <div className="ds-stroke-name">{name}</div>
                  <div className="ds-stroke-meta">
                    <code>{css}</code> <span className="ds-token-chip">{token}</span>
                    {cls && <> · <span className="ds-class">{cls}</span></>} — {use}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2 — IN USE : chaque trait sur son consommateur réel */}
      <div className="ds-card">
        <div className="ds-card-head">In use</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-stroke-board">
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <button type="button" className="btn btn-outline btn-md"><span>Outline button</span></button>
              </div>
              <span className="ds-class">.btn-outline</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <div className="dropdown-menu dropdown-menu--portal ds-menu-static" role="menu">
                  <button type="button" className="dropdown-item">Edit review</button>
                  <button type="button" className="dropdown-item">Share</button>
                  <div className="dropdown-divider" role="separator" />
                  <button type="button" className="dropdown-item is-destructive">Delete</button>
                </div>
              </div>
              <span className="ds-class">.dropdown-divider</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <div className="panel-spinner" />
              </div>
              <span className="ds-class">.panel-spinner</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <GradientDropzone solid>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div className="import-dropzone-text">
                    <div className="import-dropzone-title">Drop a file</div>
                  </div>
                </GradientDropzone>
              </div>
              <span className="ds-class">.import-dropzone</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Each stroke shown on its real consumer (<code>library.css</code> classes, no replica). The menu combines two : the <strong>1.5px frame</strong> and the <strong>1px divider</strong> between Share and Delete.</p>
        </div>
      </div>

      {/* 3 — NOTES */}
      <div className="ds-card">
        <div className="ds-card-head">Notes</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Stroke position — inside</div>
            <p>All strokes are rendered <strong>inside</strong> the declared size (equivalent to Figma&apos;s &quot;Inside&quot; stroke). Enforced globally by Tailwind&apos;s <code>box-sizing: border-box</code> reset — the stroke eats into the content area without enlarging the element.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Light mode — why two tokens ?</div>
            <p><span className="ds-token-chip">--border-subtle</span> (<code>#EFEFEF</code>) keeps component frames airy without feeling heavy on large surfaces like cards. <span className="ds-token-chip">--border</span> (<code>#E0E0E0</code>) is reserved for the <strong>spinner ring</strong>, where a subtle stroke would disappear on a spinning loader.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dropzone — primary-tinted, not neutral</div>
            <p>The dropzone no longer uses a neutral stroke : it moved to a <strong>primary-tinted</strong> treatment (<span className="ds-token-chip">--primary-3</span> fill + <span className="ds-token-chip">--primary-20</span> dashed) to read as an inviting, branded drop target rather than a plain outlined box. The dash is <strong>SVG-drawn</strong> (<code>stroke-dasharray 6 4</code>, radius 9) — a CSS border can&apos;t carry the gradient of the AI variant, so both share the same SVG rhythm. On drag-over the stroke shifts to <span className="ds-token-chip">--accent</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dark mode</div>
            <p>Both tokens collapse to <code>#2E2E2E</code>. The light/dark distinction is intentional — dark backgrounds don&apos;t need two stroke strengths.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
