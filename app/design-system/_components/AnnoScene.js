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

export default function AnnoScene({ annos, children, stack = false }) {
  const ref = useRef(null);
  const [items, setItems] = useState([]);
  // stack : en mobile, on rabat les pastilles latérales EN HAUT / EN BAS de l'organisme
  // (left→top, right→bottom) pour libérer les gouttières horizontales → la carte fluide
  // s'élargit au lieu d'être étranglée entre deux colonnes de badges. Opt-in (cards).
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    if (!stack) return;
    const mq = window.matchMedia("(max-width: 600px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [stack]);
  const stacked = stack && mobile;

  useLayoutEffect(() => {
    const scene = ref.current;
    const organism = scene?.querySelector(".ds-anno-organism");
    if (!organism) return;

    const measure = () => {
      const sr = scene.getBoundingClientRect();
      const mr = organism.getBoundingClientRect();
      const mLeft = mr.left - sr.left, mRight = mr.right - sr.left;
      const mTop = mr.top - sr.top, mBottom = mr.bottom - sr.top;
      const R = 13;
      const clampX = (x) => Math.min(Math.max(x, R), sr.width - R);
      const clampY = (y) => Math.min(Math.max(y, R), sr.height - R);

      // Passe 1 — résout la géométrie de chaque cible, retire les cibles absentes ou
      // MASQUÉES (rect 0×0 : trigger replié par @media dans un specimen responsive)
      // plutôt que de poser un badge orphelin à l'origine, et calcule le côté EFFECTIF
      // (en mode stacked mobile, left→top / right→bottom).
      const resolved = annos.map((a) => {
        const t = a.target ? scene.querySelector(a.target) : organism;
        if (a.target) {
          if (!t) return null;
          const probe = t.getBoundingClientRect();
          if (probe.width < 0.5 && probe.height < 0.5) return null;
        }
        const tr = (t || organism).getBoundingClientRect();
        const g = {
          tcy: tr.top + tr.height / 2 - sr.top,
          tcx: tr.left + tr.width / 2 - sr.left,
          tTop: tr.top - sr.top, tBottom: tr.bottom - sr.top,
          tLeft: tr.left - sr.left, tRight: tr.right - sr.left,
        };
        let side = a.side;
        if (stacked && side === "left") side = "top";
        else if (stacked && side === "right") side = "bottom";
        return { n: a.n, side, g };
      }).filter(Boolean);

      let out;
      if (stacked) {
        // Mobile : chaque pastille EST CENTRÉE sur le x de sa cible → trait strictement
        // VERTICAL (jamais de diagonale). Haut ou bas selon que la cible tombe dans la
        // moitié haute ou basse de l'organisme → trait court, il ne traverse pas la carte.
        // Libère les gouttières latérales → la carte fluide occupe toute la largeur.
        const MIN = 30; // écart mini entre 2 pastilles d'un même bord (anti-chevauchement)
        const H = (mBottom - mTop) || 1;
        const stackable = resolved.filter((p) => p.side !== "corner");
        // Côté haut/bas : on respecte la géométrie quand la cible est NETTEMENT en haut
        // (<40% de la hauteur) ou en bas (>60%). Les cibles médianes — cas d'une row d'une
        // seule ligne où tout tombe au centre — sont réparties en ALTERNANCE par x croissant,
        // en démarrant du bord le moins peuplé → équilibre haut/bas au lieu de tout d'un côté.
        const marked = stackable.map((p) => {
          const rel = (p.g.tcy - mTop) / H;
          return { p, side: rel < 0.4 ? "top" : rel > 0.6 ? "bottom" : null };
        });
        let nTop = marked.filter((m) => m.side === "top").length;
        let nBot = marked.filter((m) => m.side === "bottom").length;
        marked.filter((m) => m.side === null)
          .sort((a, b) => a.p.g.tcx - b.p.g.tcx)
          .forEach((m) => { if (nTop <= nBot) { m.side = "top"; nTop++; } else { m.side = "bottom"; nBot++; } });
        const build = marked.map(({ p, side }) => {
          const top = side === "top";
          return { n: p.n, top, x: clampX(p.g.tcx), by: clampY(top ? mTop - GAP : mBottom + GAP), ty: top ? p.g.tTop : p.g.tBottom };
        });
        // Anti-collision : sur chaque bord, on écarte au minimum les pastilles trop proches
        // (le trait reste vertical — la cible est assez large pour rester sous la pastille).
        [true, false].forEach((isTop) => {
          const grp = build.filter((b) => b.top === isTop).sort((a, b) => a.x - b.x);
          for (let i = 1; i < grp.length; i++) if (grp[i].x < grp[i - 1].x + MIN) grp[i].x = clampX(grp[i - 1].x + MIN);
        });
        out = [
          ...build.map((b) => ({ n: b.n, badge: { x: b.x, y: b.by }, line: { x1: b.x, y1: b.by, x2: b.x, y2: b.ty } })),
          ...resolved.filter((p) => p.side === "corner")
            .map((p) => ({ n: p.n, badge: { x: sr.width - CORNER, y: sr.height - CORNER }, line: null })),
        ];
      } else {
        // Desktop — pastille calée sur le bord de l'organisme, BORNÉE dans la scène ;
        // le trait rejoint l'arête de la partie visée depuis la pastille bornée.
        out = resolved.map((p) => {
          const { side, g } = p;
          if (side === "left" || side === "right" || side === "top" || side === "bottom") {
            let badge;
            if (side === "left") badge = { x: mLeft - GAP, y: g.tcy };
            else if (side === "right") badge = { x: mRight + GAP, y: g.tcy };
            else if (side === "top") badge = { x: g.tcx, y: mTop - GAP };
            else badge = { x: g.tcx, y: mBottom + GAP };
            badge.x = clampX(badge.x); badge.y = clampY(badge.y);
            let line;
            if (side === "left") line = { x1: badge.x, y1: g.tcy, x2: g.tLeft, y2: g.tcy };
            else if (side === "right") line = { x1: badge.x, y1: g.tcy, x2: g.tRight, y2: g.tcy };
            else if (side === "top") line = { x1: g.tcx, y1: badge.y, x2: g.tcx, y2: g.tTop };
            else line = { x1: g.tcx, y1: badge.y, x2: g.tcx, y2: g.tBottom };
            return { n: p.n, badge, line };
          }
          return { n: p.n, badge: { x: sr.width - CORNER, y: sr.height - CORNER }, line: null };
        });
      }
      setItems(out);
    };

    measure();
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [annos, stacked]);

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
