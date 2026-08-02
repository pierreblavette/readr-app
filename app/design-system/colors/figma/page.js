import DSSection from "../../_components/DSSection";

// Miroir du système de variables Figma. Deux collections en tableaux :
// Primitives (Name / Value, un mode) et Color (Name / Light / Dark, les colonnes
// montrant la primitive aliasée). Source de vérité des valeurs : le fichier Figma.

// Ligne Primitives : Name / Value (pastille + hex).
function PrimRow({ name, hex }) {
  return (
    <tr className="table-row">
      <td><code className="ds-cn">{name}</code></td>
      <td><span className="dsfig-cell"><span className="dsfig-sw" style={{ background: hex }} />{hex}</span></td>
    </tr>
  );
}

// Ligne Color : Name / Light / Dark. Chaque cellule = pastille (couleur résolue)
// + token pointé (primitive aliasée, ou valeur brute si pas d'alias).
function Row({ name, l, lt, d, dt }) {
  return (
    <tr className="table-row">
      <td><code className="ds-cn">{name}</code></td>
      <td><span className="dsfig-cell"><span className="dsfig-sw" style={{ background: l }} />{lt}</span></td>
      <td><span className="dsfig-cell"><span className="dsfig-sw" style={{ background: d }} />{dt}</span></td>
    </tr>
  );
}

// Collection Primitives (un mode) — [group, [[name, hex]…]].
const PRIM_GROUPS = [
  ["primary", [
    ["primary/3","#FAFAFF"],["primary/5","#F4F5FF"],["primary/10","#E8EAFD"],["primary/20","#C1C7FB"],
    ["primary/30","#9BA5F8"],["primary/40","#6F7CF2"],["primary/50","#4959E6"],["primary/60","#3646D4"],
    ["primary/70","#2836B8"],["primary/80","#1D268A"],["primary/90","#131860"],["primary/100","#0C0F38"],
  ]],
  ["primary/dark", [
    ["primary/dark/3","#1F2128"],["primary/dark/5","#232536"],["primary/dark/8","#272B4A"],
    ["primary/dark/10","#2F3666"],["primary/dark/25","#525D9E"],["primary/dark/40","#7B89F8"],
  ]],
  ["neutral", [
    ["neutral/white","#FFFFFF"],["neutral/off-white","#F5F6FF"],["neutral/black","#0D0F1A"],
    ["neutral/gray-50","#F5F5F5"],["neutral/gray-100","#EBEBEB"],["neutral/gray-200","#E0E0E0"],
    ["neutral/gray-500","#808080"],["neutral/gray-600","#666666"],["neutral/gray-800","#333333"],
    ["neutral/gray-850","#262626"],["neutral/gray-900","#1F1F1F"],
  ]],
  ["teal / destructive / ai / page / card / surface", [
    ["teal/light","#00A699"],["teal/dark","#00C9BE"],
    ["destructive/light","#E63946"],["destructive/dark","#FF6B6B"],
    ["ai/from","#F67BF8"],["ai/to-light","#4959E6"],["ai/to-dark","#7B89F8"],
    ["page/light","#FEFEFF"],["page/dark","#0F0F0F"],
    ["card/dark","#1E1E1E"],["surface/dark-2","#1A1A1A"],
  ]],
];

// Collection Color groupée iso Figma — [group, [[leaf, lHex, lTok, dHex, dTok]…]].
// lTok/dTok = primitive aliasée (correspondance) ; = valeur brute si pas d'alias.
const COLOR_GROUPS = [
  ["bg", [
    ["default", "#FEFEFF", "page/light", "#0F0F0F", "page/dark"],
    ["2", "#FEFEFF", "page/light", "#0F0F0F", "page/dark"],
    ["3", "#F5F5F5", "neutral/gray-50", "#1A1A1A", "surface/dark-2"],
    ["elevated", "#F5F5F5", "neutral/gray-50", "#262626", "neutral/gray-850"],
    ["nav", "rgba(255,255,255,.9)", "rgba(255,255,255,.9)", "rgba(15,15,15,.96)", "rgba(15,15,15,.96)"],
    ["app", "rgba(73,89,230,.015)", "rgba(73,89,230,.015)", "#0F0F0F", "#0F0F0F"],
    ["head", "rgba(73,89,230,.04)", "rgba(73,89,230,.04)", "#1A1A1A", "#1A1A1A"],
  ]],
  ["surface", [
    ["card", "#FFFFFF", "neutral/white", "#1E1E1E", "card/dark"],
    ["1", "#FAFAFF", "primary/3", "#1F2128", "primary/dark/3"],
    ["2", "#F4F5FF", "primary/5", "#232536", "primary/dark/5"],
    ["3", "#E8EAFD", "primary/10", "#2F3666", "primary/dark/10"],
  ]],
  ["text", [
    ["default", "#1F1F1F", "neutral/gray-900", "#F5F5F5", "neutral/gray-50"],
    ["2", "#666666", "neutral/gray-600", "#808080", "neutral/gray-500"],
    ["3", "#808080", "neutral/gray-500", "#808080", "neutral/gray-500"],
  ]],
  ["border", [
    ["default", "#E0E0E0", "neutral/gray-200", "#333333", "neutral/gray-800"],
    ["subtle", "#EBEBEB", "neutral/gray-100", "#333333", "neutral/gray-800"],
  ]],
  ["accent", [
    ["default", "#4959E6", "primary/50", "#7B89F8", "primary/dark/40"],
    ["hover", "#3646D4", "primary/60", "#4959E6", "primary/50"],
    ["subtle", "#F4F5FF", "primary/5", "#131860", "primary/90"],
    ["bg", "rgba(73,89,230,.08)", "rgba(73,89,230,.08)", "rgba(123,137,248,.12)", "rgba(123,137,248,.12)"],
    ["ghost-hover", "rgba(73,89,230,.05)", "rgba(73,89,230,.05)", "rgba(73,89,230,.2)", "rgba(73,89,230,.2)"],
  ]],
  ["secondary", [
    ["default", "#F0F2FF", "#F0F2FF", "#1A1A2E", "#1A1A2E"],
    ["foreground", "#4959E6", "primary/50", "#7B89F8", "primary/dark/40"],
  ]],
  ["destructive", [
    ["default", "#E63946", "destructive/light", "#FF6B6B", "destructive/dark"],
    ["hover", "#C42432", "#C42432", "#E63946", "destructive/light"],
    ["bg", "rgba(230,57,70,.1)", "rgba(230,57,70,.1)", "rgba(255,107,107,.14)", "rgba(255,107,107,.14)"],
  ]],
  ["teal", [
    ["default", "#00A699", "teal/light", "#00C9BE", "teal/dark"],
    ["bg", "rgba(0,166,153,.08)", "rgba(0,166,153,.08)", "rgba(0,201,190,.1)", "rgba(0,201,190,.1)"],
  ]],
  ["ai", [
    ["from", "#F67BF8", "ai/from", "#F67BF8", "ai/from"],
    ["to", "#4959E6", "ai/to-light", "#7B89F8", "ai/to-dark"],
  ]],
  ["illus", [
    ["bg-1", "#F4F5FF", "primary/5", "#232536", "primary/dark/5"],
    ["bg-2", "#E8EAFD", "primary/10", "#272B4A", "primary/dark/8"],
    ["bg-3", "#C1C7FB", "primary/20", "#2F3666", "primary/dark/10"],
    ["mid", "#9BA5F8", "primary/30", "#525D9E", "primary/dark/25"],
    ["accent-1", "#6F7CF2", "primary/40", "#7B89F8", "primary/dark/40"],
    ["accent-2", "#4959E6", "primary/50", "#6F7CF2", "primary/40"],
    ["accent-3", "#3646D4", "primary/60", "#4959E6", "primary/50"],
    ["stroke", "#131860", "primary/90", "#C1C7FB", "primary/20"],
  ]],
];

export default function ColorsFigmaPage() {
  return (
    <DSSection id="colors-figma" title="Colors — Figma" sub="Les couleurs telles qu'elles vivent dans Figma : deux collections de variables. Le fichier Figma est la source de vérité.">
      <style>{`
        .dsfig-sw { display:inline-block; width:18px; height:18px; border-radius:5px; border:1px solid var(--border); flex-shrink:0; vertical-align:middle; }
        .dsfig-cell { display:inline-flex; align-items:center; gap:8px; color:var(--text-2); white-space:nowrap; font-weight:600; }
        .dsfig-color { table-layout:fixed; }
        .dsfig-color th, .dsfig-color td { width:33.33%; }
        .dsfig-prim { table-layout:fixed; }
        .dsfig-prim th, .dsfig-prim td { width:50%; }
      `}</style>

      {/* 1 — Modèle à deux collections */}
      <div className="ds-card">
        <div className="ds-card-head">Deux collections</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name"><code className="ds-cn">Primitives</code> — la palette brute</div>
            <p>Un seul mode. Les couleurs sources : scale <code className="ds-cn">primary/3…100</code>, crans dark <code className="ds-cn">primary/dark/*</code>, rampe neutre <code className="ds-cn">neutral/gray-*</code>, plus teal / destructive / ai / page / card / surface. Une primitive = une valeur fixe, sans notion de thème.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><code className="ds-cn">Color</code> — la couche sémantique</div>
            <p>Deux modes <strong>Light</strong> / <strong>Dark</strong>. Chaque token aliase une primitive différente par mode ; c&apos;est la couche qu&apos;on binde en design. Miroir de <code>:root</code> + <code>[data-theme=dark]</code> côté code.</p>
          </div>
          <p className="ds-note"><strong>Règle</strong> : en UI, on binde toujours une variable <code className="ds-cn">Color</code>, jamais une Primitive directement — sauf les illustrations (art à couleurs fixes).</p>
        </div>
      </div>

      {/* 2 — Primitives : un tableau Name / Value par groupe */}
      {PRIM_GROUPS.map(([group, rows]) => (
        <div key={group} className="ds-card">
          <div className="ds-card-head">Primitives · {group}</div>
          <div className="ds-card-body col">
            <table className="token-table dsfig-prim">
              <thead className="table-head"><tr><th>Name</th><th>Value</th></tr></thead>
              <tbody className="table-body">
                {rows.map(([name, hex]) => <PrimRow key={name} name={name} hex={hex} />)}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* 3 — Color : un tableau Name / Light / Dark par groupe (iso Figma) */}
      {COLOR_GROUPS.map(([group, rows]) => (
        <div key={group} className="ds-card">
          <div className="ds-card-head">Color · {group}</div>
          <div className="ds-card-body col">
            <table className="token-table dsfig-color">
              <thead className="table-head"><tr><th>Name</th><th>Light</th><th>Dark</th></tr></thead>
              <tbody className="table-body">
                {rows.map(([leaf, l, lt, d, dt]) => <Row key={leaf} name={leaf} l={l} lt={lt} d={d} dt={dt} />)}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* 4 — Sync */}
      <div className="ds-card">
        <div className="ds-card-head">Sync</div>
        <div className="ds-card-body col">
          <p className="ds-note">Table <strong>Color</strong> : les colonnes Light / Dark montrent la <strong>primitive aliasée</strong> (la correspondance) ; la pastille garde la couleur résolue. Sans primitive (overlays rgba, one-off comme <code className="ds-cn">secondary/default</code>), la valeur brute est affichée.</p>
          <p className="ds-note">Figma et le code sont <strong>deux mondes non synchronisés</strong>. Le fichier Figma est la source de vérité des valeurs ; cette page est maintenue à la main. Un changement de couleur s&apos;applique <strong>des deux côtés</strong> : variables Figma <em>et</em> <code>globals.css</code>. La page <a href="/design-system/colors/web"><strong>Web</strong></a> lit ses valeurs en live et ne peut pas dériver.</p>
        </div>
      </div>
    </DSSection>
  );
}
