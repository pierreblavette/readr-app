import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { BookCardSpec, BOOK_ANNOS, KebabDots } from "../_specs";

export default function BookCardPage() {
  return (
    <DSSection id="card-book" title="Book Card" sub="La carte de la grille Library — cover + titre + auteur + méta + kebab. Applique le langage card avec un cover en tête.">

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

    </DSSection>
  );
}
