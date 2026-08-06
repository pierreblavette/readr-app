import DSSection from "../_components/DSSection";
import { Field } from "./_specs";

export default function InputsFoundationPage() {
  return (
    <DSSection className="ds-scene-frame" id="inputs" title="Text Input" sub="Les champs de saisie de l'app : un même socle — label, champ, message — décliné en champ texte, zone de texte et recherche.">

      {/* 1 — PREVIEW — le champ canonique */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <div style={{ width: 340 }}><Field /></div>
          </div>
          </div>
          <p className="ds-note">Le champ canonique (ici <a href="/design-system/inputs/text-field"><strong>Text Field</strong></a> en focus) : <span className="ds-class">.modal-field</span> empile <strong>label + champ + helper</strong> à gap constant. Le même socle habille les trois membres — seul le champ change de forme.</p>
        </div>
      </div>

      {/* 2 — SHELL LANGUAGE (le socle partagé) */}
      <div className="ds-card">
        <div className="ds-card-head">Shell language</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Conteneur — <span className="ds-cn">.modal-field</span></div>
            <p><code>flex</code> colonne, <strong>gap 8</strong> constant entre label / champ / message. C&apos;est lui qui rythme le champ ; les éléments n&apos;ont pas de marge propre.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Label — <span className="ds-cn">.modal-field-label</span></div>
            <p><code>13 / 500</code> <span className="ds-token-chip">--text-2</span>, <strong>toujours visible</strong>. Le placeholder ne le remplace jamais.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Champ</div>
            <p>Height 40, radius 8 (pill 32 pour la recherche), border 1.5 <strong>transparente au repos</strong> qui se colore <span className="ds-token-chip">--primary-50</span> + anneau <span className="ds-token-chip">--primary-20</span> au hover/focus — bg <span className="ds-token-chip">--bg3</span>. Le champ ne saute pas de taille à l&apos;interaction (la bordure occupe déjà sa place).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Message — <span className="ds-cn">.modal-field-hint</span></div>
            <p>Helper <em>permanent</em> <code>13 / 500</code> <span className="ds-token-chip">--text-2</span>, remplacé par un message d&apos;erreur/warning quand la validation échoue — <strong>jamais les deux</strong>.</p>
          </div>
        </div>
      </div>

      {/* 3 — CONTENT (doctrine d'écriture) */}
      <div className="ds-card">
        <div className="ds-card-head">Content</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Label</div>
            <p>Court, en <em>title case</em> léger, sans deux-points. Décrit la donnée attendue (« Title », « Author »), pas une action. Toujours visible.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Placeholder</div>
            <p>Un <em>exemple</em> de format (« e.g. 978-0-571-33465-0 »), jamais une consigne ni un substitut de label. Il disparaît à la saisie.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Message d&apos;erreur</div>
            <p>Dit <em>quoi</em> et <em>comment corriger</em> (« Title is required »), au présent, sans jargon. Concis — une ligne.</p>
          </div>
        </div>
      </div>

      {/* 4 — FAMILY */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name"><a href="/design-system/inputs/text-field"><strong>Text Field</strong></a> — le classique</div>
            <p>Le socle brut : <span className="ds-class">.modal-field-input</span> (height 40, radius 8). Ses states (default / hover / focus / disabled), son échelle (sm / md / lg) et ses variantes de validation (error / warning / read-only) sont documentés là.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><a href="/design-system/inputs/textarea"><strong>Textarea</strong></a> — multi-lignes</div>
            <p><span className="ds-class">.quote-textarea</span> : même socle avec un padding vertical rétabli (12 14) et <code>resize: vertical</code>. Pour les textes longs — citations, notes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><a href="/design-system/inputs/search"><strong>Search Field</strong></a> — recherche</div>
            <p><span className="ds-class">.search-box</span> : le socle en <strong>pill</strong> (radius 32), loupe à gauche + bouton clear à droite, bord visible car il vit sur fond de page (pas dans une modale).</p>
          </div>
        </div>
      </div>

      {/* 5 — USAGE · reference */}
      <div className="ds-card">
        <div className="ds-card-head">Usage · reference</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Text field</div>
            <p><span className="ds-class">.modal-field input</span> · <span className="ds-class">.scan-manual-input</span> · <span className="ds-class">.col-name-input</span> · <span className="ds-class">.quote-link-select-input</span> — mêmes cotes, contextes différents (AddModal, scan ISBN, nom de collection).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Search</div>
            <p><span className="ds-class">.search-box</span> (Library, Wishlist, Dictionary) · <span className="ds-class">.authors-search-input</span> (menu Authors, variante radius 8).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Message</div>
            <p>Erreurs de champ affichées via <span className="ds-class">.modal-error</span>. Message riche avec icône : réutiliser <span className="ds-class">.modal-toggle-message</span> jusqu&apos;à généralisation en <span className="ds-class">.modal-field-message</span>.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
