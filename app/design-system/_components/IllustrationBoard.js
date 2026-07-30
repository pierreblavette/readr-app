"use client";
import { useRef, useState, useEffect } from "react";

// Board partagé des illustrations (pictos). Colonnes pilotées par la largeur RÉELLE
// de la grille (ResizeObserver), pas le viewport — la sidebar /ds le fausserait.
// Défaut = 2 col (le plus contraint) avant 1re mesure → jamais de débordement au
// 1er paint. Consommé par Iconography (inventaire) et Empty State (le pattern).
// items : [[élément rendu, label], ...] — on passe des ÉLÉMENTS, pas des fonctions
// composant (une fonction ne traverse pas la frontière server → client).
export default function IllustrationBoard({ items }) {
  const ref = useRef(null);
  const [mod, setMod] = useState("ds-states-grid--cols-2 ds-states-grid--hold");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      setMod(w >= 800 ? "ds-states-grid--cols-5" : w >= 480 ? "ds-states-grid--cols-3" : "ds-states-grid--cols-2 ds-states-grid--hold");
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`ds-states-grid ds-states-grid--boxed ${mod}`}>
      {items.map(([el, label]) => (
        <div key={label} className="ds-state-sample">
          {el}
          <span className="panel-section-eyebrow">{label}</span>
        </div>
      ))}
    </div>
  );
}
