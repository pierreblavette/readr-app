import Link from "next/link";
import DSSection from "../_components/DSSection";

// Racine de la famille Colors. Explique le modèle à deux sources (code vs Figma,
// non synchronisés) et renvoie vers les deux pages : Web (tokens CSS, live) et
// Figma (variables, structure + mapping de noms).
export default function ColorsPage() {
  return (
    <DSSection id="colors" title="Colors" sub="Le système de couleurs de Readr vit dans deux mondes non synchronisés — le code et Figma. Chaque page en documente un.">

      <div className="ds-card">
        <div className="ds-card-head">Deux sources, un système</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Code — <code>globals.css</code></div>
            <p>Source de vérité de l&apos;app. Tokens CSS (<code>:root</code> + <code>[data-theme=dark]</code>) consommés par tous les composants via <code>var(--x)</code>. Changer un token → toute l&apos;app suit automatiquement.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Design — fichier Figma</div>
            <p>Source de vérité du design. Deux collections de variables : <code className="ds-cn">Primitives</code> (palette brute) et <code className="ds-cn">Color</code> (sémantique, Light/Dark). Les composants Figma s&apos;y bindent.</p>
          </div>
          <p className="ds-note">Les deux ne se synchronisent pas tout seuls : un changement de couleur s&apos;applique <strong>des deux côtés</strong>. Même nommage, même structure, pour garder le pont lisible.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Les deux pages</div>
        <div className="ds-card-body col">
          <div className="ds-tile-grid ds-tile-grid--cols3">
            <Link href="/design-system/colors/web" className="ds-index-card">
              <span className="ds-index-thumb">
                <span className="dsw-vig dsw-vig--pills" aria-hidden="true">
                  {["--text-3", "--primary-30", "--primary-50", "--primary-70", "--ai-from", "--destructive", "--teal", "--primary-90"].map((t) => (
                    <span key={t} className="dsw-pill" style={{ background: `var(${t})` }} />
                  ))}
                </span>
              </span>
              <span className="ds-index-label">Web — tokens CSS (live)</span>
            </Link>
            <Link href="/design-system/colors/figma" className="ds-index-card">
              <span className="ds-index-thumb">
                <span className="dsw-vig dsw-vig--pills" aria-hidden="true">
                  {["--primary-10", "--primary-20", "--primary-40", "--primary-50", "--primary-60", "--primary-80", "--illus-stroke", "--teal"].map((t) => (
                    <span key={t} className="dsw-pill" style={{ background: `var(${t})` }} />
                  ))}
                </span>
              </span>
              <span className="ds-index-label">Figma — variables (structure + mapping)</span>
            </Link>
          </div>
        </div>
      </div>

    </DSSection>
  );
}
