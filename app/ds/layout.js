"use client";
import "./ds.css";
import "../library/library.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoLockup from "@/components/brand/LogoLockup";
import Wordmark from "@/components/brand/Wordmark";
import { NAV, NAV_LABELS } from "./_lib/nav";
import { DSThemeContext } from "./_components/ThemeContext";

// Chrome partagé du Design System : sidebar + toolbar mobile + thème.
// L'état actif de la nav vient de usePathname() (route), plus d'aucune mesure
// de scroll — c'est ce qui règle le bug prod-only du current sur la sidebar.
export default function DSLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Le layout ne remonte pas entre pages sœurs → fermer le drawer à la navigation.
  useEffect(() => { setMobileSidebarOpen(false); }, [pathname]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <DSThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app-root">
        <div className="page-shell">
          {mobileSidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />
          )}
          {/* SIDEBAR */}
          <aside className={`sidebar${mobileSidebarOpen ? ' mobile-open' : ''}`}>
            <div className="sidebar-logo">
              <Link href="/" aria-label="Readr"><LogoLockup className="logo" /></Link>
            </div>
            <nav className="sidebar-nav">
              {Object.entries(NAV).map(([section, ids]) => (
                <div key={section} className="sidebar-section">
                  <div className="sidebar-section-head sidebar-section-head--no-action">
                    <span className="sidebar-section-label">{section}</span>
                  </div>
                  {ids.map((id) => {
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
                <button className={`theme-btn-ds${theme === 'dark' ? ' is-on' : ''}`} onClick={toggleTheme} title="Theme">
                  <span className="toggle-thumb-ds">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
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
      </div>
    </DSThemeContext.Provider>
  );
}
