import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// Jeu de genres pour le nuage — count décroissant (l'ordre réel des consommateurs).
const GENRES = [
  ["Fiction", 12], ["Essais", 8], ["Science-Fiction", 5],
  ["Poésie", 3], ["Biographie", 2], ["Histoire", 1],
];

const STATES = [
  ["Default", ""],
  ["Hover", "is-hover"],
];

function Chip({ name, count, cls = "" }) {
  return (
    <button type="button" className={`overview-cloud-chip${cls ? " " + cls : ""}`}>
      <span className="overview-cloud-chip-name">{name}</span>
      <span className="overview-cloud-chip-count">{count}</span>
    </button>
  );
}

// Décomposition numérotée : pill (1) + label (2) + count badge (3).
const ANNOS = [
  { n: 1, side: "top", target: ".overview-cloud-chip" },
  { n: 2, side: "bottom", target: ".overview-cloud-chip-name" },
  { n: 3, side: "bottom", target: ".overview-cloud-chip-count" },
];

export default function CloudChipPage() {
  return (
    <DSSection id="chip" title="Chip" sub="Pill filtrante — nom + badge count. Utilisée par Top Genres et Top Authors (Overview) comme raccourcis de filtre cliquables ; le container .overview-cloud les enveloppe en flex-wrap.">

      {/* ─────────── 1. PREVIEW ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <Chip name="Fiction" count={12} />
          </div>
          </div>
          <p className="ds-note">Pill cliquable = <strong>nom + badge count</strong>. Un <code>&lt;button&gt;</code> qui route vers My Library avec le filtre correspondant pré-appliqué (genre ou auteur).</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-organism">
              <button type="button" className="overview-cloud-chip">
                <span className="overview-cloud-chip-name">Fiction</span>
                <span className="overview-cloud-chip-count">12</span>
              </button>
            </div>
          </AnnoScene>
          </div>
        </div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.overview-cloud-chip</span></td><td>Pill : <code>&lt;button&gt;</code>, height 36, padding <code>0 8 0 16</code> (asym), radius 999, bg <span className="ds-token-chip">--bg3</span>, font 14/600, gap 8.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.overview-cloud-chip-name</span></td><td>Label : <code>line-height: 1</code> — pas d&apos;espace vertical superflu, la hauteur vient du chip.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.overview-cloud-chip-count</span></td><td>Count : height 20, min-width 20 (rond à un chiffre), padding 0 8, radius 999, bg <span className="ds-token-chip">--primary-50</span>, texte <span className="ds-token-chip">#FFFFFF</span>, font 11/600, <code>tabular-nums</code>, <code>flex-shrink: 0</code>.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — padding asym + gap + count ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".overview-cloud-chip-count">
                <button type="button" className="overview-cloud-chip">
                  <span className="overview-cloud-chip-name">Fiction</span>
                  <span className="overview-cloud-chip-count">12</span>
                </button>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Padding <strong>asymétrique</strong> — <strong>16</strong> à gauche (texte), <strong>8</strong> à droite : le badge count apporte déjà sa masse visuelle à droite, un 16 y creuserait un vide. <strong>Gap 8</strong> entre nom et badge ; badge coté en boîte (20 · pill). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {STATES.map(([state, mod]) => (
              <div key={state} className="ds-state-sample">
                <Chip name={state} count={12} cls={mod} />
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Une seule transition sur <code>background</code> (0.15s), pas de translate ni d&apos;ombre (convention DS). Light : <span className="ds-token-chip">--bg3</span> → <span className="ds-token-chip">--primary-10</span>. Dark : <span className="ds-token-chip">--bg-elevated</span> → <span className="ds-token-chip">--primary-10</span>. Le focus repose aujourd&apos;hui sur l&apos;outline navigateur — candidat à un anneau <code>:focus-visible</code> aligné sur les boutons.</p>
        </div>
      </div>

      {/* ─────────── 5. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="overview-cloud">
            {GENRES.map(([name, count]) => <Chip key={name} name={name} count={count} />)}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Container</div>
            <p><code>flex-wrap</code>, gap <strong>8</strong> : les chips passent à la ligne sans troncature. Triés par count décroissant puis alphabétique ; les consommateurs plafonnent l&apos;affichage (Top Genres 6, Top Authors 8).</p>
            <span className="ds-class">.overview-cloud</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Click</div>
            <p>Chaque chip est un <code>&lt;button&gt;</code> qui déclenche <code>onSelect(item)</code>. Dans l&apos;Overview, ça route vers My Library avec le filtre correspondant pré-appliqué (genre ou auteur).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Empty state</div>
            <p>Le container est <em>remplacé</em> (pas juste vidé) par <code>.overview-card-empty</code> quand la source est vide — cf. Empty State.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Source</div>
            <p>Consommateurs : <code>OverviewView.js</code> (TopGenresCard, TopAuthorsCard). Primitive promue depuis l&apos;Overview v3.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
