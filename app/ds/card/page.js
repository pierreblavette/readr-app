import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import PageSubnav from "../_components/PageSubnav";

const SUBNAV = [
  { id: "card-foundation", label: "Foundation" },
  { id: "book-card", label: "Book Card" },
  { id: "quote-card", label: "Quote Card" },
];

const KebabDots = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
  </svg>
);

// ─── BOOK CARD ───
const BOOK_ANNOS = [
  { n: 1, side: "right", target: ".book-card" },
  { n: 2, side: "left", target: ".book-cover" },
  { n: 3, side: "left", target: ".book-body-info" },
  { n: 4, side: "right", target: ".col-card-kebab" },
];

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

// ─── QUOTE CARD ───
const QUOTE_ANNOS = [
  { n: 1, side: "right", target: ".quote-card" },
  { n: 2, side: "left", target: ".quote-card-text" },
  { n: 3, side: "right", target: ".quote-card-actions" },
  { n: 4, side: "left", target: ".book-chip" },
];

const QUOTE = "The world was ending and there was nothing to be done about it.";

function QuoteCardSpec({ className = "", saved = false }) {
  return (
    <div className={`quote-card ${className}`.trim()} style={{ width: 400 }}>
      <div className="quote-card-body">
        <div className="quote-card-text-wrap">
          <div className="quote-card-text">
            <span className="quote-mark">“</span>{QUOTE}<span className="quote-mark">”</span>
          </div>
        </div>
        <div className="quote-card-actions">
          <button type="button" className={`quote-card-like${saved ? " is-saved" : ""}`} aria-label="Love" aria-pressed={saved}>
            <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21l-8-5-8 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" /></svg>
          </button>
          <button type="button" className="col-card-kebab" aria-label="More"><KebabDots /></button>
        </div>
      </div>
      <div className="quote-card-divider" />
      <div className="book-chip">
        <div className="book-chip-cover" style={{ background: "var(--primary-30)" }}>D</div>
        <div className="book-chip-body"><div className="book-chip-name"><div className="book-chip-title">Dune</div><div className="book-chip-author">Frank Herbert</div></div></div>
      </div>
    </div>
  );
}

export default function CardPage() {
  return (
    <DSSection id="card" title="Cards" sub="Famille de surfaces de contenu — même langage (surface --card, radius 8, bord 1.5, bord primary au hover), décliné par carte. Book Card et Quote Card documentées ; Collection / Overview partagent la primitive et suivront.">

      <PageSubnav items={SUBNAV} />

      {/* ══════════ FOUNDATION ══════════ */}
      <div id="card-foundation" className="ds-card-group">
      <div className="ds-variant-head">
        <div className="ds-variant-head-title">Foundation</div>
        <p className="ds-variant-head-sub">Le langage partagé par toutes les cartes, et la famille au complet.</p>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Card language</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Surface</div>
            <p>Fond <span className="ds-token-chip">--card</span> · radius <strong>8</strong> (<span className="ds-token-chip">--radius</span>) · bord <strong>1.5</strong> <span className="ds-token-chip">--border-subtle</span>. Le socle commun à <em>toutes</em> les cartes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Hover</div>
            <p>Bord <span className="ds-token-chip">--primary-50</span> + léger fond <span className="ds-token-chip">--primary-3</span>. <strong>Pas de lift</strong> : ni <code>translateY</code> ni ombre — conforme à la doctrine « hover = bord / fond / couleur seulement ». Règle unifiée sur toute la famille de cartes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Selected — <span className="ds-cn">.selected</span></div>
            <p>Bord <span className="ds-token-chip">--primary-50</span> · fond <span className="ds-token-chip">--primary-5</span> · anneau <code>0 0 0 3px</code> <span className="ds-token-chip">--primary-20</span> — même vocabulaire que le focus des inputs.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Mêmes racines, contextes différents</div>
            <p>~10 cartes partagent le langage ci-dessus : <span className="ds-class">.book-card</span>, <span className="ds-class">.quote-card</span>, <span className="ds-class">.col-card</span> (collections), <span className="ds-class">.overview-card</span> / <span className="ds-class">.overview-hero-card</span> / … (dashboard), <span className="ds-class">.now-reading-card</span>, <span className="ds-class">.dictionary-saved-card</span>. Documentées ici en variantes, au fil de l&apos;eau.</p>
          </div>
          <p className="ds-note"><strong>Dette</strong> : ce sont aujourd&apos;hui des classes <em>parallèles</em> (pas d&apos;héritage). Candidat à une primitive <span className="ds-class">.card</span> partagée (surface + radius + bord + hover) que chaque carte composerait — fix prod séparé.</p>
        </div>
      </div>

      </div>

      {/* ══════════ BOOK CARD ══════════ */}
      <div id="book-card" className="ds-card-group">
      <div className="ds-variant-head">
        <div className="ds-variant-head-title">Book Card</div>
        <p className="ds-variant-head-sub">La carte de la grille Library — cover + titre + auteur + méta + kebab.</p>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <BookCardSpec />
          </div>
          </div>
          <p className="ds-note">La carte de la grille Library : cover + titre + auteur + méta + kebab. Toute la carte est cliquable ; le kebab ouvre les actions du livre.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={BOOK_ANNOS}>
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
              <tr className="table-row"><td>4</td><td><span className="ds-class">.col-card-kebab</span></td><td>Menu d&apos;actions 40×40 — voir <span className="ds-class">Kebab</span>. Masqué en edit mode.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline contentTopLine=".book-body-info">
                <div className="book-body" style={{ width: 300 }}>
                  <div className="book-body-info">
                    <div className="book-title">Normal People</div>
                    <div className="book-author">Sally Rooney</div>
                    <div className="book-meta"><span>Fiction</span><span className="book-meta-sep" aria-hidden="true">·</span><span>2018</span></div>
                  </div>
                  <button type="button" className="col-card-kebab" aria-label="More"><KebabDots /></button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Le cover est <strong>flush</strong> (aucun padding sur <span className="ds-class">.book-card</span>). Tout le spacing vit dans le corps : <span className="ds-class">.book-body</span> padding <strong>8 8 16 16</strong> (asym — moins à droite pour dégager le kebab), gap <strong>12</strong> info→kebab. À l&apos;intérieur, <span className="ds-class">.book-body-info</span> empile titre / auteur / méta avec un gap <strong>4</strong> (+ padding-top 8, ligne rouge). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

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
          <p className="ds-note">Repos : bord <span className="ds-token-chip">--border-subtle</span>. Hover : bord <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-3</span> (pas de lift ni d&apos;ombre). Selected (edit mode) : bord + fond <span className="ds-token-chip">--primary-5</span> + anneau <span className="ds-token-chip">--primary-20</span>.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Sizing &amp; usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Grille</div>
            <p><span className="ds-class">.books-grid</span> : <code>repeat(auto-fill, minmax(200px, 1fr))</code>, gap <strong>16</strong>. Cover height <strong>192</strong> fixe ; le corps s&apos;adapte.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Toute la carte est cliquable</div>
            <p>La coquille EST le bouton (<code>role=button</code>, <code>tabIndex 0</code>, Enter / Espace). Le kebab fait <code>stopPropagation</code> pour ne pas ouvrir la carte.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Edit mode</div>
            <p>La carte passe en <code>role=checkbox</code>, le kebab est masqué, une <span className="ds-class">.card-checkbox</span> (24×24, coin haut-droit, translucide + blur) apparaît sur le cover.</p>
          </div>
        </div>
      </div>

      </div>

      {/* ══════════ QUOTE CARD ══════════ */}
      <div id="quote-card" className="ds-card-group">
      <div className="ds-variant-head">
        <div className="ds-variant-head-title">Quote Card</div>
        <p className="ds-variant-head-sub">La carte d&apos;une citation — texte + actions (love / kebab) + livre source.</p>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <QuoteCardSpec />
          </div>
          </div>
          <p className="ds-note">Une citation : le <strong>texte</strong> entre guillemets accent, un bouton <strong>love</strong> (bookmark) + le kebab, un divider, puis le <strong>livre source</strong> (<span className="ds-class">.book-chip</span> — voir Book Row). Même socle card, en <em>flex colonne</em> plutôt qu&apos;un cover en tête.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={QUOTE_ANNOS}>
            <div className="ds-anno-organism"><QuoteCardSpec /></div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.quote-card</span></td><td>Coquille : même langage card (<span className="ds-token-chip">--card</span>, radius 8, bord 1.5), mais <code>flex</code> colonne, padding <strong>16</strong>, gap <strong>16</strong>. <code>role=button</code>, toute la carte cliquable.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.quote-card-text</span></td><td>La citation : 16/500, <code>line-height: 1.7</code>. Guillemets <span className="ds-class">.quote-mark</span> en <span className="ds-token-chip">--accent</span> (1.4em). <span className="ds-class">.quote-see-more</span> si le texte déborde.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.quote-card-actions</span></td><td><span className="ds-class">.quote-card-like</span> (bookmark 40×40, <span className="ds-class">.is-saved</span> le remplit) + le <span className="ds-class">Kebab</span> (Edit · Favorite · Share · Delete).</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.book-chip</span></td><td>Le livre source, après un <span className="ds-class">.quote-card-divider</span> (1px <span className="ds-token-chip">--border-subtle</span>). Réutilise la primitive <span className="ds-class">Book Row</span>.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <QuoteCardSpec />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Coquille padding <strong>16</strong> sur les 4 côtés, gap <strong>16</strong> entre body → divider → book chip. Dans le body, le texte et les actions sont séparés d&apos;un gap <strong>20</strong> (horizontal). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            <div className="ds-state-sample">
              <QuoteCardSpec />
              <span className="ds-class">.quote-card</span>
            </div>
            <div className="ds-state-sample">
              <QuoteCardSpec className="is-hover" />
              <span className="ds-class">:hover</span>
            </div>
            <div className="ds-state-sample">
              <QuoteCardSpec saved />
              <span className="ds-class">.quote-card-like.is-saved</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Même hover que la famille (bord <span className="ds-token-chip">--primary-50</span>, sans lift). Le bouton <strong>love</strong> bascule en <span className="ds-class">.is-saved</span> (bookmark plein) — l&apos;état « aimé » de la citation. Le divider passe en <span className="ds-token-chip">--primary-10</span> au hover de la carte.</p>
        </div>
      </div>
      </div>

    </DSSection>
  );
}
