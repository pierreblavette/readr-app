import Swatch from "../_components/Swatch";
import DSSection from "../_components/DSSection";

export default function ColorsPage() {
  return (
    <DSSection id="colors" title="Colors" sub="Interface color tokens, in light and dark themes.">

      <div className="ds-card">
        <div className="ds-card-head">Surfaces</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <Swatch bg="var(--bg)" title="Page" token="--bg" light="#FEFEFF" dark="#0F0F0F" />
            <Swatch bg="var(--bg3)" title="Subtle" token="--bg3" light="#F7F7F7" dark="#1A1A1A" />
            <Swatch bg="var(--card)" title="Card" token="--card" light="#FFFFFF" dark="#1E1E1E" />
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Strokes</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <Swatch bg="var(--border-subtle)" title="Subtle" token="--border-subtle" light="#EFEFEF" dark="#2E2E2E" />
            <Swatch bg="var(--border)" title="Strong" token="--border" light="#E0E0E0" dark="#2E2E2E" />
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-token-chip">--border-subtle</span></div>
            <p>default stroke for all components (buttons, inputs, cards, containers) and most dividers (row separators, section separators). 1.5px on components, 1px on dividers.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-token-chip">--border</span></div>
            <p>reserved for stronger visual affordances where a subtle stroke isn't enough : <code>.panel-spinner</code> ring (2px), <code>.import-dropzone</code> dashed border (2px), <code>.ob-dot</code> background. Do not use for regular component strokes.</p>
          </div>
          <p className="ds-note">In dark mode both tokens resolve to <code>#2E2E2E</code> — divergence exists only in light mode.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Accent</div>
        <div className="ds-card-body col">
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
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <Swatch bg="var(--text)" title="Default" token="--text" light="#222" dark="#F0F0F0" />
            <Swatch bg="var(--text-2)" title="Secondary" token="--text-2" light="#555" dark="#909090" />
            <Swatch bg="var(--text-3)" title="Muted" token="--text-3" light="#777" dark="#555" />
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Primary scale</div>
        <div className="ds-card-body col">
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
        </div>
        <div className="ds-card-body col">
          <p className="ds-note"><span className="ds-token-chip">--primary-N</span> · ★ anchor = <span className="ds-token-chip">--accent</span> (#4959E6)</p>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-token-chip">--primary-3</span> (#FAFAFF)</div>
            <p>ultra-subtle tint used for card hover states (.quote-card, .book-card, .now-reading-card, .list-row, .list-table thead tr). One tier below <span className="ds-token-chip">--primary-5</span> so secondary tinted buttons inside (.book-chip-interactive at <span className="ds-token-chip">--primary-5</span>) stay visible without blending into the hovered card.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dark mode override</div>
            <p><span className="ds-token-chip">--primary-3</span>, <span className="ds-token-chip">--primary-5</span> and <span className="ds-token-chip">--primary-10</span> resolve to <strong>solid colors</strong> in dark theme (not rgba). Computed over the dominant card baseline <span className="ds-token-chip">--card</span> #1E1E1E to preserve visual rendering: <span className="ds-token-chip">--primary-3</span>=#222432 (card hover), <span className="ds-token-chip">--primary-5</span>=#232536 (button bg), <span className="ds-token-chip">--primary-10</span>=#272B4A (button hover stronger). Solid (vs rgba) so render is identical regardless of actual parent baseline — fixes the historical inconsistency where <code>.list-row</code> hover (parent <code>.books-list</code> on <span className="ds-token-chip">--card</span>) looked different from <code>.now-reading-card</code> hover (no parent bg, mixed with <span className="ds-token-chip">--bg</span>).</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Neutrals — Dark (tinted primary)</div>
        <div className="ds-card-body col">
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
          <p className="ds-note"><span className="ds-token-chip">--dark-N</span> · base #0D0F1A · only the steps actually used in the codebase</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Neutrals — Light (tinted primary)</div>
        <div className="ds-card-body col">
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
          <p className="ds-note"><span className="ds-token-chip">--light-N</span> · base #F5F6FF · only the steps actually used in the codebase</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Illustration tokens</div>
        <div className="ds-card-body col">
          <div className="palette-grid">
            {[
              ["bg-1",     "#F4F5FF", "#232536"],
              ["bg-2",     "#E8EAFD", "#272B4A"],
              ["bg-3",     "#C1C7FB", "#353A66"],
              ["mid",      "#9BA5F8", "#525D9E"],
              ["accent-1", "#6F7CF2", "#7B89F8"],
              ["accent-2", "#4959E6", "#6F7CF2"],
              ["accent-3", "#3646D4", "#4959E6"],
              ["stroke",   "#131860", "var(--primary-20) — #C1C7FB"],
            ].map(([step, lightHex, darkHex]) => (
              <Swatch
                key={step}
                size="sm"
                bg={`var(--illus-${step})`}
                title={step}
                token={`--illus-${step}`}
                light={lightHex}
                dark={darkHex}
              />
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">8 tokens used in <code>.empty-icon</code> SVGs (Library, Wishlist, Overview*, Dictionary, Quotes, Collections, Onboarding). Light = mirror of primary scale, dark = value scale inverted (bg fills dark muted, stroke light-tinted).</p>
          <div className="ds-token-block">
            <div className="ds-token-name">Stroke</div>
            <p><span className="ds-token-chip">--illus-stroke</span> resolves to <span className="ds-token-chip">--primary-90</span> in light (#131860 navy) and <span className="ds-token-chip">--primary-20</span> in dark (#C1C7FB lavender). Brand-tinted stroke instead of neutral white — gives a monochrome blue feel to illustrations.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Usage</div>
            <p>In SVG: <code>fill="var(--illus-bg-2)"</code> / <code>stroke="var(--illus-stroke)"</code>. <code>var()</code> in attribute values works in modern browsers.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
