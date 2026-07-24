"use client";
import { useRef, useEffect } from "react";
import DSSection from "../_components/DSSection";
import Redline from "../_components/Redline";

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

/* Markup identique à MarkAsReadingToggle (AddModal) : <label> porteur des
   modifiers, input natif masqué, faux carré, libellé. La coche est montée
   conditionnellement comme dans le produit. indeterminate est posé sur l'input
   natif (ref) pour l'arbre d'accessibilité, et son glyphe tiret en JS. Quand un
   message est fourni, la rangée est enveloppée dans un champ (rangée + message). */
function ToggleRow({ checked, onChange, disabled, readOnly, indeterminate, focusDemo, label, status, message }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  const rowClass = [
    "cell-row cell-row--lg modal-toggle-row",
    disabled && "is-disabled",
    readOnly && "is-readonly",
    status === "error" && "has-error",
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
      {/* .is-focus-demo force le halo :focus-visible pour l'échantillon statique —
          le vrai état ne s'obtient qu'au clavier. Valeurs miroir de library.css. */}
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

export default function CheckboxPage() {
  return (
    <DSSection
      id="checkbox"
      title="Checkbox"
      sub="Case 18×18 dans une rangée cliquable de 40px de haut — input natif masqué, carré dessiné en CSS."
    >
      {/* ─────────── 1. STATES ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">States</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <ToggleRow checked={false} label="Unselected" />
            </div>
            <div className="ds-state-sample">
              <ToggleRow checked label="Selected" />
            </div>
            <div className="ds-state-sample">
              <ToggleRow checked={false} focusDemo label="Focus" />
            </div>
            <div className="ds-state-sample">
              <ToggleRow checked={false} disabled label="Disabled" />
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Les quatre états <strong>réellement utilisés</strong> dans l&apos;app. Le survol ne se simule pas : il est porté par <code>:hover</code> sur la rangée entière, pas par une classe. Passe la souris sur les échantillons — bordure <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-5</span> à vide, fond <span className="ds-token-chip">--primary-60</span> une fois coché.</p>
        </div>
      </div>

      {/* ─────────── 2. ANATOMY ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          {/* Schéma coté mesuré au runtime — boxSelector cadre le carré (taille +
              radius), gap et hauteur mesurés comme sur la planche Buttons. */}
          <div className="ds-redline-board">
            <Redline boxSelector=".modal-toggle-check">
              <ToggleRow checked label="Mark as reading" />
            </Redline>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Row</div>
            <p>La rangée n&apos;invente pas sa hauteur : elle emprunte <span className="ds-class">.cell-row--lg</span> (min-height 40), la primitive partagée avec <span className="ds-class">.search-row</span> et <span className="ds-class">.sidebar-appearance-row</span>. <span className="ds-class">.modal-toggle-row</span> écrase le gap 8 de <span className="ds-class">.cell-row</span> pour le porter à <strong>12</strong> (le gap canonique des rangées icône/case + label, partagé avec <span className="ds-class">.dropdown-item</span>), et ajoute le curseur + <code>user-select: none</code> — sans lui, un double-clic sélectionnerait le texte du libellé au lieu de basculer la case. C&apos;est le <code>&lt;label&gt;</code> qui porte la classe : <strong>toute la rangée est cliquable</strong> (cible 40px de haut sur toute la largeur), pas seulement le carré de 18px.</p>
            <span className="ds-class">.modal-toggle-row</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Native input</div>
            <p>Masqué par <code>position: absolute; opacity: 0; width/height: 0</code> — et surtout <strong>pas</strong> par <code>display: none</code>, qui le retirerait de l&apos;arbre d&apos;accessibilité et du parcours clavier. L&apos;état coché reste porté par un vrai champ de formulaire, pas simulé.</p>
            <span className="ds-class">.modal-toggle-input</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Check square</div>
            <p>18×18, radius 5, bordure 1.5 <span className="ds-token-chip">--border-subtle</span>, fond transparent. La coche est un SVG 10×10 blanc. C&apos;est le frère de l&apos;input, ce qui permet aux sélecteurs <code>:checked ~</code> et <code>:indeterminate ~</code> de le styler sans JS.</p>
            <span className="ds-class">.modal-toggle-check</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Label</div>
            <p>15/500 <span className="ds-token-chip">--text</span> — le palier « interactif », le même que les boutons MD et les champs de saisie.</p>
            <span className="ds-class">.modal-toggle-label</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Field (row + message)</div>
            <p>Colonne gap 8 qui enveloppe la rangée quand un message de validation la suit. Le message <span className="ds-class">.modal-toggle-message</span> (13/500, icône 16) prend <span className="ds-class">.is-error</span> <span className="ds-token-chip">--destructive</span> ou <span className="ds-class">.is-warning</span> ambre. Distinct de la <span className="ds-class">.modal-info-box</span>, plus lourde, réservée à une explication encadrée.</p>
            <span className="ds-class">.modal-toggle-field</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Group</div>
            <p>Colonne, gap 16. Sert quand la rangée est suivie d&apos;une <span className="ds-class">.modal-info-box</span> expliquant pourquoi elle est désactivée.</p>
            <span className="ds-class">.modal-toggle-group</span>
          </div>
        </div>
      </div>

      {/* ─────────── 3. VARIANTS — états de référence, non consommés ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · reference states</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <ToggleRow indeterminate label="Indeterminate" />
            </div>
            <div className="ds-state-sample">
              <ToggleRow checked readOnly label="Read-only" />
            </div>
            <div className="ds-state-sample">
              <ToggleRow checked status="error" label="Error" message="This selection is required" />
            </div>
            <div className="ds-state-sample">
              <ToggleRow checked status="warning" label="Warning" message="Double-check this choice" />
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Ces quatre états existent dans le composant réel (<code>library.css</code>) mais <strong>aucun écran Readr ne les utilise aujourd&apos;hui</strong> — posés pour être prêts : <code>indeterminate</code> pour un futur select-all, <code>is-readonly</code> pour une valeur consultée non modifiable, <code>has-error</code> / <span className="ds-class">.modal-toggle-message</span> pour une case obligatoire dans un formulaire validé.</p>
        </div>
      </div>

      {/* ─────────── 4. VARIANTS — row selection (case de liste sans libellé) ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Variants · row selection</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {[["Default", ""], ["Hover", "is-hover"], ["Selected", "is-selected"]].map(([label, mod]) => (
              <div key={label} className="ds-state-sample">
                <span className={`row-checkbox${mod ? " " + mod : ""}`}><CheckIcon /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Row checkbox — la case sans libellé</div>
            <p>Même carré 18×18 / radius 5, mais <strong>sans libellé</strong> : une cible de sélection dans une rangée de <span className="ds-class">.list-table</span>. Repos bord <span className="ds-token-chip">--border-subtle</span> + fond <span className="ds-token-chip">--bg</span> ; survol (piloté par <code>.list-table tr:hover</code>, pas par la case) bord <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-5</span> ; sélectionné fond <span className="ds-token-chip">--primary-50</span> plein + coche blanche (svg 10, <code>opacity 0 → 1</code>). Case d&apos;en-tête <span className="ds-class">.all-selected</span> dans <span className="ds-class">.th-checkbox-wrap</span> pour tout (dé)sélectionner. Alimente la <strong>Selection Bar</strong>.</p>
            <span className="ds-class">.row-checkbox</span>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Deux usages du même atome</div>
            <p>La <strong>Checkbox</strong> (sections ci-dessus) est un choix de <em>formulaire</em> — libellé + rangée cliquable 40px, effet au submit. La <strong>row checkbox</strong> est une <em>sélection multiple</em> de tableau — sans libellé, c&apos;est la rangée entière qui est la cible.</p>
          </div>
        </div>
      </div>

      {/* ─────────── 5. USAGE ─────────── */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">State doctrine — la case cite les boutons</div>
            <p>Une case n&apos;est pas un composant à part : c&apos;est un bouton binaire. À vide elle se comporte comme <span className="ds-class">.btn-outline</span> (bordure + fond transparent → survol <span className="ds-token-chip">--primary-50</span> / <span className="ds-token-chip">--primary-5</span>) ; cochée comme <span className="ds-class">.btn-primary</span> (fond <span className="ds-token-chip">--primary-50</span> → survol <span className="ds-token-chip">--primary-60</span> ; dark <span className="ds-token-chip">--primary-40</span> → <span className="ds-token-chip">--primary-50</span>). Toute évolution de <span className="ds-token-chip">--primary</span> se propage aux deux — pas de double échelle à maintenir.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Checkbox vs toggle vs radio</div>
            <p><strong>Checkbox</strong> : plusieurs choix indépendants, <em>ou</em> un binaire qui s&apos;applique à la validation d&apos;un formulaire (pas immédiatement) — cas de « Mark as reading », effet au submit. <strong>Toggle</strong> : un réglage qui prend effet <em>immédiatement</em> (thème, option). <strong>Radio / Segmented Pills</strong> : un seul choix mutuellement exclusif — jamais un groupe de checkboxes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Content &amp; alignment</div>
            <p>Libellé positif et actionnable — « Mark as reading », jamais « Ne pas marquer » (un libellé négatif force à cocher pour refuser). Le libellé reste à droite de la case. En liste, les cases s&apos;empilent verticalement : la colonne des carrés donne un ancrage scannable — une rangée horizontale devient illisible dès trois items.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers</div>
            <p>Premier usage : <code>AddModal</code> → « Mark as reading » (<code>MarkAsReadingToggle</code>). Pour la sélection de rangées en liste, voir la variante <strong>row selection</strong> ci-dessus (même atome, sans libellé).</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
