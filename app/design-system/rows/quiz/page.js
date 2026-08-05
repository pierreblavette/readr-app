import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";

/* ── Question : le choix sélectionnable (row interactif du quiz) ── */
function Choice({ letter, text, selected = false, className = "", width }) {
  return (
    <button type="button" className={`panel-quiz-choice${selected ? " is-selected" : ""} ${className}`.trim()} style={width ? { width } : undefined}>
      <span className="panel-quiz-choice-letter">{letter}</span>
      <span className="panel-quiz-choice-text">{text}</span>
    </button>
  );
}

function QuestionBlock({ width = "min(402px, 100%)" }) {
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="panel-quiz-question">In which year was Dune first published?</div>
      <div className="panel-quiz-choices">
        <Choice letter="A" text="1959" />
        <Choice letter="B" text="1965" selected />
        <Choice letter="C" text="1971" />
        <Choice letter="D" text="1984" />
      </div>
    </div>
  );
}

/* ── Result : la ligne de revue (non interactive) ── */
function QuizRow({ correct, q, your, right, explanation, width = "min(402px, 100%)" }) {
  return (
    <li className={`panel-quiz-review-item ${correct ? "is-correct" : "is-incorrect"}`} style={{ listStyle: "none", width }}>
      <span className={`panel-quiz-review-badge ${correct ? "is-correct" : "is-incorrect"}`}>
        {correct ? "Correct" : "Incorrect"}
      </span>
      <div className="panel-quiz-review-q">{q}</div>
      <div className="panel-quiz-review-row">
        <span className="panel-quiz-review-label">Your answer</span>
        <span className="panel-quiz-review-value">{your}</span>
      </div>
      {!correct && (
        <div className="panel-quiz-review-row">
          <span className="panel-quiz-review-label">Correct answer</span>
          <span className="panel-quiz-review-value">{right}</span>
        </div>
      )}
      {explanation && <div className="panel-quiz-review-explanation">{explanation}</div>}
    </li>
  );
}

const CHOICE_ANNOS = [
  { n: 1, side: "top", target: ".panel-quiz-choice-letter" },
  { n: 2, side: "top", target: ".panel-quiz-choice-text" },
];

export default function QuizRowPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="rows-quiz"
      title="Quiz Row"
      sub="Les lignes du quiz d'un livre, en deux temps : la Question (un choix à sélectionner, interactif) puis le Result (le compte-rendu de la réponse, statique)."
    >
      {/* 1. PREVIEW — les deux formes */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview col" style={{ gap: 20 }}>
            <QuestionBlock />
            <QuizRow correct={false} q="Who is the author of 1984?" your="Aldous Huxley" right="George Orwell" width="min(402px, 100%)" />
          </div>
          </div>
          <p className="ds-note">En haut, la <strong>Question</strong> (pendant le quiz) : un énoncé et ses <strong>choix</strong> <span className="ds-class">.panel-quiz-choice</span> — cliquables, un seul sélectionné. En bas, le <strong>Result</strong> (revue de fin) : la ligne <span className="ds-class">.panel-quiz-review-item</span> — non interactive, le badge porte le statut.</p>
        </div>
      </div>

      {/* 2. VARIANTS — les deux phases */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · phase</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Question — <span className="ds-cn">.panel-quiz-choice</span></div>
            <p>Le choix : pastille lettre + texte, fond <span className="ds-token-chip">--bg3</span>, radius 8. <strong>Interactif</strong> — hover <span className="ds-token-chip">--primary-10</span>, focus clavier en anneau <span className="ds-token-chip">--primary-50</span>, et <span className="ds-class">.is-selected</span> = fond <span className="ds-token-chip">--primary-50</span> + texte blanc (la pastille s&apos;inverse en blanc). Miroir du <span className="ds-class">.panel-quote-item</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Result — <span className="ds-cn">.panel-quiz-review-item</span></div>
            <p>La ligne de revue : badge de statut + question + réponse(s). <strong>Non interactive</strong> — c&apos;est un compte-rendu. Fond neutre <span className="ds-token-chip">--bg3</span>, le badge (bleu / rouge) signale correct ou incorrect.</p>
          </div>
        </div>
      </div>

      {/* 3. ANATOMY — le choix (row interactif) */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy · choice</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={CHOICE_ANNOS} stack>
            <Choice className="ds-anno-organism" letter="B" text="1965" width="min(402px, 100%)" />
          </AnnoScene>
          </div>
        </div>
      </div>

      {/* 4. ELEMENTS */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>Element</th><th>Rôle</th><th>Forme</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td><span className="ds-class">.panel-quiz-choice</span></td><td>Le choix : flex, gap 12, padding <strong>10 / 12</strong>, bg <span className="ds-token-chip">--bg3</span>, radius 8, 15/500. <code>&lt;button&gt;</code>, <code>width: 100%</code>.</td><td>Question</td></tr>
              <tr className="table-row"><td><span className="ds-class">.panel-quiz-choice-letter</span></td><td>Pastille lettre : cercle <strong>24×24</strong>, 12/700 <span className="ds-token-chip">--text-2</span>. Sélectionnée → fond <span className="ds-token-chip">--light-100</span> + texte <span className="ds-token-chip">--primary-50</span>.</td><td>Question</td></tr>
              <tr className="table-row"><td><span className="ds-class">.panel-quiz-question</span></td><td>L&apos;énoncé au-dessus des choix : 16/600 <span className="ds-token-chip">--text</span>.</td><td>Question</td></tr>
              <tr className="table-row"><td><span className="ds-class">.panel-quiz-review-item</span></td><td>La ligne de revue : flex colonne, gap <strong>20</strong>, padding <strong>20</strong>, bg <span className="ds-token-chip">--bg3</span>, radius 8. <code>&lt;li&gt;</code>.</td><td>Result</td></tr>
              <tr className="table-row"><td><span className="ds-class">.panel-quiz-review-badge</span></td><td>Pill de statut : 12/600, texte <span className="ds-token-chip">--light-100</span>. <span className="ds-class">.is-correct</span> → <span className="ds-token-chip">--primary-50</span> · <span className="ds-class">.is-incorrect</span> → <span className="ds-token-chip">--alert</span>.</td><td>Result</td></tr>
              <tr className="table-row"><td><span className="ds-class">.panel-quiz-review-row</span></td><td>Paire label / valeur (« Your answer », « Correct answer ») : label overline 11/700, valeur 15/500.</td><td>Result</td></tr>
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
              <Redline boxSelector=".panel-quiz-choice-letter">
                <Choice letter="B" text="1965" width={402} />
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Question</strong> — <span className="ds-class">.panel-quiz-choice</span> : padding <strong>10 / 12</strong>, gap <strong>12</strong> pastille → texte, pastille <strong>24×24</strong> (cercle) cotée en boîte.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".panel-quiz-review-badge">
                <div className="panel-quiz-review-item" style={{ width: 402 }}>
                  <span className="panel-quiz-review-badge is-correct">Correct</span>
                  <div className="panel-quiz-review-q">In which year was Dune published?</div>
                  <div className="panel-quiz-review-row">
                    <span className="panel-quiz-review-label">Your answer</span>
                    <span className="panel-quiz-review-value">1965</span>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Result</strong> — <span className="ds-class">.panel-quiz-review-item</span> : padding <strong>20</strong> sur les 4 côtés, gap <strong>20</strong> uniforme entre badge, question et paires — le plus aéré, chaque row est un bloc de lecture. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 6. STATES · choice (interactif) */}
      <div className="ds-card">
        <div className="ds-card-head">States · choice</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <Choice letter="A" text="Default" width="min(402px, 100%)" />
              <span className="ds-class">.panel-quiz-choice</span>
            </div>
            <div className="ds-state-sample">
              <Choice letter="B" text="Hover" className="is-hover" width="min(402px, 100%)" />
              <span className="ds-class">:hover</span>
            </div>
            <div className="ds-state-sample">
              <Choice letter="C" text="Selected" selected width="min(402px, 100%)" />
              <span className="ds-class">.is-selected</span>
            </div>
          </div>
          <p className="ds-note">Seule la <strong>Question</strong> a des états (le Result est un compte-rendu). Hover <span className="ds-token-chip">--primary-10</span>, focus clavier en anneau <span className="ds-token-chip">--primary-50</span>, et <span className="ds-class">.is-selected</span> = fond <span className="ds-token-chip">--primary-50</span> + texte blanc, la pastille lettre s&apos;inversant en blanc.</p>
        </div>
      </div>

      {/* 7. USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Deux temps · <span className="ds-cn">BookQuiz</span></div>
            <p><strong>Pendant le quiz</strong> (<span className="ds-class">.panel-quiz-player</span>) : une question, ses choix <span className="ds-class">.panel-quiz-choice</span>, une barre de progression. <strong>À la fin</strong> (<span className="ds-class">.panel-quiz-review</span>) : une ligne <span className="ds-class">.panel-quiz-review-item</span> par question répondue.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Statut par la couleur</div>
            <p>Result : correct = <span className="ds-token-chip">--primary-50</span>, incorrect = <span className="ds-token-chip">--alert</span>. Le fond de la row reste neutre <span className="ds-token-chip">--bg3</span> — c&apos;est le badge qui signale, pas la boîte.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
