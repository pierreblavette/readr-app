"use client";
import { useState, useRef, useEffect } from "react";
import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";

// Sparkle en dégradé de l'onglet Photo (AI) — iso AddModal.
const AITabIcon = () => (
  <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="aiTabGrad" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F67BF8" /><stop offset="0.62" stopColor="#4959E6" />
      </linearGradient>
    </defs>
    <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiTabGrad)" />
  </svg>
);

const TABS = [
  { id: "photo", label: "Photo" },
  { id: "scan", label: "Barcode" },
  { id: "file", label: "File" },
  { id: "manual", label: "Manual" },
];

// Barre d'onglets réelle : indicateur mesuré (offsetLeft / width) sur l'actif,
// glisse en transition. .gradient quand l'onglet AI (Photo) est actif.
function Tabs({ active, onSelect }) {
  const refs = useRef([]);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const el = refs.current[TABS.findIndex((t) => t.id === active)];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);
  return (
    <div className="import-tabs-scroll">
      <div className="import-tabs">
        <div
          className={`import-tab-indicator${active === "photo" ? " gradient" : ""}`}
          style={{ left: ind.left, width: ind.width }}
        />
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            className={`import-tab${active === t.id ? " active" : ""}`}
            onClick={onSelect ? () => onSelect(t.id) : undefined}
          >
            {t.id === "photo" ? (
              <span className="import-tab-ai"><AITabIcon /><span className="import-tab-ai-text">Photo</span></span>
            ) : (
              t.label
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Anatomy : Barcode actif → l'actif (2) et l'onglet AI Photo (3) sont distincts,
// pas de chevauchement de badges. La piste (1) et l'indicateur (4) encadrent.
const ANNOS = [
  { n: 1, side: "top", target: ".import-tabs" },
  { n: 2, side: "top", target: ".import-tab.active" },
  { n: 3, side: "top", target: ".import-tab-ai" },
  { n: 4, side: "bottom", target: ".import-tab-indicator" },
];

const STATES = [
  ["Default", "", ".import-tab"],
  ["Hover", "is-hover", ":hover"],
  ["Focus", "is-focus", ":focus-visible"],
  ["Active", "active", ".active"],
];

export default function TabsPage() {
  const [active, setActive] = useState("photo");
  return (
    <DSSection
      className="ds-scene-frame"
      id="tabs"
      title="Tabs"
      sub="Un jeu d'onglets pour basculer entre les vues d'un même conteneur — l'indicateur 2px glisse sous l'actif. Utilisé par la modale d'ajout (Photo / Barcode / File / Manual)."
    >
      {/* ─────────── 1. PREVIEW — barre live ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-preview--roomy">
            <div className="ds-preview-card"><Tabs active={active} onSelect={setActive} /></div>
          </div>
          </div>
          <p className="ds-note">Specimen <strong>live</strong> — clique un onglet, l&apos;indicateur glisse dessous (<code>left / width</code> mesurés, 0.22s). L&apos;onglet <strong>Photo</strong> est <strong>AI</strong> : texte en dégradé + sparkle, et l&apos;indicateur passe en dégradé <span className="ds-token-chip">--ai-from</span> → <span className="ds-token-chip">--primary-50</span>. Un seul actif — l&apos;exclusivité est gérée par le consommateur.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition (UI réelle) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={ANNOS} stack>
            <div className="ds-anno-organism ds-preview-card">
              <Tabs active="scan" />
            </div>
          </AnnoScene>
          </div>
        </div>
      </div>

      {/* ─────────── 3. ELEMENTS ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Elements</div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.import-tabs</span></td><td>Piste : <code>flex</code>, gap 4, <code>border-bottom 1px</code> <span className="ds-token-chip">--border-subtle</span>, <code>position: relative</code> (ancre l&apos;indicateur), <code>width: max-content ; min-width: 100%</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.import-tab.active</span></td><td>Onglet actif : <span className="ds-token-chip">--primary-50</span> + <code>font-weight 600</code>. Onglet de base = <span className="ds-class">.import-tab</span> (36h · padding 0 16 · font 15/500 · <span className="ds-token-chip">--text-2</span>).</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.import-tab-ai</span></td><td>Onglet AI (Photo) : sparkle en dégradé + <span className="ds-class">.import-tab-ai-text</span> (texte clippé <span className="ds-token-chip">--primary-50</span> → <span className="ds-token-chip">--ai-accent</span>).</td><td><span className="now-reading-date now-reading-date--sm">Opt.</span></td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.import-tab-indicator</span></td><td>Barre 2px sous l&apos;actif — <code>absolute ; bottom: -1.5px</code>, glisse en <code>left / width</code> (0.22s). <span className="ds-class">.gradient</span> quand l&apos;onglet AI est actif.</td><td>—</td></tr>
            </tbody>
          </table>
          <p className="ds-note">Enveloppée dans <span className="ds-class">.import-tabs-scroll</span> (<code>overflow-x: auto</code>, scrollbar masquée, <code>padding-bottom 4</code> pour ne pas rogner l&apos;indicateur à <code>bottom: -1.5px</code>) → scroll horizontal en mobile quand les onglets dépassent. La section entière = <span className="ds-class">.modal-tabs-section</span> (colonne, gap 20).</p>
        </div>
      </div>

      {/* ─────────── 4. STATES — un onglet ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States · onglet</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STATES.map(([label, mod, cls]) => (
              <div key={label} className="ds-state-sample">
                <button type="button" className={`import-tab${mod ? " " + mod : ""}`}>{label}</button>
                <span className="ds-class">{cls}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Repos : <span className="ds-token-chip">--text-2</span>. Survol : <span className="ds-token-chip">--primary-50</span>. Focus clavier : <code>outline 2px</code> <span className="ds-token-chip">--primary-50</span> (offset 2), hérité du <code>*:focus-visible</code> global. Actif : <span className="ds-token-chip">--primary-50</span> + <code>600</code>, avec l&apos;indicateur qui glisse dessous (voir Anatomy). Pas d&apos;état disabled. Les <span className="ds-class">.is-hover</span> / <span className="ds-class">.is-focus</span> ne figent ici que le visuel pour la doc.</p>
        </div>
      </div>

      {/* ─────────── 5. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Quand l&apos;utiliser</div>
            <p>Basculer entre plusieurs <strong>vues d&apos;un même conteneur</strong> (les 4 méthodes d&apos;ajout d&apos;un livre). Pour filtrer des valeurs sur une même dimension (All / Books / Quotes), c&apos;est un <strong>Segmented Pills</strong> ; pour deux états, un <strong>Toggle</strong>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Modale d&apos;ajout de livre (<span className="ds-class">.modal-tabs-section</span>) : Photo (AI) · Barcode · File · Manual. Scroll horizontal en mobile (piste clippée).</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
