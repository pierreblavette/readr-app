import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

// Trois états d'un bouton de langue : inactif (défaut), actif, survol.
const STATES = [
  ["Default", ""],
  ["Active", "active"],
  ["Hover", "is-hover"],
];

export default function LangSwitcherPage() {
  return (
    <DSSection
      id="lang-switcher"
      title="Language Switcher"
      sub="Le sélecteur de langue du pied de page : EN ou FR, en deux liens discrets. De la méta, pas une action de premier plan."
    >
      {/* ─────────── 1. STATES ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([label, mod]) => (
              <div key={label} className="ds-state-sample">
                <button type="button" className={`lang-btn${mod ? " " + mod : ""}`}>EN</button>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Ghost pur : couleur seule, pas de fond ni de bordure. Repos <span className="ds-token-chip">--text-3</span> (weight 500) · actif <span className="ds-token-chip">--text</span> (weight 600) · survol non-actif <span className="ds-token-chip">--text-2</span>. Une seule transition sur <code>color</code> (0.15s), aucun lift.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board">
            <Redline>
              <div className="lang-toggle">
                <button type="button" className="lang-btn active">EN</button>
                <span className="lang-sep">·</span>
                <button type="button" className="lang-btn">FR</button>
              </div>
            </Redline>
          </div>
          <p className="ds-note">Gap <strong>4</strong> mesuré à l&apos;exécution de part et d&apos;autre du séparateur. Le bouton n&apos;a qu&apos;un padding vertical de 2 — sa surface cliquable réelle est étendue à ~44×44 en mobile (voir Usage).</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Toggle</div>
            <p>Rangée flex, <code>align-items: center</code>, gap 4. Enveloppe les deux boutons et le séparateur.</p>
            <span className="ds-class">.lang-toggle</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Button</div>
            <p>font 11 / 500, <code>letter-spacing: 0.04em</code>, padding 2px 0, couleur <span className="ds-token-chip">--text-3</span>. <span className="ds-class">.active</span> → <span className="ds-token-chip">--text</span> + weight 600. Le poids qui change en plus de la couleur donne un repère lisible même pour un daltonien.</p>
            <span className="ds-class">.lang-btn</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Separator</div>
            <p>Point médian <code>·</code>, 11px, <span className="ds-token-chip">--text-3</span>, <code>pointer-events: none</code> — décoratif, jamais cliquable.</p>
            <span className="ds-class">.lang-sep</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Placement</div>
            <p>Section gauche du footer, à côté du wordmark. Discret par construction : le choix de langue est un réglage rare, il ne doit pas concurrencer le contenu.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Mobile hit area</div>
            <p>En dessous de 768px (et paysage court), un <code>::before</code> invisible étend la cible à <code>inset: -14px -10px</code> — ~44×44 tactile. Les boutons de 11px sont trop petits pour être tapés fiablement sans cette extension.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Footer de <code>library/page.js</code>. Bascule <code>lang</code> entre <code>en</code> et <code>fr</code>. EN est listé en premier, FR ensuite.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
