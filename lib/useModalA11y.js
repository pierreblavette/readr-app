"use client";
import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useModalA11y(open, onClose) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused =
      typeof document !== "undefined" ? document.activeElement : null;

    function onKey(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
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
      const focusable = root.querySelector(FOCUSABLE_SELECTOR);
      (focusable || root).focus();
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose]);

  return containerRef;
}
