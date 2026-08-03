import Link from "next/link";
import DSSection from "../_components/DSSection";

// Racine de la famille Colors. Explique le modèle à deux sources (code vs Figma,
// non synchronisés) et renvoie vers les deux pages : Web (tokens CSS, live) et
// Figma (variables, structure + mapping de noms).

// Table de correspondance CSS → Figma. Part du token globals.css et pointe la
// variable (ou Effect Style) Figma à binder. Miroir de la même donnée que le
// codeSyntax WEB posé sur chaque variable côté Figma. [group, [[cssToken, figmaName]…]].
const MAP_ROWS = [
  ["Surfaces", [
    ["--bg", "bg/default"], ["--bg2", "bg/2"], ["--bg3", "bg/3"],
    ["--bg-elevated", "bg/elevated"], ["--card", "surface/card"],
    ["--bg-app", "bg/app"], ["--bg-head", "bg/head"], ["--nav", "bg/nav"],
  ]],
  ["Texte", [
    ["--text", "text/default"], ["--text-2", "text/2"], ["--text-3", "text/3"],
  ]],
  ["Strokes", [
    ["--border", "border/default"], ["--border-subtle", "border/subtle"],
  ]],
  ["Accent & secondary", [
    ["--primary", "accent/default"], ["--accent-bg", "accent/bg"],
    ["--ghost-hover", "accent/ghost-hover"], ["--secondary", "secondary/default"],
    ["--secondary-foreground", "secondary/foreground"],
  ]],
  ["Surfaces tintées & primary scale", [
    ["--primary-3", "surface/1"], ["--primary-5", "surface/2"], ["--primary-10", "surface/3"],
    ["--primary-20 … --primary-100", "primary/20 … primary/100"],
  ]],
  ["Critical", [
    ["--destructive", "destructive/default"], ["--destructive-hover", "destructive/hover"],
    ["--alert-bg", "destructive/bg"],
  ]],
  ["Teal", [
    ["--teal", "teal/default"], ["--teal-bg", "teal/bg"],
  ]],
  ["AI", [
    ["--ai-from", "ai/from"], ["--ai-to", "ai/to"],
  ]],
  ["Neutrals (overlays)", [
    ["--dark-70", "neutral/black-70"], ["--dark-80", "neutral/black-80"],
    ["--dark-100", "neutral/black"], ["--light-20", "neutral/off-white-20"],
    ["--light-90", "neutral/off-white-90"],
  ]],
  ["Illustration", [
    ["--illus-bg-1 … --illus-stroke", "illus/*"],
  ]],
  ["Ombres (Effect Styles)", [
    ["--shadow-md", "shadow/md"], ["--shadow-lg", "shadow/lg"],
    ["--shadow-xl", "shadow/xl"], ["--shadow-overlay", "shadow/overlay"],
  ]],
];

// Un token unique → pastille bleue copiable (voix « token » du DS) ; une plage
// (« a … b ») n'est pas copiable → rendue en mono neutre.
function CssCell({ token }) {
  return /[…\s]/.test(token)
    ? <code className="ds-cn">{token}</code>
    : <span className="ds-token-chip">{token}</span>;
}

export default function ColorsPage() {
  return (
    <DSSection id="colors" title="Colors" sub="Le système de couleurs de Readr vit dans deux mondes non synchronisés — le code et Figma. Chaque page en documente un.">
      <style>{`
        .dsmap-group { display:flex; flex-direction:column; gap:8px; }
        .dsmap { table-layout:fixed; }
        .dsmap th, .dsmap td { width:50%; }
      `}</style>

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
              {/* Même cover que la card Colors de la page Welcome (foundations/cover-color.svg). */}
              <span className="ds-index-thumb ds-index-thumb--cover">
                <img className="ds-cover" src="/ds-covers/cover-color.svg" alt="" />
              </span>
              <span className="ds-index-label">Web — tokens CSS (live)</span>
            </Link>
            <Link href="/design-system/colors/figma" className="ds-index-card">
              <span className="ds-index-thumb">
                <span className="dsw-vig dsw-vig--symbol" aria-hidden="true">
                  {/* Symbole seul (sans le fond) — viewBox cadré sur la bbox des glyphes. */}
                  <svg viewBox="312 340 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M312 840C312 784.772 356.772 740 412 740H512V840C512 895.228 467.228 940 412 940C356.772 940 312 895.228 312 840Z" fill="#24CB71" />
                    <path d="M512 340V540H612C667.228 540 712 495.228 712 440C712 384.772 667.228 340 612 340H512Z" fill="#FF7237" />
                    <path d="M611.167 740C666.395 740 711.167 695.228 711.167 640C711.167 584.772 666.395 540 611.167 540C555.939 540 511.167 584.772 511.167 640C511.167 695.228 555.939 740 611.167 740Z" fill="#00B6FF" />
                    <path d="M312 440C312 495.228 356.772 540 412 540H512V340H412C356.772 340 312 384.772 312 440Z" fill="#FF3737" />
                    <path d="M312 640C312 695.228 356.772 740 412 740H512V540H412C356.772 540 312 584.772 312 640Z" fill="#874FFF" />
                  </svg>
                </span>
              </span>
              <span className="ds-index-label">Figma — variables (structure + mapping)</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Correspondance CSS ↔ Figma</div>
        <div className="ds-card-body col">
          <p className="ds-note">Chaque token de <code>globals.css</code> et la variable (ou Effect Style) Figma à binder. Cmd+F ton token pour retrouver la variable. Dans l&apos;autre sens, chaque variable Figma affiche son token CSS (<code className="ds-cn">codeSyntax</code>) dans le panneau Variables et en Dev Mode.</p>
          {MAP_ROWS.map(([group, rows]) => (
            <div key={group} className="dsmap-group">
              <span className="panel-section-eyebrow">{group}</span>
              <table className="token-table dsmap">
                <tbody className="table-body">
                  {rows.map(([css, fig]) => (
                    <tr key={css} className="table-row">
                      <td><CssCell token={css} /></td>
                      <td><code className="ds-cn">{fig}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <p className="ds-note"><strong>Alias de valeur</strong> — même couleur, pas de variable Figma dédiée, binde la cible ci-contre : <code>--background</code> = <code>--bg</code> · <code>--accent</code> = <code>--ring</code> = <code>--primary</code> (<code className="ds-cn">accent/default</code>) · <code>--input</code> = <code>--border</code> (<code className="ds-cn">border/default</code>) · <code>--alert</code> = <code>--destructive</code> · <code>--primary-foreground</code> = <code className="ds-cn">neutral/white</code> · <code>--muted</code> = <code className="ds-cn">bg/3</code> · <code>--muted-foreground</code> = <code>--text-3</code>. <strong>Non-couleurs</strong> (pas de variable) : <code>--radius</code>, <code>--height-head</code>, <code>--transition</code>.</p>
        </div>
      </div>

    </DSSection>
  );
}
