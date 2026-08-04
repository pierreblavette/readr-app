import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import Wordmark from "@/components/brand/Wordmark";

// La barre de navigation mobile = le composant AppToolbar (classe .toolbar
// .toolbar-mobile-only). On rend le markup RÉEL (mêmes classes que l'app), mais
// sans .toolbar-mobile-only (qui la masque hors ≤768) et avec position: static
// — le sticky + z-index 400 créerait un contexte d'empilement passant DEVANT les
// pastilles AnnoScene. Le rendu visuel est identique (elle est en haut de la scène).
function ToolbarSpec({ width = "100%", open = false, packed = false }) {
  return (
    <div className="toolbar" style={{ position: "static", width, borderBottom: "none" }}>
      <div className="toolbar-inner">
        <button
          className={`toolbar-hamburger${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="hamburger-line hamburger-line-top" />
          <span className="hamburger-line hamburger-line-mid" />
          <span className="hamburger-line hamburger-line-bot" />
        </button>
        <Wordmark className="logo" />
        <div className="toolbar-right" style={packed ? { marginLeft: 0 } : undefined}>
          <button className="theme-btn" aria-label="Toggle theme">
            <span className="toggle-thumb">
              <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Trois pastilles centrées sur leur cible → traits strictement verticaux (jamais de
// diagonale) : hamburger et thème sous la barre, wordmark au-dessus.
const ANNOS = [
  { n: 1, side: "bottom", target: ".toolbar-hamburger" },
  { n: 2, side: "top", target: ".logo" },
  { n: 3, side: "bottom", target: ".theme-btn" },
];

export default function NavigationBarPage() {
  return (
    <DSSection
      id="navigation-bar"
      title="Navigation Bar"
      sub="La barre fixée en haut de l'écran sur mobile — pour ouvrir le menu, revenir à l'accueil et changer de thème."
    >
      {/* Spacing specimen : 402 en desktop (aligné aux autres cartes), hug en ≤600
          pour tenir dans le board Redline sans clipper les bandes. */}
      <style>{`
        /* Comme le Spacing de Side Menu : specimen compact à largeur fixe (tient en
           mobile, Redline mesure de façon fiable). Packed (margin-auto neutralisé)
           → tous les gaps sont de vrais 16 cotables, desktop comme mobile. */
        /* Redline positionne ses cotes RELATIVEMENT à son target, en supposant que le
           target épouse le specimen. Le specimen doit donc avoir une largeur intrinsèque :
           min(_,100%) s'effondrerait dans le target inline-flex, et forcer le target plus
           large désaligne les bandes. On épouse le contenu → toggle calé à droite, zéro
           nombre magique, cotes alignées.
           NB : la CSS responsive déplace le padding 16 de .toolbar-inner vers .toolbar en
           ≤768 (l'inner passe à 0) ; on rend l'inner seul → on lui réimpose padding 0 16. */
        /* Specimen fluide, comme la vraie barre plein écran : la ligne .ds-redline-row--fill
           étend le target Redline à 100% (l'inline-flex ne prend pas un width:100% direct),
           le specimen le remplit → il suit la largeur du viewport, cotes alignées (specimen
           == target). Padding 0 16 réimposé (la CSS responsive le déplace vers .toolbar en
           ≤768, l'inner passant à 0). */
        .toolbar-inner.dsnav-spacing-spec { width: 100%; padding: 0 16px; }
        /* .toolbar-right est poussé au bord par margin-left:auto → l'espace entre le
           wordmark et l'interrupteur est FLEXIBLE (pas un token). On masque sa bande de gap
           et son label (la 2e/​dernière) ; padding, gap hamburger↔wordmark et hauteur restent. */
        .dsnav-spacing-board .ds-redline-band.is-gap ~ .ds-redline-band.is-gap,
        .dsnav-spacing-board .ds-redline-callout:last-of-type { display: none; }
        /* Preview : 60px de padding sur les 4 côtés en mobile (le --roomy de base ne
           passe que le vertical à 60, le latéral restant à 20). Scopé à cette page. */
        @media (max-width: 600px) { .ds-preview.ds-preview--roomy { padding: 60px; } }
        /* Scène Spacing : padding 60 (vs 48 par défaut), cohérent avec la Preview --roomy. */
        .dsnav-spacing-board .ds-redline { padding: 60px; text-align: center; }
        /* Même taille max que les autres cartes (402), fluide en dessous. Le target (--fill,
           width:100%) est plafonné à 402 et centré (text-align sur .ds-redline, il est
           inline-flex) ; le specimen le remplit → cotes alignées (specimen == target). */
        .dsnav-spacing-board .ds-redline-target { max-width: 402px; }
      `}</style>

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview ds-preview--roomy">
              <div style={{ width: "min(402px, 100%)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                <ToolbarSpec />
              </div>
            </div>
          </div>
          <p className="ds-note">Markup réel <span className="ds-class">.toolbar</span>, rendu ici à largeur téléphone. Elle n&apos;apparaît qu&apos;en dessous de <code>768px</code> (<span className="ds-class">.toolbar-mobile-only</span>) : sur desktop, la navigation vit dans le <span className="ds-class">Side Menu</span> permanent. Fond <span className="ds-token-chip">--bg</span>, séparateur bas <span className="ds-token-chip">--border-subtle</span>.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={ANNOS}>
              <div className="ds-anno-organism" style={{ width: "min(402px, 100%)" }}><ToolbarSpec /></div>
            </AnnoScene>
          </div>
        </div>
      </div>

      {/* 3 — ELEMENTS */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>·</td><td><span className="ds-class">.toolbar</span></td><td>Coquille collée en haut (<code>sticky</code>, <code>z-index 400</code>) : fond <span className="ds-token-chip">--bg</span>, <code>border-bottom</code> 1px <span className="ds-token-chip">--border-subtle</span>, <code>padding-top: env(safe-area-inset-top)</code> (encoche / dynamic island en PWA iOS).</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.toolbar-inner</span></td><td>Rangée de contenu : <code>height 60</code>, padding <strong>0 16</strong>, <code>flex</code> align-center, gap <strong>16</strong>. Plein écran en mobile (le <code>max-width 1280</code> ne mord jamais).</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.toolbar-hamburger</span></td><td>Bouton menu <strong>40×40</strong>, radius <strong>8</strong>, couleur <span className="ds-token-chip">--text-2</span>, hover fond <span className="ds-token-chip">--ghost-hover</span>. Ouvre / ferme le <span className="ds-class">Side Menu</span> (drawer).</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.hamburger-line</span></td><td>Trois traits <strong>18×2</strong> <span className="ds-token-chip">--text-2</span> (currentColor), radius 2. En état <span className="ds-class">.open</span> ils pivotent en croix (haut/bas à 45°, milieu masqué).</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.logo</span> — <span className="ds-class">Wordmark</span></td><td>Wordmark Readr, <code>height 16</code>, couleur <span className="ds-token-chip">--text</span> (currentColor). Marque, centrée dans la rangée.</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.toolbar-right</span></td><td>Groupe de droite : <code>margin-left: auto</code> (le pousse au bord), gap 16.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.theme-btn</span> / <span className="ds-class">.toggle-thumb</span></td><td>Interrupteur de thème <strong>48×26</strong>, radius <strong>13</strong>, fond <span className="ds-token-chip">--primary-10</span> (→ <span className="ds-token-chip">--primary-50</span> en dark). Pastille <strong>20×20</strong> blanche, <code>translateX(22)</code> en dark ; icône <strong>10×10</strong> <span className="ds-token-chip">--primary-40</span>. Réutilise le pattern <span className="ds-class">Theme Toggle</span>.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States · hamburger</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            <div className="ds-state-sample">
              <div style={{ width: "min(402px, 100%)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}><ToolbarSpec /></div>
              <span className="ds-class">.toolbar-hamburger</span>
            </div>
            <div className="ds-state-sample">
              <div style={{ width: "min(402px, 100%)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}><ToolbarSpec open /></div>
              <span className="ds-class">.toolbar-hamburger.open</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Le hamburger porte l&apos;état du drawer : au repos, trois traits ; menu ouvert, ils pivotent en croix, <code>aria-expanded</code> suit. Transition <code>transform 0.25s</code> — la même courbe que l&apos;ouverture du Side Menu.</p>
        </div>
      </div>

      {/* 5 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined dsnav-spacing-board">
            <div className="ds-redline-row ds-redline-row--fill" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                {/* Racine = .toolbar-inner directement (le .toolbar externe ne porte
                    que fond/bordure/sticky, aucun spacing) → Redline par défaut cote
                    padding + gaps + hauteur, comme Side Menu. margin-left:auto neutralisé
                    pour exposer les vrais gaps de 16. */}
                <div className="toolbar-inner dsnav-spacing-spec">
                  <button className="toolbar-hamburger" aria-label="Open menu">
                    <span className="hamburger-line hamburger-line-top" />
                    <span className="hamburger-line hamburger-line-mid" />
                    <span className="hamburger-line hamburger-line-bot" />
                  </button>
                  <span style={{ display: "flex" }}><Wordmark className="logo" /></span>
                  <div className="toolbar-right">
                    <button className="theme-btn" aria-label="Toggle theme">
                      <span className="toggle-thumb">
                        <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">La rangée <span className="ds-class">.toolbar-inner</span> fait <code>60</code> de haut, padding <code>0 16</code>, gap <strong>16</strong> entre hamburger et wordmark. <span className="ds-class">.toolbar-right</span> est repoussé au bord par un <code>margin-left: auto</code> : l&apos;espace entre le wordmark et l&apos;interrupteur est <strong>flexible</strong> (pas un token), donc non coté. Le hamburger (<strong>40×40</strong>) et l&apos;interrupteur (<strong>48×26</strong>) sont des cibles tactiles pleines. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Mobile uniquement (≤ 768px)</div>
            <p>Masquée par défaut, elle n&apos;apparaît qu&apos;en dessous de <code>768px</code> (ou en paysage court). Au-dessus, le <span className="ds-class">Side Menu</span> permanent porte toute la navigation — la barre ferait doublon.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Trois fonctions</div>
            <p><strong>Menu</strong> (gauche) — le hamburger ouvre le drawer de navigation. <strong>Marque</strong> (centre) — le wordmark Readr. <strong>Thème</strong> (droite) — l&apos;interrupteur clair / sombre, exposé ici ; c&apos;est pourquoi le <span className="ds-class">.sidebar-bottom</span> qui le portait est masqué en mobile, pour éviter le doublon.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Collée en haut + encoche</div>
            <p><code>position: sticky</code> : elle reste visible au scroll. Le <code>padding-top: env(safe-area-inset-top)</code> pousse la rangée sous l&apos;encoche / la dynamic island en PWA plein écran iOS — no-op sur navigateur classique.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumer</div>
            <p>Rendue une fois en tête de <code>library/page.js</code> via <span className="ds-class">AppToolbar</span>, au-dessus du contenu scrollable.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
