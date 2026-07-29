import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { NowReadingCardSpec, NOW_READING_ANNOS } from "../_specs";

export default function NowReadingCardPage() {
  return (
    <DSSection
      id="card-now-reading"
      title="Now Reading"
      sub="La carte des livres en cours de lecture — épinglée en tête de l'onglet Library. Même langage que la Book Card, layout horizontal (cover + texte) pour se différencier de la grille sans la concurrencer. Badge de statut en tête, kebab d'actions rapides."
    >
      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <NowReadingCardSpec />
            </div>
          </div>
          <p className="ds-note">Badge « Started on », cover 2:3, titre / auteur / méta, et un kebab d&apos;actions rapides. Toute la carte est cliquable (ouvre le Book Panel) ; le kebab fait <code>stopPropagation</code>.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={NOW_READING_ANNOS}>
              <div className="ds-anno-organism"><NowReadingCardSpec /></div>
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
              <tr className="table-row"><td>·</td><td><span className="ds-class">.now-reading-card</span></td><td>Coquille (<code>role=button</code>) : surface <span className="ds-token-chip">--card</span>, radius <strong>8</strong> (<span className="ds-token-chip">--radius</span>), bord 1.5 <span className="ds-token-chip">--border-subtle</span>, <code>position: relative</code> (ancre le kebab). Animation <code>fadeUp</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.now-reading-date</span></td><td>Badge « Started on » : <strong>fond primary plein</strong> (<span className="ds-token-chip">--primary-50</span>), <span className="ds-token-chip">#FFFFFF</span>, radius 999, <code>12 / 600</code>. Ancre le statut « lecture active ». Tailles <span className="ds-class">--xs</span> / <span className="ds-class">--sm</span> / <span className="ds-class">--md</span> (h 20 / 24 / 28).</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.now-reading-cover</span></td><td>Vignette <strong>60×90</strong> (ratio 2:3), radius 4, <code>flex-shrink: 0</code>. Fallback dégradé + lettre (<span className="ds-class">.now-reading-cover-letter</span> 18/800) quand pas d&apos;image.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.now-reading-text</span></td><td>Titre / auteur / méta : <span className="ds-class">.now-reading-title</span> <code>16/700</code> (un cran au-dessus de <span className="ds-class">.book-title</span> pour différencier), <span className="ds-class">.now-reading-author</span> <code>15/500</code> <span className="ds-token-chip">--text-2</span>, <span className="ds-class">.book-meta</span> genre · année. Ellipsis.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.now-reading-menu-btn</span></td><td>Kebab « more actions » <strong>40×40</strong>, absolu <code>top:8 right:8</code>, ghost neutre à hover teinté primary. Icône trois points <strong>horizontaux</strong> (propre à Now Reading).</td><td>—</td></tr>
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
              <Redline boxSelector=".now-reading-cover" gapSelector={[".now-reading-body", ".now-reading-row", ".now-reading-text"]}>
                <NowReadingCardSpec hideMenu />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Padding <strong>16 / 56 / 16 / 16</strong> — le <strong>56</strong> à droite <em>réserve</em> le kebab (40 + 8 + marge ; masqué ici pour un coting propre). Corps empilé <span className="ds-class">.now-reading-body</span> gap <strong>16</strong> (badge → row) ; la row <span className="ds-class">.now-reading-row</span> aligne cover ↔ texte à gap <strong>16</strong> ; dans <span className="ds-class">.now-reading-text</span>, titre / auteur / méta à gap <strong>6</strong>. Cover cotée en boîte (60×90 · r4). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 4 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--stack-1240">
            <div className="ds-state-sample">
              <NowReadingCardSpec />
              <span className="ds-class">.now-reading-card</span>
            </div>
            <div className="ds-state-sample">
              <NowReadingCardSpec className="is-hover" />
              <span className="ds-class">:hover</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Repos : bord <span className="ds-token-chip">--border-subtle</span>. Hover : bord <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-3</span> — <strong>pas d&apos;ombre ni de lift</strong> (transition 0.22s). En contexte <span className="ds-class">.overview-card</span>, la carte bascule sur le registre tuile grise (<span className="ds-token-chip">--bg3</span> repos, <span className="ds-token-chip">--primary-10</span> hover, sans bord) iso <span className="ds-class">.book-chip-interactive</span>.</p>
        </div>
      </div>

      {/* 5 — QUICK ACTIONS (kebab) */}
      <div className="ds-card">
        <div className="ds-card-head">Quick actions · kebab</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>Action</th><th>Comportement</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td><strong>Mark as finished</strong></td><td>Ouvre la <span className="ds-class">Finish Reading Modal</span>.</td></tr>
              <tr className="table-row"><td><strong>Add a quote</strong></td><td>Ouvre <span className="ds-class">AddQuoteModal</span> pré-remplie du contexte livre (BookChip en Photo + Manual, sans champ à éditer).</td></tr>
              <tr className="table-row"><td><strong>Cancel reading</strong></td><td>Ouvre la <span className="ds-class">Delete Modal</span> (<code>type=cancelReading</code>) — le livre reste en bibliothèque, seulement retiré de Now Reading. Confirm <strong>non destructif</strong>.</td></tr>
            </tbody>
          </table>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Le menu (<span className="ds-class">.now-reading-menu-list</span>) réutilise <span className="ds-class">.dropdown-menu</span> + <span className="ds-class">.dropdown-divider</span> avant Cancel. Les trois actions font <code>stopPropagation</code> sur le clic de carte.</p>
        </div>
      </div>

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Capacité &amp; visibilité</div>
            <p>Max <strong>3</strong> livres simultanés (<code>MAX_READING</code>). La section <span className="ds-class">.now-reading-section</span> (grille <span className="ds-class">.now-reading-list</span>, <code>auto-fill minmax(320px, 1fr)</code>, gap 18) est <strong>masquée</strong> quand aucun livre n&apos;est en lecture.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Famille visuelle</div>
            <p>Même langage que la <a href="/ds/card/book"><strong>Book Card</strong></a> (radius, bord, hover, <code>fadeUp</code>) — layout <strong>horizontal</strong> pour se distinguer de la grille Library en dessous sans la concurrencer. Le badge primary plein ancre le statut « lecture active ».</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Ordre</div>
            <p><code>readingBooks</code> triés par <code>startedAt</code> décroissant (le plus récemment commencé en premier).</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
