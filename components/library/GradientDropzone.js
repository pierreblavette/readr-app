"use client";
import { useState, useEffect, useRef } from "react";

/* Dropzone à bord tireté dessiné en SVG (une bordure CSS ne peut pas porter de
 * dégradé, et `border-style: dashed` n'expose pas son rythme). Deux modes :
 *  - défaut : stroke en dégradé rose→bleu (variante photo/AI).
 *  - `solid` : pas de dégradé, le stroke uni est posé par CSS (.import-dropzone--svg)
 *    pour suivre les états :hover / .dragover. Même dash 6/4 + rx 9 que le photo.
 * `...rest` transmet les handlers drag&drop au conteneur. */
export default function GradientDropzone({ onClick, children, gradientId = "gradBorder", solid = false, className, ...rest }) {
  const ref = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setDims({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cls = className || (solid ? "import-dropzone import-dropzone--svg" : "import-dropzone import-dropzone-photo");

  return (
    <div ref={ref} className={cls} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }} {...rest}>
      {dims.w > 0 && (
        <svg className="photo-dropzone-border" width={dims.w} height={dims.h} aria-hidden="true">
          {!solid && (
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#F67BF8"/>
                <stop offset="62%" stopColor="#4959E6"/>
              </linearGradient>
            </defs>
          )}
          <rect x="1" y="1" width={dims.w - 2} height={dims.h - 2} rx="9" fill="none"
            strokeWidth="2" strokeDasharray="6 4"
            {...(solid ? {} : { stroke: `url(#${gradientId})` })} />
        </svg>
      )}
      {children}
    </div>
  );
}
