import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { DictionaryCardSpec, DICT_ANNOS, KebabDots } from "../_specs";

export default function DictionaryCardPage() {
  return (
    <DSSection className="ds-scene-frame" id="card-dictionary" title="Dictionary Card" sub="La carte d'un mot sauvegardé : un en-tête qu'on déplie pour lire ses définitions. Une carte en accordéon.">

      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview col" style={{ gap: 20 }}>
            <DictionaryCardSpec />
            <DictionaryCardSpec expanded />
          </div>
          </div>
          <p className="ds-note">Un mot sauvegardé, <strong>collapsible</strong> : l&apos;en-tête (<span className="ds-class">.dictionary-saved-head</span>) montre le <strong>terme</strong> + le kebab ; le clic déplie le <strong>corps</strong> avec ses définitions (nature, sens, exemple). Repos = replié, une seule ligne.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={DICT_ANNOS} stack>
            <div className="ds-anno-organism"><DictionaryCardSpec expanded /></div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.dictionary-saved-card</span></td><td>Coquille de la famille : radius <strong>8</strong> (<span className="ds-token-chip">--radius</span>), bord 1.5 <span className="ds-token-chip">--border-subtle</span>, <code>overflow: hidden</code>. Surface <span className="ds-token-chip">--bg2</span> (la seule carte de la famille sur bg2, pas <span className="ds-token-chip">--card</span> — voir Usage). <span className="ds-class">.expanded</span> quand le corps est ouvert.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.dictionary-saved-head</span></td><td>La rangée cliquable (<code>role=button</code>) : <span className="ds-class">.dictionary-chevron</span> (16, rotate 90° à l&apos;ouverture) + <span className="ds-class">.dictionary-saved-word</span> (15/600, ellipsis) dans un <span className="ds-class">.dictionary-saved-toggle</span>. Seul élément qui prend un fond au hover.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.col-card-kebab</span></td><td>Menu d&apos;actions 40×40 — voir <span className="ds-class">Kebab</span>. Ici une seule option (Delete word). <code>stopPropagation</code> pour ne pas déplier.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.dictionary-saved-body</span></td><td>Les définitions, visibles à l&apos;ouverture : <span className="ds-class">.dictionary-definition</span> = <span className="ds-class">.dictionary-pos</span> (nature) + <span className="ds-class">.dictionary-meaning</span> (sens) + <span className="ds-class">.dictionary-example</span>. Plusieurs définitions séparées d&apos;un <span className="ds-class">.panel-divider</span>.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
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
                <div className="dictionary-saved-head" style={{ width: "var(--spec-w, 400px)" }}>
                  <span className="dictionary-saved-toggle">
                    <svg className="dictionary-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                    <span className="dictionary-saved-word">Voiture</span>
                  </span>
                  <button type="button" className="col-card-kebab" aria-label="More"><KebabDots /></button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>En-tête</strong> — <span className="ds-class">.dictionary-saved-head</span> : padding <strong>8 / 16</strong> (16 gauche/droite, harmonisé avec toutes les heads dictionary), gap <strong>12</strong> entre le <span className="ds-class">.dictionary-saved-toggle</span> (chevron + mot) et le kebab. À l&apos;intérieur du toggle, chevron <strong>16</strong> → mot avec le même gap <strong>12</strong>. Kebab <strong>40×40</strong>.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="dictionary-saved-body" style={{ width: "var(--spec-w, 400px)" }}>
                  <div className="dictionary-definition">
                    <span className="dictionary-pos">nom féminin</span>
                    <p className="dictionary-meaning">Véhicule à roues mû par un moteur.</p>
                    <div className="dictionary-example">
                      <span className="dictionary-example-label">Exemple</span>
                      <p className="dictionary-example-text">Une voiture électrique.</p>
                    </div>
                  </div>
                  <div className="panel-divider" />
                  <div className="dictionary-definition">
                    <span className="dictionary-pos">nom féminin</span>
                    <p className="dictionary-meaning">Wagon de chemin de fer réservé aux voyageurs.</p>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Corps</strong> — <span className="ds-class">.dictionary-saved-body</span> : padding <strong>20 16</strong>, gap <strong>20</strong> entre définitions (le <span className="ds-class">.panel-divider</span> compte comme un enfant, d&apos;où deux gaps de 20 de part et d&apos;autre). Cotes mesurées à l&apos;exécution.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline padSelector=".dictionary-example">
                <div className="dictionary-definition" style={{ width: "var(--spec-w, 368px)" }}>
                  <span className="dictionary-pos">nom féminin</span>
                  <p className="dictionary-meaning">Véhicule à roues mû par un moteur, destiné au transport de personnes.</p>
                  <div className="dictionary-example">
                    <span className="dictionary-example-label">Exemple</span>
                    <p className="dictionary-example-text">Ils ont acheté une voiture électrique.</p>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Définition</strong> — <span className="ds-class">.dictionary-definition</span> : colonne sans padding propre, gap <strong>20</strong> empile nature (<span className="ds-class">.dictionary-pos</span>) → sens (<span className="ds-class">.dictionary-meaning</span>) → exemple (<span className="ds-class">.dictionary-example</span>). Le bloc exemple porte son propre padding vertical <strong>12</strong> (coté à droite).</p>

          <div className="ds-token-block">
            <div className="ds-token-name">Bloc exemple — <span className="ds-cn">.dictionary-example</span></div>
            <p>Encart <span className="ds-token-chip">--primary-5</span> : padding <strong>12 14</strong>, radius <strong>8</strong>, gap <strong>4</strong> entre le label et le texte. Détache l&apos;exemple du sens sans le séparer d&apos;un divider.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Pastille nature — <span className="ds-cn">.dictionary-pos</span></div>
            <p>Pill <span className="ds-token-chip">--primary-10</span> : padding <strong>3 10</strong>, radius <strong>20</strong> (pill), <code>width: fit-content</code> — elle ne s&apos;étire pas à la largeur du corps.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            <div className="ds-state-sample">
              <DictionaryCardSpec />
              <span className="ds-class">.dictionary-saved-card</span>
            </div>
            <div className="ds-state-sample">
              <DictionaryCardSpec className="is-hover" />
              <span className="ds-class">:hover</span>
            </div>
          </div>
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <DictionaryCardSpec expanded />
              <span className="ds-class">.expanded</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Repos et hover comparés côte à côte : au hover, bord <span className="ds-token-chip">--primary-50</span> (sans lift) + fond <span className="ds-token-chip">--primary-10</span> sur <em>l&apos;en-tête seul</em> — le corps reste neutre pour ne pas teinter la zone de lecture. En dessous, <span className="ds-class">.expanded</span> en pleine largeur : le hover de l&apos;en-tête passe alors transparent (l&apos;affordance de clic n&apos;a plus de sens, la carte est déjà ouverte).</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Deux surfaces</div>
            <p>La <strong>vue Dictionary</strong> rend le mot en <span className="ds-class">.dictionary-saved-row</span> (une <span className="ds-class">.list-row</span> dans une table par lettre A–Z), corps déplié en <code>&lt;tr&gt;</code> frère. Le panel <strong>Overview</strong> le rend en carte autonome <span className="ds-class">.dictionary-saved-card.overview-word-card</span>. Même en-tête, même corps — deux enveloppes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Surface bg2 — divergence assumée</div>
            <p>Seule carte de la famille sur <span className="ds-token-chip">--bg2</span> (les autres sur <span className="ds-token-chip">--card</span>). Héritage : à réconcilier avec la primitive <span className="ds-class">.card</span> partagée le jour où la famille est unifiée.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
