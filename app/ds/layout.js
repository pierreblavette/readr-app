"use client";
import "./ds.css";
import "../library/library.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/brand/Wordmark";
import { NAV, NAV_LABELS, NAV_CHILDREN, sectionsOf } from "./_lib/nav";
import { DSThemeContext } from "./_components/ThemeContext";
import ChipCopy from "./_components/ChipCopy";

// Chrome partagé du Design System : sidebar + toolbar mobile + thème.
// L'état actif de la nav vient de usePathname() (route), plus d'aucune mesure
// de scroll — c'est ce qui règle le bug prod-only du current sur la sidebar.
export default function DSLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  // Groupes de nav dépliés (Cards…) : état PERSISTANT, indépendant de la route. Ouvert
  // d'entrée si on arrive sur une page du groupe (deep-link), sinon replié.
  const [openGroups, setOpenGroups] = useState(() => {
    const init = {};
    for (const [id, kids] of Object.entries(NAV_CHILDREN)) {
      if (kids.some((c) => c.href === pathname)) init[id] = true;
    }
    return init;
  });
  const toggleGroup = (id) => setOpenGroups((g) => ({ ...g, [id]: !g[id] }));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Le layout ne remonte pas entre pages sœurs → fermer le drawer à la navigation.
  useEffect(() => { setMobileSidebarOpen(false); }, [pathname]);

  // Arriver sur une page d'un groupe (ex. /ds/card/book) l'OUVRE ; on ne le referme
  // jamais automatiquement — il reste ouvert si on clique un autre onglet, et ne se
  // ferme qu'au re-clic sur le parent (toggleGroup).
  useEffect(() => {
    for (const [id, kids] of Object.entries(NAV_CHILDREN)) {
      if (kids.some((c) => c.href === pathname)) setOpenGroups((g) => (g[id] ? g : { ...g, [id]: true }));
    }
  }, [pathname]);

  // Soft-nav d'une page longue (ex. Typography) vers une courte (ex. Spacing) :
  // sur certains navigateurs le document garde un scrollHeight périmé un frame après
  // le swap React → la page neuve paraît figée/non-scrollable jusqu'à un repaint (la
  // famille « se répare au hover »). On force scroll-en-haut + un reflow au frame
  // suivant pour recalculer la hauteur contre le nouveau contenu. Scoppé au /ds.
  useEffect(() => {
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => { void document.body.offsetHeight; });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <DSThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app-root ds-root">
        <div className="page-shell">
          {mobileSidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />
          )}
          {/* SIDEBAR */}
          <aside className={`sidebar${mobileSidebarOpen ? ' mobile-open' : ''}`}>
            <div className="sidebar-logo">
              <Link href="/ds" aria-label="Design System"><Wordmark className="logo" /></Link>
            </div>
            <nav className="sidebar-nav">
              {Object.keys(NAV).map((section) => (
                <div key={section} className="sidebar-section">
                  <div className="sidebar-section-head sidebar-section-head--no-action">
                    <span className="sidebar-section-label">{section}</span>
                  </div>
                  {sectionsOf(section).map((id) => {
                    const children = NAV_CHILDREN[id];
                    // Item à sous-pages (Cards) : parent + variantes indentées, dépliées
                    // quand on est sur l'une d'elles (chevron ouvert).
                    if (children) {
                      const onGroup = children.some((c) => pathname === c.href);
                      const isOpen = !!openGroups[id];
                      return (
                        <div key={id} className="sidebar-nav-group">
                          <button
                            type="button"
                            onClick={() => toggleGroup(id)}
                            aria-expanded={isOpen}
                            className={`sidebar-item${onGroup ? " is-current" : ""}`}
                          >
                            <span className="sidebar-label">{NAV_LABELS[id]}</span>
                            <svg className={`sidebar-item-chevron${isOpen ? " is-open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                          </button>
                          {isOpen && (
                            <div className="sidebar-subnav">
                              {children.map((c) => (
                                <Link key={c.href} href={c.href} className={`sidebar-subitem${pathname === c.href ? " active" : ""}`}>{c.label}</Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    const href = `/ds/${id}`;
                    const active = pathname === href;
                    return (
                      <Link key={id} href={href} className={`sidebar-item${active ? " active" : ""}`}>
                        <span className="sidebar-label">{NAV_LABELS[id]}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
            {/* Bottom — iso library : la nav (flex:1) pousse cette row en bas */}
            <div className="sidebar-bottom">
              <div className="sidebar-appearance-row cell-row cell-row--lg cell-row--between">
                <span className="sidebar-row-label">Appearance</span>
                <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle theme" title="Theme">
                  <span className="toggle-thumb">
                    {theme === 'dark'
                      ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                      : <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                    }
                  </span>
                </button>
              </div>
            </div>
          </aside>

          <main className="page-main">
            <div className="toolbar toolbar-mobile-only">
              <div className="toolbar-inner">
                <button
                  className={`toolbar-hamburger${mobileSidebarOpen ? ' open' : ''}`}
                  onClick={() => setMobileSidebarOpen((o) => !o)}
                  aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileSidebarOpen}
                >
                  <span className="hamburger-line hamburger-line-top" />
                  <span className="hamburger-line hamburger-line-mid" />
                  <span className="hamburger-line hamburger-line-bot" />
                </button>
                <Wordmark className="logo" />
                <div className="toolbar-right">
                  <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle theme">
                    <span className="toggle-thumb">
                      {theme === 'dark'
                        ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        : <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                      }
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="main-wrap">
              {children}
            </div>
          </main>
        </div>
        <ChipCopy />
      </div>
    </DSThemeContext.Provider>
  );
}
