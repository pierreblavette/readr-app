import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// Default / Hover / Focus / Disabled — les 4 états réels du champ (mirror is-* / attr).
const STATES = [
  ["Default", "", false, ".modal-field-input"],
  ["Hover", "is-hover", false, ":hover"],
  ["Focus", "is-focus", false, ":focus"],
  ["Disabled", "", true, ":disabled"],
];

// sm 32 / md 40 (actuel) / lg 48 — proposition (voir ds.css). Pas 8, comme les boutons.
const SIZES = [
  ["Small", "modal-field-input--sm", "32", "0 12", "14"],
  ["Medium", "", "40", "0 14", "15"],
  ["Large", "modal-field-input--lg", "48", "0 16", "16"],
];

// Décomposition numérotée : le champ (1 = container) + ses parties (2/3/4).
const ANNOS = [
  { n: 1, side: "right", target: ".modal-field" },
  { n: 2, side: "left", target: ".modal-field-label" },
  { n: 3, side: "left", target: ".modal-field-input" },
  { n: 4, side: "left", target: ".modal-field-hint" },
];

// Champ canonique (label + field + helper), réutilisé Preview / Anatomy. Input en
// focus : sur le fond bleu de la scène, la bordure --primary-50 + l'anneau le
// démarquent (au repos le bg --bg3 + bord transparent se confondent avec le bleu).
function Field() {
  return (
    <div className="modal-field" style={{ width: "100%" }}>
      <label className="modal-field-label">Title</label>
      <input type="text" className="modal-field-input is-focus" defaultValue="Normal People" readOnly style={{ width: "100%" }} />
      <span className="modal-field-hint">10 or 13 digits, dashes optional.</span>
    </div>
  );
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><line x1="12" y1="7.5" x2="12" y2="13" /><line x1="12" y1="16.5" x2="12" y2="16.5" />
  </svg>
);
const WarnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5 22 20.5H2Z" /><line x1="12" y1="10" x2="12" y2="14.5" /><line x1="12" y1="17.5" x2="12" y2="17.5" />
  </svg>
);

export default function InputsPage() {
  return (
    <DSSection id="inputs" title="Text Input" sub="Champs de saisie (library.css). Socle unique — height 40, radius 8, border 1.5, font 15/600 — décliné en text field, search (pill + icône) et textarea. Label, message et validation partagés.">

      {/* ─────────── 1. PREVIEW — le champ canonique ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <div style={{ width: 340 }}><Field /></div>
          </div>
          </div>
          <p className="ds-note">Un champ = <strong>label + field + helper</strong>. Le label est toujours présent et discret ; le placeholder ne le remplace jamais. Bordure <strong>transparente au repos</strong> qui se colore au hover/focus — le champ ne saute pas de taille.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée (UI réelle) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-organism" style={{ width: 340 }}><Field /></div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal-field</span></td><td>Conteneur : <code>flex</code> colonne, <strong>gap 8</strong> constant entre label / field / helper.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.modal-field-label</span></td><td>Libellé : 13/500 <span className="ds-token-chip">--text-2</span>, toujours visible.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.modal-field-input</span></td><td>Champ : height 40, radius 8, border 1.5 <span className="ds-token-chip">transparent</span>, bg <span className="ds-token-chip">--bg3</span>, font 15/600, padding <code>0 14</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.modal-field-hint</span></td><td>Helper : guidance <em>permanente</em> 13/500 <span className="ds-token-chip">--text-2</span> — remplacé par un message d&apos;erreur/warning quand la validation échoue (jamais les deux).</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — gaps du champ + padding du field ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="modal-field" style={{ width: 300 }}>
                  <label className="modal-field-label">Title</label>
                  <input type="text" className="modal-field-input" defaultValue="Normal People" readOnly style={{ width: "100%" }} />
                  <span className="modal-field-hint">Helper text.</span>
                </div>
              </Redline>
            </div>
            {SIZES.map(([name, mod]) => (
              <div key={name} className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
                <Redline>
                  <input type="text" className={`modal-field-input${mod ? " " + mod : ""}`} defaultValue={name} readOnly style={{ width: 260 }} />
                </Redline>
              </div>
            ))}
          </div>
          <p className="ds-note">Champ : <strong>gap 8</strong> constant (label → field → helper). Field : padding <strong>0 12 / 0 14 / 0 16</strong> (sm / md / lg), height <strong>32 / 40 / 48</strong>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — le champ et ses 4 réactions ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([state, mod, disabled, cap]) => (
              <div key={state} className="ds-state-sample">
                <div className="modal-field" style={{ width: "100%" }}>
                  <label className="modal-field-label">{state}</label>
                  <input
                    type="text"
                    className={`modal-field-input${mod ? " " + mod : ""}`}
                    defaultValue={disabled ? "Locked value" : "Normal People"}
                    disabled={disabled}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="ds-class">{cap}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Bordure transparente au repos, colorée au hover/focus. Hover : bg <span className="ds-token-chip">--primary-5</span> + bord <span className="ds-token-chip">--primary-50</span>. Focus : idem + anneau <code>0 0 0 3px</code> <span className="ds-token-chip">--primary-20</span> (dark <code>rgba(73,89,230,0.4)</code>). Disabled : texte <span className="ds-token-chip">--text-2</span>, <code>cursor: not-allowed</code>.</p>
        </div>
      </div>

      {/* ─────────── 5. SIZING — échelle sm / md / lg ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {SIZES.map(([name, mod]) => (
              <div key={name} className="ds-state-sample">
                <div className="modal-field" style={{ width: "100%" }}>
                  <label className="modal-field-label">Title</label>
                  <input type="text" className={`modal-field-input${mod ? " " + mod : ""}`} defaultValue={name} readOnly style={{ width: "100%" }} />
                </div>
                <span className="ds-class">{mod ? `.${mod}` : ".modal-field-input"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {SIZES.map(([name, mod, h, p, f]) => (
            <div key={name} className="ds-token-block">
              <div className="ds-token-name">{name} · {h}px</div>
              <p>height {h} · padding {p} · font {f}</p>
            </div>
          ))}
          <p className="ds-note">L&apos;app n&apos;utilise aujourd&apos;hui que <code>md</code> ; l&apos;échelle <code>sm / lg</code> (pas 8, iso boutons) est désormais <strong>disponible</strong> dans library.css.</p>
        </div>
      </div>

      {/* ─────────── 6. VARIANTS · validation ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · validation</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <div className="modal-toggle-field" style={{ width: "100%" }}>
                <div className="modal-field" style={{ width: "100%" }}>
                  <label className="modal-field-label">Error</label>
                  <input type="text" className="modal-field-input is-invalid" defaultValue="" placeholder="Title" readOnly style={{ width: "100%" }} />
                </div>
                <span className="modal-toggle-message is-error"><ErrorIcon /> Title is required.</span>
              </div>
              <span className="ds-class">.is-invalid</span>
            </div>
            <div className="ds-state-sample">
              <div className="modal-toggle-field" style={{ width: "100%" }}>
                <div className="modal-field" style={{ width: "100%" }}>
                  <label className="modal-field-label">Warning</label>
                  <input type="text" className="modal-field-input is-warn" defaultValue="978-000000000" readOnly style={{ width: "100%" }} />
                </div>
                <span className="modal-toggle-message is-warning"><WarnIcon /> ISBN looks incomplete.</span>
              </div>
              <span className="ds-class">.is-warn</span>
            </div>
            <div className="ds-state-sample">
              <div className="modal-field" style={{ width: "100%" }}>
                <label className="modal-field-label">Read-only</label>
                <input type="text" className="modal-field-input is-readonly" defaultValue="Sally Rooney" readOnly style={{ width: "100%" }} />
              </div>
              <span className="ds-class">.is-readonly</span>
            </div>
            <div className="ds-state-sample">
              <div className="modal-field" style={{ width: "100%" }}>
                <label className="modal-field-label">Helper text</label>
                <input type="text" className="modal-field-input" defaultValue="" placeholder="e.g. 978-0-571-33465-0" readOnly style={{ width: "100%" }} />
                <span className="modal-field-hint">10 or 13 digits, dashes optional.</span>
              </div>
              <span className="ds-class">.modal-field-hint</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Message · réutilise <span className="ds-cn">.modal-toggle-message</span></div>
            <p>La primitive de message existe déjà (checkbox) : icône 16 + texte 13/500, <span className="ds-class">.is-error</span> <span className="ds-token-chip">--destructive</span> · <span className="ds-class">.is-warning</span> <code>#B45309</code> (dark <code>#FBBF24</code>). À généraliser en <span className="ds-class">.modal-field-message</span> le jour où on la partage avec les champs texte — pas une classe parallèle.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Bordure d&apos;état · proposé</div>
            <p>Error <span className="ds-token-chip">--destructive</span> + anneau focus <code>rgba(239,68,68,0.2)</code> · Warning <code>#B45309</code> · Read-only bord <span className="ds-token-chip">--border-subtle</span>, fond transparent, texte <span className="ds-token-chip">--text-2</span> (non éditable mais lisible, pas grisé comme disabled).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Helper text vs erreur</div>
            <p>Le helper (<span className="ds-class">.modal-field-hint</span>) est une guidance <em>permanente</em>. Le message d&apos;erreur est <em>conditionnel</em> et le remplace quand la validation échoue — jamais les deux à la fois.</p>
          </div>
          <p className="ds-note"><strong>Proposition</strong> — le vocabulaire couleur existe déjà, seul l&apos;habillage du bord et le câblage validation manquent dans library.css. Aujourd&apos;hui l&apos;app affiche les erreurs via <span className="ds-class">.modal-error</span> (13/<span className="ds-token-chip">--destructive</span>, sans bord rouge).</p>
        </div>
      </div>

      {/* ─────────── 7. VARIANTS · textarea ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · textarea</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <div className="modal-field" style={{ width: "100%", maxWidth: 420 }}>
                <label className="modal-field-label">Quote</label>
                <textarea className="quote-textarea" rows={3} readOnly defaultValue={"« The world was ending and there was nothing to be done about it. »"} style={{ width: "100%" }} />
              </div>
              <span className="ds-class">.quote-textarea</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Base</div>
            <p>Socle du text field décliné multi-lignes : <code>width: 100%</code> · padding <strong>12 14</strong> (vertical rétabli) · radius 8 · border 1.5 <span className="ds-token-chip">transparent</span> · bg <span className="ds-token-chip">--bg3</span> · font 15 / 600 · <code>line-height: 1.6</code> · <code>resize: vertical</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">États</div>
            <p>Hover / focus identiques au text field (bg <span className="ds-token-chip">--primary-5</span>, bord <span className="ds-token-chip">--primary-50</span>, anneau <span className="ds-token-chip">--primary-20</span>). Seul champ multi-lignes de l&apos;app (QuoteModal / BookPanel).</p>
          </div>
        </div>
      </div>

      {/* ─────────── 8. VARIANTS · search ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · search</div>
        <div className="ds-card-body col">
          <div className="ds-sample-row">
            {/* Wrapper neutre (pas .modal-field) : sa règle « .modal-field input »
                écraserait le padding 0 38 du .search-input et masquerait la loupe. */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
              <label className="modal-field-label">Search</label>
              <div className="search-box" style={{ flex: "1 1 auto", minWidth: 0 }}>
                <SearchIcon />
                <input type="text" className="search-input" defaultValue="Sally Rooney" readOnly />
                <button type="button" className="search-clear visible" aria-label="Clear">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Forme</div>
            <p>Même socle que le text field (height 40, font 15/600) mais <strong>pill</strong> (radius 32) + <code>width: 100%</code>. Bord au repos <span className="ds-token-chip">--border-subtle</span> (visible, contrairement au champ modal transparent) car il vit sur fond de page.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Icône · <span className="ds-cn">.search-box</span> svg</div>
            <p>Loupe 15×15 <span className="ds-token-chip">--text-2</span>, absolue à <code>left: 14</code>, <code>pointer-events: none</code>. Padding gauche du champ = 38 pour la dégager. Le trait passe à <code>1.5</code> au hover/focus.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Clear · <span className="ds-cn">.search-clear</span></div>
            <p>Pastille ronde 18×18 <span className="ds-token-chip">--text-3</span> (hover <span className="ds-token-chip">--text-2</span>), croix 10×10, absolue à <code>right: 10</code>. Masquée par défaut, <span className="ds-class">.visible</span> quand le champ est rempli. Padding droit = 34.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Variante · <span className="ds-cn">.authors-search-input</span></div>
            <p>Même graphie d&apos;icône (38/34) mais radius 8 et bg <span className="ds-token-chip">--bg3</span> au lieu du pill blanc — variante « encastrée » pour l&apos;en-tête du menu Authors.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 9. USAGE · content ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage · content</div>
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

      {/* ─────────── 10. USAGE · reference ─────────── */}
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
