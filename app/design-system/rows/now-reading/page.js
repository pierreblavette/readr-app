import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";

// Kebab horizontal (3 points côte à côte, stroke) — propre à Now Reading, comme la carte.
const NowReadingKebab = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" />
  </svg>
);

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
function NowReadingUnit({ hover = false, className = "", width = "min(402px, 100%)", date = "Started Apr 28", hideMenu = false }) {
  return (
    <div className={`ds-nr-box${hover ? " is-hover" : ""} ${className}`.trim()} style={{ width }}>
      <span className="now-reading-date">{date}</span>
      <NowReadingRow from="var(--primary-40)" to="var(--primary-60)" letter="A" title="A Brief History of Time" author="Stephen Hawking" genre="Science" year="1988" />
      {!hideMenu && (
        <div className="now-reading-menu">
          <button type="button" className="now-reading-menu-btn" aria-label="More actions"><NowReadingKebab /></button>
        </div>
      )}
    </div>
  );
}

const ANNOS = [
  { n: 1, side: "left", target: ".now-reading-date" },
  { n: 2, side: "left", target: ".now-reading-cover" },
  { n: 3, side: "right", target: ".now-reading-text" },
  { n: 4, side: "right", target: ".now-reading-menu-btn" },
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
            <NowReadingUnit className="ds-anno-organism" />
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
              <tr className="table-row"><td>4</td><td><span className="ds-class">.now-reading-menu-btn</span></td><td>Kebab « more actions » <strong>40×40</strong>, absolu <code>top:8 right:8</code>, ghost neutre à hover teinté primary. Icône trois points horizontaux (propre à Now Reading). Porté par la carte en prod.</td></tr>
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
              <Redline boxSelector=".now-reading-cover" gapSelector={[".now-reading-row", ".now-reading-text"]}>
                <NowReadingUnit width="var(--spec-w, 402px)" hideMenu />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Padding <strong>16</strong> uniforme — le kebab (masqué ici pour un coting propre) flotte en haut-droite au niveau du badge, sans colonne réservée. Corps empilé <span className="ds-class">.now-reading-body</span> gap <strong>16</strong> (badge → row) ; la row <span className="ds-class">.now-reading-row</span> aligne cover ↔ texte à gap <strong>16</strong> ; dans <span className="ds-class">.now-reading-text</span>, titre / auteur / méta à gap <strong>6</strong>. Cover cotée en boîte (60×90 · r4). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 4. STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
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
