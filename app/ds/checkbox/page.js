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
      <div className="ds-card">
        <div className="ds-card-head">États</div>
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

      <div className="ds-card">
        <div className="ds-card-head">États de référence — non consommés</div>
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
          <p className="ds-note">Ces quatre états existent dans le composant réel (<code>library.css</code>) mais <strong>aucun écran Readr ne les utilise aujourd&apos;hui</strong> — ils sont posés pour être prêts le jour où un usage les appelle : <code>indeterminate</code> pour un futur select-all, <code>is-readonly</code> pour une valeur consultée non modifiable, <code>has-error</code> / <code>.modal-toggle-message</code> pour une case obligatoire dans un formulaire validé. Inspiration Carbon, filtrée à ce qui a du sens pour l&apos;app.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          {/* Schéma coté mesuré au runtime (jamais de valeur en dur) — boxSelector
              cadre le carré et cote sa taille + son radius ; le gap et la hauteur
              de cible sont mesurés comme sur la planche Buttons. Le wrapper
              .ds-redline-board absorbe le padding 20 du modèle, laissant au
              .ds-redline ses 48 (sinon .ds-card-body > *:not(table), plus
              spécifique, écrase le padding et les cotes se font couper). */}
          <div className="ds-redline-board">
            <Redline boxSelector=".modal-toggle-check">
              <ToggleRow checked label="Mark as reading" />
            </Redline>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">label.cell-row.cell-row--lg.modal-toggle-row</div>
            <p>La rangée n&apos;invente pas sa hauteur : elle emprunte <code>.cell-row--lg</code> (min-height 40), la primitive partagée avec <code>.search-row</code> et <code>.sidebar-appearance-row</code>. <code>.modal-toggle-row</code> n&apos;ajoute que le gap 10, le curseur et <code>user-select: none</code> — sans lui, un double-clic sélectionnerait le texte du libellé au lieu de basculer la case. C&apos;est le <code>&lt;label&gt;</code> qui porte la classe : <strong>toute la rangée est cliquable</strong>, pas seulement le carré de 18px, pour une cible de 40px de haut sur toute la largeur de la modale en usage réel.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">input.modal-toggle-input · l&apos;input natif, masqué</div>
            <p>Masqué par <code>position: absolute; opacity: 0; width/height: 0</code> — et surtout <strong>pas</strong> par <code>display: none</code>, qui le retirerait de l&apos;arbre d&apos;accessibilité et du parcours clavier. L&apos;état coché reste donc porté par un vrai champ de formulaire, pas simulé.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">span.modal-toggle-check · le carré visible</div>
            <p>18×18, radius 5, bordure 1.5 <span className="ds-token-chip">--border-subtle</span>, fond transparent. La coche est un SVG 10×10 blanc. C&apos;est le frère de l&apos;input, ce qui permet aux sélecteurs <code>:checked ~</code> et <code>:indeterminate ~</code> de le styler sans JS.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">span.modal-toggle-label · le libellé</div>
            <p>15/500 <span className="ds-token-chip">--text</span> — le palier « interactif », le même que les boutons MD et les champs de saisie.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.modal-toggle-field · rangée + message</div>
            <p>Colonne gap 8 qui enveloppe la rangée quand un message de validation la suit. Le message <code>.modal-toggle-message</code> (13/500, icône 16) prend <code>.is-error</code> <span className="ds-token-chip">--destructive</span> ou <code>.is-warning</code> ambre. Distinct de la <code>.modal-info-box</code>, plus lourde, réservée à une explication encadrée.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">.modal-toggle-group · conteneur</div>
            <p>Colonne, gap 16. Sert quand la rangée est suivie d&apos;une <code>.modal-info-box</code> expliquant pourquoi elle est désactivée.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Doctrine d&apos;états — la case cite les boutons</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">À vide → .btn-outline</div>
            <p>Bordure + fond transparent au repos, bordure <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-5</span> au survol. Exactement le comportement d&apos;un bouton outline.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Cochée → .btn-primary</div>
            <p>Fond <span className="ds-token-chip">--primary-50</span> plein, bordure transparente, survol <span className="ds-token-chip">--primary-60</span>. En dark, <span className="ds-token-chip">--primary-40</span> puis <span className="ds-token-chip">--primary-50</span> — la même descente d&apos;un cran que les boutons primaires.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Pourquoi c&apos;est important</div>
            <p>Une case n&apos;est pas un composant à part : c&apos;est un bouton binaire. Lui donner ses propres couleurs d&apos;état obligerait à maintenir deux échelles en parallèle et à les voir diverger. Ici toute évolution de <span className="ds-token-chip">--primary-50</span> / <span className="ds-token-chip">--primary-60</span> se propage aux deux.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Quand l&apos;utiliser — checkbox, toggle ou radio</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Checkbox</div>
            <p>Plusieurs choix indépendants cochables séparément, <strong>ou</strong> un binaire qui s&apos;applique à la validation d&apos;un formulaire — pas immédiatement. C&apos;est le cas de « Mark as reading » : la case prend effet au submit de la modale, pas au clic.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Toggle</div>
            <p>Un réglage qui prend effet <strong>immédiatement</strong>, sans étape de validation — thème clair/sombre, activer une option. Si l&apos;action est instantanée et se défait d&apos;un geste, c&apos;est un toggle, pas une checkbox.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Radio · Segmented Pills</div>
            <p>Un seul choix parmi plusieurs, mutuellement exclusifs. Dès qu&apos;une seule valeur peut être vraie à la fois, radio ou <strong>Segmented Pills</strong> — jamais un groupe de checkboxes.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Contenu &amp; alignement</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Libellé</div>
            <p>Formulation positive et actionnable — « Mark as reading », jamais « Ne pas marquer ». Un libellé négatif force à cocher pour refuser : source d&apos;erreur. Le libellé reste à droite de la case, jamais à gauche.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Alignement en liste</div>
            <p>Plusieurs cases s&apos;empilent verticalement, une par ligne : la colonne des carrés donne un point d&apos;ancrage scannable. Une rangée horizontale de cases devient illisible dès trois items.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <p>Premier usage : <code>AddModal</code> → « Mark as reading » (<code>MarkAsReadingToggle</code>). Pour une case de sélection dans une rangée de liste, voir <strong>Row Checkbox</strong>, qui est un composant distinct — cible plus petite, contexte de sélection multiple.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
