"use client";
import { useState } from "react";
import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

const StarPath = () => (
  <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
);

// Saisie statique (doc) — markup identique à FinishReadingModal.
function StarInput({ filled = 0, className = "" }) {
  return (
    <div className={`finish-stars${className ? " " + className : ""}`} role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" role="radio" aria-checked={filled === n} className={`finish-star${n <= filled ? " filled" : ""}`}>
          <svg viewBox="0 0 24 24" fill="currentColor"><StarPath /></svg>
        </button>
      ))}
    </div>
  );
}

// Saisie live — hover pré-remplit jusqu'au curseur, clic fige (comme la modale).
function LiveStarInput() {
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className="finish-stars" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onClick={() => setValue(n)}
          onMouseEnter={() => setHover(n)}
          className={`finish-star${n <= display ? " filled" : ""}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor"><StarPath /></svg>
        </button>
      ))}
    </div>
  );
}

// Affichage read-only — div + svg, .is-filled quand value >= n.
function StarsDisplay({ variant, value = 0, filledAll = false }) {
  return (
    <div className={variant} aria-label={`Rating ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" fill="currentColor" className={filledAll || value >= n ? "is-filled" : ""}>
          <StarPath />
        </svg>
      ))}
    </div>
  );
}

const STATES = [
  ["Empty", 0],
  ["Hover — preview", 3],
  ["Set", 4],
];

// Décomposition numérotée : groupe (1) + étoile vide (2) + étoile pleine (3).
const ANNOS = [
  { n: 1, side: "top", target: ".finish-stars" },
  { n: 2, side: "bottom", target: ".finish-star:not(.filled)" },
  { n: 3, side: "bottom", target: ".finish-star.filled" },
];

export default function RatingStarsPage() {
  return (
    <DSSection
      id="rating-stars"
      title="Rating Stars"
      sub="La note sur 5 étoiles : qu'on donne à la fin d'une lecture, et qu'on retrouve affichée un peu partout ensuite."
    >
      {/* ─────────── 1. PREVIEW — saisie live ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <LiveStarInput />
          </div>
          </div>
          <p className="ds-note">Specimen <strong>live</strong> — survole pour prévisualiser jusqu&apos;au curseur (aperçu <code>display = hover || value</code>), clique pour figer la note. Pleine <span className="ds-token-chip">--primary-50</span>, vide <span className="ds-token-chip">--border</span>. Pas de demi-étoile.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <StarInput filled={3} className="ds-anno-organism" />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.finish-stars</span></td><td>Groupe : rangée <code>flex</code>, gap 4, <code>role=&quot;radiogroup&quot;</code>. Sans fond ni boîte — la saisie vit déjà dans un champ de la modale.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.finish-star</span></td><td>Bouton étoile : ghost, padding 4, svg 28×28 (boîte 36), <code>role=&quot;radio&quot;</code> + <code>aria-checked</code>. Couleur vide <span className="ds-token-chip">--border</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.filled</span></td><td>Étoile remplie : <span className="ds-token-chip">--primary-50</span> (<span className="ds-token-chip">--primary-40</span> dark), transition <code>color</code> 0.12s. Posée jusqu&apos;à la note (ou au survol).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — boîte tactile + gap ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><StarsDisplay variant="overview-stars" value={4} /></Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><StarsDisplay variant="rating-stars-inline" filledAll /></Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><StarsDisplay variant="panel-rating-stars" value={4} /></Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".finish-star"><StarInput filled={4} /></Redline>
            </div>
          </div>
          <p className="ds-note">De la plus petite à la plus grande : <strong>read-only</strong> overview (gap 3, étoile 14) · inline (gap 2, étoile 16) · panel (boîte, padding 14, étoile 20) ; puis la <strong>saisie</strong> <span className="ds-class">.finish-star</span> <strong>36×36</strong> (svg 28 + padding 4, gap 4) — le padding porte la cible tactile sans agrandir l&apos;étoile. La taille d&apos;étoile est cotée une fois par planche. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — saisie interactive ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([label, n]) => (
              <div key={label} className="ds-state-sample">
                <StarInput filled={n} />
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Empty : toutes <span className="ds-token-chip">--border</span>. Hover : remplies <strong>jusqu&apos;au curseur</strong> (aperçu). Set : figées à la note cliquée. Un seul traitement pleine/vide pour les trois.</p>
        </div>
      </div>

      {/* ─────────── 5. VARIANTS · read-only ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · read-only</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <StarsDisplay variant="panel-rating-stars" value={4} />
              <span className="ds-class">.panel-rating-stars</span>
            </div>
            <div className="ds-state-sample">
              <StarsDisplay variant="overview-stars" value={4} />
              <span className="ds-class">.overview-stars</span>
            </div>
            <div className="ds-state-sample">
              <StarsDisplay variant="rating-stars-inline" filledAll />
              <span className="ds-class">.rating-stars-inline</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Boxed (panel) · svg 20</div>
            <p>Boîte teintée <span className="ds-token-chip">--bg3</span>, padding 12/14, radius 8, gap 4. Affichage proéminent dans BookPanel / DeleteModal.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Compact (overview) · svg 14</div>
            <p>Sans boîte, gap 3, padding 4px 0. Se glisse sous le titre d&apos;un Book Chip ou dans une carte Overview. Même logique vide/pleine que la saisie.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Inline (menu) · svg 16 / 18</div>
            <p><strong>Toujours pleine</strong> — couleur <span className="ds-token-chip">--primary-50</span> portée par le conteneur, pas par étoile. svg 16, ou 18 dans un <span className="ds-class">.dropdown-item-label</span>, gap 2.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 6. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Set vs display</div>
            <p>La note se <strong>saisit</strong> une seule fois, dans Finish Reading Modal (<span className="ds-class">.finish-star</span>, 28px, interactif). Partout ailleurs elle est <strong>relue</strong> via l&apos;une des trois variantes read-only — jamais re-saisissable hors de la modale.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility</div>
            <p>Saisie : <code>role=&quot;radiogroup&quot;</code> + boutons <code>role=&quot;radio&quot;</code>/<code>aria-checked</code>. Affichage : <code>aria-label=&quot;Rating N out of 5&quot;</code> sur le conteneur — les étoiles décoratives ne sont pas lues une à une.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><span className="ds-class">.finish-star</span> : FinishReadingModal · <span className="ds-class">.panel-rating-stars</span> : BookPanel, DeleteModal · <span className="ds-class">.overview-stars</span> : Book Chip, Overview · <span className="ds-class">.rating-stars-inline</span> : labels de menu.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
