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
            <div className="ds-token-name">.cell-row · display: flex · align-items: center · gap: 8 · min-width: 0</div>
            <p>Always pair with a size modifier.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">--xs / --sm / --md / --lg · min-height: 20 / 24 / 32 / 40</div>
            <p>Use <code>min-height</code> (not fixed) so multi-line content can grow.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">--between · justify-content: space-between</div>
            <p>For label-left / meta-right rows.</p>
          </div>
        </div>
      </div>

      {/* 3 — APPLIED */}
      <div className="ds-card">
        <div className="ds-card-head">Applied — current usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">.overview-hero-label-row · --sm + --between</div>
            <p>Overview tab → 3 hero cards (Books finished / Quotes / Words saved).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.modal-toggle-row · --lg</div>
            <p>AddModal → Manual / Photo tab → "Mark as reading" checkbox.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.search-row · --lg + --between</div>
            <p>Search bars across My Library / Wishlist / Quotes / Dictionary / Collections (5 callsites).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.sidebar-appearance-row · --lg</div>
            <p>Sidebar bottom → Appearance label + theme toggle.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.overview-goal-progress-row · --md + --between</div>
            <p>Overview → Reading goal card → "3 / 24 books · 13%" line (overrides align-items: baseline locally).</p>
          </div>
          <p className="ds-note">Local overrides (e.g. <code>.modal-toggle-row</code> keeps <code>gap: 10</code> for checkbox breathing room) are fine — primitive sets the stable axes (height, align, display), local class tunes nuances.</p>
        </div>
      </div>

      {/* 4 — NOT A CANDIDATE */}
      <div className="ds-card">
        <div className="ds-card-head">Not a cell-row candidate</div>
        <div className="ds-card-body col">
          <p className="ds-note">Classes named <code>*-row</code> that don't fit the primitive (kept as-is) :</p>
          <div className="ds-token-block">
            <div className="ds-token-name">.now-reading-row</div>
            <p>Height dictated by the 60×90 cover, not a fixed-height label row.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.add-to-col-row</div>
            <p>State modifier (background / selected / disabled) on top of <code>.book-chip</code>, not a layout class.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
