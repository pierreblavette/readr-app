"use client";
import { useLayoutEffect, useRef, useState } from "react";

/* AnnoScene — décomposition numérotée d'un organisme façon Mews : le specimen réel
 * (children, marqué .ds-anno-organism) est posé au centre, et pour chaque annotation
 * on place une pastille numérotée dans la gouttière + un trait de rappel vers l'arête
 * de la partie visée. Positions MESURÉES au runtime (getBoundingClientRect), jamais
 * codées en dur — le schéma suit le layout réel. Même langage que .ds-anatomy-lead
 * (Text Input) : marqueur primary-50 + ligne.
 *
 * annos: [{ n, side: 'top'|'bottom'|'left'|'right'|'corner', target?: cssSelector }]
 *   target omis → vise l'organisme entier (ex. la coquille). corner → pastille au
 *   coin, sans trait (ex. l'overlay/scène).
 */
const GAP = 36;    // distance pastille ↔ bord du modal (assez petite pour tenir dans le padding 60)
const CORNER = 34; // offset de la pastille de coin (overlay) depuis le bord de scène

export default function AnnoScene({ annos, children }) {
  const ref = useRef(null);
  const [items, setItems] = useState([]);

  useLayoutEffect(() => {
    const scene = ref.current;
    const organism = scene?.querySelector(".ds-anno-organism");
    if (!organism) return;

    const measure = () => {
      const sr = scene.getBoundingClientRect();
      const mr = organism.getBoundingClientRect();
      const mLeft = mr.left - sr.left, mRight = mr.right - sr.left;
      const mTop = mr.top - sr.top, mBottom = mr.bottom - sr.top;

      const out = annos.map((a) => {
        const t = a.target ? scene.querySelector(a.target) : organism;
        const tr = (t || organism).getBoundingClientRect();
        const tcy = tr.top + tr.height / 2 - sr.top;
        const tcx = tr.left + tr.width / 2 - sr.left;
        const tTop = tr.top - sr.top, tBottom = tr.bottom - sr.top;
        const tLeft = tr.left - sr.left, tRight = tr.right - sr.left;

        // Pastille calée sur le bord de l'organisme, puis BORNÉE dans la scène (rayon
        // ~13) : sur un écran étroit où l'organisme (largeur fixe) approche le bord,
        // la pastille se colle au bord interne au lieu de déborder sur le fond blanc.
        // Le trait rejoint l'arête de la PARTIE visée depuis la pastille bornée.
        const R = 13;
        if (a.side === "left" || a.side === "right" || a.side === "top" || a.side === "bottom") {
          let badge;
          if (a.side === "left") badge = { x: mLeft - GAP, y: tcy };
          else if (a.side === "right") badge = { x: mRight + GAP, y: tcy };
          else if (a.side === "top") badge = { x: tcx, y: mTop - GAP };
          else badge = { x: tcx, y: mBottom + GAP };
          badge.x = Math.min(Math.max(badge.x, R), sr.width - R);
          badge.y = Math.min(Math.max(badge.y, R), sr.height - R);
          let line;
          if (a.side === "left") line = { x1: badge.x, y1: tcy, x2: tLeft, y2: tcy };
          else if (a.side === "right") line = { x1: badge.x, y1: tcy, x2: tRight, y2: tcy };
          else if (a.side === "top") line = { x1: tcx, y1: badge.y, x2: tcx, y2: tTop };
          else line = { x1: tcx, y1: badge.y, x2: tcx, y2: tBottom };
          return { n: a.n, badge, line };
        }
        // corner (overlay/scène) — pastille au coin, pas de trait
        return { n: a.n, badge: { x: sr.width - CORNER, y: sr.height - CORNER }, line: null };
      });
      setItems(out);
    };

    measure();
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [annos]);

  return (
    <div className="ds-anno-scene" ref={ref}>
      {children}
      <svg className="ds-anno-lines" aria-hidden="true">
        {items.map((it, i) => it.line && (
          <line key={i} x1={it.line.x1} y1={it.line.y1} x2={it.line.x2} y2={it.line.y2} />
        ))}
      </svg>
      {items.map((it, i) => (
        <span key={i} className="ds-anno-badge" style={{ left: it.badge.x, top: it.badge.y }}>{it.n}</span>
      ))}
    </div>
  );
}
