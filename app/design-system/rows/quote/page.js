import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { Cover, BookRowBody } from "../_specs";

// Variante « with context » : quote-card en habillage neutre + attribution livre.
function OverviewQuoteRow({ text, title, author, from, to, letter, className = "", width = "100%" }) {
  return (
    <div className={`quote-card overview-quote-card ${className}`.trim()} role="button" tabIndex={0} style={{ width }}>
      <div className="quote-card-body">
        <div className="quote-card-text-wrap">
          <div className="quote-card-text">
            <span className="quote-mark">&ldquo;</span>{text}<span className="quote-mark">&rdquo;</span>
          </div>
        </div>
      </div>
      <div className="quote-card-divider" />
      <div className="book-row">
        <Cover from={from} to={to} letter={letter} />
        <BookRowBody title={title} author={author} />
      </div>
    </div>
  );
}

// Variante « stripped » : boîte bg3 nue, texte + page, sans attribution livre.
function PanelQuoteItem({ text, page, className = "", width = "100%" }) {
  return (
    <button type="button" className={`panel-quote-item ${className}`.trim()} style={{ width }}>
      <p className="panel-quote-text">{`"${text}"`}</p>
      {page && <span className="panel-quote-page">p. {page}</span>}
    </button>
  );
}

const OVERVIEW_ANNOS = [
  { n: 1, side: "top", target: ".overview-quote-card" },
  { n: 2, side: "top", target: ".quote-card-text" },
  { n: 3, side: "bottom", target: ".quote-card-divider" },
  { n: 4, side: "bottom", target: ".overview-quote-card .book-row" },
];

const DEMO_TEXT = "The mystery of human existence lies not in just staying alive, but in finding something to live for.";

export default function QuoteRowPage() {
  return (
    <DSSection
      id="rows-quote"
      title="Quote Row"
      sub="Une citation citée en ligne de liste. Deux variantes selon le contexte : avec l'attribution du livre, ou nue quand le livre est déjà identifié autour."
    >
      {/* 1. PREVIEW — les deux variantes */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "min(402px, 100%)" }}>
              <OverviewQuoteRow text={DEMO_TEXT} title="The Brothers Karamazov" author="Dostoevsky" from="#4959E6" to="#00A699" letter="B" />
              <PanelQuoteItem text="We are all in the gutter, but some of us are looking at the stars." page="42" />
            </div>
          </div>
          </div>
          <p className="ds-note">En haut, la variante <strong>with context</strong> (attribution livre en pied) ; en bas, la variante <strong>stripped</strong> (texte + page seuls). Même rôle — citer une quote en liste — deux habillages selon ce que le contexte affiche déjà.</p>
        </div>
      </div>

      {/* 2. ANATOMY — la variante with context */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={OVERVIEW_ANNOS} stack>
            <OverviewQuoteRow className="ds-anno-organism" text={DEMO_TEXT} title="The Brothers Karamazov" author="Dostoevsky" from="#4959E6" to="#00A699" letter="B" width="min(402px, 100%)" />
          </AnnoScene>
          </div>
        </div>
      </div>

      {/* 3. VARIANTS — le point clé */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · context</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">With context — <span className="ds-cn">.overview-quote-card</span></div>
            <p>Modifier de <span className="ds-class">.quote-card</span> : fond neutre <span className="ds-token-chip">--bg3</span> (au lieu du <span className="ds-token-chip">--card</span> bordé de la Quote Card), tint <span className="ds-token-chip">--primary-10</span> au hover. Elle <strong>inclut l&apos;attribution du livre</strong> (divider + Book Row aplati) car elle apparaît dans l&apos;Overview, hors du contexte d&apos;un livre : sans elle, on ne saurait pas d&apos;où vient la citation.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Stripped — <span className="ds-cn">.panel-quote-item</span></div>
            <p>Boîte autonome <span className="ds-token-chip">--bg3</span> radius 8, <strong>texte + numéro de page seuls</strong>. Pas de cover ni de titre : dans le <strong>Book Side Panel</strong>, le livre est déjà affiché en tête du panel — répéter sa cover et son nom sur chaque citation ferait doublon. La différence entre les deux variantes est donc <em>voulue</em>, pas une dette.</p>
          </div>
        </div>
      </div>

      {/* 4. ELEMENTS */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Variante</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.quote-card-text</span> / <span className="ds-class">.panel-quote-text</span></td><td>Le texte : 16/500, <code>line-height</code> 1.7–1.8, <code>line-clamp: 3</code>. Encadré des <span className="ds-class">.quote-mark</span> dans la variante with context.</td><td>les deux</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.quote-card-divider</span></td><td>Filet 1px <span className="ds-token-chip">--border-subtle</span> entre le texte et l&apos;attribution.</td><td>with context</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.book-row</span> (aplati)</td><td>Attribution : cover + titre + auteur. <code>.quote-card .book-row</code> → fond transparent, padding 0 (se lit comme un label, pas une cellule).</td><td>with context</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.panel-quote-page</span></td><td>Numéro de page : 12/600 <span className="ds-token-chip">--text-2</span>.</td><td>stripped</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <OverviewQuoteRow text={DEMO_TEXT} title="The Brothers Karamazov" author="Dostoevsky" from="#4959E6" to="#00A699" letter="B" width={402} />
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>With context</strong> — <span className="ds-class">.overview-quote-card</span> : padding <strong>16</strong> sur 4 côtés, gap <strong>16</strong> entre body → divider → attribution.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <PanelQuoteItem text="We are all in the gutter, but some of us are looking at the stars." page="42" width={402} />
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Stripped</strong> — <span className="ds-class">.panel-quote-item</span> : padding <strong>12 / 12 / 16</strong> (un peu plus en bas, sous la page), gap <strong>8</strong> entre le texte et le numéro de page. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 6. STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States · interactive</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <PanelQuoteItem text="The unexamined life is not worth living." page="12" width="min(402px, 100%)" />
              <span className="ds-class">.panel-quote-item</span>
            </div>
            <div className="ds-state-sample">
              <PanelQuoteItem text="The unexamined life is not worth living." page="12" className="is-hover" width="min(402px, 100%)" />
              <span className="ds-class">:hover</span>
            </div>
          </div>
          <p className="ds-note">Les deux variantes sont cliquables (<code>role=button</code> / <code>&lt;button&gt;</code>) : hover en <span className="ds-token-chip">--primary-10</span>, focus clavier en anneau <span className="ds-token-chip">--primary-50</span>, aucun lift. Même vocabulaire d&apos;état que Book Row.</p>
        </div>
      </div>

      {/* 7. USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Choisir la variante</div>
            <p>Le livre est-il déjà identifié dans le contexte ? <strong>Oui</strong> (Book Panel) → <span className="ds-class">.panel-quote-item</span>. <strong>Non</strong> (Overview, listes cross-livres) → <span className="ds-class">.overview-quote-card</span> avec attribution.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Contrepartie</div>
            <p>La forme carte pleine est <strong>Quote Card</strong> (<span className="ds-class">.quote-card</span>, famille Cards) : fond <span className="ds-token-chip">--card</span> + bord, actions (favori, kebab), texte dépliable. La Quote Row en est la version allégée pour la liste.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Source</div>
            <p><code>OverviewQuoteCard.js</code> (with context) · <code>BookPanel.js</code> / <span className="ds-class">.panel-quote-item</span> (stripped).</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
