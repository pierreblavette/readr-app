import DSSection from "../_components/DSSection";

// Reprise exacte des suggestions telles que l'API les renvoie : titre + sep + auteur.
const SUGGESTIONS = [
  ["1984", "George Orwell"],
  ["Nineteen Eighty-Four", "George Orwell"],
  ["1984 (annotated)", "Various"],
];

export default function AutocompletePage() {
  return (
    <DSSection
      id="autocomplete"
      title="Autocomplete"
      sub="Liste de suggestions sous le champ Title de l'AddModal, alimentée par l'API de recherche."
    >
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          {/* Markup identique à AddModal (.modal-field > label + input + ul.open) :
              la doc monte le composant réel, elle ne le redessine pas. La liste
              est en position:absolute sous le champ — d'où la réserve de hauteur
              portée par .ds-autocomplete-stage, sinon elle sortirait de la carte. */}
          <div className="ds-autocomplete-stage">
            <div className="modal-field">
              <label>Title</label>
              <input defaultValue="1984" autoComplete="off" readOnly />
              <ul className="autocomplete-list open">
                {SUGGESTIONS.map(([title, author], i) => (
                  <li key={title} className={`autocomplete-item${i === 0 ? " focused" : ""}`}>
                    {title}
                    <span className="autocomplete-sep">·</span>
                    <span>{author}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">.autocomplete-list · container</div>
            <p>
              Positionné <code>absolute</code> à <code>top: calc(100% + 4px)</code> du <code>.modal-field</code>, tendu <code>left/right: 0</code> — il épouse donc la largeur du champ, jamais une largeur fixe. Bg <span className="ds-token-chip">--card</span>, border 1.5px <span className="ds-token-chip">--border-subtle</span>, radius 10, padding 4, ombre <span className="ds-token-chip">--shadow-lg</span>, <code>z-index: 700</code>.
            </p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.autocomplete-list.open · visibilité</div>
            <p>Le conteneur est <code>display: none</code> par défaut, la classe <code>.open</code> le révèle. L&apos;état vide n&apos;existe pas : le composant n&apos;est monté que si l&apos;API renvoie au moins une suggestion.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.autocomplete-item · suggestion</div>
            <p>Padding 10/14, font 15/600/<span className="ds-token-chip">--text</span>, radius 6 — soit le radius du conteneur (10) moins son padding (4), règle des rayons imbriqués. Contrat identique à <code>.dropdown-item</code> : une rangée sélectionnable dans une liste flottante s&apos;écrit pareil partout. Troncature par <code>text-overflow: ellipsis</code> — un titre long ne casse jamais la hauteur de rangée.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.autocomplete-item:hover · .focused</div>
            <p>Même traitement pour la souris et le clavier : bg <span className="ds-token-chip">--primary-5</span>, color <span className="ds-token-chip">--primary-50</span> (<span className="ds-token-chip">--primary-40</span> en dark). Un seul état visuel pour deux modes d&apos;entrée — la navigation aux flèches se lit comme un survol.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.autocomplete-sep + span · auteur</div>
            <p>Info secondaire inline : séparateur <span className="ds-token-chip">--text-3</span> puis auteur en 14/400/<span className="ds-token-chip">--text-2</span>, <code>margin-left: 8</code> chacun.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Comportement</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Défilement</div>
            <p><code>max-height: 220px</code> + <code>overflow-y: auto</code> — au-delà de ~5 suggestions la liste défile au lieu de pousser la modale.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sélection</div>
            <p>Déclenchée sur <code>onMouseDown</code>, pas <code>onClick</code> : le <code>click</code> arrive après le <code>blur</code> du champ, qui a déjà démonté la liste — la suggestion ne serait jamais sélectionnée. Elle pré-remplit titre + auteur.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Clavier</div>
            <p>Flèches haut/bas déplacent <code>.focused</code>, Enter valide, Escape ferme. L&apos;index actif est porté par l&apos;état du composant parent, pas par le focus DOM (le champ garde le focus pendant la navigation).</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <p>Deux consommateurs : <code>AddModal</code> (champ Title, onglet Manual) et <code>AddQuoteModal</code> (recherche du livre rattaché). Toute nouvelle occurrence doit réutiliser ces classes plutôt que de recréer une liste de suggestions.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
