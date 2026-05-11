"use client";
import { useEffect, useState } from "react";

export default function Toast({ message, onDismiss }) {
  // Cache the last non-empty message so it persists during fade-out
  // (preventing the visual width shrink when parent clears toastMsg)
  const [shown, setShown] = useState('');

  useEffect(() => {
    if (message) setShown(message);
  }, [message]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <div className={`toast${message ? ' toast-visible' : ''}`} role="status" aria-live="polite">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>{shown}</span>
    </div>
  );
}
