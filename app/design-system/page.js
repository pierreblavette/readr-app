"use client";
import "./ds.css";
import "../library/library.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ReadrIcon, TrackingIcon, ScanIcon, QuoteIcon, WordsIcon, DataControlIcon
} from "@/components/library/Onboarding";
import GradientDropzone from "@/components/library/GradientDropzone";

const NAV = {
  Foundations: ["logo","colors","typography","spacing","cell-row","shadows","strokes"],
  Components:  ["autocomplete","badges","book-chip","buttons","checkbox","dropdown","export-menu","inputs","lang-switcher","sort-menu","theme-toggle","view-toggle"],
  Patterns:    ["card","quote-card","dictionary-card","list","sidebar","panel","quote-panel","modal","delete-modal","upload-box","selection-bar","empty","now-reading","finish-reading","onboarding","footer"],
  Reference:   ["token-usage"],
};
const NAV_LABELS = {
  "logo":"Logo","colors":"Colors","typography":"Typography",
  "spacing":"Spacing","cell-row":"Cell Row","shadows":"Shadows & Radius","strokes":"Strokes & Borders",
  "buttons":"Buttons","dropdown":"Dropdown Menu",
  "inputs":"Inputs","view-toggle":"View Toggle","badges":"Badges",
  "checkbox":"Checkbox","autocomplete":"Autocomplete","lang-switcher":"Language Switcher",
  "theme-toggle":"Theme Toggle","book-chip":"Book Chip","export-menu":"Export Menu","sort-menu":"Sort Menu",
  "card":"Book Card","quote-card":"Quote Card","dictionary-card":"Dictionary Card",
  "list":"List View","sidebar":"Sidebar","panel":"Side Panel","quote-panel":"Quote Panel",
  "modal":"Modal","delete-modal":"Delete Modal","upload-box":"Upload Box","selection-bar":"Selection Bar","empty":"Empty State","now-reading":"Now Reading","finish-reading":"Finish Reading Modal","onboarding":"Onboarding","footer":"Footer",
  "token-usage":"Token Usage",
};

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function DesignSystemPage() {
  const [active, setActive] = useState("logo");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const ids = Object.values(NAV).flat();

    function onScroll() {
      const scrollY = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
        else break;
      }
      setActive(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const item = document.querySelector('.sidebar-item.active');
    const nav = item?.closest('.sidebar-nav');
    if (!item || !nav) return;
    const itemRect = item.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    if (itemRect.top < navRect.top || itemRect.bottom > navRect.bottom) {
      const offset = itemRect.top - navRect.top;
      nav.scrollTop += offset - navRect.height / 2 + itemRect.height / 2;
    }
  }, [active]);

  const [viewActive, setViewActive]         = useState("grid");
  const [langActive, setLangActive]         = useState("EN");
  const [importTab, setImportTab]           = useState("photo");
  const [addModalSource, setAddModalSource] = useState("owned");
  const [deleteVariant, setDeleteVariant]   = useState("book");
  const [importTabIndicator, setImportTabIndicator] = useState({ left: 0, width: 0 });
  const importTabRefs = useRef([]);
  useEffect(() => {
    const idx = ["photo","scan","file","manual"].indexOf(importTab);
    const el = importTabRefs.current[idx];
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const r = el.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();
    setImportTabIndicator({ left: r.left - pr.left + parent.scrollLeft, width: r.width });
  }, [importTab]);
  const [chk1, setChk1]                     = useState(false);
  const [chk2, setChk2]                     = useState(true);

  function UploadBoxDemo({ state }) {
    return (
      <GradientDropzone gradientId={`dsUpload-${state}`}>
        {state === "idle" && (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <div className="import-dropzone-title">Drop a photo or click to browse</div>
            <div className="import-dropzone-sub">JPG · PNG · HEIC — photo of a bookshelf or a handwritten list</div>
          </>
        )}
        {state === "scanning" && (
          <>
            <svg className="quote-scanning-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg>
            <div className="import-dropzone-title">Scanning cover...</div>
            <div className="import-dropzone-sub">Detecting title and author from your photo</div>
          </>
        )}
        {state === "error" && (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <div className="import-dropzone-title">Drop a photo or click to browse</div>
            <div className="import-dropzone-sub">JPG · PNG · HEIC — photo of a bookshelf or a handwritten list</div>
          </>
        )}
      </GradientDropzone>
    );
  }

  function DropdownDemo({ label, items }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      if (!open) return;
      function close(e) { if (!ref.current?.contains(e.target)) setOpen(false); }
      document.addEventListener('mousedown', close);
      return () => document.removeEventListener('mousedown', close);
    }, [open]);
    return (
      <div className="dropdown-wrap" ref={ref}>
        <button className="btn btn-outline btn-md" onClick={() => setOpen(o => !o)} style={{ gap: 8 }}>
          <span>{label}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 13, height: 13, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}><path d="M6 9l6 6 6-6"/></svg>
        </button>
        {open && (
          <div className="dropdown-menu">
            {items.map(item => (
              <button key={item} className="dropdown-item" onClick={() => setOpen(false)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  function DSSection({ id, title, sub, children }) {
    return (
      <section className="ds-section" id={id}>
        <div className="ds-section-header">
          <h2 className="ds-section-title">{title}</h2>
          {sub && <p className="ds-section-sub">{sub}</p>}
        </div>
        <div className="ds-section-body">{children}</div>
      </section>
    );
  }

  function Swatch({ bg, title, token, light, dark, size = "md", anchor = false }) {
    const value = theme === "dark" ? (dark || light) : (light || dark);
    return (
      <div className={`ds-swatch${size === "sm" ? " ds-swatch--sm" : ""}`}>
        <div className={`ds-swatch-block${anchor ? " is-anchor" : ""}`} style={{ background: bg, borderBottom: "1px solid var(--border-subtle)" }} />
        <div className="ds-swatch-info">
          {title && <div className="ds-swatch-title">{title}</div>}
          {(token || value) && (
            <div className="ds-swatch-tokens">
              {token && <div className="ds-token-name">{token}</div>}
              {value && <div className="ds-token-val">{value}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <div className="page-shell">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <Link href="/" className="logo">readr</Link>
          </div>
          <nav className="sidebar-nav">
            {Object.entries(NAV).map(([section, ids]) => (
              <div key={section} className="sidebar-section">
                <div className="sidebar-section-head sidebar-section-head--no-action">
                  <span className="sidebar-section-label">{section}</span>
                </div>
                {ids.map(id => (
                  <button key={id} className={`sidebar-item${active === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
                    <span className="sidebar-label">{NAV_LABELS[id]}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-appearance-row cell-row cell-row--lg cell-row--between">
              <span className="sidebar-appearance-label">Appearance</span>
              <button className="theme-btn-ds" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} title="Theme">
                <span className="toggle-thumb-ds">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </span>
              </button>
            </div>
          </div>
        </aside>

        <main className="page-main">
          <div className="main-wrap">

            {/* CONTENT */}
            <div className="ds-content">

          {/* INTRO */}
          <div className="ds-intro">
            <h1 className="page-title">Design System</h1>
            <p className="page-sub">
              Complete reference for tokens, components and patterns. Native light/dark themes via <code style={{ fontSize: 12, background: "var(--bg3)", padding: "2px 6px", borderRadius: 4 }}>data-theme</code>.
            </p>
          </div>

          {/* ── LOGO ── */}
          <DSSection id="logo" title="Logo" sub="Wordmark only — Fraunces Regular. No icon, no bold version, no font substitution.">
            <div className="ds-card">
              <div className="ds-card-head">Contextes d'utilisation</div>
              <div className="ds-card-body col padded">
                <div className="logo-bg-row">
                  {[["logo-bg-page","#1B1B1B"],["logo-bg-dark","#ffffff"],["logo-bg-accent","#ffffff"]].map(([cls,col],i) => (
                    <div key={i} className={`logo-bg ${cls}`}>
                      <span className="logo-wordmark" style={{ color: col }}>readr</span>
                    </div>
                  ))}
                  <div className="logo-bg-fill" aria-hidden="true" />
                </div>
                <div className="logo-spec-row">
                  {[["Font","Fraunces"],["Weight","400"],["Letter-spacing","-0.02em"],["Default color","#1B1B1B"],["On dark","#FFFFFF"]].map(([l,v]) => (
                    <div key={l} className="logo-spec-item">
                      <span className="logo-spec-label">{l}</span>
                      <span className="logo-spec-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Sizes</div>
              <div className="ds-card-body col">
                {[[40,"display / splash screen"],[28,"page header"],[24,"nav (reference size)"],[14,"footer / minimum size"]].map(([sz, use]) => (
                  <div key={sz} className="type-sample">
                    <span className="logo-wordmark" style={{ fontSize: sz, color: "var(--text)" }}>readr</span>
                    <div className="type-meta">{sz}px · {use}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Usage rules</div>
              <div className="ds-card-body col padded" style={{ gap: 8 }}>
                <p>
                  Always lowercase — <strong>readr</strong>, never <em>Readr</em> or <em>READR</em>. Do not modify the font, weight or letter-spacing. Minimum size: 14px. On colored backgrounds, use white only (#FFFFFF).
                </p>
              </div>
            </div>
          </DSSection>

          {/* ── COLORS ── */}
          <DSSection id="colors" title="Colors" sub="CSS tokens defined on :root and [data-theme='dark']">

            <div className="ds-card">
              <div className="ds-card-head">Surfaces</div>
              <div className="ds-card-body">
                <div className="ds-swatch-grid">
                  <Swatch bg="var(--bg)" title="Page" token="--bg" light="#FEFEFF" dark="#0F0F0F" />
                  <Swatch bg="var(--bg3)" title="Subtle" token="--bg3" light="#F7F7F7" dark="#1A1A1A" />
                  <Swatch bg="var(--card)" title="Card" token="--card" light="#FFFFFF" dark="#1E1E1E" />
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Strokes</div>
              <div className="ds-card-body col padded">
                <div className="ds-swatch-grid">
                  <Swatch bg="var(--border-subtle)" title="Subtle" token="--border-subtle" light="#EFEFEF" dark="#2E2E2E" />
                  <Swatch bg="var(--border)" title="Strong" token="--border" light="#E0E0E0" dark="#2E2E2E" />
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">--border-subtle</div>
                  <p>default stroke for all components (buttons, inputs, cards, containers) and most dividers (row separators, section separators). 1.5px on components, 1px on dividers.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">--border</div>
                  <p>reserved for stronger visual affordances where a subtle stroke isn't enough : <code>.panel-spinner</code> ring (2px), <code>.import-dropzone</code> dashed border (2px), <code>.ob-dot</code> background. Do not use for regular component strokes.</p>
                </div>
                <div className="ds-token-block">
                  <p>In dark mode both tokens resolve to <code>#2E2E2E</code> — divergence exists only in light mode.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Accent</div>
              <div className="ds-card-body">
                <div className="ds-swatch-grid">
                  <Swatch bg="var(--accent)" title="Primary" token="--accent / --primary-50" light="#4959E6" dark="#7B89F8" />
                  <Swatch bg="var(--accent-bg)" title="Primary Subtle" token="--accent-bg" light="rgba(73,89,230,.08)" />
                  <Swatch bg="linear-gradient(135deg,var(--ai-from),var(--ai-to))" title="AI Gradient" token="--ai-from / --ai-to" light="#F67BF8 → #4959E6" dark="→ #7B89F8" />
                  <Swatch bg="var(--teal)" title="Secondary" token="--teal" light="#00A699" dark="#00C9BE" />
                  <Swatch bg="var(--teal-bg)" title="Secondary Subtle" token="--teal-bg" light="rgba(0,166,153,.08)" />
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Text</div>
              <div className="ds-card-body">
                <div className="ds-swatch-grid">
                  <Swatch bg="var(--text)" title="Default" token="--text" light="#222" dark="#F0F0F0" />
                  <Swatch bg="var(--text-2)" title="Secondary" token="--text-2" light="#555" dark="#909090" />
                  <Swatch bg="var(--text-3)" title="Muted" token="--text-3" light="#777" dark="#555" />
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Primary scale</div>
              <div className="ds-card-body col padded">
                <div className="palette-grid">
                {[["3","#FAFAFF"],["5","#F4F5FF"],["10","#E8EAFD"],["20","#C1C7FB"],["30","#9BA5F8"],["40","#6F7CF2"],["50★","#4959E6"],["60","#3646D4"],["70","#2836B8"],["80","#1D268A"],["90","#131860"],["100","#0C0F38"]].map(([step,hex]) => (
                  <Swatch
                    key={step}
                    size="sm"
                    anchor={step === "50★"}
                    bg={`var(--primary-${step.replace("★","")})`}
                    title={step}
                    token={`--primary-${step.replace("★","")}`}
                    light={hex}
                  />
                ))}
                </div>
                <div className="ds-token-block">
                  <p>--primary-N · ★ anchor = --accent (#4959E6)</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">--primary-3 (#FAFAFF)</div>
                  <p>ultra-subtle tint used for card hover states (.quote-card, .book-card, .now-reading-card, .list-row, .list-table thead tr). One tier below --primary-5 so secondary tinted buttons inside (.delete-row-btn, .quote-book-chip-interactive at --primary-5) stay visible without blending into the hovered card.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Dark mode override</div>
                  <p>--primary-3, --primary-5 and --primary-10 resolve to <strong>solid colors</strong> in dark theme (not rgba). Computed over the dominant card baseline <code>var(--card)</code> #1E1E1E to preserve visual rendering: <code>--primary-3</code>=#222432 (card hover), <code>--primary-5</code>=#232536 (button bg), <code>--primary-10</code>=#272B4A (button hover stronger). Solid (vs rgba) so render is identical regardless of actual parent baseline — fixes the historical inconsistency where <code>.list-row</code> hover (parent <code>.books-list</code> on --card) looked different from <code>.now-reading-card</code> hover (no parent bg, mixed with --bg).</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Neutrals — Dark (tinted primary)</div>
              <div className="ds-card-body col padded">
                <div className="palette-grid on-white">
                {["70","80","100"].map(n => (
                  <Swatch
                    key={n}
                    size="sm"
                    bg={`var(--dark-${n})`}
                    title={n}
                    token={`--dark-${n}`}
                    light={n==="100"?"#0D0F1A":`${n}%`}
                  />
                ))}
                </div>
                <p>--dark-N · base #0D0F1A · only the steps actually used in the codebase</p>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Neutrals — Light (tinted primary)</div>
              <div className="ds-card-body col padded">
                <div className="palette-grid on-dark-bg">
                {["20","90"].map(n => (
                  <Swatch
                    key={n}
                    size="sm"
                    bg={`var(--light-${n})`}
                    title={n}
                    token={`--light-${n}`}
                    light={`${n}%`}
                  />
                ))}
                </div>
                <p>--light-N · base #F5F6FF · only the steps actually used in the codebase</p>
              </div>
            </div>
          </DSSection>

          {/* ── TYPOGRAPHY ── */}
          <DSSection id="typography" title="Typography" sub="Base : 14px — 1rem = 14px · 9-tier canonical scale (28/20/18/16/15/14/13/12/11/10)">
            <div className="ds-card">
              <div className="ds-card-head">Plus Jakarta Sans — 9-tier scale</div>
              <div className="ds-card-body col">
                {[
                  [20, "1.43rem", "800", "Hero onboarding", ".ob-title (exception, marketing only)"],
                  [18, "1.29rem", "700", "Empty state title", ".empty-title (off-grid, pairs with icon 96)"],
                  [16, "1.14rem", "500", "Content tier", "synopsis, quotes, cast names, ob-desc"],
                  [16, "1.14rem", "700", "Content tier featured", ".now-reading-title"],
                  [15, "1.07rem", "600", "Body / interactive", ".btn-md, inputs, card titles, dropdown items"],
                  [14, "1rem",    "500", "Metadata", ".book-meta, panel-meta, see-more, autocomplete sub"],
                  [13, "0.93rem", "500", "Hint / eyebrow / error", "form labels, dropzone-sub, chip-author"],
                  [12, "0.86rem", "500", "Compact secondary", ".btn-sm, captions, now-reading book-meta"],
                  [11, "0.79rem", "700", "Eyebrow uppercase 700", ".panel-section-eyebrow (tracking 0.08em)"],
                  [10, "0.71rem", "700", "Tiny badge", ".badge primary (notification dot)"],
                ].map(([px, rem, weight, label, detail]) => (
                  <div key={label + px + weight} className="type-sample">
                    <div className="type-sample-preview">
                      <div style={{ fontSize: px, fontWeight: weight, lineHeight: 1.2 }}>{label}</div>
                      {detail && <div className="ds-token-name">{detail}</div>}
                    </div>
                    <div className="type-sample-meta">{rem} · {px}px · {weight}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Fraunces — display + serif</div>
              <div className="ds-card-body col">
                {[
                  [48, "3.43rem", "500", "Heading display", ".h-display (reserved — landing hero)"],
                  [36, "2.57rem", "300", "Heading XL", ".h-xl (reserved — landing)"],
                  [28, "2rem",    "500", "Hero panel", ".panel-title"],
                  [24, "1.71rem", "500", "Heading LG", ".h-lg (reserved — landing)"],
                  [19, "1.36rem", "400", "Logo nav", ".logo-nav (reserved)"],
                  [14, "1rem",    "400", "Logo footer", ".logo-min (reserved — minimum size)"],
                ].map(([px, rem, weight, label, detail]) => (
                  <div key={label} className="type-sample">
                    <div className="type-sample-preview">
                      <div style={{ fontSize: px, fontWeight: weight, fontFamily: "var(--font-fraunces), serif", lineHeight: 1.2 }}>{label}</div>
                      {detail && <div className="ds-token-name">{detail}</div>}
                    </div>
                    <div className="type-sample-meta">{rem} · {px}px · {weight}</div>
                  </div>
                ))}
              </div>
            </div>
          </DSSection>

          {/* ── SPACING ── */}
          <DSSection id="spacing" title="Spacing" sub="4px base scale. Main values used across the interface.">
            <div className="ds-card">
              <div className="ds-card-head">Scale</div>
              <div className="ds-card-body col">
                {[
                  [2,"0.125rem","Micro gap (badge)"],
                  [4,"0.286rem","Tight gap"],
                  [6,"0.428rem","Small gap"],
                  [8,"0.571rem","Default gap interne"],
                  [12,"0.857rem","Gap composants"],
                  [16,"1.143rem","Padding cards, gap sections"],
                  [20,"1.428rem","Padding boutons LG"],
                  [24,"1.714rem","Padding modal, contenu"],
                  [32,"2.286rem","Margin sections"],
                  [40,"2.857rem","Padding pages"],
                  [48,"3.428rem","Espacement sections"],
                  [64,"4.571rem","Espacement majeur"],
                ].map(([px, rem, use]) => (
                  <div key={px} className="spacing-row">
                    <div className="spacing-block" style={{ width: px }} />
                    <span className="spacing-label">{px}px</span>
                    <span className="spacing-use">{rem} · {use}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Page rhythm — applied scale</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">.main-wrap · 48px</div>
                  <p>Top-level page blocks — separates page-title, search-row, content section.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.dictionary-wrap · 48px</div>
                  <p>Mirrors <code>.main-wrap</code> — between lookup form and saved section.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.books-section / .quotes-section / .dictionary-saved-section · 16px</div>
                  <p>Internal sub-header (eyebrow / result-line) → content list.</p>
                </div>
                <div className="ds-token-block">
                  <p>Two-tier rhythm : <strong>48px</strong> between major page blocks, <strong>16px</strong> inside a section. Keeps breathing at the top while densifying list content.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── CELL ROW ── */}
          <DSSection id="cell-row" title="Cell Row" sub="Reusable flex row primitive for any 'label + meta/icon' pattern with a fixed-min height. Pair with a size modifier and optionally --between for justify-content: space-between.">
            <div className="ds-card">
              <div className="ds-card-head">Sizes</div>
              <div className="ds-card-body col">
                {[
                  ["xs", 20, "Parity with .sidebar-badge — inline meta"],
                  ["sm", 24, "Compact rows — label + small icon"],
                  ["md", 32, "Parity with .btn-sm — touch-friendly desktop"],
                  ["lg", 40, "Parity with .btn-md / .modal-cancel — full touch target"],
                ].map(([mod, h, use]) => (
                  <div key={mod} className={`spacing-row`} style={{ alignItems: "stretch" }}>
                    <div className={`cell-row cell-row--${mod} cell-row--between`} style={{ width: 320, flexShrink: 0, paddingInline: 12, background: "var(--primary-3)", borderRadius: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>cell-row--{mod}</span>
                      <span style={{ fontSize: 12, color: "var(--text-2)", fontVariantNumeric: "tabular-nums" }}>{h}px</span>
                    </div>
                    <span className="type-sample-meta" style={{ alignSelf: "center" }}>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Modifiers</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">.cell-row · display: flex · align-items: center · gap: 8 · min-width: 0</div>
                  <p>Always pair with a size modifier.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">--xs / --sm / --md / --lg · min-height: 20 / 24 / 32 / 40</div>
                  <p>Use <code>min-height</code> (not fixed) so multi-line content can grow.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">--between · justify-content: space-between</div>
                  <p>For label-left / meta-right rows.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Applied — current usage</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">.overview-hero-label-row · --sm + --between</div>
                  <p>Overview tab → 3 hero cards (Books finished / Quotes / Words saved).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.modal-toggle-row · --lg</div>
                  <p>AddModal → Manual / Photo tab → "Mark as reading" checkbox.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.search-row · --lg + --between</div>
                  <p>Search bars across My Library / Wishlist / Quotes / Dictionary / Collections (5 callsites).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.sidebar-appearance-row · --lg</div>
                  <p>Sidebar bottom → Appearance label + theme toggle.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.overview-goal-progress-row · --md + --between</div>
                  <p>Overview → Reading goal card → "3 / 24 books · 13%" line (overrides align-items: baseline locally).</p>
                </div>
                <div className="ds-token-block">
                  <p>Local overrides (e.g. <code>.modal-toggle-row</code> keeps <code>gap: 10</code> for checkbox breathing room) are fine — primitive sets the stable axes (height, align, display), local class tunes nuances.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Not a cell-row candidate</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <p>Classes named <code>*-row</code> that don't fit the primitive (kept as-is) :</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.now-reading-row</div>
                  <p>Height dictated by the 60×90 cover, not a fixed-height label row.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.add-to-col-row</div>
                  <p>State modifier (background / selected / disabled) on top of <code>.quote-book-chip</code>, not a layout class.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── SHADOWS & RADIUS ── */}
          <DSSection id="shadows" title="Shadows & Radius">
            <div className="ds-card">
              <div className="ds-card-head">Shadows</div>
              <div className="ds-card-body col">
                {[
                  ["--shadow-md", "Cartes hover (drop primary-tinted)"],
                  ["--shadow-lg", "Modales, autocomplete, mobile sidebar"],
                ].map(([token, use]) => (
                  <div key={token} className="spacing-row" style={{ alignItems: "stretch" }}>
                    <div style={{ width: 120, height: 40, background: "var(--card)", borderRadius: 6, boxShadow: `var(${token})`, flexShrink: 0, alignSelf: "center" }} />
                    <span className="type-sample-meta" style={{ alignSelf: "center", marginLeft: 0 }}>{token} · {use}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Border Radius</div>
              <div className="ds-card-body col">
                {[
                  [6, "Buttons SM"],
                  [8, "Default — var(--radius)"],
                  [10, "Dropdown, dropzone"],
                  [12, "Camera scan viewfinder"],
                  [16, "Onboarding modal"],
                  [32, "Pill (search input)"],
                ].map(([r, use]) => (
                  <div key={r} className="spacing-row" style={{ alignItems: "stretch" }}>
                    <div className="spacing-block" style={{ width: 64, height: 40, borderRadius: r }} />
                    <span className="spacing-label" style={{ alignSelf: "center" }}>{r}px</span>
                    <span className="type-sample-meta" style={{ alignSelf: "center", marginLeft: 0 }}>{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </DSSection>

          {/* ── STROKES & BORDERS ── */}
          <DSSection id="strokes" title="Strokes & Borders" sub="Canonical rules for borders across components, cards, inputs and dividers.">

            <div className="ds-card">
              <div className="ds-card-head">Application rules</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">Component strokes · 1.5px solid var(--border-subtle)</div>
                  <p>Buttons, inputs, cards, containers — default frame stroke across the app.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Dividers · 1px solid var(--border-subtle)</div>
                  <p>Row separators, section lines — thinner than component strokes.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Spinner ring · 2px solid var(--border)</div>
                  <p>Single usage — <code>.panel-spinner</code> loading ring needs stronger contrast.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Dropzone · 2px dashed var(--border)</div>
                  <p>Single usage — <code>.import-dropzone</code> dashed border for import file/photo zones.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Visual samples</div>
              <div className="ds-card-body col">
                {[
                  { sample: { borderRadius: 6, background: "var(--card)", border: "1.5px solid var(--border-subtle)" }, label: "Component · 1.5px var(--border-subtle)" },
                  { sample: { borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "transparent" }, label: "Divider · 1px var(--border-subtle)" },
                  { sample: { borderRadius: 6, background: "var(--card)", border: "2px solid var(--border)" }, label: "Spinner ring · 2px solid var(--border)" },
                  { sample: { borderRadius: 6, background: "var(--card)", border: "2px dashed var(--border)" }, label: "Dropzone · 2px dashed var(--border)" },
                ].map(({ sample, label }, i) => (
                  <div key={i} className="spacing-row" style={{ alignItems: "stretch" }}>
                    <div style={{ width: 120, height: 40, flexShrink: 0, alignSelf: "center", ...sample }} />
                    <span className="type-sample-meta" style={{ alignSelf: "center", marginLeft: 0 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Notes</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">Stroke position — inside</div>
                  <p>All strokes are rendered <strong>inside</strong> the declared size (equivalent to Figma's "Inside" stroke). Enforced globally by Tailwind's <code>box-sizing: border-box</code> reset — the stroke eats into the content area without enlarging the element.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Light mode — why two tokens ?</div>
                  <p><code>--border-subtle</code> (#EFEFEF) keeps the component frames airy without feeling heavy on large surfaces like cards. <code>--border</code> (#E0E0E0) is reserved for affordances that need stronger contrast (dashed dropzones, spinner rings) where a subtle stroke would disappear.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Dark mode</div>
                  <p>Both tokens collapse to <code>#2E2E2E</code>. The light/dark distinction is intentional — dark backgrounds don't need two stroke strengths.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── AUTOCOMPLETE ── */}
          <DSSection id="autocomplete" title="Autocomplete" sub="Dropdown suggestions below the title field in the AddModal.">
            <div className="ds-card">
              <div className="ds-card-head">Preview</div>
              <div className="ds-card-body">
                <div className="autocomplete-preview">
                  {[["1984","George Orwell"],["Nineteen Eighty-Four","George Orwell"],["1984 (annotated)","Various"]].map(([title, author], i) => (
                    <div key={i} className={`ac-item${i===0?" focused":""}`}>
                      {title}<span>{author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">.autocomplete-preview · container</div>
                  <p>Width 280, border-radius var(--radius), border 1.5px var(--border-subtle), bg var(--card).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.ac-item · suggestion row</div>
                  <p>Padding 10/14, font 14/600/var(--text), border-bottom 1px var(--border) (none on last).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.ac-item:hover, .ac-item.focused · state</div>
                  <p>bg var(--primary-5), color var(--primary-60). Same treatment for hover and keyboard focus.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.ac-item span · sub-label (author)</div>
                  <p>Secondary info displayed inline — font 14/400/var(--text-2), margin-left 8.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Usage</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <p>Appears below the title field in <code>AddModal</code> when the user types — search-suggestions API returns matching books. Click selects the suggestion and pre-fills title + author.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── BADGES & PILLS ── */}
          <DSSection id="badges" title="Badges">
            <div className="ds-card">
              <div className="ds-card-head">Date badge · sizes</div>
              <div className="ds-card-body col">
                {[
                  ["xs", 20, "10/600 · padding 0 10 · inline meta dense"],
                  ["sm", 24, "12/600 · padding 0 12 · default — Started on, etc."],
                  ["md", 28, "13/600 · padding 0 14 · prominent callout"],
                ].map(([mod, h, use]) => (
                  <div key={mod} className="spacing-row" style={{ alignItems: "stretch" }}>
                    <span className={`now-reading-date now-reading-date--${mod}`} style={{ alignSelf: "center" }}>Started Apr 28</span>
                    <span className="spacing-label" style={{ alignSelf: "center" }}>--{mod}</span>
                    <span className="type-sample-meta" style={{ alignSelf: "center", marginLeft: 0 }}>{h}px · {use}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">.now-reading-date · primary pill (base)</div>
                  <p>Solid primary fill (--primary-50 light · --primary-40 dark) · white text · pill · weight 600. Default size = sm.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">--xs / --sm / --md · size modifiers</div>
                  <p>height 20 / 24 / 28 · font-size 10 / 12 / 13 · padding 0 10 / 0 12 / 0 14. min-width matches height for square baseline.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Usage</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <p>Currently used in <code>NowReadingSection</code> (started date) and <code>BookPanel</code> (started date in Now-Reading state). Default size (sm) works for inline meta — bump to <code>--md</code> for prominence.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── BOOK CHIP ── */}
          <DSSection id="book-chip" title="Book Chip" sub="Reusable book reference block — cover thumbnail + title + author. Four modes : display, interactive, with remove, with rating.">

            <div className="ds-card">
              <div className="ds-card-head">Modes</div>
              <div className="ds-card-body">
                {/* Display (no onClick, no onRemove) */}
                <div style={{ flex: "1 1 260px", minWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="panel-section-eyebrow">Display</span>
                  <div className="quote-book-chip">
                    <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #6F7CF2, #F67BF8)" }}><span>T</span></div>
                    <div className="quote-book-chip-body">
                      <div className="quote-book-chip-title">Tropique du Cancer</div>
                      <div className="quote-book-chip-author">Henry Miller</div>
                    </div>
                  </div>
                </div>

                {/* Interactive (with onClick → chevron) */}
                <div style={{ flex: "1 1 260px", minWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="panel-section-eyebrow">Interactive</span>
                  <button type="button" className="quote-book-chip quote-book-chip-interactive" style={{ width: "100%" }}>
                    <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #9EEB97, #4959E6)" }}><span>1</span></div>
                    <div className="quote-book-chip-body">
                      <div className="quote-book-chip-title">1984</div>
                      <div className="quote-book-chip-author">George Orwell</div>
                    </div>
                    <svg className="quote-book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>

                {/* With remove */}
                <div style={{ flex: "1 1 260px", minWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="panel-section-eyebrow">With remove</span>
                  <div className="quote-book-chip">
                    <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #FE7E4E, #FFCEE3)" }}><span>B</span></div>
                    <div className="quote-book-chip-body">
                      <div className="quote-book-chip-title">A Brief History of Time</div>
                      <div className="quote-book-chip-author">Stephen Hawking</div>
                    </div>
                    <button type="button" className="quote-book-chip-remove" aria-label="Remove">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* With rating (interactive) */}
                <div style={{ flex: "1 1 260px", minWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="panel-section-eyebrow">With rating</span>
                  <button type="button" className="quote-book-chip quote-book-chip-interactive" style={{ width: "100%" }}>
                    <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #4959E6, #00A699)" }}><span>D</span></div>
                    <div className="quote-book-chip-body">
                      <div className="quote-book-chip-name">
                        <div className="quote-book-chip-title">Dune</div>
                        <div className="quote-book-chip-author">Frank Herbert</div>
                      </div>
                      <div className="overview-stars" aria-label="Rating 5/5">
                        {[1,2,3,4,5].map(n => (
                          <svg key={n} viewBox="0 0 24 24" fill="currentColor" className="is-filled">
                            <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <svg className="quote-book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Context overrides</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">Base · QuotePanel, AddQuoteModal</div>
                  <p>Default bg <code>--bg3</code>, hover bg <code>--primary-5</code>. Neutral backgrounds where the chip sits on its own.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Inside .quote-card</div>
                  <p>Default bg <code>--primary-5</code>, hover bg <code>--primary-10</code>. Card itself tints primary on hover — chip needs stronger saturation to stay visible.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Props</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">book · {"{ title, author, id? }"}</div>
                  <p>Required. Cover is auto-fetched from Google Books via title/author.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">onClick · (e) =&gt; void</div>
                  <p>If provided: renders as <code>&lt;button&gt;</code> with chevron + hover. Use <code>e.stopPropagation()</code> inside parent-clickable contexts.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">onRemove · () =&gt; void</div>
                  <p>Shows an X button on the right. Mutually exclusive with <code>onClick</code>.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">ariaLabel · string</div>
                  <p>Label for the remove button.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">rating · number (1–5)</div>
                  <p>Renders 5 stars (<code>.overview-stars</code>, padding 4 0) below title/author when {'>'} 0. Title/author auto-wrapped in <code>.quote-book-chip-name</code> (gap 2). Body gap 4. Stars: 14×14, filled <code>--primary-50</code> / empty <code>--border</code>.</p>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Source</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <p>Component : <code>components/library/BookChip.js</code>. Cover 32×44, radius 4. Fallback : gradient from <code>coverColors(title)</code> + first letter.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── BUTTONS ── */}
          <DSSection id="buttons" title="Buttons" sub="Canonical .btn.btn-* system + named component classes (library.css). Font-weight 600 across all.">
            {/* States — 5 variants × 5 states */}
            {[
              { name:"Primary", variant:"btn-primary" },
              { name:"Secondary", variant:"btn-secondary" },
              { name:"Ghost", variant:"btn-ghost" },
              { name:"Outline", variant:"btn-outline" },
              { name:"Critical", variant:"btn-critical" },
            ].map(({ name, variant }) => (
              <div key={name} className="ds-card">
                <div className="ds-card-head">{name} · states</div>
                <div className="ds-card-body" style={{ gap: 32, alignItems: "center", flexWrap: "wrap" }}>
                  {[
                    ["Default",""],
                    ["Hover","is-hover"],
                    ["Active","is-active"],
                    ["Focus","is-focus"],
                    ["Disabled",""],
                  ].map(([state, mod]) => (
                    <div key={state} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                      <button className={`btn ${variant} btn-md${mod ? " "+mod : ""}`} disabled={state==="Disabled"}>
                        {name}
                      </button>
                      <span className="panel-section-eyebrow">{state}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="ds-card">
              <div className="ds-card-head">Canonical → Named class mapping</div>
              <div className="ds-card-body col">
                {[
                  ["Primary CTA", "btn-primary btn-md", [".add-btn", ".empty-cta", ".panel-quotes-add", ".panel-move-btn"]],
                  ["Outline (default)", "btn-outline btn-md", [".edit-btn", ".dropdown-btn", ".modal-cancel", ".panel-delete-btn", ".import-change-file", ".quote-photo-btn", ".col-delete-btn"]],
                  ["Destructive icon", "(no canonical)", [".delete-row-btn", ".dictionary-delete-btn"]],
                  ["Icon toggle", "btn-icon btn-md", [".view-btn", ".col-emoji-btn"]],
                  ["Text / ghost link", "btn-ghost", [".footer-link", ".quote-see-more"]],
                  ["Sidebar (on dark bg)", "(contextual)", [".sel-btn", ".sel-confirm", ".sel-cancel", ".sel-select-all"]],
                  ["AI action", "btn-ai btn-md", [".panel-cast-action (Generate state)"]],
                ].map(([role, canon, classes]) => (
                  <div key={role} className="ds-token-block">
                    <div className="ds-token-name">{role} · {canon}</div>
                    <p>{classes.map((c, i) => <span key={c}>{i > 0 ? " · " : ""}<code>{c}</code></span>)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Variantes — taille MD</div>
              <div className="ds-card-body" style={{ flexWrap: "wrap" }}>
                {[
                  ["btn-primary btn-md","Primary"],
                  ["btn-secondary btn-md","Secondary"],
                  ["btn-ghost btn-md","Ghost"],
                  ["btn-outline btn-md","Outline"],
                  ["btn-critical btn-md","Critical"],
                  ["btn-primary btn-md","Disabled"],
                ].map(([cls, label], i) => (
                  <button key={i} className={`btn ${cls}`} disabled={label==="Disabled"}>{label}</button>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Tailles — variante Primary</div>
              <div className="ds-card-body" style={{ alignItems: "center", flexWrap: "wrap" }}>
                {[["btn-xs","XS"],["btn-sm","SM"],["btn-md","MD"],["btn-lg","LG"],["btn-xl","XL"]].map(([sz,label]) => (
                  <button key={sz} className={`btn btn-primary ${sz}`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                {[
                  ["XS", "24", "8", "6", "11", "4", "24×24 · svg 12"],
                  ["SM", "32", "16", "7", "12", "6", "32×32 · svg 14"],
                  ["MD ★", "40", "20", "8", "14", "8", "40×40 · svg 18"],
                  ["LG", "48", "24", "8", "14", "8", "48×48 · svg 20"],
                  ["XL", "56", "28", "8", "15", "10", "—"],
                ].map(([sz, h, p, r, f, g, io]) => (
                  <div key={sz} className="ds-token-block">
                    <div className="ds-token-name">{sz} · {h}px</div>
                    <p>padding 0 {p}px · radius {r}px · font {f}px · gap {g}px · icon-only {io}</p>
                  </div>
                ))}
                <div className="ds-token-block">
                  <p>★ Default size used across the app. Outline buttons : stroke <code>1.5px</code> inside (box-sizing: border-box). Icon destructive (<code>.delete-row-btn</code>) uses fill <code>--primary-5</code> default, <code>--primary-10</code> hover.</p>
                </div>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Icon buttons — Solid & Icon</div>
              <div className="ds-card-body" style={{ alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                {[["btn-solid","btn-xs"],["btn-solid","btn-sm"],["btn-solid","btn-md"],["btn-solid","btn-lg"]].map(([v,sz]) => (
                  <button key={v+sz} className={`btn ${v} ${sz}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                ))}
                {[["btn-icon","btn-xs"],["btn-icon","btn-sm"],["btn-icon","btn-md"],["btn-icon","btn-lg"]].map(([v,sz]) => (
                  <button key={v+sz} className={`btn ${v} ${sz}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Icon + Text — toutes variantes, taille MD</div>
              <div className="ds-card-body" style={{ alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                {[
                  ["btn-primary",  "Add"],
                  ["btn-secondary","Edit"],
                  ["btn-ghost",    "Export"],
                  ["btn-outline",  "Filter"],
                  ["btn-critical", "Delete"],
                ].map(([variant, label]) => (
                  <button key={variant} className={`btn ${variant} btn-md`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Icon + Text — tailles, variante Primary</div>
              <div className="ds-card-body" style={{ alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                {[["btn-xs","XS"],["btn-sm","SM"],["btn-md","MD"],["btn-lg","LG"],["btn-xl","XL"]].map(([sz, label]) => (
                  <button key={sz} className={`btn btn-primary ${sz}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Asymmetric padding (icon + text)</div>
              <div className="ds-card-body" style={{ alignItems: "center", gap: 12 }}>
                <button className="btn btn-outline btn-md"><span>Text only</span></button>
                <button className="btn btn-outline btn-md">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Icon left</span>
                </button>
                <button className="btn btn-outline btn-md">
                  <span>Icon right</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">Text only · 0 20 (md) / 0 16 (sm)</div>
                  <p>Symmetrical baseline.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Icon left + text · 0 20 0 12 (md) / 0 16 0 12 (sm)</div>
                  <p>Icon eats visual space — drop padding-left to balance.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Text + icon right · 0 12 0 20 (md) / 0 12 0 16 (sm)</div>
                  <p>Same logic, mirrored.</p>
                </div>
                <div className="ds-token-block">
                  <p>Auto-detected via <code>:has()</code> on <code>.btn-md</code> / <code>.btn-sm</code> — no extra class needed. Rule applies when the SVG is the first or last child but not both (so icon-only buttons keep symmetric padding via <code>.btn-icon</code> / <code>.btn-solid</code>).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Convention</div>
                  <p>Always wrap label text in a <code>&lt;span&gt;</code>. CSS <code>:first-child</code> / <code>:last-child</code> only count element children — a bare text node next to an SVG would make the SVG both first AND last child, breaking the detection.</p>
                </div>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">AI action — gradient border + tinted fill</div>
              <div className="ds-card-body" style={{ alignItems: "center", gap: 12 }}>
                {[["btn-sm","SM"],["btn-md","MD"],["btn-lg","LG"]].map(([sz, label]) => (
                  <button key={sz} className={`btn btn-ai ${sz}`} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`aiGradDS-${sz}`} x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#F67BF8"/>
                          <stop offset="0.62" stopColor="#4959E6"/>
                        </linearGradient>
                      </defs>
                      <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill={`url(#aiGradDS-${sz})`}/>
                    </svg>
                    Generate {label}
                  </button>
                ))}
              </div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">Border</div>
                  <p><code>linear-gradient(to right, #F67BF8, #4959E6)</code> via <code>border-box</code>, 1.5px stroke.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Background</div>
                  <p>Same gradient stops at <code>0.05</code> opacity default, <code>0.1</code> on hover, via <code>padding-box</code> (over an opaque <code>var(--bg)</code> layer that masks the solid gradient inside the ring).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Padding</div>
                  <p><code>0 20px 0 12px</code> (asymmetric — mirrors <code>.panel-quotes-add</code> ; 12px left for the leading sparkle icon).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Icon · sizes · usage</div>
                  <p>Pair with <code>.import-tab-ai-icon</code> 16×16 sparkle SVG. Sizes : SM / MD (default) / LG. Reserved for AI-generated actions. First app usage : <code>.panel-cast-action</code> in BookPanel (Now Reading) — the "Generate cast" / "Regenerate" call to the Gemini cast endpoint.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── CHECKBOX ── */}
          <DSSection id="checkbox" title="Checkbox" sub="Canonical checkbox 18×18, used inside row contexts (modal toggle, list selection).">
            <div className="ds-card">
              <div className="ds-card-head">States</div>
              <div className="ds-card-body" style={{ gap: 32, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                  <div className="checkbox-demo" onClick={() => setChk1(v => !v)}>{chk1 && <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg>}</div>
                  <span className="panel-section-eyebrow">Unchecked</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                  <div className={`checkbox-demo${chk2?" checked":""}`} onClick={() => setChk2(v => !v)}>{chk2 && <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg>}</div>
                  <span className="panel-section-eyebrow">Checked</span>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Modal toggle row — canonical 40h container</div>
              <div className="ds-card-body col">
                {[
                  ["Container class", ".modal-toggle-row"],
                  ["min-height", "40px (md, mirrors btn-md / input)"],
                  ["gap", "10px"],
                  ["check (18×18) default", "border --border-subtle, bg transparent (light) · border --light-20 (dark)"],
                  ["check hover", "border --primary-50 + bg --primary-5 (light) · border --primary-40 + bg --primary-5 (dark)"],
                  ["check checked", "bg --primary-50, border transparent (light) · bg --primary-40 (dark)"],
                  ["check checked hover", "bg --primary-60 (light) · bg --primary-50 (dark) — mirrors .btn-primary"],
                  ["label (.modal-toggle-label)", "15/500/--text (interactive tier — pairs with btn-md / inputs)"],
                  ["First app usage", ".modal-toggle-row in AddModal (Mark as reading)"],
                ].map(([prop, val]) => (
                  <div key={prop} className="ds-token-block">
                    <div className="ds-token-name">{prop}</div>
                    <p>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Message box — 4 variants (info / alert / success / critical)</div>
              <div className="ds-card-body col padded" style={{ gap: 16 }}>
                <div className="modal-info-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <span><span className="modal-info-box-strong">Info</span> — neutral hint or contextual note. Default variant.</span>
                </div>
                <div className="modal-info-box modal-info-box--alert" role="alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span><strong>Alert</strong> — warning, soft amber. Limit reached, action paused, etc.</span>
                </div>
                <div className="modal-info-box modal-info-box--success" role="status">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span><strong>Success</strong> — confirmation, soft green. Saved, completed, action OK.</span>
                </div>
                <div className="scan-alert" role="alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span><strong>Critical</strong> — destructive error, red. Scan failure, irrecoverable issue.</span>
                </div>
              </div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">Info · .modal-info-box</div>
                  <p>bg <code>--primary-5</code> · border <code>rgba(73,89,230, 0.2)</code> · icon <code>--primary-50 / 40</code></p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Alert · .modal-info-box.modal-info-box--alert</div>
                  <p>bg <code>rgba(245,158,11, 0.08/0.12)</code> · border <code>rgba(245,158,11, 0.2)</code> · icon <code>#B45309 / #FBBF24</code></p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Success · .modal-info-box.modal-info-box--success</div>
                  <p>bg <code>rgba(34,197,94, 0.08/0.12)</code> · border <code>rgba(34,197,94, 0.2)</code> · icon <code>#16A34A / #4ADE80</code></p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Critical · .scan-alert</div>
                  <p>bg <code>rgba(239,68,68, 0.08/0.12)</code> · border <code>rgba(239,68,68, 0.2)</code> · icon <code>#dc2626 / #f87171</code></p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Common structure</div>
                  <p><code>display: flex</code> · <code>align-items: flex-start</code> (info) / <code>center</code> (alert/critical) · gap 16 · padding 8/16 · border-radius 8 · font 14/500/--text/lh 1.5. Icon SVG 16×16, <code>flex-shrink: 0</code>. Wrap text in <code>&lt;span&gt;</code> ; <code>\n</code> + <code>white-space: pre-line</code> for multi-line (alert/critical). Use <code>.modal-photo-block</code> wrapper (gap 16) to group a dropzone + a critical message.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── DROPDOWN ── */}
          <DSSection id="dropdown" title="Dropdown Menu" sub="Outline trigger + rotating chevron · Spring-animated menu · Full dark mode">
            <div className="ds-card">
              <div className="ds-card-head">Examples</div>
              <div className="ds-card-body" style={{ alignItems: "flex-start", gap: 32 }}>
                <DropdownDemo label="Export" items={["json", "pdf"]} />
                <DropdownDemo label="Options" items={["renommer", "dupliquer", "supprimer"]} />
                <DropdownDemo label="Trier par" items={["titre", "auteur", "année"]} />
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">.dropdown-wrap · container</div>
                  <p><code>position: relative</code>. Wraps the trigger button + the absolute menu.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">button.btn.btn-outline · trigger</div>
                  <p>Standard outline button with chevron SVG rotating on open.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.dropdown-menu · panel</div>
                  <p><code>position: absolute</code> · top: 100% + 6 · right: 0 · animation <code>dropdownIn</code> (spring).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">.dropdown-item · row</div>
                  <p>flex row · gap 8 · padding 8/12 · border-radius 7px.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── EXPORT MENU ── */}
          <DSSection id="export-menu" title="Export Menu" sub="Dropdown specialized for exports — PDF, Markdown, JSON. Used in Library, Quotes, Dictionary.">
            <div className="ds-card">
              <div className="ds-card-head">Preview</div>
              <div className="ds-card-body">
                <DropdownDemo label="Export" items={["pdf", "md", "json"]} />
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Props</div>
              <div className="ds-card-body col">
                <div className="ds-token-block">
                  <div className="ds-token-name">exportPDF · () =&gt; void</div>
                  <p>Shows <code>pdf</code> item. Omit to hide.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">exportMD · () =&gt; void</div>
                  <p>Shows <code>md</code> item. Omit to hide.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">exportData · () =&gt; void</div>
                  <p>Shows <code>json</code> item (raw data). Omit to hide.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">disabled · boolean</div>
                  <p>Disables the trigger button (list empty cases).</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">t · i18n object</div>
                  <p>Reads <code>t.btnExport</code> for the trigger label.</p>
                </div>
                <div className="ds-token-block">
                  <div className="ds-token-name">Source</div>
                  <p>Component : <code>components/library/ExportMenu.js</code>. Trigger class : <code>.dropdown-btn</code>. Menu reuses the generic <code>.dropdown-menu</code>.</p>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── INPUTS ── */}
          <DSSection id="inputs" title="Inputs" sub="5 variants — all 40px height, font-size 15px, weight 600. Hover/focus share the same primary tint + ring.">

            <div className="ds-card">
              <div className="ds-card-head">Variants overview</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head">
                    <tr><th>Class</th><th>Used in</th><th>Padding</th><th>Radius</th><th>Default bg</th><th>Default border</th></tr>
                  </thead>
                  <tbody className="table-body">
                    {[
                      [".search-input", "Search bars (Library, Quotes, Dictionary)", "0 34 0 38", "32", "#FFFFFF", "1.5px --border-subtle"],
                      [".modal-field input", "Add/edit book modal", "0 14", "8", "--bg3", "1.5px transparent"],
                      [".modal-field-input", "Add quote modal", "0 14", "8", "--bg3", "1.5px transparent"],
                      [".quote-textarea", "Add quote modal (multi-line)", "12 14", "8", "--bg3", "1.5px transparent"],
                      [".col-name-input", "Create collection modal", "0 12", "8", "--bg", "1.5px --border-subtle"],
                    ].map(([cls, where, pad, r, bg, bd]) => (
                      <tr className="table-row" key={cls}>
                        <td className="token-table-component mono">{cls}</td>
                        <td className="meta">{where}</td>
                        <td className="mono">{pad}</td>
                        <td className="mono">{r}</td>
                        <td className="mono">{bg}</td>
                        <td className="mono">{bd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Search input — pill radius, visible default border</div>
              <div className="ds-card-body">
                <div className="ds-state-sample">
                  <span className="panel-section-eyebrow">Default</span>
                  <div className="search-box-demo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input placeholder="Title, author…" readOnly />
                  </div>
                </div>
                <div className="ds-state-sample">
                  <span className="panel-section-eyebrow">Focus</span>
                  <div className="search-box-demo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input placeholder="Title, author…" style={{ borderColor: "var(--primary-50)", boxShadow: "0 0 0 3px var(--primary-20)" }} readOnly />
                  </div>
                </div>
              </div>
              <div className="ds-tokens">
                {["--border-subtle","--primary-50","--primary-20","--primary-5"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Text field — bg3 variant, transparent border default</div>
              <div className="ds-card-body">
                <div className="field-demo">
                  <label>Title · Default</label>
                  <input placeholder="e.g. 1984" readOnly />
                </div>
                <div className="field-demo">
                  <label>Author · Focus</label>
                  <input placeholder="e.g. George Orwell" style={{ borderColor: "var(--primary-50)", boxShadow: "0 0 0 3px var(--primary-20)" }} readOnly />
                </div>
              </div>
              <div className="ds-tokens">
                {["--bg3","--primary-50","--primary-5","--primary-20"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Common state rules</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head">
                    <tr><th>State</th><th>Border</th><th>Background</th><th>Ring</th></tr>
                  </thead>
                  <tbody className="table-body">
                    <tr className="table-row">
                      <td className="token-table-component">Default</td>
                      <td className="mono">1.5px --border-subtle (or transparent for bg3 variants)</td>
                      <td className="mono">--bg3 / #FFFFFF / --bg</td>
                      <td className="is-empty">—</td>
                    </tr>
                    <tr className="table-row">
                      <td className="token-table-component">Hover</td>
                      <td className="mono">1.5px --primary-50</td>
                      <td className="mono">--primary-5</td>
                      <td className="is-empty">—</td>
                    </tr>
                    <tr className="table-row">
                      <td className="token-table-component">Focus</td>
                      <td className="mono">1.5px --primary-50</td>
                      <td className="mono">--primary-5</td>
                      <td className="mono">0 0 0 3px --primary-20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ds-card-foot">
                Dark mode: swap <code>--primary-50</code> → <code>--primary-40</code>, <code>--primary-5</code> → <code>rgba(73,89,230,0.10)</code>, ring → <code>rgba(73,89,230,0.2)</code>.
              </div>
            </div>
          </DSSection>

          {/* ── LANG SWITCHER ── */}
          <DSSection id="lang-switcher" title="Language Switcher">
            <div className="ds-card">
              <div className="ds-card-head">FR / EN</div>
              <div className="ds-card-body">
                <div className="lang-toggle-ds">
                  {["FR","EN"].map((l, i) => (
                    <span key={l} style={{ display: "contents" }}>
                      {i > 0 && <span className="lang-sep-ds">/</span>}
                      <button className={`lang-btn-ds${langActive===l?" active":""}`} onClick={() => setLangActive(l)}>{l}</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── SORT MENU ── */}
          <DSSection id="sort-menu" title="Sort Menu" sub="Generic sort dropdown — current selection shown inline, options passed as array. Used in Quotes and Dictionary lists.">
            <div className="ds-card">
              <div className="ds-card-head">Preview</div>
              <div className="ds-card-body">
                <DropdownDemo label="Recent" items={["Recent", "A–Z"]} />
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Props</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Prop</th><th>Type</th><th>Effect</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component mono">current</td><td className="mono">string</td><td className="meta">Key of the active option. Trigger label reflects its label.</td></tr>
                    <tr className="table-row"><td className="token-table-component mono">onChange</td><td className="mono">(key) =&gt; void</td><td className="meta">Fires with the selected option key.</td></tr>
                    <tr className="table-row"><td className="token-table-component mono">options</td><td className="mono">{"{ key, label }[]"}</td><td className="meta">Options list. Selected one gets a checkmark icon.</td></tr>
                    <tr className="table-row"><td className="token-table-component mono">ariaLabel</td><td className="mono">string</td><td className="meta">Accessibility label for the trigger button.</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="ds-card-foot">
                Source: <code>components/library/SortMenu.js</code>. Trigger class: <code>.dropdown-btn.sort-menu-btn</code> (shares the outline button anatomy).
              </div>
            </div>
          </DSSection>

          {/* ── THEME TOGGLE ── */}
          <DSSection id="theme-toggle" title="Theme Toggle" sub="Light/dark toggle. Same button as in this page's header.">
            <div className="ds-card">
              <div className="ds-card-head">Toggle</div>
              <div className="ds-card-body">
                <button className="theme-btn-ds" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} title="Theme">
                  <span className="toggle-thumb-ds">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  </span>
                </button>
              </div>
            </div>
          </DSSection>

          {/* ── VIEW TOGGLE ── */}
          <DSSection id="view-toggle" title="View Toggle" sub="Grid / List. Active: primary-50 bg, white icon.">
            <div className="ds-card">
              <div className="ds-card-head">Toggle</div>
              <div className="ds-card-body">
                <div className="view-btns-ds">
                  <button className={`view-btn-ds${viewActive==="grid"?" active":""}`} onClick={() => setViewActive("grid")}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                  </button>
                  <button className={`view-btn-ds${viewActive==="list"?" active":""}`} onClick={() => setViewActive("list")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── BOOK CARD ── */}
          <DSSection id="card" title="Book Card" sub="--card bg, 1.5px --border-subtle. Hover: border primary-50, bg --primary-3, transform translateY -2 + shadow. Placeholder cover: gradient (coverColors hash) + Jakarta letter (white-85, 3.5rem/800) — same pattern across BookCard, BookPanel, NowReadingCard, BookChip.">
            <div className="ds-card">
              <div className="ds-card-head">Grid view</div>
              <div className="ds-card-body">
                <div className="ds-state-sample">
                  <span className="panel-section-eyebrow">Default</span>
                  <div className="book-card-ds book-card-ds--static">
                    <div className="book-cover-ds" style={{ background: "var(--primary-5)" }} />
                    <div className="book-body-ds">
                      <div className="book-title-ds">A Brief History of Time</div>
                      <div className="book-author-ds">Stephen Hawking</div>
                      <div className="book-meta-ds">
                        <span>Science</span>
                        <span className="book-meta-sep-ds" aria-hidden="true">·</span>
                        <span>1988</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ds-state-sample">
                  <span className="panel-section-eyebrow">Hover</span>
                  <div className="book-card-ds book-card-ds--static" style={{ borderColor: "var(--primary-50)", background: "var(--primary-3)", boxShadow: "var(--shadow-md)" }}>
                    <div className="book-cover-ds" style={{ background: "var(--primary-5)" }} />
                    <div className="book-body-ds">
                      <div className="book-title-ds">A Brief History of Time</div>
                      <div className="book-author-ds">Stephen Hawking</div>
                      <div className="book-meta-ds">
                        <span>Science</span>
                        <span className="book-meta-sep-ds" aria-hidden="true">·</span>
                        <span>1988</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ds-tokens">
                {["--card","--primary-3","--primary-50","--shadow-md"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>
          </DSSection>

          {/* ── QUOTE CARD ── */}
          <DSSection id="quote-card" title="Quote Card" sub="Card for a single quote. Padding 20px. Body in flex-row (text + delete), divider, BookChip below. Whole card is role='button' → opens QuotePanel; BookChip is nested button → opens BookPanel (stopPropagation).">

            <div className="ds-card">
              <div className="ds-card-head">Preview</div>
              <div className="ds-card-body">
                <div className="quote-card" style={{ maxWidth: 520, cursor: "default" }}>
                  <div className="quote-card-body">
                    <div className="quote-card-text-wrap">
                      <div className="quote-card-text">
                        <span className="quote-mark">"</span>
                        Qui suis-je ? Qu'est-ce que je fais là ? Il y a quelque chose qui ressemble à la vérité, jusqu'au fond du lac glacé, avec une note d'indigo.
                        <span className="quote-mark">"</span>
                      </div>
                    </div>
                    <button type="button" className="delete-row-btn quote-card-delete" aria-label="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 3h4"/><line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M5 6l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"/>
                      </svg>
                    </button>
                  </div>
                  <div className="quote-card-divider" />
                  <button type="button" className="quote-book-chip quote-book-chip-interactive" style={{ width: "100%" }}>
                    <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #6F7CF2, #F67BF8)" }}><span>T</span></div>
                    <div className="quote-book-chip-body">
                      <div className="quote-book-chip-title">Tropique du Cancer</div>
                      <div className="quote-book-chip-author">Henry Miller</div>
                    </div>
                    <svg className="quote-book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Element</th><th>Role</th><th>Key styles</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.quote-card</code></td><td className="meta">Outer clickable container</td><td className="mono">padding 20, gap 20, role=button, hover: lift + border-primary-50 + shadow</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-card-body</code></td><td className="meta">Text + delete row</td><td className="mono">flex-row, gap 20, align-items: flex-start</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-card-text-wrap</code></td><td className="meta">Text column</td><td className="mono">flex: 1, min-width: 0, flex-col, gap 12</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-card-text</code></td><td className="meta">The quote</td><td className="mono">font 16 / lh 1.7 · -webkit-line-clamp 3</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-see-more</code></td><td className="meta">Expand toggle (conditional)</td><td className="mono">Detected via hidden clone measurement (avoids scrollHeight clamp quirks)</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-card-delete</code></td><td className="meta">Destructive icon</td><td className="mono">40×40, flex-shrink: 0, --primary-5/--primary-10</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-card-divider</code></td><td className="meta">Separator</td><td className="mono">1px, --border-subtle</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>&lt;BookChip&gt;</code></td><td className="meta">Book reference</td><td className="mono">Override bg --primary-5 / --primary-10 when inside .quote-card</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DSSection>

          {/* ── DICTIONARY CARD ── */}
          <DSSection id="dictionary-card" title="Dictionary Card" sub="Saved word — collapsible. Head is the only clickable surface (hover bg primary-5). Body expanded shows definitions on neutral bg (readable). Card-level lift + border on any hover.">

            <div className="ds-card">
              <div className="ds-card-head">Collapsed</div>
              <div className="ds-card-body">
                <div className="dictionary-saved-card" style={{ maxWidth: 520, width: "100%" }}>
                  <div className="dictionary-saved-head" role="button" tabIndex={0}>
                    <span className="dictionary-saved-toggle">
                      <svg className="dictionary-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                      <span className="dictionary-saved-word">Voiture</span>
                    </span>
                    <button type="button" className="dictionary-delete-btn" aria-label="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 3h4"/><line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M5 6l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Expanded — body has neutral bg so hover on head doesn't bleed into reading zone</div>
              <div className="ds-card-body">
                <div className="dictionary-saved-card expanded" style={{ maxWidth: 520, width: "100%" }}>
                  <div className="dictionary-saved-head" role="button" tabIndex={0} aria-expanded="true">
                    <span className="dictionary-saved-toggle">
                      <svg className="dictionary-chevron open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                      <span className="dictionary-saved-word">Voiture</span>
                    </span>
                    <button type="button" className="dictionary-delete-btn" aria-label="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 3h4"/><line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M5 6l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13"/>
                      </svg>
                    </button>
                  </div>
                  <div className="dictionary-saved-body">
                    <div className="dictionary-definition">
                      <span className="dictionary-pos">nom féminin</span>
                      <p className="dictionary-meaning">Véhicule à roues mû par un moteur, destiné au transport de personnes ou de marchandises.</p>
                      <div className="dictionary-example">
                        <span className="dictionary-example-label">Exemple</span>
                        <p className="dictionary-example-text">Ils ont acheté une nouvelle voiture électrique le mois dernier.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Dictionary Result — lookup output (primary-tinted card)</div>
              <div className="ds-card-body">
                <div className="dictionary-result" style={{ maxWidth: 520, width: "100%" }}>
                  <div className="dictionary-result-head">
                    <div className="dictionary-word">Voiture</div>
                    <button type="button" className="edit-btn dictionary-save-toggle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Save
                    </button>
                  </div>
                  <div className="dictionary-definitions">
                    <div className="dictionary-definition">
                      <span className="dictionary-pos">nom féminin</span>
                      <p className="dictionary-meaning">Véhicule à roues mû par un moteur.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Hover rules</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Hover target</th><th>Card effect</th><th>Head bg</th><th>Body bg</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row">
                      <td className="token-table-component">Card (any zone)</td>
                      <td className="mono">lift -2px · border --primary-50 · shadow</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                    </tr>
                    <tr className="table-row">
                      <td className="token-table-component">Head specifically</td>
                      <td className="mono">(inherited from card hover)</td>
                      <td><span className="ds-token-chip">--primary-5</span></td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                    </tr>
                    <tr className="table-row">
                      <td className="token-table-component">Body (expanded)</td>
                      <td className="mono">(inherited from card hover)</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                      <td style={{ color: "var(--text-3)" }}>— (stays on --bg2)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ds-card-foot">
                Why body stays neutral : blue tint on content-rich zones hurts readability. The head — the only clickable affordance — carries the explicit hover bg.
              </div>
            </div>
          </DSSection>

          {/* ── LIST VIEW ── */}
          <DSSection id="list" title="List View">
            <div className="ds-card">
              <div className="ds-card-head">Tableau</div>
              <div className="ds-card-body">
                <div className="list-demo">
                  <table>
                    <thead className="table-head">
                      <tr>
                        {["Title","Author","Year","Genre"].map(h => <th key={h}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {[["A Brief History of Time","Stephen Hawking","1988","Science"],["1984","George Orwell","1949","Fiction"]].map(([t,a,y,g]) => (
                        <tr className="table-row" key={t}>
                          <td className="list-title-cell">{t}</td>
                          <td className="list-author-cell">{a}</td>
                          <td className="list-year-cell">{y}</td>
                          <td className="list-author-cell">{g}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── SIDEBAR ── */}
          <DSSection id="sidebar" title="Sidebar" sub="Navigation latérale fixe. Expanded 260px · Collapsed 60px. Persisté en localStorage.">
            <div className="ds-card">
              <div className="ds-card-head">Preview — Expanded 260 · Collapsed 60 (height capped to 500 for the sample)</div>
              <div className="ds-card-body" style={{ gap: 24, alignItems: 'flex-start' }}>
                {/* Expanded — uses real .sidebar classes, with position/height overridden for the preview */}
                <aside className="sidebar" style={{ position: 'static', height: 500 }}>
                  <div className="sidebar-logo">
                    <span className="logo">readr</span>
                    <button className="sidebar-logo-collapse sidebar-logo-collapse--arrow" aria-label="Collapse">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                  </div>
                  <nav className="sidebar-nav">
                    <div className="sidebar-section sidebar-section--lone">
                      <button className="sidebar-item active">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg></span>
                        <span className="sidebar-label">Overview</span>
                      </button>
                    </div>
                    <div className="sidebar-section">
                      <div className="sidebar-section-head sidebar-section-head--no-action">
                        <span className="sidebar-section-label">Shelves</span>
                      </div>
                      <button className="sidebar-item">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>
                        <span className="sidebar-label">Library</span>
                        <span className="sidebar-badge">20</span>
                      </button>
                      <button className="sidebar-item">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
                        <span className="sidebar-label">Wishlist</span>
                        <span className="sidebar-badge">1</span>
                      </button>
                    </div>
                    <div className="sidebar-section">
                      <div className="sidebar-section-head sidebar-section-head--no-action">
                        <span className="sidebar-section-label">Notes</span>
                      </div>
                      <button className="sidebar-item">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg></span>
                        <span className="sidebar-label">Quotes</span>
                        <span className="sidebar-badge">4</span>
                      </button>
                      <button className="sidebar-item">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a4 4 0 0 1 4 4v12"/><path d="M4 4v14a2 2 0 0 0 2 2h13"/><line x1="8" y1="9" x2="14" y2="9"/><line x1="8" y1="13" x2="12" y2="13"/></svg></span>
                        <span className="sidebar-label">Dictionary</span>
                        <span className="sidebar-badge">12</span>
                      </button>
                    </div>
                  </nav>
                  <div className="sidebar-bottom">
                    <div className="cell-row cell-row--lg sidebar-appearance-row">
                      <span className="sidebar-appearance-label">Appearance</span>
                      <button type="button" className="theme-btn" aria-label="Toggle theme">
                        <span className="toggle-thumb">
                          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </aside>
                {/* Collapsed — same .sidebar with .collapsed modifier */}
                <aside className="sidebar collapsed" style={{ position: 'static', height: 500 }}>
                  <div className="sidebar-logo">
                    <button className="sidebar-logo-collapse" aria-label="Expand">
                      <span className="sidebar-logo-mark">r</span>
                    </button>
                  </div>
                  <nav className="sidebar-nav">
                    <div className="sidebar-section sidebar-section--lone">
                      <button className="sidebar-item active" aria-label="Overview">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg></span>
                      </button>
                    </div>
                    <div className="sidebar-section">
                      <button className="sidebar-item" aria-label="Library">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>
                      </button>
                      <button className="sidebar-item" aria-label="Wishlist">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
                      </button>
                    </div>
                    <div className="sidebar-section">
                      <button className="sidebar-item" aria-label="Quotes">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg></span>
                      </button>
                      <button className="sidebar-item" aria-label="Dictionary">
                        <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a4 4 0 0 1 4 4v12"/><path d="M4 4v14a2 2 0 0 0 2 2h13"/><line x1="8" y1="9" x2="14" y2="9"/><line x1="8" y1="13" x2="12" y2="13"/></svg></span>
                      </button>
                    </div>
                  </nav>
                </aside>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Nav items — états</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>État</th><th>Background</th><th>Couleur</th><th>Badge bg</th><th>Badge color</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component">Default</td><td className="mono">transparent</td><td className="mono">--text-2</td><td className="mono">--primary-10</td><td className="mono">--primary-50</td></tr>
                    <tr className="table-row"><td className="token-table-component">Hover</td><td className="mono">--primary-5</td><td className="mono">--text</td><td className="is-empty">—</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component">Active</td><td className="mono">--primary-10</td><td className="mono">--primary</td><td className="mono">--primary-50</td><td className="mono">#fff</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Tokens & comportement</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Propriété</th><th>Valeur</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component">Expanded width</td><td className="mono">260px</td></tr>
                    <tr className="table-row"><td className="token-table-component">Collapsed width</td><td className="mono">60px</td></tr>
                    <tr className="table-row"><td className="token-table-component">Page shell padding</td><td className="meta">260px → 60px (collapsed)</td></tr>
                    <tr className="table-row"><td className="token-table-component">Persistance</td><td className="meta"><code>readr-sidebar-collapsed</code> (localStorage)</td></tr>
                    <tr className="table-row"><td className="token-table-component">Mobile</td><td className="meta">Overlay fixe, ouverture via hamburger</td></tr>
                    <tr className="table-row"><td className="token-table-component">Sections</td><td className="meta">Overview · Shelves (Library + Wishlist) · Notes (Quotes + Dictionary) · Collections</td></tr>
                    <tr className="table-row"><td className="token-table-component">Badge canon</td><td className="meta"><code>.sidebar-badge</code> — bg <code>--primary-10</code>, color <code>--primary-50</code>. Active item: bg <code>--primary-50</code>, color <code>#fff</code>.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DSSection>

          {/* ── PANEL ── */}
          <DSSection id="panel" title="Side Panel" sub="Full-height drawer fixed right, width 540px. Gap-driven rhythm (no margins): 40 .panel-inner / 60 .panel-main cover↔info / 40 .panel-info header↔finished / 24 .panel-info-header title+byline+actions / 12 .panel-header-actions / 8 .panel-byline / 40 .panel-quotes content↔add / 16 .panel-quotes-content / 16 .panel-section / 12 .panel-actions. Close button is absolute (top 16, right 16). Share lives inside .panel-header-actions next to the primary CTA. Finished section uses .panel-section.is-finished (gap 24 between content and actions) — visual separation handled by sibling .panel-divider, not by borders. Edit/Remove use .panel-finished-btn (40 height, 15/600, ghost outline).">
            <div className="ds-card">
              <div className="ds-card-head">Layout</div>
              <div className="ds-card-body">
                <div className="panel-ds-viewport">
                  <div className="panel-ds-content">
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                  </div>
                  <div className="panel-ds-panel" style={{ padding: "32px 20px", display: "flex", flexDirection: "column", gap: 32, position: "relative" }}>
                    <button className="panel-close" style={{ top: 12, right: 12 }} aria-label="Close">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                    <div className="panel-main">
                      <div className="panel-cover-wrap panel-cover-empty" />
                      <div className="panel-info">
                        <div className="panel-info-header">
                          <div className="panel-title">A Brief History of Time</div>
                          <div className="panel-byline">
                            <div className="panel-author">Stephen Hawking</div>
                            <div className="panel-meta">
                              <span>Science</span>
                              <span className="panel-meta-sep" aria-hidden="true">·</span>
                              <span>1988</span>
                            </div>
                          </div>
                          <div className="panel-header-actions">
                            <button className="panel-move-btn">Start reading</button>
                            <button className="btn btn-outline btn-md panel-header-share" aria-label="Share">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/>
                                <polyline points="16 6 12 2 8 6"/>
                                <line x1="12" y1="2" x2="12" y2="15"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel-divider" />
                    <div className="panel-section">
                      <span className="panel-section-eyebrow">About</span>
                      <div className="panel-synopsis">A landmark volume in science writing by one of the great minds of our time...</div>
                    </div>
                    <div className="panel-divider" />
                    <div className="panel-quotes">
                      <div className="panel-quotes-content">
                        <span className="panel-section-eyebrow">Quotes</span>
                        <button type="button" className="panel-quote-item">
                          <p className="panel-quote-text">"We are just an advanced breed of monkeys on a minor planet of a very average star."</p>
                          <span className="panel-quote-page">p. 42</span>
                        </button>
                      </div>
                      <button className="panel-quotes-add">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add a quote
                      </button>
                    </div>
                    <div className="panel-divider" />
                    <div className="panel-actions">
                      <button className="panel-delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Anatomy (BookPanel)</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Wrapper</th><th>Role</th><th>Gap</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.panel-inner</code></td><td className="meta">Outer container. Padding 96 / 32 / 72. Hosts close (absolute top 16 right 16)</td><td className="mono">40px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-main</code></td><td className="meta">Cover + info block</td><td className="mono">60px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-cover-wrap</code></td><td className="meta">Cover (50% width, ratio 2/3, border-radius 8 + overflow hidden). align-self: center</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-info</code></td><td className="meta">Header + finished section (when book is finished)</td><td className="mono">40px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-info-header</code></td><td className="meta">Title + byline + now-reading-date + header-actions</td><td className="mono">24px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-byline</code></td><td className="meta">Author + meta (tight cluster)</td><td className="mono">8px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-header-actions</code></td><td className="meta">Primary CTA(s) + Share. align-self: stretch, flex-wrap. Share is pushed right via margin-left auto</td><td className="mono">12px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-section</code></td><td className="meta">Semantic wrapper : eyebrow + content. Width 100%</td><td className="mono">16px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-section.is-finished</code></td><td className="meta">Finished modifier : .panel-finished-content + .panel-finished-actions</td><td className="mono">24px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-finished-content</code></td><td className="meta">Date + rating + note fields</td><td className="mono">16px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-finished-actions</code></td><td className="meta">Edit + Remove (panel-finished-btn 40 height, 15/600)</td><td className="mono">8px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-quotes</code></td><td className="meta">Content wrapper + add button. Width 100%</td><td className="mono">40px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-quotes-content</code></td><td className="meta">Eyebrow + list / empty state</td><td className="mono">16px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-divider</code></td><td className="meta">Canonical 1px border-subtle separator. Used between every top-level section</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-actions</code></td><td className="meta">Footer row (Delete). justify-content: flex-start</td><td className="mono">12px</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DSSection>

          {/* ── QUOTE PANEL ── */}
          <DSSection id="quote-panel" title="Quote Panel" sub="Right-side drawer variant of Side Panel — opened by clicking a quote card. Same drawer mechanics + .panel-inner padding/gap as BookPanel. Close is the only absolute button (top 16 right 16). Share lives inside .panel-actions next to Edit + Delete (mirror of BookPanel where share lives in .panel-header-actions). Content : Quote section + date + actions, then optional divider + Book section (BookChip clickable → BookPanel).">

            <div className="ds-card">
              <div className="ds-card-head">Layout</div>
              <div className="ds-card-body">
                <div className="panel-ds-viewport">
                  <div className="panel-ds-content">
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                  </div>
                  <div className="panel-ds-panel" style={{ padding: "32px 20px", display: "flex", flexDirection: "column", gap: 32, position: "relative" }}>
                    <button className="panel-close" style={{ top: 12, right: 12 }} aria-label="Close">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                    <div className="panel-info">
                      <div className="panel-info-meta">
                        <div className="panel-section">
                          <span className="panel-section-eyebrow">Quote</span>
                          <div className="quote-panel-text">
                            <span className="quote-mark">"</span>
                            Qui suis-je ? Qu'est-ce que je fais là ? Il y a quelque chose qui ressemble à la vérité.
                            <span className="quote-mark">"</span>
                          </div>
                        </div>
                        <div className="quote-panel-date">Added Mar 14, 2026</div>
                      </div>
                      <div className="panel-actions">
                        <button className="panel-move-btn">Edit</button>
                        <button className="panel-delete-btn">Delete</button>
                        <button className="btn btn-outline btn-md panel-header-share" aria-label="Share">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/>
                            <polyline points="16 6 12 2 8 6"/>
                            <line x1="12" y1="2" x2="12" y2="15"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="panel-divider" />
                    <div className="panel-section">
                      <span className="panel-section-eyebrow">Book</span>
                      <button type="button" className="quote-book-chip quote-book-chip-interactive">
                        <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #6F7CF2, #F67BF8)" }}><span>T</span></div>
                        <div className="quote-book-chip-body">
                          <div className="quote-book-chip-name">
                            <div className="quote-book-chip-title">Tropique du Cancer</div>
                            <div className="quote-book-chip-author">Henry Miller</div>
                          </div>
                        </div>
                        <svg className="quote-book-chip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Anatomy (QuotePanel) — shares primitives with BookPanel</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Wrapper / element</th><th>Role</th><th>Gap</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.panel-inner</code></td><td className="meta">Same as BookPanel — padding 96/32/72. Hosts close (absolute)</td><td className="mono">40px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-close</code></td><td className="meta">Close button absolute top 16 right 16. 44×44, svg 24×24, ghost-hover bg</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-info</code></td><td className="meta">Meta wrapper + actions. Width 100%</td><td className="mono">40px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-info-meta</code></td><td className="meta">Stacks Quote section + date. Semantic wrapper — no CSS, default block flow</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-section</code> (Quote)</td><td className="meta">Eyebrow "Quote" + .quote-panel-text</td><td className="mono">16px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-panel-text</code></td><td className="meta">Jakarta 16/500/1.7, --text-2. Wraps content with .quote-mark spans for accent guillemets</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-mark</code></td><td className="meta">Spans around guillemets. 1.4em / --accent color, vertical-align -0.25em</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-panel-date</code></td><td className="meta">12/500/text-3. Conditional on createdAt</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-actions</code></td><td className="meta">Edit (panel-move-btn) + Delete (panel-delete-btn) + Share (.btn.btn-outline.btn-md.panel-header-share, margin-left auto → right edge)</td><td className="mono">12px</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-divider</code></td><td className="meta">Canonical 1px border-subtle separator. Conditional — only if book exists</td><td className="is-empty">—</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.panel-section</code> (Book)</td><td className="meta">Eyebrow "Book" + &lt;BookChip&gt; (base palette, --bg3 default)</td><td className="mono">16px</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DSSection>

          {/* ── MODAL ── */}
          <DSSection id="modal" title="Modal" sub="Centered form modal — max-width 630px, gap-driven layout (display: flex column, gap 32). Used by Add a book, Add a quote, Mark as finished. Submit button outside the <form>, linked via form='id' attr (preserves Enter-to-submit).">

            <div className="ds-card">
              <div className="ds-card-head">Anatomy (gap-driven, no margins)</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Element</th><th>Role</th><th>Specs</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.modal-overlay</code></td><td className="meta">Backdrop</td><td className="mono">fixed, padding 40 24, light overlay</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal</code></td><td className="meta">Modal shell</td><td className="mono">max-width 630, padding 32 24 0, flex col gap 32</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-close</code></td><td className="meta">X button (absolute)</td><td className="mono">top:16 right:16, 40×40, svg 24×24</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-title</code></td><td className="meta">Heading</td><td className="mono">28/800/-0.02em (no margin — parent gap)</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-tabs-section</code></td><td className="meta">Tabs + active content (only if tabs)</td><td className="mono">flex col gap 20</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-form</code></td><td className="meta">{'<form>'} wrapping inputs only</td><td className="mono">id="..." — referenced by submit button outside</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-fields</code></td><td className="meta">Body content stack</td><td className="mono">flex col gap 24</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-field</code></td><td className="meta">Label + input pair</td><td className="mono">flex col gap 8 — label 13/500/--text-2</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-actions</code></td><td className="meta">Footer button row (sibling of form)</td><td className="mono">flex space-between, margin 0 -24px (extends edges), padding 18 24</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">
                Add a book — preview
                <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                  <button className={`btn btn-xs ${addModalSource === "owned" ? "btn-primary" : "btn-secondary"}`} onClick={() => setAddModalSource("owned")}>From Library</button>
                  <button className={`btn btn-xs ${addModalSource === "wishlist" ? "btn-primary" : "btn-secondary"}`} onClick={() => setAddModalSource("wishlist")}>From Wishlist</button>
                </div>
              </div>
              <div className="ds-card-body">
                <div className="modal" style={{ animation: "none", margin: "0 auto", maxHeight: "none" }}>
                  <button className="modal-close" aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                  <div className="modal-title">Add a book</div>
                  <div className="modal-tabs-section">
                    <div className="import-tabs-scroll">
                      <div className="import-tabs">
                        <div className={`import-tab-indicator${importTab === "photo" ? " gradient" : ""}`} style={{ left: importTabIndicator.left, width: importTabIndicator.width }} />
                        <button
                          ref={el => importTabRefs.current[0] = el}
                          className={`import-tab${importTab === "photo" ? " active" : ""}`}
                          onClick={() => setImportTab("photo")}>
                          <span className="import-tab-ai">
                            <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none">
                              <defs>
                                <linearGradient id="aiTabGradDS" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#F67BF8"/>
                                  <stop offset="0.62" stopColor="#4959E6"/>
                                </linearGradient>
                              </defs>
                              <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiTabGradDS)"/>
                            </svg>
                            <span className="import-tab-ai-text">Photo</span>
                          </span>
                        </button>
                        <button
                          ref={el => importTabRefs.current[1] = el}
                          className={`import-tab${importTab === "scan" ? " active" : ""}`}
                          onClick={() => setImportTab("scan")}>
                          Barcode
                        </button>
                        <button
                          ref={el => importTabRefs.current[2] = el}
                          className={`import-tab${importTab === "file" ? " active" : ""}`}
                          onClick={() => setImportTab("file")}>
                          File
                        </button>
                        <button
                          ref={el => importTabRefs.current[3] = el}
                          className={`import-tab${importTab === "manual" ? " active" : ""}`}
                          onClick={() => setImportTab("manual")}>
                          Manual
                        </button>
                      </div>
                    </div>

                    {importTab === "photo" && (
                      <div className="import-tab-pane">
                        <GradientDropzone gradientId="dsPhotoGrad">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <div className="import-dropzone-title">Drop a photo or click to browse</div>
                          <div className="import-dropzone-sub">JPG · PNG · HEIC. Photo of a bookshelf or a handwritten list.</div>
                        </GradientDropzone>
                      </div>
                    )}
                    {importTab === "scan" && (
                      <div className="import-tab-pane">
                        <button type="button" className="btn btn-primary btn-md scan-start-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                          Scan with camera
                        </button>
                        <div className="scan-or-separator"><span>or</span></div>
                        <p className="import-tab-hint">Look up a book by its barcode.</p>
                        <form className="scan-manual" onSubmit={e => e.preventDefault()}>
                          <label className="scan-manual-label">Barcode</label>
                          <div className="scan-manual-row">
                            <input type="text" className="scan-manual-input" placeholder="978-…" inputMode="numeric" autoComplete="off" />
                            <button type="submit" className="btn btn-primary btn-md scan-lookup-btn" aria-label="Look up">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                              </svg>
                              <span className="scan-lookup-label">Look up</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                    {importTab === "file" && (
                      <div className="import-tab-pane">
                        <div className="import-dropzone">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <div className="import-dropzone-title">Drop a file or click to browse</div>
                          <div className="import-dropzone-sub">JSON (Readr) · CSV (Goodreads)</div>
                        </div>
                      </div>
                    )}
                    {importTab === "manual" && (
                      <form className="modal-form" onSubmit={e => e.preventDefault()}>
                        <div className="modal-fields">
                          <div className="modal-field"><label>Title</label><input placeholder="e.g. 1984" readOnly /></div>
                          <div className="modal-field"><label>Author</label><input placeholder="e.g. George Orwell" readOnly /></div>
                          <div className="modal-field"><label>Year</label><input placeholder="e.g. 1949" readOnly /></div>
                          <div className="modal-field"><label>Genre</label><input placeholder="e.g. Fiction" readOnly /></div>
                        </div>
                        {addModalSource === "owned" && (
                          <div className="modal-toggle-group">
                            <label className="cell-row cell-row--lg modal-toggle-row">
                              <input type="checkbox" className="modal-toggle-input" readOnly />
                              <span className="modal-toggle-check" />
                              <span className="modal-toggle-label">Mark as reading</span>
                            </label>
                            <div className="modal-info-box">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="16" x2="12" y2="12"/>
                                <line x1="12" y1="8" x2="12.01" y2="8"/>
                              </svg>
                              <span>
                                You're currently reading <strong className="modal-info-box-strong">2 of 3 books</strong>.
                              </span>
                            </div>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="modal-cancel">Cancel</button>
                    <button type="button" className="modal-submit">{addModalSource === "wishlist" ? "Add to wishlist" : "Add to library"}</button>
                  </div>
                </div>
              </div>
              <div className="ds-card-foot">
                <strong>Library</strong> shows the <code>.modal-toggle-group</code> (Mark as reading checkbox + <code>.modal-info-box</code> with current reading count) — visible in <em>Manual</em> tab and in <em>Photo</em> tab when exactly 1 book is detected. <strong>Wishlist</strong> hides this group entirely. Submit label adapts (Add to library / Add to wishlist).
              </div>
            </div>
          </DSSection>

          {/* ── DELETE MODAL ── */}
          <DSSection id="delete-modal" title="Delete Modal" sub="Type-routed confirmation modal — single component handles 10 variants: book, quote, word, bulk, cancelReading, removeFinished, collection, collectionsBulk, colRemove, colRemoveBulk. Uses .confirm-modal shell (max-width 630, padding 32/24/0, gap 32) — distinct from .modal but visually aligned. Title/message resolved via target.type. Body adapts: BookChip preview (single book / colRemove), .confirm-modal-quote-wrap with line-clamp 3 + see more (quote), .panel-finished-field rating + note (removeFinished), bare title-only chip (collection). Cancel = .modal-cancel ; confirm = .confirm-modal-delete (red #ef4444) — except cancelReading which uses .ob-next.">

            <div className="ds-card">
              <div className="ds-card-head">
                Preview
                <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                  <button className={`btn btn-xs ${deleteVariant === "book" ? "btn-primary" : "btn-secondary"}`} onClick={() => setDeleteVariant("book")}>Book</button>
                  <button className={`btn btn-xs ${deleteVariant === "quote" ? "btn-primary" : "btn-secondary"}`} onClick={() => setDeleteVariant("quote")}>Quote</button>
                  <button className={`btn btn-xs ${deleteVariant === "bulk" ? "btn-primary" : "btn-secondary"}`} onClick={() => setDeleteVariant("bulk")}>Bulk</button>
                  <button className={`btn btn-xs ${deleteVariant === "finished" ? "btn-primary" : "btn-secondary"}`} onClick={() => setDeleteVariant("finished")}>Finished</button>
                </div>
              </div>
              <div className="ds-card-body">
                <div className="confirm-modal" style={{ animation: "none", margin: "0 auto", boxShadow: "var(--shadow-lg)" }}>
                  <div className="confirm-modal-title">
                    {deleteVariant === "book" && "Remove this book?"}
                    {deleteVariant === "quote" && "Remove this quote?"}
                    {deleteVariant === "bulk" && "Remove 3 books?"}
                    {deleteVariant === "finished" && "Remove rating and note?"}
                  </div>
                  <div className="modal-fields">
                    <div className="confirm-modal-sub">
                      {deleteVariant === "book" && '"A Brief History of Time" will be permanently removed from your library.'}
                      {deleteVariant === "quote" && "This quote will be permanently removed."}
                      {deleteVariant === "bulk" && "These 3 books will be permanently removed from your library."}
                      {deleteVariant === "finished" && "The rating and note attached to this finished book will be removed. The finished status stays."}
                    </div>
                    {deleteVariant === "book" && (
                      <div className="confirm-modal-chip">
                        <div className="quote-book-chip">
                          <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #6F7CF2, #F67BF8)" }}><span>A</span></div>
                          <div className="quote-book-chip-body">
                            <div className="quote-book-chip-name">
                              <div className="quote-book-chip-title">A Brief History of Time</div>
                              <div className="quote-book-chip-author">Stephen Hawking</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {deleteVariant === "quote" && (
                      <div className="confirm-modal-quote-wrap">
                        <p className="confirm-modal-quote">"We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special."</p>
                      </div>
                    )}
                    {deleteVariant === "finished" && (
                      <>
                        <div className="panel-finished-field">
                          <span className="panel-finished-label">Rating</span>
                          <div className="panel-rating-stars" aria-label="Rating 4 out of 5">
                            {[1,2,3,4,5].map(n => (
                              <svg key={n} viewBox="0 0 24 24" fill="currentColor" className={4 >= n ? "is-filled" : ""}>
                                <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="panel-finished-field">
                          <span className="panel-finished-label">Note</span>
                          <div className="panel-finished-note">A landmark in popular science. Hawking makes cosmology accessible without dumbing it down.</div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="confirm-modal-actions">
                    <button type="button" className="modal-cancel">Cancel</button>
                    <button type="button" className="confirm-modal-delete">Remove</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Target routing — <code>target.type</code> dispatches title / message / body / confirm</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head">
                    <tr><th>target shape</th><th>Title i18n</th><th>Message i18n</th><th>Body addon</th><th>Confirm</th></tr>
                  </thead>
                  <tbody className="table-body">
                    <tr className="table-row">
                      <td className="mono">{"{ id, title, author, ... }"} (book — no type)</td>
                      <td className="mono">t.deleteTitle</td>
                      <td className="mono">t.deleteMsg(title)</td>
                      <td className="mono">.confirm-modal-chip + BookChip</td>
                      <td className="mono">.confirm-modal-delete → deleteBook(id)</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ bulk: true, ids, count }"}</td>
                      <td className="mono">t.deleteBulkTitle(count)</td>
                      <td className="mono">t.deleteBulkMsg(count)</td>
                      <td className="is-empty">—</td>
                      <td className="mono">.confirm-modal-delete → deleteMany(ids)</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'quote', id, text }"}</td>
                      <td className="mono">t.quoteDeleteTitle</td>
                      <td className="mono">t.quoteDeleteMsg</td>
                      <td className="mono">.confirm-modal-quote-wrap (line-clamp 3 + see more)</td>
                      <td className="mono">.confirm-modal-delete → deleteQuote(id)</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'word', id, title }"}</td>
                      <td className="mono">t.wordDeleteTitle</td>
                      <td className="mono">t.wordDeleteMsg(title)</td>
                      <td className="is-empty">—</td>
                      <td className="mono">.confirm-modal-delete → deleteWord(id)</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'cancelReading', title }"}</td>
                      <td className="mono">t.cancelReadingTitle</td>
                      <td className="mono">t.cancelReadingMsg(title)</td>
                      <td className="is-empty">—</td>
                      <td className="mono">.ob-next (not red) → cancelReading</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'removeFinished', rating, note }"}</td>
                      <td className="mono">t.removeFinishedTitle</td>
                      <td className="mono">t.removeFinishedMsg</td>
                      <td className="mono">.panel-finished-field × 2 (stars + note)</td>
                      <td className="mono">.confirm-modal-delete → removeFinished</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'collection', id, title, count }"}</td>
                      <td className="mono">t.colDeleteTitle</td>
                      <td className="mono">t.colDeleteMsg</td>
                      <td className="mono">.confirm-modal-chip + .quote-book-chip (no cover, count as author)</td>
                      <td className="mono">.confirm-modal-delete → deleteCollection</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'collectionsBulk', ids, count }"}</td>
                      <td className="mono">t.colDeleteBulkTitle(count)</td>
                      <td className="mono">t.colDeleteBulkMsg(count)</td>
                      <td className="is-empty">—</td>
                      <td className="mono">.confirm-modal-delete → deleteCollectionsMany</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'colRemove', title, author, colName }"}</td>
                      <td className="mono">t.colRemoveTitle</td>
                      <td className="mono">t.colRemoveMsg(colName)</td>
                      <td className="mono">.confirm-modal-chip + BookChip</td>
                      <td className="mono">.confirm-modal-delete (label = colRemoveConfirm)</td>
                    </tr>
                    <tr className="table-row">
                      <td className="mono">{"{ type: 'colRemoveBulk', count, colName }"}</td>
                      <td className="mono">t.colRemoveBulkTitle(count)</td>
                      <td className="mono">t.colRemoveBulkMsg(count, colName)</td>
                      <td className="is-empty">—</td>
                      <td className="mono">.confirm-modal-delete (label = colRemoveConfirm)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Usage</div>
              <div className="ds-card-body col padded">
                <p>
                  Trigger the modal by setting <code>deleteTarget</code> state. The <code>onConfirm</code> callback receives the full target (or a Set of ids for bulk) — dispatch in the parent based on <code>target.type</code>.
                </p>
                <pre style={{ fontFamily: "monospace", fontSize: 12, background: "var(--bg3)", padding: "12px 14px", borderRadius: 6, color: "var(--text)", lineHeight: 1.6, margin: 0, overflow: "auto" }}>
{`// Open
<button onClick={() => setDeleteTarget({ type: 'quote', id: q.id, text: q.text })}>…</button>

// Render
<DeleteModal
  target={deleteTarget}
  onClose={() => setDeleteTarget(null)}
  onConfirm={handleDeleteConfirm}
  t={t}
/>

// Dispatch — handles all 10 variants
function handleDeleteConfirm(payload) {
  // Bulk: payload is a Set of ids
  if (payload instanceof Set) return deleteMany(payload);
  // Type-routed
  switch (payload?.type) {
    case 'quote':           return deleteQuote(payload.id);
    case 'word':            return deleteWord(payload.id);
    case 'cancelReading':   return cancelReading(payload);
    case 'removeFinished':  return removeFinished(payload);
    case 'collection':      return deleteCollection(payload.id);
    case 'collectionsBulk': return deleteCollectionsMany(payload.ids);
    case 'colRemove':       return removeFromCollection(payload);
    case 'colRemoveBulk':   return removeManyFromCollection(payload);
  }
  // Default: single-book delete (target has no .type)
  return deleteBook(payload.id);
}`}
                </pre>
              </div>
              <div className="ds-card-foot">
                Source: <code>components/library/DeleteModal.js</code>. Cancel button is <code>.modal-cancel</code> (outline). Confirm is <code>.confirm-modal-delete</code> (red #ef4444) for all variants except <code>cancelReading</code>, which uses <code>.ob-next</code> (primary blue) since the action isn't destructive.
              </div>
            </div>
          </DSSection>

          {/* ── UPLOAD BOX ── */}
          <DSSection id="upload-box" title="Upload Box" sub="Dropzone with gradient dashed border (Photo/AI) or standard border (File). Three states: idle, scanning, error.">

            {/* Photo / AI dropzone — all states */}
            {[
              { key: "idle", label: "Idle" },
              { key: "scanning", label: "Scanning" },
              { key: "error", label: "Error" },
            ].map(({ key, label }) => (
              <div className="ds-card" key={key}>
                <div className="ds-card-head">Photo / AI — {label}</div>
                <div className="ds-card-body col padded">
                  <div style={{ maxWidth: 580, width: "100%" }}>
                    <UploadBoxDemo state={key} />
                  </div>
                  {key === "error" && (
                    <div className="scan-alert" role="alert" style={{ maxWidth: 580, width: "100%" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span>No books detected. Try a clearer photo with visible titles.</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* File dropzone */}
            <div className="ds-card">
              <div className="ds-card-head">File — standard border</div>
              <div className="ds-card-body col padded">
                <div className="import-dropzone" style={{ cursor: "default", maxWidth: 580, width: "100%" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <div className="import-dropzone-title">Drop a file or click to browse</div>
                  <div className="import-dropzone-sub">JSON (Readr) · CSV (Goodreads)</div>
                </div>
              </div>
            </div>

          </DSSection>

          {/* ── SELECTION BAR ── */}
          <DSSection id="selection-bar" title="Selection Bar" sub="Floating bar fixed bottom-center in Edit mode. Background --primary-60 (light & dark). Slides up from below via translateY(120 → 0).">
            <div className="ds-card">
              <div className="ds-card-head">Preview — Wishlist edit mode (3 buttons in .sel-actions)</div>
              <div className="ds-card-body" style={{ justifyContent: "center" }}>
                <div className="selection-bar visible" style={{ position: "static", transform: "none" }}>
                  <span className="selection-count">3 selected</span>
                  <div className="sel-actions">
                    <button className="sel-btn sel-select-all">Select all</button>
                    <button className="sel-btn sel-confirm">Mark as owned</button>
                    <button className="sel-btn sel-confirm danger">Remove</button>
                  </div>
                  <button className="sel-btn sel-cancel">Cancel</button>
                </div>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Element</th><th>Background</th><th>Border / color</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.selection-bar</code></td><td><span className="ds-token-chip">--primary-60</span></td><td>color #fff · gap 16</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.sel-actions</code></td><td style={{ color: "var(--text-3)" }}>—</td><td>flex row, gap 8 (desktop) / column on mobile</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.sel-select-all</code></td><td>transparent</td><td>border 1.5px rgba(255,255,255,0.5), color #fff</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.sel-confirm</code> (Mark as owned)</td><td><span className="ds-token-chip">--primary-50</span></td><td>color #fff</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.sel-confirm.danger</code> (Remove)</td><td>rgba(255,255,255,0.15)</td><td>color #fff</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.sel-cancel</code></td><td>rgba(255,255,255,0.15)</td><td>color #fff</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="ds-card-foot">
                Mobile (max-width 600px) : flex column, gap 16 (count → .sel-actions stacked → cancel). Buttons full-width via <code>.sel-btn {`{ width: 100% }`}</code>.
              </div>
            </div>
          </DSSection>

          {/* ── EMPTY STATE ── */}
          <DSSection id="empty" title="Empty State" sub="Gap-driven layout (20px between blocks, 8px inside .empty-text). Icons 80×80 illustrative SVGs, custom per page (Library, Wishlist, Quotes, Dictionary).">

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Element</th><th>Role</th><th>Specs</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.empty</code></td><td className="meta">Outer container</td><td className="mono">flex col, align center, gap 20, padding 80/20</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.empty-icon</code></td><td className="meta">Illustration SVG</td><td className="mono">80×80, viewBox 60</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.empty-text</code></td><td className="meta">Title + sub wrapper</td><td className="mono">flex col, gap 8</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.empty-title</code></td><td className="meta">Headline</td><td className="mono">Jakarta 18 / 700</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.empty-sub</code></td><td className="meta">Helper text</td><td className="mono">14 / --text-2 / max-width 280</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.empty-cta</code></td><td className="meta">Primary action (optional)</td><td className="mono">Same anatomy as .add-btn (h 40, --primary-50)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Icon set — 4 illustrative SVGs (80×80, viewBox 60)</div>
              <div className="ds-card-body" style={{ gap: 32, flexWrap: "wrap", justifyContent: "space-around" }}>
                <div className="ds-icon-tile">
                  <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
                    <path d="M14 8H51C47 11 47 17 51 20H14C10.6863 20 8 17.3137 8 14C8 10.6863 10.6863 8 14 8Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24.5 7C20.3579 7 17 10.3579 17 14.5C17 18.6421 20.3579 22 24.5 22H14.5C10.3579 22 7 18.6421 7 14.5C7 10.3579 10.3579 7 14.5 7H24.5Z" fill="#C1C7FB"/>
                    <path d="M14 10H52C53.1046 10 54 9.10457 54 8C54 6.89543 53.1046 6 52 6H14C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22H52C53.1046 22 54 21.1046 54 20C54 18.8954 53.1046 18 52 18H14C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10Z" fill="#6F7CF2"/>
                    <path d="M37 6H14C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22H52C53.1046 22 54 21.1046 54 20C54 18.8954 53.1046 18 52 18H14C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10H52C53.1046 10 54 9.10457 54 8C54 6.89543 53.1046 6 52 6H43" stroke="#131860" strokeLinecap="round"/>
                    <path d="M46 24H9C13 27 13 33 9 36H46C49.3137 36 52 33.3137 52 30C52 26.6863 49.3137 24 46 24Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M35.5 23C39.6421 23 43 26.3579 43 30.5C43 34.6421 39.6421 38 35.5 38H45.5C49.6421 38 53 34.6421 53 30.5C53 26.3579 49.6421 23 45.5 23H35.5Z" fill="#C1C7FB"/>
                    <path d="M46 26H8C6.89543 26 6 25.1046 6 24C6 22.8954 6.89543 22 8 22H46C50.4183 22 54 25.5817 54 30C54 34.4183 50.4183 38 46 38H8C6.89543 38 6 37.1046 6 36C6 34.8954 6.89543 34 8 34H46C48.2091 34 50 32.2091 50 30C50 27.7909 48.2091 26 46 26Z" fill="#C1C7FB"/>
                    <path d="M22 26H46C48.2091 26 50 27.7909 50 30C50 32.2091 48.2091 34 46 34H8C6.89543 34 6 34.8954 6 36C6 37.1046 6.89543 38 8 38H46C50.4183 38 54 34.4183 54 30C54 25.5817 50.4183 22 46 22H8C6.89543 22 6 22.8954 6 24C6 25.1046 6.89543 26 8 26H16" stroke="#131860" strokeLinecap="round"/>
                    <path d="M14 40H51C47 43 47 49 51 52H14C10.6863 52 8 49.3137 8 46C8 42.6863 10.6863 40 14 40Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24.5 39C20.3579 39 17 42.3579 17 46.5C17 50.6421 20.3579 54 24.5 54H14.5C10.3579 54 7 50.6421 7 46.5C7 42.3579 10.3579 39 14.5 39H24.5Z" fill="#C1C7FB"/>
                    <path d="M14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42Z" fill="#3646D4"/>
                    <path d="M33 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H39" stroke="#131860" strokeLinecap="round"/>
                  </svg>
                  <span className="ds-token-name">Library</span>
                </div>

                <div className="ds-icon-tile">
                  <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
                    <path d="M14 40H51C47 43 47 49 51 52H14C10.6863 52 8 49.3137 8 46C8 42.6863 10.6863 40 14 40Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24.5 39C20.3579 39 17 42.3579 17 46.5C17 50.6421 20.3579 54 24.5 54H14.5C10.3579 54 7 50.6421 7 46.5C7 42.3579 10.3579 39 14.5 39H24.5Z" fill="#C1C7FB"/>
                    <path d="M14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42Z" fill="#6F7CF2"/>
                    <path d="M37 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H43" stroke="#131860" strokeLinecap="round"/>
                    <path d="M46 24H9C13 27 13 33 9 36H46C49.3137 36 52 33.3137 52 30C52 26.6863 49.3137 24 46 24Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M35.5 23C39.6421 23 43 26.3579 43 30.5C43 34.6421 39.6421 38 35.5 38H45.5C49.6421 38 53 34.6421 53 30.5C53 26.3579 49.6421 23 45.5 23H35.5Z" fill="#C1C7FB"/>
                    <path d="M46 26H8C6.89543 26 6 25.1046 6 24C6 22.8954 6.89543 22 8 22H46C50.4183 22 54 25.5817 54 30C54 34.4183 50.4183 38 46 38H8C6.89543 38 6 37.1046 6 36C6 34.8954 6.89543 34 8 34H46C48.2091 34 50 32.2091 50 30C50 27.7909 48.2091 26 46 26Z" fill="#C1C7FB"/>
                    <path d="M22 26H46C48.2091 26 50 27.7909 50 30C50 32.2091 48.2091 34 46 34H8C6.89543 34 6 34.8954 6 36C6 37.1046 6.89543 38 8 38H46C50.4183 38 54 34.4183 54 30C54 25.5817 50.4183 22 46 22H8C6.89543 22 6 22.8954 6 24C6 25.1046 6.89543 26 8 26H16" stroke="#131860" strokeLinecap="round"/>
                    <path d="M40 11.8622C40 13.4087 39.4062 14.8941 38.3458 15.9929C35.9049 18.523 33.5374 21.1613 31.0053 23.5997C30.4249 24.1505 29.5042 24.1304 28.9488 23.5547L21.6538 15.9929C19.4487 13.7072 19.4487 10.0172 21.6538 7.73157C23.8804 5.42345 27.5079 5.42345 29.7346 7.73157C29.8794 7.88165 30.12 7.88182 30.2648 7.73173C31.3324 6.6245 32.7864 6 34.3053 6C35.8242 6 37.2781 6.62444 38.3458 7.73157C39.4063 8.83045 40 10.3158 40 11.8622Z" fill="#6F7CF2"/>
                    <path d="M21.654 7.73145C23.2834 6.04255 25.6623 5.59108 27.694 6.37402C26.9495 6.66099 26.2511 7.11253 25.654 7.73145C23.449 10.0171 23.449 13.7075 25.654 15.9932L32.0251 22.5977C31.6876 22.9345 31.3485 23.2693 31.0055 23.5996C30.4252 24.1504 29.5043 24.1303 28.9489 23.5547L21.654 15.9932C19.449 13.7075 19.449 10.0171 21.654 7.73145Z" fill="#3646D4"/>
                    <path d="M40 11.8622C40 13.4087 39.4062 14.8941 38.3458 15.9929C35.9049 18.523 33.5374 21.1613 31.0053 23.5997C30.4249 24.1505 29.5042 24.1304 28.9488 23.5547L21.6538 15.9929C19.4487 13.7072 19.4487 10.0172 21.6538 7.73157C23.8804 5.42345 27.5079 5.42345 29.7346 7.73157L29.9998 8.00642L30.2648 7.73173C31.3324 6.6245 32.7864 6 34.3053 6C35.8242 6 37.2781 6.62444 38.3458 7.73157C39.4063 8.83045 40 10.3158 40 11.8622Z" stroke="#131860" strokeLinecap="round"/>
                  </svg>
                  <span className="ds-token-name">Wishlist</span>
                </div>

                <div className="ds-icon-tile">
                  <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
                    <path d="M6 14C6 10.2288 6 8.34315 7.17157 7.17157C8.34315 6 10.2288 6 14 6H46C49.7712 6 51.6569 6 52.8284 7.17157C54 8.34315 54 10.2288 54 14V36C54 39.7712 54 41.6569 52.8284 42.8284C51.6569 44 49.7712 44 46 44H40L36.5099 48.8862C33.5423 53.0408 32.0585 55.1181 30 55.1181C27.9415 55.1181 26.4577 53.0408 23.4901 48.8862L20 44H14C10.2288 44 8.34315 44 7.17157 42.8284C6 41.6569 6 39.7712 6 36V14Z" fill="#E8EAFD"/>
                    <path d="M26 44L29.4902 48.8857C30.9309 50.9026 32.0232 52.429 33 53.4668C31.9647 54.5668 31.0592 55.1182 30 55.1182C27.9415 55.1182 26.4578 53.0404 23.4902 48.8857L20 44H26ZM20 6C16.2288 6 14.3434 6.0003 13.1719 7.17188C12.0003 8.34345 12 10.2288 12 14V36C12 39.7712 12.0003 41.6566 13.1719 42.8281C14.3434 43.9997 16.2288 44 20 44H14C10.2288 44 8.34345 43.9997 7.17188 42.8281C6.0003 41.6566 6 39.7712 6 36V14C6 10.2288 6.0003 8.34345 7.17188 7.17188C8.34345 6.0003 10.2288 6 14 6H20Z" fill="#C1C7FB"/>
                    <path d="M20 44H14C10.2288 44 8.34315 44 7.17157 42.8284C6 41.6569 6 39.7712 6 36V14C6 10.2288 6 8.34315 7.17157 7.17157C8.34315 6 10.2288 6 14 6H38M22.5 47.5L23.4901 48.8862C26.4577 53.0408 27.9415 55.1181 30 55.1181C32.0585 55.1181 33.5423 53.0408 36.5099 48.8862L40 44H46C49.7712 44 51.6569 44 52.8284 42.8284C54 41.6569 54 39.7712 54 36V14C54 10.2288 54 8.34315 52.8284 7.17157C51.6569 6 49.7712 6 46 6H42" stroke="#131860" strokeLinecap="round"/>
                    <path d="M28 34C28 35.1046 27.1046 36 26 36H19C18.4477 36 18 35.5523 18 35V33C18 32.4477 18.4477 32 19 32H23C23.5523 32 24 31.5523 24 31V29C24 28.4477 23.5523 28 23 28H18C16.8954 28 16 27.1046 16 26V18C16 16.8954 16.8954 16 18 16H26C27.1046 16 28 16.8954 28 18V34Z" fill="#9BA5F8"/>
                    <path d="M28 32C28 33.8856 28 34.8284 27.4142 35.4142C26.8284 36 25.8856 36 24 36H20C19.0572 36 18.5858 36 18.2929 35.7071C18 35.4142 18 34.9428 18 34C18 33.0572 18 32.5858 18.2929 32.2929C18.5858 32 19.0572 32 20 32H22C22.9428 32 23.4142 32 23.7071 31.7071C24 31.4142 24 30.9428 24 30C24 29.0572 24 28.5858 23.7071 28.2929C23.4142 28 22.9428 28 22 28H20C18.1144 28 17.1716 28 16.5858 27.4142C16 26.8284 16 25.8856 16 24V20C16 18.1144 16 17.1716 16.5858 16.5858C17.1716 16 18.1144 16 20 16H24C25.8856 16 26.8284 16 27.4142 16.5858C28 17.1716 28 18.1144 28 20V32Z" stroke="#131860" strokeLinecap="round"/>
                    <path d="M44 34C44 35.1046 43.1046 36 42 36H35C34.4477 36 34 35.5523 34 35V33C34 32.4477 34.4477 32 35 32H39C39.5523 32 40 31.5523 40 31V29C40 28.4477 39.5523 28 39 28H34C32.8954 28 32 27.1046 32 26V18C32 16.8954 32.8954 16 34 16H42C43.1046 16 44 16.8954 44 18V34Z" fill="#6F7CF2"/>
                    <path d="M44 32C44 33.8856 44 34.8284 43.4142 35.4142C42.8284 36 41.8856 36 40 36H36C35.0572 36 34.5858 36 34.2929 35.7071C34 35.4142 34 34.9428 34 34C34 33.0572 34 32.5858 34.2929 32.2929C34.5858 32 35.0572 32 36 32H38C38.9428 32 39.4142 32 39.7071 31.7071C40 31.4142 40 30.9428 40 30C40 29.0572 40 28.5858 39.7071 28.2929C39.4142 28 38.9428 28 38 28H36C34.1144 28 33.1716 28 32.5858 27.4142C32 26.8284 32 25.8856 32 24V20C32 18.1144 32 17.1716 32.5858 16.5858C33.1716 16 34.1144 16 36 16H40C41.8856 16 42.8284 16 43.4142 16.5858C44 17.1716 44 18.1144 44 20V32Z" stroke="#131860" strokeLinecap="round"/>
                  </svg>
                  <span className="ds-token-name">Quotes</span>
                </div>

                <div className="ds-icon-tile">
                  <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
                    <path d="M10 10C10 7.79086 11.7909 6 14 6H48C49.1046 6 50 6.89543 50 8V52C50 53.1046 49.1046 54 48 54H14C11.7909 54 10 52.2091 10 50V10Z" fill="#E8EAFD"/>
                    <rect x="23" y="40" width="8" height="2" rx="1" fill="white" stroke="#131860" strokeLinecap="round"/>
                    <rect x="23" y="36" width="12" height="2" rx="1" fill="white" stroke="#131860" strokeLinecap="round"/>
                    <path d="M10 10C10 7.79086 11.7909 6 14 6H18V54H14C11.7909 54 10 52.2091 10 50L10 10Z" fill="#C1C7FB" stroke="#131860" strokeLinecap="round"/>
                    <path d="M10 50C10 47.7909 11.7909 46 14 46H50V52C50 53.1046 49.1046 54 48 54H14C11.7909 54 10 52.2091 10 50Z" fill="#F4F5FF"/>
                    <path d="M50 43V50C50 52.2091 48.2091 54 46 54H14C11.7909 54 10 52.2091 10 50M10 50V10C10 7.79086 11.7909 6 14 6L48 6C49.1046 6 50 6.89543 50 8V44C50 45.1046 49.1046 46 48 46H42M10 50C10 47.7909 11.7909 46 14 46H38" stroke="#131860" strokeLinecap="round"/>
                    <rect x="22" y="13" width="24" height="16" rx="2" fill="white"/>
                    <path d="M32 13H44C45.1046 13 46 13.8954 46 15V27C46 28.1046 45.1046 29 44 29H24C22.8954 29 22 28.1046 22 27V15C22 13.8954 22.8954 13 24 13H28" stroke="#131860" strokeLinecap="round"/>
                    <path d="M26 24L29 18L32 24" stroke="#131860" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M27.5 21H30.5" stroke="#131860" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26 24L29 18L32 24" stroke="#9BA5F8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M27.5 21H30.5" stroke="#9BA5F8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M42 24H38L42 18H38" stroke="#131860" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M42 24H38L42 18H38" stroke="#6F7CF2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M34 21H36" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 50H27V55.5858C27 56.4767 25.9229 56.9229 25.2929 56.2929L23.1768 54.1768C23.0791 54.0791 22.9209 54.0791 22.8232 54.1768L20.7071 56.2929C20.0771 56.9229 19 56.4767 19 55.5858V50Z" fill="#6F7CF2" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 50H29" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ds-token-name">Dictionary</span>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Live preview — Library empty</div>
              <div className="ds-card-body">
                <div className="empty" style={{ padding: "40px 20px" }}>
                  <svg className="empty-icon" viewBox="0 0 60 60" fill="none">
                    <path d="M14 8H51C47 11 47 17 51 20H14C10.6863 20 8 17.3137 8 14C8 10.6863 10.6863 8 14 8Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 10H52C53.1046 10 54 9.10457 54 8C54 6.89543 53.1046 6 52 6H14C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22H52C53.1046 22 54 21.1046 54 20C54 18.8954 53.1046 18 52 18H14C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10Z" fill="#6F7CF2"/>
                    <path d="M37 6H14C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22H52C53.1046 22 54 21.1046 54 20C54 18.8954 53.1046 18 52 18H14C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10H52C53.1046 10 54 9.10457 54 8C54 6.89543 53.1046 6 52 6H43" stroke="#131860" strokeLinecap="round"/>
                    <path d="M46 24H9C13 27 13 33 9 36H46C49.3137 36 52 33.3137 52 30C52 26.6863 49.3137 24 46 24Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 26H46C48.2091 26 50 27.7909 50 30C50 32.2091 48.2091 34 46 34H8C6.89543 34 6 34.8954 6 36C6 37.1046 6.89543 38 8 38H46C50.4183 38 54 34.4183 54 30C54 25.5817 50.4183 22 46 22H8C6.89543 22 6 22.8954 6 24C6 25.1046 6.89543 26 8 26H16" stroke="#131860" strokeLinecap="round"/>
                    <path d="M14 40H51C47 43 47 49 51 52H14C10.6863 52 8 49.3137 8 46C8 42.6863 10.6863 40 14 40Z" fill="#E8EAFD" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42Z" fill="#3646D4"/>
                    <path d="M33 50H14C11.7909 50 10 48.2091 10 46C10 43.7909 11.7909 42 14 42H52C53.1046 42 54 41.1046 54 40C54 38.8954 53.1046 38 52 38H14C9.58172 38 6 41.5817 6 46C6 50.4183 9.58172 54 14 54H52C53.1046 54 54 53.1046 54 52C54 50.8954 53.1046 50 52 50H39" stroke="#131860" strokeLinecap="round"/>
                  </svg>
                  <div className="empty-text">
                    <p className="empty-title">Your library is empty</p>
                    <p className="empty-sub">Start building your collection. Add your first read.</p>
                  </div>
                  <button className="empty-cta">Add a book</button>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── NOW READING ── */}
          <DSSection id="now-reading" title="Now Reading" sub="Section pinned at the top of the Library tab. Max 3 books simultaneously (MAX_READING). Visual differentiator from the BookCard grid below — same card family tokens but distinct vertical layout with a primary badge + kebab quick-actions.">

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Element</th><th>Role</th><th>Specs</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-section</code></td><td className="meta">Section root</td><td className="mono">flex col, gap 16, position: relative + z-index: 10 (so the kebab dropdown floats above the SearchBar)</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-list</code></td><td className="meta">Cards grid</td><td className="mono">grid auto-fill minmax(320px, 1fr), gap 18 (14 tablet, 12 mobile, 1 col)</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-card</code></td><td className="meta">Card root (role=button)</td><td className="mono">padding 14 56 14 16 (right reserves kebab), --card bg, 1.5px --border-subtle, --radius, fadeUp animation</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-body</code></td><td className="meta">Vertical content stack</td><td className="mono">flex col, align-items flex-start, gap 16</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-date</code></td><td className="meta">"Started on" badge</td><td className="mono">solid primary fill (--primary-50 / --primary-40 dark) · white text · h 20 · 11/600</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-row</code></td><td className="meta">Cover + text horizontal block</td><td className="mono">flex row, gap 16, align-items center</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-cover</code></td><td className="meta">Cover thumbnail</td><td className="mono">60×90 (ratio 2:3), radius 4 · gradient + Jakarta letter (white-85) when no image</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-text</code></td><td className="meta">Title + meta wrapper</td><td className="mono">flex col, gap 8, flex 1, min-width 0</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-title</code></td><td className="meta">Book title</td><td className="mono">16/700/lh 1.35 (one tier above .book-title for differentiation)</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.now-reading-menu-btn</code></td><td className="meta">Kebab "more actions"</td><td className="mono">40×40, absolute top:8 right:8, ghost neutral with primary-tint hover</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Quick actions (kebab dropdown)</div>
              <div className="ds-card-body col" style={{ gap: 8 }}>
                <p>3 actions, all <code>stopPropagation</code> on the card click :</p>
                <ul className="ds-doc-list">
                  <li><strong>Mark as finished</strong> — opens FinishReadingModal</li>
                  <li><strong>Add a quote</strong> — opens AddQuoteModal pre-filled with the book context (BookChip in both Photo + Manual tabs, no inputs to edit)</li>
                  <li><strong>Cancel reading</strong> — opens DeleteModal (type=cancelReading) explaining the book stays in library, only removed from Now Reading. Confirm style is <code>.ob-next</code> (non-destructive)</li>
                </ul>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Card hierarchy</div>
              <div className="ds-card-body col" style={{ gap: 8 }}>
                <p>The Now Reading card belongs to the same visual family as <code>.book-card</code> (same radius, border, hover transition, fadeUp animation) but adopts a different layout to differentiate without competing visually with the Library grid below. The badge in primary fill anchors the "active reading" status.</p>
                <p>Order rule : <code>readingBooks</code> sorted by <code>startedAt</code> desc (most recently started first).</p>
              </div>
            </div>
          </DSSection>

          {/* ── FINISH READING MODAL ── */}
          <DSSection id="finish-reading" title="Finish Reading Modal" sub="Form modal opened from BookPanel 'Mark as finished' or NowReading kebab. Saves rating (1-5 stars) + optional comment. Reopens pre-filled when the user edits an already-finished book.">

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Element</th><th>Role</th><th>Specs</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.modal.finish-modal</code></td><td className="meta">Modal shell (.modal pattern)</td><td className="mono">max-width 630, padding 32 24 0, flex col gap 32</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-form</code></td><td className="meta">{'<form>'} wrapping inputs only</td><td className="mono">id="finish-reading-form" — submit button outside form via form="" attr (Enter-to-submit preserved)</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.modal-fields</code></td><td className="meta">Body content stack</td><td className="mono">flex col gap 24, contains chip + 2 .modal-field</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.finish-modal-chip</code></td><td className="meta">BookChip wrapper</td><td className="mono">just for spacing — gap-driven by parent .modal-fields</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.finish-stars</code></td><td className="meta">5 star rating buttons</td><td className="mono">flex row gap 4, svg 28×28, --border default → --primary-50 filled</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.quote-textarea</code></td><td className="meta">Comment textarea</td><td className="mono">same shared input style as AddQuoteModal — bg --bg3, focus primary glow</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Display in BookPanel (after save)</div>
              <div className="ds-card-body col" style={{ gap: 8 }}>
                <p>Once saved, the finished metadata appears as a dedicated section in <code>.panel-info</code> :</p>
                <ul className="ds-doc-list">
                  <li><code>.panel-section.is-finished</code> — framed by border-top + border-bottom + padding 24, visually emphasized vs other sections</li>
                  <li><code>.panel-finished-date</code> — "Finished on Apr 27" (15/500/lh 1.8, matches .panel-synopsis)</li>
                  <li><code>.panel-rating-stars</code> — read-only stars in primary fill, displayed in a tinted box (--bg3)</li>
                  <li><code>.panel-finished-note</code> — italic comment in tinted box (--bg3, 15/500/lh 1.8)</li>
                  <li><code>.panel-finished-actions</code> — Edit + Remove buttons (Edit becomes "Add rating" if no rating/note set yet)</li>
                </ul>
                <p>Remove triggers DeleteModal type=removeFinished — preserves book.finishedAt, only clears rating + note. Modal previews the removed content (rating + note) before confirm.</p>
              </div>
            </div>
          </DSSection>

          {/* ── ONBOARDING ── */}
          <DSSection id="onboarding" title="Onboarding" sub="6-slide modal shown on first visit (persisted via readr-onboarding-seen) and reopenable from the footer. Each slide pairs an illustrative SVG (120×120) with a verb-led title and a single-sentence desc. Mobile titles use \\n + white-space: pre-line for controlled line breaks.">

            <div className="ds-card">
              <div className="ds-card-head">Anatomy</div>
              <div className="ds-card-body col">
                <table className="token-table">
                  <thead className="table-head"><tr><th>Element</th><th>Role</th><th>Specs</th></tr></thead>
                  <tbody className="table-body">
                    <tr className="table-row"><td className="token-table-component"><code>.ob-overlay</code></td><td className="meta">Backdrop, click outside to close</td><td className="mono">fixed, z-index 400, blur 20</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-modal</code></td><td className="meta">Modal shell</td><td className="mono">max-width ~520, --bg2, --shadow-lg</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-body</code></td><td className="meta">Inner padding</td><td className="mono">padding 48 32 32</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-slides</code></td><td className="meta">Vertical stack: icon → text → dots</td><td className="mono">flex col, align center, gap 40</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-icon</code></td><td className="meta">SVG slot</td><td className="mono">120×120, viewBox 60</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-icon-placeholder</code></td><td className="meta">Fallback when no icon</td><td className="mono">120×120, --primary-5, radius 16</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-text</code></td><td className="meta">Title + desc wrapper</td><td className="mono">flex col, align center, gap 20</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-title</code></td><td className="meta">Slide title</td><td className="mono">Jakarta 20 / 800, line-height 1.3</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-desc</code></td><td className="meta">Slide description</td><td className="mono">16 / 500, line-height 1.7, max-width 464</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-dots</code></td><td className="meta">Pagination indicator</td><td className="mono">flex row, gap 6, dot 6×6 → 20×6 active</td></tr>
                    <tr className="table-row"><td className="token-table-component"><code>.ob-footer</code></td><td className="meta">Skip + Previous + Next/Get started</td><td className="mono">padding 18, flex col, gap 24</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-head">Icon set — 6 illustrative SVGs (120×120, viewBox 60)</div>
              <div className="ds-card-body" style={{ gap: 32, flexWrap: "wrap", justifyContent: "space-around" }}>
                <div className="ds-icon-tile">
                  <ReadrIcon />
                  <span className="ds-token-name">Readr (slide 1)</span>
                </div>
                <div className="ds-icon-tile">
                  <TrackingIcon />
                  <span className="ds-token-name">Tracking (slide 2)</span>
                </div>
                <div className="ds-icon-tile">
                  <ScanIcon />
                  <span className="ds-token-name">Scan (slide 3)</span>
                </div>
                <div className="ds-icon-tile">
                  <QuoteIcon />
                  <span className="ds-token-name">Quote (slide 4)</span>
                </div>
                <div className="ds-icon-tile">
                  <WordsIcon />
                  <span className="ds-token-name">Words (slide 5)</span>
                </div>
                <div className="ds-icon-tile">
                  <DataControlIcon />
                  <span className="ds-token-name">Data control (slide 6)</span>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── FOOTER ── */}
          <DSSection id="footer" title="Footer">
            <div className="ds-card">
              <div className="ds-card-head">Preview</div>
              <div className="ds-card-body col">
                <div className="footer-preview">
                  © 2026 Pierre Blavette · How it works · v1.0 · About readr · pierreblavette.com
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── TOKEN USAGE ── */}
          <DSSection id="token-usage" title="Token Usage" sub="Authoritative mapping component → tokens. Reflects the current lib state (post border-subtle migration).">

            {[
              {
                label: "Structure — surfaces, strokes, rhythm",
                rows: [
                  ["Page bg", "—", ["--bg"]],
                  ["Card bg — books", "default", ["--card"]],
                  ["Card bg — quote/dict", "default", ["--bg2"]],
                  ["Component stroke", "default", ["1.5px", "--border-subtle"]],
                  ["Divider line", "—", ["1px", "--border-subtle"]],
                  ["Strong stroke — spinner/dropzone", "—", ["2px", "--border"]],
                  ["Main-wrap gap", "—", ["48px"]],
                  ["Section gap — .books-section, .quotes-section, .dictionary-saved-section", "—", ["16px"]],
                ],
              },
              {
                label: "Buttons",
                rows: [
                  ["Primary CTA (.add-btn, .empty-cta, .panel-move-btn)", "default", ["bg --primary-50", "color #fff", "weight 600"]],
                  ["Primary CTA", "hover", ["bg --primary-60"]],
                  ["Primary CTA", "active", ["bg --primary-70"]],
                  ["Outline (.edit-btn, .dropdown-btn, .modal-cancel…)", "default", ["1.5px --border-subtle", "bg #FFFFFF (light)", "color --text"]],
                  ["Outline", "hover", ["border --primary-50", "bg --primary-5", "color --primary-50"]],
                  ["Destructive icon (.delete-row-btn, .dictionary-delete-btn)", "default", ["bg --primary-5", "color --primary-60", "40×40"]],
                  ["Destructive icon", "hover", ["bg --primary-10"]],
                  ["Destructive icon", "active", ["bg --primary-20", "color --primary-70"]],
                  ["Destructive icon", "dark default", ["bg --primary-90", "color --primary-30"]],
                  ["Destructive icon", "dark hover", ["bg --primary-80"]],
                ],
              },
              {
                label: "Inputs — common state rules",
                rows: [
                  ["All inputs", "default", ["1.5px --border-subtle (or transparent for bg3 variants)", "bg varies per variant"]],
                  ["All inputs", "hover", ["1.5px --primary-50", "bg --primary-5"]],
                  ["All inputs", "focus", ["1.5px --primary-50", "bg --primary-5", "ring 0 0 0 3px --primary-20"]],
                  ["All inputs", "dark hover/focus", ["border --primary-40", "bg rgba(73,89,230,0.10)", "ring rgba(73,89,230,0.2)"]],
                ],
              },
              {
                label: "Cards & Chips",
                rows: [
                  ["Book card", "default", ["--card", "1.5px --border-subtle"]],
                  ["Book card", "hover", ["border --primary-50", "bg --primary-5", "translateY(-2px)", "shadow"]],
                  ["Quote card", "default", ["--bg2", "1.5px --border-subtle", "padding 20 · gap 20"]],
                  ["Quote card", "hover", ["border --primary-50", "translateY(-2px)", "shadow (no bg change)"]],
                  ["Dictionary saved card", "default", ["--bg2", "1.5px --border-subtle"]],
                  ["Dictionary saved card", "hover (card)", ["border --primary-50", "translateY(-2px)", "shadow — body stays on --bg2"]],
                  ["Dictionary saved head", "hover", ["bg --primary-5"]],
                  ["Dictionary result", "default", ["--bg2", "1.5px --border-subtle"]],
                  ["BookChip — base (QuotePanel, AddQuoteModal)", "default", ["bg --bg3"]],
                  ["BookChip — base", "hover (interactive)", ["bg --primary-5"]],
                  ["BookChip inside .quote-card", "default", ["bg --primary-5"]],
                  ["BookChip inside .quote-card", "hover (interactive)", ["bg --primary-10"]],
                ],
              },
              {
                label: "Navigation & Panels",
                rows: [
                  ["Sidebar nav item", "default", ["bg transparent", "color --text-2"]],
                  ["Sidebar nav item", "hover", ["bg --primary-5", "color --primary-50"]],
                  ["Sidebar nav item", "active", ["bg --primary-10", "color --primary"]],
                  ["Sidebar badge", "default", ["bg --primary-10", "color --primary-50"]],
                  ["Sidebar badge", "on active item", ["bg --primary", "color #fff"]],
                  ["Tab (Library / Wishlist)", "inactive", ["color --text-2", "weight 500"]],
                  ["Tab", "active", ["bg --bg", "color --text", "weight 600", "shadow"]],
                  ["Panel drawer (.book-panel)", "—", ["bg rgba(255,255,255,0.95)", "backdrop-filter: blur(24px)", "border-left 1px --border-subtle"]],
                  ["Panel inner (.panel-inner)", "—", ["padding 96/32/32", "flex col, align-items: center", "gap 24"]],
                  ["Panel main (.panel-main)", "—", ["flex col, gap 24", "width 100%"]],
                  ["Panel cover (.panel-cover-wrap)", "—", ["align-self: center", "margin-bottom 36 (total 60 to info)"]],
                  ["Panel info (.panel-info)", "—", ["flex col, gap 24"]],
                  ["Panel byline (.panel-byline)", "—", ["flex col, gap 8", "groups author + meta tight"]],
                  ["Panel section (.panel-section)", "—", ["width 100%", "eyebrow margin-bottom 12 handles inner spacing"]],
                  ["Panel divider (.panel-divider)", "—", ["1px --border-subtle", "width 100%", "canonical — shared by Book + Quote panels"]],
                  ["Panel quotes (.panel-quotes)", "—", ["flex col, gap 16", "width 100%"]],
                  ["Panel actions (.panel-actions)", "—", ["flex row, justify-between"]],
                  ["Import tab — Photo active", "—", ["indicator gradient #F67BF8 → #4959E6", "weight 600"]],
                  ["Import tab — File/Manual active", "—", ["indicator --primary-50", "weight 600"]],
                ],
              },
            ].map(({ label, rows }) => (
              <div className="ds-card" key={label}>
                <div className="ds-card-head">{label}</div>
                <div className="ds-card-body col">
                  <table className="token-table">
                    <thead className="table-head">
                      <tr><th>Component</th><th>State</th><th>Tokens / specs</th></tr>
                    </thead>
                    <tbody className="table-body">
                      {rows.map(([comp, state, tokens], i) => (
                        <tr className="table-row" key={comp + state + i}>
                          <td className="token-table-component">{comp}</td>
                          <td style={{ color: "var(--text-3)", fontSize: 12 }}>{state}</td>
                          <td>{tokens.map((t, j) => <span key={t + j} className="ds-token-chip">{t}</span>)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </DSSection>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
