"use client";
import { useState } from "react";
import DSSection from "../_components/DSSection";
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

export default function TogglePage() {
  const { theme, setTheme } = useTheme();
  const [view, setView] = useState("grid");
  return (
    <DSSection
      id="toggle"
      title="Toggle"
      sub="Deux bascules de l'app : le thème clair/sombre (slider animé) et la vue grille/liste (segment à deux cases). Une seule valeur active à la fois."
    >
      {/* ─────────── THEME TOGGLE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Theme toggle</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="theme-btn" aria-label="Toggle theme">
                <span className="toggle-thumb">{theme === "dark" ? <MoonIcon /> : <SunIcon />}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Specimen <strong>live</strong> — clique-le, il bascule le thème de cette page. Light : piste <span className="ds-token-chip">--primary-10</span>, thumb à gauche, soleil. Dark : piste <span className="ds-token-chip">--primary-50</span>, thumb à droite (<code>translateX 22</code>), lune. C&apos;est le vrai composant library, plus de fork <code>-ds</code>.</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Track</div>
            <p>48×26, radius 13 (pill), padding 0 6, piste <span className="ds-token-chip">--primary-10</span> → <span className="ds-token-chip">--primary-50</span> en dark. Transition <code>background</code> 0.4s.</p>
            <span className="ds-class">.theme-btn</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Thumb</div>
            <p>Pastille 20×20 blanche, ombre douce, svg 10 <span className="ds-token-chip">--primary-40</span>. Glisse de 22px via <code>transform</code> — courbe <code>cubic-bezier(0.34, 1.56, 0.64, 1)</code>, léger dépassement élastique qui donne le « clac » du switch.</p>
            <span className="ds-class">.toggle-thumb</span>
          </div>
        </div>
      </div>

      {/* ─────────── VIEW TOGGLE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">View toggle</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <ViewToggle view={view} setView={setView} />
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Specimen <strong>live</strong> — clique une case, elle bascule. Segment à deux cases, une seule active : la case active prend le fond primary plein, le survol d&apos;une case inactive teinte en <span className="ds-token-chip">--primary-5</span>. Grille et liste sont mutuellement exclusives — pas de radio, juste deux boutons dont l&apos;un porte <span className="ds-class">.active</span>.</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Container</div>
            <p>Rangée flex, height 40, <code>outline: 1.5px</code> <span className="ds-token-chip">--border-subtle</span>, radius 8, <code>overflow: hidden</code> (les coins des cases suivent). Un seul contour extérieur, pas de bordure par case.</p>
            <span className="ds-class">.view-btns</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Button</div>
            <p>40×40, svg 18, fond blanc (<span className="ds-token-chip">--bg3</span> dark). Séparateur 1px entre les deux cases. Hover inactif : fond <span className="ds-token-chip">--primary-5</span> + <span className="ds-token-chip">--primary-50</span>. Actif : fond <span className="ds-token-chip">--primary-50</span> + icône blanche.</p>
            <span className="ds-class">.view-btn</span>
          </div>
        </div>
      </div>

      {/* ─────────── USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Theme toggle</div>
            <p>Bascule light/dark, persistée. Placée dans la rangée Appearance de la sidebar et dans la toolbar mobile. Applique <code>data-theme</code> sur <code>&lt;html&gt;</code> — tout le reste du thème est piloté en CSS par <code>[data-theme]</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">View toggle</div>
            <p>Bascule l&apos;affichage de la bibliothèque entre grille (Book Cards) et liste (List Table). Placée dans la toolbar de My Library, à côté des filtres.</p>
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
