import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { QuoteCardSpec, QUOTE_ANNOS } from "../_specs";

export default function QuoteCardPage() {
  return (
    <DSSection id="card-quote" title="Quote Card" sub="La carte d'une citation : le texte, ses actions, et le livre d'où elle vient.">

      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <QuoteCardSpec />
          </div>
          </div>
          <p className="ds-note">Une citation : le <strong>texte</strong> entre guillemets accent, un bouton <strong>love</strong> (bookmark) + le kebab, un divider, puis le <strong>livre source</strong> (<span className="ds-class">.book-row</span> — voir Book Row). Même socle card, en <em>flex colonne</em> plutôt qu&apos;un cover en tête.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={QUOTE_ANNOS} stack>
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
              <tr className="table-row"><td>4</td><td><span className="ds-class">.book-row</span></td><td>Le livre source, après un <span className="ds-class">.quote-card-divider</span> (1px <span className="ds-token-chip">--border-subtle</span>). Réutilise la primitive <span className="ds-class">Book Row</span>.</td><td>—</td></tr>
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
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
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

    </DSSection>
  );
}
