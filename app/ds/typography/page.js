import DSSection from "../_components/DSSection";

export default function TypographyPage() {
  return (
    <DSSection id="typography" title="Typography" sub="Plus Jakarta Sans, une seule font sur toute l'app. Base : 14px — 1rem = 14px · 11-tier canonical scale (48/28/20/18/16/15/14/13/12/11/10)">
      <div className="ds-card">
        <div className="ds-card-head">Plus Jakarta Sans — 11-tier scale</div>
        <div className="ds-card-body col">
          {[
            [48, "3.43rem", "700", "Page title", ".page-title"],
            [28, "2rem",    "700", "Book title", ".panel-title"],
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
              <div style={{ fontSize: px, fontWeight: weight, lineHeight: 1.2 }}>{label}</div>
              {detail && <div className="ds-token-name">{detail}</div>}
              <div className="type-sample-meta">{rem} · {px}px · {weight}</div>
            </div>
          ))}
        </div>
      </div>
    </DSSection>
  );
}
