import DSSection from "../_components/DSSection";
import AnnoScene from "../_components/AnnoScene";
import Redline from "../_components/Redline";

const GlobeIcon = () => (
  <svg className="footer-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.554v-5.57c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.667H9.356V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.368-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);

// Largeur commune des specimens = 100 % de la scène, comme le redline Spacing
// (.ds-redline-row--fill → target 100%). Remplit la scène (marges 48px du padding
// conservées, pas edge-to-edge). Les scènes Preview/Anatomy portent le même padding
// latéral 48 que .ds-redline (classes ds-scene--footer / ds-anno-board--footer) →
// base identique → largeurs égales. À 80 % le specimen devenait trop étroit dans la
// bande viewport ~960-1020 (sections produit + app forcées d'empiler → 3 lignes).
const SPECIMEN_W = "100%";

function FooterSpec({ width = "100%" }) {
  return (
    <footer className="library-footer" style={{ width }}>
      <div className="library-footer-inner">
        <span className="footer-section">
          <span className="footer-group">
            <button type="button" className="footer-link">How it works</button>
          </span>
          <div className="lang-toggle">
            <button type="button" className="lang-btn active">EN</button>
            <span className="lang-sep">·</span>
            <button type="button" className="lang-btn">FR</button>
          </div>
        </span>
        <span className="footer-section">
          <span>Your data stays on this device</span>
          <span>v1.0</span>
        </span>
        {/* Split ≤812 forcé : le specimen est un footer étroit (80% de la scène), mais
            la vraie règle est un @media viewport que le doc ne déclenche pas. On force
            le width:100% + space-between pour illustrer le vrai comportement scindé. */}
        <span className="footer-links-desktop footer-section" style={{ width: "100%", justifyContent: "space-between" }}>
          <span className="footer-group">
            <span>© 2026 Pierre Blavette</span>
            <a className="footer-link" href="#" aria-label="pierreblavette.com">
              <span className="footer-link-text">pierreblavette.com</span>
              <GlobeIcon />
            </a>
          </span>
          <span className="footer-group">
            <a className="footer-link" href="#">Design system</a>
            <a className="footer-link" href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
          </span>
        </span>
      </div>
    </footer>
  );
}

const ANNOS = [
  { n: 1, side: "top", target: ".library-footer-inner" },
  { n: 2, side: "bottom", target: ".footer-section" },
  { n: 3, side: "bottom", target: ".lang-toggle" },
  { n: 4, side: "bottom", target: ".footer-links-desktop .footer-group:last-child .footer-link:first-child" },
];

export default function FooterPage() {
  return (
    <DSSection
      id="footer"
      title="Footer"
      sub="Le pied de page : liens vers le produit, note sur les données, liens externes. Il s'empile sur les petits écrans."
    >

      {/* 1 — PREVIEW */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview ds-scene--footer">
            <FooterSpec width={SPECIMEN_W} />
          </div>
          </div>
          <p className="ds-note">Markup réel <span className="ds-class">.library-footer</span>, pleine largeur. Le <code>border-top</code> <span className="ds-token-chip">--border-subtle</span> est le séparateur entre le contenu de la page et le footer ; le fond du footer est <span className="ds-token-chip">--bg</span> (fond de page).</p>
        </div>
      </div>

      {/* 2 — ANATOMY */}
      <div className="ds-card">
        <div className="ds-card-head">Anatomy</div>
        <div className="ds-card-body col">
          <div className="ds-anno-board ds-anno-board--footer">
          <AnnoScene annos={ANNOS}>
            <div className="ds-anno-organism" style={{ width: SPECIMEN_W }}><FooterSpec /></div>
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
              <tr className="table-row"><td>·</td><td><span className="ds-class">.library-footer</span></td><td>Coquille pleine largeur : <code>border-top</code> 1px <span className="ds-token-chip">--border-subtle</span>, padding <strong>20 / 0</strong>, bg <span className="ds-token-chip">--bg</span>, texte <code>11 / 500</code> <span className="ds-token-chip">--text-3</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>1</td><td><span className="ds-class">.library-footer-inner</span></td><td>Rangée de contenu : padding <strong>0 40</strong>, <code>flex</code> <code>space-between</code>, gap 16, <code>flex-wrap</code>.</td><td>—</td></tr>
              <tr className="table-row"><td>2</td><td><span className="ds-class">.footer-section</span></td><td>Une des 3 sections (gauche produit / centre app / droite profil). <code>flex</code> row, gap 16.</td><td>—</td></tr>
              <tr className="table-row"><td>3</td><td><span className="ds-class">.lang-toggle</span></td><td>Switcher EN · FR (section gauche) — réutilise <span className="ds-class">.lang-btn</span> / <span className="ds-class">.lang-sep</span> de <span className="ds-class">Language Switcher</span>.</td><td>—</td></tr>
              <tr className="table-row"><td>4</td><td><span className="ds-class">.footer-link</span></td><td>Lien (anchor ou button) : <code>11 / 500</code> <span className="ds-token-chip">--text-2</span>, hover <span className="ds-token-chip">--primary-50</span>. Groupés en <span className="ds-class">.footer-group</span> (gap 16).</td><td>—</td></tr>
              <tr className="table-row"><td>·</td><td><span className="ds-class">.footer-link-text</span> / <span className="ds-class">.footer-link-icon</span></td><td>Lien portfolio : <strong>texte</strong> en desktop, <strong>icône globe</strong> en mobile (swap au ≤600).</td><td><span className="now-reading-date now-reading-date--sm">≤600</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 — SPACING (desktop) — masqué en mobile : gutter 40 disproportionné sur écran
          étroit, et la section « Responsive ≤600 » ci-dessous documente déjà le footer mobile. */}
      <div className="ds-card ds-mobile-hidden">
        <div className="ds-card-head">Spacing</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row ds-redline-row--fill" style={{ gridTemplateColumns: "1fr" }}>
              <Redline noGaps>
                <div className="library-footer-inner" style={{ width: "100%", padding: "20px 40px", fontSize: 11, fontWeight: 500, color: "var(--text-3)" }}>
                  <span className="footer-section">
                    <span className="footer-group"><button type="button" className="footer-link">How it works</button></span>
                    <div className="lang-toggle"><button type="button" className="lang-btn active">EN</button><span className="lang-sep">·</span><button type="button" className="lang-btn">FR</button></div>
                  </span>
                  <span className="footer-section"><span>Your data stays on this device</span><span>v1.0</span></span>
                  <span className="footer-section" style={{ width: "100%", justifyContent: "space-between" }}>
                    <span className="footer-group">
                      <span>© 2026 Pierre Blavette</span>
                      <a className="footer-link" href="#" aria-label="pierreblavette.com"><span className="footer-link-text">pierreblavette.com</span><GlobeIcon /></a>
                    </span>
                    <span className="footer-group">
                      <a className="footer-link" href="#">Design system</a>
                      <a className="footer-link" href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                    </span>
                  </span>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">Deux paddings imbriqués : la coquille <span className="ds-class">.library-footer</span> porte le <strong>20</strong> vertical (0 latéral), et <span className="ds-class">.library-footer-inner</span> ajoute le <strong>40</strong> latéral (gutter de page) — cotés ensemble ici. Entre les 3 sections, un <code>space-between</code> (gap min <strong>16</strong> au wrap) — pas de cote fixe, d&apos;où <code>noGaps</code>. Cotes mesurées à l&apos;exécution.</p>
        </div>
      </div>

      {/* 5 — RESPONSIVE */}
      <div className="ds-card">
        <div className="ds-card-head">Responsive · repli en pile (≤600)</div>
        <div className="ds-card-body col">
          <div className="ds-redline-board ds-redline-board--lined">
            <div className="ds-redline-row" style={{ gridTemplateColumns: "1fr" }}>
              <Redline>
                <div className="library-footer-inner" style={{ width: 440, flexDirection: "column", alignItems: "stretch", gap: 16, padding: "20px 16px", fontSize: 11, fontWeight: 500, color: "var(--text-3)" }}>
                  <span className="footer-section" style={{ width: "100%", justifyContent: "space-between" }}>
                    <span className="footer-group"><button type="button" className="footer-link">How it works</button></span>
                    <div className="lang-toggle"><button type="button" className="lang-btn active">EN</button><span className="lang-sep">·</span><button type="button" className="lang-btn">FR</button></div>
                  </span>
                  <span className="footer-section" style={{ width: "100%", justifyContent: "space-between" }}><span>Your data stays on this device</span><span>v1.0</span></span>
                  <span className="footer-section" style={{ width: "100%", justifyContent: "space-between" }}>
                    <span className="footer-group">
                      <span>© 2026 Pierre Blavette</span>
                      <a className="footer-link" href="#" aria-label="pierreblavette.com"><GlobeIcon /></a>
                    </span>
                    <span className="footer-group">
                      <a className="footer-link" href="#">Design system</a>
                      <a className="footer-link" href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                    </span>
                  </span>
                </div>
              </Redline>
            </div>
          </div>
          <p className="ds-note">En pile : la coquille garde son <strong>20</strong> vertical, l&apos;inner passe à <strong>16</strong> latéral (vs 40 desktop), et sépare les 3 sections d&apos;un gap colonne <code>clamp(16, 4vw, 24)</code> — <strong>16</strong> au format téléphone. Cotes mesurées à l&apos;exécution.</p>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">≤ 812px — profil scindé</div>
            <p>La section profil descend sur sa propre ligne (flex-wrap de l&apos;inner) : <span className="ds-class">.footer-links-desktop</span> passe pleine largeur + <code>space-between</code>. Ses deux <span className="ds-class">.footer-group</span> se séparent — <strong>copyright + portfolio</strong> à gauche, <strong>Design system + LinkedIn</strong> à droite. Au-dessus de 812, la section reste compacte à droite dans le <code>space-between</code> des 3 sections.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">≤ 600px — colonne</div>
            <p>L&apos;inner passe en <code>flex-direction: column</code>, <code>align-items: stretch</code>, gap <code>clamp(16, 4vw, 24)</code>. Chaque <span className="ds-class">.footer-section</span> prend toute la largeur en <code>space-between</code> — produit en haut, app au milieu, profil en bas.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Liens en icônes</div>
            <p>Le lien portfolio bascule de texte (<span className="ds-class">.footer-link-text</span>) à icône globe (<span className="ds-class">.footer-link-icon</span>) ; les liens montent en <code>13px</code>, icône <code>18px</code> — cibles tactiles plus larges. LinkedIn reste une icône ; « Design system » est un lien texte.</p>
          </div>
        </div>
      </div>

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Trois zones</div>
            <p><strong>Produit</strong> (gauche) — « How it works » (rouvre l&apos;onboarding) + le switcher de langue. <strong>App</strong> (centre) — rappel privacy « Your data stays on this device » + version. <strong>Profil</strong> (droite) — copyright + portfolio / Design system / LinkedIn.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Consumers &amp; réutilisation</div>
            <p>Rendu une fois en bas de <code>library/page.js</code>, sous le contenu scrollable. Le switcher réutilise les primitives <span className="ds-class">.lang-btn</span> / <span className="ds-class">.lang-sep</span> de <strong>Language Switcher</strong> — pas de style parallèle.</p>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
