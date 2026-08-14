"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { flatNav } from "../_lib/nav";
import { useModalA11y } from "@/lib/useModalA11y";

// Index statique : les 65 pages du DS, dans l'ordre de la sidebar (miroir du pager).
const PAGES = flatNav();

// Surligne les termes de la requête dans un titre (case-insensitive).
function highlight(title, query) {
  const terms = query.trim().split(/\s+/).filter(Boolean).map((t) => t.toLowerCase());
  if (!terms.length) return title;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return title.split(re).map((part, i) =>
    terms.includes(part.toLowerCase())
      ? <mark key={i} className="ds-cmdk-mark">{part}</mark>
      : part
  );
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  const close = useCallback(() => { setOpen(false); setQuery(""); setActive(0); }, []);
  const dialogRef = useModalA11y(open, close, { autoFocus: true });

  // Raccourci global Cmd/Ctrl+K (toggle).
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Résultats : tous les termes présents dans « titre + groupe », classés par
  // qualité du match sur le titre (égal > préfixe > inclus > groupe seul).
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/);
    return PAGES
      .map((p) => {
        const hay = `${p.title} ${p.group}`.toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        const t = p.title.toLowerCase();
        const rank = t === q ? 0 : t.startsWith(q) ? 1 : t.includes(q) ? 2 : 3;
        return { ...p, rank };
      })
      .filter(Boolean)
      .sort((a, b) => a.rank - b.rank || a.title.localeCompare(b.title))
      .slice(0, 40);
  }, [query]);

  useEffect(() => { setActive(0); }, [query]);

  const go = useCallback((page) => {
    if (!page) return;
    router.push(page.href);
    close();
  }, [router, close]);

  function onInputKey(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(results[active]); }
    // Escape est géré par useModalA11y.
  }

  // Garde l'item actif visible pendant la navigation clavier.
  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  return (
    <>
      <button type="button" className="ds-cmdk-trigger" onClick={() => setOpen(true)} aria-label="Search the design system">
        <SearchIcon />
        <span className="ds-cmdk-trigger-label">Search…</span>
        <span className="ds-cmdk-trigger-kbd"><kbd>⌘</kbd><kbd>K</kbd></span>
      </button>

      {open && (
        <div className="ds-cmdk-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="ds-cmdk" role="dialog" aria-modal="true" aria-label="Search the design system" ref={dialogRef} tabIndex={-1}>
            <div className="ds-cmdk-head">
              <SearchIcon />
              <input
                className="ds-cmdk-input"
                type="text"
                placeholder="Search the design system…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="ds-cmdk-list"
                aria-label="Search the design system"
              />
              <button type="button" className="ds-cmdk-close" onClick={close} aria-label="Close search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="ds-cmdk-body">
              {!query.trim() ? (
                <p className="ds-cmdk-empty">Start your search by typing a page name.</p>
              ) : results.length === 0 ? (
                <p className="ds-cmdk-empty">No results found — try another phrase.</p>
              ) : (
                <ul className="ds-cmdk-list" id="ds-cmdk-list" role="listbox" ref={listRef}>
                  {results.map((p, i) => (
                    <li key={p.href} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        className={`ds-cmdk-item${i === active ? " is-active" : ""}`}
                        data-active={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => go(p)}
                      >
                        <span className="ds-cmdk-item-group">{p.group}</span>
                        <span className="ds-cmdk-item-title">{highlight(p.title, query)}</span>
                        <svg className="ds-cmdk-item-enter" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="ds-cmdk-foot">
              <span className="ds-cmdk-foot-hint"><kbd>↑</kbd><kbd>↓</kbd> to navigate&nbsp;&nbsp;<kbd>↵</kbd> to open</span>
              <span className="ds-cmdk-foot-hint"><kbd>Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
