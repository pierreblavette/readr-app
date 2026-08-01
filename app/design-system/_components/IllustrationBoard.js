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
  // Défaut = 2 col (le plus contraint) avant 1re mesure → jamais de débordement.
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      setCols(w >= 800 ? 5 : w >= 480 ? 3 : 2);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const mod = `ds-states-grid--cols-${cols}${cols === 2 ? " ds-states-grid--hold" : ""}`;
  // Cases de complément : remplissent la dernière rangée partielle avec un fond --card
  // (les gaps du board = dividers). Sinon les pistes vides laissent voir le fond gris.
  const fillers = (cols - (items.length % cols)) % cols;
  return (
    <div ref={ref} className={`ds-states-grid ds-states-grid--boxed ${mod}`}>
      {items.map(([el, label]) => (
        <div key={label} className="ds-state-sample">
          {el}
          <span className="panel-section-eyebrow">{label}</span>
        </div>
      ))}
      {Array.from({ length: fillers }).map((_, i) => (
        <div key={`filler-${i}`} className="ds-state-sample ds-state-sample--filler" aria-hidden="true" />
      ))}
    </div>
  );
}
