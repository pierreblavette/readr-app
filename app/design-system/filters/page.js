import DSSection from "../_components/DSSection";
import FiltersRowFit from "./_FiltersRowFit";

export default function FiltersFoundationPage() {
  return (
    <DSSection
      id="filters"
      title="Filtering"
      sub="Système de filtrage de la bibliothèque — cinq dimensions, trois types de trigger, application immédiate. Deux expressions responsive du même modèle : Filters Row (desktop, cluster inline) et Filters Panel (mobile, slide-in). Documentées en pages dédiées."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <FiltersRowFit className="ds-filters-row--center" />
          </div>
          </div>
          <p className="ds-note">La <strong>Filters Row</strong> — l&apos;expression desktop. Les mêmes filtres se replient dans le <strong>Filters Panel</strong> (slide-in) quand la place manque. Un même modèle, deux surfaces.</p>
        </div>
      </div>

      {/* 2 — DIMENSIONS */}
      <div className="ds-card">
        <div className="ds-card-head">Les cinq dimensions</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Sort · Reading status · Rating</div>
            <p><strong>Choix exclusifs</strong> (radio). Sort = ordre (A–Z / Date added / Date finished). Reading = Any / Not started / Currently reading / Finished. Rating = All + 5★→1★ (match exact). Compteurs live sur chaque option.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Authors · Genres</div>
            <p><strong>Multi-select</strong> (cases cumulables), dynamiques depuis la bibliothèque. Masqués si vides.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Books with quotes</div>
            <p><strong>Booléen</strong> — un toggle. Compteur = livres ayant au moins une citation.</p>
          </div>
        </div>
      </div>

      {/* 3 — BEHAVIOR (responsive doctrine) */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · un modèle, deux surfaces</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Filtrage immédiat</div>
            <p>Le filtre s&apos;applique <strong>au tap</strong>, la liste se met à jour derrière — pas de bouton Apply. Reset vide tout en un handler. Les filtres se réinitialisent au changement d&apos;onglet.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Fold responsive Row → Panel</div>
            <p>Sur desktop large, les triggers sont <strong>inline</strong> (Filters Row). À chaque palier qui rétrécit, le filtre suivant quitte la rangée pour le <strong>Filters Panel</strong> (ouvert par un bouton « Filter »). <code>SearchBar</code> réplique les breakpoints via <span className="ds-class">useMediaQuery</span> pour que le panel saute les filtres déjà inline. Détail sur chaque page.</p>
          </div>
        </div>
      </div>

      {/* 4 — FAMILY */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Deux surfaces</div>
            <p><span className="ds-class">.filters-row</span> — <strong>Filters Row</strong> : cluster inline de triggers <span className="ds-class">Dropdown</span> (desktop). <span className="ds-class">.filters-panel</span> — <strong>Filters Panel</strong> : slide-in qui déplie toutes les dimensions en sections (mobile).</p>
          </div>
          <p className="ds-note"><strong>Note d&apos;archi</strong> : le Filters Panel réutilise la primitive <span className="ds-class">.book-panel</span> (partagée avec Book Panel, Quote Panel, Word List Panel). Ici on le range par <em>feature</em> (Filters) ; il citera la primitive partagée quand la famille <span className="ds-class">Panels</span> existera.</p>
        </div>
      </div>

    </DSSection>
  );
}
