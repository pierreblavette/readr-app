"use client";
import { useTheme } from "./ThemeContext";

// Pastille de couleur + méta d'un token. Lit le thème courant pour afficher la
// bonne valeur (light/dark). Fallback : si une seule valeur est fournie, elle
// sert dans les deux thèmes.
export default function Swatch({ bg, title, token, light, dark, size = "md", anchor = false }) {
  const { theme } = useTheme();
  const value = theme === "dark" ? (dark || light) : (light || dark);
  return (
    <div className={`ds-swatch${size === "sm" ? " ds-swatch--sm" : ""}`}>
      <div className={`ds-swatch-block${anchor ? " is-anchor" : ""}`} style={{ background: bg, borderBottom: "1px solid var(--border-subtle)" }} />
      <div className="ds-swatch-info">
        {title && <div className="ds-swatch-title">{title}</div>}
        {token && <span className="ds-token-chip">{token}</span>}
        {value && <div className="ds-token-val">{value}</div>}
      </div>
    </div>
  );
}
