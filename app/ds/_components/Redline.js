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
export default function Redline({ children, showHeight = true, boxSelector = null, noGaps = false }) {
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
      const bt = parseFloat(cs.borderTopWidth) || 0;
      const bbw = parseFloat(cs.borderBottomWidth) || 0;
      const pl = parseFloat(cs.paddingLeft) || 0;
      const pr = parseFloat(cs.paddingRight) || 0;
      const pt = parseFloat(cs.paddingTop) || 0;
      const pb = parseFloat(cs.paddingBottom) || 0;
      const w = br.width, h = br.height;

      // Padding horizontal (gauche/droite) → stries verticales, cotées en bas.
      const bands = [];
      if (pl) bands.push({ left: bl, width: pl, value: Math.round(pl) });
      if (pr) bands.push({ left: w - brw - pr, width: pr, value: Math.round(pr) });

      // Padding vertical (haut/bas) → stries horizontales, cotées à droite (la
      // gauche est prise par le crochet de hauteur). Les atomes (padding 0 X) ont
      // pt/pb = 0 → aucune bande verticale, comportement inchangé ; ça n'apparaît
      // que sur les composants à padding vertical réel (modal, footer, cards).
      const vbands = [];
      if (pt) vbands.push({ top: bt, height: pt, value: Math.round(pt) });
      if (pb) vbands.push({ top: h - bbw - pb, height: pb, value: Math.round(pb) });

      // Enfants VISIBLES seulement : un input masqué (0×0, position absolue, ex.
      // la checkbox) fausserait sinon la boucle de gaps avec une bande parasite.
      const kids = [...el.children].filter((k) => {
        const r = k.getBoundingClientRect();
        return r.width > 0.5 && r.height > 0.5;
      });

      // Gaps réels entre enfants (flex gap) — mesurés, pas lus dans le CSS :
      // ça couvre aussi les cas où un enfant porte sa propre marge. noGaps : à
      // couper quand l'espacement est un space-between/auto (footer d'actions) —
      // la distance mesurée n'est pas un gap fixe et n'a rien à coter.
      if (!noGaps) {
        for (let i = 0; i < kids.length - 1; i++) {
          const a = kids[i].getBoundingClientRect();
          const b = kids[i + 1].getBoundingClientRect();
          const hgap = b.left - a.right;
          const vgap = b.top - a.bottom;
          // Enfants côte à côte → gap horizontal (strie verticale). Enfants empilés
          // (colonne : modal title/body/footer, cards) → gap vertical (strie
          // horizontale), coté à droite comme les paddings verticaux.
          if (hgap > 0.5) bands.push({ left: a.right - br.left, width: hgap, value: Math.round(hgap), strong: true });
          else if (vgap > 0.5) vbands.push({ top: a.bottom - br.top, height: vgap, value: Math.round(vgap) });
        }
      }

      // Cadre d'icône : offsetWidth inclut le padding 2px (box-sizing:content-box)
      // → on cote la boîte réservée (ex. 20 en md pour un glyph 16), pas le glyph.
      const icons = kids
        .filter((k) => k.tagName.toLowerCase() === "svg")
        .map((k) => {
          const r = k.getBoundingClientRect();
          return { left: r.left - br.left, top: r.top - br.top, width: r.width, height: r.height };
        });

      // Boîte désignée (opt-in) : pour les composants dont l'anatomie est un carré
      // — checkbox, radio, avatar. On cote sa taille et son radius, pas un padding.
      let box = null;
      if (boxSelector) {
        const bx = el.querySelector(boxSelector);
        if (bx) {
          const r = bx.getBoundingClientRect();
          if (r.width > 0.5) {
            const bcs = getComputedStyle(bx);
            box = {
              left: r.left - br.left,
              top: r.top - br.top,
              width: r.width,
              height: r.height,
              radius: Math.round(parseFloat(bcs.borderTopLeftRadius) || 0),
            };
          }
        }
      }

      // Radius du specimen : sert à clipper les bandes (sinon elles débordent aux
      // coins arrondis) et à arrondir le mat blanc du target.
      const rootRadius = parseFloat(cs.borderTopLeftRadius) || 0;

      setM({ w, h: Math.round(h), bands, vbands, icons, box, rootRadius });
    };

    measure();
    // En navigation client (soft nav), le layout n'est pas toujours stabilisé au
    // moment du useLayoutEffect : la 1re mesure capture une largeur transitoire et,
    // comme la taille ne rebouge plus, le ResizeObserver ne refire pas. On re-mesure
    // donc après le prochain paint (double rAF) — au hard refresh c'était déjà bon,
    // ici ça aligne le cas soft-nav.
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Les webfonts changent la largeur du label → re-mesure une fois chargées.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [children]);

  // Cotes trop proches → on décale une ligne sur deux vers le bas pour que les
  // nombres ne se chevauchent pas. Seuil basé sur la LARGEUR RÉELLE des deux
  // nombres (mono ≈ 7px/caractère, donc ~3.5px par demi-nombre) + marge, plutôt
  // qu'une valeur fixe : deux « 10 » écartés de 30px ne se touchent pas et restent
  // alignés (badge symétrique) ; deux « 4 » collés (xs des boutons) se décalent.
  const rows = [];
  if (m) {
    const sorted = [...m.bands].map((b, i) => ({ ...b, i, c: b.left + b.width / 2 })).sort((a, b) => a.c - b.c);
    let last = -Infinity, lastLen = 0, row = 0;
    sorted.forEach((b) => {
      const len = String(b.value).length;
      const threshold = (len + lastLen) * 3.5 + 10;
      row = b.c - last < threshold ? 1 - row : 0;
      last = b.c;
      lastLen = len;
      rows[b.i] = row;
    });
  }

  // Icônes répétées (ex. 5 étoiles identiques) : coter la taille UNE fois suffit —
  // sinon N callouts égaux se chevauchent (« 20x2020 »). On garde tous les cadres,
  // un seul nombre par largeur×hauteur distincte.
  const iconCallout = [];
  if (m) {
    const seen = new Set();
    m.icons.forEach((ic, i) => {
      const key = `${Math.round(ic.width)}x${Math.round(ic.height)}`;
      if (!seen.has(key)) { seen.add(key); iconCallout[i] = true; }
    });
  }

  return (
    <div className="ds-redline">
      <div className="ds-redline-target" ref={ref} style={{ borderRadius: m ? m.rootRadius : undefined }}>
        {children}
        {m && (
          <>
            {showHeight && (
              <div className="ds-redline-hgauge">
                <span className="ds-redline-num">{m.h}</span>
                <span className="ds-redline-bracket" />
              </div>
            )}
            {/* Bandes de padding inset verticalement du radius du specimen : elles
                restent sur la partie droite du bord (flush avec la border) et
                n'entrent jamais dans les coins arrondis. Les bandes de gap (au
                milieu) gardent la pleine hauteur — pas de coin à éviter. */}
            {m.bands.map((b, i) => (
              <span
                key={`b${i}`}
                className={`ds-redline-band${b.strong ? " is-gap" : ""}`}
                style={{
                  left: b.left,
                  width: b.width,
                  top: b.strong ? 0 : m.rootRadius,
                  bottom: b.strong ? 0 : m.rootRadius,
                }}
              />
            ))}
            {/* Bandes de padding vertical (haut/bas) : stries horizontales pleine
                largeur, inset du radius sur les côtés pour ne pas mordre les coins. */}
            {m.vbands.map((b, i) => (
              <span
                key={`vb${i}`}
                className="ds-redline-band"
                style={{ top: b.top, height: b.height, left: m.rootRadius, right: m.rootRadius }}
              />
            ))}
            {m.icons.map((ic, i) => (
              <span key={`i${i}`} className="ds-redline-iconframe" style={{ left: ic.left, top: ic.top, width: ic.width, height: ic.height }}>
                {iconCallout[i] && (
                  <span className="ds-redline-icallout" style={{ "--lead": `${ic.top + 14}px` }}>
                    <span className="ds-redline-num">{Math.round(ic.width)}</span>
                    <span className="ds-redline-lead" />
                  </span>
                )}
              </span>
            ))}
            {m.box && (
              <span className="ds-redline-iconframe" style={{ left: m.box.left, top: m.box.top, width: m.box.width, height: m.box.height }}>
                <span className="ds-redline-icallout" style={{ "--lead": `${m.box.top + 14}px` }}>
                  <span className="ds-redline-num">
                    {Math.round(m.box.width)}×{Math.round(m.box.height)}
                    {m.box.radius > 0 && (m.box.radius * 2 >= m.box.height ? " · pill" : ` · r${m.box.radius}`)}
                  </span>
                  <span className="ds-redline-lead" />
                </span>
              </span>
            )}
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
            {/* Cotes des paddings verticaux : à droite du specimen, trait horizontal
                depuis le bord droit vers le nombre. */}
            {m.vbands.map((b, i) => (
              <span
                key={`vc${i}`}
                className="ds-redline-vcallout"
                style={{ top: b.top + b.height / 2 }}
              >
                <span className="ds-redline-vlead" />
                <span className="ds-redline-num">{b.value}</span>
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
