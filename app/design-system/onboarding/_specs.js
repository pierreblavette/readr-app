// Spec de la page Onboarding. On RÉUTILISE les 6 icônes illustratives réelles
// (exportées par components/library/Onboarding.js) — pas de reproduction des SVG.
// Le markup reproduit celui du composant (.ob-modal → body → slides → footer) ;
// le contenu texte est un placeholder de doc (l'app le pilote par i18n).
import { ReadrIcon, TrackingIcon, ScanIcon, QuoteIcon, WordsIcon, DataControlIcon } from "@/components/library/Onboarding";

export const OB_SLIDES = [
  { key: "Readr", icon: ReadrIcon, title: "Welcome to Readr", desc: "Your personal reading tracker — and everything stays on your device." },
  { key: "Tracking", icon: TrackingIcon, title: "Track what you read", desc: "Mark books as reading or finished, rate them, and watch your library grow." },
  { key: "Scan", icon: ScanIcon, title: "Add books in a snap", desc: "Scan a barcode or snap a shelf — no manual typing." },
  { key: "Quote", icon: QuoteIcon, title: "Keep the words you love", desc: "Save quotes from your books and revisit them anytime." },
  { key: "Words", icon: WordsIcon, title: "Build your vocabulary", desc: "Look up and collect new words as you read." },
  { key: "Data control", icon: DataControlIcon, title: "You own your data", desc: "Everything lives locally — export or wipe it whenever you want." },
];

// slide : index affiché (0–5). La visibilité Skip/Prev suit la position réelle.
export function OnboardingModalSpec({ slide = 0, className = "", style }) {
  const s = OB_SLIDES[slide];
  const Icon = s.icon;
  const isLast = slide === OB_SLIDES.length - 1;
  return (
    <div className={`ob-modal ${className}`.trim()} style={style}>
      <div className="ob-body">
        <div className="ob-slides">
          <div className="ob-icon"><Icon /></div>
          <div className="ob-text">
            <h2 className="ob-title">{s.title}</h2>
            <p className="ob-desc">{s.desc}</p>
          </div>
          <div className="ob-dots" role="tablist">
            {OB_SLIDES.map((_, i) => (
              <button key={i} type="button" role="tab" aria-selected={i === slide} aria-label={`Slide ${i + 1} of ${OB_SLIDES.length}`} className={`ob-dot${i === slide ? " active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="ob-footer">
        <div className="ob-footer-nav">
          <div className="ob-footer-left">
            {!isLast && <button type="button" className="ob-skip">Skip</button>}
          </div>
          <div className="ob-footer-right">
            {slide > 0 && <button type="button" className="ob-prev">Previous</button>}
            <button type="button" className="ob-next">{isLast ? "Get started" : "Next"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
