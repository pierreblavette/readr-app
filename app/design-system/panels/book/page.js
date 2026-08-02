import DSSection from "../../_components/DSSection";
import AnnoScene from "../../_components/AnnoScene";
import Redline from "../../_components/Redline";
import { BookPanelSpec, AiSparkle } from "./_specs";

// Anatomie : un badge par partie visible. La coquille .book-panel et .panel-inner
// = lignes « · » dans Elements (la Preview les montre déjà), les sections empilées
// (Collections, Finished, About, Quotes) sont badgées comme les briques du header.
const ANNOS = [
  { n: 1, side: "right", target: ".panel-close" },
  { n: 2, side: "left", target: ".panel-cover-wrap" },
  { n: 3, side: "left", target: ".panel-title" },
  { n: 4, side: "right", target: ".panel-header-actions" },
  { n: 5, side: "left", target: ".panel-collections-section" },
  { n: 6, side: "right", target: ".panel-section.is-finished" },
  { n: 7, side: "left", target: ".panel-cast" },
  { n: 8, side: "right", target: ".panel-quiz" },
  { n: 9, side: "left", target: ".panel-inner > .panel-section:not(.panel-cast):not(.panel-quiz)" },
  { n: 10, side: "right", target: ".panel-quotes" },
  { n: 11, side: "bottom", target: ".panel-actions" },
];

// Cinq étoiles (rating) — inline pour la planche Spacing « Finished ». Nested dans
// .panel-finished-field → non cotées par Redline (seuls les svg enfants directs de
// la racine reçoivent un cadre d'icône).
function Stars({ value = 4 }) {
  return (
    <div className="panel-rating-stars" aria-label={`Rating ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" fill="currentColor" className={value >= n ? "is-filled" : ""}>
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SidePanelPage() {
  return (
    <DSSection
      id="book"
      title="Book Panel"
      sub="La fiche complète d'un livre, qui glisse depuis la droite par-dessus l'app : couverture, infos et actions en tête, puis toutes ses sections empilées — collections, avancement, citations."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <BookPanelSpec compact />
            </div>
          </div>
          <p className="ds-note"><strong>Aperçu compact</strong> — cover, header (titre, auteur, meta, pill <em>Finished</em> + Share) et une section (About). Le panel complet empile bien plus de sections selon l&apos;onglet et le statut — Collections, <em>Finished</em>, <em>Cast</em> / <em>Quiz</em> (AI), Quotes, Delete : voir <strong>Anatomy</strong> et <strong>Usage</strong>. En usage réel la coquille est <code>fixed</code> et glisse depuis la droite (neutralisé pour la doc ; présentée en carte détachée, radius 8 + ombre, comme <a href="/design-system/filters/panel"><strong>Filters Panel</strong></a> — en prod dockée au bord, radius 0).</p>
        </div>
      </div>

      {/* 2 — ANATOMY — masquée en mobile (panneau haut/dense, annotations peu lisibles
          sur écran étroit ; la structure reste couverte par Elements + Spacing). */}
      <div className="ds-card ds-mobile-hidden">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={ANNOS}>
              <BookPanelSpec className="ds-anno-organism" />
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
              <tr className="table-row"><td>·</td><td><span className="ds-class">.book-panel</span></td><td>Coquille slide-in : <code>fixed</code> au bord droit, <strong>540</strong> de large, <code>border-left</code> <span className="ds-token-chip">--border-subtle</span>, fond <span className="ds-token-chip">--bg</span>, <strong>radius 0</strong>. Entre en <code>translateX</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.panel-inner</span></td><td>Contenu scrollable : padding <strong>96 / 32 / 72</strong>, <code>flex</code> colonne, <code>align-items: center</code>, gap <strong>40</strong>.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.panel-close</span></td><td>Fermer : <strong>44×44</strong> absolu haut-droite, radius 8, hover <span className="ds-token-chip">--ghost-hover</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.panel-cover-wrap</span></td><td>Couverture : <strong>50 %</strong> de large, ratio <code>2/3</code>, radius 8, centrée. Vide = gradient + <span className="ds-class">.panel-cover-letter</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.panel-info</span></td><td>Bloc info : <span className="ds-class">.panel-title</span> (<code>28 / 700</code>) + <span className="ds-class">.panel-byline</span> (auteur <code>15</code>, meta genre·année <code>14</code>).</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.panel-header-actions</span></td><td>Actions primaires : Start / Finish reading, pill <em>Finished</em>, Share. <code>space-between</code>, <code>flex-wrap</code>.</td><td><span className="now-reading-date now-reading-date--sm">état</span></td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.panel-collections-section</span></td><td>Collections du livre : liste de <span className="ds-class">.collection-chip</span> (<span className="ds-class">Book Row</span>), ou empty-text + bouton <em>Add to collection</em>.</td><td>—</td></tr>
              <tr className="table-row"><td>6</td><td><span className="ds-class">.panel-section.is-finished</span></td><td>Bilan de lecture : date, <em>Rating</em> (<span className="ds-class">.panel-rating-stars</span>) et <em>Note</em> en encarts <span className="ds-token-chip">--bg3</span> + actions Edit / Delete review.</td><td><span className="now-reading-date now-reading-date--sm">finished</span></td></tr>
              <tr className="table-row"><td>7</td><td><span className="ds-class">.panel-section.panel-cast</span></td><td>Character Cast (AI) : eyebrow + hint + bouton <span className="ds-class">.btn-ai</span>. Génère les personnages du livre.</td><td><span className="now-reading-date now-reading-date--sm">reading</span></td></tr>
              <tr className="table-row"><td>8</td><td><span className="ds-class">.panel-section.panel-quiz</span></td><td>Book Quiz (AI) : eyebrow + hint chronométré + bouton <span className="ds-class">.btn-ai</span>. 10 questions sur le livre.</td><td><span className="now-reading-date now-reading-date--sm">finished</span></td></tr>
              <tr className="table-row"><td>9</td><td><span className="ds-class">.panel-section</span></td><td>About : <span className="ds-class">.panel-synopsis</span> (<code>16 / 500</code>, <code>line-height 1.8</code>) ou empty-text.</td><td>—</td></tr>
              <tr className="table-row"><td>10</td><td><span className="ds-class">.panel-quotes</span></td><td>Citations du livre : liste de <span className="ds-class">.panel-quote-item</span> (<span className="ds-token-chip">--bg3</span>, clamp 3 lignes) + bouton <em>Add a quote</em>.</td><td><span className="now-reading-date now-reading-date--sm">owned</span></td></tr>
              <tr className="table-row"><td>11</td><td><span className="ds-class">.panel-actions</span></td><td>Footer : <strong>Delete</strong> (<span className="ds-class">.panel-delete-btn</span>, outline destructif).</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.panel-divider</span> / <span className="ds-class">.panel-section-eyebrow</span></td><td>Filet <code>1px</code> <span className="ds-token-chip">--border-subtle</span> entre sections ; eyebrow <code>11 / 700</code> uppercase <span className="ds-token-chip">--text-3</span> en tête de chaque section.</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING · vue générale (façon Form Modal : coquille réelle + blocs schématiques) */}
      <div className="ds-card">
        <div className="ds-card-head">Spacing · vue générale</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="panel-inner" style={{ position: "relative", width: 320, alignItems: "stretch" }}>
                  <div className="ds-schema-block" style={{ height: 150, width: "50%", alignSelf: "center" }} />
                  <div className="ds-schema-block" style={{ height: 64 }} />
                  <div className="ds-schema-block" style={{ height: 96 }} />
                  <div className="ds-schema-block" style={{ height: 40 }} />
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">La coquille <span className="ds-class">.panel-inner</span> : padding <strong>96</strong> (haut, sous le bouton <em>close</em> absolu) / <strong>32</strong> (côtés) / <strong>72</strong> (bas), et un gap <strong>40</strong> entre chaque zone empilée. Les blocs pointillés = les zones (cover, info, sections, actions) ; leur rythme <em>interne</em> est coté section par section ci-dessous. Entre deux sections s&apos;intercale un <span className="ds-class">.panel-divider</span> (omis ici). <span className="ds-class">.panel-info</span> réempile aussi header ↔ sections à gap <strong>40</strong>.</p>
        </div>
      </div>

      {/* 5 — SECTIONS · rythme interne (une planche par section de l'Anatomy) */}
      <div className="ds-card">
        <div className="ds-card-head">Sections · rythme interne</div>
        <div className="ds-card-body col">

          {/* cover — box + gap 60 vers l'info (panel-main) */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline boxSelector=".panel-cover-wrap">
                <div className="panel-main" style={{ width: 340 }}>
                  <div className="panel-cover-wrap panel-cover-empty" style={{ background: "linear-gradient(135deg, var(--primary-40), var(--primary-60))" }}>
                    <span className="panel-cover-letter">A</span>
                  </div>
                  <div className="panel-info" style={{ gap: 0 }}>
                    <div className="panel-info-header" style={{ gap: 0 }}><div className="panel-title">A Brief History of Time</div></div>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Cover</strong> — <span className="ds-class">.panel-cover-wrap</span> : <strong>50 %</strong> de la largeur du panel, ratio <code>2/3</code>, radius <strong>8</strong> (cotes ici en px pour la largeur du specimen). <span className="ds-class">.panel-main</span> la sépare du bloc info à gap <strong>60</strong>.</p>

          {/* header — gap 24 (+ byline 8) */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector=".panel-byline">
                <div className="panel-info-header" style={{ width: 340 }}>
                  <div className="panel-title">A Brief History of Time</div>
                  <div className="panel-byline">
                    <div className="panel-author">Stephen Hawking</div>
                    <div className="panel-meta"><span>Science</span><span className="panel-meta-sep" aria-hidden="true">·</span><span>1988</span></div>
                  </div>
                  <div className="panel-header-actions">
                    <button type="button" className="btn btn-outline btn-md panel-header-finished" disabled aria-disabled="true">Finished</button>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Header</strong> — <span className="ds-class">.panel-info-header</span> empile titre → byline → actions à gap <strong>24</strong> ; dans la byline, auteur ↔ meta à gap <strong>8</strong>.</p>

          {/* collections — section 16 + list 8, chips délimités par un trait rouge */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector=".panel-collections">
                <div className="panel-section" style={{ width: 340 }}>
                  <span className="panel-section-eyebrow">Collections</span>
                  <div className="panel-collections">
                    <div className="book-row collection-chip" style={{ background: "transparent" }}>
                      <div className="book-row-body"><div className="book-row-title">Science shelf</div><div className="book-row-author">12 books</div></div>
                    </div>
                    <div className="book-row collection-chip" style={{ background: "transparent" }}>
                      <div className="book-row-body"><div className="book-row-title">Physics</div><div className="book-row-author">7 books</div></div>
                    </div>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Collections</strong> — <span className="ds-class">.panel-collections-section</span> : la <span className="ds-class">.panel-section</span> pose eyebrow ↔ contenu à gap <strong>16</strong> (le rythme de base commun à toutes les sections), et <span className="ds-class">.panel-collections</span> empile ses chips à gap <strong>8</strong>. À vide, la section est suivie d&apos;un bouton <em>Add</em> à gap <strong>24</strong>.</p>

          {/* finished — content ↔ actions gap 24 (+ content 16) */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector=".panel-finished-content">
                <div className="panel-section is-finished" style={{ width: 340 }}>
                  <div className="panel-finished-content">
                    <span className="panel-section-eyebrow">Finished</span>
                    <div className="panel-finished-date">Finished on Mar 12, 2026</div>
                    <div className="panel-finished-field">
                      <span className="panel-finished-label">Rating</span>
                      <Stars value={4} />
                    </div>
                  </div>
                  <div className="panel-finished-actions">
                    <button type="button" className="panel-finished-btn">Edit review</button>
                    <button type="button" className="panel-finished-btn">Delete</button>
                  </div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Finished</strong> — <span className="ds-class">.panel-section.is-finished</span> : contenu ↔ actions à gap <strong>24</strong> ; dans <span className="ds-class">.panel-finished-content</span>, eyebrow → date → champs à gap <strong>16</strong> (chaque <span className="ds-class">.panel-finished-field</span> : label ↔ valeur à gap 8).</p>

          {/* AI — Cast / Quiz : content ↔ bouton gap 24 (+ content 16) */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector=".panel-cast-content">
                <div className="panel-section panel-cast" style={{ width: 340 }}>
                  <div className="panel-cast-content">
                    <span className="panel-section-eyebrow">Character cast</span>
                    <p className="panel-cast-hint">Reveal the main characters — who they are and how they relate.</p>
                  </div>
                  <button type="button" className="btn btn-ai btn-md panel-cast-action" style={{ pointerEvents: "none" }}><AiSparkle id="dsAiSpacing" />Reveal the cast</button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>AI · Cast / Quiz</strong> — <span className="ds-class">.panel-cast</span> et <span className="ds-class">.panel-quiz</span> partagent le même rythme : contenu ↔ bouton <span className="ds-class">.btn-ai</span> à gap <strong>24</strong>, et dans le contenu, eyebrow ↔ hint à gap <strong>16</strong>.</p>

          {/* about — section 16 (rythme de base) */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="panel-section" style={{ width: 340 }}>
                  <span className="panel-section-eyebrow">About</span>
                  <div className="panel-synopsis">A landmark volume in science writing — from the Big Bang to the search for a single unifying theory.</div>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>About</strong> — la <span className="ds-class">.panel-section</span> nue : eyebrow ↔ <span className="ds-class">.panel-synopsis</span> à gap <strong>16</strong>.</p>

          {/* quotes — content ↔ add gap 24 (+ content 16, list 10) */}
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline gapSelector={[".panel-quotes-content", ".panel-quotes-list"]}>
                <div className="panel-quotes" style={{ width: 340 }}>
                  <div className="panel-quotes-content">
                    <span className="panel-section-eyebrow">Quotes</span>
                    <div className="panel-quotes-list">
                      <div className="panel-quote-item"><p className="panel-quote-text">&ldquo;We are just an advanced breed of monkeys.&rdquo;</p><span className="panel-quote-page">p. 42</span></div>
                      <div className="panel-quote-item"><p className="panel-quote-text">&ldquo;Not only does God play dice, but he sometimes throws them where they cannot be seen.&rdquo;</p><span className="panel-quote-page">p. 61</span></div>
                    </div>
                  </div>
                  <button type="button" className="panel-quotes-add" style={{ pointerEvents: "none" }}>Add a quote</button>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Quotes</strong> — <span className="ds-class">.panel-quotes</span> : contenu ↔ bouton <em>Add</em> à gap <strong>24</strong> ; dans <span className="ds-class">.panel-quotes-content</span>, eyebrow ↔ liste à gap <strong>16</strong>, et <span className="ds-class">.panel-quotes-list</span> empile ses items à gap <strong>10</strong>. Toutes les cotes sont mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 6 — BEHAVIOR */}
      <div className="ds-card">
        <div className="ds-card-head">Behavior</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Coquille partagée — <span className="ds-cn">.book-panel</span></div>
            <p>a11y (<span className="ds-class">useModalA11y</span> : <code>Escape</code> + focus trap + restauration), scroll-lock du body, motion slide-in (<code>translateX</code> <code>0.55s cubic-bezier(0.16, 1, 0.3, 1)</code>), scroll-fade et safe-area insets sont portés par la primitive commune — documentés une seule fois dans <a href="/design-system/panels"><strong>Side Panels</strong></a>. Rien de propre au Book Panel ici.</p>
          </div>
        </div>
      </div>

      {/* 7 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Sections par état</div>
            <p>Le contenu s&apos;adapte à l&apos;onglet et au statut du livre. <strong>To read</strong> : bouton <em>Start reading</em>. <strong>Reading</strong> : <em>Finish</em> / <em>Cancel</em> + <span className="ds-class">Character Cast</span> (AI). <strong>Finished</strong> : pill <em>Finished</em>, section note + rating, <span className="ds-class">Book Quiz</span> (AI). <strong>Wishlist</strong> : <em>Find online</em> (Amazon / Fnac) + <em>Move to Library</em>, pas de Quotes. Collections, About et Delete sont communs.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Famille Panels</div>
            <p>Membre de la famille <a href="/design-system/panels"><strong>Side Panels</strong></a> (primitive <span className="ds-class">.book-panel</span>) avec <a href="/design-system/panels/quote"><strong>Quote Panel</strong></a> ; le même montage slide-in porte aussi <a href="/design-system/filters/panel"><strong>Filters Panel</strong></a> et les List Panels (Word / Book / Collection).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumer</div>
            <p><code>BookPanel</code>, monté par <code>Library</code> / <code>Wishlist</code> au clic sur une carte. Les callbacks (<code>onStartReading</code>, <code>onFinishReading</code>, <code>onAddQuote</code>, <code>onDelete</code>…) remontent au parent.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
