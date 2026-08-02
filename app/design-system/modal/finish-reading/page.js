import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { FinishModalSpec, FinishStars } from "../_specs";

// Largeur réelle du composant — max 620, fluide en dessous (iso Form Modal).
const MODAL_STYLE = { maxWidth: 620, width: "100%" };

const FINISH_ANNOS = [
  { n: 1, side: "left", target: ".finish-modal-chip" },
  { n: 2, side: "left", target: ".finish-stars" },
  { n: 3, side: "left", target: ".quote-textarea" },
  { n: 4, side: "bottom", target: ".modal-actions" },
  { n: 5, side: "right", target: ".modal-close" },
];

export default function FinishReadingModalPage() {
  return (
    <DSSection
      id="modal-finish-reading"
      title="Finish Reading Modal"
      sub="La fenêtre ouverte quand on termine un livre : on lui donne une note et, si on veut, un mot. Elle se rouvre pour éditer un livre déjà fini."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-modal-stage ds-preview">
              <FinishModalSpec style={MODAL_STYLE} rating={4} />
            </div>
          </div>
          <p className="ds-note">La coquille <span className="ds-class">.modal</span> (titre → form → actions), avec un corps propre à la fin de lecture : <strong>BookRow</strong> du livre concerné, <strong>rating</strong> en étoiles, <strong>note</strong> libre. Montrée en flux (pas d&apos;overlay ni d&apos;anim). Tout le langage de coquille vit dans <a href="/design-system/modal/form"><strong>Form Modal</strong></a>.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
            <AnnoScene annos={FINISH_ANNOS} stack>
              <FinishModalSpec className="ds-anno-organism" style={MODAL_STYLE} rating={4} />
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
              <tr className="table-row"><td>·</td><td><span className="ds-class">.modal.finish-modal</span></td><td>Coquille — <strong>aucune règle propre</strong> : toute la taille (max-width, padding 32/24/0, <code>gap: 32</code>) est héritée de <span className="ds-class">.modal</span>. Voir <a href="/design-system/modal/form"><strong>Form Modal</strong></a>.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.finish-modal-chip</span></td><td>Wrapper du <span className="ds-class">Book Row</span> (BookRow) du livre concerné. Purement d&apos;espacement — rythmé par le <code>gap: 24</code> de <span className="ds-class">.modal-fields</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.finish-stars</span></td><td>Rating : 5 <span className="ds-class">.finish-star</span> (svg <strong>28</strong>) en <code>role=radiogroup</code>, gap 4. Étoile <span className="ds-token-chip">--border</span> par défaut → <span className="ds-token-chip">--primary-50</span> en <span className="ds-class">.filled</span> (ou survol ≤ index).</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.quote-textarea</span></td><td>Commentaire — même champ partagé qu&apos;AddQuoteModal : fond <span className="ds-token-chip">--bg3</span>, glow primary au focus. <code>maxLength 500</code>, facultatif.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.modal-actions</span></td><td>Footer : Cancel (<span className="ds-class">.btn-outline</span>) + Save (<span className="ds-class">.btn-primary</span>). Submit hors <code>&lt;form&gt;</code>, lié par <code>form=&quot;finish-reading-form&quot;</code> (Enter-to-submit préservé).</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.modal-close</span></td><td>Bouton X 40×40, absolu (top / right 16).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline padSelector=".modal-actions" gapSelector=".modal-fields">
                <FinishModalSpec style={{ width: 620 }} rating={4} />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Même métrique que la coquille <a href="/design-system/modal/form"><strong>Form Modal</strong></a> : padding <strong>haut 32</strong> · <strong>côtés 24</strong> (bas 0), <code>gap: 32</code> entre titre → form → actions. À l&apos;intérieur du corps <span className="ds-class">.modal-form</span>, le <span className="ds-class">.modal-fields</span> empile chip → rating → note à <code>gap: 24</code>. Footer <span className="ds-class">.modal-actions</span> : padding <strong>16 / 24</strong>, débordé de <strong>−24</strong> latéraux pour aller flush aux bords. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 4 — RATING STATES */}
      <div className="ds-card">
        <div className="ds-card-head">Rating · states</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-3">
            <div className="ds-state-sample">
              <FinishStars value={0} />
              <span className="ds-class">value 0</span>
            </div>
            <div className="ds-state-sample">
              <FinishStars value={3} />
              <span className="ds-class">value 3</span>
            </div>
            <div className="ds-state-sample">
              <FinishStars value={5} />
              <span className="ds-class">value 5</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Les étoiles sont <strong>pleines</strong> (fill), pas en contour : <span className="ds-token-chip">--border</span> à vide, <span className="ds-token-chip">--primary-50</span> jusqu&apos;à l&apos;index sélectionné. Au survol, l&apos;aperçu suit le curseur (index de hover) sans committer tant qu&apos;on ne clique pas. Le rating est <strong>facultatif</strong> — on peut sauver sans.</p>
        </div>
      </div>

      {/* 5 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Ouverture &amp; édition</div>
            <p>Depuis « Mark as finished » du <span className="ds-class">Book Panel</span> ou du kebab <span className="ds-class">Now Reading</span>. En édition d&apos;un livre déjà terminé (<code>book.finishedAt</code>), elle se rouvre <strong>pré-remplie</strong> (<code>rating</code> + <code>note</code> existants).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Après sauvegarde</div>
            <p>Les métadonnées apparaissent en section dédiée du <a href="/design-system/panels/book"><strong>Book Panel</strong></a> (date, rating lecture seule, note). <strong>Remove</strong> y ouvre la <a href="/design-system/modal/delete"><strong>Delete Modal</strong></a> (<code>type=removeFinished</code>) — conserve <code>finishedAt</code>, n&apos;efface que rating + note. Détail sur ces deux pages.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Coquille &amp; cycle de vie</div>
            <p>Coquille, sizing et footer sticky = <a href="/design-system/modal/form"><strong>Form Modal</strong></a>. A11y (focus trap, Escape, restauration), scroll-lock et motion d&apos;entrée sont communs à la famille — voir <a href="/design-system/modal"><strong>Modals</strong></a>.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
