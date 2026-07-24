import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

const StarPath = () => (
  <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
);

// Saisie interactive — markup identique à FinishReadingModal (boutons radio,
// .filled jusqu'à N). Statique ici : la valeur est posée en dur pour la doc.
function StarInput({ filled = 0 }) {
  return (
    <div className="finish-stars" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" role="radio" aria-checked={filled === n} className={`finish-star${n <= filled ? " filled" : ""}`}>
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

export default function RatingStarsPage() {
  return (
    <DSSection
      id="rating-stars"
      title="Rating Stars"
      sub="Note sur 5 — saisie interactive dans Finish Reading (28px, radiogroup), puis restituée en read-only ailleurs à trois tailles. Étoiles pleines en primary, vides en border."
    >
      {/* ─────────── 1. STATES — saisie interactive ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {STATES.map(([label, n]) => (
              <div key={label} className="ds-state-sample">
                <StarInput filled={n} />
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">La saisie (<span className="ds-class">.finish-stars</span>) est un <code>radiogroup</code> de cinq boutons. Au survol, les étoiles se remplissent <strong>jusqu&apos;au curseur</strong> (aperçu <code>display = hover || value</code>) ; le clic fige la note. Pleine <span className="ds-token-chip">--primary-50</span> (<span className="ds-token-chip">--primary-40</span> dark), vide <span className="ds-token-chip">--border</span>. Pas de demi-étoile.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — la saisie 28px ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board">
            <Redline boxSelector=".finish-star">
              <StarInput filled={4} />
            </Redline>
          </div>
          <p className="ds-note">Gap 4 mesuré entre les cinq boutons. Chaque bouton <span className="ds-class">.finish-star</span> fait 36×36 (svg 28 + padding 4 tout autour) — le padding porte la cible tactile au-delà du glyphe, sans agrandir l&apos;étoile visible.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Star group</div>
            <p>Rangée flex, gap 4, <code>role=&quot;radiogroup&quot;</code>. Sans fond ni boîte — la saisie vit déjà dans un champ de la modale.</p>
            <span className="ds-class">.finish-stars</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Star button</div>
            <p>Bouton ghost, padding 4, svg 28×28, <code>role=&quot;radio&quot;</code> + <code>aria-checked</code>. Couleur vide <span className="ds-token-chip">--border</span> ; <span className="ds-class">.filled</span> → <span className="ds-token-chip">--primary-50</span>, transition <code>color</code> 0.12s.</p>
            <span className="ds-class">.finish-star</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. VARIANTS — affichages read-only ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · read-only</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><StarsDisplay variant="panel-rating-stars" value={4} /></Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><StarsDisplay variant="overview-stars" value={4} /></Redline>
            </div>
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline><StarsDisplay variant="rating-stars-inline" filledAll /></Redline>
            </div>
          </div>
          <p className="ds-note">De haut en bas : panel (boîte, padding 14, étoile 20), overview (sans boîte, gap 3, étoile 14), inline (gap 2, étoile 16, toujours pleine). La taille d&apos;étoile n&apos;est cotée qu&apos;une fois par planche — cinq étoiles identiques ne répètent plus leur nombre.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Boxed (panel) · svg 20</div>
            <p>Boîte teintée <span className="ds-token-chip">--bg3</span>, padding 12/14, radius 8, gap 4. Affichage proéminent dans BookPanel / DeleteModal.</p>
            <span className="ds-class">.panel-rating-stars</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Compact (overview) · svg 14</div>
            <p>Sans boîte, gap 3, padding 4px 0. Se glisse sous le titre d&apos;un Book Chip ou dans une carte Overview. Même logique vide/pleine que la saisie.</p>
            <span className="ds-class">.overview-stars</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Inline (menu) · svg 16 / 18</div>
            <p><strong>Toujours pleine</strong> — couleur <span className="ds-token-chip">--primary-50</span> portée par le conteneur, pas par étoile (n&apos;affiche qu&apos;une note déjà connue). svg 16, ou 18 dans un <span className="ds-class">.dropdown-item-label</span>, gap 2.</p>
            <span className="ds-class">.rating-stars-inline</span>
          </div>
        </div>
      </div>

      {/* ─────────── 4. USAGE ─────────── */}
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
