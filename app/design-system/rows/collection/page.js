import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";
import { Chevron } from "../_specs";

const Check = () => (
  <svg className="book-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Collection chip : PAS de cover — nom + décompte, puis chevron (ou check si déjà dedans).
function CollectionRow({ name = "Sci-fi shelf", count = "12 books", className = "", already = false, width = "100%" }) {
  return (
    <button type="button" className={`book-row book-row-interactive collection-chip${already ? " is-already-in" : ""} ${className}`.trim()} style={{ width }} disabled={already}>
      <div className="book-row-body">
        <div className="book-row-title">{name}</div>
        <div className="book-row-author">{count}</div>
      </div>
      {already ? <Check /> : <Chevron />}
    </button>
  );
}

const ANNOS = [
  { n: 1, side: "top", target: ".collection-chip" },
  { n: 2, side: "bottom", target: ".book-row-body" },
  { n: 3, side: "right", target: ".book-row-chevron" },
];

export default function CollectionRowPage() {
  return (
    <DSSection
      id="rows-collection"
      title="Collection Row"
      sub="La ligne qui référence une collection : son nom et son nombre de livres. Une variante de Book Row, sans vignette et au padding asymétrique."
    >
      {/* 1. PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <CollectionRow width="min(402px, 100%)" />
          </div>
          </div>
          <p className="ds-note">Même charpente que Book Row interactif, <strong>sans la vignette</strong> : une collection n&apos;a pas de couverture propre. Le corps porte le <strong>nom</strong> + le <strong>décompte</strong>, le chevron signale le clic.</p>
        </div>
      </div>

      {/* 2. ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <CollectionRow className="ds-anno-organism" name="Sci-fi shelf" count="12 books" width="min(402px, 100%)" />
          </AnnoScene>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.collection-chip</span></td><td>Container : posé sur <span className="ds-class">.book-row</span> + <span className="ds-class">.book-row-interactive</span>, le modifier n&apos;ajoute que le padding asymétrique. <code>&lt;button&gt;</code>, toujours cliquable.</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.book-row-body</span></td><td>Corps : <span className="ds-class">.book-row-title</span> (nom, 15/600) + <span className="ds-class">.book-row-author</span> (décompte, 13/500 <span className="ds-token-chip">--text-2</span>) <strong>directement</strong> — pas de <span className="ds-class">.book-row-name</span> ici, il n&apos;y a pas de vignette à côté de laquelle serrer le texte.</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.book-row-chevron</span></td><td>Chevron 16×16. Remplacé par un <strong>check</strong> quand la collection contient déjà le livre (variante <span className="ds-class">.is-already-in</span>).</td></tr>
            </tbody>
          </table>
          <p className="ds-note">Aucun <span className="ds-class">.book-row-cover</span> : c&apos;est la seule différence de contenu avec Book Row (l&apos;autre étant le padding). Tout le reste — hover, focus, états — est hérité, voir <strong>Book Row</strong>.</p>
        </div>
      </div>

      {/* 3. SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".book-row-chevron">
                <CollectionRow name="Sci-fi shelf" count="12 books" width={402} />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Padding <strong>gauche 16 / droite 12</strong> (haut/bas 12) — le retrait droit réduit rééquilibre le chevron aligné à droite, même logique que le padding asymétrique des boutons à icône. Chevron <strong>16×16</strong> coté en boîte. À comparer au 12 uniforme de Book Row. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 4. STATES + variante */}
      <div className="ds-card">
        <div className="ds-card-head">States · interactive</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <CollectionRow name="Default" count="8 books" width="min(402px, 100%)" />
              <span className="ds-class">.collection-chip</span>
            </div>
            <div className="ds-state-sample">
              <CollectionRow name="Hover" count="--primary-10" className="is-hover" width="min(402px, 100%)" />
              <span className="ds-class">:hover</span>
            </div>
            <div className="ds-state-sample">
              <CollectionRow name="Already in" count="Book present" already width="min(402px, 100%)" />
              <span className="ds-class">.is-already-in</span>
            </div>
          </div>
          <p className="ds-note">Hover et active partagent <span className="ds-token-chip">--primary-10</span>, focus clavier en anneau <span className="ds-token-chip">--primary-50</span> — hérités de <span className="ds-class">.book-row-interactive</span>. La variante <span className="ds-class">.is-already-in</span> (modale « Add to collections ») remplace le chevron par un check et désactive le bouton.</p>
        </div>
      </div>

      {/* 5. USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Où</div>
            <p><span className="ds-cn">CollectionListPanel</span> (sidebar), <span className="ds-cn">BookPanel</span> (collections du livre), <span className="ds-cn">AddBookToCollectionsModal</span>. Toujours cliquable — ouvre ou (dé)sélectionne la collection.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Décompte</div>
            <p>Rendu dans le slot <span className="ds-class">.book-row-author</span> : « 12 books » (via <code>t.colBookCount</code>). Pas de composant dédié — c&apos;est le corps de Book Row réutilisé.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Source</div>
            <p><code>CollectionListPanel.js</code>, <code>BookPanel.js</code>, <code>AddBookToCollectionsModal.js</code> — même markup, la variante check n&apos;apparaît que dans la modale d&apos;ajout.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
