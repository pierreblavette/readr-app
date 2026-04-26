"use client";
import "./ds.css";
import "../library/library.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV = {
  Foundations: ["logo","colors","typography","highlight","spacing","shadows","strokes"],
  Components:  ["autocomplete","badges","book-chip","btn-states","buttons","checkbox","dropdown","export-menu","inputs","lang-switcher","segmented","sort-menu","theme-toggle","view-toggle"],
  Patterns:    ["card","quote-card","dictionary-card","list","sidebar","panel","quote-panel","modal","delete-modal","upload-box","selection-bar","empty","footer"],
  Reference:   ["token-usage"],
};
const NAV_LABELS = {
  "logo":"Logo","colors":"Colors","typography":"Typography","highlight":"Hand-drawn Highlight",
  "spacing":"Spacing","shadows":"Shadows & Radius","strokes":"Strokes & Borders",
  "buttons":"Buttons","btn-states":"Button States","dropdown":"Dropdown Menu",
  "inputs":"Inputs","segmented":"Segmented Control","view-toggle":"View Toggle","badges":"Badges & Pills",
  "checkbox":"Checkbox","autocomplete":"Autocomplete","lang-switcher":"Language Switcher",
  "theme-toggle":"Theme Toggle","book-chip":"Book Chip","export-menu":"Export Menu","sort-menu":"Sort Menu",
  "card":"Book Card","quote-card":"Quote Card","dictionary-card":"Dictionary Card",
  "list":"List View","sidebar":"Sidebar","panel":"Side Panel","quote-panel":"Quote Panel",
  "modal":"Modal","delete-modal":"Delete Modal","upload-box":"Upload Box","selection-bar":"Selection Bar","empty":"Empty State","footer":"Footer",
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
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.3 });
    Object.values(NAV).flat().forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const [tabActive, setTabActive]           = useState("Library");
  const [viewActive, setViewActive]         = useState("grid");
  const [langActive, setLangActive]         = useState("EN");
  const [importTab, setImportTab]           = useState("photo");
  const [chk1, setChk1]                     = useState(false);
  const [chk2, setChk2]                     = useState(true);

  function UploadBoxDemo({ state, variant }) {
    const ref = useRef(null);
    const [dims, setDims] = useState({ w: 0, h: 0 });
    useEffect(() => {
      if (!ref.current) return;
      setDims({ w: ref.current.offsetWidth, h: ref.current.offsetHeight });
    }, [state]);
    return (
      <div ref={ref} className="import-dropzone import-dropzone-photo" style={{ cursor: "default", width: "40%" }}>
        {dims.w > 0 && (
          <svg className="photo-dropzone-border" width={dims.w} height={dims.h} aria-hidden="true">
            <defs>
              <linearGradient id="dsGradBorder" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#F67BF8"/>
                <stop offset="62%" stopColor="#4959E6"/>
              </linearGradient>
            </defs>
            <rect x="1" y="1" width={dims.w - 2} height={dims.h - 2} rx="9" fill="none"
              stroke="url(#dsGradBorder)" strokeWidth="2" strokeDasharray="6 4"/>
          </svg>
        )}
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
      </div>
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
          {label}
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

  function SectionTitle({ title, sub }) {
    return (
      <>
        <h2 className="ds-section-title">{title}</h2>
        {sub && <p className="ds-section-sub">{sub}</p>}
        <div className="ds-divider" />
      </>
    );
  }

  function DSCard({ label, children, tokens }) {
    return (
      <div className="ds-card">
        {label && <div className="ds-card-label">{label}</div>}
        <div className="ds-card-body">{children}</div>
        {tokens && (
          <div className="ds-tokens">
            <span className="ds-tokens-label">Tokens</span>
            {tokens.map(t => <span key={t} className="ds-token-chip">{t}</span>)}
          </div>
        )}
      </div>
    );
  }

  function ColorSwatch({ bg, title, token, light, dark }) {
    return (
      <div className="color-swatch">
        <div className="color-swatch-block" style={{ background: bg, borderBottom: "1px solid var(--border)" }} />
        <div className="color-swatch-info">
          <div className="color-swatch-title">{title}</div>
          <div className="ds-token-name">{token}</div>
          {light && <div className="ds-token-val">{light}</div>}
          {dark  && <div className="ds-token-val">{dark}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* HEADER */}
      <header className="ds-header">
        <div className="ds-header-inner">
          <Link href="/" className="ds-logo">
            readr<span className="ds-logo-sep">/</span>
            <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 400, fontSize: "0.857rem", color: "var(--text-3)" }}>Design System</span>
          </Link>
          <button className="theme-btn-ds" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} title="Theme">
            <span className="toggle-thumb-ds">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </span>
          </button>
        </div>
      </header>

      <div className="ds-wrap">
        {/* SIDEBAR */}
        <nav className="ds-nav">
          {Object.entries(NAV).map(([section, ids]) => (
            <div key={section}>
              <div className="ds-nav-section">{section}</div>
              {ids.map(id => (
                <button key={id} className={`ds-nav-link${active === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
                  {NAV_LABELS[id]}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* CONTENT */}
        <main className="ds-content">

          {/* INTRO */}
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>Design System v1</p>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 16, fontFamily: "var(--font-jakarta)" }}>Design System</h1>
            <p style={{ fontSize: "1rem", color: "var(--text-2)", maxWidth: 480, lineHeight: 1.65 }}>
              Complete reference for tokens, components and patterns. Native light/dark themes via <code style={{ fontSize: "0.857rem", background: "var(--bg3)", padding: "2px 6px", borderRadius: 4 }}>data-theme</code>.
            </p>
          </div>

          {/* ── LOGO ── */}
          <section className="ds-section" id="logo">
            <SectionTitle title="Logo" sub="Wordmark only — Fraunces Regular. No icon, no bold version, no font substitution." />
            <div className="ds-card">
              <div className="ds-card-label">Contextes d'utilisation</div>
              <div className="ds-card-body col">
                <div className="logo-bg-row">
                  {[["logo-bg-page","#1B1B1B"],["logo-bg-white","#1B1B1B"],["logo-bg-dark","#ffffff"],["logo-bg-accent","#ffffff"]].map(([cls,col],i) => (
                    <div key={i} className={`logo-bg ${cls}`}>
                      <span className="logo-wordmark" style={{ fontSize: 24, color: col }}>readr</span>
                    </div>
                  ))}
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
              <div className="ds-card-label">Sizes</div>
              <div className="ds-card-body col" style={{ padding: "0 24px", gap: 0 }}>
                {[[40,"display / splash screen"],[28,"page header"],[24,"nav (reference size)"],[14,"footer / minimum size"]].map(([sz, use]) => (
                  <div key={sz} className="type-sample">
                    <span className="logo-wordmark" style={{ fontSize: sz, color: "var(--text)" }}>readr</span>
                    <div className="type-meta">{sz}px · {use}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Usage rules</div>
              <div className="ds-card-body col" style={{ gap: 8 }}>
                <p style={{ fontSize: "0.857rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  Always lowercase — <strong>readr</strong>, never <em>Readr</em> or <em>READR</em>. Do not modify the font, weight or letter-spacing. Minimum size: 14px. On colored backgrounds, use white only (#FFFFFF).
                </p>
              </div>
            </div>
          </section>

          {/* ── COLORS ── */}
          <section className="ds-section" id="colors">
            <SectionTitle title="Colors" sub="CSS tokens defined on :root and [data-theme='dark']" />

            <p className="color-section-label">Surfaces</p>
            <div className="color-grid">
              <ColorSwatch bg="var(--bg)" title="Page" token="--bg" light="#FEFEFF" dark="#0F0F0F" />
              <ColorSwatch bg="var(--bg3)" title="Subtle" token="--bg3" light="#F7F7F7" dark="#1A1A1A" />
              <ColorSwatch bg="var(--card)" title="Card" token="--card" light="#FFFFFF" dark="#1E1E1E" />
            </div>

            <p className="color-section-label">Strokes</p>
            <div className="color-grid">
              <ColorSwatch bg="var(--border-subtle)" title="Subtle" token="--border-subtle" light="#EFEFEF" dark="#2E2E2E" />
              <ColorSwatch bg="var(--border)" title="Strong" token="--border" light="#E0E0E0" dark="#2E2E2E" />
            </div>
            <div className="ds-card" style={{ marginBottom: 24 }}>
              <div className="ds-card-body col" style={{ gap: 8 }}>
                <p style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  <strong>--border-subtle</strong> — default stroke for all components (buttons, inputs, cards, containers) and most dividers (row separators, section separators). 1.5px on components, 1px on dividers.
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  <strong>--border</strong> — reserved for stronger visual affordances where a subtle stroke isn't enough : <code>.panel-spinner</code> ring (2px), <code>.import-dropzone</code> dashed border (2px), <code>.ob-dot</code> background. Do not use for regular component strokes.
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-3)", lineHeight: 1.7 }}>
                  In dark mode both tokens resolve to <code>#2E2E2E</code> — divergence exists only in light mode.
                </p>
              </div>
            </div>

            <p className="color-section-label">Accent</p>
            <div className="color-grid">
              <ColorSwatch bg="var(--accent)" title="Primary" token="--accent / --primary-50" light="#4959E6" dark="#7B89F8" />
              <ColorSwatch bg="var(--accent-bg)" title="Primary Subtle" token="--accent-bg" light="rgba(73,89,230,.08)" />
              <ColorSwatch bg="linear-gradient(135deg,var(--ai-from),var(--ai-to))" title="AI Gradient" token="--ai-from / --ai-to" light="#F67BF8 → #4959E6" dark="→ #7B89F8" />
              <ColorSwatch bg="var(--teal)" title="Secondary" token="--teal" light="#00A699" dark="#00C9BE" />
              <ColorSwatch bg="var(--teal-bg)" title="Secondary Subtle" token="--teal-bg" light="rgba(0,166,153,.08)" />
            </div>

            <p className="color-section-label">Text</p>
            <div className="color-grid">
              <ColorSwatch bg="var(--text)" title="Default" token="--text" light="#222" dark="#F0F0F0" />
              <ColorSwatch bg="var(--text-2)" title="Secondary" token="--text-2" light="#555" dark="#909090" />
              <ColorSwatch bg="var(--text-3)" title="Muted" token="--text-3" light="#777" dark="#555" />
            </div>

            <p className="palette-section-label">Primary scale</p>
            <div className="palette-grid">
              {[["5","#F4F5FF"],["10","#E8EAFD"],["20","#C1C7FB"],["30","#9BA5F8"],["40","#6F7CF2"],["50★","#4959E6"],["60","#3646D4"],["70","#2836B8"],["80","#1D268A"],["90","#131860"],["100","#0C0F38"]].map(([step,hex]) => (
                <div key={step} className="palette-chip">
                  <div className={`palette-chip-swatch${step==="50★"?" anchor":""}`} style={{ background: `var(--primary-${step.replace("★","")})` }} />
                  <div className="palette-chip-meta">
                    <span className="palette-chip-step">{step}</span>
                    <span className="palette-chip-hex">{hex}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-3)", fontFamily: "monospace", marginBottom: 28, marginTop: 2 }}>--primary-N · ★ anchor = --accent (#4959E6)</div>

            <p className="palette-section-label">Neutrals — Dark (tinted primary)</p>
            <div className="palette-grid on-white">
              {["5","10","20","30","40","50","60","70","80","90","100"].map(n => (
                <div key={n} className="palette-chip">
                  <div className="palette-chip-swatch" style={{ background: `var(--dark-${n})` }} />
                  <div className="palette-chip-meta">
                    <span className="palette-chip-step">{n}</span>
                    <span className="palette-chip-hex">{n==="100"?"#0D0F1A":`${n}%`}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-3)", fontFamily: "monospace", marginBottom: 28, marginTop: 2 }}>--dark-N · base #0D0F1A</div>

            <p className="palette-section-label">Neutrals — Light (tinted primary)</p>
            <div className="palette-grid on-dark-bg">
              {["5","10","20","30","40","50","60","70","80","90","100"].map(n => (
                <div key={n} className="palette-chip">
                  <div className="palette-chip-swatch" style={{ background: `var(--light-${n})` }} />
                  <div className="palette-chip-meta">
                    <span className="palette-chip-step">{n}</span>
                    <span className="palette-chip-hex">{n==="100"?"#F5F6FF":`${n}%`}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-3)", fontFamily: "monospace", marginBottom: 8, marginTop: 2 }}>--light-N · base #F5F6FF</div>

            <p className="color-section-label" style={{ marginTop: 48 }}>Hand-drawn highlight — couleurs landing</p>
            <p style={{ fontSize: "0.857rem", color: "var(--text-3)", marginBottom: 20, marginTop: -6 }}>Colors reserved for the SVG wave effect on headings. Primary use: landing page.</p>
            <div className="color-grid">
              {[["#4959E6","Primary"],["#9DCCFA","Sky"],["#FE7E4E","Coral"],["#FFCEE3","Pink"],["#FFE92D","Yellow"],["#9EEB97","Mint"]].map(([hex,name]) => (
                <div key={hex} className="color-swatch">
                  <div className="color-swatch-block" style={{ background: hex }} />
                  <div className="color-swatch-info">
                    <div className="color-swatch-title">{name}</div>
                    <div className="ds-token-name" style={{ marginTop: 0, fontFamily: "monospace" }}>{hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TYPOGRAPHY ── */}
          <section className="ds-section" id="typography">
            <SectionTitle title="Typography" sub="Base : 14px — 1rem = 14px" />
            <div className="ds-card">
              <div className="ds-card-label">Plus Jakarta Sans</div>
              <div className="ds-card-body col" style={{ padding: "0 24px", gap: 0 }}>
                {[
                  [48, "3.43rem", "800", "Page title"],
                  [21, "1.5rem",  "800", "Section title"],
                  [18, "1.29rem", "700", "Empty state title"],
                  [15, "1.07rem", "600", "Buttons / inputs"],
                  [14, "1rem",    "700", "Card titles"],
                  [14, "1rem",    "600", "Active buttons, tab state"],
                  [14, "1rem",    "500", "Body, author/year"],
                  [12, "0.86rem", "700", "Uppercase labels, table headers"],
                  [12, "0.86rem", "500", "Field labels, secondary text"],
                  [11, "0.79rem", "700", "Micro-labels uppercase"],
                  [10, "0.71rem", "700", "Token labels, small caps"],
                ].map(([px, rem, weight, use]) => (
                  <div key={use + px} className="type-sample">
                    <div className="type-sample-preview">
                      <div style={{ fontSize: px, fontWeight: weight, lineHeight: 1.2 }}>{use}</div>
                    </div>
                    <div className="type-sample-meta">{rem} · {px}px · {weight}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Fraunces</div>
              <div className="ds-card-body col" style={{ padding: "0 24px", gap: 0 }}>
                {[
                  [48, "3.43rem", "500", "Heading display"],
                  [36, "2.57rem", "300", "Heading XL"],
                  [24, "1.71rem", "500", "Heading LG"],
                  [19, "1.36rem", "400", "Logo nav"],
                  [14, "1rem",    "400", "Logo footer / minimum"],
                ].map(([px, rem, weight, use]) => (
                  <div key={use} className="type-sample">
                    <div className="type-sample-preview">
                      <div style={{ fontSize: px, fontWeight: weight, fontFamily: "var(--font-fraunces), serif", lineHeight: 1.2 }}>{use}</div>
                    </div>
                    <div className="type-sample-meta">{rem} · {px}px · {weight}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── HAND-DRAWN HIGHLIGHT ── */}
          <section className="ds-section" id="highlight">
            <SectionTitle title="Hand-drawn Highlight" sub="Animated SVG effect on headings. Stroke-width 2.8, draw-wave animation." />
            <div className="ds-card">
              <div className="ds-card-label">Variantes couleur</div>
              <div className="ds-card-body col" style={{ padding: "0 24px", gap: 0 }}>
                {[
                  ["#4959E6","Primary","font-size:2rem;font-weight:800"],
                  ["#9DCCFA","Sky","font-size:2rem;font-weight:800"],
                  ["#FE7E4E","Coral","font-size:2rem;font-weight:800"],
                  ["#FFCEE3","Pink","font-size:2rem;font-weight:800"],
                  ["#FFE92D","Yellow","font-size:2rem;font-weight:800"],
                  ["#9EEB97","Mint","font-size:2rem;font-weight:800"],
                ].map(([color,name]) => (
                  <div key={name} className="hl-demo-row">
                    <span className="hl" style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-fraunces),serif" }}>
                      highlight
                      <svg className="wave" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q25 0 50 5 Q75 10 100 5" stroke={color} />
                      </svg>
                    </span>
                    <span className="hl-chip">
                      <span className="hl-chip-dot" style={{ background: color }} />
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SPACING ── */}
          <section className="ds-section" id="spacing">
            <SectionTitle title="Spacing" sub="4px base scale. Main values used across the interface." />
            <div className="ds-card">
              <div className="ds-card-label">Scale</div>
              <div className="ds-card-body col" style={{ padding: "0 24px", gap: 0 }}>
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
              <div className="ds-card-label">Page rhythm — applied scale</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>Container</th><th>Gap</th><th>Separates</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="token-table-component"><code>.main-wrap</code></td>
                      <td style={{ fontFamily: "monospace" }}>48px</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>Top-level page blocks — page-title, search-row, content section</td>
                    </tr>
                    <tr>
                      <td className="token-table-component"><code>.dictionary-wrap</code></td>
                      <td style={{ fontFamily: "monospace" }}>48px</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>Mirrors <code>.main-wrap</code> — between lookup form and saved section</td>
                    </tr>
                    <tr>
                      <td className="token-table-component"><code>.books-section</code><br /><code>.quotes-section</code><br /><code>.dictionary-saved-section</code></td>
                      <td style={{ fontFamily: "monospace" }}>16px</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>Internal sub-header (eyebrow / result-line) → content list</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Two-tier rhythm: <strong>48px</strong> between major page blocks, <strong>16px</strong> inside a section. Keeps breathing at the top while densifying list content.
                </div>
              </div>
            </div>
          </section>

          {/* ── SHADOWS & RADIUS ── */}
          <section className="ds-section" id="shadows">
            <SectionTitle title="Shadows & Radius" />
            <div className="ds-card">
              <div className="ds-card-label">Shadows</div>
              <div className="ds-card-body" style={{ gap: 24 }}>
                {[
                  ["shadow-sm","Cartes au repos","var(--shadow-sm)"],
                  ["shadow-md","Dropdowns, tooltips","var(--shadow-md)"],
                  ["shadow-lg","Modales, panels","var(--shadow-lg)"],
                ].map(([token, use, val]) => (
                  <div key={token} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 120, height: 64, borderRadius: 8, background: "var(--card)", boxShadow: val === "var(--shadow-sm)" ? "var(--shadow-sm)" : val === "var(--shadow-md)" ? "var(--shadow-md)" : "var(--shadow-lg)" }} />
                    <div className="ds-token-name" style={{ textAlign: "center" }}>--{token}</div>
                    <div className="ds-token-val" style={{ textAlign: "center" }}>{use}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Border Radius</div>
              <div className="ds-card-body" style={{ gap: 24, flexWrap: "wrap" }}>
                {[[6,"6px","Buttons SM"],[8,"8px (--radius)","Default"],[10,"10px","Dropzone"],[12,"12px","Card states"],[16,"16px","Large modals"],[32,"32px","Pills, search"]].map(([r, label, use]) => (
                  <div key={r} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: r, background: "var(--primary-5)", border: "1.5px solid var(--primary-20)" }} />
                    <div className="ds-token-name" style={{ textAlign: "center" }}>{label}</div>
                    <div className="ds-token-val" style={{ textAlign: "center" }}>{use}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── STROKES & BORDERS ── */}
          <section className="ds-section" id="strokes">
            <SectionTitle title="Strokes & Borders" sub="Canonical rules for borders across components, cards, inputs and dividers." />

            <div className="ds-card">
              <div className="ds-card-label">Weight × Token</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>Context</th><th>Weight</th><th>Color token</th><th>Applied via</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="token-table-component">Component strokes<br /><span style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>buttons, inputs, cards, containers</span></td>
                      <td style={{ fontFamily: "monospace" }}>1.5px</td>
                      <td><span className="ds-token-chip">--border-subtle</span></td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>border: 1.5px solid var(--border-subtle)</td>
                    </tr>
                    <tr>
                      <td className="token-table-component">Dividers<br /><span style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>row separators, section lines</span></td>
                      <td style={{ fontFamily: "monospace" }}>1px</td>
                      <td><span className="ds-token-chip">--border-subtle</span></td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>border-top/bottom: 1px solid var(--border-subtle)</td>
                    </tr>
                    <tr>
                      <td className="token-table-component">Strong affordances<br /><span style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>spinner, dropzone</span></td>
                      <td style={{ fontFamily: "monospace" }}>2px</td>
                      <td><span className="ds-token-chip">--border</span></td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>border: 2px {`{solid|dashed}`} var(--border)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Visual samples</div>
              <div className="ds-card-body" style={{ gap: 24, flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 96, height: 64, borderRadius: 8, background: "var(--card)", border: "1.5px solid var(--border-subtle)" }} />
                  <div className="ds-token-name" style={{ textAlign: "center" }}>Component 1.5px</div>
                  <div className="ds-token-val" style={{ textAlign: "center" }}>--border-subtle</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 96, height: 64, borderRadius: 0, borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "transparent" }} />
                  <div className="ds-token-name" style={{ textAlign: "center" }}>Divider 1px</div>
                  <div className="ds-token-val" style={{ textAlign: "center" }}>--border-subtle</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 96, height: 64, borderRadius: 8, background: "var(--card)", border: "2px solid var(--border)" }} />
                  <div className="ds-token-name" style={{ textAlign: "center" }}>Strong 2px</div>
                  <div className="ds-token-val" style={{ textAlign: "center" }}>--border</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 96, height: 64, borderRadius: 8, background: "var(--card)", border: "2px dashed var(--border)" }} />
                  <div className="ds-token-name" style={{ textAlign: "center" }}>Dropzone 2px</div>
                  <div className="ds-token-val" style={{ textAlign: "center" }}>--border dashed</div>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Stroke position — inside</div>
              <div className="ds-card-body col" style={{ gap: 8 }}>
                <p style={{ fontSize: "0.857rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  All strokes are rendered <strong>inside</strong> the declared size (equivalent to Figma's "Inside" stroke). This is enforced globally by Tailwind's <code>box-sizing: border-box</code> reset — the stroke eats into the content area without enlarging the element.
                </p>
                <p style={{ fontSize: "0.857rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  <strong>Exception — stretch containers</strong>: when a container wraps flex children of a fixed pixel height (e.g. <code>.view-btns</code> wrapping two 40px buttons), a standard <code>border</code> adds <code>2 × weight</code> to the container's natural height. Use <code>outline</code> with negative offset instead:
                </p>
                <pre style={{ fontFamily: "monospace", fontSize: "0.75rem", background: "var(--bg3)", padding: "12px 14px", borderRadius: 6, color: "var(--text)", lineHeight: 1.6, margin: 0 }}>
{`.view-btns {
  height: 40px;
  outline: 1.5px solid var(--border-subtle);
  outline-offset: -1.5px;
  border-radius: 8px;
  overflow: hidden;
}`}
                </pre>
                <p style={{ fontSize: "0.82rem", color: "var(--text-3)", lineHeight: 1.7 }}>
                  <code>outline</code> is painted outside the element by default ; a negative offset pulls it back inside, over the children. Doesn't consume layout space. Respects <code>border-radius</code> in modern browsers.
                </p>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Why two tokens ?</div>
              <div className="ds-card-body col" style={{ gap: 8 }}>
                <p style={{ fontSize: "0.857rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  <strong>Light mode</strong> : <code>--border-subtle</code> (#EFEFEF) keeps the component frames airy without feeling heavy on large surfaces like cards. <code>--border</code> (#E0E0E0) is reserved for affordances that need stronger contrast (dashed dropzones, spinner rings) where a subtle stroke would disappear.
                </p>
                <p style={{ fontSize: "0.857rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  <strong>Dark mode</strong> : both tokens collapse to <code>#2E2E2E</code>. The light/dark distinction is intentional — dark backgrounds don't need two stroke strengths.
                </p>
              </div>
            </div>
          </section>

          {/* ── BUTTONS ── */}
          <section className="ds-section" id="buttons">
            <SectionTitle title="Buttons" sub="Canonical .btn.btn-* system + named component classes (library.css). Font-weight 600 across all." />
            <div className="ds-card">
              <div className="ds-card-label">Canonical → Named class mapping</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>Role</th><th>Canonical</th><th>Named classes used in app</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ["Primary CTA", "btn-primary btn-md", [".add-btn", ".empty-cta", ".panel-quotes-add", ".panel-move-btn"]],
                      ["Outline (default)", "btn-outline btn-md", [".edit-btn", ".export-btn", ".modal-cancel", ".panel-delete-btn", ".import-change-file", ".quote-photo-btn", ".col-delete-btn"]],
                      ["Destructive icon", "(no canonical)", [".delete-row-btn", ".dictionary-delete-btn"]],
                      ["Icon toggle", "btn-icon btn-md", [".view-btn", ".col-emoji-btn"]],
                      ["Text / ghost link", "btn-ghost", [".footer-link", ".quote-see-more"]],
                      ["Sidebar (on dark bg)", "(contextual)", [".sel-btn", ".sel-confirm", ".sel-cancel", ".sel-select-all"]],
                    ].map(([role, canon, classes]) => (
                      <tr key={role}>
                        <td className="token-table-component">{role}</td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text-2)" }}>{canon}</td>
                        <td>{classes.map(c => <span key={c} className="ds-token-chip" style={{ fontFamily: "monospace" }}>{c}</span>)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Variantes — taille MD</div>
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
              <div className="ds-card-label">Tailles — variante Primary</div>
              <div className="ds-card-body" style={{ alignItems: "center", flexWrap: "wrap" }}>
                {[["btn-xs","XS"],["btn-sm","SM"],["btn-md","MD"],["btn-lg","LG"],["btn-xl","XL"]].map(([sz,label]) => (
                  <button key={sz} className={`btn btn-primary ${sz}`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Anatomy</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="btn-scale-table">
                  <thead>
                    <tr><th>Size</th><th>Height</th><th>Padding (h)</th><th>Radius</th><th>Font</th><th>Gap</th><th>Icon-only</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ["XS", "24", "8", "6", "11", "4", "24×24 · svg 12"],
                      ["SM", "32", "16", "7", "12", "6", "32×32 · svg 14"],
                      ["MD ★", "40", "20", "8", "14", "8", "40×40 · svg 18"],
                      ["LG", "48", "24", "8", "14", "8", "48×48 · svg 20"],
                      ["XL", "56", "28", "8", "15", "10", "—"],
                    ].map(([sz, h, p, r, f, g, io]) => (
                      <tr key={sz}>
                        <td className="btn-scale-size">{sz}</td>
                        <td>{h}px</td>
                        <td>0 {p}px</td>
                        <td>{r}px</td>
                        <td>{f}px</td>
                        <td>{g}px</td>
                        <td style={{ color: "var(--text-3)", fontSize: "0.75rem" }}>{io}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  ★ Default size used across the app. Outline buttons: stroke <code>1.5px</code> inside (box-sizing: border-box). Icon destructive (.delete-row-btn) uses fill <code>--primary-5</code> default, <code>--primary-10</code> hover.
                </div>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Icon buttons — Solid & Icon</div>
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
              <div className="ds-card-label">Icon + Text — toutes variantes, taille MD</div>
              <div className="ds-card-body" style={{ alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                {[
                  ["btn-primary",  "Add"],
                  ["btn-secondary","Edit"],
                  ["btn-ghost",    "Export"],
                  ["btn-outline",  "Filter"],
                  ["btn-critical", "Delete"],
                ].map(([variant, label]) => (
                  <button key={variant} className={`btn ${variant} btn-md`} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="15" height="15">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Icon + Text — tailles, variante Primary</div>
              <div className="ds-card-body" style={{ alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                {[["btn-xs","XS"],["btn-sm","SM"],["btn-md","MD"],["btn-lg","LG"],["btn-xl","XL"]].map(([sz, label]) => (
                  <button key={sz} className={`btn btn-primary ${sz}`} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── BUTTON STATES ── */}
          <section className="ds-section" id="btn-states">
            <SectionTitle title="Button States" sub="Default · Hover · Active · Focus · Disabled" />
            <div className="states-grid">
              {[
                { name:"Primary", variant:"btn-primary" },
                { name:"Secondary", variant:"btn-secondary" },
                { name:"Ghost", variant:"btn-ghost" },
                { name:"Outline", variant:"btn-outline" },
                { name:"Critical", variant:"btn-critical" },
              ].map(({ name, variant }) => (
                <div key={name} className="states-variant-card">
                  <div className="states-variant-header"><span className="states-variant-name">{name}</span></div>
                  <div className="states-row">
                    {[
                      ["Default",""],
                      ["Hover","is-hover"],
                      ["Active","is-active"],
                      ["Focus","is-focus"],
                      ["Disabled",""],
                    ].map(([state, mod]) => (
                      <div key={state} className="states-cell">
                        <button className={`btn ${variant} btn-md${mod ? " "+mod : ""}`} disabled={state==="Disabled"}>
                          {name}
                        </button>
                        <span className="states-content-label">{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── DROPDOWN ── */}
          <section className="ds-section" id="dropdown">
            <SectionTitle title="Dropdown Menu" sub="Bouton outline + chevron rotatif · Menu animé spring · Dark mode complet" />
            <div className="ds-card">
              <div className="ds-card-label">Exemples</div>
              <div className="ds-card-body" style={{ alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
                <DropdownDemo label="Export" items={["json", "pdf"]} />
                <DropdownDemo label="Options" items={["renommer", "dupliquer", "supprimer"]} />
                <DropdownDemo label="Trier par" items={["titre", "auteur", "année"]} />
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Anatomie</div>
              <div className="ds-card-body" style={{ flexDirection: "column", gap: 8, fontSize: "0.82rem", color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>
                <span><strong>.dropdown-wrap</strong> — position: relative, conteneur</span>
                <span><strong>button.btn.btn-outline</strong> — trigger, avec chevron SVG rotatif sur open</span>
                <span><strong>.dropdown-menu</strong> — absolute, top: 100%+6px, right: 0, animation dropdownIn</span>
                <span><strong>.dropdown-item</strong> — flex row, gap 8, padding 8/12, border-radius 7px</span>
              </div>
            </div>
          </section>

          {/* ── EXPORT MENU ── */}
          <section className="ds-section" id="export-menu">
            <SectionTitle title="Export Menu" sub="Dropdown specialized for exports — PDF, Markdown, JSON. Used in Library, Quotes, Dictionary." />
            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
              <div className="ds-card-body">
                <DropdownDemo label="Export" items={["pdf", "md", "json"]} />
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Props</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Prop</th><th>Type</th><th>Effect</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>exportPDF</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>() =&gt; void</td><td style={{ fontSize: "0.82rem" }}>Shows <code>pdf</code> item. Omit to hide.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>exportMD</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>() =&gt; void</td><td style={{ fontSize: "0.82rem" }}>Shows <code>md</code> item. Omit to hide.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>exportData</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>() =&gt; void</td><td style={{ fontSize: "0.82rem" }}>Shows <code>json</code> item (raw data). Omit to hide.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>disabled</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>boolean</td><td style={{ fontSize: "0.82rem" }}>Disables the trigger button (list empty cases).</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>t</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>i18n object</td><td style={{ fontSize: "0.82rem" }}>Reads <code>t.btnExport</code> for the trigger label.</td></tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Source: <code>components/library/ExportMenu.js</code>. Trigger class: <code>.export-btn</code>. Menu reuses the generic <code>.dropdown-menu</code>.
                </div>
              </div>
            </div>
          </section>

          {/* ── SORT MENU ── */}
          <section className="ds-section" id="sort-menu">
            <SectionTitle title="Sort Menu" sub="Generic sort dropdown — current selection shown inline, options passed as array. Used in Quotes and Dictionary lists." />
            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
              <div className="ds-card-body">
                <DropdownDemo label="Recent" items={["Recent", "A–Z"]} />
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Props</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Prop</th><th>Type</th><th>Effect</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>current</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>string</td><td style={{ fontSize: "0.82rem" }}>Key of the active option. Trigger label reflects its label.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>onChange</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>(key) =&gt; void</td><td style={{ fontSize: "0.82rem" }}>Fires with the selected option key.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>options</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{"{ key, label }[]"}</td><td style={{ fontSize: "0.82rem" }}>Options list. Selected one gets a checkmark icon.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>ariaLabel</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>string</td><td style={{ fontSize: "0.82rem" }}>Accessibility label for the trigger button.</td></tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Source: <code>components/library/SortMenu.js</code>. Trigger class: <code>.export-btn.sort-menu-btn</code> (shares the outline button anatomy).
                </div>
              </div>
            </div>
          </section>

          {/* ── INPUTS ── */}
          <section className="ds-section" id="inputs">
            <SectionTitle title="Inputs" sub="5 variants — all 40px height, font-size 14px, weight 600. Hover/focus share the same primary tint + ring." />

            <div className="ds-card">
              <div className="ds-card-label">Variants overview</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>Class</th><th>Used in</th><th>Padding</th><th>Radius</th><th>Default bg</th><th>Default border</th></tr>
                  </thead>
                  <tbody>
                    {[
                      [".search-input", "Search bars (Library, Quotes, Dictionary)", "0 34 0 38", "32", "#FFFFFF", "1.5px --border-subtle"],
                      [".modal-field input", "Add/edit book modal", "0 14", "8", "--bg3", "1.5px transparent"],
                      [".modal-field-input", "Add quote modal", "0 14", "8", "--bg3", "1.5px transparent"],
                      [".quote-textarea", "Add quote modal (multi-line)", "12 14", "8", "--bg3", "1.5px transparent"],
                      [".col-name-input", "Create collection modal", "0 12", "8", "--bg", "1.5px --border-subtle"],
                    ].map(([cls, where, pad, r, bg, bd]) => (
                      <tr key={cls}>
                        <td className="token-table-component" style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{cls}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>{where}</td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{pad}</td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{r}</td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{bg}</td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{bd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Search input — pill radius, visible default border</div>
              <div className="ds-card-body" style={{ flexWrap: "wrap", gap: 24 }}>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Default</div>
                  <div className="search-box-demo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input placeholder="Title, author…" readOnly />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Focus</div>
                  <div className="search-box-demo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input placeholder="Title, author…" style={{ borderColor: "var(--primary-50)", boxShadow: "0 0 0 3px var(--primary-20)" }} readOnly />
                  </div>
                </div>
              </div>
              <div className="ds-tokens">
                <span className="ds-tokens-label">Tokens</span>
                {["--border-subtle","--primary-50","--primary-20","--primary-5"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Text field — bg3 variant, transparent border default</div>
              <div className="ds-card-body" style={{ flexWrap: "wrap", gap: 24 }}>
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
                <span className="ds-tokens-label">Tokens</span>
                {["--bg3","--primary-50","--primary-5","--primary-20"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Common state rules</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>State</th><th>Border</th><th>Background</th><th>Ring</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="token-table-component">Default</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>1.5px --border-subtle (or transparent for bg3 variants)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>--bg3 / #FFFFFF / --bg</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                    </tr>
                    <tr>
                      <td className="token-table-component">Hover</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>1.5px --primary-50</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>--primary-5</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                    </tr>
                    <tr>
                      <td className="token-table-component">Focus</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>1.5px --primary-50</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>--primary-5</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>0 0 0 3px --primary-20</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Dark mode: swap <code>--primary-50</code> → <code>--primary-40</code>, <code>--primary-5</code> → <code>rgba(73,89,230,0.10)</code>, ring → <code>rgba(73,89,230,0.2)</code>.
                </div>
              </div>
            </div>
          </section>

          {/* ── SEGMENTED CONTROL ── */}
          <section className="ds-section" id="segmented">
            <SectionTitle title="Segmented Control" sub="Container bg3, active state white bg + blue shadow. Inactive weight 500, active weight 600." />
            <div className="ds-card">
              <div className="ds-card-label">Library tabs</div>
              <div className="ds-card-body">
                <div className="tabs-ds">
                  {["Library","Wishlist"].map(t => (
                    <button key={t} className={`tab-ds${tabActive===t?" active":""}`} onClick={() => setTabActive(t)}>
                      {t} <span className="badge-ds">{t==="Library"?"20":"0"}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="ds-tokens">
                <span className="ds-tokens-label">Tokens</span>
                {["--bg3","--bg","font-weight:500/600"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>
          </section>

          {/* ── VIEW TOGGLE ── */}
          <section className="ds-section" id="view-toggle">
            <SectionTitle title="View Toggle" sub="Grid / List. Active: primary-50 bg, white icon." />
            <div className="ds-card">
              <div className="ds-card-label">Toggle</div>
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
          </section>

          {/* ── BADGES & PILLS ── */}
          <section className="ds-section" id="badges">
            <SectionTitle title="Badges & Pills" />
            <div className="ds-card">
              <div className="ds-card-label">Pills</div>
              <div className="ds-card-body">
                <span className="pill pill-owned">Library</span>
                <span className="pill pill-wishlist">Wishlist</span>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Status badge</div>
              <div className="ds-card-body">
                <span className="status-badge">1984</span>
                <span className="status-badge">Roman</span>
              </div>
            </div>
          </section>

          {/* ── CHECKBOX ── */}
          <section className="ds-section" id="checkbox">
            <SectionTitle title="Checkbox" />
            <div className="ds-card">
              <div className="ds-card-label">États</div>
              <div className="ds-card-body" style={{ gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  <div className="checkbox-demo" onClick={() => setChk1(v => !v)}>{chk1 && <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg>}</div>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>Unchecked</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  <div className={`checkbox-demo${chk2?" checked":""}`} onClick={() => setChk2(v => !v)}>{chk2 && <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg>}</div>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>Checked</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── AUTOCOMPLETE ── */}
          <section className="ds-section" id="autocomplete">
            <SectionTitle title="Autocomplete" sub="Dropdown suggestions below the title field in the modal." />
            <div className="ds-card">
              <div className="ds-card-label">Dropdown</div>
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
          </section>

          {/* ── BOOK CHIP ── */}
          <section className="ds-section" id="book-chip">
            <SectionTitle title="Book Chip" sub="Reusable book reference block — cover thumbnail + title + author. Three modes : display, interactive, with remove." />

            <div className="ds-card">
              <div className="ds-card-label">Modes</div>
              <div className="ds-card-body" style={{ gap: 16, flexWrap: "wrap" }}>
                {/* Display (no onClick, no onRemove) */}
                <div style={{ flex: "1 1 260px", minWidth: 240 }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Display</div>
                  <div className="quote-book-chip">
                    <div className="quote-book-chip-cover quote-book-chip-cover-placeholder" style={{ background: "linear-gradient(135deg, #6F7CF2, #F67BF8)" }}><span>T</span></div>
                    <div className="quote-book-chip-body">
                      <div className="quote-book-chip-title">Tropique du Cancer</div>
                      <div className="quote-book-chip-author">Henry Miller</div>
                    </div>
                  </div>
                </div>

                {/* Interactive (with onClick → chevron) */}
                <div style={{ flex: "1 1 260px", minWidth: 240 }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Interactive</div>
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
                <div style={{ flex: "1 1 260px", minWidth: 240 }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>With remove</div>
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
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Context overrides</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>Context</th><th>Default bg</th><th>Hover bg (interactive)</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="token-table-component">Base<br /><span style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>QuotePanel, AddQuoteModal</span></td>
                      <td><span className="ds-token-chip">--bg3</span></td>
                      <td><span className="ds-token-chip">--primary-5</span></td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>Neutral backgrounds where the chip sits on its own.</td>
                    </tr>
                    <tr>
                      <td className="token-table-component">Inside <code>.quote-card</code></td>
                      <td><span className="ds-token-chip">--primary-5</span></td>
                      <td><span className="ds-token-chip">--primary-10</span></td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>Card itself tints primary on hover — chip needs stronger saturation to stay visible.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Props</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Prop</th><th>Type</th><th>Effect</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>book</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{"{ title, author, id? }"}</td><td style={{ fontSize: "0.82rem" }}>Required. Cover is auto-fetched from Google Books via title/author.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>onClick</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>(e) =&gt; void</td><td style={{ fontSize: "0.82rem" }}>If provided: renders as <code>&lt;button&gt;</code> with chevron + hover. Use <code>e.stopPropagation()</code> inside parent-clickable contexts.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>onRemove</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>() =&gt; void</td><td style={{ fontSize: "0.82rem" }}>Shows an X button on the right. Mutually exclusive with <code>onClick</code>.</td></tr>
                    <tr><td className="token-table-component" style={{ fontFamily: "monospace" }}>ariaLabel</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>string</td><td style={{ fontSize: "0.82rem" }}>Label for the remove button.</td></tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Source: <code>components/library/BookChip.js</code>. Cover 32×44, radius 4. Fallback: gradient from <code>coverColors(title)</code> + first letter.
                </div>
              </div>
            </div>
          </section>

          {/* ── LANG SWITCHER ── */}
          <section className="ds-section" id="lang-switcher">
            <SectionTitle title="Language Switcher" />
            <div className="ds-card">
              <div className="ds-card-label">FR / EN</div>
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
          </section>

          {/* ── THEME TOGGLE ── */}
          <section className="ds-section" id="theme-toggle">
            <SectionTitle title="Theme Toggle" sub="Light/dark toggle. Same button as in this page's header." />
            <div className="ds-card">
              <div className="ds-card-label">Toggle</div>
              <div className="ds-card-body">
                <button className="theme-btn-ds" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} title="Theme">
                  <span className="toggle-thumb-ds">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* ── BOOK CARD ── */}
          <section className="ds-section" id="card">
            <SectionTitle title="Book Card" sub="White bg, transparent border by default. Hover: border primary-30 + primary-5 bg + lift. No shadow. Placeholder: primary-5, no letter." />
            <div className="ds-card">
              <div className="ds-card-label">Grid view</div>
              <div className="ds-card-body" style={{ flexWrap: "wrap" }}>
                <div className="book-card-ds">
                  <div className="book-cover-ds" style={{ background: "var(--primary-5)" }} />
                  <div className="book-body-ds">
                    <div className="book-title-ds">A Brief History of Time</div>
                    <div className="book-author-ds">Stephen Hawking</div>
                    <div className="book-year-ds">1988</div>
                  </div>
                </div>
                <div className="book-card-ds" style={{ borderColor: "var(--primary-30)", background: "var(--primary-5)", transform: "translateY(-4px)" }}>
                  <div className="book-cover-ds" style={{ background: "var(--primary-5)" }} />
                  <div className="book-body-ds">
                    <div className="book-title-ds">Hover state</div>
                    <div className="book-author-ds">Author name</div>
                    <div className="book-year-ds">2024</div>
                  </div>
                </div>
              </div>
              <div className="ds-tokens">
                <span className="ds-tokens-label">Tokens</span>
                {["--card","--primary-5","--primary-30","font-weight:700/500"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>
          </section>

          {/* ── QUOTE CARD ── */}
          <section className="ds-section" id="quote-card">
            <SectionTitle title="Quote Card" sub="Card for a single quote. Padding 20px. Body in flex-row (text + delete), divider, BookChip below. Whole card is role='button' → opens QuotePanel; BookChip is nested button → opens BookPanel (stopPropagation)." />

            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
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
              <div className="ds-card-label">Anatomy</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Element</th><th>Role</th><th>Key styles</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component"><code>.quote-card</code></td><td style={{ fontSize: "0.82rem" }}>Outer clickable container</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>padding 20, gap 20, role=button, hover: lift + border-primary-50 + shadow</td></tr>
                    <tr><td className="token-table-component"><code>.quote-card-body</code></td><td style={{ fontSize: "0.82rem" }}>Text + delete row</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>flex-row, gap 20, align-items: flex-start</td></tr>
                    <tr><td className="token-table-component"><code>.quote-card-text-wrap</code></td><td style={{ fontSize: "0.82rem" }}>Text column</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>flex: 1, min-width: 0, flex-col, gap 12</td></tr>
                    <tr><td className="token-table-component"><code>.quote-card-text</code></td><td style={{ fontSize: "0.82rem" }}>The quote</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>font 16 / lh 1.7 · -webkit-line-clamp 3</td></tr>
                    <tr><td className="token-table-component"><code>.quote-see-more</code></td><td style={{ fontSize: "0.82rem" }}>Expand toggle (conditional)</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>Detected via hidden clone measurement (avoids scrollHeight clamp quirks)</td></tr>
                    <tr><td className="token-table-component"><code>.quote-card-delete</code></td><td style={{ fontSize: "0.82rem" }}>Destructive icon</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>40×40, flex-shrink: 0, --primary-5/--primary-10</td></tr>
                    <tr><td className="token-table-component"><code>.quote-card-divider</code></td><td style={{ fontSize: "0.82rem" }}>Separator</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>1px, --border-subtle</td></tr>
                    <tr><td className="token-table-component"><code>&lt;BookChip&gt;</code></td><td style={{ fontSize: "0.82rem" }}>Book reference</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>Override bg --primary-5 / --primary-10 when inside .quote-card</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── DICTIONARY CARD ── */}
          <section className="ds-section" id="dictionary-card">
            <SectionTitle title="Dictionary Card" sub="Saved word — collapsible. Head is the only clickable surface (hover bg primary-5). Body expanded shows definitions on neutral bg (readable). Card-level lift + border on any hover." />

            <div className="ds-card">
              <div className="ds-card-label">Collapsed</div>
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
              <div className="ds-card-label">Expanded — body has neutral bg so hover on head doesn't bleed into reading zone</div>
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
              <div className="ds-card-label">Dictionary Result — lookup output (primary-tinted card)</div>
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
              <div className="ds-card-label">Hover rules</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Hover target</th><th>Card effect</th><th>Head bg</th><th>Body bg</th></tr></thead>
                  <tbody>
                    <tr>
                      <td className="token-table-component">Card (any zone)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>lift -2px · border --primary-50 · shadow</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                    </tr>
                    <tr>
                      <td className="token-table-component">Head specifically</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>(inherited from card hover)</td>
                      <td><span className="ds-token-chip">--primary-5</span></td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                    </tr>
                    <tr>
                      <td className="token-table-component">Body (expanded)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>(inherited from card hover)</td>
                      <td style={{ color: "var(--text-3)" }}>—</td>
                      <td style={{ color: "var(--text-3)" }}>— (stays on --bg2)</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Why body stays neutral : blue tint on content-rich zones hurts readability. The head — the only clickable affordance — carries the explicit hover bg.
                </div>
              </div>
            </div>
          </section>

          {/* ── LIST VIEW ── */}
          <section className="ds-section" id="list">
            <SectionTitle title="List View" />
            <div className="ds-card">
              <div className="ds-card-label">Tableau</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <div className="list-demo">
                  <table>
                    <thead>
                      <tr>
                        {["Title","Author","Year","Genre"].map(h => <th key={h}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[["A Brief History of Time","Stephen Hawking","1988","Science"],["1984","George Orwell","1949","Fiction"]].map(([t,a,y,g]) => (
                        <tr key={t}>
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
          </section>

          {/* ── SIDEBAR ── */}
          <section className="ds-section" id="sidebar">
            <SectionTitle title="Sidebar" sub="Navigation latérale fixe. Expanded 260px · Collapsed 60px. Persisté en localStorage." />
            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
              <div className="ds-card-body" style={{ gap: 24, alignItems: 'flex-start' }}>
                {/* Expanded */}
                <div style={{ width: 200, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 420 }}>
                  {/* Logo row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 16, letterSpacing: '-0.02em' }}>readr</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </div>
                  {/* Shelves */}
                  <div style={{ padding: '12px 8px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '0 8px 6px' }}>Shelves</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, background: 'var(--primary-10)', color: 'var(--primary)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      <span style={{ fontSize: '0.857rem', fontWeight: 600, flex: 1 }}>My Library</span>
                      <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: '#fff', borderRadius: 10, padding: '1px 7px', fontWeight: 600 }}>20</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, color: 'var(--text-2)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <span style={{ fontSize: '0.857rem', flex: 1 }}>Wishlist</span>
                      <span style={{ fontSize: '0.75rem', background: 'var(--primary-10)', color: 'var(--primary-50)', borderRadius: 10, padding: '1px 7px', fontWeight: 600 }}>1</span>
                    </div>
                  </div>
                  {/* Quotes section */}
                  <div style={{ padding: '4px 8px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '12px 8px 6px' }}>Quotes</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, color: 'var(--text-2)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
                      <span style={{ fontSize: '0.857rem', flex: 1 }}>Quotes</span>
                      <span style={{ fontSize: '0.75rem', background: 'var(--primary-10)', color: 'var(--primary-50)', borderRadius: 10, padding: '1px 7px', fontWeight: 600 }}>4</span>
                    </div>
                  </div>
                  {/* Dictionary section */}
                  <div style={{ padding: '4px 8px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '12px 8px 6px' }}>Dictionary</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, color: 'var(--text-2)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a4 4 0 0 1 4 4v12"/><path d="M4 4v14a2 2 0 0 0 2 2h13"/><line x1="8" y1="9" x2="14" y2="9"/><line x1="8" y1="13" x2="12" y2="13"/></svg>
                      <span style={{ fontSize: '0.857rem', flex: 1 }}>Dictionary</span>
                      <span style={{ fontSize: '0.75rem', background: 'var(--primary-10)', color: 'var(--primary-50)', borderRadius: 10, padding: '1px 7px', fontWeight: 600 }}>12</span>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 6, fontSize: '0.8rem', color: 'var(--text-2)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>EN</span>
                      <span>·</span>
                      <span>FR</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>Appearance</span>
                      <div style={{ width: 36, height: 20, borderRadius: 10, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 3px' }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff' }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Collapsed */}
                <div style={{ width: 52, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 280, gap: 4, padding: '10px 0' }}>
                  <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: 15, letterSpacing: '-0.02em', padding: '8px 0 12px', borderBottom: '1px solid var(--border)', width: '100%', textAlign: 'center' }}>r</div>
                  <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
                    <div style={{ padding: '8px', borderRadius: 8, background: 'var(--primary-10)', color: 'var(--primary)', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div style={{ padding: '8px', borderRadius: 8, color: 'var(--text-2)', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                    <div style={{ padding: '8px', borderRadius: 8, color: 'var(--text-2)', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
                    </div>
                    <div style={{ padding: '8px', borderRadius: 8, color: 'var(--text-2)', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a4 4 0 0 1 4 4v12"/><path d="M4 4v14a2 2 0 0 0 2 2h13"/><line x1="8" y1="9" x2="14" y2="9"/><line x1="8" y1="13" x2="12" y2="13"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DSCard label="Nav items — états" tokens={["--primary-10","--primary-50","--primary-5","--primary"]}>
              <table className="btn-scale-table">
                <thead><tr><th>État</th><th>Background</th><th>Couleur</th><th>Badge bg</th><th>Badge color</th></tr></thead>
                <tbody>
                  <tr><td>Default</td><td>transparent</td><td>--text-2</td><td>--primary-10</td><td>--primary-50</td></tr>
                  <tr><td>Hover</td><td>--primary-5</td><td>--text</td><td>—</td><td>—</td></tr>
                  <tr><td>Active</td><td>--primary-10</td><td>--primary</td><td>--primary-50</td><td>#fff</td></tr>
                </tbody>
              </table>
            </DSCard>
            <DSCard label="Tokens & comportement" tokens={["--bg","--border","--primary-10","--primary-50"]}>
              <table className="btn-scale-table">
                <thead><tr><th>Propriété</th><th>Valeur</th></tr></thead>
                <tbody>
                  <tr><td>Expanded width</td><td>260px</td></tr>
                  <tr><td>Collapsed width</td><td>60px</td></tr>
                  <tr><td>Page shell padding</td><td>260px → 60px (collapsed)</td></tr>
                  <tr><td>Persistance</td><td><code>readr-sidebar-collapsed</code> (localStorage)</td></tr>
                  <tr><td>Mobile</td><td>Overlay fixe, ouverture via hamburger</td></tr>
                  <tr><td>Sections</td><td>Shelves · Quotes · Dictionary <span style={{ color: 'var(--text-3)' }}>(Collections : hidden via <code>display: none</code>, pending redesign)</span></td></tr>
                  <tr><td>Badge canon</td><td><code>.sidebar-badge</code> — bg <code>--primary-10</code>, color <code>--primary-50</code>. Active item: bg <code>--primary</code>, color <code>#fff</code>.</td></tr>
                </tbody>
              </table>
            </DSCard>
          </section>

          {/* ── PANEL ── */}
          <section className="ds-section" id="panel">
            <SectionTitle title="Side Panel" sub="Full-height drawer fixed right, width 540px. Gap-driven rhythm: 24px inner / 60px cover→info (24 gap + 36 cover margin-bottom) / 24px inter-sections / 8px byline cluster." />
            <div className="ds-card">
              <div className="ds-card-label">Layout</div>
              <div className="ds-card-body" style={{ padding: 0 }}>
                <div className="panel-ds-viewport">
                  <div className="panel-ds-content">
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                    <div className="panel-ds-placeholder-row" />
                  </div>
                  <div className="panel-ds-panel" style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 24 }}>
                    <div className="panel-preview-header">
                      <button className="panel-share" style={{ position: "static" }} aria-label="Share">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                      </button>
                      <button className="panel-close" style={{ position: "static" }} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                    <div className="panel-main">
                      <div className="panel-preview-cover panel-cover-wrap" />
                      <div className="panel-info">
                        <div className="panel-preview-title">A Brief History of Time</div>
                        <div className="panel-byline">
                          <div className="panel-preview-author">Stephen Hawking</div>
                          <div className="panel-preview-meta">Science · 1988</div>
                        </div>
                        <div className="panel-section">
                          <span className="panel-section-eyebrow">About</span>
                          <div className="panel-preview-synopsis">A landmark volume in science writing by one of the great minds of our time...</div>
                        </div>
                        <div className="panel-actions">
                          <button className="panel-delete-btn">Delete</button>
                        </div>
                      </div>
                    </div>
                    <div className="panel-divider" />
                    <div className="panel-quotes">
                      <span className="panel-section-eyebrow">Quotes</span>
                      <div className="panel-preview-quote">"We are just an advanced breed of monkeys on a minor planet of a very average star."</div>
                      <button className="panel-quotes-add" style={{ alignSelf: "flex-start" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add a quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Anatomy (BookPanel)</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Wrapper</th><th>Role</th><th>Gap</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component"><code>.panel-inner</code></td><td style={{ fontSize: "0.82rem" }}>Outer container. Padding 96 / 32 / 32. Hosts share + close absolute</td><td style={{ fontFamily: "monospace" }}>24px</td></tr>
                    <tr><td className="token-table-component"><code>.panel-main</code></td><td style={{ fontSize: "0.82rem" }}>Cover + info block</td><td style={{ fontFamily: "monospace" }}>24px</td></tr>
                    <tr><td className="token-table-component"><code>.panel-cover-wrap</code></td><td style={{ fontSize: "0.82rem" }}>Cover. align-self: center + margin-bottom 36px (= 60px total to info)</td><td style={{ color: "var(--text-3)" }}>—</td></tr>
                    <tr><td className="token-table-component"><code>.panel-info</code></td><td style={{ fontSize: "0.82rem" }}>Title / byline / About / actions</td><td style={{ fontFamily: "monospace" }}>24px</td></tr>
                    <tr><td className="token-table-component"><code>.panel-byline</code></td><td style={{ fontSize: "0.82rem" }}>Author + meta (tight cluster)</td><td style={{ fontFamily: "monospace" }}>8px</td></tr>
                    <tr><td className="token-table-component"><code>.panel-section</code></td><td style={{ fontSize: "0.82rem" }}>Semantic wrapper : eyebrow + content. Width 100%</td><td style={{ color: "var(--text-3)" }}>eyebrow margin-bottom 12</td></tr>
                    <tr><td className="token-table-component"><code>.panel-actions</code></td><td style={{ fontSize: "0.82rem" }}>Flex row, justify-between. Move + Delete buttons</td><td style={{ color: "var(--text-3)" }}>—</td></tr>
                    <tr><td className="token-table-component"><code>.panel-divider</code></td><td style={{ fontSize: "0.82rem" }}>Canonical 1px separator. Used between panel-main and panel-quotes</td><td style={{ color: "var(--text-3)" }}>—</td></tr>
                    <tr><td className="token-table-component"><code>.panel-quotes</code></td><td style={{ fontSize: "0.82rem" }}>Eyebrow + list + add button. Width 100%</td><td style={{ fontFamily: "monospace" }}>16px</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── QUOTE PANEL ── */}
          <section className="ds-section" id="quote-panel">
            <SectionTitle title="Quote Panel" sub="Right-side drawer variant of Side Panel — opened by clicking a quote card. Same drawer mechanics as Book Panel, with quote-specific content : text, book chip (clickable → BookPanel), edit/delete." />

            <div className="ds-card">
              <div className="ds-card-label">Content layout</div>
              <div className="ds-card-body">
                <div style={{ maxWidth: 420, width: "100%", border: "1.5px solid var(--border-subtle)", borderRadius: 8, padding: 24, background: "var(--bg)", display: "flex", flexDirection: "column", gap: 24 }}>
                  {/* Header row: share + close (absolute in real panel, inline here) */}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="panel-share" style={{ position: "static" }} aria-label="Share">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                      </svg>
                    </button>
                    <button className="panel-close" style={{ position: "static" }} aria-label="Close">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  {/* .panel-main — quote section + date + actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div>
                      <span className="panel-section-eyebrow">Quote</span>
                      <p className="quote-panel-text" style={{ margin: 0 }}>
                        "Qui suis-je ? Qu'est-ce que je fais là ? Il y a quelque chose qui ressemble à la vérité."
                      </p>
                    </div>
                    <div className="quote-panel-date">Added Mar 14, 2026</div>
                    <div className="panel-actions">
                      <button className="panel-move-btn">Edit</button>
                      <button className="panel-delete-btn">Delete</button>
                    </div>
                  </div>
                  {/* divider */}
                  <div className="panel-divider" />
                  {/* book section */}
                  <div>
                    <span className="panel-section-eyebrow">Book</span>
                    <button type="button" className="quote-book-chip quote-book-chip-interactive" style={{ marginTop: 12 }}>
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
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Anatomy — shares primitives with BookPanel</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Wrapper / element</th><th>Role</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component"><code>.panel-inner</code></td><td style={{ fontSize: "0.82rem" }}>Same as BookPanel — padding 96/32/32, gap 24, hosts share + close absolute</td></tr>
                    <tr><td className="token-table-component"><code>.panel-main</code></td><td style={{ fontSize: "0.82rem" }}>Quote section + date + actions. Gap 24px, width 100%</td></tr>
                    <tr><td className="token-table-component"><code>.panel-section</code> (Quote)</td><td style={{ fontSize: "0.82rem" }}>Eyebrow "Quote" + <code>.quote-panel-text</code></td></tr>
                    <tr><td className="token-table-component"><code>.quote-panel-text</code></td><td style={{ fontSize: "0.82rem" }}>Font 16 / line-height 1.7 — matches <code>.quote-card-text</code> for continuity</td></tr>
                    <tr><td className="token-table-component"><code>.quote-panel-date</code></td><td style={{ fontSize: "0.82rem" }}>Subtitle (12px, text-3). Conditional on <code>createdAt</code></td></tr>
                    <tr><td className="token-table-component"><code>.panel-actions</code></td><td style={{ fontSize: "0.82rem" }}>Edit (move-btn) + Delete. Delete triggers <code>DeleteModal</code> with <code>type: 'quote'</code></td></tr>
                    <tr><td className="token-table-component"><code>.panel-divider</code></td><td style={{ fontSize: "0.82rem" }}>Canonical 1px separator (conditional — only if book exists)</td></tr>
                    <tr><td className="token-table-component"><code>.panel-section</code> (Book)</td><td style={{ fontSize: "0.82rem" }}>Eyebrow "Book" + <code>&lt;BookChip&gt;</code> (base palette, <code>--bg3</code> default)</td></tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Drawer mechanics (position, width, slide-in transition) identical to Book Panel. <code>.quote-panel-divider</code> was replaced by the canonical <code>.panel-divider</code>.
                </div>
              </div>
            </div>
          </section>

          {/* ── MODAL ── */}
          <section className="ds-section" id="modal">
            <SectionTitle title="Modal" sub="Centered, max-width 620px, max-height calc(100vh - 80px), overflow-y auto. Import tabs: Photo / File / Manual." />
            <div className="ds-card">
              <div className="ds-card-label">Add a book</div>
              <div className="ds-card-body">
                <div className="modal-preview">
                  <div className="modal-preview-title">Add a book</div>
                  <div className="import-tabs-preview">
                    {[["photo","Photo",true],["file","File",false],["manual","Manual",false]].map(([id,label,isAI]) => (
                      <button key={id} className={`import-tab-ds-comp${importTab===id?" active":""}${isAI&&importTab===id?" active-ai":""}`} onClick={() => setImportTab(id)}>
                        {isAI ? (
                          <span className="import-tab-ai-label">
                            <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
                              <defs><linearGradient id="aiG" x1="23" y1="1" x2="2" y2="23" gradientUnits="userSpaceOnUse"><stop stopColor="#F67BF8"/><stop offset=".62" stopColor="#4959E6"/></linearGradient></defs>
                              <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiG)"/>
                            </svg>
                            <span>Photo</span>
                          </span>
                        ) : label}
                      </button>
                    ))}
                  </div>
                  {importTab === "manual" && (
                    <div className="modal-preview-fields" style={{ marginTop: 20 }}>
                      <div className="modal-preview-field"><label>Title</label><input placeholder="e.g. 1984" readOnly /></div>
                      <div className="modal-preview-field"><label>Author</label><input placeholder="e.g. George Orwell" readOnly /></div>
                    </div>
                  )}
                  <div className="modal-preview-actions" style={{ marginTop: 20 }}>
                    <button className="btn btn-ghost btn-md">Cancel</button>
                    <button className="btn btn-primary btn-md">Add to Library</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── DELETE MODAL ── */}
          <section className="ds-section" id="delete-modal">
            <SectionTitle title="Delete Modal" sub="Confirmation modal for destructive actions. Type-routed i18n — same component handles books, quotes, words, and bulk deletions." />

            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
              <div className="ds-card-body">
                <div style={{ maxWidth: 380, margin: "0 auto", background: "var(--card)", border: "1.5px solid var(--border-subtle)", borderRadius: 12, padding: 24, boxShadow: "var(--shadow-lg)" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Remove this quote?</div>
                  <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 20 }}>This quote will be permanently removed.</div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button className="btn btn-outline btn-md">Cancel</button>
                    <button className="btn btn-primary btn-md" style={{ background: "#EF4444" }}>Remove</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Target routing — <code>target.type</code> dispatches the i18n</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>target shape</th><th>Title i18n</th><th>Message i18n</th><th>onConfirm handler</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{"{ bulk: true, ids, count }"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.deleteBulkTitle(count)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.deleteBulkMsg(count)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>deleteMany(ids)</td>
                    </tr>
                    <tr>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{"{ type: 'quote', id }"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.quoteDeleteTitle</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.quoteDeleteMsg</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>deleteQuote(id)</td>
                    </tr>
                    <tr>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{"{ type: 'word', id, title }"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.wordDeleteTitle</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.wordDeleteMsg(title)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>deleteWord(id)</td>
                    </tr>
                    <tr>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{"{ id, title, ... }"} (book, no type)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.deleteTitle</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>t.deleteMsg(title)</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>deleteBook(id)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Usage</div>
              <div className="ds-card-body col" style={{ gap: 12 }}>
                <p style={{ fontSize: "0.857rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  Trigger the modal by setting <code>deleteTarget</code> state. The <code>onConfirm</code> callback receives the full target — dispatch in the parent based on <code>target.type</code>.
                </p>
                <pre style={{ fontFamily: "monospace", fontSize: "0.75rem", background: "var(--bg3)", padding: "12px 14px", borderRadius: 6, color: "var(--text)", lineHeight: 1.6, margin: 0, overflow: "auto" }}>
{`// Open
<button onClick={() => setDeleteTarget({ type: 'quote', id: q.id })}>…</button>

// Render
<DeleteModal
  target={deleteTarget}
  onClose={() => setDeleteTarget(null)}
  onConfirm={handleDeleteConfirm}
  t={t}
/>

// Dispatch
function handleDeleteConfirm(payload) {
  if (payload instanceof Set) return deleteMany(payload);
  if (payload?.type === 'quote') return deleteQuote(payload.id);
  if (payload?.type === 'word')  return deleteWord(payload.id);
  return deleteBook(payload.id);
}`}
                </pre>
                <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
                  Source: <code>components/library/DeleteModal.js</code>. The Cancel button is <code>.modal-cancel</code> (outline). The confirm is <code>.confirm-modal-delete</code> (red fill).
                </div>
              </div>
            </div>
          </section>

          {/* ── UPLOAD BOX ── */}
          <section className="ds-section" id="upload-box">
            <SectionTitle title="Upload Box" sub="Dropzone with gradient dashed border (Photo/AI) or standard border (File). Three states: idle, scanning, error." />

            {/* Photo / AI dropzone — all states */}
            {[
              { key: "idle", label: "Idle" },
              { key: "scanning", label: "Scanning" },
              { key: "error", label: "Error" },
            ].map(({ key, label }) => (
              <div className="ds-card" key={key}>
                <div className="ds-card-label">Photo / AI — {label}</div>
                <div className="ds-card-body col" style={{ gap: 0 }}>
                  <UploadBoxDemo state={key} variant="photo" />
                  {key === "error" && (
                    <div className="scan-alert" style={{ width: "40%" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      No books detected. Try a clearer photo with visible titles.
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* File dropzone */}
            <div className="ds-card">
              <div className="ds-card-label">File — standard border</div>
              <div className="ds-card-body">
                <div className="import-dropzone" style={{ cursor: "default", width: "40%" }}>
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

          </section>

          {/* ── SELECTION BAR ── */}
          <section className="ds-section" id="selection-bar">
            <SectionTitle title="Selection Bar" sub="Floating bar fixed bottom-center in Edit mode. Background --primary-60 (light & dark). Slides up from below via translateY(120 → 0)." />
            <div className="ds-card">
              <div className="ds-card-label">Preview — Wishlist edit mode (3 buttons in .sel-actions)</div>
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
              <div className="ds-card-label">Anatomy</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Element</th><th>Background</th><th>Border / color</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component"><code>.selection-bar</code></td><td><span className="ds-token-chip">--primary-60</span></td><td>color #fff · gap 16</td></tr>
                    <tr><td className="token-table-component"><code>.sel-actions</code></td><td style={{ color: "var(--text-3)" }}>—</td><td>flex row, gap 8 (desktop) / column on mobile</td></tr>
                    <tr><td className="token-table-component"><code>.sel-select-all</code></td><td>transparent</td><td>border 1.5px rgba(255,255,255,0.5), color #fff</td></tr>
                    <tr><td className="token-table-component"><code>.sel-confirm</code> (Mark as owned)</td><td><span className="ds-token-chip">--primary-50</span></td><td>color #fff</td></tr>
                    <tr><td className="token-table-component"><code>.sel-confirm.danger</code> (Remove)</td><td>rgba(255,255,255,0.15)</td><td>color #fff</td></tr>
                    <tr><td className="token-table-component"><code>.sel-cancel</code></td><td>rgba(255,255,255,0.15)</td><td>color #fff</td></tr>
                  </tbody>
                </table>
                <div style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-3)", borderTop: "1px solid var(--border-subtle)" }}>
                  Mobile (max-width 600px) : flex column, gap 16 (count → .sel-actions stacked → cancel). Buttons full-width via <code>.sel-btn {`{ width: 100% }`}</code>.
                </div>
              </div>
            </div>
          </section>

          {/* ── EMPTY STATE ── */}
          <section className="ds-section" id="empty">
            <SectionTitle title="Empty State" sub="Gap-driven layout (20px between blocks, 8px inside .empty-text). Icons 80×80 illustrative SVGs, custom per page (Library, Wishlist, Quotes, Dictionary)." />

            <div className="ds-card">
              <div className="ds-card-label">Anatomy</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead><tr><th>Element</th><th>Role</th><th>Specs</th></tr></thead>
                  <tbody>
                    <tr><td className="token-table-component"><code>.empty</code></td><td style={{ fontSize: "0.82rem" }}>Outer container</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>flex col, align center, gap 20, padding 80/20</td></tr>
                    <tr><td className="token-table-component"><code>.empty-icon</code></td><td style={{ fontSize: "0.82rem" }}>Illustration SVG</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>80×80, viewBox 60</td></tr>
                    <tr><td className="token-table-component"><code>.empty-text</code></td><td style={{ fontSize: "0.82rem" }}>Title + sub wrapper</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>flex col, gap 8</td></tr>
                    <tr><td className="token-table-component"><code>.empty-title</code></td><td style={{ fontSize: "0.82rem" }}>Headline</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>Jakarta 18 / 700</td></tr>
                    <tr><td className="token-table-component"><code>.empty-sub</code></td><td style={{ fontSize: "0.82rem" }}>Helper text</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>14 / --text-2 / max-width 280</td></tr>
                    <tr><td className="token-table-component"><code>.empty-cta</code></td><td style={{ fontSize: "0.82rem" }}>Primary action (optional)</td><td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>Same anatomy as .add-btn (h 40, --primary-50)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ds-card">
              <div className="ds-card-label">Icon set — 4 illustrative SVGs (80×80, viewBox 60)</div>
              <div className="ds-card-body" style={{ gap: 32, flexWrap: "wrap", justifyContent: "space-around" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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
              <div className="ds-card-label">Live preview — Library empty</div>
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
          </section>

          {/* ── FOOTER ── */}
          <section className="ds-section" id="footer">
            <SectionTitle title="Footer" />
            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <div className="footer-preview">
                  © 2026 Pierre Blavette · How it works · v1.0 · About readr · pierreblavette.com
                </div>
              </div>
            </div>
          </section>

          {/* ── TOKEN USAGE ── */}
          <section className="ds-section" id="token-usage">
            <SectionTitle title="Token Usage" sub="Authoritative mapping component → tokens. Reflects the current lib state (post border-subtle migration)." />

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
                  ["Outline (.edit-btn, .export-btn, .modal-cancel…)", "default", ["1.5px --border-subtle", "bg #FFFFFF (light)", "color --text"]],
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
                <div className="ds-card-label">{label}</div>
                <div className="ds-card-body col" style={{ padding: 0 }}>
                  <table className="token-table">
                    <thead>
                      <tr><th>Component</th><th>State</th><th>Tokens / specs</th></tr>
                    </thead>
                    <tbody>
                      {rows.map(([comp, state, tokens], i) => (
                        <tr key={comp + state + i}>
                          <td className="token-table-component">{comp}</td>
                          <td style={{ color: "var(--text-3)", fontSize: "0.857rem" }}>{state}</td>
                          <td>{tokens.map((t, j) => <span key={t + j} className="ds-token-chip">{t}</span>)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>

        </main>
      </div>
    </div>
  );
}
