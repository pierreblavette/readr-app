"use client";
import { useState } from "react";
import DSSection from "../_components/DSSection";

const CheckIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1.5,5 4,7.5 8.5,2.5" />
  </svg>
);

/* Markup identique à MarkAsReadingToggle (AddModal) : <label> porteur des deux
   modifiers, input natif masqué, faux carré, libellé. La coche est montée
   conditionnellement comme dans le produit — d'où l'état local. */
function ToggleRow({ checked, onChange, disabled, label }) {
  return (
    <label className={`cell-row cell-row--lg modal-toggle-row${disabled ? " is-disabled" : ""}`}>
      <input
        type="checkbox"
        className="modal-toggle-input"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className="modal-toggle-check">{checked && <CheckIcon />}</span>
      <span className="modal-toggle-label">{label}</span>
    </label>
  );
}

export default function CheckboxPage() {
  const [live, setLive] = useState(false);

  return (
    <DSSection
      id="checkbox"
      title="Checkbox"
      sub="Case 18×18 dans une rangée cliquable de 40px de haut — input natif masqué, carré dessiné en CSS."
    >
      <div className="ds-card">
        <div className="ds-card-head">États</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--top">
            <div className="ds-state-sample">
              <span className="panel-section-eyebrow">Unchecked</span>
              <ToggleRow checked={false} label="Mark as reading" />
            </div>
            <div className="ds-state-sample">
              <span className="panel-section-eyebrow">Checked</span>
              <ToggleRow checked label="Mark as reading" />
            </div>
            <div className="ds-state-sample">
              <span className="panel-section-eyebrow">Disabled</span>
              <ToggleRow checked={false} disabled label="Mark as reading" />
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Le survol ne se simule pas : il est porté par <code>:hover</code> sur la rangée entière, pas par une classe. Passe la souris sur les échantillons ci-dessus — bordure <span className="ds-token-chip">--primary-50</span> + fond <span className="ds-token-chip">--primary-5</span> à vide, fond <span className="ds-token-chip">--primary-60</span> une fois coché.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Démo — rangée cliquable</div>
        <div className="ds-card-body col">
          {/* .ds-sample-row obligatoire : enfant direct, la rangée recevrait le
              padding 20 du modèle et passerait de 40px à 63px de haut. */}
          <div className="ds-sample-row">
            <ToggleRow checked={live} onChange={setLive} label="Mark as reading" />
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Toute la rangée est cliquable, pas seulement le carré de 18px : c&apos;est le <code>&lt;label&gt;</code> qui porte la classe, donc le libellé bascule aussi la case. En usage réel elle occupe la largeur de la modale, pour une cible de 40px de haut sur toute cette largeur.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">label.cell-row.cell-row--lg.modal-toggle-row</div>
            <p>La rangée n&apos;invente pas sa hauteur : elle emprunte <code>.cell-row--lg</code> (min-height 40), la primitive partagée avec <code>.search-row</code> et <code>.sidebar-appearance-row</code>. <code>.modal-toggle-row</code> n&apos;ajoute que le gap 10, le curseur et <code>user-select: none</code> — sans lui, un double-clic sélectionnerait le texte du libellé au lieu de basculer la case.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">input.modal-toggle-input · l&apos;input natif, masqué</div>
            <p>Masqué par <code>position: absolute; opacity: 0; width/height: 0</code> — et surtout <strong>pas</strong> par <code>display: none</code>, qui le retirerait de l&apos;arbre d&apos;accessibilité et du parcours clavier. L&apos;état coché reste donc porté par un vrai champ de formulaire, pas simulé.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">span.modal-toggle-check · le carré visible</div>
            <p>18×18, radius 5, bordure 1.5 <span className="ds-token-chip">--border-subtle</span>, fond transparent. La coche est un SVG 10×10 blanc. C&apos;est le frère de l&apos;input, ce qui permet au sélecteur <code>:checked ~</code> de le styler sans JS.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">span.modal-toggle-label · le libellé</div>
            <p>15/500 <span className="ds-token-chip">--text</span> — le palier « interactif », le même que les boutons MD et les champs de saisie.</p>
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
        <div className="ds-card-head">Accessibilité</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Ce qui est acquis</div>
            <p>Input natif conservé : rôle, état coché et navigation clavier viennent du navigateur. Le <code>&lt;label&gt;</code> englobant lie le texte à la case sans <code>for</code>/<code>id</code>. Espace bascule, Tab traverse.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Manque — pas d&apos;indicateur de focus</div>
            <p>Aucune règle <code>:focus-visible</code> ne cible <code>.modal-toggle-check</code> : au clavier, la case reçoit le focus sans que rien ne l&apos;indique, puisque l&apos;input réel est invisible. Les autres composants du DS traitent ce cas (<code>.book-chip-interactive</code> et <code>.book-chip-remove</code> posent un <code>box-shadow: 0 0 0 2px --primary-50</code>). À aligner.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Désactivé</div>
            <p><code>.is-disabled</code> pose opacité 0.5 et <code>cursor: not-allowed</code> sur la rangée, l&apos;attribut <code>disabled</code> sur l&apos;input. La raison du blocage est portée par un <code>title</code> et par une <code>.modal-info-box</code> sous la rangée — jamais laissée à deviner.</p>
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
