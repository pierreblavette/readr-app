"use client";
import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useModalA11y(open, onClose, options = {}) {
  const { autoFocus = true } = options;
  const containerRef = useRef(null);
  // Keep onClose in a ref so the focus-trap effect doesn't re-run on
  // every parent render (where the inline onClose closure would get a
  // new reference). Otherwise: every parent re-render → effect cleanup
  // restores previous focus, then setup re-focuses the first focusable
  // (= .modal-close), making focus jump out of any active input.
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused =
      typeof document !== "undefined" ? document.activeElement : null;

    function onKey(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (e.key === "Tab") {
        const root = containerRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll(FOCUSABLE_SELECTOR);
        if (focusables.length === 0) {
          e.preventDefault();
          root.focus();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !root.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !root.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);

    const root = containerRef.current;
    if (root) {
      if (autoFocus) {
        const focusable = root.querySelector(FOCUSABLE_SELECTOR);
        (focusable || root).focus({ preventScroll: true });
      } else {
        // Focus the container itself (tabIndex=-1) — preserves a11y context
        // for screen readers without highlighting any inner control.
        root.focus({ preventScroll: true });
      }
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open, autoFocus]);

  return containerRef;
}
