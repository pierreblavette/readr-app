import DSSection from "../_components/DSSection";

const SAMPLES = [
  { sample: { borderRadius: 6, background: "var(--card)", border: "1.5px solid var(--border-subtle)" }, label: "Component · 1.5px var(--border-subtle)" },
  { sample: { borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "transparent" }, label: "Divider · 1px var(--border-subtle)" },
  { sample: { borderRadius: 6, background: "var(--card)", border: "2px solid var(--border)" }, label: "Spinner ring · 2px solid var(--border)" },
  { sample: { borderRadius: 6, background: "var(--card)", border: "2px dashed var(--border)" }, label: "Dropzone · 2px dashed var(--border)" },
];

export default function StrokesPage() {
  return (
    <DSSection id="strokes" title="Strokes & Borders" sub="Canonical rules for borders across components, cards, inputs and dividers.">

      {/* 1 — APPLICATION RULES */}
      <div className="ds-card">
        <div className="ds-card-head">Application rules</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Component strokes · 1.5px solid var(--border-subtle)</div>
            <p>Buttons, inputs, cards, containers — default frame stroke across the app.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dividers · 1px solid var(--border-subtle)</div>
            <p>Row separators, section lines — thinner than component strokes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Spinner ring · 2px solid var(--border)</div>
            <p>Single usage — <code>.panel-spinner</code> loading ring needs stronger contrast.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dropzone · 2px dashed var(--border)</div>
            <p>Single usage — <code>.import-dropzone</code> dashed border for import file/photo zones.</p>
          </div>
        </div>
      </div>

      {/* 2 — VISUAL SAMPLES */}
      <div className="ds-card">
        <div className="ds-card-head">Visual samples</div>
        <div className="ds-card-body col">
          {SAMPLES.map(({ sample, label }, i) => (
            <div key={i} className="spacing-row">
              <div style={{ width: 120, height: 40, flexShrink: 0, ...sample }} />
              <span className="type-sample-meta">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 — NOTES */}
      <div className="ds-card">
        <div className="ds-card-head">Notes</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Stroke position — inside</div>
            <p>All strokes are rendered <strong>inside</strong> the declared size (equivalent to Figma's "Inside" stroke). Enforced globally by Tailwind's <code>box-sizing: border-box</code> reset — the stroke eats into the content area without enlarging the element.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Light mode — why two tokens ?</div>
            <p><span className="ds-token-chip">--border-subtle</span> (#EFEFEF) keeps the component frames airy without feeling heavy on large surfaces like cards. <span className="ds-token-chip">--border</span> (#E0E0E0) is reserved for affordances that need stronger contrast (dashed dropzones, spinner rings) where a subtle stroke would disappear.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dark mode</div>
            <p>Both tokens collapse to <code>#2E2E2E</code>. The light/dark distinction is intentional — dark backgrounds don't need two stroke strengths.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
