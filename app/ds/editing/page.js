import DSSection from "../_components/DSSection";
import { SelectionBarSpec } from "./_specs";

export default function EditingFoundationPage() {
  return (
    <DSSection
      id="editing"
      title="Editing"
      sub="Modifier le contenu de la bibliothèque — à deux échelles. Un item unique via le Kebab (menu contextuel par carte) ; un lot d'items via le mode sélection et sa Bulk bar. Même intention — supprimer, déplacer, changer de statut — deux surfaces selon le nombre de cibles. Documentées en pages dédiées."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <SelectionBarSpec count={2} total={3} responsive />
            </div>
          </div>
          <p className="ds-note">La <strong>Bulk bar</strong> — l&apos;expression multi-sélection : compteur, Select all, actions, Cancel. Son pendant sur un seul item est le <strong>Kebab</strong>, un menu contextuel ouvert par carte. Un même geste d&apos;édition, deux échelles.</p>
        </div>
      </div>

      {/* 2 — TWO SCALES */}
      <div className="ds-card">
        <div className="ds-card-head">Deux échelles</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Un item · Kebab</div>
            <p>Le déclencheur <span className="ds-class">.col-card-kebab</span> ouvre un <strong>menu contextuel</strong> collé à la carte. Les items dépendent de la carte (book / quote / dictionary / collection) et de son état. C&apos;est l&apos;édition <strong>ponctuelle</strong>, toujours disponible, sans changer de mode.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Un lot · Bulk</div>
            <p>On entre en <strong>mode sélection</strong> : chaque carte/row gagne une <span className="ds-class">.row-checkbox</span>, la <span className="ds-class">.selection-bar</span> monte du bas. On coche N cibles et on applique une action <strong>en une fois</strong> (Remove, Mark as owned…). Sortie par Cancel.</p>
          </div>
        </div>
      </div>

      {/* 3 — BEHAVIOR (shared) */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · commun aux deux</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Actions contextuelles</div>
            <p>Le jeu d&apos;actions dépend du <strong>contexte</strong> — pas du DS. Le Kebab varie par carte et état ; la Bulk bar varie par onglet (Wishlist ajoute « Mark as owned »). <strong>Delete / Remove</strong> reste commun et destructif partout.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Confirmation du destructif</div>
            <p>Une action destructive à effet immédiat (Delete, Remove un lot) passe par une <span className="ds-class">Delete Modal</span> — jamais un one-tap qui détruit sans filet.</p>
          </div>
        </div>
      </div>

      {/* 4 — FAMILY */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Deux surfaces</div>
            <p><span className="ds-class">.col-card-kebab</span> — <strong>Kebab</strong> : menu contextuel sur un item unique. <span className="ds-class">.selection-bar</span> — <strong>Bulk</strong> : mode sélection + barre d&apos;action flottante sur un lot.</p>
          </div>
          <p className="ds-note"><strong>Note d&apos;archi</strong> : les deux réutilisent des briques Components — le Kebab consomme <span className="ds-class">Dropdown Menu</span> (conteneur + cellules), le mode Bulk consomme <span className="ds-class">Checkbox</span> (<span className="ds-class">.row-checkbox</span>) et les états <span className="ds-class">.selected</span> de <span className="ds-class">List View</span> / cards. Ici on documente l&apos;<em>assemblage</em>, pas les atomes.</p>
        </div>
      </div>

    </DSSection>
  );
}
