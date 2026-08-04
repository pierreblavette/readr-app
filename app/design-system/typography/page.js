import DSSection from "../_components/DSSection";

// Échelle typographique — valeurs réelles lues dans globals.css / library.css.
// base : html { font-size:14px } → 1rem = 14px. On documente le rôle sémantique
// (stable) + les métriques ; on ne mappe plus vers des composants (fragile).
// Type TOKENS — nommage à la Mews : catégorie.taille (+ -strong si une taille porte
// DEUX graisses). Le nom décrit l'ÉCHELLE, jamais un composant ; chaque token liste ses
// consumers. Le responsive vit DANS le token (↘ = descend en ≤600). 13 tokens, 5 catégories.
const TOKENS = [
  { cat: "title", desc: "Titres qui structurent un écran, une carte, une section.", rows: [
    { name: "title.xl", px: 48, mobile: 40, w: 700, lh: "1",   ls: "-0.03em", uses: ".page-title" },
    { name: "title.l",  px: 28, mobile: 22, w: 700, lh: "1.2", ls: "-0.02em", uses: ".panel-title · .activity-day-title" },
    { name: "title.m",  px: 20,             w: 800, lh: "1.3", ls: "-0.02em", uses: "onboarding hero (exception 800)" },
    { name: "title.s",  px: 18,             w: 700,                           uses: "empty-state title" },
  ] },
  { cat: "highlight", desc: "Chiffres et données mis en avant.", rows: [
    { name: "highlight.l", px: 40, mobile: 36, w: 700, lh: "1", ls: "-0.03em", uses: ".overview-hero-num · .overview-goal-num · .overview-streak-current" },
    { name: "highlight.m", px: 24,             w: 700,           ls: "-0.02em", uses: ".panel-quiz-score (score de quiz)" },
  ] },
  { cat: "body", desc: "Texte courant et texte d'interface.", rows: [
    { name: "body.l-strong", px: 16, w: 700, lh: "1.35", uses: "featured content" },
    { name: "body.l",        px: 16, w: 500, lh: "1.8",  uses: "lecture · .panel-synopsis" },
    { name: "body.m-strong", px: 15, w: 600,             uses: "interactif — .btn · .search-input" },
    { name: "body.m",        px: 15, w: 500,             uses: "auteur, metadata — .panel-author · .panel-meta" },
  ] },
  { cat: "label", desc: "Petits textes fonctionnels : hints, footer, badges.", rows: [
    { name: "label.l", px: 13, w: 500, uses: "hint · footer · badge md — .now-reading-date--md" },
    { name: "label.m", px: 12, w: 600, uses: "badge sm — .now-reading-date--sm" },
    { name: "label.s", px: 10, w: 600, uses: "badge xs — .now-reading-date--xs" },
  ] },
  { cat: "overline", desc: "Capitales avec interlettrage — eyebrows.", rows: [
    { name: "overline.m", px: 11, w: 700, ls: "0.08em", upper: true, uses: "eyebrow — .panel-section-eyebrow" },
  ] },
];

const WEIGHTS = [
  [400, "Regular",   "Body copy, paragraphs, synopsis"],
  [500, "Medium",    "Metadata, reading content, secondary text"],
  [600, "SemiBold",  "Interactive — buttons, inputs, labels, card titles"],
  [700, "Bold",      "Titles, eyebrows, featured content"],
  [800, "ExtraBold", "Onboarding hero only (marketing exception)"],
];

function metric({ px, w, lh, ls, mobile }) {
  let s = `${px}px`;
  if (mobile) s += ` ↘ ${mobile} ≤600`;
  s += ` · ${w}`;
  if (lh) s += ` · lh ${lh}`;
  if (ls) s += ` · ${ls}`;
  return s;
}

export default function TypographyPage() {
  return (
    <DSSection id="typography" title="Typography" sub="One typeface — Plus Jakarta Sans — carries all of Readr: its scale, its weights, and how it adapts across screens.">

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
                  <div className="ds-type-idcard-spec"><span>Tokens</span><span className="ds-type-idcard-spec-val">14 · title → overline</span></div>
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

      {/* 3 — TYPE TOKENS — un tableau par catégorie : Type (le nom rendu à sa taille +
          ses consumers) · Desktop · ≤600 · Style. Scroll horizontal pour éviter que les
          colonnes se chevauchent sur écran étroit — on ne cache plus la colonne Style. */}
      <style>{`
        .ds-type-scroll { overflow-x: auto; width: 100%; }
        /* Le wrapper de scroll est un <div> : il hérite du padding 20 de
           .ds-card-body > :not(table). On le neutralise pour que la table soit
           edge-to-edge comme une <table> directe (ses cellules portent le padding). */
        .ds-card-body > .ds-type-scroll { padding: 0; }
        /* table-layout fixed + 4 colonnes a largeur EGALE (25% chacune) : alignement
           regulier entre categories. */
        .type-token-table { width: 100%; min-width: 560px; table-layout: fixed; }
        .type-token-table th, .type-token-table td { vertical-align: middle; white-space: nowrap; width: 25%; }
        .type-token-table th:first-child, .type-token-table td:first-child { text-align: left; white-space: normal; padding-right: 28px; }
        .type-token-table th:not(:first-child), .type-token-table td:not(:first-child) { text-align: right; color: var(--text-2); }
      `}</style>
      {TOKENS.map(({ cat, rows }) => (
        <div key={cat} className="ds-card">
          <div className="ds-card-body col">
            <div className="ds-type-scroll">
              <table className="token-table type-token-table">
                <thead className="table-head">
                  <tr><th>Type</th><th>Desktop</th><th>≤600</th><th>Weight</th></tr>
                </thead>
                <tbody className="table-body">
                  {rows.map((t) => (
                    <tr key={t.name} className="table-row">
                      <td><span className="ds-token-chip">{t.name}</span></td>
                      <td>{t.px}px</td>
                      <td style={{ color: t.mobile ? undefined : "var(--text-3)" }}>{t.mobile ? `${t.mobile}px` : "—"}</td>
                      <td>{t.w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}

      {/* 4 — RESPONSIVE */}
      <div className="ds-card">
        <div className="ds-card-head">Responsive — fixed vs fluid</div>
        <div className="ds-card-body col">
          <p className="ds-note">
            The scale above is the <strong>desktop reference</strong>. Most tokens are <strong>fixed</strong> at every viewport. A few shift below <code>600px</code> — the large display sizes ease down, and form controls hit a floor :
          </p>
          <div className="ds-token-block">
            <div className="ds-token-name">Display sizes — eased down</div>
            <p>Each display role that scales down carries its <code>↘ ≤600</code> size <strong>in the scale table above</strong> — <span className="ds-class">.page-title</span> <code>48→40</code>, <span className="ds-class">.overview-hero-num</span> <code>40→36</code>. One more shift, on a role that shares its desktop tier : <span className="ds-class">.activity-day-title</span> <code>28 → 22</code>. Line-height and tracking stay put — only the size scales.</p>
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
            <p>Only the <strong>14 tokens</strong> and 5 weights above. No off-scale sizes, no unlisted weights, and never a second typeface — Jakarta carries everything. Sole exception : the cover-placeholder letters and the quote mark are <strong>graphic glyphs</strong> sized to their box, not text tokens.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
