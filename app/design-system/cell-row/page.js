import DSSection from "../_components/DSSection";

const SIZES = [
  ["xs", 20, "Parity with .sidebar-badge — inline meta"],
  ["sm", 24, "Compact rows — label + small icon"],
  ["md", 32, "Parity with .btn-sm — touch-friendly desktop"],
  ["lg", 40, "Parity with .btn-md / .modal-cancel — full touch target"],
];

const NOT_CANDIDATE = [
  { cls: ".now-reading-row", desc: "Height dictated by the 60×90 cover, not a fixed-height label row." },
  { cls: ".add-to-col-row", desc: "State modifier (background / selected / disabled) on top of .book-chip, not a layout class." },
];

export default function CellRowPage() {
  return (
    <DSSection id="cell-row" title="Cell Row" sub="A reusable row for any 'label + meta or icon' pattern — the shared skeleton behind many list-style components.">

      {/* 1 — SIZES */}
      <div className="ds-card">
        <div className="ds-card-head">Sizes</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {SIZES.map(([mod, h]) => (
              <div key={mod} className="ds-state-sample">
                <div className={`cell-row cell-row--${mod} cell-row--between`} style={{ width: "100%", paddingInline: 12, background: "var(--primary-3)", borderRadius: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Label</span>
                  <span style={{ fontSize: 13, color: "var(--text-2)" }}>{h}px</span>
                </div>
                <span className="ds-class">.cell-row--{mod}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {SIZES.map(([mod, h, use]) => (
            <div key={mod} className="ds-token-block">
              <div className="ds-token-name">{mod.toUpperCase()} · {h}px min-height</div>
              <p>{use}.</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2 — MODIFIERS */}
      <div className="ds-card">
        <div className="ds-card-head">Modifiers</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Base</div>
            <p><code>display: flex</code> · <code>align-items: center</code> · <code>gap: 8</code> · <code>min-width: 0</code>. Always pair with a size modifier.</p>
            <span className="ds-class">.cell-row</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Size — <span className="ds-cn">--xs</span> / <span className="ds-cn">--sm</span> / <span className="ds-cn">--md</span> / <span className="ds-cn">--lg</span></div>
            <p>Set <code>min-height</code> to <code>20</code> / <code>24</code> / <code>32</code> / <code>40</code>. Use <code>min-height</code> (not a fixed height) so multi-line content can grow.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Alignment — <span className="ds-cn">--between</span></div>
            <p><code>justify-content: space-between</code> — for label-left / meta-right rows.</p>
          </div>
        </div>
      </div>

      {/* 3 — IN USE — vrais consommateurs rendus + référence */}
      <div className="ds-card">
        <div className="ds-card-head">In use</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <div className="cell-row cell-row--lg cell-row--between search-row" style={{ width: "100%" }}>
                  <div className="search-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    <input className="search-input" type="text" placeholder="Search books…" readOnly />
                  </div>
                </div>
              </div>
              <span className="ds-class">.search-row</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <div className="cell-row cell-row--lg sidebar-appearance-row" style={{ width: "100%" }}>
                  <span className="sidebar-row-label">Appearance</span>
                  <button type="button" className="theme-btn" aria-label="Theme"><span className="toggle-thumb"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg></span></button>
                </div>
              </div>
              <span className="ds-class">.sidebar-appearance-row</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <label className="cell-row cell-row--lg modal-toggle-row" style={{ width: "100%" }}>
                  <input type="checkbox" className="modal-toggle-input" defaultChecked readOnly />
                  <span className="modal-toggle-check"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></span>
                  <span className="modal-toggle-label">Mark as reading</span>
                </label>
              </div>
              <span className="ds-class">.modal-toggle-row</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <span className="cell-row cell-row--sm cell-row--between overview-hero-label-row" style={{ width: "100%" }}>
                  <span className="cell-row cell-row--sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                    <span className="overview-hero-label">Books finished</span>
                  </span>
                  <svg className="sidebar-section-chevron overview-hero-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              </div>
              <span className="ds-class">.overview-hero-label-row</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <div className="cell-row cell-row--md cell-row--between overview-goal-progress-row" style={{ width: "100%" }}>
                  <span className="overview-goal-count">
                    <span className="overview-goal-num">3</span>
                    <span className="overview-goal-total">/ 24 books</span>
                  </span>
                  <span className="overview-goal-pct">13%</span>
                </div>
              </div>
              <span className="ds-class">.overview-goal-progress-row</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <button type="button" className="btn btn-md btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  <span>Add book</span>
                </button>
              </div>
              <span className="ds-class">.btn-primary</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">La même primitive <span className="ds-class">.cell-row</span> sous six habillages : hauteur, alignement et gap posés par la primitive, le contenu par la classe locale. Modifiers : search <span className="ds-cn">--lg --between</span> (5 barres) · appearance <span className="ds-cn">--lg</span> · checkbox <span className="ds-cn">--lg</span> (garde <code>gap 12</code>) · hero <span className="ds-cn">--sm --between</span> · goal <span className="ds-cn">--md --between</span> (<code>align-items: baseline</code>) · filters <span className="ds-cn">--lg</span> (rangée de triggers). Surcharges locales OK — la primitive tient les axes stables.</p>
        </div>
      </div>

      {/* 4 — NOT A CANDIDATE */}
      <div className="ds-card">
        <div className="ds-card-head">Not a cell-row candidate</div>
        <div className="ds-card-body col">
          <p className="ds-note">Classes named <code>*-row</code> that don&apos;t fit the primitive (kept as-is) :</p>
          {NOT_CANDIDATE.map(({ cls, desc }) => (
            <div key={cls} className="ds-token-block">
              <p>{desc}</p>
              <span className="ds-class">{cls}</span>
            </div>
          ))}
        </div>
      </div>

    </DSSection>
  );
}
