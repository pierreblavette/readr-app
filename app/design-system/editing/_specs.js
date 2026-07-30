"use client";
import { useRef, useState, useEffect } from "react";
import AnnoScene from "../_components/AnnoScene";

// Spec de la famille Editing. SelectionBar reproduite à l'identique de
// components/library/SelectionBar.js (statique, sans handlers). La classe
// .ds-selection-bar-static neutralise le position:fixed + le reveal translateY
// pour poser la barre dans un board de doc au lieu du bas de viewport.
//
// responsive : la barre bascule en format mobile EMPILÉ quand son CONTENEUR (pas le
// viewport) devient trop étroit — via ResizeObserver, car le @media prod (≤600px
// viewport) ne voit pas la largeur du board, plus étroit que la fenêtre. Doctrine
// container-query peu fiable sur WebKit en flex → ResizeObserver. Défaut = compact
// (état le plus contraint) pour éviter tout débordement avant la 1re mesure ; on
// n'élargit en horizontal que si la place est mesurée suffisante.
// responsive=false (défaut) : toujours horizontal — pour Anatomy / Spacing, qui
// documentent la forme canonique desktop.
// compact (bool explicite) : force l'état, sans ResizeObserver — utilisé quand un
// parent (AnatomyResponsive) pilote déjà le breakpoint et rend la variante voulue.
export function SelectionBarSpec({ count = 2, total = 3, tab = "owned", responsive = false, compact: compactProp, need: needProp, className = "" }) {
  const allSelected = count === total && total > 0;
  const ref = useRef(null);
  const [roCompact, setRoCompact] = useState(responsive);
  const compact = compactProp !== undefined ? compactProp : roCompact;

  useEffect(() => {
    if (!responsive || compactProp !== undefined) return;
    const el = ref.current;
    if (!el) return;
    // On mesure le VRAI conteneur, pas el.parentElement : dans un Redline le parent
    // est .ds-redline-target (inline-flex qui épouse la barre) → il donnerait toujours
    // la largeur de la barre, jamais l'espace dispo. On remonte au board le plus proche.
    const container = el.closest(".ds-preview, .ds-redline-board, .ds-anno-board") || el.parentElement;
    if (!container) return;
    // Largeur horizontale requise avant de basculer en empilé. Par défaut selon le
    // nombre de boutons (Wishlist ajoute « Mark as owned »). needProp l'élève quand le
    // contexte demande plus d'air autour de la barre (Spacing : crochet + vcallouts +
    // callouts bas → bascule plus tôt, à 720).
    const need = needProp ?? (tab === "wishlist" ? 640 : 500);
    const measure = () => {
      const cs = getComputedStyle(container);
      const avail = container.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
      setRoCompact(avail < need);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [responsive, tab, compactProp, needProp]);

  return (
    <div ref={ref} className={`selection-bar ds-selection-bar-static${compact ? " is-compact" : ""} ${className}`.trim()}>
      <span className="selection-count">{count} selected</span>
      <div className="sel-actions">
        <button type="button" className="sel-btn sel-select-all">{allSelected ? "Deselect all" : "Select all"}</button>
        {tab === "wishlist" && (
          <button type="button" className="sel-btn sel-confirm" disabled={count === 0}>Mark as owned</button>
        )}
        <button type="button" className="sel-btn sel-confirm danger" disabled={count === 0}>Remove</button>
      </div>
      <button type="button" className="sel-btn sel-cancel"><span>Cancel</span></button>
    </div>
  );
}

// Anatomy responsive : DEUX scènes distinctes selon la largeur du CONTENEUR (pas le
// viewport). Desktop = barre horizontale + badges haut/bas ; mobile = barre empilée +
// badges gauche/droite. On MONTE l'une OU l'autre (pas display:none, sinon AnnoScene
// mesurerait une scène cachée à 0) → chaque disposition a des badges pensés pour elle,
// aucun ne converge sur l'axe central comme le ferait un simple stacking d'une scène
// unique. Défaut compact (état contraint avant 1re mesure).
export function AnatomyResponsive({ horizontalAnnos, verticalAnnos, count = 2, total = 3, threshold = 500 }) {
  const ref = useRef(null);
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const el = ref.current;
    const container = el?.closest(".ds-anno-board") || el?.parentElement;
    if (!container) return;
    const measure = () => {
      const cs = getComputedStyle(container);
      const avail = container.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
      setCompact(avail < threshold);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [threshold]);
  return (
    <div ref={ref}>
      {compact ? (
        <AnnoScene annos={verticalAnnos}>
          <SelectionBarSpec count={count} total={total} compact className="ds-anno-organism" />
        </AnnoScene>
      ) : (
        <AnnoScene annos={horizontalAnnos}>
          <SelectionBarSpec count={count} total={total} compact={false} className="ds-anno-organism" />
        </AnnoScene>
      )}
    </div>
  );
}
