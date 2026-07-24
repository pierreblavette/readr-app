import DSSection from "../_components/DSSection";

const SIZES = [
  ["xs", 20, "Parity with .sidebar-badge — inline meta"],
  ["sm", 24, "Compact rows — label + small icon"],
  ["md", 32, "Parity with .btn-sm — touch-friendly desktop"],
  ["lg", 40, "Parity with .btn-md / .modal-cancel — full touch target"],
];

export default function CellRowPage() {
  return (
    <DSSection id="cell-row" title="Cell Row" sub="Reusable flex row primitive for any 'label + meta/icon' pattern with a fixed-min height. Pair with a size modifier and optionally --between for justify-content: space-between.">

      {/* 1 — SIZES */}
      <div className="ds-card">
        <div className="ds-card-head">Sizes</div>
        <div className="ds-card-body col">
          {SIZES.map(([mod, h, use]) => (
            <div key={mod} className="spacing-row">
              <div className={`cell-row cell-row--${mod}`} style={{ width: 320, flexShrink: 0, paddingInline: 12, background: "var(--primary-3)", borderRadius: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>cell-row--{mod}</span>
              </div>
              <span className="spacing-label">{h}px</span>
              <span className="type-sample-meta">{use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2 — MODIFIERS */}
      <div className="ds-card">
        <div className="ds-card-head">Modifiers</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.cell-row</span></div>
            <p><code>display: flex</code> · <code>align-items: center</code> · <code>gap: 8</code> · <code>min-width: 0</code>. Always pair with a size modifier.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Size modifiers</div>
            <p><span className="ds-cn">--xs</span> / <span className="ds-cn">--sm</span> / <span className="ds-cn">--md</span> / <span className="ds-cn">--lg</span> set <code>min-height</code> to <code>20</code> / <code>24</code> / <code>32</code> / <code>40</code>. Use <code>min-height</code> (not fixed) so multi-line content can grow.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Alignment modifier</div>
            <p><span className="ds-cn">--between</span> sets <code>justify-content: space-between</code> — for label-left / meta-right rows.</p>
          </div>
        </div>
      </div>

      {/* 3 — APPLIED */}
      <div className="ds-card">
        <div className="ds-card-head">Applied — current usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.overview-hero-label-row</span></div>
            <p><span className="ds-cn">--sm</span> + <span className="ds-cn">--between</span> — Overview tab → 3 hero cards (Books finished / Quotes / Words saved).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.modal-toggle-row</span></div>
            <p><span className="ds-cn">--lg</span> — AddModal → Manual / Photo tab → &quot;Mark as reading&quot; checkbox.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.search-row</span></div>
            <p><span className="ds-cn">--lg</span> + <span className="ds-cn">--between</span> — search bars across My Library / Wishlist / Quotes / Dictionary / Collections (5 callsites).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.sidebar-appearance-row</span></div>
            <p><span className="ds-cn">--lg</span> — sidebar bottom → Appearance label + theme toggle.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.overview-goal-progress-row</span></div>
            <p><span className="ds-cn">--md</span> + <span className="ds-cn">--between</span> — Overview → Reading goal card → &quot;3 / 24 books · 13%&quot; line (overrides <code>align-items: baseline</code> locally).</p>
          </div>
          <p className="ds-note">Local overrides (e.g. <span className="ds-class">.modal-toggle-row</span> keeps <code>gap: 10</code> for checkbox breathing room) are fine — primitive sets the stable axes (height, align, display), local class tunes nuances.</p>
        </div>
      </div>

      {/* 4 — NOT A CANDIDATE */}
      <div className="ds-card">
        <div className="ds-card-head">Not a cell-row candidate</div>
        <div className="ds-card-body col">
          <p className="ds-note">Classes named <code>*-row</code> that don't fit the primitive (kept as-is) :</p>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.now-reading-row</span></div>
            <p>Height dictated by the 60×90 cover, not a fixed-height label row.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-cn">.add-to-col-row</span></div>
            <p>State modifier (background / selected / disabled) on top of <span className="ds-class">.book-chip</span>, not a layout class.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
