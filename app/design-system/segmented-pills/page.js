"use client";
import { useState } from "react";
import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

// Segment assemblé — une piste, N pills, une seule .is-active.
function Segment({ size = "", active = "All", items = ["All", "Books", "Quotes"], onSelect, className = "" }) {
  const s = size ? " is-" + size : "";
  return (
    <div className={`overview-activity-pills${s}${className ? " " + className : ""}`} role="tablist">
      {items.map((label) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={active === label}
          onClick={onSelect ? () => onSelect(label) : undefined}
          className={`overview-activity-pill${s}${active === label ? " is-active" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const STATES = [
  ["Default", ""],
  ["Hover", "is-hover"],
  ["Active", "is-active"],
];

const SIZES = [
  ["xs", "24px · padding 0 10 · font 12 · track 2"],
  ["sm", "32px · padding 0 12 · font 13 · track 3 — défaut"],
  ["md", "40px · padding 0 16 · font 14 · track 4"],
  ["lg", "48px · padding 0 20 · font 14 · track 5"],
];

// Décomposition numérotée : piste (1) + pill (2) + pill active (3).
const ANNOS = [
  { n: 1, side: "top", target: ".overview-activity-pills" },
  { n: 2, side: "bottom", target: ".overview-activity-pill:not(.is-active)" },
  { n: 3, side: "bottom", target: ".overview-activity-pill.is-active" },
];

export default function SegmentedPillsPage() {
  const [active, setActive] = useState("All");
  return (
    <DSSection
      className="ds-scene-frame"
      id="segmented-pills"
      title="Segmented Pills"
      sub="Un sélecteur segmenté : plusieurs valeurs sur une même piste, une seule active. Pour basculer une vue ou une plage."
    >
      {/* ─────────── 1. PREVIEW — segment live ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <Segment active={active} onSelect={setActive} size="md" />
          </div>
          </div>
          <p className="ds-note">Specimen <strong>live</strong> — clique une pill, elle devient active. Une seule <span className="ds-class">.is-active</span> à la fois ; la piste ne gère pas l&apos;exclusivité, c&apos;est le consommateur.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée (UI réelle) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={ANNOS} stack>
            <div className="overview-activity-pills is-md ds-anno-organism" role="tablist">
              <button type="button" className="overview-activity-pill is-md is-active">All</button>
              <button type="button" className="overview-activity-pill is-md">Books</button>
              <button type="button" className="overview-activity-pill is-md">Quotes</button>
            </div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.overview-activity-pills</span></td><td>Piste : <code>inline-flex</code>, gap 4, padding 4 (md), fond <span className="ds-token-chip">--bg3</span>, radius 999 (pill). Le padding enferme les pills dans la gouttière.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.overview-activity-pill</span></td><td>Segment : <code>&lt;button&gt;</code>, radius 999, fond transparent au repos, libellé seul. Ici en <strong>md</strong> (40 · padding 0 16 · font 14) — échelle complète en Sizing.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.is-active</span></td><td>Segment actif : fond <span className="ds-token-chip">--primary-50</span> plein, texte blanc. Pas d&apos;indicateur qui glisse — chaque pill porte son propre fond.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — piste + gaps ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            {SIZES.map(([size]) => (
              <div key={size} className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
                <Redline keepShape><Segment size={size} /></Redline>
              </div>
            ))}
          </div>
          <p className="ds-note">Une planche par taille — <strong>gap constant 4</strong> entre les pills (micro-gap DS), hauteur de pill 24 → 32 → 40 → 48 (step 8). Le padding de piste (2 / 3 / 4 / 5) vit dans l&apos;arrondi de la pill et n&apos;est pas coté en bande (non lisible dans un coin arrondi). Fond <span className="ds-token-chip">--bg3</span> et radius pill conservés (<code>keepShape</code>). Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — une pill ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · pill</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([label, mod]) => (
              <div key={label} className="ds-state-sample">
                <button type="button" className={`overview-activity-pill is-md${mod ? " " + mod : ""}`}>{label}</button>
                <span className="ds-class">{mod === "is-active" ? ".is-active" : mod === "is-hover" ? ":hover" : ".overview-activity-pill"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Repos : texte <span className="ds-token-chip">--text-2</span>, fond transparent. Survol non-actif : texte <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-10</span>. Active : fond <span className="ds-token-chip">--primary-50</span> plein + texte blanc.</p>
        </div>
      </div>

      {/* ─────────── 5. SIZING — xs / sm / md / lg ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Sizing</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            {SIZES.map(([size]) => (
              <div key={size} className="ds-state-sample">
                <Segment size={size} />
                <span className="ds-class">.is-{size}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {SIZES.map(([size, spec]) => (
            <div key={size} className="ds-token-block">
              <div className="ds-token-name">{size.toUpperCase()}</div>
              <p>{spec}.</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────── 6. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Quand l&apos;utiliser</div>
            <p><strong>3 valeurs ou plus</strong> mutuellement exclusives sur une même dimension (All / Books / Quotes / Words). Pour <strong>2 valeurs</strong> (grille/liste, clair/sombre), c&apos;est un <strong>Toggle</strong>. Pour un choix de formulaire validé au submit, un groupe radio ou une Checkbox.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Weekly Activity (filtre All / Books / Quotes / Words en <span className="ds-class">.is-xs</span>, plage Week / Month). La taille s&apos;adapte à la densité du conteneur.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
