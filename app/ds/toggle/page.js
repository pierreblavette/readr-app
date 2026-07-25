"use client";
import { useState } from "react";
import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";
import { useTheme } from "../_components/ThemeContext";

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
);
// Icônes réelles du view toggle (SearchBar) : grille = carrés PLEINS, liste = lignes.
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" />
    <rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" />
  </svg>
);
const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

function ViewToggle({ view, setView }) {
  return (
    <div className="view-btns" role="tablist">
      <button type="button" onClick={() => setView("grid")} className={`view-btn${view === "grid" ? " active" : ""}`} aria-label="Grid view"><GridIcon /></button>
      <button type="button" onClick={() => setView("list")} className={`view-btn${view === "list" ? " active" : ""}`} aria-label="List view"><ListIcon /></button>
    </div>
  );
}

const THEME_ANNOS = [
  { n: 1, side: "top", target: ".theme-btn" },        // track
  { n: 2, side: "bottom", target: ".toggle-thumb" },  // thumb
];
const VIEW_ANNOS = [
  { n: 1, side: "top", target: ".view-btns" },   // container
  { n: 2, side: "left", target: ".view-btn" },   // button
  { n: 3, side: "bottom", target: ".view-btn svg" }, // icon
];

export default function TogglePage() {
  const { theme, setTheme } = useTheme();
  const [view, setView] = useState("grid");
  return (
    <DSSection
      id="toggle"
      title="Toggle"
      sub="Deux bascules de l'app : le thème clair/sombre (slider animé) et la vue grille/liste (segment à deux cases). Une seule valeur active à la fois."
    >
      {/* ══════════ THEME TOGGLE ══════════ */}
      <div className="ds-card">
        <div className="ds-card-head">Theme toggle · preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="theme-btn" aria-label="Toggle theme">
              <span className="toggle-thumb">{theme === "dark" ? <MoonIcon /> : <SunIcon />}</span>
            </button>
          </div>
          </div>
          <p className="ds-note">Specimen <strong>live</strong> — clique-le, il bascule le thème de cette page. Light : piste <span className="ds-token-chip">--primary-10</span>, thumb à gauche, soleil. Dark : piste <span className="ds-token-chip">--primary-50</span>, thumb à droite (<code>translateX 22</code>), lune. Vrai composant library.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Theme toggle · anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={THEME_ANNOS}>
            <button type="button" className="theme-btn ds-anno-organism" aria-label="Theme">
              <span className="toggle-thumb"><SunIcon /></span>
            </button>
          </AnnoScene>
          </div>
        </div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.theme-btn</span></td><td>Piste : 48×26, radius 13 (pill), padding 0 6, fond <span className="ds-token-chip">--primary-10</span> → <span className="ds-token-chip">--primary-50</span> en dark. Transition <code>background</code> 0.4s.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.toggle-thumb</span></td><td>Pastille 20×20 blanche, ombre douce, svg 10 <span className="ds-token-chip">--primary-40</span>. Glisse de <code>22px</code> via <code>transform</code>, courbe élastique <code>cubic-bezier(0.34, 1.56, 0.64, 1)</code> (le « clac »).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Theme toggle · spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".toggle-thumb">
                <button type="button" className="theme-btn" aria-label="Theme"><span className="toggle-thumb"><SunIcon /></span></button>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Piste padding <strong>0 6</strong> ; thumb coté en boîte (20×20 · pill). Le déplacement <code>translateX 22</code> = largeur piste (48) − padding (12) − thumb (20) + 6, calé pour affleurer le bord droit. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ══════════ VIEW TOGGLE ══════════ */}
      <div className="ds-card">
        <div className="ds-card-head">View toggle · preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <ViewToggle view={view} setView={setView} />
          </div>
          </div>
          <p className="ds-note">Specimen <strong>live</strong> — clique une case. Segment à deux cases, une seule active (fond primary plein) ; survol d&apos;une case inactive teinte en <span className="ds-token-chip">--primary-5</span>. Grille et liste mutuellement exclusives — deux boutons dont l&apos;un porte <span className="ds-class">.active</span>.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">View toggle · anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={VIEW_ANNOS}>
            <div className="view-btns ds-anno-organism" role="tablist">
              <button type="button" className="view-btn active" aria-label="Grid view"><GridIcon /></button>
              <button type="button" className="view-btn" aria-label="List view"><ListIcon /></button>
            </div>
          </AnnoScene>
          </div>
        </div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.view-btns</span></td><td>Conteneur : rangée flex, <code>outline: 1.5px</code> <span className="ds-token-chip">--border-subtle</span>, radius 8, <code>overflow: hidden</code> (les coins des cases suivent). Un seul contour extérieur.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.view-btn</span></td><td>Case : 40×40, fond blanc (<span className="ds-token-chip">--bg3</span> dark), séparateur 1px entre les deux. Hover inactif : <span className="ds-token-chip">--primary-5</span> + <span className="ds-token-chip">--primary-50</span>. Active : fond <span className="ds-token-chip">--primary-50</span> + icône blanche.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">svg</span></td><td>Icône 18 — grille (carrés pleins) ou liste (lignes).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">View toggle · spacing &amp; states</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline keepShape cellSeparators>
                <div className="view-btns" role="tablist">
                  <button type="button" className="view-btn active" aria-label="Grid"><GridIcon /></button>
                  <button type="button" className="view-btn" aria-label="List"><ListIcon /></button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Deux cases 40×40 jointives (trait rouge = séparateur), contour 1.5px. États d&apos;une case : Default · Hover (<span className="ds-token-chip">--primary-5</span>) · Active (<span className="ds-token-chip">--primary-50</span> + icône blanche). Une seule <span className="ds-class">.active</span> à la fois.</p>
        </div>
      </div>

      {/* ══════════ USAGE ══════════ */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Theme toggle</div>
            <p>Bascule light/dark, persistée. Rangée Appearance de la sidebar + toolbar mobile. Applique <code>data-theme</code> sur <code>&lt;html&gt;</code> — tout le thème est piloté en CSS par <code>[data-theme]</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">View toggle</div>
            <p>Bascule l&apos;affichage de la bibliothèque entre grille (Book Cards) et liste (List Table). Toolbar de My Library, à côté des filtres.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Toggle vs Segmented Pills</div>
            <p>Deux cases mutuellement exclusives → toggle. Trois valeurs ou plus sur une piste (All / Books / Quotes / Words) → <strong>Segmented Pills</strong>, un composant distinct.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
