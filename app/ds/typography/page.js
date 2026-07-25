import DSSection from "../_components/DSSection";

// Échelle typographique — valeurs réelles lues dans globals.css / library.css.
// base : html { font-size:14px } → 1rem = 14px. On documente le rôle sémantique
// (stable) + les métriques ; on ne mappe plus vers des composants (fragile).
const SCALE = [
  { group: "Display & titles", tiers: [
    { px: 48, rem: "3.43rem", w: 700, lh: "1",    ls: "-0.03em", role: "Page title" },
    { px: 28, rem: "2rem",    w: 700, lh: "1.2",  ls: "-0.02em", role: "Book title" },
    { px: 20, rem: "1.43rem", w: 800, lh: "1.3",  ls: "-0.02em", role: "Hero onboarding" },
    { px: 18, rem: "1.29rem", w: 700,                            role: "Empty state title" },
  ] },
  { group: "Body & content", tiers: [
    { px: 16, rem: "1.14rem", w: 700, lh: "1.35",               role: "Featured content" },
    { px: 16, rem: "1.14rem", w: 500,                           role: "Reading / content" },
    { px: 15, rem: "1.07rem", w: 600,                           role: "Interactive" },
  ] },
  { group: "Support & meta", tiers: [
    { px: 14, rem: "1rem",    w: 500,                           role: "Metadata" },
    { px: 13, rem: "0.93rem", w: 500,                           role: "Hint / label" },
    { px: 12, rem: "0.86rem", w: 600,                           role: "Compact secondary" },
  ] },
  { group: "Eyebrow & badge", tiers: [
    { px: 11, rem: "0.79rem", w: 700, ls: "0.08em", upper: true, role: "Eyebrow" },
    { px: 10, rem: "0.71rem", w: 600,                            role: "Badge" },
  ] },
];

const WEIGHTS = [
  [400, "Regular",   "Body copy, paragraphs, synopsis"],
  [500, "Medium",    "Metadata, reading content, secondary text"],
  [600, "SemiBold",  "Interactive — buttons, inputs, labels, card titles"],
  [700, "Bold",      "Titles, eyebrows, featured content"],
  [800, "ExtraBold", "Onboarding hero only (marketing exception)"],
];

function metric({ px, rem, w, lh, ls }) {
  let s = `${px}px · ${rem} · ${w}`;
  if (lh) s += ` · lh ${lh}`;
  if (ls) s += ` · ${ls}`;
  return s;
}

export default function TypographyPage() {
  return (
    <DSSection id="typography" title="Typography" sub="One typeface — Plus Jakarta Sans — its scale, weights and responsive behaviour.">

      {/* 1 — HERO : usage réel (gauche) + identité de la fonte (droite) */}
      <div className="ds-card">
        <div className="ds-card-head">Typeface — Plus Jakarta Sans</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview ds-type-preview">
              <div className="ds-type-context">
                <span className="panel-section-eyebrow">Now reading</span>
                <h3 className="panel-title">The Left Hand of Darkness</h3>
                <div className="panel-byline">
                  <div className="panel-author">Ursula K. Le Guin</div>
                  <div className="panel-meta">1969 · 304 pages · Science fiction</div>
                </div>
                <p className="panel-synopsis">A lone human envoy is sent to Gethen, a frozen world whose inhabitants can change their sex — testing everything he thought he knew about loyalty, love and betrayal.</p>
              </div>
              <div className="ds-type-idcard">
                <div className="ds-type-idcard-id">
                  <div className="ds-type-idcard-aa">Aa</div>
                  <div className="ds-type-idcard-name">Plus Jakarta Sans</div>
                  <div className="ds-type-idcard-pangram">The quick brown fox jumps over the lazy dog 0123456789</div>
                </div>
                <div className="ds-type-idcard-specs">
                  <div className="ds-type-idcard-spec"><span>Weights</span><span className="ds-type-idcard-spec-val">400 – 800 · 5</span></div>
                  <div className="ds-type-idcard-spec"><span>Sizes</span><span className="ds-type-idcard-spec-val">10 – 48px · 12</span></div>
                  <div className="ds-type-idcard-spec"><span>Token</span><span className="ds-token-chip">--font-jakarta</span></div>
                </div>
              </div>
            </div>
          </div>
          <p className="ds-note">
            À gauche, la hiérarchie sur un en-tête de <span className="ds-class">.book-panel</span> réel : eyebrow <span className="ds-class">.panel-section-eyebrow</span> (11/700) → titre <span className="ds-class">.panel-title</span> (28/700) → auteur <span className="ds-class">.panel-author</span> (15/500) → méta <span className="ds-class">.panel-meta</span> (14/500) → synopsis <span className="ds-class">.panel-synopsis</span> (16/500, lh 1.8). Une seule police — la hiérarchie tient par <strong>taille + graisse + couleur</strong>. Chargée via <code>next/font</code> (self-hosted, subsettée, no FOUT), exposée en <span className="ds-token-chip">--font-jakarta</span> ; fallback <code>-apple-system, BlinkMacSystemFont, sans-serif</code>.
          </p>
        </div>
      </div>

      {/* 2 — WEIGHTS */}
      <div className="ds-card">
        <div className="ds-card-head">Weights</div>
        <div className="ds-card-body col">
          {WEIGHTS.map(([w, name, use]) => (
            <div key={w} className="type-sample">
              <div className="type-sample-preview">
                <div style={{ fontSize: 26, fontWeight: w, lineHeight: 1.1 }}>Readr</div>
                <span className="ds-note">{use}</span>
              </div>
              <div className="type-sample-meta">{w} · {name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 — TYPE SCALE — une card par famille : la rupture visuelle vient du bg
          des cards sur le bg de page, plus nette qu'un divider interne. */}
      {SCALE.map(({ group, tiers }) => (
        <div key={group} className="ds-card">
          <div className="ds-card-head">{group}</div>
          <div className="ds-card-body col">
            {tiers.map((t) => (
              <div key={t.role + t.px + t.w} className="type-sample">
                <div className="type-sample-preview">
                  <div style={{ fontSize: t.px, fontWeight: t.w, lineHeight: t.lh ? Number(t.lh) : 1.2, letterSpacing: t.ls || "normal", textTransform: t.upper ? "uppercase" : "none" }}>
                    {t.role}
                  </div>
                </div>
                <div className="type-sample-meta">{metric(t)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 4 — RESPONSIVE */}
      <div className="ds-card">
        <div className="ds-card-head">Responsive — fixed vs fluid</div>
        <div className="ds-card-body col">
          <p className="ds-note">
            The scale above is the <strong>desktop reference</strong>. Almost every tier is <strong>fixed</strong> — its value holds at every viewport. Only two things shift below <code>600px</code> :
          </p>
          <div className="ds-token-block">
            <div className="ds-token-name">Page title — fluid</div>
            <p><span className="ds-class">.page-title</span> drops from <code>48px → 40px</code> at <code>≤600px</code>. Line-height (<code>1</code>) and tracking (<code>−0.03em</code>) are unchanged — only the size scales down so the largest title never crowds a phone screen.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Form controls — anti-zoom</div>
            <p>Inputs, textareas and selects jump to <code>16px</code> at <code>≤600px</code>. Not an aesthetic choice : below <code>16px</code> iOS Safari auto-zooms on focus, so this is the floor that prevents it.</p>
          </div>
        </div>
      </div>

      {/* 5 — LINE-HEIGHT */}
      <div className="ds-card">
        <div className="ds-card-head">Line-height (leading)</div>
        <div className="ds-card-body col">
          <p className="ds-note">Leading opens up as text gets smaller and lines get longer — tight for display, generous for long-form reading.</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Display &amp; titles · <code>1 – 1.2</code></div>
            <p>Large type needs little leading — the glyphs already carry the vertical rhythm. <span className="ds-class">.page-title</span> = <code>1</code>, <span className="ds-class">.panel-title</span> = <code>1.2</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sub-titles · <code>1.3 – 1.35</code></div>
            <p>Onboarding hero (<code>1.3</code>) and featured content (<code>1.35</code>) — a touch more air as the type shrinks.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">UI &amp; content · <code>1.5</code></div>
            <p>The default reading rhythm for body copy and interface text.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Long-form prose · <code>1.7 – 1.8</code></div>
            <p>Notes, synopses and multi-line descriptions get the loosest leading for sustained reading (<span className="ds-class">.ds-note</span> = <code>1.7</code>).</p>
          </div>
        </div>
      </div>

      {/* 6 — LETTER-SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Letter-spacing (tracking)</div>
        <div className="ds-card-body col">
          <p className="ds-note">Size drives tracking : tighten large type, open up small caps, leave body text alone.</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Titles · <code>−0.03 to −0.02em</code></div>
            <p>Large display type is tightened so letters don&apos;t drift apart : <code>−0.03em</code> on the <code>48px</code> page title, <code>−0.02em</code> on <code>20–28px</code> titles.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Body &amp; UI · <code>0</code></div>
            <p>Content, metadata and interactive text use the font&apos;s natural spacing — no adjustment.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Uppercase eyebrow · <code>+0.08em</code></div>
            <p>Capitals read cramped by default, so eyebrows are opened up : <span className="ds-class">.panel-section-eyebrow</span> at <code>+0.08em</code>.</p>
          </div>
        </div>
      </div>

      {/* 7 — STYLE STRATEGIES */}
      <div className="ds-card">
        <div className="ds-card-head">Hierarchy &amp; usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Build hierarchy in order</div>
            <p>Reach for <strong>size</strong> first, then <strong>weight</strong>, then <strong>colour</strong> (<span className="ds-token-chip">--text</span> → <span className="ds-token-chip">--text-2</span> → <span className="ds-token-chip">--text-3</span>). Colour alone is the weakest signal — never rely on it to carry a hierarchy on its own.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">One primary title per view</div>
            <p>A single page title anchors each screen. Don&apos;t fake a title by bolding body text — step up a tier instead.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Stay on the scale</div>
            <p>Only the 12 tiers and 5 weights above. No off-scale sizes, no unlisted weights, and never a second typeface — Jakarta carries everything.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
