import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";
import { MessageBox } from "./_specs";

// Simple pile verticale des message boxes — pas de faux cadre (bg/border/radius/padding) :
// les encarts s'affichent directement sur la scène.
const SURFACE = {
  display: "flex", flexDirection: "column", gap: 12,
  width: "100%", maxWidth: 460,
};

const ANNOS = [
  { n: 1, side: "top", target: ".modal-info-box" },
  { n: 2, side: "left", target: ".modal-info-box svg" },
  { n: 3, side: "bottom", target: ".modal-info-box span" },
];

export default function MessageBoxPage() {
  return (
    <DSSection
      id="message-box"
      title="Box Message"
      sub="Un encart de message dans les modales : une icône et un texte, en quatre tons selon l'intention — information, alerte, succès, action risquée."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <div style={SURFACE}>
                <MessageBox tone="info">Your data stays on this device — nothing is uploaded.</MessageBox>
                <MessageBox tone="alert">You&apos;ve reached the limit of 3 books marked as reading.</MessageBox>
                <MessageBox tone="success">Book added to your library.</MessageBox>
                <MessageBox tone="critical">Scan failed — couldn&apos;t read the barcode. Try again.</MessageBox>
              </div>
            </div>
          </div>
          <p className="ds-note">Les quatre tons, tels qu&apos;ils apparaissent dans le corps d&apos;une modale (surface <span className="ds-token-chip">--card</span>). Chaque encart = une icône (16) + un texte (<code>14 / 500</code>), sur une palette tintée. <em>alert</em> et <em>critical</em> portent <code>role=&quot;alert&quot;</code>.</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board">
            <AnnoScene annos={ANNOS}>
              <div className="ds-anno-organism" style={{ ...SURFACE, maxWidth: 420 }}>
                <MessageBox tone="info">Your data stays on this device.</MessageBox>
              </div>
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
              <tr className="table-row"><td>1</td><td><span className="ds-class">.modal-info-box</span></td><td>Coquille : <code>flex</code> aligné centre, gap <strong>16</strong>, padding <strong>8 / 16</strong>, radius 8, bord tinté 1.5px. Texte <code>14 / 500</code> <span className="ds-token-chip">--text</span>, <code>line-height 1.5</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.modal-info-box svg</span></td><td>Icône <strong>16×16</strong>, <code>flex-shrink: 0</code>, colorée selon le ton (info <span className="ds-token-chip">--primary-50</span>).</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">span</span></td><td>Le message. Sur alert / success / critical : <code>white-space: pre-line</code> (respecte les retours). Emphase possible via <span className="ds-class">.modal-info-box-strong</span> (700).</td><td><span className="now-reading-date now-reading-date--sm">strong</span></td></tr>
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
              <Redline>
                <MessageBox tone="info">Your data stays on this device.</MessageBox>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Padding <strong>8</strong> vertical / <strong>16</strong> horizontal ; gap <strong>16</strong> entre l&apos;icône et le texte ; icône <strong>16×16</strong> (cadre coté à l&apos;exécution). Radius 8, bord 1.5px tinté selon le ton.</p>
        </div>
      </div>

      {/* 5 — TONES */}
      <div className="ds-card">
        <div className="ds-card-head">Tones</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Info — <span className="ds-cn">.modal-info-box</span></div>
            <p>Ton par défaut, neutre. Fond <span className="ds-token-chip">--primary-5</span>, bord <code>rgba(73,89,230,.2)</code>, icône <span className="ds-token-chip">--primary-50</span>. Information passive (pas de <code>role</code>).</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Alert — <span className="ds-cn">.modal-info-box--alert</span></div>
            <p>Avertissement (amber). Fond <code>rgba(245,158,11,.08)</code>, icône <code>#B45309</code>. <code>role=&quot;alert&quot;</code> — ex. limite de lecture atteinte.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Success — <span className="ds-cn">.modal-info-box--success</span></div>
            <p>Confirmation (vert). Fond <code>rgba(34,197,94,.08)</code>, icône <code>#16A34A</code>.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Critical — <span className="ds-cn">.scan-alert</span></div>
            <p>Erreur destructive (rouge). Fond <code>rgba(239,68,68,.08)</code>, icône <code>#dc2626</code>, <code>role=&quot;alert&quot;</code> — ex. échec de scan.</p>
          </div>
          <p className="ds-note"><strong>Dette</strong> : le ton critical est une <em>classe parallèle</em> <span className="ds-class">.scan-alert</span> qui recopie <span className="ds-class">.modal-info-box</span> (mêmes padding / bord / radius / typo) au lieu d&apos;un modifier <span className="ds-class">.modal-info-box--critical</span>. Candidat à unifier (principe DS : pas de classe parallèle).</p>
        </div>
      </div>

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Contexte — corps de modale</div>
            <p>Toujours dans le corps d&apos;une <a href="/design-system/modal"><strong>modale</strong></a> (surface <span className="ds-token-chip">--card</span>), au-dessus ou sous les champs. Consumers : <code>AddModal</code> (limite de lecture, scan échoué), <code>AddBooksToCollectionModal</code>…</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Accessibility</div>
            <p>Les tons qui signalent un problème (<em>alert</em>, <em>critical</em>) portent <code>role=&quot;alert&quot;</code> → annoncés par le lecteur d&apos;écran à l&apos;apparition. Info et success sont passifs (pas de <code>role</code>).</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
