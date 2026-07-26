"use client";
import { useState, useEffect } from "react";

/* Sous-nav sticky d'une page à variantes (ex. Cards → Book / Quote / …). Pills =
 * primitive Segmented Pills (.overview-activity-pill) réutilisée. Clic → scroll fluide
 * vers le groupe ancré ; scroll-spy (IntersectionObserver) surligne le groupe courant.
 * Générique : items = [{ id, label }] où id = l'ancre d'un .ds-variant-head. */
export default function PageSubnav({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // Scroll-spy robuste : le groupe ACTIF est le dernier dont le haut a franchi le
    // seuil (juste sous la sous-nav sticky). Marche aux bords et pour le dernier
    // groupe (une bande IntersectionObserver rate le groupe une fois passé au-dessus).
    const THRESHOLD = 160;
    const compute = () => {
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top - THRESHOLD <= 0) current = it.id;
      }
      setActive(current);
    };
    compute();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { compute(); ticking = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="ds-page-subnav">
      <div className="overview-activity-pills is-md" role="tablist" aria-label="Cards">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={active === it.id}
            className={`overview-activity-pill is-md${active === it.id ? " is-active" : ""}`}
            onClick={() => go(it.id)}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
