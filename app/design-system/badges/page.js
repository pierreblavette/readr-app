import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// height / font-size / padding lus dans library.css (.now-reading-date--*).
const SIZES = [
  ["xs", 20, "10/600 · padding 0 10 · inline meta dense"],
  ["sm", 24, "12/600 · padding 0 12 · default — Started on, etc."],
  ["md", 28, "13/600 · padding 0 14 · prominent callout"],
];

// Atome : un seul élément à annoter — la pill elle-même.
const ANNOS = [{ n: 1, side: "top", target: ".now-reading-date" }];

export default function BadgesPage() {
  return (
    <DSSection className="ds-scene-frame" id="badges" title="Badges" sub="La pastille compacte : quatre tons sémantiques, trois tailles, une même forme.">

      {/* ─────────── 1. PREVIEW — la pill par défaut (sm) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <span className="now-reading-date now-reading-date--md">Started on May 3</span>
          </div>
          </div>
          <p className="ds-note">Pill <strong>primary pleine</strong> — fond <span className="ds-token-chip">--primary-50</span>, texte blanc, weight 600. Un seul élément, pas d&apos;icône. Taille par défaut <strong>sm</strong> (meta inline).</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — atome + comportement min-width ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={ANNOS} stack>
            <div className="ds-anno-organism">
              <span className="now-reading-date now-reading-date--md">Started on May 3</span>
            </div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.now-reading-date</span></td><td>Pill <strong>atomique</strong> — un seul élément, pas de sous-partie. Fond primary plein (<span className="ds-token-chip">--primary-50</span> light · <span className="ds-token-chip">--primary-40</span> dark), texte blanc 600, radius pill, padding horizontal seul.</td><td>—</td></tr>
            </tbody>
          </table>
          <div className="ds-token-block">
            <div className="ds-token-name">Min-width = height</div>
            <p><code>min-width</code> égale la hauteur : un <strong>plancher</strong> qui empêche le badge de devenir plus étroit que haut — un badge d&apos;<strong>un seul caractère</strong> reste une pill compacte (jamais une lamelle verticale), un libellé long s&apos;étend, même hauteur. Le radius pill arrondit toujours les extrémités. C&apos;est la seule subtilité de forme du composant.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 3. SPACING — padding horizontal + hauteur (par taille) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            {SIZES.map(([mod]) => (
              <div key={mod} className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
                <Redline>
                  <span className={`now-reading-date now-reading-date--${mod}`} style={{ color: "var(--text)" }}>{mod.toUpperCase()}</span>
                </Redline>
              </div>
            ))}
          </div>
          <p className="ds-note">Padding <strong>horizontal seul</strong> — 10 / 12 / 14 selon la taille (aucun padding vertical : la hauteur est fixe). Specimen strippé (fond retiré, texte forcé en <span className="ds-token-chip">--text</span>) pour que les bandes de padding pleine hauteur restent lisibles — sur une pill conservée, l&apos;inset du radius les écraserait à zéro. Bandes et hauteur mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. SIZING — xs / sm / md ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {SIZES.map(([mod]) => (
              <div key={mod} className="ds-state-sample">
                <span className={`now-reading-date now-reading-date--${mod}`}>{mod.toUpperCase()}</span>
                <span className="ds-class">.now-reading-date--{mod}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {SIZES.map(([mod, h, spec]) => (
            <div key={mod} className="ds-token-block">
              <div className="ds-token-name">{mod.toUpperCase()} · {h}px</div>
              <p>{spec}.</p>
            </div>
          ))}
          <p className="ds-note"><strong>sm</strong> par défaut (meta inline) ; <strong>md</strong> pour un callout mis en avant, <strong>xs</strong> pour une meta dense. Même anatomie aux trois tailles.</p>
        </div>
      </div>

      {/* ─────────── 4b. TONES ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Tones</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <span className="now-reading-date now-reading-date--sm">Primary</span>
              <span className="ds-class">.now-reading-date</span>
            </div>
            <div className="ds-state-sample">
              <span className="overview-goal-pace--ahead"><span className="overview-goal-pace-delta">Success</span></span>
              <span className="ds-class">.overview-goal-pace-delta</span>
            </div>
            <div className="ds-state-sample">
              <span className="overview-goal-pace--behind"><span className="overview-goal-pace-delta">Warning</span></span>
              <span className="ds-class">.overview-goal-pace-delta</span>
            </div>
            <div className="ds-state-sample">
              <span className="panel-quiz-review-badge is-incorrect">Danger</span>
              <span className="ds-class">.panel-quiz-review-badge</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Quatre tons</div>
            <p><strong>Primary</strong> solide — fond <span className="ds-token-chip">--primary-50</span>, texte blanc · <strong>Success</strong> soft — fond <span className="ds-token-chip">--success-bg</span>, texte <span className="ds-token-chip">--success</span> · <strong>Warning</strong> soft — <span className="ds-token-chip">--warning-bg</span> / <span className="ds-token-chip">--warning</span> · <strong>Danger</strong> solide — <span className="ds-token-chip">--alert</span>, texte blanc. Primary et Danger pleins (texte blanc), Success et Warning teintés (texte coloré).</p>
          </div>
          <p className="ds-note"><strong>Dette</strong> : ces tons sont aujourd&apos;hui des <strong>classes séparées</strong> (<span className="ds-class">.now-reading-date</span> pour la date/compteur, <span className="ds-class">.overview-goal-pace-delta</span> pour le delta de pace, <span className="ds-class">.panel-quiz-review-badge</span> pour le quiz), pas un système unifié. Le composant Figma les modélise déjà en une seule famille <strong>Tone × Size</strong> — candidat à unifier en prod sous une classe <span className="ds-class">.badge</span> à modifieurs de ton.</p>
        </div>
      </div>

      {/* ─────────── 5. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Utilisé dans <code>NowReadingSection</code> (date de démarrage) et <code>BookPanel</code> (état Now Reading). La taille par défaut (sm) convient à de la meta inline — passer en <span className="ds-class">--md</span> pour un callout mis en avant.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
