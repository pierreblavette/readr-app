import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

const VARIANTS = [
  { name: "Primary", variant: "btn-primary" },
  { name: "Secondary", variant: "btn-secondary" },
  { name: "Ghost", variant: "btn-ghost" },
  { name: "Outline", variant: "btn-outline" },
  { name: "Critical", variant: "btn-critical" },
];

const STATES = [
  ["Default", ""],
  ["Hover", "is-hover"],
  ["Active", "is-active"],
  ["Focus", "is-focus"],
  ["Disabled", ""],
];

const MAPPING = [
  ["Primary CTA", "btn-primary btn-md", [".add-btn", ".empty-cta", ".panel-quotes-add", ".panel-move-btn"]],
  ["Outline (default)", "btn-outline btn-md", [".edit-btn", ".dropdown-btn", ".modal-cancel", ".panel-delete-btn", ".import-change-file", ".col-delete-btn"]],
  ["Icon toggle", "btn-icon btn-md", [".view-btn", ".col-emoji-btn"]],
  ["Text link (inline, not dimensional)", "btn-link / btn-link--critical", [".btn-link · 14/600 · hover --primary-60 + underline", ".btn-link--critical · destructive variant", ".footer-link · 11/500 (footer-specific)", ".quote-see-more · 14/600 (quote/cast expand-collapse)"]],
  ["Sidebar (on dark bg)", "(contextual)", [".sel-btn", ".sel-confirm", ".sel-cancel", ".sel-select-all"]],
  ["AI action", "btn-ai btn-md", [".panel-cast-action (Generate state)"]],
];

const ANATOMY = [
  ["XS", "24", "12", "6", "11", "4", "24×24 · svg 12"],
  ["SM", "32", "16", "7", "12", "6", "32×32 · svg 12"],
  ["MD ★", "40", "20", "8", "15", "8", "40×40 · svg 16"],
  ["LG", "48", "24", "10", "18", "10", "48×48 · svg 18"],
  ["XL", "56", "28", "12", "20", "12", "56×56 · svg 20"],
];

const SIZES = [["btn-xs", "XS"], ["btn-sm", "SM"], ["btn-md", "MD"], ["btn-lg", "LG"], ["btn-xl", "XL"]];

const PlusIcon = ({ strokeWidth = 2.2 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function ButtonsPage() {
  return (
    <DSSection id="buttons" title="Buttons" sub="Canonical .btn.btn-* system + named component classes (library.css). Font-weight 600 across all.">

      {/* 1 — STATES : 5 variantes × 5 états */}
      {VARIANTS.map(({ name, variant }) => (
        <div key={name} className="ds-card">
          <div className="ds-card-head">{name} · states</div>
          <div className="ds-card-body col">
            <div className="ds-states-grid">
              {STATES.map(([state, mod]) => (
                <div key={state} className="ds-state-sample">
                  <span className="panel-section-eyebrow">{state}</span>
                  <button className={`btn ${variant} btn-md${mod ? " " + mod : ""}`} disabled={state === "Disabled"}>
                    {name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* 2 — MAPPING canonique → classes nommées */}
      <div className="ds-card">
        <div className="ds-card-head">Canonical → Named class mapping</div>
        <div className="ds-card-body col">
          {MAPPING.map(([role, canon, classes]) => (
            <div key={role} className="ds-token-block">
              <div className="ds-token-name">{role} · {canon}</div>
              <p>{classes.map((c, i) => <span key={c}>{i > 0 ? " · " : ""}<code>{c}</code></span>)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 — VARIANTES MD */}
      <div className="ds-card">
        <div className="ds-card-head">Variantes — taille MD</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            {[
              ["btn-primary btn-md", "Primary"],
              ["btn-secondary btn-md", "Secondary"],
              ["btn-ghost btn-md", "Ghost"],
              ["btn-outline btn-md", "Outline"],
              ["btn-critical btn-md", "Critical"],
              ["btn-primary btn-md", "Disabled"],
            ].map(([cls, label], i) => (
              <button key={i} className={`btn ${cls}`} disabled={label === "Disabled"}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 — TAILLES */}
      <div className="ds-card">
        <div className="ds-card-head">Tailles — variante Primary</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            {SIZES.map(([sz, label]) => (
              <button key={sz} className={`btn btn-primary ${sz}`}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 5 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          {ANATOMY.map(([sz, h, p, r, f, g, io]) => (
            <div key={sz} className="ds-token-block">
              <div className="ds-token-name">{sz} · {h}px</div>
              <p>padding 0 {p}px · radius {r}px · font {f}px · gap {g}px · icon-only {io}</p>
            </div>
          ))}
          <p className="ds-note">★ Default size used across the app. Outline buttons : stroke <code>1.5px</code> inside (box-sizing: border-box).</p>
        </div>
      </div>

      {/* 6 — ICON BUTTONS */}
      <div className="ds-card">
        <div className="ds-card-head">Icon buttons — Solid & Icon</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            {["btn-xs", "btn-sm", "btn-md", "btn-lg"].map((sz) => (
              <button key={"solid" + sz} className={`btn btn-solid ${sz}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
            ))}
            {["btn-xs", "btn-sm", "btn-md", "btn-lg"].map((sz) => (
              <button key={"icon" + sz} className={`btn btn-icon ${sz}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7 — ICON + TEXT, variantes */}
      <div className="ds-card">
        <div className="ds-card-head">Icon + Text — toutes variantes, taille MD</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            {[
              ["btn-primary", "Add"],
              ["btn-secondary", "Edit"],
              ["btn-ghost", "Export"],
              ["btn-outline", "Filter"],
              ["btn-critical", "Delete"],
            ].map(([variant, label]) => (
              <button key={variant} className={`btn ${variant} btn-md`}>
                <PlusIcon />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 8 — ICON + TEXT, tailles */}
      <div className="ds-card">
        <div className="ds-card-head">Icon + Text — tailles, variante Primary</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            {SIZES.map(([sz, label]) => (
              <button key={sz} className={`btn btn-primary ${sz}`}>
                <PlusIcon />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 9 — PADDING ASYMÉTRIQUE */}
      <div className="ds-card">
        <div className="ds-card-head">Asymmetric padding (icon + text)</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            <button className="btn btn-outline btn-md"><span>Text only</span></button>
            <button className="btn btn-outline btn-md">
              <PlusIcon strokeWidth={2} />
              <span>Icon left</span>
            </button>
            <button className="btn btn-outline btn-md">
              <span>Icon right</span>
              <svg className="dropdown-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Text only · 0 20 (md) / 0 16 (sm)</div>
            <p>Symmetrical baseline.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Icon left + text · 0 20 0 12 (md) / 0 16 0 8 (sm)</div>
            <p>Icon eats visual space — drop padding-left by 8 to balance. Ratio constant across sizes (xs/sm/md/lg/xl all base - 8). Same gutter as chevron.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Text + icon right · 0 12 0 20 (md) / 0 8 0 16 (sm)</div>
            <p>Same logic, mirrored.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Text + chevron right · 0 12 0 20 (md)</div>
            <p>Same gutter as icon-right (no distinction since spec unified to base - 8). Detected via <code>.dropdown-btn-chevron</code> / <code>.sidebar-section-chevron</code> classes.</p>
          </div>
          <p className="ds-note">Auto-detected via <code>:has()</code> on <code>.btn-md</code> / <code>.btn-sm</code> and <code>.dropdown-btn</code> — no extra class needed unless the chevron exception applies. Rule applies when the SVG is the first or last child but not both (so icon-only buttons keep symmetric padding).</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Convention</div>
            <p>Always wrap label text in a <code>&lt;span&gt;</code>. CSS <code>:first-child</code> / <code>:last-child</code> only count element children — a bare text node next to an SVG would make the SVG both first AND last child, breaking the detection.</p>
          </div>
        </div>
      </div>

      {/* 9 bis — REDLINE (test MD) */}
      <div className="ds-card">
        <div className="ds-card-head">Redline — padding & spacing, XS → XL</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board">
            {SIZES.map(([cls]) => (
              <div key={cls} className="ds-redline-row">
                <Redline>
                  <button className={`btn btn-secondary ${cls}`}><span>Common button</span></button>
                </Redline>
                <Redline>
                  <button className={`btn btn-secondary ${cls}`}>
                    <PlusIcon strokeWidth={2} />
                    <span>Common button</span>
                  </button>
                </Redline>
              </div>
            ))}
          </div>
          <p className="ds-note">Cotes <strong>mesurées à l&apos;exécution</strong> sur le bouton réel (padding calculé, gap flex réel, boîte SVG), jamais écrites en dur : le schéma suit le CSS. La boîte d&apos;icône cotée est la boîte réservée (glyph + cadre 2px, ex. 16 + 4 = 20 en md), pas le glyph. Colonne gauche : padding symétrique. Colonne droite : padding asymétrique auto (<code>:has()</code>), côté icône réduit de 8, côté texte de 4.</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Cascade des pas — 8 / 4 / 2</div>
            <p>Les trois métriques progressent linéairement mais chacune à la moitié du pas de la précédente : hauteur <strong>pas 8</strong> (24 → 56), padding <strong>pas 4</strong> (12 → 28, soit exactement hauteur ÷ 2), gap <strong>pas 2</strong> (4 → 12). Un pas unique pour les trois donnerait un gap de 36 en XL — le rapport doit rester proportionnel à ce qu&apos;il sépare, pas à la taille du composant.</p>
          </div>
        </div>
      </div>

      {/* 10 — AI ACTION */}
      <div className="ds-card">
        <div className="ds-card-head">AI action — gradient border + tinted fill</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            {[["btn-sm", "SM"], ["btn-md", "MD"], ["btn-lg", "LG"]].map(([sz, label]) => (
              <button key={sz} className={`btn btn-ai ${sz}`} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`aiGradDS-${sz}`} x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F67BF8" />
                      <stop offset="0.62" stopColor="#4959E6" />
                    </linearGradient>
                  </defs>
                  <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill={`url(#aiGradDS-${sz})`} />
                </svg>
                <span>Generate {label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Border</div>
            <p><code>linear-gradient(to right, #F67BF8, #4959E6)</code> via <code>border-box</code>, 1.5px stroke.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Background</div>
            <p>Same gradient stops at <code>0.05</code> opacity default, <code>0.1</code> on hover, via <code>padding-box</code> (over an opaque <span className="ds-token-chip">--bg</span> layer that masks the solid gradient inside the ring).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Padding</div>
            <p><code>0 20px 0 16px</code> (asymmetric icon-left — mirrors <code>.panel-quotes-add</code> ; 16px left for the leading sparkle icon, scale-proportional base - 4 at md scale).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Icon · sizes · usage</div>
            <p>Pair with <code>.import-tab-ai-icon</code> 16×16 sparkle SVG. Sizes : SM / MD (default) / LG. Reserved for AI-generated actions. First app usage : <code>.panel-cast-action</code> in BookPanel (Now Reading) — the "Generate cast" / "Regenerate" call to the Gemini cast endpoint.</p>
          </div>
        </div>
      </div>

      {/* 11 — TEXT LINK */}
      <div className="ds-card">
        <div className="ds-card-head">Text link — .btn-link</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            <button type="button" className="btn-link">Remove goal</button>
            <button type="button" className="btn-link btn-link--critical">Remove goal</button>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">.btn-link</div>
            <p>Inline text action — 14 / 600 · <span className="ds-token-chip">--primary-50</span> · hover <span className="ds-token-chip">--primary-60</span> + underline · no padding, no border, no fixed height. Used for low-key actions inside forms or cards (e.g. "Remove goal" in ReadingGoalModal).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.btn-link--critical</div>
            <p><span className="ds-token-chip">--destructive</span> color · same typography and behavior. For destructive inline actions.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Form coupling · :has()</div>
            <p><code>.modal-form:has(.btn-link) {`{ gap: 12px }`}</code> — auto-tightens the form gap (24 → 12) when a btn-link is present, so the link sits close to the field above.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Focus</div>
            <p>2px <span className="ds-token-chip">--primary-50</span> ring via <code>box-shadow</code> (or <span className="ds-token-chip">--destructive</span> for the critical variant), radius 4. No default outline.</p>
          </div>
        </div>
      </div>

      {/* 12 — BUTTON + COUNT BADGE */}
      <div className="ds-card">
        <div className="ds-card-head">Button with count badge — text + pill</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            <button type="button" className="btn btn-md btn-primary filters-panel-confirm">
              <span>Confirm</span>
              <span className="filters-confirm-count">12</span>
            </button>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Anatomy</div>
            <p>Text label in a <code>&lt;span&gt;</code> + a count pill in <code>.filters-confirm-count</code> (22px min height, 8px horizontal padding, radius 11, <code>rgba(255,255,255,0.18)</code> bg over the primary fill, <code>tabular-nums</code> for stable digit width).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Padding</div>
            <p>Asymmetric — <code>padding-right: 12</code> (iso 20) so the pill doesn't float in a 20px gutter. Mirrors the canonical <code>.btn-md:has(svg:last-child)</code> rule for trailing icons.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Gap</div>
            <p>12 (iso 8 default) — gives the count pill room to read as a separate token from the label.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Usage</div>
            <p>First consumer : <code>.filters-panel-confirm</code> in MobileFiltersPanel — shows the live <code>bookCount</code> so the user understands filters apply on tap. If a second consumer surfaces (e.g. "Show results [N]"), promote to a generic <code>.btn-count</code> primitive + extend the <code>.btn-md:has()</code> padding rule to match.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
