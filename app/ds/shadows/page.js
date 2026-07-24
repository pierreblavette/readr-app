import DSSection from "../_components/DSSection";

const SHADOWS = [
  { token: "--shadow-md", use: "Cartes hover (drop primary-tinted)" },
  { token: "--shadow-lg", use: "Autocomplete, mobile sidebar (primary-tinted)" },
];

const RADII = [
  { r: 6, use: "Buttons XS, items de menu (dropdown, autocomplete)" },
  { r: 7, use: "Buttons SM" },
  { r: 8, use: "Default", token: "--radius" },
  { r: 10, use: "Listes flottantes (dropdown, autocomplete), dropzone" },
  { r: 12, use: "Camera scan viewfinder" },
  { r: 16, use: "Onboarding modal" },
  { r: 32, use: "Pill (search input)" },
];

export default function ShadowsPage() {
  return (
    <DSSection id="shadows" title="Shadows & Radius">

      {/* 1 — SHADOWS — tuiles façon Colors (.ds-swatch) */}
      <div className="ds-card">
        <div className="ds-card-head">Shadows</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            {SHADOWS.map(({ token, use }) => (
              <div key={token} className="ds-swatch" style={{ boxShadow: `var(${token})` }}>
                <div className="ds-swatch-block" style={{ background: "var(--card)", borderBottom: "1px solid var(--border-subtle)" }} />
                <div className="ds-swatch-info">
                  <div className="ds-swatch-tokens"><span className="ds-token-chip">{token}</span></div>
                  <div className="ds-token-val">{use}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Modal shadow — dark override</div>
            <p><span className="ds-class">.modal</span> and <span className="ds-class">.confirm-modal</span> in dark mode use a hardcoded neutral black shadow <code>0 12px 48px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.30)</code> instead of the primary-tinted <span className="ds-token-chip">--shadow-lg</span>. Reason: blue-tinted shadow on dark UI reads as a brand wash; pure black gives proper depth without color contamination.</p>
          </div>
        </div>
      </div>

      {/* 2 — BORDER RADIUS — rows spacing-row */}
      <div className="ds-card">
        <div className="ds-card-head">Border Radius</div>
        <div className="ds-card-body col">
          {RADII.map(({ r, use, token }) => (
            <div key={r} className="spacing-row">
              <div className="spacing-block" style={{ width: 64, height: 40, borderRadius: r }} />
              <span className="spacing-label">{r}px</span>
              <span className="type-sample-meta">
                {use}{token && <> — <span className="ds-token-chip">{token}</span></>}
              </span>
            </div>
          ))}
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Rayons imbriqués</div>
            <p>Un élément posé dans un conteneur arrondi prend <strong>radius du conteneur moins son padding</strong> : les deux courbes ne se lisent comme parallèles que si leur écart vaut l&apos;espace qui les sépare. Un item de <span className="ds-class">.dropdown-menu</span> (radius 10, padding 4) vaut donc 6.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
