import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

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

const ANATOMY = [
  ["XS", "24", "12", "6", "11", "4", "24×24 · svg 12"],
  ["SM", "32", "16", "7", "12", "6", "32×32 · svg 12"],
  ["MD", "40", "20", "8", "15", "8", "40×40 · svg 16"],
  ["LG", "48", "24", "10", "18", "10", "48×48 · svg 18"],
  ["XL", "56", "28", "12", "20", "12", "56×56 · svg 20"],
];

const SIZES = [["btn-xs", "XS"], ["btn-sm", "SM"], ["btn-md", "MD"], ["btn-lg", "LG"], ["btn-xl", "XL"]];

const MAPPING = [
  { role: "Primary CTA", canon: "btn-primary btn-md", consumers: [".add-btn", ".empty-cta", ".panel-quotes-add", ".panel-move-btn"] },
  { role: "Outline (default)", canon: "btn-outline btn-md", consumers: [".edit-btn", ".dropdown-btn", ".modal-cancel", ".panel-delete-btn", ".import-change-file", ".col-delete-btn"] },
  { role: "Icon toggle", canon: "btn-icon btn-md", consumers: [".view-btn", ".col-emoji-btn"] },
  { role: "Text link", canon: "btn-link / btn-link--critical", consumers: [[".btn-link", "inline action"], [".btn-link--critical", "destructive"], [".footer-link", "footer-specific"], [".quote-see-more", "expand / collapse"]] },
  { role: "Sidebar (on dark bg)", canon: "(contextual)", consumers: [".sel-btn", ".sel-confirm", ".sel-cancel", ".sel-select-all"] },
  { role: "AI action", canon: "btn-ai btn-md", consumers: [[".panel-cast-action", "Generate state"]] },
];

const PlusIcon = ({ strokeWidth = 2.2 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Décomposition numérotée : bouton (1) + icône (2) + libellé (3).
const ANNOS = [
  { n: 1, side: "top", target: ".btn" },
  { n: 2, side: "bottom", target: ".btn svg" },
  { n: 3, side: "bottom", target: ".btn span" },
];

export default function ButtonsPage() {
  return (
    <DSSection id="buttons" title="Buttons" sub="Canonical .btn.btn-* system + named component classes (library.css). Font-weight 600 across all.">

      {/* ─────────── 1. PREVIEW — le bouton canonique (primary MD) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <button className="btn btn-primary btn-md"><PlusIcon strokeWidth={2} /><span>Add book</span></button>
          </div>
          </div>
          <p className="ds-note">Le bouton canonique : <span className="ds-class">.btn</span> + variante + taille. Ici <strong>primary · md</strong> — la combinaison par défaut de l&apos;app. Font 600 sur tous. Icône optionnelle à gauche du <code>&lt;span&gt;</code>.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-organism">
              <button className="btn btn-primary btn-md"><PlusIcon strokeWidth={2} /><span>Add book</span></button>
            </div>
          </AnnoScene>
          </div>
        </div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.btn</span></td><td>Socle : <code>inline-flex</code>, centré, radius + hauteur + font posés par la variante et la taille (<span className="ds-class">.btn-primary</span> <span className="ds-class">.btn-md</span>). Font-weight 600.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><code>svg</code></td><td>Icône : boîte réservée (glyph + cadre 2px, 16 en md). Premier <em>ou</em> dernier enfant → déclenche le padding asymétrique via <code>:has()</code>.</td><td><span className="now-reading-date now-reading-date--sm">Opt</span></td></tr>
              <tr className="table-row"><td>3</td><td><code>&lt;span&gt;</code></td><td>Libellé : <strong>toujours</strong> enveloppé — sans lui, un nœud texte nu ferait de l&apos;icône à la fois premier ET dernier enfant, cassant la détection <code>:has()</code>.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — doctrine du padding (à MD) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            {SIZES.map(([cls]) => (
              <div key={cls} className="ds-redline-row">
                <Redline>
                  <button className={`btn btn-outline ${cls}`}><span>Common button</span></button>
                </Redline>
                <Redline>
                  <button className={`btn btn-outline ${cls}`}>
                    <PlusIcon strokeWidth={2} />
                    <span>Common button</span>
                  </button>
                </Redline>
              </div>
            ))}
          </div>
          <p className="ds-note">Colonne gauche : padding <strong>symétrique</strong> (0 12 → 0 28 selon la taille), radius 8, gap 8. Colonne droite : padding <strong>asymétrique</strong> auto via <code>:has()</code> — le côté icône tombe de <strong>8</strong> (<code>base − 8</code>), l&apos;icône apportant déjà sa masse à ce bord ; le ratio tient à toutes les tailles, aucune classe en plus. La boîte d&apos;icône cotée = boîte réservée (glyph + cadre 2px, ex. 16 + 4 = 20 en md), pas le glyph. Cotes mesurées à l&apos;exécution, jamais en dur.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — variantes × états ─────────── */}
      {VARIANTS.map(({ name, variant }) => (
        <div key={name} className="ds-card">
          <div className="ds-card-head">States · {name}</div>
          <div className="ds-card-body col">
            <div className="ds-states-grid ds-states-grid--boxed">
              {STATES.map(([state, mod]) => (
                <div key={state} className="ds-state-sample">
                  <button className={`btn ${variant} btn-md${mod ? " " + mod : ""}`} disabled={state === "Disabled"}>
                    {state}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ─────────── 5. SIZING — XS → XL (cotes + specs) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {SIZES.map(([cls, label]) => (
              <div key={cls} className="ds-state-sample">
                <button className={`btn btn-primary ${cls}`}><span>{label}</span></button>
                <span className="ds-class">.{cls}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {ANATOMY.map(([sz, h, p, r, f, g, io]) => (
            <div key={sz} className="ds-token-block">
              <div className="ds-token-name">{sz} · {h}px</div>
              <p>padding 0 {p}px · radius {r}px · font {f}px · gap {g}px · icon-only {io}</p>
            </div>
          ))}
          <div className="ds-token-block">
            <div className="ds-token-name">Cascade des pas — 8 / 4 / 2</div>
            <p>Les trois métriques progressent linéairement mais chacune à la moitié du pas de la précédente : hauteur <strong>pas 8</strong> (24 → 56), padding <strong>pas 4</strong> (12 → 28, soit exactement hauteur ÷ 2), gap <strong>pas 2</strong> (4 → 12). Un pas unique pour les trois donnerait un gap de 36 en XL — le rapport doit rester proportionnel à ce qu&apos;il sépare, pas à la taille du composant.</p>
          </div>
          <p className="ds-note">MD is the default size used across the app. Outline buttons : stroke <code>1.5px</code> inside (box-sizing: border-box).</p>
        </div>
      </div>

      {/* ─────────── 6. VARIANTS · composition (icônes) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · icons &amp; composition</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <button className="btn btn-primary btn-solid btn-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
            </div>
            <div className="ds-state-sample">
              <button className="btn btn-primary btn-md"><span>Text only</span></button>
            </div>
            <div className="ds-state-sample">
              <button className="btn btn-primary btn-md">
                <PlusIcon strokeWidth={2} />
                <span>Icon left</span>
              </button>
            </div>
            <div className="ds-state-sample">
              <button className="btn btn-primary btn-md">
                <span>Icon right</span>
                <svg className="dropdown-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Icon-only · btn-solid (filled) / btn-icon (outline)</div>
            <p>Carré à chaque taille (24→56, cf. colonne icon-only du tableau), padding symétrique : le SVG est à la fois premier <em>et</em> dernier enfant, donc la détection <code>:has()</code> du padding asymétrique ne s&apos;applique pas.</p>
          </div>
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
            <p>Same logic, mirrored. Text + chevron right uses the same gutter, detected via <span className="ds-class">.dropdown-btn-chevron</span> / <span className="ds-class">.sidebar-section-chevron</span>.</p>
          </div>
          <p className="ds-note">Auto-detected via <code>:has()</code> on <span className="ds-class">.btn-md</span> / <span className="ds-class">.btn-sm</span> and <span className="ds-class">.dropdown-btn</span> — no extra class needed unless the chevron exception applies. Rule applies when the SVG is the first or last child but not both (so icon-only buttons keep symmetric padding).</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Convention</div>
            <p>Always wrap label text in a <code>&lt;span&gt;</code>. CSS <code>:first-child</code> / <code>:last-child</code> only count element children — a bare text node next to an SVG would make the SVG both first AND last child, breaking the detection.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 7. VARIANTS · AI action ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · AI action</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <button className="btn btn-ai btn-md" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="aiGradDS-md" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F67BF8" />
                      <stop offset="0.62" stopColor="#4959E6" />
                    </linearGradient>
                  </defs>
                  <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiGradDS-md)" />
                </svg>
                <span>Generate</span>
              </button>
              <span className="ds-class">.btn-ai</span>
            </div>
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
            <p><code>0 20px 0 16px</code> (asymmetric icon-left — mirrors <span className="ds-class">.panel-quotes-add</span> ; 16px left for the leading sparkle icon, scale-proportional base - 4 at md scale).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Icon · sizes · usage</div>
            <p>Pair with <span className="ds-class">.import-tab-ai-icon</span> 16×16 sparkle SVG. Sizes : SM / MD (default) / LG (échelle standard, cf. §Sizing). Reserved for AI-generated actions. First app usage : <span className="ds-class">.panel-cast-action</span> in BookPanel (Now Reading) — the &quot;Generate cast&quot; / &quot;Regenerate&quot; call to the Gemini cast endpoint.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 8. VARIANTS · text link ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · text link</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <button type="button" className="btn-link">Remove goal</button>
              <span className="ds-class">.btn-link</span>
            </div>
            <div className="ds-state-sample">
              <button type="button" className="btn-link btn-link--critical">Remove goal</button>
              <span className="ds-class">.btn-link--critical</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Default</div>
            <p>Inline text action — 14 / 600 · <span className="ds-token-chip">--primary-50</span> · hover <span className="ds-token-chip">--primary-60</span> + underline · no padding, no border, no fixed height. Used for low-key actions inside forms or cards (e.g. &quot;Remove goal&quot; in ReadingGoalModal).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Critical</div>
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

      {/* ─────────── 9. VARIANTS · count badge ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · count badge</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <button type="button" className="btn btn-md btn-primary filters-panel-confirm">
                <span>Confirm</span>
                <span className="filters-confirm-count">12</span>
              </button>
              <span className="ds-class">.filters-confirm-count</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Anatomy</div>
            <p>Text label in a <code>&lt;span&gt;</code> + a count pill in <span className="ds-class">.filters-confirm-count</span> (22px min height, 8px horizontal padding, radius 11, <code>rgba(255,255,255,0.18)</code> bg over the primary fill, <code>tabular-nums</code> for stable digit width).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Padding</div>
            <p>Asymmetric — <code>padding-right: 12</code> (iso 20) so the pill doesn&apos;t float in a 20px gutter. Mirrors the canonical <code>.btn-md:has(svg:last-child)</code> rule for trailing icons.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Gap</div>
            <p>12 (iso 8 default) — gives the count pill room to read as a separate token from the label.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Usage</div>
            <p>First consumer : <span className="ds-class">.filters-panel-confirm</span> in MobileFiltersPanel — shows the live <code>bookCount</code> so the user understands filters apply on tap. If a second consumer surfaces (e.g. &quot;Show results [N]&quot;), promote to a generic <span className="ds-class">.btn-count</span> primitive + extend the <code>.btn-md:has()</code> padding rule to match.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 10. USAGE · reference — mapping canonique → classes nommées ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage · reference</div>
        <div className="ds-card-body col">
          {MAPPING.map(({ role, canon, consumers }) => (
            <div key={role} className="ds-token-block">
              <div className="ds-token-name">{role}</div>
              <p>
                <span className="ds-class">{canon}</span> →{consumers.map((c) => {
                  const [cls, desc] = Array.isArray(c) ? c : [c, null];
                  return (
                    <span key={cls}>
                      <span className="ds-class">{cls}</span>{desc ? ` (${desc})` : ""}
                    </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

    </DSSection>
  );
}
