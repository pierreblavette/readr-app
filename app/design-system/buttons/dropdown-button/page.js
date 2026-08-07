import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";

// Déclencheur d'un menu d'actions : .dropdown-btn (icône + label + chevron).
function DropdownBtn({ open = false, disabled = false, mod = "" }) {
  return (
    <button type="button" className={`dropdown-btn${mod ? " " + mod : ""}`} disabled={disabled} aria-haspopup="menu" aria-expanded={open}>
      <span className="dropdown-btn-label">Actions</span>
      <svg className="dropdown-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={open ? { transform: "rotate(180deg)" } : undefined}>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

const STATES = [
  ["Default", "", ".dropdown-btn"],
  ["Hover", "is-hover", ":hover"],
  ["Disabled", "", ":disabled"],
];

const ANNOS = [
  { n: 1, side: "top", target: ".dropdown-btn" },
  { n: 2, side: "bottom", target: ".dropdown-btn-label" },
  { n: 3, side: "bottom", target: ".dropdown-btn-chevron" },
];

export default function DropdownButtonPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="buttons-dropdown-button"
      title="Dropdown Button"
      sub="Le bouton qui ouvre un menu d'actions : un clic déroule les choix, le chevron pivote. À distinguer du Select, qui choisit une valeur. Fait partie de la famille Buttons."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview ds-preview--roomy">
              <DropdownBtn />
            </div>
          </div>
          <p className="ds-note"><span className="ds-class">.dropdown-btn</span> — bouton <strong>outline</strong> autonome (h40, border 1.5 <span className="ds-token-chip">--border-subtle</span>, 15/600) : libellé + chevron de fin. Le clic ouvre un <strong>Dropdown Menu</strong> juste dessous. Une icône de tête <span className="ds-class">.dropdown-btn-icon</span> est <strong>optionnelle</strong> (présente sur l&apos;Export Menu, absente ici).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
            <AnnoScene annos={ANNOS} stack>
              <div className="ds-anno-organism">
                <DropdownBtn open />
              </div>
            </AnnoScene>
          </div>
        </div>
      </div>

      {/* 3 — ELEMENTS */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.dropdown-btn</span></td><td>Socle : <code>flex</code>, h40, padding <code>0 20</code> (base), radius 8, border 1.5 <span className="ds-token-chip">--border-subtle</span>, bg blanc (dark <span className="ds-token-chip">--bg3</span>), 15/600, gap 8. <code>aria-haspopup</code> + <code>aria-expanded</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.dropdown-btn-label</span></td><td>Libellé, 15/600. <code>white-space: nowrap</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.dropdown-btn-chevron</span></td><td>Chevron de fin (svg 16) — gouttière droite réduite de 8 ; <code>rotate(180deg)</code> à l&apos;ouverture.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><DropdownBtn /></Redline>
            </div>
          </div>
          <p className="ds-note">Base symétrique <strong>0 20</strong>, h40, radius 8, gap 8. Le chevron de fin réduit la gouttière <strong>droite de 8</strong> via <code>:has()</code> (le glyphe apporte sa masse au bord). Une icône de tête optionnelle réduirait de même la gouttière gauche. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([label, mod, cap]) => (
              <div key={label} className="ds-state-sample">
                <DropdownBtn mod={mod} disabled={label === "Disabled"} />
                <span className="ds-class">{cap}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Hover — border + texte <span className="ds-token-chip">--primary-50</span>, fond <span className="ds-token-chip">--primary-5</span> · Disabled opacité 0.4. À l&apos;<strong>ouverture</strong>, le chevron pivote de 180°. (L&apos;état <span className="ds-class">.is-active</span> — bouton rempli — appartient au <strong>Select</strong>, quand une valeur / un filtre est posé.)</p>
        </div>
      </div>

      {/* 6 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Ouvre un menu d&apos;actions</div>
            <p>Le clic ouvre un <strong>Dropdown Menu</strong> (<span className="ds-class">.dropdown-menu</span>) positionné sous le bouton — une liste d&apos;<strong>actions</strong> (Mark as finished, Share, Delete…). Voir <strong>Dropdown Menu</strong> pour la surface. <code>aria-haspopup="menu"</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Toggle &amp; chevron</div>
            <p>Clic → ouvre/ferme ; <code>aria-expanded</code> reflète l&apos;état, clic-hors et <strong>Escape</strong> ferment. Le <span className="ds-class">.dropdown-btn-chevron</span> pivote de 180° à l&apos;ouverture.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dropdown Button vs Select</div>
            <p>Même peau <span className="ds-class">.dropdown-btn</span>, intention différente : ici on ouvre un <strong>menu d&apos;actions</strong> ; le <strong>Select</strong> choisit / filtre une <strong>valeur</strong> (valeur courante + badge, <code>aria-haspopup="listbox"</code>).</p>
          </div>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Déclencheur générique d&apos;un menu d&apos;actions. Le <strong>Book Card Kebab</strong> en est la variante « trois points » (même menu, pas de label). <strong>Export Menu</strong> monte aussi un <span className="ds-class">.dropdown-btn</span>.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
