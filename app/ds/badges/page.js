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
      <div className="ds-card">
        <div className="ds-card-head">Date badge · sizes</div>
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
          <p className="ds-note">
            {SIZES.map(([mod, h, use], i) => (
              <span key={mod}>{i > 0 && <br />}<strong>--{mod}</strong> · {h}px · {use}</span>
            ))}
          </p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy — XS → MD</div>
        <div className="ds-card-body col">
          {/* Une planche par taille (comme Buttons). Specimen strippé (règle globale :
              sans radius, bg blanc) ; texte du badge forcé en --text pour rester
              lisible une fois le fond retiré. Les bandes cotent le padding horizontal
              (10 / 12 / 14) + la hauteur ; la largeur dépend du texte, on ne la cote pas. */}
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
            <div className="ds-token-name">.now-reading-date · primary pill (base)</div>
            <p>Solid primary fill (<span className="ds-token-chip">--primary-50</span> light · <span className="ds-token-chip">--primary-40</span> dark) · white text · pill · weight 600. Default size = sm.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">--xs / --sm / --md · size modifiers</div>
            <p>height 20 / 24 / 28 · font-size 10 / 12 / 13 · padding 0 10 / 0 12 / 0 14. <code>min-width</code> égale la hauteur : un badge d&apos;un seul caractère reste une pastille ronde au lieu de s&apos;écraser en ovale.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <p>Utilisé dans <code>NowReadingSection</code> (date de démarrage) et <code>BookPanel</code> (état Now Reading). La taille par défaut (sm) convient à de la meta inline — passer en <code>--md</code> pour un callout mis en avant.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
