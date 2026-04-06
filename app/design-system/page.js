"use client";
import "./ds.css";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV = {
  Foundations: ["logo","colors","typography","highlight","spacing","shadows"],
  Components:  ["buttons","btn-states","inputs","segmented","view-toggle","badges","checkbox","autocomplete","lang-switcher","theme-toggle"],
  Patterns:    ["card","list","sidebar","panel","modal","selection-bar","empty","footer"],
  Reference:   ["token-usage"],
};
const NAV_LABELS = {
  "logo":"Logo","colors":"Colors","typography":"Typography","highlight":"Hand-drawn Highlight",
  "spacing":"Spacing","shadows":"Shadows & Radius","buttons":"Buttons","btn-states":"Button States",
  "inputs":"Inputs","segmented":"Segmented Control","view-toggle":"View Toggle","badges":"Badges & Pills",
  "checkbox":"Checkbox","autocomplete":"Autocomplete","lang-switcher":"Language Switcher",
  "theme-toggle":"Theme Toggle","card":"Book Card","list":"List View","sidebar":"Sidebar","panel":"Side Panel",
  "modal":"Modal","selection-bar":"Selection Bar","empty":"Empty State","footer":"Footer",
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
              <ColorSwatch bg="var(--border)" title="Divider" token="--border" light="#E0E0E0" dark="#2E2E2E" />
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

          {/* ── BUTTONS ── */}
          <section className="ds-section" id="buttons">
            <SectionTitle title="Buttons" sub="6 variantes · 5 tailles · font-weight 600 sur tous les boutons." />
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

          {/* ── INPUTS ── */}
          <section className="ds-section" id="inputs">
            <SectionTitle title="Inputs" sub="Search input & text field. font-weight 600. Hover = primary tint, Focus = ring primary-20." />
            <div className="ds-card">
              <div className="ds-card-label">Search input</div>
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
                {["--border","--primary-50","--primary-20","--bg3"].map(t => <span key={t} className="ds-token-chip">{t}</span>)}
              </div>
            </div>
            <div className="ds-card">
              <div className="ds-card-label">Text field</div>
              <div className="ds-card-body" style={{ flexWrap: "wrap", gap: 24 }}>
                <div className="field-demo">
                  <label>Title</label>
                  <input placeholder="e.g. 1984" readOnly />
                </div>
                <div className="field-demo">
                  <label>Author</label>
                  <input placeholder="e.g. George Orwell" style={{ borderColor: "var(--primary-50)", boxShadow: "0 0 0 3px var(--primary-20)" }} readOnly />
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
                <div style={{ width: 200, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 380 }}>
                  {/* Logo row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 16, letterSpacing: '-0.02em' }}>readr</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </div>
                  {/* Nav */}
                  <div style={{ padding: '12px 8px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '0 8px 6px' }}>My Library</div>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 8px 6px', color: 'var(--text-3)' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>Collections</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', padding: '4px 10px' }}>No collections yet</div>
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
                <div style={{ width: 52, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 240, gap: 4, padding: '10px 0' }}>
                  <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: 15, letterSpacing: '-0.02em', padding: '8px 0 12px', borderBottom: '1px solid var(--border)', width: '100%', textAlign: 'center' }}>r</div>
                  <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
                    <div style={{ padding: '8px', borderRadius: 8, background: 'var(--primary-10)', color: 'var(--primary)', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div style={{ padding: '8px', borderRadius: 8, color: 'var(--text-2)', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                    <div style={{ padding: '8px', borderRadius: 8, color: 'var(--text-2)', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
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
                  <tr><td>Collections chevron</td><td>rotate(90deg) animé</td></tr>
                </tbody>
              </table>
            </DSCard>
          </section>

          {/* ── PANEL ── */}
          <section className="ds-section" id="panel">
            <SectionTitle title="Side Panel" sub="Slide depuis la droite. Largeur 571px. Shadow lg." />
            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
              <div className="ds-card-body">
                <div className="panel-preview">
                  <div className="panel-preview-header">
                    <button className="btn btn-icon btn-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  <div className="panel-preview-cover" />
                  <div className="panel-preview-body">
                    <span className="panel-preview-tag">Library</span>
                    <div className="panel-preview-title">A Brief History of Time</div>
                    <div className="panel-preview-author">Stephen Hawking</div>
                    <div className="panel-preview-divider" />
                    <div className="panel-preview-label">Year</div>
                    <div className="panel-preview-text">1988</div>
                  </div>
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

          {/* ── SELECTION BAR ── */}
          <section className="ds-section" id="selection-bar">
            <SectionTitle title="Selection Bar" sub="Floating bar in Edit mode. Background var(--text), text var(--bg)." />
            <div className="ds-card">
              <div className="ds-card-label">Preview</div>
              <div className="ds-card-body">
                <div className="sel-bar-preview">
                  <span className="sel-count">3 selected</span>
                  <button className="sel-btn-ds sel-cancel-ds">Cancel</button>
                  <button className="sel-btn-ds" style={{ background: "rgba(255,255,255,0.15)", color: "inherit" }}>Move</button>
                  <button className="sel-btn-ds sel-confirm-ds">Delete</button>
                </div>
              </div>
            </div>
          </section>

          {/* ── EMPTY STATE ── */}
          <section className="ds-section" id="empty">
            <SectionTitle title="Empty State" />
            <div className="ds-card">
              <div className="ds-card-label">Library vide</div>
              <div className="ds-card-body">
                <div className="empty-preview">
                  <div className="empty-emoji">📚</div>
                  <div className="empty-title">Your library is empty</div>
                  <div className="empty-sub">Add your first book to get started</div>
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
            <SectionTitle title="Token Usage" sub="Mapping composants → tokens CSS." />
            <div className="ds-card">
              <div className="ds-card-body col" style={{ padding: 0 }}>
                <table className="token-table">
                  <thead>
                    <tr><th>Composant</th><th>État</th><th>Tokens</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ["Page background","—",["--bg (#FEFEFF)"]],
                      ["Card","default",["--card (#FFF)","border: transparent"]],
                      ["Card","hover",["--primary-30","--primary-5","translateY(-4px)"]],
                      ["Book cover","placeholder",["--primary-5","no letter"]],
                      ["Button Primary","default",["--primary-50","color: #fff","weight: 600"]],
                      ["Button Primary","hover",["--primary-60"]],
                      ["Button Outline","default",["--border","--dark-80","weight: 600"]],
                      ["Button Outline","hover",["--primary-50","--primary-5"]],
                      ["Tab","inactif",["--dark-80","weight: 500"]],
                      ["Tab","actif",["--text","--bg","weight: 600","shadow bleue"]],
                      ["Import tab","actif",["--primary-50","weight: 600"]],
                      ["Indicateur tab Photo","actif",["gradient #F67BF8 → #4959E6"]],
                      ["Indicateur tab File/Manual","actif",["--primary-50"]],
                      ["Search input","hover",["--primary-50","--primary-5"]],
                      ["Search input","focus",["--primary-50","--primary-20 ring"]],
                      ["Text input","hover",["--primary-40","--primary-5"]],
                      ["Text input","focus",["--primary-50","--primary-20 ring"]],
                    ].map(([comp, state, tokens]) => (
                      <tr key={comp+state}>
                        <td className="token-table-component">{comp}</td>
                        <td style={{ color: "var(--text-3)", fontSize: "0.857rem" }}>{state}</td>
                        <td>{tokens.map(t => <span key={t} className="ds-token-chip">{t}</span>)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
