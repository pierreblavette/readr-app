"use client";
import { useRef, useEffect, useState } from "react";
import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";
import AnnoScene from "../_components/AnnoScene";

const CheckIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1.5,5 4,7.5 8.5,2.5" />
  </svg>
);

const DashIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="2" y1="5" x2="8" y2="5" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="7" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const WarnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* Markup identique à MarkAsReadingToggle (AddModal) : <label> porteur des modifiers,
   input natif masqué, faux carré, libellé. La coche est montée conditionnellement.
   indeterminate posé sur l'input natif (ref) + glyphe tiret. className appended (ex.
   .ds-anno-organism pour l'anatomy). Message → rangée enveloppée dans un champ. */
function ToggleRow({ checked, onChange, disabled, readOnly, indeterminate, focusDemo, label, status, message, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  const rowClass = [
    "cell-row cell-row--lg modal-toggle-row",
    disabled && "is-disabled",
    readOnly && "is-readonly",
    status === "error" && "has-error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const row = (
    <label className={rowClass}>
      <input
        ref={ref}
        type="checkbox"
        className="modal-toggle-input"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className={`modal-toggle-check${focusDemo ? " is-focus-demo" : ""}`}>
        {indeterminate ? <DashIcon /> : checked && <CheckIcon />}
      </span>
      <span className="modal-toggle-label">{label}</span>
    </label>
  );

  if (!message) return row;
  return (
    <div className="modal-toggle-field">
      {row}
      <span className={`modal-toggle-message is-${status}`}>
        {status === "warning" ? <WarnIcon /> : <ErrorIcon />}
        {message}
      </span>
    </div>
  );
}

// Décomposition numérotée : rangée (1) + carré (2) + libellé (3). L'input natif est masqué.
const ANNOS = [
  { n: 1, side: "top", target: ".modal-toggle-row" },
  { n: 2, side: "bottom", target: ".modal-toggle-check" },
  { n: 3, side: "bottom", target: ".modal-toggle-label" },
];

export default function CheckboxPage() {
  const [checked, setChecked] = useState(true);
  return (
    <DSSection
      id="checkbox"
      title="Checkbox"
      sub="Case 18×18 dans une rangée cliquable de 40px de haut — input natif masqué, carré dessiné en CSS."
    >
      {/* ─────────── 1. PREVIEW — rangée live ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <div style={{ width: 300 }}><ToggleRow checked={checked} onChange={setChecked} label="Mark as reading" /></div>
          </div>
          </div>
          <p className="ds-note">Specimen <strong>live</strong> — clique la rangée (pas seulement le carré) pour basculer. <strong>Toute la rangée</strong> est cliquable : c&apos;est le <code>&lt;label&gt;</code> qui porte la classe, cible 40px de haut sur toute la largeur.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY — décomposition numérotée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-organism" style={{ width: 260 }}>
              <ToggleRow checked label="Mark as reading" />
            </div>
          </AnnoScene>
          </div>
        </div>
        <div className="ds-card-body col">
          <table className="token-table ds-anno-table">
            <thead className="table-head"><tr><th>#</th><th>Element</th><th>Rôle</th><th>Opt.</th></tr></thead>
            <tbody className="table-body">
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal-toggle-row</span></td><td>Rangée : emprunte <span className="ds-class">.cell-row--lg</span> (min-height 40), gap <strong>12</strong> (écrase le 8 de <span className="ds-class">.cell-row</span>), <code>user-select: none</code>. Le <code>&lt;label&gt;</code> porte la classe → toute la rangée cliquable.</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.modal-toggle-input</span></td><td>Input natif <strong>masqué</strong> (<code>absolute; opacity 0; 0×0</code>) — <strong>pas</strong> <code>display: none</code> (garderait l&apos;a11y + clavier). Frère du carré → <code>:checked ~</code> / <code>:indeterminate ~</code> sans JS.</td><td><span className="now-reading-date now-reading-date--sm">Hidden</span></td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.modal-toggle-check</span></td><td>Carré : 18×18, radius 5, border 1.5 <span className="ds-token-chip">--border-subtle</span>, fond transparent ; coché → <span className="ds-token-chip">--primary-50</span> + coche svg 10 blanche.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.modal-toggle-label</span></td><td>Libellé : 15/500 <span className="ds-token-chip">--text</span> — palier « interactif », comme les boutons MD et les champs.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────── 3. SPACING — carré + gap + hauteur de rangée ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <Redline boxSelector=".modal-toggle-check">
              <ToggleRow checked label="Mark as reading" />
            </Redline>
          </div>
          <p className="ds-note">Carré <strong>18×18</strong> (radius 5) coté en boîte. <strong>Gap 12</strong> entre carré et libellé. Hauteur de rangée <strong>40</strong> (<span className="ds-class">.cell-row--lg</span>) — la cible tactile est toute la rangée, pas les 18px du carré. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* ─────────── 4. STATES ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample"><ToggleRow checked={false} label="Unselected" /><span className="ds-class">.modal-toggle-row</span></div>
            <div className="ds-state-sample"><ToggleRow checked label="Selected" /><span className="ds-class">:checked</span></div>
            <div className="ds-state-sample"><ToggleRow checked={false} focusDemo label="Focus" /><span className="ds-class">:focus-visible</span></div>
            <div className="ds-state-sample"><ToggleRow checked={false} disabled label="Disabled" /><span className="ds-class">.is-disabled</span></div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Les quatre états <strong>réellement utilisés</strong>. Le survol ne se simule pas : porté par <code>:hover</code> sur la rangée entière. Passe la souris — bordure <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-5</span> à vide, fond <span className="ds-token-chip">--primary-60</span> une fois coché.</p>
        </div>
      </div>

      {/* ─────────── 5. VARIANTS — états de référence, non consommés ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · reference states</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample"><ToggleRow indeterminate label="Indeterminate" /><span className="ds-class">:indeterminate</span></div>
            <div className="ds-state-sample"><ToggleRow checked readOnly label="Read-only" /><span className="ds-class">.is-readonly</span></div>
            <div className="ds-state-sample"><ToggleRow checked status="error" label="Error" message="This selection is required" /><span className="ds-class">.has-error</span></div>
            <div className="ds-state-sample"><ToggleRow checked status="warning" label="Warning" message="Double-check this choice" /><span className="ds-class">.is-warning</span></div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Ces quatre états existent dans le composant réel (<code>library.css</code>) mais <strong>aucun écran Readr ne les utilise aujourd&apos;hui</strong> — posés pour être prêts : <code>indeterminate</code> pour un futur select-all, <code>is-readonly</code> pour une valeur consultée, <code>has-error</code> / <span className="ds-class">.modal-toggle-message</span> pour une case obligatoire. Le message enveloppe la rangée dans <span className="ds-class">.modal-toggle-field</span> (colonne gap 8) ; <span className="ds-class">.modal-toggle-group</span> (gap 16) sert avec une <span className="ds-class">.modal-info-box</span>.</p>
        </div>
      </div>

      {/* ─────────── 6. VARIANTS — row selection (case de liste sans libellé) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · row selection</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {[["Default", ""], ["Hover", "is-hover"], ["Selected", "is-selected"]].map(([label, mod]) => (
              <div key={label} className="ds-state-sample">
                <span className={`row-checkbox${mod ? " " + mod : ""}`}><CheckIcon /></span>
                <span className="ds-class">{mod ? "." + mod : ".row-checkbox"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Row checkbox — la case sans libellé</div>
            <p>Même carré 18×18 / radius 5, mais <strong>sans libellé</strong> : une cible de sélection dans une rangée de <span className="ds-class">.list-table</span>. Repos bord <span className="ds-token-chip">--border-subtle</span> + fond <span className="ds-token-chip">--bg</span> ; survol (piloté par <code>.list-table tr:hover</code>) bord <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-5</span> ; sélectionné fond <span className="ds-token-chip">--primary-50</span> plein + coche blanche (svg 10, <code>opacity 0 → 1</code>). Case d&apos;en-tête <span className="ds-class">.all-selected</span> pour tout (dé)sélectionner. Alimente la <strong>Selection Bar</strong>.</p>
            <span className="ds-class">.row-checkbox</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Deux usages du même atome</div>
            <p>La <strong>Checkbox</strong> (sections ci-dessus) est un choix de <em>formulaire</em> — libellé + rangée cliquable 40px, effet au submit. La <strong>row checkbox</strong> est une <em>sélection multiple</em> de tableau — sans libellé, c&apos;est la rangée entière qui est la cible.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 7. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">State doctrine — la case cite les boutons</div>
            <p>Une case n&apos;est pas un composant à part : c&apos;est un bouton binaire. À vide elle se comporte comme <span className="ds-class">.btn-outline</span> (bordure + fond transparent → survol <span className="ds-token-chip">--primary-50</span> / <span className="ds-token-chip">--primary-5</span>) ; cochée comme <span className="ds-class">.btn-primary</span> (fond <span className="ds-token-chip">--primary-50</span> → survol <span className="ds-token-chip">--primary-60</span>). Toute évolution de <span className="ds-token-chip">--primary</span> se propage aux deux — pas de double échelle.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Checkbox vs toggle vs radio</div>
            <p><strong>Checkbox</strong> : plusieurs choix indépendants, <em>ou</em> un binaire appliqué à la validation d&apos;un formulaire (pas immédiatement) — « Mark as reading », effet au submit. <strong>Toggle</strong> : un réglage immédiat (thème, option). <strong>Radio / Segmented Pills</strong> : un seul choix mutuellement exclusif — jamais un groupe de checkboxes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Content &amp; alignment</div>
            <p>Libellé positif et actionnable — « Mark as reading », jamais « Ne pas marquer ». Le libellé reste à droite de la case. En liste, les cases s&apos;empilent verticalement : la colonne des carrés donne un ancrage scannable.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Premier usage : <code>AddModal</code> → « Mark as reading » (<code>MarkAsReadingToggle</code>). Pour la sélection de rangées, voir la variante <strong>row selection</strong> (même atome, sans libellé).</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
