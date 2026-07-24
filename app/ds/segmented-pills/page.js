import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

// Segment assemblé — une piste, N pills, une seule .is-active.
function Segment({ size = "", active = "All", items = ["All", "Books", "Quotes"] }) {
  const s = size ? " is-" + size : "";
  return (
    <div className={`overview-activity-pills${s}`} role="tablist">
      {items.map((label) => (
        <button key={label} type="button" role="tab" aria-selected={active === label} className={`overview-activity-pill${s}${active === label ? " is-active" : ""}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

const STATES = [
  ["Default", ""],
  ["Hover", "is-hover"],
  ["Active", "is-active"],
];

const SIZES = [
  ["xs", "24px · padding 0 10 · font 12 · track 2"],
  ["sm", "32px · padding 0 12 · font 13 · track 3 — défaut"],
  ["md", "40px · padding 0 16 · font 14 · track 4"],
  ["lg", "48px · padding 0 20 · font 14 · track 5"],
];

export default function SegmentedPillsPage() {
  return (
    <DSSection
      id="segmented-pills"
      title="Segmented Pills"
      sub="Sélecteur segmenté — plusieurs valeurs sur une piste en pilule, une seule active. Utilisé pour basculer une vue (All / Books / Quotes / Words) ou une plage (Week / Month)."
    >
      {/* ─────────── 1. STATES — une pill ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {STATES.map(([label, mod]) => (
              <div key={label} className="ds-state-sample">
                <button type="button" className={`overview-activity-pill${mod ? " " + mod : ""}`}>{label}</button>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Repos : texte <span className="ds-token-chip">--text-2</span>, fond transparent. Survol non-actif : texte <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-10</span>. Active : fond <span className="ds-token-chip">--primary-50</span> plein + texte blanc. Une seule pill porte <span className="ds-class">.is-active</span> à la fois — la piste ne gère pas l&apos;exclusivité, c&apos;est le consommateur.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — le segment assemblé ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board">
            <Redline>
              <Segment />
            </Redline>
          </div>
          <p className="ds-note">Bandes = padding <strong>3</strong> de la piste ; gaps <strong>4</strong> mesurés entre les pills. Le fond <span className="ds-token-chip">--bg3</span> et le radius pill de la piste sont retirés du schéma (règle d&apos;anatomy), documentés ci-dessous.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Track</div>
            <p>Piste <code>inline-flex</code>, gap 4, padding 3, fond <span className="ds-token-chip">--bg3</span>, radius 999 (pill). Le padding enferme les pills dans la gouttière — l&apos;active affleure le bord intérieur sans toucher le contour.</p>
            <span className="ds-class">.overview-activity-pills</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Pill</div>
            <p>height 32, padding 0 12, font 13/600, radius 999, fond transparent au repos. Chaque segment est un <code>&lt;button&gt;</code> ; le libellé seul, pas d&apos;icône.</p>
            <span className="ds-class">.overview-activity-pill</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Active</div>
            <p>Fond <span className="ds-token-chip">--primary-50</span>, texte blanc. Pas d&apos;indicateur qui glisse : chaque pill porte son propre fond, l&apos;active est celle qui a la classe — plus simple qu&apos;un thumb animé, et robuste si le nombre de segments change.</p>
            <span className="ds-class">.is-active</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. VARIANTS · sizes ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · sizes</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {SIZES.map(([size]) => (
              <div key={size} className="ds-state-sample">
                <Segment size={size} />
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-redline-board">
            {SIZES.map(([size]) => (
              <div key={size} className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
                <Redline><Segment size={size} /></Redline>
              </div>
            ))}
          </div>
          <p className="ds-note">Une planche par taille — hauteur de pill 24 → 32 → 40 → 48 (step 8), gap constant <strong>4</strong> (micro-gap DS). Le padding de piste (bandes de bord) fait 2 / 3 / 4 / 5 : un réglage à la main, <strong>pas</strong> une valeur du barème — il suit grossièrement la pill sans règle propre. Cotes mesurées à l&apos;exécution.</p>
        </div>
        <div className="ds-card-body col">
          {SIZES.map(([size, spec]) => (
            <div key={size} className="ds-token-block">
              <div className="ds-token-name">{size.toUpperCase()}</div>
              <p>{spec}.</p>
              <span className="ds-class">.is-{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────── 4. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Quand l&apos;utiliser</div>
            <p><strong>3 valeurs ou plus</strong> mutuellement exclusives sur une même dimension (All / Books / Quotes / Words). Pour <strong>2 valeurs</strong> (grille/liste, clair/sombre), c&apos;est un <strong>Toggle</strong>. Pour un choix de formulaire validé au submit, un groupe radio ou une Checkbox.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Weekly Activity (filtre All / Books / Quotes / Words en <span className="ds-class">.is-xs</span>, plage Week / Month). La taille s&apos;adapte à la densité du conteneur.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
