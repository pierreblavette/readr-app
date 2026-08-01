"use client";
import { useRef, useLayoutEffect } from "react";
import { Chevron, QuotesLines } from "./_specs";

/* Filters Row responsive basé sur l'ESPACE DISPONIBLE du conteneur (pas le viewport).
 * Le vrai composant fold via @media (useMediaQuery) ; dans le Preview /ds la largeur
 * dépend de la box, pas du viewport → les triggers wrappaient. Ici un ResizeObserver
 * mesure la largeur réelle et replie progressivement les triggers (ordre de priorité :
 * Quotes → Genres → Rating → Reading → Authors ; Sort ne se replie jamais) dans le
 * bouton Filter, en gardant tout sur UNE ligne (flex-nowrap). Pilotage impératif via
 * style.display inline → l'emporte sur le fold @media (pas de conflit). Cf. CLAUDE.md :
 * ResizeObserver > container query en contexte flex WebKit. */

// Ordre d'AFFICHAGE (gauche→droite). Quotes se replie en premier, Sort jamais.
const FOLDABLES = [
  { key: "authors", label: "Authors", wrap: "authors-menu" },
  { key: "reading", label: "Reading status", wrap: "sort-menu filters-reading" },
  { key: "rating", label: "Rating", wrap: "sort-menu filters-rating" },
  { key: "genres", label: "Genres", wrap: "genres-menu" },
  { key: "quotes", label: null, wrap: "quotes-toggle" },
];

function TriggerBtn({ label, wrap, fold }) {
  const attr = fold ? { "data-fold": "" } : { "data-sort": "" };
  if (label === null) {
    return (
      <div className={`dropdown-wrap ${wrap}`} {...attr}>
        <button type="button" className="dropdown-btn dropdown-btn--icon" aria-label="Books with quotes" title="Books with quotes">
          <QuotesLines />
        </button>
      </div>
    );
  }
  return (
    <div className={`dropdown-wrap ${wrap}`} {...attr}>
      <button type="button" className="dropdown-btn sort-menu-btn">
        <span className="sort-menu-btn-label">{label}</span>
        <Chevron />
      </button>
    </div>
  );
}

export default function FiltersRowFit({ className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const row = ref.current;
    if (!row) return;

    const measure = () => {
      const sortEl = row.querySelector("[data-sort]");
      const foldEls = [...row.querySelectorAll("[data-fold]")];
      const filterEl = row.querySelector("[data-filter]");
      if (!sortEl || !filterEl) return;

      // Tout visible pour lire les largeurs intrinsèques (triggers = flex:0 0 auto,
      // ils ne rétrécissent pas → offsetWidth fiable même en débordement).
      sortEl.style.display = "inline-flex";
      foldEls.forEach((el) => (el.style.display = "inline-flex"));
      filterEl.style.display = "inline-flex";

      const gap = parseFloat(getComputedStyle(row).columnGap) || 8;
      const avail = row.clientWidth;
      const sortW = sortEl.offsetWidth;
      const filterW = filterEl.offsetWidth;
      const foldW = foldEls.map((el) => el.offsetWidth);

      const allTotal = sortW + foldW.reduce((a, w) => a + gap + w, 0);
      let shown, needFilter;
      if (allTotal <= avail) {
        shown = foldEls.length;
        needFilter = false;
      } else {
        needFilter = true;
        const budget = avail - filterW - gap; // place réservée au bouton Filter
        let used = sortW;
        shown = 0;
        for (let i = 0; i < foldEls.length; i++) {
          if (used + gap + foldW[i] <= budget) {
            used += gap + foldW[i];
            shown++;
          } else break;
        }
      }

      foldEls.forEach((el, i) => (el.style.display = i < shown ? "inline-flex" : "none"));
      filterEl.style.display = needFilter ? "inline-flex" : "none";
    };

    measure();
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    // Les webfonts changent la largeur des labels → re-mesure une fois chargées.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`cell-row cell-row--lg filters-row ds-filters-fit ${className}`.trim()}>
      <TriggerBtn label="Date added" wrap="sort-menu filters-sort" fold={false} />
      {FOLDABLES.map((f) => (
        <TriggerBtn key={f.key} label={f.label} wrap={f.wrap} fold />
      ))}
      <button type="button" data-filter className="dropdown-btn filters-mobile-trigger" aria-label="Filter">
        <QuotesLines className="dropdown-btn-icon" />
        <span className="dropdown-btn-label">Filter</span>
      </button>
    </div>
  );
}
