"use client";
import { useState } from "react";
import Wordmark from "@/components/brand/Wordmark";
import SymbolMark from "@/components/brand/SymbolMark";
import LogoLockup from "@/components/brand/LogoLockup";
import LogoConstruction from "../_components/LogoConstruction";
import Redline from "../_components/Redline";
import DSSection from "../_components/DSSection";

const SIZES = [
  [40, "Display / splash screen"],
  [28, "Page header"],
  [17, "Sidebar — reference size"],
  [12, "Footer / minimum size"],
];

export default function LogoPage() {
  // Bumping this remounts the brand marks, which restarts their CSS draw-on.
  const [replayLogo, setReplayLogo] = useState(0);

  return (
    <DSSection id="logo" title="Logo" sub="The Readr logo — wordmark, symbol, and their usage rules.">
      <div className="ds-card">
        <div className="ds-card-head">Wordmark — standalone</div>
        <div className="ds-card-body col">
          <div className="ds-tile-grid ds-tile-grid--cols3">
            {[["logo-bg-page","#0F0F0F","Light"],["logo-bg-dark","#FFFFFF","Dark"],["logo-bg-accent","#FFFFFF","Accent"]].map(([cls,col,label]) => (
              <div key={cls} className="lockup-card">
                <span className="panel-section-eyebrow">{label}</span>
                <div className={`logo-bg ${cls}`}>
                  <Wordmark className="logo-wordmark" style={{ color: col }} />
                </div>
              </div>
            ))}
          </div>
          <div className="logo-spec-row">
            {[["Font","MG12 (Atipo)"],["Weight","Medium"],["Casing","Readr"],["Default color","#0D0F1A"],["On dark / accent","#FFFFFF"]].map(([l,v]) => (
              <div key={l} className="logo-spec-item">
                <span className="logo-spec-label">{l}</span>
                <span className="logo-spec-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Symbol — standalone</div>
        <div className="ds-card-body col">
          <div className="ds-tile-grid ds-tile-grid--cols3">
            {[["logo-bg-page","var(--primary-50)","Light"],["logo-bg-dark","var(--primary-50)","Dark"],["logo-bg-accent","#FFFFFF","Accent"]].map(([cls,col,label]) => (
              <div key={cls} className="lockup-card">
                <span className="panel-section-eyebrow">{label}</span>
                <div className={`logo-bg ${cls}`}>
                  <SymbolMark className="logo-symbol" style={{ color: col }} />
                </div>
              </div>
            ))}
          </div>
          <div className="logo-spec-row">
            {[["Used for","Favicon · App icon · Splash"],["Ratio","1:1 (1024×1024 viewBox)"],["Min size","16px height"]].map(([l,v]) => (
              <div key={l} className="logo-spec-item">
                <span className="logo-spec-label">{l}</span>
                <span className="logo-spec-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Lockup — Symbol &amp; Text</div>
        <div className="ds-card-body col">
          <div className="ds-tile-grid ds-tile-grid--cols3">
            {[["logo-bg-page","#0D0F1A",undefined,"Light"],["logo-bg-dark","#FFFFFF",undefined,"Dark"],["logo-bg-accent","#FFFFFF","#FFFFFF","Accent"]].map(([cls,col,symbolColor,label]) => (
              <div key={cls} className="lockup-card">
                <span className="panel-section-eyebrow">{label}</span>
                <div className={`logo-bg ${cls}`}>
                  <LogoLockup className="logo" style={{ color: col }} symbolColor={symbolColor} />
                </div>
              </div>
            ))}
          </div>
          <div className="ds-note">Symbole + wordmark (MG12 Medium) alignés horizontalement — même hauteur (148) dans un cadre 804×148, séparés par 1× d (102). Fond clair : symbole <code>#4959E6</code> + texte <code>#0D0F1A</code> ; fond sombre : symbole <code>#4959E6</code> + texte blanc ; fond accent : symbole et texte blancs.</div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Motion — draw-on</div>
        <div className="ds-card-body col">
          <div className="ds-state-sample">
            <span className="panel-section-eyebrow">Symbol</span>
            <div className="ds-tile-grid ds-tile-grid--cols3">
              {[["logo-bg-page","var(--primary-50)",undefined],["logo-bg-dark","var(--primary-50)",undefined],["logo-bg-accent","#FFFFFF",["#FFFFFF","#FFFFFF"]]].map(([cls,col,echo],i) => (
                <div key={i} className={`logo-bg ${cls}`}>
                  <SymbolMark key={replayLogo} animated echo={echo} className="logo-symbol" style={{ color: col }} />
                </div>
              ))}
            </div>
          </div>
          <div className="ds-state-sample">
            <span className="panel-section-eyebrow">Symbol &amp; Text</span>
            <div className="ds-tile-grid ds-tile-grid--cols3">
              {[["logo-bg-page","#0D0F1A",undefined,undefined],["logo-bg-dark","#FFFFFF",undefined,undefined],["logo-bg-accent","#FFFFFF",["#FFFFFF","#FFFFFF"],"#FFFFFF"]].map(([cls,col,echo,symbolColor],i) => (
                <div key={i} className={`logo-bg ${cls}`}>
                  <LogoLockup key={replayLogo} animated echo={echo} symbolColor={symbolColor} className="logo" style={{ color: col }} />
                </div>
              ))}
            </div>
          </div>
          <div className="ds-action-block">
            <button className="btn btn-primary btn-md" onClick={() => setReplayLogo((n) => n + 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 2v6h6" />
                <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
              </svg>
              <span>Replay</span>
            </button>
          </div>
          <div className="ds-note">Les 3 traits se tracent dans l&apos;ordre de construction (couche haute + pointe, crochet du R, couche basse), stagger 0.2s, draw 0.5s. Deux calques echo à 20% précèdent le trait plein de 0.2s chacun. Le symbole est donc plein à 1.3s. Le wordmark étant vectorisé, il ne se trace pas : ses 5 lettres arrivent en cascade depuis la droite (translateX 48→0 + fondu, ease-out), décalées de 0.1s, la 1re à 0.5s — elles apparaissent donc pendant que le symbole finit de se tracer. Total ≈ 1.6s. Le tracé plein est l&apos;état CSS par défaut — l&apos;animation pose l&apos;état vide, jamais l&apos;inverse, donc une animation qui ne joue pas laisse le logo visible. En <code>prefers-reduced-motion</code>, tout est affiché plein et les calques echo sont retirés.</div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Construction — grid</div>
        <div className="ds-card-body col">
          <div className="ds-tile-grid ds-tile-grid--cols2">
            {[["lockup","Symbol & Text"],["wordmark","Text only"]].map(([kind,label]) => (
              <div key={kind} className="lockup-card">
                <span className="panel-section-eyebrow">{label}</span>
                <LogoConstruction variant={kind} />
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="logo-spec-row">
            {[["Unité","x = d, le glyphe du wordmark (102 × 148)"],["Lockup","180 + 102 + 522 = 804 × 148"],["Gap symbole ↔ texte","1× d couché (102)"],["Cadre","au plus près du 16:9"]].map(([l,v]) => (
              <div key={l} className="logo-spec-item">
                <span className="logo-spec-label">{l}</span>
                <span className="logo-spec-val">{v}</span>
              </div>
            ))}
          </div>
          <p className="ds-note">L&apos;unité <strong>x</strong> est le « d » du wordmark (102 × 148) — repris en filigrane à 25 % dans les cases de mesure. Symbole et wordmark s&apos;alignent sur une même hauteur de <strong>1x</strong> (148), séparés par l&apos;unité couchée — 1× d, soit sa largeur (102) : le lockup mesure donc 180 + 102 + 522 = <strong>804 × 148</strong>. La largeur totale n&apos;a pas de règle stricte — viser un cadre au plus près du <strong>16:9</strong>. Le dégagement à réserver <em>autour</em> du logo ne se lit pas sur ces planches : voir <strong>Clear space</strong>.</p>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">App icon — squircle masters</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            <div className="ds-state-sample">
              <img src="/brand/app-icon-master.svg" alt="Favicon master" className="app-icon-preview" />
              <span className="panel-section-eyebrow">Favicon</span>
            </div>
            <div className="ds-state-sample">
              <img src="/brand/app-icon-ios.svg" alt="App icon iOS" className="app-icon-preview" />
              <span className="panel-section-eyebrow">App icon iOS</span>
            </div>
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Favicon</div>
            <p>Browser tab · PWA Android. Symbole blanc sur fond primary <code>#4959E6</code>, coins arrondis (rx 200) — le navigateur conserve l'arrondi tel quel.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">App icon iOS</div>
            <p>iOS home screen · Apple touch. Symbole blanc sur fond primary <code>#4959E6</code>, carré full-bleed (rx 0) — iOS applique lui-même son masque squircle ; un arrondi dans l'asset créerait un liseré aux coins.</p>
          </div>
          <div className="logo-spec-row">
            {[["Master size","1024×1024px"],["Generated set","16/32/48/180/192/512"],["Build","node scripts/build-favicons.mjs"]].map(([l,v]) => (
              <div key={l} className="logo-spec-item">
                <span className="logo-spec-label">{l}</span>
                <span className="logo-spec-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Maskable Android — shapes</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed">
            {[["circle","Circle"],["squircle","Squircle"],["rounded","Rounded"],["square","Square"]].map(([shape,label]) => (
              <div key={shape} className="ds-state-sample">
                <div className={`maskable-shape maskable-shape--${shape}`}>
                  <img src="/brand/maskable-master.svg" alt="" className="maskable-shape-img" />
                </div>
                <span className="panel-section-eyebrow">{label}</span>
              </div>
            ))}
          </div>
          <div className="ds-note">Aperçu de <code>maskable-master.svg</code> sous les masques qu'Android applique selon le launcher. Le symbole doit rester entièrement visible dans chaque forme (safe zone 80%) — s'il est rogné, réduire le symbole dans le master.</div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Splash screen — iOS launch</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <img src="/splash/iphone-16-pro.png" alt="iOS splash screen" className="splash-preview" />
            </div>
          </div>
          <div className="ds-note">Symbole bleu <code>#4959E6</code> centré (42% de la hauteur) sur fond <code>#FEFEFF</code>, footer « Données stockées localement · v1.0 » en bas. Affiché par iOS au lancement de la PWA standalone (avant le chargement du webview).</div>
          <div className="logo-spec-row">
            {[["Résolutions","11 (iPhone SE → 16 Pro Max)"],["Format","Clair only · #FEFEFF / R noir"],["Build","node scripts/build-splash.mjs"]].map(([l,v]) => (
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
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {SIZES.map(([sz]) => (
              <div key={sz} className="ds-state-sample">
                <Redline tone="blue" noGaps>
                  <LogoLockup className="logo" style={{ height: sz, color: "var(--text)" }} />
                </Redline>
                <span className="panel-section-eyebrow">{sz}px</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {SIZES.map(([sz, use]) => (
            <div key={sz} className="ds-token-block">
              <div className="ds-token-name">{sz}px</div>
              <p>{use}.</p>
            </div>
          ))}
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Clear space</div>
        <div className="ds-card-body col">
          <div className="logo-clearspace">
            <div className="logo-clearspace-frame">
              <Wordmark className="logo-wordmark" style={{ color: "var(--text)" }} />
            </div>
          </div>
          <div className="logo-spec-row">
            {[["Latéral","1× d — sa largeur (102)"],["Haut / bas","0.5x — logo 1x centré dans 2x (74)"],["Règle","Aucun texte, image ou bord visuel dans cette zone"]].map(([l,v]) => (
              <div key={l} className="logo-spec-item">
                <span className="logo-spec-label">{l}</span>
                <span className="logo-spec-val">{v}</span>
              </div>
            ))}
          </div>
          <div className="ds-note">Le dégagement dérive de la même unité <strong>x</strong> que la construction, mais il n&apos;est <strong>pas uniforme</strong> : l&apos;unité change d&apos;orientation selon l&apos;axe. Latéralement, le « d » s&apos;emploie couché — sa largeur (102) borde le logo de chaque côté. En hauteur, le logo mesure 1x et se centre dans une bande de <strong>2x</strong>, laissant <strong>0.5x</strong> (74) au-dessus et en dessous. Rapporté à une hauteur de logo quelconque : <strong>102/148</strong> sur les côtés, <strong>74/148</strong> en haut et en bas — le calcul qu&apos;applique le cadre ci-dessus.</div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Don'ts</div>
        <div className="ds-card-body col">
          <div className="ds-tile-grid ds-tile-grid--cols3">
            {[
              ["Pas de déformation", { transform: "scaleX(0.55)" }],
              ["Pas de rotation", { transform: "rotate(-8deg)" }],
              ["Pas d'ombre portée", { filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))" }],
              ["Pas de substitution de police", null],
            ].map(([label, style]) => (
              <div key={label} className="logo-dont-item">
                <div className="logo-dont">
                  {style
                    ? <Wordmark className="logo-wordmark" style={{ height: 32, color: "var(--text)", ...style }} />
                    : <span className="logo-dont-fake">Readr</span>}
                </div>
                <span className="logo-contrast-status logo-contrast-status--ko">✗ {label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Background contrast</div>
        <div className="ds-card-body col">
          <div className="ds-tile-grid ds-tile-grid--cols3">
            {[
              { bg: "#FEFEFF",  fg: "#0F0F0F", ok: true,  label: "Surface light" },
              { bg: "#0F0F0F",  fg: "#FFFFFF", ok: true,  label: "Surface dark" },
              { bg: "var(--primary-50)", fg: "#FFFFFF", ok: true,  label: "Primary brand" },
              { bg: "#F7F7F7",  fg: "#C8C8C8", ok: false, label: "Trop faible contraste" },
              { bg: "var(--primary-50)", fg: "#0F0F0F", ok: false, label: "Conflit brand + dark" },
              { bg: "linear-gradient(135deg, var(--primary-50) 0%, #F59E0B 100%)", fg: "#FFFFFF", ok: false, label: "Fond complexe / dégradé" },
            ].map((c, i) => (
              <div key={i} className="logo-contrast-item">
                <div className="logo-bg" style={{ background: c.bg }}>
                  <Wordmark className="logo-wordmark" style={{ color: c.fg }} />
                </div>
                <span className={`logo-contrast-status ${c.ok ? 'logo-contrast-status--ok' : 'logo-contrast-status--ko'}`}>
                  {c.ok ? '✓ ' : '✗ '}{c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ds-card">
        <div className="ds-card-head">Usage rules</div>
        <div className="ds-card-body col">
          <p className="ds-note">
            Always <strong>Readr</strong> (R capitale + reste lowercase), never <em>readr</em>, <em>READR</em> or <em>ReadR</em>. Do not re-outline, recolor selectively, or apply font substitution — use the SVG component. Minimum size: 12px height. On colored backgrounds, use white only (<code>#FFFFFF</code>).
          </p>
        </div>
      </div>
    </DSSection>
  );
}
