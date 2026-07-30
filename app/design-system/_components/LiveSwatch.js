"use client";
import { useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";

// Comme Swatch, mais lit la valeur RÉSOLUE du token dans le thème courant via
// getComputedStyle(:root) — aucun hex hardcodé, donc jamais périmé. bg reste
// var(--token) = pastille toujours juste. Bascule le thème (sidebar) → la valeur
// affichée se met à jour (light ↔ dark). Un token composite ("--accent / --primary-50")
// affiche un chip par nom ; la valeur lue est celle du 1er.
export default function LiveSwatch({ bg, title, token, size = "md", anchor = false }) {
  const { theme } = useTheme();
  const [value, setValue] = useState("");
  const tokens = token ? String(token).split("/").map((t) => t.trim()).filter(Boolean) : [];
  const readName = tokens[0];

  useEffect(() => {
    if (!readName) return;
    // rAF : lire après que data-theme soit posé sur <html>.
    const id = requestAnimationFrame(() => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(readName).trim();
      setValue(v.toUpperCase());
    });
    return () => cancelAnimationFrame(id);
  }, [readName, theme]);

  return (
    <div className={`ds-swatch${size === "sm" ? " ds-swatch--sm" : ""}`}>
      <div className={`ds-swatch-block${anchor ? " is-anchor" : ""}`} style={{ background: bg, borderBottom: "1px solid var(--border-subtle)" }} />
      <div className="ds-swatch-info">
        {title && <div className="ds-swatch-title">{title}</div>}
        {tokens.length > 0 && (
          <div className="ds-swatch-tokens">
            {tokens.map((t) => <span key={t} className="ds-token-chip">{t}</span>)}
          </div>
        )}
        {value && <div className="ds-token-val">{value}</div>}
      </div>
    </div>
  );
}
