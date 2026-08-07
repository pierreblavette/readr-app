import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";

const Chevron = ({ open }) => (
  <svg className={`dictionary-chevron${open ? " open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// Head de la forme .overview-word-card : toggle (chevron + mot) SEUL, pas de kebab.
function Head({ word, open }) {
  return (
    <div className="dictionary-saved-head" role="button" tabIndex={0} aria-expanded={!!open}>
      <span className="dictionary-saved-toggle">
        <Chevron open={open} />
        <span className="dictionary-saved-word">{word}</span>
      </span>
    </div>
  );
}

function Body() {
  return (
    <div className="dictionary-saved-body">
      <div className="dictionary-definition">
        <span className="dictionary-pos">noun</span>
        <p className="dictionary-meaning">The occurrence of events by chance in a happy way.</p>
        <div className="dictionary-example">
          <span className="dictionary-example-label">Example</span>
          <p className="dictionary-example-text">A fortunate stroke of serendipity.</p>
        </div>
      </div>
    </div>
  );
}

// .dictionary-saved-card.overview-word-card : la forme du WordListPanel (panel-inner).
function DictCard({ word = "Serendipity", open = false, className = "", width = "min(402px, 100%)" }) {
  return (
    <div className={`dictionary-saved-card overview-word-card${open ? " expanded" : ""} ${className}`.trim()} style={{ width }}>
      <Head word={word} open={open} />
      {open && <Body />}
    </div>
  );
}

const ANNOS = [
  { n: 1, side: "top", target: ".dictionary-chevron" },
  { n: 2, side: "top", target: ".dictionary-saved-word" },
];

export default function DictionaryRowPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="rows-dictionary"
      title="Dictionary Row"
      sub="La ligne d'un mot enregistré : un chevron, le mot, et un corps de définitions qui se déplie au clic. La forme accordéon du panel Overview (WordListPanel)."
    >
      {/* 1. PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview col" style={{ gap: 20 }}>
            <DictCard word="Ephemeral" />
            <DictCard word="Serendipity" open />
          </div>
          </div>
          <p className="ds-note">La row la plus dépouillée de la famille : <strong>chevron + mot</strong>. Cliquable — le clic fait pivoter le chevron et déplie le corps de définitions. C&apos;est la forme <span className="ds-class">.overview-word-card</span> (panel Overview) : fond <span className="ds-token-chip">--bg3</span>, <strong>sans bord</strong> ni kebab. La forme carte bordée avec kebab est documentée dans <strong>Dictionary Card</strong> (famille Cards).</p>
        </div>
      </div>

      {/* 2. ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={ANNOS} stack>
            <DictCard className="ds-anno-organism" word="Serendipity" />
          </AnnoScene>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>Element</th><th>Rôle</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td><span className="ds-class">.overview-word-card</span></td><td>Le conteneur : modifier de <span className="ds-class">.dictionary-saved-card</span> qui neutralise le bord (transparent) et pose le fond <span className="ds-token-chip">--bg3</span>. <span className="ds-class">.expanded</span> quand le corps est ouvert.</td></tr>
              <tr className="table-row"><td><span className="ds-class">.dictionary-saved-head</span></td><td>La rangée cliquable (<code>role=button</code>) : flex, <code>align-items: center</code>, padding <strong>13 / 16</strong>. Hover <span className="ds-token-chip">--primary-10</span> — neutralisé une fois dépliée.</td></tr>
              <tr className="table-row"><td><span className="ds-class">.dictionary-saved-toggle</span></td><td>Groupe chevron + mot, gap 12, <code>flex: 1</code>, <code>min-width: 0</code>.</td></tr>
              <tr className="table-row"><td><span className="ds-class">.dictionary-chevron</span></td><td>Chevron 16×16 <span className="ds-token-chip">--text-2</span>. <code>.open</code> → <code>rotate(90deg)</code>, passe <span className="ds-token-chip">--primary-50</span> au hover.</td></tr>
              <tr className="table-row"><td><span className="ds-class">.dictionary-saved-word</span></td><td>Le mot : <strong>15/600</strong> <span className="ds-token-chip">--text</span>, <code>ellipsis</code>.</td></tr>
              <tr className="table-row"><td><span className="ds-class">.dictionary-saved-body</span></td><td>Sibling déplié : fond <span className="ds-token-chip">--card</span> + <strong>border-top</strong> (divider), padding 20 / 16. Contient les <span className="ds-class">.dictionary-definition</span>.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxPadSelector=".dictionary-saved-head" gapSelector=".dictionary-saved-toggle">
                <div className="dictionary-saved-card overview-word-card" style={{ width: 402 }}>
                  <Head word="Serendipity" />
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>En-tête</strong> — <span className="ds-class">.dictionary-saved-head</span> : padding <strong>13 / 16</strong> — <strong>16 gauche/droite</strong>, harmonisé avec toutes les heads dictionary (13 haut/bas pour la hauteur de la row Overview). Dans le toggle, chevron <strong>16×16</strong> → mot avec un gap <strong>12</strong>.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="dictionary-saved-body" style={{ width: 402 }}>
                  <div className="dictionary-definition">
                    <span className="dictionary-pos">noun</span>
                    <p className="dictionary-meaning">The occurrence of events by chance in a happy way.</p>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Corps</strong> — <span className="ds-class">.dictionary-saved-body</span> : padding <strong>20 / 16</strong>. Le plus souvent une seule définition ; s&apos;il y en a plusieurs, elles sont séparées d&apos;un <span className="ds-class">.panel-divider</span> avec un gap <strong>20</strong> de part et d&apos;autre.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline padSelector=".dictionary-example">
                <div className="dictionary-definition" style={{ width: 402 }}>
                  <span className="dictionary-pos">noun</span>
                  <p className="dictionary-meaning">The occurrence of events by chance in a happy way.</p>
                  <div className="dictionary-example">
                    <span className="dictionary-example-label">Example</span>
                    <p className="dictionary-example-text">A fortunate stroke of serendipity.</p>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Définition</strong> — <span className="ds-class">.dictionary-definition</span> : colonne sans padding propre, gap <strong>20</strong> empile nature (<span className="ds-class">.dictionary-pos</span>) → sens (<span className="ds-class">.dictionary-meaning</span>) → exemple (<span className="ds-class">.dictionary-example</span>). Le bloc exemple porte son propre padding vertical <strong>12</strong> (coté à droite).</p>

          <div className="ds-token-block">
            <div className="ds-token-name">Bloc exemple — <span className="ds-cn">.dictionary-example</span></div>
            <p>Encart <span className="ds-token-chip">--primary-5</span> : padding <strong>12 / 14</strong>, radius <strong>8</strong>, gap <strong>4</strong> entre le label et le texte.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Pastille nature — <span className="ds-cn">.dictionary-pos</span></div>
            <p>Pill <span className="ds-token-chip">--primary-10</span> : padding <strong>3 / 10</strong>, radius <strong>20</strong> (pill), <code>width: fit-content</code>.</p>
          </div>
        </div>
      </div>

      {/* 4. BEHAVIOR — accordéon */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · expand</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--hold">
            <div className="ds-state-sample">
              <DictCard word="Collapsed" />
              <span className="ds-class">default</span>
            </div>
            <div className="ds-state-sample">
              <DictCard word="Collapsed" className="is-hover" />
              <span className="ds-class">:hover</span>
            </div>
          </div>
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <DictCard word="Expanded" open />
              <span className="ds-class">.expanded</span>
            </div>
          </div>
          <p className="ds-note">Repos et hover de la head comparés côte à côte : au hover, fond <span className="ds-token-chip">--primary-10</span> (sans lift). En dessous, <span className="ds-class">.expanded</span> en pleine largeur : clic (ou Enter / Espace) → le chevron pivote à 90° et le corps se déplie sous la head, en <span className="ds-token-chip">--card</span> avec un <strong>border-top</strong> qui le sépare ; le hover de la head est alors retiré.</p>
        </div>
      </div>

      {/* 5. USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Où</div>
            <p><span className="ds-cn">WordListPanel</span> (panel Overview) : chaque mot en <span className="ds-class">.dictionary-saved-card.overview-word-card</span>. La <strong>vue Dictionary</strong> (tables A–Z) rend le même toggle dans une <span className="ds-class">.list-row</span> (<span className="ds-class">.list-cell-title</span> + kebab en <span className="ds-class">.list-cell-action</span>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Contrepartie</div>
            <p>Sa forme carte bordée (bg2, bord, kebab) est <strong>Dictionary Card</strong> (famille Cards) — même mot, enveloppe différente.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
