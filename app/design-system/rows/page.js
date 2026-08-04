import DSSection from "../_components/DSSection";
import { BookRowSpec, CollectionRowSpec } from "./_specs";

export default function RowsFoundationPage() {
  return (
    <DSSection id="rows" title="Rows" sub="La famille des lignes de contenu : un livre, une collection, une citation, une lecture, un mot — cités de façon compacte dans une liste ou un panel. Le pendant « liste » des Cards.">

      {/* 1 — PREVIEW — la famille */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "min(340px, 100%)" }}>
              <BookRowSpec />
              <CollectionRowSpec />
            </div>
          </div>
          </div>
          <p className="ds-note">Une <strong>Row</strong> est une unité de liste : une cellule boxée, répétable, qui cite un contenu sans le déployer. Six déclinaisons — <strong>Book</strong>, <strong>Collection</strong>, <strong>Quote</strong>, <strong>Now Reading</strong>, <strong>Dictionary</strong>, <strong>Quiz</strong> — partagent le même langage ci-dessous. Chacune a sa page (sous-nav « Rows » de la sidebar).</p>
        </div>
      </div>

      {/* 2 — ROW LANGUAGE (la primitive partagée) */}
      <div className="ds-card">
        <div className="ds-card-head">Row language</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Surface</div>
            <p>Fond <span className="ds-token-chip">--bg3</span> · radius <strong>8</strong> · padding <strong>12</strong> (base) — une cellule discrète posée sur le fond d&apos;une liste ou d&apos;un panel. Contrairement aux Cards (fond <span className="ds-token-chip">--card</span> + bord), la Row n&apos;a <strong>pas de bord</strong> : c&apos;est le fond qui la détache.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Hover (mode interactif)</div>
            <p>Fond <span className="ds-token-chip">--primary-10</span>. <strong>Pas de lift</strong> : ni <code>translateY</code> ni ombre — conforme à la doctrine « hover = fond / couleur / bord seulement ». Hover et <code>:active</code> partagent le même fond.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Focus</div>
            <p>Anneau <code>0 0 0 2px</code> <span className="ds-token-chip">--primary-50</span> en <code>:focus-visible</code> — même vocabulaire que le focus des inputs et des Cards.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Interactive vs static</div>
            <p>La plupart des rows sont cliquables (rendues <code>&lt;button&gt;</code>, avec hover/focus). <strong>Quiz Row</strong> fait exception : c&apos;est une ligne de résultat, non interactive. L&apos;interactivité est une <em>propriété</em> de chaque row, pas une frontière de famille.</p>
          </div>
        </div>
      </div>

      {/* 3 — FAMILY + symétrie Card/Row */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Rows ↔ Cards — deux vues d&apos;un même contenu</div>
            <p>Chaque type de contenu a deux représentations : une <strong>Card</strong> (bloc autonome, grille) et une <strong>Row</strong> (item compact, liste). La famille Rows est le miroir « liste » de la famille Cards.</p>
          </div>
          <table className="token-table">
            <thead className="table-head"><tr><th>Row</th><th>Classe</th><th>Contrepartie Card</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>Book Row</td><td><span className="ds-class">.book-row</span></td><td>Book Card</td></tr>
              <tr className="table-row"><td>Collection Row</td><td><span className="ds-class">.collection-chip</span></td><td>—</td></tr>
              <tr className="table-row"><td>Quote Row</td><td><span className="ds-class">.overview-quote-card</span> · <span className="ds-class">.panel-quote-item</span></td><td>Quote Card</td></tr>
              <tr className="table-row"><td>Now Reading Row</td><td><span className="ds-class">.now-reading-row</span></td><td>Now Reading</td></tr>
              <tr className="table-row"><td>Dictionary Row</td><td><span className="ds-class">.dictionary-saved-head</span></td><td>Dictionary Card</td></tr>
              <tr className="table-row"><td>Quiz Row</td><td><span className="ds-class">.panel-quiz-review-item</span></td><td>—</td></tr>
            </tbody>
          </table>
          <p className="ds-note"><strong>Dette</strong> : comme les Cards, ce sont aujourd&apos;hui des classes <em>parallèles</em> (pas d&apos;héritage). Candidat à une primitive <span className="ds-class">.row</span> partagée (surface <span className="ds-token-chip">--bg3</span> + radius + padding + hover) que chaque row composerait — fix prod séparé.</p>
        </div>
      </div>

    </DSSection>
  );
}
