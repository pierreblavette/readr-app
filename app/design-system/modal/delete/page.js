"use client";
import { useState } from "react";
import DSSection from "../../_components/DSSection";
import Redline from "../../_components/Redline";
import AnnoScene from "../../_components/AnnoScene";
import { ConfirmModalSpec, ConfirmBodySpec } from "../_specs";

const CONFIRM_ANNOS = [
  { n: 1, side: "right", target: ".confirm-modal" },
  { n: 2, side: "left", target: ".confirm-modal-title" },
  { n: 3, side: "left", target: ".confirm-modal-sub" },
  { n: 4, side: "left", target: ".confirm-modal-chip" },
  { n: 5, side: "bottom", target: ".confirm-modal-actions" },
];

const VARIANTS = [
  ["book", "Book"],
  ["quote", "Quote"],
  ["bulk", "Bulk"],
  ["finished", "Finished"],
];

export default function DeleteModalPage() {
  const [variant, setVariant] = useState("book");
  return (
    <DSSection
      id="modal-delete"
      title="Delete Modal"
      sub="La fenêtre qui demande confirmation avant un geste destructif : un titre, un message, un aperçu de ce qui sera touché, et deux boutons."
    >

      {/* 1 — PREVIEW (switcher) */}
      <div className="ds-card">
        <div className="ds-card-head">
          Preview
          <div className="overview-activity-pills is-xs ds-head-switcher" role="tablist">
            {VARIANTS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={variant === id}
                className={`overview-activity-pill is-xs${variant === id ? " is-active" : ""}`}
                onClick={() => setVariant(id)}
              >{label}</button>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-modal-stage ds-preview">
            <ConfirmModalSpec variant={variant} style={{ maxWidth: 620, width: "100%" }} />
          </div>
          </div>
          <p className="ds-note">Un seul composant, quatre corps ici (10 en prod). Le <strong>titre</strong> et le <strong>message</strong> sont résolus par <code>target.type</code> ; le corps ajoute un aperçu de la cible : <strong>BookChip</strong> (livre), <strong>citation</strong> tronquée, <strong>rien</strong> (bulk / mot), ou <strong>rating + note</strong> (finished). Montré en flux, sans overlay.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--stack">
          <AnnoScene annos={CONFIRM_ANNOS} stack>
            <ConfirmModalSpec variant="book" className="ds-anno-organism" style={{ maxWidth: 620, width: "100%" }} />
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.confirm-modal</span></td><td>Coquille sœur de <span className="ds-class">.modal</span> : même surface / radius / padding 32/24/0 / gap 32 / shadow, <code>role=&quot;alertdialog&quot;</code>. Voir <strong>Modals</strong>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.confirm-modal-title</span></td><td>Question courte — <code>28 / 800 / −0.02em</code>. « Remove this book? »</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.confirm-modal-sub</span></td><td>Message — <code>16 / 500</code> <span className="ds-token-chip">--text-2</span>. Ce qui sera supprimé, et ce qui reste. Dans un <span className="ds-class">.modal-fields</span> avec le corps.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td>Body addon</td><td>Aperçu de la cible selon <code>type</code> : <span className="ds-class">.confirm-modal-chip</span> (BookChip), <span className="ds-class">.confirm-modal-quote-wrap</span> (citation, line-clamp 3), <span className="ds-class">.panel-finished-field</span> ×2 (rating + note). Absent pour les bulk.</td><td><span className="now-reading-date now-reading-date--sm">Yes</span></td></tr>
              <tr className="table-row"><td>5</td><td><span className="ds-class">.confirm-modal-actions</span></td><td><code>space-between</code>, <code>margin 0 −24</code> / padding 16 24. Cancel = <span className="ds-class">.btn.btn-outline.btn-md</span> ; confirm = <span className="ds-class">.confirm-modal-delete</span> (voir Dispatch).</td><td>—</td></tr>
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
              <Redline padSelector=".confirm-modal-actions">
                <ConfirmModalSpec variant="bulk" style={{ width: 620 }} />
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Coquille</strong> (bulk, sans body addon) — même métrique que la Form Modal : padding <strong>haut 32</strong> · <strong>côtés 24</strong> (bas 0), <code>gap: 32</code> entre titre → message → actions. Footer <span className="ds-class">.confirm-modal-actions</span> : padding <strong>16 24</strong>, débordé de <strong>−24</strong> latéraux pour aller flush aux bords.</p>

          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline padSelector=".confirm-modal-actions" gapBand={[".confirm-modal-sub", ".confirm-modal-chip"]}>
                <ConfirmModalSpec variant="book" style={{ width: 620 }} />
              </Redline>
            </div>
          </div>
          <p className="ds-note"><strong>Un seul livre</strong> — le body addon (<span className="ds-class">.confirm-modal-chip</span>) s&apos;insère dans le <span className="ds-class">.modal-fields</span> entre le message et les actions ; le <code>gap: 32</code> de la coquille le rythme comme les autres blocs, aucune marge propre. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — BODY (les corps de confirmation) */}
      <div className="ds-card">
        <div className="ds-card-head">Body · un socle, plusieurs confirmations</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2 ds-states-grid--hold">
            <div className="ds-state-sample">
              <div style={{ width: "100%" }}><ConfirmBodySpec variant="book" /></div>
              <span className="ds-class">book · .confirm-modal-chip</span>
            </div>
            <div className="ds-state-sample">
              <div style={{ width: "100%" }}><ConfirmBodySpec variant="quote" /></div>
              <span className="ds-class">quote · .confirm-modal-quote-wrap</span>
            </div>
            <div className="ds-state-sample">
              <div style={{ width: "100%" }}><ConfirmBodySpec variant="finished" /></div>
              <span className="ds-class">finished · .panel-finished-field</span>
            </div>
            <div className="ds-state-sample">
              <div style={{ width: "100%" }}><ConfirmBodySpec variant="bulk" /></div>
              <span className="ds-class">bulk · message seul</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Même titre + actions ; le <span className="ds-class">.modal-fields</span> porte le message (<span className="ds-class">.confirm-modal-sub</span>) puis un aperçu de la cible selon <code>target.type</code> : <strong>BookChip</strong> (livre), <strong>citation</strong> tronquée, <strong>rating + note</strong> (finished), ou <strong>rien</strong> (bulk / mot — le message suffit). Le mapping complet est dans <strong>Dispatch</strong>.</p>
        </div>
      </div>

      {/* 5 — DISPATCH (target routing) — désaffiché à la demande (tout breakpoint).
          Le mapping target.type → titre / message / body / confirm reste documenté dans
          la table Elements ; restaurer depuis git si besoin de le ré-afficher. */}

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Confirm button — trois tons</div>
            <p><span className="ds-class">.confirm-modal-delete</span> (<span className="ds-token-chip">--destructive</span> rouge, blanc) par défaut — suppression permanente. <span className="ds-class">.confirm-modal-delete--soft</span> (<span className="ds-token-chip">--primary-5</span>) pour un geste <em>redoable</em> (retirer un mot du dico). <span className="ds-class">.ob-next</span> (bleu) quand l&apos;action <strong>n&apos;est pas destructive</strong> (cancelReading). Cancel toujours <span className="ds-class">.btn.btn-outline.btn-md</span>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Trigger &amp; dispatch</div>
            <p>Ouvrir via un état <code>deleteTarget</code> ; <code>onConfirm</code> reçoit la cible complète (ou un <code>Set</code> d&apos;ids pour les bulk) et le parent dispatche sur <code>target.type</code>.</p>
            <pre style={{ fontFamily: "monospace", fontSize: 12, background: "var(--bg3)", padding: "12px 14px", borderRadius: 6, color: "var(--text)", lineHeight: 1.6, margin: 0, overflow: "auto" }}>{`<button onClick={() => setDeleteTarget({ type: 'quote', id, text })}>…</button>

<DeleteModal target={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} t={t} />

function handleDeleteConfirm(payload) {
  if (payload instanceof Set) return deleteMany(payload);   // bulk
  switch (payload?.type) {
    case 'quote':          return deleteQuote(payload.id);
    case 'word':           return deleteWord(payload.id);
    case 'cancelReading':  return cancelReading(payload);
    case 'removeFinished': return removeFinished(payload);
    case 'collection':     return deleteCollection(payload.id);
    case 'colRemove':      return removeFromCollection(payload);
    // …collectionsBulk, colRemoveBulk
  }
  return deleteBook(payload.id);   // défaut : livre unique (pas de type)
}`}</pre>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Sibling · Form Modal</div>
            <p>Même socle et même a11y que la <strong>Form Modal</strong> ; ici un message centré + deux boutons au lieu d&apos;un form. Source : <code>components/library/DeleteModal.js</code>.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
