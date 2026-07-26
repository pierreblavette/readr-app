import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";

const ANNOS = [
  { n: 1, side: "right", target: ".book-card" },
  { n: 2, side: "left", target: ".book-cover" },
  { n: 3, side: "left", target: ".book-body-info" },
  { n: 4, side: "right", target: ".col-card-kebab" },
];

const KebabDots = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
  </svg>
);

// Mock statique du Book Card : le vrai composant fetch la cover + porte 20 props.
// On reproduit le markup et les classes réelles — le CSS de library fait le rendu,
// aucune donnée figée dans la doc, aucune divergence possible avec la prod.
function BookCardSpec({ className = "" }) {
  return (
    <div className={`book-card ${className}`.trim()} style={{ width: 220 }}>
      <div className="book-cover" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }} />
      <div className="book-body">
        <div className="book-body-info">
          <div className="book-title">Normal People</div>
          <div className="book-author">Sally Rooney</div>
          <div className="book-meta"><span>Fiction</span><span className="book-meta-sep" aria-hidden="true">·</span><span>2018</span></div>
        </div>
        <button type="button" className="col-card-kebab" aria-label="More"><KebabDots /></button>
      </div>
    </div>
  );
}

export default function CardPage() {
  return (
    <DSSection id="card" title="Cards" sub="Famille de surfaces de contenu — même langage (surface --card, radius 8, bord 1.5, élévation au hover), décliné par contexte. Book Card en tête ; Quote / Collection / Overview partagent la primitive et suivront.">

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <BookCardSpec />
          </div>
          </div>
          <p className="ds-note">Le <strong>Book Card</strong> — la carte de la grille Library : cover + titre + auteur + méta + kebab. Toutes les cartes de l&apos;app partagent son langage (surface <span className="ds-token-chip">--card</span>, radius 8, bord 1.5, élévation au hover).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-organism"><BookCardSpec /></div>
          </AnnoScene>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.book-card</span></td><td>Coquille : surface <span className="ds-token-chip">--card</span>, radius <strong>8</strong> (<span className="ds-token-chip">--radius</span>), bord 1.5 <span className="ds-token-chip">--border-subtle</span>, <code>overflow: hidden</code> (le cover suit les coins). <code>role=button</code> (ou <code>checkbox</code> en edit).</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.book-cover</span></td><td>Cover : height <strong>192</strong>, pleine largeur, <code>object-fit: cover</code>. Placeholder = shimmer (<span className="ds-class">.book-cover-placeholder</span>) tant que l&apos;image charge.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.book-body-info</span></td><td>Colonne titre / auteur / méta : <span className="ds-class">.book-title</span> 15/700, <span className="ds-class">.book-author</span> 15/500 <span className="ds-token-chip">--text-2</span>, <span className="ds-class">.book-meta</span> 14/500 (genre · année). Gap 4, ellipsis 1 ligne.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.col-card-kebab</span></td><td>Menu d&apos;actions 40×40 (partagé book / collection) — voir <span className="ds-class">Book Card Kebab</span>. Masqué en edit mode.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 — CARD LANGUAGE (la primitive de famille) */}
      <div className="ds-card">
        <div className="ds-card-head">Card language</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Surface</div>
            <p>Fond <span className="ds-token-chip">--card</span> · radius <strong>8</strong> (<span className="ds-token-chip">--radius</span>) · bord <strong>1.5</strong> <span className="ds-token-chip">--border-subtle</span>. Le socle commun à <em>toutes</em> les cartes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Hover — élévation</div>
            <p>Bord <span className="ds-token-chip">--primary-50</span> + <span className="ds-token-chip">--shadow-md</span>. <strong>À harmoniser</strong> : le Book Card ajoute aujourd&apos;hui un <em>lift</em> (<code>transform: translateY(-2px)</code> + ombre) qui déroge à la doctrine « hover = bord / fond / couleur, jamais translate ni shadow-lift ». Règle unique à appliquer à toutes les cartes une fois la famille intégrée.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Selected — <span className="ds-cn">.selected</span></div>
            <p>Bord <span className="ds-token-chip">--primary-50</span> · fond <span className="ds-token-chip">--primary-5</span> · anneau <code>0 0 0 3px</code> <span className="ds-token-chip">--primary-20</span> — même vocabulaire que le focus des inputs.</p>
          </div>
        </div>
      </div>

      {/* 4 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <BookCardSpec />
              <span className="ds-class">.book-card</span>
            </div>
            <div className="ds-state-sample">
              <BookCardSpec className="is-hover" />
              <span className="ds-class">:hover</span>
            </div>
            <div className="ds-state-sample">
              <BookCardSpec className="selected" />
              <span className="ds-class">.selected</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Repos : bord <span className="ds-token-chip">--border-subtle</span>. Hover : bord <span className="ds-token-chip">--primary-50</span> + <span className="ds-token-chip">--shadow-md</span> (+ lift, cf. note). Selected (edit mode) : bord + fond <span className="ds-token-chip">--primary-5</span> + anneau <span className="ds-token-chip">--primary-20</span>.</p>
        </div>
      </div>

      {/* 5 — SIZING */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Grille</div>
            <p><span className="ds-class">.books-grid</span> : <code>repeat(auto-fill, minmax(200px, 1fr))</code>, gap <strong>16</strong>. La carte prend la largeur de sa colonne (min <strong>200</strong>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Cover</div>
            <p>Height <strong>192</strong> fixe, pleine largeur. Le corps s&apos;adapte au contenu en dessous.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Corps</div>
            <p><span className="ds-class">.book-body</span> padding <code>8 8 16 16</code> (asym : moins à droite, le kebab dégage) · gap <strong>12</strong> info→kebab. <span className="ds-class">.book-body-info</span> gap <strong>4</strong>, padding-top 8.</p>
          </div>
        </div>
      </div>

      {/* 6 — FAMILY */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Mêmes racines, contextes différents</div>
            <p>~10 cartes partagent le langage ci-dessus : <span className="ds-class">.quote-card</span> (citations), <span className="ds-class">.col-card</span> (collections), <span className="ds-class">.overview-card</span> / <span className="ds-class">.overview-hero-card</span> / … (dashboard), <span className="ds-class">.now-reading-card</span>, <span className="ds-class">.dictionary-saved-card</span>. Chacune sera documentée en variante ici, au fil de l&apos;eau.</p>
          </div>
          <p className="ds-note"><strong>Dette</strong> : ce sont aujourd&apos;hui des classes <em>parallèles</em> (pas d&apos;héritage). Candidat à une primitive <span className="ds-class">.card</span> partagée (surface + radius + bord + hover) que chaque carte composerait — fix prod séparé.</p>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Toute la carte est cliquable</div>
            <p>La coquille EST le bouton (<code>role=button</code>, <code>tabIndex 0</code>, Enter / Espace). Le kebab fait <code>stopPropagation</code> pour ne pas déclencher l&apos;ouverture de la carte.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Edit mode</div>
            <p>La carte passe en <code>role=checkbox</code>, le kebab est masqué, une <span className="ds-class">.card-checkbox</span> (24×24, coin haut-droit, translucide + blur) apparaît sur le cover.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
