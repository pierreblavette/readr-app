import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";

const Chevron = () => (
  <svg className="dropdown-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);

// Déclencheur select / filtre : .dropdown-btn.sort-menu-btn (valeur + badge + chevron).
function SelectBtn({ label = "Genres", count = 0, mod = "", disabled = false }) {
  return (
    <button type="button" className={`dropdown-btn sort-menu-btn${mod ? " " + mod : ""}`} disabled={disabled} aria-haspopup="listbox" aria-expanded={false}>
      <span className="sort-menu-btn-label">{label}</span>
      {count > 0 && <span className="filter-badge">{count}</span>}
      <Chevron />
    </button>
  );
}

// Combobox in-form : .quote-link-select (input + chevron).
function Combobox() {
  return (
    <div className="quote-link-select" style={{ width: "min(402px, 100%)" }}>
      <input className="modal-field-input quote-link-select-input" placeholder="Link a book…" defaultValue="" readOnly />
      <svg className="quote-link-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
    </div>
  );
}

const STATES = [
  ["Default", "Genres", 0, "", ".sort-menu-btn"],
  ["Active", "Genres", 2, "is-active", ".is-active"],
  ["Disabled", "Genres", 0, "", ":disabled"],
];

const ANNOS = [
  { n: 1, side: "top", target: ".dropdown-btn" },
  { n: 2, side: "bottom", target: ".sort-menu-btn-label" },
  { n: 3, side: "bottom", target: ".filter-badge" },
  { n: 4, side: "bottom", target: ".dropdown-btn-chevron" },
];

export default function SelectPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="buttons-select"
      title="Select"
      sub="Le bouton qui choisit une valeur : un clic ouvre une liste d'options. À distinguer du Dropdown Button, qui ouvre un menu d'actions. Fait partie de la famille Buttons."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview ds-preview--roomy">
              <SelectBtn label="Genres" count={0} />
            </div>
          </div>
          <p className="ds-note">Un <strong>select</strong> montre la <strong>valeur courante</strong> d&apos;un choix : label + chevron, peau <span className="ds-class">.dropdown-btn.sort-menu-btn</span>. Le clic ouvre une <strong>listbox</strong> de valeurs, pas un menu d&apos;actions. Quand un filtre multi-select est posé, il passe <strong>rempli</strong> (<span className="ds-class">.is-active</span>) avec un compteur <span className="ds-class">.filter-badge</span> — voir States.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy · filter trigger</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
            <AnnoScene annos={ANNOS} stack>
              <div className="ds-anno-organism">
                <SelectBtn label="Genres" count={2} mod="is-active" />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.dropdown-btn</span></td><td>Peau du trigger (voir <strong>Dropdown Button</strong>). <span className="ds-class">.sort-menu-btn</span> l&apos;affine (<code>margin-left: 0</code>, repli icon-only ≤1080).</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.sort-menu-btn-label</span></td><td>Valeur courante — le libellé du filtre / tri sélectionné.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.filter-badge</span></td><td>Compteur de multi-sélection : pill 18px, 11/700 blanc sur <span className="ds-token-chip">--primary-50</span>, radius 999, <code>margin-left: 4</code>. Masqué à 0.</td><td><span className="now-reading-date now-reading-date--sm">Opt</span></td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.dropdown-btn-chevron</span></td><td>Chevron de fin (svg 16), pivote à l&apos;ouverture.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.quote-link-select-input</span></td><td>Combobox : <span className="ds-class">.modal-field-input</span> + padding droit <code>38</code> (place au chevron). <code>role="combobox"</code>.</td><td><span className="now-reading-date now-reading-date--sm">Opt</span></td></tr>
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
              <Redline><SelectBtn label="Genres" count={2} mod="is-active" /></Redline>
            </div>
          </div>
          <p className="ds-note">Même socle que <strong>Dropdown Button</strong> — h40, padding base <strong>0 20</strong>, chevron −8 à droite. Le <span className="ds-class">.filter-badge</span> ajoute <code>margin-left: 4</code> après le label. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([label, val, count, mod, cap]) => (
              <div key={label} className="ds-state-sample">
                <SelectBtn label={val} count={count} mod={mod} disabled={label === "Disabled"} />
                <span className="ds-class">{cap}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Default — outline neutre, aucune valeur posée · <span className="ds-class">.is-active</span> — un filtre / une valeur s&apos;applique : border + texte <span className="ds-token-chip">--primary-50</span>, fond <span className="ds-token-chip">--primary-5</span>, badge visible · Disabled opacité 0.4. À l&apos;ouverture, le chevron pivote de 180°.</p>
        </div>
      </div>

      {/* 6 — VARIANTS · sort trigger / combobox */}
      <div className="ds-card">
        <div className="ds-card-head">Variants</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <SelectBtn label="Sort" count={0} />
              <span className="ds-class">.sort-menu-btn</span>
            </div>
            <div className="ds-state-sample">
              <Combobox />
              <span className="ds-class">.quote-link-select</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Trigger de filtre / tri</div>
            <p><span className="ds-class">.sort-menu-btn</span> (sur la peau <span className="ds-class">.dropdown-btn</span>) — valeur courante en <span className="ds-class">.sort-menu-btn-label</span>, compteur <span className="ds-class">.filter-badge</span> quand une multi-sélection est posée, <span className="ds-class">.is-active</span> quand le filtre s&apos;applique. Ouvre un <span className="ds-class">.filter-dropdown</span> (cases) ou une liste simple. Consumers : <strong>Sort</strong>, <strong>Genres</strong>, <strong>Authors</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Combobox in-form</div>
            <p><span className="ds-class">.quote-link-select</span> — un champ de saisie (<span className="ds-class">.quote-link-select-input</span> sur <span className="ds-class">.modal-field-input</span>) + chevron, qui filtre une <span className="ds-class">.autocomplete-list</span> (<code>role="listbox"</code>) au focus. Le <strong>seul vrai select in-form</strong> : lier un livre à une citation (AddQuoteModal).</p>
          </div>
        </div>
      </div>

      {/* 7 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Choisit une valeur</div>
            <p>Le clic ouvre une <strong>listbox</strong> de valeurs (<code>aria-haspopup="listbox"</code>) : un <span className="ds-class">.filter-dropdown</span> à cases (Genres, Authors — multi), une liste de tri (Sort — mono), ou une <span className="ds-class">.autocomplete-list</span> filtrée (combobox). La sélection <strong>met à jour la valeur affichée</strong> et le badge — elle ne déclenche pas une action immédiate.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">État actif</div>
            <p><span className="ds-class">.is-active</span> dès qu&apos;une valeur / un filtre est posé — le bouton se remplit (<span className="ds-token-chip">--primary-5</span>) pour signaler « un filtre s&apos;applique ». C&apos;est le marqueur qui distingue visuellement un select <em>renseigné</em> d&apos;un select vide.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Select vs Dropdown Button</div>
            <p>Même peau, deux intentions. <strong>Select</strong> = choisir une <strong>valeur</strong> (persiste, se relit dans le label + badge). <strong>Dropdown Button</strong> = déclencher une <strong>action</strong> (le menu se ferme, rien ne « reste » dans le bouton). Un select porte <code>listbox</code>, un dropdown button porte <code>menu</code>.</p>
          </div>
        </div>
      </div>

      {/* 8 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><strong>Sort</strong>, <strong>Genres</strong>, <strong>Authors</strong> (<span className="ds-class">.sort-menu-btn</span> + <span className="ds-class">.filter-dropdown</span>, voir <strong>Filtering</strong>) ; <strong>combobox</strong> <span className="ds-class">.quote-link-select</span> (AddQuoteModal). Pas de <code>&lt;select&gt;</code> natif dans l&apos;app — tous les selects sont ces triggers custom.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
