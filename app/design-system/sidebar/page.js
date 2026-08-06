import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import { SidebarSpec } from "./_specs";

const ANNOS = [
  { n: 1, side: "top", target: ".sidebar-logo" },
  { n: 2, side: "left", target: ".sidebar-section-head" },
  { n: 3, side: "left", target: ".sidebar-item.active" },
  { n: 4, side: "right", target: ".sidebar-item.active .sidebar-badge" },
  { n: 5, side: "right", target: ".sidebar-section-add" },
  { n: 6, side: "bottom", target: ".sidebar-bottom" },
];

const ITEM_STATES = [
  { label: ".sidebar-item", active: false, hover: false },
  { label: ".sidebar-item:hover", active: false, hover: true },
  { label: ".sidebar-item.active", active: true, hover: false },
];

const LibIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
);

// Zones schématisées de la coquille (Spacing) : en-tête logo (60, vide) + nav (3 blocs
// pleine largeur) + bottom. Identique ouvert / replié → même hauteur, seule la largeur change.
function ShellSchema() {
  return (
    <>
      <div className="sidebar-logo" />
      <nav className="sidebar-nav">
        <div className="ds-schema-block" style={{ height: 40 }} />
        <div className="ds-schema-block" style={{ height: 88 }} />
        <div className="ds-schema-block" style={{ height: 88 }} />
      </nav>
      <div className="sidebar-bottom" style={{ display: "flex" }}><div className="ds-schema-block" style={{ height: 44, flex: 1 }} /></div>
    </>
  );
}

export default function SidebarPage() {
  return (
    <DSSection
      className="ds-scene-frame"
      id="sidebar"
      title="Side Menu"
      sub="La navigation principale de l'app : atteindre les sections et régler l'apparence, toujours à portée sur la gauche."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview" style={{ gap: 20, alignItems: "flex-start" }}>
              <SidebarSpec active="owned" />
              <SidebarSpec collapsed className="ds-preview-collapsed" style={{ alignSelf: "stretch" }} />
            </div>
          </div>
          <p className="ds-note">La colonne étendue, <strong>Library</strong> actif (fond <span className="ds-token-chip">--primary-50</span> saturé, texte + badge blancs). Les sections sont séparées par un gap <strong>24</strong> ; dans une section, les items à gap <strong>4</strong>. En prod <code>position: sticky</code>, <code>height: 100dvh</code> (neutralisé pour la doc).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
            <AnnoScene annos={ANNOS} stack>
              <div className="ds-anno-organism" style={{ width: 260 }}><SidebarSpec active="owned" /></div>
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
              <tr className="table-row"><td>·</td><td><span className="ds-class">.sidebar</span></td><td>Colonne : <strong>260px</strong> (repliée <strong>60</strong>), <code>sticky</code>, fond <span className="ds-token-chip">--bg</span>, <code>border-right</code> <span className="ds-token-chip">--border-subtle</span>, padding <code>0 8</code>, <code>flex</code> colonne.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.sidebar-logo</span></td><td>En-tête <strong>60px</strong> : <span className="ds-class">Logo</span> (lockup, height 16) + bouton collapse <strong>36×36</strong>. <code>border-bottom</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.sidebar-section-head</span></td><td>Titre de section : <span className="ds-class">.sidebar-section-label</span> <code>11 / 700</code> uppercase <span className="ds-token-chip">--text-2</span>, height 36. <span className="ds-class">--no-action</span> = non cliquable.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.sidebar-item</span></td><td>Item : <span className="ds-class">.sidebar-icon</span> (20, svg 16) + <span className="ds-class">.sidebar-label</span> (<code>15 / 600</code>, <code>flex: 1</code>) + badge. Height <strong>40</strong>, padding <code>0 12</code>, gap 8.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.sidebar-badge</span></td><td>Compteur : height 20, min-w 20, <code>11 / 600</code> <span className="ds-token-chip">--primary-50</span> sur <span className="ds-token-chip">--primary-10</span>, radius 999. Actif → fond blanc.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.sidebar-section-add</span></td><td>« + » de Collections dans <span className="ds-class">.sidebar-section-head-row</span> (gap 12). Crée une collection.</td><td>—</td></tr>
              <tr className="table-row"><td>6</td><td><span className="ds-class">.sidebar-bottom</span></td><td>Pied : <span className="ds-class">.sidebar-appearance-row</span> (<span className="ds-class">.cell-row.cell-row--lg</span>) + <span className="ds-class">Theme Toggle</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.sidebar-col-item</span></td><td>Item de collection sous « All collections » (chevron <span className="ds-class">.sidebar-col-toggle</span> qui replie la liste).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing · coquille</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row ds-redline-row--stack">
              <Redline padSelector=".sidebar-nav" gapSelector=".sidebar-nav">
                <div className="sidebar ds-sidebar-static"><ShellSchema /></div>
              </Redline>
              <Redline padSelector=".sidebar-nav" gapSelector=".sidebar-nav">
                <div className="sidebar ds-sidebar-static collapsed"><ShellSchema /></div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Coquille</strong> — <span className="ds-class">.sidebar</span> padde <code>0 8</code> (gouttière latérale, top/bas 0 : logo et bottom bornent la colonne). <span className="ds-class">.sidebar-nav</span> ajoute <strong>12</strong> haut / <strong>40</strong> bas et un gap <strong>24</strong> entre sections. Même modèle ouvert (<strong>260</strong>) et replié (<strong>60</strong>) ; les zones (logo / sections / bottom) sont schématisées. Cotes mesurées à l&apos;exécution.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <button type="button" className="sidebar-item" style={{ width: 236 }}>
                  <span className="sidebar-icon"><LibIcon /></span>
                  <span className="sidebar-label">Library</span>
                  <span className="sidebar-badge">12</span>
                </button>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Item</strong> — height <strong>40</strong>, padding <code>0 12</code>, gap <strong>8</strong> (icône ↔ label ↔ badge) ; icône cadrée <strong>20</strong> (svg 16), badge height 20. Entre items d&apos;une même section : gap <strong>4</strong>.</p>
        </div>
      </div>

      {/* 5 — STATES */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          {/* États de l'item — board standard (blanc, dividers, label centré dessous à gap 32) */}
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {ITEM_STATES.map((s) => (
              <div key={s.label} className="ds-state-sample">
                <button type="button" className={`sidebar-item${s.active ? " active" : ""}`} style={{ width: 190, ...(s.hover ? { background: "var(--primary-5)", color: "var(--primary-50)" } : {}) }}>
                  <span className="sidebar-icon"><LibIcon /></span>
                  <span className="sidebar-label">Library</span>
                  <span className="sidebar-badge">12</span>
                </button>
                <span className="ds-class">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="ds-note"><strong>Default</strong> : transparent, texte <span className="ds-token-chip">--text</span>. <strong>Hover</strong> : fond <span className="ds-token-chip">--primary-5</span>, texte <span className="ds-token-chip">--primary-50</span>. <strong>Active</strong> : fond <span className="ds-token-chip">--primary-50</span> saturé, texte + badge <strong>blancs</strong> (voir <span className="ds-class">Sidebar active saturated</span>). L&apos;état actif suit la route.</p>
        </div>
        <div className="ds-card-body col">
          {/* Étendue vs repliée — scène bleue (le fond --bg de la colonne s'y démarque), même hauteur */}
          <div className="ds-preview-board">
            <div className="ds-preview" style={{ gap: 48, alignItems: "stretch", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
                <SidebarSpec active="owned" />
                <span className="ds-class" style={{ alignSelf: "center" }}>.sidebar</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
                <SidebarSpec collapsed active="owned" style={{ flex: 1 }} />
                <span className="ds-class" style={{ alignSelf: "center" }}>.sidebar.collapsed</span>
              </div>
            </div>
          </div>
          <p className="ds-note"><strong>Étendue</strong> (260) vs <strong>repliée</strong> (60) côte à côte, même hauteur. En <span className="ds-class">.sidebar.collapsed</span> : labels / badges / section-heads retirés, icônes seules centrées, le logo devient le bouton d&apos;expansion (« r »). Transition <code>width 0.25s</code> entre les deux.</p>
        </div>
      </div>

      {/* 6 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Collapse</div>
            <p>Le bouton du logo bascule <code>collapsed</code> : largeur <strong>260 ↔ 60</strong> en <code>transition width 0.25s</code>. En replié, le contenu textuel est retiré du DOM (pas juste masqué) et le logo se change en trigger d&apos;expansion.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Actif = la route</div>
            <p>L&apos;item <span className="ds-class">.active</span> reflète l&apos;onglet courant (<code>tab</code>), pas une mesure. Un seul actif à la fois ; les collections ont leur propre actif (<span className="ds-class">.sidebar-col-item.active</span>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Collections repliables</div>
            <p>« All collections » porte un chevron (<span className="ds-class">.sidebar-col-toggle</span>) qui déplie/replie la liste des collections (<code>collectionsOpen</code>). Vide → <span className="ds-class">.sidebar-empty</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Mobile — tiroir</div>
            <p>Sous <strong>768px</strong>, la colonne devient un <em>drawer</em> : <code>position: fixed</code>, <code>translateX(-100%)</code> → <code>0</code> via <span className="ds-class">.mobile-open</span>, avec un <span className="ds-class">.sidebar-overlay</span> qui ferme au tap. Voir <span className="ds-class">Mobile patterns</span>.</p>
          </div>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Consumer</div>
            <p><code>Sidebar</code>, montée dans le layout de <code>Library</code> ; <code>tab</code> / <code>setTab</code> pilotent la vue affichée. Réutilise <span className="ds-class">Logo</span>, <span className="ds-class">Badges</span>, <span className="ds-class">Cell Row</span> (appearance) et <span className="ds-class">Theme Toggle</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Gouttière centralisée</div>
            <p>Le padding latéral vit sur <span className="ds-class">.sidebar</span> (<code>0 8</code>) ; items et heads ajoutent <strong>12</strong> interne → un même bord gauche pour tout le contenu (modèle gap-driven, pas de marge répétée).</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
