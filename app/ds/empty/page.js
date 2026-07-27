"use client";
import { useState, useRef, useEffect } from "react";
import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import NoMatchesIcon from "@/components/library/NoMatchesIcon";
import {
  LibraryIcon, WishlistIcon, OverviewIcon,
  OverviewGenresIcon, OverviewAuthorsIcon, OverviewLovedIcon,
  OverviewQuotesIcon, OverviewStreakIcon, OverviewGoalIcon,
} from "@/components/library/EmptyState";

const EMPTY_ANNOS = [
  { n: 1, side: "right", target: ".empty" },
  { n: 2, side: "left", target: ".empty-icon" },
  { n: 3, side: "left", target: ".empty-title" },
  { n: 4, side: "left", target: ".empty-sub" },
  { n: 5, side: "right", target: ".empty-cta" },
];

// Full-page empty (Library) — icône + texte + CTA, réutilisé en Preview / Anatomy / Spacing.
function FullEmpty({ padding }) {
  return (
    <div className="empty" style={padding ? { padding } : undefined}>
      <LibraryIcon />
      <div className="empty-text">
        <p className="empty-title">Your library is empty</p>
        <p className="empty-sub">Add your first book to start tracking what you read.</p>
      </div>
      <button type="button" className="empty-cta">Add a book</button>
    </div>
  );
}

const ICON_SET = [
  [LibraryIcon, "Library"],
  [WishlistIcon, "Wishlist"],
  [OverviewQuotesIcon, "Quotes"],
  [OverviewGenresIcon, "Genres"],
  [OverviewAuthorsIcon, "Authors"],
  [OverviewLovedIcon, "Most loved"],
  [OverviewGoalIcon, "Reading goal"],
  [OverviewStreakIcon, "Streak"],
  [OverviewIcon, "Overview"],
  [NoMatchesIcon, "No matches"],
];

// Colonnes du board Icon set pilotées par la largeur RÉELLE de la grille (ResizeObserver),
// pas le viewport (la sidebar /ds le fausse). Défaut = 2 col (le plus contraint) avant 1re
// mesure → jamais de débordement au 1er paint. On bascule les modifiers du board canonique.
function useBoardCols() {
  const ref = useRef(null);
  const [mod, setMod] = useState("ds-states-grid--cols-2 ds-states-grid--hold");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      setMod(w >= 800 ? "ds-states-grid--cols-5" : w >= 480 ? "ds-states-grid--cols-3" : "ds-states-grid--cols-2 ds-states-grid--hold");
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, mod];
}

export default function EmptyStatePage() {
  const [iconBoardRef, iconBoardMod] = useBoardCols();
  return (
    <DSSection
      id="empty"
      title="Empty State"
      sub="Layout gap-driven. Deux échelles : pleine page (icône 96, centré vertical, CTA optionnel) et mini dans une .overview-card (icône 60 horizontale passive, ou 72 verticale avec CTA)."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <FullEmpty />
          </div>
          </div>
          <p className="ds-note">L&apos;empty pleine page (Library) : illustration → texte → action. Le contenu est centré, l&apos;espacement est porté par le <code>gap</code> de la coquille (aucune marge). Le CTA n&apos;apparaît que si une action a du sens (ici « Add a book »).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={EMPTY_ANNOS}>
            <div className="ds-anno-organism"><FullEmpty padding="40px 20px" /></div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.empty</span></td><td>Coquille : <code>flex</code> colonne, <code>align-items: center</code>, <code>text-align: center</code>, gap <strong>24</strong>, padding <strong>80 20</strong>. <code>grid-column: 1 / -1</code> pour occuper toute la grille parente.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.empty-icon</span></td><td>Illustration <strong>96×96</strong> (viewBox 60), remplie de tokens <span className="ds-token-chip">--illus-*</span>. Une par contexte — voir <strong>Icon set</strong>.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.empty-title</span></td><td>Titre <code>18 / 700</code> <span className="ds-token-chip">--text</span>. Dans <span className="ds-class">.empty-text</span> (colonne, gap <strong>4</strong>).</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.empty-sub</span></td><td>Sous-texte <code>16 / 500</code> <span className="ds-token-chip">--text-2</span>, <code>max-width: 480</code> — la ligne reste lisible, ne s&apos;étire pas.</td><td>—</td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.empty-cta</span></td><td>Bouton d&apos;action plein <span className="ds-token-chip">--primary-50</span> (40 de haut). Présent seulement si une action fait avancer (Add a book / a wish). Passif sinon.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline padSelector=".empty-text">
                <FullEmpty />
              </Redline>
            </div>
          </div>
          <p className="ds-note">Tout est <strong>gap-driven</strong> : coquille padding <strong>80 20</strong>, gap <strong>24</strong> entre icône → texte → CTA. Dans <span className="ds-class">.empty-text</span>, gap <strong>4</strong> entre titre et sous-texte (coté à droite). Aucune marge sur les enfants. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — VARIANTS (mini overview) */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · mini (dans une overview-card)</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-1">
            {/* Horizontal passif */}
            <div className="ds-state-sample">
              <div className="overview-card" style={{ width: "100%", maxWidth: 620 }}>
                <div className="overview-card-head"><span className="panel-section-eyebrow">Top genres</span></div>
                <div className="empty overview-card-empty">
                  <OverviewGenresIcon />
                  <div className="empty-text">
                    <p className="empty-title">No genres yet</p>
                    <p className="empty-sub">Add books with a genre to see your top ones.</p>
                  </div>
                </div>
              </div>
              <span className="ds-class">horizontal · icône 60 · passif</span>
            </div>
            {/* Vertical + CTA */}
            <div className="ds-state-sample">
              <div className="overview-card overview-goal" style={{ width: "100%", maxWidth: 620 }}>
                <div className="overview-card-head"><span className="panel-section-eyebrow">Reading goal</span></div>
                <div className="empty overview-card-empty">
                  <div className="overview-card-empty-body">
                    <OverviewGoalIcon />
                    <div className="empty-text">
                      <p className="empty-title">Set a reading goal</p>
                      <p className="empty-sub">Track your progress toward a yearly target.</p>
                    </div>
                  </div>
                  <button type="button" className="btn btn-md btn-secondary">Set a goal</button>
                </div>
              </div>
              <span className="ds-class">vertical · icône 72 · CTA</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">La même primitive <span className="ds-class">.empty</span>, en réduction dans une carte. <strong>Horizontal</strong> (<span className="ds-class">.overview-card-empty</span> par défaut) : icône <strong>60</strong> à gauche + texte, aligné à gauche, passif — Top Genres / Authors / Most Loved / Quotes. <strong>Vertical</strong> (contexte <span className="ds-class">.overview-goal</span> / <span className="ds-class">.overview-streak</span> / <span className="ds-class">.overview-activity</span>) : icône <strong>72</strong> centrée ; Goal et Streak ajoutent un CTA (<span className="ds-class">.btn-secondary</span>) via un wrapper <span className="ds-class">.overview-card-empty-body</span>. En mobile, les 4 horizontales basculent en vertical centré.</p>
        </div>
      </div>

      {/* 6 — ICON SET */}
      <div className="ds-card">
        <div className="ds-card-head">Icon set · illustrations (viewBox 60, tokens --illus-*)</div>
        <div className="ds-card-body col">
          <div ref={iconBoardRef} className={`ds-states-grid ds-states-grid--boxed ${iconBoardMod}`}>
            {ICON_SET.map(([Icon, label]) => (
              <div key={label} className="ds-state-sample">
                <Icon />
                <span className="panel-section-eyebrow">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-foot">Composants réels importés de <code>EmptyState.js</code> — même illustration à toutes les échelles (96 pleine page, 72 / 60 en mini). Les couleurs viennent des tokens <span className="ds-token-chip">--illus-*</span>, thème-aware.</div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Deux échelles, un langage</div>
            <p><strong>Pleine page</strong> — quand toute une vue est vide (Library, Wishlist, Dictionary, résultat de recherche vide via <span className="ds-class">NoMatchesIcon</span>). <strong>Mini</strong> — quand une carte d&apos;un dashboard rempli est vide (7 cartes Overview). Même icône, même structure texte, échelle adaptée au contenant.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">CTA seulement si ça débloque</div>
            <p>Le CTA n&apos;apparaît que là où une action <em>résout</em> le vide : Library / Wishlist (« Add a book / a wish »), Reading Goal / Streak (« Set a goal »). Les cartes purement dérivées (Top Genres, Authors, Most Loved, Quotes, Weekly Activity) restent <strong>passives</strong> — elles se rempliront d&apos;elles-mêmes quand il y aura de la donnée.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Content</div>
            <p>Titre positif et concret (« Your library is empty », pas « No data »), sous-texte qui dit <em>quoi faire</em> ou <em>ce qui apparaîtra</em>. Jamais de ton d&apos;erreur — un vide n&apos;est pas un échec.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p><code>EmptyState</code> (Library / Wishlist + no-match), <code>DictionaryView</code>, <code>QuotesView</code>, <code>CollectionsView</code>, et les 7 mini-empties d&apos;<code>OverviewView</code>.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
