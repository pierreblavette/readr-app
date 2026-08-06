import DSSection from "../_components/DSSection";
import { WeeklyActivityResponsive, WeeklyActivityAnatomy, WeekBars, MonthGrid } from "./_specs";

// Taille cohérente de la carte (elle est imposante) : pleine largeur, bornée à 780.
const CARD_STYLE = { width: "100%", maxWidth: 780 };

// Anatomy responsive : deux jeux de badges (desktop = pills/range/nav ; mobile = les
// dropdowns .overview-activity-mobile-filters + nav pleine largeur remplacent le head).
const DESKTOP_ANNOS = [
  { n: 1, side: "top", target: ".overview-activity-pills" },
  { n: 2, side: "top", target: ".overview-activity-range" },
  { n: 3, side: "right", target: ".overview-activity-nav" },
  { n: 4, side: "left", target: ".overview-activity-track" },
  { n: 5, side: "bottom", target: ".overview-activity-legend" },
];
const MOBILE_ANNOS = [
  { n: 1, side: "top", target: ".overview-activity-mobile-filters" },
  { n: 2, side: "right", target: ".overview-activity-nav" },
  { n: 3, side: "left", target: ".overview-activity-track" },
  { n: 4, side: "bottom", target: ".overview-activity-legend" },
];

// Track blanc (vs --bg3 en prod) + hauteur réelle 120, pour montrer les fills isolés.
const TRACK = { width: 88, height: 120, background: "var(--card)" };

export default function WeeklyActivityPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="weekly-activity"
      title="Data Visualization"
      sub="Le graphe d'activité de l'accueil : combien de livres, de citations et de mots par jour, sur une semaine ou un mois."
    >
      {/* 1 — PREVIEW (responsive) */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <WeeklyActivityResponsive metric="all" view="week" />
            </div>
          </div>
          <p className="ds-note">Mode <strong>All · Week</strong> : trois barres groupées par jour (Books / Quotes / Words), un point pour les jours vides, légende sous le graphe. La carte est <strong>responsive au conteneur</strong> — rétrécis la fenêtre : sous <strong>740px</strong> de large, elle bascule en version mobile (head en dropdowns, nav pleine largeur). Voir <strong>Responsive</strong>.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
            <WeeklyActivityAnatomy desktopAnnos={DESKTOP_ANNOS} mobileAnnos={MOBILE_ANNOS} />
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>·</td><td><span className="ds-class">.overview-card.overview-activity</span></td><td>Coquille : hérite <span className="ds-class">.overview-card</span> (surface, radius, padding 20), <code>gap: 20</code>, deux <span className="ds-class">.overview-activity-divider</span> qui isolent le graphe (head ↔ chart ↔ legend).</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.overview-activity-pills</span></td><td>Sélecteur de métrique (segmented, primitive <span className="ds-class">Segmented Pills</span>) : 4 onglets <strong>All / Books / Quotes / Words</strong>. Actif = plein <span className="ds-token-chip">--primary</span>, blanc, 600.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.overview-activity-range</span></td><td>Bascule <strong>Week / Month</strong> — même primitive segmented que les pills.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.overview-activity-nav</span></td><td>Prev / next (<span className="ds-class">.overview-activity-nav-btn</span> 28×28, visuel <span className="ds-class">.btn-secondary</span>) + <span className="ds-class">.overview-activity-week-label</span> (13/600, tabular). Désactivés aux bornes.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.overview-activity-track</span></td><td>Boîte par jour : 100% × 80h, <span className="ds-token-chip">--primary-5</span>, radius 6, items <code>align-end</code>. Contient un <span className="ds-class">.overview-activity-fill</span> (barre) ou un <span className="ds-class">.overview-activity-dot</span> (jour vide).</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.overview-activity-fill</span></td><td>Barre : hauteur = <code>value / max × 100%</code> (min 8%). Simple (<span className="ds-class">.is-books/quotes/words</span>) ou <span className="ds-class">.is-stacked</span> (3 segments côte à côte en mode All). Count centré dans le segment.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.overview-activity-legend</span></td><td>Légende couleur : 3 items (Books <span className="ds-token-chip">--primary</span> · Quotes <span className="ds-token-chip">--primary-40</span> · Words <span className="ds-token-chip">--primary-20</span>).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 — METRICS (fills) */}
      <div className="ds-card">
        <div className="ds-card-head">Metrics · fills</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <div className="overview-activity-track" style={TRACK}>
                <div className="overview-activity-fill is-stacked">
                  <div className="overview-activity-seg overview-activity-seg--books" style={{ height: "60%" }}><span className="overview-activity-count">2</span></div>
                  <div className="overview-activity-seg overview-activity-seg--quotes" style={{ height: "100%" }}><span className="overview-activity-count">3</span></div>
                  <div className="overview-activity-seg overview-activity-seg--words" style={{ height: "40%" }}><span className="overview-activity-count">1</span></div>
                </div>
              </div>
              <span className="ds-class">.is-stacked</span>
            </div>
            <div className="ds-state-sample">
              <div className="overview-activity-track" style={TRACK}>
                <div className="overview-activity-fill is-books" style={{ height: "75%" }}><span className="overview-activity-count">3</span></div>
              </div>
              <span className="ds-class">.is-books</span>
            </div>
            <div className="ds-state-sample">
              <div className="overview-activity-track" style={TRACK}>
                <div className="overview-activity-fill is-quotes" style={{ height: "100%" }}><span className="overview-activity-count">4</span></div>
              </div>
              <span className="ds-class">.is-quotes</span>
            </div>
            <div className="ds-state-sample">
              <div className="overview-activity-track" style={TRACK}>
                <div className="overview-activity-fill is-words" style={{ height: "45%" }}><span className="overview-activity-count">2</span></div>
              </div>
              <span className="ds-class">.is-words</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note"><strong>All</strong> = <span className="ds-class">.is-stacked</span> : 3 segments côte à côte, count centré, à l&apos;échelle de <code>segMax</code>. Métrique seule = une barre à l&apos;échelle de <code>weekMax</code> : <strong>Books</strong> <span className="ds-token-chip">--primary</span>, <strong>Quotes</strong> <span className="ds-token-chip">--primary-40</span>, <strong>Words</strong> <span className="ds-token-chip">--primary-20</span> (count en <span className="ds-token-chip">--primary-70</span> pour le contraste). Fills isolés ici sur fond blanc ; dans le chart ils vivent dans un <span className="ds-class">.overview-activity-track</span> (<span className="ds-token-chip">--bg3</span>).</p>
        </div>
      </div>

      {/* 4 — RANGE */}
      <div className="ds-card">
        <div className="ds-card-head">Range · Week / Month</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <div style={CARD_STYLE}><WeekBars metric="all" /></div>
              <span className="ds-class">.overview-activity-bars</span>
            </div>
            <div className="ds-state-sample">
              <div style={CARD_STYLE}><MonthGrid metric="all" /></div>
              <span className="ds-class">.overview-activity-grid</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note"><strong>Week</strong> = <span className="ds-class">.overview-activity-bars</span> : 7 barres verticales (M → S). <strong>Month</strong> = <span className="ds-class">.overview-activity-grid</span> : grille type calendrier, un cube par jour (numéro + mini-barre + compteur), cases hors-mois grisées, jour courant marqué (<span className="ds-class">.is-today</span>). Un cube/jour avec activité est cliquable → ouvre le <span className="ds-class">Activity Day Panel</span>.</p>
        </div>
      </div>

      {/* 6 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Head responsive</div>
            <p>Un <code>ResizeObserver</code> mesure la carte : sous <strong>740px</strong> elle passe <span className="ds-class">.is-compact</span> — pills + range disparaissent au profit de deux <span className="ds-class">SortMenu</span> déroulants (<span className="ds-class">.overview-activity-mobile-filters</span>), la nav reste. Container-based, pas viewport (la carte vit dans une grille dont la largeur ne suit pas la fenêtre).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Jours vides &amp; bornes</div>
            <p>Jour sans activité → un petit point à la base du track (préserve le rythme 7 colonnes). <strong>Prev</strong> s&apos;arrête à la semaine de la 1re activité (pas de semaines vides à l&apos;infini) ; <strong>Next</strong> à la semaine courante (pas de futur).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Counts</div>
            <p>Métrique seule : compteur <em>au-dessus</em>/dans la barre. Mode All : count <em>dans</em> chaque segment (blanc sur Books/Quotes, <span className="ds-token-chip">--primary-70</span> sur Words pour le contraste sur le fond clair).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sources &amp; i18n</div>
            <p>Books = <code>finishedAt</code> · Quotes / Words = <code>createdAt</code>. Initiales des jours et libellé de période localisés (<code>Intl.DateTimeFormat</code>, replis cross-mois / cross-année).</p>
          </div>
        </div>
      </div>

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Contexte</div>
            <p>Épinglée dans l&apos;onglet <strong>Overview</strong>. État vide dédié (<span className="ds-class">.overview-card-empty</span> + <span className="ds-class">OverviewIcon</span>) quand aucune activité n&apos;existe encore.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Day panel</div>
            <p>Cliquer un jour/cube avec activité ouvre le <span className="ds-class">Activity Day Panel</span> (slide-in réutilisant la primitive <span className="ds-class">.book-panel</span>) — détail des livres finis, citations et mots de ce jour.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Primitives réutilisées</div>
            <p>Sélecteur = <span className="ds-class">Segmented Pills</span> ; nav = <span className="ds-class">.btn-secondary</span> ; dropdowns compacts = <span className="ds-class">Dropdown Menu</span> (via <code>SortMenu</code>) ; panneau = <span className="ds-class">Side Panels</span>.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
