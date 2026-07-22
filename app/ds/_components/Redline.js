"use client";
import { useLayoutEffect, useRef, useState } from "react";

/* Redline — spec annotée d'un composant atomique (bouton, chip, badge…).
 *
 * Principe : on ne redessine RIEN et on ne code EN DUR aucune valeur. Le vrai
 * composant est monté tel quel, puis mesuré (getComputedStyle + rects) pour
 * poser les bandes de padding, les bandes de gap, le cadre d'icône et les
 * cotes. Si `library.css` change une valeur, le schéma suit automatiquement —
 * une planche de cotes hardcodée serait périmée au premier refactor.
 *
 * Usage : <Redline>{<button className="btn btn-outline btn-md">…</button>}</Redline>
 */
export default function Redline({ children, showHeight = true }) {
  const ref = useRef(null);
  const [m, setM] = useState(null);

  useLayoutEffect(() => {
    const wrap = ref.current;
    const el = wrap?.firstElementChild;
    if (!el) return;

    const measure = () => {
      const cs = getComputedStyle(el);
      const br = el.getBoundingClientRect();
      const bl = parseFloat(cs.borderLeftWidth) || 0;
      const brw = parseFloat(cs.borderRightWidth) || 0;
      const pl = parseFloat(cs.paddingLeft) || 0;
      const pr = parseFloat(cs.paddingRight) || 0;
      const w = br.width, h = br.height;

      const bands = [];
      if (pl) bands.push({ left: bl, width: pl, value: Math.round(pl) });
      if (pr) bands.push({ left: w - brw - pr, width: pr, value: Math.round(pr) });

      // Gaps réels entre enfants (flex gap) — mesurés, pas lus dans le CSS :
      // ça couvre aussi les cas où un enfant porte sa propre marge.
      const kids = [...el.children];
      for (let i = 0; i < kids.length - 1; i++) {
        const a = kids[i].getBoundingClientRect();
        const b = kids[i + 1].getBoundingClientRect();
        const gap = b.left - a.right;
        if (gap > 0.5) bands.push({ left: a.right - br.left, width: gap, value: Math.round(gap), strong: true });
      }

      // Cadre d'icône : offsetWidth inclut le padding 2px (box-sizing:content-box)
      // → on cote la boîte réservée (ex. 20 en md pour un glyph 16), pas le glyph.
      const icons = kids
        .filter((k) => k.tagName.toLowerCase() === "svg")
        .map((k) => {
          const r = k.getBoundingClientRect();
          return { left: r.left - br.left, top: r.top - br.top, width: r.width, height: r.height };
        });

      setM({ w, h: Math.round(h), bands, icons });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Les webfonts changent la largeur du label → re-mesure une fois chargées.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [children]);

  // Cotes trop proches (ex. xs : padding 4 et gap 4) → on décale une ligne sur
  // deux vers le bas pour que les nombres ne se chevauchent pas.
  const rows = [];
  if (m) {
    const sorted = [...m.bands].map((b, i) => ({ ...b, i, c: b.left + b.width / 2 })).sort((a, b) => a.c - b.c);
    let last = -Infinity, row = 0;
    sorted.forEach((b) => {
      row = b.c - last < 34 ? 1 - row : 0;
      last = b.c;
      rows[b.i] = row;
    });
  }

  return (
    <div className="ds-redline">
      <div className="ds-redline-target" ref={ref}>
        {children}
        {m && (
          <>
            {showHeight && (
              <div className="ds-redline-hgauge">
                <span className="ds-redline-num">{m.h}</span>
                <span className="ds-redline-bracket" />
              </div>
            )}
            {m.bands.map((b, i) => (
              <span
                key={`b${i}`}
                className={`ds-redline-band${b.strong ? " is-gap" : ""}`}
                style={{ left: b.left, width: b.width }}
              />
            ))}
            {m.icons.map((ic, i) => (
              <span key={`i${i}`} className="ds-redline-iconframe" style={{ left: ic.left, top: ic.top, width: ic.width, height: ic.height }}>
                <span className="ds-redline-icallout" style={{ "--lead": `${ic.top + 14}px` }}>
                  <span className="ds-redline-num">{Math.round(ic.width)}</span>
                  <span className="ds-redline-lead" />
                </span>
              </span>
            ))}
            {m.bands.map((b, i) => (
              <span
                key={`c${i}`}
                className="ds-redline-callout"
                style={{ left: b.left + b.width / 2, "--lead": rows[i] ? "30px" : "14px" }}
              >
                <span className="ds-redline-lead" />
                <span className="ds-redline-num">{b.value}</span>
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
