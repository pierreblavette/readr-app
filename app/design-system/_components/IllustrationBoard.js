"use client";
import { useRef, useState, useEffect } from "react";

// Board partagé des illustrations (pictos). Colonnes pilotées par la largeur RÉELLE
// de la grille (ResizeObserver), pas le viewport — la sidebar /ds le fausserait.
// Flux FLUIDE 1→5 : ~1 colonne par 160px de large (illustration 120 + air), capé à 5.
// Le nombre de colonnes est posé en style INLINE (grid-template-columns) plutôt qu'en
// classe --cols-N : ça évite toute collision avec les grilles d'états (où --cols-2 a un
// autre sens : 1 rangée >1280) et donne les paliers 1 et 4 que le système de classes
// n'expose pas. La classe .ds-illus-auto exclut le board de la règle d'orphelin des
// grilles d'états (sinon le dernier item/filler pourrait passer pleine largeur ≤1280).
// Défaut = 1 col (le plus contraint) avant 1re mesure → jamais de débordement au 1er paint.
// items : [[élément rendu, label], ...] — on passe des ÉLÉMENTS, pas des fonctions
// composant (une fonction ne traverse pas la frontière server → client).
export default function IllustrationBoard({ items }) {
  const ref = useRef(null);
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      setCols(Math.max(1, Math.min(5, Math.floor(w / 160))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Cases de complément : remplissent la dernière rangée partielle avec un fond --card
  // (les gaps du board = dividers). Sinon les pistes vides laissent voir le fond gris.
  const fillers = (cols - (items.length % cols)) % cols;
  return (
    <div
      ref={ref}
      className="ds-states-grid ds-states-grid--boxed ds-illus-auto"
      style={{ gridAutoFlow: "row", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
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
