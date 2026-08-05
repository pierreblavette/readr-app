import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";

// Média-object : cover 60×90 + texte (titre, auteur, meta). Ni fond ni padding.
function NowReadingRow({ from, to, letter, title, author, genre, year, width, className = "" }) {
  return (
    <div className={`now-reading-row ${className}`.trim()} style={width ? { width } : undefined}>
      <div className="now-reading-cover now-reading-cover-empty" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
        <span className="now-reading-cover-letter">{letter}</span>
      </div>
      <div className="now-reading-text">
        <div className="now-reading-title">{title}</div>
        <div className="now-reading-author">{author}</div>
        <div className="book-meta">
          <span>{genre}</span>
          <span className="book-meta-sep" aria-hidden="true">·</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}

// La row telle qu'elle vit dans sa carte : badge date + média, boxée (.ds-nr-box).
function NowReadingUnit({ hover = false, className = "", width = "min(402px, 100%)", date = "Started on Aug 4" }) {
  return (
    <div className={`ds-nr-box${hover ? " is-hover" : ""} ${className}`.trim()} style={{ width }}>
      <span className="now-reading-date">{date}</span>
      <NowReadingRow from="#4959E6" to="#00A699" letter="D" title="Dune" author="Frank Herbert" genre="Science-fiction" year="1965" />
    </div>
  );
}

const ANNOS = [
  { n: 1, side: "top", target: ".now-reading-date" },
  { n: 2, side: "bottom", target: ".now-reading-cover" },
  { n: 3, side: "right", target: ".now-reading-text" },
];

export default function NowReadingRowPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="rows-now-reading"
      title="Now Reading Row"
      sub="La ligne d'une lecture en cours : un badge date, une grande vignette, le titre, l'auteur, le genre et l'année. La ligne de la liste « Currently reading »."
    >
      {/* 1. PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <NowReadingUnit />
          </div>
          </div>
          <p className="ds-note">Un <strong>badge date</strong> (« Started on… ») au-dessus d&apos;un média-object généreux : vignette <strong>60×90</strong>, titre <strong>16/700</strong>, et une ligne <span className="ds-class">.book-meta</span> (genre · année). Ni fond ni padding propres — c&apos;est la <em>carte</em> qui les porte et qui rend la ligne cliquable ; ici on la présente boxée pour la lisibilité.</p>
        </div>
      </div>

      {/* 2. ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={ANNOS} stack>
            <NowReadingUnit className="ds-anno-organism" date="Started on Jun 12" />
          </AnnoScene>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.now-reading-date</span></td><td>Badge date en tête : pill <span className="ds-token-chip">--primary-50</span>, texte <span className="ds-token-chip">--light-100</span>, 12/600. « Started on… ».</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.now-reading-cover</span></td><td>Vignette : <strong>60×90</strong>, radius 4. Sans image → <span className="ds-class">.now-reading-cover-empty</span> (dégradé + initiale 18/800).</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.now-reading-text</span></td><td>Corps : flex colonne, gap 6. Titre 16/700 · auteur 15/500 <span className="ds-token-chip">--text-2</span> · <span className="ds-class">.book-meta</span> (genre · année).</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.now-reading-row</span></td><td>Le média-object (cover + texte), en flex, gap <strong>16</strong>. Badge + row empilés dans <span className="ds-class">.now-reading-body</span> (gap 16).</td></tr>
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
              <Redline>
                <NowReadingUnit width={402} />
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Autour</strong> — padding <strong>16</strong> (porté par la carte), gap <strong>16</strong> entre le badge date et le média-object. <em>(La vraie carte réserve en plus ~56 à droite pour le kebab.)</em></p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".now-reading-cover">
                <NowReadingRow from="#4959E6" to="#00A699" letter="D" title="Dune" author="Frank Herbert" genre="Science-fiction" year="1965" width={402} />
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Média-object</strong> — <span className="ds-class">.now-reading-row</span> : gap <strong>16</strong> vignette → texte (contre 12 pour Book Row), vignette <strong>60×90</strong> (r4) cotée en boîte.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="now-reading-text" style={{ width: 402 }}>
                  <div className="now-reading-title">Dune</div>
                  <div className="now-reading-author">Frank Herbert</div>
                  <div className="book-meta"><span>Science-fiction</span><span className="book-meta-sep" aria-hidden="true">·</span><span>1965</span></div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Texte</strong> — <span className="ds-class">.now-reading-text</span> : gap <strong>6</strong> entre titre, auteur et <span className="ds-class">.book-meta</span>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 4. STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States · interactive</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <NowReadingUnit />
              <span className="ds-class">default</span>
            </div>
            <div className="ds-state-sample">
              <NowReadingUnit hover />
              <span className="ds-class">:hover</span>
            </div>
          </div>
          <p className="ds-note">La ligne entière est cliquable (elle ouvre le livre). Au hover, le fond passe à <span className="ds-token-chip">--primary-10</span>, sans lift — même vocabulaire que les autres rows. <em>(En prod, l&apos;enveloppe est une carte bordée : le hover y ajoute aussi le bord <span className="ds-token-chip">--primary-50</span> — voir Now Reading, famille Cards.)</em></p>
        </div>
      </div>

      {/* 5. USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Enveloppe · <span className="ds-cn">.now-reading-card</span></div>
            <p>En prod, la row vit dans une carte (bg <span className="ds-token-chip">--card</span> + bord + padding, dont ~56 à droite pour le <strong>kebab</strong>). La carte porte le clic et les états — voir <strong>Now Reading</strong> (famille Cards).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Où</div>
            <p>Section « Currently reading » de l&apos;Overview et bloc Now Reading de la bibliothèque. Une row par livre en cours.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Source</div>
            <p><code>NowReadingSection.js</code>. Cover résolue par titre/auteur, repli sur dégradé + initiale.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
