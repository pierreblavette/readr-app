"use client";
import { useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";

// Comme Swatch, mais lit la valeur RÉSOLUE du token dans le thème courant via
// getComputedStyle(:root) — aucun hex hardcodé, donc jamais périmé. bg reste
// var(--token) = pastille toujours juste. Bascule le thème (sidebar) → la valeur
// affichée se met à jour (light ↔ dark). Un token composite ("--accent / --primary-50")
// affiche un chip par nom ; la valeur lue est celle du 1er.
export default function LiveSwatch({ bg, title, token, size = "md", anchor = false, checker = false }) {
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
      <div
        className={`ds-swatch-block${anchor ? " is-anchor" : ""}`}
        style={checker
          // Blancs purs / rgba : damier en fond pour rendre visibles la transparence.
          // La couleur est enveloppee en linear-gradient (une couleur ne peut pas etre un
          // calque non-final d'un multi-background) et posee AU-DESSUS du damier. Le cadre
          // vient de .ds-swatch (deja borde) — ici juste la bordure basse (divider bloc/info).
          ? { background: `linear-gradient(${bg}, ${bg}), repeating-conic-gradient(var(--border-subtle) 0% 25%, transparent 0% 50%) 0 0 / 16px 16px`, borderBottom: "1px solid var(--border-subtle)" }
          : { background: bg, borderBottom: "1px solid var(--border-subtle)" }}
      />
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
