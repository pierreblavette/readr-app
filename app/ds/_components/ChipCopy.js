"use client";
import { useEffect, useState } from "react";

/* Copie au clic sur toute pastille .ds-token-chip / .ds-class, par event delegation
 * sur document : aucun changement de markup sur les ~170 pastilles statiques. Lit le
 * textContent, copie, et affiche un « Copied » flottant ~1s au-dessus de la pastille.
 * Confort souris (pas de tab-stop ajouté en prose). Doc /ds uniquement. */
export default function ChipCopy() {
  const [fb, setFb] = useState(null); // { x, y }

  useEffect(() => {
    let timer;
    const onClick = (e) => {
      const chip = e.target.closest?.(".ds-token-chip, .ds-class");
      if (!chip) return;
      const text = chip.textContent.trim();
      if (!text) return;
      navigator.clipboard?.writeText(text).catch(() => {});
      const r = chip.getBoundingClientRect();
      setFb({ x: r.left + r.width / 2, y: r.top - 6 });
      clearTimeout(timer);
      timer = setTimeout(() => setFb(null), 1000);
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); clearTimeout(timer); };
  }, []);

  if (!fb) return null;
  return (
    <div className="ds-copy-toast" style={{ left: fb.x, top: fb.y }}>
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Copied
    </div>
  );
}
