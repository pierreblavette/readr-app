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
