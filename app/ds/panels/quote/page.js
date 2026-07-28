import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { QuotePanelSpec } from "./_specs";

const ANNOS = [
  { n: 1, side: "right", target: ".panel-close" },
  { n: 2, side: "left", target: ".panel-info-meta" },
  { n: 3, side: "right", target: ".panel-info .panel-actions" },
  { n: 4, side: "left", target: ".panel-inner > .panel-section" },
  { n: 5, side: "bottom", target: ".panel-inner > .panel-actions" },
];

export default function QuotePanelPage() {
  return (
    <DSSection
      id="quote-panel"
      title="Quote Panel"
      sub="Panneau de détail d'une citation — même coquille slide-in que Side Panel (primitive .book-panel), sans cover. La citation en tête (guillemets accent + date), ses actions (Edit · Loved · Share), le livre d'origine (Book Row), puis Delete."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <QuotePanelSpec />
            </div>
          </div>
          <p className="ds-note">Une citation enregistrée : le texte entre <span className="ds-class">.quote-mark</span> (accent), sa date, la rangée d&apos;actions (<em>Edit</em> · <em>Loved</em> actif · <em>Share</em>), le livre d&apos;origine en <a href="/ds/book-chip"><strong>Book Row</strong></a>, et <em>Delete</em>. Même coquille détachée (radius 8 + ombre) que <a href="/ds/panels/side"><strong>Side Panel</strong></a> ; en prod <code>fixed</code>, dockée au bord droit, slide-in.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={ANNOS}>
              <QuotePanelSpec className="ds-anno-organism" />
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
              <tr className="table-row"><td>·</td><td><span className="ds-class">.book-panel</span> / <span className="ds-class">.panel-inner</span></td><td>Coquille slide-in partagée avec <a href="/ds/panels/side"><strong>Side Panel</strong></a> : <code>fixed</code> bord droit, <strong>540</strong>, padding <strong>96 / 32 / 72</strong>, gap <strong>40</strong>. Voir Side Panel pour le langage complet.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.panel-close</span></td><td>Fermer : <strong>44×44</strong> absolu haut-droite.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.quote-panel-content</span></td><td>La citation : <span className="ds-class">.quote-panel-text</span> (<code>16 / 500</code>, <code>line-height 1.7</code> <span className="ds-token-chip">--text-2</span>) encadrée de <span className="ds-class">.quote-mark</span> (<span className="ds-token-chip">--accent</span>), + <span className="ds-class">.quote-panel-date</span> (<code>13 / 500</code> <span className="ds-token-chip">--text-3</span>).</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.panel-actions</span></td><td>Rangée d&apos;actions : groupe <em>Edit</em> (<span className="ds-class">.panel-move-btn</span>) + <em>Loved</em> (<span className="ds-class">.panel-header-like</span>, <span className="ds-class">.is-active</span> quand aimé) à gauche, <em>Share</em> à droite (<code>space-between</code>).</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.panel-section</span> (Book)</td><td>Livre d&apos;origine : eyebrow + <span className="ds-class">.book-chip</span> interactif (<a href="/ds/book-chip"><strong>Book Row</strong></a>, chevron).</td><td><span className="now-reading-date now-reading-date--sm">si lié</span></td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.panel-actions</span> (footer)</td><td><strong>Delete</strong> (<span className="ds-class">.panel-delete-btn</span>, outline destructif).</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING · vue générale */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing · vue générale</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="panel-inner" style={{ position: "relative", width: 320, alignItems: "stretch" }}>
                  <div className="ds-schema-block" style={{ height: 120 }} />
                  <div className="ds-schema-block" style={{ height: 44 }} />
                  <div className="ds-schema-block" style={{ height: 64 }} />
                  <div className="ds-schema-block" style={{ height: 40 }} />
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Coquille <span className="ds-class">.panel-inner</span> : padding <strong>96</strong> (haut, sous le close) / <strong>32</strong> (côtés) / <strong>72</strong> (bas), gap <strong>40</strong> entre zones. Les blocs = citation, actions, livre, delete ; leur rythme interne est coté ci-dessous. <span className="ds-class">.panel-info</span> réempile aussi la citation ↔ ses actions à gap <strong>40</strong>. Dividers <span className="ds-class">.panel-divider</span> omis ici.</p>
        </div>
      </div>

      {/* 5 — SECTIONS · rythme interne */}
      <div className="ds-card">
        <div className="ds-card-head">Sections · rythme interne</div>
        <div className="ds-card-body col">

          {/* citation — section 16 + content 12 */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector=".quote-panel-content">
                <div className="panel-section" style={{ width: 360 }}>
                  <span className="panel-section-eyebrow">Quote</span>
                  <div className="quote-panel-content">
                    <div className="quote-panel-text"><span className="quote-mark">&ldquo;</span>We can understand the Universe. That makes us something very special.<span className="quote-mark">&rdquo;</span></div>
                    <div className="quote-panel-date">Added on Mar 12, 2026</div>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Citation</strong> — la <span className="ds-class">.panel-section</span> pose eyebrow ↔ contenu à gap <strong>16</strong> ; dans <span className="ds-class">.quote-panel-content</span>, texte ↔ date à gap <strong>12</strong>.</p>

          {/* actions — groupe Edit ↔ Loved gap 12 */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="panel-header-actions-group">
                  <button type="button" className="panel-move-btn">Edit</button>
                  <button type="button" className="btn btn-outline btn-md panel-header-like is-active" aria-pressed="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21l-8-5-8 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" /></svg>
                    <span>Loved</span>
                  </button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Actions</strong> — <span className="ds-class">.panel-header-actions-group</span> : <em>Edit</em> ↔ <em>Loved</em> à gap <strong>12</strong>. La rangée <span className="ds-class">.panel-actions</span> qui les porte pousse <em>Share</em> à droite en <code>space-between</code> (pas de cote fixe).</p>

          {/* livre — section 16 */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="panel-section" style={{ width: 360 }}>
                  <span className="panel-section-eyebrow">Book</span>
                  <button type="button" className="book-chip book-chip-interactive" style={{ background: "var(--card)" }}>
                    <div className="book-chip-cover book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }}><span>A</span></div>
                    <div className="book-chip-body"><div className="book-chip-name"><div className="book-chip-title">A Brief History of Time</div><div className="book-chip-author">Stephen Hawking</div></div></div>
                    <svg className="book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Book</strong> — la <span className="ds-class">.panel-section</span> : eyebrow ↔ <span className="ds-class">.book-chip</span> à gap <strong>16</strong>. La chip porte son propre padding <strong>12</strong> et gap <strong>12</strong> interne — voir <a href="/ds/book-chip"><strong>Book Row</strong></a>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 6 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Primitive partagée — <span className="ds-cn">.book-panel</span></div>
            <p>Coquille partagée <span className="ds-class">.book-panel</span> : slide-in <code>translateX</code> <code>0.55s cubic-bezier(0.16, 1, 0.3, 1)</code>, <span className="ds-class">useModalA11y</span> (<code>Escape</code> + focus trap + restauration), scroll-lock du body, safe-area insets — documentés une fois dans <a href="/ds/panels"><strong>Panels</strong></a>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Loved — toggle <span className="ds-cn">.is-active</span></div>
            <p>Le bouton <em>Loved</em> (<span className="ds-class">.panel-header-like</span>) bascule <code>onToggleSave</code> : l&apos;icône marque-page se remplit et la classe <span className="ds-class">.is-active</span> teinte le bouton (état favori). <code>aria-pressed</code> reflète l&apos;état.</p>
          </div>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Famille Panels</div>
            <p>Membre de la famille <a href="/ds/panels"><strong>Panels</strong></a> — contrepartie « citation » de <a href="/ds/panels/side"><strong>Side Panel</strong></a> (le livre), même primitive <span className="ds-class">.book-panel</span>, partagée aussi avec <a href="/ds/filters/panel"><strong>Filters Panel</strong></a> et les List Panels.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumer</div>
            <p><code>QuotePanel</code>, ouvert au clic sur une citation (vue Quotes, listes de citations de l&apos;Overview). <code>onEdit</code>, <code>onToggleSave</code>, <code>onOpenBook</code>, <code>onDelete</code> remontent au parent ; <span className="ds-class">.book-chip</span> ouvre le <a href="/ds/panels/side"><strong>Side Panel</strong></a> du livre.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
