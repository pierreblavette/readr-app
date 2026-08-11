import DSSection from "../_components/DSSection";

const SHADOWS = [
  { token: "--shadow-md", use: "Cartes au hover (élévation légère)" },
  { token: "--shadow-lg", use: "Surfaces flottantes — dropdown, autocomplete, sidebar mobile" },
  { token: "--shadow-xl", use: "Modales (.modal, .confirm-modal) — l'élévation la plus large" },
  { token: "--shadow-overlay", use: "Flottants neutres — toast, selection bar (noir, sur contenu quelconque)" },
];

const RADII = [
  { r: 6, use: "Buttons XS, items de menu (dropdown, autocomplete)" },
  { r: 7, use: "Buttons SM" },
  { r: 8, use: "Default", token: "--radius" },
  { r: 10, use: "Listes flottantes (dropdown, autocomplete), dropzone" },
  { r: 12, use: "Camera scan viewfinder" },
  { r: 16, use: "Onboarding modal" },
  { r: 32, use: "Pill (search input)" },
];

// Menu réel statique pour la démo d'ombre / de radius.
function MiniMenu() {
  return (
    <div className="dropdown-menu dropdown-menu--portal ds-menu-static" role="menu">
      <button type="button" className="dropdown-item">Edit review</button>
      <button type="button" className="dropdown-item">Share</button>
    </div>
  );
}

export default function ShadowsPage() {
  return (
    <DSSection className="ds-scene-frame" id="shadows" title="Shadows & Radius">

      {/* 1 — SHADOWS (tokens) + doctrine */}
      <div className="ds-card">
        <div className="ds-card-head">Shadows</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid ds-swatch-grid--fill">
            {SHADOWS.map(({ token, use }) => (
              <div key={token} className="ds-swatch" style={{ boxShadow: `var(${token})` }}>
                <div className="ds-swatch-block" style={{ background: "var(--card)", borderBottom: "1px solid var(--border-subtle)" }} />
                <div className="ds-swatch-info">
                  <div className="ds-swatch-tokens"><span className="ds-token-chip">{token}</span></div>
                  <div className="ds-token-val">{use}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Trois niveaux tintés + un overlay neutre</div>
            <p>Les ombres d&apos;<strong>élévation de surface</strong> sont <strong>teintées primary</strong> (<span className="ds-token-chip">--primary-50</span>) en light plutôt que noires : une ombre légèrement bleue s&apos;accorde à la marque au lieu de « salir » l&apos;interface. <span className="ds-token-chip">--shadow-md</span> (subtil, cartes) · <span className="ds-token-chip">--shadow-lg</span> (surfaces flottantes : dropdown, autocomplete) · <span className="ds-token-chip">--shadow-xl</span> (modales, la plus large).</p>
            <p><strong>Exception assumée</strong> : <span className="ds-token-chip">--shadow-overlay</span> est volontairement <strong>noir neutre</strong>. Il sert aux flottants posés sur un <em>contenu quelconque</em> (<span className="ds-class">.toast</span>, <span className="ds-class">.selection-bar</span>) où une ombre bleue manquerait de présence. Avant, ces deux-là hardcodaient chacun leur ombre — le token les unifie.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dark — noir neutre sur les grandes surfaces</div>
            <p>En dark, <span className="ds-token-chip">--shadow-md</span> / <span className="ds-token-chip">--shadow-lg</span> restent bleutés. Mais <span className="ds-token-chip">--shadow-xl</span> (modales) passe directement au <strong>noir neutre</strong> dans le token, et le <span className="ds-class">.dropdown-menu</span> (sur <span className="ds-token-chip">--shadow-lg</span>) repasse au noir via override : une grande ombre bleue sur fond sombre se lit comme un halo de marque ; le noir donne la profondeur sans contaminer la couleur.</p>
          </div>
        </div>
      </div>

      {/* 2 — SHADOWS · IN USE */}
      <div className="ds-card">
        <div className="ds-card-head">Shadows · in use</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <div style={{ width: 180, height: 104, background: "var(--card)", borderRadius: 8, boxShadow: "var(--shadow-md)" }} />
              </div>
              <span className="ds-token-chip">--shadow-md</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell"><MiniMenu /></div>
              <span className="ds-token-chip">--shadow-lg</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <div className="toast toast-visible" style={{ position: "static", transform: "none" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Book added to your library.</span>
                </div>
              </div>
              <span className="ds-token-chip">--shadow-overlay</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Une <strong>carte au hover</strong> (<span className="ds-token-chip">--shadow-md</span>) ; un <span className="ds-class">.dropdown-menu</span> réel, surface flottante (<span className="ds-token-chip">--shadow-lg</span>) — ombres <strong>bleues</strong> qui se lisent sur fond clair. Puis un <span className="ds-class">.toast</span> réel (<span className="ds-token-chip">--shadow-overlay</span>) : ombre <strong>noire neutre</strong>, car il flotte au-dessus d&apos;un contenu quelconque et a besoin de plus de présence.</p>
        </div>
      </div>

      {/* 3 — FOCUS RING (box-shadow, autre catégorie) */}
      <div className="ds-card">
        <div className="ds-card-head">Focus ring</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <input type="text" className="modal-field-input is-focus" defaultValue="Focused field" readOnly style={{ width: 220 }} />
              <span className="ds-token-chip">--primary-20</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Anneau de focus — box-shadow, pas élévation</div>
            <p>Le focus clavier pose <code>box-shadow: 0 0 0 3px</code> <span className="ds-token-chip">--primary-20</span> (dark <code>rgba(73,89,230,0.4)</code>) : techniquement un <code>box-shadow</code>, mais une <strong>catégorie distincte</strong> des ombres d&apos;élévation. Pas de la profondeur — un <strong>halo d&apos;état</strong> collé au bord, épaisseur constante 3px, jamais flouté. Partagé par inputs, checkbox, boutons, book row. Toujours <span className="ds-token-chip">--primary-20</span>.</p>
          </div>
        </div>
      </div>

      {/* 4 — BORDER RADIUS */}
      <div className="ds-card">
        <div className="ds-card-head">Border Radius</div>
        <div className="ds-card-body col">
          {RADII.map(({ r, use, token }) => (
            <div key={r} className="spacing-row">
              <div className="spacing-block" style={{ width: 64, height: 40, borderRadius: r }} />
              <span className="spacing-label">{r}px</span>
              <span className="type-sample-meta">
                {use}{token && <> — <span className="ds-token-chip">{token}</span></>}
              </span>
            </div>
          ))}
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Rayons imbriqués</div>
            <p>Un élément posé dans un conteneur arrondi prend <strong>radius du conteneur moins son padding</strong> : les deux courbes ne se lisent comme parallèles que si leur écart vaut l&apos;espace qui les sépare. Un item de <span className="ds-class">.dropdown-menu</span> (radius 10, padding 4) vaut donc 6.</p>
          </div>
        </div>
      </div>

      {/* 5 — BORDER RADIUS · IN USE */}
      <div className="ds-card">
        <div className="ds-card-head">Border Radius · in use</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <button type="button" className="btn btn-outline btn-md"><span>Button</span></button>
              </div>
              <span className="ds-class">.btn-md</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell"><MiniMenu /></div>
              <span className="ds-class">.dropdown-menu</span>
            </div>
            <div className="ds-state-sample">
              <div className="ds-specimen-cell">
                <span className="now-reading-date now-reading-date--md">Started on May 3</span>
              </div>
              <span className="ds-class">.now-reading-date</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Radius sur de vrais composants : bouton <strong>8</strong> (<span className="ds-class">.btn-md</span>), liste flottante <strong>10</strong> (<span className="ds-class">.dropdown-menu</span>), pill <strong>999</strong> (<span className="ds-class">.now-reading-date</span> — radius ≥ ½ hauteur = extrémités pleinement arrondies).</p>
        </div>
      </div>

    </DSSection>
  );
}
