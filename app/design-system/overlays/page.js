import DSSection from "../_components/DSSection";

// Méta-pattern : le SYSTÈME d'overlays de Readr, pas un organisme unique. Chaque
// surface a déjà sa page (Modals, Side Panels, Dropdown Menu, Toast, Editing/Bulk,
// Side Menu) ; ici on documente l'axe transverse — modalité, échelle de couches,
// comportements partagés (scrim, scroll-lock, focus, dismissal, motion).

// Échelle de couches réelle (library.css), du plus en avant au plus en arrière.
// tone: surface = overlay documenté ; chrome = repère (barre de l'app, non-overlay).
const LAYERS = [
  { z: 2000, cls: ".toast", label: "Toast", mod: "non-modal", tone: "surface" },
  { z: 1000, cls: ".ob-overlay", label: "Onboarding", mod: "modal", tone: "surface" },
  { z: 900, cls: ".confirm-modal-overlay", label: "Confirm / Delete", mod: "modal", tone: "surface" },
  { z: 700, cls: ".autocomplete-list", label: "Autocomplete", mod: "popover", tone: "surface" },
  { z: 600, cls: ".modal-overlay", label: "Form modal", mod: "modal", tone: "surface" },
  { z: 500, cls: ".selection-bar", label: "Selection bar", mod: "non-modal", tone: "surface" },
  { z: 400, cls: ".toolbar", label: "Chrome (toolbar)", mod: "repère", tone: "chrome" },
  { z: 330, cls: ".sidebar", label: "Side menu drawer", mod: "modal · mobile", tone: "surface" },
  { z: 320, cls: ".book-panel", label: "Side panel", mod: "semi-modal", tone: "surface" },
  { z: 200, cls: ".dropdown-menu", label: "Dropdown menu", mod: "non-modal", tone: "surface" },
];

export default function OverlaysPage() {
  return (
    <DSSection
      id="overlays"
      title="Overlays"
      sub="Tout ce qui se pose au-dessus du contenu : menu, panneau, dialogue, toast. Chacun a sa page ; ici on documente ce qui les gouverne — l'ordre des couches et les comportements partagés."
    >

      {/* 1 — PREVIEW : le scrim est le sujet, pas le composant posé dessus */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-overlays-scene">
              <div className="ds-overlays-behind" aria-hidden="true">
                <div className="ds-overlays-behind-title" />
                <div className="ds-overlays-behind-row" />
                <div className="ds-overlays-behind-row" />
                <div className="ds-overlays-behind-row" />
              </div>
              <div className="ds-overlays-scrim">
                <div className="ds-overlays-slot" aria-hidden="true">
                  <span className="ds-overlays-slot-label">Overlay surface</span>
                </div>
              </div>
            </div>
          </div>
          <p className="ds-note">Le sujet, c&apos;est le <strong>scrim</strong> — le voile posé sur le contenu, qui l&apos;<strong>estompe</strong> et le rend inerte le temps de l&apos;interaction (<span className="ds-token-chip">rgba(30,38,120,0.12)</span> + <code>backdrop-filter: blur(8px)</code>). Le placeholder au centre représente <em>n&apos;importe quelle</em> surface qui s&apos;y pose — modal, panel, toast. Chacune a sa page ; ici on documente ce qui les gouverne toutes.</p>
        </div>
      </div>

      {/* 2 — OVERVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Overview</div>
        <div className="ds-card-body col">
          <p className="ds-note">Un overlay répond à une seule question avant tout : <strong>bloque-t-il le contenu derrière lui&nbsp;?</strong> C&apos;est l&apos;axe de <strong>modalité</strong>. Il décide du scrim, du scroll-lock, du piège de focus et de la place dans l&apos;échelle de couches. Les surfaces de Readr se répartissent en deux familles.</p>
          <div className="ds-overlay-buckets">
            <div className="ds-overlay-bucket">
              <div className="ds-token-name">Non-modal · le contenu reste vivant</div>
              <p>On peut continuer à lire, scroller, cliquer derrière. Surface légère, sans scrim bloquant, dismiss au moindre geste extérieur.</p>
              <div className="ds-sample-row">
                <span className="ds-class">.dropdown-menu</span>
                <span className="ds-class">.autocomplete-list</span>
                <span className="ds-class">.selection-bar</span>
                <span className="ds-class">.toast</span>
              </div>
            </div>
            <div className="ds-overlay-bucket">
              <div className="ds-token-name">Modal · le contenu est gelé</div>
              <p>Scrim + scroll-lock + focus piégé jusqu&apos;au dismiss. Réservé aux gestes urgents ou focalisés (décision, formulaire, accueil).</p>
              <div className="ds-sample-row">
                <span className="ds-class">.modal-overlay</span>
                <span className="ds-class">.confirm-modal-overlay</span>
                <span className="ds-class">.ob-overlay</span>
                <span className="ds-class">.sidebar</span>
              </div>
            </div>
          </div>
          <p className="ds-note">Le <strong>Side panel</strong> est le cas nuancé : scrim léger + click-away sur desktop (semi-modal), drawer plein écran sur mobile. Le <strong>Dropdown</strong> et l&apos;<strong>Autocomplete</strong> sont des <em>popovers</em> — ancrés à un déclencheur, pas centrés.</p>
        </div>
      </div>

      {/* 3 — MODALITY */}
      <div className="ds-card">
        <div className="ds-card-head">Modality</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Non-modal</div>
            <p>La surface coexiste avec le contenu. Pas de scrim bloquant, pas de scroll-lock, pas de piège de focus. Le <span className="ds-class">.selection-bar</span> flotte pendant qu&apos;on coche des cartes ; le <span className="ds-class">.toast</span> confirme sans interrompre ; les popovers (<span className="ds-class">.dropdown-menu</span>, <span className="ds-class">.autocomplete-list</span>) se ferment au clic extérieur. <strong>À utiliser</strong> pour du contenu optionnel, contextuel ou persistant.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Modal</div>
            <p>La surface <strong>bloque</strong> : scrim par-dessus le contenu, scroll du body verrouillé, focus piégé à l&apos;intérieur jusqu&apos;au dismiss. <span className="ds-class">.modal-overlay</span> (formulaire), <span className="ds-class">.confirm-modal-overlay</span> (destructif), <span className="ds-class">.ob-overlay</span> (accueil), et le drawer <span className="ds-class">.sidebar</span> sur mobile. <strong>À utiliser</strong> pour un geste urgent ou focalisé qui exige une réponse avant de continuer.</p>
          </div>
          <p className="ds-note"><strong>Règle</strong> : un seul overlay <em>modal</em> primaire à la fois. La seule pile assumée est <span className="ds-class">.confirm-modal-overlay</span> (z 900) qui monte au-dessus d&apos;un <span className="ds-class">.modal-overlay</span> (z 600) — confirmer un destructif déclenché depuis un formulaire. Jamais trois niveaux.</p>
        </div>
      </div>

      {/* 4 — LAYERING */}
      <div className="ds-card">
        <div className="ds-card-head">Layering</div>
        <div className="ds-card-body col">
          <p className="ds-note">Une échelle <span className="ds-token-chip">z-index</span> unique et ordonnée évite la guerre des <code>z-index</code> ad hoc. Chaque surface a sa place ; le <strong>chrome (toolbar, z 400)</strong> est le repère : ce qui bloque le contenu passe au-dessus, un popover contextuel se glisse en dessous.</p>
          <div className="ds-layer-stack" aria-hidden="true">
            {LAYERS.map((l, i) => (
              <div
                key={l.z}
                className={`ds-layer${l.tone === "chrome" ? " is-chrome" : ""}`}
                style={{ marginLeft: i * 16 }}
              >
                <span className="ds-layer-z">{l.z}</span>
                <span className="ds-layer-label">{l.label}</span>
                <span className="ds-layer-cls">{l.cls}</span>
                <span className="ds-layer-mod">{l.mod}</span>
              </div>
            ))}
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Lecture de l&apos;échelle</div>
            <p>Le <span className="ds-class">.toast</span> (2000) domine tout — un feedback ne doit jamais être caché. Les modals occupent la bande <strong>600 → 1000</strong>, dans l&apos;ordre formulaire → destructif → accueil. Le <span className="ds-class">.autocomplete-list</span> (700) vit <em>au-dessus</em> de son modal hôte (600) car il en jaillit. En dessous du chrome (400) : les surfaces non-bloquantes ancrées au contenu — <span className="ds-class">.dropdown-menu</span> (200), <span className="ds-class">.book-panel</span> (320).</p>
          </div>
        </div>
      </div>

      {/* 5 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior · partagé</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Scrim (backdrop)</div>
            <p>Voile posé par l&apos;overlay modal : <span className="ds-token-chip">rgba(30,38,120,0.12)</span> en light (bleu très léger, iso marque), <span className="ds-token-chip">rgba(0,0,0,0.55)</span> en dark. Le <span className="ds-class">.modal</span> ajoute un <code>backdrop-filter: blur(8px)</code>. Le scrim <strong>intercepte le clic</strong> (dismiss) et signale visuellement que le dessous est gelé. Les non-modals n&apos;en ont pas.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Scroll-lock</div>
            <p>À l&apos;ouverture d&apos;un modal, le scroll du <code>body</code> est verrouillé et <strong>restauré à la fermeture</strong> (dans le cleanup, jamais en <code>else</code>). Sans lui, scroller le scrim fait défiler la page derrière — désorientant.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Focus</div>
            <p><span className="ds-class">useModalA11y</span> : <strong>Escape</strong> ferme, le focus est <strong>piégé</strong> dans l&apos;overlay, et <strong>restauré</strong> au déclencheur à la fermeture. Les panneaux (<span className="ds-class">.book-panel</span>) passent <code>autoFocus:false</code> — focus la coquille (contexte lecteur d&apos;écran), pas le premier bouton (le <span className="ds-class">.panel-close</span>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dismissal</div>
            <p>Trois sorties selon la modalité : <strong>Escape</strong> (tous les modals), <strong>clic sur le scrim</strong> (modals + panel desktop), <strong>bouton close</strong> explicite. Le <span className="ds-class">.toast</span> s&apos;auto-dismisse (3&nbsp;s) ; les popovers ferment au clic extérieur. Un destructif ne se ferme jamais sur un one-tap sans filet.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Motion</div>
            <p>Doctrine d&apos;entrée unifiée — <strong>une seule courbe</strong> <span className="ds-token-chip">cubic-bezier(0.16,1,0.3,1)</span> pour la surface, le scrim en simple fade <code>overlayIn 0.4s ease-out</code>. La surface entre depuis son origine, distance proportionnelle : modal <code>translateY(64px)</code>, toast <code>translateY(20px)</code>, panel <code>translateX(100%)</code>. <span className="ds-token-chip">prefers-reduced-motion</span> coupe toutes les animations d&apos;un bloc (garde centralisée).</p>
          </div>
        </div>
      </div>

      {/* 6 — COMPARISON */}
      <div className="ds-card">
        <div className="ds-card-head">Comparison</div>
        <div className="ds-card-body col">
          <div className="ds-overlay-table-wrap">
            <table className="token-table ds-overlay-table">
              <thead className="table-head">
                <tr><th>Surface</th><th>Modality</th><th>Scrim</th><th>Scroll-lock</th><th>Dismiss</th><th>z</th></tr>
              </thead>
              <tbody className="table-body">
                <tr className="table-row"><td><span className="ds-class">.dropdown-menu</span></td><td>non-modal</td><td>—</td><td>—</td><td>clic extérieur</td><td>200</td></tr>
                <tr className="table-row"><td><span className="ds-class">.book-panel</span></td><td>semi-modal</td><td>light · desktop</td><td>oui</td><td>scrim · close · Esc</td><td>320</td></tr>
                <tr className="table-row"><td><span className="ds-class">.sidebar</span></td><td>modal · mobile</td><td>oui</td><td>oui</td><td>scrim · Esc</td><td>330</td></tr>
                <tr className="table-row"><td><span className="ds-class">.selection-bar</span></td><td>non-modal</td><td>—</td><td>—</td><td>Cancel</td><td>500</td></tr>
                <tr className="table-row"><td><span className="ds-class">.modal-overlay</span></td><td>modal</td><td>oui + blur</td><td>oui</td><td>scrim · close · Esc</td><td>600</td></tr>
                <tr className="table-row"><td><span className="ds-class">.autocomplete-list</span></td><td>popover</td><td>—</td><td>—</td><td>clic extérieur · blur</td><td>700</td></tr>
                <tr className="table-row"><td><span className="ds-class">.confirm-modal-overlay</span></td><td>modal</td><td>oui + blur</td><td>oui</td><td>action · Esc</td><td>900</td></tr>
                <tr className="table-row"><td><span className="ds-class">.ob-overlay</span></td><td>modal</td><td>oui</td><td>oui</td><td>Skip · fin</td><td>1000</td></tr>
                <tr className="table-row"><td><span className="ds-class">.toast</span></td><td>non-modal</td><td>—</td><td>—</td><td>auto · 3&nbsp;s</td><td>2000</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Choisir la modalité par l&apos;interruption</div>
            <p>La question n&apos;est pas « panneau ou dialogue » mais « ai-je le droit d&apos;interrompre &nbsp;? ». Contenu optionnel, consultable en parallèle → <strong>non-modal</strong>. Réponse requise avant de continuer → <strong>modal</strong>. Ne jamais bloquer pour du confort.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Un modal primaire à la fois</div>
            <p>Pas d&apos;empilement de modals — sauf la pile assumée confirm (900) &gt; form (600). Si un flux réclame plusieurs étapes bloquantes, c&apos;est un seul modal multi-écran (l&apos;<span className="ds-class">.ob-overlay</span>), pas trois overlays.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Respecter l&apos;échelle</div>
            <p>Un nouvel overlay se range dans l&apos;échelle existante — jamais un <code>z-index</code> arbitraire qui « passe devant tout ». Au-dessus du chrome (400) = ça bloque ; en dessous = ancré au contenu. Le feedback (<span className="ds-class">.toast</span>) reste au sommet.</p>
          </div>
          <p className="ds-note"><strong>Pièces assemblées</strong> — cette page documente le système. Chaque surface a sa page : <span className="ds-class">Modals</span>, <span className="ds-class">Side Panels</span>, <span className="ds-class">Dropdown Menu</span>, <span className="ds-class">Toast</span>, <span className="ds-class">Side Menu</span>, et le mode sélection dans <span className="ds-class">Editing</span>.</p>
        </div>
      </div>

    </DSSection>
  );
}
