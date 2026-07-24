import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

// height / font-size / padding lus dans library.css (.now-reading-date--*).
const SIZES = [
  ["xs", 20, "10/600 · padding 0 10 · inline meta dense"],
  ["sm", 24, "12/600 · padding 0 12 · default — Started on, etc."],
  ["md", 28, "13/600 · padding 0 14 · prominent callout"],
];

export default function BadgesPage() {
  return (
    <DSSection id="badges" title="Badges" sub="Pill primary pleine — date de démarrage de lecture. Trois tailles, même anatomie.">
      {/* ─────────── 1. SIZES — le board (pas d'états : badge statique) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizes</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {SIZES.map(([mod]) => (
              <div key={mod} className="ds-state-sample">
                <span className={`now-reading-date now-reading-date--${mod}`}>{mod.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Trois tailles, même anatomie. <strong>sm</strong> par défaut (meta inline) ; <strong>md</strong> pour un callout mis en avant, <strong>xs</strong> pour une meta dense.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — une planche par taille ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          {/* Specimen strippé (règle globale : sans radius, bg blanc) ; texte forcé en
              --text pour rester lisible une fois le fond retiré. Les bandes cotent le
              padding horizontal (10 / 12 / 14) + la hauteur ; la largeur dépend du texte. */}
          <div className="ds-redline-board">
            {SIZES.map(([mod]) => (
              <div key={mod} className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
                <Redline>
                  <span className={`now-reading-date now-reading-date--${mod}`} style={{ color: "var(--text)" }}>{mod.toUpperCase()}</span>
                </Redline>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Primary pill (base)</div>
            <p>Fond primary plein (<span className="ds-token-chip">--primary-50</span> light · <span className="ds-token-chip">--primary-40</span> dark) · texte blanc · pill · weight 600. Taille par défaut = sm.</p>
            <span className="ds-class">.now-reading-date</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Size modifiers</div>
            <p><span className="ds-class">.now-reading-date--xs</span> / <span className="ds-class">--sm</span> / <span className="ds-class">--md</span> : height 20 / 24 / 28 · font 10 / 12 / 13 · padding 0 10 / 0 12 / 0 14. <code>min-width</code> égale la hauteur — un badge d&apos;un seul caractère reste une pastille ronde au lieu de s&apos;écraser en ovale.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 3. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <p>Utilisé dans <code>NowReadingSection</code> (date de démarrage) et <code>BookPanel</code> (état Now Reading). La taille par défaut (sm) convient à de la meta inline — passer en <span className="ds-class">--md</span> pour un callout mis en avant.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
